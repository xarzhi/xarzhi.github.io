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

将成对的迭代器转换为一对容器。

`unzip()` **消耗整个对的迭代器**，产生两个集合：一个来自对的左侧元素，一个来自右侧元素。

从某种意义上说，该函数与[`zip`](#zip)相反。

简而言之，是把格式为`[(1, 2), (3, 4), (5, 6)]`转化为格式为`([1, 3, 5],[2, 4, 6])`

```rust
fn unzip<A, B, FromA, FromB>(self) -> (FromA, FromB)
where
    FromA: Default + Extend<A>,
    FromB: Default + Extend<B>,
    Self: Sized + Iterator<Item = (A, B)>,
```

**返回值**：返回一个元组

- 第一个元素是源迭代器中每个迭代项的第一个元素的集合
- 第二个元素是源迭代器中每个迭代项的第二个元素的集合

```rust
fn main() {
    let arr = [(1, 2), (3, 4), (5, 6)];
    let iter = arr.into_iter();
    let (a, b): (Vec<i32>, Vec<i32>) = iter.unzip();

    println!("{:?}", a); // [1, 3, 5]
    println!("{:?}", b); // [2, 4, 6
}
```

:::tip 显式类型标注

若不显示类型标注，则会报错

```rust
fn main() {
    let arr = [(1, 2), (3, 4), (5, 6)];
    let iter = arr.into_iter();
    let (a, b) = iter.unzip();

    println!("{:?}", a); // [1, 3, 5]
    println!("{:?}", b); // [2, 4, 6]
}
```

```txt
 --> src\main.rs:4:9
     |
   4 |     let (a, b)= iter.unzip();
     |         ^^^^^^       ----- type must be known at this point
     |
     = note: the type must implement `Default`
note: required by a bound in `unzip`
    --> C:\Users\22357\.rustup\toolchains\stable-x86_64-pc-windows-msvc\lib/rustlib/src/rust\library\core\src\iter\traits\iterator.rs:3484:16
     |
3482 |     fn unzip<A, B, FromA, FromB>(self) -> (FromA, FromB)
     |        ----- required by a bound in this associated function
3483 |     where
3484 |         FromA: Default + Extend<A>,
     |                ^^^^^^^ required by this bound in `Iterator::unzip`
help: consider giving this pattern a type, where the type for type parameter `FromA` is specified
     |
   4 |     let (a, b): (FromA, FromB)= iter.unzip();
     |               ++++++++++++++++
```

叽里呱啦的看不懂，反正显示类型标注就对了

:::



:::tip  常见用途：处理 `map/HashMap`

从 `HashMap`解包

```rust
use std::collections::HashMap;

let mut map = HashMap::new();
map.insert("a", 1);
map.insert("b", 2);

let (keys, values): (Vec<_>, Vec<_>) =
    map.into_iter().unzip();

println!("{:?}", keys);   // ["a", "b"]
println!("{:?}", values); // [1, 2]
```

:::



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

创建一个迭代器，该迭代器均基于谓词和映射生成元素。

`map_while()` 将闭包作为参数。 它将在迭代器的每个元素上调用此闭包，并在返回 `Some(_)` 时产生元素。

一旦遇到谓词返回`None`，就停止迭代

```rust
fn map_while<B, P>(self, predicate: P) -> MapWhile<Self, P>
where
    Self: Sized,
    P: FnMut(Self::Item) -> Option<B>,
```

 **参数**：

- **predicate**：谓词函数，该函数需要返回一个`Option`

**返回值**：返回一个`MapWhile`迭代器，该迭代器一遇到`None`就会立刻停止迭代

```rust
fn main() {
    let arr = [1, 2, 3, 4, 5];
    let iter = arr.iter();

    let m = iter.map_while(|item| if item < &3 { Some(item) } else { None });

    for item in m {
        println!("{:#?}", item);
    }

    /*
       1
       2
    */
}
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

创建一个跳过前 `n` 个元素的迭代器。

`skip(n)` 跳过元素，直到跳过 `n` 元素或到达迭代器的末尾 (以先发生者为准)。之后，产生所有剩余的元素。

特别是，如果原始迭代器太短，则返回的迭代器为空。

而不是直接覆盖此方法，而是覆盖 `nth` 方法。

```rust
fn skip(self, n: usize) -> Skip<Self>
where
    Self: Sized,
```

**返回值**：返回一个`Skip`迭代器，里面包含没被跳过的剩余元素

```rust
fn main() {
    let arr = [1, 2, 3, 4, 5];
    let iter = arr.iter();

	let res=iter.skip(3);

    for item in res {
        println!("{:?}", item);
    }

    /*
       4
       5
    */
}
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

创建一个迭代器，拿取前n个元素

```rust
fn take(self, n: usize) -> Take<Self> 
where
    Self: Sized,
```

 **参数**：

- **n**：代表前n个元素

**返回值**：返回一个`Take`迭代器，包含源迭代器的前`n`个元素

```rust
fn main() {
    let arr = [1, 2, 3, 4, 5];
    let iter = arr.iter();

    let res = iter.take(3);

    for item in res {
        println!("{:?}", item);
    }
    /*
       1
       2
	   3
    */
}
```

`take()` 通常与无限迭代器一起使用，以使其成为有限的：

```rust
let mut iter = (0..).take(3);

assert_eq!(iter.next(), Some(0));
assert_eq!(iter.next(), Some(1));
assert_eq!(iter.next(), Some(2));
assert_eq!(iter.next(), None);
```

如果少于 `n` 个元素可用，`take` 会将自身限制为底层迭代器的大小：

```rust
let v = [1, 2];
let mut iter = v.into_iter().take(5);
assert_eq!(iter.next(), Some(1));
assert_eq!(iter.next(), Some(2));
assert_eq!(iter.next(), None);
```





### take_while

创建一个迭代器，该迭代器根据谓词产生元素。

`take_while()` 将闭包作为参数。它将在迭代器的每个元素上调用此闭包，并在返回 `true` 时产生 yield 元素。

一旦谓词返回`false`，立刻停止迭代，并且元素的剩余部分被忽略。

```rust
fn take_while<P>(self, predicate: P) -> TakeWhile<Self, P>
where
    Self: Sized,
    P: FnMut(&Self::Item) -> bool,
```

 **参数**：

- **predicate**：谓词函数，根据此函数的返回值，像新迭代器中填入元素

**返回值**：返回一个`TakeWhile`迭代器，

```rust
fn main() {
    let arr = [1, 2, 3, 4, 5];
    let iter = arr.iter();

    let res = iter.take_while(|item| **item < 3);

    for item in res {
        println!("{:?}", item);
    }
    /*
       1
       2
    */
}
```





### scan

给定一个初始值，在闭包函数中可以获取并修改这个初始值

返回一个新迭代器，其中的元素是由闭包函数的返回值`Option`解包而来

```rust
fn scan<St, B, F>(self, initial_state: St, f: F) -> Scan<Self, St, F> 
where
    Self: Sized,
    F: FnMut(&mut St, Self::Item) -> Option<B>,
```

 **参数**：

- **initial_state**：一个初始值，可通过闭包函数的第一个参数访问
- **f**：闭包函数，返回一个`Option`
  - 第一个参数：值为传入的`initial_state`值
  - 第二个参数：迭代项本身

**返回值**：返回一个`Scan`迭代器，其中迭代项为`f`函数返回的`Option`解包的值

```rust
fn main() {
    let arr = [1, 2, 3, 4, 5];
    let iter = arr.iter();

    let res = iter.scan(2, |state, item| {
        *state = *state * item;
        Some(*state)
    });

    for item in res {
        println!("{:?}", item);
    }

    /*
		2
		4
		12
		48
		240
	 */
}
```







### flat_map

相当于`map(f).flatten()`

把闭包函数返回的数组，先扁平化，再全部串再一起

```rust
fn flat_map<U, F>(self, f: F) -> FlatMap<Self, U, F>
where
    Self: Sized,
    U: IntoIterator,
    F: FnMut(Self::Item) -> U,
```

**参数**：

- **f**：闭包函数，该函数返回的可迭代数据，会被自动扁平化

**返回值**：返回一个`FlatMap`迭代器，会将`f`函数返回的可迭代数据扁平化，若`f`函数返回的数据不可迭代，则原封不动的返回

```rust
fn main() {
    let arr = [[1, 1, 1], [2, 2, 2]];
    let iter = arr.iter();

    let res = iter.flat_map(|item| item.map(|item| item * 2));

    for item in res {
        println!("{:?}", item);
    }

    /*
		2
		2
		2
		4
		4
		4
    */
}
```

若`f`函数返回的数据不可迭代

```rust
fn main() {
    let arr = [1, 2, 3];
    let iter = arr.iter();

    let res = iter.flat_map(|item| Some(item + 1));

    for item in res {
        println!("{:?}", item);
    }

    /*
      2
      3
      4
    */
}
```

:::tip `flat_map`只拍扁平一层

```rust
fn main() {
    let arr = [
		[[1,1],[2,2]],
		[[3,3],[4,4]]
	];
    let iter = arr.iter();

    let res = iter.flat_map(|item| item);

    for item in res {
        println!("{:?}", item);
    }

    /*
		[1,1]
		[2,2]
		[3,3]
		[4,4]
    */
}
```

:::





### flatten

返回一个新迭代器，并扁平化原迭代器中的值

```rust
fn flatten(self) -> Flatten<Self>
where
    Self: Sized,
    Self::Item: IntoIterator,
```

**返回值**：返回一个被扁平化的新迭代器

```rust
fn main() {
    let arr = [
		[1,1],[2,2],
		[3,3],[4,4]
	];
    let iter = arr.iter();

    let res = iter.flatten();

    for item in res {
        println!("{:?}", item);
    }

    /*
		1
		1
		2
		2
		3
		3
		4
		4
    */
}
```

展平适用于任何 `IntoIterator` 类型，包括 `Option` 和 `Result`:

```rust
let options = vec![Some(123), Some(321), None, Some(231)];
let flattened_options: Vec<_> = options.into_iter().flatten().collect();
assert_eq!(flattened_options, vec![123, 321, 231]);

let results = vec![Ok(123), Ok(321), Err(456), Ok(231)];
let flattened_results: Vec<_> = results.into_iter().flatten().collect();
assert_eq!(flattened_results, vec![123, 321, 231]);
```

展平一次只能删除一层嵌套：

```rust
fn main() {
    let arr = [
		[[1,1],[2,2]],
		[[3,3],[4,4]]
	];
 
    let iter = arr.iter();

    let res = iter.flatten();

    for item in res {
        println!("{:?}", item);
    }

    /*
		[1,1]
		[2,2]
		[3,3]
		[4,4]
    */
}0
```





### fuse

创建一个迭代器，该迭代器在第一个 `None`之后结束。

`fuse()` 适配了一个迭代器，确保在给定`None`之后，它将永远返回 `None`。

```rust
fn fuse(self) -> Fuse<Self>
where
    Self: Sized,
```

**返回值**：返回一个`Fuse`迭代器

```rust
// 一个在 Some 和 None 之间交替的迭代器
struct Alternate {
    state: i32,
}

impl Iterator for Alternate {
    type Item = i32;

    fn next(&mut self) -> Option<i32> {
        let val = self.state;
        self.state = self.state + 1;

        // 如果是偶数，则为 Some(i32)，否则为 None
        if val % 2 == 0 {
            Some(val)
        } else {
            None
        }
    }
}

let mut iter = Alternate { state: 0 };

// 我们可以看到我们的迭代器来回走动
assert_eq!(iter.next(), Some(0));
assert_eq!(iter.next(), None);
assert_eq!(iter.next(), Some(2));
assert_eq!(iter.next(), None);

// 然而，一旦我们 fuse 它...
let mut iter = iter.fuse();

assert_eq!(iter.next(), Some(4));
assert_eq!(iter.next(), None);

// 第一次之后它将始终返回 `None`。
assert_eq!(iter.next(), None);
assert_eq!(iter.next(), None);
assert_eq!(iter.next(), None);
```





### inspect

对迭代器中的每个元素应用一个闭包，并返回原迭代器本身，元素不变。

```rust
fn inspect<F>(self, f: F) -> Inspect<Self, F>
where
    Self: Sized,
    F: FnMut(&Self::Item),
```

**参数**：

- **f**：闭包函数，该函数无返回值，在该函数中可以访问当前迭代项

**返回值**：返回一个`Inspect`迭代器

```rust
fn main() {
    let v = [1, 2, 3];
    let iter = v.iter();
    let res = iter
        .inspect(|x| println!("before: {}", x))
        .map(|x| x * 2)
        .inspect(|x| println!("after: {}", x));

    for item in res{
		println!("{:?}", item);
	}

	/*
		before: 1
		after: 2
		2
		before: 2
		after: 4
		4
		before: 3
		after: 6
		6
	 */
}
```



### by_ref

可变引用的方式借用迭代器，使其可以继续被用于后续操作。

```rust
fn by_ref(&mut self) -> &mut Self
where
    Self: Sized,
```

**返回值**：返回迭代器本身的可变借用

```rust
let mut words = ["hello", "world", "of", "Rust"].into_iter();

// 以前两个单词为例。
let hello_world: Vec<_> = words.by_ref().take(2).collect();
assert_eq!(hello_world, vec!["hello", "world"]);

// 收集剩下的单词。
// 我们只能这样做，因为我们之前使用了 `by_ref`。
let of_rust: Vec<_> = words.collect();
assert_eq!(of_rust, vec!["of", "Rust"]);
```



### collect

将迭代器转换为集合。

`collect()` 可以将任何可迭代的东西变成一个相关的集合。 这是在各种上下文中使用的标准库中功能更强大的方法之一。

使用 `collect()` 的最基本模式是将一个集合转换为另一个集合。 您进行了一个收集，在其上调用 [`iter`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#tymethod.next)，进行了一堆转换，最后添加 `collect()`。

由于 `collect()` 非常通用，因此可能导致类型推断问题。 因此，`collect()` 是少数几次您会看到被亲切地称为 `turbofish`： `::<>` 的语法之一。 这有助于推理算法特别了解您要收集到的集合。

```rust
fn collect<B>(self) -> B
where
    B: FromIterator
```

**返回值**：返回一个集合

基本用法，注意使用`collect`要显示标注类型

```rust
fn main() {
    let v = [1, 2, 3];
    let iter = v.iter();

    let res: Vec<&i32> = iter.collect();

    println!("{:?}", res); // [1, 2, 3]
}
```

使用`turbofish`

```rust
let a = [1, 2, 3];

let doubled = a.iter().map(|x| x * 2).collect::<Vec<i32>>();

assert_eq!(vec![2, 4, 6], doubled);
```

因为 `collect()` 只关心您要收集的内容，所以您仍然可以将局部类型提示 `_` 与 turbfish 一起使用：

```rust
let a = [1, 2, 3];

let doubled = a.iter().map(|x| x * 2).collect::<Vec<_>>();

assert_eq!(vec![2, 4, 6], doubled);
```

使用 `collect()` 生成 `String`：

```rust
let chars = ['g', 'd', 'k', 'k', 'n'];

let hello: String = chars.iter()
    .map(|&x| x as u8)
    .map(|x| (x + 1) as char)
    .collect();

assert_eq!("hello", hello);
```

如果您有`Result`，您可以使用 `collect()` 来查看它们是否失败：

```rust
let results = [Ok(1), Err("nope"), Ok(3), Err("bad")];

let result: Result<Vec<_>, &str> = results.iter().cloned().collect();

// 给我们第一个错误
assert_eq!(Err("nope"), result);

let results = [Ok(1), Ok(3)];

let result: Result<Vec<_>, &str> = results.iter().cloned().collect();

// 给我们答案列表
assert_eq!(Ok(vec![1, 3]), result);
```



### try_collect

`nightly-only`

错误地将迭代器转换为集合，如果遇到失败就短路。

`try_collect()` 是 [`collect()`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.collect) 的变体，它允许在收集期间进行可能出错的转换。 它的主要用例是简化从产生 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 到 `Option<Collection<T>>` 的迭代器的转换，或者类似地用于其他 [`Try`](https://www.rustwiki.org.cn/zh-CN/std/ops/trait.Try.html) 类型 (例如 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html)).

重要的是，`try_collect()` 不需要外部 [`Try`](https://www.rustwiki.org.cn/zh-CN/std/ops/trait.Try.html) 类型也实现 [`FromIterator`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.FromIterator.html); 只有在 `Try::Output` 上产生的内部类型必须实现它。 具体来说，这意味着收集到 `ControlFlow<_, Vec<i32>>` 是有效的，因为 `Vec<i32>` 实现了 [`FromIterator`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.FromIterator.html)，即使 [`ControlFlow`](https://www.rustwiki.org.cn/zh-CN/std/ops/enum.ControlFlow.html) 没有实现。

另外，如果在 `try_collect()` 期间遇到失败，迭代器仍然有效，可以继续使用，在这种情况下，它将在触发失败的元素之后继续迭代。 有关其工作原理的示例，请参见下面的最后一个示例。

```rust
fn try_collect<B>(
    &mut self
) -> <<Self::Item as Try>::Residual as Residual<B>>::TryType
where
    Self: Sized,
    Self::Item: Try,
    <Self::Item as Try>::Residual: Residual<B>,
    B: FromIterator<<Self::Item as Try>::Output>,
```





### collect_into

`nightly-only`

将迭代器中的所有项收集到一个集合中。

此方法使用迭代器并将其所有项添加到传递的集合中。然后返回集合，因此调用链可以继续。

当您已经有了一个集合，并希望向其中添加迭代器项时，这很有用。

此方法是调用 [Extend::extend](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Extend.html) 的便捷方法，但不是在集合上调用，而是在迭代器上调用。

 ```rust
fn collect_into<E>(self, collection: &mut E) -> &mut E
where
    E: Extend<Self::Item>,
    Self: Sized,
 ```





### partition

消耗一个迭代器，从中创建两个集合。

根据谓词函数的返回值，把元素分到左集合(true)和右几何(false)中

```rust
fn partition<B, F>(self, f: F) -> (B, B)
where
    Self: Sized,
    B: Default + Extend<Self::Item>,
    F: FnMut(&Self::Item) -> bool,
```

**参数**：

- **f**：闭包函数，返回一个`bool`值，

**返回值**：返回一个元组，包含两个集合

- 第一个集合包含`f`函数返回`true`的迭代项
- 第一个集合包含`f`函数返回`false`的迭代项

```rust
fn main() {
    let v = [1, 2, 3, 4, 5];
    let iter = v.iter();

    let res: (Vec<&i32>, Vec<&i32>) = iter.partition(|item| *item % 2 == 0);

    println!("{:?}", res); // ([2, 4], [1, 3, 5])
}
```







### partition_in_place

`nightly-only`

根据给定的谓词，对迭代器的元素进行就地重新排序，以使所有返回 `true` 的元素都在所有返回 `false` 的元素之前。 返回找到的 `true` 元素的数量。

未维护分区项的相对顺序。

当前算法试图找到谓词计算结果为假的第一个元素和它计算结果为真的最后一个元素，并重复交换它们。

时间复杂度: *O*(*n*)

另请参见 [`is_partitioned()`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.is_partitioned) 和 [`partition()`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.partition)。

```rust
fn partition_in_place<'a, T, P>(self, predicate: P) -> usize
where
    T: 'a,
    Self: Sized + DoubleEndedIterator<Item = &'a mut T>,
    P: FnMut(&T) -> bool,
```



### is_partitioned

`nightly-only`

检查此迭代器的元素是否根据给定的谓词进行了分区，以便所有返回 `true` 的元素都在所有返回 `false` 的元素之前。

另请参见 [`partition()`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.partition) 和 [`partition_in_place()`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.partition_in_place)。

```rust
fn is_partitioned<P>(self, predicate: P) -> bool
    where Self: Sized,
       P: FnMut(Self::Item) -> bool
```



### fold

从一个初始值开始，依次把迭代器中的每个元素“累积”进去，最终得到一个值。

```rust
fn try_fold<B, F, R>(&mut self, init: B, f: F) -> R
where
    Self: Sized,
    F: FnMut(B, Self::Item) -> R,
    R: Try<Output = B>,
```

**参数**：

- **init**：累加器的初始值
- **f**：闭包函数，在此函数中可以访问累加器的`init`值，每次迭代后会把此函数的返回值赋值给`init`
  - 第一个参数为传入的`init`的值，在迭代后，会被`f`函数的返回值赋值

**返回值**：返回累加器的结果

```rust
fn main() {
    let v = [1, 2, 3, 4, 5];
    let iter = v.iter();

    let res = iter.fold(0, |init, item| {
        println!("{:?}", init); // 0, 1, 3, 6, 10

        init + *item
    });

    println!("{:?}", res); // 15
}
```

构建集合

```rust
let v: Vec<_> = iter.fold(Vec::new(), |mut acc, x| {
    acc.push(x);
    acc
});
```

字符串拼接

```rust
let s = words.fold(String::new(), |mut acc, w| {
    acc.push_str(w);
    acc.push(' ');
    acc
});
```

找最大值（不用 `max()`）

```rust
let max = iter.fold(i32::MIN, |acc, x| acc.max(x));
```





### try_fold

和`fold`一样，从一个初始值开始，依次把迭代器中的每个元素“累积”进去，最终得到一个值。

但是：**在累加过程中，如果某一步返回 `Err`或者`None`，则立即停止迭代并返回该错误；否则正常完成并返回最终累加值。**

```rust
fn try_fold<B, F, R>(&mut self, init: B, f: F) -> R
where
    Self: Sized,
    F: FnMut(B, Self::Item) -> R,
    R: Try<Output = B>,
```

**参数**：

- **init**：累加器的初始值
- **f**：闭包函数，在此函数中可以访问累加器的`init`值，每次迭代后会把此函数的返回值赋值给`init`
  - 第一个参数为传入的`init`的值，在迭代后，会被`f`函数的返回值赋值
  - 该函数需要返回一个`Result`或者`Option`

**返回值**：

- 若每次迭代，`f`都返回`Ok/Some`，则返回正常累加的值，并包含在`Ok/Some`中，
- 只要有一次迭代返回了`None/Err`，则该函数就返回响应的`None/Err`

正常情况下的迭代

```rust
fn main() {
    let v = [1, 2, 3, 4, 5];
    let mut iter = v.iter();
    
    let ok = iter.try_fold(0, |acc, x| {
        if x < &0 {
            Err("negative number")
        } else {
            Ok(acc + x)
        }
    });

    println!("{:?}", ok); // Ok(15)
}
```

若某此迭代返回了失败的结果

```rust
fn main() {
    let v = [1, 2, -1, 4, 5];
    let mut iter = v.iter();

    let ok = iter.try_fold(0, |acc, x| {
        if x < &0 {
            None
        } else {
            Some(acc + x)
        }
    });

    println!("{:?}", ok); // None
}
```

或者使用Result

```rust
fn main() {
    let v = [1, 2, -1, 4, 5];
    let mut iter = v.iter();

    let ok = iter.try_fold(0, |acc, x| {
        if x < &0 {
            Err("negative number")
        } else {
            Ok(acc + x)
        }
    });

    println!("{:?}", ok); // None
}
```





### try_for_each

对迭代器中的每个元素应用一个可能失败的闭包，一旦返回失败的结果，立即停止迭代并返回错误；否则在所有元素处理完后返回成功的结果。

也可以将其视为 `for_each()` 的错误形式或`try_fold()`的无状态版本。

```rust
fn try_for_each<F, R>(&mut self, f: F) -> R
where
    Self: Sized,
    F: FnMut(Self::Item) -> R,
    R: Try<Output = ()>,
```





### reduce

使用第一个元素作为初始累加值，然后依次将其余元素两两合并，最终返回合并结果；如果迭代器为空，则返回 None。

```rust
fn reduce<F>(self, f: F) -> Option<Self::Item>
where
    Self: Sized,
    F: FnMut(Self::Item, Self::Item) -> Self::Item,
```

**参数**：

- **f**：闭包函数
  - 第一个参为第一次为迭代器的第一个元素，后面的值由前一次f函数的返回值决定
  - 第二个参数第一次为迭代器的第二个元素，然后是第三、四......个元素，依次类推

**返回值**：返回`f`函数最后一次迭代完成后，第一个参数的值

```rust
fn main() {
    let iter = [1, 2, 3, 4].iter();

    let sum = iter.copied().reduce(|acc, x| {
        println!("{:?},{:?}", acc, x);
        /*
           1,2
           3,3
           6,4
        */
        acc + x
    });

    println!("{:?}", sum); // Some(10)
}
```





### try_reduce

`nightly-only`

通过重复应用 Reduce 操作，将元素归约为单个元素。 如果闭包返回失败，则失败会立即传播给调用者。

此方法的返回类型取决于闭包的返回类型。 如果闭包返回 `Result<Self::Item, E>`，那么这个函数将返回 `Result<Option<Self::Item>, E>`。 如果闭包返回 `Option<Self::Item>`，那么这个函数将返回 `Option<Option<Self::Item>>`。

当调用一个空的迭代器时，这个函数将返回 `Some(None)` 或 `Ok(None)` 取决于提供的闭包的类型。

对于至少有一个元素的迭代器，这本质上与使用迭代器的第一个元素作为初始累加器值调用 [`try_fold()`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.try_fold) 相同。

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



### all

用一个闭包判断迭代项是否符合条件

若全符合条件，则返回`true`

只要有一个不符合，就返回`false`

```rust
fn all<F>(&mut self, f: F) -> bool
    where Self: Sized,
       F: FnMut(Self::Item) -> bool
```

**参数**：

- **f**：闭包函数，需要返回一个`bool`值

**返回值**：由`f`函数的返回值决定

- 若所有每次迭代的`f`函数都返回`true`，则`all()`返回值`true`
- 只要有一次迭代的`f`函数返回`false`，那么就会停止迭代，并且`all()`返回`false`

```rust
fn main() {
    let mut iter = [2, 4, 6, 8, 10].iter();

    let res = iter.all(|item| *item % 2 == 0);

    println!("{:?}", res); // true
}
```

修改一下iter

```rust {2}
fn main() {
    let mut iter = [2, 4, 5, 8, 10].iter();

    let res = iter.all(|item| *item % 2 == 0);

    println!("{:?}", res); // false
}
```



### any

用一个闭包判断迭代项是否符合条件

只要有一个符合条件，就返回`true`

若全不符合条件，才返回`false`

```rust
fn all<F>(&mut self, f: F) -> bool
where
    Self: Sized,
    F: FnMut(Self::Item) -> bool,
```

**参数**：

- **f**：闭包函数，需要返回一个`bool`值

**返回值**：由`f`函数的返回值决定

- 当迭代时，只要有一次`f`函数返回`true`，`any()`返回值`true`，并且停止迭代
- 所有迭代中的`f`函数都返回`false`，`any`才会返回`false`

`true`示例

```rust
fn main() {
    let mut iter = [1, 2, -3, 4, 5].iter();

    let res = iter.any(|item| *item < 0);

    println!("{:?}", res); // true
}
```

`false`示例

```rust
fn main() {
    let mut iter = [-1, -2, -3, -4, -5].iter();

    let res = iter.any(|item| *item > 0);

    println!("{:?}", res); // false
}
```





### find

查找元素

若谓词函数返回true，则返回这个元素，包裹在`Some`中

只要谓词函数返回了`true`，就会停止迭代

```rust
fn find<P>(&mut self, predicate: P) -> Option<Self::Item>
where
    Self: Sized,
    P: FnMut(&Self::Item) -> bool,
```

**参数**：

- **predicate**：谓词函数，返回一个`bool`值

**返回值**：在迭代中，只要谓词函数返回了`true`，就会停止迭代，并返回当前返回`true`的这个迭代项，包裹在`Some`中

```rust
fn main() {
    let mut iter = [1, 2, 3, 4, 5].iter();

    let res = iter.find(|item| *item == &3);

    println!("{:?}", res); // Some(3)

    // 还可以继续迭代，获取后面的值
    println!("{:?}", iter.next()); // Some(4)
    println!("{:?}", iter.next()); // Some(5)
    println!("{:?}", iter.next()); // None
}
```







### find_map

闭包函数中需要返回一个`Option`，一旦返回`Some`，立即停止迭代

`iter.find_map(f)` 相当于 `iter.filter_map(f).next()`。

```rust
fn find_map<B, F>(&mut self, f: F) -> Option<B>
where
    Self: Sized,
    F: FnMut(Self::Item) -> Option<B>,
```

**参数**：

- **f**：闭包函数，返回一个`Option`值

**返回值**：在迭代中，只要谓词函数返回了`Some`，就会停止迭代，并返回当前这个迭代项，包裹在`Some`中

```rust
fn main() {
    let mut iter = [1, 2, -3, 4, 5].iter();

    let res = iter.find_map(|item| if *item < 0 { Some(item) } else { None });

    println!("{:?}", res); // Some(-3)

    // 还可以继续迭代，获取后面的值
    println!("{:?}", iter.next()); // Some(4)
    println!("{:?}", iter.next()); // Some(5)
    println!("{:?}", iter.next()); // None
}
```





### try_find

`nightly-only`

将函数应用于迭代器的元素，并返回第一个为 true 的结果或第一个错误。

此方法的返回类型取决于闭包的返回类型。 如果您从闭包中返回 `Result<bool, E>`，您将得到一个 `Result<Option<Self::Item>, E>`。 如果您从闭包中返回 `Option<bool>`，您会得到一个 `Option<Option<Self::Item>>`。

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





### position

在迭代器中搜索元素，并返回其索引。

```rust
fn position<P>(&mut self, predicate: P) -> Option<usize>
where
    Self: Sized,
    P: FnMut(Self::Item) -> bool,
```

**参数**：

- **predicate**：谓词函数，返回一个`bool`值。若迭代项为意向元素就返回`true`

**返回值**：返回一个`Option`，内包含被找到的迭代项的索引

```rust
fn main() {
    let mut iter = [1, 2, 3, 4, 5].iter();

    let res = iter.position(|item| item == &3);

    println!("{:?}", res); // Some(2)
}
```





### rposition

在迭代器中**从后往前**搜索元素，并返回其索引。

```rust
fn rposition<P>(&mut self, predicate: P) -> Option<usize>
where
    P: FnMut(Self::Item) -> bool,
    Self: Sized + ExactSizeIterator + DoubleEndedIterator,
```

**参数**：

- **predicate**：谓词函数，返回一个`bool`值。若迭代项为意向元素就返回`true`

**返回值**：返回一个`Option`，内包含被找到的迭代项的索引

```rust
fn main() {
    let mut iter = [1, 2, 3, 4, 5].iter();

    let res = iter.rposition(|item| item == &2);

    println!("{:?}", res); // Some(1)
}
```





### max

返回迭代器的最大元素。

如果几个元素最大相等，则返回最后一个元素。如果迭代器为空，则返回 `None`。

请注意，由于 `NaN` 不可比较，`f32/f64` 没有实现 Ord。 可以使用 `Iterator::reduce` 解决此问题：

注意`Self::Item`必须实现`Ord`

```rust
fn max(self) -> Option<Self::Item>
where
    Self: Sized,
    Self::Item: Ord,
```

**返回值**：返回一个`Option`，包含找到的最大的元素

```rust
fn main() {
    let iter = [26, 65, 15, 68, 48, 55].iter();

    let res = iter.max();

    println!("{:?}", res); // Some(68)
}
```





### min

返回迭代器的最小元素。

如果几个元素相等地最小，则返回第一个元素。 如果迭代器为空，则返回 `None`。

请注意，由于 `NaN` 不可比较，`f32/f64` 没有实现 Ord。 可以使用 `Iterator::reduce` 解决此问题：

注意`Self::Item`必须实现`Ord`

```rust
fn min(self) -> Option<Self::Item>
where
    Self: Sized,
    Self::Item: Ord,
```

**返回值**：返回一个`Option`，包含找到的最大的元素

```rust
fn main() {
    let iter = [26, 65, 15, 68, 48, 55].iter();

    let res = iter.min();

    println!("{:?}", res); // Some(15)
}
```



### max_by_key

提供一个闭包函数，闭包函数中参数为当前迭代项

按某个字段或计算结果挑出最大的元素

```rust
fn max_by_key<B, F>(self, f: F) -> Option<Self::Item>
where
    B: Ord,
    Self: Sized,
    F: FnMut(&Self::Item) -> B,
```

**参数**：

- **f**：闭包函数，需返回一个`Ord`

**返回值**：返回一个`Option`，包含找到的最大的元素

```rust
#[derive(Debug)]
struct Person {
    age: u8,
}

fn main() {
    let iter = [
        Person { age: 18 },
        Person { age: 21 },
        Person { age: 68 },
        Person { age: 53 },
        Person { age: 35 },
    ]
    .iter();

    let res = iter.max_by_key(|item| item.age);

    println!("{:?}", res); // Some(Person { age: 68 })
}
```





### max_by

在闭包函数中自定义比较规则，选出最大的一项

```rust
fn max_by<F>(self, compare: F) -> Option<Self::Item>
where
    Self: Sized,
    F: FnMut(&Self::Item, &Self::Item) -> Ordering,
```

**参数**：

- **f**：闭包函数，需返回一个`Ordering`

**返回值**：返回一个`Option`，包含找到的最大的元素

```rust
fn main() {
    let v = [1, 5, 3];

    let max = v.iter().max_by(|&a, &b| a.cmp(b));

    println!("{:?}", max); // Some(5)
}
```





### min_by_key

提供一个闭包函数，闭包函数中参数为当前迭代项

按某个字段或计算结果挑出最小的元素

```rust
fn min_by_key<B, F>(self, f: F) -> Option<Self::Item>
where
    B: Ord,
    Self: Sized,
    F: FnMut(&Self::Item) -> B,
```

**参数**：

- **f**：闭包函数，需返回一个`Ord`

**返回值**：返回一个`Option`，包含找到的最小的元素

```rust
#[derive(Debug)]
struct Person {
    age: u8,
}

fn main() {
    let iter = [
        Person { age: 18 },
        Person { age: 21 },
        Person { age: 68 },
        Person { age: 53 },
        Person { age: 35 },
    ]
    .iter();

    let res = iter.min_by_key(|item| item.age);

    println!("{:?}", res); // Some(Person { age: 18 })
}
```



### min_by

在闭包函数中自定义比较规则，选出最小的一项

```rust
fn min_by<F>(self, compare: F) -> Option<Self::Item>
where
    Self: Sized,
    F: FnMut(&Self::Item, &Self::Item) -> Ordering,
```

**参数**：

- **f**：闭包函数，需返回一个`Ordering`

**返回值**：返回一个`Option`，包含找到的最小的元素

```rust
fn main() {
    let v = [1, 5, 3];

    let max = v.iter().min_by(|&a, &b| a.cmp(b));

    println!("{:?}", max); // Some(1)
}
```



### rev

反转迭代器的方向。

通常，迭代器从左到右进行迭代。 使用 `rev()` 之后，迭代器将改为从右向左进行迭代。

仅在迭代器具有结束符的情况下才有可能，因此 rev() 仅适用于 DoubleEndedIterator。

```rust
fn rev(self) -> Rev<Self> 
where
    Self: Sized + DoubleEndedIterator,
```

**返回值**：返回一个`Rev`迭代器

```rust
fn main() {
    let v = [1, 2, 3, 4, 5];

    let res = v.iter().rev();

    for item in res {
        println!("{:?}", item);
    }
	/*
		5
		4
		3
		2
		1
	 */
}
```





### copied

创建一个迭代器，该迭代器将复制其所有元素。

当在 `&T` 上具有迭代器，但在 `T` 上需要迭代器时，此功能很有用。

```rust
fn copied<'a, T>(self) -> Copied<Self>
where
    T: 'a + Copy,
    Self: Sized + Iterator<Item = &'a T>,
```

**返回值**：返回一个`Copied`副本

```rust
fn main() {
    let iter = [1, 2, 3, 4, 5].iter();

    let copy_iter = iter.copied();

	println!("{:?}", copy_iter);  // Copied { it: Iter([1, 2, 3, 4, 5]) }

}
```



### cloned

创建一个迭代器，该迭代器将克隆所有元素。

当在 `&T` 上具有迭代器，但在 `T` 上需要迭代器时，此功能很有用。

没有任何关于 `clone` 方法实际上会被调用或优化掉的保证。 所以代码不应该依赖于任何一个。

```rust
fn cloned<'a, T>(self) -> Cloned<Self>
where
    T: 'a + Clone,
    Self: Sized + Iterator<Item = &'a T>,
```

**返回值**：返回一个`Cloned`副本

```rust
let a = [1, 2, 3];

let v_cloned: Vec<_> = a.iter().cloned().collect();

// 对于整数，cloneed 与 .map(|&x| x) 相同
let v_map: Vec<_> = a.iter().map(|&x| x).collect();

assert_eq!(v_cloned, vec![1, 2, 3]);
assert_eq!(v_map, vec![1, 2, 3]);
```

要获得最佳性能，请尝试延迟克隆:

```rust
let a = [vec![0_u8, 1, 2], vec![3, 4], vec![23]];
// 不要这样做：
let slower: Vec<_> = a.iter().cloned().filter(|s| s.len() == 1).collect();
assert_eq!(&[vec![23]], &slower[..]);
// 而是调用 `cloned` 延迟
let faster: Vec<_> = a.iter().filter(|s| s.len() == 1).cloned().collect();
assert_eq!(&[vec![23]], &faster[..]);
```





### cycle

不断循环重复的迭代器。

整个迭代器迭代完毕后，会从头开始重新遍历，永远不会停止循环

即使遇到`None`，也会继续循环

 ```rust
fn cycle(self) -> Cycle<Self>
where
    Self: Sized + Clone,
 ```

**返回值**：返回一个`Cycle`迭代器

```rust
let a = [1, 2, 3];

let mut it = a.iter().cycle();

assert_eq!(it.next(), Some(&1));
assert_eq!(it.next(), Some(&2));
assert_eq!(it.next(), Some(&3));
assert_eq!(it.next(), Some(&1));
assert_eq!(it.next(), Some(&2));
assert_eq!(it.next(), Some(&3));
assert_eq!(it.next(), Some(&1));
```



### array_chunks

一次返回迭代器的 `N` 个元素的迭代器。

块并不重叠。 如果 `N` 不除以迭代器的长度，那么最后的 `N-1` 元素将被省略，并且可以从迭代器的 [`.into_remainder()`](https://www.rustwiki.org.cn/zh-CN/std/iter/struct.ArrayChunks.html#method.into_remainder) 函数中检索。

如果 `N` 是 panic 0.

```rust
fn array_chunks<const N: usize>(self) -> ArrayChunks<Self, N>
where
    Self: Sized,
```

```rust
#![feature(iter_array_chunks)]

let mut iter = "lorem".chars().array_chunks();
assert_eq!(iter.next(), Some(['l', 'o']));
assert_eq!(iter.next(), Some(['r', 'e']));
assert_eq!(iter.next(), None);
assert_eq!(iter.into_remainder().unwrap().as_slice(), &['m']);
```



### sum

对迭代器的元素求和。

获取每个元素，将它们添加在一起，然后返回结果。

空的迭代器将返回该类型的零值。

`sum()` 可用于对任何实现 `Sum` 的类型求和，包括 `Option` 和 `Result`。

```rust
fn sum<S>(self) -> S
where
    Self: Sized,
    S: Sum<Self::Item>,
```

**返回值**：返回一个 `std::iter::Sum`

```rust
let a = [1, 2, 3];
let sum: i32 = a.iter().sum();

assert_eq!(sum, 6);
```

:::tip

当调用 `sum()` 并返回原始整数类型时，如果计算溢出并且启用了调试断言，则此方法将为 panic。

:::



### product

遍历整个迭代器，将所有元素相乘

空的迭代器将返回该类型的一个值。

`product()` 可用于乘以任何实现 `Product` 的类型，包括 `Option` 和 `Result`。

```rust
fn product<P>(self) -> P
where
    Self: Sized,
    P: Product<Self::Item>,
```

**返回值**：返回一个 `std::iter::Product`

```rust
fn factorial(n: u32) -> u32 {
    (1..=n).product()
}
assert_eq!(factorial(0), 1);
assert_eq!(factorial(1), 1);
assert_eq!(factorial(5), 120);
```





### cmp

逐个将`self`与另一个迭代器中的元素比较

逐个比较元素，一旦出现不等： 返回 `Less`或 `Greater`

如果一个迭代器先耗尽： 短的更小

同时耗尽且都相等： `Equal`

```rust
fn cmp<I>(self, other: I) -> Ordering
where
    I: IntoIterator<Item = Self::Item>,
    Self::Item: Ord,
    Self: Sized,
```

**参数**：

- **other**：需要比较的另一个迭代器

**返回值**：返回一个`Ordering`

- 若元素数相同：
  - 若两个比较的元素相等，就继续比较下一对，直到遇到两个不相等的元素，就返回`Less`或`Greater`
  - 若两个比较的一直相等，最后就返回`Equal`
- 若元素数不相同
  - 若两个比较的元素直到短的都到头了，都还是相等，那么谁短谁就是`Less`
  - 若短的迭代器还没有到头，就找到了不相等的两个元素，那么就直接返回`Less`或`Greater`

```rust
fn main() {
    println!("{:#?}", [1, 2, 3].iter().cmp([1, 2, 3].iter())); // Equal
    println!("{:#?}", [1, 3, 3].iter().cmp([1, 2, 3].iter())); // Greater 比到第二个元素就结束
	
    // [1,2]比[1, 2, 3]短，所以Less
    println!("{:#?}", [1, 2].iter().cmp([1, 2, 3].iter())); // Less   		
    
    // [1,2,3]比[1, 2]长，所以Greater
    println!("{:#?}", [1, 2, 3].iter().cmp([1, 2].iter())); // Greater		
}
```





### cmp_by

`nightly-only`

[字典顺序](https://www.rustwiki.org.cn/zh-CN/std/cmp/trait.Ord.html#lexicographical-comparison) 根据指定的比较函数将这个 [`Iterator`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html) 的元素与另一个 [`Iterator`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html) 的元素进行比较。

```rust
fn cmp_by<I, F>(self, other: I, cmp: F) -> Ordering
    where Self: Sized,
       I: IntoIterator,
       F: FnMut(Self::Item, <I as IntoIterator>::Item) -> Ordering
```



### partial_cmp

按字典序（lexicographically）比较两个迭代器，但使用的是 `PartialOrd`，因此结果可能是 `None`。

逐个比较元素，一旦出现不等： 返回 `Some(Less)`或 `Some(Greater)`

如果一个迭代器先耗尽： 短的更小

同时耗尽且都相等： `Some(Equal)`

**只要有一次比较返回 `None`**： 整体返回 `None`

```rust
fn partial_cmp<I>(self, other: I) -> Option<Ordering>
where
    I: IntoIterator,
    Self::Item: PartialOrd<<I as IntoIterator>::Item>,
    Self: Sized,
```

**参数**：

- **other**：需要比较的另一个迭代器

**返回值**：返回一个`Option<Ordering>`

```rust
fn main() {
    println!("{:?}", [1, 2, 3].iter().partial_cmp([1, 2, 3].iter())); // Some(Equal)
    println!("{:?}", [1, 3, 3].iter().partial_cmp([1, 2, 3].iter())); // Some(Greater)  

    println!("{:?}", [1, 2].iter().partial_cmp([1, 2, 3].iter())); // Some(Less)   		
    println!("{:?}", [1, 2, 3].iter().partial_cmp([1, 2].iter())); // Some(Greater		
}
```

出现 `None`的情况

```rust
let a = [1.0, f64::NAN];
let b = [1.0, 2.0];

let ord = a.iter().partial_cmp(b.iter());
// f64::NAN.partial_cmp(&2.0) == None
assert_eq!(ord, None);
```

任何一个元素比不了，整体就比不了



### partial_cmp_by

`nightly-only`

[字典顺序](https://www.rustwiki.org.cn/zh-CN/std/cmp/trait.Ord.html#lexicographical-comparison) 根据指定的比较函数将这个 [`Iterator`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html) 的元素与另一个 [`Iterator`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html) 的元素进行比较。

```rust
fn partial_cmp_by<I, F>(self, other: I, partial_cmp: F) -> Option<Ordering>
where
    Self: Sized,
    I: IntoIterator,
    F: FnMut(Self::Item, <I as IntoIterator>::Item) -> Option<Ordering>,
```



### eq

判断两个迭代器的元素是否相同

不仅比较长度，也比较相同索引的元素

```rust
fn eq<I>(self, other: I) -> bool
where
    I: IntoIterator,
    Self::Item: PartialEq<<I as IntoIterator>::Item>,
    Self: Sized,
```

**参数**：

- **other**：需要比较的另一个迭代器

**返回值**：根据比较的结果返回`bool`值

```rust
fn main() {
    println!("{:?}", [1, 2, 3].iter().eq([1, 2, 3].iter())); // true
    println!("{:?}", [1].iter().eq([1, 2].iter())); // false
    println!("{:?}", [1, 3].iter().eq([1, 2].iter())); // false
}
```







### eq_by

`nightly-only` 

关于指定的相等函数，确定 [`Iterator`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html) 的元素是否与另一个元素相等。

```rust
fn eq_by<I, F>(self, other: I, eq: F) -> bool
where
    Self: Sized,
    I: IntoIterator,
    F: FnMut(Self::Item, <I as IntoIterator>::Item) -> bool,
```



### ne

判断两个迭代器的元素是否不相同

不仅比较长度，也比较相同索引的元素

```rust
fn ne<I>(self, other: I) -> bool
where
    I: IntoIterator,
    Self::Item: PartialEq<<I as IntoIterator>::Item>,
    Self: Sized,
```

**参数**：

- **other**：需要比较的另一个迭代器

**返回值**：根据比较的结果返回`bool`值

```rust
fn main() {
    println!("{:?}", [1, 2, 3].iter().ne([1, 2, 3].iter())); // false
    println!("{:?}", [1].iter().ne([1, 2].iter())); // true
    println!("{:?}", [1, 3].iter().ne([1, 2].iter())); // true
}
```



### lt

判断self是否比另一个迭代器的元素**数量少**

```rust
fn lt<I>(self, other: I) -> bool
where
    I: IntoIterator,
    Self::Item: PartialOrd<<I as IntoIterator>::Item>,
    Self: Sized,
```

**参数**：

- **other**：需要比较的另一个迭代器

**返回值**：根据比较的结果返回`bool`值

```rust
fn main() {
    println!("{:?}", [1, 2, 3].iter().lt([1, 2, 3].iter())); // false
    println!("{:?}", [1].iter().lt([1, 2].iter())); // true
    println!("{:?}", [1, 3].iter().lt([1, 2].iter())); // false
}
```



### le

和另一个迭代器逐个比较元素，判断是否**小于等于**另一个迭代器

一旦发现 `<`或 `>`： 立即返回结果

如果一个先耗尽： 短的更小

同时耗尽： 相等

```rust
fn le<I>(self, other: I) -> bool
where
    I: IntoIterator,
    Self::Item: PartialOrd<<I as IntoIterator>::Item>,
    Self: Sized,
```

**参数**：

- **other**：需要比较的另一个迭代器

**返回值**：根据比较的结果返回`bool`值

```rust
assert_eq!([1].iter().le([1].iter()), true);
assert_eq!([1].iter().le([1, 2].iter()), true);
assert_eq!([1, 2].iter().le([1].iter()), false);
assert_eq!([1, 2].iter().le([1, 2].iter()), true);
```







### gt

和另一个迭代器逐个比较元素，判断是否**大于**另一个迭代器

一旦发现 `<`或 `>`： 立即返回结果

如果一个先耗尽： 短的更小

同时耗尽： 相等

```rust
fn gt<I>(self, other: I) -> bool
where
    I: IntoIterator,
    Self::Item: PartialOrd<<I as IntoIterator>::Item>,
    Self: Sized,
```

**参数**：

- **other**：需要比较的另一个迭代器

**返回值**：根据比较的结果返回`bool`值

```rust
fn main() {
    println!("{:?}", [1, 2, 3].iter().gt([1, 2, 3].iter())); // false
    println!("{:?}", [1].iter().gt([1, 2].iter())); // false
    println!("{:?}", [1, 3].iter().gt([1, 2].iter())); // true
    println!("{:?}", [1, 2].iter().gt([1].iter())); // true
}
```



### ge

和另一个迭代器逐个比较元素，判断是否**大于等于**另一个迭代器

一旦发现 `<`或 `>`： 立即返回结果

如果一个先耗尽： 短的更小

同时耗尽： 相等

  ```rust
fn ge<I>(self, other: I) -> bool
where
    I: IntoIterator,
    Self::Item: PartialOrd<<I as IntoIterator>::Item>,
    Self: Sized,
  ```

**参数**：

- **other**：需要比较的另一个迭代器

**返回值**：根据比较的结果返回`bool`值

```rust
fn main() {
    println!("{:?}", [1, 2, 3].iter().ge([1, 2, 3].iter())); // true
    println!("{:?}", [1].iter().ge([1, 2].iter())); // false
    println!("{:?}", [1, 3].iter().ge([1, 2].iter())); // true
    println!("{:?}", [1, 2].iter().ge([1].iter())); // true
}
```



### is_sorted

`nightly-only` 

检查此迭代器的元素是否已排序。

也就是说，对于每个元素 `a` 及其后续元素 `b`，`a <= b` 必须成立。如果迭代器的结果恰好为零或一个元素，则返回 `true`。

请注意，如果 `Self::Item` 仅是 `PartialOrd`，而不是 `Ord`，则上述定义意味着，如果任何两个连续的项都不具有可比性，则此函数将返回 `false`。

```rust
fn is_sorted(self) -> bool
where
    Self: Sized,
    Self::Item: PartialOrd<Self::Item>,
```

**返回值**：根据是否排序返回bool值

```rust
#![feature(is_sorted)]

assert!([1, 2, 2, 9].iter().is_sorted());
assert!(![1, 3, 2, 4].iter().is_sorted());
assert!([0].iter().is_sorted());
assert!(std::iter::empty::<i32>().is_sorted());
assert!(![0.0, 1.0, f32::NAN].iter().is_sorted());
```



### is_sorted_by

`nightly-only` 

检查此迭代器的元素是否使用给定的比较器函数进行排序。

该函数使用给定的 `compare` 函数来确定两个元素的顺序，而不是使用 `PartialOrd::partial_cmp`。 除此之外，它等效于 [`is_sorted`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.is_sorted)。有关更多信息，请参见其文档。

```rust
fn is_sorted_by<F>(self, compare: F) -> bool
where
    Self: Sized,
    F: FnMut(&Self::Item, &Self::Item) -> Option<Ordering>,
```

**返回值**：根据是否排序返回bool值

```rust
#![feature(is_sorted)]

assert!([1, 2, 2, 9].iter().is_sorted_by(|a, b| a.partial_cmp(b)));
assert!(![1, 3, 2, 4].iter().is_sorted_by(|a, b| a.partial_cmp(b)));
assert!([0].iter().is_sorted_by(|a, b| a.partial_cmp(b)));
assert!(std::iter::empty::<i32>().is_sorted_by(|a, b| a.partial_cmp(b)));
assert!(![0.0, 1.0, f32::NAN].iter().is_sorted_by(|a, b| a.partial_cmp(b)));
```



### is_sorted_by_key

`nightly-only` 

```rust
fn is_sorted_by_key<F, K>(self, f: F) -> bool
where
    Self: Sized,
    F: FnMut(Self::Item)
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



