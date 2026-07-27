# 枚举

枚举也被称作 *`enums`*

枚举可以给一个类型列举一系列可能的值

## 1.定义枚举

- 使用`enum`关键字定义一个枚举
- `enum`后面定义枚举的名字
- 在`{}`中定义枚举的成员，这些成员成为**变体**，变体之间使用逗号`,`隔开
- 枚举和变体的名字都需要使用大驼峰的形式，不然rust会警告

```rust
enum EnumName{
    Variant1,
    Variant2,
    Variant3,
    // ...
}
```

比如，人类按颜色区别可以分为黄色、白色和黑色

```rust
enum PersonCate {
    Yellow,
    White,
    Black,
}
```





## 2.枚举值

通过双引号`枚举名::变体`的方式，来访问枚举的变体

```rust {8-10}
#[derive(Debug)]
enum PersonCate {
    Yellow,
    White,
    Black,
}

let chinese = PersonCate::Yellow;
let american = PersonCate::White;
let african = PersonCate::Black;

println!("{:?}", chinese);          // Yellow
println!("{:?}", american);         // White
println!("{:?}", african);          // Black
```

这里的`#[derive(Debug)]`和`{:?}`在会在后面详细说明，现在先简要说明

- `#[derive(Debug)]`特性允许复杂数据类型被打印
- `{:?}`是`println!`宏的一个特殊占位符，可以打印复杂数据类型



我们也可以定义一个函数，把枚举放在函数参数中

```rust
#[derive(Debug)]
enum PersonCate {
    Yellow,
    White,
    Black,
}

fn print_person_cate(person: PersonCate) {
    println!("{:?}", person)
}

fn main() {
    let chinese = PersonCate::Yellow;
    let american = PersonCate::White;
    let african = PersonCate::Black;

    print_person_cate(chinese);		// Yellow
    print_person_cate(american);	// White
    print_person_cate(african);		// Black
}
```





## 3.类C枚举

`Rust`还允许给枚举体的每个变体设置一个整形数值：

```rust
#[repr(u8)]
enum HttpStatus {
    Ok = 200,
    NotFound = 404,
}
```

此处定义了一个`Http`状态码的枚举，并且给不同状态设定了对于的数值。顶部的`#[repr(u8)]`用于指定变体的数据类型，此处指定为`u8`。

这种枚举本身在`Rust`中意义不大，因为`Rust`很少用到整形与枚举直接转换的性质。这个性质主要用于和`C语言`的接口进行交互，从而兼容C风格的枚举。



## 4.变体的类型

我们可以给枚举的变体定义一个类型，语法如下

```rust
enum EnumName{
    Variant1(Type),
	// ...
}
```

变体的类型可以是任意类型，比如u8、String、元组、甚至是结构体、也可以是另一个枚举，

```rust
#[derive(Debug)]
enum QuitCate {
    Walt,
    Run,
}

#[derive(Debug)]
struct Student {
    name: String,
    age: u8,
}

#[derive(Debug)]
enum Message {
    Info,									// 普通类型的变体
    Num(u32),								// 类型为u32的变体
    Move { x: i32, y: i32 },				// 类型为一个匿名结构体的变体
    Quit(QuitCate),							// 类型为另一个枚举的变体
    Write(String),							// 类型为String的变体
    Color(i32, i32, i32, i32),				// 类型为4个数据的元组的变体
    Child(Student)							// 类型为一个结构体的变体
}
```

注意！：如果一个枚举实现了`#[derive(Debug)]`特性，那么这个枚举里使用到的复合类型变体也要实现`#[derive(Debug)]`特性

而想要创建这些变体的实例

```rust
fn main() {
    let num=Message::Num(666);
    let mov=Message::Move { x: 11, y: 22 };
    let quit=Message::Quit(QuitCate::Run);
    let write=Message::Write("我服了rust怎么这么难啊".to_string());
    let color=Message::Color(255, 255, 255, 255);
    let child=Message::Child(Student { name: String::from("ikun"), age: 18 });

    println!("{:?}",num);      // Num(666)
    println!("{:?}",mov);      // Move { x: 11, y: 22 }
    println!("{:?}",quit);     // Quit(Run)
    println!("{:?}",write);    // Write("我服了rust怎么这么难啊")
    println!("{:?}",color);    // Color(255, 255, 255, 255)
    println!("{:?}",child);    // Child(Student { name: "ikun", age: 18 })
}
```



## 5.枚举方法

和`struct`一样，枚举也可以通过`impl`块定义方法

```rust
impl Message {
    fn call(&self) {
        match self {
            Message::Write(text) => println!("Text message: {}", text),
            _ => println!("Other type of message"),
        }
    }
}

fn main() {
    let m = Message::Write(String::from("hello"));
    m.call(); // Text message: hello
}
```



## 6.模式匹配

使用`match`对`enum`进行模式匹配，匹配到相应的变体，可以进行一些操作

```rust
enum PersonCate {
    Yellow,
    White,
    Black,
}

fn main() {
    let person = PersonCate::Yellow;
    let mut is_yellow: bool = false;
    
    match person {
        PersonCate::Black => println!("you are black"),
        PersonCate::White => println!("you are white"),
        PersonCate::Yellow => {
            is_yellow = true;
        }
    }
    println!("{}", is_yellow);		// true
}

```



## 7.Option\<T>

[`Option<T>`](../../../../标准库/Modules/option/index)是Rust标准库中一个特殊的枚举，位于`std::option::Option`，用来**表示一个变量可能有值，也可能为空**

这像是其他语言中的`null`

```rust
pub enum Option<T> {
    None,
    Some(T),
}
```

- **None**：表示没有值，为空
- **Some(T)**：表示有值，值包含在`Some`中，类型为`T`

:::tip

`Option`和其变体`Some(T)`，`None`均被包含在了`std::prelude`中，所以在使用时，不需要显示导入

:::

一个简单的使用

```rust
fn main() {
    let o = Some(123);
    let null: Option<i32> = None;

    println!("{:?}", o);			// Some(123)
    println!("{:?}", null);			// None
}
```

可以看到，直接使用变量，得到的是[`Option<T>`](https://xarzhi.github.io/docs/后端/Rust/标准库/Modules/option/)中的其中一个变体

若想拿到Some中的值，需要使用[`Option<T>`](https://xarzhi.github.io/docs/后端/Rust/标准库/Modules/option/)中的方法，比如[`unwrap`](https://xarzhi.github.io/docs/后端/Rust/标准库/Modules/option/Enums/Option.html#unwrap)

```rust
fn main() {
    let o = Some(123);

    println!("{:?}", o.unwrap());			// 123
}
```



### 7.1 模式匹配

在开发中经常会用模式匹配来处理`Option`的值

```rust
fn get_value(num: i32) -> Option<i32> {
    if num > 10 { Some(num) } else { None }
}

fn main() {
    let o = get_value(15);

    match o {
        Some(value) => println!("{}", value),
        None => println!("no value"),
    }  // 15


    let n = get_value(8);

    match n {
        Some(value) => println!("{}", value),
        None => println!("no value"),
    }  // "no value"
}
```



使用`if let`语法糖

```rust
fn get_value(num: i32) -> Option<i32> {
    if num > 10 { Some(num) } else { None }
}

fn main() {
    let o = get_value(15);

    if let Some(value) = o {
        println!("{}", value); // 15
    }

    let n = get_value(8);
    if let None = n {
        println!("no value"); // "no value"
    }
}
```







## 8.Result<T, E>

[`Result<T, E>`](https://xarzhi.github.io/docs/后端/Rust/标准库/Modules/result/)是Rust标准库中一个特殊的枚举，位于`std::result::Result`，用来**表示一个结果可能有值，也可能为一个错误**

通常用在io操作中

```rust
enum Result<T, E> {
   Ok(T),
   Err(E),
}
```

- **Ok(T)**：表示结果是成功的，值包含在`Ok`中，值类型为`T`
- **Err(E)**：表示结果是失败的的，错误的信息包含在`Err`中，错误的类型为`E`

:::tip

`Result`和其变体`Ok(T)`，`Err(E)`均被包含在了`std::prelude`中，所以在使用时，不需要显示导入

:::

一个简单的使用

```rust
fn get_result(num: i32) -> Result<i32, String> {
    if num > 10 {
        Ok(num)
    } else {
        Err(String::from("the num is less than 10"))
    }
}

fn main() {
    let res1 = get_result(8);
    let res2 = get_result(50);

    println!("{:?}", res1);	// Err("the num is less than 10")
    println!("{:?}", res2); // Ok(50)
}

```

可以看到，直接使用变量，得到的是[`Result<T, E>`](https://xarzhi.github.io/docs/后端/Rust/标准库/Modules/result/)中的其中一个变体

若想拿到`Ok`中的值，需要使用[`Result<T, E>`](https://xarzhi.github.io/docs/后端/Rust/标准库/Modules/result/)中的方法，比如[`unwrap`](https://xarzhi.github.io/docs/后端/Rust/标准库/Modules/result/Enums/Result.html#unwrap)和[`unwrap_err`](https://xarzhi.github.io/docs/后端/Rust/标准库/Modules/result/Enums/Result.html#unwrap-err)

```rust
fn get_result(num: i32) -> Result<i32, String> {
    if num > 10 {
        Ok(num)
    } else {
        Err(String::from("the num is less than 10"))
    }
}

fn main() {
    let res1 = get_result(8);
    let res2 = get_result(50);

    println!("{:?}", res1.unwrap_err());	// "the num is less than 10"
    println!("{:?}", res2.unwrap()); 	// 50
}

```



### 8.1 模式匹配

在开发中经常会用模式匹配来处理`Result`的值

```rust
fn get_result(num: i32) -> Result<i32, String> {
    if num > 10 {
        Ok(num)
    } else {
        Err(String::from("the num is less than 10"))
    }
}

fn main() {
    let res = get_result(15);

    match res {
        Ok(value) => println!("{:#?}", value),		 // 15
        Err(err) => println!("{:#?}", err),
    }  


    let res = get_result(5);

    match res {
        Ok(value) => println!("{:#?}", value),		
        Err(err) => println!("{:#?}", err),		// "the num is less than 10"
    }
}

```



使用`if let`语法糖

```rust
fn get_result(num: i32) -> Result<i32, String> {
    if num > 10 {
        Ok(num)
    } else {
        Err(String::from("the num is less than 10"))
    }
}

fn main() {
    let res = get_result(15);

    if let Ok(value) = res {
        println!("{:#?}", value) // 15
    }

    let res = get_result(5);

    if let Err(err) = res {
        println!("{:#?}", err) // "the num is less than 10"
    }
}
```







## 9.?操作符

`?`操作符是 `Rust`**错误传播**的核心语法糖，专门用于处理 `Result<T, E>`和 `Option<T>`。

在使用`Result`和`Option`时，很多时候需要用`match`处理错误或者`None`的结果

为了方便，**`?`操作符可以自动取出`Ok/Some`中的值，自动返回处理`Err/None`的结果，而且还不会导致`panic`**

可以理解为`?`操作符把结果取出来，把错误向上传递



### 9.1 ?操作符的使用

有如下代码

```rust {10}
fn is_more_than_five(num: u8) -> Result<bool, String> {
    if num > 5 {
        Ok(true)
    } else {
        Err("小于5".to_string())
    }
}

fn main() -> Result<(), String> {
    is_more_than_five(6);

	Ok(())
}
```

如果`is_more_than_five`直接调用，编译器会给出如下提示

![image-20260721131532156](https://gitee.com/xarzhi/picture/raw/master/img/image-20260721131532156.png)

大概意思是，`Result`的结果需要被使用，`Result`可能是`Err`的变体，需要处理`Err`这个错误，那么就有如下情形

1.如果直接把结果赋值给一个变量，因为函数返回的是`Result`，所以想要取出`Ok`中的值，需要使用`unwrap()`等函数，这样又会增加`panic`的风险

```rust
let res = is_more_than_five(6).unwrap();
```

2.我们可能就有用`match`、`if let`等去处理这个错误

```rust
match is_more_than_five(6) {
    Ok(num) => println!("{:#?}", num),
    Err(err) => println!("{:#?}", err),
}

// 或者使用if let 简化
if let Ok(num) = is_more_than_five(6) {
    println!("{:#?}", num)
}
```

但是这样都比较麻烦，尽管`if let`已经简化了些代码

我们往往都只是想要这个`Ok/Some`的结果，于是使用`?`操作符我们可以得到

```rust
fn main() -> Result<(), String> {
    let res = is_more_than_five(6)?;
    println!("{:?}", res); // true

    let res = is_more_than_five(3)?;
    println!("{:?}", res); // true

    Ok(())
}
```

这便是我们想要的结果，简化了代码，同时也避免了`panic`





### 9.2 ?操作符的实质

对于`Result`，差不多相当于这样

- 若结果是`Ok`，则直接返回`Ok`里的值
- 若结果是`Err`，就返回`Err`，并且内部使用`From::from`包装错误信息

```rust
match result {
    Ok(v) => v,
    Err(e) => return Err(From::from(e)),
}
```



对于`Option`，差不多相当于这样

- 若结果是`Some`，则直接返回`Some`里的值
- 若结果是`None`，就直接返回`None`

```rust
match option {
    Some(v) => v,
    None => return None,
};
```



### 9.3 错误类型必须兼容

在一个返回`Result`的函数中，调用另一个返回`Result`的函数

想要使用`?`操作符，**两个函数中的`Result<T,E>`中`E`的类型必须一致**

上面的代码，两个函数返回值错误类型都是`String`，所以没有问题

```rust
fn is_more_than_five(num: u8) -> Result<bool, String> {
    if num > 5 {
        Ok(true)
    } else {
        Err("小于5".to_string())
    }
}

fn main() -> Result<(), String> {
    let res = is_more_than_five(6)?;
    println!("{:?}", res); // true

    let res = is_more_than_five(3)?;
    println!("{:?}", res); // true

    Ok(())
}
```

如果是这样

```rust {9,10,13}
fn is_more_than_five(num: u8) -> Result<bool, String> {
    if num > 5 {
        Ok(true)
    } else {
        Err("小于5".to_string())
    }
}

fn main() -> Result<(), std::io::Error> {
    let res = is_more_than_five(6)?;
    println!("{:?}", res); // true

    let res = is_more_than_five(3)?;
    println!("{:?}", res); // true

    Ok(())
}
```

那么编译器就会提示报错了

![image-20260721133823655](https://gitee.com/xarzhi/picture/raw/master/img/image-20260721133823655.png)



开发中难免会遇到这种情况，那么该怎么办呢

#### 使用`map_err()`

使用`Result`自带的`map_err`方法把错误转化为一样的类型，这是比较常用的

```rust {12}
fn is_more_than_five(num: u8) -> Result<bool, String> {
    if num > 5 {
        Ok(true)
    } else {
        Err("小于5".to_string())
    }
}

use std::io;
fn main() -> Result<(), io::Error> {
    let res = is_more_than_five(6)
    .map_err(|e| io::Error::new(io::ErrorKind::Other, e))?;
    
    println!("{:?}", res); // true

    Ok(())
}
```







#### 使用impl From

```rust
fn inner() -> Result<i32, io::Error> {
    // ...
}

fn outer() -> Result<i32, MyError> {
    let v = inner()?; // ❌ 编译错误
    Ok(v)
}
```

给自己的错误类型实现 `From`

```rust
use std::io;
use std::num::ParseIntError;

#[derive(Debug)]
enum MyError {
    Io(io::Error),
    Parse(ParseIntError),
}

impl From<io::Error> for MyError {
    fn from(err: io::Error) -> Self {
        MyError::Io(err)
    }
}

impl From<ParseIntError> for MyError {
    fn from(err: ParseIntError) -> Self {
        MyError::Parse(err)
    }
}
```

再使用

```rust
fn outer() -> Result<i32, MyError> {
    let v = inner()?; // ✅ io::Error → MyError::Io
    Ok(v)
}
```





#### 
