# Primitive Type str

See also the std::str module.

`str` 类型，也称为字符串切片，是最原始的字符串类型。它通常以其借用形式 `&str` 出现。

也是字符串字面量的类型，`&'static str`。

字符串切片始终是有效的 UTF-8。



## 基本用法

字符串字面量是字符串切片：

```rust
let hello_world = "Hello, World!";
```

这里我们声明了一个用字符串字面量初始化的字符串切片。 字符串字面量具有静态的生命周期，这意味着字符串 `hello_world` 在整个程序期间均有效。

我们也可以明确指定 `hello_world` 的生命周期：

```rust
let hello_world: &'static str = "Hello, world!";
```



## Representation

`&str` 由两个部分组成：一个指向某些字节的指针和一个长度。您可以使用`as_ptr`和 `len`方法查看它们：

```rust
use std::slice;
use std::str;

let story = "Once upon a time...";

let ptr = story.as_ptr();
let len = story.len();

// story 有十九个字节
assert_eq!(19, len);

// 我们可以根据 ptr 和 len 重新构建一个 str。
// 这都是不安全的，因为我们有责任确保两个组件均有效：
let s = unsafe {
    // 首先，我们建立一个 &[u8]...
    let slice = slice::from_raw_parts(ptr, len);

    // ... 然后将该切片转换为字符串
    str::from_utf8(slice)
};

assert_eq!(s, Ok(story));
```

Note: 本示例显示了 `&str` 的内部结构。在正常情况下，不应使用 `unsafe` 来获取字符串切片。 请改用 `as_str`。





## Implementations

### impl str

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

例如，表情符号 🧑‍🔬 (科学家) 可以被拆分，以便字符串仅包含 🧑 (人)。

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



#### into_boxed_bytes

无需复制或分配即可将 `Box<str>` 转换为 `Box<[u8]>`。

```rust
pub fn into_boxed_bytes(self: Box<str, Global>) -> Box<[u8], Global>
```

**返回值**：返回一个`Box`，包含`[u8]`字符串

```rust
let s = "this is a string";
let boxed_str = s.to_owned().into_boxed_str();
let boxed_bytes = boxed_str.into_boxed_bytes();
assert_eq!(*boxed_bytes, *s.as_bytes());
```



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

### impl<'a> Add<&'a str> for Cow<'a, str>

#### Output 

应用 + 运算符后的结果类型。

```rust
type Output = Cow<'a, str>
```



#### add

执行 + 操作。 

```rust
fn add(self, rhs: &'a str) -> <Cow<'a, str> as Add<&'a str>>::Output
```



### impl Add<&str> for String

实现 + 运算符以连接两个字符串。

这会消费左侧的 String，并重新使用其缓冲区 (如有必要，请增加缓冲区)。 这样做是为了避免分配新的 String 并在每个操作上复制整个内容，当通过重复连接构建 n 字节的字符串时，这将导致 O(n^ 2) 运行时间。

右侧的字符串仅是借用的。它的内容被复制到返回的 String 中。



**示例**

将两个 `String` 连接起来，第一个按值取值，第二个借用：

```rust
let a = String::from("hello");

let b = String::from(" world");

let c = a + &b;
// `a` 已移动，不能再在此处使用。
```

如果要继续使用第一个 String，则可以对其进行克隆并追加到克隆中：

```rust
let a = String::from("hello");

let b = String::from(" world");

let c = a.clone() + &b;

// `a` 在这里仍然有效。
```

可以通过将第一个切片转换为 String 来完成 &str 切片的连接：

```rust
let a = "hello";

let b = " world";

let c = a.to_string() + b;

type Output = String
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





### impl<'a> AddAssign<&'a str> for Cow<'a, str>

#### add_assign

执行 += 操作。

```rust
fn add_assign(&mut self, rhs: &'a str)
```



 

### impl AddAssign<&str> for String

实现用于追加到 String 的 += 运算符。

这与 push_str 方法具有相同的行为。



#### add_assign

执行 += 操作。 

```rust
fn add_assign(&mut self, other: &str)
```



### impl AsMut\<str> for String

#### as_mut

将此类型转换为 (通常是推断的) 输入类型的错误引用。

```rust
fn as_mut(&mut self) -> &mut str
```



### impl AsMut\<str> for str

#### as_mut

将此类型转换为 (通常是推断的) 输入类型的错误引用。

```rust
fn as_mut(&mut self) -> &mut str
```



### impl AsRef<[u8]> for str

#### as_ref

将此类型转换为 (通常是推断的) 输入类型的共享引用。

```rust
fn as_ref(&self) -> &[u8] 
```



### impl AsRef\<OsStr> for str

#### as_ref

将此类型转换为 (通常是推断的) 输入类型的共享引用。

```rust
fn as_ref(&self) -> &OsStr
```



### impl AsRef\<Path> for str

#### as_ref

将此类型转换为 (通常是推断的) 输入类型的共享引用。

```rust
fn as_ref(&self) -> &Path
```





### impl<'a> AsRef\<str> for Drain<'a>

#### as_ref

将此类型转换为 (通常是推断的) 输入类型的共享引用。

```rust
fn as_ref(&self) -> &str
```



### impl AsRef\<str> for String

#### as_ref

将此类型转换为 (通常是推断的) 输入类型的共享引用。

```rust
fn as_ref(&self) -> &str
```



### impl AsRef\<str> for str

#### as_ref

将此类型转换为 (通常是推断的) 输入类型的共享引用。

```rust
fn as_ref(&self) -> &str
```



### impl AsciiExt for str

#### Owned

Deprecated since 1.26.0: use inherent methods instead

复制的 ASCII 字符的容器类型。

```rust
type Owned = String
```







#### is_ascii

Deprecated since 1.26.0: use inherent methods instead

检查该值是否在 ASCII 范围内。 

```rust
fn is_ascii(&self) -> bool
```



#### to_ascii_uppercase

Deprecated since 1.26.0: use inherent methods instead

使值的副本等效于其 ASCII 大写字母。 

```rust
fn to_ascii_uppercase(&self) -> Self::Owned
```



#### to_ascii_lowercase

Deprecated since 1.26.0: use inherent methods instead

以等效的 ASCII 小写形式复制值。 

```rust
fn to_ascii_lowercase(&self) -> Self::Owned
```



#### eq_ignore_ascii_case

Deprecated since 1.26.0: use inherent methods instead

检查两个值是否为 ASCII 不区分大小写的匹配。 

```rust
fn eq_ignore_ascii_case(&self, o: &Self) -> bool
```





#### make_ascii_uppercase

Deprecated since 1.26.0: use inherent methods instead

将此类型就地转换为其 ASCII 大写等效项。 

```rust
fn make_ascii_uppercase(&mut self)
```



#### make_ascii_lowercase

Deprecated since 1.26.0: use inherent methods instead

将此类型就地转换为其 ASCII 小写等效项。 

```rust
fn make_ascii_lowercase(&mut self)
```





### impl Borrow\<str> for String

#### borrow

从拥有的值中一成不变地借用。 

```rust
fn borrow(&self) -> &str

```



### impl BorrowMut\<str> for String

#### borrow_mut

从拥有的值中借用。 

```rust
fn borrow_mut(&mut self) -> &mut str
```



### impl Clone for Box<str, Global>



#### clone

返回值的副本。 

```rust
fn clone(&self) -> Box<str, Global>
```



#### clone_from

从 source执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### impl\<S> Concat\<str> for [S]

```rust
impl<S> Concat<str> for [S]
where
  S: Borrow<str>,
```

`Note: Concat<str>` 中的 str 在这里没有意义。 trait 的这个类型参数的存在只是为了启用另一个 impl。



#### Output

This is a nightly-only experimental API. (slice_concat_trait #27747)

串联后的结果类型

```rust
type Output = String
```



#### concat

This is a nightly-only experimental API. (slice_concat_trait #27747)

`[T]::concat` 的实现

```rust
fn concat(slice: &[S]) -> String
```



### impl Debug for str

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



### impl Default for &mut str

#### default

创建一个空的可变 str

```rust
fn default() -> &mut str
```



### impl Default for &str

#### default

创建一个空的 str

```rust
fn default() -> &str
```



### impl Default for Box<str, Global>

#### default

返回类型的 “默认值”。 

```rust
fn default() -> Box<str, Global>
```



### impl Display for str

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



### impl !Error for &str



#### source

此错误的下级来源 (如果有)。 

```rust
fn source(&self) -> Option<&(dyn Error + 'static)>
```



#### description

Deprecated since 1.42.0: use the Display impl or to_string()

```rust
fn description(&self) -> &str
```





#### cause

Deprecated since 1.33.0: replaced by Error::, which can support downcasting

```rust
fn cause(&self) -> Option<&dyn Error>
```



#### provide

This is a nightly-only experimental API. (error_generic_member_access #99301)

提供对用于错误报告的上下文的基于类型的访问。 

```rust
fn provide<'a>(&'a self, demand: &mut Demand<'a>)
```



### impl<'a> Extend<&'a str> for String



#### extend

使用迭代器的内容扩展集合。 

```rust
fn extend<I>(&mut self, iter: I)
where
  I: IntoIterator<Item = &'a str>,
```



#### extend_one

This is a nightly-only experimental API. (extend_one #72631)

用一个元素扩展一个集合。

```rust
fn extend_one(&mut self, s: &'a str)
```



#### extend_reserve

This is a nightly-only experimental API. (extend_one #72631)

在集合中为给定数量的附加元素保留容量。 

```rust
fn extend_reserve(&mut self, additional: usize)
```





### impl<'a> From<&'a str> for Cow<'a, str>

#### from

将字符串切片转换为 Borrowed 变体。 不执行堆分配，并且不复制字符串。

```rust
fn from(s: &'a str) -> Cow<'a, str>
```



**Example**

```rust
assert_eq!(Cow::from("eggplant"), Cow::Borrowed("eggplant"));
```



### impl From<&mut str> for String

#### from

将 `&mut str` 转换为 `String`。结果分配在堆上。

```rust
fn from(s: &mut str) -> String
```





### impl From<&str> for Arc\<str>

#### from

分配一个引用计数的 str 并将 v 复制到其中。

```rust
fn from(v: &str) -> Arc\<str>
```



**Example**

```rust
let shared: Arc<str> = Arc::from("eggplant");

assert_eq!("eggplant", &shared[..]);
```



### impl From<&str> for Box<dyn Error + 'static, Global>

#### from

将 str 转换为 dyn Error 的 box。

```rust
fn from(err: &str) -> Box<dyn Error + 'static, Global>
```



**Examples**

```rust
use std::error::Error;
use std::mem;


let a_str_error = "a str error";

let a_boxed_error = Box::<dyn Error>::from(a_str_error);

assert!(mem::size_of::<Box<dyn Error>>() == mem::size_of_val(&a_boxed_error))
```







### impl<'a> From<&str> for Box<dyn Error + Send + Sync + 'a, Global>

from

将 str 转换为 Dyn Error + Send + Sync 的 box。

```rust
fn from(err: &str) -> Box<dyn Error + Send + Sync + 'a, Global>
```



**Examples**

```rust
use std::error::Error;
use std::mem;


let a_str_error = "a str error";

let a_boxed_error = Box::<dyn Error + Send + Sync>::from(a_str_error);

assert!(mem::size_of::<Box<dyn Error + Send + Sync>>() == mem::size_of_val(&a_boxed_error))
```





### impl From<&str> for Box<str, Global>



#### from

将 &str 转换为 `Box<str>`

此转换在堆上分配并执行 s 的副本。

```rust
fn from(s: &str) -> Box<str, Global>
```

**Examples**

```rust
let boxed: Box<str> = Box::from("hello");

println!("{boxed}");
```



### impl From<&str> for Rc\<str>

#### from

分配一个引用计数的字符串切片并将 v 复制到其中。

```rust
fn from(v: &str) -> Rc<str>
```

**Example**

```rust
let shared: Rc<str> = Rc::from("statue");

assert_eq!("statue", &shared[..]);
```



### impl From<&str> for String

#### from

将 `&str` 转换为 `String`。结果分配在堆上。

```rust
fn from(s: &str) -> String
```





### impl From<&str> for Vec<u8, Global>

#### from

分配一个 `Vec<u8>` 并用 UTF-8 字符串填充它。

```rust
fn from(s: &str) -> Vec<u8, Global> 
```

**Examples**

```rust
assert_eq!(Vec::from("123"), vec![b'1', b'2', b'3']);
```



### impl From<Cow<'_, str>> for Box<str, Global>



#### from

将 `Cow<'_, str>` 转换为 `Box<str>`

当 cow 是 Cow::Borrowed 变体时，此转换在堆上分配并复制底层 str。 否则，它将尝试重用拥有所有权的 String 的分配。

```rust
fn from(cow: Cow<'_, str>) -> Box<str, Global>
```

**Examples**

```rust
use std::borrow::Cow;


let unboxed = Cow::Borrowed("hello");

let boxed: Box<str> = Box::from(unboxed);

println!("{boxed}");

let unboxed = Cow::Owned("hello".to_string());

let boxed: Box<str> = Box::from(unboxed);

println!("{boxed}");
```





### impl From\<String> for Box<str, Global>

#### from

将给定的 String 转换为拥有所有权的 boxed str 切片。

```rust
fn from(s: String) -> Box<str, Global>
```

**Examples**

```rust
let s1: String = String::from("hello world");

let s2: Box<str> = Box::from(s1);

let s3: String = String::from(s2);


assert_eq!("hello world", s3)
```



### impl<'a> FromIterator<&'a str> for String

#### from_iter

从迭代器创建一个值。 

```rust
fn from_iter<I>(iter: I) -> String
where
  I: IntoIterator<Item = &'a str>,
```



### impl<'a, 'b> FromIterator<&'b str> for Cow<'a, str>

#### from_iter

从迭代器创建一个值。 

```rust
fn from_iter<I>(it: I) -> Cow<'a, str>
where
  I: IntoIterator<Item = &'b str>,
```



### impl Hash for str

#### hash

将该值输入给定的 Hasher。 

```rust
fn hash<H>(&self, state: &mut H)
where
  H: Hasher,
```



### impl\<I> Index\<I> for str

```rust
impl<I> Index<I> for str
where
  I: SliceIndex<str>,
```



#### Output

索引后返回的类型。

```rust
type Output = <I as SliceIndex<str>>::Output
```



#### index

执行索引 (container[index]) 操作。 

```rust
fn index(&self, index: I) -> &<I as SliceIndex<str>>::Output
```



### impl\<I> IndexMut\<I> for str

```rust
impl<I> IndexMut<I> for str
where
  I: SliceIndex<str>,
```



#### index_mut

执行可变索引 (container[index]) 操作。 

```rust
fn index_mut(&mut self, index: I) -> &mut <I as SliceIndex<str>>::Output
```



### impl\<S> Join<&str> for [S]

```rust
impl<S> Join<&str> for [S]
where
  S: Borrow<str>,
```



#### Output

This is a nightly-only experimental API. (slice_concat_trait #27747)

串联后的结果类型

```rust
type Output = String
```



#### join

This is a nightly-only experimental API. (slice_concat_trait #27747)

[T]::join 的实现

```rust
fn join(slice: &[S], sep: &str) -> String
```





### impl Ord for str

实现字符串排序。

字符串按字节值按 按字典顺序 排序。 这将根据 Unicode 代码点在代码图中的位置进行排序。 这不一定与 “alphabetical” 顺序相同，后者因语言和区域设置而异。 根据文化认可的标准对字符串进行排序需要 str 类型的作用域之外的特定于语言环境的数据。



#### cmp

此方法返回 self 和 other 之间的 Ordering。 

```rust
fn cmp(&self, other: &str) -> Ordering
```



### impl<'a, 'b> PartialEq<&'a str> for String

eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &&'a str) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &&'a str) -> bool
```



### impl<'a, 'b> PartialEq<&'b str> for Cow<'a, str>

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &&'b str) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &&'b str) -> bool
```



### impl PartialEq<&str> for OsString

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &&str) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### impl<'a, 'b> PartialEq<Cow<'a, str>> for &'b str

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

### impl<'a, 'b> PartialEq<Cow<'a, str>> for str

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

### impl PartialEq\<OsStr> for str

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &OsStr) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### impl<'a> PartialEq\<OsString> for &'a str

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &OsString) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### impl PartialEq\<OsString> for str

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &OsString) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### impl<'a, 'b> PartialEq\<String> for &'a str

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



### impl<'a, 'b> PartialEq\<String> for str

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



### impl<'a, 'b> PartialEq\<str> for Cow<'a, str>

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



### impl PartialEq\<str> for OsStr

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





### impl PartialEq\<str> for OsString

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





### impl<'a, 'b> PartialEq\<str> for String

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





### impl PartialEq\<str> for str

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





### impl PartialOrd\<str> for OsStr

#### partial_cmp

如果存在，则此方法返回 self 和 other 值之间的顺序。 

```rust
fn partial_cmp(&self, other: &str) -> Option<Ordering>
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



### impl PartialOrd\<str> for OsString

#### partial_cmp

如果存在，则此方法返回 self 和 other 值之间的顺序。 

```rust
fn partial_cmp(&self, other: &str) -> Option<Ordering>
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



### impl PartialOrd\<str> for str

对字符串执行比较操作。

按字典顺序 通过字符串的字节值对字符串进行比较。 这将根据 Unicode 代码点在代码表中的位置进行比较。 这不一定与 “alphabetical” 顺序相同，后者因语言和区域设置而异。 根据文化认可的标准比较字符串需要特定于语言环境的数据，该数据不在 str 类型的作用域之内。

#### partial_cmp

如果存在，则此方法返回 self 和 other 值之间的顺序。 

```rust
fn partial_cmp(&self, other: &str) -> Option<Ordering>
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

### impl<'a, 'b> Pattern<'a> for &'b str

非分配子字符串搜索。

将模式 "" 处理为在每个字符边界处返回空匹配项。

Examples

```rust
assert_eq!("Hello world".find("world"), Some(6));
```



#### is_prefix_of

This is a nightly-only experimental API. (pattern #27721)

检查模式在 haystack 的前面是否匹配。

```rust
fn is_prefix_of(self, haystack: &'a str) -> bool
```





#### is_contained_in

This is a nightly-only experimental API. (pattern #27721)

检查模式是否与 haystack 中的任何位置匹配

```rust
fn is_contained_in(self, haystack: &'a str) -> bool
```



#### strip_prefix_of

This is a nightly-only experimental API. (pattern #27721)

如果匹配，则从 haystack 的正面删除模式。

```rust
fn strip_prefix_of(self, haystack: &'a str) -> Option<&'a str>
```



#### is_suffix_of

This is a nightly-only experimental API. (pattern #27721)

检查模式是否与 haystack 的后面匹配。

```rust
fn is_suffix_of(self, haystack: &'a str) -> bool
```





#### strip_suffix_of

This is a nightly-only experimental API. (pattern #27721)

如果匹配，则从 haystack 的后面删除模式。

```rust
fn strip_suffix_of(self, haystack: &'a str) -> Option<&'a str>
```





#### Searcher

This is a nightly-only experimental API. (pattern #27721)

此模式的关联搜索者

```rust
type Searcher = StrSearcher<'a, 'b>
```





#### into_searcher

This is a nightly-only experimental API. (pattern #27721)

从 self 和 haystack 构造关联的搜索器以进行搜索。

```rust
fn into_searcher(self, haystack: &'a str) -> StrSearcher<'a, 'b>
```





### impl SliceIndex\<str> for Range\<usize>

使用语法 &self[begin .. end] 或 &mut self[begin .. end] 实现子字符串切片。

从字节范围 [begin，end`) 返回给定字符串的切片。

此运算为 O(1)。

在 1.20.0 之前，Index 和 IndexMut 的直接实现仍支持这些索引操作。



:::tip Panics

如果 begin 或 end 未指向字符的起始字节偏移量 (由 is_char_boundary 定义)，begin > end 或 end > len，就会出现 panics。

:::



Examples

```rust
let s = "Löwe 老虎 Léopard";

assert_eq!(&s[0 .. 1], "L");

assert_eq!(&s[1 .. 9], "öwe 老");

// 这些将是 panic：
// 字节 2 位于 `ö` 内：
// &s[2 ..3];


// byte 8 lies within `老` &s[1 ..
// 8];
// 字节 100 在字符串 &s[3 之外。
// 100];
```



#### Output 

方法返回的输出类型。

```rust
type Output = str
```





#### get

This is a nightly-only experimental API. (slice_index_methods)

如果在边界内，则返回此位置输出的共享引用。

```rust
fn get(self, slice: &str) -> Option<&<Range<usize> as SliceIndex<str>>::Output>
```



#### get_mut

This is a nightly-only experimental API. (slice_index_methods)

如果在边界内，则对此位置的输出返回一个可变引用。

```rust
fn get_mut(
  self,
  slice: &mut str
) -> Option<&mut <Range<usize> as SliceIndex<str>>::Output>
```



#### get_unchecked

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的共享引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked(
  self,
  slice: *const str
) -> *const <Range<usize> as SliceIndex<str>>::Output
```



#### get_unchecked_mut

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的变量引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked_mut(
  self,
  slice: *mut str
) -> *mut <Range<usize> as SliceIndex<str>>::Output
```



#### index

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的共享引用，如果越界则会触发 panic。

```rust
fn index(self, slice: &str) -> &<Range<usize> as SliceIndex<str>>::Output 
```



#### index_mut

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的变量引用，如果越界则会触发 panic。

```rust
fn index_mut(
  self,
  slice: &mut str
) -> &mut <Range<usize> as SliceIndex<str>>::Output 
```



### impl SliceIndex\<str> for RangeFrom\<usize>

使用语法 &self[begin ..] 或 &mut self[begin ..] 实现子字符串切片。

从字节范围 [begin, len) 中返回给定字符串的切片。 相当于 &self[begin .. len] 或 &mut self[begin .. len]。

此运算为 O(1)。

在 1.20.0 之前，Index 和 IndexMut 的直接实现仍支持这些索引操作。



:::tip Panics

如果 begin 没有指向字符的起始字节偏移量 (由 is_char_boundary 定义)，或者 begin > len，就会出现 panics。

:::



#### Output

方法返回的输出类型。

```rust
type Output = str
```



#### get

This is a nightly-only experimental API. (slice_index_methods)

如果在边界内，则返回此位置输出的共享引用。

```rust
fn get(
  self,
  slice: &str
) -> Option<&<RangeFrom<usize> as SliceIndex<str>>::Output>
```



#### get_mut

This is a nightly-only experimental API. (slice_index_methods)

如果在边界内，则对此位置的输出返回一个可变引用。

```rust
fn get_mut(
  self,
  slice: &mut str
) -> Option<&mut <RangeFrom<usize> as SliceIndex<str>>::Output>
```



#### get_unchecked

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的共享引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked(
  self,
  slice: *const str
) -> *const <RangeFrom<usize> as SliceIndex<str>>::Output
```





#### get_unchecked_mut

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的变量引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked_mut(
  self,
  slice: *mut str
) -> *mut <RangeFrom<usize> as SliceIndex<str>>::Output
```



#### index

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的共享引用，如果越界则会触发 panic。

```rust
fn index(self, slice: &str) -> &<RangeFrom<usize> as SliceIndex<str>>::Output 
```



#### index_mut

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的变量引用，如果越界则会触发 panic。

```rust
fn index_mut(
  self,
  slice: &mut str
) -> &mut <RangeFrom<usize> as SliceIndex<str>>::Output 
```



### impl SliceIndex\<str> for RangeFull

使用语法 &self[..] 或 &mut self[..] 实现子字符串切片。

返回整个字符串的切片，即返回 &self 或 &mut self。相当于 &self[0 .. len] 或 &mut self[0 .. len]. 与其他索引操作不同，此操作永远不能 panic。

此运算为 O(1)。

在 1.20.0 之前，Index 和 IndexMut 的直接实现仍支持这些索引操作。

等效于 &self[0 .. len] 或 &mut self[0 .. len]。



#### Output

方法返回的输出类型。

```rust
type Output = str
```



#### get

This is a nightly-only experimental API. (slice_index_methods)

如果在边界内，则返回此位置输出的共享引用。

```rust
fn get(
  self,
  slice: &str
) -> Option<&<RangeFrom<usize> as SliceIndex<str>>::Output>
```



#### get_mut

This is a nightly-only experimental API. (slice_index_methods)

如果在边界内，则对此位置的输出返回一个可变引用。

```rust
fn get_mut(
  self,
  slice: &mut str
) -> Option<&mut <RangeFrom<usize> as SliceIndex<str>>::Output>
```



#### get_unchecked

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的共享引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked(
  self,
  slice: *const str
) -> *const <RangeFrom<usize> as SliceIndex<str>>::Output
```





#### get_unchecked_mut

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的变量引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked_mut(
  self,
  slice: *mut str
) -> *mut <RangeFrom<usize> as SliceIndex<str>>::Output
```



#### index

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的共享引用，如果越界则会触发 panic。

```rust
fn index(self, slice: &str) -> &<RangeFrom<usize> as SliceIndex<str>>::Output 
```



#### index_mut

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的变量引用，如果越界则会触发 panic。

```rust
fn index_mut(
  self,
  slice: &mut str
) -> &mut <RangeFrom<usize> as SliceIndex<str>>::Output 
```





### impl SliceIndex\<str> for RangeInclusive\<usize>

使用语法 &self[begin ..= end] 或 &mut self[begin ..= end] 实现子字符串切片。

从字节范围 [begin, end] 返回给定字符串的切片。等效于 &self [begin .. end + 1] 或 &mut self[begin .. end + 1]，除非 end 具有 usize 的最大值。

此运算为 O(1)。

Panics

如果 begin 没有指向字符的起始字节偏移量 (由 is_char_boundary 定义)，如果 end 没有指向字符的结束字节偏移量 (end + 1 是起始字节偏移量或等于 len)，如果 begin > end，或者如果 end >= len，就会出现 panics。



#### Output

方法返回的输出类型。

```rust
type Output = str
```



#### get

This is a nightly-only experimental API. (slice_index_methods)

如果在边界内，则返回此位置输出的共享引用。

```rust
fn get(
  self,
  slice: &str
) -> Option<&<RangeFrom<usize> as SliceIndex<str>>::Output>
```



#### get_mut

This is a nightly-only experimental API. (slice_index_methods)

如果在边界内，则对此位置的输出返回一个可变引用。

```rust
fn get_mut(
  self,
  slice: &mut str
) -> Option<&mut <RangeFrom<usize> as SliceIndex<str>>::Output>
```



#### get_unchecked

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的共享引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked(
  self,
  slice: *const str
) -> *const <RangeFrom<usize> as SliceIndex<str>>::Output
```





#### get_unchecked_mut

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的变量引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked_mut(
  self,
  slice: *mut str
) -> *mut <RangeFrom<usize> as SliceIndex<str>>::Output
```



#### index

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的共享引用，如果越界则会触发 panic。

```rust
fn index(self, slice: &str) -> &<RangeFrom<usize> as SliceIndex<str>>::Output 
```



#### index_mut

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的变量引用，如果越界则会触发 panic。

```rust
fn index_mut(
  self,
  slice: &mut str
) -> &mut <RangeFrom<usize> as SliceIndex<str>>::Output 
```



### impl SliceIndex\<str> for RangeToInclusive\<usize>

使用语法 &self[..= end] 或 &mut self[..= end] 实现子字符串切片。

从字节范围 [0, end] 中返回给定字符串的切片。 等效于 &self [0 .. end + 1]，除非 end 具有 usize 的最大值。

此运算为 O(1)。

Panics

如果 end 没有指向字符的结束字节偏移量 (end + 1 是 is_char_boundary 定义的起始字节偏移量，或者等于 len)，或者如果 end >= len，就会出现 panics。



#### Output

方法返回的输出类型。

```rust
type Output = str
```



#### get

This is a nightly-only experimental API. (slice_index_methods)

如果在边界内，则返回此位置输出的共享引用。

```rust
fn get(
  self,
  slice: &str
) -> Option<&<RangeFrom<usize> as SliceIndex<str>>::Output>
```



#### get_mut

This is a nightly-only experimental API. (slice_index_methods)

如果在边界内，则对此位置的输出返回一个可变引用。

```rust
fn get_mut(
  self,
  slice: &mut str
) -> Option<&mut <RangeFrom<usize> as SliceIndex<str>>::Output>
```



#### get_unchecked

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的共享引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked(
  self,
  slice: *const str
) -> *const <RangeFrom<usize> as SliceIndex<str>>::Output
```





#### get_unchecked_mut

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的变量引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked_mut(
  self,
  slice: *mut str
) -> *mut <RangeFrom<usize> as SliceIndex<str>>::Output
```



#### index

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的共享引用，如果越界则会触发 panic。

```rust
fn index(self, slice: &str) -> &<RangeFrom<usize> as SliceIndex<str>>::Output 
```



#### index_mut

This is a nightly-only experimental API. (slice_index_methods)

返回此位置输出的变量引用，如果越界则会触发 panic。

```rust
fn index_mut(
  self,
  slice: &mut str
) -> &mut <RangeFrom<usize> as SliceIndex<str>>::Output 
```







### impl ToOwned for str

#### Owned

获得所有权后的结果类型。

```rust
type Owned = String
```



#### to_owned

从借用的数据创建拥有的数据，通常是通过克隆。 

```rust
fn to_owned(&self) -> String
```



#### clone_into

使用借来的数据来替换拥有的数据，通常是通过克隆。 

```rust
fn clone_into(&self, target: &mut String)
```



### impl ToSocketAddrs for str

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



### impl ToString for str

#### to_string

将给定值转换为 String。 

```rust
fn to_string(&self) -> String
```





### impl ConstParamTy for str

### impl Eq for str

### impl StructuralEq for str



## Auto Trait Implementations

### impl RefUnwindSafe for str

### impl Send for str

### impl !Sized for str

### impl Sync for str

### impl Unpin for str

### impl UnwindSafe for str



## Blanket Implementations

### impl\<T> Any for T

```rust
impl<T> Any for T
where
  T: 'static + ?Sized,
```



### impl\<T> Borrow\<T> for T

```rust
impl<T> Borrow<T> for T
where
  T: ?Sized,
```



### impl\<T> BorrowMut\<T> for T

```rust
impl<T> BorrowMut<T> for T
where
  T: ?Sized,
```



### impl\<T> ToString for T

```rust
impl<T> ToString for T
where
  T: Display + ?Sized,
```





















