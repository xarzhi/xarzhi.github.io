# Trait std::ops::BitXorAssign

按位异或赋值运算符 `^=`。

```rust
pub trait BitXorAssign<Rhs = Self> {
    // Required method
    fn bitxor_assign(&mut self, rhs: Rhs);
}
```

示例

```rust
use std::ops::BitXorAssign;

#[derive(Debug, PartialEq)]
struct Personality {
    has_soul: bool,
    likes_knitting: bool,
}

impl BitXorAssign for Personality {
    fn bitxor_assign(&mut self, rhs: Self) {
        self.has_soul ^= rhs.has_soul;
        self.likes_knitting ^= rhs.likes_knitting;
    }
}

let mut personality = Personality { has_soul: false, likes_knitting: true };
personality ^= Personality { has_soul: true, likes_knitting: true };
assert_eq!(personality, Personality { has_soul: true, likes_knitting: false});
```





## Required Methods

### bitxor_assign

```rust
fn bitxor_assign(&mut self, rhs: Rhs)
```

**参数**：

- **rhs**：执行 ` ^=` 操作的右值

```rust
let mut x = true;
x ^= false;
assert_eq!(x, true);

let mut x = true;
x ^= true;
assert_eq!(x, false);

let mut x: u8 = 5;
x ^= 1;
assert_eq!(x, 4);

let mut x: u8 = 5;
x ^= 2;
assert_eq!(x, 7);
```



## Implementors

### impl BitXorAssign\<&bool> for bool



### impl BitXorAssign\<&i8> for i8



### impl BitXorAssign\<&i8> for Saturating\<i8>



### impl BitXorAssign\<&i8> for Wrapping\<i8>



### impl BitXorAssign\<&i16> for i16



### impl BitXorAssign\<&i16> for Saturating\<i16>



### impl BitXorAssign\<&i16> for Wrapping\<i16>



### impl BitXorAssign\<&i32> for i32



### impl BitXorAssign\<&i32> for Saturating\<i32>



### impl BitXorAssign\<&i32> for Wrapping\<i32>



### impl BitXorAssign\<&i64> for i64



### impl BitXorAssign\<&i64> for Saturating\<i64>



### impl BitXorAssign\<&i64> for Wrapping\<i64>



### impl BitXorAssign\<&i128> for i128



### impl BitXorAssign\<&i128> for Saturating\<i128>



### impl BitXorAssign\<&i128> for Wrapping\<i128>



### impl BitXorAssign\<&isize> for isize



### impl BitXorAssign\<&isize> for Saturating\<isize>



### impl BitXorAssign\<&isize> for Wrapping\<isize>



### impl BitXorAssign\<&u8> for u8



### impl BitXorAssign\<&u8> for Saturating\<u8>



### impl BitXorAssign\<&u8> for Wrapping\<u8>



### impl BitXorAssign\<&u16> for u16



### impl BitXorAssign\<&u16> for Saturating\<u16>



### impl BitXorAssign\<&u16> for Wrapping\<u16>



### impl BitXorAssign\<&u32> for u32



### impl BitXorAssign\<&u32> for Saturating\<u32>



### impl BitXorAssign\<&u32> for Wrapping\<u32>



### impl BitXorAssign\<&u64> for u64



### impl BitXorAssign\<&u64> for Saturating\<u64>



### impl BitXorAssign\<&u64> for Wrapping\<u64>



### impl BitXorAssign\<&u128> for u128



### impl BitXorAssign\<&u128> for Saturating\<u128>



### impl BitXorAssign\<&u128> for Wrapping\<u128>



### impl BitXorAssign\<&usize> for usize



### impl BitXorAssign\<&usize> for Saturating\<usize>



### impl BitXorAssign\<&usize> for Wrapping\<usize>



### impl BitXorAssign\<&Saturating\<i8>> for Saturating\<i8>



### impl BitXorAssign\<&Saturating\<i16>> for Saturating\<i16>



### impl BitXorAssign\<&Saturating\<i32>> for Saturating\<i32>



### impl BitXorAssign\<&Saturating\<i64>> for Saturating\<i64>



### impl BitXorAssign\<&Saturating\<i128>> for Saturating\<i128>



### impl BitXorAssign\<&Saturating\<isize>> for Saturating\<isize>



### impl BitXorAssign\<&Saturating\<u8>> for Saturating\<u8>



### impl BitXorAssign\<&Saturating\<u16>> for Saturating\<u16>



### impl BitXorAssign\<&Saturating\<u32>> for Saturating\<u32>



### impl BitXorAssign\<&Saturating\<u64>> for Saturating\<u64>



### impl BitXorAssign\<&Saturating\<u128>> for Saturating\<u128>



### impl BitXorAssign\<&Saturating\<usize>> for Saturating\<usize>



### impl BitXorAssign\<&Wrapping\<i8>> for Wrapping\<i8>



### impl BitXorAssign\<&Wrapping\<i16>> for Wrapping\<i16>



### impl BitXorAssign\<&Wrapping\<i32>> for Wrapping\<i32>



### impl BitXorAssign\<&Wrapping\<i64>> for Wrapping\<i64>



### impl BitXorAssign\<&Wrapping\<i128>> for Wrapping\<i128>



### impl BitXorAssign\<&Wrapping\<isize>> for Wrapping\<isize>



### impl BitXorAssign\<&Wrapping\<u8>> for Wrapping\<u8>



### impl BitXorAssign\<&Wrapping\<u16>> for Wrapping\<u16>



### impl BitXorAssign\<&Wrapping\<u32>> for Wrapping\<u32>



### impl BitXorAssign\<&Wrapping\<u64>> for Wrapping\<u64>



### impl BitXorAssign\<&Wrapping\<u128>> for Wrapping\<u128>



### impl BitXorAssign\<&Wrapping\<usize>> for Wrapping\<usize>



### impl BitXorAssign\<bool> for bool



### impl BitXorAssign\<i8> for i8



### impl BitXorAssign\<i8> for Saturating\<i8>



### impl BitXorAssign\<i8> for Wrapping\<i8>



### impl BitXorAssign\<i16> for i16



### impl BitXorAssign\<i16> for Saturating\<i16>



### impl BitXorAssign\<i16> for Wrapping\<i16>



### impl BitXorAssign\<i32> for i32



### impl BitXorAssign\<i32> for Saturating\<i32>



### impl BitXorAssign\<i32> for Wrapping\<i32>



### impl BitXorAssign\<i64> for i64



### impl BitXorAssign\<i64> for Saturating\<i64>



### impl BitXorAssign\<i64> for Wrapping\<i64>



### impl BitXorAssign\<i128> for i128



### impl BitXorAssign\<i128> for Saturating\<i128>



### impl BitXorAssign\<i128> for Wrapping\<i128>



### impl BitXorAssign\<isize> for isize



### impl BitXorAssign\<isize> for Saturating\<isize>



### impl BitXorAssign\<isize> for Wrapping\<isize>



### impl BitXorAssign\<u8> for u8



### impl BitXorAssign\<u8> for Saturating\<u8>



### impl BitXorAssign\<u8> for Wrapping\<u8>



### impl BitXorAssign\<u16> for u16



### impl BitXorAssign\<u16> for Saturating\<u16>



### impl BitXorAssign\<u16> for Wrapping\<u16>



### impl BitXorAssign\<u32> for u32



### impl BitXorAssign\<u32> for Saturating\<u32>



### impl BitXorAssign\<u32> for Wrapping\<u32>



### impl BitXorAssign\<u64> for u64



### impl BitXorAssign\<u64> for Saturating\<u64>



### impl BitXorAssign\<u64> for Wrapping\<u64>



### impl BitXorAssign\<u128> for u128



### impl BitXorAssign\<u128> for Saturating\<u128>



### impl BitXorAssign\<u128> for Wrapping\<u128>



### impl BitXorAssign\<usize> for usize



### impl BitXorAssign\<usize> for Saturating\<usize>



### impl BitXorAssign\<usize> for Wrapping\<usize>



### impl BitXorAssign\<Saturating\<i8>> for Saturating\<i8>



### impl BitXorAssign\<Saturating\<i16>> for Saturating\<i16>



### impl BitXorAssign\<Saturating\<i32>> for Saturating\<i32>



### impl BitXorAssign\<Saturating\<i64>> for Saturating\<i64>



### impl BitXorAssign\<Saturating\<i128>> for Saturating\<i128>



### impl BitXorAssign\<Saturating\<isize>> for Saturating\<isize>



### impl BitXorAssign\<Saturating\<u8>> for Saturating\<u8>



### impl BitXorAssign\<Saturating\<u16>> for Saturating\<u16>



### impl BitXorAssign\<Saturating\<u32>> for Saturating\<u32>



### impl BitXorAssign\<Saturating\<u64>> for Saturating\<u64>



### impl BitXorAssign\<Saturating\<u128>> for Saturating\<u128>



### impl BitXorAssign\<Saturating\<usize>> for Saturating\<usize>



### impl BitXorAssign\<Wrapping\<i8>> for Wrapping\<i8>



### impl BitXorAssign\<Wrapping\<i16>> for Wrapping\<i16>



### impl BitXorAssign\<Wrapping\<i32>> for Wrapping\<i32>



### impl BitXorAssign\<Wrapping\<i64>> for Wrapping\<i64>



### impl BitXorAssign\<Wrapping\<i128>> for Wrapping\<i128>



### impl BitXorAssign\<Wrapping\<isize>> for Wrapping\<isize>



### impl BitXorAssign\<Wrapping\<u8>> for Wrapping\<u8>



### impl BitXorAssign\<Wrapping\<u16>> for Wrapping\<u16>



### impl BitXorAssign\<Wrapping\<u32>> for Wrapping\<u32>



### impl BitXorAssign\<Wrapping\<u64>> for Wrapping\<u64>



### impl BitXorAssign\<Wrapping\<u128>> for Wrapping\<u128>



### impl BitXorAssign\<Wrapping\<usize>> for Wrapping\<usize>



### impl<T, U, const LANES: usize> BitXorAssign\<U> for Simd<T, LANES>

```rust
impl<T, U, const LANES: usize> BitXorAssign<U> for Simd<T, LANES>
where
  Simd<T, LANES>: BitXor<U, Output = Simd<T, LANES>>,
  T: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> BitXorAssign\<bool> for Mask<T, LANES>

```rust
impl<T, const LANES: usize> BitXorAssign<bool> for Mask<T, LANES>
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> BitXorAssign<Mask<T, LANES>> for Mask<T, LANES>

```rust
impl<T, const LANES: usize> BitXorAssign<Mask<T, LANES>> for Mask<T, LANES>
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```

