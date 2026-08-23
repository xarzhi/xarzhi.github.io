# Trait std::fmt::Pointer

`p` 格式。

`Pointer` trait 应该将其输出格式化为存储位置。 通常以十六进制表示。

```rust
pub trait Pointer {
    // Required method
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>;
}
```

`&i32` 的基本用法：

```rust
let x = &42;

let address = format!("{x:p}"); // 这会产生类似 '0x7f06092ac6d0' 的东西
```

在类型上实现 `Pointer`：

```rust
use std::fmt;

struct Length(i32);

impl fmt::Pointer for Length {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // 使用 `as` 转换为 `*const T`，该 `*const T` 实现了 Pointer，我们可以使用它

        let ptr = self as *const Self;
        fmt::Pointer::fmt(&ptr, f)
    }
}

let l = Length(42);

println!("l is in memory here: {l:p}");

let l_ptr = format!("{l:018p}");
assert_eq!(l_ptr.len(), 18);
assert_eq!(&l_ptr[..2], "0x");
```



## Required Methods

#### fmt

使用给定的格式化程序格式化该值。

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



## Implementors

### impl\<F> Pointer for F

```rust
impl<F> Pointer for F
where
  F: FnPtr,
```



### impl\<P> Pointer for Pin\<P>

```rust
impl<P> Pointer for Pin<P>
where
  P: Pointer,
```



### impl\<T> Pointer for *const T

```rust
impl<T> Pointer for *const T
where
  T: ?Sized,
```



### impl\<T> Pointer for *mut T

```rust
impl<T> Pointer for *mut T
where
  T: ?Sized,
```



### impl\<T> Pointer for &T

```rust
impl<T> Pointer for &T
where
  T: ?Sized,
```



### impl\<T> Pointer for &mut T

```rust
impl<T> Pointer for &mut T
where
  T: ?Sized,
```



### impl\<T> Pointer for NonNull\<T>

```rust
impl<T> Pointer for NonNull<T>
where
  T: ?Sized,
```



### impl\<T> Pointer for Rc\<T>

```rust
impl<T> Pointer for Rc<T>
where
  T: ?Sized,
```



### impl\<T> Pointer for AtomicPtr\<T>



### impl\<T> Pointer for Arc\<T>

```rust
impl<T> Pointer for Arc<T>
where
  T: ?Sized,
```



### impl<T, A> Pointer for Box<T, A>

```rust
impl<T, A> Pointer for Box<T, A>
where
  A: Allocator,
  T: ?Sized,
