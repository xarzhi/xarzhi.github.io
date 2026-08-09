# Struct std::cmp::Reverse

用于逆序排序的辅助结构体。

```rust
#[repr(transparent)]
pub struct Reverse<T>(pub T);
```

该结构是一个帮助器，可与 `Vec::sort_by_key` 等函数一起使用，并且可以用于对键的一部分进行反向排序。

```rust
use std::cmp::Reverse;

let mut v = vec![1, 2, 3, 4, 5, 6];
v.sort_by_key(|&num| (num > 3, Reverse(num)));
assert_eq!(v, vec![3, 2, 1, 6, 5, 4]);
```



## Tuple Fields

### 0: T



## Trait Implementations

### impl\<T> Clone for Reverse\<T>

```rust
impl<T> Clone for Reverse<T>
where
  T: Clone,
```



#### clone

返回值的副本。 

```rust
fn clone(&self) -> Reverse<T>
```



#### clone_from

从 other 执行复制分配。 

```rust
fn clone_from(&mut self, other: &Reverse<T>)
```



### impl\<T> Debug for Reverse\<T>

```rust
impl<T> Debug for Reverse<T>
where
  T: Debug,
```



#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



### impl\<T> Default for Reverse\<T>

```rust
impl<T> Default for Reverse<T>
where
  T: Default,
```



#### default

返回类型的 “默认值”。 

```rust
fn default() -> Reverse<T>
```



### impl\<T> Hash for Reverse\<T>

```rust
impl<T> Hash for Reverse<T>
where
  T: Hash,
```



#### hash

将该值输入给定的 Hasher。 

```rust
fn hash<__H>(&self, state: &mut __H)
where
  __H: Hasher,
```



#### hash_slice

将这种类型的切片送入给定的 Hasher 中。 

```rust
fn hash_slice<H>(data: &[Self], state: &mut H)
where
  H: Hasher,
  Self: Sized,
```



### impl\<T> Ord for Reverse\<T>

```rust
impl<T> Ord for Reverse<T>
where
  T: Ord,
```



#### cmp

此方法返回 self 和 other 之间的 Ordering。 

```rust
fn cmp(&self, other: &Reverse<T>) -> Ordering
```



#### max

比较并返回两个值中的最大值。 

```rust
fn max(self, other: Self) -> Self
where
  Self: Sized,
```



#### min

比较并返回两个值中的最小值。 

```rust
fn min(self, other: Self) -> Self
where
  Self: Sized,
```



#### clamp

将值限制在某个时间间隔内。 

```rust
fn clamp(self, min: Self, max: Self) -> Self
where
  Self: Sized + PartialOrd<Self>,
```



### impl\<T> PartialEq<Reverse\<T>> for Reverse\<T>

```rust
impl<T> PartialEq<Reverse<T>> for Reverse<T>
where
  T: PartialEq<T>,
```



#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &Reverse<T>) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### impl\<T> PartialOrd<Reverse\<T>> for Reverse\<T>

```rust
impl<T> PartialOrd<Reverse<T>> for Reverse<T>
where
  T: PartialOrd<T>,
```



#### partial_cmp

如果存在，则此方法返回 self 和 other 值之间的顺序。 

```rust
fn partial_cmp(&self, other: &Reverse<T>) -> Option<Ordering>
```



#### lt

此方法测试的内容少于 (对于 self 和 other)，并且由 < 操作员使用。 

```rust
fn lt(&self, other: &Reverse<T>) -> bool
```



#### le

此方法测试小于或等于 (对于 self 和 other)，并且由 <= 运算符使用。 

```rust
fn le(&self, other: &Reverse<T>) -> bool
```



#### gt

此方法测试大于 (对于 self 和 other)，并且由 > 操作员使用。 

```rust
fn gt(&self, other: &Reverse<T>) -> bool
```



#### ge

此方法测试是否大于或等于 (对于 self 和 other)，并且由 >= 运算符使用。 

```rust
fn ge(&self, other: &Reverse<T>) -> bool
```



### impl\<T> Copy for Reverse\<T>

```rust
impl<T> Copy for Reverse<T>
where
  T: Copy,
```



### impl\<T> Eq for Reverse\<T>

```rust
impl<T> Eq for Reverse<T>
where
  T: Eq,
```



### impl\<T> StructuralEq for Reverse\<T>



### impl\<T> StructuralPartialEq for Reverse\<T>



## Auto Trait Implementations

### impl\<T> RefUnwindSafe for Reverse\<T>

```rust
impl<T> RefUnwindSafe for Reverse<T>
where
  T: RefUnwindSafe,
```



### impl\<T> Send for Reverse\<T>

```rust
impl<T> Send for Reverse<T>
where
  T: Send,
```



### impl\<T> Sync for Reverse\<T>

```rust
impl<T> Sync for Reverse<T>
where
  T: Sync,
```



### impl\<T> Unpin for Reverse\<T>

```rust
impl<T> Unpin for Reverse<T>
where
  T: Unpin,
```



### impl\<T> UnwindSafe for Reverse\<T>

```rust
impl<T> UnwindSafe for Reverse<T>
where
  T: UnwindSafe,
```



## Blanket Implementations

### impl\<T> Any for T

```rust
impl<T> Any for T
where
  T: 'static + ?Sized,
```



### impl\<T> Borrow\<T> for T

```rust
impl<T> Borrow<T> for T
where
  T: ?Sized,
```



### impl\<T> BorrowMut\<T> for T

```rust
impl<T> BorrowMut<T> for T
where
  T: ?Sized,
```



### impl\<T> From\<T> for T



### impl<T, U> Into\<U> for T

```rust
impl<T, U> Into<U> for T
where
  U: From<T>,
```



### impl\<T> ToOwned for T

```rust
impl<T> ToOwned for T
where
  T: Clone,
```



### impl<T, U> TryFrom\<U> for T

```rust
impl<T, U> TryFrom<U> for T
where
  U: Into<T>,
```



### impl<T, U> TryInto\<U> for T

```rust
impl<T, U> TryInto<U> for T
where
  U: TryFrom<T>,