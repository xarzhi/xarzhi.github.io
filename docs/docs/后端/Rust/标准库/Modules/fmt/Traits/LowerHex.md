# Trait std::fmt::LowerHex

`x` 格式。

```rust
pub trait LowerHex {
    // Required method
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>;
}
```

`LowerHex` trait 应该将其输出格式设置为十六进制数字，其中 `a` 至 `f` 为小写形式。

对于原始有符号整数 (`i8` 至 `i128` 和 `isize`)，负值的格式设置为二进制补码表示形式。

备用标志 `#` 在输出前面添加 `0x`。

`i32` 的基本用法：

```rust
let x = 42; // 42 是十六进制的 '2a'

assert_eq!(format!("{x:x}"), "2a");
assert_eq!(format!("{x:#x}"), "0x2a");

assert_eq!(format!("{:x}", -16), "fffffff0");
```

在类型上实现 `LowerHex`：

```rust
use std::fmt;

struct Length(i32);

impl fmt::LowerHex for Length {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let val = self.0;

        fmt::LowerHex::fmt(&val, f) // 委托给 i32 的实现
    }
}

let l = Length(9);

assert_eq!(format!("l as hex is: {l:x}"), "l as hex is: 9");

assert_eq!(format!("l as hex is: {l:#010x}"), "l as hex is: 0x00000009");
```





## Required Methods

#### fmt

使用给定的格式化程序格式化该值。

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



## Implementors



### impl LowerHex for i8



### impl LowerHex for i16



### impl LowerHex for i32



### impl LowerHex for i64



### impl LowerHex for i128



### impl LowerHex for isize



### impl LowerHex for u8



### impl LowerHex for u16



### impl LowerHex for u32



### impl LowerHex for u64



### impl LowerHex for u128



### impl LowerHex for usize



### impl LowerHex for NonZeroI8



### impl LowerHex for NonZeroI16



### impl LowerHex for NonZeroI32



### impl LowerHex for NonZeroI64



### impl LowerHex for NonZeroI128



### impl LowerHex for NonZeroIsize



### impl LowerHex for NonZeroU8



### impl LowerHex for NonZeroU16



### impl LowerHex for NonZeroU32



### impl LowerHex for NonZeroU64



### impl LowerHex for NonZeroU128



### impl LowerHex for NonZeroUsize



### impl\<T> LowerHex for &T

```rust
impl<T> LowerHex for &T
where
  T: LowerHex + ?Sized,
```



### impl\<T> LowerHex for &mut T

```rust
impl<T> LowerHex for &mut T
where
  T: LowerHex + ?Sized,
```



### impl\<T> LowerHex for Saturating\<T>

```rust
impl<T> LowerHex for Saturating<T>
where
  T: LowerHex,
```



### impl\<T> LowerHex for Wrapping\<T>

```rust
impl<T> LowerHex for Wrapping<T>
where
  T: LowerHex,
```