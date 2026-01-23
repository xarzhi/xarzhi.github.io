# String

`String`一个 UTF-8 编码的可增长字符串。

`String` 类型是最常见的字符串类型，拥有对该字符串内容的所有权。它与其借用的对应物，原始的 [`str`](https://www.rustwiki.org.cn/zh-CN/std/primitive.str.html) 有着密切的关系。





## Deref

`String` 实现了 `Deref<Target = str>`，因此继承了 [`str`](https://www.rustwiki.org.cn/zh-CN/std/primitive.str.html) 的所有方法。另外，这意味着您可以使用与号 (`&`) 将 `String` 传递给采用 [`&str`](https://www.rustwiki.org.cn/zh-CN/std/primitive.str.html) 的函数：

```rust
fn takes_str(s: &str) { }

let s = String::from("Hello");

takes_str(&s);
```



这将从 `String` 创建一个 [`&str`](https://www.rustwiki.org.cn/zh-CN/std/primitive.str.html)，并将其传入。这种转换非常方便，因此通常，函数会接受 [`&str`](https://www.rustwiki.org.cn/zh-CN/std/primitive.str.html) 作为参数，除非出于某些特定原因它们需要 `String`。



## String的组成