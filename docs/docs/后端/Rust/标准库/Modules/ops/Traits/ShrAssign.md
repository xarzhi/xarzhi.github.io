# Trait std::ops::ShrAssign

右移赋值运算符 `>>=`。

```rust
pub trait ShrAssign<Rhs = Self> {
    // Required method
    fn shr_assign(&mut self, rhs: Rhs);
}
```

`ShrAssign` 的实现，用于围绕 `usize` 的包装。

```rust
use std::ops::ShrAssign;

#[derive(Debug, PartialEq)]
struct Scalar(usize);

impl ShrAssign<usize> for Scalar {
    fn shr_assign(&mut self, rhs: usize) {
        self.0 >>= rhs;
    }
}

let mut scalar = Scalar(16);
scalar >>= 2;
assert_eq!(scalar, Scalar(4));
```



## Required Methods

### shr_assign

```rust
fn shr_assign(&mut self, rhs: Rhs)
```

**参数**：

- **rhs**：执行 ` ^` 操作的右值

```rust
let mut x: u8 = 5;
x >>= 1;
assert_eq!(x, 2);

let mut x: u8 = 2;
x >>= 1;
assert_eq!(x, 1);
```

### 

## Implementors

### impl ShrAssign\<&i8> for i8



### impl ShrAssign\<&i8> for i16



### impl ShrAssign\<&i8> for i32



### impl ShrAssign\<&i8> for i64



### impl ShrAssign\<&i8> for i128



### impl ShrAssign\<&i8> for isize



### impl ShrAssign\<&i8> for u8



### impl ShrAssign\<&i8> for u16



### impl ShrAssign\<&i8> for u32



### impl ShrAssign\<&i8> for u64



### impl ShrAssign\<&i8> for u128



### impl ShrAssign\<&i8> for usize



### impl ShrAssign\<&i16> for i8



### impl ShrAssign\<&i16> for i16



### impl ShrAssign\<&i16> for i32



### impl ShrAssign\<&i16> for i64



### impl ShrAssign\<&i16> for i128



### impl ShrAssign\<&i16> for isize



### impl ShrAssign\<&i16> for u8



### impl ShrAssign\<&i16> for u16



### impl ShrAssign\<&i16> for u32



### impl ShrAssign\<&i16> for u64



### impl ShrAssign\<&i16> for u128



### impl ShrAssign\<&i16> for usize



### impl ShrAssign\<&i32> for i8



### impl ShrAssign\<&i32> for i16



### impl ShrAssign\<&i32> for i32



### impl ShrAssign\<&i32> for i64



### impl ShrAssign\<&i32> for i128



### impl ShrAssign\<&i32> for isize



### impl ShrAssign\<&i32> for u8



### impl ShrAssign\<&i32> for u16



### impl ShrAssign\<&i32> for u32



### impl ShrAssign\<&i32> for u64



### impl ShrAssign\<&i32> for u128



### impl ShrAssign\<&i32> for usize



### impl ShrAssign\<&i64> for i8



### impl ShrAssign\<&i64> for i16



### impl ShrAssign\<&i64> for i32



### impl ShrAssign\<&i64> for i64



### impl ShrAssign\<&i64> for i128



### impl ShrAssign\<&i64> for isize



### impl ShrAssign\<&i64> for u8



### impl ShrAssign\<&i64> for u16



### impl ShrAssign\<&i64> for u32



### impl ShrAssign\<&i64> for u64



### impl ShrAssign\<&i64> for u128



### impl ShrAssign\<&i64> for usize



### impl ShrAssign\<&i128> for i8



### impl ShrAssign\<&i128> for i16



### impl ShrAssign\<&i128> for i32



### impl ShrAssign\<&i128> for i64



### impl ShrAssign\<&i128> for i128



### impl ShrAssign\<&i128> for isize



### impl ShrAssign\<&i128> for u8



### impl ShrAssign\<&i128> for u16



### impl ShrAssign\<&i128> for u32



### impl ShrAssign\<&i128> for u64



### impl ShrAssign\<&i128> for u128



### impl ShrAssign\<&i128> for usize



### impl ShrAssign\<&isize> for i8



### impl ShrAssign\<&isize> for i16



### impl ShrAssign\<&isize> for i32



### impl ShrAssign\<&isize> for i64



### impl ShrAssign\<&isize> for i128



### impl ShrAssign\<&isize> for isize



### impl ShrAssign\<&isize> for u8



### impl ShrAssign\<&isize> for u16



### impl ShrAssign\<&isize> for u32



### impl ShrAssign\<&isize> for u64



### impl ShrAssign\<&isize> for u128



### impl ShrAssign\<&isize> for usize



### impl ShrAssign\<&u8> for i8



### impl ShrAssign\<&u8> for i16



### impl ShrAssign\<&u8> for i32



### impl ShrAssign\<&u8> for i64



### impl ShrAssign\<&u8> for i128



### impl ShrAssign\<&u8> for isize



### impl ShrAssign\<&u8> for u8



### impl ShrAssign\<&u8> for u16



### impl ShrAssign\<&u8> for u32



### impl ShrAssign\<&u8> for u64



### impl ShrAssign\<&u8> for u128



### impl ShrAssign\<&u8> for usize



### impl ShrAssign\<&u16> for i8



### impl ShrAssign\<&u16> for i16



### impl ShrAssign\<&u16> for i32



### impl ShrAssign\<&u16> for i64



### impl ShrAssign\<&u16> for i128



### impl ShrAssign\<&u16> for isize



### impl ShrAssign\<&u16> for u8



### impl ShrAssign\<&u16> for u16



### impl ShrAssign\<&u16> for u32



### impl ShrAssign\<&u16> for u64



### impl ShrAssign\<&u16> for u128



### impl ShrAssign\<&u16> for usize



### impl ShrAssign\<&u32> for i8



### impl ShrAssign\<&u32> for i16



### impl ShrAssign\<&u32> for i32



### impl ShrAssign\<&u32> for i64



### impl ShrAssign\<&u32> for i128



### impl ShrAssign\<&u32> for isize



### impl ShrAssign\<&u32> for u8



### impl ShrAssign\<&u32> for u16



### impl ShrAssign\<&u32> for u32



### impl ShrAssign\<&u32> for u64



### impl ShrAssign\<&u32> for u128



### impl ShrAssign\<&u32> for usize



### impl ShrAssign\<&u64> for i8



### impl ShrAssign\<&u64> for i16



### impl ShrAssign\<&u64> for i32



### impl ShrAssign\<&u64> for i64



### impl ShrAssign\<&u64> for i128



### impl ShrAssign\<&u64> for isize



### impl ShrAssign\<&u64> for u8



### impl ShrAssign\<&u64> for u16



### impl ShrAssign\<&u64> for u32



### impl ShrAssign\<&u64> for u64



### impl ShrAssign\<&u64> for u128



### impl ShrAssign\<&u64> for usize



### impl ShrAssign\<&u128> for i8



### impl ShrAssign\<&u128> for i16



### impl ShrAssign\<&u128> for i32



### impl ShrAssign\<&u128> for i64



### impl ShrAssign\<&u128> for i128



### impl ShrAssign\<&u128> for isize



### impl ShrAssign\<&u128> for u8



### impl ShrAssign\<&u128> for u16



### impl ShrAssign\<&u128> for u32



### impl ShrAssign\<&u128> for u64



### impl ShrAssign\<&u128> for u128



### impl ShrAssign\<&u128> for usize



### impl ShrAssign\<&usize> for i8



### impl ShrAssign\<&usize> for i16



### impl ShrAssign\<&usize> for i32



### impl ShrAssign\<&usize> for i64



### impl ShrAssign\<&usize> for i128



### impl ShrAssign\<&usize> for isize



### impl ShrAssign\<&usize> for u8



### impl ShrAssign\<&usize> for u16



### impl ShrAssign\<&usize> for u32



### impl ShrAssign\<&usize> for u64



### impl ShrAssign\<&usize> for u128



### impl ShrAssign\<&usize> for usize



### impl ShrAssign\<&usize> for Saturating\<i8>



### impl ShrAssign\<&usize> for Saturating\<i16>



### impl ShrAssign\<&usize> for Saturating\<i32>



### impl ShrAssign\<&usize> for Saturating\<i64>



### impl ShrAssign\<&usize> for Saturating\<i128>



### impl ShrAssign\<&usize> for Saturating\<isize>



### impl ShrAssign\<&usize> for Saturating\<u8>



### impl ShrAssign\<&usize> for Saturating\<u16>



### impl ShrAssign\<&usize> for Saturating\<u32>



### impl ShrAssign\<&usize> for Saturating\<u64>



### impl ShrAssign\<&usize> for Saturating\<u128>



### impl ShrAssign\<&usize> for Saturating\<usize>



### impl ShrAssign\<&usize> for Wrapping\<i8>



### impl ShrAssign\<&usize> for Wrapping\<i16>



### impl ShrAssign\<&usize> for Wrapping\<i32>



### impl ShrAssign\<&usize> for Wrapping\<i64>



### impl ShrAssign\<&usize> for Wrapping\<i128>



### impl ShrAssign\<&usize> for Wrapping\<isize>



### impl ShrAssign\<&usize> for Wrapping\<u8>



### impl ShrAssign\<&usize> for Wrapping\<u16>



### impl ShrAssign\<&usize> for Wrapping\<u32>



### impl ShrAssign\<&usize> for Wrapping\<u64>



### impl ShrAssign\<&usize> for Wrapping\<u128>



### impl ShrAssign\<&usize> for Wrapping\<usize>



### impl ShrAssign\<i8> for i8



### impl ShrAssign\<i8> for i16



### impl ShrAssign\<i8> for i32



### impl ShrAssign\<i8> for i64



### impl ShrAssign\<i8> for i128



### impl ShrAssign\<i8> for isize



### impl ShrAssign\<i8> for u8



### impl ShrAssign\<i8> for u16



### impl ShrAssign\<i8> for u32



### impl ShrAssign\<i8> for u64



### impl ShrAssign\<i8> for u128



### impl ShrAssign\<i8> for usize



### impl ShrAssign\<i16> for i8



### impl ShrAssign\<i16> for i16



### impl ShrAssign\<i16> for i32



### impl ShrAssign\<i16> for i64



### impl ShrAssign\<i16> for i128



### impl ShrAssign\<i16> for isize



### impl ShrAssign\<i16> for u8



### impl ShrAssign\<i16> for u16



### impl ShrAssign\<i16> for u32



### impl ShrAssign\<i16> for u64



### impl ShrAssign\<i16> for u128



### impl ShrAssign\<i16> for usize



### impl ShrAssign\<i32> for i8



### impl ShrAssign\<i32> for i16



### impl ShrAssign\<i32> for i32



### impl ShrAssign\<i32> for i64



### impl ShrAssign\<i32> for i128



### impl ShrAssign\<i32> for isize



### impl ShrAssign\<i32> for u8



### impl ShrAssign\<i32> for u16



### impl ShrAssign\<i32> for u32



### impl ShrAssign\<i32> for u64



### impl ShrAssign\<i32> for u128



### impl ShrAssign\<i32> for usize



### impl ShrAssign\<i64> for i8



### impl ShrAssign\<i64> for i16



### impl ShrAssign\<i64> for i32



### impl ShrAssign\<i64> for i64



### impl ShrAssign\<i64> for i128



### impl ShrAssign\<i64> for isize



### impl ShrAssign\<i64> for u8



### impl ShrAssign\<i64> for u16



### impl ShrAssign\<i64> for u32



### impl ShrAssign\<i64> for u64



### impl ShrAssign\<i64> for u128



### impl ShrAssign\<i64> for usize



### impl ShrAssign\<i128> for i8



### impl ShrAssign\<i128> for i16



### impl ShrAssign\<i128> for i32



### impl ShrAssign\<i128> for i64



### impl ShrAssign\<i128> for i128



### impl ShrAssign\<i128> for isize



### impl ShrAssign\<i128> for u8



### impl ShrAssign\<i128> for u16



### impl ShrAssign\<i128> for u32



### impl ShrAssign\<i128> for u64



### impl ShrAssign\<i128> for u128



### impl ShrAssign\<i128> for usize



### impl ShrAssign\<isize> for i8



### impl ShrAssign\<isize> for i16



### impl ShrAssign\<isize> for i32



### impl ShrAssign\<isize> for i64



### impl ShrAssign\<isize> for i128



### impl ShrAssign\<isize> for isize



### impl ShrAssign\<isize> for u8



### impl ShrAssign\<isize> for u16



### impl ShrAssign\<isize> for u32



### impl ShrAssign\<isize> for u64



### impl ShrAssign\<isize> for u128



### impl ShrAssign\<isize> for usize



### impl ShrAssign\<u8> for i8



### impl ShrAssign\<u8> for i16



### impl ShrAssign\<u8> for i32



### impl ShrAssign\<u8> for i64



### impl ShrAssign\<u8> for i128



### impl ShrAssign\<u8> for isize



### impl ShrAssign\<u8> for u8



### impl ShrAssign\<u8> for u16



### impl ShrAssign\<u8> for u32



### impl ShrAssign\<u8> for u64



### impl ShrAssign\<u8> for u128



### impl ShrAssign\<u8> for usize



### impl ShrAssign\<u16> for i8



### impl ShrAssign\<u16> for i16



### impl ShrAssign\<u16> for i32



### impl ShrAssign\<u16> for i64



### impl ShrAssign\<u16> for i128



### impl ShrAssign\<u16> for isize



### impl ShrAssign\<u16> for u8



### impl ShrAssign\<u16> for u16



### impl ShrAssign\<u16> for u32



### impl ShrAssign\<u16> for u64



### impl ShrAssign\<u16> for u128



### impl ShrAssign\<u16> for usize



### impl ShrAssign\<u32> for i8



### impl ShrAssign\<u32> for i16



### impl ShrAssign\<u32> for i32



### impl ShrAssign\<u32> for i64



### impl ShrAssign\<u32> for i128



### impl ShrAssign\<u32> for isize



### impl ShrAssign\<u32> for u8



### impl ShrAssign\<u32> for u16



### impl ShrAssign\<u32> for u32



### impl ShrAssign\<u32> for u64



### impl ShrAssign\<u32> for u128



### impl ShrAssign\<u32> for usize



### impl ShrAssign\<u64> for i8



### impl ShrAssign\<u64> for i16



### impl ShrAssign\<u64> for i32



### impl ShrAssign\<u64> for i64



### impl ShrAssign\<u64> for i128



### impl ShrAssign\<u64> for isize



### impl ShrAssign\<u64> for u8



### impl ShrAssign\<u64> for u16



### impl ShrAssign\<u64> for u32



### impl ShrAssign\<u64> for u64



### impl ShrAssign\<u64> for u128



### impl ShrAssign\<u64> for usize



### impl ShrAssign\<u128> for i8



### impl ShrAssign\<u128> for i16



### impl ShrAssign\<u128> for i32



### impl ShrAssign\<u128> for i64



### impl ShrAssign\<u128> for i128



### impl ShrAssign\<u128> for isize



### impl ShrAssign\<u128> for u8



### impl ShrAssign\<u128> for u16



### impl ShrAssign\<u128> for u32



### impl ShrAssign\<u128> for u64



### impl ShrAssign\<u128> for u128



### impl ShrAssign\<u128> for usize



### impl ShrAssign\<usize> for i8



### impl ShrAssign\<usize> for i16



### impl ShrAssign\<usize> for i32



### impl ShrAssign\<usize> for i64



### impl ShrAssign\<usize> for i128



### impl ShrAssign\<usize> for isize



### impl ShrAssign\<usize> for u8



### impl ShrAssign\<usize> for u16



### impl ShrAssign\<usize> for u32



### impl ShrAssign\<usize> for u64



### impl ShrAssign\<usize> for u128



### impl ShrAssign\<usize> for usize



### impl ShrAssign\<usize> for Saturating\<i8>



### impl ShrAssign\<usize> for Saturating\<i16>



### impl ShrAssign\<usize> for Saturating\<i32>



### impl ShrAssign\<usize> for Saturating\<i64>



### impl ShrAssign\<usize> for Saturating\<i128>



### impl ShrAssign\<usize> for Saturating\<isize>



### impl ShrAssign\<usize> for Saturating\<u8>



### impl ShrAssign\<usize> for Saturating\<u16>



### impl ShrAssign\<usize> for Saturating\<u32>



### impl ShrAssign\<usize> for Saturating\<u64>



### impl ShrAssign\<usize> for Saturating\<u128>



### impl ShrAssign\<usize> for Saturating\<usize>



### impl ShrAssign\<usize> for Wrapping\<i8>



### impl ShrAssign\<usize> for Wrapping\<i16>



### impl ShrAssign\<usize> for Wrapping\<i32>



### impl ShrAssign\<usize> for Wrapping\<i64>



### impl ShrAssign\<usize> for Wrapping\<i128>



### impl ShrAssign\<usize> for Wrapping\<isize>



### impl ShrAssign\<usize> for Wrapping\<u8>



### impl ShrAssign\<usize> for Wrapping\<u16>



### impl ShrAssign\<usize> for Wrapping\<u32>



### impl ShrAssign\<usize> for Wrapping\<u64>



### impl ShrAssign\<usize> for Wrapping\<u128>



### impl ShrAssign\<usize> for Wrapping\<usize>



### impl<T, U, const LANES: usize> ShrAssign\<U> for Simd<T, LANES>

```rust
impl<T, U, const LANES: usize> ShrAssign<U> for Simd<T, LANES>
where
  Simd<T, LANES>: Shr<U, Output = Simd<T, LANES>>,
  T: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```

