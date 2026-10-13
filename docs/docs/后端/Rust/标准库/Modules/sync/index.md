# Module std::sync

有用的同步原语



## 需求同步

从概念上讲，Rust 程序是将在计算机上执行的一系列操作。程序中发生的事件的时间线与代码中操作的顺序一致。

考虑下面的代码，对某些静态变量进行操作：

```rust
static mut A: u32 = 0;
static mut B: u32 = 0;
static mut C: u32 = 0;

fn main() {
    unsafe {
        A = 3;
        B = 4;
        A = A + B;
        C = B;
        println!("{A} {B} {C}");
        C = A;
    }
}
```

似乎存储在存储器中的某些变量已更改，执行了加法运算，结果存储在 `A` 中，并且变量 `C` 被修改了两次。

当仅涉及单个线程时，结果如预期的那样： `7 4 4` 行被打印。

至于幕后发生的情况，启用优化后，最终生成的机器代码可能看起来与代码有很大不同：

- `C` 的第一个存储区可能在存储区移至 `A` 或 `B` 之前已被移至 *as if*。
- 可以删除 `A + B` 到 `A` 的分配，因为总和可以存储在一个临时位置，直到打印出来为止，并且变量永远不会更新。
- 最终结果可以仅通过在编译时查看代码来确定，因此 [常量合并](https://en.wikipedia.org/wiki/Constant_folding) 可能会将整个块变成一个简单的 `println!("7 4 4")`。

只要最终的优化代码在执行时产生的结果与没有优化的结果相同，编译器就可以执行这些优化的任何组合。

由于现代计算机中使用了 [并发](https://en.wikipedia.org/wiki/Concurrency_(computer_science))，因此有关程序执行顺序的假设通常是错误的。 访问全局变量会导致不确定的结果，即使编译器优化被禁用，仍然可能引入同步错误。

请注意，由于 Rust 的安全保证，假设我们在此模块中未使用任何同步原语，则访问 (static) 变量需要 `unsafe` 代码。



## 乱序执行

由于多种原因，指令的执行顺序与我们定义的顺序可以不同：

- **编译器** 重新排序指令：如果编译器可以在较早的时候发出指令，它将尝试这样做。 例如，它可能会在代码块的顶部提升内存负载，以便 CPU 可以从内存中启动 [预取](https://en.wikipedia.org/wiki/Cache_prefetching) 值。

  在单线程方案中，这可能会在编写信号处理程序或某些类型的代码时引起问题。 使用 [编译器栅栏](https://www.rustwiki.org.cn/zh-CN/std/sync/atomic/fn.compiler_fence.html) 来防止这种重新排序。

- 一个单处理器执行指令 [乱序](https://en.wikipedia.org/wiki/Out-of-order_execution)： 现代的 CPU 能够执行 [超标量](https://en.wikipedia.org/wiki/Superscalar_processor)，也就是说，多个指令可能同时执行，即使机器代码描述的是一个顺序过程。

  这种重新排序由 CPU 透明地处理。

- 同时执行多个硬件线程的 **多处理器** 系统：在多线程方案中，可以使用两种原语来处理同步：

  - [内存栅栏](https://www.rustwiki.org.cn/zh-CN/std/sync/atomic/fn.fence.html) 以确保以正确的顺序对其他 CPU 进行内存访问。





## 更高级别的同步对象

大多数底层同步原语都比较容易出错且使用起来不方便，因此标准库也公开了一些更高级别的同步对象。

这些抽象可以由底层原语构建而成。为了提高效率，标准库中的同步对象通常是在操作系统内核的帮助下实现的，内核能够在线程因获取锁而阻塞时重新调度这些线程。

以下是可用同步对象的概述：

- **Arc**：原子引用计数指针，可在多线程环境中使用，以延长某些数据的生命周期，直到所有线程都完成使用该数据为止。
- **Barrier**：确保多个线程在程序执行到某个特定点之前，彼此等待对方执行完毕。
- **Condvar**：条件变量，允许在等待事件发生时阻塞线程。
- **mpsc**：多生产者单消费者队列，用于基于消息的通信。可以提供轻量级的线程间同步机制，但会占用一些额外的内存。
- **mpmc**：多生产者、多消费者队列，用于基于消息的通信。可以提供轻量级的线程间同步机制，但会占用一些额外的内存。
- **Mutex**：互斥机制，确保一次最多只有一个线程能够访问某些数据。
- **Once**：用于线程安全的一次性全局初始化例程。主要用于实现其他类型，例如OnceLock。
- **OnceLock**：用于线程安全的一次性变量初始化，可以根据调用者使用不同的初始化器。
- **LazyLock**：用于线程安全的一次性变量初始化，使用在创建时提供的一个空值初始化函数。
- **RwLock**：提供了一种互斥机制，允许多个读取者同时访问，但一次只允许一个写入者访问。在某些情况下，这比互斥锁更高效。



## Modules

- [**atomic**](./Modules/atomic/index)：原子类型
- [**mpsc**](./Modules/mpsc/index)：多生产者，单消费者 FIFO 队列通信原语。



## Structs

- [**Arc**](./Structs/Arc)：线程安全的引用计数指针。`Arc` 代表原子引用计数。
- [**Barrier**](./Structs/Barrier)：屏障使多个线程能够同步某些计算的开始。
- [**BarrierWaitResult**](./Structs/BarrierWaitResult)：当 `Barrier` 中的所有线程都汇合时，`Barrier::wait()` 将返回 `BarrierWaitResult`。
- [**Condvar**](./Structs/Condvar)：条件变量
- [**Mutex**](./Structs/Mutex)：互斥原语可用于保护共享数据
- [**MutexGuard**](./Structs/MutexGuard)：互斥锁的 “scoped lock” 的 RAII 实现。 当此结构体被丢弃 (离开作用域) 时，这个锁将被解锁。
- [**Once**](./Structs/Once)：同步原语，可用于运行一次性初始化。 对于 FFI 或相关功能的一次性初始化很有用。 该类型只能用 `Once::new()` 构造。
- [**OnceLock**](./Structs/OnceLock)：只能写入一次的同步原语。
- [**OnceState**](./Structs/OnceState)：状态产生于 `Once::call_once_force ()` 的闭包参数。 该状态可用于查询 Once 的中毒状态。
- [**PoisonError**](./Structs/PoisonError)：一种错误类型，每当获取锁时都可以返回该错误。
- [**RwLock**](./Structs/RwLock)：`reader-writer` 锁
- [**RwLockReadGuard**](./Structs/RwLockReadGuard)：RAII 结构，用于在丢弃锁时释放锁的共享读取访问。
- [**RwLockWriteGuard**](./Structs/RwLockWriteGuard)：RAII 结构，用于在锁被丢弃时释放对锁的独占写访问。
- [**WaitTimeoutResult**](./Structs/WaitTimeoutResult)：指示是否因超时而返回的条件变量的定时等待的类型。
- [**Weak**](./Structs/Weak)：Weak 是 Arc 的一个版本，它持有对托管分配的非所有权引用。 通过在 Weak 指针上调用 upgrade 来访问分配，它返回一个 `Option<Arc<T>>`。



## Enums

- **TryLockError**：枚举可能与 `TryLockResult` 相关的错误，这些错误可能是从 `Mutex` 上的 `try_lock` 方法或 `RwLock` 上的 `try_read` 和 `try_write` 方法获取锁时发生的。







## Type Definitions

- **LockResult**：一种类型别名，用于可能导致中毒的锁定方法。
- **TryLockResult**：一种非别名锁定方法结果的类型别名。



### LockResult

```rust
pub type LockResult<Guard> = Result<Guard, PoisonError<Guard>>;
```

一种类型别名，用于可能导致中毒的锁定方法。

此结果的 Ok 变体表示该原语没有中毒，并且其中包含 `Guard`。 Err 变体表示该原语已中毒。 请注意，Err 变体还带有关联的守卫，可以通过 `into_inner` 方法获取它。





### TryLockResult

```rust
pub type TryLockResult<Guard> = Result<Guard, TryLockError<Guard>>;
```

一种非别名锁定方法结果的类型别名。

有关更多信息，请参见 `LockResult`。 `TryLockResult` 不一定持有 Err 类型的相关保护，因为可能由于其他原因没有获得锁。