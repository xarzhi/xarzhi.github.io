# Module std::result

`Result<T, E>`也是一个特殊的枚举，用来表达一个结果**可能成功，也可能失败**。

Result在标准库中的定义如下：

```rust
pub enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

泛型参数

- T：当结果为Ok时，返回的值的类型
- E：当结果为Err时，错误信息的类型

它有两个变体：

- `Ok(T)` 表示操作成功，携带一个结果值 `T`。
- `Err(E)` 表示操作失败，携带一个错误信息 `E`。



只要预期到错误并且可以恢复，函数就返回 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html)。在 `std` crate 中，[`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 最主要用于 [I/O](https://www.rustwiki.org.cn/zh-CN/std/io/index.html)。

返回 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 的简单函数可以像这样定义和使用：

```rust
#[derive(Debug)]
enum Version { Version1, Version2 }

fn parse_version(header: &[u8]) -> Result<Version, &'static str> {
    match header.get(0) {
        None => Err("invalid header length"),
        Some(&1) => Ok(Version::Version1),
        Some(&2) => Ok(Version::Version2),
        Some(_) => Err("invalid version"),
    }
}

let version = parse_version(&[1, 2, 3, 4]);
match version {
    Ok(v) => println!("working with version: {v:?}"),
    Err(e) => println!("error parsing header: {e:?}"),
}
```

在简单情况下，在 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 上进行模式匹配非常简单明了，但是 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 附带了一些方便的方法，使使用它更加简洁。

```rust
let good_result: Result<i32, i32> = Ok(10);
let bad_result: Result<i32, i32> = Err(10);

// `is_ok` 和 `is_err` 方法按照他们说的做。
assert!(good_result.is_ok() && !good_result.is_err());
assert!(bad_result.is_err() && !bad_result.is_ok());

// `map` 消耗 `Result` 并产生另一个。
let good_result: Result<i32, i32> = good_result.map(|i| i + 1);
let bad_result: Result<i32, i32> = bad_result.map(|i| i - 1);

// 使用 `and_then` 继续计算。
let good_result: Result<bool, i32> = good_result.and_then(|i| Ok(i == 11));

// 使用 `or_else` 处理该错误。
let bad_result: Result<i32, i32> = bad_result.or_else(|i| Ok(i + 20));

// 消费结果并用 `unwrap` 返回内容。
let final_awesome_result = good_result.unwrap();
```



## 1.基本使用

`Result<T, E>` 枚举被包含在了 [`std::prelude`](https://course.rs/appendix/prelude.html)（**prelude 属于 Rust 标准库，Rust 会将最常用的类型、函数等提前引入其中，省得我们再手动引入**）之中，你不需要将其显式引入作用域。

另外，它的成员 `Ok` 和 `Err` 也是如此，无需使用 `Result::` 前缀就可直接使用 `Ok` 和 `Err`。

比如下面一段代码

```rust
let o: Result<i32, &str> = Result::Ok(123);
let e: Result<i32, &str> = Result::Err("Failed to read file");
```

完全可以去掉`Option::`，然后使用下面的方式

```rust
let o: Result<i32, &str> = Ok(123);
let e: Result<i32, &str> = Err("Failed to read file");
```





Result常用于一个io操作函数的返回值

```rust
fn read_file(path: &str) -> Result<String, &str> {
    match std::fs::read_to_string(path) {
        Ok(s) => Ok(s),
        Err(_) => Err("Failed to read file"),
    }
}
```



:::warning 注意

不管是定义一个Ok变量，还是Err变量，都需要显示声明泛型

```rust
let o: Result<i32, &str> = Result::Ok(123);
let e: Result<i32, &str> = Err("Failed to read file");
```

:::





## 2.模式匹配

对于一个Result，使用模式匹配来获取其结果是相当经典的

```rust
let o: Result<i32, &str> = Ok(123);

match o {
    Ok(value) => {
        println!("{}", value);
    }
    Err(err) => {
        println!("{}", err);
    }
}
```

- 若Result的结果为Ok，那么在match中，Ok包含的值就会被赋值给参数value
- 若Result的结果为Err，那么在match中，Err包含的值就会被赋值给参数err



### 2.1 if let

`if let`是`match`的语法糖，简化`Option`和`Result`的`match`语句先看如下代码

当我们只关注`Result`成功的结果，而不想去处理失败的结果时，使用if let是个好选择

```rust
let o: Result<i32, &str> = Ok(123);

if let Ok(x) = o {
    println!("{}", x);
}
```

`if let`语句将先判断变量是否是`Ok`变体，如果是，则把这个变量的值赋值给`Ok`的参数





## 3.必须使用Result

使用返回值指示错误的一个常见问题是，很容易忽略返回值，从而无法处理错误。 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 与 `#[must_use]` 属性一起注解，当忽略 Result 值时会导致编译器发出警告。 这使得 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 对于可能遇到错误但不会返回有用值的函数特别有用。

考虑 [`Write`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html) trait 为 I/O 类型定义的 [`write_all`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html#method.write_all) 方法：

```rust
use std::io;

trait Write {
    fn write_all(&mut self, bytes: &[u8]) -> Result<(), io::Error>;
}
```



*Note: [`Write`](https://www.rustwiki.org.cn/zh-CN/std/io/trait.Write.html) 的实际定义使用了 [`io::Result`](https://www.rustwiki.org.cn/zh-CN/std/io/type.Result.html)，它只是 `Result<T, io::Error>` 的同义词。*

该方法不会产生值，但是写入可能会失败。处理错误情况至关重要，并且 *不要* 编写类似以下内容的代码：

```rust
use std::fs::File;
use std::io::prelude::*;

let mut file = File::create("valuable_data.txt").unwrap();
// 如果 `write_all` 错误，那么我们将永远不会知道，因为返回值将被忽略。
//
file.write_all(b"important message");
```



如果您确实将其写在 Rust 中，则编译器将向您发出警告 (默认情况下，由 `unused_must_use` lint 控制)。

相反，如果您不想处理该错误，则可以断言 [`expect`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.expect) 成功。 如果写入失败，这将为 panic，提供了一条边际有用的消息，指出原因：

```rust
use std::fs::File;
use std::io::prelude::*;

let mut file = File::create("valuable_data.txt").unwrap();
file.write_all(b"important message").expect("failed to write message");
```



您可能还简单地宣称成功：

```rust
assert!(file.write_all(b"important message").is_ok());
```



或者使用 [`?`](https://www.rustwiki.org.cn/zh-CN/std/ops/trait.Try.html) 在调用栈中传播错误：

```rust
fn write_message() -> io::Result<()> {
    let mut file = File::create("valuable_data.txt")?;
    file.write_all(b"important message")?;
    Ok(())
}
```





## 4.问号运算符`?`

`?`运算符：是Rust 中用于错误处理的简洁语法，主要作用是从函数中提前返回错误

- 它可以用在返回 Result或Option 类型的函数中
  - 成功时：解包 `Ok(T)`或 `Some(T)`中的值，程序继续执行 
  - 失败时：提早返回 `Err(E)`或 `None`，错误值会自动转换（若可能）

当一个返回Result的函数中使用了另一个返回`Result`的函数，使用`?`运算符可以减少`match`语句的使用

```rust {9-12}
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err("除数不能为0".to_string())
    } else {
        Ok(a / b)
    }
}

fn get_divide(a: i32, b: i32) -> Result<i32, String> {
    divide(a, b)?;
    Ok(a / b)
}

fn main() {
    let res = get_divide(500, 100);
    match res {
        Ok(d) => println!("{}", d),
        Err(s) => println!("{}", s),
    }
}
```





## 5.方法概述

除了使用模式匹配，[`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 还提供了多种不同的方法。

### 5.1 查询变体

如果 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 分别为 [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) 或 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err)，则 [`is_ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.is_ok) 和 [`is_err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.is_err) 方法返回 [`true`](https://www.rustwiki.org.cn/zh-CN/std/primitive.bool.html)。



### 5.2 用于处理引用的适配器

- [`as_ref`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.as_ref) 从 `&Result<T, E>` 转换为 `Result<&T, &E>`
- [`as_mut`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.as_mut) 从 `&mut Result<T, E>` 转换为 `Result<&mut T, &mut E>`
- [`as_deref`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.as_deref) 从 `&Result<T, E>` 转换为 `Result<&T::Target, &E>`
- [`as_deref_mut`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.as_deref_mut) 从 `&mut Result<T, E>` 转换为 `Result<&mut T::Target, &mut E>`



### 5.3 提取包含的值

当它是 [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) 变体时，这些方法提取 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 中包含的值。如果 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 是 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err)：

- [`expect`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.expect) panics 带有提供的自定义消息
- [`unwrap`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.unwrap) panics 带有泛型信息
- [`unwrap_or`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.unwrap_or) 返回提供的默认值
- [`unwrap_or_default`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.unwrap_or_default) 返回类型 `T` 的默认值 (必须实现 [`Default`](https://www.rustwiki.org.cn/zh-CN/std/default/trait.Default.html) trait)
- [`unwrap_or_else`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.unwrap_or_else) 返回对提供的函数求值的结果

panicking 方法 [`expect`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.expect) 和 [`unwrap`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.unwrap) 需要 `E` 来实现 [`Debug`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Debug.html) trait。

当它是 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err) 变体时，这些方法提取 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 中包含的值。他们需要 `T` 来实现 [`Debug`](https://www.rustwiki.org.cn/zh-CN/std/fmt/trait.Debug.html) trait。如果 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 是 [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok)：

- [`expect_err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.expect_err) panics 带有提供的自定义消息
- [`unwrap_err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.unwrap_err) panics 带有泛型信息



### 5.4 转换包含的值

这些方法将 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 转换为 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html)：

- [`err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.err) transforms [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) into [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html), mapping [`Err(e)`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err) to [`Some(e)`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) and [`Ok(v)`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) to [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)
- [`ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.ok) transforms [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) into [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html), mapping [`Ok(v)`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) to [`Some(v)`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) and [`Err(e)`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err) to [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)
- [`transpose`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.transpose) transposes a [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) of an [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) into an [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) of a [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html)

此方法转换 [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) 变体中包含的值：

- [`map`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.map) 通过将提供的函数应用于 [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) 的包含值并保持 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err) 值不变，将 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 转换为 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html)

此方法转换 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err) 变体中包含的值：

- [`map_err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.map_err) 通过将提供的函数应用于 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err) 的包含值并保持 [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) 值不变，将 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 转换为 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html)

这些方法将 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 转换为可能不同类型 `U` 的值：

- [`map_or`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.map_or) 将提供的函数应用于 [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) 的包含值，或者如果 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 是返回提供的默认值 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err)
- [`map_or_else`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.map_or_else) applies the provided function to the contained value of [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok), or applies the provided default fallback function to the contained value of [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err)



### 5.5 布尔运算符

这些方法将 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 视为布尔值，其中 [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) 的作用类似于 [`true`](https://www.rustwiki.org.cn/zh-CN/std/primitive.bool.html)，而 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err) 的作用类似于 [`false`](https://www.rustwiki.org.cn/zh-CN/std/primitive.bool.html)。这些方法有两类：一类以 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 作为输入，一类以函数作为输入 (延迟评估)。

[`and`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.and) 和 [`or`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.or) 方法将另一个 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 作为输入，并生成一个 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 作为输出。[`and`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.and) 方法可以生成具有与 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 不同的内部类型 `U` 的 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 值。 [`or`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.or) 方法可以生成具有与 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 不同的错误类型 `F` 的 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 值。

| method                                                       | self     | input     | output   |
| ------------------------------------------------------------ | -------- | --------- | -------- |
| [`and`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.and) | `Err(e)` | (ignored) | `Err(e)` |
| [`and`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.and) | `Ok(x)`  | `Err(d)`  | `Err(d)` |
| [`and`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.and) | `Ok(x)`  | `Ok(y)`   | `Ok(y)`  |
| [`or`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.or) | `Err(e)` | `Err(d)`  | `Err(d)` |
| [`or`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.or) | `Err(e)` | `Ok(y)`   | `Ok(y)`  |
| [`or`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.or) | `Ok(x)`  | (ignored) | `Ok(x)`  |

[`and_then`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.and_then) 和 [`or_else`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.or_else) 方法将函数作为输入，并且仅在需要产生新值时才评估函数。[`and_then`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.and_then) 方法可以生成一个 [`Result<U，E>`] 值，该值的内部类型 `U` 与 [`Result<T，E>`] 不同。 [`or_else`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.or_else) 方法可以生成具有与 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 不同的错误类型 `F` 的 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 值。

| method                                                       | self     | function input | function result | output   |
| ------------------------------------------------------------ | -------- | -------------- | --------------- | -------- |
| [`and_then`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.and_then) | `Err(e)` | (not provided) | (not evaluated) | `Err(e)` |
| [`and_then`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.and_then) | `Ok(x)`  | `x`            | `Err(d)`        | `Err(d)` |
| [`and_then`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.and_then) | `Ok(x)`  | `x`            | `Ok(y)`         | `Ok(y)`  |
| [`or_else`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.or_else) | `Err(e)` | `e`            | `Err(d)`        | `Err(d)` |
| [`or_else`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.or_else) | `Err(e)` | `e`            | `Ok(y)`         | `Ok(y)`  |
| [`or_else`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.or_else) | `Ok(x)`  | (not provided) | (not evaluated) | `Ok(x)`  |



### 5.6 比较运算符

如果 `T` 和 `E` 都实现 [`PartialOrd`](https://www.rustwiki.org.cn/zh-CN/std/cmp/trait.PartialOrd.html)，那么 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 将派生其 [`PartialOrd`](https://www.rustwiki.org.cn/zh-CN/std/cmp/trait.PartialOrd.html) 实现。 按照此顺序，一个 [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) 的比较小于任何 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err)，而两个 [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) 或两个 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err) 的比较与其包含的值分别在 `T` 或 `E` 中进行比较。 如果 `T` 和 `E` 都实现了 [`Ord`](https://www.rustwiki.org.cn/zh-CN/std/cmp/trait.Ord.html)，那么 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 也实现了。

```
assert!(Ok(1) < Err(0));
let x: Result<i32, ()> = Ok(0);
let y = Ok(1);
assert!(x < y);
let x: Result<(), i32> = Err(0);
let y = Err(1);
assert!(x < y);
```



### 5.7 迭代 `Result`

可以对 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 进行迭代。如果您需要一个条件为空的迭代器，这会很有帮助。迭代器要么产生单个值 (当 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 为 [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) 时)，要么不产生任何值 (当 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 为 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err) 时)。 例如，如果 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 是 [`Ok(v)`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok)，则 [`into_iter`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.into_iter) 的作用类似于 [`once(v)`](https://www.rustwiki.org.cn/zh-CN/std/iter/fn.once.html); 如果 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 是 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err)，则它的作用类似于 [`empty()`](https://www.rustwiki.org.cn/zh-CN/std/iter/fn.empty.html)。

[`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 上的迭代器分为三种类型：

- [`into_iter`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.into_iter) 消耗 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 并产生包含的值
- [`iter`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.iter) 对包含的值产生类型为 `&T` 的不可变引用
- [`iter_mut`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#method.iter_mut) 产生一个 `&mut T` 类型的可变引用到包含的值

有关这如何有用的示例，请参见 [迭代 `Option`](https://www.rustwiki.org.cn/zh-CN/std/option/index.html#iterating-over-option)。

您可能希望使用迭代器链来执行可能失败的操作的多个实例，但希望在继续处理成功结果的同时忽略失败。 在本例中，我们利用 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 的可迭代特性，使用 [`flatten`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.flatten) 仅选择 [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) 值。

```
let mut results = vec![];
let mut errs = vec![];
let nums: Vec<_> = ["17", "not a number", "99", "-27", "768"]
   .into_iter()
   .map(u8::from_str)
   // 保存原始 `Result` 值的克隆以进行检查
   .inspect(|x| results.push(x.clone()))
   // 挑战：解释这如何仅捕获 `Err` 值
   .inspect(|x| errs.extend(x.clone().err()))
   .flatten()
   .collect();
assert_eq!(errs.len(), 3);
assert_eq!(nums, [17, 99]);
println!("results {results:?}");
println!("errs {errs:?}");
println!("nums {nums:?}");
```



### 5.8 收集到 `Result`

[`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 实现了 [`FromIterator`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#impl-FromIterator>-for-Result) trait，它允许将 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 值上的迭代器收集到原始 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 值的每个包含值的集合的 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 中，或者如果任何元素是 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err)，则为 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err)。

```
let v = [Ok(2), Ok(4), Err("err!"), Ok(8)];
let res: Result<Vec<_>, &str> = v.into_iter().collect();
assert_eq!(res, Err("err!"));
let v = [Ok(2), Ok(4), Ok(8)];
let res: Result<Vec<_>, &str> = v.into_iter().collect();
assert_eq!(res, Ok(vec![2, 4, 8]));
```



[`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 还实现了 [`Product`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#impl-Product>-for-Result) 和 [`Sum`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#impl-Sum>-for-Result) traits，允许对 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 值的迭代器提供 [`product`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.product) 和 [`sum`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.sum) 方法。

```
let v = [Err("error!"), Ok(1), Ok(2), Ok(3), Err("foo")];
let res: Result<i32, &str> = v.into_iter().sum();
assert_eq!(res, Err("error!"));
let v = [Ok(1), Ok(2), Ok(21)];
let res: Result<i32, &str> = v.into_iter().product();
assert_eq!(res, Ok(42));
```







## 6.Structs

- [IntoIter](https://www.rustwiki.org.cn/zh-CN/std/result/struct.IntoIter.html)：[`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 的 [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) 变体中的值的迭代器。
- [Iter](https://www.rustwiki.org.cn/zh-CN/std/result/struct.Iter.html)：[`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 的 [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) 变体的引用上的迭代器。
- [IterMut](https://www.rustwiki.org.cn/zh-CN/std/result/struct.IterMut.html)：[`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) 的 [`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok) 变体的可变引用上的迭代器。



## 7.Enums

- [Result](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html)：`Result` 是代表成功 ([`Ok`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok)) 或失败 ([`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err)) 的类型。