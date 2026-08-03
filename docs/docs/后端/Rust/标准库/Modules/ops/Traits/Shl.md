# Trait std::ops::Shl

左移位运算符 `<<`。 请注意，因为此 trait 是针对具有多个右侧类型的所有整数类型实现的，所以 Rust 的类型检查器对 `_ << _` 具有特殊的处理方式，将整数运算的结果类型设置为左侧操作数的类型。

这意味着尽管从评估的角度来看，`a << b` 和 `a.shl(b)` 是相同的，但是在类型推断方面它们是不同的。

```rust
pub trait Shl<Rhs = Self> {
    type Output;

    // Required method
    fn shl(self, rhs: Rhs) -> Self::Output;
}
```

`Shl` 的实现，将整数的 `<<` 操作提升为 `usize` 的包装器。

```rust
use std::ops::Shl;

#[derive(PartialEq, Debug)]
struct Scalar(usize);

impl Shl<Scalar> for Scalar {
    type Output = Self;

    fn shl(self, Self(rhs): Self) -> Self::Output {
        let Self(lhs) = self;
        Self(lhs << rhs)
    }
}

assert_eq!(Scalar(4) << Scalar(2), Scalar(16));
```

`Shl` 的实现，将 vector 向左旋转给定的数量。

```rust
use std::ops::Shl;

#[derive(PartialEq, Debug)]
struct SpinVector<T: Clone> {
    vec: Vec<T>,
}

impl<T: Clone> Shl<usize> for SpinVector<T> {
    type Output = Self;

    fn shl(self, rhs: usize) -> Self::Output {
        // 将 vector 旋转 `rhs` 个位置。
        let (a, b) = self.vec.split_at(rhs);
        let mut spun_vector = vec![];
        spun_vector.extend_from_slice(b);
        spun_vector.extend_from_slice(a);
        Self { vec: spun_vector }
    }
}

assert_eq!(SpinVector { vec: vec![0, 1, 2, 3, 4] } << 2,
           SpinVector { vec: vec![2, 3, 4, 0, 1] });
```



## Required Associated Types

### Output

应用 `<<` 运算符后的结果类型。

```rust
type Output
```



## Required Methods

### shl

```rust
fn shl(self, rhs: Rhs) -> Self::Output
```

**参数**：

- **rhs**：执行 ` <<` 操作的右值

**返回值**：返回左移运算后的值

```rust
assert_eq!(5u8 << 1, 10);
assert_eq!(1u8 << 1, 2);
```

### 

## Implementors

### impl Shl\<&i8> for &i8



### impl Shl\<&i8> for &i16



### impl Shl\<&i8> for &i32



### impl Shl\<&i8> for &i64



### impl Shl\<&i8> for &i128



### impl Shl\<&i8> for &isize



### impl Shl\<&i8> for &u8



### impl Shl\<&i8> for &u16



### impl Shl\<&i8> for &u32



### impl Shl\<&i8> for &u64



### impl Shl\<&i8> for &u128



### impl Shl\<&i8> for &usize



### impl Shl\<&i8> for i8



### impl Shl\<&i8> for i16



### impl Shl\<&i8> for i32



### impl Shl\<&i8> for i64



### impl Shl\<&i8> for i128



### impl Shl\<&i8> for isize



### impl Shl\<&i8> for u8



### impl Shl\<&i8> for u16



### impl Shl\<&i8> for u32



### impl Shl\<&i8> for u64



### impl Shl\<&i8> for u128



### impl Shl\<&i8> for usize



### impl Shl\<&i16> for &i8



### impl Shl\<&i16> for &i16



### impl Shl\<&i16> for &i32



### impl Shl\<&i16> for &i64



### impl Shl\<&i16> for &i128



### impl Shl\<&i16> for &isize



### impl Shl\<&i16> for &u8



### impl Shl\<&i16> for &u16



### impl Shl\<&i16> for &u32



### impl Shl\<&i16> for &u64



### impl Shl\<&i16> for &u128



### impl Shl\<&i16> for &usize



### impl Shl\<&i16> for i8



### impl Shl\<&i16> for i16



### impl Shl\<&i16> for i32



### impl Shl\<&i16> for i64



### impl Shl\<&i16> for i128



### impl Shl\<&i16> for isize



### impl Shl\<&i16> for u8



### impl Shl\<&i16> for u16



### impl Shl\<&i16> for u32



### impl Shl\<&i16> for u64



### impl Shl\<&i16> for u128



### impl Shl\<&i16> for usize



### impl Shl\<&i32> for &i8



### impl Shl\<&i32> for &i16



### impl Shl\<&i32> for &i32



### impl Shl\<&i32> for &i64



### impl Shl\<&i32> for &i128



### impl Shl\<&i32> for &isize



### impl Shl\<&i32> for &u8



### impl Shl\<&i32> for &u16



### impl Shl\<&i32> for &u32



### impl Shl\<&i32> for &u64



### impl Shl\<&i32> for &u128



### impl Shl\<&i32> for &usize



### impl Shl\<&i32> for i8



### impl Shl\<&i32> for i16



### impl Shl\<&i32> for i32



### impl Shl\<&i32> for i64



### impl Shl\<&i32> for i128



### impl Shl\<&i32> for isize



### impl Shl\<&i32> for u8



### impl Shl\<&i32> for u16



### impl Shl\<&i32> for u32



### impl Shl\<&i32> for u64



### impl Shl\<&i32> for u128



### impl Shl\<&i32> for usize



### impl Shl\<&i64> for &i8



### impl Shl\<&i64> for &i16



### impl Shl\<&i64> for &i32



### impl Shl\<&i64> for &i64



### impl Shl\<&i64> for &i128



### impl Shl\<&i64> for &isize



### impl Shl\<&i64> for &u8



### impl Shl\<&i64> for &u16



### impl Shl\<&i64> for &u32



### impl Shl\<&i64> for &u64



### impl Shl\<&i64> for &u128



### impl Shl\<&i64> for &usize



### impl Shl\<&i64> for i8



### impl Shl\<&i64> for i16



### impl Shl\<&i64> for i32



### impl Shl\<&i64> for i64



### impl Shl\<&i64> for i128



### impl Shl\<&i64> for isize



### impl Shl\<&i64> for u8



### impl Shl\<&i64> for u16



### impl Shl\<&i64> for u32



### impl Shl\<&i64> for u64



### impl Shl\<&i64> for u128



### impl Shl\<&i64> for usize



### impl Shl\<&i128> for &i8



### impl Shl\<&i128> for &i16



### impl Shl\<&i128> for &i32



### impl Shl\<&i128> for &i64



### impl Shl\<&i128> for &i128



### impl Shl\<&i128> for &isize



### impl Shl\<&i128> for &u8



### impl Shl\<&i128> for &u16



### impl Shl\<&i128> for &u32



### impl Shl\<&i128> for &u64



### impl Shl\<&i128> for &u128



### impl Shl\<&i128> for &usize



### impl Shl\<&i128> for i8



### impl Shl\<&i128> for i16



### impl Shl\<&i128> for i32



### impl Shl\<&i128> for i64



### impl Shl\<&i128> for i128



### impl Shl\<&i128> for isize



### impl Shl\<&i128> for u8



### impl Shl\<&i128> for u16



### impl Shl\<&i128> for u32



### impl Shl\<&i128> for u64



### impl Shl\<&i128> for u128



### impl Shl\<&i128> for usize



### impl Shl\<&isize> for &i8



### impl Shl\<&isize> for &i16



### impl Shl\<&isize> for &i32



### impl Shl\<&isize> for &i64



### impl Shl\<&isize> for &i128



### impl Shl\<&isize> for &isize



### impl Shl\<&isize> for &u8



### impl Shl\<&isize> for &u16



### impl Shl\<&isize> for &u32



### impl Shl\<&isize> for &u64



### impl Shl\<&isize> for &u128



### impl Shl\<&isize> for &usize



### impl Shl\<&isize> for i8



### impl Shl\<&isize> for i16



### impl Shl\<&isize> for i32



### impl Shl\<&isize> for i64



### impl Shl\<&isize> for i128



### impl Shl\<&isize> for isize



### impl Shl\<&isize> for u8



### impl Shl\<&isize> for u16



### impl Shl\<&isize> for u32



### impl Shl\<&isize> for u64



### impl Shl\<&isize> for u128



### impl Shl\<&isize> for usize



### impl Shl\<&u8> for &i8



### impl Shl\<&u8> for &i16



### impl Shl\<&u8> for &i32



### impl Shl\<&u8> for &i64



### impl Shl\<&u8> for &i128



### impl Shl\<&u8> for &isize



### impl Shl\<&u8> for &u8



### impl Shl\<&u8> for &u16



### impl Shl\<&u8> for &u32



### impl Shl\<&u8> for &u64



### impl Shl\<&u8> for &u128



### impl Shl\<&u8> for &usize



### impl Shl\<&u8> for i8



### impl Shl\<&u8> for i16



### impl Shl\<&u8> for i32



### impl Shl\<&u8> for i64



### impl Shl\<&u8> for i128



### impl Shl\<&u8> for isize



### impl Shl\<&u8> for u8



### impl Shl\<&u8> for u16



### impl Shl\<&u8> for u32



### impl Shl\<&u8> for u64



### impl Shl\<&u8> for u128



### impl Shl\<&u8> for usize



### impl Shl\<&u16> for &i8



### impl Shl\<&u16> for &i16



### impl Shl\<&u16> for &i32



### impl Shl\<&u16> for &i64



### impl Shl\<&u16> for &i128



### impl Shl\<&u16> for &isize



### impl Shl\<&u16> for &u8



### impl Shl\<&u16> for &u16



### impl Shl\<&u16> for &u32



### impl Shl\<&u16> for &u64



### impl Shl\<&u16> for &u128



### impl Shl\<&u16> for &usize



### impl Shl\<&u16> for i8



### impl Shl\<&u16> for i16



### impl Shl\<&u16> for i32



### impl Shl\<&u16> for i64



### impl Shl\<&u16> for i128



### impl Shl\<&u16> for isize



### impl Shl\<&u16> for u8



### impl Shl\<&u16> for u16



### impl Shl\<&u16> for u32



### impl Shl\<&u16> for u64



### impl Shl\<&u16> for u128



### impl Shl\<&u16> for usize



### impl Shl\<&u32> for &i8



### impl Shl\<&u32> for &i16



### impl Shl\<&u32> for &i32



### impl Shl\<&u32> for &i64



### impl Shl\<&u32> for &i128



### impl Shl\<&u32> for &isize



### impl Shl\<&u32> for &u8



### impl Shl\<&u32> for &u16



### impl Shl\<&u32> for &u32



### impl Shl\<&u32> for &u64



### impl Shl\<&u32> for &u128



### impl Shl\<&u32> for &usize



### impl Shl\<&u32> for i8



### impl Shl\<&u32> for i16



### impl Shl\<&u32> for i32



### impl Shl\<&u32> for i64



### impl Shl\<&u32> for i128



### impl Shl\<&u32> for isize



### impl Shl\<&u32> for u8



### impl Shl\<&u32> for u16



### impl Shl\<&u32> for u32



### impl Shl\<&u32> for u64



### impl Shl\<&u32> for u128



### impl Shl\<&u32> for usize



### impl Shl\<&u64> for &i8



### impl Shl\<&u64> for &i16



### impl Shl\<&u64> for &i32



### impl Shl\<&u64> for &i64



### impl Shl\<&u64> for &i128



### impl Shl\<&u64> for &isize



### impl Shl\<&u64> for &u8



### impl Shl\<&u64> for &u16



### impl Shl\<&u64> for &u32



### impl Shl\<&u64> for &u64



### impl Shl\<&u64> for &u128



### impl Shl\<&u64> for &usize



### impl Shl\<&u64> for i8



### impl Shl\<&u64> for i16



### impl Shl\<&u64> for i32



### impl Shl\<&u64> for i64



### impl Shl\<&u64> for i128



### impl Shl\<&u64> for isize



### impl Shl\<&u64> for u8



### impl Shl\<&u64> for u16



### impl Shl\<&u64> for u32



### impl Shl\<&u64> for u64



### impl Shl\<&u64> for u128



### impl Shl\<&u64> for usize



### impl Shl\<&u128> for &i8



### impl Shl\<&u128> for &i16



### impl Shl\<&u128> for &i32



### impl Shl\<&u128> for &i64



### impl Shl\<&u128> for &i128



### impl Shl\<&u128> for &isize



### impl Shl\<&u128> for &u8



### impl Shl\<&u128> for &u16



### impl Shl\<&u128> for &u32



### impl Shl\<&u128> for &u64



### impl Shl\<&u128> for &u128



### impl Shl\<&u128> for &usize



### impl Shl\<&u128> for i8



### impl Shl\<&u128> for i16



### impl Shl\<&u128> for i32



### impl Shl\<&u128> for i64



### impl Shl\<&u128> for i128



### impl Shl\<&u128> for isize



### impl Shl\<&u128> for u8



### impl Shl\<&u128> for u16



### impl Shl\<&u128> for u32



### impl Shl\<&u128> for u64



### impl Shl\<&u128> for u128



### impl Shl\<&u128> for usize



### impl Shl\<&usize> for &i8



### impl Shl\<&usize> for &i16



### impl Shl\<&usize> for &i32



### impl Shl\<&usize> for &i64



### impl Shl\<&usize> for &i128



### impl Shl\<&usize> for &isize



### impl Shl\<&usize> for &u8



### impl Shl\<&usize> for &u16



### impl Shl\<&usize> for &u32



### impl Shl\<&usize> for &u64



### impl Shl\<&usize> for &u128



### impl Shl\<&usize> for &usize



### impl Shl\<&usize> for &Saturating\<i8>



### impl Shl\<&usize> for &Saturating\<i16>



### impl Shl\<&usize> for &Saturating\<i32>



### impl Shl\<&usize> for &Saturating\<i64>



### impl Shl\<&usize> for &Saturating\<i128>



### impl Shl\<&usize> for &Saturating\<isize>



### impl Shl\<&usize> for &Saturating\<u8>



### impl Shl\<&usize> for &Saturating\<u16>



### impl Shl\<&usize> for &Saturating\<u32>



### impl Shl\<&usize> for &Saturating\<u64>



### impl Shl\<&usize> for &Saturating\<u128>



### impl Shl\<&usize> for &Saturating\<usize>



### impl Shl\<&usize> for &Wrapping\<i8>



### impl Shl\<&usize> for &Wrapping\<i16>



### impl Shl\<&usize> for &Wrapping\<i32>



### impl Shl\<&usize> for &Wrapping\<i64>



### impl Shl\<&usize> for &Wrapping\<i128>



### impl Shl\<&usize> for &Wrapping\<isize>



### impl Shl\<&usize> for &Wrapping\<u8>



### impl Shl\<&usize> for &Wrapping\<u16>



### impl Shl\<&usize> for &Wrapping\<u32>



### impl Shl\<&usize> for &Wrapping\<u64>



### impl Shl\<&usize> for &Wrapping\<u128>



### impl Shl\<&usize> for &Wrapping\<usize>



### impl Shl\<&usize> for i8



### impl Shl\<&usize> for i16



### impl Shl\<&usize> for i32



### impl Shl\<&usize> for i64



### impl Shl\<&usize> for i128



### impl Shl\<&usize> for isize



### impl Shl\<&usize> for u8



### impl Shl\<&usize> for u16



### impl Shl\<&usize> for u32



### impl Shl\<&usize> for u64



### impl Shl\<&usize> for u128



### impl Shl\<&usize> for usize



### impl Shl\<&usize> for Saturating\<i8>



### impl Shl\<&usize> for Saturating\<i16>



### impl Shl\<&usize> for Saturating\<i32>



### impl Shl\<&usize> for Saturating\<i64>



### impl Shl\<&usize> for Saturating\<i128>



### impl Shl\<&usize> for Saturating\<isize>



### impl Shl\<&usize> for Saturating\<u8>



### impl Shl\<&usize> for Saturating\<u16>



### impl Shl\<&usize> for Saturating\<u32>



### impl Shl\<&usize> for Saturating\<u64>



### impl Shl\<&usize> for Saturating\<u128>



### impl Shl\<&usize> for Saturating\<usize>



### impl Shl\<&usize> for Wrapping\<i8>



### impl Shl\<&usize> for Wrapping\<i16>



### impl Shl\<&usize> for Wrapping\<i32>



### impl Shl\<&usize> for Wrapping\<i64>



### impl Shl\<&usize> for Wrapping\<i128>



### impl Shl\<&usize> for Wrapping\<isize>



### impl Shl\<&usize> for Wrapping\<u8>



### impl Shl\<&usize> for Wrapping\<u16>



### impl Shl\<&usize> for Wrapping\<u32>



### impl Shl\<&usize> for Wrapping\<u64>



### impl Shl\<&usize> for Wrapping\<u128>



### impl Shl\<&usize> for Wrapping\<usize>



### impl Shl\<i8> for i8



### impl Shl\<i8> for i16



### impl Shl\<i8> for i32



### impl Shl\<i8> for i64



### impl Shl\<i8> for i128



### impl Shl\<i8> for isize



### impl Shl\<i8> for u8



### impl Shl\<i8> for u16



### impl Shl\<i8> for u32



### impl Shl\<i8> for u64



### impl Shl\<i8> for u128



### impl Shl\<i8> for usize



### impl Shl\<i16> for i8



### impl Shl\<i16> for i16



### impl Shl\<i16> for i32



### impl Shl\<i16> for i64



### impl Shl\<i16> for i128



### impl Shl\<i16> for isize



### impl Shl\<i16> for u8



### impl Shl\<i16> for u16



### impl Shl\<i16> for u32



### impl Shl\<i16> for u64



### impl Shl\<i16> for u128



### impl Shl\<i16> for usize



### impl Shl\<i32> for i8



### impl Shl\<i32> for i16



### impl Shl\<i32> for i32



### impl Shl\<i32> for i64



### impl Shl\<i32> for i128



### impl Shl\<i32> for isize



### impl Shl\<i32> for u8



### impl Shl\<i32> for u16



### impl Shl\<i32> for u32



### impl Shl\<i32> for u64



### impl Shl\<i32> for u128



### impl Shl\<i32> for usize



### impl Shl\<i64> for i8



### impl Shl\<i64> for i16



### impl Shl\<i64> for i32



### impl Shl\<i64> for i64



### impl Shl\<i64> for i128



### impl Shl\<i64> for isize



### impl Shl\<i64> for u8



### impl Shl\<i64> for u16



### impl Shl\<i64> for u32



### impl Shl\<i64> for u64



### impl Shl\<i64> for u128



### impl Shl\<i64> for usize



### impl Shl\<i128> for i8



### impl Shl\<i128> for i16



### impl Shl\<i128> for i32



### impl Shl\<i128> for i64



### impl Shl\<i128> for i128



### impl Shl\<i128> for isize



### impl Shl\<i128> for u8



### impl Shl\<i128> for u16



### impl Shl\<i128> for u32



### impl Shl\<i128> for u64



### impl Shl\<i128> for u128



### impl Shl\<i128> for usize



### impl Shl\<isize> for i8



### impl Shl\<isize> for i16



### impl Shl\<isize> for i32



### impl Shl\<isize> for i64



### impl Shl\<isize> for i128



### impl Shl\<isize> for isize



### impl Shl\<isize> for u8



### impl Shl\<isize> for u16



### impl Shl\<isize> for u32



### impl Shl\<isize> for u64



### impl Shl\<isize> for u128



### impl Shl\<isize> for usize



### impl Shl\<u8> for i8



### impl Shl\<u8> for i16



### impl Shl\<u8> for i32



### impl Shl\<u8> for i64



### impl Shl\<u8> for i128



### impl Shl\<u8> for isize



### impl Shl\<u8> for u8



### impl Shl\<u8> for u16



### impl Shl\<u8> for u32



### impl Shl\<u8> for u64



### impl Shl\<u8> for u128



### impl Shl\<u8> for usize



### impl Shl\<u16> for i8



### impl Shl\<u16> for i16



### impl Shl\<u16> for i32



### impl Shl\<u16> for i64



### impl Shl\<u16> for i128



### impl Shl\<u16> for isize



### impl Shl\<u16> for u8



### impl Shl\<u16> for u16



### impl Shl\<u16> for u32



### impl Shl\<u16> for u64



### impl Shl\<u16> for u128



### impl Shl\<u16> for usize



### impl Shl\<u32> for i8



### impl Shl\<u32> for i16



### impl Shl\<u32> for i32



### impl Shl\<u32> for i64



### impl Shl\<u32> for i128



### impl Shl\<u32> for isize



### impl Shl\<u32> for u8



### impl Shl\<u32> for u16



### impl Shl\<u32> for u32



### impl Shl\<u32> for u64



### impl Shl\<u32> for u128



### impl Shl\<u32> for usize



### impl Shl\<u64> for i8



### impl Shl\<u64> for i16



### impl Shl\<u64> for i32



### impl Shl\<u64> for i64



### impl Shl\<u64> for i128



### impl Shl\<u64> for isize



### impl Shl\<u64> for u8



### impl Shl\<u64> for u16



### impl Shl\<u64> for u32



### impl Shl\<u64> for u64



### impl Shl\<u64> for u128



### impl Shl\<u64> for usize



### impl Shl\<u128> for i8



### impl Shl\<u128> for i16



### impl Shl\<u128> for i32



### impl Shl\<u128> for i64



### impl Shl\<u128> for i128



### impl Shl\<u128> for isize



### impl Shl\<u128> for u8



### impl Shl\<u128> for u16



### impl Shl\<u128> for u32



### impl Shl\<u128> for u64



### impl Shl\<u128> for u128



### impl Shl\<u128> for usize



### impl Shl\<usize> for i8



### impl Shl\<usize> for i16



### impl Shl\<usize> for i32



### impl Shl\<usize> for i64



### impl Shl\<usize> for i128



### impl Shl\<usize> for isize



### impl Shl\<usize> for u8



### impl Shl\<usize> for u16



### impl Shl\<usize> for u32



### impl Shl\<usize> for u64



### impl Shl\<usize> for u128



### impl Shl\<usize> for usize



### impl Shl\<usize> for Saturating\<i8>



### impl Shl\<usize> for Saturating\<i16>



### impl Shl\<usize> for Saturating\<i32>



### impl Shl\<usize> for Saturating\<i64>



### impl Shl\<usize> for Saturating\<i128>



### impl Shl\<usize> for Saturating\<isize>



### impl Shl\<usize> for Saturating\<u8>



### impl Shl\<usize> for Saturating\<u16>



### impl Shl\<usize> for Saturating\<u32>



### impl Shl\<usize> for Saturating\<u64>



### impl Shl\<usize> for Saturating\<u128>



### impl Shl\<usize> for Saturating\<usize>



### impl Shl\<usize> for Wrapping\<i8>



### impl Shl\<usize> for Wrapping\<i16>



### impl Shl\<usize> for Wrapping\<i32>



### impl Shl\<usize> for Wrapping\<i64>



### impl Shl\<usize> for Wrapping\<i128>



### impl Shl\<usize> for Wrapping\<isize>



### impl Shl\<usize> for Wrapping\<u8>



### impl Shl\<usize> for Wrapping\<u16>



### impl Shl\<usize> for Wrapping\<u32>



### impl Shl\<usize> for Wrapping\<u64>



### impl Shl\<usize> for Wrapping\<u128>



### impl Shl\<usize> for Wrapping\<usize>



### impl\<'a> Shl\<i8> for &'a i8



### impl\<'a> Shl\<i8> for &'a i16



### impl\<'a> Shl\<i8> for &'a i32



### impl\<'a> Shl\<i8> for &'a i64



### impl\<'a> Shl\<i8> for &'a i128



### impl\<'a> Shl\<i8> for &'a isize



### impl\<'a> Shl\<i8> for &'a u8



### impl\<'a> Shl\<i8> for &'a u16



### impl\<'a> Shl\<i8> for &'a u32



### impl\<'a> Shl\<i8> for &'a u64



### impl\<'a> Shl\<i8> for &'a u128



### impl\<'a> Shl\<i8> for &'a usize



### impl\<'a> Shl\<i16> for &'a i8



### impl\<'a> Shl\<i16> for &'a i16



### impl\<'a> Shl\<i16> for &'a i32



### impl\<'a> Shl\<i16> for &'a i64



### impl\<'a> Shl\<i16> for &'a i128



### impl\<'a> Shl\<i16> for &'a isize



### impl\<'a> Shl\<i16> for &'a u8



### impl\<'a> Shl\<i16> for &'a u16



### impl\<'a> Shl\<i16> for &'a u32



### impl\<'a> Shl\<i16> for &'a u64



### impl\<'a> Shl\<i16> for &'a u128



### impl\<'a> Shl\<i16> for &'a usize



### impl\<'a> Shl\<i32> for &'a i8



### impl\<'a> Shl\<i32> for &'a i16



### impl\<'a> Shl\<i32> for &'a i32



### impl\<'a> Shl\<i32> for &'a i64



### impl\<'a> Shl\<i32> for &'a i128



### impl\<'a> Shl\<i32> for &'a isize



### impl\<'a> Shl\<i32> for &'a u8



### impl\<'a> Shl\<i32> for &'a u16



### impl\<'a> Shl\<i32> for &'a u32



### impl\<'a> Shl\<i32> for &'a u64



### impl\<'a> Shl\<i32> for &'a u128



### impl\<'a> Shl\<i32> for &'a usize



### impl\<'a> Shl\<i64> for &'a i8



### impl\<'a> Shl\<i64> for &'a i16



### impl\<'a> Shl\<i64> for &'a i32



### impl\<'a> Shl\<i64> for &'a i64



### impl\<'a> Shl\<i64> for &'a i128



### impl\<'a> Shl\<i64> for &'a isize



### impl\<'a> Shl\<i64> for &'a u8



### impl\<'a> Shl\<i64> for &'a u16



### impl\<'a> Shl\<i64> for &'a u32



### impl\<'a> Shl\<i64> for &'a u64



### impl\<'a> Shl\<i64> for &'a u128



### impl\<'a> Shl\<i64> for &'a usize



### impl\<'a> Shl\<i128> for &'a i8



### impl\<'a> Shl\<i128> for &'a i16



### impl\<'a> Shl\<i128> for &'a i32



### impl\<'a> Shl\<i128> for &'a i64



### impl\<'a> Shl\<i128> for &'a i128



### impl\<'a> Shl\<i128> for &'a isize



### impl\<'a> Shl\<i128> for &'a u8



### impl\<'a> Shl\<i128> for &'a u16



### impl\<'a> Shl\<i128> for &'a u32



### impl\<'a> Shl\<i128> for &'a u64



### impl\<'a> Shl\<i128> for &'a u128



### impl\<'a> Shl\<i128> for &'a usize



### impl\<'a> Shl\<isize> for &'a i8



### impl\<'a> Shl\<isize> for &'a i16



### impl\<'a> Shl\<isize> for &'a i32



### impl\<'a> Shl\<isize> for &'a i64



### impl\<'a> Shl\<isize> for &'a i128



### impl\<'a> Shl\<isize> for &'a isize



### impl\<'a> Shl\<isize> for &'a u8



### impl\<'a> Shl\<isize> for &'a u16



### impl\<'a> Shl\<isize> for &'a u32



### impl\<'a> Shl\<isize> for &'a u64



### impl\<'a> Shl\<isize> for &'a u128



### impl\<'a> Shl\<isize> for &'a usize



### impl\<'a> Shl\<u8> for &'a i8



### impl\<'a> Shl\<u8> for &'a i16



### impl\<'a> Shl\<u8> for &'a i32



### impl\<'a> Shl\<u8> for &'a i64



### impl\<'a> Shl\<u8> for &'a i128



### impl\<'a> Shl\<u8> for &'a isize



### impl\<'a> Shl\<u8> for &'a u8



### impl\<'a> Shl\<u8> for &'a u16



### impl\<'a> Shl\<u8> for &'a u32



### impl\<'a> Shl\<u8> for &'a u64



### impl\<'a> Shl\<u8> for &'a u128



### impl\<'a> Shl\<u8> for &'a usize



### impl\<'a> Shl\<u16> for &'a i8



### impl\<'a> Shl\<u16> for &'a i16



### impl\<'a> Shl\<u16> for &'a i32



### impl\<'a> Shl\<u16> for &'a i64



### impl\<'a> Shl\<u16> for &'a i128



### impl\<'a> Shl\<u16> for &'a isize



### impl\<'a> Shl\<u16> for &'a u8



### impl\<'a> Shl\<u16> for &'a u16



### impl\<'a> Shl\<u16> for &'a u32



### impl\<'a> Shl\<u16> for &'a u64



### impl\<'a> Shl\<u16> for &'a u128



### impl\<'a> Shl\<u16> for &'a usize



### impl\<'a> Shl\<u32> for &'a i8



### impl\<'a> Shl\<u32> for &'a i16



### impl\<'a> Shl\<u32> for &'a i32



### impl\<'a> Shl\<u32> for &'a i64



### impl\<'a> Shl\<u32> for &'a i128



### impl\<'a> Shl\<u32> for &'a isize



### impl\<'a> Shl\<u32> for &'a u8



### impl\<'a> Shl\<u32> for &'a u16



### impl\<'a> Shl\<u32> for &'a u32



### impl\<'a> Shl\<u32> for &'a u64



### impl\<'a> Shl\<u32> for &'a u128



### impl\<'a> Shl\<u32> for &'a usize



### impl\<'a> Shl\<u64> for &'a i8



### impl\<'a> Shl\<u64> for &'a i16



### impl\<'a> Shl\<u64> for &'a i32



### impl\<'a> Shl\<u64> for &'a i64



### impl\<'a> Shl\<u64> for &'a i128



### impl\<'a> Shl\<u64> for &'a isize



### impl\<'a> Shl\<u64> for &'a u8



### impl\<'a> Shl\<u64> for &'a u16



### impl\<'a> Shl\<u64> for &'a u32



### impl\<'a> Shl\<u64> for &'a u64



### impl\<'a> Shl\<u64> for &'a u128



### impl\<'a> Shl\<u64> for &'a usize



### impl\<'a> Shl\<u128> for &'a i8



### impl\<'a> Shl\<u128> for &'a i16



### impl\<'a> Shl\<u128> for &'a i32



### impl\<'a> Shl\<u128> for &'a i64



### impl\<'a> Shl\<u128> for &'a i128



### impl\<'a> Shl\<u128> for &'a isize



### impl\<'a> Shl\<u128> for &'a u8



### impl\<'a> Shl\<u128> for &'a u16



### impl\<'a> Shl\<u128> for &'a u32



### impl\<'a> Shl\<u128> for &'a u64



### impl\<'a> Shl\<u128> for &'a u128



### impl\<'a> Shl\<u128> for &'a usize



### impl\<'a> Shl\<usize> for &'a i8



### impl\<'a> Shl\<usize> for &'a i16



### impl\<'a> Shl\<usize> for &'a i32



### impl\<'a> Shl\<usize> for &'a i64



### impl\<'a> Shl\<usize> for &'a i128



### impl\<'a> Shl\<usize> for &'a isize



### impl\<'a> Shl\<usize> for &'a u8



### impl\<'a> Shl\<usize> for &'a u16



### impl\<'a> Shl\<usize> for &'a u32



### impl\<'a> Shl\<usize> for &'a u64



### impl\<'a> Shl\<usize> for &'a u128



### impl\<'a> Shl\<usize> for &'a usize



### impl\<'a> Shl\<usize> for &'a Saturating\<i8>



### impl\<'a> Shl\<usize> for &'a Saturating\<i16>



### impl\<'a> Shl\<usize> for &'a Saturating\<i32>



### impl\<'a> Shl\<usize> for &'a Saturating\<i64>



### impl\<'a> Shl\<usize> for &'a Saturating\<i128>



### impl\<'a> Shl\<usize> for &'a Saturating\<isize>



### impl\<'a> Shl\<usize> for &'a Saturating\<u8>



### impl\<'a> Shl\<usize> for &'a Saturating\<u16>



### impl\<'a> Shl\<usize> for &'a Saturating\<u32>



### impl\<'a> Shl\<usize> for &'a Saturating\<u64>



### impl\<'a> Shl\<usize> for &'a Saturating\<u128>



### impl\<'a> Shl\<usize> for &'a Saturating\<usize>



### impl\<'a> Shl\<usize> for &'a Wrapping\<i8>



### impl\<'a> Shl\<usize> for &'a Wrapping\<i16>



### impl\<'a> Shl\<usize> for &'a Wrapping\<i32>



### impl\<'a> Shl\<usize> for &'a Wrapping\<i64>



### impl\<'a> Shl\<usize> for &'a Wrapping\<i128>



### impl\<'a> Shl\<usize> for &'a Wrapping\<isize>



### impl\<'a> Shl\<usize> for &'a Wrapping\<u8>



### impl\<'a> Shl\<usize> for &'a Wrapping\<u16>



### impl\<'a> Shl\<usize> for &'a Wrapping\<u32>



### impl\<'a> Shl\<usize> for &'a Wrapping\<u64>



### impl\<'a> Shl\<usize> for &'a Wrapping\<u128>



### impl\<'a> Shl\<usize> for &'a Wrapping\<usize>



### impl<'lhs, 'rhs, T, const LANES: usize> Shl<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>

```rust
impl<'lhs, 'rhs, T, const LANES: usize> Shl<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Shl<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> Shl<&Simd<T, LANES>> for Simd<T, LANES>

```rust
impl<T, const LANES: usize> Shl<&Simd<T, LANES>> for Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Shl<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> Shl<Simd<T, LANES>> for &Simd<T, LANES>

```rust
impl<T, const LANES: usize> Shl<Simd<T, LANES>> for &Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Shl<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const N: usize> Shl<Simd<i8, N>> for Simd<i8, N>

```rust
impl<const N: usize> Shl<Simd<i8, N>> for Simd<i8, N>
where
  i8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shl<Simd<i16, N>> for Simd<i16, N>

```rust
impl<const N: usize> Shl<Simd<i16, N>> for Simd<i16, N>
where
  i16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shl<Simd<i32, N>> for Simd<i32, N>

```rust
impl<const N: usize> Shl<Simd<i32, N>> for Simd<i32, N>
where
  i32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shl<Simd<i64, N>> for Simd<i64, N>

```rust
impl<const N: usize> Shl<Simd<i64, N>> for Simd<i64, N>
where
  i64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shl<Simd<isize, N>> for Simd<isize, N>

```rust
impl<const N: usize> Shl<Simd<isize, N>> for Simd<isize, N>
where
  isize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shl<Simd<u8, N>> for Simd<u8, N>

```rust
impl<const N: usize> Shl<Simd<u8, N>> for Simd<u8, N>
where
  u8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shl<Simd<u16, N>> for Simd<u16, N>

```rust
impl<const N: usize> Shl<Simd<u16, N>> for Simd<u16, N>
where
  u16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shl<Simd<u32, N>> for Simd<u32, N>

```rust
impl<const N: usize> Shl<Simd<u32, N>> for Simd<u32, N>
where
  u32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shl<Simd<u64, N>> for Simd<u64, N>

```rust
impl<const N: usize> Shl<Simd<u64, N>> for Simd<u64, N>
where
  u64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shl<Simd<usize, N>> for Simd<usize, N>

```rust
impl<const N: usize> Shl<Simd<usize, N>> for Simd<usize, N>
where
  usize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

