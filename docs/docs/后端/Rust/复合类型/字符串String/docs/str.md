# str

`str` 类型，也称为字符串切片，是最原始的字符串类型。也是**标量类型**，它通常以其借用形式 `&str` 出现。 也是字符串字面量的类型，字符串切片始终是有效的 UTF-8。

字符串字面量是字符串切片：

```rust
let hello_world = "Hello, World!";
```

这里我们声明了一个用字符串字面量初始化的字符串切片。 字符串字面量具有静态的生命周期，这意味着字符串 `hello_world` 在整个程序期间均有效。

我们也可以明确指定 `hello_world` 的生命周期：

```rust
let hello_world: &'static str = "Hello, world!";
```



`&str` 由两个部分组成：一个指向某些字节的指针和一个长度。可以使用 `as_ptr` 和 `len` 方法查看它们：

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





## 方法

### impl str

#### len

返回`self`的长度

该长度以**字节**为单位，而不是`char`或字素。 换句话说，它可能不是人类认为的字符串长度。

```rust
pub const fn len(&self) -> usize
```

**返回值**：返回**字节**长度

```rust
let s1 = "全民制作人们大家好";
println!("{}", s1.len()); // 27       一个中文占3字节   3*9=27

let s2 = "hello";
println!("{}", s2.len()); // 5         一个英文占一个字节
```

**源码**：

```rust
#[stable(feature = "rust1", since = "1.0.0")]
#[rustc_const_stable(feature = "const_str_len", since = "1.39.0")]
#[must_use]
#[inline]
pub const fn len(&self) -> usize {
    self.as_bytes().len()
}
```



#### is_empty

判断一个字符串切片是否为空

```rust
pub const fn is_empty(&self) -> bool
```

**返回值**：根据字符串是否为空，返回布尔值

```rust
let s1 = "全民制作人们大家好";
println!("{}", s1.is_empty()); // false

let s2 = "";
println!("{}", s2.is_empty()); // true
```

**源码**：

```rust
#[stable(feature = "rust1", since = "1.0.0")]
#[rustc_const_stable(feature = "const_str_is_empty", since = "1.39.0")]
#[must_use]
#[inline]
pub const fn is_empty(&self) -> bool {
    self.len() == 0
}
```



#### is_char_boundary

判断指定索引的字节，是否是所处字符的第一个字节

```rust
pub fn is_char_boundary(&self, index: usize) -> bool
```

**参数**：

- **index**：字节索引

**返回值**：

- 若index是数以某个字符的第一个字节的索引，则返回`true`；否则返回`false`
- `self.len()`也会返回`true`，若`index>self.len()`则返回`false`

比如一个中文占3个字节，那么`"蔡徐坤"`这个字符串中，0是蔡的起点，3是徐的起点，6是坤的起点

```rust
let s = "蔡徐坤";
println!("{}", s.is_char_boundary(0));  // true
println!("{}", s.is_char_boundary(1));  // false
println!("{}", s.is_char_boundary(2));  // false
println!("{}", s.is_char_boundary(3));  // true
println!("{}", s.is_char_boundary(4));  // false
println!("{}", s.is_char_boundary(5));  // false
println!("{}", s.is_char_boundary(6));  // true
println!("{}", s.is_char_boundary(7));  // false
println!("{}", s.is_char_boundary(8));  // false
println!("{}", s.is_char_boundary(9));  // true
```

对于英文字母来说，每个字母占一个字节，所以index一直为true，超出边界才会为false

```rust
let s = "hello";
println!("{}", s.is_char_boundary(0)); // true
println!("{}", s.is_char_boundary(1)); // true
println!("{}", s.is_char_boundary(2)); // true
println!("{}", s.is_char_boundary(3)); // true
println!("{}", s.is_char_boundary(4)); // true
println!("{}", s.is_char_boundary(5)); // true     // 等于边界
println!("{}", s.is_char_boundary(6)); // false  // 超出了边界
```

**源码**：

```rust
#[must_use]
#[stable(feature = "is_char_boundary", since = "1.9.0")]
#[inline]
pub fn is_char_boundary(&self, index: usize) -> bool {
    // 0 总是可以的。
    // 显式测试 0，以便可以轻松优化检查，并在这种情况下跳过读取字符串数据。
    //
    // 请注意，优化 `self.get(..index)` 依赖于此。
    if index == 0 {
        return true;
    }

    match self.as_bytes().get(index) {
        // 对于 `None`，我们有两个选择：
        //
        // - index == self.len() 空字符串是有效的，因此返回 true
        // - index > self.len() 在这种情况下返回 false
        //
        // 检查正好放在这里，因为它改进了更高 opt-level 上生成的代码。
        // 有关更多详细信息，请参见 PR #84751。
        //
        //
        None => index == self.len(),

        Some(&b) => b.is_utf8_char_boundary(),
    }
}
```



#### floor_char_boundary

查找不超过`index`的最近的字符的字节索引

```rust
pub fn floor_char_boundary(&self, index: usize) -> usize
```

**参数**：

- **index**：字节索引

**返回值**：

- 若`index<self.len()`，则返回不超过`index`的最近的字符的字节索引
- 若`index>self.len()`，则返回`self.len()`

```rust
let s = "蔡徐坤"; 
println!("{}", s.floor_char_boundary(0)); // 0
println!("{}", s.floor_char_boundary(1)); // 0
println!("{}", s.floor_char_boundary(2)); // 0
println!("{}", s.floor_char_boundary(3)); // 3
println!("{}", s.floor_char_boundary(4)); // 3
println!("{}", s.floor_char_boundary(5)); // 3
println!("{}", s.floor_char_boundary(6)); // 6  超出长度，返回self.len()
```

**源码**：

```rust
#[unstable(feature = "round_char_boundary", issue = "93743")]
#[inline]
pub fn floor_char_boundary(&self, index: usize) -> usize {
    if index >= self.len() {
        self.len()
    } else {
        let lower_bound = index.saturating_sub(3);
        let new_index = self.as_bytes()[lower_bound..=index]
        .iter()
        .rposition(|b| b.is_utf8_char_boundary());

        // SAFETY: 我们知道字符边界将在四个字节内
        unsafe { lower_bound + new_index.unwrap_unchecked() }
    }
}
```



#### ceil_char_boundary

查找不低于`index`的最近的字符的第一个字节的索引

```rust
pub fn ceil_char_boundary(&self, index: usize) -> usize
```

**参数**：

- **index**：字节的索引

**返回值**：

- 若`index<self.len()`，则返回最近字符的**终点边界的索引**
- 若`index>=self.len()`，则直接返回`self.len()`

```rust
let s = "蔡徐坤"; 
println!("{}", s.ceil_char_boundary(0)); // 0
println!("{}", s.ceil_char_boundary(1)); // 3
println!("{}", s.ceil_char_boundary(2)); // 3
println!("{}", s.ceil_char_boundary(3)); // 3
println!("{}", s.ceil_char_boundary(4)); // 6
println!("{}", s.ceil_char_boundary(5)); // 6
println!("{}", s.ceil_char_boundary(6)); // 6  超出长度，返回self.len()
```

**源码**：

```rust
#[stable(feature = "round_char_boundary", since = "1.91.0")]
#[rustc_const_stable(feature = "round_char_boundary", since = "1.91.0")]
#[inline]
pub const fn ceil_char_boundary(&self, index: usize) -> usize {
    if index >= self.len() {
        self.len()
    } else {
        let mut i = index;
        while i < self.len() {
            if self.as_bytes()[i].is_utf8_char_boundary() {
                break;
            }
            i += 1;
        }

        //  The character boundary will be within four bytes of the index
        debug_assert!(i <= index + 3);

        i
    }
}
```



#### as_bytes

将字符串切片转换为字节切片。

```rust
pub const fn as_bytes(&self) -> &[u8]
```

**返回值**：返回被转换的字节切片

```rust
let s = "蔡徐坤";
println!("{:?}", s.as_bytes()); // [232, 148, 161, 229, 190, 144, 229, 157, 164]
```

**源码**：

```rust
#[stable(feature = "rust1", since = "1.0.0")]
#[rustc_const_stable(feature = "str_as_bytes", since = "1.39.0")]
#[must_use]
#[inline(always)]
#[allow(unused_attributes)]
pub const fn as_bytes(&self) -> &[u8] {
    // SAFETY: 常量声音，因为我们转换了两种具有相同布局的类型
    unsafe { mem::transmute(self) }
}
```

:::tip

 要将字节切片切回为字符串切片，请使用 `from_utf8` 函数。

```rust
use std::str;

// vector 中的一些字节
let sparkle_heart = vec![232, 148, 161, 229, 190, 144, 229, 157, 164];

let sparkle_heart = str::from_utf8(&sparkle_heart).unwrap();
println!("{:?}", sparkle_heart) // "蔡徐坤"
```

:::



#### as_bytes_mut

将可变字符串切片转换为可变字节切片。

```rust
pub unsafe fn as_bytes_mut(&mut self) -> &mut [u8]
```

**返回值**：返回转换后的字节切片的可变引用

```rust
let mut s = "蔡徐坤".to_string();
let bytes = unsafe { s.as_bytes_mut() };

println!("{:?}", bytes)
```

**源码**：

```rust
#[stable(feature = "str_mut_extras", since = "1.20.0")]
#[must_use]
#[inline(always)]
pub unsafe fn as_bytes_mut(&mut self) -> &mut [u8] {
    // SAFETY: 从 `&str` 到 `&[u8]` 的转换是安全的，因为 `str` 与 `&[u8]` 具有相同的布局 (只有 std 可以保证)。
    //
    // 指针解引用是安全的，因为它来自变量引用，该变量对写操作有效。
    //
    unsafe { &mut *(self as *mut str as *mut [u8]) }
}
```



#### as_ptr

将字符串切片转换为裸指针。

由于字符串切片是字节的切片，所以裸指针指向`u8`。 该指针将指向字符串切片的第一个字节。

调用者必须确保返回的指针永远不会被写入。

```rust
pub const fn as_ptr(&self) -> *const u8
```

**返回值**：返回字符串切片的裸指针

```rust
let s = "Hello";
let ptr = s.as_ptr();

println!("{:?}", ptr)  // 0x7ff798be93a4
```

**源码**：

```rust
#[stable(feature = "rust1", since = "1.0.0")]
#[rustc_const_stable(feature = "rustc_str_as_ptr", since = "1.32.0")]
#[must_use]
#[inline(always)]
pub const fn as_ptr(&self) -> *const u8 {
    self as *const str as *const u8
}
```



#### as_mut_ptr

将可变字符串切片转换为裸指针。

由于字符串切片是字节的切片，所以裸指针指向`u8`。 该指针将指向字符串切片的第一个字节。

您有责任确保仅以有效的 `UTF-8` 方式修改字符串切片。

```rust
pub fn as_mut_ptr(&mut self) -> *mut u8
```

**源码**：

```rust
#[stable(feature = "str_as_mut_ptr", since = "1.36.0")]
#[must_use]
#[inline(always)]
pub fn as_mut_ptr(&mut self) -> *mut u8 {
    self as *mut str as *mut u8
}
```



#### get

根据传入的`range`返回`self`的子切片，相当于截取

```rust
pub fn get<I>(&self, i: I) -> Option<&<I as SliceIndex<str>>::Output>
where
    I: SliceIndex<str>,
```

**参数**：

- i：一个range

**返回值**：

- 若`i`的取值范围合理，不越界，则返回截取的子字符串，放入Some中
- 若`i`的取值范围不合理，则返回None

```rust
let s="helloworld!";

println!("{:?}", s.get(0..5)); // Some("hello")


println!("{:?}", s.get(0..100)) // None
```

**源码**：

```rust
#[stable(feature = "str_checked_slicing", since = "1.20.0")]
#[inline]
pub fn get<I: SliceIndex<str>>(&self, i: I) -> Option<&I::Output> {
    i.get(self)
}
```



#### get_mut

根据传入的`range`返回`self`的可变子切片

```rust
pub fn get_mut<I>(
    &mut self,
    i: I
) -> Option<&mut <I as SliceIndex<str>>::Output>
where
    I: SliceIndex<str>,
```

**参数**：

- i：一个range

**返回值**：返回 `str` 的可变子切片。

```rust
let mut s = "helloworld!".to_string();
let s1 = s.get_mut(0..5);

let s2 = s1.map(|str| {
    // str.push_str("ikun");
    str.make_ascii_uppercase();
    &*str
});
println!("{:?}", s2); // Some("HELLO")
```

**源码**：

```rust
#[stable(feature = "str_checked_slicing", since = "1.20.0")]
#[inline]
pub fn get_mut<I: SliceIndex<str>>(&mut self, i: I) -> Option<&mut I::Output> {
    i.get_mut(self)
}
```



#### get_unchecked



```rust
pub unsafe fn get_unchecked<I>(&self, i: I) -> &<I as SliceIndex<str>>::Output
where
    I: SliceIndex<str>,
```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### get_unchecked_mut



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### slice_unchecked



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### slice_mut_unchecked



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### aplit_at



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### split_at_mut



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### chars



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### char_indices



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### bytes



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### split_whitespace



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### split_ascii_whitespace



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### lines



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### lines_any



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### encode_utf16



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### contains



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### start_with



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### ends_with



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### find



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### rfind



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### split



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### split_inclusive



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### rsplit



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### split_terminator



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### rsplit_terminator



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### splitn



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### replitn



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### split_once



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### rsplit_once



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### matches



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### rmatches



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### match_indices



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### rematch_indices



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### trim



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### trim_start



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### trim_end



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### trim_left



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### trim_right



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### trim_matches



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### trim_start_matches



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### strip_prefix



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### strip_suffix



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### trim_and_matches



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### trim_left_matches



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### trim_right_matches



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### parse



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### is_ascii



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### as_ascii



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### eq_ignore_ascii_case



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### make_ascii_uppercase



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### make_ascii_lowercase



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### escape_debug



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### escape_default



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### escape_unicode



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```





#### into_boxed_bytes



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### replace



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### replacen



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### to_lowercase



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### to_uppercase



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### into_string



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### repeat



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### to_ascii_uppercase



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```



#### to_ascii_lowercase



```rust

```

**参数**：

**返回值**：

```rust

```

**源码**：

```rust

```









## 特征实现



