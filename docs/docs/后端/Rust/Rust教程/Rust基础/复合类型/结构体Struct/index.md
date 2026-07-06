# 结构体

*`struct`*，或者 *structure*，是一个自定义数据类型，允许你命名和包装多个相关的值，从而形成一个有意义的组合。如果你熟悉一门面向对象语言，*struct* 就像对象中的数据属性。

Rust 中的结构体有三种风格：带有命名字段的结构体，元组结构体和单元结构体。

使用`struct`关键字来定义一个结构体

## 1.常规结构体

### 1.1 定义

常规结构体定义如下：

- `struct`关键字后面跟上这个结构体的名字
- 接着在大括号中使用 `key: type` 的形式提供字段，其中 `key` 是字段的名字，`type`是需要存储在字段的类型，多个字段用逗号隔开
- rust中结构体的名称应使用**大驼峰**

```rust
struct StructName {
    key1: type1,
    key2: type2,
    // ...
}
```

常规结构体中可以定义任意类型的数据，包括另一个结构体、枚举

```rust
enum Permission {
    Add,
    Delete,
    Modify,
    Search,
}

struct Address {
    country: String,
    route: String,
}

struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
    permission: Permission,
    address: Address,
}
```



### 1.2 创建实例

想要使用结构体，需要先创建结构体实例，一个结构体可以创建多个实例

创建一个实例需要以结构体的名字开头，接着在大括号中使用 `key: value` 键-值对的形式提供字段，其中 key 是字段的名字，value 是需要存储在字段中的数据值。**实例中字段的顺序不需要和它们在结构体中声明的顺序一致**。

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

let user = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};
```



### 1.3 访问实例成员

可以使用`实例.key`来访问结构体实例中的某一项的值

```rust {14-17}
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}
fn main() {
    let user = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };
    println!("{}",user.email);              // "someone@example.com"
    println!("{}",user.username);           // "someusername123"
    println!("{}",user.active);             // true
    println!("{}",user.sign_in_count);      // 1
}
```





### 1.4 修改实例成员值

想要实例成员的值可被修改，需要在实例成员时使用`mut`关键字

**注意整个实例必须是可变的**；Rust 并不允许只将某个字段标记为可变。

```rust {8,15,17}
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}
fn main() {
    let mut user = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };
    
    user.email=String::from("123@qq.com");

    println!("{}",user.email);              // "123@qq.com"
    println!("{}",user.username);           // "someusername123"
    println!("{}",user.active);             // true
    println!("{}",user.sign_in_count);      // 1
}
```



## 2.元组结构体

### 2.1 定义

元组结构体接收一个元组，内部可以定义若干个类型

```rust
struct StructName(type1, type2, ......);
```



### 2.2 创建实例

元组结构体在创建实例时，需要传入一个元组，内部值要按顺序传入

```rust
struct Ipv4(i32, i32, i32, i32);
  
let op = Ipv4(127, 0, 0, 1);
```



### 2.3 访问实例成员

元组结构体像元组一样使用，访问成员需要使用`实例.索引`的语法

```rust
struct Ipv4(i32, i32, i32, i32);
fn main() {
    let ip = Ipv4(127, 0, 0, 1);

    println!("{}",ip.0);       // 127
    println!("{}",ip.1);       // 0
    println!("{}",ip.2);       // 0
    println!("{}",ip.3);       // 1
}
```



### 2.4 修改成员值

修改元组结构体的值需要使用`实例.索引=new_value`的语法

```rust
struct Ipv4(i32, i32, i32, i32);
fn main() {
    let mut ip = Ipv4(127, 0, 0, 1);
    ip.0 = 123;
    println!("{}", ip.0); // 123
}
```



### 2.5 解构

元组结构体可以用如下语法解构

```rust {3}
struct Ipv4(i32, i32, i32, i32);
fn main() {
    let Ipv4(ip1, ip2, ip3, ip4) = Ipv4(127, 0, 0, 1);

    println!("{}", ip1); // 127
    println!("{}", ip2); // 0
    println!("{}", ip3); // 0
    println!("{}", ip4); // 1
}

```



## 3.单元结构体

我们也可以定义一个没有任何字段的结构体！它们被称为 **类单元结构体**（*unit-like structs*）因为它们类似于 `()`，即 unit 类型。类单元结构体常常在你想要在某个类型上实现 trait 但不需要在类型中存储数据的时候发挥作用，trait在后面介绍。

```rust
struct StructName;struct name;
```

直接在结构体名后面加一个分号`;`做结尾，就是一个单元结构体。单元结构体往往用于承载一些方法，内部不包含具体类型，在其它面向对象语言中也可以理解为接口类这样的存在。关于类型的方法，后续会进行讲解。

单元结构体有一个特性，就是在`release`版本下全局只保留一个实例。

示例：

```rust
struct People;

fn main() {
    let p1 = People;
    let p2 = People;
    println!("p1 addr: {:p}", &p1);
    println!("p2 addr: {:p}", &p2);
}
```

以上代码定义了一个`People`单元结构体，随后用这个类型声明了两个实例`p1`和`p2`，最后分别输出两个变量的地址。

在`debug`模式下，`p1`和`p2`的地址是不同的，因为它们确实是不同的变量，逻辑上在内存中占据不同的空间。

`release`模式下，由于这个单元结构体本身其实没有任何内容，它的大小实际为`0`，它的地址也没有什么实际意义。因此`Rust`会把全局所有的`People`都指向同一个实例，从而提高效率。

这与`C++`有一些区别，在`C++`中如果一个结构体内部没有任何内容，那么`C++`会保证给它分配`1 byte`，那么以上的`p1`和`p2`就会拿到不同的地址。





## 4.函数中使用结构体

结构体可以作为一个函数的参数，也可以作为返回值来使用

如下面的示例，接收一个结构体，返回一个新的结构体

```rust {7-14,16-18}
#[derive(Debug)]
struct User {
    username: String,
    email: String,
}
fn change_name(user: User, new_name: String) -> User {
    User {
        username: new_name,
        ..user
    }
}
fn main() {
    let user1 = User {
        username: String::from("小鹏"),
        email: String::from("123@qq.com"),
    };

    let user = change_name(user1, String::from("小朋"));

    println!("{}", user.username); // "小朋"
    println!("{}", user.email);
}
```



### 4.1 字段初始化简写

当**函数参数名与字段名都完全相同**，我们可以使用 **字段初始化简写语法**（*field init shorthand*）来重写 `build_user`，这样其行为与之前完全相同，不过无需重复 `email` 和 `username` 了

```rust {9-10}
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}
fn build_user(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}
fn main() {
    let email = String::from("123@qq.com");
    let username = String::from("xarzhi");
    let user = build_user(email, username);

    
    println!("{}",user.email);              // "123@qq.com"
    println!("{}",user.username);           // "xarzhi"
    println!("{}",user.active);             // true
    println!("{}",user.sign_in_count);      // 1
}
```





## 5.从其他实例创建实例

如果已经有一个实例，我们想再创建一个新实例，新实例中的部分成员值和其他实例的值一样，可以直接使用其他实例的值

```rust {11,12}
let mut user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};

let mut user2 = User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername567"),
    active: user1.active,
    sign_in_count: user1.sign_in_count,
};
```



### 5.1 结构体更新语法

我们可以通过更少的代码来达到相同的效果，`..` 语法指定了剩余未显式设置值的字段应有与给定实例对应字段相同的值。

```rust {3}
let user2 = User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername567"),
    ..user1
};
```









## 7.结构体数据的所有权

在上面 结构体的定义中，我们使用了自身拥有所有权的 `String` 类型而不是 `&str` 字符串 slice 类型。这是一个有意而为之的选择，因为我们想要这个结构体拥有它所有的数据，为此只要整个结构体是有效的话其数据也是有效的。

可以使结构体存储被其他对象拥有的数据的引用，不过这么做的话需要用上 **生命周期**（*lifetimes*），这是一个第十章会讨论的 Rust 功能。生命周期确保结构体引用的数据有效性跟结构体本身保持一致。如果你尝试在结构体中存储一个引用而不指定生命周期将是无效的，比如这样：

```rust
struct User {
    username: &str,
    email: &str,
    sign_in_count: u64,
    active: bool,
}

fn main() {
    let user1 = User {
        email: "someone@example.com",
        username: "someusername123",
        active: true,
        sign_in_count: 1,
    };
}
```

编译器会抱怨它需要生命周期标识符：

```text
error[E0106]: missing lifetime specifier
 -->
  |
2 |     username: &str,
  |               ^ expected lifetime parameter

error[E0106]: missing lifetime specifier
 -->
  |
3 |     email: &str,
  |            ^ expected lifetime parameter
```

第十章会讲到如何修复这个问题以便在结构体中存储引用，不过现在，我们会使用像 `String` 这类拥有所有权的类型来替代 `&str` 这样的引用以修正这个错误。





## 6.增强结构体打印

有如下示例，我们想打印结构体的内容

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };

    println!("rect1 is {}", rect1);
}
```

这样打印会报错：`error[E0277]: Rectangle doesn't implement std::fmt::Display`

`println!` 宏能处理很多类型的格式，不过，`{}` 默认告诉 `println!` 使用被称为 `Display` 的格式：意在提供给直接终端用户查看的输出。

目前为止见过的基本类型都默认实现了 `Display`，因为它就是向用户展示 `1` 或其他任何基本类型的唯一方式。

不过对于结构体，`println!` 应该用来输出的格式是不明确的，Rust 不会尝试猜测我们的意图，所以结构体并没有提供一个 `Display` 实现。

想要打印完整的结构体，需要把 `println!` 宏中的`{}`换成`{:?}`，然后在结构体声明的上面加上`#[derive(Debug)]`注解

```rust {1,10}
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };

    println!("rect1 is  {:?}", rect1);
}
```

打印结果如下

![image-20251204194721737](https://gitee.com/xarzhi/picture/raw/master/img/image-20251204194721737.png)



如果想要更格式化的输入，可以把`println!` 宏中的`{:?}`换成`{:#?}`

```rust {10}
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };

    println!("rect1 is  {:#?}", rect1);
}
```

打印结果如下，这样看起来就方便许多了

![image-20251204194958101](https://gitee.com/xarzhi/picture/raw/master/img/image-20251204194958101.png)



## 7.impl块

impl块用于在结构体中添加**方法**和**关联函数**

除了结构体，`impl`块还可用于`enum`、`union`以及`trait object`

### 7.1 方法

**方法** 与函数类似：它们使用 `fn` 关键字和名称声明，可以拥有参数和返回值

不过方法与函数是不同的，它们第一个参数总是 `self`，它代表调用该方法的**结构体实例**。

定义方法，需要使用 `impl` 块中定义，语法如下

- 使用`impl`关键字，后面跟着结构体的名字，再加上`{}`块
- 在方法的签名中，第一个参数必须是`self`，也就是实例本身，
  - 若想添加其他参数，就在`self`后面依次增加
  - 在调用方法时，第一个实参就是函数签名的第二个参数，依此类推

- 想要使用实例中的结构体方法，需要使用`实例.方法()`的语法

```rust {7-11}
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
```

`self`是`rust`为了便于操作实例身上属性而设计的关键字，上面的`&selt`等同于`rectangle: &Rectangle`

#### 7.1.2 self

前面提到，在`impl`的方法中，第一个参数可以为`self`，实际上`self`还有多种传参的形式，它们涉及到所有权的变化。

self允许四种使用情况

- `&self` 不可变引用，不获取所有权
- `&mut self` 可变引用，可以修改实例中的属性值，不获取所有权
- `self / mut self` 获得所有权
- 指向`Self`的智能指针，`self: Box<Self>`

##### 1.`&self` 不可变引用

- 当以`&self` 接收时，相当于`self: &Self`按照不可变引用形式接收参数。
- 此时内部的`self`会拿到一个借用，但是**不占据所有权**。这种情况下你不能在方法内部修改`self`的值，但是可以对它进行读取。
- 比如此处读取`self.age`并输出。

```rust
impl Person {
    fn show_age(&self) {
        println!("Age: {}", self.age);
    }
}
```



##### 2.`&mut self` 可变引用

- 当以`&mut self` 接收时，相当于`self: &mut Self`按照可变引用形式接收参数。
- 此时内部的`self`会拿到一个**可变借用**，但是**不占据所有权**。这种情况下你可以在方法内部修改`self`的值，说明这个方法会对数据进行某些改动。
- 下面 `have_birthday` 方法，过完生日后，年龄就要加一岁，因此需要`&mut self`。

```rust
impl Person {
    fn have_birthday(&mut self) {
        self.age += 1;
        println!("过生日啦，现在{}岁!", self.age);
    }
}
```



##### 3.`self/mut self` 获取所有权

当以`self` 接收时，相当于`self: Self`，此时如果触发移动，则外部对象会失效，如果是拷贝，则会产生两份副本。这个细节会在后面所有权章节深入讲解，你可以提前认为，这里有可能产生两种行为模式，它和某些`trait`有关。

```rust
impl Person {
    fn into_name(self) -> String {
        self.name
    }
}
```

如果触发的是移动的话，这里有两种常见情况会使用这种传参模式：



**1.链式调用**

链式调用每个方法都返回self，这样就可以连续调用多个方法：

```rust
struct Text {
    content: String,
    is_bold: bool,
    is_italic: bool,
}

impl Text {
    fn new(content: String) -> Self {
        Text {
            content,
            is_bold: false,
            is_italic: false,
        }
    }
    
    // 每个方法都消费self并返回新的self
    fn bold(mut self) -> Self {
        self.is_bold = true;
        self
    }
    
    fn italic(mut self) -> Self {
        self.is_italic = true;
        self
    }
    
    fn show(&self) {
        let bold = if self.is_bold { "粗体" } else { "正常" };
        let italic = if self.is_italic { "斜体" } else { "正常" };
        println!("内容: {} [{}, {}]", self.content, bold, italic);
    }
}
```

以上代码中，定义了一个`text`结构体，表示一段文本。并可以通过`bold`和`italic`设置它的粗细和斜体。

如果按照一般的模式，你可能会这么写代码：

```rust
let mut t = Text::new("hello world!");
t.bold();
t.italic();
t.show();
```

你就需要反复使用`t.`这个前缀。

而这种返回`Self`的形式，可以直接链式调用：

```rust
Text::new("hello world!").bold().italic().show();
```

两段代码功能是一样的，但是后者很明显清爽了很多，而且不用维护中间变量`t`。

**2.方法结束后销毁**

当方法执行完后对象就不再需要时，使用`self`可以明确表示消费该对象：

```rust
struct Ticket {
    singer: String,
    user: String,
}

impl Ticket {
    fn new(singer: String, user: String) -> Self {
        Ticket {
            singer,
            user,
        }
    }
    
    // 使用门票，消费后门票作废
    fn use_ticket(self) {
        println!("{} 已使用 {} 的门票", self.user, self.singer)
    }
    
    // 查看门票信息
    fn read_singer(&self) {
        println!("这是 {} 演唱会的门票", self.singer)
    }
    
    fn read_user(&self) {
        println!("使用者为: {}", self.user)
    }
}
```

以上是一个表示门票的类，它存储了歌手以及购票者的信息，可以通过`read_xxx`方法读取对应的信息。

```rust
let ticket = Ticket::new("邓紫棋".to_string(), "张三".to_string());
ticket.use_ticket();  // 消费ticket
```

例如以上代码表示张三买了一张邓紫棋演唱会的门票，当他检票的时候，调用`use_ticket`方法，那么此时外部的`ticket`就失去所有权，无法再使用了，可以理解为这张票在验票完毕后，就无法再使用了，`use_ticket`是最后一个调用的方法。





##### 4.智能指针

`self`还允许传入指向`Self`类型的智能指针。

例如：

```rust
struct Data {
    value: i32,
}

impl Data {
    fn new(value: i32) -> Self {
        Data { value }
    }
    
    fn process_in_heap(self: Box<Self>) -> i32 {
        println!("处理堆上的数据: {}", self.value);
        self.value * 2
    }
    
    fn boxed(self) -> Box<Self> {
        Box::new(self)
    }
}
```

这里就是简单的把`i32`进行了一个包装，不关注这个结构体实现了什么功能，重点在于`process_in_heap`的第一个参数，接受了一个 `self: Box<Self>`，这种行为是允许的。

但是使用智能指针不存在简化的写法，例如`self: &Self`可以简化为`&self`，`self: Box<Self>`没有任何简化形式。除了`Box`其它智能指针也是允许的。









### 7.2 关联函数

`impl` 块的另一个有用的功能是：允许在 `impl` 块中定义 **不** 以 `self` 作为参数的函数。

这被称为 **关联函数**（*associated functions*），因为它们与结构体相关联。它们仍是函数而不是方法，因为它们并不作用于一个结构体的实例。你已经使用过 `String::from` 关联函数了。

- **关联函数经常被用作返回一个结构体新实例的构造函数**。比如我们可以创建一个关联函数new()，接受宽和高作为参数，然后返回一个Rectangle实例，这样使用new()函数创建实例会更方便些
- 使用结构体名和 `::` 语法来调用这个关联函数

```rust
impl Rectangle {
    fn new(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }
}

fn main() {
    let rect = Rectangle::new(30, 50);

    println!("宽{}，高{}", rect.width, rect.height);
}
```

关联函数其实相当于其它面向对象语言中的静态函数。





### 7.3 关联常量

关联常量是定义在`impl`块中的常量值，它们与类型本身相关联，而不是与具体的实例相关联。

关联常量使用`const`进行定义：

```rust
struct Circle {
    radius: f64,
}

impl Circle {
	const PI: f64 = 3.14;
	
	// 在方法中使用关联常量
	fn area(&self) -> f64 {
	    Self::PI * self.radius * self.radius
	}
    
	fn circumference(&self) -> f64 {
	    2.0 * Self::PI * self.radius
	}

	fn get_pi() -> f64 {
		Self::PI
	}
}
```

在以上代码中，`PI`就是一个关联常量，表示圆周率。

因为圆周率是一个固定的值，不会发生改变，所有的`Circle`实例去访问圆周率，都可以直接访问一个常量。同一类型的所有实例，访问到关联常量都是同一份数据，关联常量在内存中只会存储一份。

另外的，在关联函数中也可以访问关联常量。比如上述的`get_pi`，它的第一个参数不是`self`，但是方法内依然可以访问`Self::PI`。在`impl`的外部，也可以通过`Self::PI`直接拿到关联常量。

关联常量其实相当于其它面向对象语言中的静态成员。



### 7.4 多范式

如果仔细看会发现一些命名上的逻辑，面向对象中的`静态方法`和`静态成员`在`Rust`中分别叫做`关联函数`和`关联常量`。

此处的关联一词，一方面是有意避开了面向对象风格的命名，另一方面，它表示这个函数或者常量，只是和当前的类型有关联，比如`PI`这个常量与圆`Circle`强相关，涉及到面积体积之类的计算。

实际上，`Rust`是一个多范式语言，它同时吸收了面向对象，函数式编程等多种思想，并且把它们做合适的裁剪，比如`Rust`没有所谓的类型继承，甚至没有类这个概念，而是组合优先。

本博客前文多次提及面向对象，就是因为这些思想大多来自面向对象，但这里需要强调，Rust是一个多范式语言，而不是一个纯面向对象语言。



### 7.5 多个impl块

每个结构体都允许拥有多个 `impl` 块。每个`impl`块也可以定义多个方法和关联函数

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

// 用于计算矩形的面积和周长
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn perimeter(&self) -> u32 {
        self.width * 2 + self.height * 2
    }
}

// 用于创建实例
impl Rectangle {
    fn new(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }
}

fn main() {
    let rect = Rectangle::new(30, 50);

    println!("面积：{}，周长：{}", rect.area(), rect.perimeter());
}

```

:::tip

方法和关联函数也可以放在同一个`impl`块中，如下

```rust
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn perimeter(&self) -> u32 {
        self.width * 2 + self.height * 2
    }
    
    fn new(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }
}
```

但是官方不推荐这么做，把方法和关联函数分类放更有利于阅读

:::

