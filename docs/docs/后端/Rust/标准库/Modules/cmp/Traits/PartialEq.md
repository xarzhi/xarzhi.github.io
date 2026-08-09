# Trait std::cmp::PartialEq

等值比较的`Trait` 。

```rust
pub trait PartialEq\<Rhs = Self>
where
    Rhs: ?Sized,
{
    // Required method
    fn eq(&self, other: &Rhs) -> bool;

    // Provided method
    fn ne(&self, other: &Rhs) -> bool { ... }
}
```

`x.eq(y)` 也可以写成 `x == y`，`x.ne(y)`，也可以写成 `x != y`。

```rust
let x: u32 = 0;
let y: u32 = 1;

assert_eq!(x == y, false);
assert_eq!(x.eq(&y), false);
```



对于没有完全等价关系的类型，这个 trait 允许部分相等。 例如，在浮点数 `NaN != NaN` 中，因此浮点类型实现 `PartialEq`，但不实现 [`Eq`](https://www.rustwiki.org.cn/zh-CN/std/cmp/trait.Eq.html)。 

实现必须确保 `eq` 和 `ne` 彼此一致：

- `a != b` 当且仅当 `!(a == b)`。

`ne` 的默认实现提供了这种一致性，并且几乎总是足够的。没有很好的理由不应该覆盖它。

如果 `Self` 和 `Rhs` 也实现了 [`PartialOrd`](./PartialOrd) 或 [`Ord`](./Ord)，则它们的方法也必须与 `PartialEq` 一致 (具体要求请参见那些 traits 的文档)。 通过派生一些 traits 并手动实现其他一些行为，很容易使它们不以为然。

等式关系 `==` 必须满足以下条件 (对于所有类型为 `A`、`B`、`C` 的 `a`、`b`、`c`) ：

- **对称**: 如果 `A: PartialEq<B>` 和 `B: PartialEq<A>`，则 **`a == b` 意味着 ’b == a`**; 和
- **可传递**: 如果 `A: PartialEq<B>` 和 `B: PartialEq<C>` 以及 `A： PartialEq<C>`，然后 **`a == b`，并且 `b == c` 暗示了 `a == c`**。

请注意，`B: PartialEq<A>` (symmetric) 和 `A: PartialEq<C>` (transitive) 强制不是强制存在的，但是这些要求只要存在就适用。



:::tip Derivable

该 trait 可以与 `#[derive]` 一起使用。在结构体上 `derive` d 时，如果所有字段都相等，则两个实例相等; 如果任何字段不相等，则两个实例不相等。当在枚举上 `派生` 时，如果两个实例是相同的变体并且所有字段都相等，则它们是相等的。

:::





## 如何实现 `PartialEq`？

一个域的示例实现，在该域中，即使两本书的 ISBN 匹配，即使格式不同，也将其视为同一本书：

```rust
enum BookFormat {
    Paperback,
    Hardback,
    Ebook,
}

struct Book {
    isbn: i32,
    format: BookFormat,
}

impl PartialEq for Book {
    fn eq(&self, other: &Self) -> bool {
        self.isbn == other.isbn
    }
}

let b1 = Book { isbn: 3, format: BookFormat::Paperback };
let b2 = Book { isbn: 3, format: BookFormat::Ebook };
let b3 = Book { isbn: 10, format: BookFormat::Paperback };

assert!(b1 == b2);
assert!(b1 != b3);
```



## 如何比较两种不同的类型？

您可以比较的类型由 `PartialEq` 的类型参数控制。 例如，让我们对之前的代码进行一些调整：

```rust
// 衍生工具 <BookFormat> == <BookFormat> 比较
#[derive(PartialEq)]
enum BookFormat {
    Paperback,
    Hardback,
    Ebook,
}

struct Book {
    isbn: i32,
    format: BookFormat,
}

// 实现 <Book> == <BookFormat> 比较
impl PartialEq<BookFormat> for Book {
    fn eq(&self, other: &BookFormat) -> bool {
        self.format == *other
    }
}

// 实现 <BookFormat> == <Book> 比较
impl PartialEq<Book> for BookFormat {
    fn eq(&self, other: &Book) -> bool {
        *self == other.format
    }
}

let b1 = Book { isbn: 3, format: BookFormat::Paperback };

assert!(b1 == BookFormat::Paperback);
assert!(BookFormat::Ebook != b1);
```

通过将 `impl PartialEq for Book` 更改为 `impl PartialEq<BookFormat> for Book`，我们可以将 BookFormat 和 Book 进行比较。

像上面这样的比较 (它忽略了结构体的某些字段) 可能很危险。这很容易导致意外违反部分对等关系的要求。 例如，如果我们保留了以上针对 `BookFormat` 的 `PartialEq<Book>` 的实现，并为 `Book` 添加了 `PartialEq<Book>` 的实现 (通过 `#[derive]` 或第一个示例中的手动实现)，则结果将违反传递性：

```rust
#[derive(PartialEq)]
enum BookFormat {
    Paperback,
    Hardback,
    Ebook,
}

#[derive(PartialEq)]
struct Book {
    isbn: i32,
    format: BookFormat,
}

impl PartialEq<BookFormat> for Book {
    fn eq(&self, other: &BookFormat) -> bool {
        self.format == *other
    }
}

impl PartialEq<Book> for BookFormat {
    fn eq(&self, other: &Book) -> bool {
        *self == other.format
    }
}

fn main() {
    let b1 = Book { isbn: 1, format: BookFormat::Paperback };
    let b2 = Book { isbn: 2, format: BookFormat::Paperback };

    assert!(b1 == BookFormat::Paperback);
    assert!(BookFormat::Paperback == b2);

    // 以下应该通过传递性来保持，但不是。
    assert!(b1 == b2); // <-- PANICS
}
```



## Required Methods

### eq

此方法测试 `self` 和 `other` 值是否相等，并由 `==` 使用。

```rust
fn eq(&self, other: &Rhs) -> bool
```

**参数**：

- **other**：另一个需要与`self`比较的值

**返回值**：根据两个值是否相等，返回`bool`值

```rust
println!("{:#?}", 1.eq(&2));  // false
```



## Provided Methods

### ne

此方法测试 `!=`。判断两值是否不等， 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖

```rust
fn ne(&self, other: &Rhs) -> bool
```

**参数**：

- **other**：另一个需要与`self`比较的值

**返回值**：根据两个值是否不相等，返回`bool`值

```rust
println!("{:#?}", 1.ne(&2));  // true
```



### 

## Implementors

### impl PartialEq\<&str> for OsString



### impl PartialEq\<AsciiChar> for AsciiChar



### impl PartialEq\<BacktraceStatus> for BacktraceStatus



### impl PartialEq\<TryReserveErrorKind> for TryReserveErrorKind



### impl PartialEq\<Infallible> for Infallible



### impl PartialEq\<VarError> for VarError



### impl PartialEq\<Alignment> for std::fmt::Alignment



### impl PartialEq\<ErrorKind> for ErrorKind



### impl PartialEq\<SeekFrom> for SeekFrom



### impl PartialEq\<IpAddr> for IpAddr



### impl PartialEq\<IpAddr> for Ipv4Addr



### impl PartialEq\<IpAddr> for Ipv6Addr



### impl PartialEq\<Ipv6MulticastScope> for Ipv6MulticastScope



### impl PartialEq\<Shutdown> for Shutdown



### impl PartialEq\<SocketAddr> for SocketAddr



### impl PartialEq\<FpCategory> for FpCategory



### impl PartialEq\<IntErrorKind> for IntErrorKind



### impl PartialEq\<BacktraceStyle> for BacktraceStyle



### impl PartialEq\<Which> for Which



### impl PartialEq\<SearchStep> for SearchStep



### impl PartialEq\<Ordering> for std::sync::atomic::Ordering



### impl PartialEq\<RecvTimeoutError> for RecvTimeoutError



### impl PartialEq\<TryRecvError> for TryRecvError



### impl PartialEq\<Ordering> for std::cmp::Ordering



### impl PartialEq\<bool> for bool



### impl PartialEq\<char> for char



### impl PartialEq\<f32> for f32



### impl PartialEq\<f64> for f64



### impl PartialEq\<i8> for i8



### impl PartialEq\<i16> for i16



### impl PartialEq\<i32> for i32



### impl PartialEq\<i64> for i64



### impl PartialEq\<i128> for i128



### impl PartialEq\<isize> for isize



### impl PartialEq\<!> for !



### impl PartialEq\<str> for str



### impl PartialEq\<str> for OsStr



### impl PartialEq\<str> for OsString



### impl PartialEq\<u8> for u8



### impl PartialEq\<u16> for u16



### impl PartialEq\<u32> for u32



### impl PartialEq\<u64> for u64



### impl PartialEq\<u128> for u128



### impl PartialEq\<()> for ()



### impl PartialEq\<usize> for usize



### impl PartialEq\<CpuidResult> for CpuidResult



### impl PartialEq\<FromBytesUntilNulError> for FromBytesUntilNulError



### impl PartialEq\<AllocError> for AllocError



### impl PartialEq\<Layout> for Layout



### impl PartialEq\<LayoutError> for LayoutError



### impl PartialEq\<TypeId> for TypeId



### impl PartialEq\<CharTryFromError> for CharTryFromError



### impl PartialEq\<DecodeUtf16Error> for DecodeUtf16Error



### impl PartialEq\<ParseCharError> for ParseCharError



### impl PartialEq\<TryFromCharError> for TryFromCharError



### impl PartialEq\<TryReserveError> for TryReserveError



### impl PartialEq\<CStr> for CStr



### impl PartialEq\<CString> for CString



### impl PartialEq\<FromBytesWithNulError> for FromBytesWithNulError



### impl PartialEq\<FromVecWithNulError> for FromVecWithNulError



### impl PartialEq\<IntoStringError> for IntoStringError



### impl PartialEq\<NulError> for NulError



### impl PartialEq\<OsStr> for str



### impl PartialEq\<OsStr> for OsStr



### impl PartialEq\<OsStr> for Path



### impl PartialEq\<OsStr> for PathBuf



### impl PartialEq\<OsString> for str



### impl PartialEq\<OsString> for OsString



### impl PartialEq\<OsString> for Path



### impl PartialEq\<OsString> for PathBuf



### impl PartialEq\<Error> for Error



### impl PartialEq\<FileType> for FileType



### impl PartialEq\<Permissions> for Permissions



### impl PartialEq\<PhantomPinned> for PhantomPinned



### impl PartialEq\<Assume> for Assume



### impl PartialEq\<AddrParseError> for AddrParseError



### impl PartialEq\<Ipv4Addr> for IpAddr



### impl PartialEq\<Ipv4Addr> for Ipv4Addr



### impl PartialEq\<Ipv6Addr> for IpAddr



### impl PartialEq\<Ipv6Addr> for Ipv6Addr



### impl PartialEq\<SocketAddrV4> for SocketAddrV4



### impl PartialEq\<SocketAddrV6> for SocketAddrV6



### impl PartialEq\<NonZeroI8> for NonZeroI8



### impl PartialEq\<NonZeroI16> for NonZeroI16



### impl PartialEq\<NonZeroI32> for NonZeroI32



### impl PartialEq\<NonZeroI64> for NonZeroI64



### impl PartialEq\<NonZeroI128> for NonZeroI128



### impl PartialEq\<NonZeroIsize> for NonZeroIsize



### impl PartialEq\<NonZeroU8> for NonZeroU8



### impl PartialEq\<NonZeroU16> for NonZeroU16



### impl PartialEq\<NonZeroU32> for NonZeroU32



### impl PartialEq\<NonZeroU64> for NonZeroU64



### impl PartialEq\<NonZeroU128> for NonZeroU128



### impl PartialEq\<NonZeroUsize> for NonZeroUsize



### impl PartialEq\<ParseFloatError> for ParseFloatError



### impl PartialEq\<ParseIntError> for ParseIntError



### impl PartialEq\<TryFromIntError> for TryFromIntError



### impl PartialEq\<RangeFull> for RangeFull



### impl PartialEq\<UCred> for UCred

`Available on Unix only.`



### impl PartialEq\<InvalidHandleError> for InvalidHandleError

`Available on Windows only.`



### impl PartialEq\<NullHandleError> for NullHandleError

`Available on Windows only.`



### impl PartialEq\<Path> for OsStr



### impl PartialEq\<Path> for OsString



### impl PartialEq\<Path> for Path



### impl PartialEq\<Path> for PathBuf



### impl PartialEq\<PathBuf> for OsStr



### impl PartialEq\<PathBuf> for OsString



### impl PartialEq\<PathBuf> for Path



### impl PartialEq\<PathBuf> for PathBuf



### impl PartialEq\<StripPrefixError> for StripPrefixError



### impl PartialEq\<ExitStatus> for ExitStatus



### impl PartialEq\<ExitStatusError> for ExitStatusError



### impl PartialEq\<Output> for Output



### impl PartialEq\<Alignment> for std::ptr::Alignment



### impl PartialEq\<ParseBoolError> for ParseBoolError



### impl PartialEq\<Utf8Error> for Utf8Error



### impl PartialEq\<FromUtf8Error> for FromUtf8Error



### impl PartialEq\<String> for String



### impl PartialEq\<RecvError> for RecvError



### impl PartialEq\<WaitTimeoutResult> for WaitTimeoutResult



### impl PartialEq\<RawWaker> for RawWaker



### impl PartialEq\<RawWakerVTable> for RawWakerVTable



### impl PartialEq\<AccessError> for AccessError



### impl PartialEq\<ThreadId> for ThreadId



### impl PartialEq\<Duration> for Duration



### impl PartialEq\<Instant> for Instant



### impl PartialEq\<SystemTime> for SystemTime



### impl PartialEq\<TryFromFloatSecsError> for TryFromFloatSecsError



### impl\<'a> PartialEq\<&'a OsStr> for Path



### impl\<'a> PartialEq\<&'a OsStr> for PathBuf



### impl\<'a> PartialEq\<&'a Path> for OsStr



### impl\<'a> PartialEq\<&'a Path> for OsString



### impl\<'a> PartialEq\<&'a Path> for PathBuf



### impl\<'a> PartialEq\<Cow\<'a, OsStr>> for Path



### impl\<'a> PartialEq\<Cow\<'a, OsStr>> for PathBuf



### impl\<'a> PartialEq\<Cow\<'a, Path>> for OsStr



### impl\<'a> PartialEq\<Cow\<'a, Path>> for OsString



### impl\<'a> PartialEq\<Cow\<'a, Path>> for Path



### impl\<'a> PartialEq\<Cow\<'a, Path>> for PathBuf



### impl\<'a> PartialEq\<Component\<'a>> for Component\<'a>



### impl\<'a> PartialEq\<Prefix\<'a>> for Prefix\<'a>



### impl\<'a> PartialEq\<OsStr> for &'a Path



### impl\<'a> PartialEq\<OsStr> for Cow\<'a, Path>



### impl\<'a> PartialEq\<OsString> for &'a str



### impl\<'a> PartialEq\<OsString> for &'a Path



### impl\<'a> PartialEq\<OsString> for Cow\<'a, Path>



### impl\<'a> PartialEq\<Location\<'a>> for Location\<'a>



### impl\<'a> PartialEq\<Components\<'a>> for Components\<'a>



### impl\<'a> PartialEq\<Path> for &'a OsStr



### impl\<'a> PartialEq\<Path> for Cow\<'a, OsStr>



### impl\<'a> PartialEq\<Path> for Cow\<'a, Path>



### impl\<'a> PartialEq\<PathBuf> for &'a OsStr



### impl\<'a> PartialEq\<PathBuf> for &'a Path



### impl\<'a> PartialEq\<PathBuf> for Cow\<'a, OsStr>



### impl\<'a> PartialEq\<PathBuf> for Cow\<'a, Path>



### impl\<'a> PartialEq\<PrefixComponent\<'a>> for PrefixComponent\<'a>



### impl\<'a> PartialEq\<Utf8Chunk\<'a>> for Utf8Chunk\<'a>



### impl\<'a, 'b> PartialEq\<&'a str> for String



### impl\<'a, 'b> PartialEq\<&'a OsStr> for OsString



### impl\<'a, 'b> PartialEq\<&'a Path> for Cow\<'b, OsStr>



### impl\<'a, 'b> PartialEq\<&'b str> for Cow\<'a, str>



### impl\<'a, 'b> PartialEq\<&'b OsStr> for Cow\<'a, OsStr>



### impl\<'a, 'b> PartialEq\<&'b OsStr> for Cow\<'a, Path>



### impl\<'a, 'b> PartialEq\<&'b Path> for Cow\<'a, Path>



### impl\<'a, 'b> PartialEq\<Cow\<'a, str>> for &'b str



### impl\<'a, 'b> PartialEq\<Cow\<'a, str>> for str



### impl\<'a, 'b> PartialEq\<Cow\<'a, str>> for String



### impl\<'a, 'b> PartialEq\<Cow\<'a, OsStr>> for &'b OsStr



### impl\<'a, 'b> PartialEq\<Cow\<'a, OsStr>> for OsStr



### impl\<'a, 'b> PartialEq\<Cow\<'a, OsStr>> for OsString



### impl\<'a, 'b> PartialEq\<Cow\<'a, Path>> for &'b OsStr



### impl\<'a, 'b> PartialEq\<Cow\<'a, Path>> for &'b Path



### impl\<'a, 'b> PartialEq\<Cow\<'b, OsStr>> for &'a Path



### impl\<'a, 'b> PartialEq\<str> for Cow\<'a, str>



### impl\<'a, 'b> PartialEq\<str> for String



### impl\<'a, 'b> PartialEq\<OsStr> for Cow\<'a, OsStr>



### impl\<'a, 'b> PartialEq\<OsStr> for OsString



### impl\<'a, 'b> PartialEq\<OsString> for &'a OsStr



### impl\<'a, 'b> PartialEq\<OsString> for Cow\<'a, OsStr>



### impl\<'a, 'b> PartialEq\<OsString> for OsStr



### impl\<'a, 'b> PartialEq\<String> for &'a str





### impl<'a, 'b, B, C> PartialEq<Cow<'b, C>> for Cow<'a, B>

```rust
impl<'a, 'b, B, C> PartialEq<Cow<'b, C>> for Cow<'a, B>
where
  B: PartialEq<C> + ToOwned + ?Sized,
  C: ToOwned + ?Sized,
```



### impl<A, B> PartialEq<&B> for &A

```rust
impl<A, B> PartialEq<&B> for &A
where
  A: PartialEq<B> + ?Sized,
  B: ?Sized,
```



### impl<A, B> PartialEq<&B> for &mut A

```rust
impl<A, B> PartialEq<&B> for &mut A
where
  A: PartialEq<B> + ?Sized,
  B: ?Sized,
```



### impl<A, B> PartialEq<&mut B> for &A

```rust
impl<A, B> PartialEq<&mut B> for &A
where
  A: PartialEq<B> + ?Sized,
  B: ?Sized,
```



### impl<A, B> PartialEq<&mut B> for &mut A

```rust
impl<A, B> PartialEq<&mut B> for &mut A
where
  A: PartialEq<B> + ?Sized,
  B: ?Sized,
```



### impl<A, B> PartialEq<[B]> for [A]

```rust
impl<A, B> PartialEq<[B]> for [A]
where
  A: PartialEq<B>,
```



### impl<A, B, const N: usize> PartialEq<&[B]> for [A; N]

```rust
implA, B, const N: usize> PartialEq<&[B]> for [A; N]
where
  A: PartialEq<B>,
```



### impl<A, B, const N: usize> PartialEq<&mut [B]> for [A; N]

```rust
impl<A, B, const N: usize> PartialEq<&mut [B]> for [A; N]
where
  A: PartialEq<B>,
```



### impl<A, B, const N: usize> PartialEq<[A; N]> for &[B]

```rust
impl<A, B, const N: usize> PartialEq<[A; N]> for &[B]
where
  B: PartialEq<A>,
```



### impl<A, B, const N: usize> PartialEq<[A; N]> for &mut [B]

```rust
impl<A, B, const N: usize> PartialEq<[A; N]> for &mut [B]
where
  B: PartialEq<A>,
```



### impl<A, B, const N: usize> PartialEq<[A; N]> for [B]

```rust
impl<A, B, const N: usize> PartialEq<[A; N]> for [B]
where
  B: PartialEq<A>,
```



### impl<A, B, const N: usize> PartialEq<[B; N]> for [A; N]

```rust
impl<A, B, const N: usize> PartialEq<[B; N]> for [A; N]
where
  A: PartialEq<B>,
```



### impl<A, B, const N: usize> PartialEq<[B]> for [A; N]

```rust
impl<A, B, const N: usize> PartialEq<[B]> for [A; N]
where
  A: PartialEq<B>,
```



### impl<B, C> PartialEq<ControlFlow<B, C>> for ControlFlow<B, C>

```rust
impl<B, C> PartialEq<ControlFlow<B, C>> for ControlFlow<B, C>
where
  B: PartialEq<B>,
  C: PartialEq<C>,
```



### impl\<Dyn> PartialEq<DynMetadata\<Dyn>> for DynMetadata\<Dyn>

```rust
impl<Dyn> PartialEq<DynMetadata<Dyn>> for DynMetadata<Dyn>
where
  Dyn: ?Sized,
```



### impl\<F> PartialEq\<F> for F

```rust
impl<F> PartialEq<F> for F
where
  F: FnPtr,
```



### impl\<H> PartialEq<BuildHasherDefault\<H>> for BuildHasherDefault\<H>



### impl\<Idx> PartialEq<Range\<Idx>> for Range\<Idx>

```rust
impl<Idx> PartialEq<Range<Idx>> for Range<Idx>
where
  Idx: PartialEq<Idx>,
```



### impl\<Idx> PartialEq<RangeFrom\<Idx>> for RangeFrom\<Idx>

```rust
impl<Idx> PartialEq<RangeFrom<Idx>> for RangeFrom<Idx>
where
  Idx: PartialEq<Idx>,
```



### impl\<Idx> PartialEq<RangeInclusive\<Idx>> for RangeInclusive\<Idx>

```rust
impl<Idx> PartialEq<RangeInclusive<Idx>> for RangeInclusive<Idx>
where
  Idx: PartialEq<Idx>,
```



### impl\<Idx> PartialEq<RangeTo\<Idx>> for RangeTo\<Idx>

```rust
impl<Idx> PartialEq<RangeTo<Idx>> for RangeTo<Idx>
where
  Idx: PartialEq<Idx>,
```



### impl\<Idx> PartialEq<RangeToInclusive\<Idx>> for RangeToInclusive\<Idx>

```rust
impl<Idx> PartialEq<RangeToInclusive<Idx>> for RangeToInclusive<Idx>

where

  Idx: PartialEq<Idx>,
```



### impl<K, V, A> PartialEq<BTreeMap<K, V, A>> for BTreeMap<K, V, A>

```rust
impl<K, V, A> PartialEq<BTreeMap<K, V, A>> for BTreeMap<K, V, A>
where
  K: PartialEq<K>,
  V: PartialEq<V>,
  A: Allocator + Clone,
```



### impl<K, V, S> PartialEq<HashMap<K, V, S>> for HashMap<K, V, S>

```rust
impl<K, V, S> PartialEq<HashMap<K, V, S>> for HashMap<K, V, S>
where
  K: Eq + Hash,
  V: PartialEq,
  S: BuildHasher,
```



### impl<P, Q> PartialEq<Pin\<Q>> for Pin\<P>

```rust
impl<P, Q> PartialEq<Pin<Q>> for Pin<P>
where
  P: Deref,
  Q: Deref,
  <P as Deref>::Target: PartialEq<<Q as Deref>::Target>,
```



### impl\<T> PartialEq<Bound\<T>> for Bound\<T>

```rust
impl<T> PartialEq<Bound<T>> for Bound<T>
where
  T: PartialEq<T>,
```



### impl\<T> PartialEq<Option\<T>> for Option\<T>

```rust
impl<T> PartialEq<Option<T>> for Option<T>
where
  T: PartialEq<T>,
```



### impl\<T> PartialEq<Poll\<T>> for Poll\<T>

```rust
impl<T> PartialEq<Poll<T>> for Poll<T>
where
  T: PartialEq<T>,
```



### impl\<T> PartialEq<*const T> for *const T

```rust
impl<T> PartialEq<*const T> for *const T
where
  T: ?Sized,
```



### impl\<T> PartialEq<*mut T> for *mut T

```rust
impl<T> PartialEq<*mut T> for *mut T
where
  T: ?Sized,
```



### impl\<T> PartialEq<(T,)> for (T₁, T₂, …, Tₙ)

This trait is implemented for tuples up to twelve items long.

```rust
impl<T> PartialEq<(T,)> for (T₁, T₂, …, Tₙ)
where
  T: PartialEq<T> + ?Sized,
```



### impl\<T> PartialEq<Cell\<T>> for Cell\<T>

```rust
impl<T> PartialEq<Cell<T>> for Cell<T>
where
  T: PartialEq<T> + Copy,
```



### impl\<T> PartialEq<OnceCell\<T>> for OnceCell\<T>

```rust
impl<T> PartialEq<OnceCell<T>> for OnceCell<T>
where
  T: PartialEq<T>,
```



### impl\<T> PartialEq<RefCell\<T>> for RefCell\<T>

```rust
impl<T> PartialEq<RefCell<T>> for RefCell<T>
where
  T: PartialEq<T> + ?Sized,
```



### impl\<T> PartialEq<PhantomData\<T>> for PhantomData\<T>

```rust
impl<T> PartialEq<PhantomData<T>> for PhantomData<T>
where
  T: ?Sized,
```



### impl\<T> PartialEq<Discriminant\<T>> for Discriminant\<T>



### impl\<T> PartialEq<ManuallyDrop\<T>> for ManuallyDrop\<T>

```rust
impl<T> PartialEq<ManuallyDrop<T>> for ManuallyDrop<T>
where
  T: PartialEq<T> + ?Sized,
```



### impl\<T> PartialEq<Saturating\<T>> for Saturating\<T>

```rust
impl<T> PartialEq<Saturating<T>> for Saturating<T>
where
  T: PartialEq<T>,
```



### impl\<T> PartialEq<Wrapping\<T>> for Wrapping\<T>

```rust
impl<T> PartialEq<Wrapping<T>> for Wrapping<T>
where
  T: PartialEq<T>,
```



### impl\<T> PartialEq<NonNull\<T>> for NonNull\<T>

```rust
impl<T> PartialEq<NonNull<T>> for NonNull<T>
where
  T: ?Sized,
```



### impl\<T> PartialEq<Rc\<T>> for Rc\<T>

```rust
impl<T> PartialEq<Rc<T>> for Rc<T>
where
  T: PartialEq<T> + ?Sized,
```



### impl\<T> PartialEq<Arc\<T>> for Arc\<T>

```rust
impl<T> PartialEq<Arc<T>> for Arc<T>
where
  T: PartialEq<T> + ?Sized,
```



### impl\<T> PartialEq<Reverse\<T>> for Reverse\<T>

```rust
impl<T> PartialEq<Reverse<T>> for Reverse<T>
where
  T: PartialEq<T>,
```



### impl<T, A> PartialEq<Box<T, A>> for Box<T, A>

```rust
impl<T, A> PartialEq<Box<T, A>> for Box<T, A>
where
  T: PartialEq<T> + ?Sized,
  A: Allocator,
```



### impl<T, A> PartialEq<BTreeSet<T, A>> for BTreeSet<T, A>

```rust
impl<T, A> PartialEq<BTreeSet<T, A>> for BTreeSet<T, A>
where
  T: PartialEq<T>,
  A: Allocator + Clone,
```



### impl<T, A> PartialEq<LinkedList<T, A>> for LinkedList<T, A>

```rust
impl<T, A> PartialEq<LinkedList<T, A>> for LinkedList<T, A>
where
  T: PartialEq<T>,
  A: Allocator,
```



### impl<T, A> PartialEq<VecDeque<T, A>> for VecDeque<T, A>

```rust
impl<T, A> PartialEq<VecDeque<T, A>> for VecDeque<T, A>
where
  T: PartialEq<T>,
  A: Allocator,
```



### impl<T, E> PartialEq<Result<T, E>> for Result<T, E>

```rust
impl<T, E> PartialEq<Result<T, E>> for Result<T, E>
where
  T: PartialEq<T>,
  E: PartialEq<E>,
```



### impl<T, S> PartialEq<HashSet<T, S>> for HashSet<T, S>

```rust
impl<T, S> PartialEq<HashSet<T, S>> for HashSet<T, S>
where
  T: Eq + Hash,
  S: BuildHasher,
```



### impl<T, U> PartialEq<&[U]> for Cow<'_, [T]>

```rust
impl<T, U> PartialEq<&[U]> for Cow<'_, [T]>
where
  T: PartialEq<U> + Clone,
```



### impl<T, U> PartialEq<&mut [U]> for Cow<'_, [T]>

```rust
impl<T, U> PartialEq<&mut [U]> for Cow<'_, [T]>
where
  T: PartialEq<U> + Clone,
```



### impl\<'a, 'b> PartialEq\<String> for Cow\<'a, str>



### impl\<'a, 'b> PartialEq\<String> for str



### impl\<T, U, A1, A2> PartialEq\<Vec\<U, A2>> for Vec\<T, A1>

```rust
impl<T, U, A1, A2> PartialEq<Vec<U, A2>> for Vec<T, A1>
where
  A1: Allocator,
  A2: Allocator,
  T: PartialEq<U>,
```



### impl\<T, U, A> PartialEq\<&[U]> for VecDeque\<T, A>

```rust
impl<T, U, A> PartialEq<&[U]> for VecDeque<T, A>
where
  A: Allocator,
  T: PartialEq<U>,
```



### impl\<T, U, A> PartialEq\<&[U]> for Vec\<T, A>

```rust
impl<T, U, A> PartialEq<&[U]> for Vec<T, A>
where
  A: Allocator,
  T: PartialEq<U>,
```



### impl\<T, U, A> PartialEq\<&mut [U]> for VecDeque\<T, A>

```rust
impl<T, U, A> PartialEq<&mut [U]> for VecDeque<T, A>
where
  A: Allocator,
  T: PartialEq<U>,
```



### impl\<T, U, A> PartialEq\<&mut [U]> for Vec\<T, A>

```rust
impl<T, U, A> PartialEq<&mut [U]> for Vec<T, A>
where
  A: Allocator,
  T: PartialEq<U>,
```



### impl\<T, U, A> PartialEq\<[U]> for Vec\<T, A>

```rust
impl<T, U, A> PartialEq<[U]> for Vec<T, A>
where
  A: Allocator,
  T: PartialEq<U>,
```



### impl\<T, U, A> PartialEq\<Vec\<U, A>> for &[T]

```rust
impl<T, U, A> PartialEq<Vec<U, A>> for &[T]
where
  A: Allocator,
  T: PartialEq<U>,
```



### impl\<T, U, A> PartialEq\<Vec\<U, A>> for &mut [T]

```rust
impl<T, U, A> PartialEq<Vec<U, A>> for &mut [T]
where
  A: Allocator,
  T: PartialEq<U>,
```



### impl\<T, U, A> PartialEq\<Vec\<U, A>> for Cow\<'_, [T]>

```rust
impl<T, U, A> PartialEq<Vec<U, A>> for Cow<'_, [T]>
where
  A: Allocator,
  T: PartialEq<U> + Clone,
```



### impl\<T, U, A> PartialEq\<Vec\<U, A>> for [T]

```rust
impl<T, U, A> PartialEq<Vec<U, A>> for [T]
where
  A: Allocator,
  T: PartialEq<U>,
```



### impl\<T, U, A> PartialEq\<Vec\<U, A>> for VecDeque\<T, A>

```rust
impl<T, U, A> PartialEq<Vec<U, A>> for VecDeque<T, A>
where
  A: Allocator,
  T: PartialEq<U>,
```



### impl\<T, U, A, const N: usize> PartialEq\<&[U; N]> for VecDeque\<T, A>

```rust
impl<T, U, A, const N: usize> PartialEq<&[U; N]> for VecDeque<T, A>
where
  A: Allocator,
  T: PartialEq<U>,
```



### impl\<T, U, A, const N: usize> PartialEq\<&[U; N]> for Vec\<T, A>

```rust
impl<T, U, A, const N: usize> PartialEq<&[U; N]> for Vec<T, A>
where
  A: Allocator,
  T: PartialEq<U>,
```



### impl\<T, U, A, const N: usize> PartialEq\<&mut [U; N]> for VecDeque\<T, A>

```rust
impl<T, U, A, const N: usize> PartialEq<&mut [U; N]> for VecDeque<T, A>
where
  A: Allocator,
  T: PartialEq<U>,
```



### impl\<T, U, A, const N: usize> PartialEq\<[U; N]> for VecDeque\<T, A>impl\<T, U, A, const N: usize> PartialEq\<[U; N]> for Vec\<T, A>

```rust
impl<T, U, A, const N: usize> PartialEq<[U; N]> for Vec<T, A>
where
  A: Allocator,
  T: PartialEq<U>,
```



### impl\<T, const LANES: usize> PartialEq\<Mask\<T, LANES>> for Mask\<T, LANES>

```rust
impl<T, const LANES: usize> PartialEq<Mask<T, LANES>> for Mask<T, LANES>
where
  T: MaskElement + PartialEq<T>,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<T, const N: usize> PartialEq\<Simd\<T, N>> for Simd\<T, N>

```rust
impl<T, const N: usize> PartialEq<Simd\<T, N>> for Simd<T, N>
where
  LaneCount<N>: SupportedLaneCount,
  T: SimdElement + PartialEq<T>,
```

### impl\<T: PartialEq> PartialEq\<TrySendError\<T>> for TrySendError\<T>



### impl\<T: PartialEq> PartialEq\<Cursor\<T>> for Cursor\<T>



### impl\<T: PartialEq> PartialEq\<SendError\<T>> for SendError\<T>



### impl\<T: PartialEq> PartialEq\<OnceLock\<T>> for OnceLock\<T>



### impl\<Y, R> PartialEq\<GeneratorState\<Y, R>> for GeneratorState\<Y, R>

```rust
impl<Y, R> PartialEq<GeneratorState<Y, R>> for GeneratorState<Y, R>
where
  Y: PartialEq<Y>,
  R: PartialEq<R>,
```

### impl PartialEq\<LineColumn> for LineColumn

### impl PartialEq\<Punct> for char

### impl PartialEq\<char> for Punct

### impl PartialEq\<File> for File

### impl PartialEq\<Delimiter> for Delimiter

### impl PartialEq\<Spacing> for Spacing

### impl PartialEq\<Metric> for Metric

### impl PartialEq\<MetricMap> for MetricMap

### impl PartialEq\<TestTimeOptions> for TestTimeOptions

### impl PartialEq\<TestId> for TestId

### impl PartialEq\<TestName> for TestName

### impl PartialEq\<TestExecTime> for TestExecTime

### impl PartialEq\<BenchSamples> for BenchSamples

### impl PartialEq\<TestType> for TestType

### impl PartialEq\<Summary> for Summary

### impl PartialEq\<TestResult> for TestResult

### impl PartialEq\<RunIgnored> for RunIgnored

### impl PartialEq\<NamePadding> for NamePadding

### impl PartialEq\<OutputFormat> for OutputFormat

### impl PartialEq\<ShouldPanic> for ShouldPanic