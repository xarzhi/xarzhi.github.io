# Trait std::fmt::Write

一个用于写入或格式化为 Unicode 接受的缓冲区或流的 trait。

```rust
pub trait Write {
    // Required method
    fn write_str(&mut self, s: &str) -> Result<(), Error>;

    // Provided methods
    fn write_char(&mut self, c: char) -> Result<(), Error> { ... }
    fn write_fmt(&mut self, args: Arguments<'_>) -> Result<(), Error> { ... }
}
```

一个只接受 `UTF-8` 编码的数据，而不是 `flushable` 的 `trait`。 如果您只想接受 `Unicode` 且不需要冲洗，则应实现此 `trait`; 否则，请执行此操作。 否则，您应该实现 `std::io::Write`。



## Required Methods

#### write_str

将字符串切片写入此 writer，返回写入是否成功。

仅当成功写入整个字符串切片后，此方法才能成功，并且只有在写入所有数据或发生错误后，该方法才会返回。

```rust
fn write_str(&mut self, s: &str) -> Result<(), Error>
```

**参数**：

- **s**：需要写入的字符串

**返回值**：返回一个`Result`，表示是否写入成功

```rust
use std::fmt::{Error, Write};

fn writer<W: Write>(f: &mut W, s: &str) -> Result<(), Error> {
    f.write_str(s)
}

let mut buf = String::new();
writer(&mut buf, "hola").unwrap();
assert_eq!(&buf, "hola");
```

:::tip Errors

错误时，此函数将返回 [`Error`](../Structs/Error) 的实例。

:::



## Provided Methods

#### write_char

将 char 写入此 writer，返回写入是否成功。

单个 char 可以被编码为一个以上的字节。 仅当成功写入了整个字节序列后，此方法才能成功，并且直到所有数据都已写入或发生错误后，该方法才会返回。

```rust
fn write_char(&mut self, c: char) -> Result<(), Error>
```

**参数**：

- **c**：需要写入的字符

**返回值**：返回一个`Result`，表示是否写入成功

```rust
use std::fmt::{Error, Write};

fn writer<W: Write>(f: &mut W, c: char) -> Result<(), Error> {
    f.write_char(c)
}

let mut buf = String::new();
writer(&mut buf, 'a').unwrap();
writer(&mut buf, 'b').unwrap();
assert_eq!(&buf, "ab");
```

:::tip Errors

错误时，此函数将返回 [`Error`](../Structs/Error) 的实例。

:::



#### write_fmt

结合使用 `write!` 宏和 trait 的实现者。

通常不应手动调用此方法，而应通过 write! 宏本身来调用。

```rust
fn write_fmt(&mut self, args: Arguments<'_>) -> Result<(), Error>
```

**参数**：

- **args**：一个`Arguments`

**返回值**：返回一个`Result`，表示是否写入成功

```rust
use std::fmt::{Error, Write};

fn writer<W: Write>(f: &mut W, s: &str) -> Result<(), Error> {
    f.write_fmt(format_args!("{s}"))
}

let mut buf = String::new();
writer(&mut buf, "world").unwrap();
assert_eq!(&buf, "world");
```

:::tip Errors

错误时，此函数将返回 [`Error`](../Structs/Error) 的实例。

:::