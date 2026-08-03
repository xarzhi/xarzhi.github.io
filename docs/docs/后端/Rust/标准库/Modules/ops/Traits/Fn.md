# Trait std::ops::Fn

返回一个闭包函数实例，可以捕获外界作用域中的变量

```rust
pub trait Fn<Args>: FnMut<Args>
where
    Args: Tuple,
{
    // Required method
    extern "rust-call" fn call(&self, args: Args) -> Self::Output;
}
```

此外，对于实现 `Fn` 的任何类型 `F`，`&F` 也实现了 `Fn`。

由于 `FnMut` 和 `FnOnce` 都是 `Fn` 的 `supertraits`，因此 `Fn` 的任何实例都可以用作参数，其中需要 `FnMut` 或 `FnOnce`。

当您要接受类似函数类型的参数并且需要反复调用且不改变状态 (例如，同时调用它) 时，请使用 `Fn` 作为绑定。 如果不需要严格的要求，请使用 `FnMut` 或 `FnOnce` 作为界限。

有关此主题的更多信息，请参见 Rust 编程语言 中关于闭包的章节。

还要注意的是 Fn traits 的特殊语法 (例如 Fn(usize, bool) -> usize)。



调用一个闭包

```rust
let square = |x| x * x;

assert_eq!(square(5), 25);
```

使用 Fn 参数

```rust
fn call_with_one<F>(func: F) -> usize
    where F: Fn(usize) -> usize {
    func(1)
}

let double = |x| x * 2;
assert_eq!(call_with_one(double), 2);
```



## Required Methods

### call

`nightly-only`

执行调用操作。

```rust
extern "rust-call" fn call(&self, args: Args) -> Self::Output
```



## Implementors

### impl<A, F> Fn\<A> for &F

```rust
impl<A, F> Fn<A> for &F
where
  A: Tuple,
  F: Fn<A> + ?Sized,
```



### impl<Args, F, A> Fn\<Args> for Box<F, A>

```rust
impl<Args, F, A> Fn<Args> for Box<F, A>
where
  Args: Tuple,
  F: Fn<Args> + ?Sized,
  A: Allocator,
