# 浮点数类型

`Rust`有两种浮点数类型：`f32`（单精度）和`f64`（双精度），分别占 32 位和 64 位。它们都遵从 IEEE-754 标准。

**浮点类型的默认值都为`0.0`**

```rust
let x = 2.0;           // f64（默认，推荐）
let y: f32 = 3.0;      // f32（显式标注）

// 科学记数法
let large = 1e6;       // 1000000.0 (f64)
let small = 1e-6;      // 0.000001 (f64)
```

**一个浮点数类型的字面量默认为 `f64`，与现代CPU性能相近但精度更高。**



`char` 表示一个 Unicode 标量值，它可以存储英文字母，中文字符，拉丁文等等。使用单引号`''`来声明。

**字符类型的默认值都为`'\0'`**

```rust
let c = 'z';                   // ASCII字符
let unicode = 'ℤ';             // Unicode字符
let chinese = '中';             // 中文
```

Rust 的 `char` 类型的大小为**四个字节**(four bytes)，并代表了一个 Unicode 标量值（Unicode Scalar Value），这意味着它可以比 ASCII 表示更多内容。

在 Rust 中，拼音字母（Accented letters），中文、日文、韩文等字符，emoji（绘文字）以及零长度的空白字符都是有效的 `char` 值。

Unicode 标量值包含从 `U+0000` 到 `U+D7FF` 和 `U+E000` 到 `U+10FFFF` 在内的值。