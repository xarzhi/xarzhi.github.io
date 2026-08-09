# Trait std::string::ToString

一个用于将值转换为 `String` 的 trait。

```rust
pub trait ToString {
    // Required method
    fn to_string(&self) -> String;
}
```

:::tip 

**对于任何实现 `Display`trait 的类型，都会自动实现 trait。 因此，不应直接实现 `ToString`： 应该实现`Display`，就可以直接获得 `ToString` 实现。**

:::



## Required Methods

### to_string

将给定值转换为 `String`。

```rust
fn to_string(&self) -> String
```

基本用法

```rust
let i = 5;
let five = String::from("5");

assert_eq!(five, i.to_string());
```





## Implementors



### impl ToString for AsciiChar

### impl ToString for Cow<'_, str>

### impl ToString for bool

### impl ToString for char

### impl ToString for i8

### impl ToString for str

### impl ToString for u8

### impl ToString for Arguments<'_>

### impl ToString for String

### impl\<T> ToString for T

```rust
impl<T> ToString for T
where
  T: Display + ?Sized,
```



:::tip Panics

在此实现中，如果 Display 实现返回错误，则 to_string 方法 panics。 这表示 Display 实现不正确，因为 fmt::Write for String 本身从不返回错误。

:::

### impl ToString for TokenStream

### impl ToString for Literal

### impl ToString for Punct

### impl ToString for Group

### impl ToString for TokenTree

### impl ToString for Ident





## 为自己的类型实现ToString

```rust
struct People {
    name: String,
}

impl ToString for People {
    fn to_string(&self) -> String {
        self.name.clone()
    }
}

fn main() {
    let p = People {
        name: "ikun".to_string(),
    };

    println!("{:#?}", p.to_string()); // "ikun"
}
```

