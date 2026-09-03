# Struct std::thread::ScopedJoinHandle

在作用域线程上加入的拥有权限 (在其终止时阻塞)。

```rust
pub struct ScopedJoinHandle<'scope, T>(_);
```





## Implementations

impl<'scope, T> ScopedJoinHandle<'scope, T>

#### thread

提取底层线程的句柄。

```rust
pub fn thread(&self) -> &Thread
```

**返回值**：返回一个`Thread`句柄实例

```rust
use std::thread;

thread::scope(|s| {
    let t = s.spawn(|| {
        println!("hello");
    });
    println!("thread id: {:?}", t.thread().id());
});
```



#### join

等待关联的线程完成。

**阻塞**当前线程，等子线程结束，拿到结果

如果关联的线程已经完成，这个函数将立即返回。

```rust
pub fn join(self) -> Result<T>
```

**返回值**：返回一个[Result](../index#Result)

```rust
use std::thread;

thread::scope(|s| {
    let t = s.spawn(|| {
        panic!("oh no");
    });
    assert!(t.join().is_err());
});
```

就 原子内存排序 而言，关联线程的完成与此函数返回同步。 换句话说，该线程 之前发生过 执行的所有操作都是在 join 返回之后发生的所有操作。

如果关联的线程 panics，则返回 Err，并返回给 panic! 的参数。

:::tip Panics

如果某个线程尝试加入自身，则该函数在某些平台上可能为 panic，否则可能会在加入线程时产生死锁。

:::



#### is_finished

检查关联线程是否已完成其 main 函数的运行。

```rust
pub fn is_finished(&self) -> bool
```

**返回值**：返回bool值

`is_finished` 支持实现非阻塞连接操作，通过检查 `is_finished`，如果返回 `true` 则调用 `join`。 该函数不会阻止。 要在等待线程完成时阻塞，请使用 [`join`](#join)。

这可能在线程的 main 函数返回之后，但在线程本身停止运行之前短暂返回 `true`。 但是，一旦返回 `true`，可以预期[`join`](#join)会快速返回，而不会被阻塞很长时间





## Trait Implementations

### impl<'scope, T> Debug for ScopedJoinHandle<'scope, T>

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result
```



## Auto Trait Implementations

### impl<'scope, T> !RefUnwindSafe for ScopedJoinHandle<'scope, T>

### impl<'scope, T> Send for ScopedJoinHandle<'scope, T>

```rust
impl<'scope, T> Send for ScopedJoinHandle<'scope, T>
where
  T: Send + Sync,
```



### impl<'scope, T> Sync for ScopedJoinHandle<'scope, T>

```rust
impl<'scope, T> Sync for ScopedJoinHandle<'scope, T>
where
  T: Send + Sync,
```

### impl<'scope, T> Unpin for ScopedJoinHandle<'scope, T>

### impl<'scope, T> !UnwindSafe for ScopedJoinHandle<'scope, T>



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
```

