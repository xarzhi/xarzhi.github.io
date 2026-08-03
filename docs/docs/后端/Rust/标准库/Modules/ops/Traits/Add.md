# Trait std::ops::Add

加法运算符 `+`。

```rust
pub trait Add<Rhs = Self> {
    type Output;

    // Required method
    fn add(self, rhs: Rhs) -> Self::Output;
}
```

请注意，默认情况下 Rhs 是 Self，但这不是强制性的。 例如，`std::time::SystemTime` 实现  `Add<Duration>`，它允许以 `SystemTime = SystemTime + Duration` 形式进行操作。

**`Point`结构体的相加**

```rust
use std::ops::Add;

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl Add for Point {
    type Output = Self;

    fn add(self, other: Self) -> Self {
        Self {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

assert_eq!(Point { x: 1, y: 0 } + Point { x: 2, y: 3 },
           Point { x: 3, y: 3 });
```

**使用泛型实现 `Add`**

这是使用泛型实现 `Add` trait 的同一 `Point` 结构体的示例。

```rust
use std::ops::Add;

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point<T> {
    x: T,
    y: T,
}

// 请注意，该实现使用关联类型 `Output`。
impl<T: Add<Output = T>> Add for Point<T> {
    type Output = Self;

    fn add(self, other: Self) -> Self::Output {
        Self {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

assert_eq!(Point { x: 1, y: 0 } + Point { x: 2, y: 3 },
           Point { x: 3, y: 3 });
```



## Required Associated Types

### Output

应用 + 运算符后的结果类型。

```rust
type Output
```



## Required Methods

### add

执行 + 操作。

```rust
fn add(self, rhs: Rhs) -> Self::Output
```

**参数**：

- **rhs**：相加的右值

**返回值**：返回相加的结果

```rust
assert_eq!(12 + 1, 13);
```



## Implementors

### &f32

```rust 
impl Add<&f32> for &f32
```

### f32

```rust 
impl Add<&f32> for f32
```



### &f64

```rust 
impl Add<&f64> for &f64
```



### &i8

```rust 
impl Add<&f64> for &i8
```



### &i8

```rust 
impl Add<&i8> for &i8
```



### i8

```rust 
impl Add<&i8> for i8
```



### &i16

```rust 
impl Add<&i16> for &i16
```



### i16

```rust 
impl Add<&i16> for i16
```



### &i32

```rust 
impl Add<&i32> for &i32
```



### i32

```rust 
impl Add<&i32> for i32
```



### &i64

```rust 
impl Add<&i64> for &i64
```



### i64

```rust 
impl Add<&i64> for i64
```



### &i128

```rust 
impl Add<&i128> for &i128
```



### i128

```rust 
impl Add<&i128> for i128
```

### &isize

```rust 
impl Add<&isize> for &isize
```



### isize

```rust 
impl Add<&isize> for isize
```



### String

```rust 
impl Add<&str> for String
```

实现 `+` 运算符以连接两个字符串。

这会消费左侧的 `String`，并重新使用其缓冲区 (如有必要，请增加缓冲区)。 这样做是为了避免分配新的 `String` 并在每个操作上复制整个内容，当通过重复连接构建 *n* 字节的字符串时，这将导致 *O*(*n*^ 2) 运行时间。

右侧的字符串仅是借用的。它的内容被复制到返回的 `String` 中。

将两个 `String` 连接起来，第一个按值取值，第二个借用：

```rust
let a = String::from("hello");
let b = String::from(" world");
let c = a + &b;
// `a` 已移动，不能再在此处使用。
```

如果要继续使用第一个 `String`，则可以对其进行克隆并追加到克隆中：

```rust
let a = String::from("hello");
let b = String::from(" world");
let c = a.clone() + &b;
// `a` 在这里仍然有效。
```

可以通过将第一个切片转换为 `String` 来完成 `&str` 切片的连接：

```rust
let a = "hello";
let b = " world";
let c = a.to_string() + b;
```



### &u8

```rust 
impl Add<&u8> for &u8
```



### u8

```rust 
impl Add<&u8> for u8
```



### &u16

```rust 
impl Add<&u16> for &u16
```



### u16

```rust 
impl Add<&u16> for u16
```



### &u32

```rust 
impl Add<&u32> for &u32
```



### u32

```rust 
impl Add<&u32> for u32
```



### &u64

```rust 
impl Add<&u64> for &u64
```

### u64

```rust 
impl Add<&u64> for u64
```



### &u128

```rust 
impl Add<&u128> for &u128
```



### u128

```rust 
impl Add<&u128> for u128
```



### &usize

```rust 
impl Add<&usize> for &usize
```



### usize

```rust 
impl Add<&usize> for usize
```



### &Saturating\<i8>

```rust 
impl Add<&Saturating<i8>> for &Saturating<i8>
```



### Saturating\<i8>

```rust 
impl Add<&Saturating<i8>> for Saturating<i8>
```



### &Saturating\<i16>

```rust 
impl Add<&Saturating<i16>> for &Saturating<i16>
```



### Saturating\<i16>

```rust 
impl Add<&Saturating<i16>> for Saturating<i16>
```



### &Saturating\<i32>

```rust 
impl Add<&Saturating<i32>> for &Saturating<i32>
```



### Saturating\<i32>

```rust 
impl Add<&Saturating<i32>> for Saturating<i32>
```



### &Saturating\<i64>

```rust 
impl Add<&Saturating<i64>> for &Saturating<i64>
```



### Saturating\<i64>

```rust 
impl Add<&Saturating<i64>> for Saturating<i64>
```



### &Saturating\<i128>

```rust 
impl Add<&Saturating<i128>> for &Saturating<i128>
```



### Saturating\<i128>

```rust 
impl Add<&Saturating<i128>> for Saturating<i128>
```



### &Saturating\<isize>

```rust 
impl Add<&Saturating<isize>> for &Saturating<isize>
```



### Saturating\<isize>

```rust 
impl Add<&Saturating<isize>> for Saturating<isize>
```

### &Saturating\<u8>

```rust 
impl Add<&Saturating<u8>> for &Saturating<u8>
```



### Saturating\<u8>

```rust 
impl Add<&Saturating<u8>> for Saturating<u8>
```



### &Saturating\<u16>

```rust 
impl Add<&Saturating<u16>> for &Saturating<u16>
```



### Saturating\<u16>

```rust 
impl Add<&Saturating<u16>> for Saturating<u16>
```



### &Saturating\<u32>

```rust 
impl Add<&Saturating<u32>> for &Saturating<u32>
```



### Saturating\<u32>

```rust 
impl Add<&Saturating<u32>> for Saturating<u32>
```



### &Saturating\<u64>

```rust 
impl Add<&Saturating<u64>> for &Saturating<u64>
```



### Saturating\<u64>

```rust 
impl Add<&Saturating<u64>> for Saturating<u64>
```



### &Saturating\<u128>

```rust 
impl Add<&Saturating<u128>> for &Saturating<u128>
```



### Saturating\<u128>

```rust 
impl Add<&Saturating<u128>> for Saturating<u128>
```



### &Saturating\<usize>

```rust 
impl Add<&Saturating<usize>> for &Saturating<usize>
```



### Saturating\<usize>

```rust 
impl Add<&Saturating<usize>> for Saturating<usize>
```

### &Wrapping\<i8>

 ```rust 
 impl Add<&Wrapping<i8>> for &Wrapping<i8>
 ```



### Wrapping\<i8>

```rust 
impl Add<&Wrapping<i8>> for Wrapping<i8>
```

### &Wrapping\<i16>

```rust 
impl Add<&Wrapping<i16>> for &Wrapping<i16>
```

### Wrapping\<i16>

```rust 
impl Add<&Wrapping<i16>> for Wrapping<i16>
```

### &Wrapping\<i32>

```rust 
impl Add<&Wrapping<i32>> for &Wrapping<i32>
```

### Wrapping\<i32>

```rust 
impl Add<&Wrapping<i32>> for Wrapping<i32>
```

### &Wrapping\<i64>

```rust 
impl Add<&Wrapping<i64>> for &Wrapping<i64>
```

### Wrapping\<i64>

```rust 
impl Add<&Wrapping<i64>> for Wrapping<i64>
```

### &Wrapping\<i128>

```rust 
impl Add<&Wrapping<i128>> for &Wrapping<i128>
```

### Wrapping\<i128>

```rust 
impl Add<&Wrapping<i128>> for Wrapping<i128>
```

### &Wrapping\<isize>

```rust 
impl Add<&Wrapping<isize>> for &Wrapping<isize>
```

### Wrapping\<isize>

```rust 
impl Add<&Wrapping<isize>> for Wrapping<isize>
```

### &Wrapping\<u8>

```rust 
impl Add<&Wrapping<u8>> for &Wrapping<u8>
```

### Wrapping\<u8>

```rust 
impl Add<&Wrapping<u8>> for Wrapping<u8>
```

### &Wrapping\<u16>

```rust 
impl Add<&Wrapping<u16>> for &Wrapping<u16>
```

### Wrapping\<u16>

```rust 
impl Add<&Wrapping<u16>> for Wrapping<u16>
```

### &Wrapping\<u32>

```rust 
impl Add<&Wrapping<u32>> for &Wrapping<u32>
```

### Wrapping\<u32>

```rust 
impl Add<&Wrapping<u32>> for Wrapping<u32>
```

### &Wrapping\<u64>

```rust 
impl Add<&Wrapping<u64>> for &Wrapping<u64>
```

### Wrapping\<u64>

```rust 
impl Add<&Wrapping<u64>> for Wrapping<u64>
```

### &Wrapping\<u128>

```rust 
impl Add<&Wrapping<u128>> for &Wrapping<u128>
```

### Wrapping\<u128>

```rust 
impl Add<&Wrapping<u128>> for Wrapping<u128>
```

### &Wrapping\<usize>

```rust 
impl Add<&Wrapping<usize>> for &Wrapping<usize>
```

### Wrapping\<usize>

```rust 
impl Add<&Wrapping<usize>> for Wrapping<usize>
```

### f32

```rust 
impl Add<f32> for f32
```

f64

```rust 
impl Add<f64> for f64
```

### i8

```rust 
impl Add<i8> for i8
```

### i16

```rust 
impl Add<i16> for i16
```

### i32

```rust 
impl Add<i32> for i32
```

### i64

```rust 
impl Add<i64> for i64
```

### i128

```rust 
impl Add<i128> for i128
```

### isize

```rust 
impl Add<isize> for isize
```

### u8

```rust 
impl Add<u8> for u8
```

### u16

```rust 
impl Add<u16> for u16
```

### u32

```rust 
impl Add<u32> for u32
```

### u64

```rust 
impl Add<u64> for u64
```

### u128

```rust 
impl Add<u128> for u128
```

### usize

```rust 
impl Add<usize> for usize
```

### Assume

```rust 
impl Add<Assume> for Assume
```

### Saturating\<i8>

```rust 
impl Add<Saturating<i8>> for Saturating<i8>
```

### Saturating\<i16>

```rust 
impl Add<Saturating<i16>> for Saturating<i16>
```

### Saturating\<i32>

```rust 
impl Add<Saturating<i32>> for Saturating<i32>
```

### Saturating\<i64>

```rust 
impl Add<Saturating<i64>> for Saturating<i64>
```

### Saturating\<i128>

```rust 
impl Add<Saturating<i128>> for Saturating<i128>
```

### Saturating\<isize>

```rust 
impl Add<Saturating<isize>> for Saturating<isize>
```

### Saturating\<u8>

```rust 
impl Add<Saturating<u8>> for Saturating<u8>
```

### Saturating\<u16>

```rust 
impl Add<Saturating<u16>> for Saturating<u16>
```

### Saturating\<u32>

```rust 
impl Add<Saturating<u32>> for Saturating<u32>
```

### Saturating\<u64>

```rust 
impl Add<Saturating<u64>> for Saturating<u64>
```

### Saturating\<u128>

```rust 
impl Add<Saturating<u128>> for Saturating<u128>
```

### Saturating\<usize>

```rust 
impl Add<Saturating<usize>> for Saturating<usize>
```

### Wrapping\<i8>

```rust 
impl Add<Wrapping<i8>> for Wrapping<i8>
```

### Wrapping\<i16>

```rust 
impl Add<Wrapping<i16>> for Wrapping<i16>
```

### Wrapping\<i32>

```rust 
impl Add<Wrapping<i32>> for Wrapping<i32>
```

### Wrapping\<i64>

```rust 
impl Add<Wrapping<i64>> for Wrapping<i64>
```

### Wrapping\<i128>

```rust 
impl Add<Wrapping<i128>> for Wrapping<i128>
```

### Wrapping\<isize>

```rust 
impl Add<Wrapping<isize>> for Wrapping<isize>
```

### Wrapping\<u8>

```rust 
impl Add<Wrapping<u8>> for Wrapping<u8>
```

### Wrapping\<u16>

```rust 
impl Add<Wrapping<u16>> for Wrapping<u16>
```

### Wrapping\<u32>

```rust 
impl Add<Wrapping<u32>> for Wrapping<u32>
```

### Wrapping\<u64>

```rust 
impl Add<Wrapping<u64>> for Wrapping<u64>
```

### Wrapping\<u128>

```rust 
impl Add<Wrapping<u128>> for Wrapping<u128>
```

### Wrapping\<usize>

```rust 
impl Add<Wrapping<usize>> for Wrapping<usize>
```

### Duration

```rust 
impl Add<Duration> for Duration
```

### Instant

```rust 
impl Add<Duration> for Instant
```

### SystemTime

```rust 
impl Add<Duration> for SystemTime
```

### Cow<'a, str>

```rust 
impl<'a> Add<&'a str> for Cow<'a, str>
```

### Cow<'a, str>

```rust 
impl<'a> Add<Cow<'a, str>> for Cow<'a, str>
```

### &'a f32

```rust 
impl<'a> Add<f32> for &'a f32
```

### &'a f64

```rust 
impl<'a> Add<f64> for &'a f64
```

### &'a i8

```rust 
impl<'a> Add<i8> for &'a i8
```

### &'a i16

```rust 
impl<'a> Add<i16> for &'a i16
```

### &'a i32

```rust 
impl<'a> Add<i32> for &'a i32
```

### &'a i64

```rust 
impl<'a> Add<i64> for &'a i64
```

### &'a i128

```rust 
impl<'a> Add<i128> for &'a i128
```

### &'a isize

```rust 
impl<'a> Add<isize> for &'a isize
```

### &'a u8

```rust 
impl<'a> Add<u8> for &'a u8
```

### &'a u16

```rust 
impl<'a> Add<u16> for &'a u16
```

### &'a u32

```rust 
impl<'a> Add<u32> for &'a u32
```

### &'a u64

```rust 
impl<'a> Add<u64> for &'a u64
```

### &'a u128

```rust 
impl<'a> Add<u128> for &'a u128
```

### &'a usize

```rust 
impl<'a> Add<usize> for &'a usize
```

### &'a Saturating\<i8>

```rust 
impl<'a> Add<Saturating<i8>> for &'a Saturating<i8>
```

### &'a Saturating\<i16>

```rust 
impl<'a> Add<Saturating<i16>> for &'a Saturating<i16>
```

### &'a Saturating\<i32>

```rust
impl<'a> Add<Saturating<i32>> for &'a Saturating<i32>
```



#### Output

```rust 
type Output = <Saturating<i32> as Add<Saturating<i32>>>::Output
```

### &'a Saturating\<i64>

```rust 
impl<'a> Add<Saturating<i64>> for &'a Saturating<i64>
```

### &'a Saturating\<i128>

```rust 
impl<'a> Add<Saturating<i128>> for &'a Saturating<i128>
```

### &'a Saturating\<isize>

```rust 
impl<'a> Add<Saturating<isize>> for &'a Saturating<isize>
```

### &'a Saturating\<u8>

```rust 
impl<'a> Add<Saturating<u8>> for &'a Saturating<u8>
```

### &'a Saturating\<u16>

```rust 
impl<'a> Add<Saturating<u16>> for &'a Saturating<u16>
```

### &'a Saturating\<u32>

```rust 
impl<'a> Add<Saturating<u32>> for &'a Saturating<u32>
```

### &'a Saturating\<u64>

```rust 
impl<'a> Add<Saturating<u64>> for &'a Saturating<u64>
```

### &'a Saturating\<u128>

```rust 
impl<'a> Add<Saturating<u128>> for &'a Saturating<u128>
```

### &'a Saturating\<usize>

```rust 
impl<'a> Add<Saturating<usize>> for &'a Saturating<usize>
```

### &'a Wrapping\<i8>

```rust 
impl<'a> Add<Wrapping<i8>> for &'a Wrapping<i8>
```

### &'a Wrapping\<i16>

```rust 
impl<'a> Add<Wrapping<i16>> for &'a Wrapping<i16>
```

### &'a Wrapping\<i32>

```rust 
impl<'a> Add<Wrapping<i32>> for &'a Wrapping<i32>
```

### &'a Wrapping\<i64>

```rust 
impl<'a> Add<Wrapping<i64>> for &'a Wrapping<i64>
```

### &'a Wrapping\<i128>

```rust 
impl<'a> Add<Wrapping<i128>> for &'a Wrapping<i128>
```

### &'a Wrapping\<isize>

```rust 
impl<'a> Add<Wrapping<isize>> for &'a Wrapping<isize>
```

### &'a Wrapping\<u8>

```rust 
impl<'a> Add<Wrapping<u8>> for &'a Wrapping<u8>
```

### &'a Wrapping\<u16>

```rust 
impl<'a> Add<Wrapping<u16>> for &'a Wrapping<u16>
```

### &'a Wrapping\<u32>

```rust 
impl<'a> Add<Wrapping<u32>> for &'a Wrapping<u32>
```

### &'a Wrapping\<u64>

```rust 
impl<'a> Add<Wrapping<u64>> for &'a Wrapping<u64>
```

### &'a Wrapping\<u128>

```rust 
impl<'a> Add<Wrapping<u128>> for &'a Wrapping<u128>
```

### &'a Wrapping\<usize>

```rust 
impl<'a> Add<Wrapping<usize>> for &'a Wrapping<usize>
```

### &'lhs Simd<T, LANES>

```rust 
impl<'lhs, 'rhs, T, const LANES: usize> Add<&'rhs Simd<T, LANES>> for &'lhs Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Add<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```

### Simd<T, LANES>

```rust 
impl<T, const LANES: usize> Add<&Simd<T, LANES>> for Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Add<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```

### &Simd<T, LANES>

```rust 
impl<T, const LANES: usize> Add<Simd<T, LANES>> for &Simd<T, LANES>
where
  T: SimdElement,
  Simd<T, LANES>: Add<Simd<T, LANES>, Output = Simd<T, LANES>>,
  LaneCount<LANES>: SupportedLaneCount,
```

### Simd<f32, N>

```rust 
impl<const N: usize> Add<Simd<f32, N>> for Simd<f32, N>
where
  f32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### Simd<f64, N>

```rust 
impl<const N: usize> Add<Simd<f64, N>> for Simd<f64, N>
where
  f64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### Simd<i8, N>

```rust 
impl<const N: usize> Add<Simd<i8, N>> for Simd<i8, N>
where
  i8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### Simd<i16, N>

```rust 
impl<const N: usize> Add<Simd<i16, N>> for Simd<i16, N>
where
  i16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### Simd<i32, N>

```rust 
impl<const N: usize> Add<Simd<i32, N>> for Simd<i32, N>
where
  i32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### Simd<i64, N>

```rust 
impl<const N: usize> Add<Simd<i64, N>> for Simd<i64, N>
where
  i64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### Simd<isize, N>

```rust 
impl<const N: usize> Add<Simd<isize, N>> for Simd<isize, N>
where
  isize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### Simd<u8, N>

```rust 
impl<const N: usize> Add<Simd<u8, N>> for Simd<u8, N>
where
  u8: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### Simd<u16, N>

```rust 
impl<const N: usize> Add<Simd<u16, N>> for Simd<u16, N>
where
  u16: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### Simd<u32, N>

```rust 
impl<const N: usize> Add<Simd<u32, N>> for Simd<u32, N>
where
  u32: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### Simd<u64, N>

```rust 
impl<const N: usize> Add<Simd<u64, N>> for Simd<u64, N>
where
  u64: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

### Simd<usize, N>

```rust
impl<const N: usize> Add<Simd<usize, N>> for Simd<usize, N>
where
  usize: SimdElement,
  LaneCount<N>: SupportedLaneCount,
```

