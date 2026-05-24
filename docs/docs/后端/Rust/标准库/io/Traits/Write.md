# Trait std::io::Write

面向字节的接收器对象的 trait。

`Write` trait 的实现者有时称为 ‘writers’。

Writers 由两种必需的方法 [`write`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#tymethod.write) 和 [`flush`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#tymethod.flush) 定义：

- [`write`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#tymethod.write) 方法将尝试将一些数据写入对象，返回成功写入的字节数。
- [`flush`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#tymethod.flush) 方法对于适配器和显式缓冲区本身很有用，以确保所有缓冲数据都已被推送到 `真正的 sink`。

Writers 旨在彼此组成。 [`std::io`](https://www.rustwiki.org.cn/zh-CN/std/io/index.html) 上的许多实现器都采用并提供实现 `Write` trait 的类型。

```rust
pub trait Write {
    // Required methods
    fn write(&mut self, buf: &[u8]) -> Result<usize>;
    fn flush(&mut self) -> Result<()>;

    // Provided methods
    fn write_vectored(&mut self, bufs: &[IoSlice<'_>]) -> Result<usize> { ... }
    fn is_write_vectored(&self) -> bool { ... }
    fn write_all(&mut self, buf: &[u8]) -> Result<()> { ... }
    fn write_all_vectored(&mut self, bufs: &mut [IoSlice<'_>]) -> Result<()> { ... }
    fn write_fmt(&mut self, fmt: Arguments<'_>) -> Result<()> { ... }
    fn by_ref(&mut self) -> &mut Self
       where Self: Sized { ... }
}
```



:::tip 示例

```rust
use std::io::prelude::*;
use std::fs::File;

fn main() -> std::io::Result<()> {
    let data = b"some bytes";

    let mut pos = 0;
    let mut buffer = File::create("foo.txt")?;

    while pos < data.len() {
        let bytes_written = buffer.write(&data[pos..])?;
        pos += bytes_written;
    }
    Ok(())
}
```

这个 trait 还提供了便捷的方法，例如 [`write_all`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#method.write_all)，它在循环中调用 `write`，直到其整个输入都被写入为止。

:::





## Required Methods

### write

在此 writer 中写入一个缓冲区，

```rust
fn write(&mut self, buf: &[u8]) -> Result<usize>
```

**参数**：

- **buf**：需要写入的字节

**返回值**：返回写入的字节数。

```rust
use std::io::prelude::*;
use std::fs::File;

fn main() -> std::io::Result<()> {
    let mut buffer = File::create("test.txt")?;

    // 写入字节字符串的某些前缀，不一定要全部。
    buffer.write(b"some bytes")?;
    Ok(())
}
```

:::tip

这个函数会尝试写入 `buf` 的全部内容，但是整个写入可能不会成功，或者写入也会产生错误。 对 `write` 的调用表示 *at most 对任何包装的对象进行写操作的尝试。

不能保证对 `write` 的调用会阻塞等待数据的写入，否则可以通过 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err) 变体指示被阻塞的写入。

如果返回值为 [`Ok(n)`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok)，则必须保证 `n <= buf.len()`。 返回值 `0` 通常意味着底层对象不再能够接受字节，并且将来也可能无法接受，或者提供的缓冲区为空。

[Errors](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#errors)

对 `write` 的每次调用都可能产生 I/O 错误，指示操作无法完成。如果返回错误，则缓冲区中没有字节写入此 writer。

如果无法将整个缓冲区写入此 writer，则不认为是错误。

[`ErrorKind::Interrupted`](https://www.rustwiki.org.cn/zh-CN/std/io/enum.ErrorKind.html#variant.Interrupted) 类型的错误是非致命错误，如果没有其他事情可做，则应重试写入操作。

:::





### flush

刷新此输出流，确保所有中间缓冲的内容均到达其目的地。

```rust
fn flush(&mut self) -> Result<()>
```

**返回值**：返回一个`Result`，若成功则返回`Ok(())`，否则返回相应错误

```rust
use std::io::prelude::*;
use std::io::BufWriter;
use std::fs::File;

fn main() -> std::io::Result<()> {
    let mut buffer = BufWriter::new(File::create("test.txt")?);

    buffer.write_all(b"some bytes")?;
    buffer.flush()?;
    Ok(())
}
```



:::tip Error

如果由于 I/O 错误或达到 EOF 而无法写入所有字节，则认为是错误。

:::



## Provided Methods

### write_vectored

类似于 [`write`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#tymethod.write)，不同之处在于它是从缓冲区切片中写入数据的。

数据是按顺序从每个缓冲区复制的，从中读取的最终缓冲区可能仅被部分消耗。 此方法必须与串联的缓冲区对 [`write`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#tymethod.write) 的调用相同。

默认实现使用提供的第一个非空缓冲区调用 [`write`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#tymethod.write)，如果不存在，则为空。

```rust
fn write_vectored(&mut self, bufs: &[IoSlice<'_>]) -> Result<usize>
```

**参数**：

- **bufs**：需要写入的内容，内包含若干个IoSlice内存快

**返回值**：返回写入的总字节数

```rust
use std::fs::File;
use std::io::{self, Write, IoSlice};

fn main() -> io::Result<()> {
    let mut file = File::create("out.txt")?;

    let bufs = [
        IoSlice::new(b"hello "),
        IoSlice::new(b"world\n"),
    ];

    file.write_vectored(&bufs)?;
    file.flush()?;

    Ok(())
}
```



### is_write_vectored

确定此 `Writer` 是否具有有效的 [`write_vectored`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#method.write_vectored) 实现。

如果 `Writer `没有覆盖默认的 [`write_vectored`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#method.write_vectored) 实现，则使用它的代码可能希望完全避免使用该方法，并合并写入单个缓冲区以提高性能。

```rust
fn is_write_vectored(&self) -> bool
```

**返回值**：默认实现返回 `false`。





### write_all

尝试将整个缓冲区写入此 writer。

```rust
fn write_all(&mut self, buf: &[u8]) -> Result<()>
```

**参数**：

- **buf**：需要写入的内容

**返回值**：

```rust
use std::fs::File;
use std::io::{BufWriter, Write};

fn main() {
    let file = File::create("test.txt").unwrap();
    let mut writer = BufWriter::new(file);

    writer.write_all(b"hello world").unwrap();
}

```

:::tip

此方法将连续调用 [`write`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#tymethod.write)，直到没有更多数据要写入或返回非 [`ErrorKind::Interrupted`](https://www.rustwiki.org.cn/zh-CN/std/io/enum.ErrorKind.html#variant.Interrupted) 类型的错误为止。 在成功写入整个缓冲区或发生此类错误之前，此方法将不会返回。 从此方法生成的不是 [`ErrorKind::Interrupted`](https://www.rustwiki.org.cn/zh-CN/std/io/enum.ErrorKind.html#variant.Interrupted) 类型的第一个错误将被返回。

如果缓冲区不包含任何数据，则永远不会调用 [`write`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#tymethod.write)。

[Errors](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#errors-2)

该函数将返回 [`write`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#tymethod.write) 返回的第一个非 -[`ErrorKind::Interrupted`](https://www.rustwiki.org.cn/zh-CN/std/io/enum.ErrorKind.html#variant.Interrupted) 类型的错误。

:::





### write_all_vectored

用于一次性写入多个缓冲区的数据，并保证所有数据都被完全写入。

```rust
fn write_all_vectored(&mut self, bufs: &mut [IoSlice<'_>]) -> Result<()>
```

**参数**：

- **bufs**：一个“缓冲区切片”，每个元素都是一段连续内存，表示要写入的数据

**返回值**：返回一个`Result`，若所有缓冲区的数据都已成功写入则返回`Ok(())`，否则返回相应错误

```rust
use std::io::{self, Write, IoSlice};

fn main() -> io::Result<()> {
    let mut buffer = Vec::new();

    let data1 = b"Hello ";
    let data2 = b"World!";

    let bufs = [
        IoSlice::new(data1),
        IoSlice::new(data2),
    ];

    buffer.write_all_vectored(&bufs)?;

    assert_eq!(&buffer, b"Hello World!");
    println!("{}", String::from_utf8(buffer).unwrap());

    Ok(())
}
```

:::tip

此方法将连续调用 [`write_vectored`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#method.write_vectored)，直到没有更多数据要写入或返回非 [`ErrorKind::Interrupted`](https://www.rustwiki.org.cn/zh-CN/std/io/enum.ErrorKind.html#variant.Interrupted) 类型的错误为止。

在成功写入所有缓冲区或发生此类错误之前，此方法将不会返回。 从此方法生成的不是 [`ErrorKind::Interrupted`](https://www.rustwiki.org.cn/zh-CN/std/io/enum.ErrorKind.html#variant.Interrupted) 类型的第一个错误将被返回。

如果缓冲区不包含任何数据，则永远不会调用 [`write_vectored`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#method.write_vectored)。

[Notes](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#notes)

与 [`write_vectored`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#method.write_vectored) 不同，这需要对 [`IoSlice`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.IoSlice.html) 的切片进行 *可变* 引用，而不是不可变。 那是因为我们需要修改切片以跟踪已写入的字节。

此函数返回后，将不指定 `bufs` 的内容，这取决于需要对 [`write_vectored`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#method.write_vectored) 进行多少次调用。 最好将此函数理解为拥有 `bufs` 的所有权，并且此后不使用 `bufs`。 [`IoSlice`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.IoSlice.html) 指向的底层缓冲区 (而不是 [`IoSlice`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.IoSlice.html) 本身) 是不变的，可以重用。

:::





### write_fmt

将格式化的字符串写入此 writer，返回遇到的任何错误。

此方法主要用于与 [`format_args!()`](https://www.rustwiki.org.cn/zh-CN/std/macro.format_args.html) 宏接口，很少需要显式调用。 应优先使用 [`write!()`](https://www.rustwiki.org.cn/zh-CN/std/macro.write.html) 宏来调用此方法。

此函数内部在此 trait 上使用 [`write_all`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#method.write_all) 方法，因此只要没有收到错误，就将连续写入数据。

这也意味着此签名中未指示部分写入。

```rust
fn write_fmt(&mut self, fmt: Arguments<'_>) -> Result<()>
```

**参数**：

- **fmt**：格式化参数包（通常由 format_args!宏生成）

**返回值**：返回一个`Result`，若成功则返回`Ok(())`，否则返回相应错误

```rust
use std::io::{self, Write};

fn main() -> io::Result<()> {
    let mut buf = Vec::new();

    buf.write_fmt(format_args!("Hello {}, age {}", "Alice", 30))?;

    println!("{:#?}",  String::from_utf8_lossy(&buf));   // "Hello Alice, age 30"

    Ok(())
}
```



### by_ref

为这个 `Write` 实例创建一个 “by reference” 适配器。

返回的适配器也实现了 `Write`，并将简单地借用当前的 writer。

```rust
fn by_ref(&mut self) -> &mut Self
where
    Self: Sized,
```

**返回值**：返回自身的可变借用

```rust
use std::io::{self, Write, BufWriter};

fn main() -> io::Result<()> {
    let mut file = io::stdout();
    let mut writer = BufWriter::new(file.by_ref());

    writer.write_all(b"Hello\n")?;
    writer.flush()?;

    // file 仍然可用
    file.write_all(b"Still alive\n")?;

    Ok(())
}
```







## Implementors



### impl Write for &File

### impl Write for &TcpStream

### impl Write for &ChildStdin

### impl Write for &Sink

### impl Write for &Stderr

### impl Write for &Stdout

### impl Write for &mut [u8]

通过将 `&mut [u8]` 复制到切片中并覆盖其数据来实现写入。

请注意，编写会更新切片以指向尚未编写的部分。 完全覆盖后，切片将为空。

如果要写入的字节数超过了切片的大小，则写入操作将返回短写入：最终为 Ok(0); 否则为 Ok(0)。在这种情况下，write_all 返回类型为 ErrorKind::WriteZero 的错误。



### impl Write for File

### impl Write for TcpStream

### impl Write for UnixStream

Available on Unix only.



### impl Write for ChildStdin

### impl Write for Cursor<&mut [u8]>

### impl Write for Sink

### impl Write for Stderr

### impl Write for StderrLock<'_>

### impl Write for Stdout

### impl Write for StdoutLock<'_>



### impl<'a> Write for &'a UnixStream

Available on Unix only.



### impl<'a> Write for BorrowedCursor<'a>



### impl\<A> Write for Cursor<&mut Vec<u8, A>>

```rust
impl<A> Write for Cursor<&mut Vec<u8, A>>
where
  A: Allocator,
```



### impl\<A> Write for Cursor<Box<[u8], A>>

```rust
impl<A> Write for Cursor<Box<[u8], A>>
where
  A: Allocator,
```



### impl\<A> Write for Cursor<Vec<u8, A>>

```rust
impl<A> Write for Cursor<Vec<u8, A>>
where
  A: Allocator,
```





### impl<A: Allocator> Write for VecDeque<u8, A>

通过，追加，到 VecDeque 来实现 `VecDeque<u8>` 的写入，并根据需要对其进行扩展。



### impl<A: Allocator> Write for Vec<u8, A>

通过将 `Vec<u8>` 追加到 vector 来实现写入操作。 vector 将根据需要增长。



### impl<W: Write + ?Sized> Write for &mut W

### impl<W: Write + ?Sized> Write for Box\<W>

### impl<W: Write> Write for BufWriter\<W>

### impl<W: Write> Write for LineWriter\<W>

### impl\<const N: usize> Write for Cursor<[u8; N]>

