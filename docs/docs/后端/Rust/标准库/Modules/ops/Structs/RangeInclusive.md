# Struct std::ops::RangeInclusive

围包括 (`start..=end`) 的上下边界。

`RangeInclusive` `start..=end` 包含 `x >= start` 和 `x <= end` 的所有值。除非 `start <= end`，否则为空。

这个迭代器是 `fused`，但是迭代完成后 `start` 和 `end` 的特定值是未指定的，除了 .`is_empty()` 之外，一旦不再产生值，就会返回 `true`。

```rust
pub struct RangeInclusive<Idx> { /* private fields */ }
```



 `RangeInclusive`的语法是`start..=end` 

```rust
assert_eq!((3..=5), std::ops::RangeInclusive::new(3, 5));
assert_eq!(3 + 4 + 5, (3..=5).sum());
```

```rust
let arr = [0, 1, 2, 3, 4];
assert_eq!(arr[ ..  ], [0, 1, 2, 3, 4]);
assert_eq!(arr[ .. 3], [0, 1, 2      ]);
assert_eq!(arr[ ..=3], [0, 1, 2, 3   ]);
assert_eq!(arr[1..  ], [   1, 2, 3, 4]);
assert_eq!(arr[1.. 3], [   1, 2      ]);
assert_eq!(arr[1..=3], [   1, 2, 3   ]); // 这是 `RangeInclusive`
```



## Implementations

### impl\<Idx> RangeInclusive\<Idx>

#### new

创建一个新的包含范围。等同于编写 `start..=end`。

```rust
pub const fn new(start: Idx, end: Idx) -> RangeInclusive<Idx> 
```

**参数**：

- **start**：起始边界
- **end**：结尾边界

**返回值**：返回一个`RangeInclusive`实例

```rust
use std::ops::RangeInclusive;

assert_eq!(3..=5, RangeInclusive::new(3, 5));
```



#### start

获取范围的下限 (包括下限)。

```rust
pub const fn start(&self) -> &Idx
```

**返回值**：返回范围的下限

```rust
assert_eq!((3..=5).start(), &3);
```

当使用包含范围进行迭代时，在迭代结束后未指定 `start()` 和 `end()` 的值。 若要确定包含范围是否为空，请使用 `is_empty()` 方法而不是比较 `start() > end()`。

:::tip 

Note: 范围迭代到穷竭之后，此方法返回的值是不确定的。

:::



#### end

返回范围的上限 (包括上限)。

```rust
pub const fn end(&self) -> &Idx
```

**返回值**：返回范围的上线

```rust
assert_eq!((3..=5).end(), &5);
```

当使用包含范围进行迭代时，在迭代结束后未指定 `start()` 和 `end()` 的值。 若要确定包含范围是否为空，请使用 `is_empty()` 方法而不是比较 `start() > end()`。

:::tip

Note: 范围迭代到穷竭之后，此方法返回的值是不确定的。

:::





#### into_inner

将 RangeInclusive 分解为 (下限，上限 (含上限))。

```rust
pub fn into_inner(self) -> (Idx, Idx)
```

**返回值**：返回一个元祖，第一个元素为下限，第二个为上线

```rust
assert_eq!((3..=5).into_inner(), (3, 5));
```

:::tip

Note: 范围迭代到穷竭之后，此方法返回的值是不确定的。

:::



### impl\<Idx> RangeInclusive\<Idx>

```rust
impl<Idx> RangeInclusive<Idx>
where
  Idx: PartialOrd<Idx>,
```



#### contains

如果范围中包含 `item`，则返回 `true`。

```rust
pub fn contains<U>(&self, item: &U) -> bool
where
    Idx: PartialOrd<U>,
    U: PartialOrd<Idx> + ?Sized,
```

**参数**：

- **item**：需要判断是否包含的项

**返回值**：根据是否包含返回`bool`值

```rust
assert!(!(3..=5).contains(&2));
assert!( (3..=5).contains(&3));
assert!( (3..=5).contains(&4));
assert!( (3..=5).contains(&5));
assert!(!(3..=5).contains(&6));

assert!( (3..=3).contains(&3));
assert!(!(3..=2).contains(&3));

assert!( (0.0..=1.0).contains(&1.0));
assert!(!(0.0..=1.0).contains(&f32::NAN));
assert!(!(0.0..=f32::NAN).contains(&0.0));
assert!(!(f32::NAN..=1.0).contains(&1.0));
```

迭代完成后，此方法总是返回 `false`：

```rust
let mut r = 3..=5;
assert!(r.contains(&3) && r.contains(&5));
for _ in r.by_ref() {}
// 此处未指定精确的字段值
assert!(!r.contains(&3) && !r.contains(&5));
```



#### is_empty

如果范围不包含任何项，则返回 `true`。

```rust
pub fn is_empty(&self) -> bool
```

**返回值**：根据是否为空，返回`bool`值

```rust
assert!(!(3..=5).is_empty());
assert!(!(3..=3).is_empty());
assert!( (3..=2).is_empty());
```

如果任何一方都无法比拟，则范围为空：

```rust
assert!(!(3..=5).is_empty());
assert!(!(3..=3).is_empty());
assert!( (3..=2).is_empty());
```

迭代完成后，此方法返回 `true`：

```rust
let mut r = 3..=5;
for _ in r.by_ref() {}
// 此处未指定精确的字段值
assert!(r.is_empty());
```





## Trait Implementations

### impl\<Idx> Clone for RangeInclusive\<Idx>

```rust
impl<Idx> Clone for RangeInclusive<Idx>
where
    Idx: Clone,
```



#### clone

返回值的副本。 

```rust
fn clone(&self) -> RangeInclusive<Idx> 
```



#### clone_from

从 `source`执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### impl\<Idx> Debug for RangeInclusive\<Idx>

```rust
impl<Idx> Debug for RangeInclusive<Idx>
where
    Idx: Debug,
```

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, fmt: &mut Formatter<'_>) -> Result<(), Error>
```



### impl\<A> DoubleEndedIterator for RangeInclusive\<A>

```rust
impl<A> DoubleEndedIterator for RangeInclusive<A>
where
    A: Step,
```



#### next_back

从迭代器的末尾删除并返回一个元素。 

```rust
fn next_back(&mut self) -> Option<A>
```



#### nth_back

从迭代器的末尾返回第 n 个元素。 

```rust
fn nth_back(&mut self, n: usize) -> Option<A>
```



#### advance_back_by

`nightly-only`
通过 n 元素从后向前推进迭代器。 

```rust
fn advance_back_by(&mut self, n: usize) -> Result<(), NonZeroUsize>
```



#### try_rfold

这是 `Iterator::try_fold()` 的反向版本：它从迭代器的后面开始接收元素。 

```rust
fn try_rfold<B, F, R>(&mut self, init: B, f: F) -> R
where
    Self: Sized,
    F: FnMut(B, Self::Item) -> R,
    R: Try<Output = B>,
```



#### rfold

一种迭代器方法，从后面开始，将迭代器的元素减少为单个最终值。 

```rust
fn rfold<B, F>(self, init: B, f: F) -> B
where
    Self: Sized,
    F: FnMut(B, Self::Item) -> B,
```



#### rfind

从后面搜索满足谓词的迭代器的元素。 

```rust
fn rfind<P>(&mut self, predicate: P) -> Option<Self::Item>
where
    Self: Sized,
    P: FnMut(&Self::Item) -> bool,
```



### impl ExactSizeIterator for RangeInclusive\<i16>

#### len

返回迭代器的确切剩余长度。 

```rust
fn len(&self) -> usize
```



#### is_empty

`nightly-only`

如果迭代器为空，则返回 true。 



### impl ExactSizeIterator for RangeInclusive\<i8>

#### len

返回迭代器的确切剩余长度。 

```rust
fn len(&self) -> usize
```



#### is_empty

`nightly-only`

如果迭代器为空，则返回 true。 

```rust
fn is_empty(&self) -> bool
```



### impl ExactSizeIterator for RangeInclusive\<u16>

#### len

返回迭代器的确切剩余长度。 

```rust
fn len(&self) -> usize
```



#### is_empty

`nightly-only`

如果迭代器为空，则返回 true。 

```rust
fn is_empty(&self) -> bool
```



### impl ExactSizeIterator for RangeInclusive\<u8>

#### len

返回迭代器的确切剩余长度。 

```rust
fn len(&self) -> usize
```



#### is_empty

`nightly-only`

如果迭代器为空，则返回 true。 

```rust
fn is_empty(&self) -> bool
```




### impl\<Idx> Hash for RangeInclusive\<Idx>

```rust
impl<Idx> Hash for RangeInclusive<Idx>
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



### impl Index<RangeInclusive\<usize>> for String

#### Output 


索引后返回的类型。

```rust
type Output = str
```



#### index

执行索引 `container[index]` 操作。 

```rust
fn index(&self, index: RangeInclusive<usize>) -> &str
```





### impl IndexMut<RangeInclusive\<usize>> for String

#### index_mut

执行可变索引 (container[index]) 操作。 

```rust
fn index_mut(&mut self, index: RangeInclusive<usize>) -> &mut str
```





### impl\<A> Iterator for RangeInclusive\<A>

```rust
impl<A> Iterator for RangeInclusive<A>
where
    A: Step,
```



#### Item

被迭代的元素的类型。

```rust
type Item = A
```



#### next

推进迭代器并返回下一个值。 

```rust
fn next(&mut self) -> Option<A>
```



#### size_hint

返回迭代器剩余长度的界限。 

```rust
fn size_hint(&self) -> (usize, Option<usize>)
```



#### nth

返回迭代器的第 n 个元素。 

```rust
fn nth(&mut self, n: usize) -> Option<A>
```



#### last

消耗迭代器，返回最后一个元素。 

```rust
fn last(self) -> Option<A>
```



#### min

返回迭代器的最小元素。 

```rust
fn min(self) -> Option<A>
where
    A: Ord,
```



#### max

返回迭代器的最大元素。 

```rust
fn max(self) -> Option<A>
where
    A: Ord,
```



#### is_sorted

`nightly-only`
检查此迭代器的元素是否已排序。 

```rust
fn is_sorted(self) -> bool
```



#### advance_by

`nightly-only`
通过 n 元素使迭代器前进。 

```rust
fn advance_by(&mut self, n: usize) -> Result<(), NonZeroUsize>
```



#### next_chunk

`nightly-only`
推进迭代器并返回包含下一个 N 值的数组。

```rust 
fn next_chunk<const N: usize>(
    &mut self
) -> Result<[Self::Item; N], IntoIter<Self::Item, N>>
where
    Self: Sized,
```



#### count

消耗迭代器，计算迭代次数并返回它。

 ```rust
fn count(self) -> usize
where
    Self: Sized,
 ```



#### step_by

创建一个从同一点开始的迭代器，但在每次迭代时以给定的数量逐步执行。 

```rust
fn step_by(self, step: usize) -> StepBy<Self> 
where
    Self: Sized,
```



#### chain

接受两个迭代器，并依次在两个迭代器上创建一个新的迭代器。

 ```rust
fn chain<U>(self, other: U) -> Chain<Self, <U as IntoIterator>::IntoIter> 
where
    Self: Sized,
    U: IntoIterator<Item = Self::Item>,
 ```



#### zip

将两个迭代器压缩为成对的单个迭代器。 

```rust
fn zip<U>(self, other: U) -> Zip<Self, <U as IntoIterator>::IntoIter> 
where
    Self: Sized,
    U: IntoIterator,
```



#### intersperse_with

`nightly-only`
创建一个新的迭代器，该迭代器将 separator 生成的项放在原始迭代器的相邻项之间。 

```rust
fn intersperse_with<G>(self, separator: G) -> IntersperseWith<Self, G> 
where
    Self: Sized,
    G: FnMut() -> Self::Item,
```



#### map

获取一个闭包并创建一个迭代器，该迭代器在每个元素上调用该闭包。

```rust 
fn map<B, F>(self, f: F) -> Map<Self, F> 
where
    Self: Sized,
    F: FnMut(Self::Item) -> B,
```



#### for_each

在迭代器的每个元素上调用一个闭包。 

```rust
fn for_each<F>(self, f: F)
where
    Self: Sized,
    F: FnMut(Self::Item),
```



#### filter

创建一个迭代器，该迭代器使用闭包确定是否应产生元素。 

```rust
fn filter<P>(self, predicate: P) -> Filter<Self, P> 
where
    Self: Sized,
    P: FnMut(&Self::Item) -> bool,
```



#### filter_map

创建一个同时过滤和映射的迭代器。 

```rust
fn filter_map<B, F>(self, f: F) -> FilterMap<Self, F> 
where
    Self: Sized,
    F: FnMut(Self::Item) -> Option<B>,
```



#### enumerate

创建一个迭代器，该迭代器给出当前迭代次数以及下一个值。 

```rust
fn enumerate(self) -> Enumerate<Self> 
where
    Self: Sized,
```



#### peekable

创建一个迭代器，它可以使用 peek 和 peek_mut 方法查看迭代器的下一个元素而不消耗它。有关更多信息，请参见他们的文档。 

```rust
fn peekable(self) -> Peekable<Self> 
where
    Self: Sized,
```



#### skip_while

创建一个迭代器，该迭代器基于谓词 skip 元素。 

```rust
fn skip_while<P>(self, predicate: P) -> SkipWhile<Self, P> 
where
    Self: Sized,
    P: FnMut(&Self::Item) -> bool,
```



#### take_while

创建一个迭代器，该迭代器根据谓词产生元素。 

```rust
fn take_while<P>(self, predicate: P) -> TakeWhile<Self, P> 
where
    Self: Sized,
    P: FnMut(&Self::Item) -> bool,
```



#### map_while

创建一个迭代器，该迭代器均基于谓词和映射生成元素。 

```rust
fn map_while<B, P>(self, predicate: P) -> MapWhile<Self, P> 
where
    Self: Sized,
    P: FnMut(Self::Item) -> Option<B>,
```



#### skip

创建一个跳过前 n 个元素的迭代器。 

```rust
fn skip(self, n: usize) -> Skip<Self> 
where
    Self: Sized,
```



#### take

创建一个迭代器，它产生第一个 n 元素，如果底层迭代器提前结束，则产生更少的元素。 

```rust
fn take(self, n: usize) -> Take<Self> 
where
    Self: Sized,
```



#### scan

一个迭代器适配器，它与 fold 一样保存内部状态，但与 fold 不同，它生成一个新的迭代器。 

```rust
fn scan<St, B, F>(self, initial_state: St, f: F) -> Scan<Self, St, F> 
where
    Self: Sized,
    F: FnMut(&mut St, Self::Item) -> Option<B>,
```



#### flat_map

创建一个迭代器，其工作方式类似于 map，但它会将嵌套的结构展平。 

```rust
fn flat_map<U, F>(self, f: F) -> FlatMap<Self, U, F> 
where
    Self: Sized,
    U: IntoIterator,
    F: FnMut(Self::Item) -> U,
```



#### fuse

创建一个迭代器，该迭代器在第一个 None 之后结束。 

```rust
fn fuse(self) -> Fuse<Self> 
where
    Self: Sized,
```



#### inspect

对迭代器的每个元素执行某些操作，将值传递给它。 

```rust
fn inspect<F>(self, f: F) -> Inspect<Self, F> 
where
    Self: Sized,
    F: FnMut(&Self::Item),
```



#### by_ref

借用一个迭代器，而不是使用它。 

```rust
fn by_ref(&mut self) -> &mut Self
where
    Self: Sized,
```



#### collect

将迭代器转换为集合。 

```rust
fn collect<B>(self) -> B
where
    B: FromIterator<Self::Item>,
    Self: Sized,
```



#### collect_into

`nightly-only`
将迭代器中的所有项收集到一个集合中。 

```rust
fn collect_into<E>(self, collection: &mut E) -> &mut E
where
    E: Extend<Self::Item>,
    Self: Sized,
```



#### partition

消耗一个迭代器，从中创建两个集合。 

```rust
fn partition<B, F>(self, f: F) -> (B, B)
where
    Self: Sized,
    B: Default + Extend<Self::Item>,
    F: FnMut(&Self::Item) -> bool,
```



#### partition_in_place

`nightly-only`
根据给定的谓词，对迭代器的元素进行就地重新排序，以使所有返回 true 的元素都在所有返回 false 的元素之前。 返回找到的 true 元素的数量。 

```rust
fn partition_in_place<'a, T, P>(self, predicate: P) -> usize
where
    T: 'a,
    Self: Sized + DoubleEndedIterator<Item = &'a mut T>,
    P: FnMut(&T) -> bool,
```



#### is_partitioned

`nightly-only`
检查此迭代器的元素是否根据给定的谓词进行了分区，以便所有返回 true 的元素都在所有返回 false 的元素之前。 

```rust
fn is_partitioned<P>(self, predicate: P) -> bool
where
    Self: Sized,
    P: FnMut(Self::Item) -> bool,
```



#### try_fold

一个迭代器方法，它只要成功返回就应用函数，并产生单个最终值。 

```rust
fn try_fold<B, F, R>(&mut self, init: B, f: F) -> R
where
    Self: Sized,
    F: FnMut(B, Self::Item) -> R,
    R: Try<Output = B>,
```



#### try_for_each

一个迭代器方法，该方法将一个容易犯错的函数应用于迭代器中的每个项，在第一个错误处停止并返回该错误。 

```rust
fn try_for_each<F, R>(&mut self, f: F) -> R
where
    Self: Sized,
    F: FnMut(Self::Item) -> R,
    R: Try<Output = ()>,
```



#### fold

通过应用操作将每个元素 fold 到一个累加器中，返回最终结果。 

```rust
fn fold<B, F>(self, init: B, f: F) -> B
where
    Self: Sized,
    F: FnMut(B, Self::Item) -> B,
```



#### reduce

通过重复应用缩减操作，将元素缩减为一个。 

```rust
fn reduce<F>(self, f: F) -> Option<Self::Item>
where
    Self: Sized,
    F: FnMut(Self::Item, Self::Item) -> Self::Item,
```



#### try_reduce

`nightly-only`
通过重复应用 Reduce 操作，将元素归约为单个元素。 如果闭包返回失败，则失败会立即传播给调用者。 

```rust
fn try_reduce<F, R>(
    &mut self,
    f: F
) -> <<R as Try>::Residual as Residual<Option<<R as Try>::Output>>>::TryType
where
    Self: Sized,
    F: FnMut(Self::Item, Self::Item) -> R,
    R: Try<Output = Self::Item>,
    <R as Try>::Residual: Residual<Option<Self::Item>>,
```



#### all

测试迭代器的每个元素是否与谓词匹配。 

```rust
fn all<F>(&mut self, f: F) -> bool
where
    Self: Sized,
    F: FnMut(Self::Item) -> bool,
```

#### any

测试迭代器的任何元素是否与谓词匹配。 

```rust
fn any<F>(&mut self, f: F) -> bool
where
    Self: Sized,
    F: FnMut(Self::Item) -> bool,
```



#### find

搜索满足谓词的迭代器的元素。 

```rust
fn find<P>(&mut self, predicate: P) -> Option<Self::Item>
where
    Self: Sized,
    P: FnMut(&Self::Item) -> bool,
```



#### find_map

将函数应用于迭代器的元素，并返回第一个非 None 的结果。 

```rust
fn find_map<B, F>(&mut self, f: F) -> Option<B>
where
    Self: Sized,
    F: FnMut(Self::Item) -> Option<B>,
```



#### try_find

`nightly-only`
将函数应用于迭代器的元素，并返回第一个为 true 的结果或第一个错误。 

```rust
fn try_find<F, R>(
    &mut self,
    f: F
) -> <<R as Try>::Residual as Residual<Option<Self::Item>>>::TryType
where
    Self: Sized,
    F: FnMut(&Self::Item) -> R,
    R: Try<Output = bool>,
    <R as Try>::Residual: Residual<Option<Self::Item>>,
```



#### position

在迭代器中搜索元素，并返回其索引。 

```rust
fn position<P>(&mut self, predicate: P) -> Option<usize>
where
    Self: Sized,
    P: FnMut(Self::Item) -> bool,
```



#### max_by_key

返回给出指定函数最大值的元素。 

```rust
fn max_by_key<B, F>(self, f: F) -> Option<Self::Item>
where
    B: Ord,
    Self: Sized,
    F: FnMut(&Self::Item) -> B,
```



#### max_by

返回给出相对于指定比较函数的最大值的元素。

```rust
fn max_by<F>(self, compare: F) -> Option<Self::Item>
where
    Self: Sized,
    F: FnMut(&Self::Item, &Self::Item) -> Ordering,
```



#### min_by_key

返回给出指定函数中最小值的元素。 

```rust
fn min_by_key<B, F>(self, f: F) -> Option<Self::Item>
where
    B: Ord,
    Self: Sized,
    F: FnMut(&Self::Item) -> B,
```



#### min_by

返回给出相对于指定比较函数的最小值的元素。

```rust 
fn min_by<F>(self, compare: F) -> Option<Self::Item>
where
    Self: Sized,
    F: FnMut(&Self::Item, &Self::Item) -> Ordering,
```



#### rev

反转迭代器的方向。 

```rust
fn rev(self) -> Rev<Self> 
where
    Self: Sized + DoubleEndedIterator,
```



#### unzip

将成对的迭代器转换为一对容器。 

```rust
fn unzip<A, B, FromA, FromB>(self) -> (FromA, FromB)

where
    FromA: Default + Extend<A>,
    FromB: Default + Extend<B>,
    Self: Sized + Iterator<Item = (A, B)>,
```



#### copied

创建一个迭代器，该迭代器将复制其所有元素。

```rust 
fn copied<'a, T>(self) -> Copied<Self> 
where
    T: 'a + Copy,
    Self: Sized + Iterator<Item = &'a T>,
```



#### cloned

创建一个迭代器，该迭代器将克隆所有元素。 

```rust
fn cloned<'a, T>(self) -> Cloned<Self> 
where
    T: 'a + Clone,
    Self: Sized + Iterator<Item = &'a T>,
```



#### cycle

不断重复的迭代器。 

```rust
fn cycle(self) -> Cycle<Self> 
where
    Self: Sized + Clone,
```



#### array_chunks

`nightly-only`
一次返回迭代器的 N 个元素的迭代器。 

```rust
fn array_chunks<const N: usize>(self) -> ArrayChunks<Self, N> 
where
    Self: Sized,
```



#### sum

对迭代器的元素求和。 

```rust
fn sum<S>(self) -> S
where
    Self: Sized,
    S: Sum<Self::Item>,
```



#### product

遍历整个迭代器，将所有元素相乘 

```rust
fn product<P>(self) -> P
where
    Self: Sized,
    P: Product<Self::Item>,
```



#### cmp_by

`nightly-only`
字典顺序 根据指定的比较函数将这个 Iterator 的元素与另一个 Iterator 的元素进行比较。 

```rust
fn cmp_by<I, F>(self, other: I, cmp: F) -> Ordering
where
    Self: Sized,
    I: IntoIterator,
    F: FnMut(Self::Item, <I as IntoIterator>::Item) -> Ordering,
```



#### partial_cmp

Lexicographically 将此 Iterator 的 PartialOrd 元素与另一个 PartialOrd 的元素进行比较。 比较的工作方式类似于短路评估，返回结果而不比较其余元素。 一旦可以确定订单，评估就会停止并返回结果。 

```rust
fn partial_cmp<I>(self, other: I) -> Option<Ordering>
where
    I: IntoIterator,
    Self::Item: PartialOrd<<I as IntoIterator>::Item>,
    Self: Sized,
```



#### partial_cmp_by

`nightly-only`
字典顺序 根据指定的比较函数将这个 Iterator 的元素与另一个 Iterator 的元素进行比较。 

```rust
fn partial_cmp_by<I, F>(self, other: I, partial_cmp: F) -> Option<Ordering>
where
    Self: Sized,
    I: IntoIterator,
    F: FnMut(Self::Item, <I as IntoIterator>::Item) -> Option<Ordering>,
```



#### eq

确定此 Iterator 的元素是否与另一个元素相同。 

```rust
fn eq<I>(self, other: I) -> bool
where
    I: IntoIterator,
    Self::Item: PartialEq<<I as IntoIterator>::Item>,
    Self: Sized,
```



#### eq_by

`nightly-only`
关于指定的相等函数，确定 Iterator 的元素是否与另一个元素相等。 

```rust
fn eq_by<I, F>(self, other: I, eq: F) -> bool
where
    Self: Sized,
    I: IntoIterator,
    F: FnMut(Self::Item, <I as IntoIterator>::Item) -> bool,
```



#### ne

确定此 Iterator 的元素是否不等于另一个的元素。 

```rust
fn ne<I>(self, other: I) -> bool
where
    I: IntoIterator,
    Self::Item: PartialEq<<I as IntoIterator>::Item>,
    Self: Sized,
```



#### lt

确定此 Iterator 的元素是否比另一个元素少 按字典顺序。 

```rust
fn lt<I>(self, other: I) -> bool
where
    I: IntoIterator,
    Self::Item: PartialOrd<<I as IntoIterator>::Item>,
    Self: Sized,
```



#### le

确定此 Iterator 的元素是否 按字典顺序 小于或等于另一个元素。 

```rust
fn le<I>(self, other: I) -> bool
where
    I: IntoIterator,
    Self::Item: PartialOrd<<I as IntoIterator>::Item>,
    Self: Sized,
```



#### gt

确定此 Iterator 的元素是否大于另一个元素的 按字典顺序。 

```rust
fn gt<I>(self, other: I) -> bool
where
    I: IntoIterator,
    Self::Item: PartialOrd<<I as IntoIterator>::Item>,
    Self: Sized,
```



#### ge

确定此 Iterator 的元素是否 按字典顺序 大于或等于另一个元素。 

```rust
fn ge<I>(self, other: I) -> bool
where
    I: IntoIterator,
    Self::Item: PartialOrd<<I as IntoIterator>::Item>,
    Self: Sized,
```



#### is_sorted_by

`nightly-only`
检查此迭代器的元素是否使用给定的比较器函数进行排序。 

```rust
fn is_sorted_by<F>(self, compare: F) -> bool
where
    Self: Sized,
    F: FnMut(&Self::Item, &Self::Item) -> Option<Ordering>,
```



#### is_sorted_by_key

`nightly-only`
检查此迭代器的元素是否使用给定的键提取函数进行排序。 

```rust
fn is_sorted_by_key<F, K>(self, f: F) -> bool
where
    Self: Sized,
    F: FnMut(Self::Item) -> K,
    K: PartialOrd<K>,
```



### impl\<Idx> PartialEq<RangeInclusive\<Idx>> for RangeInclusive\<Idx>

```rust
impl<Idx> PartialEq<RangeInclusive<Idx>> for RangeInclusive<Idx>
where
    Idx: PartialEq<Idx>,
```



#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &RangeInclusive<Idx>) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### impl\<T> RangeBounds\<T> for RangeInclusive<&T>

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



### impl\<T> RangeBounds\<T> for RangeInclusive\<T>

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

`nightly-only`

如果范围中包含 item，则返回 true。 

```rust 
fn contains<U>(&self, item: &U) -> bool
where
    T: PartialOrd<U>,
    U: PartialOrd<T> + ?Sized,
```



### impl\<T> SliceIndex<[T]> for RangeInclusive\<usize>

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



### impl SliceIndex\<str> for RangeInclusive\<usize>

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
fn get(self, slice: &str) -> Option<&<RangeInclusive<usize> as SliceIndex<str>>::Output>
```



#### get_mut

`nightly-only`
如果在边界内，则对此位置的输出返回一个可变引用。

```rust
fn get_mut(
    self,
    slice: &mut str
) -> Option<&mut <RangeInclusive<usize> as SliceIndex<str>>::Output>
```

#### get_unchecked

`nightly-only`
返回此位置输出的共享引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked(
    self,
    slice: *const str
) -> *const <RangeInclusive<usize> as SliceIndex<str>>::Output
```

#### get_unchecked_mut

`nightly-only`
返回此位置输出的变量引用，而不执行任何边界检查。 即使未使用所得的引用，使用越界索引或悬垂的 slice 指针调用此方法也是 [undefined 行为]。

```rust
unsafe fn get_unchecked_mut(
    self,
    slice: *mut str
) -> *mut <RangeInclusive<usize> as SliceIndex<str>>::Output
```



#### index

`nightly-only`
返回此位置输出的共享引用，如果越界则会触发 panic。

```rust
fn index(self, slice: &str) -> &<RangeInclusive<usize> as SliceIndex<str>>::Output 
```




#### index_mut

`nightly-only`
返回此位置输出的变量引用，如果越界则会触发 panic。

```rust
fn index_mut(
    self,
    slice: &mut str
) -> &mut <RangeInclusive<usize> as SliceIndex<str>>::Output 
```



### impl\<Idx> Eq for RangeInclusive\<Idx>

```rust
impl<Idx> Eq for RangeInclusive<Idx>
where
  Idx: Eq,
```



### impl\<A> FusedIterator for RangeInclusive\<A>

```rust
impl<A> FusedIterator for RangeInclusive<A>
where
  A: Step,
```



### impl\<Idx> StructuralEq for RangeInclusive\<Idx>



### impl\<Idx> StructuralPartialEq for RangeInclusive\<Idx>



### impl\<A> TrustedLen for RangeInclusive\<A>

```rust
impl<A> TrustedLen for RangeInclusive<A>
where
  A: TrustedStep,
```



## Auto Trait Implementations



### impl\<Idx> RefUnwindSafe for RangeInclusive\<Idx>

```rust
impl<Idx> RefUnwindSafe for RangeInclusive<Idx>
where
    Idx: RefUnwindSafe,
```



### impl\<Idx> Send for RangeInclusive\<Idx>

```rust
impl<Idx> Send for RangeInclusive<Idx>
where
    Idx: Send,
```



### impl\<Idx> Sync for RangeInclusive\<Idx>

```rust
impl<Idx> Sync for RangeInclusive<Idx>
where
    Idx: Sync,
```



### impl\<Idx> Unpin for RangeInclusive\<Idx>

```rust
impl<Idx> Unpin for RangeInclusive<Idx>
where
    Idx: Unpin,
```



### impl\<Idx> UnwindSafe for RangeInclusive\<Idx>

```rust
impl<Idx> UnwindSafe for RangeInclusive<Idx>
where
    Idx: UnwindSafe,
```



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



### impl\<I> IntoIterator for I

```rust
impl<I> IntoIterator for I
where
    I: Iterator,
```



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