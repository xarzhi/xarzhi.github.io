# Module std::fmt

用于格式化和打印 `String`s 的实用工具。

该模块包含对 [`format!`](https://www.rustwiki.org.cn/zh-CN/std/macro.format.html) 语法扩展的运行时支持。 该宏在编译器中实现，以发出对该模块的调用，以便在运行时将参数格式化为字符串



基本使用

[`format!`](https://www.rustwiki.org.cn/zh-CN/std/macro.format.html) 宏旨在使那些使用 C 的 `printf`/`fprintf` 函数或 Python 的 `str.format` 函数的用户熟悉。

[`format!`](https://www.rustwiki.org.cn/zh-CN/std/macro.format.html) 扩展的一些示例是：

```rust
format!("Hello");                 // => "Hello"
format!("Hello, {}!", "world");   // => "Hello, world!"
format!("The number is {}", 1);   // => "The number is 1"
format!("{:?}", (3, 4));          // => "(3, 4)"
format!("{value}", value=4);      // => "4"
let people = "Rustaceans";
format!("Hello {people}!");       // => "Hello Rustaceans!"
format!("{} {}", 1, 2);           // => "1 2"
format!("{:04}", 42);             // => 带前导零的 "0042"
format!("{:#?}", (100, 200));     // => "(
                                  // 100,
                                  //       200, )"
                                  //
```

从这些中，您可以看到第一个参数是格式字符串。编译器要求它是字符串字面量； 它不能是传入的变量 (以执行有效性检查)。 然后，编译器将解析格式字符串，并确定所提供的参数列表是否适合传递给该格式字符串。

要将单个值转换为字符串，请使用 [`to_string`](https://www.rustwiki.org.cn/zh-CN/std/string/trait.ToString.html#tymethod.to_string) 方法。这将使用 [`Display`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Display.html) 格式 trait。



## 位置参数

每个格式化参数都可以指定它引用的值参数，如果省略，则假定它是 “下一个参数”。 例如，格式字符串 `{} {} {}` 将带有三个参数，并且将按照给定的顺序对其进行格式化。 但是，格式字符串 `{2} {1} {0}` 将以相反的顺序格式化参数。

一旦开始将两种类型的位置说明符混合在一起，事情就会变得有些棘手。可以将 “下一个参数” 说明符可以看作是参数的迭代器。 每次看到 “下一个参数” 说明符时，迭代器都会前进。这会导致这样的行为：

```rust
format!("{1} {} {0} {}", 1, 2); // => "2 1 1 2"
```

看到第一个 `{}` 时，尚未对参数进行内部迭代，因此它将打印第一个参数。然后，在到达第二个 `{}` 时，迭代器已前进到第二个参数。 本质上，在位置说明符方面，明确命名其参数的参数不会影响未命名参数的参数。

必须使用格式字符串才能使用其所有参数，否则将导致编译时错误。您可能在格式字符串中多次引用同一参数。



## 命名参数

Rust 本身不具有类似于 Python 的等效于函数的命名参数，但是 [`format!`](https://www.rustwiki.org.cn/zh-CN/std/macro.format.html) 宏是一种语法扩展，允许它利用命名参数。 命名参数列在参数列表的末尾，并具有以下语法：

```text
identifier '=' expression
```

例如，以下 [`format!`](https://www.rustwiki.org.cn/zh-CN/std/macro.format.html) 表达式都使用命名参数:

```rust
format!("{argument}", argument = "test");   // => "test"
format!("{name} {}", 1, name = 2);          // => "2 1"
format!("{a} {c} {b}", a="a", b='b', c=3);  // => "a 3 b"
```

如果命名参数没有出现在参数列表中，`format!` 将引用当前作用域中的同名变量。

```rust
let argument = 2 + 2;
format!("{argument}");   // => "4"

fn make_string(a: u32, b: &str) -> String {
    format!("{b} {a}")
}
make_string(927, "label"); // => "label 927"
```

在具有名称的参数之后放置位置参数 (那些没有名称的参数) 是无效的。与位置参数一样，提供格式字符串未使用的命名参数也是无效的。



## 格式化参数

每个要格式化的参数都可以通过许多格式化参数进行转换 (对应于 [语法](https://www.rustwiki.org.cn/zh-CN/std/fmt/index.html#syntax)) 中的 `format_spec`。这些参数会影响所格式化内容的字符串表示形式。

### 宽度 Width

`:`后面如果给一个整数，代表**这个占位符最少占多少字符位置**

- 如果实际内容比宽度短，就在前面（或按对齐方向）补填充符凑够
- 如果实际内容比宽度长，宽度被忽略，按实际长度输出（不会截断）。

```rust
assert_eq!(format!("{:5}", 27), "   27"); // 实际2字符，补3个空格凑到5
assert_eq!(format!("{:5}", "ab"), "ab   "); // 实际2字符，往后补全到5
```

`:`后面如果给一个小数，则代表参数的精度

```rust
assert_eq!(format!("{:.2}", 27.0011), "27.00");
```

用 `$` 可以把宽度/精度改成"引用某个参数"：

```rust
format!("{:width$}", 27, width = 5);        // "   27"

let width = 5;
println!("Hello {:width$}!", "x");

format!("{:.prec$}", 3.14159, prec = 2);    // "3.14"
```

`N$`表示用第 N 个参数的值

```rust
format!("{:1$}", 27, 5);                    // "   27"  宽度=第1个参数(5)
format!("{:.1$}", 3.14159, 2);              // "3.14"   精度=第1个参数(2)
format!("{:1$.2$}", 3.14159, 10, 3);        // "     3.142"  宽10 精3
```







### 填充和对齐 Fill/Alignment

对于上面的补全，我们发现整数和字符串的补全方向并不一样

- **数值类型**（`i32`/`f64` 等）→ 默认**右对齐**，也就是左边补全
- **非数值类型**（`&str`/`String`/`char`）→ 默认**左对齐**，也就是右边补全

可以使用如下方式控制对齐方式，必须在 `width` 之前，`:` 之后定义，**默认会用空格当作填充以达到对齐**，也可以在对齐符号前自定义填充的字符

- `[fill]<`：参数在 `width` 列中左对齐
- `[fill]^`：参数在 `width` 列中居中对齐
- `[fill]>`：参数在 `width` 列中右对齐

```rust
assert_eq!(format!("Hello {:<5}!", "x"),  "Hello x    !");  // 规定左对齐
assert_eq!(format!("Hello {:-<5}!", "x"), "Hello x----!");	// 规定左对齐，并规定 - 为填充字符

assert_eq!(format!("Hello {:^5}!", "x"),  "Hello   x  !");	// 规定居中对齐

assert_eq!(format!("Hello {:>5}!", "x"),  "Hello     x!");	// 规定右对齐
assert_eq!(format!("Hello {:t>5}!", "x"),  "Hello ttttx!");	// 规定右对齐，并规定 t 为填充字符
```



请注意，某些类型可能不会实现对齐。特别是，对于 `Debug` trait，通常不会实现该功能。 确保应用填充的一种好方法是格式化输入，然后填充此结果字符串以获得输出：

```rust
println!("Hello {:^15}!", format!("{:?}", Some("hi"))); // => "Hello   Some("hi")   !"
```



### 特殊符号 Sign/#/0

这些都是**更改格式化程序行为**的标志。

- `+`：打印出数字的符号，正号`+`，和负号`-`

  ```rust
  println!("{:+}", 15); // +15
  println!("{:+}", -15); // -15
  
  println!("{:+}", 10.0); // +10
  println!("{:+}", -10.0); // -10
  ```

- `#`：此标志表示打印出数据的**正式格式**，比如16进制前面加上0x，二进制前面加上0b，等等

  - `#?`：漂亮地打印 `Debug`格式的数据 (添加换行符和缩进)

    ```rust {11}
    #[derive(Debug)]
    struct People {
        name: String,
    }
    
    fn main() {
        let p = People {
            name: "ikun".to_string(),
        };
    
        let str = format!("{:#?}", p);
    
        println!("{}", str);
        /*
           People {
               name: "ikun",
           }
        */
    }
    ```

  - `#x`：把参数转化为**16进制小写**，`0x`开头的16进制

    ```rust
    println!("{:#x}", 166); // 0xa6
    ```

  - `#X`：把参数转化为**16进制大写**，`0x`开头的16进制

    ```rust
    println!("{:#X}", 166); // 0xA6

  - `#b`：把参数转化为**二进制**，`0b`开头的二进制

    ```rust
    println!("{:#b}", 15); // 0b1111

  - `#o`：把参数转化为**八进制**，`0o`开头的八进制

    ```rust
    println!("{:#o}", 50); // 0o62
    println!("{:#o}", 166); // 0o246

- `0`：这用于指示对于整数格式，0作为填充标志，需要给定一个宽度，若参数小于给定的宽度，则使用0填充

  ```rust
  println!("{:0}", 27); // "27"      ← 0 是零填充标志，但没宽度，无效
  println!("{:05}", 27); // "00027"   ← 0 是零填充标志，宽度5，用0补
  println!("{:5}", 27); // "   27"   ← 无0标志，宽度5，用空格补
  ```

  



### 精度 Precision

使用`.width`来控制精度

对于**浮点类型**，这指示小数点后应打印多少位。

有三种可能的方法来指定所需的 `precision`：

1. 一个整数 `.N`：整数 `N` 本身就是精度。

   ```rust
   println!("{}", 3.14159); // "3.14159"   默认：打印能唯一还原该值的最短形式
   println!("{:.2}", 3.14159); // "3.14"      保留2位小数（四舍五入）
   println!("{:.0}", 3.14159); // "3"         0位 → 四舍五入到整数
   println!("{:.5}", 2.0); // "2.00000"   强制补0到5位
   ```

2. 整数或名称后跟美元符号 `.N$`：使用格式参数 `N` (必须是 `usize`) 作为精度。

   ```rust
   let width = 5;
   println!("{:.width$}", 2.0); // "2.00000"   强制补0到5位
   
   println!("{:.width$}", 2.0, width = 5); // "2.00000"   强制补0到5位
   ```

3. 星号 `.*`：

   - 如果使用 `{:.*}` 格式的字符串，则第一个参数代表**精度**（`usize`），第二个参数代表要打印的值。

     ```rust
     let res = format!("{:.*}", 2, 3.14159); 
     println!("{:#?}", res); // "3.14"
     ```

   - 如果使用 `{:<spec>.*}` 格式的字符串，则第一个参数代表**宽度**，第二个参数代表要打印的值。

     ```rust
     let res = format!("{:6.*}", 2, 3.14159); 
     println!("{:#?}", res); // "  3.14"  // 指定宽度为6，补全2个空格
     ```

   - 如果使用 `{<pos>:<spec>.*}` 格式的字符串，则 `<pos>` 部分指的是要打印的值的位置，`<spec>`代表宽度，第一个参数代表精度

     ```rust
     let res = format!("{1:6.*}", 2, 3.14159);
     println!("{:#?}", res); // "  3.14"  // 指定宽度为6，补全2个空格
     ```

     



对于**字符串**，这控制**最大字符数**

```rust
format!("{:.3}", "hello");  // "hel"   最多取前3个字符
format!("{:.10}", "hi");    // "hi"    内容比精度短，不补不截
```





### Localization

在某些编程语言中，字符串格式函数的行为取决于操作系统的语言环境设置。 Rust 标准库提供的格式函数没有任何语言环境的概念，并且无论用户配置如何，在所有系统上都会产生相同的结果。

例如，即使系统区域设置使用小数点分隔符 (而不是点)，以下代码也将始终打印 `1.5`。

```rust
println!("The value is {}", 1.5);
```



## 转义 Escaping

::: v-pre

字面量字符 `{` 和 `}` 可以通过在它们之前添加相同的字符而包含在字符串中。

例如，`{` 字符使用 `{{` 进行转义，而 `}` 字符使用 `}}` 进行转义。

:::

```rust
let res = format!("Hello {{}}");
println!("{:#?}", res);  // "Hello {}"

let res = format!("{{ Hello");
println!("{:#?}", res);  // "{ Hello"
```





## Syntax

总结一下，您可以在这里找到格式字符串的完整语法。 所用格式语言的语法是从其他语言中提取的，因此不应太陌生。参数使用类似 Python 的语法格式化，这意味着参数被 `{}` 包围，而不是类似 C 的 `%`。 格式化语法的实际语法为：

```rust
format_string := text [ maybe_format text ] *
maybe_format := '{' '{' | '}' '}' | format
format := '{' [ argument ] [ ':' format_spec ] [ ws ] * '}'
argument := integer | identifier

format_spec := [[fill]align][sign]['#']['0'][width]['.' precision]type
fill := character
align := '<' | '^' | '>'
sign := '+' | '-'
width := count
precision := count | '*'
type := '' | '?' | 'x?' | 'X?' | identifier
count := parameter | integer
parameter := argument '$'
```

在上面的语法中，

- `text` 不得包含任何 `'{'` 或 `'}'` 字符，
- `ws` 是 [`char::is_whitespace`](https://www.rustwiki.org.cn/zh-CN/std/primitive.char.html#method.is_whitespace) 为其返回 `true` 的任何字符，没有语义意义并且是完全可选的，
- `integer` 是一个十进制整数，可能包含前导零，并且必须适合 `usize` 和
- `identifier` 是由 [Rust 语言参考][Rust language reference](https://doc.rust-lang.org/reference/identifiers.html) 定义的 `IDENTIFIER_OR_KEYWORD` (不是 `IDENTIFIER`)。





## 格式化 traits

当请求使用特定类型的参数格式化时，实际上是在请求将参数归因于特定的 trait。 这允许通过 `{:x}` 格式化多种实际类型 (例如 [`i8`](https://www.rustwiki.org.cn/zh-CN/std/primitive.i8.html) 和 [`isize`](https://www.rustwiki.org.cn/zh-CN/std/primitive.isize.html))。类型到 traits 的当前映射是：

- *nothing* ⇒ [`Display`](./Traits/Display)
- `?` ⇒ [`Debug`](./Traits/Debug)
- `x?` ⇒ [`Debug`](./Traits/Debug) 带有小写十六进制整数
- `X?` ⇒ [`Debug`](./Traits/Debug) 带有大写十六进制整数
- `o` ⇒ [`Octal`](./Traits/Octal)
- `x` ⇒ [`LowerHex`](./Traits/LowerHex)
- `X` ⇒ [`UpperHex`](./Traits/UpperHex)
- `p` ⇒ [`Pointer`](./Traits/Pointer)
- `b` ⇒ [`Binary`](./Traits/Binary)
- `e` ⇒ [`LowerExp`](./Traits/LowerExp)
- `E` ⇒ [`UpperExp`](./Traits/UpperExp)

这意味着可以使用 `{:b}` 格式化实现  [`Binary`](./Traits/Binary) trait 的任何类型的 。标准库还为许多原始类型提供了针对这些 traits 的实现。

如果未指定格式 (如 `{}` 或 `{:6}`)，则使用的格式 trait 为 [`Display`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Display.html) trait。

当为您自己的类型实现格式 trait 时，您将必须实现签名的方法：

```rust
fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {}
```

您的类型将作为 `self` 通过引用传递，然后函数应该将输出发送到实现 `fmt::Write` 的格式化程序 `f`。 正确遵守所请求的格式设置参数，取决于每种格式 trait 的实现。 这些参数的值可以通过 [`Formatter`](https://www.rustwiki.org.cn/zh-CN/std/fmt/struct.Formatter.html) 结构体的方法访问。为了解决这个问题，[`Formatter`](https://www.rustwiki.org.cn/zh-CN/std/fmt/struct.Formatter.html) 结构体还提供了一些辅助方法。

此外，该函数的返回值是 [`fmt::Result`](https://www.rustwiki.org.cn/zh-CN/std/fmt/type.Result.html)，它是 `Result<(), std::fmt::Error>` 的类型别名。 格式化实现应确保它们传播来自 [`Formatter`](https://www.rustwiki.org.cn/zh-CN/std/fmt/struct.Formatter.html) 的错误 (例如，调用 [`write!`](https://www.rustwiki.org.cn/zh-CN/std/macro.write.html) 时)。 但是，它们绝不能虚假地返回错误。 即，格式化实现必须并且仅在传入的 [`Formatter`](https://www.rustwiki.org.cn/zh-CN/std/fmt/struct.Formatter.html) 返回错误的情况下才返回错误。 这是因为，与函数签名可能暗示的相反，字符串格式是一项可靠的操作。 该函数仅返回结果，因为写入底层流可能会失败，并且它必须提供一种方法来将已发生错误的事实传播回栈。

实现格式 traits 的示例如下所示：

```rust
use std::fmt;

#[derive(Debug)]
struct Vector2D {
    x: isize,
    y: isize,
}

impl fmt::Display for Vector2D {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // `f` 值实现 `Write` trait，这就是 `write`！ 宏正在等待。
        // 请注意，这种格式化将忽略为格式化字符串而提供的各种标志。
        //
        write!(f, "({}, {})", self.x, self.y)
    }
}

// 不同的 traits 允许类型的不同形式的输出。
// 此格式的含义是打印 vector 的大小。
impl fmt::Binary for Vector2D {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let magnitude = (self.x * self.x + self.y * self.y) as f64;
        let magnitude = magnitude.sqrt();

        // 通过使用 Formatter 对象上的帮助器方法 `pad_integral`，尊重格式设置标志。
        // 有关详细信息，请参见方法文档，并且函数 `pad` 可用于填充字符串。
        //
        //
        let decimals = f.precision().unwrap_or(3);
        let string = format!("{magnitude:.decimals$}");
        f.pad_integral(true, "", &string)
    }
}

fn main() {
    let myvector = Vector2D { x: 3, y: 4 };

    println!("{myvector}");       // => "(3, 4)"
    println!("{myvector:?}");     // => "Vector2D {x: 3, y:4}"
    println!("{myvector:10.3b}"); // => "     5.000"
}
```





### `Display` 与 `Debug`

这两种格式 traits 具有不同的用途：

- [`fmt::Display`](./Traits/Display) 实现断言该类型可以始终忠实地表示为 UTF-8 字符串。并非所有类型都实现 `Display` trait。
- [`fmt::Debug`](./Traits/Debug) 实现应该为所有公共类型实现。 输出通常会尽可能忠实地代表内部状态。`Debug` trait 的目的是方便调试 Rust 代码。在大多数情况下，建议使用 `#[derive(Debug)]` 就足够了。

这两个 traits 的输出的一些例子：

```rust
assert_eq!(format!("{} {:?}", 3, 4), "3 4");
assert_eq!(format!("{} {:?}", 'a', 'b'), "a 'b'");
assert_eq!(format!("{} {:?}", "foo\n", "bar\n"), "foo\n \"bar\\n\"");
```





## 相关宏

`format!`系列中有许多相关的宏。当前实现的是：

```rust
format!      // 如上所述
write!       // 第一个参数是 &mut io::Write 或 &mut fmt::Write，目的地
writeln!     // 与 write 相同，但追加了一个换行符
print!       // 格式字符串被打印到标准输出
println!     // 与 print 相同，但追加了一个换行符
eprint!      // 格式字符串被打印到标准错误
eprintln!    // 与 eprint 相同，但追加了一个换行符
format_args! // 如下面所描述的。
```



### `write!`

[`write!`](../../Macro/声明宏/标准库声明宏#write) 和 [`writeln!`](../../Macro/声明宏/标准库声明宏#writeln) 是两个宏，用于将格式字符串发送到指定的流。这用于防止格式字符串的中间分配，而是直接写入输出。 在底层，这个函数实际上是调用在 [`std::io::Write`](../io/Traits/Write) 和 [`std::fmt::Write`](./Traits/Write) trait 上定义的 [`write_fmt`](./Traits/Write#write_fmt) 函数。 示例用法是：

```rust
use std::io::Write;
let mut w = Vec::new();
write!(&mut w, "Hello {}!", "world");
```



### `print!`

此和 [`println!`](../../Macro/声明宏/标准库声明宏#println) 将其输出发送到 stdout。与[`write!`](../../Macro/声明宏/标准库声明宏#write) 宏类似，这些宏的目标是避免在打印输出时进行中间分配。示例用法是：

```rust
print!("Hello {}!", "world");
println!("I have a newline {}", "character at the end");
```



### `eprint!`

[`eprint!`](../../Macro/声明宏/标准库声明宏#eprint) 和 [`eprintln!`](../../Macro/声明宏/标准库声明宏#eprintln) 宏分别与 [`print!`](../../Macro/声明宏/标准库声明宏#print) 和 [`println!`](../../Macro/声明宏/标准库声明宏#println) 相同，只不过它们将其输出发送到 stderr。



### `format_args!`

[`format_args!`](../../Macro/声明宏/标准库声明宏#format_args) 是一个奇怪的宏，用于安全地传递描述格式字符串的不透明对象。该对象不需要创建任何堆分配，并且仅引用栈上的信息。 在幕后，所有相关的宏都在此方面实现。 首先，一些示例用法是：

```rust
use std::fmt;
use std::io::{self, Write};

let mut some_writer = io::stdout();
write!(&mut some_writer, "{}", format_args!("print with a {}", "macro"));

fn my_fmt_fn(args: fmt::Arguments<'_>) {
    write!(&mut io::stdout(), "{args}");
}
my_fmt_fn(format_args!(", or a {} too", "function"));
```

[`format_args!`](../../Macro/声明宏/标准库声明宏#format_args) 宏的结果是 [`fmt::Arguments`](./Structs/Arguments) 类型的值。 然后可以将此结构体传递到此模块内部的 [`write`](#write) 和 [`format`](#format) 函数，以处理格式字符串。 该宏的目的是在处理格式化字符串时甚至进一步防止中间分配。

例如，日志记录库可以使用标准格式语法，但是它将在内部绕过此结构体，直到确定了输出应该到达的位置为止。



## Structs

- **Arguments**：该结构体表示格式字符串及其参数的安全预编译版本。 由于无法安全地完成此操作，因此无法在运行时生成该文件，因此未提供任何构造函数，并且该字段为私有字段以防止修改。

- **DebugList**：一个有助于 fmt::Debug 实现的结构体。
- **DebugMap**：一个有助于 fmt::Debug 实现的结构体。
- **DebugSet**：一个有助于 fmt::Debug 实现的结构体。
- **DebugStruct**：一个有助于 fmt::Debug 实现的结构体。
- **DebugTuple**：一个有助于 fmt::Debug 实现的结构体。
- **Error**：将消息格式化为流后返回的错误类型。
- **Formatter**：格式化配置。



## Enums

- **Alignment**：Formatter::align 返回的可能的对齐方式



## Traits

- **Binary**：`b` 格式。
- **Debug**：`?` 格式。
- **Display**：空格式的格式 trait，{}。
- **LowerExp**：`e` 格式。
- **LowerHex**：`x` 格式。
- **Octal**：`o` 格式。
- **Pointer**：`p` 格式。
- **UpperExp**：`E` 格式。
- **UpperHex**：`X` 格式。
- **Write**：一个用于写入或格式化为 Unicode 接受的缓冲区或流的 trait。



## Functions

### format

- **format**：format 函数采用 Arguments 结构体，并返回生成的格式化字符串。



### write

- **write**：write 函数接受一个输出流，以及一个可以与 format_args! 宏预编译的 Arguments 结构体。



## Type Definitions

### Result

格式化程序方法返回的类型。

```rust
pub type Result = Result<(), Error>;
```

示例

```rust
use std::fmt;

#[derive(Debug)]
struct Triangle {
    a: f32,
    b: f32,
    c: f32
}

impl fmt::Display for Triangle {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {}, {})", self.a, self.b, self.c)
    }
}

let pythagorean_triple = Triangle { a: 3.0, b: 4.0, c: 5.0 };

assert_eq!(format!("{pythagorean_triple}"), "(3, 4, 5)");
```



## Derive Macros

### Debug

- **Debug**：派生宏，生成 Debug trait 的 impl。