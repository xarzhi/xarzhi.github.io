# Trait std::ops::ShlAssign

左移赋值运算符 `<<=`。

```rust
pub trait ShlAssign<Rhs = Self> {
    // Required method
    fn shl_assign(&mut self, rhs: Rhs);
}
```

`ShlAssign` 的实现，用于围绕 `usize` 的包装。

```rust
use std::ops::ShlAssign;

#[derive(Debug, PartialEq)]
struct Scalar(usize);

impl ShlAssign<usize> for Scalar {
    fn shl_assign(&mut self, rhs: usize) {
        self.0 <<= rhs;
    }
}

let mut scalar = Scalar(4);
scalar <<= 2;
assert_eq!(scalar, Scalar(16));
```



## Required Methods

### shl_assign

执行 `<<=` 操作。

```rust
fn shl_assign(&mut self, rhs: Rhs)
```

**参数**：

- **rhs**：执行 ` <<=` 操作的右值

```rust
let mut x: u8 = 5;
x <<= 1;
assert_eq!(x, 10);

let mut x: u8 = 1;
x <<= 1;
assert_eq!(x, 2);
```

### 

## Implementors

### impl ShlAssign\<&i8> for i8



### impl ShlAssign\<&i8> for i16



### impl ShlAssign\<&i8> for i32



### impl ShlAssign\<&i8> for i64



### impl ShlAssign\<&i8> for i128



### impl ShlAssign\<&i8> for isize



### impl ShlAssign\<&i8> for u8



### impl ShlAssign\<&i8> for u16



### impl ShlAssign\<&i8> for u32



### impl ShlAssign\<&i8> for u64



### impl ShlAssign\<&i8> for u128



### impl ShlAssign\<&i8> for usize



### impl ShlAssign\<&i16> for i8



### impl ShlAssign\<&i16> for i16



### impl ShlAssign\<&i16> for i32



### impl ShlAssign\<&i16> for i64



### impl ShlAssign\<&i16> for i128



### impl ShlAssign\<&i16> for isize



### impl ShlAssign\<&i16> for u8



### impl ShlAssign\<&i16> for u16



### impl ShlAssign\<&i16> for u32



### impl ShlAssign\<&i16> for u64



### impl ShlAssign\<&i16> for u128



### impl ShlAssign\<&i16> for usize



### impl ShlAssign\<&i32> for i8



### impl ShlAssign\<&i32> for i16



### impl ShlAssign\<&i32> for i32



### impl ShlAssign\<&i32> for i64



### impl ShlAssign\<&i32> for i128



### impl ShlAssign\<&i32> for isize



### impl ShlAssign\<&i32> for u8



### impl ShlAssign\<&i32> for u16



### impl ShlAssign\<&i32> for u32



### impl ShlAssign\<&i32> for u64



### impl ShlAssign\<&i32> for u128



### impl ShlAssign\<&i32> for usize



### impl ShlAssign\<&i64> for i8



### impl ShlAssign\<&i64> for i16



### impl ShlAssign\<&i64> for i32



### impl ShlAssign\<&i64> for i64



### impl ShlAssign\<&i64> for i128



### impl ShlAssign\<&i64> for isize



### impl ShlAssign\<&i64> for u8



### impl ShlAssign\<&i64> for u16



### impl ShlAssign\<&i64> for u32



### impl ShlAssign\<&i64> for u64



### impl ShlAssign\<&i64> for u128



### impl ShlAssign\<&i64> for usize



### impl ShlAssign\<&i128> for i8



### impl ShlAssign\<&i128> for i16



### impl ShlAssign\<&i128> for i32



### impl ShlAssign\<&i128> for i64



### impl ShlAssign\<&i128> for i128



### impl ShlAssign\<&i128> for isize



### impl ShlAssign\<&i128> for u8



### impl ShlAssign\<&i128> for u16



### impl ShlAssign\<&i128> for u32



### impl ShlAssign\<&i128> for u64



### impl ShlAssign\<&i128> for u128



### impl ShlAssign\<&i128> for usize



### impl ShlAssign\<&isize> for i8



### impl ShlAssign\<&isize> for i16



### impl ShlAssign\<&isize> for i32



### impl ShlAssign\<&isize> for i64



### impl ShlAssign\<&isize> for i128



### impl ShlAssign\<&isize> for isize



### impl ShlAssign\<&isize> for u8



### impl ShlAssign\<&isize> for u16



### impl ShlAssign\<&isize> for u32



### impl ShlAssign\<&isize> for u64



### impl ShlAssign\<&isize> for u128



### impl ShlAssign\<&isize> for usize



### impl ShlAssign\<&u8> for i8



### impl ShlAssign\<&u8> for i16



### impl ShlAssign\<&u8> for i32



### impl ShlAssign\<&u8> for i64



### impl ShlAssign\<&u8> for i128



### impl ShlAssign\<&u8> for isize



### impl ShlAssign\<&u8> for u8



### impl ShlAssign\<&u8> for u16



### impl ShlAssign\<&u8> for u32



### impl ShlAssign\<&u8> for u64



### impl ShlAssign\<&u8> for u128



### impl ShlAssign\<&u8> for usize



### impl ShlAssign\<&u16> for i8



### impl ShlAssign\<&u16> for i16



### impl ShlAssign\<&u16> for i32



### impl ShlAssign\<&u16> for i64



### impl ShlAssign\<&u16> for i128



### impl ShlAssign\<&u16> for isize



### impl ShlAssign\<&u16> for u8



### impl ShlAssign\<&u16> for u16



### impl ShlAssign\<&u16> for u32



### impl ShlAssign\<&u16> for u64



### impl ShlAssign\<&u16> for u128



### impl ShlAssign\<&u16> for usize



### impl ShlAssign\<&u32> for i8



### impl ShlAssign\<&u32> for i16



### impl ShlAssign\<&u32> for i32



### impl ShlAssign\<&u32> for i64



### impl ShlAssign\<&u32> for i128



### impl ShlAssign\<&u32> for isize



### impl ShlAssign\<&u32> for u8



### impl ShlAssign\<&u32> for u16



### impl ShlAssign\<&u32> for u32



### impl ShlAssign\<&u32> for u64



### impl ShlAssign\<&u32> for u128



### impl ShlAssign\<&u32> for usize



### impl ShlAssign\<&u64> for i8



### impl ShlAssign\<&u64> for i16



### impl ShlAssign\<&u64> for i32



### impl ShlAssign\<&u64> for i64



### impl ShlAssign\<&u64> for i128



### impl ShlAssign\<&u64> for isize



### impl ShlAssign\<&u64> for u8



### impl ShlAssign\<&u64> for u16



### impl ShlAssign\<&u64> for u32



### impl ShlAssign\<&u64> for u64



### impl ShlAssign\<&u64> for u128



### impl ShlAssign\<&u64> for usize



### impl ShlAssign\<&u128> for i8



### impl ShlAssign\<&u128> for i16



### impl ShlAssign\<&u128> for i32



### impl ShlAssign\<&u128> for i64



### impl ShlAssign\<&u128> for i128



### impl ShlAssign\<&u128> for isize



### impl ShlAssign\<&u128> for u8



### impl ShlAssign\<&u128> for u16



### impl ShlAssign\<&u128> for u32



### impl ShlAssign\<&u128> for u64



### impl ShlAssign\<&u128> for u128



### impl ShlAssign\<&u128> for usize



### impl ShlAssign\<&usize> for i8



### impl ShlAssign\<&usize> for i16



### impl ShlAssign\<&usize> for i32



### impl ShlAssign\<&usize> for i64



### impl ShlAssign\<&usize> for i128



### impl ShlAssign\<&usize> for isize



### impl ShlAssign\<&usize> for u8



### impl ShlAssign\<&usize> for u16



### impl ShlAssign\<&usize> for u32



### impl ShlAssign\<&usize> for u64



### impl ShlAssign\<&usize> for u128



### impl ShlAssign\<&usize> for usize



### impl ShlAssign\<&usize> for Saturating\<i8>



### impl ShlAssign\<&usize> for Saturating\<i16>



### impl ShlAssign\<&usize> for Saturating\<i32>



### impl ShlAssign\<&usize> for Saturating\<i64>



### impl ShlAssign\<&usize> for Saturating\<i128>



### impl ShlAssign\<&usize> for Saturating\<isize>



### impl ShlAssign\<&usize> for Saturating\<u8>



### impl ShlAssign\<&usize> for Saturating\<u16>



### impl ShlAssign\<&usize> for Saturating\<u32>



### impl ShlAssign\<&usize> for Saturating\<u64>



### impl ShlAssign\<&usize> for Saturating\<u128>



### impl ShlAssign\<&usize> for Saturating\<usize>



### impl ShlAssign\<&usize> for Wrapping\<i8>



### impl ShlAssign\<&usize> for Wrapping\<i16>



### impl ShlAssign\<&usize> for Wrapping\<i32>



### impl ShlAssign\<&usize> for Wrapping\<i64>



### impl ShlAssign\<&usize> for Wrapping\<i128>



### impl ShlAssign\<&usize> for Wrapping\<isize>



### impl ShlAssign\<&usize> for Wrapping\<u8>



### impl ShlAssign\<&usize> for Wrapping\<u16>



### impl ShlAssign\<&usize> for Wrapping\<u32>



### impl ShlAssign\<&usize> for Wrapping\<u64>



### impl ShlAssign\<&usize> for Wrapping\<u128>



### impl ShlAssign\<&usize> for Wrapping\<usize>



### impl ShlAssign\<i8> for i8



### impl ShlAssign\<i8> for i16



### impl ShlAssign\<i8> for i32



### impl ShlAssign\<i8> for i64



### impl ShlAssign\<i8> for i128



### impl ShlAssign\<i8> for isize



### impl ShlAssign\<i8> for u8



### impl ShlAssign\<i8> for u16



### impl ShlAssign\<i8> for u32



### impl ShlAssign\<i8> for u64



### impl ShlAssign\<i8> for u128



### impl ShlAssign\<i8> for usize



### impl ShlAssign\<i16> for i8



### impl ShlAssign\<i16> for i16



### impl ShlAssign\<i16> for i32



### impl ShlAssign\<i16> for i64



### impl ShlAssign\<i16> for i128



### impl ShlAssign\<i16> for isize



### impl ShlAssign\<i16> for u8



### impl ShlAssign\<i16> for u16



### impl ShlAssign\<i16> for u32



### impl ShlAssign\<i16> for u64



### impl ShlAssign\<i16> for u128



### impl ShlAssign\<i16> for usize



### impl ShlAssign\<i32> for i8



### impl ShlAssign\<i32> for i16



### impl ShlAssign\<i32> for i32



### impl ShlAssign\<i32> for i64



### impl ShlAssign\<i32> for i128



### impl ShlAssign\<i32> for isize



### impl ShlAssign\<i32> for u8



### impl ShlAssign\<i32> for u16



### impl ShlAssign\<i32> for u32



### impl ShlAssign\<i32> for u64



### impl ShlAssign\<i32> for u128



### impl ShlAssign\<i32> for usize



### impl ShlAssign\<i64> for i8



### impl ShlAssign\<i64> for i16



### impl ShlAssign\<i64> for i32



### impl ShlAssign\<i64> for i64



### impl ShlAssign\<i64> for i128



### impl ShlAssign\<i64> for isize



### impl ShlAssign\<i64> for u8



### impl ShlAssign\<i64> for u16



### impl ShlAssign\<i64> for u32



### impl ShlAssign\<i64> for u64



### impl ShlAssign\<i64> for u128



### impl ShlAssign\<i64> for usize



### impl ShlAssign\<i128> for i8



### impl ShlAssign\<i128> for i16



### impl ShlAssign\<i128> for i32



### impl ShlAssign\<i128> for i64



### impl ShlAssign\<i128> for i128



### impl ShlAssign\<i128> for isize



### impl ShlAssign\<i128> for u8



### impl ShlAssign\<i128> for u16



### impl ShlAssign\<i128> for u32



### impl ShlAssign\<i128> for u64



### impl ShlAssign\<i128> for u128



### impl ShlAssign\<i128> for usize



### impl ShlAssign\<isize> for i8



### impl ShlAssign\<isize> for i16



### impl ShlAssign\<isize> for i32



### impl ShlAssign\<isize> for i64



### impl ShlAssign\<isize> for i128



### impl ShlAssign\<isize> for isize



### impl ShlAssign\<isize> for u8



### impl ShlAssign\<isize> for u16



### impl ShlAssign\<isize> for u32



### impl ShlAssign\<isize> for u64



### impl ShlAssign\<isize> for u128



### impl ShlAssign\<isize> for usize



### impl ShlAssign\<u8> for i8



### impl ShlAssign\<u8> for i16



### impl ShlAssign\<u8> for i32



### impl ShlAssign\<u8> for i64



### impl ShlAssign\<u8> for i128



### impl ShlAssign\<u8> for isize



### impl ShlAssign\<u8> for u8



### impl ShlAssign\<u8> for u16



### impl ShlAssign\<u8> for u32



### impl ShlAssign\<u8> for u64



### impl ShlAssign\<u8> for u128



### impl ShlAssign\<u8> for usize



### impl ShlAssign\<u16> for i8



### impl ShlAssign\<u16> for i16



### impl ShlAssign\<u16> for i32



### impl ShlAssign\<u16> for i64



### impl ShlAssign\<u16> for i128



### impl ShlAssign\<u16> for isize



### impl ShlAssign\<u16> for u8



### impl ShlAssign\<u16> for u16



### impl ShlAssign\<u16> for u32



### impl ShlAssign\<u16> for u64



### impl ShlAssign\<u16> for u128



### impl ShlAssign\<u16> for usize



### impl ShlAssign\<u32> for i8



### impl ShlAssign\<u32> for i16



### impl ShlAssign\<u32> for i32



### impl ShlAssign\<u32> for i64



### impl ShlAssign\<u32> for i128



### impl ShlAssign\<u32> for isize



### impl ShlAssign\<u32> for u8



### impl ShlAssign\<u32> for u16



### impl ShlAssign\<u32> for u32



### impl ShlAssign\<u32> for u64



### impl ShlAssign\<u32> for u128



### impl ShlAssign\<u32> for usize



### impl ShlAssign\<u64> for i8



### impl ShlAssign\<u64> for i16



### impl ShlAssign\<u64> for i32



### impl ShlAssign\<u64> for i64



### impl ShlAssign\<u64> for i128



### impl ShlAssign\<u64> for isize



### impl ShlAssign\<u64> for u8



### impl ShlAssign\<u64> for u16



### impl ShlAssign\<u64> for u32



### impl ShlAssign\<u64> for u64



### impl ShlAssign\<u64> for u128



### impl ShlAssign\<u64> for usize



### impl ShlAssign\<u128> for i8



### impl ShlAssign\<u128> for i16



### impl ShlAssign\<u128> for i32



### impl ShlAssign\<u128> for i64



### impl ShlAssign\<u128> for i128



### impl ShlAssign\<u128> for isize



### impl ShlAssign\<u128> for u8



### impl ShlAssign\<u128> for u16



### impl ShlAssign\<u128> for u32



### impl ShlAssign\<u128> for u64



### impl ShlAssign\<u128> for u128



### impl ShlAssign\<u128> for usize



### impl ShlAssign\<usize> for i8



### impl ShlAssign\<usize> for i16



### impl ShlAssign\<usize> for i32



### impl ShlAssign\<usize> for i64



### impl ShlAssign\<usize> for i128



### impl ShlAssign\<usize> for isize



### impl ShlAssign\<usize> for u8



### impl ShlAssign\<usize> for u16



### impl ShlAssign\<usize> for u32



### impl ShlAssign\<usize> for u64



### impl ShlAssign\<usize> for u128



### impl ShlAssign\<usize> for usize



### impl ShlAssign\<usize> for Saturating\<i8>



### impl ShlAssign\<usize> for Saturating\<i16>



### impl ShlAssign\<usize> for Saturating\<i32>



### impl ShlAssign\<usize> for Saturating\<i64>



### impl ShlAssign\<usize> for Saturating\<i128>



### impl ShlAssign\<usize> for Saturating\<isize>



### impl ShlAssign\<usize> for Saturating\<u8>



### impl ShlAssign\<usize> for Saturating\<u16>



### impl ShlAssign\<usize> for Saturating\<u32>



### impl ShlAssign\<usize> for Saturating\<u64>



### impl ShlAssign\<usize> for Saturating\<u128>



### impl ShlAssign\<usize> for Saturating\<usize>



### impl ShlAssign\<usize> for Wrapping\<i8>



### impl ShlAssign\<usize> for Wrapping\<i16>



### impl ShlAssign\<usize> for Wrapping\<i32>



### impl ShlAssign\<usize> for Wrapping\<i64>



### impl ShlAssign\<usize> for Wrapping\<i128>



### impl ShlAssign\<usize> for Wrapping\<isize>



### impl ShlAssign\<usize> for Wrapping\<u8>



### impl ShlAssign\<usize> for Wrapping\<u16>



### impl ShlAssign\<usize> for Wrapping\<u32>



### impl ShlAssign\<usize> for Wrapping\<u64>



### impl ShlAssign\<usize> for Wrapping\<u128>



### impl ShlAssign\<usize> for Wrapping\<usize>



### impl<T, U, const LANES: usize> ShlAssign\<U> for Simd<T, LANES>

```rust
impl<T, U, const LANES: usize> ShlAssign<U> for Simd<T, LANES>
where
  Simd<T, LANES>: Shl<U, Output = Simd<T, LANES>>,
  T: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```

