# Trait std::fmt::UpperHex

`X` 格式。

```rust
pub trait UpperHex {
    // Required method
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>;
}
```

`UpperHex` trait 应该将其输出格式设置为十六进制数字，其中 `A` 至 `F` 为大写形式。

对于原始有符号整数 (`i8` 至 `i128` 和 `isize`)，负值的格式设置为二进制补码表示形式。

备用标志 `#` 在输出前面添加 `0x`。

`i32` 的基本用法：

```rust
let x = 42; // 42 是十六进制的 '2A'

assert_eq!(format!("{x:X}"), "2A");
assert_eq!(format!("{x:#X}"), "0x2A");

assert_eq!(format!("{:X}", -16), "FFFFFFF0");
```

在类型上实现 `UpperHex`：

```rust
use std::fmt;

struct Length(i32);

impl fmt::UpperHex for Length {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let val = self.0;

        fmt::UpperHex::fmt(&val, f) // 委托给 i32 的实现
    }
}

let l = Length(i32::MAX);

assert_eq!(format!("l as hex is: {l:X}"), "l as hex is: 7FFFFFFF");

assert_eq!(format!("l as hex is: {l:#010X}"), "l as hex is: 0x7FFFFFFF");
```



## Required Methods

#### fmt

使用给定的格式化程序格式化该值。

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```





## Implementors



### impl UpperHex for i8



### impl UpperHex for i16



### impl UpperHex for i32



### impl UpperHex for i64



### impl UpperHex for i128



### impl UpperHex for isize



### impl UpperHex for u8



### impl UpperHex for u16



### impl UpperHex for u32



### impl UpperHex for u64



### impl UpperHex for u128



### impl UpperHex for usize



### impl UpperHex for NonZeroI8



### impl UpperHex for NonZeroI16



### impl UpperHex for NonZeroI32



### impl UpperHex for NonZeroI64



### impl UpperHex for NonZeroI128



### impl UpperHex for NonZeroIsize



### impl UpperHex for NonZeroU8



### impl UpperHex for NonZeroU16



### impl UpperHex for NonZeroU32



### impl UpperHex for NonZeroU64



### impl UpperHex for NonZeroU128



### impl UpperHex for NonZeroUsize



### impl\<T> UpperHex for &T

```rust
impl<T> UpperHex for &T
where
  T: UpperHex + ?Sized,
```



### impl\<T> UpperHex for &mut T

```rust
impl<T> UpperHex for &mut T
where
  T: UpperHex + ?Sized,
```



### impl\<T> UpperHex for Saturating\<T>

```rust
impl<T> UpperHex for Saturating<T>
where
  T: UpperHex,
```



### impl\<T> UpperHex for Wrapping\<T>

```rust
impl<T> UpperHex for Wrapping<T>
where
  T: UpperHex,
