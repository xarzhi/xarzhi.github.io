# Module std::string

一个 UTF-8 编码的可增长字符串。

该模块包含`String` 类型，用于转换为字符串的 `ToString` trait 以及使用 `String`可能导致的几种错误类型。



有多种方法可从字符串字面量创建新的 [`String`](https://www.rustwiki.org.cn/zh-CN/std/string/struct.String.html)：

```rust
let s = "Hello".to_string();

let s = String::from("world");
let s: String = "also this".into();
```



您可以通过与现有的 [`String`](https://www.rustwiki.org.cn/zh-CN/std/string/struct.String.html) 串联来创建一个新的 [`String`](https://www.rustwiki.org.cn/zh-CN/std/string/struct.String.html)。 `+`:

```rust
let s = "Hello".to_string();

let message = s + " world!";
```



如果您有一个有效的 UTF-8 字节 vector，则可以用它制作一个 [`String`](https://www.rustwiki.org.cn/zh-CN/std/string/struct.String.html)。您也可以做相反的事情。

```rust
let sparkle_heart = vec![240, 159, 146, 150];

// 我们知道这些字节是有效的，因此我们将使用 `unwrap()`。
let sparkle_heart = String::from_utf8(sparkle_heart).unwrap();

assert_eq!("💖", sparkle_heart);

let bytes = sparkle_heart.into_bytes();

assert_eq!(bytes, [240, 159, 146, 150]);
```



## Structs

- Drain：String 的 draining 迭代器。
- FromUtf8Error：从 UTF-8 字节 vector 转换 String 时可能的错误值。
- FromUtf16Error：从 UTF-16 字节切片转换 String 时可能的错误值。
- String：一个 UTF-8 编码的可增长字符串。



## Traits

- ToString：一个用于将值转换为 String 的 trait。



## Type Definitions

- ParseError：Infallible 的类型别名。