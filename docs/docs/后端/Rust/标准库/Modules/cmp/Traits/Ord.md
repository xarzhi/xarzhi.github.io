# Trait std::cmp::Ord

一个用于形成 [全序关系](https://en.wikipedia.org/wiki/Total_order) 的类型的 trait。

```rust
pub trait Ord: Eq + PartialOrd<Self> {
    // Required method
    fn cmp(&self, other: &Self) -> Ordering;

    // Provided methods
    fn max(self, other: Self) -> Self
       where Self: Sized { ... }
    fn min(self, other: Self) -> Self
       where Self: Sized { ... }
    fn clamp(self, min: Self, max: Self) -> Self
       where Self: Sized + PartialOrd<Self> { ... }
}
```

实现必须与 [`PartialOrd`](./PartialOrd) 实现一致，并确保 `max`、`min` 和 `clamp` 与 `cmp` 一致：

- `partial_cmp(a, b) == Some(cmp(a, b))`.
- `max(a, b) == max_by(a, b, cmp)` (由默认实现确保)。
- `min(a, b) == min_by(a, b, cmp)` (由默认实现确保)。
- 对于 `a.clamp(min, max)`，请参见 [方法文档](#clamp) (由默认实现确保)。

通过派生一些 traits 并手动实现其他的，很容易意外地使 `cmp` 和 `partial_cmp` 不一致。



## Corollaries

综上所述，根据 `PartialOrd` 的要求，`<` 定义了严格的总顺序。 这意味着对于所有 `a`、`b` 和 `c`：

- `a < b`、`a == b` 或 `a > b` 中恰好有一个为 true； and
- `<` 是可传递的: `a < b` 和 `b < c` 意味着 `a < c`。`==` 和 `>` 必须保持相同。



## Derivable

该 trait 可以与 `#[derive]` 一起使用。

在结构体上 `derive` d 时，它将基于结构体成员的自上而下的声明顺序生成 [词典](https://en.wikipedia.org/wiki/Lexicographic_order) 顺序。

当在枚举上 `derive`d 时，变体按其判别式排序。 默认情况下，对于顶部的变体，判别式最小，底部变体的判别式最大。下面是一个例子：

```rust
#[derive(PartialEq, Eq, PartialOrd, Ord)]
enum E {
    Top,
    Bottom,
}

assert!(E::Top < E::Bottom);
```

但是，手动设置判别式可以覆盖此默认行为:

```rust
#[derive(PartialEq, Eq, PartialOrd, Ord)]
enum E {
    Top = 2,
    Bottom = 1,
}

assert!(E::Bottom < E::Top);
```



## 词典比较

词典比较是一种具有以下属性的操作：

- 逐个元素比较两个序列。
- 第一个不匹配元素定义了哪个序列在词典上小于或大于另一个序列。
- 如果一个序列是另一个序列的前缀，则从字典上看，较短的序列比另一个序列小。
- 如果两个序列具有相等的元素并且长度相同，则序列在字典上是相等的。
- 在字典上，空序列比任何非空序列都少。



## 如何实现 `Ord`？

`Ord` 要求类型也是 [`PartialOrd`](./PartialOrd) 和 [`Eq`](./Eq) (需要 [`PartialEq`](./PartialEq))。

然后，您必须定义 [`cmp`](#cmp) 的实现。您可能会发现在类型的字段上使用 [`cmp`](#cmp) 很有用。

这是一个示例，您只想按高度对人员进行排序，而不考虑 `id` 和 `name`：

```rust
use std::cmp::Ordering;

#[derive(Eq)]
struct Person {
    id: u32,
    name: String,
    height: u32,
}

impl Ord for Person {
    fn cmp(&self, other: &Self) -> Ordering {
        self.height.cmp(&other.height)
    }
}

impl PartialOrd for Person {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for Person {
    fn eq(&self, other: &Self) -> bool {
        self.height == other.height
    }
}
```





## Required Methods

### cmp

此方法返回 `self` 和 `other` 之间的 [`Ordering`](../Enums/Ordering)。

按照惯例，如果为 true，则 `self.cmp(&other)` 返回与表达式 `self <operator> other` 匹配的顺序。

```rust
fn cmp(&self, other: &Self) -> Ordering
```

**参数**：

- **v1**：另一个需要比较的值

**返回值**：根据比较的结果，返回一个`Ordering`

```rust
use std::cmp::Ordering;

assert_eq!(5.cmp(&10), Ordering::Less);
assert_eq!(10.cmp(&5), Ordering::Greater);
assert_eq!(5.cmp(&5), Ordering::Equal);
```





## Provided Methods

### max

比较并返回两个值中的最大值。

如果比较确定它们相等，则返回第二个参数。

```rust
pub fn max<T>(v1: T, v2: T) -> T
where
    T: Ord,
```

**参数**：

- **v1**：第一个比较的值
- **v2**：第二个比较的值

**返回值**：返回二者中最大的，如果比较确定它们相等，则返回第二个参数。

```rust
use std::cmp;

assert_eq!(cmp::max(1, 2), 2);
assert_eq!(cmp::max(2, 2), 2);
```





### min

比较并返回两个值中的最**小**值。

如果比较确定它们相等，则返回第**一**个参数。

```rust
pub fn min<T>(v1: T, v2: T) -> T
where
    T: Ord,
```

**参数**：

- **v1**：第一个比较的值
- **v2**：第二个比较的值

**返回值**：返回二者中最小的，如果比较确定它们相等，则返回第一个参数。

```rust
use std::cmp;

assert_eq!(cmp::min(1, 2), 1);
assert_eq!(cmp::min(2, 2), 2);
```



### clamp

将值限制在某个范围内。

```rust
fn clamp(self, min: Self, max: Self) -> Self
where
    Self: Sized + PartialOrd<Self>,
```

**参数**：

- **min**：比较的下限
- **max**：比较的上限

**返回值**：如果 `self` 大于 `max`，则返回 `max`; 如果 `self` 小于 `min`，则返回 `min`。 否则，将返回 `self`。

```rust
assert_eq!((-3).clamp(-2, 1), -2);
assert_eq!(0.clamp(-2, 1), 0);
assert_eq!(2.clamp(-2, 1), 1);
```





## Implementors



### impl Ord for AsciiChar



### impl Ord for Infallible



### impl Ord for ErrorKind



### impl Ord for IpAddr



### impl Ord for SocketAddr



### impl Ord for Which



### impl Ord for Ordering



### impl Ord for bool



### impl Ord for char



### impl Ord for i8



### impl Ord for i16



### impl Ord for i32



### impl Ord for i64



### impl Ord for i128



### impl Ord for isize



### impl Ord for !



### impl Ord for str

实现字符串排序。

字符串按字节值按 按字典顺序 排序。 这将根据 Unicode 代码点在代码图中的位置进行排序。 这不一定与 “alphabetical” 顺序相同，后者因语言和区域设置而异。 根据文化认可的标准对字符串进行排序需要 str 类型的作用域之外的特定于语言环境的数据。

### 



### impl Ord for u8



### impl Ord for u16



### impl Ord for u32



### impl Ord for u64



### impl Ord for u128



### impl Ord for ()



### impl Ord for usize



### impl Ord for CpuidResult



### impl Ord for TypeId



### impl Ord for CStr



### impl Ord for CString



### impl Ord for OsStr



### impl Ord for OsString



### impl Ord for Error



### impl Ord for PhantomPinned



### impl Ord for Ipv4Addr



### impl Ord for Ipv6Addr



### impl Ord for SocketAddrV4



### impl Ord for SocketAddrV6



### impl Ord for NonZeroI8



### impl Ord for NonZeroI16



### impl Ord for NonZeroI32



### impl Ord for NonZeroI64



### impl Ord for NonZeroI128



### impl Ord for NonZeroIsize



### impl Ord for NonZeroU8



### impl Ord for NonZeroU16



### impl Ord for NonZeroU32



### impl Ord for NonZeroU64



### impl Ord for NonZeroU128



### impl Ord for NonZeroUsize



### impl Ord for Components<'_>



### impl Ord for Path



### impl Ord for PathBuf



### impl Ord for PrefixComponent<'_>



### impl Ord for Alignment



### impl Ord for String



### impl Ord for Duration



### impl Ord for Instant



### impl Ord for SystemTime



### impl<'a> Ord for Component<'a>



### impl<'a> Ord for Prefix<'a>



### impl<'a> Ord for Location<'a>



### impl\<A> Ord for &A

```rust
impl<A> Ord for &A
where
  A: Ord + ?Sized,
```



### impl\<A> Ord for &mut A

```rust
impl<A> Ord for &mut A
where
  A: Ord + ?Sized,
```



### impl\<B> Ord for Cow<'_, B>

```rust
impl<B> Ord for Cow<'_, B>
where
  B: Ord + ToOwned + ?Sized,
```



### impl\<Dyn> Ord for DynMetadata\<Dyn>

```rust
impl<Dyn> Ord for DynMetadata<Dyn>
where
  Dyn: ?Sized,
```



### impl\<F> Ord for F

```rust
impl<F> Ord for F
where
  F: FnPtr,
```



### impl<K, V, A> Ord for BTreeMap<K, V, A>

```rust
impl<K, V, A> Ord for BTreeMap<K, V, A>
where
  K: Ord,
  V: Ord,
  A: Allocator + Clone,
```



### impl\<P> Ord for Pin\<P>

```rust
impl<P> Ord for Pin<P>
where
  P: Deref,
  <P as Deref>::Target: Ord,
```



### impl\<T> Ord for Option\<T>

```rust
impl<T> Ord for Option<T>
where
  T: Ord,
```



### impl\<T> Ord for Poll\<T>

```rust
impl<T> Ord for Poll<T>
where
  T: Ord,
```



### impl\<T> Ord for *const T

```rust
impl<T> Ord for *const T
where
  T: ?Sized,
```



### impl\<T> Ord for *mut T

```rust
impl<T> Ord for *mut T
where
  T: ?Sized,
```



### impl\<T> Ord for [T]

实现 vectors 按字典顺序 的比较。

```rust
impl<T> Ord for [T]
where
  T: Ord,
```



### impl\<T> Ord for (T₁, T₂, …, Tₙ)

This trait is implemented for tuples up to twelve items long.

```rust
impl<T> Ord for (T₁, T₂, …, Tₙ)
where
  T: Ord + ?Sized,
```



### impl\<T> Ord for Cell\<T>

```rust
impl<T> Ord for Cell<T>
where
  T: Ord + Copy,
```



### impl\<T> Ord for RefCell\<T>

```rust
impl<T> Ord for RefCell<T>
where
  T: Ord + ?Sized,
```



### impl\<T> Ord for PhantomData\<T>

```rust
impl<T> Ord for PhantomData<T>
where
  T: ?Sized,
```



### impl\<T> Ord for ManuallyDrop\<T>

```rust
impl<T> Ord for ManuallyDrop<T>
where
  T: Ord + ?Sized,
```



### impl\<T> Ord for Saturating\<T>

```rust
impl<T> Ord for Saturating<T>
where
  T: Ord,
```



### impl\<T> Ord for Wrapping\<T>

```rust
impl<T> Ord for Wrapping<T>
where
  T: Ord,
```



### impl\<T> Ord for NonNull\<T>

```rust
impl<T> Ord for NonNull<T>
where
  T: ?Sized,
```



### impl\<T> Ord for Rc\<T>

```rust
impl<T> Ord for Rc<T>
where
  T: Ord + ?Sized,
```



### impl\<T> Ord for Arc\<T>

```rust
impl<T> Ord for Arc<T>
where
  T: Ord + ?Sized,
```



### impl\<T> Ord for Reverse\<T>

```rust
impl<T> Ord for Reverse<T>
where
  T: Ord,
```



### impl<T, A> Ord for Box<T, A>

```rust
impl<T, A> Ord for Box<T, A>
where
  T: Ord + ?Sized,
  A: Allocator,
```



### impl<T, A> Ord for BTreeSet<T, A>

```rust
impl<T, A> Ord for BTreeSet<T, A>
where
  T: Ord,
  A: Allocator + Clone,
```



### impl<T, A> Ord for LinkedList<T, A>

```rust
impl<T, A> Ord for LinkedList<T, A>
where
  T: Ord,
  A: Allocator,
```



### impl<T, A> Ord for VecDeque<T, A>

```rust
impl<T, A> Ord for VecDeque<T, A>
where
  T: Ord,
  A: Allocator,
```



### impl<T, A> Ord for Vec<T, A>

实现 vectors、lexicographically 的排序。

```rust
impl<T, A> Ord for Vec<T, A>
where
  T: Ord,
  A: Allocator,
```



### impl<T, E> Ord for Result<T, E>

```rust
impl<T, E> Ord for Result<T, E>
where
  T: Ord,
  E: Ord,
```



### impl<T, const N: usize> Ord for [T; N]

实现数组 按字典顺序 的比较。

```rust
impl<T, const N: usize> Ord for [T; N]
where
  T: Ord,
```



### impl<T, const N: usize> Ord for Simd<T, N>

```rust
impl<T, const N: usize> Ord for Simd<T, N>
where
  LaneCount<N>: SupportedLaneCount,
  T: SimdElement + Ord,
```



### impl<Y, R> Ord for GeneratorState<Y, R>

```rust
impl<Y, R> Ord for GeneratorState<Y, R>
where
  Y: Ord,
  R: Ord,
```



### impl Ord for LineColumn
