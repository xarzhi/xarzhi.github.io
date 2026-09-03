# Struct std::thread::JoinHandle

拥有加入线程的权限 (在线程终止时阻止)。

```rust
pub struct JoinHandle<T>(_);
```

当 `JoinHandle` 被丢弃时，它会分离关联的线程，这意味着不再有线程的任何句柄，也无法在其上使用 join。

由于平台的限制，无法使用 `Clone` 此句柄：加入线程的能力是唯一拥有的权限。

该 struct 由 `thread::spawn` 函数和 `thread::Builder::spawn` 方法创建。

从 `thread::spawn` 创建：

```rust
use std::thread;

let join_handle: thread::JoinHandle<_> = thread::spawn(|| {
    // 这里一些工作
});
```

从 `thread::Builder::spawn`创建：

```rust
use std::thread;

let builder = thread::Builder::new();

let join_handle: thread::JoinHandle<_> = builder.spawn(|| {
    // 这里一些工作
}).unwrap();
```

一个线程被分离并且比产生它的线程生命周期更长：

```rust
use std::thread;
use std::time::Duration;

let original_thread = thread::spawn(|| {
    let _detached_thread = thread::spawn(|| {
        // 在这里我们睡觉以确保第一个线程在此之前返回。
        thread::sleep(Duration::from_millis(10));
        // 即使 JoinHandle 被丢弃，也将调用它。
        println!("♫ Still alive ♫");
    });
});

original_thread.join().expect("The thread being joined has panicked");
println!("Original thread is joined.");

// 我们确保在主线程返回之前，新线程有时间运行。

thread::sleep(Duration::from_millis(1000));
```



## Implementations

### impl\<T> JoinHandle\<T>

#### thread

提取底层线程的句柄。

```rust
pub fn thread(&self) -> &Thread
```

**返回值**：返回一个`Thread`句柄实例

```rust
use std::thread;

let builder = thread::Builder::new();

let join_handle: thread::JoinHandle<_> = builder.spawn(|| {
    // 这里一些工作
}).unwrap();

let thread = join_handle.thread();
println!("thread id: {:?}", thread.id());
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

let builder = thread::Builder::new();

let join_handle: thread::JoinHandle<_> = builder.spawn(|| {
    // 这里一些工作
}).unwrap();
join_handle.join().expect("Couldn't join on the associated thread");
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

```rust
fn main() {
    use std::thread;
    use std::time::Duration;

    let handle = thread::spawn(|| {
        thread::sleep(Duration::from_secs(2));
        println!("线程干活完了");
    });

    // 不阻塞，立即返回 true/false
    if handle.is_finished() {
        println!("线程已经结束了");
    } else {
        println!("线程还在跑");
    }

    handle.join().unwrap();
}
```





## Trait Implementations

### impl\<T> AsHandle for JoinHandle\<T>

`Available on Windows only.`



#### as_handle

借用句柄。 

```rust
fn as_handle(&self) -> BorrowedHandle<'_>
```



### impl\<T> AsRawHandle for JoinHandle\<T>

`Available on Windows only.`

#### as_raw_handle

提取原始句柄。 

```rust
fn as_raw_handle(&self) -> RawHandle
```



### impl\<T> Debug for JoinHandle\<T>

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result
```



### impl\<T> From<JoinHandle\<T>> for OwnedHandle

`Available on Windows only.`

#### from

从输入类型转换为此类型。

```rust
fn from(join_handle: JoinHandle<T>) -> OwnedHandle
```



### impl\<T> IntoRawHandle for JoinHandle\<T>

`Available on Windows only.`

#### into_raw_handle

消耗此对象，返回原始底层句柄。 

```rust
fn into_raw_handle(self) -> RawHandle
```



### impl\<T> JoinHandleExt for JoinHandle\<T>

`Available on Unix only.`

#### as_pthread_t

提取原始 pthread_t 而不拥有所有权

```rust
fn as_pthread_t(&self) -> RawPthread
```



#### into_pthread_t

消耗线程，返回原始 pthread_t 

```rust
fn into_pthread_t(self) -> RawPthread
```



### impl\<T> Send for JoinHandle\<T>



### impl\<T> Sync for JoinHandle\<T>



### Auto Trait Implementations

### impl\<T> !RefUnwindSafe for JoinHandle\<T>

### impl\<T> Unpin for JoinHandle\<T>

### impl\<T> !UnwindSafe for JoinHandle\<T>



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

