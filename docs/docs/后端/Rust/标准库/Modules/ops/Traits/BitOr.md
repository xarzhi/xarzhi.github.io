# Trait std::ops::BitOr

按位或运算符 `|`。

请注意，默认情况下 `Rhs` 是 `Self`，但这不是强制性的。

```rust
pub trait BitOr<Rhs = Self> {
    type Output;

    // Required method
    fn bitor(self, rhs: Rhs) -> Self::Output;
}
```

`BitOr` 的实现，用于围绕 `bool` 的包装。

```rust
use std::ops::BitOr;

#[derive(Debug, PartialEq)]
struct Scalar(bool);

impl BitOr for Scalar {
    type Output = Self;

    // rhs 是表达式 `a | b` 的 "right-hand side"
    fn bitor(self, rhs: Self) -> Self::Output {
        Self(self.0 | rhs.0)
    }
}

assert_eq!(Scalar(true) | Scalar(true), Scalar(true));
assert_eq!(Scalar(true) | Scalar(false), Scalar(true));
assert_eq!(Scalar(false) | Scalar(true), Scalar(true));
assert_eq!(Scalar(false) | Scalar(false), Scalar(false));
```

`BitOr` 的实现，用于围绕 `Vec<bool>` 的包装。

```rust
use std::ops::BitOr;

#[derive(Debug, PartialEq)]
struct BooleanVector(Vec<bool>);

impl BitOr for BooleanVector {
    type Output = Self;

    fn bitor(self, Self(rhs): Self) -> Self::Output {
        let Self(lhs) = self;
        assert_eq!(lhs.len(), rhs.len());
        Self(
            lhs.iter()
                .zip(rhs.iter())
                .map(|(x, y)| *x | *y)
                .collect()
        )
    }
}

let bv1 = BooleanVector(vec![true, true, false, false]);
let bv2 = BooleanVector(vec![true, false, true, false]);
let expected = BooleanVector(vec![true, true, true, false]);
assert_eq!(bv1 | bv2, expected);
```





## Required Associated Types

### Output

应用 `|` 运算符后的结果类型。

```rust
type Output
```



## Required Methods

### bitor

执行 `|` 操作。

```rust
fn bitor(self, rhs: Rhs) -> Self::Output
```

**参数**：

- **rhs**：执行 ` |` 操作的右值

**返回值**：返回两者或运算后的值

```rust
assert_eq!(true | false, true);
assert_eq!(false | false, false);
assert_eq!(5u8 | 1u8, 5);
assert_eq!(5u8 | 2u8, 7);
```



## Implementors

### impl BitOr\<&bool> for &bool



### impl BitOr\<&bool> for bool



### impl BitOr\<&i8> for &i8



### impl BitOr\<&i8> for i8



### impl BitOr\<&i16> for &i16



### impl BitOr\<&i16> for i16



### impl BitOr\<&i32> for &i32



### impl BitOr\<&i32> for i32



### impl BitOr\<&i64> for &i64



### impl BitOr\<&i64> for i64



### impl BitOr\<&i128> for &i128



### impl BitOr\<&i128> for i128



### impl BitOr\<&isize> for &isize



### impl BitOr\<&isize> for isize



### impl BitOr\<&u8> for &u8



### impl BitOr\<&u8> for u8



### impl BitOr\<&u16> for &u16



### impl BitOr\<&u16> for u16



### impl BitOr\<&u32> for &u32



### impl BitOr\<&u32> for u32



### impl BitOr\<&u64> for &u64



### impl BitOr\<&u64> for u64



### impl BitOr\<&u128> for &u128



### impl BitOr\<&u128> for u128



### impl BitOr\<&usize> for &usize



### impl BitOr\<&usize> for usize



### impl BitOr\<&Saturating\<i8>> for &Saturating\<i8>



### impl BitOr\<&Saturating\<i8>> for Saturating\<i8>



### impl BitOr\<&Saturating\<i16>> for &Saturating\<i16>



### impl BitOr\<&Saturating\<i16>> for Saturating\<i16>



### impl BitOr\<&Saturating\<i32>> for &Saturating\<i32>



### impl BitOr\<&Saturating\<i32>> for Saturating\<i32>



### impl BitOr\<&Saturating\<i64>> for &Saturating\<i64>



### impl BitOr\<&Saturating\<i64>> for Saturating\<i64>



### impl BitOr\<&Saturating\<i128>> for &Saturating\<i128>



### impl BitOr\<&Saturating\<i128>> for Saturating\<i128>



### impl BitOr\<&Saturating\<isize>> for &Saturating\<isize>



### impl BitOr\<&Saturating\<isize>> for Saturating\<isize>



### impl BitOr\<&Saturating\<u8>> for &Saturating\<u8>



### impl BitOr\<&Saturating\<u8>> for Saturating\<u8>



### impl BitOr\<&Saturating\<u16>> for &Saturating\<u16>



### impl BitOr\<&Saturating\<u16>> for Saturating\<u16>



### impl BitOr\<&Saturating\<u32>> for &Saturating\<u32>



### impl BitOr\<&Saturating\<u32>> for Saturating\<u32>



### impl BitOr\<&Saturating\<u64>> for &Saturating\<u64>



### impl BitOr\<&Saturating\<u64>> for Saturating\<u64>



### impl BitOr\<&Saturating\<u128>> for &Saturating\<u128>



### impl BitOr\<&Saturating\<u128>> for Saturating\<u128>



### impl BitOr\<&Saturating\<usize>> for &Saturating\<usize>



### impl BitOr\<&Saturating\<usize>> for Saturating\<usize>



### impl BitOr\<&Wrapping\<i8>> for &Wrapping\<i8>



### impl BitOr\<&Wrapping\<i8>> for Wrapping\<i8>



### impl BitOr\<&Wrapping\<i16>> for &Wrapping\<i16>



### impl BitOr\<&Wrapping\<i16>> for Wrapping\<i16>



### impl BitOr\<&Wrapping\<i32>> for &Wrapping\<i32>



### impl BitOr\<&Wrapping\<i32>> for Wrapping\<i32>



### impl BitOr\<&Wrapping\<i64>> for &Wrapping\<i64>



### impl BitOr\<&Wrapping\<i64>> for Wrapping\<i64>



### impl BitOr\<&Wrapping\<i128>> for &Wrapping\<i128>



### impl BitOr\<&Wrapping\<i128>> for Wrapping\<i128>



### impl BitOr\<&Wrapping\<isize>> for &Wrapping\<isize>



### impl BitOr\<&Wrapping\<isize>> for Wrapping\<isize>



### impl BitOr\<&Wrapping\<u8>> for &Wrapping\<u8>



### impl BitOr\<&Wrapping\<u8>> for Wrapping\<u8>



### impl BitOr\<&Wrapping\<u16>> for &Wrapping\<u16>



### impl BitOr\<&Wrapping\<u16>> for Wrapping\<u16>



### impl BitOr\<&Wrapping\<u32>> for &Wrapping\<u32>



### impl BitOr\<&Wrapping\<u32>> for Wrapping\<u32>



### impl BitOr\<&Wrapping\<u64>> for &Wrapping\<u64>



### impl BitOr\<&Wrapping\<u64>> for Wrapping\<u64>



### impl BitOr\<&Wrapping\<u128>> for &Wrapping\<u128>



### impl BitOr\<&Wrapping\<u128>> for Wrapping\<u128>



### impl BitOr\<&Wrapping\<usize>> for &Wrapping\<usize>



### impl BitOr\<&Wrapping\<usize>> for Wrapping\<usize>



### impl BitOr\<bool> for bool



### impl BitOr\<i8> for i8



### impl BitOr\<i8> for NonZeroI8



### impl BitOr\<i16> for i16



### impl BitOr\<i16> for NonZeroI16



### impl BitOr\<i32> for i32



### impl BitOr\<i32> for NonZeroI32



### impl BitOr\<i64> for i64



### impl BitOr\<i64> for NonZeroI64



### impl BitOr\<i128> for i128



### impl BitOr\<i128> for NonZeroI128



### impl BitOr\<isize> for isize



### impl BitOr\<isize> for NonZeroIsize



### impl BitOr\<u8> for u8



### impl BitOr\<u8> for NonZeroU8



### impl BitOr\<u16> for u16



### impl BitOr\<u16> for NonZeroU16



### impl BitOr\<u32> for u32



### impl BitOr\<u32> for NonZeroU32



### impl BitOr\<u64> for u64



### impl BitOr\<u64> for NonZeroU64



### impl BitOr\<u128> for u128



### impl BitOr\<u128> for NonZeroU128



### impl BitOr\<usize> for usize



### impl BitOr\<usize> for NonZeroUsize



### impl BitOr\<NonZeroI8> for i8



### impl BitOr\<NonZeroI8> for NonZeroI8



### impl BitOr\<NonZeroI16> for i16



### impl BitOr\<NonZeroI16> for NonZeroI16



### impl BitOr\<NonZeroI32> for i32



### impl BitOr\<NonZeroI32> for NonZeroI32



### impl BitOr\<NonZeroI64> for i64



### impl BitOr\<NonZeroI64> for NonZeroI64



### impl BitOr\<NonZeroI128> for i128



### impl BitOr\<NonZeroI128> for NonZeroI128



### impl BitOr\<NonZeroIsize> for isize



### impl BitOr\<NonZeroIsize> for NonZeroIsize



impl BitOr\<NonZeroU8> for u8



### impl BitOr\<NonZeroU8> for NonZeroU8



### impl BitOr\<NonZeroU16> for u16



### impl BitOr\<NonZeroU16> for NonZeroU16



### impl BitOr\<NonZeroU32> for u32



### impl BitOr\<NonZeroU32> for NonZeroU32



### impl BitOr\<NonZeroU64> for u64



### impl BitOr\<NonZeroU64> for NonZeroU64



### impl BitOr\<NonZeroU128> for u128



### impl BitOr\<NonZeroU128> for NonZeroU128



### impl BitOr\<NonZeroUsize> for usize



### impl BitOr\<NonZeroUsize> for NonZeroUsize



### impl BitOr\<Saturating\<i8>> for Saturating\<i8>



### impl BitOr\<Saturating\<i16>> for Saturating\<i16>



### impl BitOr\<Saturating\<i32>> for Saturating\<i32>



### impl BitOr\<Saturating\<i64>> for Saturating\<i64>



### impl BitOr\<Saturating\<i128>> for Saturating\<i128>



### impl BitOr\<Saturating\<isize>> for Saturating\<isize>



### impl BitOr\<Saturating\<u8>> for Saturating\<u8>



### impl BitOr\<Saturating\<u16>> for Saturating\<u16>



### impl BitOr\<Saturating\<u32>> for Saturating\<u32>



### impl BitOr\<Saturating\<u64>> for Saturating\<u64>



### impl BitOr\<Saturating\<u128>> for Saturating\<u128>



### impl BitOr\<Saturating\<usize>> for Saturating\<usize>



### impl BitOr\<Wrapping\<i8>> for Wrapping\<i8>



### impl BitOr\<Wrapping\<i16>> for Wrapping\<i16>



### impl BitOr\<Wrapping\<i32>> for Wrapping\<i32>



### impl BitOr\<Wrapping\<i64>> for Wrapping\<i64>



### impl BitOr\<Wrapping\<i128>> for Wrapping\<i128>



### impl BitOr\<Wrapping\<isize>> for Wrapping\<isize>



### impl BitOr\<Wrapping\<u8>> for Wrapping\<u8>



### impl BitOr\<Wrapping\<u16>> for Wrapping\<u16>



### impl BitOr\<Wrapping\<u32>> for Wrapping\<u32>



### impl BitOr\<Wrapping\<u64>> for Wrapping\<u64>



### impl BitOr\<Wrapping\<u128>> for Wrapping\<u128>



### impl BitOr\<Wrapping\<usize>> for Wrapping\<usize>



### impl\<'a> BitOr\<bool> for &'a bool



### impl\<'a> BitOr\<i8> for &'a i8

### 

### impl\<'a> BitOr\<i16> for &'a i16

### 

### impl\<'a> BitOr\<i32> for &'a i32

### 

### impl\<'a> BitOr\<i64> for &'a i64

### 

### impl\<'a> BitOr\<i128> for &'a i128

### 

### impl\<'a> BitOr\<isize> for &'a isize

### 

### impl\<'a> BitOr\<u8> for &'a u8

### 

### impl\<'a> BitOr\<u16> for &'a u16

### 

### impl\<'a> BitOr\<u32> for &'a u32

### 

### impl\<'a> BitOr\<u64> for &'a u64

### 

### impl\<'a> BitOr\<u128> for &'a u128

### 

### impl\<'a> BitOr\<usize> for &'a usize

### 

### impl\<'a> BitOr\<Saturating\<i8>> for &'a Saturating\<i8>

### 

### impl\<'a> BitOr\<Saturating\<i16>> for &'a Saturating\<i16>

### 

### impl\<'a> BitOr\<Saturating\<i32>> for &'a Saturating\<i32>



### impl\<'a> BitOr\<Saturating\<i64>> for &'a Saturating\<i64>



### impl\<'a> BitOr\<Saturating\<i128>> for &'a Saturating\<i128>



### impl\<'a> BitOr\<Saturating\<isize>> for &'a Saturating\<isize>



### impl\<'a> BitOr\<Saturating\<u8>> for &'a Saturating\<u8>



### impl\<'a> BitOr\<Saturating\<u16>> for &'a Saturating\<u16>



### impl\<'a> BitOr\<Saturating\<u32>> for &'a Saturating\<u32>



### impl\<'a> BitOr\<Saturating\<u64>> for &'a Saturating\<u64>



### impl\<'a> BitOr\<Saturating\<u128>> for &'a Saturating\<u128>



### impl\<'a> BitOr\<Saturating\<usize>> for &'a Saturating\<usize>



### impl\<'a> BitOr\<Wrapping\<i8>> for &'a Wrapping\<i8>



### impl\<'a> BitOr\<Wrapping\<i16>> for &'a Wrapping\<i16>



### impl\<'a> BitOr\<Wrapping\<i32>> for &'a Wrapping\<i32>



### impl\<'a> BitOr\<Wrapping\<i64>> for &'a Wrapping\<i64>



### impl\<'a> BitOr\<Wrapping\<i128>> for &'a Wrapping\<i128>



### impl\<'a> BitOr\<Wrapping\<isize>> for &'a Wrapping\<isize>



### impl\<'a> BitOr\<Wrapping\<u8>> for &'a Wrapping\<u8>



### impl\<'a> BitOr\<Wrapping\<u16>> for &'a Wrapping\<u16>



### impl\<'a> BitOr\<Wrapping\<u32>> for &'a Wrapping\<u32>



### impl\<'a> BitOr\<Wrapping\<u64>> for &'a Wrapping\<u64>



### impl\<'a> BitOr\<Wrapping\<u128>> for &'a Wrapping\<u128>



### impl\<'a> BitOr\<Wrapping\<usize>> for &'a Wrapping\<usize>



### impl\<'lhs, 'rhs, T, const LANES: usize> BitOr\<&'rhs Simd\<T, LANES>> for &'lhs Simd\<T, LANES>

```rust
impl<'lhs, 'rhs, T, const LANES: usize> BitOr<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: BitOr<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<T, A> BitOr\<&BTreeSet\<T, A>> for &BTreeSet\<T, A>

```rust
impl<T, A> BitOr<&BTreeSet<T, A>> for &BTreeSet<T, A>
where
  T: Ord + Clone,
  A: Allocator + Clone,
```



### impl\<T, S> BitOr\<&HashSet\<T, S>> for &HashSet\<T, S>

```rust
impl<T, S> BitOr<&HashSet<T, S>> for &HashSet<T, S>
where
  T: Eq + Hash + Clone,
  S: BuildHasher + Default,
```



### impl\<T, const LANES: usize> BitOr\<&Simd\<T, LANES>> for Simd\<T, LANES>

```rust
impl<T, const LANES: usize> BitOr<&Simd<T, LANES>> for Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: BitOr<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<T, const LANES: usize> BitOr\<bool> for Mask\<T, LANES>

```rust
impl<T, const LANES: usize> BitOr<bool> for Mask<T, LANES>
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<T, const LANES: usize> BitOr\<Mask\<T, LANES>> for bool

```rust
impl<T, const LANES: usize> BitOr<Mask<T, LANES>> for bool
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<T, const LANES: usize> BitOr\<Mask\<T, LANES>> for Mask\<T, LANES>

```rust
impl<T, const LANES: usize> BitOr<Mask<T, LANES>> for Mask<T, LANES>
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<T, const LANES: usize> BitOr\<Simd\<T, LANES>> for &Simd\<T, LANES>

```rust
impl<T, const LANES: usize> BitOr<Simd<T, LANES>> for &Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: BitOr<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const N: usize> BitOr\<Simd\<i8, N>> for Simd\<i8, N>

```rust
impl<const N: usize> BitOr<Simd<i8, N>> for Simd<i8, N>
where
  i8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitOr\<Simd\<i16, N>> for Simd\<i16, N>

```rust
impl<const N: usize> BitOr<Simd<i16, N>> for Simd<i16, N>
where
  i16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitOr\<Simd\<i32, N>> for Simd\<i32, N>

```rust
impl<const N: usize> BitOr<Simd<i32, N>> for Simd<i32, N>
where
  i32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitOr\<Simd\<i64, N>> for Simd\<i64, N>

```rust
impl<const N: usize> BitOr<Simd<i64, N>> for Simd<i64, N>
where
  i64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitOr\<Simd\<isize, N>> for Simd\<isize, N>

```rust
impl<const N: usize> BitOr<Simd<isize, N>> for Simd<isize, N>
where
  isize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitOr\<Simd\<u8, N>> for Simd\<u8, N>

```rust
impl<const N: usize> BitOr<Simd<u8, N>> for Simd<u8, N>
where
  u8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitOr\<Simd\<u16, N>> for Simd\<u16, N>

```rust
impl<const N: usize> BitOr<Simd<u16, N>> for Simd<u16, N>
where
  u16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitOr\<Simd\<u32, N>> for Simd\<u32, N>

```rust
impl<const N: usize> BitOr<Simd<u32, N>> for Simd<u32, N>
where
  u32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitOr\<Simd\<u64, N>> for Simd\<u64, N>

```rust
impl<const N: usize> BitOr<Simd<u64, N>> for Simd<u64, N>
where
  u64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> BitOr\<Simd\<usize, N>> for Simd\<usize, N>

```rust
impl<const N: usize> BitOr<Simd\<usize, N>> for Simd<usize, N>
where
  usize: SimdElement,
  LaneCount<N>: SupportedLaneCount,