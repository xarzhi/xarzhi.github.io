# Struct std::thread::LocalKey

拥有其内容的线程本地存储密钥。

```rust
pub struct LocalKey<T: 'static> { /* private fields */ }
```

该密钥使用可用于目标平台的最快速度的实现。**它用 `thread_local!` 宏实例化，主要方法是 with 方法。**

with 方法对包含的值产生一个引用，该值不能比当前线程长寿或转义给定的封闭包。



## 初始化与销毁

初始化是在线程中对 [with](#with)的第一次调用中动态执行的，并且当线程退出时，实现 Drop 的值将被销毁。一些注意事项适用，下面将进行说明。

LocalKey 的初始化不能递归地依赖于它自己，以这种方式使用 LocalKey 会使初始化在第一次调用 with 时无限递归。



## Implementations

### impl<T: 'static> LocalKey\<T>

### with

获取当前线程所持有的线程局部变量实例，并把它的引用传给闭包 `f` 执行。

```rust
pub fn with<F, R>(&'static self, f: F) -> R
where
    F: FnOnce(&T) -> R,
```

**参数**：

- **f**：闭包函数

**返回值**：取决于`f`的返回值

```rust
use std::cell::RefCell;
use std::thread;

thread_local! {
    static COUNTER: RefCell<u32> = RefCell::new(0);
}

fn main() {
    let handles: Vec<_> = (0..3).map(|_| {
        thread::spawn(|| {
            COUNTER.with(|c| {
                *c.borrow_mut() += 1;
                println!("counter = {}", *c.borrow());
            });
        })
    }).collect();

    for h in handles {
        h.join().unwrap();
    }
}
```

:::tip Panics

如果该键当前正在运行其析构函数，则此函数将为 `panic!()`; 如果先前已为此线程运行了析构函数，则它可能 panic。

:::



### try_with

获取对此 TLS 密钥中的值的引用。

如果此线程尚未引用此键，则将延迟地初始化该值。 如果密钥已被销毁 (如果在析构函数中调用它可能会发生这种情况)，此函数将返回 [AccessError](./AccessError)。

```rust
pub fn try_with<F, R>(&'static self, f: F) -> Result<R, AccessError>
where
    F: FnOnce(&T) -> R,
```

:::tip Panics

如果未初始化密钥并且密钥的初始化 panics，则此函数仍将 panic!()。

:::



### impl<T: 'static> LocalKey<Cell\<T>>

#### set

`nightly-only`

设置或初始化包含的值。

与其他方法不同，这将*不会*运行本地线程的惰性初始化。 相反，如果它还没有初始化，它将直接用给定的值初始化。

```rust
pub fn set(&'static self, value: T)
```

示例

```rust
#![feature(local_key_cell_methods)]
use std::cell::Cell;

thread_local! {
    static X: Cell<i32> = panic!("!");
}

// 在这里调用 X.get() 会导致 panic。

X.set(123); // 但是 X.set() 很好，因为它跳过了上面的初始化。

assert_eq!(X.get(), 123);
```

:::tip Panics

如果密钥当前正在运行其析构函数，则发生 panic，如果析构函数先前已为此线程运行，则它**可能**panic。

:::



#### get

`nightly-only`

返回所包含值的副本。

如果此线程尚未引用此键，则将延迟地初始化该值。

```rust
pub fn get(&'static self) -> T
where
    T: Copy,
```

示例

```rust
#![feature(local_key_cell_methods)]
use std::cell::Cell;

thread_local! {
    static X: Cell<i32> = Cell::new(1);
}

assert_eq!(X.get(), 1);
```

:::tip Panics

如果密钥当前正在运行其析构函数，则发生 panic，如果析构函数先前已为此线程运行，则它**可能**panic。

:::



#### take

`nightly-only`

获取包含的值，在其位置保留 `Default::default()`。

如果此线程尚未引用此键，则将延迟地初始化该值。

```rust
pub fn take(&'static self) -> T
where
    T: Default,
```

示例

```rust
#![feature(local_key_cell_methods)]
use std::cell::Cell;

thread_local! {
    static X: Cell<Option<i32>> = Cell::new(Some(1));
}

assert_eq!(X.take(), Some(1));
assert_eq!(X.take(), None);
```

:::tip Panics

如果密钥当前正在运行其析构函数，则发生 panic，如果析构函数先前已为此线程运行，则它**可能**panic。

:::



#### replace

`nightly-only`

替换包含的值，返回旧值。

如果此线程尚未引用此键，则将延迟地初始化该值。

```rust
pub fn replace(&'static self, value: T) -> T
```

示例

```rust
#![feature(local_key_cell_methods)]
use std::cell::Cell;

thread_local! {
    static X: Cell<i32> = Cell::new(1);
}

assert_eq!(X.replace(2), 1);
assert_eq!(X.replace(3), 2);
```

:::tip Panics

如果密钥当前正在运行其析构函数，则发生 panic，如果析构函数先前已为此线程运行，则它**可能**panic。

:::



### impl<T: 'static> LocalKey<RefCell\<T>>

#### with_borrow

`nightly-only`

获取对所包含值的引用。

如果此线程尚未引用此键，则将延迟地初始化该值。

```rust
pub fn with_borrow<F, R>(&'static self, f: F) -> R
where
    F: FnOnce(&T) -> R,
```

示例

```rust
#![feature(local_key_cell_methods)]
use std::cell::RefCell;

thread_local! {
    static X: RefCell<Vec<i32>> = RefCell::new(Vec::new());
}

X.with_borrow(|v| assert!(v.is_empty()));
```

:::tip Panics

如果当前价值是可变借来的，就会出现 panic。

如果密钥当前正在运行其析构函数，则发生 panic，如果析构函数先前已为此线程运行，则它**可能**panic。

:::



#### with_borrow_mut

`nightly-only`

获取对所包含值的可变引用。

如果此线程尚未引用此键，则将延迟地初始化该值。

```rust
pub fn with_borrow_mut<F, R>(&'static self, f: F) -> R
where
    F: FnOnce(&mut T) -> R,
```

示例

```rust
#![feature(local_key_cell_methods)]
use std::cell::RefCell;

thread_local! {
    static X: RefCell<Vec<i32>> = RefCell::new(Vec::new());
}

X.with_borrow_mut(|v| v.push(1));

X.with_borrow(|v| assert_eq!(*v, vec![1]));
```

:::tip Panics

如果当前的值是借来的，就会出现 panic。

如果密钥当前正在运行其析构函数，则发生 panic，如果析构函数先前已为此线程运行，则它**可能**panic。

:::



#### set

`nightly-only`

设置或初始化包含的值。

与其他方法不同，这将*不会*运行本地线程的惰性初始化。 相反，如果它还没有初始化，它将直接用给定的值初始化。

```rust
pub fn set(&'static self, value: T)
```

示例

```rust
#![feature(local_key_cell_methods)]
use std::cell::RefCell;

thread_local! {
    static X: RefCell<Vec<i32>> = panic!("!");
}

// 在这里调用 X.with() 会导致 panic。

X.set(vec![1, 2, 3]); // 但是 X.set() 很好，因为它跳过了上面的初始化。

X.with_borrow(|v| assert_eq!(*v, vec![1, 2, 3]));
```

:::tip Panics

如果当前的值是借来的，就会出现 panic。

如果密钥当前正在运行其析构函数，则发生 panic，如果析构函数先前已为此线程运行，则它**可能**panic。

:::



#### take

`nightly-only`

获取包含的值，在其位置保留 `Default::default()`。

如果此线程尚未引用此键，则将延迟地初始化该值。

```rust
pub fn take(&'static self) -> T
where
    T: Default,
```

示例

```rust
#![feature(local_key_cell_methods)]
use std::cell::RefCell;

thread_local! {
    static X: RefCell<Vec<i32>> = RefCell::new(Vec::new());
}

X.with_borrow_mut(|v| v.push(1));

let a = X.take();

assert_eq!(a, vec![1]);

X.with_borrow(|v| assert!(v.is_empty()));
```

:::tip Panics

如果当前的值是借来的，就会出现 panic。

如果密钥当前正在运行其析构函数，则发生 panic，如果析构函数先前已为此线程运行，则它**可能**panic。

:::



#### replace

`nightly-only`

替换包含的值，返回旧值。

```rust
pub fn replace(&'static self, value: T) -> T
```

示例

```rust
#![feature(local_key_cell_methods)]
use std::cell::RefCell;

thread_local! {
    static X: RefCell<Vec<i32>> = RefCell::new(Vec::new());
}

let prev = X.replace(vec![1, 2, 3]);
assert!(prev.is_empty());

X.with_borrow(|v| assert_eq!(*v, vec![1, 2, 3]));
```

:::tip Panics

如果当前的值是借来的，就会出现 panic。

如果密钥当前正在运行其析构函数，则发生 panic，如果析构函数先前已为此线程运行，则它**可能**panic。

:::



## Trait Implementations

### impl<T: 'static> Debug for LocalKey\<T>

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result
```



## Auto Trait Implementations

### impl\<T> RefUnwindSafe for LocalKey\<T>

### impl\<T> Send for LocalKey\<T>

### impl\<T> Sync for LocalKey\<T>

### impl\<T> Unpin for LocalKey\<T>

### impl\<T> UnwindSafe for LocalKey\<T>



## Blanket Implementations

### impl\<T> Any for T

```rust
impl<T> Any for T
where
  T: 'static + ?Sized,
```



### impl\<T> Borrow\<T> for T

```rust
impl<T> Borrow<T> for T
where
  T: ?Sized,
```



### impl\<T> BorrowMut\<T> for T

```rust
impl<T> BorrowMut<T> for T
where
  T: ?Sized,
```



### impl\<T> From\<T> for T



### impl<T, U> Into\<U> for T

```rust
impl<T, U> Into<U> for T
where
  U: From<T>,
```



### impl<T, U> TryFrom\<U> for T

```rust
impl<T, U> TryFrom<U> for T
where
  U: Into<T>,
```



### impl<T, U> TryInto\<U> for T

```rust
impl<T, U> TryInto<U> for T
where
  U: TryFrom<T>,