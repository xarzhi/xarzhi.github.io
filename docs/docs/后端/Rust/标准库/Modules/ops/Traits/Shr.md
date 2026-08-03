# Trait std::ops::Shr

右移运算符 `>>`。 请注意，因为此 trait 是针对具有多个右侧类型的所有整数类型实现的，所以 Rust 的类型检查器对 `_ >> _` 具有特殊的处理方式，将整数运算的结果类型设置为左侧操作数的类型。

这意味着尽管从评估的角度来看，`a >> b` 和 `a.shr(b)` 是相同的，但是在类型推断方面它们是不同的。

```rust
pub trait Shr\<Rhs = Self> {
    type Output;

    // Required method
    fn shr(self, rhs: Rhs) -> Self::Output;
}
```

`Shr` 的实现，将整数的 `>>` 操作提升为 `usize` 的包装器。

```rust
use std::ops::Shr;

#[derive(PartialEq, Debug)]
struct Scalar(usize);

impl Shr\<Scalar> for Scalar {
    type Output = Self;

    fn shr(self, Self(rhs): Self) -> Self::Output {
        let Self(lhs) = self;
        Self(lhs >> rhs)
    }
}

assert_eq!(Scalar(16) >> Scalar(2), Scalar(4));
```

`Shr` 的实现，将 vector 向右旋转给定的数量。

```rust
use std::ops::Shr;

#[derive(PartialEq, Debug)]
struct SpinVector\<T: Clone> {
    vec: Vec\<T>,
}

impl\<T: Clone> Shr\<usize> for SpinVector\<T> {
    type Output = Self;

    fn shr(self, rhs: usize) -> Self::Output {
        // 将 vector 旋转 `rhs` 个位置。
        let (a, b) = self.vec.split_at(self.vec.len() - rhs);
        let mut spun_vector = vec![];
        spun_vector.extend_from_slice(b);
        spun_vector.extend_from_slice(a);
        Self { vec: spun_vector }
    }
}

assert_eq!(SpinVector { vec: vec![0, 1, 2, 3, 4] } >> 2,
           SpinVector { vec: vec![3, 4, 0, 1, 2] });
```





## Required Associated Types

### Output

应用 `>>` 运算符后的结果类型。

```rust
type Output
```



## Required Methods

### shr

执行 `>>` 操作。

```rust
fn shr(self, rhs: Rhs) -> Self::Output
```

**参数**：

- **rhs**：执行 ` >>` 操作的右值

**返回值**：返回右移运算后的值

```rust
assert_eq!(5u8 >> 1, 2);
assert_eq!(2u8 >> 1, 1);
```



### Implementors



### impl Shr\<&i8> for &i8



### impl Shr\<&i8> for &i16



### impl Shr\<&i8> for &i32



### impl Shr\<&i8> for &i64



### impl Shr\<&i8> for &i128



### impl Shr\<&i8> for &isize



### impl Shr\<&i8> for &u8



### impl Shr\<&i8> for &u16



### impl Shr\<&i8> for &u32



### impl Shr\<&i8> for &u64



### impl Shr\<&i8> for &u128



### impl Shr\<&i8> for &usize



### impl Shr\<&i8> for i8



### impl Shr\<&i8> for i16



### impl Shr\<&i8> for i32



### impl Shr\<&i8> for i64



### impl Shr\<&i8> for i128



### impl Shr\<&i8> for isize



### impl Shr\<&i8> for u8



### impl Shr\<&i8> for u16



### impl Shr\<&i8> for u32



### impl Shr\<&i8> for u64



### impl Shr\<&i8> for u128



### impl Shr\<&i8> for usize



### impl Shr\<&i16> for &i8



### impl Shr\<&i16> for &i16



### impl Shr\<&i16> for &i32



### impl Shr\<&i16> for &i64



### impl Shr\<&i16> for &i128



### impl Shr\<&i16> for &isize



### impl Shr\<&i16> for &u8



### impl Shr\<&i16> for &u16



### impl Shr\<&i16> for &u32



### impl Shr\<&i16> for &u64



### impl Shr\<&i16> for &u128



### impl Shr\<&i16> for &usize



### impl Shr\<&i16> for i8



### impl Shr\<&i16> for i16



### impl Shr\<&i16> for i32



### impl Shr\<&i16> for i64



### impl Shr\<&i16> for i128



### impl Shr\<&i16> for isize



### impl Shr\<&i16> for u8



### impl Shr\<&i16> for u16



### impl Shr\<&i16> for u32



### impl Shr\<&i16> for u64



### impl Shr\<&i16> for u128



### impl Shr\<&i16> for usize



### impl Shr\<&i32> for &i8



### impl Shr\<&i32> for &i16



### impl Shr\<&i32> for &i32



### impl Shr\<&i32> for &i64



### impl Shr\<&i32> for &i128



### impl Shr\<&i32> for &isize



### impl Shr\<&i32> for &u8



### impl Shr\<&i32> for &u16



### impl Shr\<&i32> for &u32



### impl Shr\<&i32> for &u64



### impl Shr\<&i32> for &u128



### impl Shr\<&i32> for &usize



### impl Shr\<&i32> for i8



### impl Shr\<&i32> for i16



### impl Shr\<&i32> for i32



### impl Shr\<&i32> for i64



### impl Shr\<&i32> for i128



### impl Shr\<&i32> for isize



### impl Shr\<&i32> for u8



### impl Shr\<&i32> for u16



### impl Shr\<&i32> for u32



### impl Shr\<&i32> for u64



### impl Shr\<&i32> for u128



### impl Shr\<&i32> for usize



### impl Shr\<&i64> for &i8



### impl Shr\<&i64> for &i16



### impl Shr\<&i64> for &i32



### impl Shr\<&i64> for &i64



### impl Shr\<&i64> for &i128



### impl Shr\<&i64> for &isize



### impl Shr\<&i64> for &u8



### impl Shr\<&i64> for &u16



### impl Shr\<&i64> for &u32



### impl Shr\<&i64> for &u64



### impl Shr\<&i64> for &u128



### impl Shr\<&i64> for &usize



### impl Shr\<&i64> for i8



### impl Shr\<&i64> for i16



### impl Shr\<&i64> for i32



### impl Shr\<&i64> for i64



### impl Shr\<&i64> for i128



### impl Shr\<&i64> for isize



### impl Shr\<&i64> for u8



### impl Shr\<&i64> for u16



### impl Shr\<&i64> for u32



### impl Shr\<&i64> for u64



### impl Shr\<&i64> for u128



### impl Shr\<&i64> for usize



### impl Shr\<&i128> for &i8



### impl Shr\<&i128> for &i16



### impl Shr\<&i128> for &i32



### impl Shr\<&i128> for &i64



### impl Shr\<&i128> for &i128



### impl Shr\<&i128> for &isize



### impl Shr\<&i128> for &u8



### impl Shr\<&i128> for &u16



### impl Shr\<&i128> for &u32



### impl Shr\<&i128> for &u64



### impl Shr\<&i128> for &u128



### impl Shr\<&i128> for &usize



### impl Shr\<&i128> for i8



### impl Shr\<&i128> for i16



### impl Shr\<&i128> for i32



### impl Shr\<&i128> for i64



### impl Shr\<&i128> for i128



### impl Shr\<&i128> for isize



### impl Shr\<&i128> for u8



### impl Shr\<&i128> for u16



### impl Shr\<&i128> for u32



### impl Shr\<&i128> for u64



### impl Shr\<&i128> for u128



### impl Shr\<&i128> for usize



### impl Shr\<&isize> for &i8



### impl Shr\<&isize> for &i16



### impl Shr\<&isize> for &i32



### impl Shr\<&isize> for &i64



### impl Shr\<&isize> for &i128



### impl Shr\<&isize> for &isize



### impl Shr\<&isize> for &u8



### impl Shr\<&isize> for &u16



### impl Shr\<&isize> for &u32



### impl Shr\<&isize> for &u64



### impl Shr\<&isize> for &u128



### impl Shr\<&isize> for &usize



### impl Shr\<&isize> for i8



### impl Shr\<&isize> for i16



### impl Shr\<&isize> for i32



### impl Shr\<&isize> for i64



### impl Shr\<&isize> for i128



### impl Shr\<&isize> for isize



### impl Shr\<&isize> for u8



### impl Shr\<&isize> for u16



### impl Shr\<&isize> for u32



### impl Shr\<&isize> for u64



### impl Shr\<&isize> for u128



### impl Shr\<&isize> for usize



### impl Shr\<&u8> for &i8



### impl Shr\<&u8> for &i16



### impl Shr\<&u8> for &i32



### impl Shr\<&u8> for &i64



### impl Shr\<&u8> for &i128



### impl Shr\<&u8> for &isize



### impl Shr\<&u8> for &u8



### impl Shr\<&u8> for &u16



### impl Shr\<&u8> for &u32



### impl Shr\<&u8> for &u64



### impl Shr\<&u8> for &u128



### impl Shr\<&u8> for &usize



### impl Shr\<&u8> for i8



### impl Shr\<&u8> for i16



### impl Shr\<&u8> for i32



### impl Shr\<&u8> for i64



### impl Shr\<&u8> for i128



### impl Shr\<&u8> for isize



### impl Shr\<&u8> for u8



### impl Shr\<&u8> for u16



### impl Shr\<&u8> for u32



### impl Shr\<&u8> for u64



### impl Shr\<&u8> for u128



### impl Shr\<&u8> for usize



### impl Shr\<&u16> for &i8



### impl Shr\<&u16> for &i16



### impl Shr\<&u16> for &i32



### impl Shr\<&u16> for &i64



### impl Shr\<&u16> for &i128



### impl Shr\<&u16> for &isize



### impl Shr\<&u16> for &u8



### impl Shr\<&u16> for &u16



### impl Shr\<&u16> for &u32



### impl Shr\<&u16> for &u64



### impl Shr\<&u16> for &u128



### impl Shr\<&u16> for &usize



### impl Shr\<&u16> for i8



### impl Shr\<&u16> for i16



### impl Shr\<&u16> for i32



### impl Shr\<&u16> for i64



### impl Shr\<&u16> for i128



### impl Shr\<&u16> for isize



### impl Shr\<&u16> for u8



### impl Shr\<&u16> for u16



### impl Shr\<&u16> for u32



### impl Shr\<&u16> for u64



### impl Shr\<&u16> for u128



### impl Shr\<&u16> for usize



### impl Shr\<&u32> for &i8



### impl Shr\<&u32> for &i16



### impl Shr\<&u32> for &i32



### impl Shr\<&u32> for &i64



### impl Shr\<&u32> for &i128



### impl Shr\<&u32> for &isize



### impl Shr\<&u32> for &u8



### impl Shr\<&u32> for &u16



### impl Shr\<&u32> for &u32



### impl Shr\<&u32> for &u64



### impl Shr\<&u32> for &u128



### impl Shr\<&u32> for &usize



### impl Shr\<&u32> for i8



### impl Shr\<&u32> for i16



### impl Shr\<&u32> for i32



### impl Shr\<&u32> for i64



### impl Shr\<&u32> for i128



### impl Shr\<&u32> for isize



### impl Shr\<&u32> for u8



### impl Shr\<&u32> for u16



### impl Shr\<&u32> for u32



### impl Shr\<&u32> for u64



### impl Shr\<&u32> for u128



### impl Shr\<&u32> for usize



### impl Shr\<&u64> for &i8



### impl Shr\<&u64> for &i16



### impl Shr\<&u64> for &i32



### impl Shr\<&u64> for &i64



### impl Shr\<&u64> for &i128



### impl Shr\<&u64> for &isize



### impl Shr\<&u64> for &u8



### impl Shr\<&u64> for &u16



### impl Shr\<&u64> for &u32



### impl Shr\<&u64> for &u64



### impl Shr\<&u64> for &u128



### impl Shr\<&u64> for &usize



### impl Shr\<&u64> for i8



### impl Shr\<&u64> for i16



### impl Shr\<&u64> for i32



### impl Shr\<&u64> for i64



### impl Shr\<&u64> for i128



### impl Shr\<&u64> for isize



### impl Shr\<&u64> for u8



### impl Shr\<&u64> for u16



### impl Shr\<&u64> for u32



### impl Shr\<&u64> for u64



### impl Shr\<&u64> for u128



### impl Shr\<&u64> for usize



### impl Shr\<&u128> for &i8



### impl Shr\<&u128> for &i16



### impl Shr\<&u128> for &i32



### impl Shr\<&u128> for &i64



### impl Shr\<&u128> for &i128



### impl Shr\<&u128> for &isize



### impl Shr\<&u128> for &u8



### impl Shr\<&u128> for &u16



### impl Shr\<&u128> for &u32



### impl Shr\<&u128> for &u64



### impl Shr\<&u128> for &u128



### impl Shr\<&u128> for &usize



### impl Shr\<&u128> for i8



### impl Shr\<&u128> for i16



### impl Shr\<&u128> for i32



### impl Shr\<&u128> for i64



### impl Shr\<&u128> for i128



### impl Shr\<&u128> for isize



### impl Shr\<&u128> for u8



### impl Shr\<&u128> for u16



### impl Shr\<&u128> for u32



### impl Shr\<&u128> for u64



### impl Shr\<&u128> for u128



### impl Shr\<&u128> for usize



### impl Shr\<&usize> for &i8



### impl Shr\<&usize> for &i16



### impl Shr\<&usize> for &i32



### impl Shr\<&usize> for &i64



### impl Shr\<&usize> for &i128



### impl Shr\<&usize> for &isize



### impl Shr\<&usize> for &u8



### impl Shr\<&usize> for &u16



### impl Shr\<&usize> for &u32



### impl Shr\<&usize> for &u64



### impl Shr\<&usize> for &u128



### impl Shr\<&usize> for &usize



### impl Shr\<&usize> for &Saturating\<i8>



### impl Shr\<&usize> for &Saturating\<i16>



### impl Shr\<&usize> for &Saturating\<i32>



### impl Shr\<&usize> for &Saturating\<i64>



### impl Shr\<&usize> for &Saturating\<i128>



### impl Shr\<&usize> for &Saturating\<isize>



### impl Shr\<&usize> for &Saturating\<u8>



### impl Shr\<&usize> for &Saturating\<u16>



### impl Shr\<&usize> for &Saturating\<u32>



### impl Shr\<&usize> for &Saturating\<u64>



### impl Shr\<&usize> for &Saturating\<u128>



### impl Shr\<&usize> for &Saturating\<usize>



### impl Shr\<&usize> for &Wrapping\<i8>



### impl Shr\<&usize> for &Wrapping\<i16>



### impl Shr\<&usize> for &Wrapping\<i32>



### impl Shr\<&usize> for &Wrapping\<i64>



### impl Shr\<&usize> for &Wrapping\<i128>



### impl Shr\<&usize> for &Wrapping\<isize>



### impl Shr\<&usize> for &Wrapping\<u8>



### impl Shr\<&usize> for &Wrapping\<u16>



### impl Shr\<&usize> for &Wrapping\<u32>



### impl Shr\<&usize> for &Wrapping\<u64>



### impl Shr\<&usize> for &Wrapping\<u128>



### impl Shr\<&usize> for &Wrapping\<usize>



### impl Shr\<&usize> for i8



### impl Shr\<&usize> for i16



### impl Shr\<&usize> for i32



### impl Shr\<&usize> for i64



### impl Shr\<&usize> for i128



### impl Shr\<&usize> for isize



### impl Shr\<&usize> for u8



### impl Shr\<&usize> for u16



### impl Shr\<&usize> for u32



### impl Shr\<&usize> for u64



### impl Shr\<&usize> for u128



### impl Shr\<&usize> for usize



### impl Shr\<&usize> for Saturating\<i8>



### impl Shr\<&usize> for Saturating\<i16>



### impl Shr\<&usize> for Saturating\<i32>



### impl Shr\<&usize> for Saturating\<i64>



### impl Shr\<&usize> for Saturating\<i128>



### impl Shr\<&usize> for Saturating\<isize>



### impl Shr\<&usize> for Saturating\<u8>



### impl Shr\<&usize> for Saturating\<u16>



### impl Shr\<&usize> for Saturating\<u32>



### impl Shr\<&usize> for Saturating\<u64>



### impl Shr\<&usize> for Saturating\<u128>



### impl Shr\<&usize> for Saturating\<usize>



### impl Shr\<&usize> for Wrapping\<i8>



### impl Shr\<&usize> for Wrapping\<i16>



### impl Shr\<&usize> for Wrapping\<i32>



### impl Shr\<&usize> for Wrapping\<i64>



### impl Shr\<&usize> for Wrapping\<i128>



### impl Shr\<&usize> for Wrapping\<isize>



### impl Shr\<&usize> for Wrapping\<u8>



### impl Shr\<&usize> for Wrapping\<u16>



### impl Shr\<&usize> for Wrapping\<u32>



### impl Shr\<&usize> for Wrapping\<u64>



### impl Shr\<&usize> for Wrapping\<u128>



### impl Shr\<&usize> for Wrapping\<usize>



### impl Shr\<i8> for i8



### impl Shr\<i8> for i16



### impl Shr\<i8> for i32



### impl Shr\<i8> for i64



### impl Shr\<i8> for i128



### impl Shr\<i8> for isize



### impl Shr\<i8> for u8



### impl Shr\<i8> for u16



### impl Shr\<i8> for u32



### impl Shr\<i8> for u64



### impl Shr\<i8> for u128



### impl Shr\<i8> for usize



### impl Shr\<i16> for i8



### impl Shr\<i16> for i16



### impl Shr\<i16> for i32



### impl Shr\<i16> for i64



### impl Shr\<i16> for i128



### impl Shr\<i16> for isize



### impl Shr\<i16> for u8



### impl Shr\<i16> for u16



### impl Shr\<i16> for u32



### impl Shr\<i16> for u64



### impl Shr\<i16> for u128



### impl Shr\<i16> for usize



### impl Shr\<i32> for i8



### impl Shr\<i32> for i16



### impl Shr\<i32> for i32



### impl Shr\<i32> for i64



### impl Shr\<i32> for i128



### impl Shr\<i32> for isize



### impl Shr\<i32> for u8



### impl Shr\<i32> for u16



### impl Shr\<i32> for u32



### impl Shr\<i32> for u64



### impl Shr\<i32> for u128



### impl Shr\<i32> for usize



### impl Shr\<i64> for i8



### impl Shr\<i64> for i16



### impl Shr\<i64> for i32



### impl Shr\<i64> for i64



### impl Shr\<i64> for i128



### impl Shr\<i64> for isize



### impl Shr\<i64> for u8



### impl Shr\<i64> for u16



### impl Shr\<i64> for u32



### impl Shr\<i64> for u64



### impl Shr\<i64> for u128



### impl Shr\<i64> for usize



### impl Shr\<i128> for i8



### impl Shr\<i128> for i16



### impl Shr\<i128> for i32



### impl Shr\<i128> for i64



### impl Shr\<i128> for i128



### impl Shr\<i128> for isize



### impl Shr\<i128> for u8



### impl Shr\<i128> for u16



### impl Shr\<i128> for u32



### impl Shr\<i128> for u64



### impl Shr\<i128> for u128



### impl Shr\<i128> for usize



### impl Shr\<isize> for i8



### impl Shr\<isize> for i16



### impl Shr\<isize> for i32



### impl Shr\<isize> for i64



### impl Shr\<isize> for i128



### impl Shr\<isize> for isize



### impl Shr\<isize> for u8



### impl Shr\<isize> for u16



### impl Shr\<isize> for u32



### impl Shr\<isize> for u64



### impl Shr\<isize> for u128



### impl Shr\<isize> for usize



### impl Shr\<u8> for i8



### impl Shr\<u8> for i16



### impl Shr\<u8> for i32



### impl Shr\<u8> for i64



### impl Shr\<u8> for i128



### impl Shr\<u8> for isize



### impl Shr\<u8> for u8



### impl Shr\<u8> for u16



### impl Shr\<u8> for u32



### impl Shr\<u8> for u64



### impl Shr\<u8> for u128



### impl Shr\<u8> for usize



### impl Shr\<u16> for i8



### impl Shr\<u16> for i16



### impl Shr\<u16> for i32



### impl Shr\<u16> for i64



### impl Shr\<u16> for i128



### impl Shr\<u16> for isize



### impl Shr\<u16> for u8



### impl Shr\<u16> for u16



### impl Shr\<u16> for u32



### impl Shr\<u16> for u64



### impl Shr\<u16> for u128



### impl Shr\<u16> for usize



### impl Shr\<u32> for i8



### impl Shr\<u32> for i16



### impl Shr\<u32> for i32



### impl Shr\<u32> for i64



### impl Shr\<u32> for i128



### impl Shr\<u32> for isize



### impl Shr\<u32> for u8



### impl Shr\<u32> for u16



### impl Shr\<u32> for u32



### impl Shr\<u32> for u64



### impl Shr\<u32> for u128



### impl Shr\<u32> for usize



### impl Shr\<u64> for i8



### impl Shr\<u64> for i16



### impl Shr\<u64> for i32



### impl Shr\<u64> for i64



### impl Shr\<u64> for i128



### impl Shr\<u64> for isize



### impl Shr\<u64> for u8



### impl Shr\<u64> for u16



### impl Shr\<u64> for u32



### impl Shr\<u64> for u64



### impl Shr\<u64> for u128



### impl Shr\<u64> for usize



### impl Shr\<u128> for i8



### impl Shr\<u128> for i16



### impl Shr\<u128> for i32



### impl Shr\<u128> for i64



### impl Shr\<u128> for i128



### impl Shr\<u128> for isize



### impl Shr\<u128> for u8



### impl Shr\<u128> for u16



### impl Shr\<u128> for u32



### impl Shr\<u128> for u64



### impl Shr\<u128> for u128



### impl Shr\<u128> for usize



### impl Shr\<usize> for i8



### impl Shr\<usize> for i16



### impl Shr\<usize> for i32



### impl Shr\<usize> for i64



### impl Shr\<usize> for i128



### impl Shr\<usize> for isize



### impl Shr\<usize> for u8



### impl Shr\<usize> for u16



### impl Shr\<usize> for u32



### impl Shr\<usize> for u64



### impl Shr\<usize> for u128



### impl Shr\<usize> for usize



### impl Shr\<usize> for Saturating\<i8>



### impl Shr\<usize> for Saturating\<i16>



### impl Shr\<usize> for Saturating\<i32>



### impl Shr\<usize> for Saturating\<i64>



### impl Shr\<usize> for Saturating\<i128>



### impl Shr\<usize> for Saturating\<isize>



### impl Shr\<usize> for Saturating\<u8>



### impl Shr\<usize> for Saturating\<u16>



### impl Shr\<usize> for Saturating\<u32>



### impl Shr\<usize> for Saturating\<u64>



### impl Shr\<usize> for Saturating\<u128>



### impl Shr\<usize> for Saturating\<usize>



### impl Shr\<usize> for Wrapping\<i8>



### impl Shr\<usize> for Wrapping\<i16>



### impl Shr\<usize> for Wrapping\<i32>



### impl Shr\<usize> for Wrapping\<i64>



### impl Shr\<usize> for Wrapping\<i128>



### impl Shr\<usize> for Wrapping\<isize>



### impl Shr\<usize> for Wrapping\<u8>



### impl Shr\<usize> for Wrapping\<u16>



### impl Shr\<usize> for Wrapping\<u32>



### impl Shr\<usize> for Wrapping\<u64>



### impl Shr\<usize> for Wrapping\<u128>



### impl Shr\<usize> for Wrapping\<usize>



### impl\<'a> Shr\<i8> for &'a i8



### impl\<'a> Shr\<i8> for &'a i16



### impl\<'a> Shr\<i8> for &'a i32



### impl\<'a> Shr\<i8> for &'a i64



### impl\<'a> Shr\<i8> for &'a i128



### impl\<'a> Shr\<i8> for &'a isize



### impl\<'a> Shr\<i8> for &'a u8



### impl\<'a> Shr\<i8> for &'a u16



### impl\<'a> Shr\<i8> for &'a u32



### impl\<'a> Shr\<i8> for &'a u64



### impl\<'a> Shr\<i8> for &'a u128



### impl\<'a> Shr\<i8> for &'a usize



### impl\<'a> Shr\<i16> for &'a i8



### impl\<'a> Shr\<i16> for &'a i16



### impl\<'a> Shr\<i16> for &'a i32



### impl\<'a> Shr\<i16> for &'a i64



### impl\<'a> Shr\<i16> for &'a i128



### impl\<'a> Shr\<i16> for &'a isize



### impl\<'a> Shr\<i16> for &'a u8



### impl\<'a> Shr\<i16> for &'a u16



### impl\<'a> Shr\<i16> for &'a u32



### impl\<'a> Shr\<i16> for &'a u64



### impl\<'a> Shr\<i16> for &'a u128



### impl\<'a> Shr\<i16> for &'a usize



### impl\<'a> Shr\<i32> for &'a i8



### impl\<'a> Shr\<i32> for &'a i16



### impl\<'a> Shr\<i32> for &'a i32



### impl\<'a> Shr\<i32> for &'a i64



### impl\<'a> Shr\<i32> for &'a i128



### impl\<'a> Shr\<i32> for &'a isize



### impl\<'a> Shr\<i32> for &'a u8



### impl\<'a> Shr\<i32> for &'a u16



### impl\<'a> Shr\<i32> for &'a u32



### impl\<'a> Shr\<i32> for &'a u64



### impl\<'a> Shr\<i32> for &'a u128



### impl\<'a> Shr\<i32> for &'a usize



### impl\<'a> Shr\<i64> for &'a i8



### impl\<'a> Shr\<i64> for &'a i16



### impl\<'a> Shr\<i64> for &'a i32



### impl\<'a> Shr\<i64> for &'a i64



### impl\<'a> Shr\<i64> for &'a i128



### impl\<'a> Shr\<i64> for &'a isize



### impl\<'a> Shr\<i64> for &'a u8



### impl\<'a> Shr\<i64> for &'a u16



### impl\<'a> Shr\<i64> for &'a u32



### impl\<'a> Shr\<i64> for &'a u64



### impl\<'a> Shr\<i64> for &'a u128



### impl\<'a> Shr\<i64> for &'a usize



### impl\<'a> Shr\<i128> for &'a i8



### impl\<'a> Shr\<i128> for &'a i16



### impl\<'a> Shr\<i128> for &'a i32



### impl\<'a> Shr\<i128> for &'a i64



### impl\<'a> Shr\<i128> for &'a i128



### impl\<'a> Shr\<i128> for &'a isize



### impl\<'a> Shr\<i128> for &'a u8



### impl\<'a> Shr\<i128> for &'a u16



### impl\<'a> Shr\<i128> for &'a u32



### impl\<'a> Shr\<i128> for &'a u64



### impl\<'a> Shr\<i128> for &'a u128



### impl\<'a> Shr\<i128> for &'a usize



### impl\<'a> Shr\<isize> for &'a i8



### impl\<'a> Shr\<isize> for &'a i16



### impl\<'a> Shr\<isize> for &'a i32



### impl\<'a> Shr\<isize> for &'a i64



### impl\<'a> Shr\<isize> for &'a i128



### impl\<'a> Shr\<isize> for &'a isize



### impl\<'a> Shr\<isize> for &'a u8



### impl\<'a> Shr\<isize> for &'a u16



### impl\<'a> Shr\<isize> for &'a u32



### impl\<'a> Shr\<isize> for &'a u64



### impl\<'a> Shr\<isize> for &'a u128



### impl\<'a> Shr\<isize> for &'a usize



### impl\<'a> Shr\<u8> for &'a i8



### impl\<'a> Shr\<u8> for &'a i16



### impl\<'a> Shr\<u8> for &'a i32



### impl\<'a> Shr\<u8> for &'a i64



### impl\<'a> Shr\<u8> for &'a i128



### impl\<'a> Shr\<u8> for &'a isize



### impl\<'a> Shr\<u8> for &'a u8



### impl\<'a> Shr\<u8> for &'a u16



### impl\<'a> Shr\<u8> for &'a u32



### impl\<'a> Shr\<u8> for &'a u64



### impl\<'a> Shr\<u8> for &'a u128



### impl\<'a> Shr\<u8> for &'a usize



### impl\<'a> Shr\<u16> for &'a i8



### impl\<'a> Shr\<u16> for &'a i16



### impl\<'a> Shr\<u16> for &'a i32



### impl\<'a> Shr\<u16> for &'a i64



### impl\<'a> Shr\<u16> for &'a i128



### impl\<'a> Shr\<u16> for &'a isize



### impl\<'a> Shr\<u16> for &'a u8



### impl\<'a> Shr\<u16> for &'a u16



### impl\<'a> Shr\<u16> for &'a u32



### impl\<'a> Shr\<u16> for &'a u64



### impl\<'a> Shr\<u16> for &'a u128



### impl\<'a> Shr\<u16> for &'a usize



### impl\<'a> Shr\<u32> for &'a i8



### impl\<'a> Shr\<u32> for &'a i16



### impl\<'a> Shr\<u32> for &'a i32



### impl\<'a> Shr\<u32> for &'a i64



### impl\<'a> Shr\<u32> for &'a i128



### impl\<'a> Shr\<u32> for &'a isize



### impl\<'a> Shr\<u32> for &'a u8



### impl\<'a> Shr\<u32> for &'a u16



### impl\<'a> Shr\<u32> for &'a u32



### impl\<'a> Shr\<u32> for &'a u64



### impl\<'a> Shr\<u32> for &'a u128



### impl\<'a> Shr\<u32> for &'a usize



### impl\<'a> Shr\<u64> for &'a i8



### impl\<'a> Shr\<u64> for &'a i16



### impl\<'a> Shr\<u64> for &'a i32



### impl\<'a> Shr\<u64> for &'a i64



### impl\<'a> Shr\<u64> for &'a i128



### impl\<'a> Shr\<u64> for &'a isize



### impl\<'a> Shr\<u64> for &'a u8



### impl\<'a> Shr\<u64> for &'a u16



### impl\<'a> Shr\<u64> for &'a u32



### impl\<'a> Shr\<u64> for &'a u64



### impl\<'a> Shr\<u64> for &'a u128



### impl\<'a> Shr\<u64> for &'a usize



### impl\<'a> Shr\<u128> for &'a i8



### impl\<'a> Shr\<u128> for &'a i16



### impl\<'a> Shr\<u128> for &'a i32



### impl\<'a> Shr\<u128> for &'a i64



### impl\<'a> Shr\<u128> for &'a i128



### impl\<'a> Shr\<u128> for &'a isize



### impl\<'a> Shr\<u128> for &'a u8



### impl\<'a> Shr\<u128> for &'a u16



### impl\<'a> Shr\<u128> for &'a u32



### impl\<'a> Shr\<u128> for &'a u64



### impl\<'a> Shr\<u128> for &'a u128



### impl\<'a> Shr\<u128> for &'a usize



### impl\<'a> Shr\<usize> for &'a i8



### impl\<'a> Shr\<usize> for &'a i16



### impl\<'a> Shr\<usize> for &'a i32



### impl\<'a> Shr\<usize> for &'a i64



### impl\<'a> Shr\<usize> for &'a i128



### impl\<'a> Shr\<usize> for &'a isize



### impl\<'a> Shr\<usize> for &'a u8



### impl\<'a> Shr\<usize> for &'a u16



### impl\<'a> Shr\<usize> for &'a u32



### impl\<'a> Shr\<usize> for &'a u64



### impl\<'a> Shr\<usize> for &'a u128



### impl\<'a> Shr\<usize> for &'a usize



### impl\<'a> Shr\<usize> for &'a Saturating\<i8>



### impl\<'a> Shr\<usize> for &'a Saturating\<i16>



### impl\<'a> Shr\<usize> for &'a Saturating\<i32>



### impl\<'a> Shr\<usize> for &'a Saturating\<i64>



### impl\<'a> Shr\<usize> for &'a Saturating\<i128>



### impl\<'a> Shr\<usize> for &'a Saturating\<isize>



### impl\<'a> Shr\<usize> for &'a Saturating\<u8>



### impl\<'a> Shr\<usize> for &'a Saturating\<u16>



### impl\<'a> Shr\<usize> for &'a Saturating\<u32>



### impl\<'a> Shr\<usize> for &'a Saturating\<u64>



### impl\<'a> Shr\<usize> for &'a Saturating\<u128>



### impl\<'a> Shr\<usize> for &'a Saturating\<usize>



### impl\<'a> Shr\<usize> for &'a Wrapping\<i8>



### impl\<'a> Shr\<usize> for &'a Wrapping\<i16>



### impl\<'a> Shr\<usize> for &'a Wrapping\<i32>



### impl\<'a> Shr\<usize> for &'a Wrapping\<i64>



### impl\<'a> Shr\<usize> for &'a Wrapping\<i128>



### impl\<'a> Shr\<usize> for &'a Wrapping\<isize>



### impl\<'a> Shr\<usize> for &'a Wrapping\<u8>



### impl\<'a> Shr\<usize> for &'a Wrapping\<u16>



### impl\<'a> Shr\<usize> for &'a Wrapping\<u32>



### impl\<'a> Shr\<usize> for &'a Wrapping\<u64>



### impl\<'a> Shr\<usize> for &'a Wrapping\<u128>



### impl\<'a> Shr\<usize> for &'a Wrapping\<usize>



### impl<'lhs, 'rhs, T, const LANES: usize> Shr<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>

```rust
impl<'lhs, 'rhs, T, const LANES: usize> Shr<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Shr<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> Shr<&Simd<T, LANES>> for Simd<T, LANES>

```rust
impl<T, const LANES: usize> Shr<&Simd<T, LANES>> for Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Shr<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> Shr<Simd<T, LANES>> for &Simd<T, LANES>

```rust
impl<T, const LANES: usize> Shr<Simd<T, LANES>> for &Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Shr<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<const N: usize> Shr<Simd<i8, N>> for Simd<i8, N>

```rust
impl<const N: usize> Shr<Simd<i8, N>> for Simd<i8, N>
where
  i8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shr<Simd<i16, N>> for Simd<i16, N>

```rust
impl<const N: usize> Shr<Simd<i16, N>> for Simd<i16, N>
where
  i16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shr<Simd<i32, N>> for Simd<i32, N>

```rust
impl<const N: usize> Shr<Simd<i32, N>> for Simd<i32, N>
where
  i32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shr<Simd<i64, N>> for Simd<i64, N>

```rust
impl<const N: usize> Shr<Simd<i64, N>> for Simd<i64, N>
where
  i64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shr<Simd<isize, N>> for Simd<isize, N>

```rust
impl<const N: usize> Shr<Simd<isize, N>> for Simd<isize, N>
where
  isize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shr<Simd<u8, N>> for Simd<u8, N>

```rust
impl<const N: usize> Shr<Simd<u8, N>> for Simd<u8, N>
where
  u8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shr<Simd<u16, N>> for Simd<u16, N>

```rust
impl<const N: usize> Shr<Simd<u16, N>> for Simd<u16, N>
where
  u16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shr<Simd<u32, N>> for Simd<u32, N>

```rust
impl<const N: usize> Shr<Simd<u32, N>> for Simd<u32, N>
where
  u32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shr<Simd<u64, N>> for Simd<u64, N>

```rust
impl<const N: usize> Shr<Simd<u64, N>> for Simd<u64, N>
where
  u64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```



### impl\<const N: usize> Shr<Simd<usize, N>> for Simd<usize, N>

```rust
impl<const N: usize> Shr<Simd<usize, N>> for Simd<usize, N>
where
  usize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
