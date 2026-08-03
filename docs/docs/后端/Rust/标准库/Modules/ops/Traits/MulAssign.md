# Trait std::ops::MulAssign

乘法赋值运算符 `*=`。

```rust
pub trait MulAssign<Rhs = Self> {
    // Required method
    fn mul_assign(&mut self, rhs: Rhs);
}
```

示例

```rust
use std::ops::MulAssign;

#[derive(Debug, PartialEq)]
struct Frequency { hertz: f64 }

impl MulAssign<f64> for Frequency {
    fn mul_assign(&mut self, rhs: f64) {
        self.hertz *= rhs;
    }
}

let mut frequency = Frequency { hertz: 50.0 };
frequency *= 4.0;
assert_eq!(Frequency { hertz: 200.0 }, frequency);
```



## Required Methods

### mul_assign

```rust
fn mul_assign(&mut self, rhs: Rhs)
```

**参数**：

- **rhs**：执行 ` *=` 操作的右值

```rust
let mut x: u32 = 12;
x *= 2;
assert_eq!(x, 24);
```



## Implementors

### impl MulAssign\<&f32> for f32



### impl MulAssign\<&f64> for f64



### impl MulAssign\<&i8> for i8



### impl MulAssign\<&i8> for Saturating\<i8>



### impl MulAssign\<&i8> for Wrapping\<i8>



### impl MulAssign\<&i16> for i16



### impl MulAssign\<&i16> for Saturating\<i16>



### impl MulAssign\<&i16> for Wrapping\<i16>



### impl MulAssign\<&i32> for i32



### impl MulAssign\<&i32> for Saturating\<i32>



### impl MulAssign\<&i32> for Wrapping\<i32>



### impl MulAssign\<&i64> for i64



### impl MulAssign\<&i64> for Saturating\<i64>



### impl MulAssign\<&i64> for Wrapping\<i64>



### impl MulAssign\<&i128> for i128



### impl MulAssign\<&i128> for Saturating\<i128>



### impl MulAssign\<&i128> for Wrapping\<i128>



### impl MulAssign\<&isize> for isize



### impl MulAssign\<&isize> for Saturating\<isize>



### impl MulAssign\<&isize> for Wrapping\<isize>



### impl MulAssign\<&u8> for u8



### impl MulAssign\<&u8> for Saturating\<u8>



### impl MulAssign\<&u8> for Wrapping\<u8>



### impl MulAssign\<&u16> for u16



### impl MulAssign\<&u16> for Saturating\<u16>



### impl MulAssign\<&u16> for Wrapping\<u16>



### impl MulAssign\<&u32> for u32



### impl MulAssign\<&u32> for Saturating\<u32>



### impl MulAssign\<&u32> for Wrapping\<u32>



### impl MulAssign\<&u64> for u64



### impl MulAssign\<&u64> for Saturating\<u64>



### impl MulAssign\<&u64> for Wrapping\<u64>



### impl MulAssign\<&u128> for u128



### impl MulAssign\<&u128> for Saturating\<u128>



### impl MulAssign\<&u128> for Wrapping\<u128>



### impl MulAssign\<&usize> for usize



### impl MulAssign\<&usize> for Saturating\<usize>



### impl MulAssign\<&usize> for Wrapping\<usize>



### impl MulAssign\<&Saturating\<i8>> for Saturating\<i8>



### impl MulAssign\<&Saturating\<i16>> for Saturating\<i16>



### impl MulAssign\<&Saturating\<i32>> for Saturating\<i32>



### impl MulAssign\<&Saturating\<i64>> for Saturating\<i64>



### impl MulAssign\<&Saturating\<i128>> for Saturating\<i128>



### impl MulAssign\<&Saturating\<isize>> for Saturating\<isize>



### impl MulAssign\<&Saturating\<u8>> for Saturating\<u8>



### impl MulAssign\<&Saturating\<u16>> for Saturating\<u16>



### impl MulAssign\<&Saturating\<u32>> for Saturating\<u32>



### impl MulAssign\<&Saturating\<u64>> for Saturating\<u64>



### impl MulAssign\<&Saturating\<u128>> for Saturating\<u128>



### impl MulAssign\<&Saturating\<usize>> for Saturating\<usize>



### impl MulAssign\<&Wrapping\<i8>> for Wrapping\<i8>



### impl MulAssign\<&Wrapping\<i16>> for Wrapping\<i16>



### impl MulAssign\<&Wrapping\<i32>> for Wrapping\<i32>



### impl MulAssign\<&Wrapping\<i64>> for Wrapping\<i64>



### impl MulAssign\<&Wrapping\<i128>> for Wrapping\<i128>



### impl MulAssign\<&Wrapping\<isize>> for Wrapping\<isize>



### impl MulAssign\<&Wrapping\<u8>> for Wrapping\<u8>



### impl MulAssign\<&Wrapping\<u16>> for Wrapping\<u16>



### impl MulAssign\<&Wrapping\<u32>> for Wrapping\<u32>



### impl MulAssign\<&Wrapping\<u64>> for Wrapping\<u64>



### impl MulAssign\<&Wrapping\<u128>> for Wrapping\<u128>



### impl MulAssign\<&Wrapping\<usize>> for Wrapping\<usize>



### impl MulAssign\<f32> for f32



### impl MulAssign\<f64> for f64



### impl MulAssign\<i8> for i8



### impl MulAssign\<i8> for Saturating\<i8>



### impl MulAssign\<i8> for Wrapping\<i8>



### impl MulAssign\<i16> for i16



### impl MulAssign\<i16> for Saturating\<i16>



### impl MulAssign\<i16> for Wrapping\<i16>



### impl MulAssign\<i32> for i32



### impl MulAssign\<i32> for Saturating\<i32>



### impl MulAssign\<i32> for Wrapping\<i32>



### impl MulAssign\<i64> for i64



### impl MulAssign\<i64> for Saturating\<i64>



### impl MulAssign\<i64> for Wrapping\<i64>



### impl MulAssign\<i128> for i128



### impl MulAssign\<i128> for Saturating\<i128>



### impl MulAssign\<i128> for Wrapping\<i128>



### impl MulAssign\<isize> for isize



### impl MulAssign\<isize> for Saturating\<isize>



### impl MulAssign\<isize> for Wrapping\<isize>



### impl MulAssign\<u8> for u8



### impl MulAssign\<u8> for Saturating\<u8>



### impl MulAssign\<u8> for Wrapping\<u8>



### impl MulAssign\<u16> for u16



### impl MulAssign\<u16> for Saturating\<u16>



### impl MulAssign\<u16> for Wrapping\<u16>



### impl MulAssign\<u32> for u32



### impl MulAssign\<u32> for Saturating\<u32>



### impl MulAssign\<u32> for Wrapping\<u32>



### impl MulAssign\<u32> for Duration



### impl MulAssign\<u64> for u64



### impl MulAssign\<u64> for Saturating\<u64>



### impl MulAssign\<u64> for Wrapping\<u64>



### impl MulAssign\<u128> for u128



### impl MulAssign\<u128> for Saturating\<u128>



### impl MulAssign\<u128> for Wrapping\<u128>



### impl MulAssign\<usize> for usize



### impl MulAssign\<usize> for Saturating\<usize>



### impl MulAssign\<usize> for Wrapping\<usize>



### impl MulAssign\<Saturating\<i8>> for Saturating\<i8>



### impl MulAssign\<Saturating\<i16>> for Saturating\<i16>



### impl MulAssign\<Saturating\<i32>> for Saturating\<i32>



### impl MulAssign\<Saturating\<i64>> for Saturating\<i64>



### impl MulAssign\<Saturating\<i128>> for Saturating\<i128>



### impl MulAssign\<Saturating\<isize>> for Saturating\<isize>



### impl MulAssign\<Saturating\<u8>> for Saturating\<u8>



### impl MulAssign\<Saturating\<u16>> for Saturating\<u16>



### impl MulAssign\<Saturating\<u32>> for Saturating\<u32>



### impl MulAssign\<Saturating\<u64>> for Saturating\<u64>



### impl MulAssign\<Saturating\<u128>> for Saturating\<u128>



### impl MulAssign\<Saturating\<usize>> for Saturating\<usize>



### impl MulAssign\<Wrapping\<i8>> for Wrapping\<i8>



### impl MulAssign\<Wrapping\<i16>> for Wrapping\<i16>



### impl MulAssign\<Wrapping\<i32>> for Wrapping\<i32>



### impl MulAssign\<Wrapping\<i64>> for Wrapping\<i64>



### impl MulAssign\<Wrapping\<i128>> for Wrapping\<i128>



### impl MulAssign\<Wrapping\<isize>> for Wrapping\<isize>



### impl MulAssign\<Wrapping\<u8>> for Wrapping\<u8>



### impl MulAssign\<Wrapping\<u16>> for Wrapping\<u16>



### impl MulAssign\<Wrapping\<u32>> for Wrapping\<u32>



### impl MulAssign\<Wrapping\<u64>> for Wrapping\<u64>



### impl MulAssign\<Wrapping\<u128>> for Wrapping\<u128>



### impl MulAssign\<Wrapping\<usize>> for Wrapping\<usize>



### impl<T, U, const LANES: usize> MulAssign\<U> for Simd<T, LANES>

```rust
impl<T, U, const LANES: usize> MulAssign<U> for Simd<T, LANES>
where
  Simd<T, LANES>: Mul<U, Output = Simd<T, LANES>>,
  T: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```

