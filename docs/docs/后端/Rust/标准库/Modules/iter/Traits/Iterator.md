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





### unzip

```rust
fn unzip<A, B, FromA, FromB>(self) -> (FromA, FromB)
    where FromA: Default + Extend<A>,
       FromB: Default + Extend<B>,
       Self: Sized + Iterator<Item = (A, B)>
```





### intersperse

`nightly-only`

创建一个新的迭代器，在每个元素之间插一个「固定的值」

```rust
fn intersperse(self, separator: Self::Item) -> Intersperse<Self> 
where
    Self: Sized,
    Self::Item: Clone,
```

 **参数**：

- **separator**：每个元素中间插入的分隔符

**返回值**：返回一个`Intersperse`迭代器

```rust
#![feature(iter_intersperse)]

let mut a = [0, 1, 2].iter().intersperse(&100);
assert_eq!(a.next(), Some(&0));   // `a` 中的第一个元素。
assert_eq!(a.next(), Some(&100)); // 分隔符。
assert_eq!(a.next(), Some(&1));   // `a` 中的下一个元素。
assert_eq!(a.next(), Some(&100)); // 分隔符。
assert_eq!(a.next(), Some(&2));   // `a` 中的最后一个元素。
assert_eq!(a.next(), None);       // 迭代器完成。
```

`intersperse` 对于使用公共元素连接迭代器的项非常有用：

```rust
#![feature(iter_intersperse)]

let hello = ["Hello", "World", "!"].iter().copied().intersperse(" ").collect::<String>();
assert_eq!(hello, "Hello World !");
```





### intersperse_with

`nightly-only`

创建一个新的迭代器，在每个元素之间插一个「动态算出来的值」

```rust
fn intersperse_with<G>(self, separator: G) -> IntersperseWith<Self, G> 
where
    Self: Sized,
    G: FnMut() -> Self::Item,
```

 **参数**：

- **separator**：该函数的返回值作为每个元素中间插入的分隔符

**返回值**：返回一个`IntersperseWith`迭代器

```rust
#![feature(iter_intersperse)]

#[derive(PartialEq, Debug)]
struct NotClone(usize);

let v = [NotClone(0), NotClone(1), NotClone(2)];
let mut it = v.into_iter().intersperse_with(|| NotClone(99));

assert_eq!(it.next(), Some(NotClone(0)));  // `v` 中的第一个元素。
assert_eq!(it.next(), Some(NotClone(99))); // 分隔符。
assert_eq!(it.next(), Some(NotClone(1)));  // `v` 中的下一个元素。
assert_eq!(it.next(), Some(NotClone(99))); // 分隔符。
assert_eq!(it.next(), Some(NotClone(2)));  // `v` 的最后一个元素。
assert_eq!(it.next(), None);               // 迭代器完成。
```

`intersperse_with` 可用于需要计算分隔符的情况：

```rust
#![feature(iter_intersperse)]

let src = ["Hello", "to", "all", "people", "!!"].iter().copied();

// 闭包可变地借用其上下文以生成项。
let mut happy_emojis = [" ❤️ ", " 😀 "].iter().copied();
let separator = || happy_emojis.next().unwrap_or(" 🦀 ");

let result = src.intersperse_with(separator).collect::<String>();
assert_eq!(result, "Hello ❤️ to 😀 all 🦀 people 🦀 !!");
```





### map

在闭包函数中将迭代项处理后并返回，最后返回处理后的新迭代器

和`js`中的`arr.map()`差不多

```rust
fn map<B, F>(self, f: F) -> Map<Self, F>
where
    Self: Sized,
    F: FnMut(Self::Item) -> B,
```

 **参数**：

- **f**：迭代项处理函数，该函数的参数为当前迭代项，该函数的返回值会放入新的迭代器中

**返回值**：返回一个`Map`迭代器

```rust
// 把每个元素*2
fn main() {
    let a = [1, 2, 3, 4, 5];
    let iter = a.iter().map(|item| item * 2);

    for item in iter {
        println!("{:?}", item);
    }
    /*
       2
       4
       6
       8
       10
    */

}
```

如果您正在做某种副作用，请首选 `for` 而不是 `map()`：

```rust
// 不要这样做：
(0..5).map(|x| println!("{x}"));

// 它甚至不会执行，因为它很懒。Rust 会就此警告您。

// 而是用于：
for x in 0..5 {
    println!("{x}");
}
```



### map_while

```rust
fn map_while<B, P>(self, predicate: P) -> MapWhile<Self, P> 
    where Self: Sized,
       P: FnMut(Self::Item) -> Option<B>
```







### for_each

相当于for循环的语法糖

遍历一个迭代器

```rust
fn for_each<F>(self, f: F)
where
    Self: Sized,
    F: FnMut(Self::Item),
```

 **参数**：

- **f**：迭代项处理函数，该函数的参数为当前迭代项

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];
    a.iter().for_each(|item| {
        println!("{:?}", item);
    });

    /*
       1
       2
       3
       4
       5
    */
}
```

如果想改变原数组中的内容

```rust
fn main() {
    let mut a = [1, 2, 3, 4, 5];

    a.iter_mut().for_each(|item| {
        *item += 1;
    });

    println!("{:?}", a); // [2, 3, 4, 5, 6]
}
```







### filter

创建一个新迭代器，根据谓词函数，过滤掉不符合条件的项

```rust
fn filter<P>(self, predicate: P) -> Filter<Self, P> 
where
    Self: Sized,
    P: FnMut(&Self::Item) -> bool,
```

 **参数**：

- **f**：谓词函数，必须返回一个`bool`值，新的迭代器中不包含返回`false`的项

**返回值**：返回一个`Filter`迭代器

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];

    let filter_iter = a.iter().filter(|&&item| item > 2);

    for item in filter_iter {
        println!("{:#?}", item);
		/*
			3
			4
			5
		 */
    }
}
```

注意到上面闭包函数使用的是双引用`&&item`

因为传递给 `filter()` 的闭包需要用一个引用，并且许多迭代器迭代引用，所以这可能导致混乱的情况，其中闭包的类型是双引用

除了上面的写法，也可以使用双重解引用

```rust
let a = [0, 1, 2];

let mut iter = a.iter().filter(|x| **x > 1); // 需要两个 *s!

assert_eq!(iter.next(), Some(&2));
assert_eq!(iter.next(), None);
```

或者一半一半，挺搞笑的

```rust
let a = [0, 1, 2];

let mut iter = a.iter().filter(|&x| *x > 1); // both & and *

assert_eq!(iter.next(), Some(&2));
assert_eq!(iter.next(), None);
```

请注意，`iter.filter(f).next()` 等效于 `iter.find(f)`。





### filter_map

创建一个同时过滤和映射的迭代器，相当于`filter`和`map`的合体

返回的迭代器只产生 `value`，而提供的闭包会返回 `Some(value)`。

```rust
fn filter_map<B, F>(self, f: F) -> FilterMap<Self, F>
where
    Self: Sized,
    F: FnMut(Self::Item) -> Option<B>,
```

 **参数**：

- **f**：处理迭代项的闭包函数，在此函数中可以对迭代项的值进行更改（map特性），此函数返回一个`Option`，`Some`会被保留，`None`会被过滤（`filter`特性）

**返回值**：返回一个`FilterMap`迭代器

```rust
fn main() {
    let v = [1, 2, 3, 4, 5];
    let iter = v.iter();
	// 过滤v中的偶数，并返回过滤出来的偶数的一半
    let res = iter.filter_map(|&item| if item % 2 == 0 { Some(item / 2) } else { None });

    for item in res {
        println!("{:#?}", item);
        /*
           1
           2
        */
    }
}
```

转换成`filter`和`map`

```rust
fn main() {
    let v = [1, 2, 3, 4, 5];
    let iter = v.iter();

    let res = iter.filter(|&&item| item % 2 == 0).map(|item| item / 2);

    for item in res {
        println!("{:#?}", item);
        /*
           1
           2
        */
    }
}
```





### enumerate

创建一个迭代器，每个迭代项为一个元组，包含当前迭代项的索引和值

```rust
fn enumerate(self) -> Enumerate<Self>
where
    Self: Sized,
```

**返回值**：返回一个`Enumerate`迭代器，当前迭代项为一个元组

- 第一个元素为当前迭代的索引
- 第二个元素为当前迭代项的值

```rust
fn main() {
    let v = [1, 2, 3];
    let iter = v.iter().enumerate();

    for (index, item) in iter {
        println!("{:?},{:?}", index, item);
        /*
           0,1
           1,2
           2,3
        */
    }
}

```

:::tip

如果要返回的索引将溢出 `usize`，则返回的迭代器可能为 panic。

:::





### peekable

”跳屁壳儿“

创建一个迭代器，它可以使用 [`Peekable::peek`](https://www.rustwiki.org.cn/zh-CN/std/iter/struct.Peekable.html#method.peek) 和 [`Peekable::peek_mut`](https://www.rustwiki.org.cn/zh-CN/std/iter/struct.Peekable.html#method.peek_mut) 方法查看迭代器的下一个元素而不消耗它

迭代器并不会前进，调用`next`方法还是正常的顺序

```rust
fn peekable(self) -> Peekable<Self> 
where
    Self: Sized,
```

**返回值**：返回一个`Peekable`迭代器，允许调用`Peekable`中的`peek`和`peek_mut`方法看一眼下一个迭代项的值，而不推进迭代器

```rust
fn main() {
    let v = [1, 2, 3];
    let mut iter = v.iter().peekable();

    println!("{:?}", iter.peek());  // Some(1)
    println!("{:?}", iter.next());  // Some(1)
}
```

可以peek多次，依然不影响迭代器本身的位置

```rust
fn main() {
    let v = [1, 2, 3];
    let mut iter = v.iter().peekable();

    println!("{:?}", iter.peek());  // Some(1)
    println!("{:?}", iter.peek());  // Some(1)
    println!("{:?}", iter.peek());  // Some(1)

    println!("{:?}", iter.next());  // Some(1)
}
```

使用`peek_mut`在不推进迭代器的情况下改变下一个项：

```rust
let xs = [1, 2, 3];

let mut iter = xs.iter().peekable();

// `peek_mut()` 让我们看到了 future
assert_eq!(iter.peek_mut(), Some(&mut &1));
assert_eq!(iter.peek_mut(), Some(&mut &1));
assert_eq!(iter.next(), Some(&1));

if let Some(mut p) = iter.peek_mut() {
    assert_eq!(*p, &2);
    // 将一个值放入迭代器
    *p = &1000;
}

// 随着迭代器的继续，该值重新出现
assert_eq!(iter.collect::<Vec<_>>(), vec![&1000, &3]);
```



### skip

```rust
fn skip(self, n: usize) -> Skip<Self> 
    where Self: Sized
```





### skip_while

创建一个迭代器，该迭代器基于谓词`skip`（跳过）元素。

只要条件为 `true`，就一直跳过

一旦遇到第一个 `false`，立刻停止跳过，并把后面所有元素原样返回

```rust
fn skip_while<P>(self, predicate: P) -> SkipWhile<Self, P>
where
    Self: Sized,
    P: FnMut(&Self::Item) -> bool,
```

 **参数**：

- **predicate**：谓词函数，迭代器根据此函数的返回值跳过元素

**返回值**：返回一个`SkipWhile`迭代器

```rust
fn main() {
    let v = [1, 2, 3, 4, 5];
    let iter = v.iter();

    let res = iter.skip_while(|item| **item < 3);
    for item in res {
        println!("{:?}", item);
    }
    /*
    	3
    	4
    	5
    */
}
```

因为传递给 `skip_while()` 的闭包需要一个引用，并且许多迭代器都在引用上进行迭代，所以这会导致一种可能令人困惑的情况，其中闭包参数的类型是双引用：

```rust
let a = [-1, 0, 1];

let mut iter = a.iter().skip_while(|x| **x < 0); // 需要两个 *s!
// 或者
// let mut iter = a.iter().skip_while(|&&x| x < 0); // 需要两个 &!
// 或者
// let mut iter = a.iter().skip_while(|&x| *x < 0); // 一半一半

assert_eq!(iter.next(), Some(&0));
assert_eq!(iter.next(), Some(&1));
assert_eq!(iter.next(), None);
```



### take

```rust
fn take(self, n: usize) -> Take<Self> 
    where Self: Sized
```





### take_while

```rust
fn take_while<P>(self, predicate: P) -> TakeWhile<Self, P> 
    where Self: Sized,
       P: FnMut(&Self::Item) -> bool
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



### fold

```rust
fn fold<B, F>(self, init: B, f: F) -> B
    where Self: Sized,
       F: FnMut(B, Self::Item) -> B
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





## Implementors



### impl Iterator for std::ascii::EscapeDefault

type Item = u8



### impl Iterator for std::char::EscapeDebug



### impl Iterator for std::char::EscapeDefault



### impl Iterator for std::char::EscapeUnicode



### impl Iterator for ToLowercase



### impl Iterator for ToUppercase



### impl Iterator for Args



### impl Iterator for ArgsOs



### impl Iterator for Vars



### impl Iterator for VarsOs



### impl Iterator for ReadDir



### impl Iterator for IntoIncoming



### impl Iterator for std::str::Bytes<'_>



### impl Iterator for std::string::Drain<'_>



### impl<'a> Iterator for <'a>



### impl<'a> Iterator for SplitPaths<'a>



### impl<'a> Iterator for std::net::Incoming<'a>



### impl<'a> Iterator for std::os::unix::net::Incoming<'a>

`Available on Unix only.`



### impl<'a> Iterator for Messages<'a>

`Available on (Android or Linux) and Unix only.`



### impl<'a> Iterator for ScmCredentials<'a>

`Available on (Android or Linux) and Unix only.`

### impl<'a> Iterator for ScmRights<'a>

`Available on (Android or Linux) and Unix only.`



### impl<'a> Iterator for EncodeWide<'a>



### impl<'a> Iterator for Ancestors<'a>



### impl<'a> Iterator for Components<'a>



### impl<'a> Iterator for std::path::Iter<'a>



### impl<'a> Iterator for CommandArgs<'a>



### impl<'a> Iterator for CommandEnvs<'a>



### impl<'a> Iterator for EscapeAscii<'a>



### impl<'a> Iterator for CharIndices<'a>



### impl<'a> Iterator for Chars<'a>



### impl<'a> Iterator for EncodeUtf16<'a>



### impl<'a> Iterator for std::str::EscapeDebug<'a>



### impl<'a> Iterator for std::str::EscapeDefault<'a>



### impl<'a> Iterator for std::str::EscapeUnicode<'a>



### impl<'a> Iterator for std::str::Lines<'a>



### impl<'a> Iterator for LinesAny<'a>



### impl<'a> Iterator for SplitAsciiWhitespace<'a>



### impl<'a> Iterator for SplitWhitespace<'a>



### impl<'a> Iterator for Utf8Chunks<'a>



### impl<'a, A> Iterator for std::option::Iter<'a, A>



### impl<'a, A> Iterator for std::option::IterMut<'a, A>



### impl<'a, I, T> Iterator for Cloned\<I>

```rust
impl<'a, I, T> Iterator for Cloned<I>
where
  T: 'a + Clone,
  I: Iterator<Item = &'a T>,
```



### impl<'a, I, T> Iterator for Copied\<I>

```rust
impl<'a, I, T> Iterator for Copied<I>
where
  T: 'a + Copy,
  I: Iterator<Item = &'a T>,
```

### impl<'a, K> Iterator for std::collections::hash_set::Drain<'a, K>



### impl<'a, K> Iterator for std::collections::hash_set::Iter<'a, K>



### impl<'a, K, V> Iterator for std::collections::btree_map::Iter<'a, K, V>

```rust
impl<'a, K, V> Iterator for std::collections::btree_map::Iter<'a, K, V>
where
  K: 'a,
  V: 'a,
```

### impl<'a, K, V> Iterator for std::collections::btree_map::IterMut<'a, K, V>



### impl<'a, K, V> Iterator for std::collections::btree_map::Keys<'a, K, V>



### impl<'a, K, V> Iterator for std::collections::btree_map::Range<'a, K, V>



### impl<'a, K, V> Iterator for RangeMut<'a, K, V>



### impl<'a, K, V> Iterator for std::collections::btree_map::Values<'a, K, V>



### impl<'a, K, V> Iterator for std::collections::btree_map::ValuesMut<'a, K, V>



### impl<'a, K, V> Iterator for std::collections::hash_map::Drain<'a, K, V>



### impl<'a, K, V> Iterator for std::collections::hash_map::Iter<'a, K, V>



### impl<'a, K, V> Iterator for std::collections::hash_map::IterMut<'a, K, V>



### impl<'a, K, V> Iterator for std::collections::hash_map::Keys<'a, K, V>



### impl<'a, K, V> Iterator for std::collections::hash_map::Values<'a, K, V>



### impl<'a, K, V> Iterator for std::collections::hash_map::ValuesMut<'a, K, V>



### impl<'a, P> Iterator for MatchIndices<'a, P>

```rust
impl<'a, P> Iterator for MatchIndices<'a, P>
where
  P: Pattern<'a>,
```



### impl<'a, P> Iterator for Matches<'a, P>

```rust
impl<'a, P> Iterator for Matches<'a, P>
where
  P: Pattern<'a>,
```



### impl<'a, P> Iterator for RMatchIndices<'a, P>

```rust
impl<'a, P> Iterator for RMatchIndices<'a, P>
where
  P: Pattern<'a>,
  <P as Pattern<'a>>::Searcher: ReverseSearcher<'a>,
```



### impl<'a, P> Iterator for RMatches<'a, P>

```rust
impl<'a, P> Iterator for RMatches<'a, P>
where
  P: Pattern<'a>,
  <P as Pattern<'a>>::Searcher: ReverseSearcher<'a>,
```



### impl<'a, P> Iterator for std::str::RSplit<'a, P>

```rust
impl<'a, P> Iterator for std::str::RSplit<'a, P>
where
  P: Pattern<'a>,
  <P as Pattern<'a>>::Searcher: ReverseSearcher<'a>,
```



### impl<'a, P> Iterator for std::str::RSplitN<'a, P>

```rust
impl<'a, P> Iterator for std::str::RSplitN<'a, P>
where
  P: Pattern<'a>,
  <P as Pattern<'a>>::Searcher: ReverseSearcher<'a>,
```



### impl<'a, P> Iterator for RSplitTerminator<'a, P>

```rust
impl<'a, P> Iterator for RSplitTerminator<'a, P>
where
  P: Pattern<'a>,
  <P as Pattern<'a>>::Searcher: ReverseSearcher<'a>,
```



### impl<'a, P> Iterator for std::str::Split<'a, P>

```rust
impl<'a, P> Iterator for std::str::Split<'a, P>
where
  P: Pattern<'a>,
```



### impl<'a, P> Iterator for std::str::SplitInclusive<'a, P>

```rust
impl<'a, P> Iterator for std::str::SplitInclusive<'a, P>
where
  P: Pattern<'a>,
```



### impl<'a, P> Iterator for std::str::SplitN<'a, P>

```rust
impl<'a, P> Iterator for std::str::SplitN<'a, P>
where
  P: Pattern<'a>,
```



### impl<'a, P> Iterator for SplitTerminator<'a, P>

```rust
impl<'a, P> Iterator for SplitTerminator<'a, P>
where
  P: Pattern<'a>,
```

### impl<'a, T> Iterator for std::collections::binary_heap::Iter<'a, T>



### impl<'a, T> Iterator for std::collections::btree_set::Iter<'a, T>



### impl<'a, T> Iterator for std::collections::btree_set::Range<'a, T>



### impl<'a, T> Iterator for std::collections::btree_set::SymmetricDifference<'a, T>

```rust
impl<'a, T> Iterator for std::collections::btree_set::SymmetricDifference<'a, T>
where
  T: Ord,
```



### impl<'a, T> Iterator for std::collections::btree_set::Union<'a, T>

```rust
impl<'a, T> Iterator for std::collections::btree_set::Union<'a, T>
where
  T: Ord,
```

### impl<'a, T> Iterator for std::collections::linked_list::Iter<'a, T>



### impl<'a, T> Iterator for std::collections::linked_list::IterMut<'a, T>



### impl<'a, T> Iterator for std::collections::vec_deque::Iter<'a, T>



### impl<'a, T> Iterator for std::collections::vec_deque::IterMut<'a, T>



### impl<'a, T> Iterator for std::result::Iter<'a, T>



### impl<'a, T> Iterator for std::result::IterMut<'a, T>



### impl<'a, T> Iterator for Chunks<'a, T>



### impl<'a, T> Iterator for ChunksExact<'a, T>



### impl<'a, T> Iterator for ChunksExactMut<'a, T>



### impl<'a, T> Iterator for ChunksMut<'a, T>



### impl<'a, T> Iterator for std::slice::Iter<'a, T>



### impl<'a, T> Iterator for std::slice::IterMut<'a, T>



### impl<'a, T> Iterator for RChunks<'a, T>



### impl<'a, T> Iterator for RChunksExact<'a, T>



### impl<'a, T> Iterator for RChunksExactMut<'a, T>



### impl<'a, T> Iterator for RChunksMut<'a, T>



### impl<'a, T> Iterator for Windows<'a, T>



### impl<'a, T> Iterator for std::sync::mpsc::Iter<'a, T>



### impl<'a, T> Iterator for TryIter<'a, T>



### impl<'a, T, A> Iterator for std::collections::btree_set::Difference<'a, T, A>

```rust
impl<'a, T, A> Iterator for std::collections::btree_set::Difference<'a, T, A>
where
  T: Ord,
  A: Allocator + Clone,
```



### impl<'a, T, A> Iterator for std::collections::btree_set::Intersection<'a, T, A>

```rust
impl<'a, T, A> Iterator for std::collections::btree_set::Intersection<'a, T, A>
where
  T: Ord,
  A: Allocator + Clone,
```



### impl<'a, T, F, A> Iterator for std::collections::btree_set::DrainFilter<'_, T, F, A>

```rust
impl<'a, T, F, A> Iterator for std::collections::btree_set::DrainFilter<'_, T, F, A>
where
  A: Allocator + Clone,
  F: 'a + FnMut(&T) -> bool,
```



### impl<'a, T, P> Iterator for GroupBy<'a, T, P>

```rust
impl<'a, T, P> Iterator for GroupBy<'a, T, P>
where
  T: 'a,
  P: FnMut(&T, &T) -> bool,
```



### impl<'a, T, P> Iterator for GroupByMut<'a, T, P>

```rust
impl<'a, T, P> Iterator for GroupByMut<'a, T, P>
where
  T: 'a,
  P: FnMut(&T, &T) -> bool,
```



### impl<'a, T, P> Iterator for std::slice::RSplit<'a, T, P>

```rust
impl<'a, T, P> Iterator for std::slice::RSplit<'a, T, P>
where
  P: FnMut(&T) -> bool,
```



### impl<'a, T, P> Iterator for RSplitMut<'a, T, P>

```rust
impl<'a, T, P> Iterator for RSplitMut<'a, T, P>
where
  P: FnMut(&T) -> bool,
```



### impl<'a, T, P> Iterator for std::slice::RSplitN<'a, T, P>

```rust
impl<'a, T, P> Iterator for std::slice::RSplitN<'a, T, P>
where
  P: FnMut(&T) -> bool,
```



### impl<'a, T, P> Iterator for RSplitNMut<'a, T, P>

```rust
impl<'a, T, P> Iterator for RSplitNMut<'a, T, P>
where
  P: FnMut(&T) -> bool,
```



### impl<'a, T, P> Iterator for std::slice::Split<'a, T, P>

```rust
impl<'a, T, P> Iterator for std::slice::Split<'a, T, P>
where
  P: FnMut(&T) -> bool,
```



### impl<'a, T, P> Iterator for std::slice::SplitInclusive<'a, T, P>

```rust
impl<'a, T, P> Iterator for std::slice::SplitInclusive<'a, T, P>
where
  P: FnMut(&T) -> bool,
```



### impl<'a, T, P> Iterator for SplitInclusiveMut<'a, T, P>

```rust
impl<'a, T, P> Iterator for SplitInclusiveMut<'a, T, P>
where
  P: FnMut(&T) -> bool,
```



### impl<'a, T, P> Iterator for SplitMut<'a, T, P>

```rust
impl<'a, T, P> Iterator for SplitMut<'a, T, P>
where
  P: FnMut(&T) -> bool,
```



### impl<'a, T, P> Iterator for std::slice::SplitN<'a, T, P>

```rust
impl<'a, T, P> Iterator for std::slice::SplitN<'a, T, P>
where
  P: FnMut(&T) -> bool,
```



### impl<'a, T, P> Iterator for SplitNMut<'a, T, P>

```rust
impl<'a, T, P> Iterator for SplitNMut<'a, T, P>
where
  P: FnMut(&T) -> bool,
```



### impl<'a, T, S> Iterator for std::collections::hash_set::Difference<'a, T, S>

```rust
impl<'a, T, S> Iterator for std::collections::hash_set::Difference<'a, T, S>
where
  T: Eq + Hash,
  S: BuildHasher,
```



### impl<'a, T, S> Iterator for std::collections::hash_set::Intersection<'a, T, S>

```rust
impl<'a, T, S> Iterator for std::collections::hash_set::Intersection<'a, T, S>
where
  T: Eq + Hash,
  S: BuildHasher,
```



### impl<'a, T, S> Iterator for std::collections::hash_set::SymmetricDifference<'a, T, S>

```rust
impl<'a, T, S> Iterator for std::collections::hash_set::SymmetricDifference<'a, T, S>
where
  T: Eq + Hash,
  S: BuildHasher,
```



### impl<'a, T, S> Iterator for std::collections::hash_set::Union<'a, T, S>

```rust
impl<'a, T, S> Iterator for std::collections::hash_set::Union<'a, T, S>
where
  T: Eq + Hash,
  S: BuildHasher,
```

### impl<'a, T, const N: usize> Iterator for std::slice::ArrayChunks<'a, T, N>



### impl<'a, T, const N: usize> Iterator for ArrayChunksMut<'a, T, N>



### impl<'a, T, const N: usize> Iterator for ArrayWindows<'a, T, N>



### impl\<A> Iterator for std::ops::Range\<A>

```rust
impl<A> Iterator for std::ops::Range<A>
where
  A: Step,
```



### impl\<A> Iterator for RangeFrom\<A>

```rust
impl<A> Iterator for RangeFrom<A>
where
  A: Step,
```



### impl\<A> Iterator for RangeInclusive\<A>

```rust
impl<A> Iterator for RangeInclusive<A>
where
  A: Step,
```



### impl\<A> Iterator for std::option::IntoIter\<A>



### impl\<A> Iterator for Repeat\<A>

```rust
impl<A> Iterator for Repeat<A>
where
  A: Clone,
```



### impl<A, B> Iterator for Chain<A, B>

```rust
impl<A, B> Iterator for Chain<A, B>
where
  A: Iterator,
  B: Iterator<Item = <A as Iterator>::Item>,
```



### impl<A, B> Iterator for Zip<A, B>

```rust
impl<A, B> Iterator for Zip<A, B>
where
  A: Iterator,
  B: Iterator,
```



### impl<A, F> Iterator for OnceWith\<F>

```rust
impl<A, F> Iterator for OnceWith<F>
where
  F: FnOnce() -> A,
```



### impl<A, F> Iterator for RepeatWith\<F>

```rust
impl<A, F> Iterator for RepeatWith<F>
where
  F: FnMut() -> A,
```



### impl<B, I, F> Iterator for FilterMap<I, F>

```rust
impl<B, I, F> Iterator for FilterMap<I, F>
where
  I: Iterator,
  F: FnMut(<I as Iterator>::Item) -> Option<B>,
```



### impl<B, I, F> Iterator for Map<I, F>

```rust
impl<B, I, F> Iterator for Map<I, F>
where
  I: Iterator,
  F: FnMut(<I as Iterator>::Item) -> B,
```



### impl<B, I, P> Iterator for MapWhile<I, P>

```rust
impl<B, I, P> Iterator for MapWhile<I, P>
where
  I: Iterator,
  P: FnMut(<I as Iterator>::Item) -> Option<B>,
```



### impl<B, I, St, F> Iterator for Scan<I, St, F>

```rust
impl<B, I, St, F> Iterator for Scan<I, St, F>
where
  I: Iterator,
  F: FnMut(&mut St, <I as Iterator>::Item) -> Option<B>,
```

### impl<B: BufRead> Iterator for std::io::Lines\<B>



### impl<B: BufRead> Iterator for std::io::Split\<B>



### impl\<I> Iterator for &mut I

```rust
impl<I> Iterator for &mut I
where
  I: Iterator + ?Sized,
```



### impl\<I> Iterator for DecodeUtf16\<I>

```rust
impl<I> Iterator for DecodeUtf16<I>
where
  I: Iterator<Item = u16>,
```



### impl\<I> Iterator for ByRefSized<'_, I>

```rust
impl<I> Iterator for ByRefSized<'_, I>
where
  I: Iterator,
```



### impl\<I> Iterator for Cycle\<I>

```rust
impl<I> Iterator for Cycle<I>
where
  I: Clone + Iterator,
```



### impl\<I> Iterator for Enumerate\<I>

```rust
impl<I> Iterator for Enumerate<I>
where
  I: Iterator,
```



### impl\<I> Iterator for Fuse\<I>

```rust
impl<I> Iterator for Fuse<I>
where
  I: Iterator,
```



### impl\<I> Iterator for Intersperse\<I>

```rust
impl<I> Iterator for Intersperse<I>
where
  I: Iterator,
  <I as Iterator>::Item: Clone,
```





### impl\<I> Iterator for Peekable\<I>

```rust
impl<I> Iterator for Peekable<I>
where
  I: Iterator,
```



### impl\<I> Iterator for Rev\<I>

```rust
impl<I> Iterator for Rev<I>
where
  I: DoubleEndedIterator,
```



### impl\<I> Iterator for Skip\<I>

```rust
impl<I> Iterator for Skip<I>
where
  I: Iterator,
```



### impl\<I> Iterator for StepBy\<I>

```rust
impl<I> Iterator for StepBy<I>
where
  I: Iterator,
```



### impl\<I> Iterator for Take\<I>

```rust
impl<I> Iterator for Take<I>
where
  I: Iterator,
```



### impl<I, A> Iterator for Box<I, A>

```rust
impl<I, A> Iterator for Box<I, A>
where
  I: Iterator + ?Sized,
  A: Allocator,
```



### impl<I, A> Iterator for Splice<'_, I, A>

```rust
impl<I, A> Iterator for Splice<'_, I, A>
where
  I: Iterator,
  A: Allocator,
```



### impl<I, F> Iterator for Inspect<I, F>

```rust
impl<I, F> Iterator for Inspect<I, F>
where
  I: Iterator,
  F: FnMut(&<I as Iterator>::Item),
```



### impl<I, G> Iterator for IntersperseWith<I, G>

```rust
impl<I, G> Iterator for IntersperseWith<I, G>
where
  I: Iterator,
  G: FnMut() -> <I as Iterator>::Item,
```



### impl<I, P> Iterator for Filter<I, P>

```rust
impl<I, P> Iterator for Filter<I, P>
where
  I: Iterator,
  P: FnMut(&<I as Iterator>::Item) -> bool,
```



### impl<I, P> Iterator for SkipWhile<I, P>

```rust
impl<I, P> Iterator for SkipWhile<I, P>
where
  I: Iterator,
  P: FnMut(&<I as Iterator>::Item) -> bool,
```



### impl<I, P> Iterator for TakeWhile<I, P>

```rust
impl<I, P> Iterator for TakeWhile<I, P>
where
  I: Iterator,
  P: FnMut(&<I as Iterator>::Item) -> bool,
```



### impl<I, U> Iterator for Flatten\<I>

```rust
impl<I, U> Iterator for Flatten<I>
where
  I: Iterator,
  <I as Iterator>::Item: IntoIterator<IntoIter = U, Item = <U as Iterator>::Item>,
  U: Iterator,
```



### impl<I, U, F> Iterator for FlatMap<I, U, F>

```rust
impl<I, U, F> Iterator for FlatMap<I, U, F>
where
  I: Iterator,
  U: IntoIterator,
  F: FnMut(<I as Iterator>::Item) -> 
```



### impl<I, const N: usize> Iterator for std::iter::ArrayChunks<I, N>

```rust
impl<I, const N: usize> Iterator for std::iter::ArrayChunks<I, N>
where
  I: Iterator,
```

### impl\<K> Iterator for std::collections::hash_set::IntoIter\<K>



### impl<K, F> Iterator for std::collections::hash_set::DrainFilter<'_, K, F>

```rust
impl<K, F> Iterator for std::collections::hash_set::DrainFilter<'_, K, F>
where
  F: FnMut(&K) -> bool,
```



### impl<K, V> Iterator for std::collections::hash_map::IntoIter<K, V>



### impl<K, V> Iterator for std::collections::hash_map::IntoKeys<K, V>



### impl<K, V> Iterator for std::collections::hash_map::IntoValues<K, V>



### impl<K, V, A> Iterator for std::collections::btree_map::IntoIter<K, V, A>

```rust
impl<K, V, A> Iterator for std::collections::btree_map::IntoIter<K, V, A>
where
  A: Allocator + Clone,
```



### impl<K, V, A> Iterator for std::collections::btree_map::IntoKeys<K, V, A>

```rust
impl<K, V, A> Iterator for std::collections::btree_map::IntoKeys<K, V, A>
where
  A: Allocator + Clone,
```



### impl<K, V, A> Iterator for std::collections::btree_map::IntoValues<K, V, A>

```rust
impl<K, V, A> Iterator for std::collections::btree_map::IntoValues<K, V, A>
where
  A: Allocator + Clone,
```



### impl<K, V, F> Iterator for std::collections::hash_map::DrainFilter<'_, K, V, F>

```rust
impl<K, V, F> Iterator for std::collections::hash_map::DrainFilter<'_, K, V, F>
where
  F: FnMut(&K, &mut V) -> bool,
```



### impl<K, V, F, A> Iterator for std::collections::btree_map::DrainFilter<'_, K, V, F, A>

```rust
impl<K, V, F, A> Iterator for std::collections::btree_map::DrainFilter<'_, K, V, F, A>
where
  A: Allocator + Clone,
  F: FnMut(&K, &mut V) -> bool,
```



### impl<R: Read> Iterator for std::io::Bytes\<R>



### impl\<T> Iterator for std::collections::binary_heap::Drain<'_, T>



### impl\<T> Iterator for DrainSorted<'_, T>

```rust
impl<T> Iterator for DrainSorted<'_, T>
where
  T: Ord,
```



### impl\<T> Iterator for std::collections::binary_heap::IntoIter\<T>



### impl\<T> Iterator for IntoIterSorted\<T>

```rust
impl<T> Iterator for IntoIterSorted<T>
where
  T: Ord,
```



### impl\<T> Iterator for std::result::IntoIter\<T>



### impl\<T> Iterator for std::sync::mpsc::IntoIter\<T>



### impl\<T> Iterator for Empty\<T>



### impl\<T> Iterator for Once\<T>



### impl<T, A> Iterator for std::collections::btree_set::IntoIter<T, A>

```rust
impl<T, A> Iterator for std::collections::btree_set::IntoIter<T, A>
where
  A: Allocator + Clone,
```



### impl<T, A> Iterator for std::collections::linked_list::IntoIter<T, A>

```rust
impl<T, A> Iterator for std::collections::linked_list::IntoIter<T, A>
where
  A: Allocator,
```



### impl<T, A> Iterator for std::collections::vec_deque::Drain<'_, T, A>

```rust
impl<T, A> Iterator for std::collections::vec_deque::Drain<'_, T, A>
where
  A: Allocator,
```



### impl<T, A> Iterator for std::collections::vec_deque::IntoIter<T, A>

```rust
impl<T, A> Iterator for std::collections::vec_deque::IntoIter<T, A>
where
  A: Allocator,
```



### impl<T, A> Iterator for std::vec::Drain<'_, T, A>

```rust
impl<T, A> Iterator for std::vec::Drain<'_, T, A>
where
  A: Allocator,
```



### impl<T, A> Iterator for std::vec::IntoIter<T, A>

```rust
impl<T, A> Iterator for std::vec::IntoIter<T, A>
where
  A: Allocator,
```



### impl<T, F> Iterator for FromFn\<F>

```rust
impl<T, F> Iterator for FromFn<F>
where
  F: FnMut() -> Option<T>,
```



### impl<T, F> Iterator for Successors<T, F>

```rust
impl<T, F> Iterator for Successors<T, F>
where
  F: FnMut(&T) -> Option<T>,
```



### impl<T, F, A> Iterator for std::collections::linked_list::DrainFilter<'_, T, F, A>

```rust
impl<T, F, A> Iterator for std::collections::linked_list::DrainFilter<'_, T, F, A>
where
  A: Allocator,
  F: FnMut(&mut T) -> bool,
```



### impl<T, F, A> Iterator for std::vec::DrainFilter<'_, T, F, A>

```rust
impl<T, F, A> Iterator for std::vec::DrainFilter<'_, T, F, A>
where
  A: Allocator,
  F: FnMut(&mut T) -> bool,
```

### impl<T, const N: usize> Iterator for std::array::IntoIter<T, N>



### impl Iterator for IntoIter 



