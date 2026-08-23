# Trait std::fmt::UpperExp

`E` 格式。

`UpperExp` trait 应该使用大写的 `E` 以科学计数法格式化其输出。

```rust
pub trait UpperExp {
    // Required method
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>;
}
```

`f64` 的基本用法：

```rust
let x = 42.0; // 42.0 是 '4.2E1' 的科学计数形式

assert_eq!(format!("{x:E}"), "4.2E1");
```

在类型上实现 `UpperExp`：

```rust
use std::fmt;

struct Length(i32);

impl fmt::UpperExp for Length {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let val = f64::from(self.0);
        fmt::UpperExp::fmt(&val, f) // 委托 f64 的实现
    }
}

let l = Length(100);

assert_eq!(
    format!("l in scientific notation is: {l:E}"),
    "l in scientific notation is: 1E2"
);

assert_eq!(
    format!("l in scientific notation is: {l:05E}"),
    "l in scientific notation is: 001E2"
);
```



## Required Methods

#### fmt

使用给定的格式化程序格式化该值。

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



## Implementors



### impl UpperExp for f32



### impl UpperExp for f64



### impl UpperExp for i8



### impl UpperExp for i16



### impl UpperExp for i32



### impl UpperExp for i64



### impl UpperExp for i128



### impl UpperExp for isize



### impl UpperExp for u8



### impl UpperExp for u16



### impl UpperExp for u32



### impl UpperExp for u64



### impl UpperExp for u128



### impl UpperExp for usize



### impl\<T> UpperExp for &T

```rust
impl<T> UpperExp for &T
where
  T: UpperExp + ?Sized,
```



### impl\<T> UpperExp for &mut T

```rust
impl<T> UpperExp for &mut T
where
  T: UpperExp + ?Sized,
```

