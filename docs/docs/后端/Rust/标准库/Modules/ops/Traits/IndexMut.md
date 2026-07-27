# Trait std::ops::IndexMut

用于可变上下文中的索引操作 (`container[index]`)。

`container[index]` 实际上是 `*container.index_mut(index)` 的语法糖，但**仅在用作可变值时使用**。 

如果请求一个不可变值，则使用 [`Index`](./Index) trait。 这允许使用诸如 `v[index] = value` 之类的语法。

```rust
pub trait IndexMut<Idx>: Index<Idx>
where
    Idx: ?Sized,
{
    // Required method
    fn index_mut(&mut self, index: Idx) -> &mut Self::Output;
}
```

示例：`Balance` 结构体的非常简单的实现，它具有两个面，每个面都可以可变和不可变地进行索引。

```rust
use std::ops::{Index, IndexMut};

#[derive(Debug)]
enum Side {
    Left,
    Right,
}

#[derive(Debug, PartialEq)]
enum Weight {
    Kilogram(f32),
    Pound(f32),
}

struct Balance {
    pub left: Weight,
    pub right: Weight,
}

impl Index<Side> for Balance {
    type Output = Weight;

    fn index(&self, index: Side) -> &Self::Output {
        println!("Accessing {index:?}-side of balance immutably");
        match index {
            Side::Left => &self.left,
            Side::Right => &self.right,
        }
    }
}

impl IndexMut<Side> for Balance {
    fn index_mut(&mut self, index: Side) -> &mut Self::Output {
        println!("Accessing {index:?}-side of balance mutably");
        match index {
            Side::Left => &mut self.left,
            Side::Right => &mut self.right,
        }
    }
}

let mut balance = Balance {
    right: Weight::Kilogram(2.5),
    left: Weight::Pound(1.5),
};

// 在这种情况下，`balance[Side::Right]` 是 `*balance.index(Side::Right)` 的糖，因为我们只是* 读*`balance[Side::Right]`，而不是写 `balance[Side::Right]`。
assert_eq!(balance[Side::Right], Weight::Kilogram(2.5));

// 但是，在这种情况下，`balance[Side::Left]` 是 `*balance.index_mut(Side::Left)` 的糖，因为我们正在编写 `balance[Side::Left]`。
balance[Side::Left] = Weight::Kilogram(3.0);
```





## Required Methods

### index_mut

执行可变索引`container[index]`操作。

```rust
fn index_mut(&mut self, index: Idx) -> &mut Self::Output
```



:::tip Panics

如果索引越界，则可能为 panic。

:::



## Implementors

### String

```rust
impl IndexMut<Range<usize>> for String
```



### String

```rust
impl IndexMut<RangeFrom<usize>> for String
```



### OsString

```rust
impl IndexMut<RangeFull> for OsString
```



### String

```rust
impl IndexMut<RangeFull> for String
```



### String

```rust
impl IndexMut<RangeInclusive<usize>> for String
```



### String

```rust
impl IndexMut<RangeTo<usize>> for String
```



### String

```rust
impl IndexMut<RangeToInclusive<usize>> for String
```



### str

```rust
impl<I> IndexMut<I> for str
where
  I: SliceIndex<str>,
```



### Simd<T, LANES>

```rust
impl<I, T, const LANES: usize> IndexMut<I> for Simd<T, LANES>
where
  T: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
  I: SliceIndex<[T]>,
```



### VecDeque<T, A>

```rust
impl<T, A> IndexMut<usize> for VecDeque<T, A>

where

  A: Allocator,
```



### [T]

```rust
impl<T, I> IndexMut<I> for [T]

where

  I: SliceIndex<[T]>,
```



### Vec<T, A>

```rust
impl<T, I, A> IndexMut<I> for Vec<T, A>

where

  I: SliceIndex<[T]>,

  A: Allocator,
```



### [T; N]

```rust
impl<T, I, const N: usize> IndexMut<I> for [T; N]
where
[T]: IndexMut<I>,