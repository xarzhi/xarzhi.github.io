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





## 2.更新Vector

向数组尾部添加元素，可以使用 `push` 方法：

```rust
let mut v = Vec::new();
v.push(1);
```

与其它类型一样，必须将 `v` 声明为 `mut` 后，才能进行修改。



## 3.Vector 与其元素共存亡

跟结构体一样，`Vector` 类型在超出作用域范围后，会被自动删除：

```rust
{
    let v = vec![1, 2, 3];

    // ...
} // <- v超出作用域并在此处被删除
```

当 `Vector` 被删除后，它内部存储的所有内容也会随之被删除。目前来看，这种解决方案简单直白，但是当 `Vector` 中的元素被引用后，事情可能会没那么简单。



## 4.读取Vector中的元素

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

#### with_capacity()

#### from_raw_parts()



### impl<T, A> Vec<T, A>

#### new_in()

#### with_capacity_in()

#### from_raw_parts_in()

#### into_raw_parts()

#### into_raw_parts_with_alloc()

#### capacity()

#### reserve()

#### reserve_exact()

#### try_reserve()

#### try_reserve_exact()

#### shrink_to_fit()

#### shrink_to()

#### into_boxed_slice()

#### truncate()

#### as_slice()

#### as_mut_slice()

#### as_ptr()

#### as_mut_ptr()

#### allocator()

#### set_len()

#### swap_remove()

#### insert()

#### remove()

#### retain()

#### retain_mut()

#### dedup_by()

#### push()

#### push_with_capacity()

#### pop()

#### append()

#### drain()

#### clear()

#### is_empty()

#### split_off()

#### resize_with()

#### leak()

#### spare_capacity_mut()

#### split_at_spate_mut()



### impl<T, A>Vec<T, A>

#### resize()

#### extends_from_slice()

#### extends_from_within()



### impl<T, A, const N: usize> Vec<[T; N], A>

#### into_flattened()

### impl<T, A> Vec<T, A>

#### dedup()

### impl<T, A> Vec<T, A>

#### splice()

#### drain_filter()



## 7.Methods from Deref<Target = [T]>

#### flatten()

#### flatten_mut()

#### len()

#### is_empty()

#### first()

#### first_mut()

#### split_first()

#### split_first_mut()

#### split_last()

#### split_last_mut()

#### last()

#### last_mut()

#### first_chunk_mut()

#### split_first_chunk()

#### split_first_chunk_mut()

#### split_last_chunk()

#### split_last_chunk_mut()

#### last_chunk()

#### last_chunk_mut()

#### get()

#### get_mut()

#### get_unchecked()

#### get_unchecked_mut()

#### as_ptr()

#### as_mut_ptr()

#### as_ptr_range()

#### as_mut_ptr_range()

#### swap()

#### swap_unchecked()

#### reverse()

#### iter()

#### iter_mut()

#### windows()

#### chunks()

#### chunks_mut()

#### chunks_exact()

#### chunks_exact_mut()

#### as_chunks_unchecked()

#### as_chunks()

#### as_rchunks()

#### array_chunks()

#### as_chunks_unchecked_mut()

#### as_chunks_mut()

#### as_rchunks_mut()

#### array_chunks_mut()

#### array_windows()

#### rchunks()

#### rchunks_mut()

#### rchunks_exact()

#### rchunks_exact_mut()

#### group_by()

#### group_by_mut()

#### split_at()

#### split_at_mut()

#### split_at_unchecked()

#### split_at_mut_unchecked()

#### split_array_ref()

#### aplit_array_mut()

#### rsplit_array_ref()

#### rsplit_array_mut()

#### split()

#### split_mut()

#### split_inclusive()

#### split_inclusive_mut()

#### rsplit()

#### rsplit_mut()

#### splitn()

#### splitn_mut()

#### rsplitn()

#### rsplitn_mut()

#### contains()

#### starts_with()

#### ends_with()

#### strip_prefix()

#### strip_suffix()

#### binary_search()

#### binary_search_by()

#### binary_search_by_key()

#### sort_unstable()

#### sort_unstable_by()

#### sort_unstable_by_key()

#### select_nth_unstable()

#### select_nth_unstable_by()

#### select_nth_unstable_by_key()

#### partition_dedup()

#### partition_dedup_by()

#### partition_dedup_by_key()

#### rotate_left()

#### rotate_right()

#### fill()

#### fill_with()

#### clone_from_slice()

#### copy_from_slice()

#### copy_within()

#### swap_with_slice()

#### align_to()

#### align_to_mut()

#### as_simd()

#### as_simd_mut()

#### is_sorted()

#### is_sorted_by()

#### partition_point()

#### take()

#### take_mut()

#### take_first()

#### take_first_mut()

#### take_last()

#### take_last_mut()

#### get_many_unchecked_mut()

#### get_many_mut()

#### sort_floats()

#### sort_floats()

#### is_ascii()

#### as_ascii()

#### as_ascii_unchecked()

#### eq_ignore_ascii_case()

#### make_ascii_uppercase()

#### make_ascii_lowercase()

#### escape_ascii()

#### trim_ascii_start()

#### trim_ascii_end()

#### trim_ascii()

#### as_str()

#### as_bytes()

#### to_ascii_uppercase()

#### to_ascii_lowercase()

#### sort()

#### sort_by()

#### sort_by_key()

#### sort_by_cached_key()

#### to_vet()

#### to_vet_in()

#### repeat()

#### concat()

#### join()

#### connect()





## 8.Trait 实现

### impl<T, A> AsMut<[T]> for Vec<T, A>

```rust
impl<T, A> AsMut<[T]> for Vec<T, A>
where
    A: Allocator,
```



#### as_mut()

















