# Trait std::ops::Try

`?` 运算符和 `try {}` 块。

`try_*` 方法通常涉及实现此 trait 的类型。例如，传递给 `Iterator::try_fold` 和 `Iterator::try_for_each` 的闭包必须返回这样的类型。

`Try` 类型通常是那些包含两个或更多类别值的类型，其中一些子集通常通过早期返回处理，因此值得提供一个简洁 (但仍然可见) 的语法来简化它。

这在 `Result` 和 `Option` 的错误处理中最常见。 这个 `trait` 的典型实现是在 `ControlFlow` 上。

```rust
pub trait Try: FromResidual<Self::Residual> {
    type Output;
    type Residual;

    // Required methods
    fn from_output(output: Self::Output) -> Self;
    fn branch(self) -> ControlFlow<Self::Residual, Self::Output>;
}
```



在泛型代码中使用 Try

`Iterator::try_fold` 在 Rust 1.27 中稳定到调用，但是这个 trait 更新很多。为了说明各种关联类型和方法，让我们实现我们自己的版本。

提醒一下，一个可靠的折叠版本看起来像这样：

```rust
fn simple_fold<A, T>(
    iter: impl Iterator<Item = T>,
    mut accum: A,
    mut f: impl FnMut(A, T) -> A,
) -> A {
    for x in iter {
        accum = f(accum, x);
    }
    accum
}
```

因此，不是 `f` 只返回一个 `A`，我们需要它返回一些在不要短路路径中产生一个 `A` 的其他类型。 方便的是，这也是我们需要从函数返回的类型。

让我们为该类型添加一个新的泛型参数 `R`，并将其绑定到我们想要的输出类型：

```rust
fn simple_try_fold_1<A, T, R: Try<Output = A>>(
    iter: impl Iterator<Item = T>,
    mut accum: A,
    mut f: impl FnMut(A, T) -> R,
) -> R {
    todo!()
}
```

如果我们遍历整个迭代器，我们需要使用 [`Try::from_output`](https://www.rustwiki.org.cn/zh-CN/std/ops/trait.Try.html#tymethod.from_output) 将累加器包装成返回类型：

```rust
fn simple_try_fold_2<A, T, R: Try<Output = A>>(
    iter: impl Iterator<Item = T>,
    mut accum: A,
    mut f: impl FnMut(A, T) -> R,
) -> R {
    for x in iter {
        let cf = f(accum, x).branch();
        match cf {
            ControlFlow::Continue(a) => accum = a,
            ControlFlow::Break(_) => todo!(),
        }
    }
    R::from_output(accum)
}
```

我们还需要 [`FromResidual::from_residual`](https://www.rustwiki.org.cn/zh-CN/std/ops/trait.FromResidual.html#tymethod.from_residual) 将 residual 恢复为原始类型。但因为它是 `Try` 的一个 super trait，所以我们不必在界限内提及它。 所有实现 `Try` 的类型都可以从它们对应的 residual 中重新创建，所以我们将调用它：

```rust
pub fn simple_try_fold_3<A, T, R: Try<Output = A>>(
    iter: impl Iterator<Item = T>,
    mut accum: A,
    mut f: impl FnMut(A, T) -> R,
) -> R {
    for x in iter {
        let cf = f(accum, x).branch();
        match cf {
            ControlFlow::Continue(a) => accum = a,
            ControlFlow::Break(r) => return R::from_residual(r),
        }
    }
    R::from_output(accum)
}
```

但是这个 “调用`branch`，然后在它上面进行 `match`，如果它是 `Break`，则 `return`” 正是在 `?` 操作符内部发生的事情。因此，我们可以使用 `?` 代替手动完成所有这些操作：

```rust
fn simple_try_fold<A, T, R: Try<Output = A>>(
    iter: impl Iterator<Item = T>,
    mut accum: A,
    mut f: impl FnMut(A, T) -> R,
) -> R {
    for x in iter {
        accum = f(accum, x)?;
    }
    R::from_output(accum)
}
```



## Required Associated Types

### Output

当不短路时，`?` 产生的值的类型。

```rust
type Output
```



### Residual

短路时作为 `?` 的一部分传递给 `FromResidual::from_residual` 的值的类型。

这表示 `Self` 类型的可能值，而不是 `Output` 类型所表示的值。

```rust
type Residual
```

:::tip

这种类型的选择对于相互转化至关重要。 与 `Output` 类型不同，它通常是原始泛型类型，这种类型通常是某种类型的 newtype 到 “color” 类型，以便与其他类型的 residual 区别开来。

这就是为什么 `Result<T, E>::Residual` 不是 `E`，而是 `Result<Infallible, E>`。 例如，这样它就不同于 `ControlFlow<E>::Residual`，因此 `ControlFlow` 上的 `?` 不能用于返回 `Result` 的方法中。

如果您正在创建实现 `Try<Output = T>` 的泛型 `Foo<T>`，那么通常您可以使用 `Foo<std::convert::Infallible>` 作为它的 `Residual` 类型：该类型将在正确位置有一个 “hole”，并将保留 residual 的 “foo-ness”，因此其他类型需要选择加入到相互转换中。

:::





## Required Methods

### from_output

从它的 `Output` 类型构造类型。

这应该与 `branch` 方法一致地实现，以便应用 `?` 运算符将返回原始值: `Try::from_output(x).branch() --> ControlFlow::Continue(x)`。

```rust
fn from_output(output: Self::Output) -> Self
```



```rust
#![feature(try_trait_v2)]
use std::ops::Try;

assert_eq!(<Result<_, String> as Try>::from_output(3), Ok(3));
assert_eq!(<Option<_> as Try>::from_output(4), Some(4));
assert_eq!(
    <std::ops::ControlFlow<String, _> as Try>::from_output(5),
    std::ops::ControlFlow::Continue(5),
);

assert_eq!(Option::from_output(4)?, 4);

// 例如，这用于 `try_fold` 中的累加器：
let r = std::iter::empty().try_fold(4, |_, ()| -> Option<_> { unreachable!() });
assert_eq!(r, Some(4));
```



### branch

在 `?` 来决定操作符是应该生成一个值 (因为它返回了 `ControlFlow::Continue`)，还是将一个值传播回调用者 (因为它返回了 `ControlFlow::Break`)。

```rust
fn branch(self) -> ControlFlow<Self::Residual, Self::Output>
```



```rust
#![feature(try_trait_v2)]
use std::ops::{ControlFlow, Try};

assert_eq!(Ok::<_, String>(3).branch(), ControlFlow::Continue(3));
assert_eq!(Err::<String, _>(3).branch(), ControlFlow::Break(Err(3)));

assert_eq!(Some(3).branch(), ControlFlow::Continue(3));
assert_eq!(None::<String>.branch(), ControlFlow::Break(None));

assert_eq!(ControlFlow::<String, _>::Continue(3).branch(), ControlFlow::Continue(3));
assert_eq!(
    ControlFlow::<_, String>::Break(3).branch(),
    ControlFlow::Break(ControlFlow::Break(3)),
);
```





## Implementors



### impl<B, C> Try for ControlFlow<B, C>



### impl\<T> Try for Option\<T>



### impl<T, E> Try for Result<T, E>



### impl<T, E> Try for Poll<Option<Result<T, E>>>



### impl<T, E> Try for Poll<Result<T, E>>