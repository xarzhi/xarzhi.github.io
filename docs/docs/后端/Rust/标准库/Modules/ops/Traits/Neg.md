# Trait std::ops::Neg

一元否定运算符 `-`。

```rust
pub trait Neg {
    type Output;

    // Required method
    fn neg(self) -> Self::Output;
}
```

`Sign` 的 `Neg` 实现，它允许使用 `-` 取反其值。

```rust
use std::ops::Neg;

#[derive(Debug, PartialEq)]
enum Sign {
    Negative,
    Zero,
    Positive,
}

impl Neg for Sign {
    type Output = Self;

    fn neg(self) -> Self::Output {
        match self {
            Sign::Negative => Sign::Positive,
            Sign::Zero => Sign::Zero,
            Sign::Positive => Sign::Negative,
        }
    }
}

// 否定的肯定就是否定的。
assert_eq!(-Sign::Positive, Sign::Negative);
// 双重否定就是肯定。
assert_eq!(-Sign::Negative, Sign::Positive);
// 零是它自己的否定。
assert_eq!(-Sign::Zero, Sign::Zero);
```



## Required Associated Types

### Output

应用 `-` 运算符后的结果类型。

```rust
type Output
```



## Required Methods

### neg

```rust
fn neg(self) -> Self::Output
```

**返回值**：返回否定后的值

```rust
let x: i32 = 12;
assert_eq!(-x, -12);
```



## Implementors

### impl Neg for &f32



### impl Neg for &f64



### impl Neg for &i8



### impl Neg for &i16



### impl Neg for &i32



### impl Neg for &i64



### impl Neg for &i128



### impl Neg for &isize



### impl Neg for &NonZeroI8



### impl Neg for &NonZeroI16



### impl Neg for &NonZeroI32



### impl Neg for &NonZeroI64



### impl Neg for &NonZeroI128



### impl Neg for &NonZeroIsize



### impl Neg for &Saturating\<i8>



### impl Neg for &Saturating\<i16>



### impl Neg for &Saturating\<i32>



### impl Neg for &Saturating\<i64>



### impl Neg for &Saturating\<i128>



### impl Neg for &Saturating\<isize>



### impl Neg for &Wrapping\<i8>



### impl Neg for &Wrapping\<i16>



### impl Neg for &Wrapping\<i32>



### impl Neg for &Wrapping\<i64>



### impl Neg for &Wrapping\<i128>



### impl Neg for &Wrapping\<isize>



### impl Neg for &Wrapping\<u8>



### impl Neg for &Wrapping\<u16>



### impl Neg for &Wrapping\<u32>



### impl Neg for &Wrapping\<u64>



### impl Neg for &Wrapping\<u128>



### impl Neg for &Wrapping\<usize>



### impl Neg for f32



### impl Neg for f64



### impl Neg for i8



### impl Neg for i16



### impl Neg for i32



### impl Neg for i64



### impl Neg for i128



### impl Neg for isize



### impl Neg for NonZeroI8



### impl Neg for NonZeroI16



### impl Neg for NonZeroI32



### impl Neg for NonZeroI64



### impl Neg for NonZeroI128



### impl Neg for NonZeroIsize



### impl Neg for Saturating\<i8>



### impl Neg for Saturating\<i16>



### impl Neg for Saturating\<i32>



### impl Neg for Saturating\<i64>



### impl Neg for Saturating\<i128>



### impl Neg for Saturating\<isize>



### impl Neg for Wrapping\<i8>



### impl Neg for Wrapping\<i16>



### impl Neg for Wrapping\<i32>



### impl Neg for Wrapping\<i64>



### impl Neg for Wrapping\<i128>



### impl Neg for Wrapping\<isize>



### impl Neg for Wrapping\<u8>



### impl Neg for Wrapping\<u16>



### impl Neg for Wrapping\<u32>



### impl Neg for Wrapping\<u64>



### impl Neg for Wrapping\<u128>



### impl Neg for Wrapping\<usize>



### impl\<const LANES: usize> Neg for Simd<f32, LANES>

```rust
impl<const LANES: usize> Neg for Simd<f32, LANES>
where
  f32: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const LANES: usize> Neg for Simd<f64, LANES>

```rust
impl<const LANES: usize> Neg for Simd<f64, LANES>
where
  f64: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const LANES: usize> Neg for Simd<i8, LANES>

```rust
impl<const LANES: usize> Neg for Simd<i8, LANES>
where
  i8: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const LANES: usize> Neg for Simd<i16, LANES>

```rust
impl<const LANES: usize> Neg for Simd<i16, LANES>
where
  i16: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const LANES: usize> Neg for Simd<i32, LANES>

```rust
impl<const LANES: usize> Neg for Simd<i32, LANES>
where
  i32: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const LANES: usize> Neg for Simd<i64, LANES>

```rust
impl<const LANES: usize> Neg for Simd<i64, LANES>
where
  i64: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const LANES: usize> Neg for Simd<isize, LANES>

```rust
impl<const LANES: usize> Neg for Simd<isize, LANES>
where
  isize: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```

