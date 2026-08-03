# Trait std::ops::RemAssign

余数赋值运算符 `%=`。

```rust
pub trait RemAssign<Rhs = Self> {
    // Required method
    fn rem_assign(&mut self, rhs: Rhs);
}
```

示例

```rust
use std::ops::RemAssign;

struct CookieJar { cookies: u32 }

impl RemAssign<u32> for CookieJar {
    fn rem_assign(&mut self, piles: u32) {
        self.cookies %= piles;
    }
}

let mut jar = CookieJar { cookies: 31 };
let piles = 4;

println!("Splitting up {} cookies into {} even piles!", jar.cookies, piles);

jar %= piles;

println!("{} cookies remain in the cookie jar!", jar.cookies);
```





## Required Methods

### rem_assign

```rust
fn rem_assign(&mut self, rhs: Rhs)
```

**参数**：

- **rhs**：执行 ` %=` 操作的右值

```rust
let mut x: u32 = 12;
x %= 10;
assert_eq!(x, 2);
```



## Implementors

### impl RemAssign\<&f32> for f32



### impl RemAssign\<&f64> for f64



### impl RemAssign\<&i8> for i8



### impl RemAssign\<&i8> for Saturating\<i8>



### impl RemAssign\<&i8> for Wrapping\<i8>



### impl RemAssign\<&i16> for i16



### impl RemAssign\<&i16> for Saturating\<i16>



### impl RemAssign\<&i16> for Wrapping\<i16>



### impl RemAssign\<&i32> for i32



### impl RemAssign\<&i32> for Saturating\<i32>



### impl RemAssign\<&i32> for Wrapping\<i32>



### impl RemAssign\<&i64> for i64



### impl RemAssign\<&i64> for Saturating\<i64>



### impl RemAssign\<&i64> for Wrapping\<i64>



### impl RemAssign\<&i128> for i128



### impl RemAssign\<&i128> for Saturating\<i128>



### impl RemAssign\<&i128> for Wrapping\<i128>



### impl RemAssign\<&isize> for isize



### impl RemAssign\<&isize> for Saturating\<isize>



### impl RemAssign\<&isize> for Wrapping\<isize>



### impl RemAssign\<&u8> for u8



### impl RemAssign\<&u8> for Saturating\<u8>



### impl RemAssign\<&u8> for Wrapping\<u8>



### impl RemAssign\<&u16> for u16



### impl RemAssign\<&u16> for Saturating\<u16>



### impl RemAssign\<&u16> for Wrapping\<u16>



### impl RemAssign\<&u32> for u32



### impl RemAssign\<&u32> for Saturating\<u32>



### impl RemAssign\<&u32> for Wrapping\<u32>



### impl RemAssign\<&u64> for u64



### impl RemAssign\<&u64> for Saturating\<u64>



### impl RemAssign\<&u64> for Wrapping\<u64>



### impl RemAssign\<&u128> for u128



### impl RemAssign\<&u128> for Saturating\<u128>



### impl RemAssign\<&u128> for Wrapping\<u128>



### impl RemAssign\<&usize> for usize



### impl RemAssign\<&usize> for Saturating\<usize>



### impl RemAssign\<&usize> for Wrapping\<usize>



### impl RemAssign\<&Saturating\<i8>> for Saturating\<i8>



### impl RemAssign\<&Saturating\<i16>> for Saturating\<i16>



### impl RemAssign\<&Saturating\<i32>> for Saturating\<i32>



### impl RemAssign\<&Saturating\<i64>> for Saturating\<i64>



### impl RemAssign\<&Saturating\<i128>> for Saturating\<i128>



### impl RemAssign\<&Saturating\<isize>> for Saturating\<isize>



### impl RemAssign\<&Saturating\<u8>> for Saturating\<u8>



### impl RemAssign\<&Saturating\<u16>> for Saturating\<u16>



### impl RemAssign\<&Saturating\<u32>> for Saturating\<u32>



### impl RemAssign\<&Saturating\<u64>> for Saturating\<u64>



### impl RemAssign\<&Saturating\<u128>> for Saturating\<u128>



### impl RemAssign\<&Saturating\<usize>> for Saturating\<usize>



### impl RemAssign\<&Wrapping\<i8>> for Wrapping\<i8>



### impl RemAssign\<&Wrapping\<i16>> for Wrapping\<i16>



### impl RemAssign\<&Wrapping\<i32>> for Wrapping\<i32>



### impl RemAssign\<&Wrapping\<i64>> for Wrapping\<i64>



### impl RemAssign\<&Wrapping\<i128>> for Wrapping\<i128>



### impl RemAssign\<&Wrapping\<isize>> for Wrapping\<isize>



### impl RemAssign\<&Wrapping\<u8>> for Wrapping\<u8>



### impl RemAssign\<&Wrapping\<u16>> for Wrapping\<u16>



### impl RemAssign\<&Wrapping\<u32>> for Wrapping\<u32>



### impl RemAssign\<&Wrapping\<u64>> for Wrapping\<u64>



### impl RemAssign\<&Wrapping\<u128>> for Wrapping\<u128>



### impl RemAssign\<&Wrapping\<usize>> for Wrapping\<usize>



### impl RemAssign\<f32> for f32



### impl RemAssign\<f64> for f64



### impl RemAssign\<i8> for i8



### impl RemAssign\<i8> for Saturating\<i8>



### impl RemAssign\<i8> for Wrapping\<i8>



### impl RemAssign\<i16> for i16



### impl RemAssign\<i16> for Saturating\<i16>



### impl RemAssign\<i16> for Wrapping\<i16>



### impl RemAssign\<i32> for i32



### impl RemAssign\<i32> for Saturating\<i32>



### impl RemAssign\<i32> for Wrapping\<i32>



### impl RemAssign\<i64> for i64



### impl RemAssign\<i64> for Saturating\<i64>



### impl RemAssign\<i64> for Wrapping\<i64>



### impl RemAssign\<i128> for i128



### impl RemAssign\<i128> for Saturating\<i128>



### impl RemAssign\<i128> for Wrapping\<i128>



### impl RemAssign\<isize> for isize



### impl RemAssign\<isize> for Saturating\<isize>



### impl RemAssign\<isize> for Wrapping\<isize>



### impl RemAssign\<u8> for u8



### impl RemAssign\<u8> for Saturating\<u8>



### impl RemAssign\<u8> for Wrapping\<u8>



### impl RemAssign\<u16> for u16



### impl RemAssign\<u16> for Saturating\<u16>



### impl RemAssign\<u16> for Wrapping\<u16>



### impl RemAssign\<u32> for u32



### impl RemAssign\<u32> for Saturating\<u32>



### impl RemAssign\<u32> for Wrapping\<u32>



### impl RemAssign\<u64> for u64



### impl RemAssign\<u64> for Saturating\<u64>



### impl RemAssign\<u64> for Wrapping\<u64>



### impl RemAssign\<u128> for u128



### impl RemAssign\<u128> for Saturating\<u128>



### impl RemAssign\<u128> for Wrapping\<u128>



### impl RemAssign\<usize> for usize



### impl RemAssign\<usize> for Saturating\<usize>



### impl RemAssign\<usize> for Wrapping\<usize>



### impl RemAssign\<Saturating\<i8>> for Saturating\<i8>



### impl RemAssign\<Saturating\<i16>> for Saturating\<i16>



### impl RemAssign\<Saturating\<i32>> for Saturating\<i32>



### impl RemAssign\<Saturating\<i64>> for Saturating\<i64>



### impl RemAssign\<Saturating\<i128>> for Saturating\<i128>



### impl RemAssign\<Saturating\<isize>> for Saturating\<isize>



### impl RemAssign\<Saturating\<u8>> for Saturating\<u8>



### impl RemAssign\<Saturating\<u16>> for Saturating\<u16>



### impl RemAssign\<Saturating\<u32>> for Saturating\<u32>



### impl RemAssign\<Saturating\<u64>> for Saturating\<u64>



### impl RemAssign\<Saturating\<u128>> for Saturating\<u128>



### impl RemAssign\<Saturating\<usize>> for Saturating\<usize>



### impl RemAssign\<Wrapping\<i8>> for Wrapping\<i8>



### impl RemAssign\<Wrapping\<i16>> for Wrapping\<i16>



### impl RemAssign\<Wrapping\<i32>> for Wrapping\<i32>



### impl RemAssign\<Wrapping\<i64>> for Wrapping\<i64>



### impl RemAssign\<Wrapping\<i128>> for Wrapping\<i128>



### impl RemAssign\<Wrapping\<isize>> for Wrapping\<isize>



### impl RemAssign\<Wrapping\<u8>> for Wrapping\<u8>



### impl RemAssign\<Wrapping\<u16>> for Wrapping\<u16>



### impl RemAssign\<Wrapping\<u32>> for Wrapping\<u32>



### impl RemAssign\<Wrapping\<u64>> for Wrapping\<u64>



### impl RemAssign\<Wrapping\<u128>> for Wrapping\<u128>



### impl RemAssign\<Wrapping\<usize>> for Wrapping\<usize>



### impl<T, U, const LANES: usize> RemAssign\<U> for Simd<T, LANES>

```rust
impl<T, U, const LANES: usize> RemAssign<U> for Simd<T, LANES>
where
  Simd<T, LANES>: Rem<U, Output = Simd<T, LANES>>,
  T: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
```

