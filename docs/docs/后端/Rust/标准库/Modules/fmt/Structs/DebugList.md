# Struct std::fmt::DebugList

一个有助于 fmt::Debug 实现的结构体。

```rust
pub struct DebugList<'a, 'b>
where
    'b: 'a,
{ /* private fields */ }
```

当您希望输出格式化的项列表作为 `Debug::fmt` 实现的一部分时，此功能很有用。

这可以通过 `Formatter::debug_list` 方法创建。

```rust
use std::fmt;

struct Foo(Vec<i32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_list().entries(self.0.iter()).finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![10, 11])),
    "[10, 11]",
);
```





## Implementations

### impl<'a, 'b> DebugList<'a, 'b>

```rust
impl<'a, 'b> DebugList<'a, 'b>
where
  'b: 'a,
```





#### entry

将新条目添加到列表输出中。

```rust
pub fn entry(&mut self, entry: &dyn Debug) -> &mut DebugList<'a, 'b>
```

**参数**：

- **entry**：单个迭代项

**返回值**：返回一个`DebugList`，方便链式调用

```rust
use std::fmt;

struct Foo(Vec<i32>, Vec<u32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_list()
           .entry(&self.0) // 我们添加第一个 "entry"。
           .entry(&self.1) // 我们添加第二个 "entry"。
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![10, 11], vec![12, 13])),
    "[[10, 11], [12, 13]]",
);
```



#### entries

将条目迭代器的内容添加到列表输出中。

```rust
pub fn entries<D, I>(&mut self, entries: I) -> &mut DebugList<'a, 'b>
where
    D: Debug,
    I: IntoIterator<Item = D>,
```

**参数**：

- **entries**：条目的迭代器

**返回值**：返回一个`DebugList`，方便链式调用

```rust
use std::fmt;

struct Foo(Vec<i32>, Vec<u32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_list()
           .entries(self.0.iter())
           .entries(self.1.iter())
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![10, 11], vec![12, 13])),
    "[10, 11, 12, 13]",
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
        fmt.debug_list()
           .entries(self.0.iter())
           .finish() // 结束结构体格式化。
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![10, 11])),
    "[10, 11]",
);
```



## Auto Trait Implementations

### impl<'a, 'b> !RefUnwindSafe for DebugList<'a, 'b>

### impl<'a, 'b> !Send for DebugList<'a, 'b>

### impl<'a, 'b> !Sync for DebugList<'a, 'b>

### impl<'a, 'b> Unpin for DebugList<'a, 'b>

### impl<'a, 'b> !UnwindSafe for DebugList<'a, 'b>



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