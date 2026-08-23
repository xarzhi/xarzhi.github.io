# Struct std::fmt::Error

将消息格式化为流后返回的错误类型。

```rust
pub struct Error;
```

除了发生错误以外，此类型不支持错误的传输。 必须安排任何其他信息以通过其他方式进行传输。

要记住的重要一点是，不要将 `fmt::Error` 类型与 `std::io::Error` 或 `std::error::Error` 混淆，在作用域中也可以将它们与 `std::io::Error` 或 `std::error::Error` 混淆。

```rust
use std::fmt::{self, write};

let mut output = String::new();
if let Err(fmt::Error) = write(&mut output, format_args!("Hello {}!", "world")) {
    panic!("An error occurred");
}
```



## Trait Implementations



### impl Clone for Error

#### clone

返回值的副本。 

```rust
fn clone(&self) -> Error
```



#### clone_from

从source执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### impl Debug for Error

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



### impl Default for Error

#### default

返回类型的 “默认值”。 

```rust
fn default() -> Error
```



### impl Display for Error

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



### impl Hash for Error

#### hash

将该值输入给定的 Hasher。 

```rust
fn hash<__H>(&self, state: &mut __H)
where
  __H: Hasher,
```



hash_slice

将这种类型的切片送入给定的 Hasher 中。 

```rust
fn hash_slice<H>(data: &[Self], state: &mut H)

where

  H: Hasher,

  Self: Sized,
```

### impl Ord for Error



cmp

此方法返回 self 和 other 之间的 Ordering。 

```rust
fn cmp(&self, other: &Error) -> Ordering
```

max

比较并返回两个值中的最大值。 

```rust
fn max(self, other: Self) -> Self

where

  Self: Sized,
```

min

比较并返回两个值中的最小值。 

```rust
fn min(self, other: Self) -> Self

where

  Self: Sized,
```

clamp

将值限制在某个时间间隔内。 

```rust
fn clamp(self, min: Self, max: Self) -> Self

where

  Self: Sized + PartialOrd<Self>,
```



### impl PartialEq\<Error> for Error

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &Error) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### impl PartialOrd\<Error> for Error

#### partial_cmp

如果存在，则此方法返回 self 和 other 值之间的顺序。 

```rust
fn partial_cmp(&self, other: &Error) -> Option<Ordering>
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



### impl Copy for Error

### impl Eq for Error

### impl StructuralEq for Error

### impl StructuralPartialEq for Error



## Auto Trait Implementations

### impl RefUnwindSafe for Error

### impl Send for Error

### impl Sync for Error

### impl Unpin for Error

### impl UnwindSafe for Error



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



### impl\<E> Provider for E

```rust
impl<E> Provider for E
where
  E: Error + ?Sized,
```



### impl\<T> ToOwned for T

```rust
impl<T> ToOwned for T
where
  T: Clone,
```



### impl\<T> ToString for T

```rust
impl<T> ToString for T
where
  T: Display + ?Sized,
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