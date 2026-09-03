# Struct std::thread::AccessError

[`LocalKey::try_with` ](./LocalKey#try_with)返回的错误。

```rust
#[non_exhaustive]
pub struct AccessError;
```

## Trait Implementations



### impl Clone for AccessError

#### clone

返回值的副本。 

```rust
fn clone(&self) -> AccessError
```



#### clone_from

从source执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### impl Debug for AccessError

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result
```



### impl Display for AccessError

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result
```



### impl Error for AccessError

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





### impl PartialEq\<AccessError> for AccessError

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &AccessError) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### impl Copy for AccessError



### impl Eq for AccessError



### impl StructuralEq for AccessError



### impl StructuralPartialEq for AccessError



## Auto Trait Implementations

### impl RefUnwindSafe for AccessError

### impl Send for AccessError

### impl Sync for AccessError

### impl Unpin for AccessError

### impl UnwindSafe for AccessError



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