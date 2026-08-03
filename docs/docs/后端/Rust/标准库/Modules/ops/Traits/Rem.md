# Trait std::ops::Rem

余数运算符 `%`。

请注意，默认情况下 `Rhs` 是 `Self`，但这不是强制性的。

```rust
pub trait Rem<Rhs = Self> {
    type Output;

    // Required method
    fn rem(self, rhs: Rhs) -> Self::Output;
}
```

本示例在 `SplitSlice` 对象上实现 `Rem`。 实现 `Rem` 后，可以使用 `%` 运算符将其拆分为给定长度的相等切片后，找出切片的其余元素。

```rust
use std::ops::Rem;

#[derive(PartialEq, Debug)]
struct SplitSlice<'a, T> {
    slice: &'a [T],
}

impl<'a, T> Rem<usize> for SplitSlice<'a, T> {
    type Output = Self;

    fn rem(self, modulus: usize) -> Self::Output {
        let len = self.slice.len();
        let rem = len % modulus;
        let start = len - rem;
        Self {slice: &self.slice[start..]}
    }
}

// 如果将 &[0，1、2、3、4、5、6、7] 分成大小为 3 的切片，则其余部分将为 &[6，7]。
assert_eq!(SplitSlice { slice: &[0, 1, 2, 3, 4, 5, 6, 7] } % 3,
           SplitSlice { slice: &[6, 7] });
```



## Required Associated Types

### Output

应用 `%` 运算符后的结果类型。

```rust
type Output
```



## Required Methods

### rem

```rust
fn rem(self, rhs: Rhs) -> Self::Output
```

**参数**：

- **rhs**：执行 ` %` 操作的右值

**返回值**：返回取余后的值

```rust
assert_eq!(12 % 10, 2);
```

### 

## Implementors

### impl Rem\<&f32> for &f32



### impl Rem\<&f32> for f32



### impl Rem\<&f64> for &f64



### impl Rem\<&f64> for f64



### impl Rem\<&i8> for &i8



### impl Rem\<&i8> for i8



### impl Rem\<&i16> for &i16



### impl Rem\<&i16> for i16



### impl Rem\<&i32> for &i32



### impl Rem\<&i32> for i32



### impl Rem\<&i64> for &i64



### impl Rem\<&i64> for i64



### impl Rem\<&i128> for &i128



### impl Rem\<&i128> for i128



### impl Rem\<&isize> for &isize



### impl Rem\<&isize> for isize



### impl Rem\<&u8> for &u8



### impl Rem\<&u8> for u8



### impl Rem\<&u16> for &u16



### impl Rem\<&u16> for u16



### impl Rem\<&u32> for &u32



### impl Rem\<&u32> for u32



### impl Rem\<&u64> for &u64



### impl Rem\<&u64> for u64



### impl Rem\<&u128> for &u128



### impl Rem\<&u128> for u128



### impl Rem\<&usize> for &usize



### impl Rem\<&usize> for usize



### impl Rem\<&Saturating\<i8>> for &Saturating\<i8>



### impl Rem\<&Saturating\<i8>> for Saturating\<i8>



### impl Rem\<&Saturating\<i16>> for &Saturating\<i16>



### impl Rem\<&Saturating\<i16>> for Saturating\<i16>



### impl Rem\<&Saturating\<i32>> for &Saturating\<i32>



### impl Rem\<&Saturating\<i32>> for Saturating\<i32>



### impl Rem\<&Saturating\<i64>> for &Saturating\<i64>



### impl Rem\<&Saturating\<i64>> for Saturating\<i64>



### impl Rem\<&Saturating\<i128>> for &Saturating\<i128>



### impl Rem\<&Saturating\<i128>> for Saturating\<i128>



### impl Rem\<&Saturating\<isize>> for &Saturating\<isize>



### impl Rem\<&Saturating\<isize>> for Saturating\<isize>



### impl Rem\<&Saturating\<u8>> for &Saturating\<u8>



### impl Rem\<&Saturating\<u8>> for Saturating\<u8>



### impl Rem\<&Saturating\<u16>> for &Saturating\<u16>



### impl Rem\<&Saturating\<u16>> for Saturating\<u16>



### impl Rem\<&Saturating\<u32>> for &Saturating\<u32>



### impl Rem\<&Saturating\<u32>> for Saturating\<u32>



### impl Rem\<&Saturating\<u64>> for &Saturating\<u64>



### impl Rem\<&Saturating\<u64>> for Saturating\<u64>



### impl Rem\<&Saturating\<u128>> for &Saturating\<u128>



### impl Rem\<&Saturating\<u128>> for Saturating\<u128>



### impl Rem\<&Saturating\<usize>> for &Saturating\<usize>



### impl Rem\<&Saturating\<usize>> for Saturating\<usize>



### impl Rem\<&Wrapping\<i8>> for &Wrapping\<i8>



### impl Rem\<&Wrapping\<i8>> for Wrapping\<i8>



### impl Rem\<&Wrapping\<i16>> for &Wrapping\<i16>



### impl Rem\<&Wrapping\<i16>> for Wrapping\<i16>



### impl Rem\<&Wrapping\<i32>> for &Wrapping\<i32>



### impl Rem\<&Wrapping\<i32>> for Wrapping\<i32>



### impl Rem\<&Wrapping\<i64>> for &Wrapping\<i64>



### impl Rem\<&Wrapping\<i64>> for Wrapping\<i64>



### impl Rem\<&Wrapping\<i128>> for &Wrapping\<i128>



### impl Rem\<&Wrapping\<i128>> for Wrapping\<i128>



### impl Rem\<&Wrapping\<isize>> for &Wrapping\<isize>



### impl Rem\<&Wrapping\<isize>> for Wrapping\<isize>



### impl Rem\<&Wrapping\<u8>> for &Wrapping\<u8>



### impl Rem\<&Wrapping\<u8>> for Wrapping\<u8>



### impl Rem\<&Wrapping\<u16>> for &Wrapping\<u16>



### impl Rem\<&Wrapping\<u16>> for Wrapping\<u16>



### impl Rem\<&Wrapping\<u32>> for &Wrapping\<u32>



### impl Rem\<&Wrapping\<u32>> for Wrapping\<u32>



### impl Rem\<&Wrapping\<u64>> for &Wrapping\<u64>



### impl Rem\<&Wrapping\<u64>> for Wrapping\<u64>



### impl Rem\<&Wrapping\<u128>> for &Wrapping\<u128>



### impl Rem\<&Wrapping\<u128>> for Wrapping\<u128>



### impl Rem\<&Wrapping\<usize>> for &Wrapping\<usize>



### impl Rem\<&Wrapping\<usize>> for Wrapping\<usize>



### impl Rem\<f32> for f32



### impl Rem\<f64> for f64



### impl Rem\<i8> for i8



### impl Rem\<i16> for i16



### impl Rem\<i32> for i32



### impl Rem\<i64> for i64



### impl Rem\<i128> for i128



### impl Rem\<isize> for isize



### impl Rem\<u8> for u8



### impl Rem\<u16> for u16



### impl Rem\<u32> for u32



### impl Rem\<u64> for u64



### impl Rem\<u128> for u128



### impl Rem\<usize> for usize



### impl Rem\<NonZeroU8> for u8



### impl Rem\<NonZeroU16> for u16



### impl Rem\<NonZeroU32> for u32



### impl Rem\<NonZeroU64> for u64



### impl Rem\<NonZeroU128> for u128



### impl Rem\<NonZeroUsize> for usize



### impl Rem\<Saturating\<i8>> for Saturating\<i8>



### impl Rem\<Saturating\<i16>> for Saturating\<i16>



### impl Rem\<Saturating\<i32>> for Saturating\<i32>



### impl Rem\<Saturating\<i64>> for Saturating\<i64>



### impl Rem\<Saturating\<i128>> for Saturating\<i128>



### impl Rem\<Saturating\<isize>> for Saturating\<isize>



### impl Rem\<Saturating\<u8>> for Saturating\<u8>



### impl Rem\<Saturating\<u16>> for Saturating\<u16>



### impl Rem\<Saturating\<u32>> for Saturating\<u32>



### impl Rem\<Saturating\<u64>> for Saturating\<u64>



### impl Rem\<Saturating\<u128>> for Saturating\<u128>



### impl Rem\<Saturating\<usize>> for Saturating\<usize>



### impl Rem\<Wrapping\<i8>> for Wrapping\<i8>



### impl Rem\<Wrapping\<i16>> for Wrapping\<i16>



### impl Rem\<Wrapping\<i32>> for Wrapping\<i32>



### impl Rem\<Wrapping\<i64>> for Wrapping\<i64>



### impl Rem\<Wrapping\<i128>> for Wrapping\<i128>



### impl Rem\<Wrapping\<isize>> for Wrapping\<isize>



### impl Rem\<Wrapping\<u8>> for Wrapping\<u8>



### impl Rem\<Wrapping\<u16>> for Wrapping\<u16>



### impl Rem\<Wrapping\<u32>> for Wrapping\<u32>



### impl Rem\<Wrapping\<u64>> for Wrapping\<u64>



### impl Rem\<Wrapping\<u128>> for Wrapping\<u128>



### impl Rem\<Wrapping\<usize>> for Wrapping\<usize>



### impl\<'a> Rem\<f32> for &'a f32



### impl\<'a> Rem\<f64> for &'a f64



### impl\<'a> Rem\<i8> for &'a i8



### impl\<'a> Rem\<i16> for &'a i16



### impl\<'a> Rem\<i32> for &'a i32



### impl\<'a> Rem\<i64> for &'a i64



### impl\<'a> Rem\<i128> for &'a i128



### impl\<'a> Rem\<isize> for &'a isize



### impl\<'a> Rem\<u8> for &'a u8



### impl\<'a> Rem\<u16> for &'a u16



### impl\<'a> Rem\<u32> for &'a u32



### impl\<'a> Rem\<u64> for &'a u64



### impl\<'a> Rem\<u128> for &'a u128



### impl\<'a> Rem\<usize> for &'a usize



### impl\<'a> Rem\<Saturating\<i8>> for &'a Saturating\<i8>



### impl\<'a> Rem\<Saturating\<i16>> for &'a Saturating\<i16>



### impl\<'a> Rem\<Saturating\<i32>> for &'a Saturating\<i32>



### impl\<'a> Rem\<Saturating\<i64>> for &'a Saturating\<i64>



### impl\<'a> Rem\<Saturating\<i128>> for &'a Saturating\<i128>



### impl\<'a> Rem\<Saturating\<isize>> for &'a Saturating\<isize>



### impl\<'a> Rem\<Saturating\<u8>> for &'a Saturating\<u8>



### impl\<'a> Rem\<Saturating\<u16>> for &'a Saturating\<u16>



### impl\<'a> Rem\<Saturating\<u32>> for &'a Saturating\<u32>



### impl\<'a> Rem\<Saturating\<u64>> for &'a Saturating\<u64>



### impl\<'a> Rem\<Saturating\<u128>> for &'a Saturating\<u128>



### impl\<'a> Rem\<Saturating\<usize>> for &'a Saturating\<usize>



### impl\<'a> Rem\<Wrapping\<i8>> for &'a Wrapping\<i8>



### impl\<'a> Rem\<Wrapping\<i16>> for &'a Wrapping\<i16>



### impl\<'a> Rem\<Wrapping\<i32>> for &'a Wrapping\<i32>



### impl\<'a> Rem\<Wrapping\<i64>> for &'a Wrapping\<i64>



### impl\<'a> Rem\<Wrapping\<i128>> for &'a Wrapping\<i128>



### impl\<'a> Rem\<Wrapping\<isize>> for &'a Wrapping\<isize>



### impl\<'a> Rem\<Wrapping\<u8>> for &'a Wrapping\<u8>



### impl\<'a> Rem\<Wrapping\<u16>> for &'a Wrapping\<u16>



### impl\<'a> Rem\<Wrapping\<u32>> for &'a Wrapping\<u32>



### impl\<'a> Rem\<Wrapping\<u64>> for &'a Wrapping\<u64>



### impl\<'a> Rem\<Wrapping\<u128>> for &'a Wrapping\<u128>



### impl\<'a> Rem\<Wrapping\<usize>> for &'a Wrapping\<usize>



### impl<'lhs, 'rhs, T, const LANES: usize> Rem<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>

```rust
impl<'lhs, 'rhs, T, const LANES: usize> Rem<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Rem<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> Rem<&Simd<T, LANES>> for Simd<T, LANES>

```rust
impl<T, const LANES: usize> Rem<&Simd<T, LANES>> for Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Rem<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> Rem<Simd<T, LANES>> for &Simd<T, LANES>

```rust
impl<T, const LANES: usize> Rem<Simd<T, LANES>> for &Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Rem<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const N: usize> Rem<Simd<f32, N>> for Simd<f32, N>

```rust
impl<const N: usize> Rem<Simd<f32, N>> for Simd<f32, N>
where
  f32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Rem<Simd<f64, N>> for Simd<f64, N>

```rust
impl<const N: usize> Rem<Simd<f64, N>> for Simd<f64, N>
where
  f64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Rem<Simd<i8, N>> for Simd<i8, N>

```rust
impl<const N: usize> Rem<Simd<i8, N>> for Simd<i8, N>
where
  i8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Rem<Simd<i16, N>> for Simd<i16, N>

```rust
impl<const N: usize> Rem<Simd<i16, N>> for Simd<i16, N>
where
  i16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Rem<Simd<i32, N>> for Simd<i32, N>

```rust
impl<const N: usize> Rem<Simd<i32, N>> for Simd<i32, N>
where
  i32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Rem<Simd<i64, N>> for Simd<i64, N>

```rust
impl<const N: usize> Rem<Simd<i64, N>> for Simd<i64, N>
where
  i64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Rem<Simd<isize, N>> for Simd<isize, N>

```rust
impl<const N: usize> Rem<Simd<isize, N>> for Simd<isize, N>
where
  isize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Rem<Simd<u8, N>> for Simd<u8, N>

```rust
impl<const N: usize> Rem<Simd<u8, N>> for Simd<u8, N>
where
  u8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Rem<Simd<u16, N>> for Simd<u16, N>

```rust
impl<const N: usize> Rem<Simd<u16, N>> for Simd<u16, N>
where
  u16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Rem<Simd<u32, N>> for Simd<u32, N>

```rust
impl<const N: usize> Rem<Simd<u32, N>> for Simd<u32, N>
where
  u32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Rem<Simd<u64, N>> for Simd<u64, N>

```rust
impl<const N: usize> Rem<Simd<u64, N>> for Simd<u64, N>
where
  u64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Rem<Simd<usize, N>> for Simd<usize, N>

```rust
impl<const N: usize> Rem<Simd<usize, N>> for Simd<usize, N>
where
  usize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
