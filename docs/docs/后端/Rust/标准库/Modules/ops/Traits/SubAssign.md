# Trait std::ops::SubAssign

减法赋值运算符 `-=`。

```rust
pub trait SubAssign<Rhs = Self> {
    // Required method
    fn sub_assign(&mut self, rhs: Rhs);
}
```

本示例创建一个实现 `SubAssign` trait 的 `Point` 结构体，然后演示对可变 `Point` 的子分配。

```rust
use std::ops::SubAssign;

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl SubAssign for Point {
    fn sub_assign(&mut self, other: Self) {
        *self = Self {
            x: self.x - other.x,
            y: self.y - other.y,
        };
    }
}

let mut point = Point { x: 3, y: 3 };
point -= Point { x: 2, y: 3 };
assert_eq!(point, Point {x: 1, y: 0});
```



## Required Methods

### sub_assign

执行 `-=` 操作。

```rust
fn sub_assign(&mut self, rhs: Rhs)
```

**参数**：

- **rhs**：执行 ` -=` 操作的右值

```rust
let mut x: u32 = 12;
x -= 1;
assert_eq!(x, 11);
```

### 

## Implementors

### impl SubAssign\<&f32> for f32



### impl SubAssign\<&f64> for f64



### impl SubAssign\<&i8> for i8



### impl SubAssign\<&i8> for Saturating\<i8>



### impl SubAssign\<&i8> for Wrapping\<i8>



### impl SubAssign\<&i16> for i16



### impl SubAssign\<&i16> for Saturating\<i16>



### impl SubAssign\<&i16> for Wrapping\<i16>



### impl SubAssign\<&i32> for i32



### impl SubAssign\<&i32> for Saturating\<i32>



### impl SubAssign\<&i32> for Wrapping\<i32>



### impl SubAssign\<&i64> for i64



### impl SubAssign\<&i64> for Saturating\<i64>



### impl SubAssign\<&i64> for Wrapping\<i64>



### impl SubAssign\<&i128> for i128



### impl SubAssign\<&i128> for Saturating\<i128>



### impl SubAssign\<&i128> for Wrapping\<i128>



### impl SubAssign\<&isize> for isize



### impl SubAssign\<&isize> for Saturating\<isize>



### impl SubAssign\<&isize> for Wrapping\<isize>



### impl SubAssign\<&u8> for u8



### impl SubAssign\<&u8> for Saturating\<u8>



### impl SubAssign\<&u8> for Wrapping\<u8>



### impl SubAssign\<&u16> for u16



### impl SubAssign\<&u16> for Saturating\<u16>



### impl SubAssign\<&u16> for Wrapping\<u16>



### impl SubAssign\<&u32> for u32



### impl SubAssign\<&u32> for Saturating\<u32>



### impl SubAssign\<&u32> for Wrapping\<u32>



### impl SubAssign\<&u64> for u64



### impl SubAssign\<&u64> for Saturating\<u64>



### impl SubAssign\<&u64> for Wrapping\<u64>



### impl SubAssign\<&u128> for u128



### impl SubAssign\<&u128> for Saturating\<u128>



### impl SubAssign\<&u128> for Wrapping\<u128>



### impl SubAssign\<&usize> for usize



### impl SubAssign\<&usize> for Saturating\<usize>



### impl SubAssign\<&usize> for Wrapping\<usize>



### impl SubAssign\<&Saturating\<i8>> for Saturating\<i8>



### impl SubAssign\<&Saturating\<i16>> for Saturating\<i16>



### impl SubAssign\<&Saturating\<i32>> for Saturating\<i32>



### impl SubAssign\<&Saturating\<i64>> for Saturating\<i64>



### impl SubAssign\<&Saturating\<i128>> for Saturating\<i128>



### impl SubAssign\<&Saturating\<isize>> for Saturating\<isize>



### impl SubAssign\<&Saturating\<u8>> for Saturating\<u8>



### impl SubAssign\<&Saturating\<u16>> for Saturating\<u16>



### impl SubAssign\<&Saturating\<u32>> for Saturating\<u32>



### impl SubAssign\<&Saturating\<u64>> for Saturating\<u64>



### impl SubAssign\<&Saturating\<u128>> for Saturating\<u128>



### impl SubAssign\<&Saturating\<usize>> for Saturating\<usize>



### impl SubAssign\<&Wrapping\<i8>> for Wrapping\<i8>



### impl SubAssign\<&Wrapping\<i16>> for Wrapping\<i16>



### impl SubAssign\<&Wrapping\<i32>> for Wrapping\<i32>



### impl SubAssign\<&Wrapping\<i64>> for Wrapping\<i64>



### impl SubAssign\<&Wrapping\<i128>> for Wrapping\<i128>



### impl SubAssign\<&Wrapping\<isize>> for Wrapping\<isize>



### impl SubAssign\<&Wrapping\<u8>> for Wrapping\<u8>



### impl SubAssign\<&Wrapping\<u16>> for Wrapping\<u16>



### impl SubAssign\<&Wrapping\<u32>> for Wrapping\<u32>



### impl SubAssign\<&Wrapping\<u64>> for Wrapping\<u64>



### impl SubAssign\<&Wrapping\<u128>> for Wrapping\<u128>



### impl SubAssign\<&Wrapping\<usize>> for Wrapping\<usize>



### impl SubAssign\<f32> for f32



### impl SubAssign\<f64> for f64



### impl SubAssign\<i8> for i8



### impl SubAssign\<i8> for Saturating\<i8>



### impl SubAssign\<i8> for Wrapping\<i8>



### impl SubAssign\<i16> for i16



### impl SubAssign\<i16> for Saturating\<i16>



### impl SubAssign\<i16> for Wrapping\<i16>



### impl SubAssign\<i32> for i32



### impl SubAssign\<i32> for Saturating\<i32>



### impl SubAssign\<i32> for Wrapping\<i32>



### impl SubAssign\<i64> for i64



### impl SubAssign\<i64> for Saturating\<i64>



### impl SubAssign\<i64> for Wrapping\<i64>



### impl SubAssign\<i128> for i128



### impl SubAssign\<i128> for Saturating\<i128>



### impl SubAssign\<i128> for Wrapping\<i128>



### impl SubAssign\<isize> for isize



### impl SubAssign\<isize> for Saturating\<isize>



### impl SubAssign\<isize> for Wrapping\<isize>



### impl SubAssign\<u8> for u8



### impl SubAssign\<u8> for Saturating\<u8>



### impl SubAssign\<u8> for Wrapping\<u8>



### impl SubAssign\<u16> for u16



### impl SubAssign\<u16> for Saturating\<u16>



### impl SubAssign\<u16> for Wrapping\<u16>



### impl SubAssign\<u32> for u32



### impl SubAssign\<u32> for Saturating\<u32>



### impl SubAssign\<u32> for Wrapping\<u32>



### impl SubAssign\<u64> for u64



### impl SubAssign\<u64> for Saturating\<u64>



### impl SubAssign\<u64> for Wrapping\<u64>



### impl SubAssign\<u128> for u128



### impl SubAssign\<u128> for Saturating\<u128>



### impl SubAssign\<u128> for Wrapping\<u128>



### impl SubAssign\<usize> for usize



### impl SubAssign\<usize> for Saturating\<usize>



### impl SubAssign\<usize> for Wrapping\<usize>



### impl SubAssign\<Saturating\<i8>> for Saturating\<i8>



### impl SubAssign\<Saturating\<i16>> for Saturating\<i16>



### impl SubAssign\<Saturating\<i32>> for Saturating\<i32>



### impl SubAssign\<Saturating\<i64>> for Saturating\<i64>



### impl SubAssign\<Saturating\<i128>> for Saturating\<i128>



### impl SubAssign\<Saturating\<isize>> for Saturating\<isize>



### impl SubAssign\<Saturating\<u8>> for Saturating\<u8>



### impl SubAssign\<Saturating\<u16>> for Saturating\<u16>



### impl SubAssign\<Saturating\<u32>> for Saturating\<u32>



### impl SubAssign\<Saturating\<u64>> for Saturating\<u64>



### impl SubAssign\<Saturating\<u128>> for Saturating\<u128>



### impl SubAssign\<Saturating\<usize>> for Saturating\<usize>



### impl SubAssign\<Wrapping\<i8>> for Wrapping\<i8>



### impl SubAssign\<Wrapping\<i16>> for Wrapping\<i16>



### impl SubAssign\<Wrapping\<i32>> for Wrapping\<i32>



### impl SubAssign\<Wrapping\<i64>> for Wrapping\<i64>



### impl SubAssign\<Wrapping\<i128>> for Wrapping\<i128>



### impl SubAssign\<Wrapping\<isize>> for Wrapping\<isize>



### impl SubAssign\<Wrapping\<u8>> for Wrapping\<u8>



### impl SubAssign\<Wrapping\<u16>> for Wrapping\<u16>



### impl SubAssign\<Wrapping\<u32>> for Wrapping\<u32>



### impl SubAssign\<Wrapping\<u64>> for Wrapping\<u64>



### impl SubAssign\<Wrapping\<u128>> for Wrapping\<u128>



### impl SubAssign\<Wrapping\<usize>> for Wrapping\<usize>



### impl SubAssign\<Duration> for Duration



### impl SubAssign\<Duration> for Instant



### impl SubAssign\<Duration> for SystemTime



### impl<T, U, const LANES: usize> SubAssign\<U> for Simd<T, LANES>

```rust
impl<T, U, const LANES: usize> SubAssign<U> for Simd<T, LANES>
where
  Simd<T, LANES>: Sub<U, Output = Simd<T, LANES>>,
  T: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```

