# Trait std::ops::Div

除法运算符 `/`。

请注意，默认情况下 `Rhs` 是 `Self`，但这不是强制性的。

```rust
pub trait Div<Rhs = Self> {
    type Output;

    // Required method
    fn div(self, rhs: Rhs) -> Self::Output;
}
```

Dividable 的有理数

```rust
use std::ops::Div;

// 根据算术的基本定理，最低限度的有理数是唯一的。
// 因此，通过将 `Rational` 保持为简化形式，我们可以得出 `Eq` 和 `PartialEq`。
#[derive(Debug, Eq, PartialEq)]
struct Rational {
    numerator: usize,
    denominator: usize,
}

impl Rational {
    fn new(numerator: usize, denominator: usize) -> Self {
        if denominator == 0 {
            panic!("Zero is an invalid denominator!");
        }

        // 用最大公约数除以最低条件。
        let gcd = gcd(numerator, denominator);
        Self {
            numerator: numerator / gcd,
            denominator: denominator / gcd,
        }
    }
}

impl Div for Rational {
    // 有理数的除法是封闭的运算。
    type Output = Self;

    fn div(self, rhs: Self) -> Self::Output {
        if rhs.numerator == 0 {
            panic!("Cannot divide by zero-valued `Rational`!");
        }

        let numerator = self.numerator * rhs.denominator;
        let denominator = self.denominator * rhs.numerator;
        Self::new(numerator, denominator)
    }
}

// 欧几里德 (Euclid) 具有 2000 年历史的算法，用于找到最大公约数。
fn gcd(x: usize, y: usize) -> usize {
    let mut x = x;
    let mut y = y;
    while y != 0 {
        let t = y;
        y = x % y;
        x = t;
    }
    x
}

assert_eq!(Rational::new(1, 2), Rational::new(2, 4));
assert_eq!(Rational::new(1, 2) / Rational::new(3, 4),
           Rational::new(2, 3));
```

将 `vectors` 除以线性代数中的标量

```rust
use std::ops::Div;

struct Scalar { value: f32 }

#[derive(Debug, PartialEq)]
struct Vector { value: Vec<f32> }

impl Div<Scalar> for Vector {
    type Output = Self;

    fn div(self, rhs: Scalar) -> Self::Output {
        Self { value: self.value.iter().map(|v| v / rhs.value).collect() }
    }
}

let scalar = Scalar { value: 2f32 };
let vector = Vector { value: vec![2f32, 4f32, 6f32] };
assert_eq!(vector / scalar, Vector { value: vec![1f32, 2f32, 3f32] });
```





## Required Associated Types

### Output

应用 `/` 运算符后的结果类型。

```rust
type Output
```



## Required Methods

### div

```rust
fn div(self, rhs: Rhs) -> Self::Output
```

**参数**：

- **rhs**：执行 ` /` 操作的右值

**返回值**：返回两者除后的值

```rust
assert_eq!(12 / 2, 6);
```



## Implementors

### impl Div\<&f32> for &f32



### impl Div\<&f32> for f32



### impl Div\<&f64> for &f64



### impl Div\<&f64> for f64



### impl Div\<&i8> for &i8



### impl Div\<&i8> for i8



### impl Div\<&i16> for &i16



### impl Div\<&i16> for i16



### impl Div\<&i32> for &i32



### impl Div\<&i32> for i32



### impl Div\<&i64> for &i64



### impl Div\<&i64> for i64



### impl Div\<&i128> for &i128



### impl Div\<&i128> for i128



### impl Div\<&isize> for &isize



### impl Div\<&isize> for isize



### impl Div\<&u8> for &u8



### impl Div\<&u8> for u8



### impl Div\<&u16> for &u16



### impl Div\<&u16> for u16



### impl Div\<&u32> for &u32



### impl Div\<&u32> for u32



### impl Div\<&u64> for &u64



### impl Div\<&u64> for u64



### impl Div\<&u128> for &u128



### impl Div\<&u128> for u128



### impl Div\<&usize> for &usize



### impl Div\<&usize> for usize



### impl Div\<&Saturating\<i8>> for &Saturating\<i8>



### impl Div\<&Saturating\<i8>> for Saturating\<i8>



### impl Div\<&Saturating\<i16>> for &Saturating\<i16>



### impl Div\<&Saturating\<i16>> for Saturating\<i16>



### impl Div\<&Saturating\<i32>> for &Saturating\<i32>



### impl Div\<&Saturating\<i32>> for Saturating\<i32>



### impl Div\<&Saturating\<i64>> for &Saturating\<i64>



### impl Div\<&Saturating\<i64>> for Saturating\<i64>



### impl Div\<&Saturating\<i128>> for &Saturating\<i128>



### impl Div\<&Saturating\<i128>> for Saturating\<i128>



### impl Div\<&Saturating\<isize>> for &Saturating\<isize>



### impl Div\<&Saturating\<isize>> for Saturating\<isize>



### impl Div\<&Saturating\<u8>> for &Saturating\<u8>



### impl Div\<&Saturating\<u8>> for Saturating\<u8>



### impl Div\<&Saturating\<u16>> for &Saturating\<u16>



### impl Div\<&Saturating\<u16>> for Saturating\<u16>



### impl Div\<&Saturating\<u32>> for &Saturating\<u32>



### impl Div\<&Saturating\<u32>> for Saturating\<u32>



### impl Div\<&Saturating\<u64>> for &Saturating\<u64>



### impl Div\<&Saturating\<u64>> for Saturating\<u64>



### impl Div\<&Saturating\<u128>> for &Saturating\<u128>



### impl Div\<&Saturating\<u128>> for Saturating\<u128>



### impl Div\<&Saturating\<usize>> for &Saturating\<usize>



### impl Div\<&Saturating\<usize>> for Saturating\<usize>



### impl Div\<&Wrapping\<i8>> for &Wrapping\<i8>



### impl Div\<&Wrapping\<i8>> for Wrapping\<i8>



### impl Div\<&Wrapping\<i16>> for &Wrapping\<i16>



### impl Div\<&Wrapping\<i16>> for Wrapping\<i16>



### impl Div\<&Wrapping\<i32>> for &Wrapping\<i32>



### impl Div\<&Wrapping\<i32>> for Wrapping\<i32>



### impl Div\<&Wrapping\<i64>> for &Wrapping\<i64>



### impl Div\<&Wrapping\<i64>> for Wrapping\<i64>



### impl Div\<&Wrapping\<i128>> for &Wrapping\<i128>



### impl Div\<&Wrapping\<i128>> for Wrapping\<i128>



### impl Div\<&Wrapping\<isize>> for &Wrapping\<isize>



### impl Div\<&Wrapping\<isize>> for Wrapping\<isize>



### impl Div\<&Wrapping\<u8>> for &Wrapping\<u8>



### impl Div\<&Wrapping\<u8>> for Wrapping\<u8>



### impl Div\<&Wrapping\<u16>> for &Wrapping\<u16>



### impl Div\<&Wrapping\<u16>> for Wrapping\<u16>



### impl Div\<&Wrapping\<u32>> for &Wrapping\<u32>



### impl Div\<&Wrapping\<u32>> for Wrapping\<u32>



### impl Div\<&Wrapping\<u64>> for &Wrapping\<u64>



### impl Div\<&Wrapping\<u64>> for Wrapping\<u64>



### impl Div\<&Wrapping\<u128>> for &Wrapping\<u128>



### impl Div\<&Wrapping\<u128>> for Wrapping\<u128>



### impl Div\<&Wrapping\<usize>> for &Wrapping\<usize>



### impl Div\<&Wrapping\<usize>> for Wrapping\<usize>



### impl Div\<f32> for f32



### impl Div\<f64> for f64



### impl Div\<i8> for i8



### impl Div\<i16> for i16



### impl Div\<i32> for i32



### impl Div\<i64> for i64



### impl Div\<i128> for i128



### impl Div\<isize> for isize



### impl Div\<u8> for u8



### impl Div\<u16> for u16



### impl Div\<u32> for u32



### impl Div\<u32> for Duration



### impl Div\<u64> for u64



### impl Div\<u128> for u128



### impl Div\<usize> for usize



### impl Div\<NonZeroU8> for u8



### impl Div\<NonZeroU16> for u16



### impl Div\<NonZeroU32> for u32



### impl Div\<NonZeroU64> for u64



### impl Div\<NonZeroU128> for u128

### impl Div\<NonZeroUsize> for usize



### impl Div\<Saturating\<i8>> for Saturating\<i8>



### impl Div\<Saturating\<i16>> for Saturating\<i16>



### impl Div\<Saturating\<i32>> for Saturating\<i32>



### impl Div\<Saturating\<i64>> for Saturating\<i64>



### impl Div\<Saturating\<i128>> for Saturating\<i128>



### impl Div\<Saturating\<isize>> for Saturating\<isize>



### impl Div\<Saturating\<u8>> for Saturating\<u8>



### impl Div\<Saturating\<u16>> for Saturating\<u16>



### impl Div\<Saturating\<u32>> for Saturating\<u32>



### impl Div\<Saturating\<u64>> for Saturating\<u64>



### impl Div\<Saturating\<u128>> for Saturating\<u128>



### impl Div\<Saturating\<usize>> for Saturating\<usize>



### impl Div\<Wrapping\<i8>> for Wrapping\<i8>



### impl Div\<Wrapping\<i16>> for Wrapping\<i16>



### impl Div\<Wrapping\<i32>> for Wrapping\<i32>



### impl Div\<Wrapping\<i64>> for Wrapping\<i64>



### impl Div\<Wrapping\<i128>> for Wrapping\<i128>



### impl Div\<Wrapping\<isize>> for Wrapping\<isize>



### impl Div\<Wrapping\<u8>> for Wrapping\<u8>



### impl Div\<Wrapping\<u16>> for Wrapping\<u16>



### impl Div\<Wrapping\<u32>> for Wrapping\<u32>



### impl Div\<Wrapping\<u64>> for Wrapping\<u64>



### impl Div\<Wrapping\<u128>> for Wrapping\<u128>



### impl Div\<Wrapping\<usize>> for Wrapping\<usize>



### impl\<'a> Div\<f32> for &'a f32



### impl\<'a> Div\<f64> for &'a f64



### impl\<'a> Div\<i8> for &'a i8



### impl\<'a> Div\<i16> for &'a i16



### impl\<'a> Div\<i32> for &'a i32



### impl\<'a> Div\<i64> for &'a i64



### impl\<'a> Div\<i128> for &'a i128



### impl\<'a> Div\<isize> for &'a isize



### impl\<'a> Div\<u8> for &'a u8



### impl\<'a> Div\<u16> for &'a u16



### impl\<'a> Div\<u32> for &'a u32



### impl\<'a> Div\<u64> for &'a u64



### impl\<'a> Div\<u128> for &'a u128



### impl\<'a> Div\<usize> for &'a usize



### impl\<'a> Div\<Saturating\<i8>> for &'a Saturating\<i8>



### impl\<'a> Div\<Saturating\<i16>> for &'a Saturating\<i16>



### impl\<'a> Div\<Saturating\<i32>> for &'a Saturating\<i32>



### impl\<'a> Div\<Saturating\<i64>> for &'a Saturating\<i64>



### impl\<'a> Div\<Saturating\<i128>> for &'a Saturating\<i128>



### impl\<'a> Div\<Saturating\<isize>> for &'a Saturating\<isize>



### impl\<'a> Div\<Saturating\<u8>> for &'a Saturating\<u8>



### impl\<'a> Div\<Saturating\<u16>> for &'a Saturating\<u16>



### impl\<'a> Div\<Saturating\<u32>> for &'a Saturating\<u32>



### impl\<'a> Div\<Saturating\<u64>> for &'a Saturating\<u64>



### impl\<'a> Div\<Saturating\<u128>> for &'a Saturating\<u128>



### impl\<'a> Div\<Saturating\<usize>> for &'a Saturating\<usize>



### impl\<'a> Div\<Wrapping\<i8>> for &'a Wrapping\<i8>



### impl\<'a> Div\<Wrapping\<i16>> for &'a Wrapping\<i16>



### impl\<'a> Div\<Wrapping\<i32>> for &'a Wrapping\<i32>



### impl\<'a> Div\<Wrapping\<i64>> for &'a Wrapping\<i64>



### impl\<'a> Div\<Wrapping\<i128>> for &'a Wrapping\<i128>



### impl\<'a> Div\<Wrapping\<isize>> for &'a Wrapping\<isize>



### impl\<'a> Div\<Wrapping\<u8>> for &'a Wrapping\<u8>



### impl\<'a> Div\<Wrapping\<u16>> for &'a Wrapping\<u16>



### impl\<'a> Div\<Wrapping\<u32>> for &'a Wrapping\<u32>



### impl\<'a> Div\<Wrapping\<u64>> for &'a Wrapping\<u64>



### impl\<'a> Div\<Wrapping\<u128>> for &'a Wrapping\<u128>



### impl\<'a> Div\<Wrapping\<usize>> for &'a Wrapping\<usize>



### impl<'lhs, 'rhs, T, const LANES: usize> Div<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>

```rust
impl<'lhs, 'rhs, T, const LANES: usize> Div<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Div<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```

### impl<T, const LANES: usize> Div<&Simd<T, LANES>> for Simd<T, LANES>

```rust
impl<T, const LANES: usize> Div<&Simd<T, LANES>> for Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Div<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```

### impl<T, const LANES: usize> Div<Simd<T, LANES>> for &Simd<T, LANES>

```rust
impl<T, const LANES: usize> Div<Simd<T, LANES>> for &Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Div<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const N: usize> Div<Simd<f32, N>> for Simd<f32, N>

```rust
impl<const N: usize> Div<Simd<f32, N>> for Simd<f32, N>
where
  f32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### impl\<const N: usize> Div<Simd<f64, N>> for Simd<f64, N>

```rust
impl<const N: usize> Div<Simd<f64, N>> for Simd<f64, N>
where
  f64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### impl\<const N: usize> Div<Simd<i8, N>> for Simd<i8, N>

```rust
impl<const N: usize> Div<Simd<i8, N>> for Simd<i8, N>
where
  i8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### impl\<const N: usize> Div<Simd<i16, N>> for Simd<i16, N>

```rust
impl<const N: usize> Div<Simd<i16, N>> for Simd<i16, N>
where
  i16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### impl\<const N: usize> Div<Simd<i32, N>> for Simd<i32, N>

```rust
impl<const N: usize> Div<Simd<i32, N>> for Simd<i32, N>
where
  i32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### impl\<const N: usize> Div<Simd<i64, N>> for Simd<i64, N>

```rust
impl<const N: usize> Div<Simd<i64, N>> for Simd<i64, N>
where
  i64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### impl\<const N: usize> Div<Simd<isize, N>> for Simd<isize, N>

```rust
impl<const N: usize> Div<Simd<isize, N>> for Simd<isize, N>
where
  isize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### impl\<const N: usize> Div<Simd<u8, N>> for Simd<u8, N>

```rust
impl<const N: usize> Div<Simd<u8, N>> for Simd<u8, N>
where
  u8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### impl\<const N: usize> Div<Simd<u16, N>> for Simd<u16, N>

```rust
impl<const N: usize> Div<Simd<u16, N>> for Simd<u16, N>
where
  u16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### impl\<const N: usize> Div<Simd<u32, N>> for Simd<u32, N>

```rust
impl<const N: usize> Div<Simd<u32, N>> for Simd<u32, N>
where
  u32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### impl\<const N: usize> Div<Simd<u64, N>> for Simd<u64, N>

```rust
impl<const N: usize> Div<Simd<u64, N>> for Simd<u64, N>
where
  u64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### impl\<const N: usize> Div<Simd<usize, N>> for Simd<usize, N>

```rust
impl<const N: usize> Div<Simd<usize, N>> for Simd<usize, N>
where
  usize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
