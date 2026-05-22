# BufRead

> Trait std::io::BufRead

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
    fn split(self, byte: u8) -> Split<Self> ⓘ
       where Self: Sized { ... }
    fn lines(self) -> Lines<Self> ⓘ
       where Self: Sized { ... }
}
```

