# Trait std::io::Read

`Read` trait 允许从源读取字节。

**`Read` trait 的实现者称为 `readers`。**

Readers 由一种必需的方法 [`read()`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html#tymethod.read) 定义。对 [`read()`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html#tymethod.read) 的每次调用都会尝试将字节从此源拉入提供的缓冲区。 [`read()`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html#tymethod.read) 还实现了许多其他方法，从而为实现者提供了多种读取字节的方式，而只需要实现一种方法即可。

Readers 旨在彼此组成。[`std::io`](https://www.rustwiki.org.cn/zh-CN/std/io/index.html) 上的许多实现器都采用并提供实现 `Read` trait 的类型。

请注意，对 [`read()`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html#tymethod.read) 的每次调用都可能涉及一个系统调用，因此，使用实现 [`BufRead`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.BufRead.html) 的东西 (例如 [`BufReader`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.BufReader.html)) 会更加有效。

```rust
pub trait Read {
    // Required method
    fn read(&mut self, buf: &mut [u8]) -> Result<usize>;

    // Provided methods
    fn read_vectored(&mut self, bufs: &mut [IoSliceMut<'_>]) -> Result<usize> { ... }
    fn is_read_vectored(&self) -> bool { ... }
    fn read_to_end(&mut self, buf: &mut Vec<u8>) -> Result<usize> { ... }
    fn read_to_string(&mut self, buf: &mut String) -> Result<usize> { ... }
    fn read_exact(&mut self, buf: &mut [u8]) -> Result<()> { ... }
    fn read_buf(&mut self, buf: BorrowedCursor<'_>) -> Result<()> { ... }
    fn read_buf_exact(&mut self, cursor: BorrowedCursor<'_>) -> Result<()> { ... }
    fn by_ref(&mut self) -> &mut Self
       where Self: Sized { ... }
    fn bytes(self) -> Bytes<Self> ⓘ
       where Self: Sized { ... }
    fn chain<R: Read>(self, next: R) -> Chain<Self, R> ⓘ
       where Self: Sized { ... }
    fn take(self, limit: u64) -> Take<Self> ⓘ
       where Self: Sized { ... }
}
```





## Examples

[`File`](https://www.rustwiki.org.cn/zh-CN/std/fs/struct.File.html) 的工具 `Read`：

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let mut f = File::open("foo.txt")?;
    let mut buffer = [0; 10];

    // 最多读取 10 个字节
    f.read(&mut buffer)?;

    let mut buffer = Vec::new();
    // 读取整个文件
    f.read_to_end(&mut buffer)?;

    // 读入一个字符串，这样就不需要进行转换。
    let mut buffer = String::new();
    f.read_to_string(&mut buffer)?;

    // 和更多！ 有关更多详细信息，请参见其他方法。
    Ok(())
}
```

从 [`&str`](https://www.rustwiki.org.cn/zh-CN/std/primitive.str.html) 读取，因为 [`&[u8]`](https://www.rustwiki.org.cn/zh-CN/std/primitive.slice.html) 实现了 `Read`：

```rust
use std::io::prelude::*;

fn main() -> io::Result<()> {
    let mut b = "This string will be read".as_bytes();
    let mut buffer = [0; 10];

    // 最多读取 10 个字节
    b.read(&mut buffer)?;

    // 等等... 它的工作原理与文件一样！
    Ok(())
}
```





## Required Methods

### read

从该源中提取一些字节到指定的缓冲区中，返回读取的字节数。

```rust
fn read(&mut self, buf: &mut [u8]) -> Result<usize>
```

**参数**：

- `buf`：缓冲区，内容会被读取到此处

**返回值**：返回一个`Result`，其中包含读取的字节数

```RUST
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let mut f = File::open("foo.txt")?;
    let mut buffer = [0; 10];

    // 最多读取 10 个字节
    let n = f.read(&mut buffer[..])?;

    println!("The bytes: {:?}", &buffer[..n]);
    Ok(())
}
```



:::tip

该函数不提供有关是否阻塞等待数据的任何保证，但是如果对象需要阻塞读取而不能阻塞，则通常会通过 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err) 返回值来发出信号。

如果此方法的返回值为 [`Ok(n)`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok)，则实现必须保证 `0 <= n <= buf.len()`。 `n` 值非零表示缓冲区 `buf` 已填充有来自该源的 `n` 字节的数据。 如果 `n` 是 `0`，则它可以指示以下两种情况之一：

1. reader 已到达其 “文件结尾”，可能不再能够产生字节。请注意，这并不意味着 reader 总是会不再能够生成字节。 例如，在 Linux 上，此方法将调用 [`TcpStream`](https://www.rustwiki.org.cn/zh-CN/std/net/struct.TcpStream.html) 的 `recv` 系统调用，其中返回零表示连接已正确关闭。 而对于 [`File`](https://www.rustwiki.org.cn/zh-CN/std/fs/struct.File.html)，有可能到达文件末尾并得到零作为结果，但如果向文件追加更多数据，那么将来对 `read` 的调用将返回更多数据。
2. 指定的缓冲区的长度为 0 个字节。

如果返回值 `n` 小于缓冲区大小，即使 reader 不在流的末尾，也不会出错。 例如，这可能是因为现在实际可用的字节较少 (例如，接近文件末尾) 或 read() 被信号中断。

由于此 trait 可以安全实现，因此不安全代码中的调用者不能依赖 `n <= buf.len()` 来确保安全。 当使用 `unsafe` 函数访问读取的字节时，需要格外小心。 调用者必须确保即使 `n > buf.len()` 也不能进行未经检查的越界访问。

调用此函数时，不保证 `buf` 的内容，因此实现不能依赖于 `buf` 内容的任何属性为真。 建议 `implementations` 仅将数据写入 `buf`，而不要读取其内容。

然而，相应地，不安全代码中此方法的*调用者*不得对实现如何使用 `buf` 做出任何保证。 这个 trait 可以安全地实现，所以应该写入缓冲区的代码也有可能从中读取。 您有责任在调用 `read` 之前确保 `buf` 已初始化。 用未初始化的 `buf` (通过 [`MaybeUninit`](https://www.rustwiki.org.cn/zh-CN/std/mem/union.MaybeUninit.html) 获得的那种) 来调用 `read` 是不安全的，并且可能导致未定义的行为。

**Errors**

如果此函数遇到任何形式的 I/O 或其他错误，将返回一个错误变体。如果返回错误，则必须保证未读取任何字节。

[`ErrorKind::Interrupted`](https://www.rustwiki.org.cn/zh-CN/std/io/enum.ErrorKind.html#variant.Interrupted) 类型的错误是非致命错误，如果没有其他事情可做，则应重试读取操作。

:::







## Provided Methods

### read_vectored

与 `read` 相似，不同之处在于它读入缓冲区的一部分。

复制数据以按顺序填充每个缓冲区，而写入的最终缓冲区可能仅被部分填充。 此方法必须等效于使用级联缓冲区对 `read` 的单个调用。

默认实现使用提供的第一个非空缓冲区调用 `read`，如果不存在，则为空。

```rust
fn read_vectored(&mut self, bufs: &mut [IoSliceMut<'_>]) -> Result<usize>
```

**参数**：

- `bufs`：多个缓冲区，内容会被读取到此处

**返回值**：返回一个`Result`，其中包含读取的字节数

```rust
use std::fs::File;
use std::io::{self, Read, IoSliceMut};

fn main() -> io::Result<()> {
    let mut file = File::open("example.bin")?;

    let mut a = [0u8; 4];
    let mut b = [0u8; 8];
    let mut c = [0u8; 12];

    let mut bufs = [
        IoSliceMut::new(&mut a),
        IoSliceMut::new(&mut b),
        IoSliceMut::new(&mut c),
    ];

    let n = file.read_vectored(&mut bufs)?;
    println!("read {} bytes", n);

    println!("{:02x?}", &a[..]);
    Ok(())
}
```

行为说明

- 先填 `a`
- 再填 `b`
- 再填 `c`
- 直到 EOF 或缓冲区满



普通写法：

```rust
file.read(&mut a)?;
file.read(&mut b)?;
file.read(&mut c)?;
// 3 次 syscall
```

`read_vectored`：

```rust
file.read_vectored(&mut bufs)?;
// 1 次 syscall
```



### is_read_vectored

判读这个 `Read` 是否具有有效的 `read_vectored` 实现。

如果 `Read` 没有覆盖默认的 `read_vectored` 实现，则使用它的代码可能希望完全避免使用该方法，并合并写入单个缓冲区以提高性能。

默认实现返回 `false`。

```rust
fn is_read_vectored(&self) -> bool
```

**返回值**：返回bool，默认为false

```rust
use std::fs::File;
use std::io::Read;

let mut file = File::open("example.bin").unwrap();

if file.is_read_vectored() {
    println!("✅ 支持真正的 vectored read");
    // reader.read_vectored(&mut bufs)
} else {
    println!("❌ 只是模拟实现");
}
```



:::tip 为什么需要这个方法？

1.很多 `read_vectored`是“假实现”

```rust
impl Read for Cursor<Vec<u8>> {
    fn read_vectored(&mut self, bufs: &mut [IoSliceMut<'_>]) -> io::Result<usize> {
        // 实际上只是循环调用 read
    }
}
```

这种情况下：

```rust
cursor.is_read_vectored() == false
```



2.防止你“以为很快，其实很慢”

如果你写了这样的代码：

```rust
file.read_vectored(&mut bufs)?;
```

但你不知道：

- 是不是真的减少了 syscall
- 是不是只是模拟实现

那就可以先检查：

```rust
if file.is_read_vectored() {
    // 高性能路径
} else {
    // fallback 到普通 read
}
```

:::



### read_to_end

**读取所有字节**，直到此源中的 EOF 为止，然后将它们放入 `buf`。

从该源读取的所有字节都将追加到指定的缓冲区 `buf`。 该函数将不断调用 [`read()`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html#tymethod.read) 来向 `buf` 追加更多的数据，直到 [`read()`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html#tymethod.read) 返回 [`Ok(0)`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) 或非 [`ErrorKind::Interrupted`](https://www.rustwiki.org.cn/zh-CN/std/io/enum.ErrorKind.html#variant.Interrupted) 类型的错误为止。

如果成功，此函数将返回读取的字节总数。

```rust
fn read_to_end(&mut self, buf: &mut Vec<u8>) -> Result<usize>
```

**参数**：

- `buf`：缓冲区，内容会被读取到此处

**返回值**：返回一个`Result`，其中包含读取的字节数

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let mut f = File::open("foo.txt")?;
    let mut buffer = Vec::new();

    // 读取整个文件
    f.read_to_end(&mut buffer)?;
    Ok(())
}
```

:::tip Errors

如果此函数遇到 [`ErrorKind::Interrupted`](https://www.rustwiki.org.cn/zh-CN/std/io/enum.ErrorKind.html#variant.Interrupted) 类型的错误，则该错误将被忽略，并且操作将继续。

如果遇到任何其他读取错误，则此函数立即返回。任何已经读取的字节都将被追加到 `buf`。

:::





### read_to_string

读取这个源中的所有字节，直到 EOF 为止，然后将它们追加到**字符串** `buf`中。

如果成功，则此函数返回已读取并追加到 `buf` 的字节数。

```rust
fn read_to_string(&mut self, buf: &mut String) -> Result<usize>
```

**参数**：

- `buf`：字符串缓冲区，内容会被读取到此处

**返回值**：返回一个`Result`，其中包含读取的字节数

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let mut f = File::open("foo.txt")?;
    let mut buffer = String::new();

    f.read_to_string(&mut buffer)?;
    Ok(())
}
```

:::tip **Error**

如果此流中的数据 *不是* 有效的 UTF-8，则返回错误，并且 `buf` 不变。

有关其他错误语义，请参见 [`read_to_end`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html#method.read_to_end)。

:::



### read_exact

读取填充 `buf` 所需的确切字节数。

**必须精确读满你指定的缓冲区，否则就报错**

该函数读取所需的字节数以完全填充指定的缓冲区 `buf`。

调用此函数时，不保证 `buf` 的内容，因此实现不能依赖于 `buf` 内容的任何属性为真。 建议实现仅将数据写入 `buf`，而不读取其内容。 [`read`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html#tymethod.read) 上的文档对此主题有更详细的说明。

```rust
fn read_exact(&mut self, buf: &mut [u8]) -> Result<()>
```

**参数**：

- `buf`：字符串缓冲区，内容会被读取到此处

**返回值**：返回一个`Result`

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let mut f = File::open("test.txt")?;
    let mut buffer = [0; 10];

    // 精确读取 10 个字节
    f.read_exact(&mut buffer)?;
    Ok(())
}
```



### read_buf

从此源中提取一些字节到指定的缓冲区中。

这等效于 [`read`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html#tymethod.read) 方法，只是它传递的是 [`BorrowedCursor`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.BorrowedCursor.html) 而不是 `[u8]` 以允许与未初始化的缓冲区一起使用。 新的数据将被追加到 `buf` 的任何现有内容中。

默认实现委托给 `read`。

```rust
fn read_buf(&mut self, buf: BorrowedCursor<'_>) -> Result<()>
```

**参数**：

- `buf`：字符串缓冲区，内容会被读取到此处

**返回值**：返回一个`Result`

```rust
use std::io::{Read, BorrowedBuf};

let mut file = File::open("data.bin")?;

let mut buf = vec![0u8; 1024];
let mut buf = BorrowedBuf::from(buf.as_mut_slice());

file.read_buf(buf.unfilled())?;
```



### read_buf_exact

读取填充 `cursor` 所需的确切字节数。

这类似于 [`read_exact`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html#method.read_exact) 方法，除了它传递的是 [`BorrowedCursor`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.BorrowedCursor.html) 而不是 `[u8]` 以允许使用未初始化的缓冲区。

```rust
fn read_buf_exact(&mut self, cursor: BorrowedCursor<'_>) -> Result<()>
```

**参数**：

- `cursor`：字符串缓冲区，内容会被读取到此处

**返回值**：返回一个`Result`

```rust
let mut header = [MaybeUninit::<u8>::uninit(); 16];
let mut buf = BorrowedBuf::from(&mut header);

file.read_buf_exact(buf.unfilled())?;
```



:::tip **Error**

如果此函数遇到 [`ErrorKind::Interrupted`](https://www.rustwiki.org.cn/zh-CN/std/io/enum.ErrorKind.html#variant.Interrupted) 类型的错误，则该错误将被忽略，并且操作将继续。

如果此函数在完全填充缓冲区之前遇到 “文件结尾”，它将返回 [`ErrorKind::UnexpectedEof`](https://www.rustwiki.org.cn/zh-CN/std/io/enum.ErrorKind.html#variant.UnexpectedEof) 类型的错误。

如果遇到任何其他读取错误，则此函数立即返回。

如果此函数返回错误，则读取的所有字节都将，到 `cursor`。

:::



### by_ref

为这个 `Read` 实例创建一个 “by reference” 适配器。

**让你可以临时使用 `Read`，用完还能继续用**

返回的适配器也实现了 `Read`，并且将简单地借用当前的 reader。

```rust
fn by_ref(&mut self) -> &mut Self
where
    Self: Sized,
```

**返回值**：返回自身的可变借用



问题代码(❌ 会移动)：

```rust
let mut file = File::open("a.txt")?;
file.read_to_end(&mut buf1)?;
file.read_to_end(&mut buf2)?; // ❌ file 已被消费
```

正确用法（✅）：

```rust
let mut file = File::open("a.txt")?;

file.by_ref().read_to_end(&mut buf1)?;
file.by_ref().read_to_end(&mut buf2)?;
```

✅ `by_ref()`返回 `&mut Read`

✅ 不拿走所有权

✅ 常用于 **链式处理**





### bytes

将此 `Read` 实例的字节数转换为 [`Iterator`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html)。

返回的类型实现 [`Iterator`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html)，其中 [`Item`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#associatedtype.Item) 是 `Result<u8, io::Error>`。 如果成功读取了一个字节，则产生的项为 [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok)，否则为 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err)。 EOF 映射为从此迭代器返回 [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)。

默认实现为每个字节调用 `read`，这对于不在内存中的数据 (例如 [`File`](https://www.rustwiki.org.cn/zh-CN/std/fs/struct.File.html)) 可能非常低效。

在这种情况下考虑使用 [`BufReader`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.BufReader.html)。

```rust
fn bytes(self) -> Bytes<Self>
where
    Self: Sized,
```

**返回值**：返回自身的可变借用

```rust
use std::io;
use std::io::prelude::*;
use std::io::BufReader;
use std::fs::File;

fn main() -> io::Result<()> {
    let f = BufReader::new(File::open("foo.txt")?);

    for byte in f.bytes() {
        println!("{}", byte.unwrap());
    }
    Ok(())
}
```







### chain

创建一个适配器，将这个流与另一个链接起来。简而言之：**把两个 Reader 连起来**

返回的 `Read` 实例将首先从该对象读取所有字节，直到遇到 EOF。 之后，输出等同于 `next` 的输出。

```rust
fn chain<R: Read>(self, next: R) -> Chain<Self, R> ⓘ
where
    Self: Sized,
```

**参数**：

- `next`：另一个Reader

**返回值**：返回一个`Chain`

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let f1 = File::open("foo.txt")?;
    let f2 = File::open("bar.txt")?;

    let mut handle = f1.chain(f2);
    let mut buffer = String::new();

    // 将值读入字符串。
    // 我们可以在这里使用任何 Read 方法，这只是一个示例。
    handle.read_to_string(&mut buffer)?;
    Ok(())
}
```





### take

创建一个适配器，最多从中读取 `limit` 个字节。

此函数返回 `Read` 的新实例，该实例最多读取 `limit` 字节，此后它将始终返回 EOF ([`Ok(0)`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok))。 任何读取错误都不会计入读取的字节数，并且 [`read()`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html#tymethod.read) 的 future 调用可能会成功。

```rust
fn take(self, limit: u64) -> Take<Self> ⓘ
where
    Self: Sized,
```

**参数**：

- `limit`：最多可读取的字节数

**返回值**：返回一个`Take`

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let f = File::open("foo.txt")?;
    let mut buffer = [0; 5];

    // 最多读取五个字节
    let mut handle = f.take(5);

    handle.read(&mut buffer)?;
    Ok(())
}
```



## Implementors



### impl Read for &File

### impl Read for &TcpStream

### impl Read for &[u8]

通过从切片复制为 &[u8] 实现读取。

请注意，读取将更新切片以指向尚未读取的部分。 到达 EOF 时，切片将为空。



### impl Read for File

### impl Read for TcpStream

### impl Read for UnixStream

:::tip

仅在Unix可用

:::



### impl Read for ChildStderr

### impl Read for ChildStdout

### impl Read for Empty

### impl Read for Repeat

### impl Read for Stdin

### impl Read for StdinLock<'_>

### impl<'a> Read for &'a UnixStream

:::tip

仅在Unix可用

:::



### impl<A: Allocator> Read for VecDeque<u8, A>

`VecDeque<u8>` 通过消耗 VecDeque 前面的字节来实现读取。



### impl<R: Read + ?Sized> Read for &mut R

### impl<R: Read + ?Sized> Read for Box\<R>

### impl<R: Read> Read for BufReader\<R>

### impl\<T> Read for Cursor\<T>

```rust
impl<T> Read for Cursor<T>
where
  T: AsRef<[u8]>,
```



### impl<T: Read> Read for Take\<T>

### impl<T: Read, U: Read> Read for Chain<T, U>





