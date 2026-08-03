# Trait std::ops::DivAssign

除法赋值运算符 `/=`。

```rust
pub trait DivAssign<Rhs = Self> {
    // Required method
    fn div_assign(&mut self, rhs: Rhs);
}
```

示例

```rust
use std::ops::DivAssign;

#[derive(Debug, PartialEq)]
struct Frequency { hertz: f64 }

impl DivAssign<f64> for Frequency {
    fn div_assign(&mut self, rhs: f64) {
        self.hertz /= rhs;
    }
}

let mut frequency = Frequency { hertz: 200.0 };
frequency /= 4.0;
assert_eq!(Frequency { hertz: 50.0 }, frequency);
```



## Required Methods

### div_assign

```rust
fn div_assign(&mut self, rhs: Rhs)
```

**参数**：

- **rhs**：执行 ` /=` 操作的右值

```rust
let mut x: u32 = 12;
x /= 2;
assert_eq!(x, 6);
```



## Implementors

### impl DivAssign\<&f32> for f32



### impl DivAssign\<&f64> for f64



### impl DivAssign\<&i8> for i8



### impl DivAssign\<&i8> for Saturating\<i8>



### impl DivAssign\<&i8> for Wrapping\<i8>



### impl DivAssign\<&i16> for i16



### impl DivAssign\<&i16> for Saturating\<i16>



### impl DivAssign\<&i16> for Wrapping\<i16>



### impl DivAssign\<&i32> for i32



### impl DivAssign\<&i32> for Saturating\<i32>



### impl DivAssign\<&i32> for Wrapping\<i32>



### impl DivAssign\<&i64> for i64



### impl DivAssign\<&i64> for Saturating\<i64>



### impl DivAssign\<&i64> for Wrapping\<i64>



### impl DivAssign\<&i128> for i128



### impl DivAssign\<&i128> for Saturating\<i128>



### impl DivAssign\<&i128> for Wrapping\<i128>



### impl DivAssign\<&isize> for isize



### impl DivAssign\<&isize> for Saturating\<isize>



### impl DivAssign\<&isize> for Wrapping\<isize>



### impl DivAssign\<&u8> for u8



### impl DivAssign\<&u8> for Saturating\<u8>



### impl DivAssign\<&u8> for Wrapping\<u8>



### impl DivAssign\<&u16> for u16



### impl DivAssign\<&u16> for Saturating\<u16>



### impl DivAssign\<&u16> for Wrapping\<u16>



### impl DivAssign\<&u32> for u32



### impl DivAssign\<&u32> for Saturating\<u32>



### impl DivAssign\<&u32> for Wrapping\<u32>



### impl DivAssign\<&u64> for u64



### impl DivAssign\<&u64> for Saturating\<u64>



### impl DivAssign\<&u64> for Wrapping\<u64>



### impl DivAssign\<&u128> for u128



### impl DivAssign\<&u128> for Saturating\<u128>



### impl DivAssign\<&u128> for Wrapping\<u128>



### impl DivAssign\<&usize> for usize



### impl DivAssign\<&usize> for Saturating\<usize>



### impl DivAssign\<&usize> for Wrapping\<usize>



### impl DivAssign\<&Saturating\<i8>> for Saturating\<i8>



### impl DivAssign\<&Saturating\<i16>> for Saturating\<i16>



### impl DivAssign\<&Saturating\<i32>> for Saturating\<i32>



### impl DivAssign\<&Saturating\<i64>> for Saturating\<i64>



### impl DivAssign\<&Saturating\<i128>> for Saturating\<i128>



### impl DivAssign\<&Saturating\<isize>> for Saturating\<isize>



### impl DivAssign\<&Saturating\<u8>> for Saturating\<u8>



### impl DivAssign\<&Saturating\<u16>> for Saturating\<u16>



### impl DivAssign\<&Saturating\<u32>> for Saturating\<u32>



### impl DivAssign\<&Saturating\<u64>> for Saturating\<u64>



### impl DivAssign\<&Saturating\<u128>> for Saturating\<u128>



### impl DivAssign\<&Saturating\<usize>> for Saturating\<usize>



### impl DivAssign\<&Wrapping\<i8>> for Wrapping\<i8>



### impl DivAssign\<&Wrapping\<i16>> for Wrapping\<i16>



### impl DivAssign\<&Wrapping\<i32>> for Wrapping\<i32>



### impl DivAssign\<&Wrapping\<i64>> for Wrapping\<i64>



### impl DivAssign\<&Wrapping\<i128>> for Wrapping\<i128>



### impl DivAssign\<&Wrapping\<isize>> for Wrapping\<isize>



### impl DivAssign\<&Wrapping\<u8>> for Wrapping\<u8>



### impl DivAssign\<&Wrapping\<u16>> for Wrapping\<u16>



### impl DivAssign\<&Wrapping\<u32>> for Wrapping\<u32>



### impl DivAssign\<&Wrapping\<u64>> for Wrapping\<u64>



### impl DivAssign\<&Wrapping\<u128>> for Wrapping\<u128>



### impl DivAssign\<&Wrapping\<usize>> for Wrapping\<usize>



### impl DivAssign\<f32> for f32



### impl DivAssign\<f64> for f64



### impl DivAssign\<i8> for i8



### impl DivAssign\<i8> for Saturating\<i8>



### impl DivAssign\<i8> for Wrapping\<i8>



### impl DivAssign\<i16> for i16



### impl DivAssign\<i16> for Saturating\<i16>



### impl DivAssign\<i16> for Wrapping\<i16>



### impl DivAssign\<i32> for i32



### impl DivAssign\<i32> for Saturating\<i32>



### impl DivAssign\<i32> for Wrapping\<i32>



### impl DivAssign\<i64> for i64



### impl DivAssign\<i64> for Saturating\<i64>



### impl DivAssign\<i64> for Wrapping\<i64>



### impl DivAssign\<i128> for i128



### impl DivAssign\<i128> for Saturating\<i128>



### impl DivAssign\<i128> for Wrapping\<i128>



### impl DivAssign\<isize> for isize



### impl DivAssign\<isize> for Saturating\<isize>



### impl DivAssign\<isize> for Wrapping\<isize>



### impl DivAssign\<u8> for u8



### impl DivAssign\<u8> for Saturating\<u8>



### impl DivAssign\<u8> for Wrapping\<u8>



### impl DivAssign\<u16> for u16



### impl DivAssign\<u16> for Saturating\<u16>



### impl DivAssign\<u16> for Wrapping\<u16>



### impl DivAssign\<u32> for u32



### impl DivAssign\<u32> for Saturating\<u32>



### impl DivAssign\<u32> for Wrapping\<u32>



### impl DivAssign\<u32> for Duration



### impl DivAssign\<u64> for u64



### impl DivAssign\<u64> for Saturating\<u64>



### impl DivAssign\<u64> for Wrapping\<u64>



### impl DivAssign\<u128> for u128



### impl DivAssign\<u128> for Saturating\<u128>



### impl DivAssign\<u128> for Wrapping\<u128>



### impl DivAssign\<usize> for usize



### impl DivAssign\<usize> for Saturating\<usize>



### impl DivAssign\<usize> for Wrapping\<usize>



### impl DivAssign\<Saturating\<i8>> for Saturating\<i8>



### impl DivAssign\<Saturating\<i16>> for Saturating\<i16>



### impl DivAssign\<Saturating\<i32>> for Saturating\<i32>



### impl DivAssign\<Saturating\<i64>> for Saturating\<i64>



### impl DivAssign\<Saturating\<i128>> for Saturating\<i128>



### impl DivAssign\<Saturating\<isize>> for Saturating\<isize>



### impl DivAssign\<Saturating\<u8>> for Saturating\<u8>



### impl DivAssign\<Saturating\<u16>> for Saturating\<u16>



### impl DivAssign\<Saturating\<u32>> for Saturating\<u32>



### impl DivAssign\<Saturating\<u64>> for Saturating\<u64>



### impl DivAssign\<Saturating\<u128>> for Saturating\<u128>



### impl DivAssign\<Saturating\<usize>> for Saturating\<usize>



### impl DivAssign\<Wrapping\<i8>> for Wrapping\<i8>



### impl DivAssign\<Wrapping\<i16>> for Wrapping\<i16>



### impl DivAssign\<Wrapping\<i32>> for Wrapping\<i32>



### impl DivAssign\<Wrapping\<i64>> for Wrapping\<i64>



### impl DivAssign\<Wrapping\<i128>> for Wrapping\<i128>



### impl DivAssign\<Wrapping\<isize>> for Wrapping\<isize>



### impl DivAssign\<Wrapping\<u8>> for Wrapping\<u8>



### impl DivAssign\<Wrapping\<u16>> for Wrapping\<u16>



### impl DivAssign\<Wrapping\<u32>> for Wrapping\<u32>



### impl DivAssign\<Wrapping\<u64>> for Wrapping\<u64>



### impl DivAssign\<Wrapping\<u128>> for Wrapping\<u128>



### impl DivAssign\<Wrapping\<usize>> for Wrapping\<usize>



### impl\<T, U, const LANES: usize> DivAssign\<U> for Simd\<T, LANES>

```rust
impl<T, U, const LANES: usize> DivAssign<U> for Simd<T, LANES>
where
  Simd<T, LANES>: Div<U, Output = Simd<T, LANES>>,
  T: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```

