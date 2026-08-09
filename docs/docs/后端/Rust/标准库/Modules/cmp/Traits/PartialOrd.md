# Trait std::cmp::PartialOrd

一个用于形成 [部分顺序]partial order 的类型的 trait。

```rust
pub trait PartialOrd<Rhs = Self>: PartialEq<Rhs>
where
    Rhs: ?Sized,
{
    // Required method
    fn partial_cmp(&self, other: &Rhs) -> Option<Ordering>;

    // Provided methods
    fn lt(&self, other: &Rhs) -> bool { ... }
    fn le(&self, other: &Rhs) -> bool { ... }
    fn gt(&self, other: &Rhs) -> bool { ... }
    fn ge(&self, other: &Rhs) -> bool { ... }
}
```

此 trait 的 `lt`、`le`、`gt` 和 `ge` 方法可以分别使用 `<`、`<=`、`>` 和 `>=` 相互调用。

这个 trait 的方法必须相互一致，并且与 PartialEq 的方法一致。 必须满足以下条件:

1. `a == b` 当且仅当 `partial_cmp(a, b) == Some(Equal)`。
2. `a < b` 当且仅当 `partial_cmp(a, b) == Some(Less)`
3. `a > b` 当且仅当 `partial_cmp(a, b) == Some(Greater)`
4. `a <= b` 当且仅当 `a < b || a == b`
5. `a >= b` 当且仅当 `a > b || a == b`
6. `a != b` 当且仅当 `!(a == b)`。

上述条件 2-5 默认实现保证。 `PartialEq` 已经保证了条件 6。

```rust
let x: u32 = 0;
let y: u32 = 1;

assert_eq!(x < y, true);
assert_eq!(x.lt(&y), true);
```

如果`Ord`也为 `Self` 和 `Rhs` 实现，它也必须与 `partial_cmp` 一致 (具体要求请参见 trait 的文档)。 通过派生一些 traits 并手动实现其他一些行为，很容易使它们不以为然。

对于所有 `a`，`b` 和 `c`，比较必须满足：

- 可传递性: `a < b` 和 `b < c` 表示 `a < c`。`==` 和 `>` 必须保持相同。
- 二元性: `a < b` 当且仅当 `b > a`。

请注意，这些要求意味着 trait 本身必须对称且可传递地实现：如果 `T: PartialOrd<U>` 和 `U: PartialOr\<V>`，则 `U: PartialOrd<T>` 和 `T: PartialOrd<V>`。

:::tip Corollaries

从上述要求得出以下推论：

- `<` 和 `>` 的非反射性: `!(a < a)`、`!(a > a)`
- `>` 的传递性：如果 `a > b` 并且 `b > c`，则 `a > c`
- `partial_cmp` 的对偶性: `partial_cmp(a, b) == partial_cmp(b, a).map(Ordering::reverse)`

:::



## Derivable

::: derive

该 trait 可以与 `#[derive]` 一起使用。

在结构体上 `derive` d 时，它将基于结构体成员的自上而下的声明顺序生成 [词典](https://en.wikipedia.org/wiki/Lexicographic_order) 顺序。

当在枚举上 `derive`d 时，变体按其判别式排序。 默认情况下，对于顶部的变体，判别式最小，底部变体的判别式最大。下面是一个例子：

```rust
#[derive(PartialEq, PartialOrd)]
enum E {
    Top,
    Bottom,
}

assert!(E::Top < E::Bottom);
```

但是，手动设置判别式可以覆盖此默认行为:

```rust
#[derive(PartialEq, PartialOrd)]
enum E {
    Top = 2,
    Bottom = 1,
}

assert!(E::Bottom < E::Top);
```



## 如何实现 `PartialOrd`？

`PartialOrd` 只需要实现 [`partial_cmp`](#partial_cmp) 方法，其他方法从默认实现中生成。

但是，对于没有总顺序的类型，仍然可以单独实现其他类型。例如，对于浮点数，`NaN < 0 == false` 和 `NaN >= 0 == false` (参见 IEEE 754-2008 第 5.11 节)。

`PartialOrd` 要求您的类型为 [`PartialEq`](./PartialEq)。

如果您的类型是 [`Ord`](./Ord)，则可以使用 [`cmp`](./Ord#cmp) 来实现 [`partial_cmp`](#partial_cmp)：

```rust
use std::cmp::Ordering;

#[derive(Eq)]
struct Person {
    id: u32,
    name: String,
    height: u32,
}

impl PartialOrd for Person {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Ord for Person {
    fn cmp(&self, other: &Self) -> Ordering {
        self.height.cmp(&other.height)
    }
}

impl PartialEq for Person {
    fn eq(&self, other: &Self) -> bool {
        self.height == other.height
    }
}
```

您可能还会发现在类型的字段上使用 `partial_cmp` 很有用。这是 `Person` 类型的示例，它们具有一个浮点 `height` 字段，该字段是唯一用于排序的字段：

```rust
use std::cmp::Ordering;

struct Person {
    id: u32,
    name: String,
    height: f64,
}

impl PartialOrd for Person {
    fn partial_cmp(&self, other: &Self) -> Option\<Ordering> {
        self.height.partial_cmp(&other.height)
    }
}

impl PartialEq for Person {
    fn eq(&self, other: &Self) -> bool {
        self.height == other.height
    }
}
```



## Required Methods

### partial_cmp

如果存在，则此方法返回 `self` 和 `other` 值之间的顺序。

```rust
fn partial_cmp(&self, other: &Rhs) -> Option<Ordering>
```

**参数**：

- **other**：另一个需要比较的值

**返回值**：返回一个`Option`，若比较成功则返回`Some(Ordering)`，肉则返回`None`

```rust
use std::cmp::Ordering;

let result = 1.0.partial_cmp(&2.0);
assert_eq!(result, Some(Ordering::Less));

let result = 1.0.partial_cmp(&1.0);
assert_eq!(result, Some(Ordering::Equal));

let result = 2.0.partial_cmp(&1.0);
assert_eq!(result, Some(Ordering::Greater));
```

如果无法进行比较：

```rust
let result = f64::NAN.partial_cmp(&1.0);
assert_eq!(result, None);
```



## Provided Methods

### lt

比较另一个值是否**小于**`self`

```rust
fn lt(&self, other: &Rhs) -> bool
```

**参数**：

- **other**：另一个需要比较的值

**返回值**：根据比较的结果返回`bool`值

```rust
assert_eq!(1.0 < 1.0, false);
assert_eq!(1.0 < 2.0, true);
assert_eq!(2.0 < 1.0, false);
```



### le

比较另一个值是否**小于等于**`self`

```rust
fn le(&self, other: &Rhs) -> bool
```

**参数**：

- **other**：另一个需要比较的值

**返回值**：根据比较的结果返回`bool`值

```rust
assert_eq!(1.0 <= 1.0, true);
assert_eq!(1.0 <= 2.0, true);
assert_eq!(2.0 <= 1.0, false);
```



### gt

比较另一个值是否**大于**`self`

```rust
fn gt(&self, other: &Rhs) -> bool
```

**参数**：

- **other**：另一个需要比较的值

**返回值**：根据比较的结果返回`bool`值

```rust
assert_eq!(1.0 > 1.0, false);
assert_eq!(1.0 > 2.0, false);
assert_eq!(2.0 > 1.0, true);
```



### ge

比较另一个值是否**大于等于**`self`

```rust
fn ge(&self, other: &Rhs) -> bool
```

**参数**：

- **other**：另一个需要比较的值

**返回值**：根据比较的结果返回`bool`值

```rust
assert_eq!(1.0 >= 1.0, true);
assert_eq!(1.0 >= 2.0, false);
assert_eq!(2.0 >= 1.0, true);
```

### 

## Implementors

### impl PartialOrd\<AsciiChar> for AsciiChar



### impl PartialOrd\<Infallible> for Infallible



### impl PartialOrd\<ErrorKind> for ErrorKind



### impl PartialOrd\<IpAddr> for IpAddr



### impl PartialOrd\<IpAddr> for Ipv4Addr



### impl PartialOrd\<IpAddr> for Ipv6Addr



### impl PartialOrd\<SocketAddr> for SocketAddr



### impl PartialOrd\<Which> for Which



### impl PartialOrd\<Ordering> for Ordering



### impl PartialOrd\<bool> for bool



### impl PartialOrd\<char> for char



### impl PartialOrd\<f32> for f32



### impl PartialOrd\<f64> for f64



### impl PartialOrd\<i8> for i8



### impl PartialOrd\<i16> for i16



### impl PartialOrd\<i32> for i32



### impl PartialOrd\<i64> for i64



### impl PartialOrd\<i128> for i128



### impl PartialOrd\<isize> for isize



### impl PartialOrd\<!> for !



### impl PartialOrd\<str> for str

对字符串执行比较操作。

按字典顺序 通过字符串的字节值对字符串进行比较。 这将根据 Unicode 代码点在代码表中的位置进行比较。 这不一定与 “alphabetical” 顺序相同，后者因语言和区域设置而异。 根据文化认可的标准比较字符串需要特定于语言环境的数据，该数据不在 str 类型的作用域之内。





### impl PartialOrd\<str> for OsStr



### impl PartialOrd\<str> for OsString



### impl PartialOrd\<u8> for u8



### impl PartialOrd\<u16> for u16



### impl PartialOrd\<u32> for u32



### impl PartialOrd\<u64> for u64



### impl PartialOrd\<u128> for u128



### impl PartialOrd\<()> for ()



### impl PartialOrd\<usize> for usize



### impl PartialOrd\<CpuidResult> for CpuidResult



### impl PartialOrd\<TypeId> for TypeId



### impl PartialOrd\<CStr> for CStr



### impl PartialOrd\<CString> for CString



### impl PartialOrd\<OsStr> for OsStr



### impl PartialOrd\<OsStr> for Path



### impl PartialOrd\<OsStr> for PathBuf



### impl PartialOrd\<OsString> for OsString



### impl PartialOrd\<OsString> for Path



### impl PartialOrd\<OsString> for PathBuf



### impl PartialOrd\<Error> for Error



### impl PartialOrd\<PhantomPinned> for PhantomPinned



### impl PartialOrd\<Ipv4Addr> for IpAddr



### impl PartialOrd\<Ipv4Addr> for Ipv4Addr



### impl PartialOrd\<Ipv6Addr> for IpAddr



### impl PartialOrd\<Ipv6Addr> for Ipv6Addr



### impl PartialOrd\<SocketAddrV4> for SocketAddrV4



### impl PartialOrd\<SocketAddrV6> for SocketAddrV6



### impl PartialOrd\<NonZeroI8> for NonZeroI8



### impl PartialOrd\<NonZeroI16> for NonZeroI16



### impl PartialOrd\<NonZeroI32> for NonZeroI32



### impl PartialOrd\<NonZeroI64> for NonZeroI64



### impl PartialOrd\<NonZeroI128> for NonZeroI128



### impl PartialOrd\<NonZeroIsize> for NonZeroIsize



### impl PartialOrd\<NonZeroU8> for NonZeroU8



### impl PartialOrd\<NonZeroU16> for NonZeroU16



### impl PartialOrd\<NonZeroU32> for NonZeroU32



### impl PartialOrd\<NonZeroU64> for NonZeroU64



### impl PartialOrd\<NonZeroU128> for NonZeroU128



### impl PartialOrd\<NonZeroUsize> for NonZeroUsize



### impl PartialOrd\<Path> for OsStr



### impl PartialOrd\<Path> for OsString



### impl PartialOrd\<Path> for Path



### impl PartialOrd\<Path> for PathBuf



### impl PartialOrd\<PathBuf> for OsStr



### impl PartialOrd\<PathBuf> for OsString



### impl PartialOrd\<PathBuf> for Path



### impl PartialOrd\<PathBuf> for PathBuf

const: unstable · 

### impl PartialOrd\<Alignment> for Alignment



### impl PartialOrd\<String> for String

1.3.0 · 

### impl PartialOrd\<Duration> for Duration



### impl PartialOrd\<Instant> for Instant



### impl PartialOrd\<SystemTime> for SystemTime



### impl\<'a> PartialOrd\<&'a OsStr> for Path



### impl\<'a> PartialOrd\<&'a OsStr> for PathBuf



### impl\<'a> PartialOrd\<&'a Path> for OsStr



### impl\<'a> PartialOrd\<&'a Path> for OsString



### impl\<'a> PartialOrd\<&'a Path> for PathBuf



### impl\<'a> PartialOrd\<Cow\<'a, OsStr>> for Path



### impl\<'a> PartialOrd\<Cow\<'a, OsStr>> for PathBuf



### impl\<'a> PartialOrd\<Cow\<'a, Path>> for OsStr



### impl\<'a> PartialOrd\<Cow\<'a, Path>> for OsString



### impl\<'a> PartialOrd\<Cow\<'a, Path>> for Path



### impl\<'a> PartialOrd\<Cow\<'a, Path>> for PathBuf



### impl\<'a> PartialOrd\<Component\<'a>> for Component\<'a>



### impl\<'a> PartialOrd\<Prefix\<'a>> for Prefix\<'a>



### impl\<'a> PartialOrd\<OsStr> for &'a Path



### impl\<'a> PartialOrd\<OsStr> for Cow\<'a, Path>



### impl\<'a> PartialOrd\<OsString> for &'a Path



### impl\<'a> PartialOrd\<OsString> for Cow\<'a, Path>

1.10.0 · 

### impl\<'a> PartialOrd\<Location\<'a>> for Location\<'a>



### impl\<'a> PartialOrd\<Components\<'a>> for Components\<'a>



### impl\<'a> PartialOrd\<Path> for &'a OsStr



### impl\<'a> PartialOrd\<Path> for Cow\<'a, OsStr>



### impl\<'a> PartialOrd\<Path> for Cow\<'a, Path>



### impl\<'a> PartialOrd\<PathBuf> for &'a OsStr



### impl\<'a> PartialOrd\<PathBuf> for &'a Path



### impl\<'a> PartialOrd\<PathBuf> for Cow\<'a, OsStr>



### impl\<'a> PartialOrd\<PathBuf> for Cow\<'a, Path>



### impl\<'a> PartialOrd\<PrefixComponent\<'a>> for PrefixComponent\<'a>



### impl\<'a, 'b> PartialOrd\<&'a OsStr> for OsString



### impl\<'a, 'b> PartialOrd\<&'a Path> for Cow\<'b, OsStr>



### impl\<'a, 'b> PartialOrd\<&'b OsStr> for Cow\<'a, OsStr>



### impl\<'a, 'b> PartialOrd\<&'b OsStr> for Cow\<'a, Path>



### impl\<'a, 'b> PartialOrd\<&'b Path> for Cow\<'a, Path>



### impl\<'a, 'b> PartialOrd\<Cow\<'a, OsStr>> for &'b OsStr



### impl\<'a, 'b> PartialOrd\<Cow\<'a, OsStr>> for OsStr



### impl\<'a, 'b> PartialOrd\<Cow\<'a, OsStr>> for OsString



### impl\<'a, 'b> PartialOrd\<Cow\<'a, Path>> for &'b OsStr



### impl\<'a, 'b> PartialOrd\<Cow\<'a, Path>> for &'b Path



### impl\<'a, 'b> PartialOrd\<Cow\<'b, OsStr>> for &'a Path



### impl\<'a, 'b> PartialOrd\<OsStr> for Cow\<'a, OsStr>



### impl\<'a, 'b> PartialOrd\<OsStr> for OsString



### impl\<'a, 'b> PartialOrd\<OsString> for &'a OsStr



### impl\<'a, 'b> PartialOrd\<OsString> for Cow\<'a, OsStr>



### impl\<'a, 'b> PartialOrd\<OsString> for OsStr



### impl<'a, B> PartialOrd<Cow<'a, B>> for Cow<'a, B>

```rust
impl<'a, B> PartialOrd<Cow<'a, B>> for Cow<'a, B>
where
  B: PartialOrd<B> + ToOwned + ?Sized,
```



### impl<A, B> PartialOrd<&B> for &A

```rust
impl<A, B> PartialOrd<&B> for &A
where
  A: PartialOrd<B> + ?Sized,
  B: ?Sized,
```



### impl<A, B> PartialOrd<&mut B> for &mut A

```rust
impl<A, B> PartialOrd<&mut B> for &mut A
where
  A: PartialOrd<B> + ?Sized,
  B: ?Sized,
```



### impl\<Dyn> PartialOrd<DynMetadata\<Dyn>> for DynMetadata\<Dyn>

```rust
impl<Dyn> PartialOrd<DynMetadata<Dyn>> for DynMetadata<Dyn>
where
  Dyn: ?Sized,
```



### impl\<F> PartialOrd\<F> for F

```rust
impl<F> PartialOrd<F> for F
where
  F: FnPtr,
```



### impl<K, V, A> PartialOrd<BTreeMap<K, V, A>> for BTreeMap<K, V, A>

```rust
impl<K, V, A> PartialOrd<BTreeMap<K, V, A>> for BTreeMap<K, V, A>
where
  K: PartialOrd<K>,
  V: PartialOrd<V>,
  A: Allocator + Clone,
```



### impl<P, Q> PartialOrd<Pin\<Q>> for Pin\<P>

```rust
impl<P, Q> PartialOrd<Pin<Q>> for Pin<P>
where
  P: Deref,
  Q: Deref,
  <P as Deref>::Target: PartialOrd<<Q as Deref>::Target>,
```



### impl\<T> PartialOrd<Option\<T>> for Option\<T>

```rust
impl<T> PartialOrd<Option<T>> for Option<T>
where
  T: PartialOrd<T>,
```



### impl\<T> PartialOrd<Poll\<T>> for Poll\<T>

```rust
impl<T> PartialOrd<Poll<T>> for Poll<T>
where
  T: PartialOrd<T>,
```



### impl\<T> PartialOrd<*const T> for *const T

```rust
impl<T> PartialOrd<*const T> for *const T
where
  T: ?Sized,
```



### impl\<T> PartialOrd<*mut T> for *mut T

```rust
impl<T> PartialOrd<*mut T> for *mut T
where
  T: ?Sized,
```



### impl\<T> PartialOrd<[T]> for [T]

实现 vectors 按字典顺序 的比较。

```rust
impl<T> PartialOrd<[T]> for [T]
where
  T: PartialOrd<T>,
```



### impl\<T> PartialOrd<(T,)> for (T₁, T₂, …, Tₙ)

This trait is implemented for tuples up to twelve items long.

```rust 
impl<T> PartialOrd<(T,)> for (T₁, T₂, …, Tₙ)
where
  T: PartialOrd<T> + ?Sized,
```



### impl\<T> PartialOrd<Cell\<T>> for Cell\<T>

```rust
impl<T> PartialOrd<Cell<T>> for Cell<T>
where
  T: PartialOrd<T> + Copy,
```



### impl\<T> PartialOrd<RefCell\<T>> for RefCell\<T>

```rust
impl<T> PartialOrd<RefCell<T>> for RefCell<T>
where
  T: PartialOrd<T> + ?Sized,
```





### impl\<T> PartialOrd<PhantomData\<T>> for PhantomData\<T>

```rust
impl<T> PartialOrd<PhantomData<T>> for PhantomData<T>
where
  T: ?Sized,
```



### impl\<T> PartialOrd<ManuallyDrop\<T>> for ManuallyDrop\<T>

```rust
impl<T> PartialOrd<ManuallyDrop<T>> for ManuallyDrop<T>
where
  T: PartialOrd<T> + ?Sized,
```



### impl\<T> PartialOrd<Saturating\<T>> for Saturating\<T>

```rust
impl<T> PartialOrd<Saturating<T>> for Saturating<T>
where
  T: PartialOrd<T>,
```



### impl\<T> PartialOrd<Wrapping\<T>> for Wrapping\<T>

```rust
impl<T> PartialOrd<Wrapping<T>> for Wrapping<T>
where
  T: PartialOrd<T>,
```



### impl\<T> PartialOrd<NonNull\<T>> for NonNull\<T>

```rust
impl<T> PartialOrd<NonNull<T>> for NonNull<T>
where
  T: ?Sized,
```



### impl\<T> PartialOrd<Rc\<T>> for Rc\<T>

```rust
impl<T> PartialOrd<Rc<T>> for Rc<T>
where
  T: PartialOrd<T> + ?Sized,
```



### impl\<T> PartialOrd<Arc\<T>> for Arc\<T>

```rust
impl<T> PartialOrd<Arc<T>> for Arc<T>
where
  T: PartialOrd<T> + ?Sized,
```



### impl\<T> PartialOrd<Reverse\<T>> for Reverse\<T>



```rust
impl<T> PartialOrd<Reverse<T>> for Reverse<T>
where
  T: PartialOrd<T>,
```



### impl<T, A> PartialOrd<Box<T, A>> for Box<T, A>

```rust
impl<T, A> PartialOrd<Box<T, A>> for Box<T, A>
where
  T: PartialOrd<T> + ?Sized,
  A: Allocator,
```



### impl<T, A> PartialOrd<BTreeSet<T, A>> for BTreeSet<T, A>

```rust
impl<T, A> PartialOrd<BTreeSet<T, A>> for BTreeSet<T, A>
where
  T: PartialOrd<T>,
  A: Allocator + Clone,
```



### impl<T, A> PartialOrd<LinkedList<T, A>> for LinkedList<T, A>

```rust
impl<T, A> PartialOrd<LinkedList<T, A>> for LinkedList<T, A>
where
  T: PartialOrd<T>,
  A: Allocator,
```



### impl<T, A> PartialOrd<VecDeque<T, A>> for VecDeque<T, A>

```rust
impl<T, A> PartialOrd<VecDeque<T, A>> for VecDeque<T, A>
where
  T: PartialOrd<T>,
  A: Allocator,
```



### impl<T, A> PartialOrd<Vec<T, A>> for Vec<T, A>

实现 vectors、lexicographically 的比较。

```rust
impl<T, A> PartialOrd<Vec<T, A>> for Vec<T, A>
where
  T: PartialOrd<T>,
  A: Allocator,
```



### impl<T, E> PartialOrd<Result<T, E>> for Result<T, E>

```rust
impl<T, E> PartialOrd<Result<T, E>> for Result<T, E>
where
  T: PartialOrd<T>,
  E: PartialOrd<E>,
```



### impl<T, const LANES: usize> PartialOrd<Mask<T, LANES>> for Mask<T, LANES>

```rust
impl<T, const LANES: usize> PartialOrd<Mask<T, LANES>> for Mask<T, LANES>
where
  T: MaskElement + PartialOrd<T>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const N: usize> PartialOrd<[T; N]> for [T; N]

```rust
impl<T, const N: usize> PartialOrd<[T; N]> for [T; N]
where
  T: PartialOrd<T>,
```



### impl<T, const N: usize> PartialOrd<Simd<T, N>> for Simd<T, N>

```rust
impl<T, const N: usize> PartialOrd<Simd<T, N>> for Simd<T, N>
where
  LaneCount<N>: SupportedLaneCount,
  T: SimdElement + PartialOrd<T>,
```



### impl<Y, R> PartialOrd<GeneratorState<Y, R>> for GeneratorState<Y, R>

```rust
impl<Y, R> PartialOrd<GeneratorState<Y, R>> for GeneratorState<Y, R>
where
  Y: PartialOrd<Y>,
  R: PartialOrd<R>,
```



### impl PartialOrd\<LineColumn> for LineColumn
