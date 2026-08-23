## Struct std::fmt::DebugTuple

一个有助于 `fmt::Debug` 实现的结构体。

```rust
pub struct DebugTuple<'a, 'b>
where
    'b: 'a,
{ /* private fields */ }
```

当您希望将格式化的**元组结构体**或者**枚举**作为 `Debug::fmt` 实现的一部分输出时，此功能很有用。

这可以通过 `Formatter::debug_tuple` 方法创建。

```rust
use std::fmt;

struct Foo(i32, String);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_tuple("Foo")
           .field(&self.0)
           .field(&self.1)
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(10, "Hello World".to_string())),
    "Foo(10, \"Hello World\")",
);
```

单元素元组结构体

```rust
use std::fmt;

struct Id(u64);

impl fmt::Debug for Id {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_tuple("Id")
            .field(&self.0)
            .finish()
    }
}

fn main() {
    let id = Id(12345);
    println!("{:?}", id);
    // 输出: Id(12345)
    
    // {:#?} 时，单元素元组会加逗号区分（Rust 语法要求）
    println!("{:#?}", id);
    // 输出:
    // Id(
    //     12345,
    // )
}
```

枚举变体

```rust
use std::fmt;

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

impl fmt::Debug for Message {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Message::Quit => {
                f.debug_tuple("Quit").finish()
            }
            Message::Move { x, y } => {
                f.debug_tuple("Move")
                    .field(x)
                    .field(y)
                    .finish()
            }
            Message::Write(text) => {
                f.debug_tuple("Write")
                    .field(text)
                    .finish()
            }
            Message::ChangeColor(r, g, b) => {
                f.debug_tuple("ChangeColor")
                    .field(r)
                    .field(g)
                    .field(b)
                    .finish()
            }
        }
    }
}

fn main() {
    let msg1 = Message::Quit;
    let msg2 = Message::Write("hello".to_string());
    let msg3 = Message::ChangeColor(255, 128, 0);
    
    println!("{:?}", msg1);
    // 输出: Quit
    
    println!("{:?}", msg2);
    // 输出: Write("hello")
    
    println!("{:?}", msg3);
    // 输出: ChangeColor(255, 128, 0)
}
```

嵌套

```rust
use std::fmt;

struct Point(i32, i32);
impl fmt::Debug for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_tuple("Point")
            .field(&self.0)
            .field(&self.1)
            .finish()
    }
}
struct Inner(i32, String);

impl fmt::Debug for Inner {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_tuple("Inner")
            .field(&self.0)
            .field(&self.1)
            .finish()
    }
}

struct Outer(Point, Inner);

impl fmt::Debug for Outer {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_tuple("Outer")
            .field(&self.0)   // Point 实现了 Debug，自动调用
            .field(&self.1)   // Inner 同理
            .finish()
    }
}

fn main() {
    let o = Outer(Point(1, 2), Inner(42, "hi".to_string()));
    println!("{:#?}", o);
    // 输出:
    // Outer(
    //     Point(
    //         1,
    //         2,
    //     ),
    //     Inner(
    //         42,
    //         "hi",
    //     ),
    // )
}
```





## Implementations

### impl<'a, 'b> DebugTuple<'a, 'b>

```rust
impl<'a, 'b> DebugTuple<'a, 'b>
where
  'b: 'a,
```



#### field

在生成的元组结构体输出中添加一个新字段。

```rust
pub fn field(&mut self, value: &dyn Debug) -> &mut DebugTuple<'a, 'b>
```

**参数**：

- **value**：字段的值

**返回值**：返回一个`DebugTuple`，方便链式调用

```rust
use std::fmt;

struct Foo(i32, String);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_tuple("Foo")
           .field(&self.0) // 我们添加第一个字段。
           .field(&self.1) // 我们添加第二个字段。
           .finish() // 我们很高兴去！
    }
}

assert_eq!(
    format!("{:?}", Foo(10, "Hello World".to_string())),
    "Foo(10, \"Hello World\")",
);
```



#### finish

完成输出并返回遇到的任何错误。

```rust
pub fn finish(&mut self) -> Result<(), Error>
```

**返回值**：返回一个`Result`，遇到错误则返回`Err`

```rust
use std::fmt;

struct Foo(i32, String);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_tuple("Foo")
           .field(&self.0)
           .field(&self.1)
           .finish() // 您需要调用它到 "finish"
                     // 元组格式。
    }
}

assert_eq!(
    format!("{:?}", Foo(10, "Hello World".to_string())),
    "Foo(10, \"Hello World\")",
);
```





## Auto Trait Implementations

### impl<'a, 'b> !RefUnwindSafe for DebugTuple<'a, 'b>

### impl<'a, 'b> !Send for DebugTuple<'a, 'b>

### impl<'a, 'b> !Sync for DebugTuple<'a, 'b>

### impl<'a, 'b> Unpin for DebugTuple<'a, 'b>

### impl<'a, 'b> !UnwindSafe for DebugTuple<'a, 'b>



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
