# Trait std::fmt::Octal

`o` 格式。

```rust
pub trait Octal {
    // Required method
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>;
}
```

`Octal` trait 应该将其输出格式化为 base-8 中的数字。

对于原始有符号整数 (`i8` 至 `i128` 和 `isize`)，负值的格式设置为二进制补码表示形式。

备用标志 `#` 在输出前面添加 `0o`。

`i32` 的基本用法：

```rust
let x = 42; // 42 是八进制的 '52'

assert_eq!(format!("{x:o}"), "52");
assert_eq!(format!("{x:#o}"), "0o52");

assert_eq!(format!("{:o}", -16), "37777777760");
```

在类型上实现 `Octal`：

```rust
use std::fmt;

struct Length(i32);

impl fmt::Octal for Length {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let val = self.0;

        fmt::Octal::fmt(&val, f) // 委托给 i32 的实现
    }
}

let l = Length(9);

assert_eq!(format!("l as octal is: {l:o}"), "l as octal is: 11");

assert_eq!(format!("l as octal is: {l:#06o}"), "l as octal is: 0o0011");
```



## Required Methods

#### fmt

使用给定的格式化程序格式化该值。

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



## Implementors



### impl Octal for i8



### impl Octal for i16



### impl Octal for i32



### impl Octal for i64



### impl Octal for i128



### impl Octal for isize



### impl Octal for u8



### impl Octal for u16



### impl Octal for u32



### impl Octal for u64



### impl Octal for u128



### impl Octal for usize



### impl Octal for NonZeroI8



### impl Octal for NonZeroI16



### impl Octal for NonZeroI32



### impl Octal for NonZeroI64



### impl Octal for NonZeroI128



### impl Octal for NonZeroIsize



### impl Octal for NonZeroU8



### impl Octal for NonZeroU16



### impl Octal for NonZeroU32



### impl Octal for NonZeroU64



### impl Octal for NonZeroU128



### impl Octal for NonZeroUsize



### impl\<T> Octal for &T

```rust
impl<T> Octal for &T
where
  T: Octal + ?Sized,
```



### impl\<T> Octal for &mut T

```rust
impl<T> Octal for &mut T
where
  T: Octal + ?Sized,
```



### impl\<T> Octal for Saturating\<T>

```rust
impl<T> Octal for Saturating<T>
where
  T: Octal,
```



### impl\<T> Octal for Wrapping\<T>

```rust
impl<T> Octal for Wrapping<T>
where
  T: Octal,
