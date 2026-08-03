# Trait std::ops::BitAndAssign

按位与赋值运算符 `&=`

```rust
pub trait BitAndAssign<Rhs = Self> {
    // Required method
    fn bitand_assign(&mut self, rhs: Rhs);
}
```

`BitAndAssign` 的实现，将 `&=` 运算符提升为 `bool` 的包装器。

```rust
use std::ops::BitAndAssign;

#[derive(Debug, PartialEq)]
struct Scalar(bool);

impl BitAndAssign for Scalar {
    // rhs 是表达式 `a &= b` 的 "right-hand side"
    fn bitand_assign(&mut self, rhs: Self) {
        *self = Self(self.0 & rhs.0)
    }
}

let mut scalar = Scalar(true);
scalar &= Scalar(true);
assert_eq!(scalar, Scalar(true));

let mut scalar = Scalar(true);
scalar &= Scalar(false);
assert_eq!(scalar, Scalar(false));

let mut scalar = Scalar(false);
scalar &= Scalar(true);
assert_eq!(scalar, Scalar(false));

let mut scalar = Scalar(false);
scalar &= Scalar(false);
assert_eq!(scalar, Scalar(false));
```

这里，`BitAndAssign` trait 是为 `Vec<bool>` 周围的包装器实现的。

```rust
use std::ops::BitAndAssign;

#[derive(Debug, PartialEq)]
struct BooleanVector(Vec<bool>);

impl BitAndAssign for BooleanVector {
    // `rhs` 是表达式 `a &= b` 的 "right-hand side"。
    fn bitand_assign(&mut self, rhs: Self) {
        assert_eq!(self.0.len(), rhs.0.len());
        *self = Self(
            self.0
                .iter()
                .zip(rhs.0.iter())
                .map(|(x, y)| *x & *y)
                .collect()
        );
    }
}

let mut bv = BooleanVector(vec![true, true, false, false]);
bv &= BooleanVector(vec![true, false, true, false]);
let expected = BooleanVector(vec![true, false, false, false]);
assert_eq!(bv, expected);
```



## Required Methods

### bitand_assign

执行 `&=` 操作。

```rust
fn bitand_assign(&mut self, rhs: Rhs)
```

**参数**：

- **rhs**：执行 ` &=` 操作的右值

```rust
let mut x = true;
x &= false;
assert_eq!(x, false);

let mut x = true;
x &= true;
assert_eq!(x, true);

let mut x: u8 = 5;
x &= 1;
assert_eq!(x, 1);

let mut x: u8 = 5;
x &= 2;
assert_eq!(x, 0);
```



## Implementors



### impl BitAndAssign\<&bool> for bool



### impl BitAndAssign\<&i8> for i8



### impl BitAndAssign\<&i8> for Saturating\<i8>



### impl BitAndAssign\<&i8> for Wrapping\<i8>



### impl BitAndAssign\<&i16> for i16



### impl BitAndAssign\<&i16> for Saturating\<i16>



### impl BitAndAssign\<&i16> for Wrapping\<i16>



### impl BitAndAssign\<&i32> for i32



### impl BitAndAssign\<&i32> for Saturating\<i32>



### impl BitAndAssign\<&i32> for Wrapping\<i32>



### impl BitAndAssign\<&i64> for i64



### impl BitAndAssign\<&i64> for Saturating\<i64>



### impl BitAndAssign\<&i64> for Wrapping\<i64>



### impl BitAndAssign\<&i128> for i128



### impl BitAndAssign\<&i128> for Saturating\<i128>



### impl BitAndAssign\<&i128> for Wrapping\<i128>



### impl BitAndAssign\<&isize> for isize



### impl BitAndAssign\<&isize> for Saturating\<isize>



### impl BitAndAssign\<&isize> for Wrapping\<isize>



### impl BitAndAssign\<&u8> for u8



### impl BitAndAssign\<&u8> for Saturating\<u8>



### impl BitAndAssign\<&u8> for Wrapping\<u8>



### impl BitAndAssign\<&u16> for u16



### impl BitAndAssign\<&u16> for Saturating\<u16>



### impl BitAndAssign\<&u16> for Wrapping\<u16>



### impl BitAndAssign\<&u32> for u32



### impl BitAndAssign\<&u32> for Saturating\<u32>



### impl BitAndAssign\<&u32> for Wrapping\<u32>



### impl BitAndAssign\<&u64> for u64



### impl BitAndAssign\<&u64> for Saturating\<u64>



### impl BitAndAssign\<&u64> for Wrapping\<u64>



### impl BitAndAssign\<&u128> for u128



### impl BitAndAssign\<&u128> for Saturating\<u128>



### impl BitAndAssign\<&u128> for Wrapping\<u128>



### impl BitAndAssign\<&usize> for usize



### impl BitAndAssign\<&usize> for Saturating\<usize>



### impl BitAndAssign\<&usize> for Wrapping\<usize>



### impl BitAndAssign\<&Saturating\<i8>> for Saturating\<i8>



### impl BitAndAssign\<&Saturating\<i16>> for Saturating\<i16>



### impl BitAndAssign\<&Saturating\<i32>> for Saturating\<i32>



### impl BitAndAssign\<&Saturating\<i64>> for Saturating\<i64>



### impl BitAndAssign\<&Saturating\<i128>> for Saturating\<i128>



### impl BitAndAssign\<&Saturating\<isize>> for Saturating\<isize>



### impl BitAndAssign\<&Saturating\<u8>> for Saturating\<u8>



### impl BitAndAssign\<&Saturating\<u16>> for Saturating\<u16>



### impl BitAndAssign\<&Saturating\<u32>> for Saturating\<u32>



### impl BitAndAssign\<&Saturating\<u64>> for Saturating\<u64>



### impl BitAndAssign\<&Saturating\<u128>> for Saturating\<u128>



### impl BitAndAssign\<&Saturating\<usize>> for Saturating\<usize>



### impl BitAndAssign\<&Wrapping\<i8>> for Wrapping\<i8>



### impl BitAndAssign\<&Wrapping\<i16>> for Wrapping\<i16>



### impl BitAndAssign\<&Wrapping\<i32>> for Wrapping\<i32>



### impl BitAndAssign\<&Wrapping\<i64>> for Wrapping\<i64>



### impl BitAndAssign\<&Wrapping\<i128>> for Wrapping\<i128>



### impl BitAndAssign\<&Wrapping\<isize>> for Wrapping\<isize>



### impl BitAndAssign\<&Wrapping\<u8>> for Wrapping\<u8>



### impl BitAndAssign\<&Wrapping\<u16>> for Wrapping\<u16>



### impl BitAndAssign\<&Wrapping\<u32>> for Wrapping\<u32>



### impl BitAndAssign\<&Wrapping\<u64>> for Wrapping\<u64>



### impl BitAndAssign\<&Wrapping\<u128>> for Wrapping\<u128>



### impl BitAndAssign\<&Wrapping\<usize>> for Wrapping\<usize>



### impl BitAndAssign\<bool> for bool



### impl BitAndAssign\<i8> for i8



### impl BitAndAssign\<i8> for Saturating\<i8>



### impl BitAndAssign\<i8> for Wrapping\<i8>



### impl BitAndAssign\<i16> for i16



### impl BitAndAssign\<i16> for Saturating\<i16>



### impl BitAndAssign\<i16> for Wrapping\<i16>



### impl BitAndAssign\<i32> for i32



### impl BitAndAssign\<i32> for Saturating\<i32>



### impl BitAndAssign\<i32> for Wrapping\<i32>



### impl BitAndAssign\<i64> for i64



### impl BitAndAssign\<i64> for Saturating\<i64>



### impl BitAndAssign\<i64> for Wrapping\<i64>



### impl BitAndAssign\<i128> for i128

### 

### impl BitAndAssign\<i128> for Saturating\<i128>



### impl BitAndAssign\<i128> for Wrapping\<i128>



### impl BitAndAssign\<isize> for isize



### impl BitAndAssign\<isize> for Saturating\<isize>



### impl BitAndAssign\<isize> for Wrapping\<isize>



### impl BitAndAssign\<u8> for u8



### impl BitAndAssign\<u8> for Saturating\<u8>



### impl BitAndAssign\<u8> for Wrapping\<u8>



### impl BitAndAssign\<u16> for u16



### impl BitAndAssign\<u16> for Saturating\<u16>



### impl BitAndAssign\<u16> for Wrapping\<u16>



### impl BitAndAssign\<u32> for u32



### impl BitAndAssign\<u32> for Saturating\<u32>



### impl BitAndAssign\<u32> for Wrapping\<u32>



### impl BitAndAssign\<u64> for u64



### impl BitAndAssign\<u64> for Saturating\<u64>



### impl BitAndAssign\<u64> for Wrapping\<u64>



### impl BitAndAssign\<u128> for u128



### impl BitAndAssign\<u128> for Saturating\<u128>



### impl BitAndAssign\<u128> for Wrapping\<u128>



### impl BitAndAssign\<usize> for usize



### impl BitAndAssign\<usize> for Saturating\<usize>



### impl BitAndAssign\<usize> for Wrapping\<usize>



### impl BitAndAssign\<Saturating\<i8>> for Saturating\<i8>



### impl BitAndAssign\<Saturating\<i16>> for Saturating\<i16>



### impl BitAndAssign\<Saturating\<i32>> for Saturating\<i32>



### impl BitAndAssign\<Saturating\<i64>> for Saturating\<i64>



### impl BitAndAssign\<Saturating\<i128>> for Saturating\<i128>



### impl BitAndAssign\<Saturating\<isize>> for Saturating\<isize>



### impl BitAndAssign\<Saturating\<u8>> for Saturating\<u8>



### impl BitAndAssign\<Saturating\<u16>> for Saturating\<u16>



### impl BitAndAssign\<Saturating\<u32>> for Saturating\<u32>



### impl BitAndAssign\<Saturating\<u64>> for Saturating\<u64>



### impl BitAndAssign\<Saturating\<u128>> for Saturating\<u128>



### impl BitAndAssign\<Saturating\<usize>> for Saturating\<usize>



### impl BitAndAssign\<Wrapping\<i8>> for Wrapping\<i8>



### impl BitAndAssign\<Wrapping\<i16>> for Wrapping\<i16>



### impl BitAndAssign\<Wrapping\<i32>> for Wrapping\<i32>



### impl BitAndAssign\<Wrapping\<i64>> for Wrapping\<i64>



### impl BitAndAssign\<Wrapping\<i128>> for Wrapping\<i128>



### impl BitAndAssign\<Wrapping\<isize>> for Wrapping\<isize>



### impl BitAndAssign\<Wrapping\<u8>> for Wrapping\<u8>



### impl BitAndAssign\<Wrapping\<u16>> for Wrapping\<u16>



### impl BitAndAssign\<Wrapping\<u32>> for Wrapping\<u32>



### impl BitAndAssign\<Wrapping\<u64>> for Wrapping\<u64>



### impl BitAndAssign\<Wrapping\<u128>> for Wrapping\<u128>



### impl BitAndAssign\<Wrapping\<usize>> for Wrapping\<usize>



### impl\<T, U, const LANES: usize> BitAndAssign\<U> for Simd\<T, LANES>

```rust
impl<T, U, const LANES: usize> BitAndAssign<U> for Simd<T, LANES>
where
  Simd<T, LANES>: BitAnd<U, Output = Simd<T, LANES>>,
  T: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<T, const LANES: usize> BitAndAssign\<bool> for Mask\<T, LANES>

```rust
impl<T, const LANES: usize> BitAndAssign<bool> for Mask<T, LANES>
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<T, const LANES: usize> BitAndAssign\<Mask\<T, LANES>> for Mask\<T, LANES>

```rust
impl<T, const LANES: usize> BitAndAssign<Mask<T, LANES>> for Mask<T, LANES>
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,