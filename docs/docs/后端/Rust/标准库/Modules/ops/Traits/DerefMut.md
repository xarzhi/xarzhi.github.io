# Trait std::ops::DerefMut

用于可变解引用操作，例如在 `*v = 1;` 中。

```rust
pub trait DerefMut: Deref {
    // Required method
    fn deref_mut(&mut self) -> &mut Self::Target;
}
```

`DerefMut` 除了可用于 (一元) `*` 运算符在可变上下文中的显式解引用操作外，还可以在许多情况下被编译器隐式使用。 该机制称为 `Deref` 强制多态。 在不可变的上下文中，使用 `Deref`。

为智能指针实现 `DerefMut` 可以方便地对其背后的数据进行可变的，这就是为什么它们实现 `DerefMut` 的原因。 另一方面，有关 `Deref` 和 `DerefMut` 的规则是专门为容纳智能指针而设计的。 因此，`DerefMut` 仅应针对智能指针实现，以免造成混淆。

出于类似的原因，这个 `trait` 永远不会失败。当隐式调用 `DerefMut` 时，解引用过程中的失败可能会非常令人困惑。



:::tip

如果 T 实现 `DerefMut<Target = U>`，并且 x 是 T 类型的值，则：

- 在可变上下文中，`*x` (其中 T 既不是引用也不是裸指针) 等效于 `* DerefMut::deref_mut(&mut x)`。
- `&mut T` 类型的值被强制为 &mut U 类型的值
- T 隐式地实现了 U 类型的所有 (mutable) 方法。

:::





具有单个字段的结构体，可以通过解引用该结构体进行修改。

```rust
use std::ops::{Deref, DerefMut};

struct DerefMutExample<T> {
    value: T
}

impl<T> Deref for DerefMutExample<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.value
    }
}

impl<T> DerefMut for DerefMutExample<T> {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.value
    }
}

let mut x = DerefMutExample { value: 'a' };
*x = 'b';
assert_eq!('b', x.value);
```





## Required Methods

### deref_mut

可变地解引用该值。

```rust
fn deref_mut(&mut self) -> &mut Self::Target
```



## Implementors

### impl DerefMut for OsString



### impl DerefMut for PathBuf



### impl DerefMut for String



### impl<'a> DerefMut for IoSliceMut<'a>



### impl<'a, 'f> DerefMut for VaList<'a, 'f>

```rust
impl<'a, 'f> DerefMut for VaList<'a, 'f>
where
  'f: 'a,
```



### impl\<P> DerefMut for Pin\<P>

```rust
impl<P> DerefMut for Pin<P>
where
  P: DerefMut,
  <P as Deref>::Target: Unpin,
```



### impl\<T> !DerefMut for &T

```rust
impl<T> !DerefMut for &T
where
  T: ?Sized,
```



### impl\<T> DerefMut for &mut T

```rust
impl<T> DerefMut for &mut T
where
  T: ?Sized,
```



### impl\<T> DerefMut for ThinBox\<T>

```rust
impl<T> DerefMut for ThinBox<T>
where
  T: ?Sized,
```



### impl\<T> DerefMut for RefMut<'_, T>

```rust
impl<T> DerefMut for RefMut<'_, T>
where
  T: ?Sized,
```



### impl\<T> DerefMut for PeekMut<'_, T>

```rust
impl<T> DerefMut for PeekMut<'_, T>
where
  T: Ord,
```



### impl\<T> DerefMut for ManuallyDrop\<T>

```rust
impl<T> DerefMut for ManuallyDrop<T>
where
  T: ?Sized,
```



### impl\<T> DerefMut for AssertUnwindSafe\<T>



### impl<T, A> DerefMut for Box<T, A>

```rust
impl<T, A> DerefMut for Box<T, A>
where
  A: Allocator,
  T: ?Sized,
```



### impl<T, A> DerefMut for Vec<T, A>

```rust
impl<T, A> DerefMut for Vec<T, A>
where
  A: Allocator,
```



### impl<T: ?Sized> DerefMut for MutexGuard<'_, T>



### impl<T: ?Sized> DerefMut for RwLockWriteGuard<'_, T>