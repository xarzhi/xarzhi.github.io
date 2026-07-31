# Trait std::ops::RangeBounds

`RangeBounds` 由 Rust 的内置范围类型实现，由 `..`、`a..`、`..b`、`..=c`、`d..e` 或 `f..=g` 等范围语法生成。

```rust
pub trait RangeBounds<T>
where
    T: ?Sized,
{
    // Required methods
    fn start_bound(&self) -> Bound<&T>;
    fn end_bound(&self) -> Bound<&T>;

    // Provided method
    fn contains<U>(&self, item: &U) -> bool
       where T: PartialOrd<U>,
             U: PartialOrd<T> + ?Sized { ... }
}
```



## Required Methods

### start_bound

开始索引绑定。

以 `Bound` 形式返回起始值。

```rust
fn start_bound(&self) -> Bound<&T>
```

**返回值**：返回一个`Bound`枚举

```rust
use std::ops::Bound::*;
use std::ops::RangeBounds;

assert_eq!((..10).start_bound(), Unbounded);
assert_eq!((3..10).start_bound(), Included(&3));
```



### end_bound

结束索引绑定。

将结束值返回为 `Bound`。

```rust
fn end_bound(&self) -> Bound<&T>
```

**返回值**：返回一个`Bound`枚举

```rust
use std::ops::Bound::*;
use std::ops::RangeBounds;

assert_eq!((3..).end_bound(), Unbounded);
assert_eq!((3..10).end_bound(), Excluded(&10));
```





## Provided Methods

### contains

如果范围中包含 item，则返回 true。

```rust
fn contains<U>(&self, item: &U) -> bool
where
  T: PartialOrd<U>,
  U: PartialOrd<T> + ?Sized,
```

**参数**：

- **item**：需要判断是否包含的项

**返回值**：根据是否包含返回`bool`值

```rust
assert!( (3..5).contains(&4));
assert!(!(3..5).contains(&2));

assert!( (0.0..1.0).contains(&0.5));
assert!(!(0.0..1.0).contains(&f32::NAN));
assert!(!(0.0..f32::NAN).contains(&0.5));
assert!(!(f32::NAN..1.0).contains(&0.5));
```



## Implementors

### (Bound<&'a T>, Bound<&'a T>)

```rust
impl<'a, T> RangeBounds<T> for (Bound<&'a T>, Bound<&'a T>)
where
  T: 'a + ?Sized,
```



### (Bound\<T>, Bound\<T>)

```rust
impl<T> RangeBounds<T> for (Bound<T>, Bound<T>)
```



### Range<&T>

```rust
impl<T> RangeBounds<T> for Range<&T>
```



### Range\<T>

```rust
impl<T> RangeBounds<T> for Range<T>
```



### RangeFrom<&T>

```rust
impl<T> RangeBounds<T> for RangeFrom<&T>
```



### RangeFrom\<T>

```rust
impl<T> RangeBounds<T> for RangeFrom<T>
```



### RangeFull

```rust
impl<T> RangeBounds<T> for RangeFull
where
  T: ?Sized,
```



### RangeInclusive\<T>

```rust
impl<T> RangeBounds<T> for RangeInclusive<&T>
```



### RangeInclusive\<T>

```rust
impl<T> RangeBounds<T> for RangeInclusive<T>
```



### RangeTo<&T>

```rust
impl<T> RangeBounds<T> for RangeTo<&T>
```



### RangeTo\<T>

```rust
impl<T> RangeBounds<T> for RangeTo<T>
```



### RangeToInclusive<&T>

```rust
impl<T> RangeBounds<T> for RangeToInclusive<&T>
```



### RangeToInclusive\<T>

```rust
impl<T> RangeBounds<T> for RangeToInclusive<T>
```

