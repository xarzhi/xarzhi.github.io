# Trait std::fmt::Display

空格式的格式 trait，`{}`。

```rust
pub trait Display {
    // Required method
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>;
}
```

**为一个类型实现这个 trait 将自动为该类型实现 `ToString` trait**，允许使用 `.to_string()` 方法。

`Display` 与 `Debug` 类似，但 `Display` 是面向用户的输出，因此无法导出。





## Required Methods

### fmt

使用给定的格式化程序格式化该值。

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```

**参数**：

- **f**：一个`Formatter`格式化读写对象对象，可以格式化上下文 + 输出目标

**返回值**：返回一个`Result`，若格式化错误则返回`Err`

```rust
use std::fmt;

struct Point {
    x: i32,
    y: i32,
}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

fn main() {
    let origin = Point { x: 0, y: 0 };
    println!("{}", origin);  // (0, 0)
}
```



## Implementors



### mpl Display for AsciiChar



### impl Display for Infallible



### impl Display for VarError



### impl Display for ErrorKind



### impl Display for IpAddr



### impl Display for SocketAddr



### impl Display for RecvTimeoutError



### impl Display for TryRecvError



### impl Display for bool



### impl Display for char



### impl Display for f32



### impl Display for f64



### impl Display for i8



### impl Display for i16



### impl Display for i32



### impl Display for i64



### impl Display for i128



### impl Display for isize



### impl Display for !



### impl Display for str



### impl Display for u8



### impl Display for u16



### impl Display for u32



### impl Display for u64



### impl Display for u128



### impl Display for usize



### impl Display for FromBytesUntilNulError



### impl Display for AllocError



### impl Display for LayoutError



### impl Display for TryFromSliceError

 

### impl Display for std::ascii::EscapeDefault



### impl Display for Backtrace



### impl Display for BorrowError



### impl Display for BorrowMutError



### impl Display for CharTryFromError



### impl Display for DecodeUtf16Error



### impl Display for std::char::EscapeDebug



### impl Display for std::char::EscapeDefault



### impl Display for std::char::EscapeUnicode



### impl Display for ParseCharError



### impl Display for ToLowercase



### impl Display for ToUppercase



### impl Display for TryFromCharError



### impl Display for TryReserveError



### impl Display for JoinPathsError

 

### impl Display for FromBytesWithNulError



### impl Display for FromVecWithNulError



### impl Display for IntoStringError



### impl Display for NulError



### impl Display for std::io::Error



### impl Display for WriterPanicked



### impl Display for AddrParseError



### impl Display for Ipv4Addr



### impl Display for Ipv6Addr

编写一个符合 RFC 5952 描述的规范样式的 Ivv6Addr。

### impl Display for SocketAddrV4



### impl Display for SocketAddrV6



### impl Display for NonZeroI8



### impl Display for NonZeroI16



### impl Display for NonZeroI32



### impl Display for NonZeroI64



### impl Display for NonZeroI128



### impl Display for NonZeroIsize



### impl Display for NonZeroU8



### impl Display for NonZeroU16



### impl Display for NonZeroU32



### impl Display for NonZeroU64



### impl Display for NonZeroU128



### impl Display for NonZeroUsize



### impl Display for ParseFloatError



### impl Display for ParseIntError



### impl Display for TryFromIntError



### impl Display for InvalidHandleError

`Available on Windows only.`

### impl Display for NullHandleError

`Available on Windows only.`

### impl Display for Location<'_>



### impl Display for PanicInfo<'_>



### impl Display for Display<'_>



### impl Display for StripPrefixError



### impl Display for ExitStatus



### impl Display for ExitStatusError



### impl Display for ParseBoolError



### impl Display for Utf8Error



### impl Display for FromUtf8Error



### impl Display for FromUtf16Error



### impl Display for String



### impl Display for RecvError



### impl Display for AccessError



### impl Display for SystemTimeError



### impl Display for TryFromFloatSecsError



### impl Display for Arguments<'_>



### impl Display for std::fmt::Error



### impl<'a> Display for EscapeAscii<'a>



### impl<'a> Display for std::str::EscapeDebug<'a>



### impl<'a> Display for std::str::EscapeDefault<'a>



### impl<'a> Display for std::str::EscapeUnicode<'a>



### impl<'a, K, V, A> Display for std::collections::btree_map::OccupiedError<'a, K, V, A>

```rust
impl<'a, K, V, A> Display for std::collections::btree_map::OccupiedError<'a, K, V, A>
where
  K: Debug + Ord,
  V: Debug,
  A: Allocator + Clone,
```



### impl<'a, K: Debug, V: Debug> Display for std::collections::hash_map::OccupiedError<'a, K, V>



### impl\<B> Display for Cow<'_, B>

```rust
impl<B> Display for Cow<'_, B>
where
  B: Display + ToOwned + ?Sized,
  <B as ToOwned>::Owned: Display,
```



### impl\<E> Display for Report\<E>

```rust
impl<E> Display for Report<E>
where
  E: Error,
```



### impl\<P> Display for Pin\<P>

```rust
impl<P> Display for Pin<P>
where
  P: Display,
```



### impl\<T> Display for TryLockError\<T>



### impl\<T> Display for TrySendError\<T>



### impl\<T> Display for &T

```rust
impl<T> Display for &T
where
  T: Display + ?Sized,
```



### impl\<T> Display for &mut T

```rust
impl<T> Display for &mut T
where
  T: Display + ?Sized,
```



### impl\<T> Display for ThinBox\<T>

```rust
impl<T> Display for ThinBox<T>
where
  T: Display + ?Sized,
```



### impl\<T> Display for Ref<'_, T>

```rust
impl<T> Display for Ref<'_, T>
where
  T: Display + ?Sized,
```



### impl\<T> Display for RefMut<'_, T>

```rust
impl<T> Display for RefMut<'_, T>
where
  T: Display + ?Sized,
```



### impl\<T> Display for Saturating\<T>

```rust
impl<T> Display for Saturating<T>
where
  T: Display,
```



### impl\<T> Display for Wrapping\<T>

```rust
impl<T> Display for Wrapping<T>
where
  T: Display,
```



### impl\<T> Display for Rc\<T>

```rust
impl<T> Display for Rc<T>
where
  T: Display + ?Sized,
```



### impl\<T> Display for SendError\<T>



### impl\<T> Display for Arc\<T>

```rust
impl<T> Display for Arc<T>
where
  T: Display + ?Sized,
```



### impl\<T> Display for PoisonError\<T>



### impl<T, A> Display for Box<T, A>

```rust
impl<T, A> Display for Box<T, A>
where
  T: Display + ?Sized,
  A: Allocator,
```



### impl<T: ?Sized + Display> Display for MutexGuard<'_, T>

### impl<T: ?Sized + Display> Display for RwLockReadGuard<'_, T>

### impl<T: ?Sized + Display> Display for RwLockWriteGuard<'_, T>

### impl\<W> Display for IntoInnerError\<W>

### impl\<const N: usize> Display for GetManyMutError\<N>

### impl Display for TokenStream

### impl Display for Group

### impl Display for Literal

### impl Display for Ident

### impl Display for LexError

### impl Display for Punct

### impl Display for ExpandError

### impl Display for TokenTree

### impl Display for TestExecTime

### impl Display for TestName