# Trait std::convert::TryFrom

用于将`T`类型的值转化为`Self`类型的值，但是可能会出现转换失败的情况，它是 `TryInto ` 的倒数。

```rust
pub trait TryFrom<T>: Sized {
    type Error;

    // Required method
    fn try_from(value: T) -> Result<Self, Self::Error>;
}
```

简单安全的类型转换在某些情况下可能会以受控方式失败。它是 `TryInto` 的倒数。

**当您进行的类型转换可能会成功完成但可能还需要特殊处理时，这很有用**。

例如，无法使用 From trait 将 `i64` 转换为 `i32`，因为 `i64` 可能包含 `i32` 无法表示的值，因此转换将丢失数据。

这可以通过将 `i64` 截断为 `i32` (本质上给 i64 的值取 i32::MAX 模) 或通过简单地返回 i32::MAX 或其他方法来处理。

From trait 用于完美的转换，因此 TryFrom trait 会通知程序员类型转换何时会变差，并让他们决定如何处理它。

## 泛型实现

- `TryFrom\<T> for U` 意味着 `TryInto\<U> for T`
- `try_from` 是反射的，这意味着 `TryFrom\<T> for T` 已实现并且不会失败 – 用于在类型 T 上调用 `T::try_from()` 的关联 `Error` 类型是 `Infallible`。 当 `!` 类型稳定后，`Infallible` 和 `!` 将等效。

`TryFrom\<T>` 可以实现如下：

```rust
struct GreaterThanZero(i32);

impl TryFrom<i32> for GreaterThanZero {
    type Error = &'static str;

    fn try_from(value: i32) -> Result<Self, Self::Error> {
        if value <= 0 {
            Err("GreaterThanZero only accepts values greater than zero!")
        } else {
            Ok(GreaterThanZero(value))
        }
    }
}
```

如上所述，`i32` 实现了 `TryFrom\<i64>`：

```rust
let big_number = 1_000_000_000_000i64;
// 默默地截断 `big_number`，事实之后需要检测并处理该截断。
let smaller_number = big_number as i32;
assert_eq!(smaller_number, -727379968);

// 由于 `big_number` 太大而无法容纳在 `i32` 中，因此返回错误。
let try_smaller_number = i32::try_from(big_number);
assert!(try_smaller_number.is_err());

// 返回 `Ok(3)`。
let try_successful_smaller_number = i32::try_from(3);
assert!(try_successful_smaller_number.is_ok());
```





## Required Associated Types

### Error

发生转换错误时返回的类型。

```rust
type Error
```



## Required Methods

### try_from

转换函数，将`T`类型转化为`Self`类型并放入`Ok`中，若转换失败则返回`Err`

```rust
fn try_from(value: T) -> Result<Self, Self::Error>
```



### 

## Implementors

### impl TryFrom\<char> for u8



### impl TryFrom\<i8> for u8



### impl TryFrom\<i8> for u16



### impl TryFrom\<i8> for u32



### impl TryFrom\<i8> for u64



### impl TryFrom\<i8> for u128



### impl TryFrom\<i8> for usize



### impl TryFrom\<i8> for NonZeroI8



### impl TryFrom\<i16> for i8



### impl TryFrom\<i16> for u8



### impl TryFrom\<i16> for u16



### impl TryFrom\<i16> for u32



### impl TryFrom\<i16> for u64



### impl TryFrom\<i16> for u128



### impl TryFrom\<i16> for usize



### impl TryFrom\<i16> for NonZeroI16



### impl TryFrom\<i32> for i8



### impl TryFrom\<i32> for i16



### impl TryFrom\<i32> for isize



### impl TryFrom\<i32> for u8



### impl TryFrom\<i32> for u16



### impl TryFrom\<i32> for u32



### impl TryFrom\<i32> for u64



### impl TryFrom\<i32> for u128



### impl TryFrom\<i32> for usize



### impl TryFrom\<i32> for NonZeroI32



### impl TryFrom\<i64> for i8



### impl TryFrom\<i64> for i16



### impl TryFrom\<i64> for i32



### impl TryFrom\<i64> for isize



### impl TryFrom\<i64> for u8



### impl TryFrom\<i64> for u16



### impl TryFrom\<i64> for u32



### impl TryFrom\<i64> for u64



### impl TryFrom\<i64> for u128



### impl TryFrom\<i64> for usize



### impl TryFrom\<i64> for NonZeroI64



### impl TryFrom\<i128> for i8



### impl TryFrom\<i128> for i16



### impl TryFrom\<i128> for i32



### impl TryFrom\<i128> for i64



### impl TryFrom\<i128> for isize



### impl TryFrom\<i128> for u8



### impl TryFrom\<i128> for u16



### impl TryFrom\<i128> for u32



### impl TryFrom\<i128> for u64



### impl TryFrom\<i128> for u128



### impl TryFrom\<i128> for usize



### impl TryFrom\<i128> for NonZeroI128



### impl TryFrom\<isize> for i8



### impl TryFrom\<isize> for i16



### impl TryFrom\<isize> for i32



### impl TryFrom\<isize> for i64



### impl TryFrom\<isize> for i128



### impl TryFrom\<isize> for u8



### impl TryFrom\<isize> for u16



### impl TryFrom\<isize> for u32



### impl TryFrom\<isize> for u64



### impl TryFrom\<isize> for u128



### impl TryFrom\<isize> for usize



### impl TryFrom\<isize> for NonZeroIsize



### impl TryFrom\<u8> for i8



### impl TryFrom\<u8> for NonZeroU8



### impl TryFrom\<u16> for i8



### impl TryFrom\<u16> for i16



### impl TryFrom\<u16> for isize



### impl TryFrom\<u16> for u8



### impl TryFrom\<u16> for NonZeroU16



### impl TryFrom\<u32> for char



### impl TryFrom\<u32> for i8



### impl TryFrom\<u32> for i16



### impl TryFrom\<u32> for i32



### impl TryFrom\<u32> for isize



### impl TryFrom\<u32> for u8



### impl TryFrom\<u32> for u16



### impl TryFrom\<u32> for usize



### impl TryFrom\<u32> for NonZeroU32



### impl TryFrom\<u64> for i8



### impl TryFrom\<u64> for i16



### impl TryFrom\<u64> for i32



### impl TryFrom\<u64> for i64



### impl TryFrom\<u64> for isize



### impl TryFrom\<u64> for u8



### impl TryFrom\<u64> for u16



### impl TryFrom\<u64> for u32



### impl TryFrom\<u64> for usize



### impl TryFrom\<u64> for NonZeroU64



### impl TryFrom\<u128> for i8



### impl TryFrom\<u128> for i16



### impl TryFrom\<u128> for i32



### impl TryFrom\<u128> for i64



### impl TryFrom\<u128> for i128



### impl TryFrom\<u128> for isize



### impl TryFrom\<u128> for u8



### impl TryFrom\<u128> for u16



### impl TryFrom\<u128> for u32



### impl TryFrom\<u128> for u64



### impl TryFrom\<u128> for usize



### impl TryFrom\<u128> for NonZeroU128



### impl TryFrom\<usize> for i8



### impl TryFrom\<usize> for i16



### impl TryFrom\<usize> for i32



### impl TryFrom\<usize> for i64



### impl TryFrom\<usize> for i128



### impl TryFrom\<usize> for isize



### impl TryFrom\<usize> for u8



### impl TryFrom\<usize> for u16



### impl TryFrom\<usize> for u32



### impl TryFrom\<usize> for u64



### impl TryFrom\<usize> for u128



### impl TryFrom\<usize> for NonZeroUsize



### impl TryFrom\<usize> for Alignment



### impl TryFrom\<NonZeroI8> for NonZeroU8



### impl TryFrom\<NonZeroI8> for NonZeroU16



### impl TryFrom\<NonZeroI8> for NonZeroU32



### impl TryFrom\<NonZeroI8> for NonZeroU64



### impl TryFrom\<NonZeroI8> for NonZeroU128



### impl TryFrom\<NonZeroI8> for NonZeroUsize



### impl TryFrom\<NonZeroI16> for NonZeroI8



### impl TryFrom\<NonZeroI16> for NonZeroU8



### impl TryFrom\<NonZeroI16> for NonZeroU16



### impl TryFrom\<NonZeroI16> for NonZeroU32



### impl TryFrom\<NonZeroI16> for NonZeroU64



### impl TryFrom\<NonZeroI16> for NonZeroU128



### impl TryFrom\<NonZeroI16> for NonZeroUsize



### impl TryFrom\<NonZeroI32> for NonZeroI8



### impl TryFrom\<NonZeroI32> for NonZeroI16



### impl TryFrom\<NonZeroI32> for NonZeroIsize



### impl TryFrom\<NonZeroI32> for NonZeroU8



### impl TryFrom\<NonZeroI32> for NonZeroU16



### impl TryFrom\<NonZeroI32> for NonZeroU32



### impl TryFrom\<NonZeroI32> for NonZeroU64



### impl TryFrom\<NonZeroI32> for NonZeroU128



### impl TryFrom\<NonZeroI32> for NonZeroUsize



### impl TryFrom\<NonZeroI64> for NonZeroI8



### impl TryFrom\<NonZeroI64> for NonZeroI16



### impl TryFrom\<NonZeroI64> for NonZeroI32



### impl TryFrom\<NonZeroI64> for NonZeroIsize



### impl TryFrom\<NonZeroI64> for NonZeroU8



### impl TryFrom\<NonZeroI64> for NonZeroU16



### impl TryFrom\<NonZeroI64> for NonZeroU32



### impl TryFrom\<NonZeroI64> for NonZeroU64



### impl TryFrom\<NonZeroI64> for NonZeroU128



### impl TryFrom\<NonZeroI64> for NonZeroUsize



### impl TryFrom\<NonZeroI128> for NonZeroI8



### impl TryFrom\<NonZeroI128> for NonZeroI16



### impl TryFrom\<NonZeroI128> for NonZeroI32



### impl TryFrom\<NonZeroI128> for NonZeroI64



### impl TryFrom\<NonZeroI128> for NonZeroIsize



### impl TryFrom\<NonZeroI128> for NonZeroU8



### impl TryFrom\<NonZeroI128> for NonZeroU16



### impl TryFrom\<NonZeroI128> for NonZeroU32



### impl TryFrom\<NonZeroI128> for NonZeroU64



### impl TryFrom\<NonZeroI128> for NonZeroU128



### impl TryFrom\<NonZeroI128> for NonZeroUsize



### impl TryFrom\<NonZeroIsize> for NonZeroI8



### impl TryFrom\<NonZeroIsize> for NonZeroI16



### impl TryFrom\<NonZeroIsize> for NonZeroI32



### impl TryFrom\<NonZeroIsize> for NonZeroI64



### impl TryFrom\<NonZeroIsize> for NonZeroI128



### impl TryFrom\<NonZeroIsize> for NonZeroU8



### impl TryFrom\<NonZeroIsize> for NonZeroU16



### impl TryFrom\<NonZeroIsize> for NonZeroU32



### impl TryFrom\<NonZeroIsize> for NonZeroU64



### impl TryFrom\<NonZeroIsize> for NonZeroU128



### impl TryFrom\<NonZeroIsize> for NonZeroUsize



### impl TryFrom\<NonZeroU8> for NonZeroI8



### impl TryFrom\<NonZeroU16> for NonZeroI8



### impl TryFrom\<NonZeroU16> for NonZeroI16



### impl TryFrom\<NonZeroU16> for NonZeroIsize



### impl TryFrom\<NonZeroU16> for NonZeroU8



### impl TryFrom\<NonZeroU32> for NonZeroI8



### impl TryFrom\<NonZeroU32> for NonZeroI16



### impl TryFrom\<NonZeroU32> for NonZeroI32



### impl TryFrom\<NonZeroU32> for NonZeroIsize



### impl TryFrom\<NonZeroU32> for NonZeroU8



### impl TryFrom\<NonZeroU32> for NonZeroU16



### impl TryFrom\<NonZeroU32> for NonZeroUsize



### impl TryFrom\<NonZeroU64> for NonZeroI8



### impl TryFrom\<NonZeroU64> for NonZeroI16



### impl TryFrom\<NonZeroU64> for NonZeroI32



### impl TryFrom\<NonZeroU64> for NonZeroI64



### impl TryFrom\<NonZeroU64> for NonZeroIsize



### impl TryFrom\<NonZeroU64> for NonZeroU8



### impl TryFrom\<NonZeroU64> for NonZeroU16



### impl TryFrom\<NonZeroU64> for NonZeroU32



### impl TryFrom\<NonZeroU64> for NonZeroUsize



### impl TryFrom\<NonZeroU128> for NonZeroI8



### impl TryFrom\<NonZeroU128> for NonZeroI16



### impl TryFrom\<NonZeroU128> for NonZeroI32



### impl TryFrom\<NonZeroU128> for NonZeroI64



### impl TryFrom\<NonZeroU128> for NonZeroI128



### impl TryFrom\<NonZeroU128> for NonZeroIsize



### impl TryFrom\<NonZeroU128> for NonZeroU8



### impl TryFrom\<NonZeroU128> for NonZeroU16



### impl TryFrom\<NonZeroU128> for NonZeroU32



### impl TryFrom\<NonZeroU128> for NonZeroU64



### impl TryFrom\<NonZeroU128> for NonZeroUsize



### impl TryFrom\<NonZeroUsize> for NonZeroI8



### impl TryFrom\<NonZeroUsize> for NonZeroI16



### impl TryFrom\<NonZeroUsize> for NonZeroI32



### impl TryFrom\<NonZeroUsize> for NonZeroI64



### impl TryFrom\<NonZeroUsize> for NonZeroI128



### impl TryFrom\<NonZeroUsize> for NonZeroIsize



### impl TryFrom\<NonZeroUsize> for NonZeroU8



### impl TryFrom\<NonZeroUsize> for NonZeroU16



### impl TryFrom\<NonZeroUsize> for NonZeroU32



### impl TryFrom\<NonZeroUsize> for NonZeroU64



### impl TryFrom\<NonZeroUsize> for NonZeroU128



### impl TryFrom\<NonZeroUsize> for Alignment



impl TryFrom\<HandleOrInvalid> for OwnedHandle

`Available on Windows only.`



impl TryFrom\<HandleOrNull> for OwnedHandle

`Available on Windows only.`



### impl\<'a, T, const N: usize> TryFrom\<&'a [T]> for &'a [T; N]



### impl\<'a, T, const N: usize> TryFrom\<&'a mut [T]> for &'a mut [T; N]



### impl<T, A, const N: usize> TryFrom<Vec<T, A>> for [T; N]

```rust
impl<T, A, const N: usize> TryFrom<Vec<T, A>> for [T; N]
where
  A: Allocator,
```



### impl<T, U> TryFrom\<U> for T

```rust
impl<T, U> TryFrom<U> for T
where
  U: Into<T>,
```



### impl<T, const N: usize> TryFrom<&[T]> for [T; N]

```rust
impl<T, const N: usize> TryFrom<&[T]> for [T; N]
where
  T: Copy,
```



### impl<T, const N: usize> TryFrom<&[T]> for Simd<T, N>

```rust
impl<T, const N: usize> TryFrom<&[T]> for Simd<T, N>
where
  LaneCount<N>: SupportedLaneCount,
  T: SimdElement,
```



### impl<T, const N: usize> TryFrom<&mut [T]> for [T; N]

```rust
impl<T, const N: usize> TryFrom<&mut [T]> for [T; N]
where
  T: Copy,
```



### impl<T, const N: usize> TryFrom<&mut [T]> for Simd<T, N>

```rust
impl<T, const N: usize> TryFrom<&mut [T]> for Simd<T, N>
where
  LaneCount<N>: SupportedLaneCount,
  T: SimdElement,
```

### impl\<T, const N: usize> TryFrom\<Box\<[T], Global>> for Box\<[T; N], Global>



### impl\<T, const N: usize> TryFrom\<Rc\<[T]>> for Rc\<[T; N]>



### impl\<T, const N: usize> TryFrom\<Arc\<[T]>> for Arc\<[T; N]>



### impl\<T, const N: usize> TryFrom\<Vec\<T, Global>

