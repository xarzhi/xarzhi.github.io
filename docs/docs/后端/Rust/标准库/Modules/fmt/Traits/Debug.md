# Trait std::fmt::Debug

`?Sized`，用于不确定内存大小的类型的格式化

```RUST
pub trait Debug {
    // Required method
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>;
}
```

`Debug`常见用于于`struct`、`enum`等类型的输出打印，使用`#[derive(Debug)]`可以使自定义类型可打印

给类型添加`#[derive(Debug)]`宏后，使用`{:?}`占位符即可打印，使用`{:#?}`可以更美观、格式化的打印

```rust
#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let origin = Point { x: 0, y: 0 };

    println!("{:?}", origin); // Point { x: 0, y: 0 }

    println!("{:#?}", origin);
    /*
       Point {
           x: 0,
           y: 0,
       }
    */
}
```

或者手动为自己的类型实现`Debug` trait

```rust
use std::fmt;

struct Point {
    x: i32,
    y: i32,
}

impl fmt::Debug for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("Point")
            .field("x", &self.x)
            .field("y", &self.y)
            .finish()
    }
}

fn main() {
    let origin = Point { x: 0, y: 0 };

    println!("{:?}", origin); // Point { x: 0, y: 0 }

    println!("{:#?}", origin);
    /*
       Point {
           x: 0,
           y: 0,
       }
    */
}
```

[`Formatter`](../Structs/Formatter) 结构体上有许多辅助方法可以帮助您实现手动实现，例如 [`debug_struct`](../Structs/Formatter#debug_struct) 。

不希望使用 `Formatter` trait 提供的标准调试表示套件 (`debug_struct`、`debug_tuple`、`debug_list`、`debug_set`、`debug_map`) 的类型可以通过手动向 `Formatter` 写入任意表示来完成完全自定义的操作。

```rust
impl fmt::Debug for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Point [{} {}]", self.x, self.y)
    }
}
```

使用 `derive` 或[`Formatter`](../Structs/Formatter) 上的调试构建器 API 的 `Debug` 实现支持使用备用标志 `{:#?}` 的漂亮打印。

使用 `#?` 进行漂亮的打印：

```rust
#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

let origin = Point { x: 0, y: 0 };

assert_eq!(format!("The origin is: {origin:#?}"),
"The origin is: Point {
    x: 0,
    y: 0,
}");
```





## Required Methods

### fmt

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```

**参数**：

- **f**：一个`Formatter`格式化读写对象对象，可以格式化上下文 + 输出目标

**返回值**：返回一个`Result`，若格式化错误则返回`Err`

```rust
use std::fmt;

struct Position {
    longitude: f32,
    latitude: f32,
}

impl fmt::Debug for Position {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_tuple("")
         .field(&self.longitude)
         .field(&self.latitude)
         .finish()
    }
}

let position = Position { longitude: 1.987, latitude: 2.983 };

assert_eq!(format!("{position:?}"), "(1.987, 2.983)");

assert_eq!(format!("{position:#?}"), "(
    1.987,
    2.983,
)");
```



## Implementors

### impl Debug for AsciiChar



### impl Debug for BacktraceStatus



### impl Debug for std::cmp::Ordering



### impl Debug for TryReserveErrorKind



### impl Debug for Infallible



### impl Debug for VarError



### impl Debug for c_void



### impl Debug for ErrorKind



### impl Debug for SeekFrom



### impl Debug for IpAddr



### impl Debug for Ipv6MulticastScope



### impl Debug for Shutdown



### impl Debug for std::net::SocketAddr



### impl Debug for FpCategory



### impl Debug for IntErrorKind



### impl Debug for AncillaryError

`Available on (Android or Linux) and Unix only.`



### impl Debug for BacktraceStyle



### impl Debug for Which



### impl Debug for SearchStep



### impl Debug for std::sync::atomic::Ordering



### impl Debug for RecvTimeoutError



### impl Debug for TryRecvError



### impl Debug for std::fmt::Alignment



### impl Debug for bool



### impl Debug for char



### impl Debug for f32



### impl Debug for f64



### impl Debug for i8



### impl Debug for i16



### impl Debug for i32



### impl Debug for i64



### impl Debug for i128



### impl Debug for isize



### impl Debug for !



### impl Debug for str



### impl Debug for u8



### impl Debug for u16



### impl Debug for u32



### impl Debug for u64



### impl Debug for u128



### impl Debug for ()



### impl Debug for usize



### impl Debug for CpuidResult



### impl Debug for __m128



### impl Debug for __m128bh



### impl Debug for __m128d



### impl Debug for __m128i



### impl Debug for __m256



### impl Debug for __m256bh



### impl Debug for __m256d



### impl Debug for __m256i



### impl Debug for __m512



### impl Debug for __m512bh



### impl Debug for __m512d



### impl Debug for __m512i



### impl Debug for FromBytesUntilNulError



### impl Debug for TimSortRun



### impl Debug for AllocError



### impl Debug for Global



### impl Debug for Layout



### impl Debug for LayoutError



### impl Debug for System



### impl Debug for TypeId



### impl Debug for TryFromSliceError



### impl Debug for std::ascii::EscapeDefault



### impl Debug for Backtrace



### impl Debug for BacktraceFrame



### impl Debug for BorrowError



### impl Debug for BorrowMutError



### impl Debug for CharTryFromError



### impl Debug for DecodeUtf16Error



### impl Debug for std::char::EscapeDebug



### impl Debug for std::char::EscapeDefault



### impl Debug for std::char::EscapeUnicode



### impl Debug for ParseCharError



### impl Debug for ToLowercase



### impl Debug for ToUppercase



### impl Debug for TryFromCharError



### impl Debug for DefaultHasher



### impl Debug for RandomState



### impl Debug for TryReserveError



### impl Debug for Args



### impl Debug for ArgsOs



### impl Debug for JoinPathsError



### impl Debug for SplitPaths<'_>



### impl Debug for Vars



### impl Debug for VarsOs



### impl Debug for CStr



### impl Debug for CString



### impl Debug for FromBytesWithNulError



### impl Debug for FromVecWithNulError



### impl Debug for IntoStringError



### impl Debug for NulError



### impl Debug for OsStr



### impl Debug for OsString



### impl Debug for DirBuilder



### impl Debug for DirEntry



### impl Debug for File



### impl Debug for FileTimes



### impl Debug for FileType



### impl Debug for Metadata



### impl Debug for OpenOptions



### impl Debug for Permissions



### impl Debug for ReadDir



### impl Debug for SipHasher



### impl Debug for BorrowedBuf<'_>



### impl Debug for std::io::Empty



### impl Debug for std::io::Error



### impl Debug for std::io::Repeat



### impl Debug for Sink



### impl Debug for Stderr



### impl Debug for StderrLock<'_>



### impl Debug for Stdin



### impl Debug for StdinLock<'_>



### impl Debug for Stdout



### impl Debug for StdoutLock<'_>



### impl Debug for WriterPanicked



### impl Debug for PhantomPinned



### impl Debug for Assume



### impl Debug for AddrParseError



### impl Debug for IntoIncoming



### impl Debug for Ipv4Addr



### impl Debug for Ipv6Addr



### impl Debug for SocketAddrV4



### impl Debug for SocketAddrV6



### impl Debug for TcpListener



### impl Debug for TcpStream



### impl Debug for UdpSocket



### impl Debug for NonZeroI8



### impl Debug for NonZeroI16



### impl Debug for NonZeroI32



### impl Debug for NonZeroI64



### impl Debug for NonZeroI128



### impl Debug for NonZeroIsize



### impl Debug for NonZeroU8



### impl Debug for NonZeroU16



### impl Debug for NonZeroU32



### impl Debug for NonZeroU64



### impl Debug for NonZeroU128



### impl Debug for NonZeroUsize



### impl Debug for ParseFloatError



### impl Debug for ParseIntError



### impl Debug for TryFromIntError



### impl Debug for RangeFull



### impl Debug for BorrowedFd<'_>



### impl Debug for OwnedFd



### impl Debug for PidFd

`Available on Linux only.`



### impl Debug for std::os::unix::net::SocketAddr

`Available on Unix only.`



### impl Debug for UnixDatagram

`Available on Unix only.`



### impl Debug for UnixListener

`Available on Unix only.`



### impl Debug for UnixStream

`Available on Unix only.`



### impl Debug for UCred

`Available on Unix only.`



### impl Debug for BorrowedHandle<'_>

`Available on Windows only.`



### impl Debug for BorrowedSocket<'_>

`Available on Windows only.`



### impl Debug for HandleOrInvalid

`Available on Windows only.`



### impl Debug for HandleOrNull

`Available on Windows only.`



### impl Debug for InvalidHandleError

`Available on Windows only.`



### impl Debug for NullHandleError

`Available on Windows only.`



### impl Debug for OwnedHandle

`Available on Windows only.`



### impl Debug for OwnedSocket

`Available on Windows only.`



### impl Debug for Components<'_>



### impl Debug for Display<'_>



### impl Debug for std::path::Iter<'_>



### impl Debug for Path



### impl Debug for PathBuf



### impl Debug for StripPrefixError



### impl Debug for Child



### impl Debug for ChildStderr



### impl Debug for ChildStdin



### impl Debug for ChildStdout



### impl Debug for Command



### impl Debug for ExitCode



### impl Debug for ExitStatus



### impl Debug for ExitStatusError



### impl Debug for Output



### impl Debug for Stdio



### impl Debug for std::ptr::Alignment



### impl Debug for Chars<'_>



### impl Debug for EncodeUtf16<'_>



### impl Debug for ParseBoolError



### impl Debug for Utf8Chunks<'_>



### impl Debug for Utf8Error



### impl Debug for std::string::Drain<'_>



### impl Debug for FromUtf8Error



### impl Debug for FromUtf16Error



### impl Debug for String



### impl Debug for AtomicBool



### impl Debug for AtomicI8



### impl Debug for AtomicI16



### impl Debug for AtomicI32



### impl Debug for AtomicI64



### impl Debug for AtomicIsize



### impl Debug for AtomicU8



### impl Debug for AtomicU16



### impl Debug for AtomicU32



### impl Debug for AtomicU64



### impl Debug for AtomicUsize



### impl Debug for RecvError



### impl Debug for Barrier



### impl Debug for BarrierWaitResult



### impl Debug for Condvar



### impl Debug for std::sync::Once



### impl Debug for OnceState



### impl Debug for WaitTimeoutResult



### impl Debug for Context<'_>



### impl Debug for RawWaker



### impl Debug for RawWakerVTable



### impl Debug for Waker



### impl Debug for AccessError



### impl Debug for Builder



### impl Debug for Scope<'_, '_>



### impl Debug for Thread



### impl Debug for ThreadId



### impl Debug for Duration



### impl Debug for Instant



### impl Debug for SystemTime



### impl Debug for SystemTimeError



### impl Debug for TryFromFloatSecsError



### impl Debug for Arguments<'_>



### impl Debug for std::fmt::Error



### impl Debug for dyn Any + 'static



### impl Debug for dyn Any + Send + 'static



### impl Debug for dyn Any + Send + Sync + 'static



### impl<'a> Debug for Component<'a>



### impl<'a> Debug for Prefix<'a>



### impl<'a> Debug for <'a>



### impl<'a> Debug for Demand<'a>



### impl<'a> Debug for BorrowedCursor<'a>



### impl<'a> Debug for IoSlice<'a>



### impl<'a> Debug for IoSliceMut<'a>



### impl<'a> Debug for std::net::Incoming<'a>



### impl<'a> Debug for std::os::unix::net::Incoming<'a>

`Available on Unix only.`



### impl<'a> Debug for SocketAncillary<'a>

`Available on (Android or Linux) and Unix only.`



### impl<'a> Debug for Location<'a>



### impl<'a> Debug for PanicInfo<'a>



### impl<'a> Debug for Ancestors<'a>



### impl<'a> Debug for PrefixComponent<'a>



### impl<'a> Debug for CommandArgs<'a>



### impl<'a> Debug for CommandEnvs<'a>



### impl<'a> Debug for EscapeAscii<'a>



### impl<'a> Debug for CharSearcher<'a>



### impl<'a> Debug for std::str::Bytes<'a>



### impl<'a> Debug for CharIndices<'a>



### impl<'a> Debug for std::str::EscapeDebug<'a>



### impl<'a> Debug for std::str::EscapeDefault<'a>



### impl<'a> Debug for std::str::EscapeUnicode<'a>



### impl<'a> Debug for std::str::Lines<'a>



### impl<'a> Debug for LinesAny<'a>



### impl<'a> Debug for SplitAsciiWhitespace<'a>



### impl<'a> Debug for SplitWhitespace<'a>



### impl<'a> Debug for Utf8Chunk<'a>



### impl<'a, 'b> Debug for CharSliceSearcher<'a, 'b>



### impl<'a, 'b> Debug for StrSearcher<'a, 'b>



### impl<'a, 'b, const N: usize> Debug for CharArrayRefSearcher<'a, 'b, N>



### impl<'a, 'f> Debug for VaList<'a, 'f>

```rust
impl<'a, 'f> Debug for VaList<'a, 'f>
where
  'f: 'a,
```

### impl<'a, A> Debug for std::option::Iter<'a, A>

```rust
impl<'a, A> Debug for std::option::Iter<'a, A>
where
  A: Debug + 'a,
```

### impl<'a, A> Debug for std::option::IterMut<'a, A>

```rust
impl<'a, A> Debug for std::option::IterMut<'a, A>
where
  A: Debug + 'a,
```

### impl<'a, I> Debug for ByRefSized<'a, I>

```rust
impl<'a, I> Debug for ByRefSized<'a, I>
where
  I: Debug,
```

### impl<'a, I, A> Debug for Splice<'a, I, A>

```rust
impl<'a, I, A> Debug for Splice<'a, I, A>
where
  I: Debug + Iterator + 'a,
  A: Debug + Allocator + 'a,
  <I as Iterator>::Item: Debug,
```

### impl<'a, K, F> Debug for std::collections::hash_set::DrainFilter<'a, K, F>

```rust
impl<'a, K, F> Debug for std::collections::hash_set::DrainFilter<'a, K, F>
where
  F: FnMut(&K) -> bool,
```

### impl<'a, K, V, F> Debug for std::collections::hash_map::DrainFilter<'a, K, V, F>

```rust
impl<'a, K, V, F> Debug for std::collections::hash_map::DrainFilter<'a, K, V, F>
where
  F: FnMut(&K, &mut V) -> bool,
```

### impl<'a, P> Debug for MatchIndices<'a, P>

```rust
impl<'a, P> Debug for MatchIndices<'a, P>
where
  P: Pattern<'a>,
  <P as Pattern<'a>>::Searcher: Debug,
```

### impl<'a, P> Debug for Matches<'a, P>

```rust
impl<'a, P> Debug for Matches<'a, P>
where
  P: Pattern<'a>,
  <P as Pattern<'a>>::Searcher: Debug,
```

### impl<'a, P> Debug for RMatchIndices<'a, P>

```rust
impl<'a, P> Debug for RMatchIndices<'a, P>
where
  P: Pattern<'a>,
  <P as Pattern<'a>>::Searcher: Debug,
```

### impl<'a, P> Debug for RMatches<'a, P>

```rust
impl<'a, P> Debug for RMatches<'a, P>
where
  P: Pattern<'a>,
  <P as Pattern<'a>>::Searcher: Debug,
```

### impl<'a, P> Debug for std::str::RSplit<'a, P>

```rust
impl<'a, P> Debug for std::str::RSplit<'a, P>
where
  P: Pattern<'a>,
  <P as Pattern<'a>>::Searcher: Debug,
```

### impl<'a, P> Debug for std::str::RSplitN<'a, P>

```rust
impl<'a, P> Debug for std::str::RSplitN<'a, P>
where
  P: Pattern<'a>,
  <P as Pattern<'a>>::Searcher: Debug,
```

### impl<'a, P> Debug for RSplitTerminator<'a, P>

```rust
impl<'a, P> Debug for RSplitTerminator<'a, P>
where
  P: Pattern<'a>,
  <P as Pattern<'a>>::Searcher: Debug,
```

### impl<'a, P> Debug for std::str::Split<'a, P>

```rust
impl<'a, P> Debug for std::str::Split<'a, P>
where
  P: Pattern<'a>,
  <P as Pattern<'a>>::Searcher: Debug,
```

### impl<'a, P> Debug for std::str::SplitInclusive<'a, P>

```rust
impl<'a, P> Debug for std::str::SplitInclusive<'a, P>
where
  P: Pattern<'a>,
  <P as Pattern<'a>>::Searcher: Debug,
```

### impl<'a, P> Debug for std::str::SplitN<'a, P>

```rust
impl<'a, P> Debug for std::str::SplitN<'a, P>
where
  P: Pattern<'a>,
  <P as Pattern<'a>>::Searcher: Debug,
```

### impl<'a, P> Debug for SplitTerminator<'a, P>

```rust
impl<'a, P> Debug for SplitTerminator<'a, P>
where
  P: Pattern<'a>,
  <P as Pattern<'a>>::Searcher: Debug,
```

### impl<'a, T> Debug for std::collections::binary_heap::Drain<'a, T>

```rust
impl<'a, T> Debug for std::collections::binary_heap::Drain<'a, T>
where
  T: Debug + 'a,
```

### impl<'a, T> Debug for DrainSorted<'a, T>

```rust
impl<'a, T> Debug for DrainSorted<'a, T>
where
  T: Debug + Ord,
```

### impl<'a, T> Debug for std::collections::btree_set::Range<'a, T>

```rust
impl<'a, T> Debug for std::collections::btree_set::Range<'a, T>
where
  T: Debug + 'a,
```

### impl<'a, T> Debug for std::result::Iter<'a, T>

```rust
impl<'a, T> Debug for std::result::Iter<'a, T>
where
  T: Debug + 'a,
```

### impl<'a, T> Debug for std::result::IterMut<'a, T>

```rust
impl<'a, T> Debug for std::result::IterMut<'a, T>
where
  T: Debug + 'a,
```

### impl<'a, T> Debug for Chunks<'a, T>

```rust
impl<'a, T> Debug for Chunks<'a, T>
where
  T: Debug + 'a,
```

### impl<'a, T> Debug for ChunksExact<'a, T>

```rust
impl<'a, T> Debug for ChunksExact<'a, T>
where
  T: Debug + 'a,
```

### impl<'a, T> Debug for ChunksExactMut<'a, T>

```rust
impl<'a, T> Debug for ChunksExactMut<'a, T>
where
  T: Debug + 'a,
```

### impl<'a, T> Debug for ChunksMut<'a, T>

```rust
impl<'a, T> Debug for ChunksMut<'a, T>
where
  T: Debug + 'a,
```

### impl<'a, T> Debug for RChunks<'a, T>

```rust
impl<'a, T> Debug for RChunks<'a, T>
where
  T: Debug + 'a,
```

### impl<'a, T> Debug for RChunksExact<'a, T>

```rust
impl<'a, T> Debug for RChunksExact<'a, T>
where
  T: Debug + 'a,
```

### impl<'a, T> Debug for RChunksExactMut<'a, T>

```rust
impl<'a, T> Debug for RChunksExactMut<'a, T>
where
  T: Debug + 'a,
```

### impl<'a, T> Debug for RChunksMut<'a, T>

```rust
impl<'a, T> Debug for RChunksMut<'a, T>
where
  T: Debug + 'a,
```

### impl<'a, T> Debug for Windows<'a, T>

```rust
impl<'a, T> Debug for Windows<'a, T>
where
  T: Debug + 'a,
```

### impl<'a, T, F, A> Debug for std::vec::DrainFilter<'a, T, F, A>

```rust
impl<'a, T, F, A> Debug for std::vec::DrainFilter<'a, T, F, A>
where
  T: Debug,
  F: Debug + FnMut(&mut T) -> bool,
  A: Debug + Allocator,
```

### impl<'a, T, P> Debug for GroupBy<'a, T, P>

```rust
impl<'a, T, P> Debug for GroupBy<'a, T, P>
where
  T: 'a + Debug,
```

### impl<'a, T, P> Debug for GroupByMut<'a, T, P>

```rust
impl<'a, T, P> Debug for GroupByMut<'a, T, P>
where
  T: 'a + Debug,
```

### impl<'a, T, const N: usize> Debug for std::slice::ArrayChunks<'a, T, N>

```rust
impl<'a, T, const N: usize> Debug for std::slice::ArrayChunks<'a, T, N>
where
  T: Debug + 'a,
```

### impl<'a, T, const N: usize> Debug for ArrayChunksMut<'a, T, N>

```rust
impl<'a, T, const N: usize> Debug for ArrayChunksMut<'a, T, N>
where
  T: Debug + 'a,
```

### impl<'a, T, const N: usize> Debug for ArrayWindows<'a, T, N>

```rust
impl<'a, T, const N: usize> Debug for ArrayWindows<'a, T, N>
where
  T: Debug + 'a,
```



### impl<'a, T: Debug + 'a> Debug for std::sync::mpsc::Iter<'a, T>



### impl<'a, T: Debug + 'a> Debug for TryIter<'a, T>



### impl<'a, const N: usize> Debug for CharArraySearcher<'a, N>



### impl<'f> Debug for VaListImpl<'f>



### impl<'scope, T> Debug for ScopedJoinHandle<'scope, T>



### impl\<A> Debug for std::iter::Repeat\<A>

```rust
impl<A> Debug for std::iter::Repeat<A>
where
  A: Debug,
```

### impl\<A> Debug for std::option::IntoIter\<A>

```rust
impl<A> Debug for std::option::IntoIter<A>
where
  A: Debug,
```

### impl<A, B> Debug for std::iter::Chain<A, B>

```rust
impl<A, B> Debug for std::iter::Chain<A, B>
where
  A: Debug,
  B: Debug,
```

### impl<A, B> Debug for Zip<A, B>

```rust
impl<A, B> Debug for Zip<A, B>
where
  A: Debug,
  B: Debug,
```

### impl\<B> Debug for Cow<'_, B>

```rust
impl<B> Debug for Cow<'_, B>
where
  B: Debug + ToOwned + ?Sized,
  <B as ToOwned>::Owned: Debug,
```

### impl<B, C> Debug for ControlFlow<B, C>

```rust
impl<B, C> Debug for ControlFlow<B, C>
where
  B: Debug,
  C: Debug,
```

### impl<B: Debug> Debug for std::io::Lines\<B>



### impl<B: Debug> Debug for std::io::Split\<B>



### impl\<Dyn> Debug for DynMetadata\<Dyn>

```rust
impl<Dyn> Debug for DynMetadata<Dyn>
where
  Dyn: ?Sized,
```

### impl\<E> Debug for Report\<E>

```rust
impl<E> Debug for Report<E>
where
  Report<E>: Display,
```

### impl\<F> Debug for PollFn\<F>



### impl\<F> Debug for FromFn\<F>



### impl\<F> Debug for OnceWith\<F>



### impl\<F> Debug for RepeatWith\<F>



### impl\<F> Debug for CharPredicateSearcher<'_, F>

```rust
impl<F> Debug for CharPredicateSearcher<'_, F>
where
  F: FnMut(char) -> bool,
```

### impl\<F> Debug for F

```rust
impl<F> Debug for F
where
  F: FnPtr,
```



### impl\<H> Debug for BuildHasherDefault\<H>

### impl\<I> Debug for FromIter\<I>

```rust
impl<I> Debug for FromIter<I>
where
  I: Debug,
```



### impl\<I> Debug for DecodeUtf16\<I>

```rust
impl<I> Debug for DecodeUtf16<I>
where
  I: Debug + Iterator<Item = u16>,
```

### impl\<I> Debug for Cloned\<I>

```rust
impl<I> Debug for Cloned<I>
where
  I: Debug,
```

### impl\<I> Debug for Copied\<I>

```rust
impl<I> Debug for Copied<I>
where
  I: Debug,
```

### impl\<I> Debug for Cycle\<I>

```rust
impl<I> Debug for Cycle<I>
where
  I: Debug,
```

### impl\<I> Debug for Enumerate\<I>

```rust
impl<I> Debug for Enumerate<I>
where
  I: Debug,
```



### impl\<I> Debug for Fuse\<I>

```rust
impl<I> Debug for Fuse<I>
where
  I: Debug,
```

### impl\<I> Debug for Intersperse\<I>

```rust
impl<I> Debug for Intersperse<I>
where
  I: Debug + Iterator,
  <I as Iterator>::Item: Clone + Debug,
```

### impl\<I> Debug for Peekable\<I>

```rust
impl<I> Debug for Peekable<I>
where
  I: Debug + Iterator,
  <I as Iterator>::Item: Debug,
```

### impl\<I> Debug for Skip\<I>

```rust
impl<I> Debug for Skip<I>
where
  I: Debug,
```

### impl\<I> Debug for StepBy\<I>

```rust
impl<I> Debug for StepBy<I>
where
  I: Debug,
```

### impl\<I> Debug for std::iter::Take\<I>

```rust
impl<I> Debug for std::iter::Take<I>
where
  I: Debug,
```

### impl<I, F> Debug for FilterMap<I, F>

```rust
impl<I, F> Debug for FilterMap<I, F>
where
  I: Debug,
```

### impl<I, F> Debug for Inspect<I, F>

```rust
impl<I, F> Debug for Inspect<I, F>
where
  I: Debug,
```

### impl<I, F> Debug for Map<I, F>

```rust
impl<I, F> Debug for Map<I, F>
where
  I: Debug,
```

### impl<I, G> Debug for IntersperseWith<I, G>

```rust
impl<I, G> Debug for IntersperseWith<I, G>
where
  I: Iterator + Debug,
  <I as Iterator>::Item: Debug,
  G: Debug,
```

### impl<I, P> Debug for Filter<I, P>

```rust
impl<I, P> Debug for Filter<I, P>
where
  I: Debug,
```

### impl<I, P> Debug for MapWhile<I, P>

```rust
impl<I, P> Debug for MapWhile<I, P>
where
  I: Debug,
```

### impl<I, P> Debug for SkipWhile<I, P>

```rust
impl<I, P> Debug for SkipWhile<I, P>
where
  I: Debug,
```

### impl<I, P> Debug for TakeWhile<I, P>

```rust
impl<I, P> Debug for TakeWhile<I, P>
where
  I: Debug,
```

### impl<I, St, F> Debug for Scan<I, St, F>

```rust
impl<I, St, F> Debug for Scan<I, St, F>
where
  I: Debug,
  St: Debug,
```

### impl<I, U> Debug for Flatten\<I>

```rust
impl<I, U> Debug for Flatten<I>
where
  I: Debug + Iterator,
  <I as Iterator>::Item: IntoIterator<IntoIter = U, Item = <U as Iterator>::Item>,
  U: Debug + Iterator,
```

### impl<I, U, F> Debug for FlatMap<I, U, F>

```rust
impl<I, U, F> Debug for FlatMap<I, U, F>
where
  I: Debug,
  U: IntoIterator,
  <U as IntoIterator>::IntoIter: Debug,
```

### impl<I, const N: usize> Debug for std::iter::ArrayChunks<I, N>

```rust
impl<I, const N: usize> Debug for std::iter::ArrayChunks<I, N>
where
  I: Debug + Iterator,
  <I as Iterator>::Item: Debug,
```

### impl\<Idx> Debug for std::ops::Range\<Idx>

```rust
impl<Idx> Debug for std::ops::Range<Idx>
where
  Idx: Debug,
```

### impl\<Idx> Debug for RangeFrom\<Idx>

```rust
impl<Idx> Debug for RangeFrom<Idx>
where
  Idx: Debug,
```

### impl\<Idx> Debug for RangeInclusive\<Idx>

```rust
impl<Idx> Debug for RangeInclusive<Idx>
where
  Idx: Debug,
```

### impl\<Idx> Debug for RangeTo\<Idx>

```rust
impl<Idx> Debug for RangeTo<Idx>
where
  Idx: Debug,
```



### impl\<Idx> Debug for RangeToInclusive\<Idx>

```rust
impl<Idx> Debug for RangeToInclusive<Idx>
where
  Idx: Debug,
```



### impl<K, V> Debug for std::collections::btree_map::Cursor<'_, K, V>

```rust
impl<K, V> Debug for std::collections::btree_map::Cursor<'_, K, V>
where
  K: Debug,
  V: Debug,
```



### impl<K, V> Debug for std::collections::btree_map::Iter<'_, K, V>

```rust
impl<K, V> Debug for std::collections::btree_map::Iter<'_, K, V>
where
  K: Debug,
  V: Debug,
```



### impl<K, V> Debug for std::collections::btree_map::IterMut<'_, K, V>

```rust
impl<K, V> Debug for std::collections::btree_map::IterMut<'_, K, V>
where
  K: Debug,
  V: Debug,
```



### impl<K, V> Debug for std::collections::btree_map::Keys<'_, K, V>

```rust
impl<K, V> Debug for std::collections::btree_map::Keys<'_, K, V>
where
  K: Debug,
```



### impl<K, V> Debug for std::collections::btree_map::Range<'_, K, V>

```rust
impl<K, V> Debug for std::collections::btree_map::Range<'_, K, V>
where
  K: Debug,
  V: Debug,
```



### impl<K, V> Debug for RangeMut<'_, K, V>

```rust
impl<K, V> Debug for RangeMut<'_, K, V>
where
  K: Debug,
  V: Debug,
```



### impl<K, V> Debug for std::collections::btree_map::Values<'_, K, V>

```rust
impl<K, V> Debug for std::collections::btree_map::Values<'_, K, V>
where
  V: Debug,
```



### impl<K, V> Debug for std::collections::btree_map::ValuesMut<'_, K, V>

```rust
impl<K, V> Debug for std::collections::btree_map::ValuesMut<'_, K, V>
where
  V: Debug,
```



### impl<K, V> Debug for std::collections::hash_map::Drain<'_, K, V>

```rust
impl<K, V> Debug for std::collections::hash_map::Drain<'_, K, V>
where
  K: Debug,
  V: Debug,
```



### impl<K, V> Debug for std::collections::hash_map::IterMut<'_, K, V>

```rust
impl<K, V> Debug for std::collections::hash_map::IterMut<'_, K, V>
where
  K: Debug,
  V: Debug,
```



### impl<K, V, A> Debug for std::collections::btree_map::Entry<'_, K, V, A>

```rust
impl<K, V, A> Debug for std::collections::btree_map::Entry<'_, K, V, A>
where
  K: Debug + Ord,
  V: Debug,
  A: Allocator + Clone,
```



### impl<K, V, A> Debug for std::collections::btree_map::CursorMut<'_, K, V, A>

```rust
impl<K, V, A> Debug for std::collections::btree_map::CursorMut<'_, K, V, A>
where
  K: Debug,
  V: Debug,
```



### impl<K, V, A> Debug for std::collections::btree_map::IntoIter<K, V, A>

```rust
impl<K, V, A> Debug for std::collections::btree_map::IntoIter<K, V, A>
where
  K: Debug,
  V: Debug,
  A: Allocator + Clone,
```



### impl<K, V, A> Debug for std::collections::btree_map::IntoKeys<K, V, A>

```rust
impl<K, V, A> Debug for std::collections::btree_map::IntoKeys<K, V, A>
where
  K: Debug,
  A: Allocator + Clone,
```



### impl<K, V, A> Debug for std::collections::btree_map::IntoValues<K, V, A>

```rust
impl<K, V, A> Debug for std::collections::btree_map::IntoValues<K, V, A>
where
  V: Debug,
  A: Allocator + Clone,
```



### impl<K, V, A> Debug for std::collections::btree_map::OccupiedEntry<'_, K, V, A>

```rust
impl<K, V, A> Debug for std::collections::btree_map::OccupiedEntry<'_, K, V, A>
where
  K: Debug + Ord,
  V: Debug,
  A: Allocator + Clone,
```



### impl<K, V, A> Debug for std::collections::btree_map::OccupiedError<'_, K, V, A>

```rust
impl<K, V, A> Debug for std::collections::btree_map::OccupiedError<'_, K, V, A>
where
  K: Debug + Ord,
  V: Debug,
  A: Allocator + Clone,
```



### impl<K, V, A> Debug for std::collections::btree_map::VacantEntry<'_, K, V, A>

```rust
impl<K, V, A> Debug for std::collections::btree_map::VacantEntry<'_, K, V, A>
where
  K: Debug + Ord,
  A: Allocator + Clone,
```



### impl<K, V, A> Debug for BTreeMap<K, V, A>

```rust
impl<K, V, A> Debug for BTreeMap<K, V, A>
where
  K: Debug,
  V: Debug,
  A: Allocator + Clone,
```



### impl<K, V, F> Debug for std::collections::btree_map::DrainFilter<'_, K, V, F, Global>

```rust
impl<K, V, F> Debug for std::collections::btree_map::DrainFilter<'_, K, V, F, Global>
where
  K: Debug,
  V: Debug,
  F: FnMut(&K, &mut V) -> bool,
```



### impl<K, V, S> Debug for HashMap<K, V, S>

```rust
impl<K, V, S> Debug for HashMap<K, V, S>
where
  K: Debug,
  V: Debug,
```



### impl<K, V, S> Debug for RawEntryBuilder<'_, K, V, S>



### impl<K, V, S> Debug for RawEntryBuilderMut<'_, K, V, S>



### impl<K, V, S> Debug for RawVacantEntryMut<'_, K, V, S>



### impl<K, V: Debug> Debug for std::collections::hash_map::IntoValues<K, V>



### impl<K, V: Debug> Debug for std::collections::hash_map::Values<'_, K, V>



### impl<K, V: Debug> Debug for std::collections::hash_map::ValuesMut<'_, K, V>



### impl<K: Debug> Debug for std::collections::hash_set::Drain<'_, K>



### impl<K: Debug> Debug for std::collections::hash_set::IntoIter\<K>



### impl<K: Debug> Debug for std::collections::hash_set::Iter<'_, K>



### impl<K: Debug, V> Debug for std::collections::hash_map::IntoKeys<K, V>



### impl<K: Debug, V> Debug for std::collections::hash_map::Keys<'_, K, V>



### impl<K: Debug, V> Debug for std::collections::hash_map::VacantEntry<'_, K, V>



### impl<K: Debug, V: Debug> Debug for std::collections::hash_map::Entry<'_, K, V>



### impl<K: Debug, V: Debug> Debug for std::collections::hash_map::IntoIter<K, V>



### impl<K: Debug, V: Debug> Debug for std::collections::hash_map::Iter<'_, K, V>



### impl<K: Debug, V: Debug> Debug for std::collections::hash_map::OccupiedEntry<'_, K, V>



### impl<K: Debug, V: Debug> Debug for std::collections::hash_map::OccupiedError<'_, K, V>



### impl<K: Debug, V: Debug, S> Debug for RawEntryMut<'_, K, V, S>



### impl<K: Debug, V: Debug, S> Debug for RawOccupiedEntryMut<'_, K, V, S>



### impl\<P> Debug for Pin\<P>

```rust
impl<P> Debug for Pin<P>
where
  P: Debug,
```

### impl\<R> Debug for BufReader\<R>

```rust
impl<R> Debug for BufReader<R>
where
  R: Debug,
```





### impl<R: Debug> Debug for std::io::Bytes\<R>



### impl\<T> Debug for Bound\<T>

```rust
impl<T> Debug for Bound<T>
where
  T: Debug,
```

### impl\<T> Debug for Option\<T>

```rust
impl<T> Debug for Option<T>
where
  T: Debug,
```



### impl\<T> Debug for TryLockError\<T>



### impl\<T> Debug for TrySendError\<T>



### impl\<T> Debug for Poll\<T>

```rust
impl<T> Debug for Poll<T>
where
  T: Debug,
```

### impl\<T> Debug for *const T

```rust
impl<T> Debug for *const T
where
  T: ?Sized,
```

### impl\<T> Debug for *mut T

```rust
impl<T> Debug for *mut T
where
  T: ?Sized,
```

### impl\<T> Debug for &T

```rust
impl<T> Debug for &T
where
  T: Debug + ?Sized,
```

### impl\<T> Debug for &mut T

```rust
impl<T> Debug for &mut T
where
  T: Debug + ?Sized,
```

### impl\<T> Debug for [T]

```rust
impl<T> Debug for [T]
where
  T: Debug,
```



### impl\<T> Debug for (T₁, T₂, …, Tₙ)

This trait is implemented for tuples up to twelve items long.

```rust
impl<T> Debug for (T₁, T₂, …, Tₙ)
where
  T: Debug + ?Sized,
```



### impl\<T> Debug for ThinBox\<T>

```rust
impl<T> Debug for ThinBox<T>
where
  T: Debug + ?Sized,
```

### impl\<T> Debug for Cell\<T>

```rust
impl<T> Debug for Cell<T>
where
  T: Copy + Debug,
```

### impl\<T> Debug for OnceCell\<T>

```rust
impl<T> Debug for OnceCell<T>
where
  T: Debug,
```

### impl\<T> Debug for Ref<'_, T>

```rust
impl<T> Debug for Ref<'_, T>
where
  T: Debug + ?Sized,
```

### impl\<T> Debug for RefCell\<T>

```rust
impl<T> Debug for RefCell<T>
where
  T: Debug + ?Sized,
```

### impl\<T> Debug for RefMut<'_, T>

```rust
impl<T> Debug for RefMut<'_, T>
where
  T: Debug + ?Sized,
```

### impl\<T> Debug for SyncUnsafeCell\<T>

```rust
impl<T> Debug for SyncUnsafeCell<T>
where
  T: ?Sized,
```

### impl\<T> Debug for UnsafeCell\<T>

```rust
impl<T> Debug for UnsafeCell<T>
where
  T: ?Sized,
```

### impl\<T> Debug for Reverse\<T>

```rust
impl<T> Debug for Reverse<T>
where
  T: Debug,
```

### impl\<T> Debug for std::collections::binary_heap::IntoIter\<T>

```rust
impl<T> Debug for std::collections::binary_heap::IntoIter<T>
where
  T: Debug,
```

### impl\<T> Debug for IntoIterSorted\<T>

```rust
impl<T> Debug for IntoIterSorted<T>
where
  T: Debug,
```

### impl\<T> Debug for std::collections::binary_heap::Iter<'_, T>

```rust
impl<T> Debug for std::collections::binary_heap::Iter<'_, T>
where
  T: Debug,
```

### impl\<T> Debug for PeekMut<'_, T>

```rust
impl<T> Debug for PeekMut<'_, T>
where
  T: Ord + Debug,
```

### impl\<T> Debug for std::collections::btree_set::Iter<'_, T>

```rust
impl<T> Debug for std::collections::btree_set::Iter<'_, T>
where
  T: Debug,
```

### impl\<T> Debug for std::collections::btree_set::SymmetricDifference<'_, T>

```rust
impl<T> Debug for std::collections::btree_set::SymmetricDifference<'_, T>
where
  T: Debug,
```

### impl\<T> Debug for std::collections::btree_set::Union<'_, T>

```rust
impl<T> Debug for std::collections::btree_set::Union<'_, T>
where
  T: Debug,
```

### impl\<T> Debug for std::collections::linked_list::Iter<'_, T>

```rust
impl<T> Debug for std::collections::linked_list::Iter<'_, T>
where
  T: Debug,
```

### impl\<T> Debug for std::collections::linked_list::IterMut<'_, T>

```rust
impl<T> Debug for std::collections::linked_list::IterMut<'_, T>
where
  T: Debug,
```



### impl\<T> Debug for BinaryHeap\<T>

```rust
impl<T> Debug for BinaryHeap<T>
where
  T: Debug,
```



### impl\<T> Debug for std::collections::vec_deque::Iter<'_, T>

```rust
impl<T> Debug for std::collections::vec_deque::Iter<'_, T>
where
  T: Debug,
```



### impl\<T> Debug for std::collections::vec_deque::IterMut<'_, T>

```rust
impl<T> Debug for std::collections::vec_deque::IterMut<'_, T>
where
  T: Debug,
```



### impl\<T> Debug for Pending\<T>



### impl\<T> Debug for Ready\<T>

```rust
impl<T> Debug for Ready<T>
where
  T: Debug,
```



### impl\<T> Debug for std::iter::Empty\<T>



### impl\<T> Debug for std::iter::Once\<T>

```rust
impl<T> Debug for std::iter::Once<T>
where
  T: Debug,
```



### impl\<T> Debug for Rev\<T>

```rust
impl<T> Debug for Rev<T>
where
  T: Debug,
```



### impl\<T> Debug for PhantomData\<T>

```rust
impl<T> Debug for PhantomData<T>
where
  T: ?Sized,
```



### impl\<T> Debug for Discriminant\<T>



### impl\<T> Debug for ManuallyDrop\<T>

```rust
impl<T> Debug for ManuallyDrop<T>
where
  T: Debug + ?Sized,
```



### impl\<T> Debug for Saturating\<T>

```rust
impl<T> Debug for Saturating<T>
where
  T: Debug,
```



### impl\<T> Debug for Wrapping\<T>

```rust
impl<T> Debug for Wrapping<T>
where
  T: Debug,
```



### impl\<T> Debug for Yeet\<T>

```rust
impl<T> Debug for Yeet<T>
where
  T: Debug,
```



### impl\<T> Debug for AssertUnwindSafe\<T>

```rust
impl<T> Debug for AssertUnwindSafe<T>
where
  T: Debug,
```



### impl\<T> Debug for NonNull\<T>

```rust
impl<T> Debug for NonNull<T>
where
  T: ?Sized,
```



### impl\<T> Debug for Rc\<T>

```rust
impl<T> Debug for Rc<T>
where
  T: Debug + ?Sized,
```



### impl\<T> Debug for std::rc::Weak\<T>

```rust
impl<T> Debug for std::rc::Weak<T>
where
  T: ?Sized,
```



### impl\<T> Debug for std::result::IntoIter\<T>

```rust
impl<T> Debug for std::result::IntoIter<T>
where
  T: Debug,
```



### impl\<T> Debug for std::slice::Iter<'_, T>

```rust
impl<T> Debug for std::slice::Iter<'_, T>
where
  T: Debug,
```



### impl\<T> Debug for std::slice::IterMut<'_, T>

```rust
impl<T> Debug for std::slice::IterMut<'_, T>
where
  T: Debug,
```



### impl\<T> Debug for AtomicPtr\<T>



### impl\<T> Debug for Receiver\<T>



### impl\<T> Debug for SendError\<T>



### impl\<T> Debug for Sender\<T>



### impl\<T> Debug for SyncSender\<T>



### impl\<T> Debug for Arc\<T>

```rust
impl<T> Debug for Arc<T>
where
  T: Debug + ?Sized,
```



### impl\<T> Debug for Exclusive\<T>

```rust
impl<T> Debug for Exclusive<T>
where
  T: ?Sized,
```



### impl\<T> Debug for PoisonError\<T>



### impl\<T> Debug for std::sync::Weak\<T>

```rust
impl<T> Debug for std::sync::Weak<T>
where
  T: ?Sized,
```



### impl\<T> Debug for JoinHandle\<T>



### impl\<T> Debug for MaybeUninit\<T>



### impl<T, A> Debug for Box<T, A>

```rust
impl<T, A> Debug for Box<T, A>
where
  T: Debug + ?Sized,
  A: Allocator,
```



### impl<T, A> Debug for std::collections::btree_set::Difference<'_, T, A>

```rust
impl<T, A> Debug for std::collections::btree_set::Difference<'_, T, A>
where
  T: Debug,
  A: Allocator + Clone,
```



### impl<T, A> Debug for std::collections::btree_set::Intersection<'_, T, A>

```rust
impl<T, A> Debug for std::collections::btree_set::Intersection<'_, T, A>
where
  T: Debug,
  A: Allocator + Clone,
```



### impl<T, A> Debug for std::collections::btree_set::IntoIter<T, A>

```rust
impl<T, A> Debug for std::collections::btree_set::IntoIter<T, A>
where
  T: Debug,
  A: Debug + Allocator + Clone,
```



### impl<T, A> Debug for std::collections::linked_list::Cursor<'_, T, A>

```rust
impl<T, A> Debug for std::collections::linked_list::Cursor<'_, T, A>
where
  T: Debug,
  A: Allocator,
```



### impl<T, A> Debug for std::collections::linked_list::CursorMut<'_, T, A>

```rust
impl<T, A> Debug for std::collections::linked_list::CursorMut<'_, T, A>
where
  T: Debug,
  A: Allocator,
```



### impl<T, A> Debug for std::collections::linked_list::IntoIter<T, A>

```rust
impl<T, A> Debug for std::collections::linked_list::IntoIter<T, A>
where
  T: Debug,
  A: Allocator,
```



### impl<T, A> Debug for BTreeSet<T, A>

```rust
impl<T, A> Debug for BTreeSet<T, A>
where
  T: Debug,
  A: Allocator + Clone,
```



### impl<T, A> Debug for LinkedList<T, A>

```rust
impl<T, A> Debug for LinkedList<T, A>
where
  T: Debug,
  A: Allocator,
```



### impl<T, A> Debug for VecDeque<T, A>

```rust
impl<T, A> Debug for VecDeque<T, A>
where
  T: Debug,
  A: Allocator,
```



### impl<T, A> Debug for std::collections::vec_deque::Drain<'_, T, A>

```rust
impl<T, A> Debug for std::collections::vec_deque::Drain<'_, T, A>
where
  T: Debug,
  A: Allocator,
```



### impl<T, A> Debug for std::collections::vec_deque::IntoIter<T, A>

```rust
impl<T, A> Debug for std::collections::vec_deque::IntoIter<T, A>
where
  T: Debug,
  A: Allocator,
```



### impl<T, A> Debug for std::vec::Drain<'_, T, A>

```rust
impl<T, A> Debug for std::vec::Drain<'_, T, A>
where
  T: Debug,
  A: Allocator,
```



### impl<T, A> Debug for std::vec::IntoIter<T, A>

```rust
impl<T, A> Debug for std::vec::IntoIter<T, A>
where
  T: Debug,
  A: Allocator,
```



### impl<T, A> Debug for Vec<T, A>

```rust
impl<T, A> Debug for Vec<T, A>
where
  T: Debug,
  A: Allocator,
```



### impl<T, E> Debug for Result<T, E>

```rust
impl<T, E> Debug for Result<T, E>
where
  T: Debug,
  E: Debug,
```



### impl<T, F> Debug for LazyCell<T, F>

```rust
impl<T, F> Debug for LazyCell<T, F>
where
  T: Debug,
```



### impl<T, F> Debug for std::collections::linked_list::DrainFilter<'_, T, F, Global>

```rust
impl<T, F> Debug for std::collections::linked_list::DrainFilter<'_, T, F, Global>
where
  T: Debug,
  F: FnMut(&mut T) -> bool,
```



### impl<T, F> Debug for Successors<T, F>

```rust
impl<T, F> Debug for Successors<T, F>
where
  T: Debug,
```



### impl<T, F, A> Debug for std::collections::btree_set::DrainFilter<'_, T, F, A>

```rust
impl<T, F, A> Debug for std::collections::btree_set::DrainFilter<'_, T, F, A>
where
  A: Allocator + Clone,
  T: Debug,
  F: FnMut(&T) -> bool,
```



### impl<T, P> Debug for std::slice::RSplit<'_, T, P>

```rust
impl<T, P> Debug for std::slice::RSplit<'_, T, P>
where
  T: Debug,
  P: FnMut(&T) -> bool,
```



### impl<T, P> Debug for RSplitMut<'_, T, P>

```rust
impl<T, P> Debug for RSplitMut<'_, T, P>
where
  T: Debug,
  P: FnMut(&T) -> bool,
```



### impl<T, P> Debug for std::slice::RSplitN<'_, T, P>

```rust
impl<T, P> Debug for std::slice::RSplitN<'_, T, P>
where
  T: Debug,
  P: FnMut(&T) -> bool,
```



### impl<T, P> Debug for RSplitNMut<'_, T, P>

```rust
impl<T, P> Debug for RSplitNMut<'_, T, P>
where
  T: Debug,
  P: FnMut(&T) -> bool,
```



### impl<T, P> Debug for std::slice::Split<'_, T, P>

```rust
impl<T, P> Debug for std::slice::Split<'_, T, P>
where
  T: Debug,
  P: FnMut(&T) -> bool,
```



### impl<T, P> Debug for std::slice::SplitInclusive<'_, T, P>

```rust
impl<T, P> Debug for std::slice::SplitInclusive<'_, T, P>
where
  T: Debug,
  P: FnMut(&T) -> bool,
```



### impl<T, P> Debug for SplitInclusiveMut<'_, T, P>

```rust
impl<T, P> Debug for SplitInclusiveMut<'_, T, P>
where
  T: Debug,
  P: FnMut(&T) -> bool,
```



### impl<T, P> Debug for SplitMut<'_, T, P>

```rust
impl<T, P> Debug for SplitMut<'_, T, P>
where
  T: Debug,
  P: FnMut(&T) -> bool,
```



### impl<T, P> Debug for std::slice::SplitN<'_, T, P>

```rust
impl<T, P> Debug for std::slice::SplitN<'_, T, P>
where
  T: Debug,
  P: FnMut(&T) -> bool,
```



### impl<T, P> Debug for SplitNMut<'_, T, P>

```rust
impl<T, P> Debug for SplitNMut<'_, T, P>
where
  T: Debug,
  P: FnMut(&T) -> bool,
```



### impl<T, S> Debug for std::collections::hash_set::Difference<'_, T, S>

```rust
impl<T, S> Debug for std::collections::hash_set::Difference<'_, T, S>
where
  T: Debug + Eq + Hash,
  S: BuildHasher,
```



### impl<T, S> Debug for HashSet<T, S>

```rust
impl<T, S> Debug for HashSet<T, S>
where
  T: Debug,
```



### impl<T, S> Debug for std::collections::hash_set::Intersection<'_, T, S>

```rust
impl<T, S> Debug for std::collections::hash_set::Intersection<'_, T, S>
where
  T: Debug + Eq + Hash,
  S: BuildHasher,
```



### impl<T, S> Debug for std::collections::hash_set::SymmetricDifference<'_, T, S>

```rust
impl<T, S> Debug for std::collections::hash_set::SymmetricDifference<'_, T, S>
where
  T: Debug + Eq + Hash,
  S: BuildHasher,
```



### impl<T, S> Debug for std::collections::hash_set::Union<'_, T, S>

```rust
impl<T, S> Debug for std::collections::hash_set::Union<'_, T, S>
where
  T: Debug + Eq + Hash,
  S: BuildHasher,
```



### impl<T, const LANES: usize> Debug for Mask<T, LANES>

```rust
impl<T, const LANES: usize> Debug for Mask<T, LANES>
where
  T: MaskElement + Debug,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl<T, const LANES: usize> Debug for Simd<T, LANES>

```rust
impl<T, const LANES: usize> Debug for Simd<T, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
  T: SimdElement + Debug,
```



### impl<T, const N: usize> Debug for [T; N]

```rust
impl<T, const N: usize> Debug for [T; N]
where
  T: Debug,
```



### impl<T, const N: usize> Debug for std::array::IntoIter<T, N>

```rust
impl<T, const N: usize> Debug for std::array::IntoIter<T, N>
where
  T: Debug,
```



### impl<T: 'static> Debug for LocalKey\<T>



### impl<T: Debug> Debug for std::io::Cursor\<T>



### impl<T: Debug> Debug for std::io::Take\<T>



### impl<T: Debug> Debug for std::sync::mpsc::IntoIter\<T>



### impl<T: Debug> Debug for OnceLock\<T>



### impl<T: Debug> Debug for RwLockReadGuard<'_, T>



### impl<T: Debug> Debug for RwLockWriteGuard<'_, T>



### impl<T: Debug, F> Debug for LazyLock<T, F>



### impl<T: Debug, U: Debug> Debug for std::io::Chain<T, U>



### impl<T: ?Sized + Debug> Debug for Mutex\<T>



### impl<T: ?Sized + Debug> Debug for MutexGuard<'_, T>



### impl<T: ?Sized + Debug> Debug for RwLock\<T>



### impl\<W> Debug for BufWriter\<W>

```rust
impl<W> Debug for BufWriter<W>
where
  W: Debug + Write,
```



### impl\<W> Debug for LineWriter\<W>

```rust
impl<W> Debug for LineWriter<W>
where
  W: Debug + Write,
```



### impl<W: Debug> Debug for IntoInnerError\<W>



### impl<Y, R> Debug for GeneratorState<Y, R>

```rust
impl<Y, R> Debug for GeneratorState<Y, R>
where
  Y: Debug,
  R: Debug,
```



### impl\<const N: usize> Debug for GetManyMutError\<N>

### impl Debug for File

### impl Debug for Delimiter

### impl Debug for Span

### impl Debug for Diagnostic

### impl Debug for TokenStream

### impl Debug for TokenTree

### impl Debug for LineColumn

### impl Debug for Ident

### impl Debug for ExpandError

### impl Debug for LexError

### impl Debug for Spacing

### impl Debug for Level

### impl Debug for Literal

### impl Debug for Punct

### impl Debug for Group

### impl Debug for Metric

### impl Debug for ColorConfig

### impl Debug for Summary

### impl Debug for BenchSamples

### impl Debug for ShouldPanic

### impl Debug for TestDesc

### impl Debug for TestFn

### impl Debug for TestType

### impl Debug for OutputFormat

### impl Debug for Options

### impl Debug for TestOpts

### impl Debug for TestName

### impl Debug for TestResult

### impl Debug for RunIgnored

### impl Debug for NamePadding

### impl Debug for TestId

### impl Debug for TestExecTime

### impl Debug for TestTimeOptions

### impl Debug for TestDescAndFn