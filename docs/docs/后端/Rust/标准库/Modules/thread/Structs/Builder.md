# Struct std::thread::Builder

线程工厂，可用于配置新线程的属性。

可以在其上链接方法以对其进行配置。

```rust
pub struct Builder { /* private fields */ }
```

有两种配置可供选择：

- name: specifies an associated name for the thread
- stack_size: specifies the desired stack size for the thread

`spawn` 方法将获取构建器的所有权，并使用给定的配置为线程句柄创建 `io::Result`。

`thread::spawn` free 函数使用带有默认配置的 `Builder`，并且 `unwrap` 是其返回值。

当您想从启动线程失败中恢复时，您可能想使用 spawn 而不是 `thread::spawn`，实际上，free 函数会在 Builder 方法返回 `io::Result` 时 panic。

```rust
use std::thread;

let builder = thread::Builder::new();

let handler = builder.spawn(|| {
    // 线程代码
}).unwrap();

handler.join().unwrap();
```





## Implementations

### impl Builder

#### spawn_scoped

使用通过此 `Builder` 设置的设置生成一个新的作用域线程。

与 `Scope::spawn` 不同，此方法会生成一个 `io::Result` 来捕获在操作系统级别创建线程的任何失败。

```rust
pub fn spawn_scoped<'scope, 'env, F, T>(
    self,
    scope: &'scope Scope<'scope, 'env>,
    f: F
) -> Result<ScopedJoinHandle<'scope, T>>
where
    F: FnOnce() -> T + Send + 'scope,
    T: Send + 'scope,
```

**参数**：

- **scope**：作用域，
- **f**：多线程闭包处理函数

**返回值**：返回一个`Result`，包含`ScopedJoinHandle`

```rust
fn main() {
    use std::thread;

    let mut a = vec![1, 2, 3];
    let mut x = 0;

    thread::scope(|s| {
        thread::Builder::new()
            .name("first".to_string())
            .spawn_scoped(s, || {
                println!(
                    "hello from the {:?} scoped thread",
                    thread::current().name()
                );
                // 我们可以在这里借用 `a`。
                // dbg!(&a);
                println!("{:?}", a); // 1,2,3
            })
            .unwrap();

        thread::Builder::new()
            .name("second".to_string())
            .spawn_scoped(s, || {
                println!(
                    "hello from the {:?} scoped thread",
                    thread::current().name()
                );
                // 我们甚至可以在这里可变地借用 `x`，因为没有其他线程在使用它。
                x += a[0] + a[2];
            })
            .unwrap();
        println!("hello from the main thread");
    });

    // 在作用域之后，我们可以再次修改和访问我们的变量:
    a.push(4);
    println!("{:?}", a); // 1,2,3,4
}
```



### impl Builder

#### new

生成用于生成线程的基本配置，从中可以链接配置方法。

```rust
pub fn new() -> Builder
```

**返回值**：返回一个`Builder`，方便链式操作

```rust
use std::thread;

let builder = thread::Builder::new()
                              .name("foo".into())
                              .stack_size(32 * 1024);

let handler = builder.spawn(|| {
    // 线程代码
}).unwrap();

handler.join().unwrap();
```



#### name

命名未来线程。当前，该名称仅用于 panic 消息中的标识。

该名称不能包含空字节 (`\0`)。

```rust
pub fn name(self, name: String) -> Builder
```

**参数**：

- **name**：这个线程的名称

**返回值**：返回一个`Builder`，方便链式操作

```rust
use std::thread;

let builder = thread::Builder::new()
    .name("foo".into());

let handler = builder.spawn(|| {
    assert_eq!(thread::current().name(), Some("foo"))
}).unwrap();

handler.join().unwrap();
```



#### stack_size

设置新线程的栈大小 (以字节为单位)。

如果平台指定最小栈大小，则实际栈大小可能大于这个值。

```rust
pub fn stack_size(self, size: usize) -> Builder
```

**参数**：

- **size**：此线程置顶的栈空间大小，单位字节

**返回值**：返回一个`Builder`，方便链式操作

```rust
use std::thread;

let builder = thread::Builder::new().stack_size(32 * 1024);
```



#### spawn

通过获取 `Builder` 的所有权产生一个新线程，并向其 `JoinHandle` 返回一个 `io::Result`。

衍生的线程可能比调用者活得长 (除非调用者线程是主线程; 当主线程结束时，整个进程将终止)。 连接句柄可用于在新线程终止时阻塞，包括恢复其 panics。

```rust
pub fn spawn<F, T>(self, f: F) -> Result<JoinHandle<T>>
where
    F: FnOnce() -> T + Send + 'static,
    T: Send + 'static,
```

**参数**：

- **f**：线程闭包处理函数，有关此线程的一系列操作在此函数内完成

**返回值**：返回一个`Result`，包含一个`JoinHandle`

```rust
use std::thread;

let builder = thread::Builder::new();

let handler = builder.spawn(|| {
    // 线程代码
}).unwrap();

handler.join().unwrap();
```

:::tip  Errors

与 spawn 的 free 函数不同，此方法产生 `io::Result` 来捕获在操作系统级别创建线程的任何失败。

:::

:::tip Panics

如果设置了线程名称并且它包含空字节，就会出现 panic。

:::





#### spawn_unchecked

`nightly-only`

通过获取 Builder 的所有权来产生不受任何生命周期限制的新线程，并将 `io::Result` 返回其 `JoinHandle`。

衍生的线程可能比调用者活得长 (除非调用者线程是主线程; 当主线程结束时，整个进程将终止)。 连接句柄可用于在新线程终止时阻塞，包括恢复其 panics。

此方法与 `thread::Builder::spawn` 相同，不同之处在于宽松的生命周期界限使其不安全。

```rust
pub unsafe fn spawn_unchecked<'a, F, T>(self, f: F) -> Result<JoinHandle<T>>
where
    F: FnOnce() -> T + Send + 'a,
    T: Send + 'a,
```

**参数**：

- **f**：线程闭包处理函数，有关此线程的一系列操作在此函数内完成

**返回值**：返回一个`Result`，包含一个`JoinHandle`

```rust
#![feature(thread_spawn_unchecked)]
use std::thread;

let builder = thread::Builder::new();

let x = 1;
let thread_x = &x;

let handler = unsafe {
    builder.spawn_unchecked(move || {
        println!("x = {}", *thread_x);
    }).unwrap()
};

// 调用者必须确保已调用 `join()`，否则，如果在执行线程闭包之前 `x` 被丢弃，则可以访问释放的内存！
handler.join().unwrap();
```

:::tip  Errors

与 spawn 的 free 函数不同，此方法产生 `io::Result` 来捕获在操作系统级别创建线程的任何失败。

:::

:::tip Panics

如果设置了线程名称并且它包含空字节，就会出现 panic。

:::

:::tip Safety

调用者必须确保新建线程的生命周期不会超过所提供线程闭包及其返回类型中的任何引用。 可以通过两种方式保证这一点：

确保在丢弃任何引用数据之前已调用 join

仅使用具有 'static 生命周期界限的类型，即没有 'static 引用或仅具有 'static 引用的类型 (thread::Builder::spawn 和 thread::spawn 都静态地强制执行此属性)

:::





## Trait Implementations



### impl Debug for Builder

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result
```





## Auto Trait Implementations

### impl RefUnwindSafe for Builder

### impl Send for Builder

### impl Sync for Builder

### impl Unpin for Builder

### impl UnwindSafe for Builder



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

