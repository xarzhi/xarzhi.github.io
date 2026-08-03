# Trait std::ops::AddAssign

加法赋值运算符 `+=`。

```rust
pub trait AddAssign\<Rhs = Self> {
    // Required method
    fn add_assign(&mut self, rhs: Rhs);
}
```

本示例创建一个 `Point` 结构体，该结构体实现 `AddAssign` trait，然后演示对可变 `Point` 的添加分配。

```rust
use std::ops::AddAssign;

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl AddAssign for Point {
    fn add_assign(&mut self, other: Self) {
        *self = Self {
            x: self.x + other.x,
            y: self.y + other.y,
        };
    }
}

let mut point = Point { x: 1, y: 0 };
point += Point { x: 2, y: 3 };
assert_eq!(point, Point { x: 3, y: 3 });
```



## Required Methods

### add_assign

执行 `+=` 操作。

```rust
fn add_assign(&mut self, rhs: Rhs)
```

**参数**：

- **rhs**：添加的右值

```rust
let mut x: u32 = 12;
x += 1;
assert_eq!(x, 13);
```



## Implementors

### impl AddAssign\<&f32> for f32



### impl AddAssign\<&f64> for f64



### impl AddAssign\<&i8> for i8



### impl AddAssign\<&i8> for Saturating\<i8>



### impl AddAssign\<&i8> for Wrapping\<i8>



### impl AddAssign\<&i16> for i16



### impl AddAssign\<&i16> for Saturating\<i16>



### impl AddAssign\<&i16> for Wrapping\<i16>



### impl AddAssign\<&i32> for i32



### impl AddAssign\<&i32> for Saturating\<i32>



### impl AddAssign\<&i32> for Wrapping\<i32>



### impl AddAssign\<&i64> for i64



### impl AddAssign\<&i64> for Saturating\<i64>



### impl AddAssign\<&i64> for Wrapping\<i64>



### impl AddAssign\<&i128> for i128



### impl AddAssign\<&i128> for Saturating\<i128>



### impl AddAssign\<&i128> for Wrapping\<i128>



### impl AddAssign\<&isize> for isize



### impl AddAssign\<&isize> for Saturating\<isize>



### impl AddAssign\<&isize> for Wrapping\<isize>



### impl AddAssign\<&str> for String

实现用于追加到 String 的 += 运算符。



这与 push_str 方法具有相同的行为。





### impl AddAssign\<&u8> for u8



### impl AddAssign\<&u8> for Saturating\<u8>



### impl AddAssign\<&u8> for Wrapping\<u8>



### impl AddAssign\<&u16> for u16



### impl AddAssign\<&u16> for Saturating\<u16>



### impl AddAssign\<&u16> for Wrapping\<u16>



### impl AddAssign\<&u32> for u32



### impl AddAssign\<&u32> for Saturating\<u32>



### impl AddAssign\<&u32> for Wrapping\<u32>



### impl AddAssign\<&u64> for u64



### impl AddAssign\<&u64> for Saturating\<u64>



### impl AddAssign\<&u64> for Wrapping\<u64>



### impl AddAssign\<&u128> for u128



### impl AddAssign\<&u128> for Saturating\<u128>



### impl AddAssign\<&u128> for Wrapping\<u128>



### impl AddAssign\<&usize> for usize



### impl AddAssign\<&usize> for Saturating\<usize>



### impl AddAssign\<&usize> for Wrapping\<usize>



### impl AddAssign\<&Saturating\<i8>> for Saturating\<i8>



### impl AddAssign\<&Saturating\<i16>> for Saturating\<i16>



### impl AddAssign\<&Saturating\<i32>> for Saturating\<i32>



### impl AddAssign\<&Saturating\<i64>> for Saturating\<i64>



### impl AddAssign\<&Saturating\<i128>> for Saturating\<i128>



### impl AddAssign\<&Saturating\<isize>> for Saturating\<isize>



### impl AddAssign\<&Saturating\<u8>> for Saturating\<u8>



### impl AddAssign\<&Saturating\<u16>> for Saturating\<u16>



### impl AddAssign\<&Saturating\<u32>> for Saturating\<u32>



### impl AddAssign\<&Saturating\<u64>> for Saturating\<u64>



### impl AddAssign\<&Saturating\<u128>> for Saturating\<u128>



### impl AddAssign\<&Saturating\<usize>> for Saturating\<usize>



### impl AddAssign\<&Wrapping\<i8>> for Wrapping\<i8>



### impl AddAssign\<&Wrapping\<i16>> for Wrapping\<i16>



### impl AddAssign\<&Wrapping\<i32>> for Wrapping\<i32>



### impl AddAssign\<&Wrapping\<i64>> for Wrapping\<i64>



### impl AddAssign\<&Wrapping\<i128>> for Wrapping\<i128>



### impl AddAssign\<&Wrapping\<isize>> for Wrapping\<isize>



### impl AddAssign\<&Wrapping\<u8>> for Wrapping\<u8>



### impl AddAssign\<&Wrapping\<u16>> for Wrapping\<u16>



### impl AddAssign\<&Wrapping\<u32>> for Wrapping\<u32>



### impl AddAssign\<&Wrapping\<u64>> for Wrapping\<u64>



### impl AddAssign\<&Wrapping\<u128>> for Wrapping\<u128>



### impl AddAssign\<&Wrapping\<usize>> for Wrapping\<usize>



### impl AddAssign\<f32> for f32



### impl AddAssign\<f64> for f64



### impl AddAssign\<i8> for i8



### impl AddAssign\<i8> for Saturating\<i8>



### impl AddAssign\<i8> for Wrapping\<i8>



### impl AddAssign\<i16> for i16



### impl AddAssign\<i16> for Saturating\<i16>



### impl AddAssign\<i16> for Wrapping\<i16>



### impl AddAssign\<i32> for i32



### impl AddAssign\<i32> for Saturating\<i32>



### impl AddAssign\<i32> for Wrapping\<i32>



### impl AddAssign\<i64> for i64



### impl AddAssign\<i64> for Saturating\<i64>



### impl AddAssign\<i64> for Wrapping\<i64>



### impl AddAssign\<i128> for i128



### impl AddAssign\<i128> for Saturating\<i128>



### impl AddAssign\<i128> for Wrapping\<i128>



### impl AddAssign\<isize> for isize



### impl AddAssign\<isize> for Saturating\<isize>



### impl AddAssign\<isize> for Wrapping\<isize>



### impl AddAssign\<u8> for u8



### impl AddAssign\<u8> for Saturating\<u8>



### impl AddAssign\<u8> for Wrapping\<u8>



### impl AddAssign\<u16> for u16



### impl AddAssign\<u16> for Saturating\<u16>



### impl AddAssign\<u16> for Wrapping\<u16>



### impl AddAssign\<u32> for u32



### impl AddAssign\<u32> for Saturating\<u32>



### impl AddAssign\<u32> for Wrapping\<u32>



### impl AddAssign\<u64> for u64



### impl AddAssign\<u64> for Saturating\<u64>



### impl AddAssign\<u64> for Wrapping\<u64>



### impl AddAssign\<u128> for u128



### impl AddAssign\<u128> for Saturating\<u128>



### impl AddAssign\<u128> for Wrapping\<u128>



### impl AddAssign\<usize> for usize



### impl AddAssign\<usize> for Saturating\<usize>



### impl AddAssign\<usize> for Wrapping\<usize>



### impl AddAssign\<Saturating\<i8>> for Saturating\<i8>



### impl AddAssign\<Saturating\<i16>> for Saturating\<i16>



### impl AddAssign\<Saturating\<i32>> for Saturating\<i32>



### impl AddAssign\<Saturating\<i64>> for Saturating\<i64>



### impl AddAssign\<Saturating\<i128>> for Saturating\<i128>



### impl AddAssign\<Saturating\<isize>> for Saturating\<isize>



### impl AddAssign\<Saturating\<u8>> for Saturating\<u8>



### impl AddAssign\<Saturating\<u16>> for Saturating\<u16>



### impl AddAssign\<Saturating\<u32>> for Saturating\<u32>



### impl AddAssign\<Saturating\<u64>> for Saturating\<u64>



### impl AddAssign\<Saturating\<u128>> for Saturating\<u128>



### impl AddAssign\<Saturating\<usize>> for Saturating\<usize>



### impl AddAssign\<Wrapping\<i8>> for Wrapping\<i8>



### impl AddAssign\<Wrapping\<i16>> for Wrapping\<i16>



### impl AddAssign\<Wrapping\<i32>> for Wrapping\<i32>



### impl AddAssign\<Wrapping\<i64>> for Wrapping\<i64>



### impl AddAssign\<Wrapping\<i128>> for Wrapping\<i128>



### impl AddAssign\<Wrapping\<isize>> for Wrapping\<isize>



### impl AddAssign\<Wrapping\<u8>> for Wrapping\<u8>



### impl AddAssign\<Wrapping\<u16>> for Wrapping\<u16>



### impl AddAssign\<Wrapping\<u32>> for Wrapping\<u32>



### impl AddAssign\<Wrapping\<u64>> for Wrapping\<u64>



### impl AddAssign\<Wrapping\<u128>> for Wrapping\<u128>



### impl AddAssign\<Wrapping\<usize>> for Wrapping\<usize>



### impl AddAssign\<Duration> for Duration



### impl AddAssign\<Duration> for Instant



### impl AddAssign\<Duration> for SystemTime



### impl\<'a> AddAssign\<&'a str> for Cow\<'a, str>



### impl\<'a> AddAssign\<Cow\<'a, str>> for Cow\<'a, str>



### impl\<T, U, const LANES: usize> AddAssign\<U> for Simd\<T, LANES>

```rust
impl<T, U, const LANES: usize> AddAssign<U> for Simd<T, LANES>
where
  Simd<T, LANES>: Add<U, Output = Simd<T, LANES>>,
  T: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```

