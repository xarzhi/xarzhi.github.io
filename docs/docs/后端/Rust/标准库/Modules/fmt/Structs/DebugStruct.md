# Struct std::fmt::DebugStruct

一个有助于 `fmt::Debug` 实现的结构体。

```rust
pub struct DebugStruct<'a, 'b>
where
    'b: 'a,
{ /* private fields */ }
```

当您希望将格式化的结构体作为 `Debug::fmt` 实现的一部分输出时，此功能很有用。

这可以通过 `Formatter::debug_struct` 方法创建。

```rust
use std::fmt;

struct Foo {
    bar: i32,
    baz: String,
}

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_struct("Foo")
           .field("bar", &self.bar)
           .field("baz", &self.baz)
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo { bar: 10, baz: "Hello World".to_string() }),
    "Foo { bar: 10, baz: \"Hello World\" }",
)
```





## Implementations

### impl<'a, 'b> DebugStruct<'a, 'b>

```rust
impl<'a, 'b> DebugStruct<'a, 'b>
where
  'b: 'a,
```



#### field

在生成的结构体输出中添加一个新字段。

```rust
pub fn field(
    &mut self,
    name: &str,
    value: &dyn Debug
) -> &mut DebugStruct<'a, 'b>
```

**参数**：

- **name**：字段名
- **value**：字段值

**返回值**：返回一个`DebugStruct`，方便链式调用

```rust
use std::fmt;

struct Bar {
    bar: i32,
    another: String,
}

impl fmt::Debug for Bar {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_struct("Bar")
           .field("bar", &self.bar) // 我们添加 `bar` 字段。
           .field("another", &self.another) // 我们添加 `another` 字段。
           // 我们甚至添加了一个不存在的字段 (因为为什么不呢？)。
           .field("nonexistent_field", &1)
           .finish() // 我们很高兴去！
    }
}

assert_eq!(
    format!("{:?}", Bar { bar: 10, another: "Hello World".to_string() }),
    "Bar { bar: 10, another: \"Hello World\", nonexistent_field: 1 }",
);
```



#### finish_non_exhaustive

将结构体标记为非穷举，向 reader 指示在调试表示中未显示其他一些字段。

```rust
pub fn finish_non_exhaustive(&mut self) -> Result<(), Error>
```

**返回值**：返回一个`Result`，若发生错误则返回Err

```rust
use std::fmt;

struct Bar {
    bar: i32,
    hidden: f32,
}

impl fmt::Debug for Bar {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_struct("Bar")
           .field("bar", &self.bar)
           .finish_non_exhaustive() // 证明存在其他 field(s)。
    }
}

assert_eq!(
    format!("{:?}", Bar { bar: 10, hidden: 1.0 }),
    "Bar { bar: 10, .. }",
);
```



#### finish

完成输出并返回遇到的任何错误。

```rust
pub fn finish(&mut self) -> Result<(), Error>
```

**返回值**：返回一个`Result`，若发生错误则返回Err

```rust
use std::fmt;

struct Bar {
    bar: i32,
    baz: String,
}

impl fmt::Debug for Bar {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_struct("Bar")
            .field("bar", &self.bar)
            .field("baz", &self.baz)
            .finish() // 您需要调用它到 "finish"
        // 结构体格式化。
    }
}
fn main() {
    println!(
        "{:#?}",
        Bar {
            bar: 10,
            baz: "Hello World".to_string()
        }
    )

    /*
     Bar {
        bar: 10,
        baz: "Hello World",
    }
     */
}
```



## Auto Trait Implementations

### impl<'a, 'b> !RefUnwindSafe for DebugStruct<'a, 'b>

### impl<'a, 'b> !Send for DebugStruct<'a, 'b>

### impl<'a, 'b> !Sync for DebugStruct<'a, 'b>

### impl<'a, 'b> Unpin for DebugStruct<'a, 'b>

### impl<'a, 'b> !UnwindSafe for DebugStruct<'a, 'b>



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



