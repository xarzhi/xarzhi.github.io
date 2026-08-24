# Module std::thread

Rust原生线程。

## 线程模型

一个正在执行的 `Rust` 程序由一组原生操作系统线程组成，每个线程都有自己的栈和本地状态。线程可以被命名，并为底层同步提供一些内置支持。

线程之间的通信可以通过 通道、`Rust` 的消息传递类型、以及 其他形式的线程同步 和共享内存数据结构来完成。 特别是，可以使用原子引用计数容器 `Arc` 在线程之间轻松共享保证线程安全的类型。

`Rust` 中的致命逻辑错误导致 线程 `panic`，在此期间，线程将展开栈，运行析构函数并释放所拥有的资源。 尽管不是 `try/catch` 机制，但仍可以使用 `catch_unwind` 捕获 `Rust` 中的 `panics` (除非使用 `panic=abort` 进行编译) 并从中恢复，或者使用 `resume_unwind` 恢复。

如果未捕获到 `panic`，则线程将退出，但是可以选择使用 join 从其他线程中检测到 panic。 如果主线程 panic 而没有捕获 `panic`，应用程序将以非零退出码退出。

当 `Rust` 程序的主线程终止时，整个程序将关闭，即使其他线程仍在运行也不例外。然而，这个模块为自动等待线程终止 (即 `join`) 提供了便利。



## 创建一个线程

可以使用 `thread::spawn` 函数来生成一个新线程：

```rust
use std::thread;

thread::spawn(move || {
    // 这里一些工作
});
```

在此示例中，新建线程是 “detached,”，这意味着程序无法了解新建线程何时完成或以其他方式终止。

要了解线程何时完成，需要捕获调用返回给 spawn 的 JoinHandle 对象，它提供了一个 join 方法，允许调用者等待新建线程的完成：

```rust
use std::thread;

let thread_join_handle = thread::spawn(move || {
    // 这里一些工作
});
// 这里一些工作
let res = thread_join_handle.join();
```

join 方法返回一个 `thread::Result`，其中包含由新建线程生成的最终值的 Ok，或者如果线程 panicked，则返回给 panic! 的调用值的 Err。

请注意，生成新线程的线程与生成的线程之间没有 parent/child 关系。特别是，除非生成线程是主线程，否则新建线程可能会也可能不会比生成线程的生命周期长。



## 配置线程

一个新线程可以在通过 `Builder` 类型生成之前进行配置，目前允许您设置线程的名称和栈大小：

```rust
use std::thread;

thread::Builder::new().name("thread1".to_string()).spawn(move || {
    println!("Hello, world!");
});
```





## Thread的类型

线程是通过 Thread 类型来表示的，您可以通过以下两种方式之一获得该类型：

通过生成一个新线程，例如使用 `thread::spawn` 函数，并在 `JoinHandle` 上调用 `thread`。

通过使用 `thread::current` 函数来请求当前线程。

`thread::current` 函数甚至可用于不是由该模块的 API 生成的线程。



### 线程本地存储

该模块还为 Rust 程序提供了线程本地存储的实现。线程本地存储是一种将数据存储到全局变量的方法，程序中的每个线程都有自己的副本。 线程不共享此数据，因此不需要同步访问。

线程本地键拥有它所包含的值，并在线程退出时销毁该值。它是使用 thread_local! 宏创建的，可以包含 'static 的任何值 (没有借用指针)。 它提供了一个访问器函数 with，该访问器函数产生对指定闭包的值的共享引用。线程本地键只允许共享访问值，因为如果允许可变借用，就无法保证惟一性。 大多数值都希望通过 Cell 或 RefCell 类型使用某种形式的 内部可变性。







### 命名线程

出于识别目的，线程可以有关联的名称。默认情况下，生成的线程是未命名的。要为线程指定名称，请使用 Builder 构建该线程，然后将所需的线程名称传递给 Builder::name。 要从线程内检索线程名，请使用 Thread::name。 有几个使用线程名称的例子:

- 如果在命名线程中出现 panic，则线程名将显示在 panic 消息中。
- 线程名在适用的情况下提供给操作系统 (例如，在类 Unix 平台中为 pthread_setname_np)。



### 栈大小

默认栈大小取决于平台并且可能会发生变化。 目前，在所有 Tier-1 平台上都是 2 MiB。

有两种方法可以手动指定衍生线程的栈大小：

- 使用 Builder 构建线程，并将所需的栈大小传递给 Builder::stack_size。
- 将 RUST_MIN_STACK 环境变量设置为代表所需栈大小 (以字节为单位) 的整数。请注意，设置 Builder::stack_size 将覆盖此设置。请注意，程序启动后可能会忽略对 RUST_MIN_STACK 的更改。

注意，主线程的栈大小不是由 Rust 决定的。



## Structs

- **AccessError**：LocalKey::try_with 返回的错误。
- **Builder**：线程工厂，可用于配置新线程的属性。
- **JoinHandle**：拥有加入线程的权限 (在线程终止时阻止)。
- **LocalKey**：拥有其内容的线程本地存储密钥。
- **Scope**：在其中生成作用域线程的作用域。
- **ScopedJoinHandle**：在作用域线程上加入的拥有权限 (在其终止时阻塞)。
- **Thread**：线程的句柄。
- **ThreadId**：正在运行的线程的唯一标识符。



## Functions

- **available_parallelism**：返回程序应该使用的默认并行量的估计值。
- **current**：获取调用它的线程的句柄。
- **panicking**：确定当前线程是否由于 panic 而处于展开状态。
- **park**：阻塞，除非或直到当前线程的 token 可用为止。
- **park_timeout**：除非直到当前线程的 token 可用或达到指定的持续时间 (否则可能会虚假唤醒)，否则将阻塞。
- **scope**：创建一个生成作用域线程的作用域。
- **sleep**：使当前线程休眠至少指定的时间。
- **spawn**：产生一个新线程，并为其返回一个 JoinHandle。
- **yield_now**：协同地将时间片交给操作系统调度程序。





#### park



## Type Definitions

- **Result**：线程专用的 Result 的类型。



#### Result

线程专用的 Result 的类型。

指示线程退出的方式。

```rust
pub type Result<T> = Result<T, Box<dyn Any + Send + 'static>>;
```

`Result::Err` 变体中包含的值是线程 panic 时使用的值； 也就是说，调用了 `panic!` 宏的参数。 与正常错误不同，此值不实现 `Error` trait。

因此，处理线程 `panic` 的明智方法是：

用 `std::panic::resume_unwind` 传播 `panic`

或者，如果线程是用来隔离系统级故障的子系统边界，则匹配 Err 变体，并以适当的方式处理 `panic`

一个线程在没有 `panic` 的情况下完成被认为是成功退出。

```rust
use std::{fs, thread, panic};

fn copy_in_thread() -> thread::Result<()> {
    thread::spawn(|| {
        fs::copy("foo.txt", "bar.txt").unwrap();
    }).join()
}

fn main() {
    match copy_in_thread() {
        Ok(_) => println!("copy succeeded"),
        Err(e) => panic::resume_unwind(e),
    }
}
```



