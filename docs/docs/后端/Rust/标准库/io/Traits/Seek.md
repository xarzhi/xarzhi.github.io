# Seek

> Trait std::io::Seek




1.0.0 · source · [−]
pub trait Seek {
// Required method
fn seek(&mut self, pos: SeekFrom) -> Result<u64>;

// Provided methods
fn rewind(&mut self) -> Result<()> { ... }
fn stream_len(&mut self) -> Result<u64> { ... }
fn stream_position(&mut self) -> Result<u64> { ... }
}
Seek trait 提供了一个游标，可以在字节流中移动它。
流通常具有固定的大小，允许相对于端点或当前偏移量进行搜索。
Examples
File 的工具 Seek：
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
Required Methods
source
fn seek(&mut self, pos: SeekFrom) -> Result<u64>
在流中寻找以字节为单位的偏移量。
允许在流的末尾进行查找，但是行为由实现定义。
如果查找操作成功完成，则此方法从流的开头返回新位置。
该位置以后可以与 SeekFrom::Start 一起使用。
Errors
查找可能会失败，例如因为它可能涉及刷新缓冲区。
寻求负偏移被认为是错误。
Provided Methods
1.55.0 · source
fn rewind(&mut self) -> Result<()>
返回到流的开头。
这是一个方便的方法，相当于 seek(SeekFrom::Start(0))。
Errors
返回可能会失败，例如因为它可能涉及刷新缓冲区。
Example
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
source
fn stream_len(&mut self) -> Result<u64>
🔬This is a nightly-only experimental API. (seek_stream_len #59359)
返回此流的长度 (以字节为单位)。
此方法最多使用三个查找操作来实现。如果此方法成功返回，则搜索位置不变 (即，调用此方法之前的位置与之后的位置相同)。 但是，如果此方法返回错误，则未指定搜索位置。
如果您需要获取 多个 流的长度，并且以后不再关心查找位置，则可以通过简单地调用 seek(SeekFrom::End(0)) 并使用其返回值 (它也是流的长度) 来减少查找操作的次数。
请注意，流的长度可能会随时间变化 (例如，将数据追加到文件时)。因此，多次调用此方法不一定每次都返回相同的长度。
Example
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
1.51.0 · source
fn stream_position(&mut self) -> Result<u64>
从流的开头返回当前查找位置。
这等效于 self.seek(SeekFrom::Current(0))。
Example
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
Implementors
source
impl Seek for &File
source
impl Seek for File
1.51.0 · source
impl Seek for Empty
source
impl<R: Seek> Seek for BufReader<R>
source
impl<S: Seek + ?Sized> Seek for &mut S
source
impl<S: Seek + ?Sized> Seek for Box<S>
source
impl<T> Seek for Cursor<T>where
T: AsRef<[u8]>,
source
impl<W: Write + Seek> Seek for BufWriter<W>