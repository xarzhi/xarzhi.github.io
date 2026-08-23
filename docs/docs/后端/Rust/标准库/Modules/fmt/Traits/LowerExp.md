# Trait std::fmt::LowerExp

`e` 格式。

`LowerExp` trait 应该使用小写的 `e` 以科学计数法格式化其输出。

```rust
pub trait LowerExp {
    // Required method
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>;
}
```

`f64` 的基本用法：

```rust
let x = 42.0; // 42.0 是 '4.2e1' 的科学计数形式

assert_eq!(format!("{x:e}"), "4.2e1");
```

在类型上实现 `LowerExp`：

```rust
use std::fmt;

struct Length(i32);

impl fmt::LowerExp for Length {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let val = f64::from(self.0);
        fmt::LowerExp::fmt(&val, f) // 委托 f64 的实现
    }
}

let l = Length(100);

assert_eq!(
    format!("l in scientific notation is: {l:e}"),
    "l in scientific notation is: 1e2"
);

assert_eq!(
    format!("l in scientific notation is: {l:05e}"),
    "l in scientific notation is: 001e2"
);
```



## Required Methods

#### fmt

使用给定的格式化程序格式化该值。

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



## Implementors



### impl LowerExp for f32



### impl LowerExp for f64



### impl LowerExp for i8



### impl LowerExp for i16



### impl LowerExp for i32



### impl LowerExp for i64



### impl LowerExp for i128



### impl LowerExp for isize



### impl LowerExp for u8



### impl LowerExp for u16



### impl LowerExp for u32



### impl LowerExp for u64



### impl LowerExp for u128



### impl LowerExp for usize



### impl\<T> LowerExp for &T

```rust
impl<T> LowerExp for &T
where
  T: LowerExp + ?Sized,
```



### impl\<T> LowerExp for &mut T

```rust
impl<T> LowerExp for &mut T
where
  T: LowerExp + ?Sized,