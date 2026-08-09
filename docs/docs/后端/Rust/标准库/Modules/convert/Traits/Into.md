# Trait std::convert::Into

用于将`Self`类型的值转化为`T`类型的值，与`From`相反

```rust
pub trait Into<T>: Sized {
    // Required method
    fn into(self) -> T;
}
```

注意：此 trait 一定不能失败。如果转换可能失败，请使用 TryInto。



## 泛型实现

- `From<T>` for U 意味着 `Into<U>` for T
- `Into` 是反射的，这意味着 `Into<T>` for T 被实现



`String` 实现 `Into<Vec<u8>>`

```rust
fn is_hello<T: Into<Vec<u8>>>(s: T) {
   let bytes = b"hello".to_vec();
   assert_eq!(bytes, s.into());
}

let s = "hello".to_string();
is_hello(s);
```

为自定义类型实现`Into`

```rust
struct People {
    name: String,
}
impl Into<String> for People {
    fn into(self) -> String {
        self.name
    }
}

fn main() {
    let p = People {
        name: "xarzhi".to_string(),
    };
    let s: String = p.into();
    println!("{:#?}", s); // "xarzhi"
}

```





## Required Methods

### into

将此类型转换为 (通常是推断的) 输入类型。

```rust
fn into(self) -> T
```



## Implementors



### impl Into\<ExitStatus> for ExitStatusError



### impl<T, U> Into\<U> for T

```rust
impl<T, U> Into<U> for T
where
  U: From<T>,
```

