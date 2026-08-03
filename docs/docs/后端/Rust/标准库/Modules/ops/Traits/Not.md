# Trait std::ops::Not

一元逻辑否定运算符 `!`。

```rust
pub trait Not {
    type Output;

    // Required method
    fn not(self) -> Self::Output;
}
```

用于 `Answer` 的 `Not` 的实现，该实现允许使用 `!` 反转其值。

```rust
use std::ops::Not;

#[derive(Debug, PartialEq)]
enum Answer {
    Yes,
    No,
}

impl Not for Answer {
    type Output = Self;

    fn not(self) -> Self::Output {
        match self {
            Answer::Yes => Answer::No,
            Answer::No => Answer::Yes
        }
    }
}

assert_eq!(!Answer::Yes, Answer::No);
assert_eq!(!Answer::No, Answer::Yes);
```



## Required Associated Types

### Output

应用 `!` 运算符后的结果类型。

```rust
type Output
```



## Required Methods

### not

```rust
fn not(self) -> Self::Output
```

返回值：返回否定运算之后的值

```rust
assert_eq!(!true, false);
assert_eq!(!false, true);
assert_eq!(!1u8, 254);
assert_eq!(!0u8, 255);
```



## Implementors

### impl Not for &bool



### impl Not for &i8



### impl Not for &i16



### impl Not for &i32



### impl Not for &i64



### impl Not for &i128



### impl Not for &isize



### impl Not for &u8



### impl Not for &u16



### impl Not for &u32



### impl Not for &u64



### impl Not for &u128



### impl Not for &usize



### impl Not for &Saturating\<i8>



### impl Not for &Saturating\<i16>



### impl Not for &Saturating\<i32>



### impl Not for &Saturating\<i64>



### impl Not for &Saturating\<i128>



### impl Not for &Saturating\<isize>



### impl Not for &Saturating\<u8>



### impl Not for &Saturating\<u16>



### impl Not for &Saturating\<u32>



### impl Not for &Saturating\<u64>



### impl Not for &Saturating\<u128>



### impl Not for &Saturating\<usize>



### impl Not for &Wrapping\<i8>



### impl Not for &Wrapping\<i16>



### impl Not for &Wrapping\<i32>



### impl Not for &Wrapping\<i64>



### impl Not for &Wrapping\<i128>



### impl Not for &Wrapping\<isize>



### impl Not for &Wrapping\<u8>



### impl Not for &Wrapping\<u16>



### impl Not for &Wrapping\<u32>



### impl Not for &Wrapping\<u64>



### impl Not for &Wrapping\<u128>



### impl Not for &Wrapping\<usize>



### impl Not for bool



### impl Not for i8



### impl Not for i16



### impl Not for i32



### impl Not for i64



### impl Not for i128



### impl Not for isize



### impl Not for !



### impl Not for u8



### impl Not for u16



### impl Not for u32



### impl Not for u64



### impl Not for u128



### impl Not for usize



### impl Not for Saturating\<i8>



### impl Not for Saturating\<i16>



### impl Not for Saturating\<i32>



### impl Not for Saturating\<i64>



### impl Not for Saturating\<i128>



### impl Not for Saturating\<isize>



### impl Not for Saturating\<u8>



### impl Not for Saturating\<u16>



### impl Not for Saturating\<u32>



### impl Not for Saturating\<u64>



### impl Not for Saturating\<u128>



### impl Not for Saturating\<usize>



### impl Not for Wrapping\<i8>



### impl Not for Wrapping\<i16>



### impl Not for Wrapping\<i32>



### impl Not for Wrapping\<i64>



### impl Not for Wrapping\<i128>



### impl Not for Wrapping\<isize>



### impl Not for Wrapping\<u8>



### impl Not for Wrapping\<u16>



### impl Not for Wrapping\<u32>



### impl Not for Wrapping\<u64>



### impl Not for Wrapping\<u128>



### impl Not for Wrapping\<usize>



### impl<T, const LANES: usize> Not for Mask<T, LANES>

```rust
impl<T, const LANES: usize> Not for Mask<T, LANES>
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const LANES: usize> Not for Simd<i8, LANES>

```rust
impl<const LANES: usize> Not for Simd<i8, LANES>
where
  i8: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const LANES: usize> Not for Simd<i16, LANES>

```rust
impl<const LANES: usize> Not for Simd<i16, LANES>
where
  i16: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const LANES: usize> Not for Simd<i32, LANES>

```rust
impl<const LANES: usize> Not for Simd<i32, LANES>
where
  i32: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const LANES: usize> Not for Simd<i64, LANES>

```rust
impl<const LANES: usize> Not for Simd<i64, LANES>
where
  i64: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const LANES: usize> Not for Simd<isize, LANES>

```rust
impl<const LANES: usize> Not for Simd<isize, LANES>
where
  isize: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const LANES: usize> Not for Simd<u8, LANES>

```rust
impl<const LANES: usize> Not for Simd<u8, LANES>
where
  u8: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const LANES: usize> Not for Simd<u16, LANES>

```rust
impl<const LANES: usize> Not for Simd<u16, LANES>
where
  u16: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const LANES: usize> Not for Simd<u32, LANES>

```rust
impl<const LANES: usize> Not for Simd<u32, LANES>
where
  u32: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const LANES: usize> Not for Simd<u64, LANES>

```rust
impl<const LANES: usize> Not for Simd<u64, LANES>
where
  u64: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const LANES: usize> Not for Simd<usize, LANES>

```rust
impl<const LANES: usize> Not for Simd<usize, LANES>
where
  usize: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
