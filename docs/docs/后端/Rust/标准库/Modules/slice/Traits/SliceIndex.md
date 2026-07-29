# Trait std::slice::SliceIndex

用于索引操作的辅助 trait。

这个 trait 的实现必须 promise，如果 `get_unchecked(_mut)` 的参数是一个安全的引用，那么结果也是如此。

```rust
pub unsafe trait SliceIndex<T>: Sealed
where
    T: ?Sized,
{
    type Output: ?Sized;

    // Required methods
    fn get(self, slice: &T) -> Option<&Self::Output>;
    fn get_mut(self, slice: &mut T) -> Option<&mut Self::Output>;
    unsafe fn get_unchecked(self, slice: *const T) -> *const Self::Output;
    unsafe fn get_unchecked_mut(self, slice: *mut T) -> *mut Self::Output;
    fn index(self, slice: &T) -> &Self::Output;
    fn index_mut(self, slice: &mut T) -> &mut Self::Output;
}
```





## Required Associated Types

### Output

方法返回的输出类型。

```rust
type Output: ?Sized
```



## Required Methods

### get

`nightly-only`

如果在边界内，则返回此位置输出的共享引用。

```rust
fn get(self, slice: &T) -> Option<&Self::Output>
```



### get_mut

如果在边界内，则对此位置的输出返回一个可变引用。

```rust
fn get_mut(self, slice: &mut T) -> Option<&mut Self::Output>
```



### get_unchecked

返回此位置输出的共享引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked(self, slice: *const T) -> *const Self::Output
```



### get_unchecked_mut

返回此位置输出的变量引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked_mut(self, slice: *mut T) -> *mut Self::Output
```



### index

返回此位置输出的共享引用，如果越界则会触发 panic。

```rust
fn index(self, slice: &T) -> &Self::Output
```



### index_mut

返回此位置输出的变量引用，如果越界则会触发 panic。

```rust
fn index_mut(self, slice: &mut T) -> &mut Self::Output
```





## Implementors

### impl SliceIndex\<str> for Range\<usize>

使用语法 `&self[begin .. end]` 或 `&mut self[begin .. end]` 实现子字符串切片。

从字节范围 `[begin，end`) 返回给定字符串的切片。

此运算为 `O(1)`。

在 1.20.0 之前，Index 和 IndexMut 的直接实现仍支持这些索引操作。



:::tip Panics

如果 begin 或 end 未指向字符的起始字节偏移量 (由 is_char_boundary 定义)，begin > end 或 end > len，就会出现 panics。

:::



示例

```rust
let s = "Löwe 老虎 Léopard";

assert_eq!(&s[0 .. 1], "L");

assert_eq!(&s[1 .. 9], "öwe 老");


// 这些将是 panic：

// 字节 2 位于 `ö` 内：
// &s[2 ..3];


// byte 8 lies within `老` &s[1 ..8];


// 字节 100 在字符串 &s[3 之外。
// 100];
```



#### Output 

```rust
type Output = str
```





### impl SliceIndex\<str> for RangeFrom\<usize>

使用语法 `&self[begin ..]` 或 `&mut self[begin ..]` 实现子字符串切片。

从字节范围 `[begin, len)` 中返回给定字符串的切片。 相当于 `&self[begin .. len]` 或 `&mut self[begin .. len]`。

此运算为 O(1)。

在 1.20.0 之前，Index 和 IndexMut 的直接实现仍支持这些索引操作。



:::tip Panics

如果 begin 没有指向字符的起始字节偏移量 (由 is_char_boundary 定义)，或者 begin > len，就会出现 panics。

:::



#### Output 

```rust
type Output = str
```





### impl SliceIndex\<str> for RangeFull

使用语法 `&self[..]` 或 `&mut self[..]` 实现子字符串切片。

返回整个字符串的切片，即返回 `&self` 或 `&mut self`。相当于 `&self[0 .. len]` 或 `&mut self[0 .. len]`. 与其他索引操作不同，此操作永远不能 panic。

此运算为 `O(1)`。

在 1.20.0 之前，`Index` 和 `IndexMut` 的直接实现仍支持这些索引操作。

等效于 `&self[0 .. len]` 或 `&mut self[0 .. len]`。



#### Output 

```rust
type Output = str
```





### impl SliceIndex\<str> for RangeInclusive\<usize>

使用语法 `&self[begin ..= end]` 或 `&mut self[begin ..= end]` 实现子字符串切片。

从字节范围 [begin, end] 返回给定字符串的切片。等效于 `&self [begin .. end + 1]` 或 `&mut self[begin .. end + 1]`，除非 `end` 具有 `usize` 的最大值。

此运算为 O(1)。



:::tip Panics

如果 begin 没有指向字符的起始字节偏移量 (由 is_char_boundary 定义)，如果 end 没有指向字符的结束字节偏移量 (end + 1 是起始字节偏移量或等于 len)，如果 begin > end，或者如果 end >= len，就会出现 panics。

:::



#### Output 

```rust
type Output = str
```



### impl SliceIndex\<str> for RangeTo\<usize>

使用语法 `&self[.. end]` 或 `&mut self[.. end]` 实现子字符串切片。

从字节范围 `[0, end)` 中返回给定字符串的切片。 等效于 `&self[0 .. end]` 或 `&mut self[0 .. end]`。

此运算为 `O(1)`。

在 1.20.0 之前，`Index` 和 `IndexMut` 的直接实现仍支持这些索引操作。



:::tip Panics

如果 end 没有指向字符的起始字节偏移量 (由 is_char_boundary 定义)，或者 end > len，就会出现 panics。

:::

#### Output 

```rust
type Output = str
```





### impl SliceIndex\<str> for RangeToInclusive\<usize>

使用语法 `&self[..= end]` 或 `&mut self[..= end]` 实现子字符串切片。

从字节范围 `[0, end]` 中返回给定字符串的切片。 等效于 `&self [0 .. end + 1]`，除非 `end` 具有 `usize` 的最大值。

此运算为 O(1)。

:::tip Panics

如果 end 没有指向字符的结束字节偏移量 (end + 1 是 is_char_boundary 定义的起始字节偏移量，或者等于 len)，或者如果 end >= len，就会出现 panics。

:::



#### Output 

```rust
type Output = str
```



### impl\<T> SliceIndex<[T]> for (Bound\<usize>, Bound\<usize>)

#### Output 

```rust
type Output = str
```



### impl\<T> SliceIndex<[T]> for usize

#### Output 

```rust
type Output = str
```



### impl\<T> SliceIndex<[T]> for Range\<usize>

#### Output 

```rust
type Output = str
```



### impl\<T> SliceIndex<[T]> for RangeFrom\<usize>

#### Output 

```rust
type Output = str
```



### impl\<T> SliceIndex<[T]> for RangeFull

#### Output 

```rust
type Output = str
```



### impl\<T> SliceIndex<[T]> for RangeInclusive\<usize>

#### Output 

```rust
type Output = str
```



### impl\<T> SliceIndex<[T]> for RangeTo\<usize>

#### Output 

```rust
type Output = str
```



### impl\<T> SliceIndex<[T]> for RangeToInclusive\<usize>

#### Output 

```rust
type Output = str
```