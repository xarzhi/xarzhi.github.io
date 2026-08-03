# Trait std::ops::Mul

乘法运算符 `*`。

请注意，默认情况下 `Rhs` 是 `Self`，但这不是强制性的。

```rust
pub trait Mul<Rhs = Self> {
    type Output;

    // Required method
    fn mul(self, rhs: Rhs) -> Self::Output;
}
```

Multipliable 的有理数

```rust
use std::ops::Mul;

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

impl Mul for Rational {
    // 有理数的乘法是一个封闭运算。
    type Output = Self;

    fn mul(self, rhs: Self) -> Self {
        let numerator = self.numerator * rhs.numerator;
        let denominator = self.denominator * rhs.denominator;
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
assert_eq!(Rational::new(2, 3) * Rational::new(3, 4),
           Rational::new(1, 2));
```

将 vectors 乘以线性代数中的标量

```rust
use std::ops::Mul;

struct Scalar { value: usize }

#[derive(Debug, PartialEq)]
struct Vector { value: Vec\<usize> }

impl Mul<Scalar> for Vector {
    type Output = Self;

    fn mul(self, rhs: Scalar) -> Self::Output {
        Self { value: self.value.iter().map(|v| v * rhs.value).collect() }
    }
}

let vector = Vector { value: vec![2, 4, 6] };
let scalar = Scalar { value: 3 };
assert_eq!(vector * scalar, Vector { value: vec![6, 12, 18] });
```





## Required Associated Types

### Output

应用 `*` 运算符后的结果类型。

```rust
type Output
```



## Required Methods

### mul

```rust
fn mul(self, rhs: Rhs) -> Self::Output
```

**返回值**：返回两者相乘后的值

```rust
assert_eq!(12 * 2, 24);
```

### 

## Implementors

### impl Mul\<&f32> for &f32



### impl Mul\<&f32> for f32



### impl Mul\<&f64> for &f64



### impl Mul\<&f64> for f64



### impl Mul\<&i8> for &i8



### impl Mul\<&i8> for i8



### impl Mul\<&i16> for &i16



### impl Mul\<&i16> for i16



### impl Mul\<&i32> for &i32



### impl Mul\<&i32> for i32



### impl Mul\<&i64> for &i64



### impl Mul\<&i64> for i64



### impl Mul\<&i128> for &i128



### impl Mul\<&i128> for i128



### impl Mul\<&isize> for &isize



### impl Mul\<&isize> for isize



### impl Mul\<&u8> for &u8



### impl Mul\<&u8> for u8



### impl Mul\<&u16> for &u16



### impl Mul\<&u16> for u16



### impl Mul\<&u32> for &u32



### impl Mul\<&u32> for u32



### impl Mul\<&u64> for &u64



### impl Mul\<&u64> for u64



### impl Mul\<&u128> for &u128



### impl Mul\<&u128> for u128



### impl Mul\<&usize> for &usize



### impl Mul\<&usize> for usize



### impl Mul\<&Saturating\<i8>> for &Saturating\<i8>



### impl Mul\<&Saturating\<i8>> for Saturating\<i8>



### impl Mul\<&Saturating\<i16>> for &Saturating\<i16>



### impl Mul\<&Saturating\<i16>> for Saturating\<i16>



### impl Mul\<&Saturating\<i32>> for &Saturating\<i32>



### impl Mul\<&Saturating\<i32>> for Saturating\<i32>



### impl Mul\<&Saturating\<i64>> for &Saturating\<i64>



### impl Mul\<&Saturating\<i64>> for Saturating\<i64>



### impl Mul\<&Saturating\<i128>> for &Saturating\<i128>



### impl Mul\<&Saturating\<i128>> for Saturating\<i128>



### impl Mul\<&Saturating\<isize>> for &Saturating\<isize>



### impl Mul\<&Saturating\<isize>> for Saturating\<isize>



### impl Mul\<&Saturating\<u8>> for &Saturating\<u8>



### impl Mul\<&Saturating\<u8>> for Saturating\<u8>



### impl Mul\<&Saturating\<u16>> for &Saturating\<u16>



### impl Mul\<&Saturating\<u16>> for Saturating\<u16>



### impl Mul\<&Saturating\<u32>> for &Saturating\<u32>



### impl Mul\<&Saturating\<u32>> for Saturating\<u32>



### impl Mul\<&Saturating\<u64>> for &Saturating\<u64>



### impl Mul\<&Saturating\<u64>> for Saturating\<u64>



### impl Mul\<&Saturating\<u128>> for &Saturating\<u128>



### impl Mul\<&Saturating\<u128>> for Saturating\<u128>



### impl Mul\<&Saturating\<usize>> for &Saturating\<usize>



### impl Mul\<&Saturating\<usize>> for Saturating\<usize>



### impl Mul\<&Wrapping\<i8>> for &Wrapping\<i8>



### impl Mul\<&Wrapping\<i8>> for Wrapping\<i8>



### impl Mul\<&Wrapping\<i16>> for &Wrapping\<i16>



### impl Mul\<&Wrapping\<i16>> for Wrapping\<i16>



### impl Mul\<&Wrapping\<i32>> for &Wrapping\<i32>



### impl Mul\<&Wrapping\<i32>> for Wrapping\<i32>



### impl Mul\<&Wrapping\<i64>> for &Wrapping\<i64>



### impl Mul\<&Wrapping\<i64>> for Wrapping\<i64>



### impl Mul\<&Wrapping\<i128>> for &Wrapping\<i128>



### impl Mul\<&Wrapping\<i128>> for Wrapping\<i128>



### impl Mul\<&Wrapping\<isize>> for &Wrapping\<isize>



### impl Mul\<&Wrapping\<isize>> for Wrapping\<isize>



### impl Mul\<&Wrapping\<u8>> for &Wrapping\<u8>



### impl Mul\<&Wrapping\<u8>> for Wrapping\<u8>



### impl Mul\<&Wrapping\<u16>> for &Wrapping\<u16>



### impl Mul\<&Wrapping\<u16>> for Wrapping\<u16>



### impl Mul\<&Wrapping\<u32>> for &Wrapping\<u32>



### impl Mul\<&Wrapping\<u32>> for Wrapping\<u32>



### impl Mul\<&Wrapping\<u64>> for &Wrapping\<u64>



### impl Mul\<&Wrapping\<u64>> for Wrapping\<u64>



### impl Mul\<&Wrapping\<u128>> for &Wrapping\<u128>



### impl Mul\<&Wrapping\<u128>> for Wrapping\<u128>



### impl Mul\<&Wrapping\<usize>> for &Wrapping\<usize>



### impl Mul\<&Wrapping\<usize>> for Wrapping\<usize>



### impl Mul\<f32> for f32



### impl Mul\<f64> for f64



### impl Mul\<i8> for i8



### impl Mul\<i16> for i16



### impl Mul\<i32> for i32



### impl Mul\<i64> for i64



### impl Mul\<i128> for i128



### impl Mul\<isize> for isize



### impl Mul\<u8> for u8



### impl Mul\<u16> for u16



### impl Mul\<u32> for u32



### impl Mul\<u32> for Duration



### impl Mul\<u64> for u64



### impl Mul\<u128> for u128



### impl Mul\<usize> for usize



### impl Mul\<Saturating\<i8>> for Saturating\<i8>



### impl Mul\<Saturating\<i16>> for Saturating\<i16>



### impl Mul\<Saturating\<i32>> for Saturating\<i32>



### impl Mul\<Saturating\<i64>> for Saturating\<i64>



### impl Mul\<Saturating\<i128>> for Saturating\<i128>



### impl Mul\<Saturating\<isize>> for Saturating\<isize>



### impl Mul\<Saturating\<u8>> for Saturating\<u8>



### impl Mul\<Saturating\<u16>> for Saturating\<u16>



### impl Mul\<Saturating\<u32>> for Saturating\<u32>



### impl Mul\<Saturating\<u64>> for Saturating\<u64>



### impl Mul\<Saturating\<u128>> for Saturating\<u128>



### impl Mul\<Saturating\<usize>> for Saturating\<usize>



### impl Mul\<Wrapping\<i8>> for Wrapping\<i8>



### impl Mul\<Wrapping\<i16>> for Wrapping\<i16>



### impl Mul\<Wrapping\<i32>> for Wrapping\<i32>



### impl Mul\<Wrapping\<i64>> for Wrapping\<i64>



### impl Mul\<Wrapping\<i128>> for Wrapping\<i128>



### impl Mul\<Wrapping\<isize>> for Wrapping\<isize>



### impl Mul\<Wrapping\<u8>> for Wrapping\<u8>



### impl Mul\<Wrapping\<u16>> for Wrapping\<u16>



### impl Mul\<Wrapping\<u32>> for Wrapping\<u32>



### impl Mul\<Wrapping\<u64>> for Wrapping\<u64>



### impl Mul\<Wrapping\<u128>> for Wrapping\<u128>



### impl Mul\<Wrapping\<usize>> for Wrapping\<usize>



### impl Mul\<Duration> for u32



### impl\<'a> Mul\<f32> for &'a f32



### impl\<'a> Mul\<f64> for &'a f64



### impl\<'a> Mul\<i8> for &'a i8



### impl\<'a> Mul\<i16> for &'a i16



### impl\<'a> Mul\<i32> for &'a i32



### impl\<'a> Mul\<i64> for &'a i64



### impl\<'a> Mul\<i128> for &'a i128



### impl\<'a> Mul\<isize> for &'a isize



### impl\<'a> Mul\<u8> for &'a u8



### impl\<'a> Mul\<u16> for &'a u16



### impl\<'a> Mul\<u32> for &'a u32



### impl\<'a> Mul\<u64> for &'a u64



### impl\<'a> Mul\<u128> for &'a u128



### impl\<'a> Mul\<usize> for &'a usize



### impl\<'a> Mul\<Saturating\<i8>> for &'a Saturating\<i8>



### impl\<'a> Mul\<Saturating\<i16>> for &'a Saturating\<i16>



### impl\<'a> Mul\<Saturating\<i32>> for &'a Saturating\<i32>



### impl\<'a> Mul\<Saturating\<i64>> for &'a Saturating\<i64>



### impl\<'a> Mul\<Saturating\<i128>> for &'a Saturating\<i128>



### impl\<'a> Mul\<Saturating\<isize>> for &'a Saturating\<isize>



### impl\<'a> Mul\<Saturating\<u8>> for &'a Saturating\<u8>



### impl\<'a> Mul\<Saturating\<u16>> for &'a Saturating\<u16>



### impl\<'a> Mul\<Saturating\<u32>> for &'a Saturating\<u32>



### impl\<'a> Mul\<Saturating\<u64>> for &'a Saturating\<u64>



### impl\<'a> Mul\<Saturating\<u128>> for &'a Saturating\<u128>



### impl\<'a> Mul\<Saturating\<usize>> for &'a Saturating\<usize>



### impl\<'a> Mul\<Wrapping\<i8>> for &'a Wrapping\<i8>



### impl\<'a> Mul\<Wrapping\<i16>> for &'a Wrapping\<i16>



### impl\<'a> Mul\<Wrapping\<i32>> for &'a Wrapping\<i32>



### impl\<'a> Mul\<Wrapping\<i64>> for &'a Wrapping\<i64>



### impl\<'a> Mul\<Wrapping\<i128>> for &'a Wrapping\<i128>



### impl\<'a> Mul\<Wrapping\<isize>> for &'a Wrapping\<isize>



### impl\<'a> Mul\<Wrapping\<u8>> for &'a Wrapping\<u8>



### impl\<'a> Mul\<Wrapping\<u16>> for &'a Wrapping\<u16>



### impl\<'a> Mul\<Wrapping\<u32>> for &'a Wrapping\<u32>



### impl\<'a> Mul\<Wrapping\<u64>> for &'a Wrapping\<u64>



### impl\<'a> Mul\<Wrapping\<u128>> for &'a Wrapping\<u128>



### impl\<'a> Mul\<Wrapping\<usize>> for &'a Wrapping\<usize>



### impl<'lhs, 'rhs, T, const LANES: usize> Mul<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>

```rust
impl<'lhs, 'rhs, T, const LANES: usize> Mul<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Mul<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> Mul<&Simd<T, LANES>> for Simd<T, LANES>

```rust
impl<T, const LANES: usize> Mul<&Simd<T, LANES>> for Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Mul<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> Mul<Simd<T, LANES>> for &Simd<T, LANES>

```rust
impl<T, const LANES: usize> Mul<Simd<T, LANES>> for &Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Mul<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const N: usize> Mul<Simd<f32, N>> for Simd<f32, N>

```rust
impl<const N: usize> Mul<Simd<f32, N>> for Simd<f32, N>
where
  f32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Mul<Simd<f64, N>> for Simd<f64, N>

```rust
impl<const N: usize> Mul<Simd<f64, N>> for Simd<f64, N>
where
  f64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Mul<Simd<i8, N>> for Simd<i8, N>

```rust
impl<const N: usize> Mul<Simd<i8, N>> for Simd<i8, N>
where
  i8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Mul<Simd<i16, N>> for Simd<i16, N>

```rust
impl<const N: usize> Mul<Simd<i16, N>> for Simd<i16, N>
where
  i16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Mul<Simd<i32, N>> for Simd<i32, N>

```rust
impl<const N: usize> Mul<Simd<i32, N>> for Simd<i32, N>
where
  i32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Mul<Simd<i64, N>> for Simd<i64, N>

```rust
impl<const N: usize> Mul<Simd<i64, N>> for Simd<i64, N>
where
  i64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Mul<Simd<isize, N>> for Simd<isize, N>

```rust
impl<const N: usize> Mul<Simd<isize, N>> for Simd<isize, N>
where
  isize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Mul<Simd<u8, N>> for Simd<u8, N>

```rust
impl<const N: usize> Mul<Simd<u8, N>> for Simd<u8, N>
where
  u8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Mul<Simd<u16, N>> for Simd<u16, N>

```rust
impl<const N: usize> Mul<Simd<u16, N>> for Simd<u16, N>
where
  u16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Mul<Simd<u32, N>> for Simd<u32, N>

```rust
impl<const N: usize> Mul<Simd<u32, N>> for Simd<u32, N>
where
  u32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Mul<Simd<u64, N>> for Simd<u64, N>

```rust
impl<const N: usize> Mul<Simd<u64, N>> for Simd<u64, N>
where
  u64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Mul<Simd<usize, N>> for Simd<usize, N>

```rust
impl<const N: usize> Mul<Simd<usize, N>> for Simd<usize, N>
where
  usize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
