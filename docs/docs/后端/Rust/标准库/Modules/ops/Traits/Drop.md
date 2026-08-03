# Trait std::ops::Drop

析构函数中的自定义代码。

一般在变量离开作用域时，会触发`drop`函数，丢弃变量

```rust
pub trait Drop {
    // Required method
    fn drop(&mut self);
}
```

此析构函数由两个组件组成：

- 如果为此类型实现了特殊的 `Drop` trait，则对该值调用 `Drop::drop`。
- 自动生成的 “drop glue” 递归调用该值的所有字段的析构函数。

由于 Rust 自动调用所有包含字段的析构函数，因此在大多数情况下，您无需实现 `Drop`。但是在某些情况下它很有用，例如对于直接管理资源的类型。 该资源可能是内存，可能是文件描述符，可能是网络套接字。 一旦不再使用该类型的值，则应通过释放内存或关闭文件或套接字 `clean up` 资源。这是析构函数的工作，因此也是 `Drop::drop` 的工作。

要查看析构函数的作用，让我们看一下以下程序：

```rust
struct HasDrop;

impl Drop for HasDrop {
    fn drop(&mut self) {
        println!("Dropping HasDrop!");
    }
}

struct HasTwoDrops {
    one: HasDrop,
    two: HasDrop,
}

impl Drop for HasTwoDrops {
    fn drop(&mut self) {
        println!("Dropping HasTwoDrops!");
    }
}

fn main() {
    let _x = HasTwoDrops { one: HasDrop, two: HasDrop };
    println!("Running!");
}
```

Rust 将首先为 `_x` 调用 `Drop::drop`，然后为 `_x.one` 和 `_x.two` 调用，这意味着运行此命令将打印

```txt
Running!
Dropping HasTwoDrops!
Dropping HasDrop!
Dropping HasDrop!
```

即使我们删除了针对 `HasTwoDrop` 的 `Drop` 的实现，其字段的析构函数仍然会被调用。 这将导致

```txt
Running!
Dropping HasDrop!
Dropping HasDrop!
```



:::tip

因为 `Drop::drop` 是用来清理一个值的，所以在调用方法后使用该值可能很危险。 由于 `Drop::drop` 不拥有其输入的所有权，因此 Rust 通过不允许您直接调用 `Drop::drop` 来防止误用。

换句话说，如果您在上面的示例中尝试显式调用 `Drop::drop`，则会出现编译器错误。

如果您想显式调用一个值的析构函数，可以使用 `mem::drop`代替。

:::



:::tip drop指令

但是，我们的两个 `HasDrop` 哪个先丢弃掉？ 对于结构体，其声明顺序相同：首先是 `one`，然后是 `two`。 如果您想自己尝试一下，可以修改上面的 `HasDrop` 以包含一些数据 (例如整数)，然后在 `Drop` 内部的 `println!` 中使用它。 此行为由语言保证。

与结构体不同，局部变量以相反的顺序丢弃：

```rust
struct Foo;

impl Drop for Foo {
    fn drop(&mut self) {
        println!("Dropping Foo!")
    }
}

struct Bar;

impl Drop for Bar {
    fn drop(&mut self) {
        println!("Dropping Bar!")
    }
}

fn main() {
    let _foo = Foo;
    let _bar = Bar;
}
```

这将打印

```text
Dropping Bar!
Dropping Foo!
```

有关完整规则，请参见 the reference。

:::





## Required Methods

### drop

执行此类型的析构函数，**当值离开作用域时隐式调用此方法**

```rust
fn drop(&mut self)
```

并且不能显式调用此方法 (会得到编译器 E0040 错误)。 但是，prelude 中的 mem::drop 函数可用于调用参数的 Drop 实现。

当这个方法被调用时，self 还没有被释放。 只有在方法结束后才会发生这种情况。 如果不是这种情况，那么 self 将是悬垂引用。



:::tip Panics

考虑到 panic! 将在展开时调用 drop，因此 drop 实现中的任何 panic! 都可能会中止。

请注意，即使此 panics，该值也被视为已丢弃； 您不得再次调用 drop。 这通常由编译器自动处理，但是在使用不安全的代码时，有时可能会无意间发生，尤其是在使用 ptr::drop_in_place 时。

:::







## Implementors

### impl Drop for CString



### impl Drop for OwnedFd



### impl Drop for OwnedHandle

`Available on Windows only.`



### impl Drop for OwnedSocket

`Available on Windows only.`



### impl Drop for std::string::Drain<'_>



### impl Drop for Waker



### impl<'a, T> Drop for DrainSorted<'a, T>

```rust
impl<'a, T> Drop for DrainSorted<'a, T>
where
  T: Ord,
```



### impl<'f> Drop for VaListImpl<'f>



### impl<I, A> Drop for Splice<'_, I, A>

```rust
impl<I, A> Drop for Splice<'_, I, A>
where
  I: Iterator,
  A: Allocator,
```



### impl<K, V, A> Drop for std::collections::btree_map::IntoIter<K, V, A>

```rust
impl<K, V, A> Drop for std::collections::btree_map::IntoIter<K, V, A>
where
  A: Allocator + Clone,
```



### impl<K, V, A> Drop for BTreeMap<K, V, A>

```rust
impl<K, V, A> Drop for BTreeMap<K, V, A>
where
  A: Allocator + Clone,
```



### impl<K, V, F, A> Drop for std::collections::btree_map::DrainFilter<'_, K, V, F, A>

```rust
impl<K, V, F, A> Drop for std::collections::btree_map::DrainFilter<'_, K, V, F, A>
where
  A: Allocator + Clone,
  F: FnMut(&K, &mut V) -> bool,
```



### impl\<T> Drop for ThinBox\<T>

```rust
impl<T> Drop for ThinBox<T>
where
  T: ?Sized,
```



### impl\<T> Drop for PeekMut<'_, T>

```rust
impl<T> Drop for PeekMut<'_, T>
where
  T: Ord,
```



### impl\<T> Drop for Rc\<T>

```rust
impl<T> Drop for Rc<T>
where
  T: ?Sized,
```



### impl\<T> Drop for std::rc::Weak\<T>

```rust
impl<T> Drop for std::rc::Weak<T>
where
  T: ?Sized,
```



### impl\<T> Drop for Receiver\<T>



### impl\<T> Drop for Sender\<T>



### impl\<T> Drop for SyncSender\<T>



### impl\<T> Drop for Arc\<T>

```rust
impl<T> Drop for Arc<T>
where
  T: ?Sized,
```



### impl\<T> Drop for OnceLock\<T>



### impl\<T> Drop for std::sync::Weak\<T>

```rust
impl<T> Drop for std::sync::Weak<T>
where
  T: ?Sized,
```



### impl<T, A> Drop for Box<T, A>

```rust
impl<T, A> Drop for Box<T, A>
where
  A: Allocator,
  T: ?Sized,
```



### impl<T, A> Drop for LinkedList<T, A>

```rust
impl<T, A> Drop for LinkedList<T, A>
where
  A: Allocator,
```



### impl<T, A> Drop for VecDeque<T, A>

```rust
impl<T, A> Drop for VecDeque<T, A>
where
  A: Allocator,
```



### impl<T, A> Drop for std::collections::vec_deque::Drain<'_, T, A>

```rust
impl<T, A> Drop for std::collections::vec_deque::Drain<'_, T, A>
where
  A: Allocator,
```



### impl<T, A> Drop for std::vec::Drain<'_, T, A>

```rust
impl<T, A> Drop for std::vec::Drain<'_, T, A>
where
  A: Allocator,
```



### impl<T, A> Drop for std::vec::IntoIter<T, A>

```rust
impl<T, A> Drop for std::vec::IntoIter<T, A>
where
  A: Allocator,
```



### impl<T, A> Drop for Vec<T, A>

```rust
impl<T, A> Drop for Vec<T, A>
where
  A: Allocator,
```



### impl<T, F> Drop for LazyLock<T, F>



### impl<T, F, A> Drop for std::collections::btree_set::DrainFilter<'_, T, F, A>

```rust
impl<T, F, A> Drop for std::collections::btree_set::DrainFilter<'_, T, F, A>
where
  A: Allocator + Clone,
  F: FnMut(&T) -> bool,
```



### impl<T, F, A> Drop for std::collections::linked_list::DrainFilter<'_, T, F, A>

```rust
impl<T, F, A> Drop for std::collections::linked_list::DrainFilter<'_, T, F, A>
where
  A: Allocator,
  F: FnMut(&mut T) -> bool,
```



### impl<T, F, A> Drop for std::vec::DrainFilter<'_, T, F, A>

```rust
impl<T, F, A> Drop for std::vec::DrainFilter<'_, T, F, A>
where
  A: Allocator,
  F: FnMut(&mut T) -> bool,
```



### impl<T, const N: usize> Drop for std::array::IntoIter<T, N>



### impl<T: ?Sized> Drop for MutexGuard<'_, T>



### impl<T: ?Sized> Drop for RwLockReadGuard<'_, T>



### impl<T: ?Sized> Drop for RwLockWriteGuard<'_, T>



### impl<W: Write> Drop for Buf