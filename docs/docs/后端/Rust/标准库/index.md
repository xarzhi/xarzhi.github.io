# Crate std

## Rust标准库

Rust 标准库是可移植 Rust 软件的基础，这是一组针对 [更广泛的 Rust 生态系统](https://crates.io/) 的最小且经过实战测试的共享抽象。 它提供了核心类型，例如 [`Vec`](https://www.rustwiki.org.cn/zh-CN/std/vec/struct.Vec.html) 和 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html)，库定义的对 [语言原语](https://www.rustwiki.org.cn/zh-CN/std/index.html#primitives) 的操作，[标准库宏](https://www.rustwiki.org.cn/zh-CN/std/index.html#macros)，[I/O](https://www.rustwiki.org.cn/zh-CN/std/io/index.html) 和 [多线程](https://www.rustwiki.org.cn/zh-CN/std/thread/index.html)，以及许多 [其他](https://www.rustwiki.org.cn/zh-CN/std/index.html#what-is-in-the-standard-library-documentation) 东西。

默认情况下，`std` 可用于所有 Rust crates。因此，可以通过 [`use`](https://www.rustwiki.org.cn/zh-CN/book/ch07-02-defining-modules-to-control-scope-and-privacy.html) 语句使用路径 `std` 来访问标准库，就像在 [`use std::env`](https://www.rustwiki.org.cn/zh-CN/std/env/index.html) 中一样。





## 标准库文档中有什么？

首先，Rust 标准库分为多个重点 [模块](https://www.rustwiki.org.cn/zh-CN/std/index.html#modules)，所有的这些模块都会在本页下方列出。这些模块是所有 Rust 锻造的基础，它们具有强大的名称，如 [`std::slice`](https://www.rustwiki.org.cn/zh-CN/std/slice/index.html) 和 [`std::cmp`](https://www.rustwiki.org.cn/zh-CN/std/cmp/index.html)。 模块的文档通常包括模块的概述和示例，是开始熟悉库的好地方。

其次，此处记录了 [原始类型](https://www.rustwiki.org.cn/zh-CN/book/ch03-02-data-types.html) 上的隐式方法。造成混淆的原因有两个：

1. 虽然原语是由编译器实现的，但标准库是直接在原始类型上实现方法 (而且它是唯一一个这样做的库)。在 [原语](https://www.rustwiki.org.cn/zh-CN/std/index.html#primitives) 部分中对此进行了说明。
2. 标准库导出了许多模块，这些模块的名称和原始类型的名称相同。它们定义了与原始类型有关的其他项，但没有定义所有重要的方法。

例如，有一个 [原始类型为 `i32`](https://www.rustwiki.org.cn/zh-CN/std/primitive.i32.html) 的页面列出了可以调用的所有方法 32 位整数 (非常有用)，并且有一个 [`std::i32` 模块的页面](https://www.rustwiki.org.cn/zh-CN/std/i32/index.html) 记录了常量值 [`MIN`](https://www.rustwiki.org.cn/zh-CN/std/i32/constant.MIN.html) 和 [`MAX`](https://www.rustwiki.org.cn/zh-CN/std/i32/constant.MAX.html) (很少有用)。

请注意原始 [`str`](https://www.rustwiki.org.cn/zh-CN/std/primitive.str.html) 和 [`[T\]`](https://www.rustwiki.org.cn/zh-CN/std/primitive.slice.html) (也称为 ‘slice’) 的文档。[`String`](https://www.rustwiki.org.cn/zh-CN/std/string/struct.String.html) 和 [`Vec`](https://www.rustwiki.org.cn/zh-CN/std/vec/struct.Vec.html) 上许多方法的调用实际上都是通过 [解引用强制多态](https://www.rustwiki.org.cn/zh-CN/book/ch15-02-deref.html#implicit-deref-coercions-with-functions-and-methods) 分别对 [`str`](https://www.rustwiki.org.cn/zh-CN/std/primitive.str.html) 和 [`[T\]`](https://www.rustwiki.org.cn/zh-CN/std/primitive.slice.html) 上的方法的调用。

第三，标准库还定义了 Rust [Prelude](https://www.rustwiki.org.cn/zh-CN/std/prelude/index.html)，这是一小部分项目 - 主要是 traits - 导入到每个 crate 的每个模块中。 prelude 中的 traits 无处不在，这使 prelude 文档成为了解该库的一个很好的切入点。

最后，标准库导出了许多标准宏，并且在 [此页面](https://www.rustwiki.org.cn/zh-CN/std/index.html#macros) 上列出了它们 (从技术上讲，并不是所有的标准宏都由标准库定义的 - 有些是由编译器定义的 - 但它们在这里的文档是相同的)。

与 prelude 一样，默认情况下会将标准宏导入到所有 crates 中。



## Rust 标准库之旅

crate 文档的其余部分致力于指出 Rust 标准库的显著特性。

### 容器和集合

[`option`](https://www.rustwiki.org.cn/zh-CN/std/option/index.html) 和 [`result`](https://www.rustwiki.org.cn/zh-CN/std/result/index.html) 模块定义了可选和错误处理类型 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 和 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html)。[`iter`](https://www.rustwiki.org.cn/zh-CN/std/iter/index.html) 模块定义了 Rust 的迭代器 [`Iterator`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html) trait，它与 [`for`](https://www.rustwiki.org.cn/zh-CN/book/ch03-05-control-flow.html#looping-through-a-collection-with-for) 循环一起工作来访问集合。

标准库公开了三种处理连续内存区域的常用方法：

- [`Vec`](https://www.rustwiki.org.cn/zh-CN/std/vec/struct.Vec.html) - 在运行时可调整大小的堆分配的 *vector*。
- [`[T; N\]`](https://www.rustwiki.org.cn/zh-CN/std/primitive.array.html) - 在编译时具有固定大小的内联数组。
- [`[T\]`](https://www.rustwiki.org.cn/zh-CN/std/primitive.slice.html) - 一个动态大小的*切片*放入到任何其他类型的连续存储中，无论是否为堆分配。

切片只能通过某种 *指针* 来处理，因此具有多种形式，例如：

- `&[T]`- *共享切片*
- `&mut [T]`- *可变切片*
- [`Box<[T\]>`](https://www.rustwiki.org.cn/zh-CN/std/boxed/index.html) - *拥有所有权的切片*

[`str`](https://www.rustwiki.org.cn/zh-CN/std/primitive.str.html)，一个 UTF-8 字符串切片，是一种原始类型，标准库为它定义了很多方法。Rust [`str`](https://www.rustwiki.org.cn/zh-CN/std/primitive.str.html) 通常作为不可变引用来访问: `&str`。使用拥有所有权的 [`String`](https://www.rustwiki.org.cn/zh-CN/std/string/struct.String.html) 来创建和修改字符串。

要转换为字符串，请使用 [`format!`](https://www.rustwiki.org.cn/zh-CN/std/macro.format.html) 宏; 要从字符串转换，请使用 [`FromStr`](https://www.rustwiki.org.cn/zh-CN/std/str/trait.FromStr.html) trait。

可以通过将数据放在引用计数的 Box 或 [`Rc`](https://www.rustwiki.org.cn/zh-CN/std/rc/struct.Rc.html) 类型中来共享数据，并且，如果进一步包含在 [`Cell`](https://www.rustwiki.org.cn/zh-CN/std/cell/struct.Cell.html) 或 [`RefCell`](https://www.rustwiki.org.cn/zh-CN/std/cell/struct.RefCell.html) 中，则可以对其进行可变的和共享。 同样，在并发设置中，通常将原子引用计数的 Box [`Arc`](https://www.rustwiki.org.cn/zh-CN/std/sync/struct.Arc.html) 与 [`Mutex`](https://www.rustwiki.org.cn/zh-CN/std/sync/struct.Mutex.html) 配合以获得相同的效果。

[`collections`](https://www.rustwiki.org.cn/zh-CN/std/collections/index.html) 模块定义了 Map，Set，链表和其他典型的集合类型，包括常见的 [`HashMap`](https://www.rustwiki.org.cn/zh-CN/std/collections/hash_map/struct.HashMap.html)。



### 平台抽象和 I/O

除了基本的数据类型外，标准库还主要关注对通用平台差异的抽象 (尤其是 Windows 和 Unix 派生平台)。

I/O 的常见类型，包括 [files](https://www.rustwiki.org.cn/zh-CN/std/fs/struct.File.html)、[TCP](https://www.rustwiki.org.cn/zh-CN/std/net/struct.TcpStream.html) 和 [UDP](https://www.rustwiki.org.cn/zh-CN/std/net/struct.UdpSocket.html)，在 [`io`](https://www.rustwiki.org.cn/zh-CN/std/io/index.html)、[`fs`](https://www.rustwiki.org.cn/zh-CN/std/fs/index.html) 和 [`net`](https://www.rustwiki.org.cn/zh-CN/std/net/index.html) 模块中定义。

[`thread`](https://www.rustwiki.org.cn/zh-CN/std/thread/index.html) 模块包含了 Rust 的线程抽象。[`sync`](https://www.rustwiki.org.cn/zh-CN/std/sync/index.html) 包含更多的原始共享内存类型，包括 [`atomic`](https://www.rustwiki.org.cn/zh-CN/std/sync/atomic/index.html) 和 [`mpsc`](https://www.rustwiki.org.cn/zh-CN/std/sync/mpsc/index.html)，其中包含用于消息传递的通道类型。





## [Primitive Types](https://www.rustwiki.org.cn/zh-CN/std/index.html#primitives)

- [never](https://www.rustwiki.org.cn/zh-CN/std/primitive.never.html)Experimental：`!` 类型，也称为 “never”。
- [array](https://www.rustwiki.org.cn/zh-CN/std/primitive.array.html)：一个固定大小的数组，表示为 `[T; N]`，用于元素类型 `T` 和非负编译时常量大小 `N`。
- [bool](https://www.rustwiki.org.cn/zh-CN/std/primitive.bool.html)：布尔类型。
- [char](https://www.rustwiki.org.cn/zh-CN/std/primitive.char.html)：一个字符类型。
- [f32](https://www.rustwiki.org.cn/zh-CN/std/primitive.f32.html)：32 位浮点类型 (特别是 IEEE 754-2008 中定义的 “binary32” 类型)。
- [f64](https://www.rustwiki.org.cn/zh-CN/std/primitive.f64.html)：64 位浮点类型 (特别是 IEEE 754-2008 中定义的 “binary64” 类型)。
- [fn](https://www.rustwiki.org.cn/zh-CN/std/primitive.fn.html)：函数指针，例如 `fn(usize) -> bool`。
- [i8](https://www.rustwiki.org.cn/zh-CN/std/primitive.i8.html)：8 位带符号整数类型。
- [i16](https://www.rustwiki.org.cn/zh-CN/std/primitive.i16.html)：16 位带符号整数类型。
- [i32](https://www.rustwiki.org.cn/zh-CN/std/primitive.i32.html)32 位带符号整数类型。
- [i64](https://www.rustwiki.org.cn/zh-CN/std/primitive.i64.html)：64 位带符号整数类型。
- [i128](https://www.rustwiki.org.cn/zh-CN/std/primitive.i128.html)：128 位带符号整数类型。
- [isize](https://www.rustwiki.org.cn/zh-CN/std/primitive.isize.html)：指针大小的有符号整数类型。
- [pointer](https://www.rustwiki.org.cn/zh-CN/std/primitive.pointer.html)：原始的、不安全的指针 `*const T` 和 `*mut T`。
- [reference](https://www.rustwiki.org.cn/zh-CN/std/primitive.reference.html)：参考，`&T` 和 `&mut T`。
- [slice](https://www.rustwiki.org.cn/zh-CN/std/primitive.slice.html)：一个动态大小的视图到一个连续的序列，`[T]`。 这里的连续意味着元素的布局应使每个元素与其相邻元素之间的距离相同。
- [str](https://www.rustwiki.org.cn/zh-CN/std/primitive.str.html)：字符串切片。
- [tuple](https://www.rustwiki.org.cn/zh-CN/std/primitive.tuple.html)：一个有限异构序列，`(T, U, ..)`。
- [u8](https://www.rustwiki.org.cn/zh-CN/std/primitive.u8.html)：8 位无符号整数类型。
- [u16](https://www.rustwiki.org.cn/zh-CN/std/primitive.u16.html)：16 位无符号整数类型。
- [u32](https://www.rustwiki.org.cn/zh-CN/std/primitive.u32.html)：32 位无符号整数类型。
- [u64](https://www.rustwiki.org.cn/zh-CN/std/primitive.u64.html)：64 位无符号整数类型。
- [u128](https://www.rustwiki.org.cn/zh-CN/std/primitive.u128.html)：128 位无符号整数类型。
- [unit](https://www.rustwiki.org.cn/zh-CN/std/primitive.unit.html)：`()` 类型，也称为 “unit”。
- [usize](https://www.rustwiki.org.cn/zh-CN/std/primitive.usize.html)：指针大小的无符号整数类型。



## [Modules](https://www.rustwiki.org.cn/zh-CN/std/index.html#modules)

- [assert_matches](https://www.rustwiki.org.cn/zh-CN/std/assert_matches/index.html)Experimental：Unstable 模块包含不稳定的 `assert_matches` 宏。
- [async_iter](https://www.rustwiki.org.cn/zh-CN/std/async_iter/index.html)Experimental：可组合的异步迭代。
- [intrinsics](https://www.rustwiki.org.cn/zh-CN/std/intrinsics/index.html)Experimental：编译器内部函数。
- [simd](https://www.rustwiki.org.cn/zh-CN/std/simd/index.html)Experimental：便携式 SIMD 模块。
- [alloc](https://www.rustwiki.org.cn/zh-CN/std/alloc/index.html)：内存分配 API。
- [any](https://www.rustwiki.org.cn/zh-CN/std/any/index.html)：用于动态类型或类型反射的实用工具。
- [arch](https://www.rustwiki.org.cn/zh-CN/std/arch/index.html)：SIMD 和供应商内部功能模块。
- [array](https://www.rustwiki.org.cn/zh-CN/std/array/index.html)：数组原始类型的实用工具。
- [ascii](https://www.rustwiki.org.cn/zh-CN/std/ascii/index.html)：对 ASCII 字符串和字符的操作。
- [backtrace](https://www.rustwiki.org.cn/zh-CN/std/backtrace/index.html)：支持捕获 OS 线程的栈回溯
- [borrow](https://www.rustwiki.org.cn/zh-CN/std/borrow/index.html)：用于处理借用数据的模块。
- [boxed](https://www.rustwiki.org.cn/zh-CN/std/boxed/index.html)：用于堆分配的 `Box<T>` 类型。
- [cell](https://www.rustwiki.org.cn/zh-CN/std/cell/index.html)：可共享的可变容器。
- [char](https://www.rustwiki.org.cn/zh-CN/std/char/index.html)：`char` 原始类型的实用工具。
- [clone](https://www.rustwiki.org.cn/zh-CN/std/clone/index.html)：不能隐式复制的类型的 `Clone` trait。
- [cmp](https://www.rustwiki.org.cn/zh-CN/std/cmp/index.html)：用于比较和排序值的实用工具。
- [collections](https://www.rustwiki.org.cn/zh-CN/std/collections/index.html)：集合类型。
- [convert](https://www.rustwiki.org.cn/zh-CN/std/convert/index.html)：用于类型之间的转换 traits。
- [default](https://www.rustwiki.org.cn/zh-CN/std/default/index.html)：`Default` trait 用于具有默认值的类型。
- [env](https://www.rustwiki.org.cn/zh-CN/std/env/index.html)：检查和操作进程的环境。
- [error](https://www.rustwiki.org.cn/zh-CN/std/error/index.html)：处理错误的接口。
- [f32](https://www.rustwiki.org.cn/zh-CN/std/f32/index.html)：`f32` 单精度浮点类型的常量。
- [f64](https://www.rustwiki.org.cn/zh-CN/std/f64/index.html)：`f64` 双精度浮点类型的常量。
- [ffi](https://www.rustwiki.org.cn/zh-CN/std/ffi/index.html)：与 FFI 绑定有关的实用工具。
- [fmt](https://www.rustwiki.org.cn/zh-CN/std/fmt/index.html)：用于格式化和打印 `String`s 的实用工具。
- [fs](https://www.rustwiki.org.cn/zh-CN/std/fs/index.html)：文件系统操作
- [future](https://www.rustwiki.org.cn/zh-CN/std/future/index.html)：异步基本功能。
- [hash](https://www.rustwiki.org.cn/zh-CN/std/hash/index.html)：通用哈希支持。
- [hint](https://www.rustwiki.org.cn/zh-CN/std/hint/index.html)：对编译器的提示，该提示会影响应如何发出或优化代码。 提示可能是编译时或运行时。
- [i8](https://www.rustwiki.org.cn/zh-CN/std/i8/index.html)Deprecation planned：[`i8` primitive type](https://www.rustwiki.org.cn/zh-CN/std/primitive.i8.html) 的冗余常量模块。
- [i16](https://www.rustwiki.org.cn/zh-CN/std/i16/index.html)Deprecation planned：[`i16` primitive type](https://www.rustwiki.org.cn/zh-CN/std/primitive.i16.html) 的冗余常量模块。
- [i32](https://www.rustwiki.org.cn/zh-CN/std/i32/index.html)Deprecation planned：[`i32` primitive type](https://www.rustwiki.org.cn/zh-CN/std/primitive.i32.html) 的冗余常量模块。
- [i64](https://www.rustwiki.org.cn/zh-CN/std/i64/index.html)Deprecation planned：[`i64` primitive type](https://www.rustwiki.org.cn/zh-CN/std/primitive.i64.html) 的冗余常量模块。
- [i128](https://www.rustwiki.org.cn/zh-CN/std/i128/index.html)Deprecation planned：[`i128` primitive type](https://www.rustwiki.org.cn/zh-CN/std/primitive.i128.html) 的冗余常量模块。
- [io](https://www.rustwiki.org.cn/zh-CN/std/io/index.html)：核心 I/O 功能的 Traits，帮助程序和类型定义。
- [isize](https://www.rustwiki.org.cn/zh-CN/std/isize/index.html)Deprecation planned：[`isize` primitive type](https://www.rustwiki.org.cn/zh-CN/std/primitive.isize.html) 的冗余常量模块。
- [iter](https://www.rustwiki.org.cn/zh-CN/std/iter/index.html)：可组合的外部迭代。
- [marker](https://www.rustwiki.org.cn/zh-CN/std/marker/index.html)：代表类型基本属性的原始 traits 和类型。
- [mem](https://www.rustwiki.org.cn/zh-CN/std/mem/index.html)：处理内存的基本函数。
- [net](https://www.rustwiki.org.cn/zh-CN/std/net/index.html)：TCP/UDP 通信的网络原语。
- [num](https://www.rustwiki.org.cn/zh-CN/std/num/index.html)：数字的附加功能。
- [ops](https://www.rustwiki.org.cn/zh-CN/std/ops/index.html)：可重载的运算符。
- [option](./option/index)：可选值。
- [os](https://www.rustwiki.org.cn/zh-CN/std/os/index.html)：特定于操作系统的功能。
- [panic](https://www.rustwiki.org.cn/zh-CN/std/panic/index.html)：标准库中的 Panic 支持。
- [path](https://www.rustwiki.org.cn/zh-CN/std/path/index.html)：跨平台路径操作。
- [pin](https://www.rustwiki.org.cn/zh-CN/std/pin/index.html)：键入将数据固定到其在内存中的位置的类型。
- [prelude](https://www.rustwiki.org.cn/zh-CN/std/prelude/index.html)：Rust Prelude
- [primitive](https://www.rustwiki.org.cn/zh-CN/std/primitive/index.html)：此模块重导出原始类型，以允许使用可能不会被其他声明的类型隐藏的类型。
- [process](https://www.rustwiki.org.cn/zh-CN/std/process/index.html)：用于处理进程的模块。
- [ptr](https://www.rustwiki.org.cn/zh-CN/std/ptr/index.html)：通过裸指针手动管理内存。
- [rc](https://www.rustwiki.org.cn/zh-CN/std/rc/index.html)：单线程引用计数指针。`Rc` 代表引用计数。
- [result](https://www.rustwiki.org.cn/zh-CN/std/result/index.html)：`Result` 类型的错误处理。
- [slice](https://www.rustwiki.org.cn/zh-CN/std/slice/index.html)：切片原始类型的实用工具。
- [str](https://www.rustwiki.org.cn/zh-CN/std/str/index.html)：`str` 原始类型的实用工具。
- [string](https://www.rustwiki.org.cn/zh-CN/std/string/index.html)：一个 UTF-8 编码的可增长字符串。
- [sync](https://www.rustwiki.org.cn/zh-CN/std/sync/index.html)：有用的同步原语。
- [task](https://www.rustwiki.org.cn/zh-CN/std/task/index.html)：类型和 Traits 用于处理异步任务。
- [thread](https://www.rustwiki.org.cn/zh-CN/std/thread/index.html)：原生线程。
- [time](https://www.rustwiki.org.cn/zh-CN/std/time/index.html)：时间量化。
- [u8](https://www.rustwiki.org.cn/zh-CN/std/u8/index.html)Deprecation planned：[`u8` primitive type](https://www.rustwiki.org.cn/zh-CN/std/primitive.u8.html) 的冗余常量模块。
- [u16](https://www.rustwiki.org.cn/zh-CN/std/u16/index.html)Deprecation planned：[`u16` primitive type](https://www.rustwiki.org.cn/zh-CN/std/primitive.u16.html) 的冗余常量模块。
- [u32](https://www.rustwiki.org.cn/zh-CN/std/u32/index.html)Deprecation planned：[`u32` primitive type](https://www.rustwiki.org.cn/zh-CN/std/primitive.u32.html) 的冗余常量模块。
- [u64](https://www.rustwiki.org.cn/zh-CN/std/u64/index.html)Deprecation planned：[`u64` primitive type](https://www.rustwiki.org.cn/zh-CN/std/primitive.u64.html) 的冗余常量模块。
- [u128](https://www.rustwiki.org.cn/zh-CN/std/u128/index.html)Deprecation planned：[`u128` primitive type](https://www.rustwiki.org.cn/zh-CN/std/primitive.u128.html) 的冗余常量模块。
- [usize](https://www.rustwiki.org.cn/zh-CN/std/usize/index.html)Deprecation planned：[`usize` primitive type](https://www.rustwiki.org.cn/zh-CN/std/primitive.usize.html) 的冗余常量模块。
- [vec](https://www.rustwiki.org.cn/zh-CN/std/vec/index.html)：具有堆已分配内容的连续可增长数组类型，写为 `Vec<T>`。

## [Macros](https://www.rustwiki.org.cn/zh-CN/std/index.html#macros)

- [concat_bytes](https://www.rustwiki.org.cn/zh-CN/std/macro.concat_bytes.html)Experimental：将字面量连接成字节切片。
- [concat_idents](https://www.rustwiki.org.cn/zh-CN/std/macro.concat_idents.html)Experimental：将标识符串联为一个标识符。
- [const_format_args](https://www.rustwiki.org.cn/zh-CN/std/macro.const_format_args.html)Experimental：与 [`format_args`](https://www.rustwiki.org.cn/zh-CN/std/macro.format_args.html) 相同，但可以在某些 const 上下文中使用。
- [format_args_nl](https://www.rustwiki.org.cn/zh-CN/std/macro.format_args_nl.html)Experimental：与 [`format_args`](https://www.rustwiki.org.cn/zh-CN/std/macro.format_args.html) 相同，但最后添加了一个换行符。
- [log_syntax](https://www.rustwiki.org.cn/zh-CN/std/macro.log_syntax.html)Experimental：将传递的 tokens 打印到标准输出中。
- [trace_macros](https://www.rustwiki.org.cn/zh-CN/std/macro.trace_macros.html)Experimental：启用或禁用用于调试其他宏的跟踪功能。
- [assert](https://www.rustwiki.org.cn/zh-CN/std/macro.assert.html)：声明在运行时布尔表达式为 `true`。
- [assert_eq](https://www.rustwiki.org.cn/zh-CN/std/macro.assert_eq.html)：断言两个表达式彼此相等 (使用 [`PartialEq`](https://www.rustwiki.org.cn/zh-CN/std/cmp/trait.PartialEq.html))。
- [assert_ne](https://www.rustwiki.org.cn/zh-CN/std/macro.assert_ne.html)：断言两个表达式彼此不相等 (使用 [`PartialEq`](https://www.rustwiki.org.cn/zh-CN/std/cmp/trait.PartialEq.html))。
- [cfg](https://www.rustwiki.org.cn/zh-CN/std/macro.cfg.html)：在编译时评估配置标志的布尔组合。
- [column](https://www.rustwiki.org.cn/zh-CN/std/macro.column.html)：扩展到调用它的列号。
- [compile_error](https://www.rustwiki.org.cn/zh-CN/std/macro.compile_error.html)：导致编译失败，并遇到给定的错误消息。
- [concat](https://www.rustwiki.org.cn/zh-CN/std/macro.concat.html)：将字面量串联成一个静态字符串切片。
- [dbg](https://www.rustwiki.org.cn/zh-CN/std/macro.dbg.html)：打印并返回给定表达式的值，以进行快速而肮脏的调试。
- [debug_assert](https://www.rustwiki.org.cn/zh-CN/std/macro.debug_assert.html)：声明在运行时布尔表达式为 `true`。
- [debug_assert_eq](https://www.rustwiki.org.cn/zh-CN/std/macro.debug_assert_eq.html)：断言两个表达式彼此相等。
- [debug_assert_ne](https://www.rustwiki.org.cn/zh-CN/std/macro.debug_assert_ne.html)：断言两个表达式彼此不相等。
- [env](https://www.rustwiki.org.cn/zh-CN/std/macro.env.html)：在编译时检查环境变量。
- [eprint](https://www.rustwiki.org.cn/zh-CN/std/macro.eprint.html)：打印到标准错误。
- [eprintln](https://www.rustwiki.org.cn/zh-CN/std/macro.eprintln.html)：使用换行符打印到标准错误。
- [file](https://www.rustwiki.org.cn/zh-CN/std/macro.file.html)：扩展为调用该文件的文件名。
- [format](https://www.rustwiki.org.cn/zh-CN/std/macro.format.html)：使用运行时表达式的插值创建 `String`。
- [format_args](https://www.rustwiki.org.cn/zh-CN/std/macro.format_args.html)：构造其他字符串格式宏的参数。
- [include](https://www.rustwiki.org.cn/zh-CN/std/macro.include.html)：根据上下文将文件解析为表达式或项。
- [include_bytes](https://www.rustwiki.org.cn/zh-CN/std/macro.include_bytes.html)：包含一个文件作为对字节数组的引用。
- [include_str](https://www.rustwiki.org.cn/zh-CN/std/macro.include_str.html)：包含 UTF-8 编码的文件作为字符串。
- [is_x86_feature_detected](https://www.rustwiki.org.cn/zh-CN/std/macro.is_x86_feature_detected.html)x86 or x86-64：一个在运行时测试 x86/x86-64 平台上是否具有 CPU 特性的宏。
- [line](https://www.rustwiki.org.cn/zh-CN/std/macro.line.html)：扩展为在其上被调用的行号。
- [matches](https://www.rustwiki.org.cn/zh-CN/std/macro.matches.html)：返回给定表达式是否与任何给定模式匹配。
- [module_path](https://www.rustwiki.org.cn/zh-CN/std/macro.module_path.html)：扩展为代表当前模块路径的字符串。
- [option_env](https://www.rustwiki.org.cn/zh-CN/std/macro.option_env.html)：(可选) 在编译时检查环境变量。
- [panic](https://www.rustwiki.org.cn/zh-CN/std/macro.panic.html)：让当前线程 panics。
- [print](https://www.rustwiki.org.cn/zh-CN/std/macro.print.html)：打印到标准输出。
- [println](https://www.rustwiki.org.cn/zh-CN/std/macro.println.html)：使用换行符打印到标准输出。
- [stringify](https://www.rustwiki.org.cn/zh-CN/std/macro.stringify.html)：对其参数进行字符串化。
- [thread_local](https://www.rustwiki.org.cn/zh-CN/std/macro.thread_local.html)：声明一个新的 [`std::thread::LocalKey`](https://www.rustwiki.org.cn/zh-CN/std/thread/struct.LocalKey.html) 类型的线程本地存储密钥。
- [todo](https://www.rustwiki.org.cn/zh-CN/std/macro.todo.html)：表示未完成的代码。
- [try](https://www.rustwiki.org.cn/zh-CN/std/macro.try.html)Deprecated：解开结果或传播其错误。
- [unimplemented](https://www.rustwiki.org.cn/zh-CN/std/macro.unimplemented.html)：通过 panic 并带有 “not implemented” 的消息来指示未实现的代码。
- [unreachable](https://www.rustwiki.org.cn/zh-CN/std/macro.unreachable.html)：表示无法访问的代码。
- [vec](https://www.rustwiki.org.cn/zh-CN/std/macro.vec.html)：创建一个包含参数的 [`Vec`](https://www.rustwiki.org.cn/zh-CN/std/vec/struct.Vec.html)。
- [write](https://www.rustwiki.org.cn/zh-CN/std/macro.write.html)：将格式化的数据写入缓冲区。
- [writeln](https://www.rustwiki.org.cn/zh-CN/std/macro.writeln.html)：将格式化的数据写入到缓冲区，并追加一个换行符。

## [Keywords](https://www.rustwiki.org.cn/zh-CN/std/index.html#keywords)

- [SelfTy](https://www.rustwiki.org.cn/zh-CN/std/keyword.SelfTy.html)：[`trait`](https://www.rustwiki.org.cn/zh-CN/std/keyword.trait.html) 或 [`impl`](https://www.rustwiki.org.cn/zh-CN/std/keyword.impl.html) 块中的实现类型，或类型定义中的当前类型。
- [as](https://www.rustwiki.org.cn/zh-CN/std/keyword.as.html)：在类型之间进行转换，或重命名导入。
- [async](https://www.rustwiki.org.cn/zh-CN/std/keyword.async.html)：返回 [`Future`](https://www.rustwiki.org.cn/zh-CN/std/future/trait.Future.html)，而不是阻塞当前线程。
- [await](https://www.rustwiki.org.cn/zh-CN/std/keyword.await.html)：暂停执行，直到 [`Future`](https://www.rustwiki.org.cn/zh-CN/std/future/trait.Future.html) 的结果准备就绪为止。
- [break](https://www.rustwiki.org.cn/zh-CN/std/keyword.break.html)：从循环中提前退出。
- [const](https://www.rustwiki.org.cn/zh-CN/std/keyword.const.html)：编译时常量、编译时可评估函数和裸指针。
- [continue](https://www.rustwiki.org.cn/zh-CN/std/keyword.continue.html)：跳到循环的下一个迭代。
- [crate](https://www.rustwiki.org.cn/zh-CN/std/keyword.crate.html)：Rust 二进制或库。
- [dyn](https://www.rustwiki.org.cn/zh-CN/std/keyword.dyn.html)：`dyn` 是 [trait 对象](https://www.rustwiki.org.cn/zh-CN/book/ch17-02-trait-objects.html) 类型的前缀。
- [else](https://www.rustwiki.org.cn/zh-CN/std/keyword.else.html)：[`if`](https://www.rustwiki.org.cn/zh-CN/std/keyword.if.html) 条件评估为 [`false`](https://www.rustwiki.org.cn/zh-CN/std/keyword.false.html) 时要评估的表达式。
- [enum](https://www.rustwiki.org.cn/zh-CN/std/keyword.enum.html)：一种类型，可以是几种变体中的任何一种。
- [extern](https://www.rustwiki.org.cn/zh-CN/std/keyword.extern.html)：链接到或导入外部代码。
- [false](https://www.rustwiki.org.cn/zh-CN/std/keyword.false.html)：[`bool`](https://www.rustwiki.org.cn/zh-CN/std/primitive.bool.html) 类型的值，表示逻辑 **false**。
- [fn](https://www.rustwiki.org.cn/zh-CN/std/keyword.fn.html)：一个函数或函数指针。
- [for](https://www.rustwiki.org.cn/zh-CN/std/keyword.for.html)：使用 [`in`](https://www.rustwiki.org.cn/zh-CN/std/keyword.in.html) 进行迭代，使用 [`impl`](https://www.rustwiki.org.cn/zh-CN/std/keyword.impl.html) 或 [更高等级的 trait bounds](https://www.rustwiki.org.cn/zh-CN/reference/trait-bounds.html#higher-ranked-trait-bounds) (`for<'a>`) 实现 trait。
- [if](https://www.rustwiki.org.cn/zh-CN/std/keyword.if.html)：如果条件成立，则评估一个块。
- [impl](https://www.rustwiki.org.cn/zh-CN/std/keyword.impl.html)：为类型实现一些功能。
- [in](https://www.rustwiki.org.cn/zh-CN/std/keyword.in.html)：使用 [`for`](https://www.rustwiki.org.cn/zh-CN/std/keyword.for.html) 迭代一系列值。
- [let](https://www.rustwiki.org.cn/zh-CN/std/keyword.let.html)：将值绑定到变量。
- [loop](https://www.rustwiki.org.cn/zh-CN/std/keyword.loop.html)：无限循环。
- [match](https://www.rustwiki.org.cn/zh-CN/std/keyword.match.html)：基于模式匹配的控制流。
- [mod](https://www.rustwiki.org.cn/zh-CN/std/keyword.mod.html)：将代码整理到 [模块](https://www.rustwiki.org.cn/zh-CN/reference/items/modules.html) 中。
- [move](https://www.rustwiki.org.cn/zh-CN/std/keyword.move.html)：按值捕获 [闭包](https://www.rustwiki.org.cn/zh-CN/book/ch13-01-closures.html) 的环境。
- [mut](https://www.rustwiki.org.cn/zh-CN/std/keyword.mut.html)：可变变量，引用或指针。
- [pub](https://www.rustwiki.org.cn/zh-CN/std/keyword.pub.html)：使项对其他人可见。
- [ref](https://www.rustwiki.org.cn/zh-CN/std/keyword.ref.html)：在模式匹配期间通过引用绑定。
- [return](https://www.rustwiki.org.cn/zh-CN/std/keyword.return.html)：从函数返回一个值。
- [self](https://www.rustwiki.org.cn/zh-CN/std/keyword.self.html)：方法的接收者，或当前模块。
- [static](https://www.rustwiki.org.cn/zh-CN/std/keyword.static.html)：静态项是在程序的整个持续时间内有效的值 (`'static` 生命周期)。
- [struct](https://www.rustwiki.org.cn/zh-CN/std/keyword.struct.html)：由其他类型组成的类型。
- [super](https://www.rustwiki.org.cn/zh-CN/std/keyword.super.html)：当前 [模块](https://www.rustwiki.org.cn/zh-CN/reference/items/modules.html) 的父级。
- [trait](https://www.rustwiki.org.cn/zh-CN/std/keyword.trait.html)：一组类型的通用接口。
- [true](https://www.rustwiki.org.cn/zh-CN/std/keyword.true.html)：[`bool`](https://www.rustwiki.org.cn/zh-CN/std/primitive.bool.html) 类型的值，表示逻辑 `true`。
- [type](https://www.rustwiki.org.cn/zh-CN/std/keyword.type.html)：为现有类型定义别名。
- [union](https://www.rustwiki.org.cn/zh-CN/std/keyword.union.html)：[Rust 等价于 c 风格的 union](https://www.rustwiki.org.cn/zh-CN/reference/items/unions.html)。
- [unsafe](https://www.rustwiki.org.cn/zh-CN/std/keyword.unsafe.html)：类型系统无法验证其 [内存安全](https://www.rustwiki.org.cn/zh-CN/book/ch19-01-unsafe-rust.html) 的代码或接口。
- [use](https://www.rustwiki.org.cn/zh-CN/std/keyword.use.html)：从其他 crates 或模块导入或重命名项。
- [where](https://www.rustwiki.org.cn/zh-CN/std/keyword.where.html)：添加使用项必须坚持的约束。
- [while](https://www.rustwiki.org.cn/zh-CN/std/keyword.while.html)：保持条件时循环播放。