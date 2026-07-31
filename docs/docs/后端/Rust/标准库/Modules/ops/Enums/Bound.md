# Enum std::ops::Bound

一系列键的端点。

```rust
pub enum Bound<T> {
    Included(T),
    Excluded(T),
    Unbounded,
}
```

边界是范围端点：

```rust
use std::ops::Bound::*;
use std::ops::RangeBounds;

assert_eq!((..100).start_bound(), Unbounded);
assert_eq!((1..12).start_bound(), Included(&1));
assert_eq!((1..12).end_bound(), Excluded(&12));
```

使用 `Bound`s 的元组作为 [`BTreeMap::range`](https://www.rustwiki.org.cn/zh-CN/std/collections/btree_map/struct.BTreeMap.html#method.range) 的参数。 请注意，在大多数情况下，最好改用范围语法 (`1..5`)。

```rust
use std::collections::BTreeMap;
use std::ops::Bound::{Excluded, Included, Unbounded};

let mut map = BTreeMap::new();
map.insert(3, "a");
map.insert(5, "b");
map.insert(8, "c");

for (key, value) in map.range((Excluded(3), Included(8))) {
    println!("{key}: {value}");
}

assert_eq!(Some((&3, &"a")), map.range((Unbounded, Included(5))).next());
```





## 变体

### Included(T)

包容性范围。



### Excluded(T)

排他性约束。



### Unbounded

无限端点。指示此方向没有界限





## Implementations

### Bound\<T>

```rust
impl<T> Bound<T>
```





#### as_ref

从 `&Bound<T>` 转换为 `Bound<&T>`。

```rust
pub fn as_ref(&self) -> Bound<&T>
```

**返回值**：返回拥有内部引用的`Bound<&T>`



#### as_mut

从 `&mut Bound<T>` 转换为 `Bound<&mut T>`。

```rust
pub fn as_mut(&mut self) -> Bound<&mut T>
```



#### map

可以将`Included` 和 `Excluded`包含的值进行操作，然后返回出去

```rust
pub fn map<U, F>(self, f: F) -> Bound<U>
where
    F: FnOnce(T) -> U,
```

**参数**：

- **f**：闭包函数
  - 参数为`Included`或`Excluded`包含的值，
    - 如果是`Unbounded`，`map`函数返回`Unbounded`，闭包函数不会执行
    - 并且声明`Unbounded`变量必须显示声明类型
  - 该函数的返回值

**返回值**：返回一个`Bound`，其中包含被操作过的值

参数为`Included`

```rust
fn main() {
    use std::ops::Bound::*;

    let bound_string = Included("Hello, World!");
    let res = bound_string.map(|s| {
        println!("{:#?}", s); // "Hello, World!"
        s.len()
    });
    println!("{:#?}", res); //  Included(13)
}
```

参数为`Excluded`

```rust
fn main() {
    use std::ops::Bound::*;

    let bound_string= Excluded(12);
    let res = bound_string.map(|s| {
        println!("{:?}", s); // 12
        s>10
    });
    println!("{:?}", res); //  Excluded(true)
}
```

参数为`Unbounded`

```rust
fn main() {
    use std::ops::Bound::*;

    let bound_string: std::ops::Bound<usize> = Unbounded;
    let res: std::ops::Bound<usize> = bound_string.map(|s| {
		// 该函数不会执行
        println!("{:?}", s);  
        10
    });
    println!("{:?}", res); //  Unbounded
}
```



### Bound<&T>

#### cloned

Map 通过克隆绑定的内容将 `Bound<&T>` 更改为 `Bound<T>`。

```rust
pub fn cloned(self) -> Bound<T>
```

**返回值**：返回一个将 `Bound<&T>` 更改为 `Bound<T>`的副本

```rust
use std::ops::Bound::*;
use std::ops::RangeBounds;

assert_eq!((1..12).start_bound(), Included(&1));
assert_eq!((1..12).start_bound().cloned(), Included(1));
```





## Trait Implementations

### Clone

```rust
impl<T> Clone for Bound<T>
where
  T: Clone,
```



#### clone

返回值的副本。 

```rust
fn clone(&self) -> Bound<T>
```



#### clone_from

从 source 执行复制分配。 

```rust
fn clone_from(&mut self, source : &Self)
```



### Debug

```rust
impl<T> Debug for Bound<T>

where

  T: Debug,
```

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



### Hash

```rust
impl<T> Hash for Bound<T>

where

  T: Hash,
```

#### hash

将该值输入给定的 Hasher。 

```rust
fn hash<__H>(&self, state: &mut __H)

where

  __H: Hasher,
```

#### hash_slice

将这种类型的切片送入给定的 Hasher 中。 

```rust
fn hash_slice<H>(data: &[Self], state: &mut H)

where

  H: Hasher,

  Self: Sized,
```



### PartialEq<Bound\<T>>

```rust
impl<T> PartialEq<Bound<T>> for Bound<T>

where

  T: PartialEq<T>,
```

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &Bound<T>) -> bool
```

#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### Copy

```rust
impl<T> Copy for Bound<T>
where
  T: Copy,
```



### Eq

```rust
impl<T> Eq for Bound<T>
where
  T: Eq,
```



### StructuralEq

```rust
impl<T> StructuralEq for Bound<T>
```



### StructuralPartialEq

```rust
impl<T> StructuralPartialEq for Bound<T>
```



## Auto Trait Implementations

### RefUnwindSafe

```rust
impl<T> RefUnwindSafe for Bound<T>
where
  T: RefUnwindSafe,
```



### Send

```rust
impl<T> Send for Bound<T>
where
  T: Send,
```



### Sync

```rust
impl<T> Sync for Bound<T>
where
  T: Sync,
```



### Unpin

```rust
impl<T> Unpin for Bound<T>
where
  T: Unpin,
```



### UnwindSafe

```rust
impl<T> UnwindSafe for Bound<T>
where
  T: UnwindSafe,
```



## Blanket Implementations

### Any

```rust
impl<T> Any for T
where
  T: 'static + ?Sized,
```



### Borrow\<T>

```rust
impl<T> Borrow<T> for T
where
  T: ?Sized,
```



### BorrowMut\<T>

```rust
impl<T> BorrowMut<T> for T
where
  T: ?Sized,
```



### From\<T>

```rust
impl<T> From<T> for T
```



### Into\<U>

```rust
impl<T, U> Into<U> for T
where
  U: From<T>,
```



### ToOwned

```rust
impl<T> ToOwned for T
where
  T: Clone,
```



### TryFrom\<U>

```rust
impl<T, U> TryFrom<U> for T
where
  U: Into<T>,
```



### TryInto\<U>

```rust
impl<T, U> TryInto<U> for T
where
  U: TryFrom<T>,
```

