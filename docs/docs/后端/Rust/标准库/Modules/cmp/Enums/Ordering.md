# Enum std::cmp::Ordering

`Ordering` 是两个值之间比较的结果。

```rust
#[repr(i8)]
pub enum Ordering {
    Less,
    Equal,
    Greater,
}
```

示例

```rust
use std::cmp::Ordering;

assert_eq!(1.cmp(&2), Ordering::Less);

assert_eq!(1.cmp(&1), Ordering::Equal);

assert_eq!(2.cmp(&1), Ordering::Greater);
```





## Variants

### Less

比较值小于另一个值的排序。



### Equal

比较值等于另一个的排序。



### Greater

比较值大于另一个值的排序。





## Implementations

### impl Ordering

#### is_eq

如果排序的结果是 `Equal` 变体，则返回 `true`。

```rust
pub const fn is_eq(self) -> bool
```

**返回值**：返回`bool`值

```rust
use std::cmp::Ordering;

assert_eq!(Ordering::Less.is_eq(), false);
assert_eq!(Ordering::Equal.is_eq(), true);
assert_eq!(Ordering::Greater.is_eq(), false);
```



#### is_ne

如果排序的结果不是 `Equal` 变体，则返回 `true`。

```rust
pub const fn is_ne(self) -> bool
```

**返回值**：返回`bool`值

```rust
use std::cmp::Ordering;

assert_eq!(Ordering::Less.is_ne(), true);
assert_eq!(Ordering::Equal.is_ne(), false);
assert_eq!(Ordering::Greater.is_ne(), true);
```



#### is_lt

如果排序的是 `Less` 变体，则返回 `true`。

```rust
pub const fn is_lt(self) -> bool
```

**返回值**：返回`bool`值

```rust
use std::cmp::Ordering;

assert_eq!(Ordering::Less.is_lt(), true);
assert_eq!(Ordering::Equal.is_lt(), false);
assert_eq!(Ordering::Greater.is_lt(), false);
```



#### is_gt

如果排序的是 `Greater` 变体，则返回 `true`。

```rust
pub const fn is_gt(self) -> bool
```

**返回值**：返回`bool`值

```rust
use std::cmp::Ordering;

assert_eq!(Ordering::Less.is_gt(), false);
assert_eq!(Ordering::Equal.is_gt(), false);
assert_eq!(Ordering::Greater.is_gt(), true);
```



#### is_le

如果排序的是 `Less` 或 `Equal` 变体，则返回 `true`。

```rust
pub const fn is_le(self) -> bool
```

**返回值**：返回`bool`值

```rust
use std::cmp::Ordering;

assert_eq!(Ordering::Less.is_le(), true);
assert_eq!(Ordering::Equal.is_le(), true);
assert_eq!(Ordering::Greater.is_le(), false);
```



#### is_ge

如果排序的是 `Greater` 或 `Equal` 变体，则返回 `true`。

```rust
pub const fn is_ge(self) -> bool
```

**返回值**：返回`bool`值

```rust
use std::cmp::Ordering;

assert_eq!(Ordering::Less.is_ge(), false);
assert_eq!(Ordering::Equal.is_ge(), true);
assert_eq!(Ordering::Greater.is_ge(), true);
```



#### reverse

反转 `Ordering`。

- `Less` 变成 `Greater`。
- `Greater` 变成 `Less`。
- `Equal` 变成 `Equal`。

```rust
pub const fn reverse(self) -> Ordering
```

**返回值**：返回转换后的新`Ordering`

```rust
use std::cmp::Ordering;

assert_eq!(Ordering::Less.reverse(), Ordering::Greater);
assert_eq!(Ordering::Equal.reverse(), Ordering::Equal);
assert_eq!(Ordering::Greater.reverse(), Ordering::Less);
```

此方法可用于反转比较：

```rust
let data: &mut [_] = &mut [2, 10, 5, 8];

// 从最大到最小对数组进行排序。
data.sort_by(|a, b| a.cmp(b).reverse());

let b: &mut [_] = &mut [10, 8, 5, 2];
assert!(data == b);
```



#### then

链接两个排序。

如果不是 `Equal`，则返回 `self`。否则返回 `other`。

```rust
pub const fn then(self, other: Ordering) -> Ordering
```

**返回值**：返回最后比较出来的`Ordering`

```rust
use std::cmp::Ordering;

let result = Ordering::Equal.then(Ordering::Less);
assert_eq!(result, Ordering::Less);

let result = Ordering::Less.then(Ordering::Equal);
assert_eq!(result, Ordering::Less);

let result = Ordering::Less.then(Ordering::Greater);
assert_eq!(result, Ordering::Less);

let result = Ordering::Equal.then(Ordering::Equal);
assert_eq!(result, Ordering::Equal);

let x: (i64, i64, i64) = (1, 2, 7);
let y: (i64, i64, i64) = (1, 5, 3);
let result = x.0.cmp(&y.0).then(x.1.cmp(&y.1)).then(x.2.cmp(&y.2));

assert_eq!(result, Ordering::Less);
```



#### then_with

用给定的函数链接顺序。

如果不是 `Equal`，则返回 `self`。 否则，调用 `f` 并返回结果。

```rust
pub fn then_with<F>(self, f: F) -> Ordering
where
    F: FnOnce() -> Ordering,
```

**返回值**：返回最后比较出来的`Ordering`

```rust
use std::cmp::Ordering;

let result = Ordering::Equal.then_with(|| Ordering::Less);
assert_eq!(result, Ordering::Less);

let result = Ordering::Less.then_with(|| Ordering::Equal);
assert_eq!(result, Ordering::Less);

let result = Ordering::Less.then_with(|| Ordering::Greater);
assert_eq!(result, Ordering::Less);

let result = Ordering::Equal.then_with(|| Ordering::Equal);
assert_eq!(result, Ordering::Equal);

let x: (i64, i64, i64) = (1, 2, 7);
let y: (i64, i64, i64) = (1, 5, 3);
let result = x.0.cmp(&y.0).then_with(|| x.1.cmp(&y.1)).then_with(|| x.2.cmp(&y.2));

assert_eq!(result, Ordering::Less);
```



## Trait Implementations

### impl Clone for Ordering

#### clone

返回值的副本。 

```rust
fn clone(&self) -> Ordering
```



#### clone_from

从source执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### impl Debug for Ordering

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



### impl Hash for Ordering

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



### impl Ord for Ordering

#### cmp

此方法返回 self 和 other 之间的 Ordering。 

```rust
fn cmp(&self, other: &Ordering) -> Ordering
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



### impl PartialEq\<Ordering> for Ordering

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &Ordering) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### impl PartialOrd\<Ordering> for Ordering

#### partial_cmp

如果存在，则此方法返回 self 和 other 值之间的顺序。 

```rust
fn partial_cmp(&self, other: &Ordering) -> Option<Ordering>
```



#### lt

此方法测试的内容少于 (对于 self 和 other)，并且由 < 操作员使用。 

```rust
fn lt(&self, other: &Rhs) -> bool
```



#### le

此方法测试小于或等于 (对于 self 和 other)，并且由 <= 运算符使用。 

```rust
fn le(&self, other: &Rhs) -> bool
```



#### gt

此方法测试大于 (对于 self 和 other)，并且由 > 操作员使用。 

```rust
fn gt(&self, other: &Rhs) -> bool
```



#### ge

此方法测试是否大于或等于 (对于 self 和 other)，并且由 >= 运算符使用。 

```rust
fn ge(&self, other: &Rhs) -> bool
```



### impl Copy for Ordering



### impl Eq for Ordering



### impl StructuralEq for Ordering



### impl StructuralPartialEq for Ordering



## Auto Trait Implementations

### impl RefUnwindSafe for Ordering

### impl Send for Ordering

### impl Sync for Ordering

### impl Unpin for Ordering

### impl UnwindSafe for Ordering



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