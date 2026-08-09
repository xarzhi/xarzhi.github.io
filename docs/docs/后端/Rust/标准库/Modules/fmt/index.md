# Module std::fmt

用于格式化和打印 `String`s 的实用工具。

该模块包含对 [`format!`](https://www.rustwiki.org.cn/zh-CN/std/macro.format.html) 语法扩展的运行时支持。 该宏在编译器中实现，以发出对该模块的调用，以便在运行时将参数格式化为字符串



## Usage

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



### 位置参数

每个格式化参数都可以指定它引用的值参数，如果省略，则假定它是 “下一个参数”。 例如，格式字符串 `{} {} {}` 将带有三个参数，并且将按照给定的顺序对其进行格式化。 但是，格式字符串 `{2} {1} {0}` 将以相反的顺序格式化参数。

一旦开始将两种类型的位置说明符混合在一起，事情就会变得有些棘手。可以将 “下一个参数” 说明符可以看作是参数的迭代器。 每次看到 “下一个参数” 说明符时，迭代器都会前进。这会导致这样的行为：

```rust
format!("{1} {} {0} {}", 1, 2); // => "2 1 1 2"
```

看到第一个 `{}` 时，尚未对参数进行内部迭代，因此它将打印第一个参数。然后，在到达第二个 `{}` 时，迭代器已前进到第二个参数。 本质上，在位置说明符方面，明确命名其参数的参数不会影响未命名参数的参数。

必须使用格式字符串才能使用其所有参数，否则将导致编译时错误。您可能在格式字符串中多次引用同一参数。



### 命名参数

Rust 本身不具有类似于 Python 的等效于函数的命名参数，但是 [`format!`](https://www.rustwiki.org.cn/zh-CN/std/macro.format.html) 宏是一种语法扩展，允许它利用命名参数。 命名参数列在参数列表的末尾，并具有以下语法：

```text
identifier '=' expression
```

例如，以下 [`format!`](https://www.rustwiki.org.cn/zh-CN/std/macro.format.html) 表达式都使用命名参数:

```
format!("{argument}", argument = "test");   // => "test"
format!("{name} {}", 1, name = 2);          // => "2 1"
format!("{a} {c} {b}", a="a", b='b', c=3);  // => "a 3 b"
```

如果命名参数没有出现在参数列表中，`format!` 将引用当前作用域中的同名变量。

```
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

### Width

```
// 所有这些打印 "Hello x !"
println!("Hello {:5}!", "x");
println!("Hello {:1$}!", "x", 5);
println!("Hello {1:0$}!", 5, "x");
println!("Hello {:width$}!", "x", width = 5);
let width = 5;
println!("Hello {:width$}!", "x");
```



这是格式应使用的 “最小宽度” 的参数。 如果值的字符串不能填满这么多字符，则 fill/alignment 指定的填充将用于占用所需的空间 (请参见下文)。

通过添加后缀 `$` (表示第二个参数是指定宽度的 [`usize`](https://www.rustwiki.org.cn/zh-CN/std/primitive.usize.html))，也可以在参数列表中以 [`usize`](https://www.rustwiki.org.cn/zh-CN/std/primitive.usize.html) 的形式提供宽度值。

使用 Dollar 语法引用参数不会影响 “下一个参数” 计数器，因此按位置引用参数或使用命名参数通常是一个好主意。



### Fill/Alignment

```
assert_eq!(format!("Hello {:<5}!", "x"),  "Hello x    !");
assert_eq!(format!("Hello {:-<5}!", "x"), "Hello x----!");
assert_eq!(format!("Hello {:^5}!", "x"),  "Hello   x  !");
assert_eq!(format!("Hello {:>5}!", "x"),  "Hello     x!");
```

可选的填充字符和对齐方式通常与 [`width`](https://www.rustwiki.org.cn/zh-CN/std/fmt/index.html#width) 参数一起提供。必须在 `width` 之前，`:` 之后定义。 这表示如果要格式化的值小于 `width`，则将在其周围打印一些额外的字符。 对于不同的对齐方式，填充有以下变体：

- `[fill]<` - 参数在 `width` 列中左对齐
- `[fill]^` - 参数在 `width` 列中居中对齐
- `[fill]>` - 参数在 `width` 列中右对齐

非数字的默认 [fill/alignment](https://www.rustwiki.org.cn/zh-CN/std/fmt/index.html#fillalignment) 是空格，并且左对齐。数字格式器的默认值也是空格字符，但带有右对齐。 如果为数字指定了 `0` 标志 (见下文)，则隐式填充字符为 `0`。

请注意，某些类型可能不会实现对齐。特别是，对于 `Debug` trait，通常不会实现该功能。 确保应用填充的一种好方法是格式化输入，然后填充此结果字符串以获得输出：

```
println!("Hello {:^15}!", format!("{:?}", Some("hi"))); // => "Hello   Some("hi")   !"
```



### Sign/`#`/`0`

```
assert_eq!(format!("Hello {:+}!", 5), "Hello +5!");
assert_eq!(format!("{:#x}!", 27), "0x1b!");
assert_eq!(format!("Hello {:05}!", 5),  "Hello 00005!");
assert_eq!(format!("Hello {:05}!", -5), "Hello -0005!");
assert_eq!(format!("{:#010x}!", 27), "0x0000001b!");
```

这些都是更改格式化程序行为的标志。

- `+` - 这适用于数字类型并指示应始终打印符号。默认情况下从不打印正号，默认情况下仅对有符号值打印负号。 该标志指示应始终打印正确的符号 (`+` 或 `-`)。
- `-` - 当前未使用
- `#` - 此标志表示应使用 “alternate” 打印形式。替代形式为：
  - `#?` - 漂亮地打印 [`Debug`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Debug.html) 格式 (添加换行符和缩进)
  - `#x` - 在参数前面加上 `0x`
  - `#X` - 在参数前面加上 `0x`
  - `#b` - 在参数前面加上 `0b`
  - `#o` - 在参数前面加上 `0o`
- `0` - 这用于指示对于整数格式，向 `width` 的填充应该使用 `0` 字符，并且是符号感知的。 像 `{:08}` 这样的格式将为整数 `1` 产生 `00000001`，而相同格式将为整数 `-1` 产生 `-0000001`。 请注意，负版本的零比正版本的少零。 请注意，填充零总是放在符号 (如果有) 之后和数字之前。当与 `#` 标志一起使用时，将应用类似的规则：在前缀之后但在数字之前插入填充零。 前缀包括在总宽度中。





### Precision

对于非数字类型，可以将其视为 “最大宽度”。 如果结果字符串的长度大于此宽度，则将其截断为这么多个字符，并且如果设置了这些参数，则会使用适当的 `fill`，`alignment` 和 `width` 发出该截断的值。

对于整数类型，这将被忽略。

对于浮点类型，这指示小数点后应打印多少位。

有三种可能的方法来指定所需的 `precision`：

1. 一个整数 `.N`：

   整数 `N` 本身就是精度。

2. 整数或名称后跟美元符号 `.N$`：

   使用格式参数 `N` (必须是 `usize`) 作为精度。

3. 星号 `.*`：

   `.*` 意味着这个 `{...}` 与*两个*格式输入相关联，而不是一个:

   - 如果使用 `{:<spec>.*}` 格式的字符串，则第一个输入保存 `usize` 精度，第二个输入保存要打印的值。
   - 如果使用 `{<arg>:<spec>.*}` 格式的字符串，则 `<arg>` 部分指的是要打印的值，并且 `precision` 被视为使用省略的位置参数指定 (`{}` 而不是 `{<arg>:}`)。

例如，以下所有调用均打印相同的内容 `Hello x is 0.01000`：

```rust
// Hello {arg 0 ("x")} is {arg 1 (0.01) with precision specified inline (5)}
println!("Hello {0} is {1:.5}", "x", 0.01);

// Hello {arg 1 ("x")} is {arg 2 (0.01) with precision specified in arg 0 (5)}
println!("Hello {1} is {2:.0$}", 5, "x", 0.01);

// Hello {arg 0 ("x")} is {arg 2 (0.01) with precision specified in arg 1 (5)}
println!("Hello {0} is {2:.1$}", "x", 5, 0.01);

// Hello {next arg -> arg 0 ("x")} is {second of next two args -> arg 2 (0.01) with precision specified in first of next two args -> arg 1 (5)}
//
println!("Hello {} is {:.*}",    "x", 5, 0.01);

// Hello {arg 1 ("x")} is {arg 2 (0.01) with precision specified in next arg -> arg 0 (5)}
//
println!("Hello {1} is {2:.*}",  5, "x", 0.01);

// Hello {next arg -> arg 0 ("x")} is {arg 2 (0.01) with precision specified in next arg -> arg 1 (5)}
//
println!("Hello {} is {2:.*}",   "x", 5, 0.01);

// Hello {next arg -> arg 0 ("x")} is {arg "number" (0.01) with precision specified in arg "prec" (5)}
//
println!("Hello {} is {number:.prec$}", "x", prec = 5, number = 0.01);
```

而这些：

```
println!("{}, `{name:.*}` has 3 fractional digits", "Hello", 3, name=1234.56);
println!("{}, `{name:.*}` has 3 characters", "Hello", 3, name="1234.56");
println!("{}, `{name:>8.*}` has 3 right-aligned characters", "Hello", 3, name="1234.56");
```

打印三个明显不同的内容：

```text
Hello, `1234.560` has 3 fractional digits
Hello, `123` has 3 characters
Hello, `     123` has 3 right-aligned characters
```





### Localization

在某些编程语言中，字符串格式函数的行为取决于操作系统的语言环境设置。 Rust 标准库提供的格式函数没有任何语言环境的概念，并且无论用户配置如何，在所有系统上都会产生相同的结果。

例如，即使系统区域设置使用小数点分隔符 (而不是点)，以下代码也将始终打印 `1.5`。

```
println!("The value is {}", 1.5);
```



## Escaping

字面量字符 `{` 和 `}` 可以通过在它们之前添加相同的字符而包含在字符串中。例如，`{` 字符使用 `{{` 进行转义，而 `}` 字符使用 `}}` 进行转义。

```
assert_eq!(format!("Hello {{}}"), "Hello {}");
assert_eq!(format!("{{ Hello"), "{ Hello");
```





## Syntax

总结一下，您可以在这里找到格式字符串的完整语法。 所用格式语言的语法是从其他语言中提取的，因此不应太陌生。参数使用类似 Python 的语法格式化，这意味着参数被 `{}` 包围，而不是类似 C 的 `%`。 格式化语法的实际语法为：

```text
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

- *nothing* ⇒ [`Display`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Display.html)
- `?` ⇒ [`Debug`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Debug.html)
- `x?` ⇒ [`Debug`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Debug.html) 带有小写十六进制整数
- `X?` ⇒ [`Debug`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Debug.html) 带有大写十六进制整数
- `o` ⇒ [`Octal`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Octal.html)
- `x` ⇒ [`LowerHex`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.LowerHex.html)
- `X` ⇒ [`UpperHex`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.UpperHex.html)
- `p` ⇒ [`Pointer`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Pointer.html)
- `b` ⇒ [`Binary`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Binary.html)
- `e` ⇒ [`LowerExp`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.LowerExp.html)
- `E` ⇒ [`UpperExp`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.UpperExp.html)

这意味着可以使用 `{:b}` 格式化实现 [`fmt::Binary`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Binary.html) trait 的任何类型的参数。标准库还为许多原始类型提供了针对这些 traits 的实现。

如果未指定格式 (如 `{}` 或 `{:6}`)，则使用的格式 trait 为 [`Display`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Display.html) trait。

当为您自己的类型实现格式 trait 时，您将必须实现签名的方法：

```
fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
```

您的类型将作为 `self` 通过引用传递，然后函数应该将输出发送到实现 `fmt::Write` 的格式化程序 `f`。 正确遵守所请求的格式设置参数，取决于每种格式 trait 的实现。 这些参数的值可以通过 [`Formatter`](https://www.rustwiki.org.cn/zh-CN/std/fmt/struct.Formatter.html) 结构体的方法访问。为了解决这个问题，[`Formatter`](https://www.rustwiki.org.cn/zh-CN/std/fmt/struct.Formatter.html) 结构体还提供了一些辅助方法。

此外，该函数的返回值是 [`fmt::Result`](https://www.rustwiki.org.cn/zh-CN/std/fmt/type.Result.html)，它是 `Result<(), std::fmt::Error>` 的类型别名。 格式化实现应确保它们传播来自 [`Formatter`](https://www.rustwiki.org.cn/zh-CN/std/fmt/struct.Formatter.html) 的错误 (例如，调用 [`write!`](https://www.rustwiki.org.cn/zh-CN/std/macro.write.html) 时)。 但是，它们绝不能虚假地返回错误。 即，格式化实现必须并且仅在传入的 [`Formatter`](https://www.rustwiki.org.cn/zh-CN/std/fmt/struct.Formatter.html) 返回错误的情况下才返回错误。 这是因为，与函数签名可能暗示的相反，字符串格式是一项可靠的操作。 该函数仅返回结果，因为写入底层流可能会失败，并且它必须提供一种方法来将已发生错误的事实传播回栈。

实现格式 traits 的示例如下所示：

```
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





### `fmt::Display` 与 `fmt::Debug`

这两种格式 traits 具有不同的用途：

- [`fmt::Display`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Display.html) 实现断言该类型可以始终忠实地表示为 UTF-8 字符串。并非所有类型都实现 [`Display`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Display.html) trait。
- [`fmt::Debug`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Debug.html) 实现应该为所有公共类型实现。 输出通常会尽可能忠实地代表内部状态。 [`Debug`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Debug.html) trait 的目的是方便调试 Rust 代码。在大多数情况下，建议使用 `#[derive(Debug)]` 就足够了。

这两个 traits 的输出的一些例子：

```
assert_eq!(format!("{} {:?}", 3, 4), "3 4");
assert_eq!(format!("{} {:?}", 'a', 'b'), "a 'b'");
assert_eq!(format!("{} {:?}", "foo\n", "bar\n"), "foo\n \"bar\\n\"");
```





## 相关宏

`format!`系列中有许多相关的宏。当前实现的是：

```
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

[`write!`](https://www.rustwiki.org.cn/zh-CN/std/macro.write.html) 和 [`writeln!`](https://www.rustwiki.org.cn/zh-CN/std/macro.writeln.html) 是两个宏，用于将格式字符串发送到指定的流。这用于防止格式字符串的中间分配，而是直接写入输出。 在底层，这个函数实际上是调用在 [`std::io::Write`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html) 和 [`std::fmt::Write`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Write.html) trait 上定义的 [`write_fmt`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#method.write_fmt) 函数。 示例用法是：

```
use std::io::Write;
let mut w = Vec::new();
write!(&mut w, "Hello {}!", "world");
```



### `print!`

此和 [`println!`](https://www.rustwiki.org.cn/zh-CN/std/macro.println.html) 将其输出发送到 stdout。与 [`write!`](https://www.rustwiki.org.cn/zh-CN/std/macro.write.html) 宏类似，这些宏的目标是避免在打印输出时进行中间分配。示例用法是：

```
print!("Hello {}!", "world");
println!("I have a newline {}", "character at the end");
```



### `eprint!`

[`eprint!`](https://www.rustwiki.org.cn/zh-CN/std/macro.eprint.html) 和 [`eprintln!`](https://www.rustwiki.org.cn/zh-CN/std/macro.eprintln.html) 宏分别与 [`print!`](https://www.rustwiki.org.cn/zh-CN/std/macro.print.html) 和 [`println!`](https://www.rustwiki.org.cn/zh-CN/std/macro.println.html) 相同，只不过它们将其输出发送到 stderr。



### `format_args!`

[`format_args!`](https://www.rustwiki.org.cn/zh-CN/std/macro.format_args.html) 是一个奇怪的宏，用于安全地传递描述格式字符串的不透明对象。该对象不需要创建任何堆分配，并且仅引用栈上的信息。 在幕后，所有相关的宏都在此方面实现。 首先，一些示例用法是：

```
use std::fmt;
use std::io::{self, Write};

let mut some_writer = io::stdout();
write!(&mut some_writer, "{}", format_args!("print with a {}", "macro"));

fn my_fmt_fn(args: fmt::Arguments<'_>) {
    write!(&mut io::stdout(), "{args}");
}
my_fmt_fn(format_args!(", or a {} too", "function"));
```

[`format_args!`](https://www.rustwiki.org.cn/zh-CN/std/macro.format_args.html) 宏的结果是 [`fmt::Arguments`](https://www.rustwiki.org.cn/zh-CN/std/fmt/struct.Arguments.html) 类型的值。 然后可以将此结构体传递到此模块内部的 [`write`](https://www.rustwiki.org.cn/zh-CN/std/fmt/fn.write.html) 和 [`format`](https://www.rustwiki.org.cn/zh-CN/std/fmt/fn.format.html) 函数，以处理格式字符串。 该宏的目的是在处理格式化字符串时甚至进一步防止中间分配。

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