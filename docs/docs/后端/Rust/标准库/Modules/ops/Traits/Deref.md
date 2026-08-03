# Trait std::ops::Deref

用于不可变解引用操作，例如 `*v`。

```rust
pub trait Deref {
    type Target: ?Sized;

    // Required method
    fn deref(&self) -> &Self::Target;
}
```

`Deref` 除了在不可变上下文中用于`*` 运算符的显式解引用操作外，在许多情况下，编译器都隐式使用 `Deref`。 该机制称为 `Deref` 强制多态。 在可变上下文中，使用 `DerefMut`。

为智能指针实现 `Deref` 使得访问它们背后的数据变得方便，这就是为什么它们实现 `Deref` 的原因。 另一方面，有关 `Deref` 和 `DerefMut` 的规则是专门为容纳智能指针而设计的。 因此，`Deref` 只应为智能指针实现，以避免混淆。

出于类似的原因，这个 `trait` 永远不会失败。当隐式调用 `Deref` 时，解引用过程中的失败可能会造成极大的混乱。



:::tip 有关 Deref 强制多态的更多信息

如果 `T` 实现 `Deref<Target = U>`，并且 `x` 是 `T` 类型的值，则：

- 在不可变的上下文中，`*x` (其中 `T` 既不是引用也不是裸指针) 等效于 `*Deref::deref(&x)`。
- `&T` 类型的值被强制为 `&U` 类型的值
- `T` 隐式地实现了 `U` 类型的所有 (immutable) 方法。

标准库中有许多类似的类型，比如`String`实现了`Deref<Target = str>`，`Vec`实现了`Deref<Target = [T]>`

:::



具有解引用的结构体可访问的具有单个字段的结构体。

```rust
use std::ops::Deref;

struct DerefExample<T> {
    value: T
}

impl<T> Deref for DerefExample<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.value
    }
}

let x = DerefExample { value: 'a' };
assert_eq!('a', *x);
```





## Required Associated Types

### Target

解引用后的结果类型。

```rust
type Target: ?Sized
```





## Required Methods

### deref

解引用值。

```rust
fn deref(&self) -> &Self::Target
```



## Implementors



### impl Deref for CString



### impl Deref for OsString



### impl Deref for PathBuf



### impl Deref for String



### impl<'a> Deref for IoSlice<'a>



### impl<'a> Deref for IoSliceMut<'a>



### impl<'a, 'f> Deref for VaList<'a, 'f>

```rust
impl<'a, 'f> Deref for VaList<'a, 'f>
where
  'f: 'a,
```



### impl\<B> Deref for Cow<'_, B>

```rust
impl<B> Deref for Cow<'_, B>
where
  B: ToOwned + ?Sized,
  <B as ToOwned>::Owned: Borrow<B>,
```



### impl\<P> Deref for Pin\<P>

```rust
impl<P> Deref for Pin<P>
where
  P: Deref,
```



### impl\<T> Deref for &T

```rust
impl<T> Deref for &T
where
  T: ?Sized,
```



### impl\<T> Deref for &mut T

```rust
impl<T> Deref for &mut T
where
  T: ?Sized,
```



### impl\<T> Deref for ThinBox\<T>

```rust
impl<T> Deref for ThinBox<T>
where
  T: ?Sized,
```



### impl\<T> Deref for Ref<'_, T>

```rust
impl<T> Deref for Ref<'_, T>
where
  T: ?Sized,
```



### impl\<T> Deref for RefMut<'_, T>

```rust
impl<T> Deref for RefMut<'_, T>
where
  T: ?Sized,
```



### impl\<T> Deref for PeekMut<'_, T>

```rust
impl<T> Deref for PeekMut<'_, T>
where
  T: Ord,
```



### impl\<T> Deref for ManuallyDrop\<T>

```rust
impl<T> Deref for ManuallyDrop<T>
where
  T: ?Sized,
```



### impl\<T> Deref for AssertUnwindSafe\<T>



### impl\<T> Deref for Rc\<T>

```rust
impl<T> Deref for Rc<T>
where
  T: ?Sized,
```



### impl\<T> Deref for Arc\<T>

```rust
impl<T> Deref for Arc<T>
where
  T: ?Sized,
```



### impl<T, A> Deref for Box<T, A>

```rust
impl<T, A> Deref for Box<T, A>
where
  A: Allocator,
  T: ?Sized,
```



### impl<T, A> Deref for Vec<T, A>

```rust
impl<T, A> Deref for Vec<T, A>
where
  A: Allocator,
```



### impl<T, F> Deref for LazyCell<T, F>

```rust
impl<T, F> Deref for LazyCell<T, F>
where
  F: FnOnce() -> T,
```



### impl<T, F: FnOnce() -> T> Deref for LazyLock<T, F>



### impl<T: ?Sized> Deref for MutexGuard<'_, T>



### impl<T: ?Sized> Deref for RwLockReadGuard<'_, T>



### impl<T: ?Sized> Deref for RwLockWriteGuard<'_, T>





