# Trait std::ops::FnOnce

返回一个闭包函数实例，**只可以被运行一次**

**在闭包函数内使用外部的变量，会获取其所有权**

`FnOnce`的函数会消耗其捕获的变量

```rust
pub trait FnOnce<Args>
where
    Args: Tuple,
{
    type Output;

    // Required method
    extern "rust-call" fn call_once(self, args: Args) -> Self::Output;
}
```

`FnOnce`通常被当作函数参数的类型

```rust
fn once_test<F: FnOnce() -> String>(func: F) {
    println!("{}", func());
    // 后面func不能再调用，因为是FnOnce类型只能调用一次
}

fn main() {
    let x = String::from("x");

    once_test(|| x);
    // println!("{:#?}", x); 报错，x已被移动

    once_test(|| "asd".to_string());
}
```

作为函数的返回值，返回一个闭包函数

```rust
fn make_closure() -> impl FnOnce() -> String {
    let s = String::from("hello");
    move || s
}
```

也可以直接给一个变量赋值一个`FnOnce`实例，不过要复合相应的条件

1.在闭包里 `drop` 掉捕获的值

```rust
fn main() {
    let s = String::from("hello");

    // move 把 s 的所有权拿进来，drop 又把它消费掉
    let f = move || {
        drop(s);
        println!("consumed");
    };

    f();      // ✅ 调用一次没问题
    // f();   // ❌ 编译错误：use of moved value: `f`
}
```

2.把捕获的值"返回"出去

```rust
fn main() {
    let s = String::from("hello");

    let f = move || -> String {
        s   // 把 s 作为返回值 move 出去
    };

    let got = f();
    println!("{}", got);
    // f();  // ❌ 错误：`f` used after move
}
```



## Required Associated Types

### Output

使用调用运算符后的返回类型。

```rust
type Output
```



## Required Methods

### call_once

执行调用操作。

```rust
extern "rust-call" fn call_once(self, args: Args) -> Self::Output
```



## Implementors

### impl<A, F> FnOnce\<A> for &F

```rust
impl<A, F> FnOnce<A> for &F
where
  A: Tuple,
  F: Fn<A> + ?Sized,
```



### impl<A, F> FnOnce\<A> for &mut F

```rust
impl<A, F> FnOnce<A> for &mut F
where
  A: Tuple,
  F: FnMut<A> + ?Sized,
```



### impl<Args, F, A> FnOnce\<Args> for Box<F, A>

```rust
impl<Args, F, A> FnOnce<Args> for Box<F, A>
where
  Args: Tuple,
  F: FnOnce<Args> + ?Sized,
  A: Allocator,
```



### impl<R, F> FnOnce() for AssertUnwindSafe\<F>

```rust
impl<R, F> FnOnce() for AssertUnwindSafe<F>
where
  F: FnOnce() -> R,
```

