# Trait std::ops::BitAnd

按位与运算符 `&`。

请注意，默认情况下 `Rhs` 是 `Self`，但这不是强制性的。

```rust
pub trait BitAnd<Rhs = Self> {
    type Output;

    // Required method
    fn bitand(self, rhs: Rhs) -> Self::Output;
}
```

`BitAnd` 的实现，用于围绕 `bool` 的包装。

```rust
use std::ops::BitAnd;

#[derive(Debug, PartialEq)]
struct Scalar(bool);

impl BitAnd for Scalar {
    type Output = Self;

    // rhs 是表达式 `a & b` 的 "right-hand side"
    fn bitand(self, rhs: Self) -> Self::Output {
        Self(self.0 & rhs.0)
    }
}

assert_eq!(Scalar(true) & Scalar(true), Scalar(true));
assert_eq!(Scalar(true) & Scalar(false), Scalar(false));
assert_eq!(Scalar(false) & Scalar(true), Scalar(false));
assert_eq!(Scalar(false) & Scalar(false), Scalar(false));
```

`BitAnd` 的实现，用于围绕 `Vec<bool>` 的包装。

```rust
use std::ops::BitAnd;

#[derive(Debug, PartialEq)]
struct BooleanVector(Vec<bool>);

impl BitAnd for BooleanVector {
    type Output = Self;

    fn bitand(self, Self(rhs): Self) -> Self::Output {
        let Self(lhs) = self;
        assert_eq!(lhs.len(), rhs.len());
        Self(
            lhs.iter()
                .zip(rhs.iter())
                .map(|(x, y)| *x & *y)
                .collect()
        )
    }
}

let bv1 = BooleanVector(vec![true, true, false, false]);
let bv2 = BooleanVector(vec![true, false, true, false]);
let expected = BooleanVector(vec![true, false, false, false]);
assert_eq!(bv1 & bv2, expected);
```



## Required Associated Types

### Output

应用 & 运算符后的结果类型。

```rust
type Output
```



## Required Methods

### bitand

执行 `&` 操作。

```rust
fn bitand(self, rhs: Rhs) -> Self::Output
```

**参数**：

- **rhs**：执行 `&` 操作的右值

**返回值**：返回两者与运算后的值

```rust
assert_eq!(true & false, false);
assert_eq!(true & true, true);
assert_eq!(5u8 & 1u8, 1);
assert_eq!(5u8 & 2u8, 0);
```



## Implementors

### impl BitAnd\<&bool> for &bool



### impl BitAnd\<&bool> for bool



### impl BitAnd\<&i8> for &i8



### impl BitAnd\<&i8> for i8



### impl BitAnd\<&i16> for &i16



### impl BitAnd\<&i16> for i16



### impl BitAnd\<&i32> for &i32



### impl BitAnd\<&i32> for i32



### impl BitAnd\<&i64> for &i64



### impl BitAnd\<&i64> for i64



### impl BitAnd\<&i128> for &i128



### impl BitAnd\<&i128> for i128



### impl BitAnd\<&isize> for &isize



### impl BitAnd\<&isize> for isize



### impl BitAnd\<&u8> for &u8



### impl BitAnd\<&u8> for u8



### impl BitAnd\<&u16> for &u16



### impl BitAnd\<&u16> for u16



### impl BitAnd\<&u32> for &u32



### impl BitAnd\<&u32> for u32



### impl BitAnd\<&u64> for &u64



### impl BitAnd\<&u64> for u64



### impl BitAnd\<&u128> for &u128



### impl BitAnd\<&u128> for u128



### impl BitAnd\<&usize> for &usize



### impl BitAnd\<&usize> for usize



### impl BitAnd\<&Saturating\<i8>> for &Saturating\<i8>



### impl BitAnd\<&Saturating\<i8>> for Saturating\<i8>



### impl BitAnd\<&Saturating\<i16>> for &Saturating\<i16>



### impl BitAnd\<&Saturating\<i16>> for Saturating\<i16>



### impl BitAnd\<&Saturating\<i32>> for &Saturating\<i32>



### impl BitAnd\<&Saturating\<i32>> for Saturating\<i32>



### impl BitAnd\<&Saturating\<i64>> for &Saturating\<i64>



### impl BitAnd\<&Saturating\<i64>> for Saturating\<i64>



### impl BitAnd\<&Saturating\<i128>> for &Saturating\<i128>



### impl BitAnd\<&Saturating\<i128>> for Saturating\<i128>



### impl BitAnd\<&Saturating\<isize>> for &Saturating\<isize>



### impl BitAnd\<&Saturating\<isize>> for Saturating\<isize>



### impl BitAnd\<&Saturating\<u8>> for &Saturating\<u8>



### impl BitAnd\<&Saturating\<u8>> for Saturating\<u8>



### impl BitAnd\<&Saturating\<u16>> for &Saturating\<u16>



### impl BitAnd\<&Saturating\<u16>> for Saturating\<u16>



### impl BitAnd\<&Saturating\<u32>> for &Saturating\<u32>



### impl BitAnd\<&Saturating\<u32>> for Saturating\<u32>



### impl BitAnd\<&Saturating\<u64>> for &Saturating\<u64>



### impl BitAnd\<&Saturating\<u64>> for Saturating\<u64>



### impl BitAnd\<&Saturating\<u128>> for &Saturating\<u128>



### impl BitAnd\<&Saturating\<u128>> for Saturating\<u128>



### impl BitAnd\<&Saturating\<usize>> for &Saturating\<usize>



### impl BitAnd\<&Saturating\<usize>> for Saturating\<usize>



### impl BitAnd\<&Wrapping\<i8>> for &Wrapping\<i8>



### impl BitAnd\<&Wrapping\<i8>> for Wrapping\<i8>



### impl BitAnd\<&Wrapping\<i16>> for &Wrapping\<i16>



### impl BitAnd\<&Wrapping\<i16>> for Wrapping\<i16>



### impl BitAnd\<&Wrapping\<i32>> for &Wrapping\<i32>



### impl BitAnd\<&Wrapping\<i32>> for Wrapping\<i32>



### impl BitAnd\<&Wrapping\<i64>> for &Wrapping\<i64>



### impl BitAnd\<&Wrapping\<i64>> for Wrapping\<i64>



### impl BitAnd\<&Wrapping\<i128>> for &Wrapping\<i128>



### impl BitAnd\<&Wrapping\<i128>> for Wrapping\<i128>



### impl BitAnd\<&Wrapping\<isize>> for &Wrapping\<isize>



### impl BitAnd\<&Wrapping\<isize>> for Wrapping\<isize>



### impl BitAnd\<&Wrapping\<u8>> for &Wrapping\<u8>



### impl BitAnd\<&Wrapping\<u8>> for Wrapping\<u8>



### impl BitAnd\<&Wrapping\<u16>> for &Wrapping\<u16>



### impl BitAnd\<&Wrapping\<u16>> for Wrapping\<u16>



### impl BitAnd\<&Wrapping\<u32>> for &Wrapping\<u32>



### impl BitAnd\<&Wrapping\<u32>> for Wrapping\<u32>



### impl BitAnd\<&Wrapping\<u64>> for &Wrapping\<u64>



### impl BitAnd\<&Wrapping\<u64>> for Wrapping\<u64>



### impl BitAnd\<&Wrapping\<u128>> for &Wrapping\<u128>



### impl BitAnd\<&Wrapping\<u128>> for Wrapping\<u128>



### impl BitAnd\<&Wrapping\<usize>> for &Wrapping\<usize>



### impl BitAnd\<&Wrapping\<usize>> for Wrapping\<usize>



### impl BitAnd\<bool> for bool



### impl BitAnd\<i8> for i8



### impl BitAnd\<i16> for i16



### impl BitAnd\<i32> for i32



### impl BitAnd\<i64> for i64



### impl BitAnd\<i128> for i128



### impl BitAnd\<isize> for isize



### impl BitAnd\<u8> for u8



### impl BitAnd\<u16> for u16



### impl BitAnd\<u32> for u32



### impl BitAnd\<u64> for u64



### impl BitAnd\<u128> for u128



### impl BitAnd\<usize> for usize



### impl BitAnd\<Saturating\<i8>> for Saturating\<i8>



### impl BitAnd\<Saturating\<i16>> for Saturating\<i16>



### impl BitAnd\<Saturating\<i32>> for Saturating\<i32>



### impl BitAnd\<Saturating\<i64>> for Saturating\<i64>



### impl BitAnd\<Saturating\<i128>> for Saturating\<i128>



### impl BitAnd\<Saturating\<isize>> for Saturating\<isize>



### impl BitAnd\<Saturating\<u8>> for Saturating\<u8>



### impl BitAnd\<Saturating\<u16>> for Saturating\<u16>



### impl BitAnd\<Saturating\<u32>> for Saturating\<u32>



### impl BitAnd\<Saturating\<u64>> for Saturating\<u64>



### impl BitAnd\<Saturating\<u128>> for Saturating\<u128>



### impl BitAnd\<Saturating\<usize>> for Saturating\<usize>



### impl BitAnd\<Wrapping\<i8>> for Wrapping\<i8>



### impl BitAnd\<Wrapping\<i16>> for Wrapping\<i16>



### impl BitAnd\<Wrapping\<i32>> for Wrapping\<i32>



### impl BitAnd\<Wrapping\<i64>> for Wrapping\<i64>



### impl BitAnd\<Wrapping\<i128>> for Wrapping\<i128>



### impl BitAnd\<Wrapping\<isize>> for Wrapping\<isize>



### impl BitAnd\<Wrapping\<u8>> for Wrapping\<u8>



### impl BitAnd\<Wrapping\<u16>> for Wrapping\<u16>



### impl BitAnd\<Wrapping\<u32>> for Wrapping\<u32>



### impl BitAnd\<Wrapping\<u64>> for Wrapping\<u64>



### impl BitAnd\<Wrapping\<u128>> for Wrapping\<u128>



### impl BitAnd\<Wrapping\<usize>> for Wrapping\<usize>



### impl\<'a> BitAnd\<bool> for &'a bool



### impl\<'a> BitAnd\<i8> for &'a i8



### impl\<'a> BitAnd\<i16> for &'a i16



### impl\<'a> BitAnd\<i32> for &'a i32



### impl\<'a> BitAnd\<i64> for &'a i64



### impl\<'a> BitAnd\<i128> for &'a i128



### impl\<'a> BitAnd\<isize> for &'a isize



### impl\<'a> BitAnd\<u8> for &'a u8



### impl\<'a> BitAnd\<u16> for &'a u16



### impl\<'a> BitAnd\<u32> for &'a u32



### impl\<'a> BitAnd\<u64> for &'a u64



### impl\<'a> BitAnd\<u128> for &'a u128



### impl\<'a> BitAnd\<usize> for &'a usize



### impl\<'a> BitAnd\<Saturating\<i8>> for &'a Saturating\<i8>



### impl\<'a> BitAnd\<Saturating\<i16>> for &'a Saturating\<i16>



### impl\<'a> BitAnd\<Saturating\<i32>> for &'a Saturating\<i32>



### impl\<'a> BitAnd\<Saturating\<i64>> for &'a Saturating\<i64>



### impl\<'a> BitAnd\<Saturating\<i128>> for &'a Saturating\<i128>



### impl\<'a> BitAnd\<Saturating\<isize>> for &'a Saturating\<isize>



### impl\<'a> BitAnd\<Saturating\<u8>> for &'a Saturating\<u8>



### impl\<'a> BitAnd\<Saturating\<u16>> for &'a Saturating\<u16>



### impl\<'a> BitAnd\<Saturating\<u32>> for &'a Saturating\<u32>



### impl\<'a> BitAnd\<Saturating\<u64>> for &'a Saturating\<u64>



### impl\<'a> BitAnd\<Saturating\<u128>> for &'a Saturating\<u128>



### impl\<'a> BitAnd\<Saturating\<usize>> for &'a Saturating\<usize>



### impl\<'a> BitAnd\<Wrapping\<i8>> for &'a Wrapping\<i8>



### impl\<'a> BitAnd\<Wrapping\<i16>> for &'a Wrapping\<i16>



### impl\<'a> BitAnd\<Wrapping\<i32>> for &'a Wrapping\<i32>



### impl\<'a> BitAnd\<Wrapping\<i64>> for &'a Wrapping\<i64>



### impl\<'a> BitAnd\<Wrapping\<i128>> for &'a Wrapping\<i128>



### impl\<'a> BitAnd\<Wrapping\<isize>> for &'a Wrapping\<isize>



### impl\<'a> BitAnd\<Wrapping\<u8>> for &'a Wrapping\<u8>



### impl\<'a> BitAnd\<Wrapping\<u16>> for &'a Wrapping\<u16>



### impl\<'a> BitAnd\<Wrapping\<u32>> for &'a Wrapping\<u32>



### impl\<'a> BitAnd\<Wrapping\<u64>> for &'a Wrapping\<u64>



### impl\<'a> BitAnd\<Wrapping\<u128>> for &'a Wrapping\<u128>



### impl\<'a> BitAnd\<Wrapping\<usize>> for &'a Wrapping\<usize>



### impl\<'lhs, 'rhs, T, const LANES: usize> BitAnd\<&'rhs Simd\<T, LANES>> for &'lhs Simd\<T, LANES>

```rust
impl<'lhs, 'rhs, T, const LANES: usize> BitAnd<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: BitAnd<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<T, A> BitAnd\<&BTreeSet\<T, A>> for &BTreeSet\<T, A>

```rust
impl<T, A> BitAnd\<&BTreeSet<T, A>> for &BTreeSet<T, A>
where
  T: Ord + Clone,
  A: Allocator + Clone,
```



### impl\<T, S> BitAnd\<&HashSet\<T, S>> for &HashSet\<T, S>

```rust
impl<T, S> BitAnd<&HashSet<T, S>> for &HashSet<T, S>
where
  T: Eq + Hash + Clone,
  S: BuildHasher + Default,
```



### impl\<T, const LANES: usize> BitAnd\<&Simd\<T, LANES>> for Simd\<T, LANES>

```rust
impl<T, const LANES: usize> BitAnd<&Simd<T, LANES>> for Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: BitAnd<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<T, const LANES: usize> BitAnd\<bool> for Mask\<T, LANES>

```rust
impl<T, const LANES: usize> BitAnd<bool> for Mask<T, LANES>
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<T, const LANES: usize> BitAnd\<Mask\<T, LANES>> for bool

```rust
impl<T, const LANES: usize> BitAnd<Mask<T, LANES>> for bool
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<T, const LANES: usize> BitAnd\<Mask\<T, LANES>> for Mask\<T, LANES>

```rust
impl<T, const LANES: usize> BitAnd<Mask<T, LANES>> for Mask<T, LANES>
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<T, const LANES: usize> BitAnd\<Simd\<T, LANES>> for &Simd\<T, LANES>

```rust
impl<T, const LANES: usize> BitAnd<Simd<T, LANES>> for &Simd<T, LANES>
where
  T: SimdElement,
  Simd\<T, LANES>: BitAnd<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const N: usize> BitAnd\<Simd\<i8, N>> for Simd\<i8, N>

```rust
impl<const N: usize> BitAnd<Simd<i8, N>> for Simd<i8, N>
where
  i8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitAnd\<Simd\<i16, N>> for Simd\<i16, N>

```rust
impl<const N: usize> BitAnd<Simd<i16, N>> for Simd<i16, N>
where
  i16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitAnd\<Simd\<i32, N>> for Simd\<i32, N>

```rust
impl<const N: usize> BitAnd<Simd<i32, N>> for Simd<i32, N>
where
  i32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitAnd\<Simd\<i64, N>> for Simd\<i64, N>

```rust
impl<const N: usize> BitAnd<Simd<i64, N>> for Simd<i64, N>
where
  i64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitAnd\<Simd\<isize, N>> for Simd\<isize, N>

```rust
impl<const N: usize> BitAnd<Simd<isize, N>> for Simd<isize, N>
where
  isize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitAnd\<Simd\<u8, N>> for Simd\<u8, N>

```rust
impl<const N: usize> BitAnd<Simd<u8, N>> for Simd<u8, N>
where
  u8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitAnd\<Simd\<u16, N>> for Simd\<u16, N>

```rust
impl<const N: usize> BitAnd<Simd<u16, N>> for Simd<u16, N>
where
  u16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitAnd\<Simd\<u32, N>> for Simd\<u32, N>

```rust
impl<const N: usize> BitAnd<Simd<u32, N>> for Simd<u32, N>
where
  u32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitAnd\<Simd\<u64, N>> for Simd\<u64, N>

```rust
impl<const N: usize> BitAnd<Simd<u64, N>> for Simd<u64, N>
where
  u64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitAnd\<Simd\<usize, N>> for Simd\<usize, N>

```rust
impl<const N: usize> BitAnd<Simd<usize, N>> for Simd<usize, N>
where
  usize: SimdElement,
  LaneCount<N>: SupportedLaneCount,