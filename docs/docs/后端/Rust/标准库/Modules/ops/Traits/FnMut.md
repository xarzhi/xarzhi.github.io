# Trait std::ops::FnMut

返回一个闭包函数实例，可以捕获外界作用域中的变量的可变引用

```rust
pub trait FnMut<Args>: FnOnce<Args>
where
    Args: Tuple,
{
    // Required method
    extern "rust-call" fn call_mut(
        &mut self,
        args: Args
    ) -> Self::Output;
}
```

调用可变捕获闭包

```rust
let mut x = 5;
{
    let mut square_x = || x *= x;
    square_x();
}
assert_eq!(x, 25);
```

使用 FnMut 参数

```rust
fn do_twice<F>(mut func: F)
    where F: FnMut()
{
    func();
    func();
}

let mut x: usize = 1;
{
    let add_two_to_x = || x += 2;
    do_twice(add_two_to_x);
}

assert_eq!(x, 5);
```



## Required Methods

### call_mut

执行调用操作。

```rust
extern "rust-call" fn call_mut(&mut self, args: Args) -> Self::Output
```



## Implementors

### impl<A, F> FnMut\<A> for &F

```rust
impl<A, F> FnMut<A> for &F
where
  A: Tuple,
  F: Fn<A> + ?Sized,
```



### impl<A, F> FnMut\<A> for &mut F

```rust
impl<A, F> FnMut<A> for &mut F
where
  A: Tuple,
  F: FnMut<A> + ?Sized,
```



### impl<Args, F, A> FnMut\<Args> for Box<F, A>

```rust
impl<Args, F, A> FnMut<Args> for Box<F, A>
where
  Args: Tuple,
  F: FnMut<Args> + ?Sized,
  A: Allocator,