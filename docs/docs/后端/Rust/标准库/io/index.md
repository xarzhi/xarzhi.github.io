# std::io

核心 I/O 功能的 Traits，帮助程序和类型定义。

`std::io` 模块包含许多在执行输入和输出时需要的常见操作。 该模块中最核心的部分是 [`Read`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html) 和 [`Write`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html) traits，它们提供用于读取和写入输入和输出的最通用接口。





## 1.Read和Write

`Read`和`Write`是两个`traits`，有许多类型实现了这两个`traits`，我们同样可以给我们自己的类型实现这两个`traits`

这样，您将在此模块的整个文档中看到几种不同类型的 I/O: [`File`](https://www.rustwiki.org.cn/zh-CN/std/fs/struct.File.html)，[`TcpStream`](https://www.rustwiki.org.cn/zh-CN/std/net/struct.TcpStream.html)，有时甚至是 [`Vec`](https://www.rustwiki.org.cn/zh-CN/std/vec/struct.Vec.html)。 例如，[`Read`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html) 添加了 [`read`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html#tymethod.read) 方法，我们可以在 [`File`](https://www.rustwiki.org.cn/zh-CN/std/fs/struct.File.html) 上使用该方法：

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let mut f = File::open("foo.txt")?;
    let mut buffer = [0; 10];

    // 最多读取 10 个字节
    let n = f.read(&mut buffer)?;

    println!("The bytes: {:?}", &buffer[..n]);
    Ok(())
}
```

[`Read`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html) 和 [`Write`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html) 非常重要，两个 traits 的实现者有一个昵称: readers 和 writers。 因此，有时您会看到 `reader` 而不是 `实现 [Read] trait 的类型`。





## 2.Seek和BufRead

除此之外，还提供了两个重要的 **traits**: [`Seek`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Seek.html) 和 [`BufRead`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.BufRead.html)。两者都建立在 reader 的顶部，以控制读取的方式。 [`Seek`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Seek.html) 可让您控制下一个字节的来源：

```rust
use std::io;
use std::io::prelude::*;
use std::io::SeekFrom;
use std::fs::File;

fn main() -> io::Result<()> {
    let mut f = File::open("foo.txt")?;
    let mut buffer = [0; 10];

    // 跳到文件的最后 10 个字节
    f.seek(SeekFrom::End(-10))?;

    // 最多读取 10 个字节
    let n = f.read(&mut buffer)?;

    println!("The bytes: {:?}", &buffer[..n]);
    Ok(())
}
```

[`BufRead`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.BufRead.html) 使用内部缓冲区来提供许多其他读取方式，但为了展示它，我们需要一般地讨论缓冲区。继续阅读！





## 3.BufReader 和 BufWriter

基于字节的接口笨拙且效率低下，因为我们需要对操作系统进行近乎恒定的调用。 为了解决这个问题，`std::io` 带有两个结构体 [`BufReader`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.BufReader.html) 和 [`BufWriter`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.BufWriter.html)，它们包装了 `readers` 和 `writers`。 包装器使用缓冲区，从而减少了调用次数，并提供了更好的方法来访问所需的内容。

例如，[`BufReader`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.BufReader.html) 与 [`BufRead`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.BufRead.html) trait 一起为任何 reader 添加额外的方法：

```rust
use std::io;
use std::io::prelude::*;
use std::io::BufReader;
use std::fs::File;

fn main() -> io::Result<()> {
    let f = File::open("foo.txt")?;
    let mut reader = BufReader::new(f);
    let mut buffer = String::new();

    // 将一行读入缓冲区
    reader.read_line(&mut buffer)?;

    println!("{buffer}");
    Ok(())
}
```

[`BufWriter`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.BufWriter.html) 没有添加任何新的写入方式； 它只是缓冲每个调用到 [`write`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#tymethod.write)：

```rust
use std::io;
use std::io::prelude::*;
use std::io::BufWriter;
use std::fs::File;

fn main() -> io::Result<()> {
    let f = File::create("foo.txt")?;
    {
        let mut writer = BufWriter::new(f);

        // 向缓冲区写入一个字节
        writer.write(&[42])?;

    } // writer 离开作用域后，将刷新缓冲区

    Ok(())
}
```





## 4.标准输入输出

输入的一个非常常见的来源是标准输入：

```rust
use std::io;

fn main() -> io::Result<()> {
    let mut input = String::new();

    io::stdin().read_line(&mut input)?;

    println!("You typed: {}", input.trim());
    Ok(())
}
```

请注意，不能在不返回 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 的函数中使用 [`?` 操作符](https://www.rustwiki.org.cn/zh-CN/book/appendix-02-operators.html)。 相反，您可以在返回值上调用 [`.unwrap()`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.unwrap) 或 `match` 来捕获任何可能的错误：

```rust
use std::io;

let mut input = String::new();

io::stdin().read_line(&mut input).unwrap();
```

标准输出是一个非常常见的输出源：

```rust
use std::io;
use std::io::prelude::*;

fn main() -> io::Result<()> {
    io::stdout().write(&[42])?;
    Ok(())
}
```

当然，直接使用 [`io::stdout`](https://www.rustwiki.org.cn/zh-CN/std/io/fn.stdout.html) 比使用 [`println!`](https://www.rustwiki.org.cn/zh-CN/std/macro.println.html) 少见。



## 5.迭代器类型

`std::io` 提供的大量结构用于在 I/O 上进行迭代的各种方式。例如，[`Lines`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Lines.html) 用于拆分多行：

```rust
use std::io;
use std::io::prelude::*;
use std::io::BufReader;
use std::fs::File;

fn main() -> io::Result<()> {
    let f = File::open("foo.txt")?;
    let reader = BufReader::new(f);

    for line in reader.lines() {
        println!("{}", line?);
    }
    Ok(())
}
```





## 6.Functions

有许多 [函数](https://www.rustwiki.org.cn/zh-CN/std/io/index.html#functions-1) 提供对各种特性的访问。 例如，我们可以使用以下三个函数将所有内容从标准输入复制到标准输出：

```rust
use std::io;

fn main() -> io::Result<()> {
    io::copy(&mut io::stdin(), &mut io::stdout())?;
    Ok(())
}
```



## 7.io::Result

最后但并非最不重要的是 [`io::Result`](https://www.rustwiki.org.cn/zh-CN/std/io/type.Result.html)。 此类型用作许多 `std::io` 函数的返回类型，它们可能导致错误，也可以从您自己的函数中返回。 该模块中的许多示例都使用 [`?`操作符](https://www.rustwiki.org.cn/zh-CN/book/appendix-02-operators.html)：

```rust
use std::io;

fn read_input() -> io::Result<()> {
    let mut input = String::new();

    io::stdin().read_line(&mut input)?;

    println!("You typed: {}", input.trim());

    Ok(())
}
```

`read_input()` 的返回类型 [`io::Result<()>`](https://www.rustwiki.org.cn/zh-CN/std/io/type.Result.html) 是函数的一种非常常见的类型，它没有 ‘real’ 返回值，但是希望在发生错误时返回错误。

在这种情况下，此函数的唯一目的是读取并打印该行，因此我们使用 `()`。



## 8.特定于平台的行为

记录了整个标准库中的许多 I/O 函数，以指示将它们委派给的各种库或 syscall。 这样做是为了帮助应用程序了解幕后的情况以及调查任何可能不清楚的语义。 但是请注意，这只是提供信息，而不是有约束力的契约。 其中许多函数的实现会随时间而变化，并且可能调用更少或更多的 syscalls/library 函数。



## 9.包含内容

### [Modules](https://www.rustwiki.org.cn/zh-CN/std/io/index.html#modules)

- [prelude](https://www.rustwiki.org.cn/zh-CN/std/io/prelude/index.html)：I/O Prelude。

### [Structs](https://www.rustwiki.org.cn/zh-CN/std/io/index.html#structs)

- [BorrowedBuf](https://www.rustwiki.org.cn/zh-CN/std/io/struct.BorrowedBuf.html)：增量填充和初始化的借用字节缓冲区。
- [BorrowedCursor](https://www.rustwiki.org.cn/zh-CN/std/io/struct.BorrowedCursor.html)：未填充部分的可写视图。
- [BufReader](https://www.rustwiki.org.cn/zh-CN/std/io/struct.BufReader.html)：`BufReader<R>` 结构体将缓冲添加到任何 reader。
- [BufWriter](https://www.rustwiki.org.cn/zh-CN/std/io/struct.BufWriter.html)：包装一个 writer 并缓冲其输出。
- [Bytes](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Bytes.html)：reader 的 `u8` 值上的迭代器。
- [Chain](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Chain.html)：将两个 readers 链接在一起的适配器。
- [Cursor](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Cursor.html)：`Cursor` 包装内存中的缓冲区，并为其提供 [`Seek`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Seek.html) 实现。
- [Empty](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Empty.html)：始终处于 EOF 的 reader。
- [Error](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Error.html)：[`Read`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html)，[`Write`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html)，[`Seek`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Seek.html) 和关联的 traits 的 I/O 操作的错误类型。
- [IntoInnerError](https://www.rustwiki.org.cn/zh-CN/std/io/struct.IntoInnerError.html)：[`BufWriter::into_inner`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.BufWriter.html#method.into_inner) 返回的错误，将写出缓冲区时发生的错误与缓冲的 writer 对象结合在一起，可用于从条件中恢复。
- [IoSlice](https://www.rustwiki.org.cn/zh-CN/std/io/struct.IoSlice.html)：`Write::write_vectored` 使用的缓冲区类型。
- [IoSliceMut](https://www.rustwiki.org.cn/zh-CN/std/io/struct.IoSliceMut.html)：`Read::read_vectored` 使用的缓冲区类型。
- [LineWriter](https://www.rustwiki.org.cn/zh-CN/std/io/struct.LineWriter.html)：包装一个 writer 并缓冲输出到它的内容，每当检测到换行符 (`0x0a，`‘\n’`) 时刷新一次。
- [Lines](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Lines.html)：`BufRead` 实例的行上的迭代器。
- [Repeat](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Repeat.html)：一个 reader，它一遍又一遍地产生一个字节，一遍又一遍，一遍又一遍，…
- [Sink](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Sink.html)：一个 writer，它将数据移入无效空间。
- [Split](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Split.html)：对 `BufRead` 实例的内容进行迭代的迭代器，该实例在特定字节上拆分。
- [Stderr](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Stderr.html)：进程的标准错误流的句柄。
- [StderrLock](https://www.rustwiki.org.cn/zh-CN/std/io/struct.StderrLock.html)：[`Stderr`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Stderr.html) 句柄的锁定引用。
- [Stdin](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Stdin.html)：进程的标准输入流的句柄。
- [StdinLock](https://www.rustwiki.org.cn/zh-CN/std/io/struct.StdinLock.html)：[`Stdin`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Stdin.html) 句柄的锁定引用。
- [Stdout](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Stdout.html)：当前进程的标准输出流的句柄。
- [StdoutLock](https://www.rustwiki.org.cn/zh-CN/std/io/struct.StdoutLock.html)：[`Stdout`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Stdout.html) 句柄的锁定引用。
- [Take](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Take.html)：Reader 适配器，用于限制从底层 reader 读取的字节。
- [WriterPanicked](https://www.rustwiki.org.cn/zh-CN/std/io/struct.WriterPanicked.html)：当底层 writer 之前有 panicked 时，为来自 `BufWriter::into_parts` 的缓冲数据返回错误。 包含 (可能是部分写入的) 缓冲数据。

### [Enums](https://www.rustwiki.org.cn/zh-CN/std/io/index.html#enums)

- [ErrorKind](https://www.rustwiki.org.cn/zh-CN/std/io/enum.ErrorKind.html)：一个列表，指定 I/O 错误的常规类别。
- [SeekFrom](https://www.rustwiki.org.cn/zh-CN/std/io/enum.SeekFrom.html)：列举可能在 I/O 对象中进行搜索的方法。

### [Traits](https://www.rustwiki.org.cn/zh-CN/std/io/index.html#traits)

- [BufRead](https://www.rustwiki.org.cn/zh-CN/std/io/trait.BufRead.html)：`BufRead` 是带有内部缓冲区的 `Read` 类型，它可以执行其他读取方式。
- [IsTerminal](https://www.rustwiki.org.cn/zh-CN/std/io/trait.IsTerminal.html)：Trait 确定 descriptor/handle 是否指代 terminal/tty。
- [Read](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html)：`Read` trait 允许从源读取字节。
- [Seek](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Seek.html)：`Seek` trait 提供了一个游标，可以在字节流中移动它。
- [Write](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html)：面向字节的接收器对象的 trait。

### [Functions](https://www.rustwiki.org.cn/zh-CN/std/io/index.html#functions-1)

- [copy](https://www.rustwiki.org.cn/zh-CN/std/io/fn.copy.html)：将 reader 的全部内容复制到 writer 中。
- [empty](https://www.rustwiki.org.cn/zh-CN/std/io/fn.empty.html)：为空的 reader 创建一个新的句柄。
- [read_to_string](https://www.rustwiki.org.cn/zh-CN/std/io/fn.read_to_string.html)：将 [读取](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html) 的所有字节读入新的 [`String`](https://www.rustwiki.org.cn/zh-CN/std/string/struct.String.html)。
- [repeat](https://www.rustwiki.org.cn/zh-CN/std/io/fn.repeat.html)：创建 reader 的实例，该实例无限重复一个字节。
- [sink](https://www.rustwiki.org.cn/zh-CN/std/io/fn.sink.html)：创建 writer 的实例，该实例将成功消费所有数据。
- [stderr](https://www.rustwiki.org.cn/zh-CN/std/io/fn.stderr.html)：为当前进程的标准错误创建一个新的句柄。
- [stdin](https://www.rustwiki.org.cn/zh-CN/std/io/fn.stdin.html)：为当前进程的标准输入创建一个新的句柄。
- [stdout](https://www.rustwiki.org.cn/zh-CN/std/io/fn.stdout.html)：为当前进程的标准输出创建一个新的句柄。

### [Type Definitions](https://www.rustwiki.org.cn/zh-CN/std/io/index.html#types)

- [RawOsError](https://www.rustwiki.org.cn/zh-CN/std/io/type.RawOsError.html)：[`Error::raw_os_error`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Error.html#method.raw_os_error) 返回的原始操作系统错误代码的类型。
- [Result](https://www.rustwiki.org.cn/zh-CN/std/io/type.Result.html)：I/O 操作的专用 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 类型。