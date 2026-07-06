# 字符串

`Rust`的字符串分为两种，

- **str**：原始字符串，也成为**字符串切片**
- **String**：类型是最常见的字符串类型，拥有对该字符串内容的所有权。它与其借用的对应物，原始的 [`str`](https://www.rustwiki.org.cn/zh-CN/std/primitive.str.html) 有着密切的关系。

不论哪一种，内部存储的都是`utf8`编码序列，也就是说**每个字符的大小是不定的**。

例如`"你好 Rust"`这个字符串，内存视图如下：

![在这里插入图片描述](https://gitee.com/xarzhi/picture/raw/master/img/4d51526c9e184d5d9489adea2bbacb80.png)

## 1.定义字符串

字符串切片可以直接使用`""`包含一个字符串

```rust
let s = "你好";
```

而`String`需要使用`String::from()`方法来定义

```rust
let s = String::from("我很好");
```



:::tip 注意

字符串切片的类型一定要是`&str`而不是`str`

```rust
let s: &str = "你好";
```

:::



## 2.String 与 &str 的转换

通过以下两个方式可以把`&str`转换为`String`

```rust
let s:String = String::from("hello,world")
let s1:String = "hello,world".to_string()
```

把`String`中转换为`&str`，可以使用如下方式

```rust
let s = String::from("hello,world!");
let s1 = &s[..];
let s2 = &s[0..s.len()];
let s3 = s.as_str();
```



## 3.字符串切片

&str就是一种字符串切片，字符串切片的语法如下

```rust
// 语法：&str[start..end]

let hello = "中国人";

let s = &hello[0..hello.len()];
```

需要使用`&`后面跟上字符串的变量名，再跟上一个`[]`，`[]`中`..`左边是字符串索引的起点，右边是结尾索引

区间为`[start, end)`



## 4.字符串索引

在其他一些语言中，一般可以通过索引的方式精确的获取到字符串中的某个字符，但在rust中不行

因为rust中的字符串在底层的存储格式是`[u8]`，是一个字节数组，由于**每一个字符占用的字节不同**，所以无法通过索引索取字符

比如下面的示例

```rust
let s = "hello";

println!("{}", &s[0..1])        // h
```

因为每个英文字母占一个字节，所以可以取到第一个字符，再看如下实例

```rust
let s = "玩偶姐姐";

println!("{}", &s[0..3])        // 玩
```

因为大部分汉字再`UTF-8`中长度为3个字节，所以通过区间`[0..3)`就可以取到第一个字符

假如还是取区间`[0..1)`，那么就会报错

所以通过区间取一个字符串的切片是不安全的行为，但是可以通过区间`[0,str.len())`来获取整个字符串

```rust
let s = String::from("hello,world!");

let s2 = &s[0..s.len()];
```





## 5.字符串拼接

### 5.1 +操作符拼接

可以使用`+`操作符进行字符串拼接

但是要注意，第一个字符串往后的字符串，都要使用引用的形式

```rust
fn main() {
    let s1 = String::from("hello,");
    let s2 = String::from("world!");
    
    let s3 = s1 + &s2;
    println!("{}",s1);  // "hello,world!"
}
```



### 5.2 format!宏

`format!`也可以拼接字符串

```rust
let s1 = "hello";
let s2 = String::from("rust");
let s = format!("{} {}!", s1, s2);
println!("{}", s);		// hello rust!
```



