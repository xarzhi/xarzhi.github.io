# Trait std::iter::Iterator

```rust
pub trait Iterator {
    type Item;

    // Required method
    fn next(&mut self) -> Option<Self::Item>;

    // Provided methods  下方详细列出
}
```





## 关联类型

### Item

被迭代的元素的类型。

```rust
type Item;
```





## Required method

### next

获取下一个迭代项

```rust
fn next(&mut self) -> Option<Self::Item>
```

返回值：返回一个`Option`，包含下一个迭代项的值，若没有剩余的迭代元素，则返回`None`

```rust
fn main() {
    let arr = [1, 2, 3, 4, 5];
    let mut a_iter = arr.iter();

    println!("{:?}", a_iter.next()); // Some(1)
    println!("{:?}", a_iter.next()); // Some(2)
    println!("{:?}", a_iter.next()); // Some(3)
    println!("{:?}", a_iter.next()); // Some(4)
    println!("{:?}", a_iter.next()); // Some(5)
    println!("{:?}", a_iter.next()); // None
}
```

:::tip

各个迭代器的实现可能选择恢复迭代，因此再次调用 `next()` 可能会或可能不会最终在某个时候开始再次返回 `Some(Item)`。

:::





## Provided Methods

### next_chunk

`nightly-only`

根据传入的N，推进迭代器，将后面N个元素放进一个数组并返回

```rust
fn next_chunk<const N: usize>(
    &mut self
) -> Result<[Self::Item; N], IntoIter<Self::Item, N>>
where
    Self: Sized,
```

**泛型参数**：

- **N**：chunk块的大小

**返回值**：返回一个Result，若迭代成功，返回包含N个元素的数组

```rust
#![feature(iter_next_chunk)]

let mut iter = "lorem".chars();

assert_eq!(iter.next_chunk().unwrap(), ['l', 'o']);              // N 被推断为 2
assert_eq!(iter.next_chunk().unwrap(), ['r', 'e', 'm']);         // N 被推断为 3
assert_eq!(iter.next_chunk::<4>().unwrap_err().as_slice(), &[]); // N 显式为 4
```

拆分一个字符串并获取前三个项。

```rust
#![feature(iter_next_chunk)]

let quote = "not all those who wander are lost";
let [first, second, third] = quote.split_whitespace().next_chunk().unwrap();
assert_eq!(first, "not");
assert_eq!(second, "all");
assert_eq!(third, "those");
```



### size_hint

返回迭代器剩余长度的界限。

具体来说，`size_hint()` 返回一个元组，其中第一个元素是下界，第二个元素是上界。

返回的元组的后半部分是 `Option<usize>`。 这里的 `None` 表示没有已知的上限，或者该上限大于 `usize`。

```rust
fn size_hint(&self) -> (usize, Option<usize>)
```

**返回值**：返回一个元组

- 第一个值：**最少**还会有多少个元素（下界）
- 第二个值：**最多**可能会有多少个元素（上界）

```rust
let a = [1, 2, 3];
let mut iter = a.iter();

assert_eq!((3, Some(3)), iter.size_hint());
let _ = iter.next();
assert_eq!((2, Some(2)), iter.size_hint());
```

一个更复杂的示例：

```rust
// 介于 0 到 9 之间的偶数。
let iter = (0..10).filter(|x| x % 2 == 0);

// 我们可以从零迭代到十次。
// 不执行 filter() 就不可能知道它是 5。
assert_eq!((0, Some(10)), iter.size_hint());

// 让我们用 chain() 再添加五个数字
let iter = (0..10).filter(|x| x % 2 == 0).chain(15..20);

// 现在两个界限都增加了五个
assert_eq!((5, Some(15)), iter.size_hint());
```

返回 `None` 作为上限：

```rust
// 无限迭代器没有上限，最大可能下限
let iter = 0..;

assert_eq!((usize::MAX, None), iter.size_hint());
```

:::tip

没有强制要求迭代器实现产生声明数量的元素。buggy 迭代器的结果可能小于元素的下限，也可能大于元素的上限。

`size_hint()` 主要用于优化，例如为迭代器的元素保留空间，但不能被信任，例如省略不安全代码中的边界检查。 size_hint() 的不正确实现不应导致违反内存安全性。

也就是说，该实现应提供正确的估计，因为否则将违反 trait 的协议。

默认实现返回 `(0, None)` 这对于任何迭代器都是正确的。

:::





### count

消耗迭代器，计算还可以迭代的次数并返回它。也就是获取迭代器还剩余多少元素

此方法将反复调用 `next`，直到遇到 `None`，并返回它看到 `Some` 的次数。 请注意，即使迭代器没有任何元素，也必须至少调用一次 `next`。

 ```rust
fn count(self) -> usize
where
    Self: Sized,
 ```

返回值：还可以迭代的次数

```rust
fn main() {
    let a = [1, 2, 3];
    let mut a_iter = a.iter();

    a_iter.next();
    println!("{:#?}", a_iter.count()); // 2   还剩两个元素
}
```

:::tip 溢出行为

该方法无法防止溢出，因此对具有超过 usize::MAX 个元素的迭代器的元素进行计数会产生错误的结果或 panics。

如果启用了调试断言，则将保证 panic。

:::



:::tip Panics

如果迭代器具有多个 usize::MAX 元素，则此函数可能为 panic。

:::



### last

消耗迭代器，返回最后一个元素。

此方法将评估迭代器，直到返回 `None`。 这样做时，它会跟踪当前元素。 返回 `None` 之后，`last()` 将返回它看到的最后一个元素。

```rust
fn last(self) -> Option<Self::Item>
where
    Self: Sized,
```

**返回值**：返回最后一个元素

```rust
fn main() {
    let a = [1, 2, 3];
    let a_iter = a.iter();

    println!("{:?}", a_iter.last()); // Some(3)
}
```





### advance_by

`nightly-only`

根据传入的参数n，直接将迭代器向前推进n个元素（跳过n个元素）

该方法将通过最多 `n` 次调用 `next`来急切地跳过 `n` 元素，直到遇到 `None`。

```rust
fn advance_by(&mut self, n: usize) -> Result<(), NonZeroUsize>
```

**参数**：

- **n**：指定要跳过元素的数量

**返回值**：

- 如果迭代器成功前进了 `n` 个元素，`advance_by(n)` 将返回 `Ok(())`，
- 如果遇到 `None`，则返回值为 `k` 的 `Err(NonZeroUsize)`，其中 `k` 是由于迭代器用完而无法前进的剩余步数。
- 如果 `self` 为空且 `n` 非零，则返回 `Err(n)`。 否则，`k` 总是小于 `n`。



### nth

从当前迭代项开始，**返回迭代器的第 n 个元素。**并且消耗迭代器中先前的元素

像大多数索引操作一样，**计数从零开始**，因此 `nth(0)` 返回第一个值，`nth(1)` 返回第二个值，依此类推。

```rust
fn nth(&mut self, n: usize) -> Option<Self::Item>
```

**参数**：

- **n**：指定获取元素的索引

**返回值**：返回根据索引获取的元素，如果 `n` 大于或等于迭代器的长度，则 `nth()` 将返回 `None`。

```rust
fn main() {
    let a = [1, 2, 3, 4];
    let mut a_iter = a.iter();

    println!("{:?}", a_iter.nth(2)); // Some(3)
}
```

`nth`并不是每次都从迭代器的第一个元素开始往后数，而是**以当前迭代项的位置为0往后开始数**

```rust
fn main() {
    let a = [1, 2, 3, 4];
    let mut a_iter = a.iter();

    a_iter.next();   // 第一个元素已被消耗
	// 下次调用nth就会从第二个元素开始数，此时nth(0)会获取第二个元素，也就是2
    println!("{:?}", a_iter.nth(2)); // Some(4)
}
```

**所有先前的元素以及返回的元素都将从迭代器中消耗**。 这意味着前面的元素将被丢弃，并且在同一迭代器上多次调用 `nth(0)` 将返回不同的元素。

```rust
fn main() {
    let a = [1, 2, 3, 4];
    let mut a_iter = a.iter();

    println!("{:?}", a_iter.nth(0)); // Some(1)
    println!("{:?}", a_iter.nth(0)); // Some(2)
    println!("{:?}", a_iter.nth(0)); // Some(3)
    println!("{:?}", a_iter.nth(0)); // Some(4)
    println!("{:?}", a_iter.nth(0)); // None
}
```

```rust
fn main() {
    let a = [1, 2, 3, 4];
    let mut a_iter = a.iter();

    println!("{:?}", a_iter.nth(2)); // Some(3)
	
    // nth已经消耗了前面2个元素了，所以再调用next，获取的就是索引为3的元素
    println!("{:?}", a_iter.next()); // Some(4)
}
```

若元素不足，则返回`None`

```rust
fn main() {
    let a = [1, 2, 3, 4];
    let mut a_iter = a.iter();

    println!("{:?}", a_iter.nth(5)); // None
}
```





### step_by

把每`step`个元素中，第一个元素放进一个`StepBy`迭代器

```rust
fn step_by(self, step: usize) -> StepBy<Self> ⓘ
where
    Self: Sized,
```

 **参数**：

- **step**：指定每次的步长，也可以说是相隔的元素数

**返回值**：返回一个`StepBy`迭代器，包含每次移动的第一个元素

```rust
fn main() {
    let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let a_iter = a.iter();

    for first in a_iter.step_by(2) {
        println!("{:?}", first);
    }

    /*
       1
       3
       5
       7
       9
    */
}
```

:::tip

如果给定step为 `0`，则该方法将为 panic。

:::



### chain

将两个迭代器组合成一个新的迭代器

`chain()` 将返回一个新的迭代器，它首先迭代第一个迭代器的值，然后迭代第二个迭代器的值。

换句话说，它将两个迭代器链接在一起。🔗

```rust
fn chain<U>(self, other: U) -> Chain<Self, <U as IntoIterator>::IntoIter> 
where 
	Self: Sized,
    U: IntoIterator<Item = Self::Item>
```

 **参数**：

- **other**：需要合并的另一个迭代器

**返回值**：返回一个`Chain`迭代器

```rust
fn main() {
    let a1 = [1, 2, 3];
    let a2 = [4, 5, 6];

    let mut iter = a1.iter().chain(a2.iter());

    println!("{:?}", iter); // Chain { a: Some(Iter([1, 2, 3])), b: Some(Iter([4, 5, 6])) }

    println!("{:?}", iter.next()); // Some(1)
    println!("{:?}", iter.next()); // Some(2)
    println!("{:?}", iter.next()); // Some(3)
    println!("{:?}", iter.next()); // Some(4)
    println!("{:?}", iter.next()); // Some(5)
    println!("{:?}", iter.next()); // Some(6)
    println!("{:?}", iter.next()); // None
}
```

由于 `chain()` 的参数使用 `IntoIterator`，因此我们可以传递可以转换为 `Iterator` 的所有内容，而不仅仅是 `Iterator` 本身。 例如，切片 (`&[T`]) 实现 `IntoIterator`，因此可以直接传递给 `chain()`：

```rust
let s1 = &[1, 2, 3];
let s2 = &[4, 5, 6];

let mut iter = s1.iter().chain(s2);

assert_eq!(iter.next(), Some(&1));
assert_eq!(iter.next(), Some(&2));
assert_eq!(iter.next(), Some(&3));
assert_eq!(iter.next(), Some(&4));
assert_eq!(iter.next(), Some(&5));
assert_eq!(iter.next(), Some(&6));
assert_eq!(iter.next(), None);
```





### zip

将两个迭代器相同索引的元素组合成一个元组，最后组合成一个迭代器

```rust
fn zip<U>(self, other: U) -> Zip<Self, <U as IntoIterator>::IntoIter> 
where
    Self: Sized,
    U: IntoIterator,
```

 **参数**：

- **other**：需要合并的另一个迭代器

**返回值**：返回一个`Zip`迭代器

```rust
fn main() {
    let a1 = [1, 2, 3];
    let a2 = [4, 5, 6];

    let mut iter = a1.iter().zip(a2.iter());

    println!("{:?}", iter.next()); // Some((1, 4))
    println!("{:?}", iter.next()); // Some((2, 5))
    println!("{:?}", iter.next()); // Some((3, 6))
    println!("{:?}", iter.next()); // None
}
```

如果两个迭代器长度不同， 以「短的」为准，长的多余部分直接被丢弃

```rust
fn main() {
    let a1 = [1, 2, 3, 3, 3];
    let a2 = [4, 5, 6];

    let mut iter = a1.iter().zip(a2.iter());

    println!("{:?}", iter.next()); // Some((1, 4))
    println!("{:?}", iter.next()); // Some((2, 5))
    println!("{:?}", iter.next()); // Some((3, 6))
    println!("{:?}", iter.next()); // None
    println!("{:?}", iter.next()); // None
}

```

由于 `zip()` 的参数使用 `IntoIterator`，因此我们可以传递可以转换为 `Iterator` 的所有内容，而不仅仅是 `Iterator` 本身。 例如，切片 (`&[T]`) 实现 `IntoIterator`，因此可以直接传递给 `zip()`：

```rust
let s1 = &[1, 2, 3];
let s2 = &[4, 5, 6];

let mut iter = s1.iter().zip(s2);

assert_eq!(iter.next(), Some((&1, &4)));
assert_eq!(iter.next(), Some((&2, &5)));
assert_eq!(iter.next(), Some((&3, &6)));
assert_eq!(iter.next(), None);
```

`zip()` 通常用于将无限迭代器压缩为有限迭代器。 这是可行的，因为有限迭代器最终将返回 `None`，从而结束拉链。使用 `(0..)` 压缩看起来很像 `enumerate`：

```rust
let enumerate: Vec<_> = "foo".chars().enumerate().collect();

let zipper: Vec<_> = (0..).zip("foo".chars()).collect();

assert_eq!((0, 'f'), enumerate[0]);
assert_eq!((0, 'f'), zipper[0]);

assert_eq!((1, 'o'), enumerate[1]);
assert_eq!((1, 'o'), zipper[1]);

assert_eq!((2, 'o'), enumerate[2]);
assert_eq!((2, 'o'), zipper[2]);
```

如果两个迭代器的语法大致相同，则使用 zip 可能更具可读性：

```rust
use std::iter::zip;

let a = [1, 2, 3];
let b = [2, 3, 4];

let mut zipped = zip(
    a.into_iter().map(|x| x * 2).skip(1),
    b.into_iter().map(|x| x * 2).skip(1),
);

assert_eq!(zipped.next(), Some((4, 6)));
assert_eq!(zipped.next(), Some((6, 8)));
assert_eq!(zipped.next(), None);
```

相比之下

```rust
let mut zipped = a
    .into_iter()
    .map(|x| x * 2)
    .skip(1)
    .zip(b.into_iter().map(|x| x * 2).skip(1));
```



### intersperse

```rust
fn intersperse(self, separator: Self::Item) -> Intersperse<Self> 
    where Self: Sized,
       Self::Item: Clone
```



### intersperse_with

```rust
fn intersperse_with<G>(self, separator: G) -> IntersperseWith<Self, G> 
    where Self: Sized,
       G: FnMut() -> Self::Item
```



### map

```rust
fn map<B, F>(self, f: F) -> Map<Self, F> 
  where Self: Sized,
    F: FnMut(Self::Item) -> B
```



### for_each

```rust
fn for_each<F>(self, f: F)
    where Self: Sized,
       F: FnMut(Self::Item)
```



### filter

```rust
fn filter<P>(self, predicate: P) -> Filter<Self, P> 
    where Self: Sized,
       P: FnMut(&Self::Item) -> bool
```



### filter_map

```rust
fn filter_map<B, F>(self, f: F) -> FilterMap<Self, F> 
    where Self: Sized,
       F: FnMut(Self::Item) -> Option<B>
```



### enumerate

```rust
fn enumerate(self) -> Enumerate<Self> 
    where Self: Sized
```



### peekable

```rust
fn peekable(self) -> Peekable<Self> 
    where Self: Sized
```



### skip_while

```rust
fn skip_while<P>(self, predicate: P) -> SkipWhile<Self, P> 
    where Self: Sized,
       P: FnMut(&Self::Item) -> bool
```



### take_while

```rust
fn take_while<P>(self, predicate: P) -> TakeWhile<Self, P> 
    where Self: Sized,
       P: FnMut(&Self::Item) -> bool
```



### map_while

```rust
fn map_while<B, P>(self, predicate: P) -> MapWhile<Self, P> 
    where Self: Sized,
       P: FnMut(Self::Item) -> Option<B>
```



### skip

```rust
fn skip(self, n: usize) -> Skip<Self> 
    where Self: Sized
```



### take

```rust
fn take(self, n: usize) -> Take<Self> 
    where Self: Sized
```



### scan

```rust
fn scan<St, B, F>(self, initial_state: St, f: F) -> Scan<Self, St, F> 
    where Self: Sized,
       F: FnMut(&mut St, Self::Item) -> Option<B>
```



### flat_map

```rust
fn flat_map<U, F>(self, f: F) -> FlatMap<Self, U, F> 
    where Self: Sized,
       U: IntoIterator,
       F: FnMut(Self::Item) -> U
```



### flatten

```rust
fn flatten(self) -> Flatten<Self> 
    where Self: Sized,
       Self::Item: IntoIterator
```



### fuse

```rust
fn fuse(self) -> Fuse<Self> 
    where Self: Sized
```



### inspect

```rust
fn inspect<F>(self, f: F) -> Inspect<Self, F> 
    where Self: Sized,
       F: FnMut(&Self::Item)
```



### by_ref

```rust
fn by_ref(&mut self) -> &mut Self
    where Self: Sized
```



### collect

```rust
fn collect<B>(self) -> B
    where B: FromIterator<Self::Item>,
       Self: Sized
```



### try_collect

```rust
fn try_collect<B>(
    &mut self
  ) -> <<Self::Item as Try>::Residual as Residual<B>>::TryType
    where Self: Sized,
       Self::Item: Try,
       <Self::Item as Try>::Residual: Residual<B>,
       B: FromIterator<<Self::Item as Try>::Output>
```



### collect_into

 ```rust
fn collect_into<E>(self, collection: &mut E) -> &mut E
    where E: Extend<Self::Item>,
       Self: Sized
 ```





### partition

```rust
fn partition<B, F>(self, f: F) -> (B, B)
    where Self: Sized,
       B: Default + Extend<Self::Item>,
       F: FnMut(&Self::Item) -> bool
```



### partition_in_place

```rust
fn partition_in_place<'a, T, P>(self, predicate: P) -> usize
    where T: 'a,
       Self: Sized + DoubleEndedIterator<Item = &'a mut T>,
       P: FnMut(&T) -> bool
```



### is_partitioned

```rust
fn is_partitioned<P>(self, predicate: P) -> bool
    where Self: Sized,
       P: FnMut(Self::Item) -> bool
```



### try_fold

```rust
fn try_fold<B, F, R>(&mut self, init: B, f: F) -> R
    where Self: Sized,
       F: FnMut(B, Self::Item) -> R,
       R: Try<Output = B>
```



### try_for_each

```rust
fn try_for_each<F, R>(&mut self, f: F) -> R
    where Self: Sized,
       F: FnMut(Self::Item) -> R,
       R: Try<Output = ()>
```



### fold

```rust
fn fold<B, F>(self, init: B, f: F) -> B
    where Self: Sized,
       F: FnMut(B, Self::Item) -> B
```



### reduce

```rust
fn reduce<F>(self, f: F) -> Option<Self::Item>
    where Self: Sized,
       F: FnMut(Self::Item, Self::Item) -> Self::Item
```



### try_reduce

```rust
fn try_reduce<F, R>(
    &mut self,
    f: F
  ) -> <<R as Try>::Residual as Residual<Option<<R as Try>::Output>>>::TryType
    where Self: Sized,
       F: FnMut(Self::Item, Self::Item) -> R,
       R: Try<Output = Self::Item>,
       <R as Try>::Residual: Residual<Option<Self::Item>>
```



### all

```rust
fn all<F>(&mut self, f: F) -> bool
    where Self: Sized,
       F: FnMut(Self::Item) -> bool
```



### any

```rust
fn any<F>(&mut self, f: F) -> bool
    where Self: Sized,
       F: FnMut(Self::Item) -> bool
```



### find

```rust
fn find<P>(&mut self, predicate: P) -> Option<Self::Item>
    where Self: Sized,
       P: FnMut(&Self::Item) -> bool
```



### find_map

```rust
fn find_map<B, F>(&mut self, f: F) -> Option<B>
    where Self: Sized,
       F: FnMut(Self::Item) -> Option<B>
```



### try_find

```rust
fn try_find<F, R>(
    &mut self,
    f: F
  ) -> <<R as Try>::Residual as Residual<Option<Self::Item>>>::TryType
    where Self: Sized,
       F: FnMut(&Self::Item) -> R,
       R: Try<Output = bool>,
       <R as Try>::Residual: Residual<Option<Self::Item>>
```



### position

```rust
fn position<P>(&mut self, predicate: P) -> Option<usize>
    where Self: Sized,
       P: FnMut(Self::Item) -> bool
```



### rposition

```rust
fn rposition<P>(&mut self, predicate: P) -> Option<usize>
    where P: FnMut(Self::Item) -> bool,
       Self: Sized + ExactSizeIterator + DoubleEndedIterator
```



### max

```rust
fn max(self) -> Option<Self::Item>
    where Self: Sized,
       Self::Item: Ord
```



### min

```rust
fn min(self) -> Option<Self::Item>
    where Self: Sized,
       Self::Item: Ord
```



### max_by_key

```rust
fn max_by_key<B, F>(self, f: F) -> Option<Self::Item>
    where B: Ord,
       Self: Sized,
       F: FnMut(&Self::Item) -> B
```



### max_by

```rust
fn max_by<F>(self, compare: F) -> Option<Self::Item>
    where Self: Sized,
       F: FnMut(&Self::Item, &Self::Item) -> Ordering
```



### min_by_key

```rust
fn min_by_key<B, F>(self, f: F) -> Option<Self::Item>
    where B: Ord,
       Self: Sized,
       F: FnMut(&Self::Item) -> B
```



### min_by

```rust
fn min_by<F>(self, compare: F) -> Option<Self::Item>
    where Self: Sized,
       F: FnMut(&Self::Item, &Self::Item) -> Ordering
```



### rev

```rust
fn rev(self) -> Rev<Self> 
    where Self: Sized + DoubleEndedIterator
```



### unzip

```rust
fn unzip<A, B, FromA, FromB>(self) -> (FromA, FromB)
    where FromA: Default + Extend<A>,
       FromB: Default + Extend<B>,
       Self: Sized + Iterator<Item = (A, B)>
```



### copied

```rust
fn copied<'a, T>(self) -> Copied<Self> 
    where T: 'a + Copy,
       Self: Sized + Iterator<Item = &'a T>
```



### cloned

```rust
fn cloned<'a, T>(self) -> Cloned<Self> 
    where T: 'a + Clone,
       Self: Sized + Iterator<Item = &'a T>
```



### cycle

 ```rust
fn cycle(self) -> Cycle<Self> 
    where Self: Sized + Clone
 ```



### array_chunks

```rust
fn array_chunks<const N: usize>(self) -> ArrayChunks<Self, N> 
    where Self: Sized
```



### sum

```rust
fn sum<S>(self) -> S
    where Self: Sized,
       S: Sum<Self::Item>
```



### product

```rust
fn product<P>(self) -> P
    where Self: Sized,
       P: Product<Self::Item>
```



### cmp

```rust
fn cmp<I>(self, other: I) -> Ordering
    where I: IntoIterator<Item = Self::Item>,
       Self::Item: Ord,
       Self: Sized
```



### cmp_by

```rust
fn cmp_by<I, F>(self, other: I, cmp: F) -> Ordering
    where Self: Sized,
       I: IntoIterator,
       F: FnMut(Self::Item, <I as IntoIterator>::Item) -> Ordering
```



### partial_cmp

```rust
fn partial_cmp<I>(self, other: I) -> Option<Ordering>
    where I: IntoIterator,
       Self::Item: PartialOrd<<I as IntoIterator>::Item>,
       Self: Sized
```



### partial_cmp_by

```rust
fn partial_cmp_by<I, F>(self, other: I, partial_cmp: F) -> Option<Ordering>
    where Self: Sized,
       I: IntoIterator,
       F: FnMut(Self::Item, <I as IntoIterator>::Item) -> Option<Ordering>
```



### eq

```rust
fn eq<I>(self, other: I) -> bool
    where I: IntoIterator,
       Self::Item: PartialEq<<I as IntoIterator>::Item>,
       Self: Sized
```



### eq_by

```rust
fn eq_by<I, F>(self, other: I, eq: F) -> bool
    where Self: Sized,
       I: IntoIterator,
       F: FnMut(Self::Item, <I as IntoIterator>::Item) -> bool
```



### ne

```rust
fn ne<I>(self, other: I) -> bool
    where I: IntoIterator,
       Self::Item: PartialEq<<I as IntoIterator>::Item>,
       Self: Sized
```



### lt

```rust
fn lt<I>(self, other: I) -> bool
    where I: IntoIterator,
       Self::Item: PartialOrd<<I as IntoIterator>::Item>,
       Self: Sized
```



### le

```rust
fn le<I>(self, other: I) -> bool
    where I: IntoIterator,
       Self::Item: PartialOrd<<I as IntoIterator>::Item>,
       Self: Sized
```



### gt

```rust
fn gt<I>(self, other: I) -> bool
    where I: IntoIterator,
       Self::Item: PartialOrd<<I as IntoIterator>::Item>,
       Self: Sized
```



### ge

  ```rust
fn ge<I>(self, other: I) -> bool
    where I: IntoIterator,
       Self::Item: PartialOrd<<I as IntoIterator>::Item>,
       Self: Sized
  ```



### is_sorted

```rust
fn is_sorted(self) -> bool
  where Self: Sized,
     Self::Item: PartialOrd<Self::Item>
```



### is_sorted_by

```rust
fn is_sorted_by<F>(self, compare: F) -> bool
    where Self: Sized,
       F: FnMut(&Self::Item, &Self::Item) -> Option<Ordering>
```



### is_sorted_by_key

```rust
fn is_sorted_by_key<F, K>(self, f: F) -> bool
    where Self: Sized,
        F: FnMut(Self::Item) -> K,
        K: PartialOrd<K>
```

