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

出于识别目的，线程可以有关联的名称。默认情况下，生成的线程是未命名的。要为线程指定名称，请使用 Builder 构建该线程，然后将所需的线程名称传递给 `Builder::name`。 要从线程内检索线程名，请使用 `Thread::name`。 有几个使用线程名称的例子:

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



### available_parallelism

返回程序应该使用的默认并行量的估计值。

并行性是一种资源。给定的机器提供一定的并行能力，即它可以同时执行的计算数量的界限。这个数字通常与计算机拥有的 CPU 数量相对应，但在不同情况下可能会有所不同。

虚拟机或容器编排器等主机环境可能希望限制其中的程序可用的并行量。 这样做通常是为了限制 (非故意地) 资源密集型程序对同一台机器上运行的其他程序的潜在影响。

```rust
pub fn available_parallelism() -> Result<NonZeroUsize>
```

**返回值**：返回一个`Result`，包含`NonZeroUsize`

```rust
use std::{io, thread};

fn main() -> io::Result<()> {
    let count = thread::available_parallelism()?.get();
    assert!(count >= 1_usize);
    Ok(())
}
```

:::tip 局限性

此 API 的目的是提供一种简单且可移植的方式来查询程序应使用的默认并行量。 除其他事项外，它不公开有关 NUMA 区域的信息，不考虑 (协同) 处理器功能或当前系统负载的差异，并且不会为了更准确地查询可用并行度的数量而修改程序的整体状态。

在固定稳态和突发限制都可用的情况下，稳态容量将用于确保更可预测的延迟。

资源限制可以在程序运行时更改，因此该值不会被缓存，而是在每次调用此函数时重新计算。不应从热代码中调用它。

这个函数返回的值应该被认为是任何给定时间可用的实际并行量的简化近似值。 要更详细或更准确地了解程序可用的并行量，您可能还希望使用特定于平台的 API。 以下平台限制目前适用于 `available_parallelism`：

在 Windows 上：

- 它可能会低估具有超过 64 个逻辑 CPU 的系统上可用的并行量。 但是，程序通常需要特定的支持才能利用超过 64 个逻辑 CPU，而在没有这种支持的情况下，此函数返回的数字准确地反映了程序默认可以使用的逻辑 CPU 的数量。
- 它可能会过度计算系统上可用的并行量，这些并行量受到进程范围的相似性屏蔽或作业对象限制的限制。

在 Linux 上：

- 当受进程范围的关联掩码或 cgroup 配额限制并且无法查询 `sched_getaffinity()` 或 cgroup fs (例如由于沙盒) 时，它可能会高估可用的并行量。
- 如果当前线程的关联掩码没有反映进程的 cpuset，例如由于固定线程，它可能会低估并行的数量。
- 如果进程在 cgroup v1 cpu 控制器中，则可能需要扫描挂载点以找到对应的 cgroup v1 控制器，这在具有大量挂载点的系统上可能需要一些时间。 (这不适用于 cgroup v2 或不在 cgroup 中的进程。)

在所有目标上：

- 当在具有 CPU 使用限制的 VM 中运行时 (例如过载的主机)，它可能会过度计算可用的并行量。

:::



:::warning Errors

在以下情况下，此函数将返回错误，但不限于此：

- 如果目标平台的并行量未知。
- 如果程序没有查询可用的并行量的权限。

:::

### current

获取调用它的线程的句柄。

```rust
pub fn current() -> Thread
```

**返回值**：返回一个[Thread](./Structs/Thread)当前线程句柄

```rust
fn main() {
    use std::thread;

    let handler = thread::Builder::new()
        .name("named thread".into())
        .spawn(|| {
            // 获取多线程句柄
            let handle = thread::current();
            println!("{:?}", handle.name()); // Some("named thread")
        })
        .unwrap();

    handler.join().unwrap();

    // 获取主线程句柄
    println!("{:?}", thread::current().name()); // Some("main")
}
```



### panicking

确定当前线程是否由于 panic 而处于展开状态。

此特性的一个常见用途是在编写不安全代码时毒害共享资源，方法是在调用 `drop` 时检查 `panic`。

编写安全代码时通常不需要这样做，因为当线程在持有锁时 panic，[`Mutex`](https://www.rustwiki.org.cn/zh-CN/std/sync/struct.Mutex.html) 已经中毒了。

这也可以在多线程应用程序中使用，以便向其他线程发送消息，警告某个线程已发生 panic (例如，出于监视目的)。

```rust
pub fn panicking() -> bool
```

**返回值**：返回一个bool值，判断当前线程是否由于 panic 而处于展开状态

```rust
use std::thread;

struct SomeStruct;

impl Drop for SomeStruct {
    fn drop(&mut self) {
        if thread::panicking() {
            println!("dropped while unwinding");
        } else {
            println!("dropped while not unwinding");
        }
    }
}

{
    print!("a: ");
    let a = SomeStruct;
}

{
    print!("b: ");
    let b = SomeStruct;
    panic!()
}
```



### park

阻塞线程，除非或直到当前线程的 token 可用为止。

对 `park` 的调用不能保证线程将永远保持驻留状态，因此调用者应为此做好准备。 但是，保证这个函数不会 panic (如果执行遇到一些罕见的错误，它可能会中止进程)。

```rust
pub fn park()
```



:::tip park 和 unpark

每个线程都通过 `thread::park` 函数和 `thread::Thread::unpark` 方法提供了一些基本的阻塞支持。 park 阻塞当前线程，然后可以通过在阻塞线程的句柄上调用 `unpark` 方法从另一个线程恢复当前线程。

从概念上讲，每个 Thread 句柄都有一个关联的 token，该 token 最初不存在：

`thread::park` 函数会阻塞当前线程，除非或直到 token 可用于其线程句柄为止，否则该原子将自动消耗 token。 它也可能虚假地返回，而不消耗 token。 `thread::park_timeout` 执行相同的操作，但允许指定阻塞线程的最长时间。

Thread 上的 unpark 方法原子地使 token (如果尚未提供) 可用。 由于最初不存在 token，因此 unpark 后跟 park 将导致第二个调用立即返回。

换句话说，每个 Thread 的行为都类似于自旋锁，可以使用 park 和 unpark 进行锁定和解锁。

请注意，被取消阻止并不意味着与取消该线程的某个人进行任何同步，这也可能是虚假的。 例如，将 park 和 unpark 都立即返回而无需执行任何操作将是有效但效率低下的实现。

通常通过获取当前线程的句柄，将该句柄放置在共享数据结构体中，以便其他线程可以找到它，然后 park 在循环中来使用该 API。

当满足某些所需条件时，另一个线程将在句柄上调用 unpark。

这种设计的动机是双重的：

在构建新的同步原语时，它无需分配互斥锁和 condvar。线程已经提供了基本的 blocking/signaling。

它可以在许多平台上非常有效地实现。

:::

```rust
use std::thread;
use std::sync::{Arc, atomic::{Ordering, AtomicBool}};
use std::time::Duration;

let flag = Arc::new(AtomicBool::new(false));
let flag2 = Arc::clone(&flag);

let parked_thread = thread::spawn(move || {
    // 我们要等到标志被设置。
    // 我们可以旋转，但是使用 park/unpark 效率更高。
    while !flag2.load(Ordering::Acquire) {
        println!("Parking thread");
        thread::park();
        // 我们可以伪装地到达这里，即在下面的 10ms 结束之前！
        // 但这没问题，我们一直处于循环状态，直到仍然设置了标志。
        println!("Thread unparked");
    }
    println!("Flag received");
});

// 花费一些时间来生成线程。
thread::sleep(Duration::from_millis(10));

// 设置标志，并让线程唤醒。
// 这里没有竞态条件，如果 `unpark` 首先出现，则 `park` 将立即返回。
// 因此，没有死锁的风险。
flag.store(true, Ordering::Release);
println!("Unpark the thread");
parked_thread.thread().unpark();

parked_thread.join().unwrap();
```



### park_timeout

将当前线程阻塞相应的时间

除非直到当前线程的 token 可用或达到指定的持续时间 (否则可能会虚假唤醒)，否则将阻塞。

该函数的语义与 park 等效，除了线程被阻塞的时间不超过 dur。 由于抢占或平台差异等异常情况可能不会导致最长等待时间精确到 dur 长，因此不应将此方法用于精确计时

```rust
pub fn park_timeout(dur: Duration)
```

**参数**：

- **dur**：阻塞的时间

简易定时器

```rust
fn main() {
    use std::thread;
    use std::time::Duration;
    loop {
        println!("{:#?}", 1111);
        thread::park_timeout(Duration::from_secs(1));
    }
}
```



### scope

创建一个生成作用域线程的作用域。

传递给 `scope` 的函数将提供一个 [`Scope`](./Structs/Scope) 对象，通过该对象可以 [生成](./Structs/Scope#spawn) 作用域线程。

与非作用域线程不同，**作用域线程可以借用非 `'static` 的数据**，因为作用域保证所有线程都将在作用域的末尾加入。

在此函数返回之前，在作用域内生成的所有未手动加入的线程将自动加入。

```rust
pub fn scope<'env, F, T>(f: F) -> T
where
    F: for<'scope> FnOnce(&'scope Scope<'scope, 'env>) -> T,
```

**参数**：

- **f**：闭包函数，在此函数中创建多线程可以借用非 `'static` 的数据

```rust
use std::thread;

let mut a = vec![1, 2, 3];
let mut x = 0;

thread::scope(|s| {
    s.spawn(|| {
        println!("hello from the first scoped thread");
        // 我们可以在这里借用 `a`。
        dbg!(&a);
    });
    s.spawn(|| {
        println!("hello from the second scoped thread");
        // 我们甚至可以在这里可变地借用 `x`，因为没有其他线程在使用它。
        x += a[0] + a[2];
    });
    println!("hello from the main thread");
});

// 在作用域之后，我们可以再次修改和访问我们的变量:
a.push(4);
assert_eq!(x, a.len());
```

:::tip

如果任何自动加入的线程发生 panic，则这个函数也会出现 panic。

如果您想处理衍生线程的 panic，请在作用域结束之前 join 它们。

:::



### sleep

使当前线程休眠至少指定的时间。

由于调度细节或平台相关的功能，线程的睡眠时间可能比指定的持续时间更长。它永远不会少睡。

该函数正在阻塞，因此不应在 `async` 函数中使用。

```rust
pub fn sleep(dur: Duration)
```

示例

```rust
use std::{thread, time};

let ten_millis = time::Duration::from_millis(10);
let now = time::Instant::now();

thread::sleep(ten_millis);

assert!(now.elapsed() >= ten_millis);
```

:::tip 特定于平台的行为

在 Unix 平台上，底层的系统调用可能会由于虚假唤醒或信号处理程序而中断。 为了确保至少在指定的持续时间内发生睡眠，此函数可以多次调用该系统。 不支持纳秒级睡眠精度的平台会将 dur 舍入为最接近的睡眠时间粒度。

目前，在 Unix 平台上指定零持续时间会立即返回，而不会调用底层 nanosleep syscall，而在 Windows 平台上，始终调用底层 Sleep syscall。

如果要产生当前时间片，则可能需要使用 yield_now。

:::



### spawn

产生一个新线程，并为其返回一个 [JoinHandle](./Structs/JoinHandle)。

```rust
pub fn spawn<F, T>(f: F) -> JoinHandle<T>
where
    F: FnOnce() -> T + Send + 'static,
    T: Send + 'static,
```

**参数**：

- **f**：闭包函数，多线程需要执行的代码内容

**返回值**：返回一个 [JoinHandle](./Structs/JoinHandle)

:::tip 

连接句柄提供了一个 join 方法，可以用来连接新生成的线程。如果生成的线程发生 panics，那么 join 将返回一个 Err，其中包含了提供给 panic! 的参数。

如果连接句柄被丢弃了，则新生成的线程将被隐式地 分离。 在这种情况下，新生成的线程可能不再被连接。 (程序有责任最终连接它创建的线程，或者将它们分离; 否则，将导致资源泄漏。)

此调用将使用 Builder 的默认参数创建一个线程，如果要指定栈大小或线程名称，请使用此 API。

正如您在 spawn 的签名中看到的那样，对于赋予 spawn 的闭包及其返回值都有两个约束，让我们对其进行解释：

`'static` 约束意味着闭包及其返回值必须具有整个程序执行的生命周期。这是因为线程可以比它们被创建时的生命周期更长。

确实，如果线程以及它的返回值可以比它们的调用者活得更久，我们需要确保它们以后仍然有效，并且因为我们不能知道它什么时候返回，因此需要使它们直到程序结束时尽可能有效，因此是 `'static` 生命周期。

`Send` 约束是因为闭包需要通过值从产生它的线程传递到新线程。它的返回值将需要从新线程传递到它被 join 的线程。 提醒一下，Send 标记 trait 表示从一个线程传递到另一个线程是安全的。Sync 表示将引用从一个线程传递到另一个线程是安全的。

::: 

创建一个线程。

```rust
use std::thread;

let handler = thread::spawn(|| {
    // 线程代码
});

handler.join().unwrap();
```

如模块文档中所述，线程通常是使用 [`channels`](https://www.rustwiki.org.cn/zh-CN/std/sync/mpsc/index.html) 进行通信的，通常情况下是这样的。

此示例还展示了如何使用 `move`，以便将值的所有权授予线程。

```rust
use std::thread;
use std::sync::mpsc::channel;

let (tx, rx) = channel();

let sender = thread::spawn(move || {
    tx.send("Hello, thread".to_owned())
        .expect("Unable to send on channel");
});

let receiver = thread::spawn(move || {
    let value = rx.recv().expect("Unable to receive from channel");
    println!("{value}");
});

sender.join().expect("The sender thread has panicked");
receiver.join().expect("The receiver thread has panicked");
```

一个线程也可以通过 [JoinHandle](./Structs/JoinHandle)来返回一个值，您可以使用它进行异步计算 (不过 futures 可能更合适)。

```rust
use std::thread;

let computation = thread::spawn(|| {
    // 一些昂贵的计算。
    42
});

let result = computation.join().unwrap();
println!("{result}");
```





### yield_now

协同地将时间片交给操作系统调度程序。

```rust
pub fn yield_now()
```

协同地将时间片交给操作系统调度程序。

这会调用底层操作系统调度程序的 yield 原语，表明调用线程愿意放弃其剩余的时间片，以便操作系统可以在 CPU 上调度其他线程。

在循环中让步的一个缺点是，如果操作系统没有任何其他就绪线程在当前 CPU 上运行，该线程将有效地进行忙等待，这会浪费 CPU 时间和精力。

因此，在等待感兴趣的事件时，程序员的首选应该是使用同步设备，例如 channel、Condvar、Mutex 或 join，因为这些原语是以阻塞方式实现，放弃 CPU 直到感兴趣的事件发生，避免重复让步。

因此，yield_now 应该很少使用，主要是在需要重复轮询的情况下，因为没有其他合适的方法可以了解何时发生了感兴趣的事件。

```rust
use std::thread;

thread::yield_now();
```



## Type Definitions

- **Result**：线程专用的 Result 的类型。



### Result

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



