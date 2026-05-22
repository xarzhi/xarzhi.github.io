# Functions

> std::io中的方法



## copy

将 `reader` 的全部内容复制到 writer 中。

此函数将连续从 `reader` 读取数据，然后以流方式将其写入 `writer`，直到 `reader` 返回 EOF。

成功后，将返回从 `reader` 复制到 `writer` 的字节总数。

如果要将一个文件的内容复制到另一个文件并且您正在使用文件系统路径，请参见 [`fs::copy`](https://www.rustwiki.org.cn/zh-CN/std/fs/fn.copy.html) 函数。

```rust
pub fn copy<R, W>(reader: &mut R, writer: &mut W) -> Result<u64>
where
    R: Read + ?Sized,
    W: Write + ?Sized,
```

**参数**：

- **R**：读取的内容
- **W**：复制的目的地，复制的东西会到这个参数里

**返回值**：返回从 `reader` 复制到 `writer` 的字节总数。

```rust
use std::io;

fn main() -> io::Result<()> {
    let mut reader: &[u8] = b"hello";
    let mut writer: Vec<u8> = vec![];

    io::copy(&mut reader, &mut writer)?;

    assert_eq!(&b"hello"[..], &writer[..]);
    Ok(())
}
```



## empty

为空的 reader 创建一个新的句柄。

从返回的读取器中读取的所有内容都将返回 `Ok(0)`。

```rust
pub fn empty() -> Empty 
```

**返回值**：返回一个`io::Empty`

不将任何内容读入缓冲区的一个令人悲伤的示例：

```rust
use std::io::{self, Read};

let mut buffer = String::new();

io::empty().read_to_string(&mut buffer).unwrap();

assert!(buffer.is_empty());
```



## read_to_string

将 [读取](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html) 的所有字节读入新的 [`String`](https://www.rustwiki.org.cn/zh-CN/std/string/struct.String.html)。

```rust
pub fn read_to_string<R: Read>(reader: R) -> Result<String>
```

**参数**：

- **reader**：需要被读取的内容，所有实现了`io::Read`特征的类型

**返回值**：返回一个`Result`，包含读取的内容

```rust
use std::fs::File;
use std::io;

fn main() -> io::Result<()> {
    let mut file = File::open("test.txt")?;

    let content = io::read_to_string(&mut file)?;

    println!("文件内容：\n{}", content);
    Ok(())
}
```

:::tip

这是 [`Read::read_to_string`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html#method.read_to_string) 的便捷函数。 使用此函数避免了必须先创建变量，并且提供了更多的类型安全性，因为只有在没有错误的情况下才可以取出缓冲区。 (如果使用 [`Read::read_to_string`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Read.html#method.read_to_string)，则必须记住检查读取是否成功，否则缓冲区将为空或仅部分充满。)

:::



## repeat

创建 reader 的实例，该实例无限重复一个字节。

通过用给定的字节填充指定的缓冲区，从 reader 进行的所有读取将成功。

```rust
pub fn repeat(byte: u8) -> Repeat
```

**参数**：

- **byte**：需要重复的字节

**返回值**：返回一个`Repeat`

```rust
use std::io::{self, Read};

let mut buffer = [0; 3];
io::repeat(0b101).read_exact(&mut buffer).unwrap();
assert_eq!(buffer, [0b101, 0b101, 0b101]);
```



## sink

创建 writer 的实例，该实例将成功消费所有数据。

在返回的实例上对 [`write`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#tymethod.write) 的所有调用都将返回 `Ok(buf.len())`，并且不会检查缓冲区的内容。

```rust
pub fn sink() -> Sink 
```

**返回值**：返回一个`Sink`



## stderr

为当前进程的标准错误创建一个新的句柄。

此句柄未缓冲。

```rust
pub fn stderr() -> Stderr 
```

**返回值**：返回一个`Stderr`

使用隐式同步：

```rust
use std::io::{self, Write};

fn main() -> io::Result<()> {
    io::stderr().write_all(b"hello world")?;

    Ok(())
}
```

使用显式同步：

```rust
use std::io::{self, Write};

fn main() -> io::Result<()> {
    let stderr = io::stderr();
    let mut handle = stderr.lock();

    handle.write_all(b"hello world")?;

    Ok(())
}
```

:::tip

**Note: Windows 可移植性注意事项**

在控制台中操作时，此流的 Windows 实现不支持非 UTF-8 字节序列。 尝试写入无效的 UTF-8 字节将返回错误。

在具有分离控制台的进程中，例如使用 `#![windows_subsystem = "windows"]` 的进程，或在从此类进程派生的子进程中，包含的句柄将为空。

在这种情况下，标准库的 `Read` 和 `Write` 将什么都不做，默默地成功。 通过标准库或通过原始 Windows API 调用的所有其他 I/O 操作都将失败。

:::







## stdin

为当前进程的标准输入创建一个新的句柄。

返回的每个句柄都是对共享缓冲区的引用，该缓冲区的访问通过互斥锁进行同步。 如果需要对锁定进行更明确的控制，请参见 [`Stdin::lock`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Stdin.html#method.lock) 方法。

```rust
pub fn stdin() -> Stdin
```

**返回值**：返回一个`Stdin`

使用隐式同步：

```rust
use std::io;

fn main() -> io::Result<()> {
    let mut buffer = String::new();
    io::stdin().read_line(&mut buffer)?;
    Ok(())
}
```

使用显式同步：

```rust
use std::io::{self, BufRead};

fn main() -> io::Result<()> {
    let mut buffer = String::new();
    let stdin = io::stdin();
    let mut handle = stdin.lock();

    handle.read_line(&mut buffer)?;
    Ok(())
}
```

:::tip

[Note: Windows 可移植性注意事项](https://www.rustwiki.org.cn/zh-CN/std/io/fn.stdin.html#note-windows-可移植性注意事项)

在控制台中操作时，此流的 Windows 实现不支持非 UTF-8 字节序列。 尝试读取无效的 UTF-8 字节将返回错误。

在具有分离控制台的进程中，例如使用 `#![windows_subsystem = "windows"]` 的进程，或在从此类进程派生的子进程中，包含的句柄将为空。

在这种情况下，标准库的 `Read` 和 `Write` 将什么都不做，默默地成功。 通过标准库或通过原始 Windows API 调用的所有其他 I/O 操作都将失败。

:::



## stdout

为当前进程的标准输出创建一个新的句柄。

返回的每个句柄都是对共享缓冲区的引用，该缓冲区的访问通过互斥锁进行同步。 如果需要对锁定进行更明确的控制，请参见 [`Stdout::lock`](https://www.rustwiki.org.cn/zh-CN/std/io/struct.Stdout.html#method.lock) 方法。

```rust
pub fn stdout() -> Stdout
```

**返回值**：返回一个`Stdout`

使用隐式同步：

```rust
use std::io::{self, Write};

fn main() -> io::Result<()> {
    io::stdout().write_all(b"hello world")?;

    Ok(())
}
```

使用显式同步：

```rust
use std::io::{self, Write};

fn main() -> io::Result<()> {
    let stdout = io::stdout();
    let mut handle = stdout.lock();

    handle.write_all(b"hello world")?;

    Ok(())
}
```

:::tip

[Note: Windows 可移植性注意事项](https://www.rustwiki.org.cn/zh-CN/std/io/fn.stdout.html#note-windows-可移植性注意事项)

在控制台中操作时，此流的 Windows 实现不支持非 UTF-8 字节序列。 尝试写入无效的 UTF-8 字节将返回错误。

在具有分离控制台的进程中，例如使用 `#![windows_subsystem = "windows"]` 的进程，或在从此类进程派生的子进程中，包含的句柄将为空。

在这种情况下，标准库的 `Read` 和 `Write` 将什么都不做，默默地成功。 通过标准库或通过原始 Windows API 调用的所有其他 I/O 操作都将失败。

:::