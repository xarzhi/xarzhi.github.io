# Trait std::convert::From

用于将`T`类型的值转化为`Self`类型的值，它是 `Into` 的倒数。

```rust
pub trait From<T>: Sized {
    // Required method
    fn from(value: T) -> Self;
}
```



:::tip

注意：此 trait 一定不能失败。`From` trait 旨在实现完美转换。 如果转换失败或不完美，使用 `TryFrom`。

:::



## 泛型实现

- `From<T>` for U 意味着 `Into<U>` for T
- `From` 是反射的，这意味着 `From<T>` for T 被实现



常见的有`&str`转化为`String`

```rust
let other_string = String::from("hello");
```

在执行错误处理时，通常对于您自己的错误类型实现 `From` 很有用。 通过将底层错误类型转换为封装底层错误类型的自定义错误类型，我们可以返回单个错误类型，而不会丢失有关底层原因的信息。 `?`运算符通过调用 `Into<CliError>::into` 自动将底层错误类型转换为我们的自定义错误类型，该 `Into<CliError>::into` 是在实现 `From` 时自动提供的。 然后，编译器会推断应使用 `Into` 的哪种实现。

```rust
use std::fs;
use std::io;
use std::num;

enum CliError {
    IoError(io::Error),
    ParseError(num::ParseIntError),
}

impl From<io::Error> for CliError {
    fn from(error: io::Error) -> Self {
        CliError::IoError(error)
    }
}

impl From<num::ParseIntError> for CliError {
    fn from(error: num::ParseIntError) -> Self {
        CliError::ParseError(error)
    }
}

fn open_and_parse_file(file_name: &str) -> Result<i32, CliError> {
    let mut contents = fs::read_to_string(&file_name)?;
    let num: i32 = contents.trim().parse()?;
    Ok(num)
}
```





## Required Methods

### from

从输入类型转换为此类型。

```rust
fn from(value: T) -> Self
```



## 为自定义类型实现From

```rust
struct People {
    name: String,
}
impl From<String> for People {
    fn from(value: String) -> Self {
        Self { name: value }
    }
}

impl From<&str> for People {
    fn from(value: &str) -> Self {
        Self {
            name: value.to_string(),
        }
    }
}

fn main() {
    let name = "ikun";
    let p1 = People::from(name);
    println!("{:#?}", p1.name); // "ikun"

    let name = String::from("xarzhi");
    let p2 = People::from(name);
    println!("{:#?}", p2.name); // "xarzhi"
}
```





## Implementors

### impl From\<&str> for Box\<str, Global>



### impl From\<&str> for Box\<dyn Error + 'static, Global>



### impl From\<&str> for Rc\<str>



### impl From\<&str> for String



### impl From\<&str> for Arc\<str>



### impl From\<&str> for Vec\<u8, Global>



### impl From\<&CStr> for Box\<CStr, Global>



### impl From\<&CStr> for CString



### impl From\<&CStr> for Rc\<CStr>



### impl From\<&CStr> for Arc\<CStr>



### impl From\<&OsStr> for Box\<OsStr>



### impl From\<&OsStr> for Rc\<OsStr>



### impl From\<&OsStr> for Arc\<OsStr>



### impl From\<&Path> for Box\<Path>



### impl From\<&Path> for Rc\<Path>



### impl From\<&Path> for Arc\<Path>



### impl From\<&String> for String



### impl From\<&mut str> for String



### impl From\<Cow\<'_, str>> for Box\<str, Global>



### impl From\<Cow\<'_, CStr>> for Box\<CStr, Global>



### impl From\<Cow\<'_, OsStr>> for Box\<OsStr>



### impl From\<Cow\<'_, Path>> for Box\<Path>



### impl From\<TryReserveErrorKind> for TryReserveError



### impl From\<ErrorKind> for Error

旨在用于未暴露给用户的错误，因为分配到堆上 (通过 Error::new 进行常规构建) 的代价太高了。



### impl From\<Infallible> for TryFromSliceError



### impl From\<Infallible> for TryFromIntError



### impl From\<bool> for f32



### impl From\<bool> for f64



### impl From\<bool> for i8



### impl From\<bool> for i16



### impl From\<bool> for i32



### impl From\<bool> for i64



### impl From\<bool> for i128



### impl From\<bool> for isize



### impl From\<bool> for u8



### impl From\<bool> for u16



### impl From\<bool> for u32



### impl From\<bool> for u64



### impl From\<bool> for u128



### impl From\<bool> for usize



### impl From\<bool> for AtomicBool



### impl From\<char> for u32



### impl From\<char> for u64



### impl From\<char> for u128



### impl From\<char> for String



### impl From\<f32> for f64



### impl From\<i8> for f32



### impl From\<i8> for f64



### impl From\<i8> for i16



### impl From\<i8> for i32



### impl From\<i8> for i64



### impl From\<i8> for i128



### impl From\<i8> for isize



### impl From\<i8> for AtomicI8



### impl From\<i16> for f32



### impl From\<i16> for f64



### impl From\<i16> for i32



### impl From\<i16> for i64



### impl From\<i16> for i128



### impl From\<i16> for isize



### impl From\<i16> for AtomicI16



### impl From\<i32> for f64



### impl From\<i32> for i64



### impl From\<i32> for i128



### impl From\<i32> for AtomicI32



### impl From\<i64> for i128



### impl From\<i64> for AtomicI64



### impl From\<isize> for AtomicIsize



### impl From\<!> for Infallible



### impl From\<!> for TryFromIntError



### impl From\<u8> for char

将 0x00..=0xFF 中的字节映射到 char，该 char 的代码点具有相同的值，即 U+0000..=U+00FF。

Unicode 的设计使其可以使用 IANA 称为 ISO-8859-1 的字符编码有效地解码字节。 此编码与 ASCII 兼容。

请注意，这与 ISO/IEC 8859-1 又名不同 ISO 8859-1 (连字符少一个)，它留下了一些 “blanks” 字节值，这些值未分配给任何字符。 ISO-8859-1 (属于 IANA) 将它们分配给 C0 和 C1 控制代码。

请注意，这也与 Windows-1252 也不同 代码页 1252，它是 ISO/IEC 8859-1 的超集，它为标点符号和各种拉丁字符分配了一些 (不是全部) 空格。

为了进一步混淆，在 Web 上 ascii，iso-8859-1 和 windows-1252 都是 Windows-1252 超集的别名，该超集用相应的 C0 和 C1 控制代码填充了其余的空白。

### 



### impl From\<u8> for f32



### impl From\<u8> for f64



### impl From\<u8> for i16



### impl From\<u8> for i32



### impl From\<u8> for i64



### impl From\<u8> for i128



### impl From\<u8> for isize



### impl From\<u8> for u16



### impl From\<u8> for u32



### impl From\<u8> for u64



### impl From\<u8> for u128



### impl From\<u8> for usize



### impl From\<u8> for ExitCode



### impl From\<u8> for AtomicU8



### impl From\<u16> for f32



### impl From\<u16> for f64



### impl From\<u16> for i32



### impl From\<u16> for i64



### impl From\<u16> for i128



### impl From\<u16> for u32



### impl From\<u16> for u64



### impl From\<u16> for u128



### impl From\<u16> for usize



### impl From\<u16> for AtomicU16



### impl From\<u32> for f64



### impl From\<u32> for i64



### impl From\<u32> for i128



### impl From\<u32> for u64



### impl From\<u32> for u128



### impl From\<u32> for Ipv4Addr



### impl From\<u32> for AtomicU32



### impl From\<u64> for i128



### impl From\<u64> for u128



### impl From\<u64> for AtomicU64



### impl From\<u128> for Ipv6Addr



### impl From\<usize> for AtomicUsize



### impl From\<__m128> for Simd\<f32, 4>



### impl From\<__m128d> for Simd\<f64, 2>



### impl From\<__m128i> for Simd\<i8, 16>



### impl From\<__m128i> for Simd\<i16, 8>



### impl From\<__m128i> for Simd\<i32, 4>



### impl From\<__m128i> for Simd\<i64, 2>



### impl From\<__m128i> for Simd\<isize, 2>



### impl From\<__m128i> for Simd\<u8, 16>



### impl From\<__m128i> for Simd\<u16, 8>



### impl From\<__m128i> for Simd\<u32, 4>



### impl From\<__m128i> for Simd\<u64, 2>



### impl From\<__m128i> for Simd\<usize, 2>



### impl From\<__m256> for Simd\<f32, 8>



### impl From\<__m256d> for Simd\<f64, 4>



### impl From\<__m256i> for Simd\<i8, 32>



### impl From\<__m256i> for Simd\<i16, 16>



### impl From\<__m256i> for Simd\<i32, 8>



### impl From\<__m256i> for Simd\<i64, 4>



### impl From\<__m256i> for Simd\<isize, 4>



### impl From\<__m256i> for Simd\<u8, 32>



### impl From\<__m256i> for Simd\<u16, 16>



### impl From\<__m256i> for Simd\<u32, 8>



### impl From\<__m256i> for Simd\<u64, 4>



### impl From\<__m256i> for Simd\<usize, 4>



### impl From\<__m512> for Simd\<f32, 16>



### impl From\<__m512d> for Simd\<f64, 8>



### impl From\<__m512i> for Simd\<i8, 64>



### impl From\<__m512i> for Simd\<i16, 32>



### impl From\<__m512i> for Simd\<i32, 16>



### impl From\<__m512i> for Simd\<i64, 8>



### impl From\<__m512i> for Simd\<isize, 8>



### impl From\<__m512i> for Simd\<u8, 64>



### impl From\<__m512i> for Simd\<u16, 32>



### impl From\<__m512i> for Simd\<u32, 16>



### impl From\<__m512i> for Simd\<u64, 8>



### impl From\<__m512i> for Simd\<usize, 8>



### impl From\<LayoutError> for TryReserveErrorKind



### impl From\<Box\<str, Global>> for String



### impl From\<Box\<CStr, Global>> for CString



### impl From\<Box\<OsStr, Global>> for OsString



### impl From\<Box\<Path, Global>> for PathBuf



### impl From\<CString> for Box\<CStr, Global>



### impl From\<CString> for Rc\<CStr>



### impl From\<CString> for Arc\<CStr>



### impl From\<CString> for Vec\<u8, Global>



### impl From\<NulError> for Error

### 

### impl From\<OsString> for Box\<OsStr>

### 

### impl From\<OsString> for PathBuf

### 

### impl From\<OsString> for Rc\<OsStr>

### 

### impl From\<OsString> for Arc\<OsStr>

### 

### impl From\<File> for OwnedFd

### 

### impl From\<File> for OwnedHandle

`Available on Windows only.`



### impl From\<File> for Stdio



### impl From\<Ipv4Addr> for IpAddr



### impl From\<Ipv4Addr> for u32



### impl From\<Ipv6Addr> for IpAddr



### impl From\<Ipv6Addr> for u128



### impl From\<SocketAddrV4> for SocketAddr



### impl From\<SocketAddrV6> for SocketAddr



### impl From\<TcpListener> for OwnedFd



### impl From\<TcpListener> for OwnedSocket

`Available on Windows only.`

### impl From\<TcpStream> for OwnedFd



### impl From\<TcpStream> for OwnedSocket

`Available on Windows only.`



### impl From\<UdpSocket> for OwnedFd



### impl From\<UdpSocket> for OwnedSocket

`Available on Windows only.`



### impl From\<NonZeroI8> for i8



### impl From\<NonZeroI8> for NonZeroI16



### impl From\<NonZeroI8> for NonZeroI32



### impl From\<NonZeroI8> for NonZeroI64



### impl From\<NonZeroI8> for NonZeroI128



### impl From\<NonZeroI8> for NonZeroIsize



### impl From\<NonZeroI16> for i16



### impl From\<NonZeroI16> for NonZeroI32



### impl From\<NonZeroI16> for NonZeroI64



### impl From\<NonZeroI16> for NonZeroI128



### impl From\<NonZeroI16> for NonZeroIsize



### impl From\<NonZeroI32> for i32



### impl From\<NonZeroI32> for NonZeroI64



### impl From\<NonZeroI32> for NonZeroI128



### impl From\<NonZeroI64> for i64



### impl From\<NonZeroI64> for NonZeroI128



### impl From\<NonZeroI128> for i128



### impl From\<NonZeroIsize> for isize



### impl From\<NonZeroU8> for u8



### impl From\<NonZeroU8> for NonZeroI16



### impl From\<NonZeroU8> for NonZeroI32



### impl From\<NonZeroU8> for NonZeroI64



### impl From\<NonZeroU8> for NonZeroI128



### impl From\<NonZeroU8> for NonZeroIsize



### impl From\<NonZeroU8> for NonZeroU16



### impl From\<NonZeroU8> for NonZeroU32



### impl From\<NonZeroU8> for NonZeroU64



### impl From\<NonZeroU8> for NonZeroU128



### impl From\<NonZeroU8> for NonZeroUsize



### impl From\<NonZeroU16> for u16



### impl From\<NonZeroU16> for NonZeroI32



### impl From\<NonZeroU16> for NonZeroI64



### impl From\<NonZeroU16> for NonZeroI128



### impl From\<NonZeroU16> for NonZeroU32



### impl From\<NonZeroU16> for NonZeroU64



### impl From\<NonZeroU16> for NonZeroU128



### impl From\<NonZeroU16> for NonZeroUsize



### impl From\<NonZeroU32> for u32



### impl From\<NonZeroU32> for NonZeroI64



### impl From\<NonZeroU32> for NonZeroI128



### impl From\<NonZeroU32> for NonZeroU64



### impl From\<NonZeroU32> for NonZeroU128



### impl From\<NonZeroU64> for u64



### impl From\<NonZeroU64> for NonZeroI128



### impl From\<NonZeroU64> for NonZeroU128



### impl From\<NonZeroU128> for u128



### impl From\<NonZeroUsize> for usize



### impl From\<OwnedFd> for File



### impl From\<OwnedFd> for TcpListener



### impl From\<OwnedFd> for TcpStream



### impl From\<OwnedFd> for UdpSocket



### impl From\<OwnedFd> for PidFd

`Available on Unix only.`



### impl From\<OwnedFd> for UnixDatagram

`Available on Unix only.`



### impl From\<OwnedFd> for UnixListener

`Available on Unix only.`



### impl From\<OwnedFd> for UnixStream

`Available on Unix only.`



### impl From\<OwnedFd> for Stdio

`Available on Unix only.`

### impl From\<PidFd> for OwnedFd

`Available on Unix only.`

### impl From\<UnixDatagram> for OwnedFd

`Available on Unix only.`



### impl From\<UnixListener> for OwnedFd

`Available on Unix only.`

### impl From\<UnixStream> for OwnedFd

`Available on Unix only.`

### impl From\<OwnedHandle> for File

`Available on Windows only.`



### impl From\<OwnedHandle> for Stdio

`Available on Windows only.`



### impl From\<OwnedSocket> for TcpListener

`Available on Windows only.`



### impl From\<OwnedSocket> for TcpStream

`Available on Windows only.`

### 

### impl From\<OwnedSocket> for UdpSocket

`Available on Windows only.`



### impl From\<PathBuf> for Box\<Path>



### impl From\<PathBuf> for OsString



### impl From\<PathBuf> for Rc\<Path>



### impl From\<PathBuf> for Arc\<Path>



### impl From\<Child> for OwnedHandle

`Available on Windows only.`



### impl From\<ChildStderr> for OwnedFd

`Available on Unix only.`



### impl From\<ChildStderr> for OwnedHandle

`Available on Windows only.`



### impl From\<ChildStderr> for Stdio



### impl From\<ChildStdin> for OwnedFd

`Available on Unix only.`



### impl From\<ChildStdin> for OwnedHandle

`Available on Windows only.`



### impl From\<ChildStdin> for Stdio



### impl From\<ChildStdout> for OwnedFd

`Available on Unix only.`



### impl From\<ChildStdout> for OwnedHandle

`Available on Windows only.`





### impl From\<ChildStdout> for Stdio



### impl From\<Alignment> for usize



### impl From\<Alignment> for NonZeroUsize



### impl From\<Rc\<str>> for Rc\<[u8]>



### impl From\<Simd\<f32, 4>> for __m128



### impl From\<Simd\<f32, 8>> for __m256



### impl From\<Simd\<f32, 16>> for __m512



### impl From\<Simd\<f64, 2>> for __m128d



### impl From\<Simd\<f64, 4>> for __m256d



### impl From\<Simd\<f64, 8>> for __m512d



### impl From\<Simd\<i8, 16>> for __m128i



### impl From\<Simd\<i8, 32>> for __m256i



### impl From\<Simd\<i8, 64>> for __m512i



### impl From\<Simd\<i16, 8>> for __m128i



### impl From\<Simd\<i16, 16>> for __m256i



### impl From\<Simd\<i16, 32>> for __m512i



### impl From\<Simd\<i32, 4>> for __m128i



### impl From\<Simd\<i32, 8>> for __m256i



### impl From\<Simd\<i32, 16>> for __m512i



### impl From\<Simd\<i64, 2>> for __m128i



### impl From\<Simd\<i64, 4>> for __m256i



### impl From\<Simd\<i64, 8>> for __m512i



### impl From\<Simd\<isize, 2>> for __m128i



### impl From\<Simd\<isize, 4>> for __m256i



### impl From\<Simd\<isize, 8>> for __m512i



### impl From\<Simd\<u8, 16>> for __m128i



### impl From\<Simd\<u8, 32>> for __m256i



### impl From\<Simd\<u8, 64>> for __m512i



### impl From\<Simd\<u16, 8>> for __m128i



### impl From\<Simd\<u16, 16>> for __m256i



### impl From\<Simd\<u16, 32>> for __m512i



### impl From\<Simd\<u32, 4>> for __m128i



### impl From\<Simd\<u32, 8>> for __m256i



### impl From\<Simd\<u32, 16>> for __m512i



### impl From\<Simd\<u64, 2>> for __m128i



### impl From\<Simd\<u64, 4>> for __m256i



### impl From\<Simd\<u64, 8>> for __m512i



### impl From\<Simd\<usize, 2>> for __m128i



### impl From\<Simd\<usize, 4>> for __m256i



### impl From\<Simd\<usize, 8>> for __m512i



### impl From\<String> for Box\<str, Global>



### impl From\<String> for Box\<dyn Error + 'static, Global>



### impl From\<String> for Box\<dyn Error + Send + Sync + 'static, Global>



### impl From\<String> for OsString



### impl From\<String> for PathBuf



### impl From\<String> for Rc\<str>



### impl From\<String> for Arc\<str>



### impl From\<String> for Vec\<u8, Global>



### impl From\<RecvError> for RecvTimeoutError



### impl From\<RecvError> for TryRecvError



### impl From\<Arc\<str>> for Arc\<[u8]>



### impl From\<Vec\<NonZeroU8, Global>> for CString



### impl From\<[u8; 4]> for IpAddr



### impl From\<[u8; 4]> for Ipv4Addr



### impl From\<[u8; 16]> for IpAddr



### impl From\<[u8; 16]> for Ipv6Addr



### impl From\<[u16; 8]> for IpAddr



### impl From\<[u16; 8]> for Ipv6Addr



### impl\<'a> From\<&'a str> for Cow\<'a, str>



### impl\<'a> From\<&'a CStr> for Cow\<'a, CStr>



### impl\<'a> From\<&'a CString> for Cow\<'a, CStr>



### impl\<'a> From\<&'a OsStr> for Cow\<'a, OsStr>



### impl\<'a> From\<&'a OsString> for Cow\<'a, OsStr>



### impl\<'a> From\<&'a Path> for Cow\<'a, Path>



### impl\<'a> From\<&'a PathBuf> for Cow\<'a, Path>



### impl\<'a> From\<&'a String> for Cow\<'a, str>



### impl\<'a> From\<&str> for Box\<dyn Error + Send + Sync + 'a, Global>



### impl\<'a> From\<Cow\<'a, str>> for Box\<dyn Error + 'static, Global>



### impl\<'a> From\<Cow\<'a, str>> for String



### impl\<'a> From\<Cow\<'a, CStr>> for CString



### impl\<'a> From\<Cow\<'a, OsStr>> for OsString



### impl\<'a> From\<Cow\<'a, Path>> for PathBuf



### impl\<'a> From\<CString> for Cow\<'a, CStr>



### impl\<'a> From\<OsString> for Cow\<'a, OsStr>



### impl\<'a> From\<PathBuf> for Cow\<'a, Path>



### impl\<'a> From\<String> for Cow\<'a, str>



### impl\<'a, 'b> From\<Cow\<'b, str>> for Box\<dyn Error + Send + Sync + 'a, Global>



### impl\<'a, B> From\<Cow\<'a, B>> for Rc\<B>

```rust
impl<'a, B> From<Cow<'a, B>> for Rc<B>
where
  B: ToOwned + ?Sized,
  Rc<B>: From<&'a B> + From<<B as ToOwned>::Owned>,
```

### impl\<'a, B> From\<Cow\<'a, B>> for Arc\<B>

```rust
impl<'a, B> From<Cow<'a, B>> for Arc<B>
where
  B: ToOwned + ?Sized,
  Arc<B>: From<&'a B> + From<<B as ToOwned>::Owned>,
```

### impl\<'a, E> From\<E> for Box\<dyn Error + 'a, Global>

```rust
impl<'a, E> From<E> for Box<dyn Error + 'a, Global>
where
  E: Error + 'a,
```

### impl\<'a, E> From\<E> for Box\<dyn Error + Send + Sync + 'a, Global>

```rust
impl<'a, E> From<E> for Box<dyn Error + Send + Sync + 'a, Global>
where
  E: Error + Send + Sync + 'a,
```

### impl\<'a, T> From\<&'a Option\<T>> for Option\<&'a T>



### impl\<'a, T> From\<&'a [T]> for Cow\<'a, [T]>

```rust
impl<'a, T> From<&'a [T]> for Cow<'a, [T]>
where
  T: Clone,
```

### impl\<'a, T> From\<&'a Vec\<T, Global>> for Cow\<'a, [T]>

```rust
impl<'a, T> From<&'a Vec<T, Global>> for Cow<'a, [T]>
where
  T: Clone,
```

### impl\<'a, T> From\<&'a mut Option\<T>> for Option\<&'a mut T>



### impl\<'a, T> From\<Cow\<'a, [T]>> for Vec\<T, Global>

```rust
impl<'a, T> From<Cow<'a, [T]>> for Vec<T, Global>
where
  [T]: ToOwned<Owned = Vec<T, Global>>,
```

### impl\<'a, T> From\<Vec\<T, Global>> for Cow\<'a, [T]>

```rust
impl<'a, T> From<Vec<T, Global>> for Cow<'a, [T]>
where
  T: Clone,
```

### impl\<'data> From\<&'data mut [u8]> for BorrowedBuf\<'data>

从完全初始化的切片创建一个新的 BorrowedBuf。





### impl\<'data> From\<&'data mut [MaybeUninit\<u8>]> for BorrowedBuf\<'data>

从未初始化的缓冲区创建一个新的 BorrowedBuf。

如果已知缓冲区的一部分已经初始化，则使用 set_init。

### impl\<A> From\<Box\<str, A>> for Box\<[u8], A>

```rust
impl<A> From<Box<str, A>> for Box<[u8], A>
where
  A: Allocator,
```

### impl\<E> From\<E> for Report\<E>

```rust
impl<E> From<E> for Report<E>
where
  E: Error,
```

### impl\<I> From\<(I, u16)> for SocketAddr

```rust
impl<I> From<(I, u16)> for SocketAddr
where
  I: Into<IpAddr>,
```

### impl\<K, V, const N: usize> From\<[(K, V); N]> for HashMap\<K, V, RandomState>

```rust
impl<K, V, const N: usize> From<[(K, V); N]> for HashMap<K, V, RandomState>
where
  K: Eq + Hash,
```

### impl\<K, V, const N: usize> From\<[(K, V); N]> for BTreeMap\<K, V, Global>

```rust
impl<K, V, const N: usize> From<[(K, V); N]> for BTreeMap<K, V, Global>
where
  K: Ord,
```

### impl\<T> From\<&[T]> for Box\<[T], Global>

```rust
impl<T> From<&[T]> for Box<[T], Global>
where
  T: Clone,
```

### impl\<T> From\<&[T]> for Rc\<[T]>

```rust
impl<T> From<&[T]> for Rc<[T]>
where
  T: Clone,
```

### impl\<T> From\<&[T]> for Arc\<[T]>

```rust
impl<T> From<&[T]> for Arc<[T]>
where
  T: Clone,
```

### impl\<T> From\<&[T]> for Vec\<T, Global>

```rust
impl<T> From<&[T]> for Vec<T, Global>
where
  T: Clone,
```

### impl\<T> From\<&mut [T]> for Vec\<T, Global>

```rust
impl<T> From<&mut [T]> for Vec<T, Global>
where
  T: Clone,
```

### impl\<T> From\<Cow\<'_, [T]>> for Box\<[T], Global>

```rust
impl<T> From<Cow<'_, [T]>> for Box<[T], Global>
where
  T: Clone,
```

### impl\<T> From\<[T; 1]> for (T,)



### impl\<T> From\<[T; 2]> for (T, T)



### impl\<T> From\<[T; 3]> for (T, T, T)



### impl\<T> From\<[T; 4]> for (T, T, T, T)



### impl\<T> From\<[T; 5]> for (T, T, T, T, T)



### impl\<T> From\<[T; 6]> for (T, T, T, T, T, T)



### impl\<T> From\<[T; 7]> for (T, T, T, T, T, T, T)



### impl\<T> From\<[T; 8]> for (T, T, T, T, T, T, T, T)



### impl\<T> From\<[T; 9]> for (T, T, T, T, T, T, T, T, T)



### impl\<T> From\<[T; 10]> for (T, T, T, T, T, T, T, T, T, T)



### impl\<T> From\<[T; 11]> for (T, T, T, T, T, T, T, T, T, T, T)



### impl\<T> From\<[T; 12]> for (T, T, T, T, T, T, T, T, T, T, T, T)



### impl\<T> From\<!> for T

稳定性注意事项: 该 impl 尚不存在，但我们 “保留空间” 以在将来添加它。 有关详细信息，请参见 rust-lang/rust#64715。





### impl\<T> From\<*mut T> for AtomicPtr\<T>



### impl\<T> From\<&T> for NonNull\<T>

```rust
impl<T> From<&T> for NonNull<T>
where
  T: ?Sized,
```

### impl\<T> From\<&mut T> for NonNull\<T>

```rust
impl<T> From<&mut T> for NonNull<T>
where
  T: ?Sized,
```

### impl\<T> From\<(T, T)> for [T; 2]



### impl\<T> From\<(T, T, T)> for [T; 3]



### impl\<T> From\<(T, T, T, T)> for [T; 4]



### impl\<T> From\<(T, T, T, T, T)> for [T; 5]



### impl\<T> From\<(T, T, T, T, T, T)> for [T; 6]



### impl\<T> From\<(T, T, T, T, T, T, T)> for [T; 7]



### impl\<T> From\<(T, T, T, T, T, T, T, T)> for [T; 8]



### impl\<T> From\<(T, T, T, T, T, T, T, T, T)> for [T; 9]



### impl\<T> From\<(T, T, T, T, T, T, T, T, T, T)> for [T; 10]



### impl\<T> From\<(T, T, T, T, T, T, T, T, T, T, T)> for [T; 11]



### impl\<T> From\<(T, T, T, T, T, T, T, T, T, T, T, T)> for [T; 12]



### impl\<T> From\<(T,)> for [T; 1]



### impl\<T> From\<Box\<T, Global>> for Rc\<T>

```rust
impl<T> From<Box<T, Global>> for Rc<T>
where
  T: ?Sized,
```

### impl\<T> From\<Box\<T, Global>> for Arc\<T>

```rust
impl<T> From<Box<T, Global>> for Arc<T>
where
  T: ?Sized,
```

### impl\<T> From\<BinaryHeap\<T>> for Vec\<T, Global>



### impl\<T> From\<SendError\<T>> for TrySendError\<T>



### impl\<T> From\<PoisonError\<T>> for TryLockError\<T>



### impl\<T> From\<JoinHandle\<T>> for OwnedHandle

`Available on Windows only.`



### impl\<T> From\<Vec\<T, Global>> for BinaryHeap\<T>

```rust
impl<T> From<Vec<T, Global>> for BinaryHeap<T>
where
  T: Ord,
```

### impl\<T> From\<Vec\<T, Global>> for Rc\<[T]>



### impl\<T> From\<Vec\<T, Global>> for Arc\<[T]>



### impl\<T> From\<T> for Option\<T>



### impl\<T> From\<T> for Poll\<T>



### impl\<T> From\<T> for Box\<T, Global>



### impl\<T> From\<T> for Cell\<T>



### impl\<T> From\<T> for OnceCell\<T>



### impl\<T> From\<T> for RefCell\<T>



### impl\<T> From\<T> for SyncUnsafeCell\<T>



### impl\<T> From\<T> for UnsafeCell\<T>



### impl\<T> From\<T> for Rc\<T>



### impl\<T> From\<T> for Arc\<T>



### impl\<T> From\<T> for Exclusive\<T>



### impl\<T> From\<T> for Mutex\<T>



### impl\<T> From\<T> for OnceLock\<T>



### impl\<T> From\<T> for RwLock\<T>



### impl\<T> From\<T> for T



### impl\<T, A> From\<Box\<[T], A>> for Vec\<T, A>

```rust
impl<T, A> From<Box<[T], A>> for Vec<T, A>
where
  A: Allocator,
```

### impl\<T, A> From\<Box\<T, A>> for Pin\<Box\<T, A>>

```rust
impl<T, A> From<Box<T, A>> for Pin<Box<T, A>>
where
  A: Allocator + 'static,
  T: ?Sized,
```

### impl\<T, A> From\<VecDeque\<T, A>> for Vec\<T, A>

```rust
impl<T, A> From<VecDeque<T, A>> for Vec<T, A>
where
  A: Allocator,
```

### impl\<T, A> From\<Vec\<T, A>> for Box\<[T], A>

```rust
impl<T, A> From<Vec<T, A>> for Box<[T], A>
where
  A: Allocator,
```

### impl\<T, A> From\<Vec\<T, A>> for VecDeque\<T, A>

```rust
impl<T, A> From<Vec<T, A>> for VecDeque<T, A>
where
  A: Allocator,
```

### impl\<T, const LANES: usize> From\<Mask\<T, LANES>> for [bool; LANES]

```rust
impl<T, const LANES: usize> From<Mask<T, LANES>> for [bool; LANES]
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<T, const LANES: usize> From\<Mask\<T, LANES>> for Simd\<T, LANES>

```rust
impl<T, const LANES: usize> From<Mask<T, LANES>> for Simd<T, LANES>
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```



### impl\<T, const LANES: usize> From\<[bool; LANES]> for Mask\<T, LANES>

```rust
impl<T, const LANES: usize> From<[bool; LANES]> for Mask<T, LANES>
where
  T: MaskElement,
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<T, const N: usize> From\<[T; N]> for Box\<[T], Global>



### impl\<T, const N: usize> From\<[T; N]> for HashSet\<T, RandomState>

```rust
impl<T, const N: usize> From<[T; N]> for HashSet<T, RandomState>
where
  T: Eq + Hash,
```

### impl\<T, const N: usize> From\<[T; N]> for BTreeSet\<T, Global>

```rust
impl<T, const N: usize> From<[T; N]> for BTreeSet<T, Global>
where
  T: Ord,
```

### impl\<T, const N: usize> From\<[T; N]> for BinaryHeap\<T>

```rust
impl<T, const N: usize> From<[T; N]> for BinaryHeap<T>
where
  T: Ord,
```

### impl\<T, const N: usize> From\<[T; N]> for LinkedList\<T, Global>



### impl\<T, const N: usize> From\<[T; N]> for VecDeque\<T, Global>



### impl\<T, const N: usize> From\<[T; N]> for Simd\<T, N>

```rust
impl<T, const N: usize> From<[T; N]> for Simd<T, N>
where
  LaneCount<N>: SupportedLaneCount,
  T: SimdElement,
```

### impl\<T, const N: usize> From\<[T; N]> for Vec\<T, Global>



### impl\<T, const N: usize> From\<Simd\<T, N>> for [T; N]

```rust
impl<T, const N: usize> From<Simd<T, N>> for [T; N]
where
  LaneCount<N>: SupportedLaneCount,
  T: SimdElement,
```

### impl\<T: ?Sized + AsRef\<OsStr>> From\<&T> for OsString



### impl\<T: ?Sized + AsRef\<OsStr>> From\<&T> for PathBuf



### impl\<W> From\<IntoInnerError\<W>> for Error



### impl\<W> From\<Arc\<W>> for RawWaker

```rust
impl<W> From<Arc<W>> for RawWaker
where
  W: Wake + Send + Sync + 'static,
```

### impl\<W> From\<Arc\<W>> for Waker

```rust
impl<W> From<Arc<W>> for Waker
where
  W: Wake + Send + Sync + 'static,
```

### impl\<const LANES: usize> From\<Mask\<i8, LANES>> for Mask\<i16, LANES>

```rust
impl<const LANES: usize> From<Mask<i8, LANES>> for Mask<i16, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<i8, LANES>> for Mask\<i32, LANES>

```rust
impl<const LANES: usize> From<Mask<i8, LANES>> for Mask<i32, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<i8, LANES>> for Mask\<i64, LANES>

```rust
impl<const LANES: usize> From<Mask<i8, LANES>> for Mask<i64, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<i8, LANES>> for Mask\<isize, LANES>

```rust
impl<const LANES: usize> From<Mask<i8, LANES>> for Mask<isize, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<i16, LANES>> for Mask\<i8, LANES>

```rust
impl<const LANES: usize> From<Mask<i16, LANES>> for Mask<i8, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<i16, LANES>> for Mask\<i32, LANES>

```rust
impl<const LANES: usize> From<Mask<i16, LANES>> for Mask<i32, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<i16, LANES>> for Mask\<i64, LANES>

```rust
impl<const LANES: usize> From<Mask<i16, LANES>> for Mask<i64, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<i16, LANES>> for Mask\<isize, LANES>

```rust
impl<const LANES: usize> From<Mask<i16, LANES>> for Mask<isize, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<i32, LANES>> for Mask\<i8, LANES>

```rust
impl<const LANES: usize> From<Mask<i32, LANES>> for Mask<i8, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<i32, LANES>> for Mask\<i16, LANES>

```rust
impl<const LANES: usize> From<Mask<i32, LANES>> for Mask<i16, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<i32, LANES>> for Mask\<i64, LANES>

```rust
impl<const LANES: usize> From<Mask<i32, LANES>> for Mask<i64, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<i32, LANES>> for Mask\<isize, LANES>

```rust
impl<const LANES: usize> From<Mask<i32, LANES>> for Mask<isize, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<i64, LANES>> for Mask\<i8, LANES>

```rust
impl<const LANES: usize> From<Mask<i64, LANES>> for Mask<i8, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<i64, LANES>> for Mask\<i16, LANES>

```rust
impl<const LANES: usize> From<Mask<i64, LANES>> for Mask<i16, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<i64, LANES>> for Mask\<i32, LANES>

```rust
impl<const LANES: usize> From<Mask<i64, LANES>> for Mask<i32, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<i64, LANES>> for Mask\<isize, LANES>

```rust
impl<const LANES: usize> From<Mask<i64, LANES>> for Mask<isize, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<isize, LANES>> for Mask\<i8, LANES>

```rust
impl<const LANES: usize> From<Mask<isize, LANES>> for Mask<i8, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<isize, LANES>> for Mask\<i16, LANES>

```rust
impl<const LANES: usize> From<Mask<isize, LANES>> for Mask<i16, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<isize, LANES>> for Mask\<i32, LANES>

```rust
impl<const LANES: usize> From<Mask<isize, LANES>> for Mask<i32, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl\<const LANES: usize> From\<Mask\<isize, LANES>> for Mask\<i64, LANES>

```rust
impl<const LANES: usize> From<Mask<isize, LANES>> for Mask<i64, LANES>
where
  LaneCount<LANES>: SupportedLaneCount,
```

### impl From\<Ident> for TokenTree

### impl From\<Literal> for TokenTree

### impl From\<Punct> for TokenTree

### impl From\<TokenTree> for TokenStream

### impl From\<Group> for TokenTree