# Trait std::fmt::Binary

二进制 b 格式。

```rust
pub trait Binary {
    // Required method
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>;
}
```

Binary trait 应该将其输出格式化为二进制格式的数字。

对于原始有符号整数 (i8 至 i128 和 isize)，负值的格式设置为二进制补码表示形式。

备用标志 # 在输出前面添加 0b。

`i32` 的基本用法：

```rust
let x = 42; // 42 是 '101010' 二进制

assert_eq!(format!("{x:b}"), "101010");
assert_eq!(format!("{x:#b}"), "0b101010");

assert_eq!(format!("{:b}", -16), "11111111111111111111111111110000");
```

在类型上实现 `Binary`：

```rust
use std::fmt;

struct Length(i32);

impl fmt::Binary for Length {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let val = self.0;

        fmt::Binary::fmt(&val, f) // 委托给 i32 的实现
    }
}

let l = Length(107);

assert_eq!(format!("l as binary is: {l:b}"), "l as binary is: 1101011");

assert_eq!(
    format!("l as binary is: {l:#032b}"),
    "l as binary is: 0b000000000000000000000001101011"
);
```





## Required Methods

### fmt

使用给定的格式化程序格式化该值。

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



## Implementors



### impl Binary for i8



### impl Binary for i16



### impl Binary for i32



### impl Binary for i64



### impl Binary for i128



### impl Binary for isize



### impl Binary for u8



### impl Binary for u16



### impl Binary for u32



### impl Binary for u64



### impl Binary for u128



### impl Binary for usize



### impl Binary for NonZeroI8



### impl Binary for NonZeroI16



### impl Binary for NonZeroI32



### impl Binary for NonZeroI64



### impl Binary for NonZeroI128



### impl Binary for NonZeroIsize



### impl Binary for NonZeroU8



### impl Binary for NonZeroU16



### impl Binary for NonZeroU32



### impl Binary for NonZeroU64



### impl Binary for NonZeroU128



### impl Binary for NonZeroUsize



### impl\<T> Binary for &T

```rust
impl<T> Binary for &T
where
  T: Binary + ?Sized,
```



### impl\<T> Binary for &mut T

```rust
impl<T> Binary for &mut T
where
  T: Binary + ?Sized,
```



### impl\<T> Binary for Saturating\<T>

```rust
impl<T> Binary for Saturating<T>
where
  T: Binary,
```



### impl\<T> Binary for Wrapping\<T>

```rust
impl<T> Binary for Wrapping<T>
where
  T: Binary,
```

