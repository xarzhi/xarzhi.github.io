# Struct std::fmt::DebugSet

一个有助于 fmt::Debug 实现的结构体。

```rust
pub struct DebugSet<'a, 'b>
where
    'b: 'a,
{ /* private fields */ }
```

当您希望输出格式化的项集作为 `Debug::fmt` 实现的一部分时，这很有用。

这可以通过 `Formatter::debug_set` 方法创建。

```rust
use std::fmt;

struct Foo(Vec<i32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_set().entries(self.0.iter()).finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![10, 11])),
    "{10, 11}",
);
```





## Implementations

### impl<'a, 'b> DebugSet<'a, 'b>

```rust
impl<'a, 'b> DebugSet<'a, 'b>
where
  'b: 'a,
```





#### entry

将新条目添加到设置的输出中

```rust
pub fn entry(&mut self, entry: &dyn Debug) -> &mut DebugSet<'a, 'b>
```

**参数**：

- **entry**：单个迭代项

**返回值**：返回一个`DebugSet`，方便链式调用

```rust
use std::fmt;

struct Foo(Vec<i32>, Vec<u32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_set()
           .entry(&self.0) // 添加第一个 "entry"。
           .entry(&self.1) // 添加第二个 "entry"。
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![10, 11], vec![12, 13])),
    "{[10, 11], [12, 13]}",
);
```



#### entries

将条目迭代器的内容添加到设置的输出中。

```rust
pub fn entries<D, I>(&mut self, entries: I) -> &mut DebugSet<'a, 'b>
where
    D: Debug,
    I: IntoIterator<Item = D>,
```

**参数**：

- **entries**：条目的迭代器

**返回值**：返回一个`DebugSet`，方便链式调用

```rust
use std::fmt;

struct Foo(Vec<i32>, Vec<u32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_set()
           .entries(self.0.iter()) // 添加第一个 "entry"。
           .entries(self.1.iter()) // 添加第二个 "entry"。
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![10, 11], vec![12, 13])),
    "{10, 11, 12, 13}",
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

struct Foo(Vec<i32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_set()
           .entries(self.0.iter())
           .finish() // 结束结构体格式化。
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![10, 11])),
    "{10, 11}",
);
```



## Auto Trait Implementations

### impl<'a, 'b> !RefUnwindSafe for DebugSet<'a, 'b>

### impl<'a, 'b> !Send for DebugSet<'a, 'b>

### impl<'a, 'b> !Sync for DebugSet<'a, 'b>

### impl<'a, 'b> Unpin for DebugSet<'a, 'b>

### impl<'a, 'b> !UnwindSafe for DebugSet<'a, 'b>



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