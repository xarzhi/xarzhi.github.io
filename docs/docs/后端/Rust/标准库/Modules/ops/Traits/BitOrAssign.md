# Trait std::ops::BitOrAssign

按位或赋值运算符 `|=`。

```rust
pub trait BitOrAssign<Rhs = Self> {
    // Required method
    fn bitor_assign(&mut self, rhs: Rhs);
}
```

示例

```rust
use std::ops::BitOrAssign;

#[derive(Debug, PartialEq)]
struct PersonalPreferences {
    likes_cats: bool,
    likes_dogs: bool,
}

impl BitOrAssign for PersonalPreferences {
    fn bitor_assign(&mut self, rhs: Self) {
        self.likes_cats |= rhs.likes_cats;
        self.likes_dogs |= rhs.likes_dogs;
    }
}

let mut prefs = PersonalPreferences { likes_cats: true, likes_dogs: false };
prefs |= PersonalPreferences { likes_cats: false, likes_dogs: true };
assert_eq!(prefs, PersonalPreferences { likes_cats: true, likes_dogs: true });
```





## Required Methods

### bitor_assign

执行 `|=` 操作。

```rust
fn bitor_assign(&mut self, rhs: Rhs)
```

**参数**：

- **rhs**：执行 ` |=` 操作的右值

```rust
let mut x = true;
x |= false;
assert_eq!(x, true);

let mut x = false;
x |= false;
assert_eq!(x, false);

let mut x: u8 = 5;
x |= 1;
assert_eq!(x, 5);

let mut x: u8 = 5;
x |= 2;
assert_eq!(x, 7);
```



## Implementors

### impl BitOrAssign\<&bool> for bool



### impl BitOrAssign\<&i8> for i8



### impl BitOrAssign\<&i8> for Saturating\<i8>



### impl BitOrAssign\<&i8> for Wrapping\<i8>



### impl BitOrAssign\<&i16> for i16



### impl BitOrAssign\<&i16> for Saturating\<i16>



### impl BitOrAssign\<&i16> for Wrapping\<i16>



### impl BitOrAssign\<&i32> for i32



### impl BitOrAssign\<&i32> for Saturating\<i32>



### impl BitOrAssign\<&i32> for Wrapping\<i32>



### impl BitOrAssign\<&i64> for i64



### impl BitOrAssign\<&i64> for Saturating\<i64>



### impl BitOrAssign\<&i64> for Wrapping\<i64>



### impl BitOrAssign\<&i128> for i128



### impl BitOrAssign\<&i128> for Saturating\<i128>



### impl BitOrAssign\<&i128> for Wrapping\<i128>



### impl BitOrAssign\<&isize> for isize



### impl BitOrAssign\<&isize> for Saturating\<isize>



### impl BitOrAssign\<&isize> for Wrapping\<isize>



### impl BitOrAssign\<&u8> for u8



### impl BitOrAssign\<&u8> for Saturating\<u8>



### impl BitOrAssign\<&u8> for Wrapping\<u8>



### impl BitOrAssign\<&u16> for u16



### impl BitOrAssign\<&u16> for Saturating\<u16>



### impl BitOrAssign\<&u16> for Wrapping\<u16>



### impl BitOrAssign\<&u32> for u32



### impl BitOrAssign\<&u32> for Saturating\<u32>



### impl BitOrAssign\<&u32> for Wrapping\<u32>



### impl BitOrAssign\<&u64> for u64



### impl BitOrAssign\<&u64> for Saturating\<u64>



### impl BitOrAssign\<&u64> for Wrapping\<u64>



### impl BitOrAssign\<&u128> for u128



### impl BitOrAssign\<&u128> for Saturating\<u128>



### impl BitOrAssign\<&u128> for Wrapping\<u128>



### impl BitOrAssign\<&usize> for usize



### impl BitOrAssign\<&usize> for Saturating\<usize>



### impl BitOrAssign\<&usize> for Wrapping\<usize>



### impl BitOrAssign\<&Saturating\<i8>> for Saturating\<i8>



### impl BitOrAssign\<&Saturating\<i16>> for Saturating\<i16>



### impl BitOrAssign\<&Saturating\<i32>> for Saturating\<i32>



### impl BitOrAssign\<&Saturating\<i64>> for Saturating\<i64>



### impl BitOrAssign\<&Saturating\<i128>> for Saturating\<i128>



### impl BitOrAssign\<&Saturating\<isize>> for Saturating\<isize>



### impl BitOrAssign\<&Saturating\<u8>> for Saturating\<u8>



### impl BitOrAssign\<&Saturating\<u16>> for Saturating\<u16>



### impl BitOrAssign\<&Saturating\<u32>> for Saturating\<u32>



### impl BitOrAssign\<&Saturating\<u64>> for Saturating\<u64>



### impl BitOrAssign\<&Saturating\<u128>> for Saturating\<u128>



### impl BitOrAssign\<&Saturating\<usize>> for Saturating\<usize>



### impl BitOrAssign\<&Wrapping\<i8>> for Wrapping\<i8>



### impl BitOrAssign\<&Wrapping\<i16>> for Wrapping\<i16>



### impl BitOrAssign\<&Wrapping\<i32>> for Wrapping\<i32>



### impl BitOrAssign\<&Wrapping\<i64>> for Wrapping\<i64>



### impl BitOrAssign\<&Wrapping\<i128>> for Wrapping\<i128>



### impl BitOrAssign\<&Wrapping\<isize>> for Wrapping\<isize>



### impl BitOrAssign\<&Wrapping\<u8>> for Wrapping\<u8>



### impl BitOrAssign\<&Wrapping\<u16>> for Wrapping\<u16>



### impl BitOrAssign\<&Wrapping\<u32>> for Wrapping\<u32>



### impl BitOrAssign\<&Wrapping\<u64>> for Wrapping\<u64>



### impl BitOrAssign\<&Wrapping\<u128>> for Wrapping\<u128>



### impl BitOrAssign\<&Wrapping\<usize>> for Wrapping\<usize>



### impl BitOrAssign\<bool> for bool



### impl BitOrAssign\<i8> for i8



### impl BitOrAssign\<i8> for NonZeroI8



### impl BitOrAssign\<i8> for Saturating\<i8>



### impl BitOrAssign\<i8> for Wrapping\<i8>



### impl BitOrAssign\<i16> for i16



### impl BitOrAssign\<i16> for NonZeroI16



### impl BitOrAssign\<i16> for Saturating\<i16>



### impl BitOrAssign\<i16> for Wrapping\<i16>



### impl BitOrAssign\<i32> for i32



### impl BitOrAssign\<i32> for NonZeroI32



### impl BitOrAssign\<i32> for Saturating\<i32>



### impl BitOrAssign\<i32> for Wrapping\<i32>



### impl BitOrAssign\<i64> for i64



### impl BitOrAssign\<i64> for NonZeroI64



### impl BitOrAssign\<i64> for Saturating\<i64>



### impl BitOrAssign\<i64> for Wrapping\<i64>



### impl BitOrAssign\<i128> for i128



### impl BitOrAssign\<i128> for NonZeroI128



### impl BitOrAssign\<i128> for Saturating\<i128>



### impl BitOrAssign\<i128> for Wrapping\<i128>



### impl BitOrAssign\<isize> for isize



### impl BitOrAssign\<isize> for NonZeroIsize



### impl BitOrAssign\<isize> for Saturating\<isize>



### impl BitOrAssign\<isize> for Wrapping\<isize>



### impl BitOrAssign\<u8> for u8



### impl BitOrAssign\<u8> for NonZeroU8



### impl BitOrAssign\<u8> for Saturating\<u8>



### impl BitOrAssign\<u8> for Wrapping\<u8>



### impl BitOrAssign\<u16> for u16



### impl BitOrAssign\<u16> for NonZeroU16



### impl BitOrAssign\<u16> for Saturating\<u16>



### impl BitOrAssign\<u16> for Wrapping\<u16>



### impl BitOrAssign\<u32> for u32



### impl BitOrAssign\<u32> for NonZeroU32



### impl BitOrAssign\<u32> for Saturating\<u32>



### impl BitOrAssign\<u32> for Wrapping\<u32>



### impl BitOrAssign\<u64> for u64



### impl BitOrAssign\<u64> for NonZeroU64



### impl BitOrAssign\<u64> for Saturating\<u64>



### impl BitOrAssign\<u64> for Wrapping\<u64>



### impl BitOrAssign\<u128> for u128



### impl BitOrAssign\<u128> for NonZeroU128



### impl BitOrAssign\<u128> for Saturating\<u128>



### impl BitOrAssign\<u128> for Wrapping\<u128>



### impl BitOrAssign\<usize> for usize



### impl BitOrAssign\<usize> for NonZeroUsize



### impl BitOrAssign\<usize> for Saturating\<usize>



### impl BitOrAssign\<usize> for Wrapping\<usize>



### impl BitOrAssign\<NonZeroI8> for NonZeroI8



### impl BitOrAssign\<NonZeroI16> for NonZeroI16



### impl BitOrAssign\<NonZeroI32> for NonZeroI32



### impl BitOrAssign\<NonZeroI64> for NonZeroI64



### impl BitOrAssign\<NonZeroI128> for NonZeroI128



### impl BitOrAssign\<NonZeroIsize> for NonZeroIsize



### impl BitOrAssign\<NonZeroU8> for NonZeroU8



### impl BitOrAssign\<NonZeroU16> for NonZeroU16



### impl BitOrAssign\<NonZeroU32> for NonZeroU32



### impl BitOrAssign\<NonZeroU64> for NonZeroU64



### impl BitOrAssign\<NonZeroU128> for NonZeroU128



### impl BitOrAssign\<NonZeroUsize> for NonZeroUsize



### impl BitOrAssign\<Saturating\<i8>> for Saturating\<i8>



### impl BitOrAssign\<Saturating\<i16>> for Saturating\<i16>



### impl BitOrAssign\<Saturating\<i32>> for Saturating\<i32>



### impl BitOrAssign\<Saturating\<i64>> for Saturating\<i64>



### impl BitOrAssign\<Saturating\<i128>> for Saturating\<i128>



### impl BitOrAssign\<Saturating\<isize>> for Saturating\<isize>



### impl BitOrAssign\<Saturating\<u8>> for Saturating\<u8>



### impl BitOrAssign\<Saturating\<u16>> for Saturating\<u16>



### impl BitOrAssign\<Saturating\<u32>> for Saturating\<u32>



### impl BitOrAssign\<Saturating\<u64>> for Saturating\<u64>



### impl BitOrAssign\<Saturating\<u128>> for Saturating\<u128>



### impl BitOrAssign\<Saturating\<usize>> for Saturating\<usize>



### impl BitOrAssign\<Wrapping\<i8>> for Wrapping\<i8>



### impl BitOrAssign\<Wrapping\<i16>> for Wrapping\<i16>



### impl BitOrAssign\<Wrapping\<i32>> for Wrapping\<i32>



### impl BitOrAssign\<Wrapping\<i64>> for Wrapping\<i64>



### impl BitOrAssign\<Wrapping\<i128>> for Wrapping\<i128>



### impl BitOrAssign\<Wrapping\<isize>> for Wrapping\<isize>



### impl BitOrAssign\<Wrapping\<u8>> for Wrapping\<u8>



### impl BitOrAssign\<Wrapping\<u16>> for Wrapping\<u16>



### impl BitOrAssign\<Wrapping\<u32>> for Wrapping\<u32>



### impl BitOrAssign\<Wrapping\<u64>> for Wrapping\<u64>



### impl BitOrAssign\<Wrapping\<u128>> for Wrapping\<u128>



### impl BitOrAssign\<Wrapping\<usize>> for Wrapping\<usize>



### impl<T, U, const LANES: usize> BitOrAssign\<U> for Simd<T, LANES>

```rust
impl<T, U, const LANES: usize> BitOrAssign<U> for Simd<T, LANES>
where
  Simd<T, LANES>: BitOr<U, Output = Simd<T, LANES>>,
  T: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> BitOrAssign\<bool> for Mask<T, LANES>

```rust
impl<T, const LANES: usize> BitOrAssign<bool> for Mask<T, LANES>
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> BitOrAssign<Mask<T, LANES>> for Mask<T, LANES>

```rust
impl<T, const LANES: usize> BitOrAssign<Mask<T, LANES>> for Mask<T, LANES>
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
