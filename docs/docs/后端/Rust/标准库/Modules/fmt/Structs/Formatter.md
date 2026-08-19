# Struct std::fmt::Formatter

格式化配置。

```rust
pub struct Formatter<'a> { /* private fields */ }
```

`Formatter` 代表与格式相关的各种选项。 用户不直接构建 `Formatter`s。将所有格式为 traits 的 `fmt` 方法 (例如 [`Debug`](../Traits/Debug) 和[`Display`](../Traits/Display)) 传递给 `fmt` 方法。

要与 `Formatter` 进行交互，您将调用各种方法来更改与格式相关的各种选项。 有关示例，请参见下面在 `Formatter` 上定义的方法的文档。



## Implementations

### impl<'a> Formatter<'a>

#### pad_integral

对已经发出到 str 中的整数执行正确的填充。 str *不应* 包含整数的符号，该符号将通过此方法添加。

```rust
pub fn pad_integral(
    &mut self,
    is_nonnegative: bool,
    prefix: &str,
    buf: &str
) -> Result<(), Error>
```

**参数**：

- **is_nonnegative**：原数是否 >= 0
  - 若为 `false`（负数），方法会自动在输出前加 `-`；
  - 若为 `true` 且 Formatter 上设置了 `{:+}`（sign_plus），则会补 `+` 。
- **prefix**：当格式串里出现 `#`（Alternate 标志）时，把这个字符串放到数字前面。例如实现 `{:#x}` 时传 `"0x"`，实现自定义的 `{:#}` 时也可以传任意字符串（见下面例子）。
- **buf**：数字本身的字符串形式，**必须是无符号的**（负数要先 `.abs()` 取绝对值再 `to_string()`）。宽度计算也是基于这个 buf 的长度 。

**返回值**：返回一个`Result`，若发生错误则返回`Err`

```rust
use std::fmt;

struct Foo { nb: i32 }

impl Foo {
    fn new(nb: i32) -> Foo {
        Foo {
            nb,
        }
    }
}

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        // 我们需要从数字输出中删除 "-"。
        let tmp = self.nb.abs().to_string();

        formatter.pad_integral(self.nb >= 0, "Foo ", &tmp)
    }
}

assert_eq!(format!("{}", Foo::new(2)), "2");
assert_eq!(format!("{}", Foo::new(-1)), "-1");
assert_eq!(format!("{}", Foo::new(0)), "0");
assert_eq!(format!("{:#}", Foo::new(-1)), "-Foo 1");
assert_eq!(format!("{:0>#8}", Foo::new(-1)), "00-Foo 1");
```





#### pad

把“已经拼好的完整字符串”按用户指定的宽度、对齐、填充符、精度直接排版

此函数将获取一个字符串切片并将其发送到内部缓冲区。 泛型字符串可识别的标志为：

- width - 发射的最小宽度
- fill/align - 如果需要填充提供的字符串，要发出什么以及在哪里发出
- precision - 发出的最大长度，如果字符串长于该长度，则字符串将被截断

值得注意的是，此函数将忽略 `flag` 参数。

```rust
pub fn pad(&mut self, s: &str) -> Result<(), Error>
```

**参数**：

- **s**：你已经拼好的最终输出内容（符号、前缀、后缀全部自己负责）

**返回值**：返回一个`Result`，若发生错误则返回`Err`

```rust
use std::fmt;

struct Foo;

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.pad("Foo11")
    }
}

fn main() {
    println!("{Foo:<8}"); // Foo11
    println!("{Foo:0>8}"); // 000Foo11
    println!("{Foo:A>8}"); // AAAFoo11
}
```



#### write_str

```rust
pub fn write_str(&mut self, data: &str) -> Result<(), Error>
```



#### write_fmt

```rust
pub fn write_fmt(&mut self, fmt: Arguments<'_>) -> Result<(), Error>
```



#### fill

```rust
pub fn fill(&self) -> char
```



#### align

```rust
pub fn align(&self) -> Option<Alignment>
```



#### width

```rust
pub fn width(&self) -> Option<usize>
```



#### precision

```rust
pub fn precision(&self) -> Option<usize>
```



#### sign_plus

```rust
pub fn sign_plus(&self) -> bool
```



#### sign_minus

```rust
pub fn sign_minus(&self) -> bool
```



#### alternate

```rust
pub fn alternate(&self) -> bool
```



#### sign_aware_zero_pad

```rust
pub fn sign_aware_zero_pad(&self) -> bool
```



#### debug_struct

```rust
pub fn debug_struct<'b>(&'b mut self, name: &str) -> DebugStruct<'b, 'a>
```



#### debug_tuple

```rust
pub fn debug_tuple<'b>(&'b mut self, name: &str) -> DebugTuple<'b, 'a>
```



#### debug_list

```rust
pub fn debug_list<'b>(&'b mut self) -> DebugList<'b, 'a>
```



#### debug_set

```rust
pub fn debug_set<'b>(&'b mut self) -> DebugSet<'b, 'a>
```



#### debug_map

```rust
pub fn debug_map<'b>(&'b mut self) -> DebugMap<'b, 'a>
```

