# Struct std::string::String

一个 `UTF-8` 编码的可增长字符串。

`String` 类型是最常见的字符串类型，拥有对该字符串内容的所有权。它与其借用的对应物，原始的 `str` 有着密切的关系。

```rust
pub struct String { /* private fields */ }
```



## 示例

可以使用 `String::from`从一个**字符串字面量**创建一个 `String`：

```rust
let hello = String::from("Hello, world!");
```

您可以使用 `push` 方法将 `char` 追加到 `String` 上，并使用 `push_str` 方法追加 `&str`：

```rust
let mut hello = String::from("Hello, ");

hello.push('w');
hello.push_str("orld!");
```

如果具有 `UTF-8` 字节的 `vector`，则可以使用 `from_utf8` 方法从中创建一个 `String`：

```rust
// vector 中的一些字节
let sparkle_heart = vec![240, 159, 146, 150];

// 我们知道这些字节是有效的，因此我们将使用 `unwrap()`。
let sparkle_heart = String::from_utf8(sparkle_heart).unwrap();

assert_eq!("💖", sparkle_heart);
```



## UTF-8

`Strings` 始终是有效的 `UTF-8`。如果您需要非 `UTF-8` 字符串，请考虑 `OsString`。它是相似的，但是没有 `UTF-8` 约束。因为 `UTF-8` 是可变宽度的编码，`Strings` 通常小于相同 `chars` 的数组:

```rust
use std::mem;

// `s` 是 ASCII 码，它表示每个 `char` 为一个字节
let s = "hello";
assert_eq!(s.len(), 5);

// 具有相同内容的 `char` 数组会更长，因为每个 `char` 都是四个字节
let s = ['h', 'e', 'l', 'l', 'o'];
let size: usize = s.into_iter().map(|c| mem::size_of_val(&c)).sum();
assert_eq!(size, 20);

// 但是，对于非 ASCII 字符串，差异会更小，有时它们是相同的
let s = "💖💖💖💖💖";
assert_eq!(s.len(), 20);

let s = ['💖', '💖', '💖', '💖', '💖'];
let size: usize = s.into_iter().map(|c| mem::size_of_val(&c)).sum();
assert_eq!(size, 20);
```

这就提出了一些有趣的问题，比如 `s[i]` 应该如何工作。 `i` 在这里应该是什么? 几个选项包括字节索引和 `char` 索引，但由于 `UTF-8` 编码，只有字节索引会提供时间特性索引。例如，可以使用 `chars` 获取第 `i` 个 `char`:

```rust
let s = "hello";
let third_character = s.chars().nth(2);
assert_eq!(third_character, Some('l'));

let s = "💖💖💖💖💖";
let third_character = s.chars().nth(2);
assert_eq!(third_character, Some('💖'));
```

接下来，`s[i]` 应该返回什么? 因为索引会返回对，底层，数据的引用，所以它可能是 `&u8`、`&[u8`] 或其他类似的东西。 由于我们只提供一个索引，`&u8` 是最有意义的，但这可能不是用户所期望的，并且可以通过 `as_bytes()`:

```rust
// 第一个字节是 104-`'h'` 的字节值
let s = "hello";
assert_eq!(s.as_bytes()[0], 104);
// or
assert_eq!(s.as_bytes()[0], b'h');

// 第一个字节是 240 这显然没有用
let s = "💖💖💖💖💖";
assert_eq!(s.as_bytes()[0], 240);
```

由于这些歧义或限制，简单地禁止使用 `usize` 进行索引:

```rust
let s = "hello";

// 以下内容将不会编译!
println!("The first letter of s is {}", s[0]);
```

然而，更清楚的是 `&s[i..j]` 应该如何工作 (即，使用范围进行索引)。

它应该接受字节索引 (作为特征时间) 并返回一个 `&str`，它是 `UTF-8` 编码的。这也称为 “字符串切片”。 

请注意，如果提供的字节索引不是字符边界，这将导致 `panic` - 有关更多详细信息，请参见 `is_char_boundary`。有关字符串切片的更多详细信息，请参见 `SliceIndex<str>` 的实现。有关字符串切片的非 `panic` 版本，请参见 `get`。

`bytes` 和 `chars` 方法分别返回字符串的字节和代码点的迭代器。要迭代代码点和字节索引，请使用 `char_indices`。



## Deref

**String 实现了 `Deref<Target = str>`，因此继承了 str 的所有方法**。另外，这意味着您可以使用与号 `&` 将 `String` 传递给采用 `&str` 的函数：

```rust
fn takes_str(s: &str) { }

let s = String::from("Hello");

takes_str(&s);
```

这将从 `String` 创建一个 `&str`，并将其传入。这种转换非常便宜，因此通常，函数会接受 `&str` 作为参数，除非出于某些特定原因它们需要 `String`。

在某些情况下，`Rust` 没有足够的信息来进行此转换，称为 `Deref` 强制多态。在以下示例中，字符串切片 `&'a str` 实现 `Trait` `trait`，函数 `_func` 接受实现 `trait` 的所有内容。 在这种情况下，`Rust` 将需要进行两次隐式转换，而 `Rust` 没有办法进行转换。 因此，以下示例将无法编译。

```rust
trait Trait {}

impl<'a> Trait for &'a str {}

fn _func<A: Trait>(_arg: A) {}

let _string = String::from("_string");
_func(&_string);
```

有两种选择可以代替。

- 第一种是使用方法 `as_str()` 显式提取包含该字符串的字符串切片，从而将 `_func(&_string);` 行更改为 `_func(_string.as_str());`。 
- 第二种方法将 `_func(&_string);` 更改为 `_func(&*_string);`。 

在这种情况下，我们将 `String` 解引用到 `str`，然后将`str` 引用回 `&str`。 第二种方法更惯用，但是两种方法都可以显式地进行转换，而不是依赖于隐式转换。





## Representation

`String` 由三个部分组成：指向某些字节的指针，长度和容量。指针指向 `String` 用于存储其数据的内部缓冲区。长度是当前存储在缓冲区中的字节数，容量是缓冲区的大小 (以字节为单位)。

这样，长度将始终小于或等于容量。

此缓冲区始终存储在堆中。

您可以使用 `as_ptr`，`len` 和 `capacity` 方法查看它们：

```rust
use std::mem;

let story = String::from("Once upon a time...");

// 防止自动丢弃字符串的数据
let mut story = mem::ManuallyDrop::new(story);

let ptr = story.as_mut_ptr();
let len = story.len();
let capacity = story.capacity();

// story 有十九个字节
assert_eq!(19, len);

// 我们可以用 ptr，len 和 capacity 重新构建一个 String。
// 这都是不安全的，因为我们有责任确保组件有效：
let s = unsafe { String::from_raw_parts(ptr, len, capacity) } ;

assert_eq!(String::from("Once upon a time..."), s);
```

如果 String 具有足够的容量，则向其添加元素将不会重新分配。例如，考虑以下程序：

```rust
let mut s = String::new();

println!("{}", s.capacity());

for _ in 0..5 {
    s.push_str("hello");
    println!("{}", s.capacity());
}
```

这将输出以下内容：

```text
0
8
16
16
32
32
```

最初，我们根本没有分配任何内存，但是当我们追加到字符串后，它会适当地增加其容量。如果我们改为使用 `with_capacity`方法来初始分配正确的容量，请执行以下操作：

```rust
let mut s = String::with_capacity(25);

println!("{}", s.capacity());

for _ in 0..5 {
    s.push_str("hello");
    println!("{}", s.capacity());
}
```

我们最终得到了不同的输出：

```text
25
25
25
25
25
25
```

在这里，不需要在循环内分配更多的内存。





## Implementations



### impl String

#### new

创建一个新的空 `String`。不会分配任何初始缓冲区

```rust
pub const fn new() -> String
```

**返回值**：返回一个空的`String`

```rust
let s = String::new();
```



#### with_capacity

创建一个具有指令容量的空`String`，容量是该缓冲区的长度

如果给定的容量为 `0`，则不会进行分配，并且此方法与 `new` 方法相同。

可以用`capacity`方法获取`String`的容量

```rust
pub fn with_capacity(capacity: usize) -> String
```

**参数**：

- **capacity**：指定容量，缓冲区的长度

**返回值**：返回一个具有指定容量的新`String`

```rust
let s = String::with_capacity(10);
println!("{:#?}", s.len());  // 0		因为没有实际内容
println!("{:#?}", s.capacity());  // 10		预定的10容量
```

:::tip 

当不断的往`String`中添加新的字符串，导致容量超出预定时。`String`会自动扩容

```rust
fn main() {
    let mut s = String::with_capacity(10);
    println!("{:#?}", s.capacity()); // 10
    for _ in 1..=10 {
        s.push('A')
    }
    println!("{:#?}", s.capacity()); // 10

    // 达到指定容量后再添加
    s.push('A');
    s.push('A');
    s.push('A');
    s.push('A');
    println!("{:#?}", s.capacity()); // 20  成倍扩容

}
```

可以看到`String`会成倍扩容

验证一下

```rust
fn main() {
    let mut s = String::with_capacity(20);
    println!("{:#?}", s.capacity()); // 20
    for _ in 1..=20 {
        s.push('A')
    }
    println!("{:#?}", s.capacity()); // 20

    // 达到指定容量后再添加
    s.push('A');
    s.push('A');
    s.push('A');
    s.push('A');
    println!("{:#?}", s.capacity()); // 40
}
```

:::



#### into_bytes

将 `String` 转换为字节 `vector`。

这会消耗 `String`，因此我们不需要复制其内容。

```rust
pub fn into_bytes(self) -> Vec<u8, Global>
```

**返回值**：返回一个字节vec

```rust
let s = String::from("你好");
let v = s.into_bytes();

println!("{:?}", v);  // [228, 189, 160, 229, 165, 189]
```





#### from_utf8

将字节的 `vector` 转换为 `String`。

字符串`String`由字节`u8`组成，字节`Vec<u8>`的 `vector` 由字节组成，因此此函数在两者之间进行转换。 并非所有的字节片都是有效的 `String`，但是: `String` 要求它是有效的 `UTF-8`。 `from_utf8()` 检查以确保字节是有效的 `UTF-8`，然后进行转换。

```rust
pub fn from_utf8(vec: Vec<u8, Global>) -> Result<String, FromUtf8Error>
```

**参数**：

- **vec**：一个由字节`u8`组成的`vec`

**返回值**：返回一个`Result`，包含转化后的`String`，若转化失败，则返回具体的失败原因

```rust
fn main() {
    let s = String::from("你好");
    let v = s.into_bytes();  // into_bytes把字符串转化为字节vec<u8>

    println!("{:?}", v);  // [228, 189, 160, 229, 165, 189]

    let s = String::from_utf8(v);
    println!("{:?}", s); // Ok("你好")
}
```

:::tip

如果切片不是 `UTF-8`，则返回`Err`，并说明为什么提供的字节不是 `UTF-8`。还包括您移入的 vector。

因为上面你好的字节是`[228, 189, 160, 229, 165, 189]`，随便改一个元素，比如189改为122

```rust
fn main() {
    let v = vec![228, 189, 160, 229, 165, 122];

    let s = String::from_utf8(v);
    println!("{:?}", s); 
    // Err(FromUtf8Error { bytes: [228, 189, 160, 229, 165, 122], error: Utf8Error { valid_up_to: 3, error_len: Some(2) } })
}
```

:::



#### from_utf8_lossy

将字节切片转换为字符串，包括无效字符。

无效字符将会转换成 [`U+FFFD REPLACEMENT CHARACTER`](https://www.rustwiki.org.cn/zh-CN/std/char/constant.REPLACEMENT_CHARACTER.html)

```rust
pub fn from_utf8_lossy(v: &[u8]) -> Cow<'_, str>
```

**参数**：

- **v**：一个`u8`字节切片

**返回值**：返回一个`Cow`，如果字节切片的 `UTF-8` 无效，则需要插入替换字符，这将更改字符串的大小，因此需要 `String`。 但是，如果它已经是有效的 `UTF-8`，则不需要新的分配。 这种返回类型使我们能够处理两种情况。

已知："你好"转化为u8字节是`[228, 189, 160, 229, 165, 189]`

```rust
fn main() {
    let v = [228, 189, 160, 229, 165, 189];

    println!("{:?}", String::from_utf8_lossy(&v)); // "你好"

    // 若包含无效字符
    let v = [228, 189, 160, 229, 165, 122];
    println!("{:?}", String::from_utf8_lossy(&v)); // "你�z"
}
```



#### from_utf8_unchecked

将字节的 `vector` 转换为 `String`，而无需检查字符串是否包含有效的 UTF-8。

遇到无效的`UTF-8`则会`panic`

```rust
pub unsafe fn from_utf8_unchecked(bytes: Vec<u8, Global>) -> String
```

**参数**：

- **bytes**：一个`u8`字节`vec`

**返回值**：返回被转换后的`String`

```rust
fn main() {
    let v = [228, 189, 160, 229, 165, 189];

    unsafe {
        println!("{:?}", String::from_utf8_unchecked(v.to_vec())); // "你好"
    }
    // 若包含无效字符
    let v = [228, 189, 160, 229, 165, 122];
    unsafe {
        println!("{:?}", String::from_utf8_unchecked(v.to_vec())); // panic
    }
}
```



#### from_utf16

将 `UTF-16` 编码的`vec`解码为 `String`，如果 `vec` 包含任何无效数据，则返回 `Err`。

```rust
pub fn from_utf16(v: &[u16]) -> Result<String, FromUtf16Error>
```

**参数**：

- **v**：一个包含`UTF-16`的vec切片

**返回值**：返回一个`Result`，包含转化后的`String`，若转化失败，则返回具体的失败原因

`str`的`encode_utf16`可以把`String`转化为`utf16`的迭代器

```rust
fn main() {
    let s = String::from("你好");

    let v: Vec<u16> = s.encode_utf16().collect();
    println!("{:?}", v); // [20320, 22909]

    println!("{:?}", String::from_utf16(&v));  // Ok("你好")
}
```



#### from_utf16_lossy

将 `UTF-16` 编码的`vec`切片解码为 `String`，将无效数据替换为 [替换字符 (`U+FFFD`)](https://www.rustwiki.org.cn/zh-CN/std/char/constant.REPLACEMENT_CHARACTER.html)。

```rust
pub fn from_utf16(v: &[u16]) -> Result<String, FromUtf16Error>
```

**参数**：

- **v**：一个包含`UTF-16`的vec切片

**返回值**：返回转化后的`String`

```rust
fn main() {
	let ve=vec![20320, 22909,22908];

    println!("{:?}", String::from_utf16_lossy(&ve));  // "你好奼"
}
```



#### into_raw_parts

`nightly-only`

将 `String` 分解为其原始组件。

返回指向底层数据的裸指针，字符串的长度 (以字节为单位) 和数据的已分配容量 (以字节为单位)。 这些参数与 [`from_raw_parts`](https://www.rustwiki.org.cn/zh-CN/std/string/struct.String.html#method.from_raw_parts) 的参数顺序相同。

调用此函数后，调用者将负责先前由 `String` 管理的内存。 唯一的方法是使用 [`from_raw_parts`](https://www.rustwiki.org.cn/zh-CN/std/string/struct.String.html#method.from_raw_parts) 函数将裸指针，长度和容量转换回 `String`，从而允许析构函数执行清除操作。

```rust
pub fn into_raw_parts(self) -> (*mut u8, usize, usize)
```

**返回值**：返回一个元素，分别是：裸指针、字符串长度、容量

```rust
#![feature(vec_into_raw_parts)]
let s = String::from("hello");

let (ptr, len, cap) = s.into_raw_parts();

let rebuilt = unsafe { String::from_raw_parts(ptr, len, cap) };
assert_eq!(rebuilt, "hello");
```



#### from_raw_parts

根据长度，容量和指针创建一个新的 `String`。

```rust
pub unsafe fn from_raw_parts(
    buf: *mut u8,
    length: usize,
    capacity: usize
) -> String
```

**参数**：

- **buf**：指向字符串的指针
- **length**：字符串的长度
- **capacity**：字符串容器的容量

**返回值**：

```rust
use std::mem;

unsafe {
    let s = String::from("hello");

    // 防止自动丢弃字符串的数据
    let mut s = mem::ManuallyDrop::new(s);

    let ptr = s.as_mut_ptr();
    let len = s.len();
    let capacity = s.capacity();

    let s = String::from_raw_parts(ptr, len, capacity);

    assert_eq!(String::from("hello"), s);
}
```

:::tip Safety

这是非常不安全的，因为没有检查的不变量的数量：

- `buf` 处的内存需要由标准库使用的同一分配器预先分配，并且需要精确对齐 1.
- `length` 需要小于或等于 `capacity`。
- `capacity` 需要是正确的值。
- `buf` 的前 `length` 字节必须为有效的 UTF-8。

违反这些可能会导致一些问题，比如破坏分配器的内部数据结构。 例如，从指向包含 UTF-8 的 C `char` 数组的指针构建 `String` 通常**不**安全，除非您确定该数组最初是由 Rust 标准库的分配器分配的。

`buf` 的所有权有效地转移到 `String`，然后 `String` 可以随意释放，重新分配或更改指针所指向的内存的内容。 调用此函数后，请确保没有其他任何东西使用该指针。

:::



#### as_str

把`String`转换为字符串切片`&str`

```rust
pub fn as_str(&self) -> &str
```

**返回值**：返回被转换的字符串切片

```rust
fn main() {
    let s = String::from("foo");

    println!("{:#?}", s.as_str()); // "foo"
}
```



#### as_mut_str

把`String`转换为字符串切片`&str`的可变引用

```rust
pub fn as_mut_str(&mut self) -> &mut str
```

**返回值**：返回被转换的字符串切片可变引用 

```rust
fn main() {
    let mut s = String::from("foobar");
    let s_mut_str = s.as_mut_str();

    s_mut_str.make_ascii_uppercase();

    println!("{:#?}", s_mut_str);  // "FOOBAR"
}
```



#### push

将给定的**字符**追加到该 `String` 的末尾。

```rust
pub fn push(&mut self, ch: char)
```

**参数**：

- **ch**：需要追加的字符

```rust
let mut s = String::from("abc");

s.push('1');
s.push('2');
s.push('3');

assert_eq!("abc123", s);
```



#### push_str

将给定的字符串切片追加到这个 `String` 的末尾。

```rust
pub fn push_str(&mut self, string: &str)
```

**参数**：

- **string**：需要追加的字符串切片

```rust
fn main() {
    let mut s = String::from("foo");

    s.push_str("123");
    s.push_str(&"123".to_string());

	println!("{:#?}", s);  // "foo123123"
}
```





#### extend_from_within

`nightly-only`

将 `src` 范围内的元素复制到字符串的末尾。

```rust
pub fn extend_from_within<R>(&mut self, src: R)
where
    R: RangeBounds<usize>,
```

**参数**：

- **src**：一个`RangeBounds`范围

```rust
#![feature(string_extend_from_within)]
let mut string = String::from("abcde");

string.extend_from_within(2..);
assert_eq!(string, "abcdecde");

string.extend_from_within(..2);
assert_eq!(string, "abcdecdeab");

string.extend_from_within(4..8);
assert_eq!(string, "abcdecdeabecde");
```

:::tip Panic

如果起始点或结束点不在 `char` 边界上，或超出边界，就会出现 panic。

:::





#### capacity

返回此字符串容器的容量 (以字节为单位)。

```rust
pub fn capacity(&self) -> usize
```

**返回值**：返回以字节为单位的容量

```rust
let s = String::with_capacity(10);

assert!(s.capacity() >= 10);
```



#### reserve

**确保 capacity 至少达到某个值**，而不改变 len。

调用 `reserve` 后，容量将大于或等于 `self.len() + additional`。 如果容量已经足够，则不执行任何操作。

```rust
pub fn reserve(&mut self, additional: usize)
```

**参数**：

- **additional**：预设的容量

```rust
fn main() {
    let mut s = String::new();
    s.reserve(10_000); // 提前预留 1 万字节

    for i in 0..1000 {
        s.push_str("data "); // 不会再因扩容而拷贝
    }
}
```

`reserve` vs `with_capacity`，两者都预分配内存，但时机不同：

| **方法**                                            | **调用时机**                 | **示例**                                  |
| :-------------------------------------------------- | :--------------------------- | :---------------------------------------- |
| `Vec::with_capacity(n)`/ `String::with_capacity(n)` | **创建时**就指定容量         | `let mut v = Vec::with_capacity(100);`    |
| `reserve(n)`                                        | **创建后**，在已有实例上扩充 | `let mut v = Vec::new(); v.reserve(100);` |





#### reserve_exact

保留至少比当前长度多 `additional` 字节的最小容量。

调用 `reserve_exact` 后，容量将大于或等于 `self.len() + additional`。 如果容量已经足够，则不执行任何操作。

```rust
pub fn reserve_exact(&mut self, additional: usize)
```

**参数**：

- **additional**：比当前容量多出的容量

**返回值**：

```rust
fn main() {
    let mut s = String::with_capacity(10);
    s.push('A');
    s.push('A');
    s.push('A');
    println!("{:#?}", s.len()); // 3
    println!("{:#?}", s.capacity()); // 10

    s.reserve_exact(10);
    println!("{:#?}", s.capacity()); //13
}
```



#### try_reserve

尝试为至少比当前长度多 `additional` 字节的容量保留容量。 分配器可以保留更多空间来推测性地避免频繁分配。 调用 `try_reserve` 后，如果返回 `Ok(())`，容量将大于等于 `self.len() + additional`。

如果容量已经足够，则不执行任何操作。 即使发生错误，此方法也会保留内容。

```rust
pub fn try_reserve(&mut self, additional: usize) -> Result<(), TryReserveError>
```

**参数**：

- **additional**：比当前容量多出的容量

**返回值**：返回一个`Result`

```rust
fn main() {
    let mut s = String::with_capacity(10);
    s.push('A');
    s.push('A');
    s.push('A');
    println!("{:#?}", s.len()); // 3
    println!("{:#?}", s.capacity()); // 10

    s.try_reserve(10).unwrap();
    println!("{:#?}", s.capacity()); //20
}
```



#### try_reserve_exact

尝试为至少比当前长度多 `additional` 字节的最小容量保留。 与 `try_reserve` 不同，这不会故意过度分配以推测性地避免频繁分配。 调用 `try_reserve_exact` 后，如果返回 `Ok(())`，则容量将大于或等于 `self.len() + additional`。

如果容量已经足够，则不执行任何操作。

请注意，分配器可能会给集合提供比其请求更多的空间。 因此，不能依靠容量来精确地最小化。 如果希望将来插入，则首选 `try_reserve`。

```rust
pub fn try_reserve_exact(
    &mut self,
    additional: usize
) -> Result<(), TryReserveError>
```

**参数**：

- **additional**：比当前容量多出的容量

**返回值**：返回一个`Result`

```rust
use std::collections::TryReserveError;

fn process_data(data: &str) -> Result<String, TryReserveError> {
    let mut output = String::new();

    // 预先保留内存，如果不能，则退出
    output.try_reserve_exact(data.len())?;

    // 现在我们知道在我们复杂的工作中这不能 OOM
    output.push_str(data);

    Ok(output)
}
```



#### shrink_to_fit

缩小此 `String` 的容量以使其长度匹配。

```rust
pub fn shrink_to_fit(&mut self)
```

示例

```rust
let mut s = String::from("foo");

s.reserve(100);
assert!(s.capacity() >= 100);

s.shrink_to_fit();
assert_eq!(3, s.capacity());
```



#### shrink_to

降低 `String` 至指定的容量。

容量将至少保持与长度和提供的值一样大。

如果当前容量小于下限，则为无操作。

```rust
pub fn shrink_to(&mut self, min_capacity: usize)
```

示例

```rust
let mut s = String::from("foo");

s.reserve(100);
assert!(s.capacity() >= 100);

s.shrink_to(10);
assert!(s.capacity() >= 10);
s.shrink_to(0);
assert!(s.capacity() >= 3);
```





#### as_bytes

返回此 String 内容的字节切片。

与此方法的相反的是 [`from_utf8`](#from_utf8)。

```rust
pub fn as_bytes(&self) -> &[u8]
```

**返回值**：返回`String`转化后的字节切片

```rust
let s = String::from("hello");

assert_eq!(&[104, 101, 108, 108, 111], s.as_bytes());
```



#### truncate

将此 `String` 缩短为指定的长度。

如果 `new_len` 大于字符串的当前长度，则无效。

请注意，此方法对字符串的分配容量没有影响

```rust
pub fn truncate(&mut self, new_len: usize)
```

**参数**：

- **new_len**：新的长度

```rust
let mut s = String::from("hello");

s.truncate(2);

assert_eq!("he", s);
```

:::tip Panic

如果 `new_len` 不位于`char`边界上，就会出现 panics。

:::



#### pop

从字符串缓冲区中删除最后一个字符并返回它。

如果 `String` 为空，则返回 `None`。

```rust
pub fn pop(&mut self) -> Option<char>
```

**返回值**：返回一个`Option`，若删除成功，则包含删除的字符，否则返回`None`

```rust
let mut s = String::from("foo");

assert_eq!(s.pop(), Some('o'));
assert_eq!(s.pop(), Some('o'));
assert_eq!(s.pop(), Some('f'));

assert_eq!(s.pop(), None);
```



#### remove

从该 `String` 的字节位置删除`char`并将其返回。

这是 *O*(*n*) 操作，因为它需要复制缓冲区中的每个元素。

```rust
pub fn remove(&mut self, idx: usize) -> char
```

**参数**：

- **idx**：需要删除的字符从索引

**返回值**：返回删除的字符

```rust
let mut s = String::from("foo");

assert_eq!(s.remove(0), 'f');
assert_eq!(s.remove(1), 'o');
assert_eq!(s.remove(0), 'o');
```



#### remove_matches

删除 `String` 中所有模式 `pat` 的匹配项。

```rust
pub fn remove_matches<P, 'a>(&'a mut self, pat: P)
where
    P: for<'x> Pattern<'x>,
```

**参数**：

- **pat**：

```rust
#![feature(string_remove_matches)]
let mut s = String::from("Trees are not green, the sky is not blue.");
s.remove_matches("not ");
assert_eq!("Trees are green, the sky is blue.", s);
```

匹配项将被检测并迭代删除，因此在样式重叠的情况下，仅第一个样式将被删除：

```rust
#![feature(string_remove_matches)]
let mut s = String::from("banana");
s.remove_matches("ana");
assert_eq!("bna", s);
```



#### retain

仅保留谓词指定的字符

```rust
pub fn retain<F>(&mut self, f: F)
where
    F: FnMut(char) -> bool,
```

**参数**：

- **f**：谓词函数，若返回`true`，则保留当前字符

```rust
let mut s = String::from("f_o_ob_ar");

s.retain(|c| c != '_');

assert_eq!(s, "foobar");
```



#### insert

在此 `String` 的字节位置插入一个**字符**。

这是一个 *O*(*n*) 操作，因为它需要复制缓冲区中的每个元素。

```rust
pub fn insert(&mut self, idx: usize, ch: char)
```

**参数**：

- **idx**：插入位置的索引
- **ch**：插入的字符

```rust
fn main() {
    let mut str = String::from("hello");

    str.insert(3, 'A');
    println!("{:#?}", str); // "helAlo"
}
```

:::tip Panic

如果 `idx` 大于 `String` 的长度，或者它不在`char`边界上，就会出现 panics。

:::



#### insert_str

在此 `String` 的字节位置处插入**字符串切片**。

这是一个 *O*(*n*) 操作，因为它需要复制缓冲区中的每个元素。

```rust
pub fn insert_str(&mut self, idx: usize, string: &str)
```

**参数**：

- **idx**：插入位置的索引
- **string**：插入的字符串切片

```rust
fn main() {
    let mut str = String::from("hello");

    str.insert_str(3, "ikun");
    println!("{:#?}", str); // "helikunlo"
}
```



#### as_mut_vec

返回`String`转化为字节的vec可变引用

```rust
pub unsafe fn as_mut_vec(&mut self) -> &mut Vec<u8, Global>
```

**返回值**：返回`String`转化为字节的vec可变引用

```rust
let mut s = String::from("hello");

unsafe {
    let vec = s.as_mut_vec();
    assert_eq!(&[104, 101, 108, 108, 111][..], &vec[..]);

    vec.reverse();
}
assert_eq!(s, "olleh");
```



#### len

返回此 `String` 的长度，**以字节为单位**，而不是 `char`或字数。它可能不是人类认为的字符串长度。

```rust
pub fn len(&self) -> usize
```

**返回值**：返回此 `String` 的长度

```rust
let a = String::from("foo");
assert_eq!(a.len(), 3);

let fancy_f = String::from("ƒoo");
assert_eq!(fancy_f.len(), 4);
assert_eq!(fancy_f.chars().count(), 3);
```



#### is_empty

判断`String`是否为空字符串

```rust
pub fn is_empty(&self) -> bool
```

**返回值**：根据`String`是否为空字符串，返回`bool`值

```rust
let mut v = String::new();
assert!(v.is_empty());

v.push('a');
assert!(!v.is_empty());
```



#### split_off

在给定的字节索引处将字符串拆分为两个。

返回新分配的 `String`。 `self` 包含字节 `[0, at)`，返回的 `String` 包含字节 `[at, len)`。 `at` 必须位于 UTF-8 代码点的边界上。

```rust
pub fn split_off(&mut self, at: usize) -> String
```

**参数**：

- **at**：拆分位置的索引

**返回值**：返回拆分后处于`[at, len)`范围的字符串

```rust
let mut hello = String::from("Hello, World!");
let world = hello.split_off(7);
assert_eq!(hello, "Hello, ");
assert_eq!(world, "World!");
```

:::tip Panic

如果 `at` 不在 `UTF-8` 代码点边界上，或者它超出字符串的最后一个代码点，就会出现 panics。

:::



#### clear

清空字符串容器，但不影响容量

```rust
pub fn clear(&mut self)
```

**返回值**：

```rust
fn main() {
    let mut s = String::from("foo");

    s.clear();

    println!("{:#?}", s.is_empty()); // true
    println!("{:#?}", s.len()); // 0
    println!("{:#?}", s.capacity()); // 3
}
```



#### drain

从字符串中批量删除指定范围内的内容，并以迭代器的形式返回所有删除的字符。

返回的迭代器在字符串上保留一个可变借用以优化其实现。

```rust
pub fn drain<R>(&mut self, range: R) -> Drain<'_> 
where
    R: RangeBounds<usize>,
```

**参数**：

- **range**：需要删除的字符串的索引，是一个范围

**返回值**：返回一个`Drain`迭代器

```rust
let mut s = String::from("α is alpha, β is beta");
let beta_offset = s.find('β').unwrap_or(s.len());

// 删除范围直到字符串中的 β
let t: String = s.drain(..beta_offset).collect();
assert_eq!(t, "α is alpha, ");
assert_eq!(s, "β is beta");

// 全范围清除字符串，就像 `clear()` 一样
s.drain(..);
assert_eq!(s, "");
```

:::tip Panic

如果起始点或结束点不在 [`char`](https://www.rustwiki.org.cn/zh-CN/std/primitive.char.html) 边界上，或超出边界，就会出现 panic。

:::

:::tip Leaking

如果返回的迭代器离开作用域而没有被丢弃 (例如，由于 [`core::mem::forget`](https://www.rustwiki.org.cn/zh-CN/std/mem/fn.forget.html))，则字符串可能仍包含任何耗尽字符的副本，或者可能任意丢失字符，包括范围外的字符。

:::



#### replace_range

删除字符串中的指定范围，并将其替换为给定的字符串。 给定的字符串不必与范围相同。

```rust
pub fn replace_range<R>(&mut self, range: R, replace_with: &str)
where
    R: RangeBounds<usize>,
```

**参数**：

- **range**：需要被替换的内容索引，是个范围
- **replace_with**：替换的内容，字符串切片

**返回值**：

```rust
let mut s = String::from("α is alpha, β is beta");
let beta_offset = s.find('β').unwrap_or(s.len());

// 替换范围直到字符串中的 β
s.replace_range(..beta_offset, "Α is capital alpha; ");
assert_eq!(s, "Α is capital alpha; β is beta");
```

:::tip Panic

如果起始点或结束点不在 [`char`](https://www.rustwiki.org.cn/zh-CN/std/primitive.char.html) 边界上，或超出边界，就会出现 panic。

:::



#### into_boxed_str

将此 `String` 转换为 `Box<str>`。

这将丢弃任何多余的容量。

```rust
pub fn into_boxed_str(self) -> Box<str, Global>
```

**返回值**：返回一个`Box`

```rust
fn main() {
    let s = String::from("hello");

    let b = s.into_boxed_str();

    println!("{:#?}", b); // "hello"
}
```



#### leak

消耗并泄漏 `String`，将可变引用返回到内容 `&'a mut str`。

这主要适用于在程序剩余生命周期中存在的数据。 丢弃返回的引用将导致内存泄漏。

它不会重新分配或收缩 `String`，因此泄漏的分配可能包括不属于返回片的未使用容量。

```rust
ppub fn leak<'a>(self) -> &'a mut str
```

**返回值**：返回自身的可变引用

```rust
#![feature(string_leak)]

let x = String::from("bucket");
let static_ref: &'static mut str = x.leak();
assert_eq!(static_ref, "bucket");
```



## Methods from Deref<Target = str>

#### len

返回 `self` 的长度。

该长度**以字节为单位**，而不是 `char` 或字素。 换句话说，它可能不是人类认为的字符串长度。

```rust
pub const fn len(&self) -> usize
```

**返回值**：返回字符串的字节数

```rust
let len = "foo".len();
assert_eq!(3, len);

assert_eq!("ƒoo".len(), 4); // fancy f!
assert_eq!("ƒoo".chars().count(), 3);
```



#### is_empty

判断self字符串的长度是否为0字节

```rust
pub const fn is_empty(&self) -> bool
```

**返回值**：如果self为0字节，返回true，否则返回false

```rust
let s = "";
assert!(s.is_empty());

let s = "not empty";
assert!(!s.is_empty());
```



#### is_char_boundry

检查第 `index` 个字节是 UTF-8 代码点序列中的第一个字节还是字符串的末尾（是否为边界字符）

字符串的开头和结尾 (当 `index == self.len()`) 被视为边界时。

如果 `index` 大于 `self.len()`，则返回 `false`。

```rust
pub fn is_char_boundary(&self, index: usize) -> bool
```

**参数**：

- **index**：需要检查的字节的索引

**返回值**：根据是否为边界字符返回bool值

```rust
let s = "Löwe 老虎 Léopard";
assert!(s.is_char_boundary(0));
// start of `老`
assert!(s.is_char_boundary(6));
assert!(s.is_char_boundary(s.len()));

// `ö` 的第二个字节
assert!(!s.is_char_boundary(2));

// third byte of `老`
assert!(!s.is_char_boundary(8));
```



#### floor_char_boundry

`nightly-only`

查找不超过 `index` 的最接近的 `x`，其中 `is_char_boundary(x)` 是 `true`。

此方法可以帮助您截断字符串，使其仍然是有效的 UTF-8，但不超过给定的字节数。 请注意，这纯粹是在字符级别完成的，并且仍然可以在视觉上分割字素，即使底层字符没有被分割。

例如，表情符号 🧑‍ (科学家) 可以被拆分，以便字符串仅包含 🧑 (人)。

```rust
pub fn floor_char_boundary(&self, index: usize) -> usize
```

**参数**：

- **index**：需要检查的字节的索引

**返回值**：根据是否为边界字符返回bool值

```rust
#![feature(round_char_boundary)]
let s = "❤️🧡💛💚💙💜";
assert_eq!(s.len(), 26);
assert!(!s.is_char_boundary(13));

let closest = s.floor_char_boundary(13);
assert_eq!(closest, 10);
assert_eq!(&s[..closest], "❤️🧡");
```



#### ceil_char_boundry

`nightly-only`

查找不低于 `index` 的最接近的 `x`，其中 `is_char_boundary(x)` 是 `true`。

这种方法是对 `floor_char_boundary`的自然补充。 有关更多详细信息，请参见该方法。

```rust
pub fn ceil_char_boundary(&self, index: usize) -> usize
```

**参数**：

- **index**：需要检查的字节的索引

**返回值**：根据是否为边界字符返回bool值

```rust
#![feature(round_char_boundary)]
let s = "❤️🧡💛💚💙💜";
assert_eq!(s.len(), 26);
assert!(!s.is_char_boundary(13));

let closest = s.ceil_char_boundary(13);
assert_eq!(closest, 14);
assert_eq!(&s[..closest], "❤️🧡💛");
```

:::tip panic

如果 `index > self.len()`，就会出现 panic。

:::



#### as_bytes

将字符串切片转换为字节切片。

要将字节切片切回为字符串切片，请使用 `from_utf8` 函数。

```rust
pub const fn as_bytes(&self) -> &[u8]
```

**返回值**：返回被转化后的字节切片

```rust
let bytes = "bors".as_bytes();
assert_eq!(b"bors", bytes);
```



#### as_bytes_mut

将可变字符串切片转换为可变字节切片。

```rust
pub unsafe fn as_bytes_mut(&mut self) -> &mut [u8] 
```

**返回值**：返回转换后的字节切片的可变引用

```rust
let mut s = String::from("Hello");
let bytes = unsafe { s.as_bytes_mut() };

assert_eq!(b"Hello", bytes);
```

:::tip

调用者必须确保在借用结束和使用底层 `str` 之前，切片的内容是有效的 UTF-8。

使用内容无效的 `str` UTF-8 是未定义的行为。

:::



#### as_ptr

将字符串切片转换为裸指针。

由于字符串切片是字节的切片，所以裸指针指向 `u8`。 该指针将指向字符串切片的第一个字节。

调用者必须确保返回的指针永远不会被写入。 

```rust
pub const fn as_ptr(&self) -> *const u8
```

**返回值**：返回字符串切片的裸指针

```rust
let s = "Hello";
let ptr = s.as_ptr();
```



#### as_mut_ptr

将可变字符串切片转换为裸指针。

由于字符串切片是字节的切片，所以裸指针指向 [`u8`](https://www.rustwiki.org.cn/zh-CN/std/primitive.u8.html)。 该指针将指向字符串切片的第一个字节。

您有责任确保仅以有效的 UTF-8 方式修改字符串切片。

```rust
pub fn as_mut_ptr(&mut self) -> *mut u8
```



#### get

返回 `str` 的子切片。

这是索引 `str` 的非紧急选择。 每当等效的索引操作将为 panic 时，将返回 `None`。

```rust
pub fn get<I>(&self, i: I) -> Option<&<I as SliceIndex<str>>::Output>
where
    I: SliceIndex<str>,
```

**参数**：

- **i**：需要获取的子切片的索引，该索引位置指的是字节的索引，不是字符

**返回值**：返回一个`Option`，包含索引范围内的字符串子切片

```rust
fn main() {
    let str = &"hello world";
    println!("{:?}", str.get(0..5)); // Some("hello")
}
```

注意索引指的是字节索引

```rust
let v = String::from("🗻∈🌏");

assert_eq!(Some("🗻"), v.get(0..4));

// 索引不在 UTF-8 序列边界上
assert!(v.get(1..).is_none());
assert!(v.get(..8).is_none());

// 越界
assert!(v.get(..42).is_none());
```



#### get_mut

返回 `str` 的可变子切片。

这是索引 `str` 的非紧急选择。 每当等效的索引操作将为 panic 时，将返回 `None`。

```rust
pub fn get_mut<I>(
    &mut self,
    i: I
) -> Option<&mut <I as SliceIndex<str>>::Output>
where
    I: SliceIndex<str>,
```

**参数**：

- **i**：需要获取的子切片的索引，该索引位置指的是字节的索引，不是字符

**返回值**：返回一个`Option`，包含索引范围内的字符串子切片的可变引用

```rust
let mut v = String::from("hello");
// 正确的长度
assert!(v.get_mut(0..5).is_some());
// 越界
assert!(v.get_mut(..42).is_none());
assert_eq!(Some("he"), v.get_mut(0..2).map(|v| &*v));

assert_eq!("hello", v);
{
    let s = v.get_mut(0..2);
    let s = s.map(|s| {
        s.make_ascii_uppercase();
        &*s
    });
    assert_eq!(Some("HE"), s);
}
assert_eq!("HEllo", v);
```



#### get_unchecked

返回未经检查的 `str` 子切片。

这是索引 `str` 的未经检查的替代方法。

```rust
pub unsafe fn get_unchecked<I>(&self, i: I) -> &<I as SliceIndex<str>>::Output
where
    I: SliceIndex<str>,
```

**参数**：

- **i**：需要获取的子切片的索引，该索引位置指的是字节的索引，不是字符

**返回值**：返回索引范围的字符串子切片

```rust
let v = "🗻∈🌏";
unsafe {
    assert_eq!("🗻", v.get_unchecked(0..4));
    assert_eq!("∈", v.get_unchecked(4..7));
    assert_eq!("🌏", v.get_unchecked(7..11));
}
```

:::tip Safety

此函数的调用者有责任满足以下先决条件：

- 起始索引不得超过结束索引；
- 索引必须在原始切片的范围内；
- 索引必须位于 UTF-8 序列边界上。

否则，返回的字符串切片可能会引用无效的内存或违反 `str` 类型传达的不变量。

:::



#### get_unchecked_mut

返回 `str` 未经检查的子切片的可变引用。

这是索引 `str` 的未经检查的替代方法。

```rust
pub unsafe fn get_unchecked_mut<I>(
    &mut self,
    i: I
) -> &mut <I as SliceIndex<str>>::Output
where
    I: SliceIndex<str>,
```

**参数**：

- **i**：需要获取的子切片的索引，该索引位置指的是字节的索引，不是字符

**返回值**：返回索引范围的字符串子切片的可变引用

```rust
let mut v = String::from("🗻∈🌏");
unsafe {
    assert_eq!("🗻", v.get_unchecked_mut(0..4));
    assert_eq!("∈", v.get_unchecked_mut(4..7));
    assert_eq!("🌏", v.get_unchecked_mut(7..11));
}
```

:::tip Safety

此函数的调用者有责任满足以下先决条件：

- 起始索引不得超过结束索引；
- 索引必须在原始切片的范围内；
- 索引必须位于 UTF-8 序列边界上。

否则，返回的字符串切片可能会引用无效的内存或违反 `str` 类型传达的不变量。

:::





#### split_at

在索引处将一个字符串切片分成两个。

参数 `mid` 应该是字符串开头的字节偏移量。 它也必须在 UTF-8 代码点的边界上。

返回的两个切片从字符串切片的开头到 `mid`，从 `mid` 到字符串切片的结尾。

```rust
pub fn split_at(&self, mid: usize) -> (&str, &str)
```

**参数**：

- **mid**：需要切分处的索引，注意是字节偏移量

**返回值**：返回一个元组

- 第一个是切分后，左边的字符串，不包含索引处字符
- 第二个是切分后，右边的字符串，包含索引处字符

```rust
fn main() {
    let str = &"helloworld";
    println!("{:?}", str.split_at(5)); // ("hello", "world")
}
```

:::tip panics

如果 `mid` 不在 UTF-8 代码点边界上，或者它超过了字符串切片的最后一个代码点的末尾，就会出现 panics。

:::



#### split_at_mut

在索引处将一个可变字符串切片切成两部分。

参数 `mid` 应该是字符串开头的字节偏移量。 它也必须在 UTF-8 代码点的边界上。

返回的两个切片从字符串切片的开头到 `mid`，从 `mid` 到字符串切片的结尾。

```rust
pub fn split_at_mut(&mut self, mid: usize) -> (&mut str, &mut str)
```

**参数**：

- **mid**：需要切分处的索引，注意是字节偏移量

**返回值**：返回一个元组

- 第一个是切分后，左边的字符串的可变引用，不包含索引处字符
- 第二个是切分后，右边的字符串的可变引用，包含索引处字符

```rust
fn main() {
    let mut str = "helloworld".to_string();
    let (front, back) = str.split_at_mut(5);

    front.make_ascii_uppercase();
    back.make_ascii_uppercase();

    println!("{:?},{:?}", front, back); // "HELLO","WORLD"
}
```



#### chars

返回字符串切片的`char` 上的迭代器。

由于字符串切片由有效的 UTF-8 组成，因此我们可以通过 `char`遍历字符串切片。 此方法返回这样的迭代器。

请务必记住，`char`表示 Unicode 标量值，可能与您对 ‘character’ 的概念不符。

实际需要的是在字形簇上进行迭代。 Rust 的标准库未提供此功能，请检查 crates.io。

```rust
pub fn chars(&self) -> Chars<'_>
```

**返回值**：返回一个`Chars`迭代器，可迭代获取每个字符

```rust
let word = "goodbye";

let count = word.chars().count();
assert_eq!(7, count);

let mut chars = word.chars();

assert_eq!(Some('g'), chars.next());
assert_eq!(Some('o'), chars.next());
assert_eq!(Some('o'), chars.next());
assert_eq!(Some('d'), chars.next());
assert_eq!(Some('b'), chars.next());
assert_eq!(Some('y'), chars.next());
assert_eq!(Some('e'), chars.next());

assert_eq!(None, chars.next());
```

请记住，`char`可能与您对字符的直觉不符：

```rust
let y = "y̆";

let mut chars = y.chars();

assert_eq!(Some('y'), chars.next()); // 不是 'y̆'
assert_eq!(Some('\u{0306}'), chars.next());

assert_eq!(None, chars.next());
```



#### chars_indices

返回字符串切片的 char 及其位置上的迭代器。

由于字符串切片由有效的 UTF-8 组成，因此我们可以通过 char 遍历字符串切片。 这个方法返回这两个 char 以及它们的字节位置的迭代器。

迭代器产生元组。位置是第一，char 是第二。

```rust
pub fn char_indices(&self) -> CharIndices<'_>
```

**返回值**：返回一个`CharIndices`迭代器，可获取每个字符以及该字符的索引

```rust
let word = "goodbye";

let count = word.char_indices().count();
assert_eq!(7, count);

let mut char_indices = word.char_indices();

assert_eq!(Some((0, 'g')), char_indices.next());
assert_eq!(Some((1, 'o')), char_indices.next());
assert_eq!(Some((2, 'o')), char_indices.next());
assert_eq!(Some((3, 'd')), char_indices.next());
assert_eq!(Some((4, 'b')), char_indices.next());
assert_eq!(Some((5, 'y')), char_indices.next());
assert_eq!(Some((6, 'e')), char_indices.next());

assert_eq!(None, char_indices.next());
```

请记住，`char`可能与您对字符的直觉不符：

```rust
let yes = "y̆es";

let mut char_indices = yes.char_indices();

assert_eq!(Some((0, 'y')), char_indices.next()); // 不是 (0，'y̆')
assert_eq!(Some((1, '\u{0306}')), char_indices.next());

// 注意这里的 3 - 最后一个字符占用了两个字节
assert_eq!(Some((3, 'e')), char_indices.next());
assert_eq!(Some((4, 's')), char_indices.next());

assert_eq!(None, char_indices.next());
```





#### bytes

把字符串切片转化为字节迭代器

```rust
pub fn bytes(&self) -> Bytes<'_>
```

**返回值**：返回一个`Bytes`迭代器，每次迭代获取当前字符的字节

```rust
let mut bytes = "bors".bytes();

assert_eq!(Some(b'b'), bytes.next());
assert_eq!(Some(b'o'), bytes.next());
assert_eq!(Some(b'r'), bytes.next());
assert_eq!(Some(b's'), bytes.next());

assert_eq!(None, bytes.next())
```



#### split_whitespace

根据字符串切片中的空格，把字符串切片分割成若干个字符串切片

`Whitespace` 是根据 `Unicode` 派生核心属性 `White_Space` 的条款定义的。 如果只想在 ASCII 空格上分割，请使用 `split_ascii_whitespace`。

```rust
pub fn split_whitespace(&self) -> SplitWhitespace<'_>
```

**返回值**：返回一个`SplitWhitespace`迭代器

```rust
let mut iter = "A few words".split_whitespace();

assert_eq!(Some("A"), iter.next());
assert_eq!(Some("few"), iter.next());
assert_eq!(Some("words"), iter.next());

assert_eq!(None, iter.next());
```

考虑所有类型的空白：

```rust
let mut iter = " Mary   had\ta\u{2009}little  \n\t lamb".split_whitespace();
assert_eq!(Some("Mary"), iter.next());
assert_eq!(Some("had"), iter.next());
assert_eq!(Some("a"), iter.next());
assert_eq!(Some("little"), iter.next());
assert_eq!(Some("lamb"), iter.next());

assert_eq!(None, iter.next());
```

如果字符串为空或全为空白，则迭代器不产生字符串切片:

```rust
assert_eq!("".split_whitespace().next(), None);
assert_eq!("   ".split_whitespace().next(), None);
```



#### split_ascii_whitespace

用 `ASCII` 空格分割字符串切片。

返回的迭代器将返回作为原始字符串切片的子切片的字符串切片，并以任意数量的 ASCII 空格分隔。

要改为按 `Unicode Whitespace` 进行拆分，请使用 `split_whitespace`。

```rust
pub fn split_ascii_whitespace(&self) -> SplitAsciiWhitespace<'_>
```

**返回值**：返回一个`SplitAsciiWhitespace`迭代器

```rust
let mut iter = "A few words".split_ascii_whitespace();

assert_eq!(Some("A"), iter.next());
assert_eq!(Some("few"), iter.next());
assert_eq!(Some("words"), iter.next());

assert_eq!(None, iter.next());
```

考虑所有类型的 ASCII 空白：

```rust
let mut iter = " Mary   had\ta little  \n\t lamb".split_ascii_whitespace();
assert_eq!(Some("Mary"), iter.next());
assert_eq!(Some("had"), iter.next());
assert_eq!(Some("a"), iter.next());
assert_eq!(Some("little"), iter.next());
assert_eq!(Some("lamb"), iter.next());

assert_eq!(None, iter.next());
```

如果字符串为空或全部为 ASCII 空格，则迭代器不产生字符串切片:

```rust
assert_eq!("".split_ascii_whitespace().next(), None);
assert_eq!("   ".split_ascii_whitespace().next(), None);
```



#### lines

根据换行符把字符串分割成若干个字符串切片

迭代器返回的行中不包含行终止符。

支持的换行符

- `\n`：LF（Unix / Linux / macOS）

  `\r\n`：CRLF（Windows）

  `\r`：CR（旧 Mac）

```rust
pub fn lines(&self) -> Lines<'_>
```

**返回值**：返回一个`Lines`迭代器

```rust
let text = "foo\r\nbar\n\nbaz\n";
let mut lines = text.lines();

assert_eq!(Some("foo"), lines.next());
assert_eq!(Some("bar"), lines.next());
assert_eq!(Some(""), lines.next());
assert_eq!(Some("baz"), lines.next());

assert_eq!(None, lines.next());
```

最后一行的结尾是可选的。 以最后一行结尾的字符串将返回与没有其他最后一行结尾的相同字符串相同的行。

```rust
let text = "foo\nbar\n\r\nbaz";
let mut lines = text.lines();

assert_eq!(Some("foo"), lines.next());
assert_eq!(Some("bar"), lines.next());
assert_eq!(Some(""), lines.next());
assert_eq!(Some("baz"), lines.next());

assert_eq!(None, lines.next());
```





#### encode_utf16

将字符串上的字符转化为`u16`，并放入一个迭代器中

```rust
pub fn encode_utf16(&self) -> EncodeUtf16<'_>
```

**返回值**：返回一个`EncodeUtf16`迭代器

```rust
use std::char;

fn main() {
    let str = &"helloworld";
    let str_u16 = str.encode_utf16();
    for item in str_u16 {
        println!("{:?}", char::from_u32(item as u32));
		// Some('h')
		// Some('e')
		// Some('l')
		// Some('l')
		// Some('o')
		// Some('w')
		// Some('o')
		// Some('r')
		// Some('l')
		// Some('d')
    }
}
```



#### contains

接收一个模式`Pattern`，判断self是否包含这个模式所匹配的字符串

模式可以是`&str`，`char`，`&[char]`，`FnMut(char) -> bool`，`&&str`，也可以是确定字符是否匹配的函数或闭包。

```rust
pub fn contains<'a, P>(&'a self, pat: P) -> bool
where
    P: Pattern<'a>,
```

**参数**：

- **pat**：一个模式`Pattern`

**返回值**：根据是否包含，返回bool值

```rust
fn main() {
    // 判断是否包含字符串
    println!("{:?}", "hello world".contains("world")); // true

    // 判断是否包含字符
    println!("{:?}", "hello world".contains('d')); // true

    // 使用谓词判断
    println!("{:#?}", "hello".contains(|c: char| c.is_uppercase()));
    println!("{:#?}", "Hello".contains(|c: char| c.is_uppercase())); // true
}
```



#### starts_with

判断`self`是否以指定的模式开头

```rust
pub fn starts_with<'a, P>(&'a self, pat: P) -> bool
where
    P: Pattern<'a>,
```

**参数**：

- **pat**：一个模式`Pattern`

**返回值**：根据是否包含，返回bool值

```rust
let bananas = "bananas";

assert!(bananas.starts_with("bana"));
assert!(!bananas.starts_with("nana"));
```



#### ends_with

判断`self`是否以指定的模式结尾

```rust
pub fn ends_with<'a, P>(&'a self, pat: P) -> bool
where
    P: Pattern<'a>,
    <P as Pattern<'a>>::Searcher: ReverseSearcher<'a>,
```

**参数**：

- **pat**：一个模式`Pattern`

**返回值**：根据是否包含，返回bool值

```rust
let bananas = "bananas";

assert!(bananas.ends_with("anas"));
assert!(!bananas.ends_with("nana"));
```



#### find

查找指定模式在self中第一次出现的字节索引

```rust
pub fn find<'a, P>(&'a self, pat: P) -> Option<usize>
where
    P: Pattern<'a>,
```

**参数**：

- 一个模式`Pattern`

**返回值**：返回一个`Option`，包含查找到的索引，若没找到则返回`None`

```rust
let s = "Löwe 老虎 Léopard Gepardi";

assert_eq!(s.find('L'), Some(0));
assert_eq!(s.find('é'), Some(14));
assert_eq!(s.find("pard"), Some(17));
```

使用无点样式和闭包的更复杂的模式：

```rust
let s = "Löwe 老虎 Léopard";

assert_eq!(s.find(char::is_whitespace), Some(5));
assert_eq!(s.find(char::is_lowercase), Some(1));
assert_eq!(s.find(|c: char| c.is_whitespace() || c.is_lowercase()), Some(1));
assert_eq!(s.find(|c: char| (c < 'o') && (c > 'a')), Some(4));
```

找不到模式：

```rust
let s = "Löwe 老虎 Léopard";
let x: &[_] = &['1', '2'];

assert_eq!(s.find(x), None);
```



#### rfind

返回此字符串切片中模式的最后一个匹配项的第一个字符的字节索引。

如果模式不匹配，则返回 `None`。

```rust
pub fn rfind<'a, P>(&'a self, pat: P) -> Option<usize>
where
    P: Pattern<'a>,
    <P as Pattern<'a>>::Searcher: ReverseSearcher<'a>,
```

**参数**：

- **pat**：一个模式

**返回值**：返回一个`Option`，包含查找到的索引，若没找到则返回`None`

简单模式：

```rust
let s = "Löwe 老虎 Léopard Gepardi";

assert_eq!(s.rfind('L'), Some(13));
assert_eq!(s.rfind('é'), Some(14));
assert_eq!(s.rfind("pard"), Some(24));
```

闭包的更复杂模式：

```rust
let s = "Löwe 老虎 Léopard";

assert_eq!(s.rfind(char::is_whitespace), Some(12));
assert_eq!(s.rfind(char::is_lowercase), Some(20));
```

找不到模式：

```rust
let s = "Löwe 老虎 Léopard";
let x: &[_] = &['1', '2'];

assert_eq!(s.rfind(x), None);
```



#### split

按照指定的模式，把字符串分割成若干个子字符串，并放入一个迭代器中

```rust
pub fn split<'a, P>(&'a self, pat: P) -> Split<'a, P> 
where
    P: Pattern<'a>,
```

**参数**：

- **pat**：一个模式

**返回值**：返回一个`Split`迭代器，包含被分割的子字符串

```rust
let v: Vec<&str> = "Mary had a little lamb".split(' ').collect();
assert_eq!(v, ["Mary", "had", "a", "little", "lamb"]);

let v: Vec<&str> = "".split('X').collect();
assert_eq!(v, [""]);

let v: Vec<&str> = "lionXXtigerXleopard".split('X').collect();
assert_eq!(v, ["lion", "", "tiger", "leopard"]);

let v: Vec<&str> = "lion::tiger::leopard".split("::").collect();
assert_eq!(v, ["lion", "tiger", "leopard"]);

let v: Vec<&str> = "abc1def2ghi".split(char::is_numeric).collect();
assert_eq!(v, ["abc", "def", "ghi"]);

let v: Vec<&str> = "lionXtigerXleopard".split(char::is_uppercase).collect();
assert_eq!(v, ["lion", "tiger", "leopard"]);
```

如果模式是一片字符，请在每次出现任何字符时进行分割：

```rust
let v: Vec<&str> = "2020-11-03 23:59".split(&['-', ' ', ':', '@'][..]).collect();
assert_eq!(v, ["2020", "11", "03", "23", "59"]);
```

使用闭包的更复杂的模式：

```rust
let v: Vec<&str> = "abc1defXghi".split(|c| c == '1' || c == 'X').collect();
assert_eq!(v, ["abc", "def", "ghi"]);
```

如果一个字符串包含多个连续的分隔符，您将在输出中得到空字符串：

```rust
let x = "||||a||b|c".to_string();
let d: Vec<_> = x.split('|').collect();

assert_eq!(d, &["", "", "", "", "a", "", "b", "c"]);
```

连续的分隔符由空字符串分隔。

```rust
let x = "(///)".to_string();
let d: Vec<_> = x.split('/').collect();

assert_eq!(d, &["(", "", "", ")"]);
```

字符串开头或结尾的分隔符与空字符串相邻。

```rust
let d: Vec<_> = "010".split("0").collect();
assert_eq!(d, &["", "1", ""]);
```

当空字符串用作分隔符时，它将字符串中的每个字符以及字符串的开头和结尾分隔开。

```rust
let f: Vec<_> = "rust".split("").collect();
assert_eq!(f, &["", "r", "u", "s", "t", ""]);
```

当使用空格作为分隔符时，连续的分隔符可能会导致令人惊讶的行为。这段代码是正确的：

```rust
let x = "    a  b c".to_string();
let d: Vec<_> = x.split(' ').collect();

assert_eq!(d, &["", "", "", "", "a", "", "b", "c"]);
```

它确实不会给您：

```rust
assert_eq!(d, &["a", "b", "c"]);
```

为此行为使用`split_whitespace`。



#### split_inclusive

按照指定的模式，把字符串分割成若干个子字符串，并放入一个迭代器中

不同于`split`的是，分隔符会保留在每个片段的末尾

```rust
pub fn split_inclusive<'a, P>(&'a self, pat: P) -> SplitInclusive<'a, P> 
where
    P: Pattern<'a>,
```

**参数**：

- **pat**：一个模式`Pattern`

**返回值**：返回一个`SplitInclusive`迭代器

```rust
"a,b,c".split(',');        // ["a", "b", "c"]
"a,b,c".split_inclusive(','); // ["a,", "b,", "c"]
```



#### rsplit

给定字符串切片的子字符串上的迭代器，该迭代器由与模式匹配的字符分隔，并以相反的顺序产生。

```rust
pub fn rsplit<'a, P>(&'a self, pat: P) -> RSplit<'a, P> 
where
    P: Pattern<'a>,
    <P as Pattern<'a>>::Searcher: ReverseSearcher<'a>,
```

**参数**：

- **pat**：一个模式`Pattern`

**返回值**：返回一个`RSplit`迭代器

```rust
let v: Vec<&str> = "Mary had a little lamb".rsplit(' ').collect();
assert_eq!(v, ["lamb", "little", "a", "had", "Mary"]);

let v: Vec<&str> = "".rsplit('X').collect();
assert_eq!(v, [""]);

let v: Vec<&str> = "lionXXtigerXleopard".rsplit('X').collect();
assert_eq!(v, ["leopard", "tiger", "", "lion"]);

let v: Vec<&str> = "lion::tiger::leopard".rspli
```

使用闭包的更复杂的模式：

```rust
let v: Vec<&str> = "abc1defXghi".rsplit(|c| c == '1' || c == 'X').collect();
assert_eq!(v, ["ghi", "def", "abc"]);
```



#### split_terminator

按照指定的模式，把字符串分割成若干个子字符串，并放入一个迭代器中

忽略结尾的分隔符

```rust
pub fn split_terminator<'a, P>(&'a self, pat: P) -> SplitTerminator<'a, P> 
where
    P: Pattern<'a>,
```

**参数**：

- **pat**：一个模式`Pattern`

**返回值**：返回一个`SplitTerminator`迭代器

```rust
"a,b,c,".split(',');           // ["a", "b", "c", ""]
"a,b,c,".split_terminator(','); // ["a", "b", "c"]
```

```rust
fn main() {
    let s = "apple,banana,orange,";

    for part in s.split_terminator(',') {
        println!("{:?}", part);
    }
    /*
    	"apple"
        "banana"
        "orange"
    */
}
```

```rust
let v: Vec<&str> = "A.B.".split_terminator('.').collect();
assert_eq!(v, ["A", "B"]);

let v: Vec<&str> = "A..B..".split_terminator(".").collect();
assert_eq!(v, ["A", "", "B", ""]);

let v: Vec<&str> = "A.B:C.D".split_terminator(&['.', ':'][..]).collect();
assert_eq!(v, ["A", "B", "C", "D"]);
```



#### rsplit_terminator

按照指定的模式，把字符串分割成若干个子字符串，**逆序**放入一个迭代器中

忽略结尾的分隔符

```rust
pub fn rsplit_terminator<'a, P>(&'a self, pat: P) -> RSplitTerminator<'a, P> 
where
    P: Pattern<'a>,
    <P as Pattern<'a>>::Searcher: ReverseSearcher<'a>,
```

**参数**：

- **pat**：一个模式`Pattern`

**返回值**：返回一个`SplitTerminator`迭代器

```rust
let v: Vec<&str> = "A.B.".rsplit_terminator('.').collect();
assert_eq!(v, ["B", "A"]);

let v: Vec<&str> = "A..B..".rsplit_terminator(".").collect();
assert_eq!(v, ["", "B", "", "A"]);

let v: Vec<&str> = "A.B:C.D".rsplit_terminator(&['.', ':'][..]).collect();
assert_eq!(v, ["D", "C", "B", "A"]);
```



#### splitn

由指定模式将字符串切片分割成`n`份，并放进一个迭代器

若已分割`n-1`份，则剩下的字符串将不会被分割，直接放进迭代器最后一个项

```rust
pub fn splitn<'a, P>(&'a self, n: usize, pat: P) -> SplitN<'a, P>
where
    P: Pattern<'a>,
```

**参数**：

- **n**：需要分割成几份
- **pat**：需要分割的模式

**返回值**：返回一个`SplitN`迭代器

```rust
let v: Vec<&str> = "Mary had a little lambda".splitn(3, ' ').collect();
assert_eq!(v, ["Mary", "had", "a little lambda"]);

let v: Vec<&str> = "lionXXtigerXleopard".splitn(3, "X").collect();
assert_eq!(v, ["lion", "", "tigerXleopard"]);

let v: Vec<&str> = "abcXdef".splitn(1, 'X').collect();
assert_eq!(v, ["abcXdef"]);

let v: Vec<&str> = "".splitn(1, 'X').collect();
assert_eq!(v, [""]);
```

使用闭包的更复杂的模式：

```rust
let v: Vec<&str> = "abc1defXghi".splitn(2, |c| c == '1' || c == 'X').collect();
assert_eq!(v, ["abc", "defXghi"]);
```





#### rsplitn

由指定模式**从后往前**将字符串切片分割成`n`份，然后**逆序**放进一个迭代器

若已分割`n-1`份，则剩下的字符串将不会被分割，直接放进迭代器最后一个项

```rust
pub fn rsplitn<'a, P>(&'a self, n: usize, pat: P) -> RSplitN<'a, P> 
where
    P: Pattern<'a>,
    <P as Pattern<'a>>::Searcher: ReverseSearcher<'a>,
```

**参数**：

- **n**：需要分割成几份
- **pat**：需要分割的模式

**返回值**：返回一个`RSplitN`迭代器

```rust
let v: Vec<&str> = "Mary had a little lamb".rsplitn(3, ' ').collect();
assert_eq!(v, ["lamb", "little", "Mary had a"]);

let v: Vec<&str> = "lionXXtigerXleopard".rsplitn(3, 'X').collect();
assert_eq!(v, ["leopard", "tiger", "lionX"]);

let v: Vec<&str> = "lion::tiger::leopard".rsplitn(2, "::").collect();
assert_eq!(v, ["leopard", "lion::tiger"]);
```



#### split_once

在**第一次**出现指定分隔符时拆分字符串，并在分隔符之前返回前缀，在分隔符之后返回后缀。

```rust
pub fn split_once<'a, P>(&'a self, delimiter: P) -> Option<(&'a str, &'a str)>
where
    P: Pattern<'a>,
```

**参数**：

- **delimiter**：分隔符，一个模式`Pattern`

**返回值**：返回一个`Option`，若分割成功，则包含一个元素`(前缀, 后缀)`

```rust
assert_eq!("cfg".split_once('='), None);
assert_eq!("cfg=".split_once('='), Some(("cfg", "")));
assert_eq!("cfg=foo".split_once('='), Some(("cfg", "foo")));
assert_eq!("cfg=foo=bar".split_once('='), Some(("cfg", "foo=bar")));
```



#### rsplit_once

在**最后一次**出现指定分隔符时分割字符串，并在分隔符之前返回前缀，在分隔符之后返回后缀。

```rust
pub fn rsplit_once<'a, P>(&'a self, delimiter: P) -> Option<(&'a str, &'a str)>
where
    P: Pattern<'a>,
    <P as Pattern<'a>>::Searcher: ReverseSearcher<'a>,
```

**参数**：

- **delimiter**：分隔符，一个模式`Pattern`

**返回值**：返回一个`Option`，若分割成功，则包含一个元素`(前缀, 后缀)`

```rust
assert_eq!("cfg".rsplit_once('='), None);
assert_eq!("cfg=foo".rsplit_once('='), Some(("cfg", "foo")));
assert_eq!("cfg=foo=bar".rsplit_once('='), Some(("cfg=foo", "bar")));
```



#### matches

接收一个模式，把匹配到的项都放入一个迭代器中

```rust
pub fn matches<'a, P>(&'a self, pat: P) -> Matches<'a, P>
where
    P: Pattern<'a>,
```

**参数**：

- **pat**：需要匹配的模式`Pattern`

**返回值**：返回一个`Matches`迭代器，包含匹配到的项

```rust
let v: Vec<&str> = "abcXXXabcYYYabc".matches("abc").collect();
assert_eq!(v, ["abc", "abc", "abc"]);

let v: Vec<&str> = "1abc2abc3".matches(char::is_numeric).collect();
assert_eq!(v, ["1", "2", "3"]);
```



#### rmatches

接收一个模式，把匹配到的项**逆序**放入一个迭代器中

```rust
pub fn rmatches<'a, P>(&'a self, pat: P) -> RMatches<'a, P>
where
    P: Pattern<'a>,
    <P as Pattern<'a>>::Searcher: ReverseSearcher<'a>,
```

**参数**：

- **pat**：需要匹配的模式`Pattern`

**返回值**：返回一个`Matches`迭代器，包含匹配到的项

```rust
let v: Vec<&str> = "abcXXXabcYYYabc".rmatches("abc").collect();
assert_eq!(v, ["abc", "abc", "abc"]);

let v: Vec<&str> = "1abc2abc3".rmatches(char::is_numeric).collect();
assert_eq!(v, ["3", "2", "1"]);
```



#### match_indices

接收一个模式，把匹配到的项都放入一个迭代器中，包含匹配项和该项在原字符串中的字符索引

```rust
pub fn match_indices<'a, P>(&'a self, pat: P) -> MatchIndices<'a, P> 
where
    P: Pattern<'a>,
```

**参数**：

- **pat**：需要匹配的模式`Pattern`

**返回值**：返回一个`MatchIndices`迭代器，每一项都是一个元组

- 第一个元素为该项在原字符串中的字节索引
- 第二项为匹配到的字符串

```rust
let v: Vec<_> = "abcXXXabcYYYabc".match_indices("abc").collect();
assert_eq!(v, [(0, "abc"), (6, "abc"), (12, "abc")]);

let v: Vec<_> = "1abcabc2".match_indices("abc").collect();
assert_eq!(v, [(1, "abc"), (4, "abc")]);

let v: Vec<_> = "ababa".match_indices("aba").collect();
assert_eq!(v, [(0, "aba")]); // 只有第一个 `aba`
```



#### rmatch_indices

接收一个模式，把匹配到的项**逆序**放入一个迭代器中，包含匹配项和该项在原字符串中的字符索引

```rust
pub fn rmatch_indices<'a, P>(&'a self, pat: P) -> RMatchIndices<'a, P>
where
    P: Pattern<'a>,
    <P as Pattern<'a>>::Searcher: ReverseSearcher<'a>,
```

**参数**：

- **pat**：需要匹配的模式`Pattern`

**返回值**：返回一个`MatchIndices`迭代器，每一项都是一个元组

- 第一个元素为该项在原字符串中的字节索引
- 第二项为匹配到的字符串

```rust
let v: Vec<_> = "abcXXXabcYYYabc".rmatch_indices("abc").collect();
assert_eq!(v, [(12, "abc"), (6, "abc"), (0, "abc")]);

let v: Vec<_> = "1abcabc2".rmatch_indices("abc").collect();
assert_eq!(v, [(4, "abc"), (1, "abc")]);

let v: Vec<_> = "ababa".rmatch_indices("aba").collect();
assert_eq!(v, [(2, "aba")]); // 只有最后的 `aba`
```



#### trim

去除字符串两边的空格

`Whitespace` 是根据 `Unicode` 派生的核心属性 `White_Space` 的术语定义的，该属性包括换行符。

```rust
pub fn trim(&self) -> &str
```

**返回值**：返回去除空格后的字符串

```rust
let s = "\n Hello\tworld\t\n";

assert_eq!("Hello\tworld", s.trim());
```



#### trim_start

去除字符串前端的空格

`Whitespace` 是根据 `Unicode` 派生的核心属性 `White_Space` 的术语定义的，该属性包括换行符。

```rust
pub fn trim_start(&self) -> &str
```

**返回值**：返回去除空格后的字符串

```rust
fn main() {
    let str = "  hello  ";
    println!("{:#?}", str.trim_start()); // "hello  "
}
```



#### trim_end

去除字符串末尾的空格

`Whitespace` 是根据 `Unicode` 派生的核心属性 `White_Space` 的术语定义的，该属性包括换行符。

```rust
pub fn trim_end(&self) -> &str
```

**返回值**：返回去除空格后的字符串

基本用法：

```rust
fn main() {
    let str = "  hello  ";
    println!("{:#?}", str.trim_end()); // "  hello"
}
```





#### trim_matches

传入一个模式，从字符串的**两端**去除符合该模式的内容

```rust
pub fn trim_matches<'a, P>(&'a self, pat: P) -> &'a str
where
    P: Pattern<'a>,
    <P as Pattern<'a>>::Searcher: DoubleEndedSearcher<'a>,
```

**参数**：

- **pat**：一个模式，匹配字符串两端需要去除的内容

**返回值**：返回去除过两端匹配内容的字符串

```rust
assert_eq!("11foo1bar11".trim_matches('1'), "foo1bar");
assert_eq!("123foo1bar123".trim_matches(char::is_numeric), "foo1bar");

let x: &[_] = &['1', '2'];
assert_eq!("12foo1bar12".trim_matches(x), "foo1bar");
```

使用闭包的更复杂的模式：

```rust
assert_eq!("1foo1barXX".trim_matches(|c| c == '1' || c == 'X'), "foo1bar");
```





#### trim_start_matches

传入一个模式，从字符串的**前端**去除符合该模式的内容

```rust
pub fn trim_start_matches<'a, P>(&'a self, pat: P) -> &'a str
where
    P: Pattern<'a>,
```

**参数**：

- **pat**：一个模式，匹配字符串两端需要去除的内容

**返回值**：返回去除过两端匹配内容的字符串

```rust
assert_eq!("11foo1bar11".trim_start_matches('1'), "foo1bar11");
assert_eq!("123foo1bar123".trim_start_matches(char::is_numeric), "foo1bar123");

let x: &[_] = &['1', '2'];
assert_eq!("12foo1bar12".trim_start_matches(x), "foo1bar12");
```



#### trim_end_matches

传入一个模式，从字符串的**末尾**去除符合该模式的内容

```rust
pub fn trim_end_matches<'a, P>(&'a self, pat: P) -> &'a str
where
    P: Pattern<'a>,
    <P as Pattern<'a>>::Searcher: ReverseSearcher<'a>,
```

**参数**：

- **pat**：一个模式，匹配字符串两端需要去除的内容

**返回值**：返回去除过两端匹配内容的字符串

```rust
assert_eq!("11foo1bar11".trim_end_matches('1'), "11foo1bar");
assert_eq!("123foo1bar123".trim_end_matches(char::is_numeric), "123foo1bar");

let x: &[_] = &['1', '2'];
assert_eq!("12foo1bar12".trim_end_matches(x), "12foo1bar");
```

使用闭包的更复杂的模式：

```rust
assert_eq!("1fooX".trim_end_matches(|c| c == '1' || c == 'X'), "1foo");
```





#### strip_prefix

传入一个前缀，返回删除这个前缀后的字符串

```rust
pub fn strip_prefix<'a, P>(&'a self, prefix: P) -> Option<&'a str>
where
    P: Pattern<'a>,
```

**参数**：

- **prefix**：一个模式，作为匹配的前缀

**返回值**：返回一个`Option`，包含删除前缀后的字符串，若字符串没有响应的前缀，则返回`None`

```rust
assert_eq!("bar:foo".strip_suffix(":foo"), Some("bar"));
assert_eq!("bar:foo".strip_suffix("bar"), None);
assert_eq!("foofoo".strip_suffix("foo"), Some("foo"));
```



#### strip_suffix

传入一个后缀，返回删除这个后缀后的字符串

```rust
pub fn strip_suffix<'a, P>(&'a self, suffix: P) -> Option<&'a str>
where
    P: Pattern<'a>,
    <P as Pattern<'a>>::Searcher: ReverseSearcher<'a>,
```

**参数**：

- **prefix**：一个模式，作为匹配的后缀

**返回值**：返回一个`Option`，包含删除前缀后的字符串，若字符串没有响应的前缀，则返回`None`

```rust
assert_eq!("bar:foo".strip_suffix(":foo"), Some("bar"));
assert_eq!("bar:foo".strip_suffix("bar"), None);
assert_eq!("foofoo".strip_suffix("foo"), Some("foo"));
```



#### parse

将此字符串切片解析为另一种类型。

由于 `parse` 非常通用，因此可能导致类型推断问题。 因此，`parse` 是少数几次您会看到被亲切地称为 ‘turbofish’: `::<>` 的语法之一。

这可以帮助推理算法特别了解您要解析为哪种类型。

`parse` 可以解析为任何实现 [`FromStr`](https://www.rustwiki.org.cn/zh-CN/std/str/trait.FromStr.html) trait 的类型。

```rust
pub fn parse<F>(&self) -> Result<F, <F as FromStr>::Err>
where
    F: FromStr,
```

**返回值**：返回转换类型后的字符串

显式声明变量类型

```rust
let four: u32 = "4".parse().unwrap();

assert_eq!(4, four);
```

使用 ‘turbofish’ 而不是注解 `four`：

```rust
let four = "4".parse::<u32>();

assert_eq!(Ok(4), four);
```

无法解析：

```rust
let nope = "j".parse::<u32>();

assert!(nope.is_err());
```



#### is_ascii

检查此字符串中的所有字符是否都在 ASCII 范围内

```rust
pub fn is_ascii(&self) -> bool
```

**返回值**：返回一个bool值

```rust
let ascii = "hello!\n";
let non_ascii = "Grüße, Jürgen ❤";

assert!(ascii.is_ascii());
assert!(!non_ascii.is_ascii());
```



#### as_ascii

如果此字符串切片`is_ascii`，则将其作为`ASCII characters`的切片返回，否则返回 `None`。

```rust
pub const fn as_ascii(&self) -> Option<&[AsciiChar]>
```





#### eq_ingore_ascii_case

检查两个字符串是否为 ASCII 不区分大小写的匹配项。

与 `to_ascii_lowercase(a) == to_ascii_lowercase(b)` 相同，但不分配和复制临时文件。

```rust
pub fn eq_ignore_ascii_case(&self, other: &str) -> bool
```

**参数**：

- **other**：需要对比的另一个字符串

**返回值**：返回一个bool值

```rust
assert!("Ferris".eq_ignore_ascii_case("FERRIS"));
assert!("Ferrös".eq_ignore_ascii_case("FERRöS"));
assert!(!"Ferrös".eq_ignore_ascii_case("FERRÖS"));
```



#### make_ascii_uppercase

将此字符串就地转换为其 ASCII 大写等效项。

ASCII 字母 ‘a’ 到 ‘z’ 映射到 ‘A’ 到 ‘Z’，但是非 ASCII 字母不变。

```rust
pub fn make_ascii_uppercase(&mut self)
```

```rust
let mut s = String::from("Grüße, Jürgen ❤");

s.make_ascii_uppercase();

assert_eq!("GRüßE, JüRGEN ❤", s);
```



#### make_ascii_lowercase

将此字符串就地转换为其 ASCII 小写等效项。

ASCII 字母 ‘A’ 到 ‘Z’ 映射到 ‘a’ 到 ‘z’，但是非 ASCII 字母不变。

```rust
pub fn make_ascii_lowercase(&mut self)
```

```rust
let mut s = String::from("GRÜßE, JÜRGEN ❤");

s.make_ascii_lowercase();

assert_eq!("grÜße, jÜrgen ❤", s);
```



#### escape_debug

返回一个迭代器，该迭代器使用`char::escape_debug` 对 `self` 中的每个字符进行转义。

把**不可打印 / 特殊字符**变成**人眼可读、机器安全的转义形式**。

Note: 只有以字符串开头的扩展字素代码点将被转义。

```rust
pub fn escape_debug(&self) -> EscapeDebug<'_>
```

**返回值**：返回一个`EscapeDebug`迭代器

```rust
fn main() {
    let s = "a\n😊\x07";
    println!("{}", s.escape_debug());  // a\n\u{1f60a}\x07
}
```

作为迭代器：

```rust
for c in "❤\n!".escape_debug() {
    print!("{c}");
}
println!();
```

直接使用 `println!`：

```rust
println!("{}", "❤\n!".escape_debug());
```

两者都等同于：

```rust
println!("❤\\n!");
```

使用 `to_string`：

```rust
assert_eq!("❤\n!".escape_debug().to_string(), "❤\\n!");
```



#### escape_default

返回一个迭代器，该迭代器使用 `char::escape_default`对 `self` 中的每个字符进行转义。

把**不可打印 / 特殊字符**变成**人眼可读、机器安全的转义形式**。

```rust
pub fn escape_default(&self) -> EscapeDefault<'_>
```

**返回值**：返回一个`EscapeDefault`迭代器

```rust
fn main() {
    let s = "a\n😊\x07";
    println!("{}", s.escape_default());  // a\n\u{1f60a}\x07
}
```

作为迭代器：

```rust
for c in "❤\n!".escape_default() {
    print!("{c}");
}
println!();
```

直接使用 `println!`：

```rust
println!("{}", "❤\n!".escape_default());
```

两者都等同于：

```rust
println!("\\u{{2764}}\\n!");
```

使用 `to_string`：

```rust
assert_eq!("❤\n!".escape_default().to_string(), "\\u{2764}\\n!");
```



#### escape_unicode

返回一个迭代器，该迭代器使用 `char::escape_unicode` 对 `self` 中的每个字符进行转义。

把**不可打印 / 特殊字符**变成**人眼可读、机器安全的转义形式**。

```rust
pub fn escape_unicode(&self) -> EscapeUnicode<'_> 
```

**返回值**：返回一个`EscapeUnicode`迭代器

```rust
fn main() {
    let s = "a😊界";
    println!("{}", s.escape_unicode()); // \u{61}\u{1f60a}\u{754c}
}
```

作为迭代器：

```rust
for c in "❤\n!".escape_unicode() {
    print!("{c}");
}
println!();
```

直接使用 `println!`：

```rust
println!("{}", "❤\n!".escape_unicode());
```

两者都等同于：

```rust
println!("\\u{{2764}}\\u{{a}}\\u{{21}}");
```

使用 `to_string`：

```rust
assert_eq!("❤\n!".escape_unicode().to_string(), "\\u{2764}\\u{a}\\u{21}");
```





### impl str

字符串切片的方法



#### replace

用一个新字符串，替换匹配到的所有字符串

`replace` 创建一个新的 `String`，并将此字符串切片中的数据复制到其中。 这样做时，它将尝试查找某个模式的匹配项。 如果找到，则将其替换为替换字符串切片。

```rust
pub fn replace<'a, P>(&'a self, from: P, to: &str) -> String
where
    P: Pattern<'a>,
```

**参数**：

- **from**：需要被转换的内容，是一个模式`Pattern`
- **to**：需要转换成的字符串

**返回值**：返回转换后的新字符串

基本用法：

```rust
let s = "this is old";

assert_eq!("this is new", s.replace("old", "new"));
assert_eq!("than an old", s.replace("is", "an"));
```

当模式不匹配时，则原字符串返回

```rust
let s = "this is old";
assert_eq!(s, s.replace("cookie monster", "little lamb"));
```



#### replacen

用另一个字符串替换模式的前 N 个匹配项。

`replacen` 创建一个新的 `String`，并将此字符串切片中的数据复制到其中。 这样做时，它将尝试查找某个模式的匹配项。 如果找到任何内容，则最多 `count` 次将它们替换为替换字符串切片。

```rust
pub fn replacen<'a, P>(&'a self, pat: P, to: &str, count: usize) -> String
where
    P: Pattern<'a>,
```

**参数**：

- **pat**：需要被转换的内容，是一个模式`Pattern`
- **to**：需要转换成的字符串
- **count**：需要转换的个数，从前往后数

**返回值**：返回转换后的新字符串

```rust
let s = "foo foo 123 foo";
assert_eq!("new new 123 foo", s.replacen("foo", "new", 2));
assert_eq!("faa fao 123 foo", s.replacen('o', "a", 3));
assert_eq!("foo foo new23 foo", s.replacen(char::is_numeric, "new", 1));
```



#### to_lowercase

把字符串中的所有字符转化为小写

`Lowercase` 是根据 Unicode 派生核心属性 `Lowercase` 的术语定义的。

```rust
pub fn to_lowercase(&self) -> String
```

**返回值**：返回转换后的新字符串

```rust
let s = "HELLO";

assert_eq!("hello", s.to_lowercase());
```

一个棘手的示例，使用 sigma：

```rust
let sigma = "Σ";

assert_eq!("σ", sigma.to_lowercase());

// 但在单词结尾时，它是 ς，而不是 σ：
let odysseus = "ὈΔΥΣΣΕΎΣ";

assert_eq!("ὀδυσσεύς", odysseus.to_lowercase());
```

**不区分大小写的语言不会更改**：

```rust
let new_year = "农历新年";

assert_eq!(new_year, new_year.to_lowercase());
```



#### to_uppercase

把字符串中的所有字符转化为大写

`Uppercase` 是根据 Unicode 派生核心属性 `Lowercase` 的术语定义的。

```rust
pub fn to_uppercase(&self) -> String
```

**返回值**：返回转换后的新字符串

```rust
let s = "hello";

assert_eq!("HELLO", s.to_uppercase());
```

不区分大小写的脚本不会更改：

```rust
let new_year = "农历新年";

assert_eq!(new_year, new_year.to_uppercase());
```

一个字符可以变成多个：

```rust
let s = "tschüß";

assert_eq!("TSCHÜSS", s.to_uppercase());
```



#### into_string

无需复制或分配即可将 `Box<str>` 转换为 String。

```rust
pub fn into_string(self: Box<str, Global>) -> String
```

**返回值**：返回转化后的`String`类型的字符串

```rust
let string = String::from("birthday gift");
let boxed_str = string.clone().into_boxed_str();

assert_eq!(boxed_str.into_string(), string);
```



#### repeat

通过重复字符串 n 次来创建新的 `String`。

```rust
pub fn repeat(&self, n: usize) -> String
```

**参数**：

- **n**：重复的次数

**返回值**：返回创建的新字符串

```rust
assert_eq!("abc".repeat(4), String::from("abcabcabcabc"));
```

:::tip  溢出时为 panic：

```rust
let huge = "0123456789abcdef".repeat(usize::MAX);
```

:::



#### to_ascii_uppercase

返回此字符串的副本，其中每个字符都映射为其等效的 ASCII 大写字母。

ASCII 字母 ‘a’ 到 ‘z’ 映射到 ‘A’ 到 ‘Z’，但是非 ASCII 字母不变。

```rust
pub fn to_ascii_uppercase(&self) -> String
```

**返回值**：返回转化后的字符串

```rust
let s = "Grüße, Jürgen ❤";

assert_eq!("GRüßE, JüRGEN ❤", s.to_ascii_uppercase());
```



#### to_ascii_lowercase

返回此字符串的副本，其中每个字符都映射为其等效的 ASCII 小写字母。

ASCII 字母 ‘A’ 到 ‘Z’ 映射到 ‘a’ 到 ‘z’，但是非 ASCII 字母不变。

```rust
pub fn to_ascii_lowercase(&self) -> String
```

**返回值**：返回转化后的字符串

```rust
let s = "Grüße, Jürgen ❤";

assert_eq!("grüße, jürgen ❤", s.to_ascii_lowercase());
```







## Trait Implementations

### Add<&str>

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



#### Output 

应用 + 运算符后的结果类型。

```rust
type Output = String
```



#### add

执行 + 操作。

```rust
fn add(self, other: &str) -> String
```



### AddAssign<&str>

```rust
impl AddAssign<&str> for String
```

实现用于追加到 String 的 += 运算符。

这与 `push_str` 方法具有相同的行为。

#### add_assign

执行 += 操作。

```rust
fn add_assign(&mut self, other: &str)
```



### AsMut\<str>

```rust
impl AsMut<str> for String
```

#### as_mut

将此类型转换为 (通常是推断的) 输入类型的错误引用。

```rust
fn as_mut(&mut self) -> &mut str
```



### AsRef<[u8]>

```rust
impl AsRef<[u8]> for String
```

#### as_ref

将此类型转换为 (通常是推断的) 输入类型的共享引用。

```rust
fn as_ref(&self) -> &[u8]
```



### AsRef\<OsStr>

```rust
impl AsRef<OsStr> for String
```

#### as_ref

将此类型转换为 (通常是推断的) 输入类型的共享引用。

```rust
fn as_ref(&self) -> &OsStr
```



### AsRef\<Path>

```rust
impl AsRef\<Path> for String
```

#### as_ref

将此类型转换为 (通常是推断的) 输入类型的共享引用。

```rust
fn as_ref(&self) -> &Path
```



### AsRef\<str>

```rust
impl AsRef<str> for String
```

#### as_ref

将此类型转换为 (通常是推断的) 输入类型的共享引用。

```rust
fn as_ref(&self) -> &str
```



### Borrow\<str>

```rust
impl Borrow<str> for String
```

#### borrow

从拥有的值中一成不变地借用。

```rust
fn borrow(&self) -> &str
```



### BorrowMut\<str>

```rust
impl BorrowMut<str> for String
```

#### borrow_mut

从拥有的值中借用。

```rust
fn borrow_mut(&mut self) -> &mut str
```



### Clone

```rust
impl Clone for String
```

#### clone

返回值的副本。

```rust
fn clone(&self) -> String
```



#### clone_from

从source  执行复制分配。

```rust
fn clone_from(&mut self, source: &String)
```



### Debug

```rust
impl Debug for String
```

#### fmt

使用给定的格式化程序格式化该值。

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```

### 

Default

```rust
impl Default for String
```

#### default

创建一个空的 String。

```rust
fn default() -> String
```



### Deref

```rust
impl Deref for String
```

#### Target 

解引用后的结果类型。

```rust
type Target = str
```



#### deref

解引用值。

```rust
fn deref(&self) -> &str
```



### DerefMut

```rust
impl DerefMut for String
```

#### deref_mut

可变地解引用该值。

```rust
fn deref_mut(&mut self) -> &mut str
```



### Display

```rust
impl Display for String
```

#### fmt

使用给定的格式化程序格式化该值。

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



### Extend<&'a char>

```rust
impl<'a> Extend<&'a char> for String
```

#### extend

使用迭代器的内容扩展集合。

```rust
fn extend<I>(&mut self, iter: I)
where
  I: IntoIterator<Item = &'a char>,
```



#### extend_one

`nightly-only`

用一个元素扩展一个集合。

```rust
fn extend_one(&mut self, _: &'a char)
```



#### extend_reserve

`nightly-only`

在集合中为给定数量的附加元素保留容量。

```rust
fn extend_reserve(&mut self, additional: usize)
```



### Extend<&'a str>

```rust
impl<'a> Extend<&'a str> for String
```

#### extend



使用迭代器的内容扩展集合。

```rust
fn extend<I>(&mut self, iter: I)
where
  I: IntoIterator<Item = &'a str>,
```



#### extend_one

`nightly-only`

用一个元素扩展一个集合。

```rust
fn extend_one(&mut self, s: &'a str)
```



#### extend_reserve

`nightly-only`

在集合中为给定数量的附加元素保留容量。

```rust
fn extend_reserve(&mut self, additional: usize)
```



### Extend<Box<str, Global>>

```rust
impl Extend<Box<str, Global>> for String
```

#### extend

使用迭代器的内容扩展集合。

```rust
fn extend<I>(&mut self, iter: I)
where
  I: IntoIterator<Item = Box<str, Global>>,
```



#### extend_one

`nightly-only`

用一个元素扩展一个集合。

```rust
fn extend_one(&mut self, item: A)
```



#### extend_reserve

`nightly-only`

在集合中为给定数量的附加元素保留容量。

```rust
fn extend_reserve(&mut self, additional: usize)
```



### Extend<Cow<'a, str>>

```rust
impl<'a> Extend<Cow<'a, str>> for String
```

#### extend

使用迭代器的内容扩展集合。

```rust
fn extend<I>(&mut self, iter: I)
where
  I: IntoIterator<Item = Cow<'a, str>>,
```



#### extend_one

`nightly-only`

用一个元素扩展一个集合。

```rust
fn extend_one(&mut self, s: Cow<'a, str>)
```



#### extend_reserve

`nightly-only`

在集合中为给定数量的附加元素保留容量。

```rust
fn extend_reserve(&mut self, additional: usize)
```



### Extend\<String>

```rust
impl Extend<String> for String
```

#### extend

使用迭代器的内容扩展集合。

```rust
fn extend<I>(&mut self, iter: I)
where
  I: IntoIterator<Item = String>,
```



#### extend_one

`nightly-only`

用一个元素扩展一个集合。

```rust
fn extend_one(&mut self, s: String)
```



#### extend_reserve

`nightly-only`

在集合中为给定数量的附加元素保留容量。

```rust
fn extend_reserve(&mut self, additional: usize)
```



### Extend\<char>

```rust
impl Extend\<char> for String
```

#### extend

使用迭代器的内容扩展集合。

```rust
fn extend<I>(&mut self, iter: I)
where
  I: IntoIterator<Item = char>,
```



#### extend_one

`nightly-only`

用一个元素扩展一个集合。

```rust
fn extend_one(&mut self, c: char)
```



#### extend_reserve

`nightly-only`

在集合中为给定数量的附加元素保留容量。

```rust
fn extend_reserve(&mut self, additional: usize)
```



### From<&'a String>

```rust
impl<'a> From<&'a String> for Cow<'a, str>
```

#### from

将 String 引用转换为 Borrowed 变体。 不执行堆分配，并且不复制字符串。

```rust
fn from(s: &'a String) -> Cow<'a, str>
```



```rust
let s = "eggplant".to_string();

assert_eq!(Cow::from(&s), Cow::Borrowed("eggplant"));
```



### From<&String>

```rust
impl From<&String> for String
```

#### from

将 &String 转换为 String。

```rust
fn from(s: &String) -> String
```

这将克隆 s 并返回该克隆。



### From<&mut str>

```rust
impl From<&mut str> for String
```

#### from

将 &mut str 转换为 String。

结果分配在堆上。

```rust
fn from(s: &mut str) -> String
```



### From<&str>

```rust
impl From<&str> for String
```

#### from

将 &str 转换为 String。

结果分配在堆上。

```rust
fn from(s: &str) -> String
```



### From<Box<str, Global>>

```rust
impl From<Box<str, Global>> for String
```

#### from

将给定的 boxed str 切片转换为 String。 值得注意的是，str 切片是拥有的。

```rust
fn from(s: Box<str, Global>) -> String
```

基本用法：

```rust
let s1: String = String::from("hello world");

let s2: Box<str> = s1.into_boxed_str();

let s3: String = String::from(s2);


assert_eq!("hello world", s3)
```



### From<Cow<'a, str>>

```rust
impl<'a> From<Cow<'a, str>> for String
```

#### from

将写时克隆字符串转换为 String 的拥有实例。

这将提取拥有所有权的字符串，如果尚未拥有，则克隆该字符串。

```rust
fn from(s: Cow<'a, str>) -> String
```



```rust
// 如果字符串不被拥有...
let cow: Cow<'_, str> = Cow::Borrowed("eggplant");

// 它将在堆上分配并复制字符串。
let owned: String = String::from(cow);

assert_eq!(&owned[..], "eggplant");
```



### From\<String>

```rust
impl From<String> for Arc<str>
```

#### from

分配一个引用计数的 str 并将 v 复制到其中。

```rust
fn from(v: String) -> Arc<str>
```



```rust
let unique: String = "eggplant".to_owned();
let shared: Arc<str> = Arc::from(unique);

assert_eq!("eggplant", &shared[..]);
```



### From\<String>

```rust
impl From<String> for Box<dyn Error + 'static, Global>
```

#### from

将 String 转换为 dyn Error 的 box。

```rust
fn from(str_err: String) -> Box<dyn Error + 'static, Global>
```



```rust
use std::error::Error;

use std::mem;

let a_string_error = "a string error".to_string();

let a_boxed_error = Box::<dyn Error>::from(a_string_error);

assert!(mem::size_of::<Box<dyn Error>>() == mem::size_of_val(&a_boxed_error))
```



### From\<String>

```rust
impl From<String> for Box<dyn Error + Send + Sync + 'static, Global>
```

#### from

将 String 转换为 Dyn Error + Send + Sync 的 box。

```rust
fn from(err: String) -> Box<dyn Error + Send + Sync + 'static, Global>
```



```rust
use std::error::Error;
use std::mem;

let a_string_error = "a string error".to_string();
let a_boxed_error = Box::<dyn Error + Send + Sync>::from(a_string_error);

assert!(mem::size_of::<Box<dyn Error + Send + Sync>>() == mem::size_of_val(&a_boxed_error))
```



### From\<String>

```rust
impl From<String> for Box<str, Global>
```

#### from

将给定的 String 转换为拥有所有权的 boxed str 切片。

```rust
fn from(s: String) -> Box<str, Global>
```



基本用法：

```rust
let s1: String = String::from("hello world");

let s2: Box<str> = Box::from(s1);

let s3: String = String::from(s2);


assert_eq!("hello world", s3)
```



### From\<String>

```rust
impl<'a> From<String> for Cow<'a, str>
```

#### from

将 String 转换为 Owned 变体。 不执行堆分配，并且不复制字符串。

```rust
fn from(s: String) -> Cow<'a, str>
```



```rust
let s = "eggplant".to_string();
let s2 = "eggplant".to_string();

assert_eq!(Cow::from(s), Cow::<'static, str>::Owned(s2));
```



### From\<String>

```rust
impl From<String> for OsString
```

#### from

将 String 转换为 OsString。

```rust
fn from(s: String) -> OsString
```

此转换不会分配或复制内存。





### From\<String>

```rust
impl From<String> for PathBuf
```

#### from

将 String 转换为 PathBuf

```rust
fn from(s: String) -> PathBuf
```

此转换不会分配或复制内存。





### From\<String>

```rust
impl From<String> for Rc<str>
```

#### from

分配一个引用计数的字符串切片并将 v 复制到其中。

```rust
fn from(v: String) -> Rc<str>
```



```rust
let original: String = "statue".to_owned();
let shared: Rc<str> = Rc::from(original);

assert_eq!("statue", &shared[..]);
```



### From\<String>

```rust
impl From<String> for Vec<u8, Global>
```

#### from

将给定的 String 转换为包含 u8 类型值的 vector Vec。

```rust
fn from(string: String) -> Vec<u8, Global>
```



基本用法：

```rust
let s1 = String::from("hello world");
let v1 = Vec::from(s1);


for b in v1 {
  println!("{b}");
}
```



### From\<char>

```rust
impl From<char> for String
```

#### from

从单个字符分配一个拥有所有权的 String。

```rust
fn from(c: char) -> String
```



```rust
let c: char = 'a';
let s: String = String::from(c);

assert_eq!("a", &s[..]);
```



### FromIterator<&'a char>

```rust
impl<'a> FromIterator<&'a char> for String
```

#### from_iter

从迭代器创建一个值。

```rust
fn from_iter<I>(iter: I) -> String
where
  I: IntoIterator<Item = &'a char>,
```



### FromIterator<&'a str>

```rust
impl<'a> FromIterator<&'a str> for String
```

#### from_iter

从迭代器创建一个值。

```rust
fn from_iter<I>(iter: I) -> String
where
  I: IntoIterator<Item = &'a str>,
```



### FromIterator<Box<str, Global>>

```rust
impl FromIterator<Box<str, Global>> for String
```

#### from_iter

从迭代器创建一个值。

```rust
fn from_iter<I>(iter: I) -> String
where
  I: IntoIterator<Item = Box<str, Global>>,
```



### FromIterator<Cow<'a, str>>

```rust
impl<'a> FromIterator<Cow<'a, str>> for String
```

#### from_iter

从迭代器创建一个值。

```rust
fn from_iter<I>(iter: I) -> String
where
  I: IntoIterator<Item = Cow<'a, str>>,
```



### FromIterator\<String>

```rust
impl<'a> FromIterator<String> for Cow<'a, str>
```

#### from_iter

从迭代器创建一个值。

```rust
fn from_iter<I>(it: I) -> Cow<'a, str>
where
  I: IntoIterator<Item = String>,
```



### FromIterator\<String>

```rust
impl FromIterator<String> for String
```

#### from_iter

从迭代器创建一个值。

```rust
fn from_iter<I>(iter: I) -> String
where
  I: IntoIterator<Item = String>,
```



### FromIterator\<char>

```rust
impl FromIterator<char> for String
```

#### from_iter

从迭代器创建一个值。

```rust
fn from_iter<I>(iter: I) -> String
where
  I: IntoIterator<Item = char>,
```



### FromStr

```rust
impl FromStr for String
```

#### Err 

可以从解析中返回的相关错误。

```rust
type Err = Infallible
```



#### from_str

解析字符串 s 以返回此类型的值。

```rust
fn from_str(s: &str) -> Result<String, <String as FromStr>::Err>
```



### Hash

```rust
impl Hash for String
```

#### hash

将该值输入给定的 Hasher。

```rust
fn hash<H>(&self, hasher: &mut H)
where
  H: Hasher,
```



#### hash_slice

将这种类型的切片送入给定的 Hasher 中。

```rust
fn hash_slice<H>(data: &[Self], state: &mut H)
where
  H: Hasher,
  Self: Sized,
```



### Index<Range\<usize>>

```rust
impl Index<Range<usize>> for String
```

#### Output

索引后返回的类型。

```rust
type Output = str
```



#### index

执行索引 (container[index]) 操作。

```rust
fn index(&self, index: Range<usize>) -> &str
```



### Index<RangeFrom\<usize>>

```rust
impl Index<RangeFrom<usize>> for String
```

#### Output 

索引后返回的类型。

```rust
type Output = str
```



### index

执行索引 (container[index]) 操作。

```rust
fn index(&self, index: RangeFrom<usize>) -> &str
```



### Index\<RangeFull>

```rust
impl Index<RangeFull> for String
```

#### Output 

索引后返回的类型。

```rust
type Output = str
```



#### index

执行索引 (container[index]) 操作。

```rust
fn index(&self, _index: RangeFull) -> &str
```



### Index<RangeInclusive\<usize>>

```rust
impl Index<RangeInclusive<usize>> for String
```

#### Output 

索引后返回的类型。

```rust
type Output = str
```



#### index

执行索引 (container[index]) 操作。

```rust
fn index(&self, index: RangeInclusive<usize>) -> &str
```



### Index<RangeTo\<usize>>

```rust
impl Index<RangeTo<usize>> for String
```

#### Output

索引后返回的类型。

```rust
type Output = str
```



#### index

执行索引 (container[index]) 操作。

```rust
fn index(&self, index: RangeTo<usize>) -> &str
```



### Index<RangeToInclusive\<usize>>

```rust
impl Index<RangeToInclusive<usize>> for String
```

#### Output

索引后返回的类型。

```rust
type Output = str
```



#### index

执行索引 (container[index]) 操作。

```rust
fn index(&self, index: RangeToInclusive<usize>) -> &str
```



### IndexMut<Range\<usize>>

```rust
impl IndexMut<Range<usize>> for String
```

#### index_mut

执行可变索引 (container[index]) 操作。

```rust
fn index_mut(&mut self, index: Range<usize>) -> &mut str
```



### IndexMut<RangeFrom\<usize>>

```rust
impl IndexMut<RangeFrom\<usize>> for String
```

#### index_mut

执行可变索引 (container[index]) 操作。

```rust
fn index_mut(&mut self, index: RangeFrom<usize>) -> &mut str
```



### IndexMut\<RangeFull>

```rust
impl IndexMut<RangeFull> for String
```

#### index_mut

执行可变索引 (container[index]) 操作。

```rust
fn index_mut(&mut self, _index: RangeFull) -> &mut str
```



### IndexMut<RangeInclusive\<usize>>

```rust
impl IndexMut<RangeInclusive<usize>> for String
```

#### index_mut

执行可变索引 (container[index]) 操作。

```rust
fn index_mut(&mut self, index: RangeInclusive<usize>) -> &mut str
```



### IndexMut<RangeTo\<usize>>

```rust
impl IndexMut<RangeTo<usize>> for String
```



#### index_mut

执行可变索引 (container[index]) 操作。

```rust
fn index_mut(&mut self, index: RangeTo<usize>) -> &mut str
```



### IndexMut<RangeToInclusive\<usize>>

```rust
impl IndexMut<RangeToInclusive<usize>> for String
```

#### index_mut

执行可变索引 (container[index]) 操作。

```rust
fn index_mut(&mut self, index: RangeToInclusive<usize>) -> &mut str
```



### Ord

```rust
impl Ord for String
```

#### cmp

此方法返回 self 和 other 之间的 Ordering。

```rust
fn cmp(&self, other: &String) -> Ordering
```



#### max

比较并返回两个值中的最大值。

```rust
fn max(self, other: Self) -> Self
where
  Self: Sized,
```



#### min

比较并返回两个值中的最小值。

```rust
fn min(self, other: Self) -> Self
where
  Self: Sized,
```



#### clamp

将值限制在某个时间间隔内。

```rust
fn clamp(self, min: Self, max: Self) -> Self
where
  Self: Sized + PartialOrd<Self>,
```



### PartialEq<&'a str>

```rust
impl<'a, 'b> PartialEq<&'a str> for String
```

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &&'a str) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &&'a str) -> bool
```



### PartialEq<Cow<'a, str>>

```rust
impl<'a, 'b> PartialEq<Cow<'a, str>> for String
```

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &Cow<'a, str>) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Cow<'a, str>) -> bool
```



### PartialEq\<String>

```rust
impl<'a, 'b> PartialEq<String> for &'a str
```

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &String) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &String) -> bool
```



### PartialEq\<String>

```rust
impl<'a, 'b> PartialEq<String> for Cow<'a, str>
```

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &String) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &String) -> bool
```



### PartialEq\<String>

```rust
impl PartialEq<String> for String
```

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &String) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### PartialEq\<String>

```rust
impl<'a, 'b> PartialEq<String> for str
```

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &String) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &String) -> bool
```



### PartialEq\<str>

```rust
impl<'a, 'b> PartialEq<str> for String
```

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &str) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &str) -> bool
```



### PartialOrd\<String>

```rust
impl PartialOrd<String> for String
```

#### partial_cmp

如果存在，则此方法返回 self 和 other 值之间的顺序。

```rust
fn partial_cmp(&self, other: &String) -> Option<Ordering>
```



#### lt

此方法测试的内容少于 (对于 self 和 other)，并且由 < 操作员使用。

```rust
fn lt(&self, other: &Rhs) -> bool
```



#### le

此方法测试小于或等于 (对于 self 和 other)，并且由 <= 运算符使用。

```rust
fn le(&self, other: &Rhs) -> bool
```



#### gt

此方法测试大于 (对于 self 和 other)，并且由 > 操作员使用。

```rust
fn gt(&self, other: &Rhs) -> bool
```



#### ge

此方法测试是否大于或等于 (对于 self 和 other)，并且由 >= 运算符使用。

```rust
fn ge(&self, other: &Rhs) -> bool
```



### Pattern<'a>

```rust
impl<'a, 'b> Pattern<'a> for &'b String
```

一个方便的 impl，委派给 &str 的 impl。

```rust
assert_eq!(String::from("Hello world").find("world"), Some(6));
```





#### Searcher

`nightly-only`

此模式的关联搜索者

```rust
type Searcher = <&'b str as Pattern<'a>>::Searcher
```



#### into_searcher

`nightly-only`

从 self 和 haystack 构造关联的搜索器以进行搜索。

```rust
fn into_searcher(self, haystack: &'a str) -> <&'b str as Pattern<'a>>::Searcher
```





#### is_contained_in

`nightly-only`

检查模式是否与 haystack 中的任何位置匹配

```rust
fn is_contained_in(self, haystack: &'a str) -> bool
```



#### is_prefix_of

`nightly-only`

检查模式是否在 haystack 的前面匹配

```rust
fn is_prefix_of(self, haystack: &'a str) -> bool
```



#### strip_prefix_of

`nightly-only`

如果匹配，则从 haystack 的正面删除模式。

```rust
fn strip_prefix_of(self, haystack: &'a str) -> Option<&'a str>
```



#### is_suffix_of

`nightly-only`

检查模式是否与 haystack 的后面匹配

```rust
fn is_suffix_of(self, haystack: &'a str) -> bool
```



#### strip_suffix_of

```rust
fn strip_suffix_of(self, haystack: &'a str) -> Option<&'a str>
```

`nightly-only`

如果匹配，则从 haystack 的后面删除模式。



### ToSocketAddrs

```rust
impl ToSocketAddrs for String
```

#### Iter 

在此类型可能对应的套接字地址上返回的迭代器。

```rust
type Iter = IntoIter<SocketAddr, Global>
```



#### to_socket_addrs

将此对象转换为已解析的 SocketAddr 的迭代器。

```rust
fn to_socket_addrs(&self) -> Result<IntoIter<SocketAddr>>
```



### 

```rust
impl ToString for String
```



#### to_string

将给定值转换为 String。

```rust
fn to_string(&self) -> String
```



### Write

```rust
impl Write for String
```

#### write_str

将字符串切片写入此 writer，返回写入是否成功。

```rust
fn write_str(&mut self, s: &str) -> Result<(), Error>
```



#### write_char

将 char 写入此 writer，返回写入是否成功。

```rust
fn write_char(&mut self, c: char) -> Result<(), Error>
```



#### write_fmt

结合使用 write! 宏和 trait 的实现者。

```rust
fn write_fmt(&mut self, args: Arguments<'_>) -> Result<(), Error>
```



### Eq

```rust
impl Eq for String
```

### StructuralEq

```rust
impl StructuralEq for String
```

### StructuralPartialEq

```rust
impl StructuralPartialEq for String
```



## Auto Trait Implementations

### RefUnwindSafe

```rust
impl RefUnwindSafe for String
```

### Send

```rust
impl Send for String
```

### Sync

```rust
impl Sync for String
```

### Unpin

```rust
impl Unpin for String
```

### UnwindSafe

```rust
impl UnwindSafe for String
```





## Blanket Implementations

### Any 

```rust
impl<T> Any for T
where
  T: 'static + ?Sized,
```



### Borrow\<T>

```rust
impl<T> Borrow<T> for T
where
  T: ?Sized,
```



### BorrowMut\<T>

```rust
impl<T> BorrowMut<T> for T
where
  T: ?Sized,
```



### From\<T> 

```rust
impl<T> From<T> for T
```



### Into\<U>

```rust
impl<T, U> Into<U> for T
where
  U: From<T>,
```



### ToOwned

```rust
impl<T> ToOwned for T
where
  T: Clone,
```



### ToString

```rust
impl<T> ToString for T
where
  T: Display + ?Sized,
```



### TryFrom\<U>

```rust
impl<T, U> TryFrom<U> for T
where
  U: Into<T>,
```



### TryInto\<U>

```rust
impl<T, U> TryInto<U> for T
where
  U: TryFrom<T>,
