# Trait std::ops::Sub

减法运算符 -。

请注意，默认情况下 Rhs 是 Self，但这不是强制性的。 例如，`std::time::SystemTime` 实现 `Sub<Duration>`，它允许以 `SystemTime = SystemTime - Duration` 形式进行操作。

```rust
pub trait Sub<Rhs = Self> {
    type Output;

    // Required method
    fn sub(self, rhs: Rhs) -> Self::Output;
}
```

points类型的相减

```rust
use std::ops::Sub;

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl Sub for Point {
    type Output = Self;

    fn sub(self, other: Self) -> Self::Output {
        Self {
            x: self.x - other.x,
            y: self.y - other.y,
        }
    }
}

assert_eq!(Point { x: 3, y: 3 } - Point { x: 2, y: 3 },
           Point { x: 1, y: 0 });
```

使用泛型实现 Sub

```rust
use std::ops::Sub;

#[derive(Debug, PartialEq)]
struct Point\<T> {
    x: T,
    y: T,
}

// 请注意，该实现使用关联类型 `Output`。
impl<T: Sub<Output = T>> Sub for Point<T> {
    type Output = Self;

    fn sub(self, other: Self) -> Self::Output {
        Point {
            x: self.x - other.x,
            y: self.y - other.y,
        }
    }
}

assert_eq!(Point { x: 2, y: 3 } - Point { x: 1, y: 0 },
           Point { x: 1, y: 3 });
```





## Required Associated Types

### Output

应用 `-` 运算符后的结果类型。

```rust
type Output
```



## Required Methods

### sub

```rust
fn sub(self, rhs: Rhs) -> Self::Output
```

**参数**：

- **rhs**：执行 ` -` 操作的右值

**返回值**：返回相减后的值

```rust
ssert_eq!(12 - 1, 11);
```

### 

## Implementors

### impl Sub\<&f32> for &f32



### impl Sub\<&f32> for f32



### impl Sub\<&f64> for &f64



### impl Sub\<&f64> for f64



### impl Sub\<&i8> for &i8



### impl Sub\<&i8> for i8



### impl Sub\<&i16> for &i16



### impl Sub\<&i16> for i16



### impl Sub\<&i32> for &i32



### impl Sub\<&i32> for i32



### impl Sub\<&i64> for &i64



### impl Sub\<&i64> for i64



### impl Sub\<&i128> for &i128



### impl Sub\<&i128> for i128



### impl Sub\<&isize> for &isize



### impl Sub\<&isize> for isize



### impl Sub\<&u8> for &u8



### impl Sub\<&u8> for u8



### impl Sub\<&u16> for &u16



### impl Sub\<&u16> for u16



### impl Sub\<&u32> for &u32



### impl Sub\<&u32> for u32



### impl Sub\<&u64> for &u64



### impl Sub\<&u64> for u64



### impl Sub\<&u128> for &u128



### impl Sub\<&u128> for u128



### impl Sub\<&usize> for &usize



### impl Sub\<&usize> for usize



### impl Sub\<&Saturating\<i8>> for &Saturating\<i8>



### impl Sub\<&Saturating\<i8>> for Saturating\<i8>



### impl Sub\<&Saturating\<i16>> for &Saturating\<i16>



### impl Sub\<&Saturating\<i16>> for Saturating\<i16>



### impl Sub\<&Saturating\<i32>> for &Saturating\<i32>



### impl Sub\<&Saturating\<i32>> for Saturating\<i32>



### impl Sub\<&Saturating\<i64>> for &Saturating\<i64>



### impl Sub\<&Saturating\<i64>> for Saturating\<i64>



### impl Sub\<&Saturating\<i128>> for &Saturating\<i128>



### impl Sub\<&Saturating\<i128>> for Saturating\<i128>



### impl Sub\<&Saturating\<isize>> for &Saturating\<isize>



### impl Sub\<&Saturating\<isize>> for Saturating\<isize>



### impl Sub\<&Saturating\<u8>> for &Saturating\<u8>



### impl Sub\<&Saturating\<u8>> for Saturating\<u8>



### impl Sub\<&Saturating\<u16>> for &Saturating\<u16>



### impl Sub\<&Saturating\<u16>> for Saturating\<u16>



### impl Sub\<&Saturating\<u32>> for &Saturating\<u32>



### impl Sub\<&Saturating\<u32>> for Saturating\<u32>



### impl Sub\<&Saturating\<u64>> for &Saturating\<u64>



### impl Sub\<&Saturating\<u64>> for Saturating\<u64>



### impl Sub\<&Saturating\<u128>> for &Saturating\<u128>



### impl Sub\<&Saturating\<u128>> for Saturating\<u128>



### impl Sub\<&Saturating\<usize>> for &Saturating\<usize>



### impl Sub\<&Saturating\<usize>> for Saturating\<usize>



### impl Sub\<&Wrapping\<i8>> for &Wrapping\<i8>



### impl Sub\<&Wrapping\<i8>> for Wrapping\<i8>



### impl Sub\<&Wrapping\<i16>> for &Wrapping\<i16>



### impl Sub\<&Wrapping\<i16>> for Wrapping\<i16>



### impl Sub\<&Wrapping\<i32>> for &Wrapping\<i32>



### impl Sub\<&Wrapping\<i32>> for Wrapping\<i32>



### impl Sub\<&Wrapping\<i64>> for &Wrapping\<i64>



### impl Sub\<&Wrapping\<i64>> for Wrapping\<i64>



### impl Sub\<&Wrapping\<i128>> for &Wrapping\<i128>



### impl Sub\<&Wrapping\<i128>> for Wrapping\<i128>



### impl Sub\<&Wrapping\<isize>> for &Wrapping\<isize>



### impl Sub\<&Wrapping\<isize>> for Wrapping\<isize>



### impl Sub\<&Wrapping\<u8>> for &Wrapping\<u8>



### impl Sub\<&Wrapping\<u8>> for Wrapping\<u8>



### impl Sub\<&Wrapping\<u16>> for &Wrapping\<u16>



### impl Sub\<&Wrapping\<u16>> for Wrapping\<u16>



### impl Sub\<&Wrapping\<u32>> for &Wrapping\<u32>



### impl Sub\<&Wrapping\<u32>> for Wrapping\<u32>



### impl Sub\<&Wrapping\<u64>> for &Wrapping\<u64>



### impl Sub\<&Wrapping\<u64>> for Wrapping\<u64>



### impl Sub\<&Wrapping\<u128>> for &Wrapping\<u128>



### impl Sub\<&Wrapping\<u128>> for Wrapping\<u128>



### impl Sub\<&Wrapping\<usize>> for &Wrapping\<usize>



### impl Sub\<&Wrapping\<usize>> for Wrapping\<usize>



### impl Sub\<f32> for f32



### impl Sub\<f64> for f64



### impl Sub\<i8> for i8



### impl Sub\<i16> for i16



### impl Sub\<i32> for i32



### impl Sub\<i64> for i64



### impl Sub\<i128> for i128



### impl Sub\<isize> for isize



### impl Sub\<u8> for u8



### impl Sub\<u16> for u16



### impl Sub\<u32> for u32



### impl Sub\<u64> for u64



### impl Sub\<u128> for u128



### impl Sub\<usize> for usize



### impl Sub\<Assume> for Assume



### impl Sub\<Saturating\<i8>> for Saturating\<i8>



### impl Sub\<Saturating\<i16>> for Saturating\<i16>



### impl Sub\<Saturating\<i32>> for Saturating\<i32>



### impl Sub\<Saturating\<i64>> for Saturating\<i64>



### impl Sub\<Saturating\<i128>> for Saturating\<i128>



### impl Sub\<Saturating\<isize>> for Saturating\<isize>



### impl Sub\<Saturating\<u8>> for Saturating\<u8>



### impl Sub\<Saturating\<u16>> for Saturating\<u16>



### impl Sub\<Saturating\<u32>> for Saturating\<u32>



### impl Sub\<Saturating\<u64>> for Saturating\<u64>



### impl Sub\<Saturating\<u128>> for Saturating\<u128>



### impl Sub\<Saturating\<usize>> for Saturating\<usize>



### impl Sub\<Wrapping\<i8>> for Wrapping\<i8>



### impl Sub\<Wrapping\<i16>> for Wrapping\<i16>



### impl Sub\<Wrapping\<i32>> for Wrapping\<i32>



### impl Sub\<Wrapping\<i64>> for Wrapping\<i64>



### impl Sub\<Wrapping\<i128>> for Wrapping\<i128>



### impl Sub\<Wrapping\<isize>> for Wrapping\<isize>



### impl Sub\<Wrapping\<u8>> for Wrapping\<u8>



### impl Sub\<Wrapping\<u16>> for Wrapping\<u16>



### impl Sub\<Wrapping\<u32>> for Wrapping\<u32>



### impl Sub\<Wrapping\<u64>> for Wrapping\<u64>



### impl Sub\<Wrapping\<u128>> for Wrapping\<u128>



### impl Sub\<Wrapping\<usize>> for Wrapping\<usize>



### impl Sub\<Duration> for Duration



### impl Sub\<Duration> for Instant



### impl Sub\<Duration> for SystemTime



### impl Sub\<Instant> for Instant



### impl\<'a> Sub\<f32> for &'a f32



### impl\<'a> Sub\<f64> for &'a f64



### impl\<'a> Sub\<i8> for &'a i8



### impl\<'a> Sub\<i16> for &'a i16



### impl\<'a> Sub\<i32> for &'a i32



### impl\<'a> Sub\<i64> for &'a i64



### impl\<'a> Sub\<i128> for &'a i128



### impl\<'a> Sub\<isize> for &'a isize



### impl\<'a> Sub\<u8> for &'a u8



### impl\<'a> Sub\<u16> for &'a u16



### impl\<'a> Sub\<u32> for &'a u32



### impl\<'a> Sub\<u64> for &'a u64



### impl\<'a> Sub\<u128> for &'a u128



### impl\<'a> Sub\<usize> for &'a usize



### impl\<'a> Sub\<Saturating\<i8>> for &'a Saturating\<i8>



### impl\<'a> Sub\<Saturating\<i16>> for &'a Saturating\<i16>



### impl\<'a> Sub\<Saturating\<i32>> for &'a Saturating\<i32>



### impl\<'a> Sub\<Saturating\<i64>> for &'a Saturating\<i64>



### impl\<'a> Sub\<Saturating\<i128>> for &'a Saturating\<i128>



### impl\<'a> Sub\<Saturating\<isize>> for &'a Saturating\<isize>



### impl\<'a> Sub\<Saturating\<u8>> for &'a Saturating\<u8>



### impl\<'a> Sub\<Saturating\<u16>> for &'a Saturating\<u16>



### impl\<'a> Sub\<Saturating\<u32>> for &'a Saturating\<u32>



### impl\<'a> Sub\<Saturating\<u64>> for &'a Saturating\<u64>



### impl\<'a> Sub\<Saturating\<u128>> for &'a Saturating\<u128>



### impl\<'a> Sub\<Saturating\<usize>> for &'a Saturating\<usize>



### impl\<'a> Sub\<Wrapping\<i8>> for &'a Wrapping\<i8>



### impl\<'a> Sub\<Wrapping\<i16>> for &'a Wrapping\<i16>



### impl\<'a> Sub\<Wrapping\<i32>> for &'a Wrapping\<i32>



### impl\<'a> Sub\<Wrapping\<i64>> for &'a Wrapping\<i64>



### impl\<'a> Sub\<Wrapping\<i128>> for &'a Wrapping\<i128>



### impl\<'a> Sub\<Wrapping\<isize>> for &'a Wrapping\<isize>



### impl\<'a> Sub\<Wrapping\<u8>> for &'a Wrapping\<u8>



### impl\<'a> Sub\<Wrapping\<u16>> for &'a Wrapping\<u16>



### impl\<'a> Sub\<Wrapping\<u32>> for &'a Wrapping\<u32>



### impl\<'a> Sub\<Wrapping\<u64>> for &'a Wrapping\<u64>



### impl\<'a> Sub\<Wrapping\<u128>> for &'a Wrapping\<u128>



### impl\<'a> Sub\<Wrapping\<usize>> for &'a Wrapping\<usize>



### impl<'lhs, 'rhs, T, const LANES: usize> Sub<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>

```rust
impl<'lhs, 'rhs, T, const LANES: usize> Sub<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Sub<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, A> Sub<&BTreeSet<T, A>> for &BTreeSet<T, A>

```rust
impl<T, A> Sub<&BTreeSet<T, A>> for &BTreeSet<T, A>
where
  T: Ord + Clone,
  A: Allocator + Clone,
```



### impl<T, S> Sub<&HashSet<T, S>> for &HashSet<T, S>

```rust
impl<T, S> Sub<&HashSet<T, S>> for &HashSet<T, S>
where
  T: Eq + Hash + Clone,
  S: BuildHasher + Default,
```



### impl<T, const LANES: usize> Sub<&Simd<T, LANES>> for Simd<T, LANES>

```rust
impl<T, const LANES: usize> Sub<&Simd<T, LANES>> for Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Sub<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> Sub<Simd<T, LANES>> for &Simd<T, LANES>

```rust
impl<T, const LANES: usize> Sub<Simd<T, LANES>> for &Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Sub<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const N: usize> Sub<Simd<f32, N>> for Simd<f32, N>

```rust
impl<const N: usize> Sub<Simd<f32, N>> for Simd<f32, N>
where
  f32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Sub<Simd<f64, N>> for Simd<f64, N>

```rust
impl<const N: usize> Sub<Simd<f64, N>> for Simd<f64, N>
where
  f64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Sub<Simd<i8, N>> for Simd<i8, N>

```rust
impl<const N: usize> Sub<Simd<i8, N>> for Simd<i8, N>
where
  i8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Sub<Simd<i16, N>> for Simd<i16, N>

```rust
impl<const N: usize> Sub<Simd<i16, N>> for Simd<i16, N>
where
  i16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Sub<Simd<i32, N>> for Simd<i32, N>

```rust
impl<const N: usize> Sub<Simd<i32, N>> for Simd<i32, N>
where
  i32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Sub<Simd<i64, N>> for Simd<i64, N>

```rust
impl<const N: usize> Sub<Simd<i64, N>> for Simd<i64, N>
where
  i64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Sub<Simd<isize, N>> for Simd<isize, N>

```rust
impl<const N: usize> Sub<Simd<isize, N>> for Simd<isize, N>
where
  isize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Sub<Simd<u8, N>> for Simd<u8, N>

```rust
impl<const N: usize> Sub<Simd<u8, N>> for Simd<u8, N>
where
  u8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Sub<Simd<u16, N>> for Simd<u16, N>

```rust
impl<const N: usize> Sub<Simd<u16, N>> for Simd<u16, N>
where
  u16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Sub<Simd<u32, N>> for Simd<u32, N>

```rust
impl<const N: usize> Sub<Simd<u32, N>> for Simd<u32, N>
where
  u32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Sub<Simd<u64, N>> for Simd<u64, N>

```rust
impl<const N: usize> Sub<Simd<u64, N>> for Simd<u64, N>
where
  u64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Sub<Simd<usize, N>> for Simd<usize, N>

```rust
impl<const N: usize> Sub<Simd<usize, N>> for Simd<usize, N>
where
  usize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
