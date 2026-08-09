# Trait std::convert::TryInto

用于将`Self`类型的值转化为`T`类型的值，与`TryFrom`相反，但是可能会出现转换失败的情况，

```rust
pub trait TryInto<T>: Sized {
    type Error;

    // Required method
    fn try_into(self) -> Result<T, Self::Error>;
}
```

库作者通常不应直接实现此 trait，而应首选实现 TryFrom trait，它具有更大的灵活性，并免费提供了等效的 TryInto 实现，这要归功于标准库中的全面实现。 有关此的更多信息，请参见 Into 的文档。





## Required Associated Types

### Error

发生转换错误时返回的类型。

```rust
type Error
```







## Required Methods

### try_into

转换函数，将`Self`类型转换为`T`类型，并放入`Ok`中，若转换失败则返回`Err`

```rust
fn try_into(self) -> Result<T, Self::Error>
```







## Implementors

```rust
impl<T, U> TryInto<U> for T
where
  U: TryFrom<T>,
```

