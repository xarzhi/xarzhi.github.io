# Struct std::thread::Thread

线程的句柄

```rust
pub struct Thread { /* private fields */ }
```

线程通过 Thread 类型表示，您可以通过以下两种方式之一来获取：

通过生成一个新线程，例如使用 `thread::spawn` 函数，并在 `JoinHandle` 上调用 `thread`。

**通过使用 `thread::current` 函数来获取线程`Thread`实例**

`thread::current` 函数甚至可用于不是由该模块的 API 生成的线程。

通常不需要自己创建 `Thread` 结构体，而应使用 `spawn` 之类的函数来创建新线程，有关更多详细信息，请参见 `Builder` 和 `spawn` 的文档。



## Implementations

### impl Thread

#### unpark

通过原子方式使当前线程恢复可用状态（如果处于不可用状态）

若使线程不可用，需要使用[`thread::park`](../index#pa)方法

```rust
pub fn unpark(&self)
```

示例

```rust
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        println!("子线程：准备停车...");
        thread::park();  // 阻塞在这里，等待被 unpark
        println!("子线程：被唤醒了，继续执行！");
    });

    // 主线程等一下，确保子线程先跑起来并 park
    thread::sleep(Duration::from_millis(10000));

    println!("主线程：唤醒子线程");
    handle.thread().unpark();  // 发送许可，唤醒子线程

    handle.join().unwrap();
}
```



#### id

获取线程的唯一标识符。

```rust
pub fn id(&self) -> ThreadId
```

**返回值**：返回一个[ThreadId](./ThreadId)

```rust
use std::thread;

fn main() {
    let other_thread = thread::spawn(|| thread::current().id());

    let other_thread_id = other_thread.join().unwrap();
	
    println!("{:?}", thread::current().id()); // ThreadId(1)
    println!("{:?}", other_thread_id); // ThreadId(2)
}
```



#### name

获取线程的名称。

```rust
pub fn name(&self) -> Option<&str>
```

**返回值**：返回线程的名称，包含在`Option`里，可能为`None`

默认情况下，线程未指定名称：

```rust
fn main() {
    use std::thread;

    let builder = thread::Builder::new();

    let handler = builder
        .spawn(|| {
            println!("{:?}", thread::current().name());  // None
        })
        .unwrap();

    handler.join().unwrap();
}
```

具有指定名称的线程：

```rust
fn main() {
    use std::thread;

    let builder = thread::Builder::new().name("foo".into());

    let handler = builder
        .spawn(|| {
            println!("{:?}", thread::current().name()) // Some("foo")
        })
        .unwrap();

    handler.join().unwrap();
}
```



## Trait Implementations

### impl Clone for Thread

#### clone

返回值的副本。 

```rust
fn clone(&self) -> Thread
```



#### clone_from

从`source`执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### impl Debug for Thread

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result
```



## Auto Trait Implementations

### impl RefUnwindSafe for Thread

### impl Send for Thread

### impl Sync for Thread

### impl Unpin for Thread

### impl UnwindSafe for Thread



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



### impl\<T> ToOwned for T

```rust
impl<T> ToOwned for T
where
  T: Clone,
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