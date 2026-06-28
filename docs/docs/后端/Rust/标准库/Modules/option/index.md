# Module std::option

`Option<T>`是一个特殊的枚举，用来表示一个值可能有值，也可能为**空**

在其他的语言中，往往都会有一个`null`关键字，用来表明当前变量的值为空，但在rust中需要使用`Option<T>`来表示空值



`Option`有以下用途：

- 初始值
- 未在整个输入范围内定义的函数的返回值 (部分函数)
- 返回值，用于报告否则将报告简单错误的错误，其中错误返回 [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)
- 可选的结构体字段
- 可借用或 “taken” 的结构体字段
- 可选的函数参数
- 可空指针
- 从困难的情况中交换东西







## 1.基本使用

`Option<T>` 枚举是如此有用以至于它被包含在了 [`prelude`](../prelude)（**prelude 属于 Rust 标准库，Rust 会将最常用的类型、函数等提前引入其中，省得我们再手动引入**）之中，你不需要将其显式引入作用域。

另外，它的成员 `Some` 和 `None` 也是如此，无需使用 `Option::` 前缀就可直接使用 `Some` 和 `None`。

比如下面一段代码

```rust
let maybe_number: Option<i32> = Option::Some(5);
let absent: Option<i32> = Option::None;
```

完全可以去掉`Option::`，然后使用下面的方式

```rust
let maybe_number: Option<i32> = Some(5);
let absent: Option<i32> = None;
```





:::warning 注意

1.当使用`Some(T)`时，因为`Some`肯定是有值的，所以即使不显示声明类型，rust也会自动推导`T`的类型

如果使用 `None` 而不是 `Some`，需要告诉 Rust `Option<T>` 是什么类型的，因为编译器只通过 `None` 值无法推断出 `Some` 成员保存的值的类型。

```rust
let some_number = Some(5);
let some_string = Some("a string");

let absent_number: Option<i32> = None;
```



2.`Some(T)`和`T`并不是一样的，两种类型不能混为一谈，比如下面这段代码

```rust
let x: i8 = 5;
let y: Option<i8> = Some(5);

let sum = x + y;
```

由于类型不同，所以不能相加，从而会报错

:::



## 2.模式匹配

`Option<T>`既然是个枚举，那么就可以使用`match`进行模式匹配

```rust
let num = Some(66);
match num {
    Some(value) => println!("{}", value),
    None => (),
}
```

当匹配到`Some`时，被匹配的变量的值就会赋值给`Some()`的参数，在`Some`后的`{}`块中就可以使用这个变量的值



### 2.1 作为函数返回值

`Option<T>`通常作为函数的返回值

```rust
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

fn main() {
    let five = Some(5);
    let six: Option<i32> = plus_one(five);
    let none = plus_one(None);

    println!("{:?}", six);          // Some(6)
    println!("{:?}", none);         // None

}
```



### 2.2 给外面变量赋值

`Some(T)`毕竟不能跟别的类型一块运算，但是可以通过`match`修改外部变量的值，从而进一步运算

```rust
let age = Some(19);

let is_adult = match age {
    Some(value) => {
        if value>=18 {true} else{false}
    }
    None => false,
};

println!("{}", is_adult); // true
```

想取出`Some(T)`的值，也可以使用`Option<T>`的`unwrap()`方法，后面会有介绍



### 2.3 if let

`if let`是`match`的一个语法糖，常用于简化`Option`和`Result`的`match`语句先看如下代码

```rust
let num = Some(66);
match num {
    Some(value) => println!("{}", value),
    None => (),
}
```

在很多时候如上面这样，我们只会关心当Option为Some时的情况，而None则一笔带过

`if let`可以让我们直接处理Some的情况，而不管None的情况，语法如下

```rust
let num=Some(123);

if let Some(value) = num {
    println!("{}", value);		// 123
}
```

`Some(value) = num` 意思是判断变量`num`是否是一个`Some`，如果是`Some`，就把`num`的值赋值给`value`，可以在后面的语句块中访问这个value





## 3.Option和指针

Rust 的指针类型必须始终指向有效位置。没有 “null” 引用。相反，Rust 有 *optional* 指针，就像可选的拥有所有权的 box，`Option<Box<T>>`。

以下示例使用 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 创建 [`i32`](https://www.rustwiki.org.cn/zh-CN/std/primitive.i32.html) 的可选 box。 注意，为了使用内部的 [`i32`](https://www.rustwiki.org.cn/zh-CN/std/primitive.i32.html) 值，`check_optional` 函数首先需要使用模式匹配来确定 box 是否有值 (即它是 [`Some(...)`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some)) 或没有 ([`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None))。

```rust
let optional = None;
check_optional(optional);

let optional = Some(Box::new(9000));
check_optional(optional);

fn check_optional(optional: Option<Box<i32>>) {
    match optional {
        Some(p) => println!("has value {p}"),
        None => println!("has no value"),
    }
}
```



## 4.问号运算符`?`

?运算符是一个错误传播运算符，它用于简化错误处理。

当一个返回`Option`的函数（暂称`fn1`）中使用了另一个返回`Option`的函数（暂称`fn2`），使用`?`运算符可以减少`match`语句的使用

- 如果`fn2`返回的结果是Some，?会直接解包出内部的值，并继续执行
- 如果`fn2`返回的结果是None，?会直接将整个函数返回None

当表达式返回`Some`时

```rust
fn fn1() -> Option<bool> {
    return Some(true);
}

fn fn2() -> Option<bool> {
    let is_true = fn1()?;
    println!("{}",is_true);     // true

    if is_true { Some(true) } else { Some(false) }
}

fn main() {
    let res = fn2();
    println!("{:?}", res) // Some(true)
}
```

当表达式返回`None`时

```rust
fn fn1() -> Option<bool> {
    return None;
}

fn fn2() -> Option<bool> {
    let is_true = fn1()?;   // 直接返回None，后面代码不会执行
    println!("{}", is_true); 

    if is_true { Some(true) } else { Some(false) }
}

fn main() {
    let res = fn2();
    println!("{:?}", res) // Some(true)
}

```



## 5.Representation

Rust 保证优化以下 `T` 类型，以使 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 具有与 `T` 相同的大小：

- [`Box`](https://www.rustwiki.org.cn/zh-CN/std/boxed/struct.Box.html)
- `&U`
- `&mut U`
- `fn`, `extern "C" fn`[1](https://www.rustwiki.org.cn/zh-CN/std/option/index.html#fn1)
- [`num::NonZero*`](https://www.rustwiki.org.cn/zh-CN/core/num/index.html)
- [`ptr::NonNull`](https://www.rustwiki.org.cn/zh-CN/std/ptr/struct.NonNull.html)
- `#[repr(transparent)]` 结构体围绕此列表中的一种类型。

这称为 “空指针优化” 或 NPO。

对于上述情况，可以进一步保证，可以从 `T` 到 `Option<T>` 的所有有效值以及从 `Some::<T>(_)` 到 `T` 的所有有效值 [`mem::transmute`](https://www.rustwiki.org.cn/zh-CN/std/mem/fn.transmute.html) (但是将 `None::<T>` 转换为 `T` 是未定义的行为)。





## 6.方法概述

除了使用模式匹配，[`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 还提供了多种不同的方法。



### 6.1 查询变体

如果 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 分别为 [`Some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) 或 [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)，则 [`is_some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.is_some) 和 [`is_none`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.is_none) 方法返回 [`true`](https://www.rustwiki.org.cn/zh-CN/std/primitive.bool.html)。



### 6.2 用于处理引用的适配器

- [`as_ref`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.as_ref) 从 `&Option<T>` 转换为 `Option<&T>`
- [`as_mut`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.as_mut) 从 `&mut Option<T>` 转换为 `Option<&mut T>`
- [`as_deref`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.as_deref) 从 `&Option<T>` 转换为 `Option<&T::Target>`
- [`as_deref_mut`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.as_deref_mut) 从 `&mut Option<T>` 转换为 `Option<&mut T::Target>`
- [`as_pin_ref`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.as_pin_ref) 从 `Pin<&Option<T>>` 转换为 `Option<Pin<&T>>`
- [`as_pin_mut`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.as_pin_mut) 从 `Pin<&mut Option<T>>` 转换为 `Option<Pin<&mut T>>`



### 6.3 提取包含的值

当它是 [`Some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) 变体时，这些方法提取 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 中包含的值。如果 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 为 [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)：

- [`expect`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.expect) panics 带有提供的自定义消息
- [`unwrap`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.unwrap) panics 带有泛型信息
- [`unwrap_or`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.unwrap_or) 返回提供的默认值
- [`unwrap_or_default`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.unwrap_or_default) 返回类型 `T` 的默认值 (必须实现 [`Default`](https://www.rustwiki.org.cn/zh-CN/std/default/trait.Default.html) trait)
- [`unwrap_or_else`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.unwrap_or_else) 返回对提供的函数求值的结果







### 6.4 转换包含的值

这些方法将 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 转换为 [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html)：

- [`ok_or`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.ok_or) 使用提供的默认 `err` 值将 [`Some(v)`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) 转换为 [`Ok(v)`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok)，将 [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None) 转换为 [`Err(err)`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err)
- [`ok_or_else`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.ok_or_else) 使用提供的函数将 [`Some(v)`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) 转换为 [`Ok(v)`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Ok)，并将 [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None) 转换为 [`Err`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html#variant.Err) 的值
- [`transpose`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.transpose) transposes an [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) of a [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) into a [`Result`](https://www.rustwiki.org.cn/zh-CN/std/result/enum.Result.html) of an [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html)

这些方法转换了 [`Some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) 变体：

- [`filter`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.filter) calls the provided predicate function on the contained value `t` if the [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) is [`Some(t)`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some), and returns [`Some(t)`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) if the function returns `true`; otherwise, returns [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)
- [`flatten`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.flatten) 从一个对象中删除一层嵌套 [`Option>`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html)
- [`map`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.map) 通过将提供的函数应用于 [`Some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) 的包含值并保持 [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None) 值不变，将 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 转换为 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html)

这些方法将 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 转换为可能不同类型 `U` 的值：

- [`map_or`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.map_or) 将提供的函数应用于 [`Some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) 的包含值，或者如果 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 是返回提供的默认值 [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)
- [`map_or_else`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.map_or_else) applies the provided function to the contained value of [`Some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some), or returns the result of evaluating the provided fallback function if the [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) is [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)

这些方法结合了两个 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 值的 [`Some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) 变体：

- [`zip`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.zip) returns [`Some((s, o))`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) if `self` is [`Some(s)`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) and the provided [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) value is [`Some(o)`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some); otherwise, returns [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)
- [`zip_with`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.zip_with) calls the provided function `f` and returns [`Some(f(s, o))`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) if `self` is [`Some(s)`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) and the provided [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) value is [`Some(o)`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some); otherwise, returns [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)



### 6.5 布尔运算符

这些方法将 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 视为布尔值，其中 [`Some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) 的作用类似于 [`true`](https://www.rustwiki.org.cn/zh-CN/std/primitive.bool.html)，而 [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None) 的作用类似于 [`false`](https://www.rustwiki.org.cn/zh-CN/std/primitive.bool.html)。这些方法有两类：一类以 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 作为输入，一类以函数作为输入 (延迟评估)。

[`and`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.and)、[`or`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.or) 和 [`xor`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.xor) 方法将另一个 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 作为输入，并生成一个 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 作为输出。只有 [`and`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.and) 方法可以生成具有与 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 不同的内部类型 `U` 的 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 值。

| method                                                       | self      | input     | output    |
| ------------------------------------------------------------ | --------- | --------- | --------- |
| [`and`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.and) | `None`    | (ignored) | `None`    |
| [`and`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.and) | `Some(x)` | `None`    | `None`    |
| [`and`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.and) | `Some(x)` | `Some(y)` | `Some(y)` |
| [`or`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.or) | `None`    | `None`    | `None`    |
| [`or`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.or) | `None`    | `Some(y)` | `Some(y)` |
| [`or`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.or) | `Some(x)` | (ignored) | `Some(x)` |
| [`xor`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.xor) | `None`    | `None`    | `None`    |
| [`xor`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.xor) | `None`    | `Some(y)` | `Some(y)` |
| [`xor`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.xor) | `Some(x)` | `None`    | `Some(x)` |
| [`xor`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.xor) | `Some(x)` | `Some(y)` | `None`    |

[`and_then`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.and_then) 和 [`or_else`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.or_else) 方法将函数作为输入，并且仅在需要产生新值时才评估函数。只有 [`and_then`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.and_then) 方法可以生成具有与 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 不同的内部类型 `U` 的 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 值。

| method                                                       | self      | function input | function result | output    |
| ------------------------------------------------------------ | --------- | -------------- | --------------- | --------- |
| [`and_then`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.and_then) | `None`    | (not provided) | (not evaluated) | `None`    |
| [`and_then`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.and_then) | `Some(x)` | `x`            | `None`          | `None`    |
| [`and_then`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.and_then) | `Some(x)` | `x`            | `Some(y)`       | `Some(y)` |
| [`or_else`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.or_else) | `None`    | (not provided) | `None`          | `None`    |
| [`or_else`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.or_else) | `None`    | (not provided) | `Some(y)`       | `Some(y)` |
| [`or_else`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.or_else) | `Some(x)` | (not provided) | (not evaluated) | `Some(x)` |

这是在方法调用管道中使用 [`and_then`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.and_then) 和 [`or`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.or) 等方法的示例。管道的早期阶段通过不变的失败值 ([`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None))，并继续处理成功值 ([`Some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some))。 最后，如果 [`or`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.or) 收到 [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)，它会替换一条错误消息。

```rust
let mut bt = BTreeMap::new();
bt.insert(20u8, "foo");
bt.insert(42u8, "bar");
let res = [0u8, 1, 11, 200, 22]
    .into_iter()
    .map(|x| {
        // `checked_sub()` 出错时返回 `None`
        x.checked_sub(1)
            // 与 `checked_mul()` 相同
            .and_then(|x| x.checked_mul(2))
            // `BTreeMap::get` 出错时返回 `None`
            .and_then(|x| bt.get(&x))
            // 如果到目前为止我们有 `None`，则替换一条错误消息
            .or(Some(&"error!"))
            .copied()
            // 不会 panic 因为我们无条件使用了上面的 `Some`
            .unwrap()
    })
    .collect::<Vec<_>>();
assert_eq!(res, ["error!", "error!", "foo", "error!", "bar"]);
```



### 6.6 比较运算符

如果 `T` 实现 [`PartialOrd`](https://www.rustwiki.org.cn/zh-CN/std/cmp/trait.PartialOrd.html)，那么 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 将派生其 [`PartialOrd`](https://www.rustwiki.org.cn/zh-CN/std/cmp/trait.PartialOrd.html) 实现。使用此顺序，[`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None) 的比较比任何 [`Some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) 都小，两个 [`Some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) 的比较方式与其在 `T` 中包含的值相同。 如果 `T` 也实现了 [`Ord`](https://www.rustwiki.org.cn/zh-CN/std/cmp/trait.Ord.html)，那么 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 也是如此。

```rust
assert!(None < Some(0));
assert!(Some(0) < Some(1));
```







### 6.7 迭代结束 `Option`

可以对 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 进行迭代。如果您需要一个条件为空的迭代器，这会很有帮助。迭代器将产生单个值 (当 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 为 [`Some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) 时)，或不产生任何值 (当 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 为 [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None) 时)。 例如，如果 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 是 [`Some(v)`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some)，则 [`into_iter`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.into_iter) 的作用类似于 [`once(v)`](https://www.rustwiki.org.cn/zh-CN/std/iter/fn.once.html); 如果 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 是 [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)，则它的作用类似于 [`empty()`](https://www.rustwiki.org.cn/zh-CN/std/iter/fn.empty.html)。

[`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 上的迭代器分为三种类型：

- [`into_iter`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.into_iter) 消耗 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 并产生包含的值
- [`iter`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.iter) 对包含的值产生类型为 `&T` 的不可变引用
- [`iter_mut`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.iter_mut) 产生一个 `&mut T` 类型的可变引用到包含的值

[`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 上的迭代器在链接迭代器时很有用，例如，有条件地插入项。 (并不总是需要显式调用迭代器构造函数：许多接受其他迭代器的 [`Iterator`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html) 方法也将接受实现 [`IntoIterator`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.IntoIterator.html) 的可迭代类型，其中包括 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html)。)

```rust
let yep = Some(42);
let nope = None;
// chain() 已经调用 into_iter()，所以我们不必这样做
let nums: Vec<i32> = (0..4).chain(yep).chain(4..8).collect();
assert_eq!(nums, [0, 1, 2, 3, 42, 4, 5, 6, 7]);
let nums: Vec<i32> = (0..4).chain(nope).chain(4..8).collect();
assert_eq!(nums, [0, 1, 2, 3, 4, 5, 6, 7]);
```



以这种方式链接迭代器的一个原因是，返回 `impl Iterator` 的函数必须使所有可能的返回值都具有相同的具体类型。链接一个迭代的 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 可以帮助解决这个问题。

```rust
fn make_iter(do_insert: bool) -> impl Iterator<Item = i32> {
    // 显式返回来说明返回类型匹配
    match do_insert {
        true => return (0..4).chain(Some(42)).chain(4..8),
        false => return (0..4).chain(None).chain(4..8),
    }
}
println!("{:?}", make_iter(true).collect::<Vec<_>>());
println!("{:?}", make_iter(false).collect::<Vec<_>>());
```



如果我们尝试做同样的事情，但是使用 [`once()`](https://www.rustwiki.org.cn/zh-CN/std/iter/fn.once.html) 和 [`empty()`](https://www.rustwiki.org.cn/zh-CN/std/iter/fn.empty.html)，我们就不能再返回 `impl Iterator`，因为返回值的具体类型不同。

[ⓘ](https://www.rustwiki.org.cn/zh-CN/std/option/index.html#)

```rust
// 这不会编译，因为函数的所有可能返回必须具有相同的具体类型。
//
fn make_iter(do_insert: bool) -> impl Iterator<Item = i32> {
    // 显式返回以说明返回类型不匹配
    match do_insert {
        true => return (0..4).chain(once(42)).chain(4..8),
        false => return (0..4).chain(empty()).chain(4..8),
    }
}
```



### 6.8 收集到 `Option`

[`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 实现了 [`FromIterator`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#impl-FromIterator>-for-Option) trait，它允许将 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 值上的迭代器收集到原始 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 值的每个包含值的集合的 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 中，或者如果任何元素是 [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)，则为 [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)。

```rust
let v = [Some(2), Some(4), None, Some(8)];
let res: Option<Vec<_>> = v.into_iter().collect();
assert_eq!(res, None);
let v = [Some(2), Some(4), Some(8)];
let res: Option<Vec<_>> = v.into_iter().collect();
assert_eq!(res, Some(vec![2, 4, 8]));
```



[`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 还实现了 [`Product`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#impl-Product>-for-Option) 和 [`Sum`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#impl-Sum>-for-Option) traits，允许对 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 值的迭代器提供 [`product`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.product) 和 [`sum`](https://www.rustwiki.org.cn/zh-CN/std/iter/trait.Iterator.html#method.sum) 方法。

```rust
let v = [None, Some(1), Some(2), Some(3)];
let res: Option<i32> = v.into_iter().sum();
assert_eq!(res, None);
let v = [Some(1), Some(2), Some(21)];
let res: Option<i32> = v.into_iter().product();
assert_eq!(res, Some(42));
```





### 6.9 就地修改 `Option`

这些方法返回对包含的值的可变引用 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html):

- [`insert`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.insert) 插入一个值，丢弃任何旧内容
- [`get_or_insert`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.get_or_insert) gets the current value, inserting a provided default value if it is [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)
- [`get_or_insert_default`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.get_or_insert_default) 获取当前值，如果是，则插入类型 `T` (必须实现 [`Default`](https://www.rustwiki.org.cn/zh-CN/std/default/trait.Default.html)) 的默认值 [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)
- [`get_or_insert_with`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.get_or_insert_with) gets the current value, inserting a default computed by the provided function if it is [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)

这些方法转移包含的值的所有权 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html):

- [`take`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.take) takes ownership of the contained value of an [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html), if any, replacing the [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) with [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)
- [`replace`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#method.replace) 获得 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 包含的值的所有权 (如果有)，用包含提供的值的 [`Some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) 替换 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html)





## 7.Examples

[`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 上的基本模式匹配：

```rust
let msg = Some("howdy");

// 获取对所包含字符串的引用
if let Some(m) = &msg {
    println!("{}", *m);
}

// 删除包含的字符串，销毁 Option
let unwrapped_msg = msg.unwrap_or("default message");
```



循环前将结果初始化为 [`None`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.None)：

```rust
enum Kingdom { Plant(u32, &'static str), Animal(u32, &'static str) }

// 要搜索的数据列表。
let all_the_big_things = [
    Kingdom::Plant(250, "redwood"),
    Kingdom::Plant(230, "noble fir"),
    Kingdom::Plant(229, "sugar pine"),
    Kingdom::Animal(25, "blue whale"),
    Kingdom::Animal(19, "fin whale"),
    Kingdom::Animal(15, "north pacific right whale"),
];

// 我们将搜索最大的动物的名称，但首先要获取 `None`。
//
let mut name_of_biggest_animal = None;
let mut size_of_biggest_animal = 0;
for big_thing in &all_the_big_things {
    match *big_thing {
        Kingdom::Animal(size, name) if size > size_of_biggest_animal => {
            // 现在我们找到了一些大动物的名字
            size_of_biggest_animal = size;
            name_of_biggest_animal = Some(name);
        }
        Kingdom::Animal(..) | Kingdom::Plant(..) => ()
    }
}

match name_of_biggest_animal {
    Some(name) => println!("the biggest animal is {name}"),
    None => println!("there are no animals :("),
}
```

1. 这对于任何其他 ABI 仍然适用: `extern "abi" fn` (例如，`extern "system" fn`)





## 8.Structs

- [IntoIter](https://www.rustwiki.org.cn/zh-CN/std/option/struct.IntoIter.html)：对 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 的 [`Some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) 变体中的值的迭代器。
- [Iter](https://www.rustwiki.org.cn/zh-CN/std/option/struct.Iter.html)：对 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 的 [`Some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) 变体的引用的迭代器。
- [IterMut](https://www.rustwiki.org.cn/zh-CN/std/option/struct.IterMut.html)：对 [`Option`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html) 的 [`Some`](https://www.rustwiki.org.cn/zh-CN/std/option/enum.Option.html#variant.Some) 变体的可变引用的迭代器。



## 9.Enums

- [Option](./Enums/Option)：`Option` 类型。有关更多信息，请参见 [模块级文档](https://www.rustwiki.org.cn/zh-CN/std/option/index.html)。