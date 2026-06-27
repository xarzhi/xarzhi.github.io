# Module std::iter

- `Traits`是核心部分：这些 traits 定义了存在什么样的迭代器，以及您可以用它们做什么。这些 traits 的方法值得投入一些额外的学习时间。
- `Functions` 提供了一些有用的方法来创建一些基本的迭代器。
- `Structs`通常是该模块的 `traits` 上各种方法的返回类型。通常，您将需要查看创建 `struct` 的方法，而不是 `struct` 本身。



## Iterator

该模块的核心是 `Iterator` trait。`Iterator` 的核心是这样的：

```rust
trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;
}
```

基本上每个语言的迭代器都是如此的结构

`Item`代表当前迭代项

调用`next()`函数可以获取下一个迭代项，并返回一个`Option<Item>`，如果全部迭代完成，再次调用`next`将会返回`None`





## 三种迭代形式

有三种常见的方法可以从集合中创建迭代器：

- `iter()`，它在 `&T` 上迭代。
- `iter_mut()`，它在 `&mut T` 上迭代。
- `into_iter()`，它在 `T` 上迭代。

在适当的情况下，标准库中的各种内容都可以实现这三个中的一个或多个。





## 实现迭代器

创建自己的迭代器涉及两个步骤：创建一个 `struct` 来保存迭代器的状态，然后为该 `struct` 实现 `Iterator`。 这就是为什么此模块中有这么多 `struct` 的原因：每个迭代器和迭代器适配器都有一个。

让我们创建一个名为 `Counter` 的迭代器，该迭代器的范围从 `1` 到 `5`：

```rust
// 首先，结构体：

/// 从 1 到 5 计数的迭代器
struct Counter {
    count: usize,
}

// 我们希望计数从一开始，所以让我们添加一个 new() 方法来提供帮助。
// 这不是严格必要的，但很方便。
// 请注意，我们将 `count` 从零开始，我们将在下面的 `next () ` 实现中看到其原因。
impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}

// 然后，我们为 `Counter` 实现 `Iterator`：

impl Iterator for Counter {
    // 我们将使用 usize 进行计数
    type Item = usize;

    // next() 是唯一必需的方法
    fn next(&mut self) -> Option<Self::Item> {
        // 增加我们的数量。这就是为什么我们从零开始。
        self.count += 1;

        // 检查我们是否已经完成计数。
        if self.count < 6 {
            Some(self.count)
        } else {
            None
        }
    }
}

// 现在我们可以使用它了！

let mut counter = Counter::new();

assert_eq!(counter.next(), Some(1));
assert_eq!(counter.next(), Some(2));
assert_eq!(counter.next(), Some(3));
assert_eq!(counter.next(), Some(4));
assert_eq!(counter.next(), Some(5));
assert_eq!(counter.next(), None);
```

以这种方式调用 [`next`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#tymethod.next) 将重复进行。Rust 有一个构造，可以在迭代器上调用 [`next`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#tymethod.next)，直到它到达 `None`。让我们接下来讨论。

还要注意，`Iterator` 提供了内部调用 `next` 的方法的默认实现，例如 `nth` 和 `fold`。 但是，如果迭代器可以在不调用 `next` 的情况下更有效地计算它们，则还可以编写方法的自定义实现，例如 `nth` 和 `fold`。



## for循环和IntoIterator

Rust 的 `for` 循环语法实际上是迭代器的语法糖。这是 `for` 的一个基本示例：

```rust
let values = vec![1, 2, 3, 4, 5];

for x in values {
    println!("{x}");
}
```

这将打印数字 1 到 5，每个数字都在各自的行上。但是您会在这里注意到：我们从未在 vector 上调用任何东西来产生迭代器。是什么给的？

标准库中有一个 trait 用于将某些内容转换为迭代器: `IntoIterator`。 这个 trait 具有一个 `into_iter` 方法，该方法可以将实现 `IntoIterator` 的类型转换为迭代器。 让我们再次看一下 `for` 循环，以及编译器将其转换为什么：

```rust
let values = vec![1, 2, 3, 4, 5];
{
    let result = match IntoIterator::into_iter(values) {
        mut iter => loop {
            let next;
            match iter.next() {
                Some(val) => next = val,
                None => break,
            };
            let x = next;
            let () = { println!("{x}"); };
        },
    };
    result
}
```

首先，我们在值上调用 `into_iter()`。然后，我们在返回的迭代器上进行匹配，一遍又一遍地调用 [`next`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#tymethod.next)，直到我们看到一个 `None`。 到那时，我们 `break` 退出了循环，我们已经完成了迭代。

这里还有一点微妙之处：标准库包含一个有趣的 `IntoIterator` 实现：

```rust
impl<I: Iterator> IntoIterator for I
```

换句话说，所有`Iterator`都通过返回自身来实现 `IntoIterator`。这意味着两件事：

1. 如果要编写 `Iterator`，则可以将其与 `for` 循环一起使用。
2. 如果要创建集合，则为其实现 `IntoIterator`将使您的集合可以与 `for` 循环一起使用。



## 通过引用进行迭代

由于 `into_iter()`将 `self` 作为值，因此使用 `for` 循环遍历一个集合将消耗该集合。通常，您可能需要迭代一个集合而不使用它。 许多集合提供了在引用上提供迭代器的方法，通常分别称为 `iter()` 和 `iter_mut()`：

```rust
let mut values = vec![41];
for x in values.iter_mut() {
    *x += 1;
}
for x in values.iter() {
    assert_eq!(*x, 42);
}
assert_eq!(values.len(), 1); // `values` 仍然属于此函数。
```

如果集合类型 `C` 提供 `iter()`，则它通常还为 `&C` 实现 `IntoIterator`，而该实现只是调用 `iter()`。 同样，提供 `iter_mut()` 的集合 `C` 通常通过委派给 `iter_mut()` 来为 `&mut C` 实现 `IntoIterator`。这样可以方便快捷地实现以下目的：

```rust
let mut values = vec![41];
for x in &mut values { // 与 `values.iter_mut()` 相同
    *x += 1;
}
for x in &values { // 与 `values.iter()` 相同
    assert_eq!(*x, 42);
}
assert_eq!(values.len(), 1);
```

尽管许多集合都提供 `iter()`，但并非所有人都提供 `iter_mut()`。 例如，如果 key 的哈希发生变化，更改 [`HashSet`](https://www.rustwiki.org.cn/zh-CN/std/collections/struct.HashSet.html) 的键可能会使集合处于不一致的状态，因此这个集合仅提供 `iter()`。





## 迭代器适配器

接受一个 `Iterator`并返回另一个`Iterator`的函数通常被称为迭代器适配器，因为它们是适配器模式的一种形式。

常见的迭代器适配器包括 [`map`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.map)，[`take`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.take) 和 [`filter`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.filter)。 有关更多信息，请参见它们的文档。

如果迭代器适配器为 panics，则迭代器将处于未指定 (但内存安全) 状态。 也不能保证此状态在 Rust 的各个版本中都保持不变，因此您应避免依赖 panicked 的迭代器返回的确切值。





## 惰性初始化

迭代器 (和迭代器 [适配器](https://www.rustwiki.org.cn/zh-CN/std/iter/index.html#adapters)) 是懒惰的)。这意味着仅仅创建一个迭代器并不会做很多事情。除非您调用 [`next`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#tymethod.next)，否则什么都不会发生。 当创建仅出于其副作用的迭代器时，这有时会引起混乱。 例如，[`map`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.map) 方法在其迭代的每个元素上调用一个闭包：

```rust
let v = vec![1, 2, 3, 4, 5];
v.iter().map(|x| println!("{x}"));
```

这将不会打印任何值，因为我们只是创建了一个迭代器，而不是使用它。编译器将警告我们这种行为：

```text
warning: unused result that must be used: iterators are lazy and
do nothing unless consumed
```

编写 [`map`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.map) 的副作用的惯用方式是使用 `for` 循环或调用 [`for_each`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.for_each) 方法：

```rust
let v = vec![1, 2, 3, 4, 5];

v.iter().for_each(|x| println!("{x}"));
// or
for x in &v {
    println!("{x}");
}
```

评估迭代器的另一种常见方法是使用 [`collect`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.collect) 方法来生成新的集合。







## 无限性

迭代器不必一定是有限的。例如，开放式范围是一个无限迭代器：

```rust
let numbers = 0..;
```

通常使用 [`take`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.take) 迭代器适配器将无限迭代器转换为有限迭代器：

```rust
let numbers = 0..;
let five_numbers = numbers.take(5);

for number in five_numbers {
    println!("{number}");
}
```

这将在各自的行上打印数字 `0` 至 `4`。

请记住，无限迭代器上的方法，即使是可以在有限时间内通过数学方法确定结果的方法，也可能不会终止。 具体来说，通常需要遍历迭代器中每个元素的方法 (如 [`min`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.min)) 对于任何无限迭代器都可能不会成功返回。

```rust
let ones = std::iter::repeat(1);
let least = ones.min().unwrap(); // 不好了！ 无限循环！
// `ones.min()` 会导致无限循环，所以我们不会达到这一点！
println!("The smallest number one is {least}.");
```



## Structs

ArrayChunks`Experimental`：一次遍历迭代器的 N 个元素的迭代器。

ByRefSized：与 Iterator::by_ref 类似，但需要 Sized 才能转发泛型。

Intersperse`Experimental`：在所有元素之间放置分隔符的迭代器适配器。

IntersperseWith`Experimental`：在所有元素之间放置分隔符的迭代器适配器。

Chain：链中将两个迭代器链接在一起的迭代器。

Cloned：一个可以克隆底层迭代器元素的迭代器。

Copied：一个可以复制底层迭代器元素的迭代器。

Cycle：无限重复的迭代器。

Empty：没有任何结果的迭代器。

Enumerate：一个在迭代过程中产生当前计数和元素的迭代器。

Filter：一个用 predicate 过滤 iter 元素的迭代器。

FilterMap：一个使用 f 来过滤 iter 中的元素和 map 元素的迭代器。

FlatMap：将每个元素映射到迭代器的迭代器，并生成生成的迭代器的元素。

Flatten：一个迭代器，它使可迭代化的事物的迭代器中的嵌套层次变得平坦。

FromFn：一个迭代器，每次迭代调用提供的闭包 `F: FnMut() -> Option<T>`。

Fuse：一个迭代器，在底层迭代器产生一次 None 之后，永远产生 None。

Inspect：一个迭代器，在产生该迭代器之前，会对每个元素调用带有引用的函数。

Map：将 iter 的值与 f 映射的迭代器。

MapWhile：一个仅在 predicate 返回 Some(_) 时才接受元素的迭代器。

Once：一个仅产生一次元素的迭代器。

OnceWith：通过应用提供的闭包 F: FnOnce() -> A 产生类型为 A 的单个元素的迭代器。

Peekable：带有 peek() 的迭代器，该迭代器将可选的引用返回到下一个元素。

Repeat：一个无限重复元素的迭代器。

RepeatWith：一个迭代器，通过应用提供的闭包 F: FnMut() -> A，无限地重复 A 类型的元素。

Rev：方向相反的双端迭代器。

Scan：一个迭代器，用于在迭代另一个迭代器时维持状态。

Skip：一个跳过 iter 的 n 元素的迭代器。

SkipWhile：predicate 返回 true 时拒绝元素的迭代器。

StepBy：一个用于按自定义数量步进迭代器的迭代器。

Successors：一个新的迭代器，其中每个连续项都是根据前一个进行计算的。

Take：一个仅迭代 iter 的前 n 迭代的迭代器。

TakeWhile：一个仅在 predicate 返回 true 时才接受元素的迭代器。

Zip：同时迭代其他两个迭代器的迭代器。



## Traits

Step `Experimental`：具有 successor 和 predecessor 操作概念的对象。

TrustedLen `Experimental`：一个使用 size_hint 报告准确长度的迭代器。

TrustedStep `Experimental`：一种支持 Step 的所有不变量的类型。

DoubleEndedIterator：一个能够从两端产生元素的迭代器。

ExactSizeIterator：知道其确切长度的迭代器。

Extend：用迭代器的内容扩展集合。

FromIterator：从 Iterator 转换。

FusedIterator：一个迭代器，用完后总是继续产生 None。

IntoIterator：转换为 Iterator。

Iterator：用于处理迭代器的 trait。

Product：一个表示可以通过将迭代器的元素相乘来创建类型的 trait。

Sum：一个表示可以通过对迭代器求和来创建的类型的 trait。



## Functions

from_generator`Experimental`：创建一个新的迭代器，每次迭代都调用提供的生成器。

empty：创建一个不产生任何结果的迭代器。

from_fn：创建一个新的迭代器，每次迭代都调用提供的闭包 `F: FnMut() -> Option<T>`。

once：创建一个迭代器，该迭代器只生成一次元素。

once_with：创建一个迭代器，该迭代器通过调用提供的闭包来懒惰地一次生成一个值。

repeat：创建一个新的迭代器，该迭代器不断重复单个元素。

repeat_with：创建一个新的迭代器，通过应用提供的闭包，转发器 F: FnMut() -> A，无限地重复 A 类型的元素。

successors：创建一个新的迭代器，在该迭代器的基础上，每个连续项都根据前一个进行计算。

zip：将参数转换为迭代器并压缩它们。



