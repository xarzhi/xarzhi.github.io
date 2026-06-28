# Trait std::io::BufRead

`BufRead` 是带有内部缓冲区的 `Read` 类型，它可以执行其他读取方式。

例如，在不使用缓冲区的情况下，逐行读取效率很低，因此，如果要逐行读取，则需要 `BufRead`，其中包括 [`read_line`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.BufRead.html#method.read_line) 方法和 [`lines`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.BufRead.html#method.lines) 迭代器。

```rust
pub trait BufRead: Read {
    // Required methods
    fn fill_buf(&mut self) -> Result<&[u8]>;
    fn consume(&mut self, amt: usize);

    // Provided methods
    fn has_data_left(&mut self) -> Result<bool> { ... }
    fn read_until(&mut self, byte: u8, buf: &mut Vec<u8>) -> Result<usize> { ... }
    fn read_line(&mut self, buf: &mut String) -> Result<usize> { ... }
    fn split(self, byte: u8) -> Split<Self> 
       where Self: Sized { ... }
    fn lines(self) -> Lines<Self> 
       where Self: Sized { ... }
}
```

示例

锁定的标准输入实现 `BufRead`：

```rust
use std::io;
use std::io::prelude::*;

let stdin = io::stdin();
for line in stdin.lock().lines() {
    println!("{}", line.unwrap());
}
```

如果您具有实现 [`Read`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html) 的功能，则可以使用 [`BufReader`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.BufReader.html) [type](https://www.rustwiki.org.cn/zh-CN/std/io/struct.BufReader.html) 将其转换为 `BufRead`。

例如，[`File`](https://www.rustwiki.org.cn/zh-CN/std/fs/struct.File.html) 实现 [`Read`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html)，但不实现 `BufRead`。 [`BufReader`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.BufReader.html) 来救援！

```rust
use std::io::{self, BufReader};
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let f = File::open("foo.txt")?;
    let f = BufReader::new(f);

    for line in f.lines() {
        println!("{}", line.unwrap());
    }

    Ok(())
}
```

## Required Methods

### fill\_buf

返回内部缓冲区的内容，如果内部缓冲区为空，则使用内部 reader 中的更多数据填充内部缓冲区。

把数据“预读到缓冲区”，然后让你直接读缓冲区，而不真正消耗它。

```rust
fn fill_buf(&mut self) -> Result<&[u8]>
```

**返回值**：

```rust
use std::fs::File;
use std::io::{BufRead, BufReader};

fn main() {
    let f1 = File::open("test.txt").unwrap();
    let mut reader = BufReader::new(f1);

    println!("{:#?}", reader.fill_buf().unwrap());
}

```

:::tip

此函数是较低级别的调用。它需要与 [`consume`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.BufRead.html#tymethod.consume) 方法配对才能正确执行功能。 当调用此方法时，任何内容都不是 “read”，因为稍后调用 `read` 可能会返回相同的内容。 因此，必须使用此缓冲区消耗的字节数来调用 [`consume`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.BufRead.html#tymethod.consume)，以确保字节永远不会返回两次。

返回的空缓冲区表示流已达到 EOF。

:::

:::tip Errors

如果读取了底层 reader，但返回了错误，则此函数将返回 I/O 错误。

:::

### consume

告诉此缓冲区 `amt` 字节已从缓冲区中消耗掉，因此在调用 `read` 时不再应返回它们。

我看完这 `n`个字节了，你可以把它们删掉了。如果不 `consume`：下次 `fill_buf()`还会看到同样的数据,相当于“卡住不动”

```rust
fn consume(&mut self, amt: usize)
```

**参数**：

* **amt**：需要删除掉的字节数

```rust
use std::io;
use std::io::prelude::*;

let stdin = io::stdin();
let mut stdin = stdin.lock();

let buffer = stdin.fill_buf().unwrap();

// 使用缓冲区
println!("{buffer:?}");

// 确保我们处理过的字节以后不再返回
let length = buffer.len();
stdin.consume(length);
```

:::tip

告诉此缓冲区 `amt` 字节已从缓冲区中消耗掉，因此在调用 `read` 时不再应返回它们。

此函数是较低级别的调用。它需要与 [`fill_buf`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.BufRead.html#tymethod.fill_buf) 方法配合才能正常使用。 该函数不执行任何 I/O，它只是通知对象从 [`fill_buf`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.BufRead.html#tymethod.fill_buf) 返回的某些缓冲区已被消耗，不应再返回。

因此，如果在调用 [`fill_buf`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.BufRead.html#tymethod.fill_buf) 之前未对其进行调用，则此函数可能会做一些奇怪的事情。

`amt` 必须为 `<=`，即 [`fill_buf`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.BufRead.html#tymethod.fill_buf) 返回的缓冲区中的字节数。

:::

## Provided Methods

### has\_data\_left

检查底层 `Read` 是否有任何数据可供读取。

这个函数可能会填充缓冲区来检查数据，所以这个函数返回的是 `Result<bool>`，而不是 `bool`。

默认实现调用 `fill_buf` 并检查返回的 4 为空 (这意味着没有数据剩余，因为达到了 EOF)。

```rust
fn has_data_left(&mut self) -> Result<bool>
```

**返回值**：返回布尔值，判断Read是否还有数据可以读取，包含在Result中

```rust
#![feature(buf_read_has_data_left)]
use std::io;
use std::io::prelude::*;

let stdin = io::stdin();
let mut stdin = stdin.lock();

while stdin.has_data_left().unwrap() {
    let mut line = String::new();
    stdin.read_line(&mut line).unwrap();
    // 与行一起工作
    println!("{line:?}");
}
```

### read\_until

将读取的内容读取一个buf，一直读到某个“分隔字节”（通常是 `\n`）或者EOF为止

该函数正在阻塞，应谨慎使用：攻击者有可能连续发送字节而无需发送定界符或 EOF。

```rust
fn read_until(&mut self, byte: u8, buf: &mut Vec<u8>) -> Result<usize>
```

**参数**：

* **byte**：分隔符（如 b'\n'）

* **buf**：用来存放读到的数据

**返回值**：返回本次读到的字节数

有这么一个文件

```txt
hello
world
```

先读取到第一个换行符结束

```rust
use std::fs::File;
use std::io::{BufRead, BufReader};

fn main() {
    let file = File::open("test.txt").unwrap();
    let mut reader = BufReader::new(file);

    let mut buf = Vec::new();
    reader.read_until(b'\n', &mut buf).unwrap();
 
    println!("{:?}", String::from_utf8_lossy(&buf));   // "hello\r\n"
}
```

也可以指定其他的字符作为结束符

```rust
use std::fs::File;
use std::io::{BufRead, BufReader};

fn main() {
    let file = File::open("test.txt").unwrap();
    let mut reader = BufReader::new(file);

    let mut buf = Vec::new();

    reader.read_until(b'l', &mut buf).unwrap();

    println!("{:?}", String::from_utf8_lossy(&buf));  // "hel"
}
```

:::tip error

该函数将忽略 [`ErrorKind::Interrupted`](https://www.rustwiki.org.cn/zh-CN/std/io/enum.ErrorKind.html#variant.Interrupted) 的所有实例，否则将返回 [`fill_buf`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.BufRead.html#tymethod.fill_buf) 返回的任何错误。

如果遇到 I/O 错误，则 `buf` 中将存在到目前为止已读取的所有字节，并且已对其长度进行了适当的调整。

:::

### read\_line

从流里读一整行文本（UTF‑8），并追加到 `String`里

它是对 **`read_until(b'\n')`的“文本友好版封装”**。

```rust
fn read_line(&mut self, buf: &mut String) -> Result<usize>
```

**参数**：

* **buf**：用来存放读到的数据的`String`

**返回值**：返回本次读到的字节数

有这么一个文件

```txt
缓缓飘落的枫叶像思念
为何挽回要赶在冬天来之前
```

使用`read_line`读取第一行

```rust
use std::fs::File;
use std::io::{BufRead, BufReader};

fn main() {
    let file = File::open("test.txt").unwrap();
    let mut reader = BufReader::new(file);

    let mut buf = String::new();

    reader.read_line(&mut buf).unwrap();

    println!("{}", buf)   // 缓缓飘落的枫叶像思念
}
```

### split

将读取的内容按照指定的分隔符分割成若干段，并返回一个迭代器

```rust
fn split(self, byte: u8) -> Split<Self>
where
    Self: Sized,
```

**参数**：

* **byte**：指定的分隔符

**返回值**：返回**迭代器**，每一项都是`io::Result<Vec<u8>>`，不包含分隔符

有这么一个文件

```txt
apple,banana,orange
```

根据`,`把这段字符串分为三部分

```rust
use std::fs::File;
use std::io::{BufRead, BufReader};

fn main() {
    let file = File::open("test.txt").unwrap();
    let reader = BufReader::new(file);

    for part in reader.split(b',') {
        let bytes = part.unwrap();
        println!("{}", String::from_utf8_lossy(&bytes));
    }
}

/*
    apple
    banana
    orange
*/
```

### lines

按行读取文本文件，自动处理 `\n`/ `\r\n`，返回迭代器，每一项都是一行，且为`io::Result<String>`

```rust
fn lines(self) -> Lines<Self>
where
    Self: Sized,
```

**返回值**：返回**迭代器**，每一项都是`io::Result<String>`

有这么一个文件

```txt
一天一天贴近你的心
你开心
我关心
```

按行读取并打印

```rust
use std::fs::File;
use std::io::{BufRead, BufReader};

fn main() {
    let file = File::open("test.txt").unwrap();
    let reader = BufReader::new(file);

    for part in reader.lines() {
        println!("{}", part.unwrap());
    }
}
```

## Implementors

### impl BufRead for &\[u8]

### impl BufRead for Empty

### impl BufRead for StdinLock<'\_>

### impl\<B: BufRead + ?Sized> BufRead for \&mut B

### impl\<B: BufRead + ?Sized> BufRead for Box\<B>

### impl\<R: Read> BufRead for BufReader\<R>

### impl\<T> BufRead for Cursor\<T>

```rust
impl<T> BufRead for Cursor<T>
where
  T: AsRef<[u8]>,
```

### impl\<T: BufRead> BufRead for Take\<T>

### impl\<T: BufRead, U: BufRead> BufRead for Chain\<T, U>
