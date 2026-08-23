# Struct std::fmt::Arguments

该结构体表示格式字符串及其参数的安全预编译版本。 由于无法安全地完成此操作，因此无法在运行时生成该文件，因此未提供任何构造函数，并且该字段为私有字段以防止修改。

```rust
pub struct Arguments<'a> { /* private fields */ }
```

几乎不会手动构造 `Arguments`，而是通过宏：

`format_args!`宏将安全地创建此结构体的实例。 宏在编译时验证格式字符串，因此可以安全地执行 `write()` 和 `format()`函数的使用。

您可以在 `Debug` 和 `Display` 上下文中使用 `format_args!`返回的 `Arguments<'a>`，如下所示。 该示例还显示 `Debug` 和 `Display` 的格式相同: `format_args!` 中的插值格式字符串。

```rust
let debug = format!("{:?}", format_args!("{} foo {:?}", 1, 2));
let display = format!("{}", format_args!("{} foo {:?}", 1, 2));
assert_eq!("1 foo 2", display);
assert_eq!(display, debug);
```



## 主要用途

1.传递给 `write!` / `format!` / `print!`

这些宏内部都是先调用 `format_args!` 生成 `Arguments`，再传给底层函数：

```rust
// print! 宏的等价展开
let args = format_args!("hello {}", name);
std::io::stdout().write_fmt(args).unwrap();
```



2.自定义日志/输出函数

这是**最常见的实战场景**——写一个接受格式化参数的函数，避免每次都分配字符串：

```rust
use std::fmt;

fn log(args: fmt::Arguments<'_>) {
    // 直接把格式化内容写到输出，不分配中间 String
    println!("{}", args);
}

fn main() {
    let user = "Alice";
    let score = 95;
    log(format_args!("User {} scored {}", user, score));
    // 输出: User Alice scored 95
}
```



3.避免不必要的字符串分配

对比两种写法：

```rust
// ❌ 每次都分配 String（即使日志级别不够）
fn log_bad(level: &str, msg: &str) {
    if level == "error" {
        println!("ERROR: {}", msg);
    }
}

// ✅ 只有真正输出时才格式化，零分配
fn log_good(level: &str, args: fmt::Arguments<'_>) {
    if level == "error" {
        println!("ERROR: {}", args);
    }
}

fn main() {
    let name = "Alice";
    log_good("error", format_args!("User {} logged in", name));
}
```





## Implementations

### impl<'a> Arguments<'a>

#### as_str

获取格式化后的字符串，如果它没有要在运行时格式化的参数。

在某些情况下，这可用于避免分配。

```rust
pub fn as_str(&self) -> Option<&'static str>
```

**返回值**：返回一个`Option`，包含格式化后的字符串

```rust
use std::fmt::Arguments;

fn write_str(_: &str) { /* ... */ }

fn write_fmt(args: &Arguments<'_>) {
    if let Some(s) = args.as_str() {
        write_str(s)
    } else {
        write_str(&args.to_string());
    }
}
```

```rust
assert_eq!(format_args!("hello").as_str(), Some("hello"));
assert_eq!(format_args!("").as_str(), Some(""));
assert_eq!(format_args!("{:?}", std::env::current_dir()).as_str(), None);
```

:::tip Guarantees

对于 `format_args!("just a literal")`，这个函数保证返回 `Some("just a literal")`。

对于大多数带有占位符的情况，这个函数将返回 `None`。

但是，编译器可能会执行优化，即使格式字符串包含占位符，也会导致此函数返回 `Some(_)`。 例如，`format_args!("Hello, {}!", "world")` 可能被优化为 `format_args!("Hello, world!")`，这样 `as_str()` 返回 `Some("Hello, world!")`。

除了微不足道的情况 (没有占位符) 之外的任何行为都不能得到保证，并且除了优化之外不应依赖于任何其他行为。

:::



## Trait Implementations



### impl<'a> Clone for Arguments<'a>

#### clone

返回值的副本。 

```rust
fn clone(&self) -> Arguments<'a>
```



#### clone_from

从 source执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### impl Debug for Arguments<'_>

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, fmt: &mut Formatter<'_>) -> Result<(), Error>
```



### impl Display for Arguments<'_>

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, fmt: &mut Formatter<'_>) -> Result<(), Error>
```



### impl ToString for Arguments<'_>

#### to_string

将给定值转换为 String。 

```rust
fn to_string(&self) -> String
```



### impl<'a> Copy for Arguments<'a>



## Auto Trait Implementations

### impl<'a> !RefUnwindSafe for Arguments<'a>

### impl<'a> !Send for Arguments<'a>

### impl<'a> !Sync for Arguments<'a>

### impl<'a> Unpin for Arguments<'a>

### impl<'a> !UnwindSafe for Arguments<'a>



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



### impl\<T> From\<T> for T



### impl<T, U> Into\<U> for T

```rust
impl<T, U> Into<U> for T
where
  U: From<T>,
```



### impl\<T> ToOwned for T

```rust
impl<T> ToOwned for T
where
  T: Clone,
```



### impl\<T> ToString for T

```rust
impl<T> ToString for T
where
  T: Display + ?Sized,
```



### impl<T, U> TryFrom\<U> for T

```rust
impl<T, U> TryFrom<U> for T
where
  U: Into<T>,
```



### impl<T, U> TryInto\<U> for T

```rust
impl<T, U> TryInto<U> for T
where
  U: TryFrom<T>,
```

