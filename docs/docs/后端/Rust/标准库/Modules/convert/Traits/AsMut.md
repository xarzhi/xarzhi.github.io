# Trait std::convert::AsMut

把`Slef`类型转化为`T`类型的可变引用

```rust
pub trait AsMut<T>
where
    T: ?Sized,
{
    // Required method
    fn as_mut(&mut self) -> &mut T;
}
```

注意：此 trait 一定不能失败。如果转换失败，请使用专用方法返回 `Option<T>` 或 `Result<T, E>`。





AsMut 自动解引用，如果内部类型是不兼容引用 (例如: 如果 foo 具有 &mut Foo 或 &mut &mut Foo 类型，foo.as_mut() 将工作相同)。

请注意，由于历史原因，上述内容目前并不适用于所有 mutably dereferenceable types，例如 foo.as_mut()不会与 Box::new(foo).as_mut() 一样工作。 相反，许多智能指针提供了一个 as_mut 实现，它简单地将一个引用返回给 pointed-to value (但不对该值执行廉价的引用 - 到 - 引用转换)。 但是，AsMut::as_mut 不应仅用于无效解引用; 可以使用 ‘Deref coercion’ 代替:

```rust
let mut x = Box::new(5i32);
// 避免这种情况:
// let y: &mut i32 = x.as_mut();
// 最好只写:
let y: &mut i32 = &mut x;
```

实现 `DerefMut` 的类型应考虑添加 `AsMut<T>` 的实现，如下所示:

```rust
impl<T> AsMut<T> for SomeType
where
    <SomeType as Deref>::Target: AsMut<T>,
{
    fn as_mut(&mut self) -> &mut T {
        self.deref_mut().as_mut()
    }
}
```





## Required Methods

### as_mut

将此类型转换为 (通常是推断的) 输入类型的错误引用。

```rust
fn as_mut(&mut self) -> &mut T
```







## Implementors

### impl AsMut\<str> for str



### impl AsMut\<str> for String



### impl\<T> AsMut<[T]> for [T]



### impl<T, A> AsMut<[T]> for Vec<T, A>

```rust
impl<T, A> AsMut<[T]> for Vec<T, A>
where
  A: Allocator,
```



### impl<T, A> AsMut<Vec<T, A>> for Vec<T, A>

```rust
impl<T, A> AsMut<Vec<T, A>> for Vec<T, A>
where
  A: Allocator,
```



### impl<T, A> AsMut\<T> for Box<T, A>

```rust
impl<T, A> AsMut<T> for Box<T, A>
where
  A: Allocator,
  T: ?Sized,
```



### impl<T, U> AsMut\<U> for &mut T

```rust
impl<T, U> AsMut<U> for &mut T
where
  T: AsMut<U> + ?Sized,
  U: ?Sized,
```



### impl<T, const N: usize> AsMut<[T; N]> for Simd<T, N>

```rust
impl<T, const N: usize> AsMut<[T; N]> for Simd<T, N>
where
  LaneCount<N>: SupportedLaneCount,
  T: SimdElement,
```



### impl<T, const N: usize> AsMut<[T]> for [T; N]

```rust
impl<T, const N: usize> AsMut<[T]> for Simd<T, N>
where
  LaneCount<N>: SupportedLaneCount,
  T: SimdElement,