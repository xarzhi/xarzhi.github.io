# Trait std::default::Default

一个用于给类型提供有用的默认值的 trait。

```rust
pub trait Default: Sized {
    // Required method
    fn default() -> Self;
}
```



## derive宏

有时，您希望回退到某种默认值，而不必特别关心它是什么。 这经常出现在定义一组选项的 `struct` 中：

```rust
struct SomeOptions {
    foo: i32,
    bar: f32,
}
```

我们如何定义一些默认值？ 您可以使用 `Default`：

```rust
#[derive(Default)]
struct SomeOptions {
    foo: i32,
    bar: f32,
}

fn main() {
    let options: SomeOptions = Default::default();
}
```

现在，您将获得所有默认值。Rust 为各种原始类型实现 `Default`。

如果要覆盖特定选项，但仍保留其他默认值：

```rust
fn main() {
    let options = SomeOptions { foo: 42, ..Default::default() };
}
```



:::tip Derivable

如果类型的所有字段都实现 `Default`，则此 trait 可以与 `#[derive]` 一起使用。 当 `derived` 时，它将为每个字段的类型使用默认值。

:::



## enums

在 `enum` 上使用 `#[derive(Default)]` 时，您需要选择默认的单元变体。 您可以通过将 `#[default]` 属性放在变体上来执行此操作。

```rust
#[derive(Default)]
enum Kind {
    #[default]
    A,
    B,
    C,
}
```

不能在非单元或非详尽变体上使用 `#[default]` 属性。



提供 `default()` 方法的实现，该实现返回您类型的值，该值应为默认值：

```rust
enum Kind {
    A,
    B,
    C,
}

impl Default for Kind {
    fn default() -> Self { Kind::A }
}
```



## Required Methods

返回类型的 “默认值”。

默认值通常是某种初始值，标识值或其他可能有意义的默认值。

```rust
fn default() -> Self
```

使用内置的默认值：

```rust
let i: i8 = Default::default();
let (x, y): (Option<String>, f64) = Default::default();
let (a, b, (c, d)): (i32, u32, (bool, bool)) = Default::default();
```

制作自己的：

```rust
enum Kind {
    A,
    B,
    C,
}

impl Default for Kind {
    fn default() -> Self { Kind::A }
}
```

### 

## Implementors

### impl Default for &str



### impl Default for &CStr



### impl Default for &OsStr



### impl Default for &mut str



### impl Default for bool



### impl Default for char



### impl Default for f32



### impl Default for f64



### impl Default for i8



### impl Default for i16



### impl Default for i32



### impl Default for i64



### impl Default for i128



### impl Default for isize



### impl Default for u8



### impl Default for u16



### impl Default for u32



### impl Default for u64



### impl Default for u128



### impl Default for ()



### impl Default for usize



### impl Default for Global



### impl Default for System



### impl Default for Box<str, Global>



### impl Default for Box<CStr, Global>



### impl Default for Box\<OsStr>



### impl Default for DefaultHasher



### impl Default for RandomState



### impl Default for CString



### impl Default for OsString



### impl Default for Error



### impl Default for FileTimes



### impl Default for SipHasher



### impl Default for std::io::Empty



### impl Default for Sink



### impl Default for PhantomPinned



### impl Default for RangeFull



### impl Default for PathBuf



### impl Default for String



### impl Default for AtomicBool



### impl Default for AtomicI8



### impl Default for AtomicI16



### impl Default for AtomicI32



### impl Default for AtomicI64



### impl Default for AtomicIsize



### impl Default for AtomicU8



### impl Default for AtomicU16



### impl Default for AtomicU32



### impl Default for AtomicU64



### impl Default for AtomicUsize



### impl Default for Condvar



### impl Default for Duration



### impl<'a, K, V> Default for std::collections::btree_map::Iter<'a, K, V>

```rust
impl<'a, K, V> Default for std::collections::btree_map::Iter<'a, K, V>
where
  K: 'a,
  V: 'a,
```

### impl<'a, K, V> Default for std::collections::btree_map::IterMut<'a, K, V>

```rust
impl<'a, K, V> Default for std::collections::btree_map::IterMut<'a, K, V>
where
  K: 'a,
  V: 'a,
```

### impl<A, B> Default for Chain<A, B>

```rust
impl<A, B> Default for Chain<A, B>
where
  A: Default,
  B: Default,
```

### impl\<B> Default for Cow<'_, B>

```rust
impl<B> Default for Cow<'_, B>
where
  B: ToOwned + ?Sized,
  <B as ToOwned>::Owned: Default,
```

### impl\<H> Default for BuildHasherDefault\<H>



### impl\<I> Default for Cloned\<I>

```rust
impl<I> Default for Cloned<I>
where
  I: Default,
```

### impl\<I> Default for Copied\<I>

```rust
impl<I> Default for Copied<I>
where
  I: Default,
```

### impl\<I> Default for Enumerate\<I>

```rust
impl<I> Default for Enumerate<I>
where
  I: Default,
```

### impl\<I> Default for Flatten\<I>

```rust
impl<I> Default for Flatten<I>
where
  I: Default + Iterator,
  <I as Iterator>::Item: IntoIterator,
```

### impl\<I> Default for Fuse\<I>

```rust
impl<I> Default for Fuse<I>
where
  I: Default,
```

### impl\<I> Default for Rev\<I>

```rust
impl<I> Default for Rev<I>
where
  I: Default,
```

### impl\<Idx> Default for std::ops::Range\<Idx>

```rust
impl<Idx> Default for std::ops::Range<Idx>
where
  Idx: Default,
```

### impl<K, V> Default for Keys<'_, K, V>



### impl<K, V> Default for std::collections::btree_map::Range<'_, K, V>



### impl<K, V> Default for Values<'_, K, V>



### impl<K, V> Default for BTreeMap<K, V, Global>



### impl<K, V, A> Default for std::collections::btree_map::IntoIter<K, V, A>

```rust
impl<K, V, A> Default for std::collections::btree_map::IntoIter<K, V, A>
where
  A: Allocator + Default + Clone,
```

### impl<K, V, A> Default for IntoKeys<K, V, A>

```rust
impl<K, V, A> Default for IntoKeys<K, V, A>
where
  A: Allocator + Default + Clone,
```

### impl<K, V, A> Default for IntoValues<K, V, A>

```rust
impl<K, V, A> Default for IntoValues<K, V, A>
where
  A: Allocator + Default + Clone,
```

### impl<K, V, S> Default for HashMap<K, V, S>

```rust
impl<K, V, S> Default for HashMap<K, V, S>
where
  S: Default,
```

### impl\<T> Default for &[T]



### impl\<T> Default for &mut [T]



### impl\<T> Default for Option\<T>



### impl\<T> Default for [T; 0]



### impl\<T> Default for [T; 1]

```rust
impl<T> Default for [T; 1]
where
  T: Default,
```

### impl\<T> Default for [T; 2]

```rust
impl<T> Default for [T; 2]
where
  T: Default,
```

### impl\<T> Default for [T; 3]

```rust
impl<T> Default for [T; 3]
where
  T: Default
```

### impl\<T> Default for [T; 4]

```rust
impl<T> Default for [T; 4]
where
  T: Default,
```

### impl\<T> Default for [T; 5]

```rust
impl<T> Default for [T; 5]
where
  T: Default,
```

### impl\<T> Default for [T; 6]

```rust
impl<T> Default for [T; 6]
where
  T: Default,
```

### impl\<T> Default for [T; 7]

```rust
impl<T> Default for [T; 7]
where
  T: Default,
```

### impl\<T> Default for [T; 8]

```rust
impl<T> Default for [T; 8]
where
  T: Default,
```

### impl\<T> Default for [T; 9]

```rust
impl<T> Default for [T; 9]
where
  T: Default,
```

### impl\<T> Default for [T; 10]

```rust
impl<T> Default for [T; 10]
where
  T: Default,
```

### impl\<T> Default for [T; 11]

```rust
impl<T> Default for [T; 11]
where
  T: Default,
```

### impl\<T> Default for [T; 12]

```rust
impl<T> Default for [T; 12]
where
  T: Default,
```

### impl\<T> Default for [T; 13]

```rust
impl<T> Default for [T; 13]
where
  T: Default,
```

### impl\<T> Default for [T; 14]

```rust
impl<T> Default for [T; 14]
where
  T: Default,
```

### impl\<T> Default for [T; 15]

```rust
impl<T> Default for [T; 15]
where
  T: Default,
```

### impl\<T> Default for [T; 16]

```rust
impl<T> Default for [T; 16]
where
  T: Default,
```

### impl\<T> Default for [T; 17]

```rust
impl<T> Default for [T; 17]
where
  T: Default,
```

### impl\<T> Default for [T; 18]

```rust
impl<T> Default for [T; 18]
where
  T: Default,
```

### impl\<T> Default for [T; 19]

```rust
impl<T> Default for [T; 19]
where
  T: Default,
```

### impl\<T> Default for [T; 20]

```rust
impl<T> Default for [T; 20]
where
  T: Default,
```

### impl\<T> Default for [T; 21]

```rust
impl<T> Default for [T; 21]
where
  T: Default,
```

### impl\<T> Default for [T; 22]

```rust
impl<T> Default for [T; 22]
where
  T: Default,
```

### impl\<T> Default for [T; 23]

```rust
impl<T> Default for [T; 23]
where
  T: Default,
```

### impl\<T> Default for [T; 24]

```rust
impl<T> Default for [T; 24]
where
  T: Default,
```

### impl\<T> Default for [T; 25]

```rust
impl<T> Default for [T; 25]
where
  T: Default,
```

### impl\<T> Default for [T; 26]

```rust
impl<T> Default for [T; 26]
where
  T: Default,
```

### impl\<T> Default for [T; 27]

```rust
impl<T> Default for [T; 27]
where
  T: Default,
```

### impl\<T> Default for [T; 28]

```rust
impl<T> Default for [T; 28]
where
  T: Default,
```

### impl\<T> Default for [T; 29]

```rust
impl<T> Default for [T; 29]
where
  T: Default,
```

### impl\<T> Default for [T; 30]

```rust
impl<T> Default for [T; 30]
where
  T: Default,
```

### impl\<T> Default for [T; 31]

```rust
impl<T> Default for [T; 31] 
where
  T: Default,
```

### impl\<T> Default for [T; 32]

```rust
impl<T> Default for [T; 32]
where
  T: Default,
```

### impl\<T> Default for (T₁, T₂, …, Tₙ)

This trait is implemented for tuples up to twelve items long.

```rust
impl<T> Default for (T₁, T₂, …, Tₙ)
where
  T: Default,
```



### impl\<T> Default for Box<[T], Global>

```rust
impl<T> Default for Box<T, Global>
where
  T: Default,
```

### impl\<T> Default for Cell\<T>

```rust
impl<T> Default for Cell<T>
where
  T: Default,
```

### impl\<T> Default for LazyCell<T, fn() -> T>

```rust
impl<T> Default for LazyCell<T, fn() -> T>
where
  T: Default,
```

### impl\<T> Default for OnceCell\<T>



### impl\<T> Default for RefCell\<T>

```rust
impl<T> Default for RefCell<T>
where
  T:Default,
```

### impl\<T> Default for SyncUnsafeCell\<T>

```rust
impl<T> Default for SyncUnsafeCell<T>
where
  T: Default,
```

### impl\<T> Default for UnsafeCell\<T>

```rust
impl<T> Default for UnsafeCell<T>
where
  T: Default,
```

### impl\<T> Default for Reverse\<T>

```rust
impl<T> Default for Reverse<T>
where
  T: Default,
```

### impl\<T> Default for std::collections::binary_heap::IntoIter\<T>



### impl\<T> Default for std::collections::btree_set::Iter<'_, T>



### impl\<T> Default for std::collections::btree_set::Range<'_, T>



### impl\<T> Default for std::collections::linked_list::IntoIter<T, Global>



### impl\<T> Default for std::collections::linked_list::Iter<'_, T>



### impl\<T> Default for std::collections::linked_list::IterMut<'_, T>



### impl\<T> Default for BTreeSet<T, Global>



### impl\<T> Default for BinaryHeap\<T>

```rust
impl<T> Default for BinaryHeap<T>
where
  T: Ord,
```

### impl\<T> Default for LinkedList<T, Global>



### impl\<T> Default for VecDeque<T, Global>



### impl\<T> Default for std::iter::Empty\<T>



### impl\<T> Default for PhantomData\<T>

```rust
impl<T> Default for PhantomData<T>
where
  T: ?Sized,
```

### impl\<T> Default for ManuallyDrop\<T>

```rust
impl<T> Default for ManuallyDrop<T>
where
  T: Default + ?Sized,
```

### impl\<T> Default for Saturating\<T>

```rust
impl<T> Default for Saturating<T>
where
  T: Default,
```

### impl\<T> Default for Wrapping\<T>

```rust
impl<T> Default for Wrapping<T>
where
  T: Default,
```

### impl\<T> Default for AssertUnwindSafe\<T>

```rust
impl<T> Default for AssertUnwindSafe<T>
where
  T: Default,
```

### impl\<T> Default for Rc\<T>

```rust
impl<T> Default for Rc<T>
where
  T: Default,
```

### impl\<T> Default for std::rc::Weak\<T>



### impl\<T> Default for std::slice::Iter<'_, T>



### impl\<T> Default for std::slice::IterMut<'_, T>



### impl\<T> Default for AtomicPtr\<T>



### impl\<T> Default for Arc\<T>

```rust
impl<T> Default for Arc<T>
where
  T: Default,
```

### impl\<T> Default for Exclusive\<T>

```rust
impl<T> Default for Exclusive<T>
where
  T: Default + ?Sized,
```

### impl\<T> Default for OnceLock\<T>



### impl\<T> Default for std::sync::Weak\<T>



### impl\<T> Default for Vec<T, Global>

### impl<T, A> Default for std::collections::btree_set::IntoIter<T, A>

```rust
impl<T, A> Default for std::collections::btree_set::IntoIter<T, A>
where
  A: Allocator + Default + Clone,
```

### impl<T, A> Default for std::vec::IntoIter<T, A>

```rust
impl<T, A> Default for std::vec::IntoIter<T, A>
where
  A: Allocator + Default,
```

### impl<T, S> Default for HashSet<T, S>

```rust
impl<T, S> Default for HashSet<T, S>
where
  S: Default,
```

### impl<T, const LANES: usize> Default for Mask<T, LANES>

```rust
impl<T, const LANES: usize> Default for Mask<T, LANES>
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```

### impl<T, const N: usize> Default for Simd<T, N>

```rust
impl<T, const N: usize> Default for Simd<T, N>
where
  LaneCount<N>: SupportedLaneCount,
  T: SimdElement + Default,
```

### impl<T: Default> Default for Cursor\<T>

### impl<T: Default> Default for LazyLock\<T>

### impl<T: Default> Default for RwLock\<T>

### impl<T: ?Sized + Default> Default for Mutex\<T>

### impl Default for TokenStream

### impl Default for TestTimeOptions

### impl Default for OutputFormat

### impl Default for ColorConfig



