# Trait std::io::Seek

`Seek` trait 提供了一个游标，可以在字节流中移动它。

也就是说`Seek`让你可以像操作文件指针一样，在流中前后跳转。

流通常具有固定的大小，允许相对于端点或当前偏移量进行搜索。

```rust
pub trait Seek {
    // Required method
    fn seek(&mut self, pos: SeekFrom) -> Result<u64>;

    // Provided methods
    fn rewind(&mut self) -> Result<()> { ... }
    fn stream_len(&mut self) -> Result<u64> { ... }
    fn stream_position(&mut self) -> Result<u64> { ... }
}
```



:::tip 示例

[`File`](https://www.rustwiki.org.cn/zh-CN/std/fs/struct.File.html) 的工具 `Seek`：

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;
use std::io::SeekFrom;

fn main() -> io::Result<()> {
    let mut f = File::open("foo.txt")?;

    // 从文件的开头将游标移动 42 个字节
    f.seek(SeekFrom::Start(42))?;
    Ok(())
}
```

:::





## Required Methods

### seek

在流中寻找以字节为单位的偏移量。

允许在流的末尾进行查找，但是行为由实现定义。

如果查找操作成功完成，则此方法从流的开头返回新位置。

该位置以后可以与 [`SeekFrom::Start`](https://www.rustwiki.org.cn/zh-CN/std/io/enum.SeekFrom.html#variant.Start) 一起使用。

```rust
fn seek(&mut self, pos: SeekFrom) -> Result<u64>
```

**参数**：

- `pos`：一个`SeekFrom`，用于调整游标位置

**返回值**：返回新的位置

```rust
use std::fs::OpenOptions;
use std::io::{self, Read, Seek, SeekFrom, Write};
fn main() -> io::Result<()> {
    let mut f = OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open("test.txt")
        .unwrap();

    f.write_all(b"abcdef").unwrap();

    // 回到开头
    f.seek(SeekFrom::Start(0))?;

    let mut buf = [0u8; 2];
    f.read_exact(&mut buf)?;

    println!("{:#?}", String::from_utf8_lossy(&buf));   // ab
    Ok(())
}

```



跳到文件开头

```rust {7}
use std::fs::File;
use std::io::Seek;
use std::io::SeekFrom;

fn main() {
    let mut file = File::create("test.txt").unwrap();
    file.seek(SeekFrom::Start(0)).unwrap();
}
```

跳到文件末尾

```rust {7}
use std::fs::File;
use std::io::Seek;
use std::io::SeekFrom;

fn main() {
    let mut file = File::create("test.txt").unwrap();
    file.seek(SeekFrom::End(0)).unwrap();
}
```

向前 / 向后移动

```rust {7,8}
use std::fs::File;
use std::io::Seek;
use std::io::SeekFrom;

fn main() {
    let mut file = File::create("test.txt").unwrap();
    file.seek(SeekFrom::Current(10)).unwrap();  // 向后 10 字节
	file.seek(SeekFrom::Current(-5)).unwrap();  // 向前 5 字节
}
```

从末尾倒数

```rust
use std::fs::File;
use std::io::Seek;
use std::io::SeekFrom;

fn main() {
    let mut file = File::create("test.txt").unwrap();
    file.seek(SeekFrom::End(-10)).unwrap(); // 最后 10 个字节
}
```

获取当前位置

```rust
use std::fs::File;
use std::io::Seek;
use std::io::SeekFrom;

fn main() {
    let mut file = File::create("test.txt").unwrap();
    let pos = file.seek(SeekFrom::Current(0)).unwrap();
}
```





:::tip Errors

查找可能会失败，例如因为它可能涉及刷新缓冲区。

寻求负偏移被认为是错误。

:::



## Provided Methods



### rewind

返回到流的开头。

这是一个方便的方法，相当于 `seek(SeekFrom::Start(0))`。

```rust
fn rewind(&mut self) -> Result<()>
```

**返回值**：若操作成功则返回`OK(())`，否则返回`std::io::Error`

```RUST
use std::io::{Read, Seek, Write};
use std::fs::OpenOptions;

let mut f = OpenOptions::new()
    .write(true)
    .read(true)
    .create(true)
    .open("foo.txt").unwrap();

let hello = "Hello!\n";
write!(f, "{hello}").unwrap();
f.rewind().unwrap();

let mut buf = String::new();
f.read_to_string(&mut buf).unwrap();
assert_eq!(&buf, hello);
```

:::tip Error

返回可能会失败，例如因为它可能涉及刷新缓冲区。

:::



### stream_len

返回此流的长度 (以字节为单位)。

```rust
fn stream_len(&mut self) -> Result<u64>
```

**返回值**：返回流的长度

```RUST
#![feature(seek_stream_len)]
use std::{
    io::{self, Seek},
    fs::File,
};

fn main() -> io::Result<()> {
    let mut f = File::open("foo.txt")?;

    let len = f.stream_len()?;
    println!("The file is currently {len} bytes long");
    Ok(())
}
```



### stream_position

从流的开头返回当前查找位置。

这等效于 `self.seek(SeekFrom::Current(0))`。

```rust
fn stream_position(&mut self) -> Result<u64>
```

**返回值**：返回当前的查找位置

```RUST
use std::{
    io::{self, BufRead, BufReader, Seek},
    fs::File,
};

fn main() -> io::Result<()> {
    let mut f = BufReader::new(File::open("foo.txt")?);

    let before = f.stream_position()?;
    f.read_line(&mut String::new())?;
    let after = f.stream_position()?;

    println!("The first line was {} bytes long", after - before);
    Ok(())
}
```







## Implementors

### impl Seek for &File

### impl Seek for File

### impl Seek for Empty

### impl<R: Seek> Seek for BufReader\<R>

### impl<S: Seek + ?Sized> Seek for &mut S

### impl<S: Seek + ?Sized> Seek for Box\<S>

### impl\<T> Seek for Cursor\<T>

```rust
impl<T> Seek for Cursor<T>
where
  T: AsRef<[u8]>,
```

### impl<W: Write + Seek> Seek for BufWriter\<W>
