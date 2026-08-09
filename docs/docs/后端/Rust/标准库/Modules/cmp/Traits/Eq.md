# Trait std::cmp::Eq

等价关系 等式较的 Trait。

```rust
pub trait Eq: PartialEq<Self> { }
```

这意味着，除了 a == b 和 a != b 是严格的逆之外，相等必须是 (对于所有 a，b 和 c) ：

- 反射: `a == a`；
- 对称: `a == b` 表示 `b == a`； and
- 可传递的: `a == b` 和 `b == c` 表示 `a == c`。

编译器无法检查此属性，因此 `Eq` 表示 `PartialEq`，并且没有其他方法。



:::tip Derivable

该 trait 可以与 `#[derive]` 一起使用。 当 `derived' 时，由于 `Eq` 没有额外的方法，它只是通知编译器这是一个等价关系，而不是部分等价关系。

请注意，`derive` 策略要求所有字段均为 `Eq`，这并不总是需要的。

:::



### 如何实现 `Eq`？

如果您不能使用 `derive` 策略，请指定您的类型实现 `Eq`，它没有方法：

```rust
enum BookFormat { Paperback, Hardback, Ebook }
struct Book {
    isbn: i32,
    format: BookFormat,
}
impl PartialEq for Book {
    fn eq(&self, other: &Self) -> bool {
        self.isbn == other.isbn
    }
}
impl Eq for Book {}
```



## Implementors

### impl Eq for AsciiChar



### impl Eq for BacktraceStatus



### impl Eq for TryReserveErrorKind



### impl Eq for Infallible



### impl Eq for VarError



### impl Eq for std::fmt::Alignment



### impl Eq for ErrorKind



### impl Eq for SeekFrom



### impl Eq for IpAddr



### impl Eq for Ipv6MulticastScope



### impl Eq for Shutdown



### impl Eq for SocketAddr



### impl Eq for FpCategory



### impl Eq for IntErrorKind



### impl Eq for BacktraceStyle



### impl Eq for Which



### impl Eq for SearchStep



### impl Eq for std::sync::atomic::Ordering



### impl Eq for RecvTimeoutError



### impl Eq for TryRecvError



### impl Eq for std::cmp::Ordering



### impl Eq for bool



### impl Eq for char



### impl Eq for i8



### impl Eq for i16



### impl Eq for i32



### impl Eq for i64



### impl Eq for i128



### impl Eq for isize



### impl Eq for !



### impl Eq for str



### impl Eq for u8



### impl Eq for u16



### impl Eq for u32



### impl Eq for u64



### impl Eq for u128



### impl Eq for ()



### impl Eq for usize



### impl Eq for CpuidResult



### impl Eq for FromBytesUntilNulError



### impl Eq for AllocError



### impl Eq for Layout



### impl Eq for LayoutError



### impl Eq for TypeId



### impl Eq for CharTryFromError



### impl Eq for DecodeUtf16Error



### impl Eq for ParseCharError



### impl Eq for TryFromCharError



### impl Eq for TryReserveError



### impl Eq for CStr



### impl Eq for CString



### impl Eq for FromBytesWithNulError



### impl Eq for FromVecWithNulError



### impl Eq for IntoStringError



### impl Eq for NulError



### impl Eq for OsStr



### impl Eq for OsString



### impl Eq for Error



### impl Eq for FileType



### impl Eq for Permissions



### impl Eq for PhantomPinned



### impl Eq for Assume



### impl Eq for AddrParseError



### impl Eq for Ipv4Addr



### impl Eq for Ipv6Addr



### impl Eq for SocketAddrV4



### impl Eq for SocketAddrV6



### impl Eq for NonZeroI8



### impl Eq for NonZeroI16



### impl Eq for NonZeroI32



### impl Eq for NonZeroI64



### impl Eq for NonZeroI128



### impl Eq for NonZeroIsize



### impl Eq for NonZeroU8



### impl Eq for NonZeroU16



### impl Eq for NonZeroU32



### impl Eq for NonZeroU64



### impl Eq for NonZeroU128



### impl Eq for NonZeroUsize



### impl Eq for ParseFloatError



### impl Eq for ParseIntError



### impl Eq for TryFromIntError



### impl Eq for RangeFull



### impl Eq for UCred

`Available on Unix only.`



### impl Eq for InvalidHandleError

`Available on Windows only.`



### impl Eq for NullHandleError

`Available on Windows only.`



### impl Eq for Components<'_>



### impl Eq for Path



### impl Eq for PathBuf



### impl Eq for StripPrefixError



### impl Eq for ExitStatus



### impl Eq for ExitStatusError



### impl Eq for Output



### impl Eq for std::ptr::Alignment



### impl Eq for ParseBoolError



### impl Eq for Utf8Error



### impl Eq for FromUtf8Error



### impl Eq for String



### impl Eq for RecvError



### impl Eq for WaitTimeoutResult



### impl Eq for AccessError



### impl Eq for ThreadId



### impl Eq for Duration



### impl Eq for Instant



### impl Eq for SystemTime



### impl Eq for TryFromFloatSecsError



### impl<'a> Eq for Component<'a>



### impl<'a> Eq for Prefix<'a>



### impl<'a> Eq for Location<'a>



### impl<'a> Eq for PrefixComponent<'a>



### impl<'a> Eq for Utf8Chunk<'a>



### impl\<A> Eq for &A

```rust
impl<A> Eq for &A
where
  A: Eq + ?Sized,
```



### impl\<A> Eq for &mut A

```rust
impl<A> Eq for &mut A
where
  A: Eq + ?Sized,
```



### impl\<B> Eq for Cow<'_, B>

```rust
impl<B> Eq for Cow<'_, B>
where
  B: Eq + ToOwned + ?Sized,
```



### impl<B, C> Eq for ControlFlow<B, C>

```rust
impl<B, C> Eq for ControlFlow<B, C>
where
  B: Eq,
  C: Eq,
```



### impl\<Dyn> Eq for DynMetadata\<Dyn>

```rust
impl<Dyn> Eq for DynMetadata<Dyn>
where
  Dyn: ?Sized,
```



### impl\<F> Eq for F

```rust
impl<F> Eq for F
where
  F: FnPtr,
```



### impl\<H> Eq for BuildHasherDefault\<H>



### impl\<Idx> Eq for Range\<Idx>

```rust
impl<Idx> Eq for Range<Idx>
where
  Idx: Eq,
```



### impl\<Idx> Eq for RangeFrom\<Idx>

```rust
impl<Idx> Eq for RangeFrom<Idx>
where
  Idx: Eq,
```



### impl\<Idx> Eq for RangeInclusive\<Idx>

```rust
impl<Idx> Eq for RangeInclusive<Idx>
where
  Idx: Eq,
```



### impl\<Idx> Eq for RangeTo\<Idx>

```rust
impl<Idx> Eq for RangeTo<Idx>
where
  Idx: Eq,
```



### impl\<Idx> Eq for RangeToInclusive\<Idx>

```rust
impl<Idx> Eq for RangeToInclusive<Idx>
where
  Idx: Eq,
```



### impl<K, V, A> Eq for BTreeMap<K, V, A>

```rust
impl<K, V, A> Eq for BTreeMap<K, V, A>
where
  K: Eq,
  V: Eq,
  A: Allocator + Clone,
```



### impl<K, V, S> Eq for HashMap<K, V, S>

```rust
impl<K, V, S> Eq for HashMap<K, V, S>
where
  K: Eq + Hash,
  V: Eq,
  S: BuildHasher,
```



### impl\<P> Eq for Pin\<P>

```rust
impl<P> Eq for Pin<P>
where
  P: Deref,
  <P as Deref>::Target: Eq,
```



### impl\<T> Eq for Bound\<T>

```rust
impl<T> Eq for Bound<T>
where
  T: Eq,
```



### impl\<T> Eq for Option\<T>

```rust
impl<T> Eq for Option<T>
where
  T: Eq,
```



### impl\<T> Eq for Poll\<T>

```rust
impl<T> Eq for Poll<T>
where
  T: Eq,
```



### impl\<T> Eq for *const T

```rust
impl<T> Eq for *const T
where
  T: ?Sized,
```



### impl\<T> Eq for *mut T

```rust
impl<T> Eq for *mut T
where
  T: ?Sized,
```



### impl\<T> Eq for [T]

```rust
impl<T> Eq for [T]
where
  T: Eq,
```



### impl\<T> Eq for (T₁, T₂, …, Tₙ)

This trait is implemented for tuples up to twelve items long.

```rust
impl<T> Eq for (T₁, T₂, …, Tₙ)
where
  T: Eq + ?Sized,
```



### impl\<T> Eq for Cell\<T>

```rust
impl<T> Eq for Cell<T>
where
  T: Eq + Copy,
```



### impl\<T> Eq for OnceCell\<T>

```rust
impl<T> Eq for OnceCell<T>
where
  T: Eq,
```



### impl\<T> Eq for RefCell\<T>

```rust
impl<T> Eq for RefCell<T>
where
  T: Eq + ?Sized,
```



### impl\<T> Eq for PhantomData\<T>

```rust
impl<T> Eq for PhantomData<T>
where
  T: ?Sized,
```



### impl\<T> Eq for Discriminant\<T>



### impl\<T> Eq for ManuallyDrop\<T>

```rust
impl<T> Eq for ManuallyDrop<T>
where
  T: Eq + ?Sized,
```



### impl\<T> Eq for Saturating\<T>

```rust
impl<T> Eq for Saturating<T>
where
  T: Eq,
```



### impl\<T> Eq for Wrapping\<T>

```rust
impl<T> Eq for Wrapping<T>
where
  T: Eq,
```



### impl\<T> Eq for NonNull\<T>

```rust
impl<T> Eq for NonNull<T>
where
  T: ?Sized,
```



### impl\<T> Eq for Rc\<T>

```rust
impl<T> Eq for Rc<T>
where
  T: Eq + ?Sized,
```



### impl\<T> Eq for Arc\<T>

```rust
impl<T> Eq for Arc<T>
where
  T: Eq + ?Sized,
```



### impl\<T> Eq for Reverse\<T>

```rust
impl<T> Eq for Reverse<T>
where
  T: Eq,
```



### impl<T, A> Eq for Box<T, A>

```rust
impl<T, A> Eq for Box<T, A>
where
  T: Eq + ?Sized,
  A: Allocator,
```



### impl<T, A> Eq for BTreeSet<T, A>

```rust
impl<T, A> Eq for BTreeSet<T, A>
where
  T: Eq,
  A: Allocator + Clone,
```



### impl<T, A> Eq for LinkedList<T, A>

```rust
impl<T, A> Eq for LinkedList<T, A>
where
  T: Eq,
  A: Allocator,
```



### impl<T, A> Eq for VecDeque<T, A>

```rust
impl<T, A> Eq for VecDeque<T, A>
where
  T: Eq,
  A: Allocator,
```



### impl<T, A> Eq for Vec<T, A>

```rust
impl<T, A> Eq for Vec<T, A>
where
  T: Eq,
  A: Allocator,
```



### impl<T, E> Eq for Result<T, E>

```rust
impl<T, E> Eq for Result<T, E>
where
  T: Eq,
  E: Eq,
```



### impl<T, S> Eq for HashSet<T, S>

```rust
impl<T, S> Eq for HashSet<T, S>
where
  T: Eq + Hash,
  S: BuildHasher,
```



### impl<T, const N: usize> Eq for [T; N]

```rust
impl<T, const N: usize> Eq for [T; N]
where
  T: Eq,
```



### impl<T, const N: usize> Eq for Simd<T, N>

```rust
impl<T, const N: usize> Eq for Simd<T, N>
where
  LaneCount<N>: SupportedLaneCount,
  T: SimdElement + Eq,
```



### impl<T: Eq> Eq for TrySendError\<T>



### impl<T: Eq> Eq for Cursor\<T>



### impl<T: Eq> Eq for SendError\<T>



### impl<T: Eq> Eq for OnceLock\<T>



### impl<Y, R> Eq for GeneratorState<Y, R>

```rust
impl<Y, R> Eq for GeneratorState<Y, R>
where
  Y: Eq,
  R: Eq,
```

### impl Eq for Delimiter

### impl Eq for LineColumn

### impl Eq for Spacing

### impl Eq for File

### impl Eq for NamePadding

### impl Eq for TestName

### impl Eq for TestTimeOptions

### impl Eq for TestId

### impl Eq for TestType

### impl Eq for RunIgnored

### impl Eq for ShouldPanic

### impl Eq for OutputFormat