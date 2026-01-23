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









