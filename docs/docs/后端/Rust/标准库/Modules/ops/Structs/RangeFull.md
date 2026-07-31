# Struct std::ops::RangeFull

无限制范围 `..`。

`RangeFull` 主要用作 切片索引，其简写为 `..`。 它不能用作 `Iterator`，因为它没有起点。

```rust
pub struct RangeFull;
```

`RangeFrom`的语法是`..` 

```rust
assert_eq!((..), std::ops::RangeFull);
```

它没有 `IntoIterator`实现，因此不能直接在 `for` 循环中使用它。 这不会编译：

```rust
for i in .. {
    // ...
}
```

用作 切片索引 时，`RangeFull` 产生完整的阵列作为切片。

```rust
let arr = [0, 1, 2, 3, 4];
assert_eq!(arr[ ..  ], [0, 1, 2, 3, 4]); // 这是 `RangeFull`
assert_eq!(arr[ .. 3], [0, 1, 2      ]);
assert_eq!(arr[ ..=3], [0, 1, 2, 3   ]);
assert_eq!(arr[1..  ], [   1, 2, 3, 4]);
assert_eq!(arr[1.. 3], [   1, 2      ]);
assert_eq!(arr[1..=3], [   1, 2, 3   ]);
```



## Trait Implementations

### impl Clone for RangeFull

#### clone

返回值的副本。 

```rust
fn clone(&self) -> RangeFull 
```



#### clone_from

从 `source`执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### impl Debug for RangeFull

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, fmt: &mut Formatter<'_>) -> Result<(), Error>
```



### impl Default for RangeFull

#### default

返回类型的 “默认值”。 

```rust
fn default() -> RangeFull 
```





### impl Hash for RangeFull

```rust
impl<Idx> Hash for RangeFull
where
    Idx: Hash,
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



### impl Index\<RangeFull> for CString

#### Output

索引后返回的类型。

```rust
type Output = OsStr
```



#### index

执行索引 (container[index]) 操作。 

```rust
fn index(&self, _index: RangeFull) -> &OsStr
```



### impl Index\<RangeFull> for OsString

#### Output

索引后返回的类型。

```rust
type Output = OsStr
```



#### index

执行索引 (container[index]) 操作。 

```rust
fn index(&self, _index: RangeFull) -> &OsStr
```



### impl Index\<RangeFull> for String

#### Output

索引后返回的类型。

```rust
type Output = str
```

#### index

执行索引 (container[index]) 操作。 

```rust
fn index(&self, _index: RangeFull) -> &str
```



### impl IndexMut\<RangeFull> for OsString

#### index_mut

执行可变索引 (container[index]) 操作。 

```rust
fn index_mut(&mut self, _index: RangeFull) -> &mut OsStr
```



### impl IndexMut\<RangeFull> for String

#### index_mut

执行可变索引 (container[index]) 操作。 

```rust
fn index_mut(&mut self, _index: RangeFull) -> &mut str
```



### impl PartialEq\<RangeFull> for RangeFull

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &RangeFull) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### impl\<T> RangeBounds\<T> for RangeFull

```rust
impl<T> RangeBounds<T> for RangeFull
where
  T: ?Sized,
```



#### start_bound

开始索引绑定。 

```rust
fn start_bound(&self) -> Bound<&T>
```



#### end_bound

结束索引绑定。 

```rust
fn end_bound(&self) -> Bound<&T>
```



#### contains

如果范围中包含 item，则返回 true。 

```rust
fn contains<U>(&self, item: &U) -> bool
where
  T: PartialOrd<U>,
  U: PartialOrd<T> + ?Sized,
```



### impl\<T> SliceIndex<[T]> for RangeFull\<usize>

#### Output

方法返回的输出类型。

```rust
type Output = [T]
```



#### get

`nightly-only`
如果在边界内，则返回此位置输出的共享引用。

```rust
fn get(self, slice: &[T]) -> Option<&[T]>
```



#### get_mut

`nightly-only`
如果在边界内，则对此位置的输出返回一个可变引用。

```rust
fn get_mut(self, slice: &mut [T]) -> Option<&mut [T]>
```



#### get_unchecked

`nightly-only`
返回此位置输出的共享引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked(self, slice: *const [T]) -> *const [T]
```



#### get_unchecked_mut

`nightly-only`
返回此位置输出的变量引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked_mut(self, slice: *mut [T]) -> *mut [T]
```



#### index

`nightly-only`
返回此位置输出的共享引用，如果越界则会触发 panic。

```rust
fn index(self, slice: &[T]) -> &[T]
```



#### index_mut

`nightly-only`
返回此位置输出的变量引用，如果越界则会触发 panic。

```rust
fn index_mut(self, slice: &mut [T]) -> &mut [T]
```



### impl SliceIndex\<str> for RangeFull\<usize>

使用语法 `&self[begin .. end]` 或 `&mut self[begin .. end]` 实现子字符串切片。

从字节范围 `[begin，end)` 返回给定字符串的切片。

此运算为 `O(1)`。

在 1.20.0 之前，`Index` 和 `IndexMut` 的直接实现仍支持这些索引操作。



:::tip Panics
如果 begin 或 end 未指向字符的起始字节偏移量 (由 is_char_boundary 定义)，begin > end 或 end > len，就会出现 panics。

:::



Examples

```rust
let s = "Löwe 老虎 Léopard";
assert_eq!(&s[0 .. 1], "L");

assert_eq!(&s[1 .. 9], "öwe 老");

// 这些将是 panic：
// 字节 2 位于 `ö` 内：
// &s[2 ..3];

// byte 8 lies within `老` &s[1 ..
// 8];

// 字节 100 在字符串 &s[3 之外。
// 100];
```


方法返回的输出类型。

```rust
type Output = str
```



#### get

`nightly-only`
如果在边界内，则返回此位置输出的共享引用。

```rust
fn get(self, slice: &str) -> Option<&<RangeFull<usize> as SliceIndex<str>>::Output>
```



#### get_mut

`nightly-only`
如果在边界内，则对此位置的输出返回一个可变引用。

```rust
fn get_mut(
    self,
    slice: &mut str
) -> Option<&mut <RangeFull<usize> as SliceIndex<str>>::Output>
```

#### get_unchecked

`nightly-only`
返回此位置输出的共享引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked(
    self,
    slice: *const str
) -> *const <RangeFull<usize> as SliceIndex<str>>::Output
```

#### get_unchecked_mut

`nightly-only`
返回此位置输出的变量引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked_mut(
    self,
    slice: *mut str
) -> *mut <RangeFull<usize> as SliceIndex<str>>::Output
```



#### index

`nightly-only`
返回此位置输出的共享引用，如果越界则会触发 panic。

```rust
fn index(self, slice: &str) -> &<RangeFull<usize> as SliceIndex<str>>::Output 
```




#### index_mut

`nightly-only`
返回此位置输出的变量引用，如果越界则会触发 panic。

```rust
fn index_mut(
    self,
    slice: &mut str
) -> &mut <RangeFull<usize> as SliceIndex<str>>::Output 
```





### impl Copy for RangeFull

### impl Eq for RangeFull

### impl StructuralEq for RangeFull

### impl StruturalPartialEq for RangeFull



## Auto Trait Implementations

### impl RefUnwindSafe for RangeFull

### impl Send for RangeFull

### impl Sync for RangeFull

### impl Unpin for RangeFull

### impl UnwindSafe for RangeFull



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



### impl\<T> ToOwned for T

```rust
impl<T> ToOwned for T
where
    T: Clone,
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

