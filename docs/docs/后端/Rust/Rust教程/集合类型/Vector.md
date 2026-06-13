# Vector

Vector（动态数组）是一种连续的可增长数组类型，写成 `Vec<T>`，它是`vector`的缩写。

```rust
pub struct Vec<T, #[unstable(feature = "allocator_api", issue = "32838")] A: Allocator = Global> {
    buf: RawVec<T, A>,
    len: usize,
}
```



## 1.创建Vec

创建Vec有常用的方式

- 一种是使用关联函数`Vec::new()`
- 一种是使用`vec![]`宏
- 也可以使用`vec::from()`

### 1.1 Vec::new()

使用 `Vec::new` 创建动态数组是最 rusty 的方式，它调用了 `Vec` 中的 `new` 关联函数，不过不可以给于初始值

```rust
let v: Vec<i32> = Vec::new();
```

这里，`v` 被显式地声明了类型 `Vec<i32>`，这是因为 Rust 编译器无法从 `Vec::new()` 中得到任何关于类型的暗示信息，因此也无法推导出 `v` 的具体类型，但是当你向里面增加一个元素后，一切又不同了：

```rust
let mut v = Vec::new();
v.push(1);
```

此时，`v` 就无需手动声明类型，因为编译器通过 `v.push(1)`，推测出 `v` 中的元素类型是 `i32`，因此推导出 `v` 的类型是 `Vec<i32>`。

:::tip

如果预先知道要存储的元素个数，可以使用 `Vec::with_capacity(capacity)` 创建动态数组，这样可以避免因为插入大量新数据导致频繁的内存分配和拷贝，提升性能

:::





### 1.2 vec![]宏

vec![]宏创建vec就比较方便，因为它可以接收一个数组切片，用于初始化

```rust
let v = vec![11, 22, 33];

println!("{:#?}", v)

//     [
//      11,
//      22,
//      33,
//     ]
```





### 1.3 vec::from()

vec::from()和vec![]类似，也是可以接收一个数组切片，用于初始化

```rust
let v = Vec::from([11, 22, 33]);

println!("{:#?}", v)

//     [
//      11,
//      22,
//      33,
//     ]
```





## 2.更新Vec

向数组尾部添加元素，可以使用 `push` 方法：

```rust
let mut v = Vec::new();
v.push(1);
```

与其它类型一样，必须将 `v` 声明为 `mut` 后，才能进行修改。



## 3.Vec与其元素共存亡

跟结构体一样，`Vector` 类型在超出作用域范围后，会被自动删除：

```rust
{
    let v = vec![1, 2, 3];

    // ...
} // <- v超出作用域并在此处被删除
```

当 `Vector` 被删除后，它内部存储的所有内容也会随之被删除。目前来看，这种解决方案简单直白，但是当 `Vector` 中的元素被引用后，事情可能会没那么简单。



## 4.读取Vec中的元素

读取指定位置的元素有两种方式可选：

- 通过下标索引访问。
- 使用 `get` 方法。

### 4.1 下标

可以像使用数组下标那样，访问vec的成员

```rust
let v = Vec::from([11, 22, 33]);

println!("{}", v[0]);        // 11
println!("{}", v[1]);        // 22
println!("{}", v[2]);        // 33
```

使用借用

```rust
let mut v = Vec::from([11, 22, 33]);

let num1 = &v[0];
println!("{}", num1); // 11

let num2 = &mut v[1];
*num2 = 66;
println!("{:?}", v); // [11,66,33]
```



### 4.2 get()

通过get方法，也可以获取vec中的元素，get()方法传入一个下表，返回一个Option

```rust
let v = Vec::from([11, 22, 33]);

let first = v.get(0);

match first {
    Some(v) => println!("{}", v),       // 11
    None => println!("唧唧复唧唧"),
}
```



## 5.遍历Vector

如果想要依次访问数组中的元素，可以使用迭代的方式去遍历数组，这种方式比用下标的方式去遍历数组更安全也更高效（每次下标访问都会触发数组边界检查）：

```rust
let v = vec![1, 2, 3];
for i in &v {
    println!("{i}");
}
```

也可以在迭代过程中，修改 `Vector` 中的元素：

```rust
let mut v = vec![1, 2, 3];
for i in &mut v {
    *i += 10
}
```

也可以使用iter()方法返回的迭代器去遍历

```rust
let v = vec![1, 2, 3];
for i in v.iter(){
    println!("{i}");
}
```





## 6.Implementations

### impl\<T> Vec<T, Global>

#### new()

创建一个空的`Vec<T>`

并不会立即分配内存，直到将元素压入 vector 为止，vector 才会分配。

```rust
pub const fn new() -> Vec<T, Global>
```

**返回值**：返回一个空的`Vec<T>`

**源码**：

```rust
#[inline]
#[rustc_const_stable(feature = "const_vec_new", since = "1.39.0")]
#[stable(feature = "rust1", since = "1.0.0")]
#[must_use]
pub const fn new() -> Self {
    Vec { buf: RawVec::NEW, len: 0 }
}
```

**例子**：

```rust
let mut vec: Vec<i32> = Vec::new();
```



#### with_capacity()

创建一个有指定容量的`Vec`

vector 将能够保存至少 `capacity` 个元素而无需重新分配。 此方法允许分配比 `capacity` 更多的元素。 如果 `capacity` 为 0，则不会分配 vector。

需要注意的是，尽管返回的 vector 具有指定的最小*容量*，但 vector 的*长度*为零。

```rust
pub fn with_capacity(capacity: usize) -> Vec<T, Global>
```

**参数**：

- capacity：指定Vec的容量，分配的字节大小不得大于 `isize::MAX`

**返回值**：返回一个指定容量的Vec

**源码**：

```rust
#[cfg(not(no_global_oom_handling))]
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
#[must_use]
pub fn with_capacity(capacity: usize) -> Self {
    Self::with_capacity_in(capacity, Global)
}
```

**例子**：

```rust
let v: Vec<u8> = Vec::with_capacity(1000);

println!("{}", v.capacity())        // 1000
```

:::warning 容量不是长度

- 容量是只这个Vec一共可以容纳多少个元素
- 长度是这个Vec当前已经存放了多少个元素

使用`with_capacity()`会一次性申请相应的内存空间，可以避免push等操作时，频繁申请空间

:::



:::tip `with_capacity`创建的是Vec的最小容量

如果超出了指定的容量，Vec会再重新申请容量

```rust
let mut v: Vec<u8> = Vec::with_capacity(10);

for i in 0..10 {
    v.push(i + 1)
}

println!("{}", v.len()); // 10          此处长度已达到指定的容量

v.push(66);                 

println!("{},{}", v.len(), v.capacity()); // 11 20          // 自动重新申请容量
```

Vec重新申请容量的大小为参数`capacity`的值

如果新容量超过 `isize::MAX` 字节，就会出现 panics。

:::



#### from_raw_parts()

直接从指针、容量和长度创建 `Vec<T>`

:::tip [Safety](https://www.rustwiki.org.cn/zh-CN/std/vec/struct.Vec.html#safety)

这是非常不安全的，因为没有检查的不变量的数量：

- `ptr` 必须使用全局分配器进行分配，例如通过 [`alloc::alloc`](https://www.rustwiki.org.cn/zh-CN/std/alloc/fn.alloc.html) 函数。
- `T` 需要与分配的 `ptr` 具有相同的对齐方式。 (具有不太严格的对齐方式的 `T` 是不够的，对齐方式实际上必须等于 [`dealloc`](https://www.rustwiki.org.cn/zh-CN/std/alloc/trait.GlobalAlloc.html#tymethod.dealloc) 的要求，即必须以相同的布局分配和释放内存。)
- `T` 的大小乘以 `capacity` (以字节为单位的分配大小) 需要与分配指针的大小相同。 (因为与对齐类似，必须使用相同的布局 `size` 来调用 [`dealloc`](https://www.rustwiki.org.cn/zh-CN/std/alloc/trait.GlobalAlloc.html#tymethod.dealloc)。)
- `length` 需要小于或等于 `capacity`。
- 第一个 `length` 值必须是 `T` 类型的正确初始化值。
- `capacity` 需要是分配指针的容量。
- 分配的字节大小不得大于 `isize::MAX`。 请参见 [`pointer::offset`](https://www.rustwiki.org.cn/zh-CN/std/primitive.pointer.html#method.offset) 的安全文档。

通过 `Vec<T>` 分配的任何 `ptr` 始终支持这些要求。如果支持不，变体，则允许其他分配源。

违反这些可能会导致一些问题，比如破坏分配器的内部数据结构。 例如，从指向长度为 `size_t` 的 C `char` 数组的指针构建 `Vec<u8>` 通常是**不**安全的，只有当数组最初由 `Vec` 或 `String` 分配时，这样做才是安全的。 从 `Vec<u16>` 及其长度构建一个也不安全，因为分配器关心对齐方式，并且这两种类型具有不同的对齐方式。 缓冲区以对齐方式 2 (对于 `u16`) 分配，但在将其转换为 `Vec<u8>` 后，它将以对齐方式释放 1. 为避免这些问题，通常最好使用 [`slice::from_raw_parts`](https://www.rustwiki.org.cn/zh-CN/std/slice/fn.from_raw_parts.html) 来进行铸造或转变。

`ptr` 的所有权有效地转移到 `Vec<T>`，然后 `Vec<T>` 可以随意释放，重新分配或更改指针所指向的内存的内容。 调用此函数后，请确保没有其他任何东西使用该指针。

:::

```rust
pub unsafe fn from_raw_parts(
    ptr: *mut T,
    length: usize,
    capacity: usize
) -> Vec<T, Global>
```

**参数**：

- prt：一个指针
- length：Vec的长度
- capacity：Vec的容量

**返回值**：

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub unsafe fn from_raw_parts(ptr: *mut T, length: usize, capacity: usize) -> Self {
    unsafe { Self::from_raw_parts_in(ptr, length, capacity, Global) }
}
```

**例子**：

```rust
use std::ptr;
use std::mem;

let v = vec![1, 2, 3];

// 防止运行 `v` 的析构函数，因此我们可以完全控制分配。
let mut v = mem::ManuallyDrop::new(v);

// Pull 有关 `v` 的各种重要信息
let p = v.as_mut_ptr();
let len = v.len();
let cap = v.capacity();

unsafe {
    // 用 4、5、6 覆盖内存
    for i in 0..len {
        ptr::write(p.add(i), 4 + i);
    }

    // 将所有内容放回 Vec
    let rebuilt = Vec::from_raw_parts(p, len, cap);
    assert_eq!(rebuilt, [4, 5, 6]);
}
```



### impl<T, A> Vec<T, A>

```rust
impl<T, A> Vec<T, A>
where
    A: Allocator,
```



#### new_in()

用于**创建一个使用指定自定义内存分配器的、空的 `Vec`**，是 `Vec::new()`的“泛化”版本

允许你**显式指定一个分配器**。`Vec`后续所有的内存分配和释放（如 `push`, `reserve`等操作引发的）都将通过你提供的这个 `allocator`来完成。

直到将元素压入 vector 为止，vector 才会分配。

```rust
pub const fn new_in(alloc: A) -> Vec<T, A>
```

**参数**：

- alloc：自定义的内存分配器

**返回值**：返回一个自定义内存分配器的Vec

**源码**：

```rust
#[inline]
#[unstable(feature = "allocator_api", issue = "32838")]
pub const fn new_in(alloc: A) -> Self {
    Vec { buf: RawVec::new_in(alloc), len: 0 }
}
```

**例子**：

```rust
#![feature(allocator_api)]

use std::alloc::System;

let mut vec: Vec<i32, _> = Vec::new_in(System);
```





#### with_capacity_in()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### from_raw_parts_in()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### into_raw_parts()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### into_raw_parts_with_alloc()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### capacity()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### reserve()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### reserve_exact()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### try_reserve()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### try_reserve_exact()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### shrink_to_fit()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### shrink_to()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### into_boxed_slice()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### truncate()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_slice()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_mut_slice()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_ptr()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_mut_ptr()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### allocator()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### set_len()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### swap_remove()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### insert()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### remove()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### retain()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### retain_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### dedup_by()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### push()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### push_with_capacity()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### pop()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### append()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### drain()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### clear()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### is_empty()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_off()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### resize_with()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### leak()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### spare_capacity_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_at_spate_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```







```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



### impl<T, A>Vec<T, A>



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### resize()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### extends_from_slice()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### extends_from_within()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```







```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



### impl<T, A, const N: usize> Vec<[T; N], A>



#### into_flattened()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



### impl<T, A> Vec<T, A>

#### dedup()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



### impl<T, A> Vec<T, A>

#### splice()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### drain_filter()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```





## 7.Methods from Deref<Target = [T]>

#### flatten()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### flatten_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### len()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### is_empty()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### first()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### first_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_first()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_first_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_last()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_last_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### last()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### last_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### first_chunk_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_first_chunk()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_first_chunk_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_last_chunk()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_last_chunk_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### last_chunk()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### last_chunk_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### get()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### get_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### get_unchecked()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### get_unchecked_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_ptr()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_mut_ptr()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_ptr_range()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_mut_ptr_range()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### swap()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### swap_unchecked()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### reverse()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### iter()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### iter_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### windows()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### chunks()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### chunks_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### chunks_exact()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### chunks_exact_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_chunks_unchecked()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_chunks()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_rchunks()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### array_chunks()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_chunks_unchecked_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_chunks_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_rchunks_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### array_chunks_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### array_windows()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### rchunks()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### rchunks_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### rchunks_exact()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### rchunks_exact_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### group_by()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### group_by_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_at()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_at_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_at_unchecked()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_at_mut_unchecked()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_array_ref()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### aplit_array_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### rsplit_array_ref()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### rsplit_array_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_inclusive()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### split_inclusive_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### rsplit()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### rsplit_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### splitn()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### splitn_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### rsplitn()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### rsplitn_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### contains()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### starts_with()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### ends_with()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### strip_prefix()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### strip_suffix()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### binary_search()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### binary_search_by()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### binary_search_by_key()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### sort_unstable()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### sort_unstable_by()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### sort_unstable_by_key()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### select_nth_unstable()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### select_nth_unstable_by()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### select_nth_unstable_by_key()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### partition_dedup()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### partition_dedup_by()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### partition_dedup_by_key()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### rotate_left()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### rotate_right()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### fill()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### fill_with()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### clone_from_slice()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### copy_from_slice()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### copy_within()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### swap_with_slice()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### align_to()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### align_to_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_simd()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_simd_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### is_sorted()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### is_sorted_by()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### partition_point()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### take()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### take_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### take_first()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### take_first_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### take_last()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### take_last_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### get_many_unchecked_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### get_many_mut()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### sort_floats()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### sort_floats()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### is_ascii()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_ascii()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_ascii_unchecked()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### eq_ignore_ascii_case()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### make_ascii_uppercase()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### make_ascii_lowercase()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### escape_ascii()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### trim_ascii_start()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### trim_ascii_end()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### trim_ascii()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_str()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### as_bytes()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### to_ascii_uppercase()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### to_ascii_lowercase()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### sort()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### sort_by()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### sort_by_key()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### sort_by_cached_key()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### to_vet()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### to_vet_in()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### repeat()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### concat()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### join()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



#### connect()



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```





## 8.Trait 实现



```rust

```

**返回值**：

**源码**：

```rust

```

**例子**：

```rust

```



### impl<T, A> AsMut<[T]> for Vec<T, A>

``````rust

```





#### s_mut()
