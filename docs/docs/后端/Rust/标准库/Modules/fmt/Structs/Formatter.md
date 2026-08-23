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

```rust {18}
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

也就是把`:`左边的内容进行填充

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

将一些数据写入此格式化程序中包含的底层缓冲区。

```rust
pub fn write_str(&mut self, data: &str) -> Result<(), Error>
```

**参数**：

- **data**：需要写入的内容

**返回值**：返回一个`Result`，若发生错误则返回`Err`

```rust
use std::fmt;

struct Foo;

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str("Foo")
        // 这相当于：
        // write!(formatter, "Foo")
    }
}

fn main() {
    let str = format!("{Foo}");
    println!("{:#?}", str); // "Foo"

    let str = format!("{Foo:0>8}");
    println!("{:#?}", str); // "Foo"
}
```



#### write_fmt

将一些格式化的信息写入此实例。

```rust
pub fn write_fmt(&mut self, fmt: Arguments<'_>) -> Result<(), Error>
```

**参数**：

- **fmt**：一个`Arguments`格式化信息

**返回值**：返回一个`Result`，若发生错误则返回`Err`

```rust
use std::fmt;

struct Foo(i32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_fmt(format_args!("Foo {}", self.0))
    }
}

assert_eq!(format!("{}", Foo(-1)), "Foo -1");
assert_eq!(format!("{:0>8}", Foo(2)), "Foo 2");
```



#### fill

fill 返回格式化时用于填充的字符。填充字符是在格式化字符串中通过 `:0>` 这样的语法指定的（这里的 0 就是填充字符）。如果没有显式指定，默认填充字符是空格 `' '`。

```rust
pub fn fill(&self) -> char
```

**返回值**：返回一个`char`，若发生错误则返回`Err`

```rust
use std::fmt;

struct Foo;

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let c = formatter.fill();
        println!("填充字符为{:#?}", c);

        if let Some(width) = formatter.width() {
            for _ in 0..width {
                write!(formatter, "{c}")?;
            }
            Ok(())
        } else {
            write!(formatter, "{c}")
        }
    }
}

fn main() {
    println!("{:#?}", format!("{Foo:G>3}")); // "GGG"
    println!("{:#?}", format!("{Foo:t>6}")); // "tttttt"
}
```



#### align

获取对齐方向，根据冒号后面的`>`、`<`、`^`返回

```rust
pub fn align(&self) -> Option<Alignment>
```

**返回值**：返回一个`Alignment`枚举，可能值为：`Alignment::Left` 、`Alignment::Right`、`Alignment::Center`

```rust
use std::fmt::{self, Alignment};

struct Foo;

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let s = if let Some(s) = formatter.align() {
            match s {
                Alignment::Left    => "left",
                Alignment::Right   => "right",
                Alignment::Center  => "center",
            }
        } else {
            "into the void"
        };
        write!(formatter, "{s}")
    }
}

assert_eq!(format!("{Foo:<}"), "left");
assert_eq!(format!("{Foo:>}"), "right");
assert_eq!(format!("{Foo:^}"), "center");
assert_eq!(format!("{Foo}"), "into the void");
```





#### width

获取指定的输出宽度

```rust
pub fn width(&self) -> Option<usize>
```

**返回值**：返回一个`Option`，包含获取到的输出宽度

```rust
use std::fmt;

struct Foo(i32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        if let Some(width) = formatter.width() {
            // 如果我们收到一个宽度，我们就用它
            write!(formatter, "{:width$}", format!("Foo({})", self.0), width = width)
        } else {
            // 否则我们没什么特别的
            write!(formatter, "Foo({})", self.0)
        }
    }
}

assert_eq!(format!("{:10}", Foo(23)), "Foo(23)   ");
assert_eq!(format!("{}", Foo(23)), "Foo(23)");
```



#### precision

可选地为数字类型指定精度。 或者，为字符串类型的最大宽度。

```rust
pub fn precision(&self) -> Option<usize>
```

**返回值**：返回一个`Option`，包含获取到的输出宽度

```rust
use std::fmt;

struct Foo(f32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        if let Some(precision) = formatter.precision() {
            // 如果我们收到了精度，我们就会使用它。
            write!(formatter, "Foo({1:.*})", precision, self.0)
        } else {
            // 否则我们默认为 2.
            write!(formatter, "Foo({:.2})", self.0)
        }
    }
}

assert_eq!(format!("{:.4}", Foo(23.2)), "Foo(23.2000)");
assert_eq!(format!("{}", Foo(23.2)), "Foo(23.20)");
```





#### sign_plus

判断是否指定了 `+` 标志。

```rust
pub fn sign_plus(&self) -> bool
```

**返回值**：返回一个`bool`值

```rust
use std::fmt;

struct Foo(i32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        if formatter.sign_plus() {
            write!(formatter,
                   "Foo({}{})",
                   if self.0 < 0 { '-' } else { '+' },
                   self.0.abs())
        } else {
            write!(formatter, "Foo({})", self.0)
        }
    }
}

assert_eq!(format!("{:+}", Foo(23)), "Foo(+23)");
assert_eq!(format!("{:+}", Foo(-23)), "Foo(-23)");
assert_eq!(format!("{}", Foo(23)), "Foo(23)");
```



#### sign_minus

判断是否指定了 `-` 标志。

```rust
pub fn sign_minus(&self) -> bool
```

**返回值**：返回一个`bool`值

```rust
use std::fmt;

struct Foo(i32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        if formatter.sign_minus() {
            // 您想要一个减号？ 有一个！
            write!(formatter, "-Foo({})", self.0)
        } else {
            write!(formatter, "Foo({})", self.0)
        }
    }
}

assert_eq!(format!("{:-}", Foo(23)), "-Foo(23)");
assert_eq!(format!("{}", Foo(23)), "Foo(23)");
```



#### alternate

判断是否指定了 `#` 标志。

```rust
pub fn alternate(&self) -> bool
```

**返回值**：返回一个`bool`值

```rust
use std::fmt;

struct Foo(i32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        if formatter.alternate() {
            write!(formatter, "Foo({})", self.0)
        } else {
            write!(formatter, "{}", self.0)
        }
    }
}

assert_eq!(format!("{:#}", Foo(23)), "Foo(23)");
assert_eq!(format!("{}", Foo(23)), "23");
```



#### sign_aware_zero_pad

判读是否指定了 `0` 标志。

```rust
pub fn sign_aware_zero_pad(&self) -> bool
```

**返回值**：返回一个`bool`值

```rust
use std::fmt;

struct Foo(i32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        assert!(formatter.sign_aware_zero_pad());
        assert_eq!(formatter.width(), Some(4));
        // 我们忽略格式化程序的选项。
        write!(formatter, "{}", self.0)
    }
}

assert_eq!(format!("{:04}", Foo(23)), "23");
```



#### debug_struct

创建一个 `DebugStruct`构建器，该构建器旨在帮助创建结构体的`fmt::Debug`实现。

用于**辅助实现 `Debug` trait**，让你能方便地以标准格式输出结构体。它会帮你处理花括号、字段名、逗号分隔等所有繁琐的格式细节。

```rust
pub fn debug_struct<'b>(&'b mut self, name: &str) -> DebugStruct<'b, 'a>
```

**参数**：

- **name**：结构体的名字

**返回值**：返回一个`DebugStruct`，`DebugStruct`上有一系列方法，方便格式化打印`Struct`

```rust
use std::fmt;

struct Point {
    x: i32,
    y: i32,
}

impl fmt::Debug for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("Point")   // 开始：Point {
            .field("x", &self.x)  // 添加字段：x: 10,
            .field("y", &self.y)  // 添加字段：y: 20
            .finish()              // 结束：}
    }
}

fn main() {
    let p = Point { x: 10, y: 20 };
    println!("{:?}", p);
    // 输出: Point { x: 10, y: 20 }
}
```

带格式控制的 `Debug`

```rust
use std::fmt;

struct Rectangle {
    width: u32,
    height: u32,
    label: String,
}

impl fmt::Debug for Rectangle {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut ds = f.debug_struct("Rectangle");
        
        // 如果用了 # 格式（{:#?}），加个漂亮打印的效果
        if f.alternate() {
            ds = ds.field("width", &self.width)
                   .field("height", &self.height)
                   .field("label", &self.label);
        } else {
            ds = ds.field("w", &self.width)
                   .field("h", &self.height)
                   .field("label", &self.label);
        }
        
        ds.finish()
    }
}

fn main() {
    let r = Rectangle { width: 100, height: 200, label: "box".to_string() };
    
    println!("{:?}", r);
    // 输出: Rectangle { w: 100, h: 200, label: "box" }
    
    println!("{:#?}", r);
    // 输出:
    // Rectangle {
    //     width: 100,
    //     height: 200,
    //     label: "box",
    // }
}
```

条件字段

```rust
use std::fmt;

struct User {
    id: u32,
    name: String,
    password_hash: Option<String>,
}

impl fmt::Debug for User {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut ds = f.debug_struct("User");
        
        ds.field("id", &self.id)
          .field("name", &self.name);
        
        // 只在密码存在时才输出（实际中你可能想隐藏敏感字段）
        if let Some(ref pwd) = self.password_hash {
            ds.field("password_hash", &format_args!("***{}***", pwd.len()));
        }
        
        ds.finish()
    }
}

fn main() {
    let u = User { 
        id: 1, 
        name: "Alice".to_string(), 
        password_hash: Some("abc123".to_string()),
    };
    println!("{:?}", u);
    // 输出: User { id: 1, name: "Alice", password_hash: ***6*** }
}
```

嵌套结构体

```rust
use std::fmt;

struct Inner {
    a: i32,
    b: String,
}

impl fmt::Debug for Inner {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("Inner")
            .field("a", &self.a)
            .field("b", &self.b)
            .finish()
    }
}

struct Outer {
    name: String,
    inner: Inner,
}

impl fmt::Debug for Outer {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("Outer")
            .field("name", &self.name)
            .field("inner", &self.inner)  // 嵌套，自动调用 Inner 的 Debug
            .finish()
    }
}

fn main() {
    let o = Outer {
        name: "test".to_string(),
        inner: Inner { a: 42, b: "hello".to_string() },
    };
    println!("{:#?}", o);
    // 输出:
    // Outer {
    //     name: "test",
    //     inner: Inner {
    //         a: 42,
    //         b: "hello",
    //     },
    // }
}
```

不用 `debug_struct`（手动拼字符串，很痛苦）：

```rust
impl fmt::Debug for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Point {{ x: {:?}, y: {:?} }}", self.x, self.y)
    }
}
```



#### debug_tuple

创建一个 `DebugTuple` 构建器，手动实现**元组结构体**（tuple struct）或**枚举变体**的 `Debug`

```rust
pub fn debug_tuple<'b>(&'b mut self, name: &str) -> DebugTuple<'b, 'a>
```

**参数**：

- **name**：元组结构体或枚举变体的名字

**返回值**：返回一个`DebugTuple`，`DebugTuple`上有一系列方法，方便格式化打印`Tuple`

```rust
use std::fmt;

// 元组结构体
struct Point(i32, i32);

impl fmt::Debug for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_tuple("Point")    // 开始：Point(
            .field(&self.0)       // 第 0 个字段
            .field(&self.1)       // 第 1 个字段
            .finish()             // 结束：)
    }
}

fn main() {
    let p = Point(10, 20);
    println!("{:?}", p);
    // 输出: Point(10, 20)
    
    println!("{:#?}", p);
    // 输出:
    // Point(
    //     10,
    //     20,
    // )
}
```

单元素元组结构体

```rust
use std::fmt;

struct Id(u64);

impl fmt::Debug for Id {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_tuple("Id")
            .field(&self.0)
            .finish()
    }
}

fn main() {
    let id = Id(12345);
    println!("{:?}", id);
    // 输出: Id(12345)
    
    // {:#?} 时，单元素元组会加逗号区分（Rust 语法要求）
    println!("{:#?}", id);
    // 输出:
    // Id(
    //     12345,
    // )
}
```

枚举变体

```rust
use std::fmt;

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

impl fmt::Debug for Message {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Message::Quit => {
                f.debug_tuple("Quit").finish()
            }
            Message::Move { x, y } => {
                f.debug_tuple("Move")
                    .field(x)
                    .field(y)
                    .finish()
            }
            Message::Write(text) => {
                f.debug_tuple("Write")
                    .field(text)
                    .finish()
            }
            Message::ChangeColor(r, g, b) => {
                f.debug_tuple("ChangeColor")
                    .field(r)
                    .field(g)
                    .field(b)
                    .finish()
            }
        }
    }
}

fn main() {
    let msg1 = Message::Quit;
    let msg2 = Message::Write("hello".to_string());
    let msg3 = Message::ChangeColor(255, 128, 0);
    
    println!("{:?}", msg1);
    // 输出: Quit
    
    println!("{:?}", msg2);
    // 输出: Write("hello")
    
    println!("{:?}", msg3);
    // 输出: ChangeColor(255, 128, 0)
}
```

嵌套

```rust
use std::fmt;

struct Point(i32, i32);
impl fmt::Debug for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_tuple("Point")
            .field(&self.0)
            .field(&self.1)
            .finish()
    }
}
struct Inner(i32, String);

impl fmt::Debug for Inner {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_tuple("Inner")
            .field(&self.0)
            .field(&self.1)
            .finish()
    }
}

struct Outer(Point, Inner);

impl fmt::Debug for Outer {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_tuple("Outer")
            .field(&self.0)   // Point 实现了 Debug，自动调用
            .field(&self.1)   // Inner 同理
            .finish()
    }
}

fn main() {
    let o = Outer(Point(1, 2), Inner(42, "hi".to_string()));
    println!("{:#?}", o);
    // 输出:
    // Outer(
    //     Point(
    //         1,
    //         2,
    //     ),
    //     Inner(
    //         42,
    //         "hi",
    //     ),
    // )
}
```



#### debug_list

用于手动实现集合类型的 `Debug`，输出标准的 `[a, b, c]` 格式。是个构建器，帮你自动处理方括号、逗号、缩进。

```rust
pub fn debug_list<'b>(&'b mut self) -> DebugList<'b, 'a>
```

**返回值**：返回一个`DebugList`构建器，逐个添加元素，最后输出。

基本用法

```rust
use std::fmt;

struct MyList(Vec<i32>);

impl fmt::Debug for MyList {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut dl = f.debug_list();
        for item in &self.0 {
            dl.entry(item);
        }
        dl.finish()
    }
}

fn main() {
    let l = MyList(vec![1, 2, 3]);
    println!("{:?}", l);
    // 输出: [1, 2, 3]
    
    println!("{:#?}", l);
    // 输出:
    // [
    //     1,
    //     2,
    //     3,
    // ]
}
```

用 `entries` 简化

```rust
use std::fmt;

struct MyList(Vec<i32>);

impl fmt::Debug for MyList {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_list()
            .entries(&self.0)   // 一次性把整个 Vec 加进去
            .finish()
    }
}

fn main() {
    let l = MyList(vec![1, 2, 3]);
    println!("{:?}", l);
    // 输出: [1, 2, 3]
}
```

混合类型元素

```rust
use std::fmt;

struct MixedList {
    items: Vec<String>,
    count: i32,
}

impl fmt::Debug for MixedList {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut dl = f.debug_list();
        dl.entry(&self.count);          // i32
        for item in &self.items {
            dl.entry(item);             // String
        }
        dl.finish()
    }
}

fn main() {
    let l = MixedList { 
        items: vec!["hello".to_string(), "world".to_string()], 
        count: 2 
    };
    println!("{:?}", l);
    // 输出: [2, "hello", "world"]
}
```

嵌套列表

```rust
use std::fmt;

struct Matrix(Vec<Vec<i32>>);

impl fmt::Debug for Matrix {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut dl = f.debug_list();
        for row in &self.0 {
            dl.entry(row);   // row 是 &Vec<i32>，Vec<T> 自带 Debug，输出为 [...]
        }
        dl.finish()
    }
}

fn main() {
    let m = Matrix(vec![vec![1, 2], vec![3, 4]]);
    println!("{:#?}", m);
    // 输出:
    // [
    //     [
    //         1,
    //         2,
    //     ],
    //     [
    //         3,
    //         4,
    //     ],
    // ]
}
```

空列表

```rust
use std::fmt;

struct EmptyList;

impl fmt::Debug for EmptyList {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_list().finish()
    }
}

fn main() {
    println!("{:?}", EmptyList);
    // 输出: []
}
```

手动写 vs 用 `debug_list`

```rust
// 手动写
impl fmt::Debug for MyList {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "[")?;
        for (i, item) in self.0.iter().enumerate() {
            if i > 0 { write!(f, ", ")?; }
            write!(f, "{:?}", item)?;
        }
        write!(f, "]")
    }
}

// 使用debug_list
impl fmt::Debug for MyList {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_list()
            .entries(&self.0)
            .finish()
    }
}
```





#### debug_set

`debug_set` 用于手动实现集合类型的 `Debug`，输出标准的 `{a, b, c}` 格式（花括号、逗号分隔，没有冒号——和 `debug_map` 区分开）。它也是个构建器，自动处理花括号、逗号、缩进。

```rust
pub fn debug_set<'b>(&'b mut self) -> DebugSet<'b, 'a>
```

**返回值**：返回一个`DebugSet`构建器，逐个添加元素，最后输出。

基本用法

```rust
use std::fmt;

struct MySet(Vec<i32>);  // 假装是个 set（不去重了，演示用）

impl fmt::Debug for MySet {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut ds = f.debug_set();
        for item in &self.0 {
            ds.entry(item);
        }
        ds.finish()
    }
}

fn main() {
    let s = MySet(vec![3, 1, 4]);
    println!("{:?}", s);
    // 输出: {3, 1, 4}
    
    println!("{:#?}", s);
    // 输出:
    // {
    //     3,
    //     1,
    //     4,
    // }
}
```

用 `entries` + 真实 `HashSet`

```rust
use std::collections::HashSet;
use std::fmt;

struct MySet(HashSet<String>);

impl fmt::Debug for MySet {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_set()
            .entries(&self.0)   // HashSet 实现了 IntoIterator
            .finish()
    }
}

fn main() {
    let mut set = HashSet::new();
    set.insert("apple".to_string());
    set.insert("banana".to_string());
    set.insert("cherry".to_string());
    
    let s = MySet(set);
    println!("{:?}", s);
    // 输出类似: {"apple", "banana", "cherry"}（顺序不确定）
}
```

混合类型元素

```rust
use std::fmt;

struct MixedSet {
    numbers: Vec<i32>,
    label: String,
}

impl fmt::Debug for MixedSet {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut ds = f.debug_set();
        ds.entry(&self.label);          // String
        for n in &self.numbers {
            ds.entry(n);                // i32
        }
        ds.finish()
    }
}

fn main() {
    let s = MixedSet { 
        numbers: vec![1, 2, 3], 
        label: "numbers".to_string() 
    };
    println!("{:?}", s);
    // 输出: {"numbers", 1, 2, 3}
}
```

嵌套（Set 里套 List）

```rust
use std::fmt;

struct Tags(Vec<String>);

impl fmt::Debug for Tags {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_list()
            .entries(&self.0)
            .finish()
    }
}

struct Groups {
    tags: Tags,
    ids: Vec<i32>,
}

impl fmt::Debug for Groups {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut ds = f.debug_set();
        ds.entry(&self.tags);    // Tags 实现了 Debug，输出为 [...]
        ds.entry(&self.ids);     // Vec<i32> 自带 Debug，输出为 [...]
        ds.finish()
    }
}

fn main() {
    let g = Groups { 
        tags: Tags(vec!["rust".to_string(), "fmt".to_string()]), 
        ids: vec![1, 2] 
    };
    println!("{:#?}", g);
    // 输出:
    // {
    //     [
    //         "rust",
    //         "fmt",
    //     ],
    //     [
    //         1,
    //         2,
    //     ],
    // }
}
```

空集合

```rust
use std::fmt;

struct EmptySet;

impl fmt::Debug for EmptySet {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_set().finish()
    }
}

fn main() {
    println!("{:?}", EmptySet);
    // 输出: {}
}
```

手动写 vs 用 `debug_set`

```rust
// 手动写
impl fmt::Debug for MySet {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{{")?;
        for (i, item) in self.0.iter().enumerate() {
            if i > 0 { write!(f, ", ")?; }
            write!(f, "{:?}", item)?;
        }
        write!(f, "}}")
    }
}

// 使用debug_set
impl fmt::Debug for MySet {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_set()
            .entries(&self.0)
            .finish()
    }
}
```





#### debug_map

用于手动实现映射（键值对集合）类型的 `Debug`，输出标准的 `{k: v, k: v}` 格式。它也是个构建器，自动处理花括号、冒号、逗号、缩进。

```rust
pub fn debug_map<'b>(&'b mut self) -> DebugMap<'b, 'a>
```

**返回值**：`DebugMap<'b, 'a>` ， 一个构建器，逐个添加键值对，最后输出。

基本用法

```rust
use std::fmt;

struct MyMap {
    k1: i32,
    k2: String,
}

impl fmt::Debug for MyMap {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut dm = f.debug_map();
        dm.entry(&"k1", &self.k1);
        dm.entry(&"k2", &self.k2);
        dm.finish()
    }
}

fn main() {
    let m = MyMap { k1: 42, k2: "hello".to_string() };
    println!("{:?}", m);
    // 输出: {"k1": 42, "k2": "hello"}
    
    println!("{:#?}", m);
    // 输出:
    // {
    //     "k1": 42,
    //     "k2": "hello",
    // }
}
```

用 `entries` + 真实 `HashMap`

```rust
use std::collections::HashMap;
use std::fmt;

struct MyMap(HashMap<String, i32>);

impl fmt::Debug for MyMap {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_map()
            .entries(&self.0)   // HashMap 实现了 IntoIterator<Item = (&K, &V)>
            .finish()
    }
}

fn main() {
    let mut map = HashMap::new();
    map.insert("a".to_string(), 1);
    map.insert("b".to_string(), 2);
    
    let m = MyMap(map);
    println!("{:?}", m);
    // 输出类似: {"a": 1, "b": 2}
}
```

key + value 分步添加

```rust
use std::fmt;

struct MyMap {
    items: Vec<(String, i32)>,
}

impl fmt::Debug for MyMap {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut dm = f.debug_map();
        for (k, v) in &self.items {
            dm.key(k).value(v);   // 分开写 key 和 value
        }
        dm.finish()
    }
}

fn main() {
    let m = MyMap { 
        items: vec![
            ("x".to_string(), 10),
            ("y".to_string(), 20),
        ] 
    };
    println!("{:?}", m);
    // 输出: {"x": 10, "y": 20}
}
```

嵌套（Map 里套 List 和 Map）

```rust
use std::fmt;

struct InnerMap(HashMap<String, Vec<i32>>);

impl fmt::Debug for InnerMap {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_map()
            .entries(&self.0)
            .finish()
    }
}

struct OuterMap {
    name: String,
    data: InnerMap,
}

impl fmt::Debug for OuterMap {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut dm = f.debug_map();
        dm.entry(&"name", &self.name);
        dm.entry(&"data", &self.data);   // 嵌套，自动调用 InnerMap 的 Debug
        dm.finish()
    }
}

fn main() {
    let mut inner = HashMap::new();
    inner.insert("a".to_string(), vec![1, 2, 3]);
    
    let o = OuterMap { 
        name: "test".to_string(), 
        data: InnerMap(inner) 
    };
    println!("{:#?}", o);
    // 输出:
    // {
    //     "name": "test",
    //     "data": {
    //         "a": [
    //             1,
    //             2,
    //             3,
    //         ],
    //     },
    // }
}
```

空 Map

```rust
use std::fmt;

struct EmptyMap;

impl fmt::Debug for EmptyMap {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_map().finish()
    }
}

fn main() {
    println!("{:?}", EmptyMap);
    // 输出: {}
}
```

手动写 vs 用 `debug_map`

```rust
// 手动写
impl fmt::Debug for MyMap {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{{")?;
        let mut first = true;
        for (k, v) in &self.items {
            if !first { write!(f, ", ")?; }
            first = false;
            write!(f, "{:?}: {:?}", k, v)?;
        }
        write!(f, "}}")
    }
}

// debug_map
impl fmt::Debug for MyMap {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut dm = f.debug_map();
        for (k, v) in &self.items {
            dm.entry(k, v);
        }
        dm.finish()
    }
}
```



## Trait Implementations



### impl Write for Formatter<'_>

#### write_str

将字符串切片写入此 writer，返回写入是否成功。 

```rust
fn write_str(&mut self, s: &str) -> Result<(), Error>
```



#### write_char

将 char 写入此 writer，返回写入是否成功。 

```rust
fn write_char(&mut self, c: char) -> Result<(), Error>
```



#### write_fmt

结合使用 write! 宏和 trait 的实现者。 

```rust
fn write_fmt(&mut self, args: Arguments<'_>) -> Result<(), Error>
```



## Auto Trait Implementations

### impl<'a> !RefUnwindSafe for Formatter<'a>

### impl<'a> !Send for Formatter<'a>

### impl<'a> !Sync for Formatter<'a>

### impl<'a> Unpin for Formatter<'a>

### impl<'a> !UnwindSafe for Formatter<'a>



## Blanket Implementations



### impl\<T> Any for T

```rust
impl<T> Any for T
where
  T: 'static + ?Sized,
```



### impl\<T> Borrow\<T> for T

```rust
impl<T> Borrow<T> for T
where
  T: ?Sized,
```



### impl\<T> BorrowMut\<T> for T

```rust
impl<T> BorrowMut<T> for T
where
  T: ?Sized,
```



### impl\<T> From\<T> for T



### impl<T, U> Into\<U> for T

```rust
impl<T, U> Into<U> for T
where
  U: From<T>,
```



### impl<T, U> TryFrom\<U> for T

```rust
impl<T, U> TryFrom<U> for T
where
  U: Into<T>,
```



### impl<T, U> TryInto\<U> for T

```rust
impl<T, U> TryInto<U> for T
where
  U: TryFrom<T>,
