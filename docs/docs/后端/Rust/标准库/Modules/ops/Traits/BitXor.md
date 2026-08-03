# Trait std::ops::BitXor

按位异或运算符 `^`。

请注意，默认情况下 `Rhs` 是 `Self`，但这不是强制性的

```rust
pub trait BitXor<Rhs = Self> {
    type Output;

    // Required method
    fn bitxor(self, rhs: Rhs) -> Self::Output;
}
```

`BitXor` 的实现，将 `^` 提升到 `bool` 周围的包装器中。

```rust
use std::ops::BitXor;

#[derive(Debug, PartialEq)]
struct Scalar(bool);

impl BitXor for Scalar {
    type Output = Self;

    // rhs 是表达式 `a ^ b` 的 "right-hand side"
    fn bitxor(self, rhs: Self) -> Self::Output {
        Self(self.0 ^ rhs.0)
    }
}

assert_eq!(Scalar(true) ^ Scalar(true), Scalar(false));
assert_eq!(Scalar(true) ^ Scalar(false), Scalar(true));
assert_eq!(Scalar(false) ^ Scalar(true), Scalar(true));
assert_eq!(Scalar(false) ^ Scalar(false), Scalar(false));
```

`BitXor` trait 的实现，用于 `Vec<bool>` 周围的包装器。

```rust
use std::ops::BitXor;

#[derive(Debug, PartialEq)]
struct BooleanVector(Vec<bool>);

impl BitXor for BooleanVector {
    type Output = Self;

    fn bitxor(self, Self(rhs): Self) -> Self::Output {
        let Self(lhs) = self;
        assert_eq!(lhs.len(), rhs.len());
        Self(
            lhs.iter()
                .zip(rhs.iter())
                .map(|(x, y)| *x ^ *y)
                .collect()
        )
    }
}

let bv1 = BooleanVector(vec![true, true, false, false]);
let bv2 = BooleanVector(vec![true, false, true, false]);
let expected = BooleanVector(vec![false, true, true, false]);
assert_eq!(bv1 ^ bv2, expected);
```





## Required Associated Types

### Output

应用 `^` 运算符后的结果类型。

```rust
type Output
```



## Required Methods

### bitxor

执行 `^` 操作。

```rust
fn bitxor(self, rhs: Rhs) -> Self::Output
```

**参数**：

- **rhs**：执行 ` ^` 操作的右值

**返回值**：返回两者异或后的值

```rust
assert_eq!(true ^ false, true);
assert_eq!(true ^ true, false);
assert_eq!(5u8 ^ 1u8, 4);
assert_eq!(5u8 ^ 2u8, 7);
```



## Implementors

### impl BitXor\<&bool> for &bool



### impl BitXor\<&bool> for bool



### impl BitXor\<&i8> for &i8



### impl BitXor\<&i8> for i8



### impl BitXor\<&i16> for &i16



### impl BitXor\<&i16> for i16



### impl BitXor\<&i32> for &i32



### impl BitXor\<&i32> for i32



### impl BitXor\<&i64> for &i64



### impl BitXor\<&i64> for i64



### impl BitXor\<&i128> for &i128



### impl BitXor\<&i128> for i128



### impl BitXor\<&isize> for &isize



### impl BitXor\<&isize> for isize



### impl BitXor\<&u8> for &u8



### impl BitXor\<&u8> for u8



### impl BitXor\<&u16> for &u16



### impl BitXor\<&u16> for u16



### impl BitXor\<&u32> for &u32



### impl BitXor\<&u32> for u32



### impl BitXor\<&u64> for &u64



### impl BitXor\<&u64> for u64



### impl BitXor\<&u128> for &u128



### impl BitXor\<&u128> for u128



### impl BitXor\<&usize> for &usize



### impl BitXor\<&usize> for usize



### impl BitXor\<&Saturating\<i8>> for &Saturating\<i8>



### impl BitXor\<&Saturating\<i8>> for Saturating\<i8>



### impl BitXor\<&Saturating\<i16>> for &Saturating\<i16>



### impl BitXor\<&Saturating\<i16>> for Saturating\<i16>



### impl BitXor\<&Saturating\<i32>> for &Saturating\<i32>



### impl BitXor\<&Saturating\<i32>> for Saturating\<i32>



### impl BitXor\<&Saturating\<i64>> for &Saturating\<i64>



### impl BitXor\<&Saturating\<i64>> for Saturating\<i64>



### impl BitXor\<&Saturating\<i128>> for &Saturating\<i128>



### impl BitXor\<&Saturating\<i128>> for Saturating\<i128>



### impl BitXor\<&Saturating\<isize>> for &Saturating\<isize>



### impl BitXor\<&Saturating\<isize>> for Saturating\<isize>



### impl BitXor\<&Saturating\<u8>> for &Saturating\<u8>



### impl BitXor\<&Saturating\<u8>> for Saturating\<u8>



### impl BitXor\<&Saturating\<u16>> for &Saturating\<u16>



### impl BitXor\<&Saturating\<u16>> for Saturating\<u16>



### impl BitXor\<&Saturating\<u32>> for &Saturating\<u32>



### impl BitXor\<&Saturating\<u32>> for Saturating\<u32>



### impl BitXor\<&Saturating\<u64>> for &Saturating\<u64>



### impl BitXor\<&Saturating\<u64>> for Saturating\<u64>



### impl BitXor\<&Saturating\<u128>> for &Saturating\<u128>



### impl BitXor\<&Saturating\<u128>> for Saturating\<u128>



### impl BitXor\<&Saturating\<usize>> for &Saturating\<usize>



### impl BitXor\<&Saturating\<usize>> for Saturating\<usize>



### impl BitXor\<&Wrapping\<i8>> for &Wrapping\<i8>



### impl BitXor\<&Wrapping\<i8>> for Wrapping\<i8>



### impl BitXor\<&Wrapping\<i16>> for &Wrapping\<i16>



### impl BitXor\<&Wrapping\<i16>> for Wrapping\<i16>



### impl BitXor\<&Wrapping\<i32>> for &Wrapping\<i32>



### impl BitXor\<&Wrapping\<i32>> for Wrapping\<i32>



### impl BitXor\<&Wrapping\<i64>> for &Wrapping\<i64>



### impl BitXor\<&Wrapping\<i64>> for Wrapping\<i64>



### impl BitXor\<&Wrapping\<i128>> for &Wrapping\<i128>



### impl BitXor\<&Wrapping\<i128>> for Wrapping\<i128>



### impl BitXor\<&Wrapping\<isize>> for &Wrapping\<isize>



### impl BitXor\<&Wrapping\<isize>> for Wrapping\<isize>



### impl BitXor\<&Wrapping\<u8>> for &Wrapping\<u8>



### impl BitXor\<&Wrapping\<u8>> for Wrapping\<u8>



### impl BitXor\<&Wrapping\<u16>> for &Wrapping\<u16>



### impl BitXor\<&Wrapping\<u16>> for Wrapping\<u16>



### impl BitXor\<&Wrapping\<u32>> for &Wrapping\<u32>



### impl BitXor\<&Wrapping\<u32>> for Wrapping\<u32>



### impl BitXor\<&Wrapping\<u64>> for &Wrapping\<u64>



### impl BitXor\<&Wrapping\<u64>> for Wrapping\<u64>



### impl BitXor\<&Wrapping\<u128>> for &Wrapping\<u128>



### impl BitXor\<&Wrapping\<u128>> for Wrapping\<u128>



### impl BitXor\<&Wrapping\<usize>> for &Wrapping\<usize>



### impl BitXor\<&Wrapping\<usize>> for Wrapping\<usize>



### impl BitXor\<bool> for bool



### impl BitXor\<i8> for i8



### impl BitXor\<i16> for i16



### impl BitXor\<i32> for i32



### impl BitXor\<i64> for i64



### impl BitXor\<i128> for i128



### impl BitXor\<isize> for isize



### impl BitXor\<u8> for u8



### impl BitXor\<u16> for u16



### impl BitXor\<u32> for u32



### impl BitXor\<u64> for u64



### impl BitXor\<u128> for u128



### impl BitXor\<usize> for usize



### impl BitXor\<Saturating\<i8>> for Saturating\<i8>



### impl BitXor\<Saturating\<i16>> for Saturating\<i16>



### impl BitXor\<Saturating\<i32>> for Saturating\<i32>



### impl BitXor\<Saturating\<i64>> for Saturating\<i64>



### impl BitXor\<Saturating\<i128>> for Saturating\<i128>



### impl BitXor\<Saturating\<isize>> for Saturating\<isize>



### impl BitXor\<Saturating\<u8>> for Saturating\<u8>



### impl BitXor\<Saturating\<u16>> for Saturating\<u16>



### impl BitXor\<Saturating\<u32>> for Saturating\<u32>



### impl BitXor\<Saturating\<u64>> for Saturating\<u64>



### impl BitXor\<Saturating\<u128>> for Saturating\<u128>



### impl BitXor\<Saturating\<usize>> for Saturating\<usize>



### impl BitXor\<Wrapping\<i8>> for Wrapping\<i8>



### impl BitXor\<Wrapping\<i16>> for Wrapping\<i16>



### impl BitXor\<Wrapping\<i32>> for Wrapping\<i32>



### impl BitXor\<Wrapping\<i64>> for Wrapping\<i64>



### impl BitXor\<Wrapping\<i128>> for Wrapping\<i128>



### impl BitXor\<Wrapping\<isize>> for Wrapping\<isize>



### impl BitXor\<Wrapping\<u8>> for Wrapping\<u8>



### impl BitXor\<Wrapping\<u16>> for Wrapping\<u16>



### impl BitXor\<Wrapping\<u32>> for Wrapping\<u32>



### impl BitXor\<Wrapping\<u64>> for Wrapping\<u64>



### impl BitXor\<Wrapping\<u128>> for Wrapping\<u128>



### impl BitXor\<Wrapping\<usize>> for Wrapping\<usize>



### impl\<'a> BitXor\<bool> for &'a bool



### impl\<'a> BitXor\<i8> for &'a i8



### impl\<'a> BitXor\<i16> for &'a i16



### impl\<'a> BitXor\<i32> for &'a i32



### impl\<'a> BitXor\<i64> for &'a i64



### impl\<'a> BitXor\<i128> for &'a i128



### impl\<'a> BitXor\<isize> for &'a isize



### impl\<'a> BitXor\<u8> for &'a u8



### impl\<'a> BitXor\<u16> for &'a u16



### impl\<'a> BitXor\<u32> for &'a u32



### impl\<'a> BitXor\<u64> for &'a u64



### impl\<'a> BitXor\<u128> for &'a u128



### impl\<'a> BitXor\<usize> for &'a usize



### impl\<'a> BitXor\<Saturating\<i8>> for &'a Saturating\<i8>



### impl\<'a> BitXor\<Saturating\<i16>> for &'a Saturating\<i16>



### impl\<'a> BitXor\<Saturating\<i32>> for &'a Saturating\<i32>



### impl\<'a> BitXor\<Saturating\<i64>> for &'a Saturating\<i64>



### impl\<'a> BitXor\<Saturating\<i128>> for &'a Saturating\<i128>



### impl\<'a> BitXor\<Saturating\<isize>> for &'a Saturating\<isize>



### impl\<'a> BitXor\<Saturating\<u8>> for &'a Saturating\<u8>



### impl\<'a> BitXor\<Saturating\<u16>> for &'a Saturating\<u16>



### impl\<'a> BitXor\<Saturating\<u32>> for &'a Saturating\<u32>



### impl\<'a> BitXor\<Saturating\<u64>> for &'a Saturating\<u64>



### impl\<'a> BitXor\<Saturating\<u128>> for &'a Saturating\<u128>



### impl\<'a> BitXor\<Saturating\<usize>> for &'a Saturating\<usize>



### impl\<'a> BitXor\<Wrapping\<i8>> for &'a Wrapping\<i8>



### impl\<'a> BitXor\<Wrapping\<i16>> for &'a Wrapping\<i16>



### impl\<'a> BitXor\<Wrapping\<i32>> for &'a Wrapping\<i32>



### impl\<'a> BitXor\<Wrapping\<i64>> for &'a Wrapping\<i64>



### impl\<'a> BitXor\<Wrapping\<i128>> for &'a Wrapping\<i128>



### impl\<'a> BitXor\<Wrapping\<isize>> for &'a Wrapping\<isize>



### impl\<'a> BitXor\<Wrapping\<u8>> for &'a Wrapping\<u8>



### impl\<'a> BitXor\<Wrapping\<u16>> for &'a Wrapping\<u16>



### impl\<'a> BitXor\<Wrapping\<u32>> for &'a Wrapping\<u32>



### impl\<'a> BitXor\<Wrapping\<u64>> for &'a Wrapping\<u64>



### impl\<'a> BitXor\<Wrapping\<u128>> for &'a Wrapping\<u128>



### impl\<'a> BitXor\<Wrapping\<usize>> for &'a Wrapping\<usize>



### impl<'lhs, 'rhs, T, const LANES: usize> BitXor<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>

```rust
impl<'lhs, 'rhs, T, const LANES: usize> BitXor<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: BitXor<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, A> BitXor<&BTreeSet<T, A>> for &BTreeSet<T, A>

```rust
impl<T, A> BitXor<&BTreeSet<T, A>> for &BTreeSet<T, A>
where
  T: Ord + Clone,
  A: Allocator + Clone,
```



### impl<T, S> BitXor<&HashSet<T, S>> for &HashSet<T, S>

```rust
impl<T, S> BitXor<&HashSet<T, S>> for &HashSet<T, S>
where
  T: Eq + Hash + Clone,
  S: BuildHasher + Default,
```



### impl<T, const LANES: usize> BitXor<&Simd<T, LANES>> for Simd<T, LANES>

```rust
impl<T, const LANES: usize> BitXor<&Simd<T, LANES>> for Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: BitXor<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> BitXor\<bool> for Mask<T, LANES>

```rust
impl<T, const LANES: usize> BitXor<bool> for Mask<T, LANES>
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> BitXor<Mask<T, LANES>> for bool

```rust
impl<T, const LANES: usize> BitXor<Mask<T, LANES>> for bool
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> BitXor<Mask<T, LANES>> for Mask<T, LANES>

```rust
impl<T, const LANES: usize> BitXor<Mask<T, LANES>> for Mask<T, LANES>
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> BitXor<Simd<T, LANES>> for &Simd<T, LANES>

```rust
impl<T, const LANES: usize> BitXor<Simd<T, LANES>> for &Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: BitXor<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const N: usize> BitXor<Simd<i8, N>> for Simd<i8, N>

```rust
impl<const N: usize> BitXor<Simd<i8, N>> for Simd<i8, N>
where
  i8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitXor<Simd<i16, N>> for Simd<i16, N>

```rust
impl<const N: usize> BitXor<Simd<i16, N>> for Simd<i16, N>
where
  i16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitXor<Simd<i32, N>> for Simd<i32, N>

```rust
impl<const N: usize> BitXor<Simd<i32, N>> for Simd<i32, N>
where
  i32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitXor<Simd<i64, N>> for Simd<i64, N>

```rust
impl<const N: usize> BitXor<Simd<i64, N>> for Simd<i64, N>
where
  i64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitXor<Simd<isize, N>> for Simd<isize, N>

```rust
impl<const N: usize> BitXor<Simd<isize, N>> for Simd<isize, N>
where
  isize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitXor<Simd<u8, N>> for Simd<u8, N>

```rust
impl<const N: usize> BitXor<Simd<u8, N>> for Simd<u8, N>
where
  u8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitXor<Simd<u16, N>> for Simd<u16, N>

```rust
impl<const N: usize> BitXor<Simd<u16, N>> for Simd<u16, N>
where
  u16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitXor<Simd<u32, N>> for Simd<u32, N>

```rust
impl<const N: usize> BitXor<Simd<u32, N>> for Simd<u32, N>
where
  u32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitXor<Simd<u64, N>> for Simd<u64, N>

```rust
impl<const N: usize> BitXor<Simd<u64, N>> for Simd<u64, N>
where
  u64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitXor<Simd<usize, N>> for Simd<usize, N>

```rust
impl<const N: usize> BitXor<Simd<usize, N>> for Simd<usize, N>
where
  usize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

