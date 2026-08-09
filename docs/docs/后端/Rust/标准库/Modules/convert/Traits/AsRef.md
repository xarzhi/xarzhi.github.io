# Trait std::convert::AsRef

把`Slef`类型转化为`T`类型的引用

```rust
pub trait AsRef<T>
where
    T: ?Sized,
{
    // Required method
    fn as_ref(&self) -> &T;
}
```

给自定义类型实现AsRef

```rust
use std::convert::AsRef;

struct User {
    name: String,
    id: u32,
}

// 让 User 能"看作" &str（返回名字的引用）
impl AsRef<str> for User {
    fn as_ref(&self) -> &str {
        &self.name
    }
}

fn main() {
    let u = User { name: "Alice".into(), id: 1 };
    let s: &str = u.as_ref();   // "Alice"
    println!("{}", s);
}
```

一个类型可以实现多个 `AsRef` 目标

```rust
use std::convert::AsRef;

struct User {
    name: String,
    id: u32,
}

impl AsRef<str> for User {
    fn as_ref(&self) -> &str {
        &self.name
    }
}

impl AsRef<u32> for User {
    fn as_ref(&self) -> &u32 {
        &self.id
    }
}

fn main() {
    let u = User { name: "Bob".into(), id: 42 };

    let name: &str = u.as_ref();   // 靠类型注解消歧义
    let id: &u32 = u.as_ref();

    println!("{} / {}", name, id);  // Bob / 42
}
```





## 与 Borrow 的关系

`AsRef` 与 `Borrow` 具有相同的签名，但 `Borrow` 在以下几个方面有所不同:

- 与 `AsRef` 不同，`Borrow` 对任何 T 都有一个毯子暗示，可用于接受引用或值。(另请参见下面关于 `AsRef` 的反射性的注释。)
- `Borrow` 还要求借用值的 `Hash`、`Eq` 和 `Ord` 与拥有值的值相等。因此，如果只想借用一个结构体的单个字段，则可以实现 `AsRef`，而不能实现 `Borrow`。

注意：**此 trait 一定不能失败**。如果转换失败，请使用专用方法返回 `Option<T>` 或 `Result<T, E>`。



## 泛型实现

`AsRef` 自动引用，如果内部类型是一个引用或一个可变引用 (例如: 如果 foo 具有 &mut Foo 或 &&mut Foo 类型，foo.as_ref() 将同样工作)。

请注意，由于历史原因，上述内容目前并不适用于所有 dereferenceable types，例如 foo.as_ref()不会与 Box::new(foo).as_ref() 一样工作。 相反，许多智能指针提供了一个 as_ref 实现，它简单地将一个引用返回给 pointed-to value (但不对该值执行廉价的引用 - 到 - 引用转换)。 但是，AsRef::as_ref 不应仅用于解引用; 可以使用 ‘Deref coercion’ 代替:

```rust
let x = Box::new(5i32);
// 避免这种情况:
// let y: &i32 = x.as_ref();
// 最好只写:
let y: &i32 = &x;
```

实现 `Deref`的类型应考虑实现 `AsRef<T>`，如下所示:

```rust
impl<T> AsRef<T> for SomeType
where
    T: ?Sized,
    <SomeType as Deref>::Target: AsRef<T>,
{
    fn as_ref(&self) -> &T {
        self.deref().as_ref()
    }
}
```



## Reflexivity

理想情况下，`AsRef` 将是自反的，即有一个 `impl<T: ?Sized> AsRef<T> for T` 与 `as_ref`简单地返回其参数不变。 由于 Rust 类型系统的技术限制，目前*不*提供这样的一揽子实现 (它将与 `&T where T: AsRef<U>` 的另一个现有一揽子实现重叠，它允许 `AsRef` 自动解引用，请参见上面的 “Generic Implementations”)。

必须在需要或需要的地方为特定类型 `T` 显式添加 `AsRef<T> for T` 的简单实现。但是请注意，并非 `std` 中的所有类型都包含这样的实现，并且由于孤儿规则，这些类型不能由外部代码添加。





通过使用 trait bounds，我们可以接受不同类型的参数，只要它们可以转换为指定的 `T` 类型即可。

例如：通过创建一个采用 `AsRef<str>` 的泛型函数，我们表示我们希望接受所有可以转换为 `&str` 的引用作为参数。 由于 `String` 和 `&str` 都实现了 `AsRef<str>`，因此我们可以将两者都用作输入参数。

```rust
fn is_hello<T: AsRef<str>>(s: T) {
   assert_eq!("hello", s.as_ref());
}

let s = "hello";
is_hello(s);

let s = "hello".to_string();
is_hello(s);
```



## Required Methods

### as_ref

将此类型转换为 (通常是推断的) 输入类型的共享引用。

```rust
fn as_ref(&self) -> &T
```

### 

## Implementors



### impl AsRef\<str> for str



### impl AsRef\<str> for String



### impl AsRef\<CStr> for CStr



### impl AsRef\<CStr> for CString



### impl AsRef\<OsStr> for Component\<'_>



### impl AsRef\<OsStr> for str



### impl AsRef\<OsStr> for OsStr



### impl AsRef\<OsStr> for OsString



### impl AsRef\<OsStr> for Components\<'_>



### impl AsRef\<OsStr> for std::path::Iter\<'_>



### impl AsRef\<OsStr> for Path



### impl AsRef\<OsStr> for PathBuf



### impl AsRef\<OsStr> for String



### impl AsRef\<Path> for Cow\<'_, OsStr>



### impl AsRef\<Path> for Component\<'_>



### impl AsRef\<Path> for str



### impl AsRef\<Path> for OsStr



### impl AsRef\<Path> for OsString



### impl AsRef\<Path> for Components\<'_>



### impl AsRef\<Path> for std::path::Iter\<'_>



### impl AsRef\<Path> for Path



### impl AsRef\<Path> for PathBuf



### impl AsRef\<Path> for String



### impl AsRef\<[u8]> for str



### impl AsRef\<[u8]> for String



### impl\<'a> AsRef\<str> for std::string::Drain\<'a>



### impl\<'a> AsRef\<[u8]> for std::string::Drain\<'a>



### impl<'a, T, A> AsRef<[T]> for std::vec::Drain<'a, T, A>

```rust
impl<'a, T, A> AsRef<[T]> for std::vec::Drain<'a, T, A>
where
  A: Allocator,
```



### impl\<T> AsRef\<[T]> for [T]



### impl\<T> AsRef\<[T]> for std::slice::Iter\<'_, T>



### impl\<T> AsRef\<[T]> for IterMut\<'_, T>



### impl\<T> AsRef\<T> for Cow<'_, T>

```rust
impl<T> AsRef<T> for Cow<'_, T>
where
  T: ToOwned + ?Sized,
```

### impl\<T> AsRef\<T> for Rc\<T>

```rust
impl<T> AsRef<T> for Rc<T>
where
  T: ?Sized,
```



### impl\<T> AsRef\<T> for Arc\<T>

```rust
impl<T> AsRef<T> for Arc<T>
where
  T: ?Sized,
```



### impl<T, A> AsRef<[T]> for IntoIter<T, A>

```rust
impl<T, A> AsRef<[T]> for IntoIter<T, A>
where
  A: Allocator,
```



### impl<T, A> AsRef<[T]> for Vec<T, A>

```rust
impl<T, A> AsRef<[T]> for Vec<T, A>
where
  A: Allocator,
```



### impl<T, A> AsRef<Vec<T, A>> for Vec<T, A>

```rust
impl<T, A> AsRef<Vec<T, A>> for Vec<T, A>
where
  A: Allocator,
```



### impl<T, A> AsRef\<T> for Box<T, A>

```rust
impl<T, A> AsRef<T> for Box<T, A>
where
  A: Allocator,
  T: ?Sized,
```



### impl<T, U> AsRef\<U> for &T

```rust
impl<T, U> AsRef<U> for &T
where
  T: AsRef<U> + ?Sized,
  U: ?Sized,
```



### impl<T, U> AsRef\<U> for &mut T

```rust
impl<T, U> AsRef<U> for &mut T
where
  T: AsRef<U> + ?Sized,
  U: ?Sized,
```



### impl<T, const N: usize> AsRef<[T; N]> for Simd<T, N>

```rust
impl<T, const N: usize> AsRef<[T; N]> for Simd<T, N>
where
  LaneCount<N>: SupportedLaneCount,
  T: SimdElement,
```



### impl\<T, const N: usize> AsRef\<[T]> for [T; N]



### impl<T, const N: usize> AsRef<[T]> for Simd<T, N>

```rust
impl<T, const N: usize> AsRef<[T]> for Simd<T, N>
where
  LaneCount<N>: SupportedLaneCount,
  T: SimdElement,
```

