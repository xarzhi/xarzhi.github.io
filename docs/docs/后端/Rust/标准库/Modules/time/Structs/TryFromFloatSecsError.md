# Struct std::time::TryFromFloatSecsError

将秒的浮点值转换为 [`Duration`](./Duration) 时可能返回的错误。

此错误用作 [`Duration::try_from_secs_f32`](./Duration#try_from_secs_f32) 和 [`Duration::try_from_secs_f64`](./Duration#try_from_secs_f64) 的错误类型。

```rust
pub struct TryFromFloatSecsError { /* private fields */ }
```

示例

```rust
use std::time::Duration;

if let Err(e) = Duration::try_from_secs_f32(-1.0) {
    println!("Failed conversion to Duration: {e}");
}
```



## Trait Implementations



### impl Clone for TryFromFloatSecsError

#### clone

返回值的副本。 

```rust
fn clone(&self) -> TryFromFloatSecsError
```



#### clone_from

从 source 执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### impl Debug for TryFromFloatSecsError

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



### impl Display for TryFromFloatSecsError

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



### impl Error for TryFromFloatSecsError

#### source

此错误的下级来源 (如果有)。 

```rust
fn source(&self) -> Option<&(dyn Error + 'static)>
```



#### provide

提供对用于错误报告的上下文的基于类型的访问。 

`nightly-only`

```rust
fn provide<'a>(&'a self, demand: &mut Demand<'a>)
```



### impl PartialEq\<TryFromFloatSecsError> for TryFromFloatSecsError

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &TryFromFloatSecsError) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### impl Eq for TryFromFloatSecsError



### impl StructuralEq for TryFromFloatSecsError



### impl StructuralPartialEq for TryFromFloatSecsError



## Auto Trait Implementations

### impl RefUnwindSafe for TryFromFloatSecsError

### impl Send for TryFromFloatSecsError

### impl Sync for TryFromFloatSecsError

### impl Unpin for TryFromFloatSecsError

### impl UnwindSafe for TryFromFloatSecsError



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