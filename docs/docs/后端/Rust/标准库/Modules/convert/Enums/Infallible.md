# Enum std::convert::Infallible

永远不会发生的错误的错误类型。

```rust
pub enum Infallible {}
```

由于此枚举没有变体，因此这种类型的值实际上永远不会存在。 这对于使用 `Result` 并参数化错误类型的泛型 API 很有用，以指示结果始终为 `Ok`。

例如，对于存在反向 `Into` 实现的所有类型，`TryFrom` trait (返回 `Result` 的转换) 都具有通用实现。

```rust
impl<T, U> TryFrom<U> for T where U: Into<T> {
    type Error = Infallible;

    fn try_from(value: U) -> Result<Self, Infallible> {
        Ok(U::into(value))  // 永不返回 `Err`
    }
}
```



## Future 兼容性

该枚举与 never 类型 (`!`) 具有相同的作用，在此版本的 Rust 中是不稳定的。 当 `!` 稳定后，我们计划将 `Infallible` 用作它的类型别名：

```rust
pub type Infallible = !;
```

… 并最终弃用 `Infallible`。

但是，在一种情况下，可以在将 `!` 稳定为完整类型之前使用 `!` 语法：在函数的返回类型位置。 具体来说，可以实现两种不同的函数指针类型：

```rust
trait MyTrait {}
impl MyTrait for fn() -> ! {}
impl MyTrait for fn() -> std::convert::Infallible {}
```

`Infallible` 是一个枚举，这个代码是有效的。 但是，当 `Infallible` 成为 never type 的别名时，两个 `impl` 将开始重叠，因此将被语言的 trait 一致性规则所禁止。



## Trait Implementations



### impl Clone for Infallible

#### clone

返回值的副本。 

```rust
fn clone(&self) -> Infallible
```



#### clone_from

从source执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### impl Debug for Infallible

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, _: &mut Formatter<'_>) -> Result<(), Error>
```



### impl Display for Infallible

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, _: &mut Formatter<'_>) -> Result<(), Error>
```



### impl Error for Infallible

#### source

此错误的下级来源 (如果有)。 

```rust
fn source(&self) -> Option<&(dyn Error + 'static)>
```



#### provide

`nightly-only`

提供对用于错误报告的上下文的基于类型的访问。 

```rust
fn provide<'a>(&'a self, demand: &mut Demand<'a>)
```



### impl From<!> for Infallible

#### from

从输入类型转换为此类型。

```rust
fn from(x: !) -> Infallible
```



### impl From\<Infallible> for TryFromIntError

#### from

从输入类型转换为此类型。

```rust
fn from(x: Infallible) -> TryFromIntError
```



### impl From\<Infallible> for TryFromSliceError

#### from

从输入类型转换为此类型。

```rust
fn from(x: Infallible) -> TryFromSliceError
```



### impl Hash for Infallible

#### hash

将该值输入给定的 Hasher。 

```rust
fn hash<H>(&self, _: &mut H)
where
  H: Hasher,
```



#### hash_slice

将这种类型的切片送入给定的 Hasher 中。 

```rust
fn hash_slice<H>(data: &[Self], state: &mut H)
where
  H: Hasher,
  Self: Sized,
```



### impl Ord for Infallible

#### cmp

此方法返回 self 和 other 之间的 Ordering。 

```rust
fn cmp(&self, _other: &Infallible) -> Ordering
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



### impl PartialEq\<Infallible> for Infallible

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, _: &Infallible) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### impl PartialOrd\<Infallible> for Infallible

#### partial_cmp

如果存在，则此方法返回 self 和 other 值之间的顺序。 

```rust
fn partial_cmp(&self, _other: &Infallible) -> Option<Ordering>
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



### impl Termination for Infallible

#### report

被调用以获取值的表示形式作为状态码。 此状态代码返回到操作系统。

```rust
fn report(self) -> ExitCode
```



### impl Copy for Infallible



### impl Eq for Infallible



## Auto Trait Implementations

### impl RefUnwindSafe for Infallible

### impl Send for Infallible

### impl Sync for Infallible

### impl Unpin for Infallible

### impl UnwindSafe for Infallible



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

### impl\<T> From<!> for T



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
```

