# Struct std::fmt::DebugMap

一个有助于 fmt::Debug 实现的结构体。

```rust
pub struct DebugMap<'a, 'b>
where
    'b: 'a,
{ /* private fields */ }
```

当您希望输出格式化的 map 作为 Debug::fmt 实现的一部分时，此功能很有用。

这可以通过 Formatter::debug_map 方法创建。

```rust
use std::fmt;

struct Foo(Vec<(String, i32)>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_map().entries(self.0.iter().map(|&(ref k, ref v)| (k, v))).finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![("A".to_string(), 10), ("B".to_string(), 11)])),
    "{\"A\": 10, \"B\": 11}",
);
```





## Implementations

### impl<'a, 'b> DebugMap<'a, 'b>

```rust
impl<'a, 'b> DebugMap<'a, 'b>
where
  'b: 'a,
```



#### entry

在 map 输出中添加一个新条目。

```rust
pub fn entry(
  &mut self,
  key: &dyn Debug,
  value: &dyn Debug
) -> &mut DebugMap<'a, 'b>
```

**参数**：

- **key**：单个map项的键名
- **value**：单个map项对应键的值

**返回值**：返回一个`DebugList`，方便链式调用

```rust
use std::fmt;

struct Foo(Vec<(String, i32)>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_map()
           .entry(&"whole", &self.0) // 我们添加 "whole" 条目。
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![("A".to_string(), 10), ("B".to_string(), 11)])),
    "{\"whole\": [(\"A\", 10), (\"B\", 11)]}",
);
```



#### key

将新条目的关键部分添加到 map 输出中。

该方法与 `value` 一起，是 `entry` 的替代方法，可以在事先不知道完整条目的情况下使用。

尽可能使用 `entry` 方法。

```rust
pub fn key(&mut self, key: &dyn Debug) -> &mut DebugMap<'a, 'b>
```

**参数**：

- **key**：单个map项的键名

**返回值**：返回一个`DebugMap`，方便链式调用

```rust
use std::fmt;

struct Foo(Vec<(String, i32)>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_map()
           .key(&"whole").value(&self.0) // 我们添加 "whole" 条目。
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![("A".to_string(), 10), ("B".to_string(), 11)])),
    "{\"whole\": [(\"A\", 10), (\"B\", 11)]}",
);
```



:::tip

`key` 必须在 `value` 之前调用，每个调用到 `key` 必须跟在对应的调用到 `value` 之后。 否则，此方法将为 panic。

:::



#### value

将新条目的值部分添加到 map 输出中。

该方法与 `key` 一起，是 `entry` 的替代方法，可以在事先不知道完整条目的情况下使用。

尽可能使用 `entry` 方法。

```rust
pub fn value(&mut self, value: &dyn Debug) -> &mut DebugMap<'a, 'b>
```

**参数**：

- **value**：单个map项对应键的值

**返回值**：返回一个`DebugMap`，方便链式调用

```rust
use std::fmt;

struct Foo(Vec<(String, i32)>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_map()
           .key(&"whole").value(&self.0) // 我们添加 "whole" 条目。
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![("A".to_string(), 10), ("B".to_string(), 11)])),
    "{\"whole\": [(\"A\", 10), (\"B\", 11)]}",
);
```

:::tip

`key` 必须在 `value` 之前调用，每个调用到 `key` 必须跟在对应的调用到 `value` 之后。 否则，此方法将为 panic。

:::



#### entries

将条目迭代器的内容添加到 map 输出中。

```rust
pub fn entries<K, V, I>(&mut self, entries: I) -> &mut DebugMap<'a, 'b>
where
    K: Debug,
    V: Debug,
    I: IntoIterator<Item = (K, V)>,
```

**参数**：

- **entries**：条目的迭代器

**返回值**：返回一个`DebugMap`，方便链式调用

```rust
use std::fmt;

struct Foo(Vec<(String, i32)>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_map()
           // 我们将 vec 设为 map，因此每个条目的第一个字段将成为 "key"。
           .entries(self.0.iter().map(|&(ref k, ref v)| (k, v)))
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![("A".to_string(), 10), ("B".to_string(), 11)])),
    "{\"A\": 10, \"B\": 11}",
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

struct Foo(Vec<(String, i32)>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_map()
           .entries(self.0.iter().map(|&(ref k, ref v)| (k, v)))
           .finish() // 结束结构体格式化。
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![("A".to_string(), 10), ("B".to_string(), 11)])),
    "{\"A\": 10, \"B\": 11}",
);
```



:::tip

`key` 必须在 `value` 之前调用，每个调用到 `key` 必须跟在对应的调用到 `value` 之后。 否则，此方法将为 panic。

:::





## Auto Trait Implementations

### impl<'a, 'b> !RefUnwindSafe for DebugMap<'a, 'b>

### impl<'a, 'b> !Send for DebugMap<'a, 'b>

### impl<'a, 'b> !Sync for DebugMap<'a, 'b>

### impl<'a, 'b> Unpin for DebugMap<'a, 'b>

### impl<'a, 'b> !UnwindSafe for DebugMap<'a, 'b>



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