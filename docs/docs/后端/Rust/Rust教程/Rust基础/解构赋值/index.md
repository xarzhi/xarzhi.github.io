# 解构赋值

解构赋值主要分为两部分，一个是解构，一个是赋值

解构赋值发生在等号`=`的两边

解构赋值最多使用在结构体，但元组、数组、切片、枚举、引用、Box也都能解构



## 1.结构体的解构

结构体分为常规结构体、元组结构体、单元结构体，其中单元结构体是不可以解构的，因为里面根本没有数据



### 1.1 常规结构体的解构

我们先定义一个结构体，然后创建一个实例

```rust
enum Sex {
    Male,
    Female,
}

struct Person {
    name: String,
    age: u8,
    sex: Sex,
    email: String,
    is_adult: bool,
}

fn main() {
    let p = Person {
        name: "xarzhi".to_string(),
        age: 18,
        sex: Sex::Male,
        email: "2235762265@qq.com".to_string(),
        is_adult: true,
    };
}
```

那么此时我们想要获取p里面的属性值，除了可以使用`.`运算符，还可以使用解构赋值

```rust
let Person {
    name,
    age,
    sex,
    email,
    is_adult,
} = p;

println!("姓名：{:?}", name); // 姓名："xarzhi"
println!("年龄：{:?}", age); // 年龄：18
println!("性别：{:?}", sex); // 性别：Male
println!("邮箱：{:?}", email); // 邮箱："2235762265@qq.com"
println!("是否成年：{:?}", is_adult); // 是否成年：true
```

那么结构体的解构赋值就是这样，在等号的前面使用**结构体名+花括号**，花括号直接写需要解构的变量名





### 1.2 忽略剩余元素

如果只需要部分字段，需要在**最后**使用`..`忽略其他字段

```rust
let p = Person {
    name: "xarzhi".to_string(),
    age: 18,
    sex: Sex::Male,
    email: "2235762265@qq.com".to_string(),
    is_adult: true,
};

let Person { name, .. } = p;
```

如果不使用`..`，只能全部解构，不然`rust`会给你报错





### 1.2 别名

当有变量名冲突时，可以使用如下语法给解构的变量起个别名

```rust {12}
let p = Person {
    name: "xarzhi".to_string(),
    age: 18,
    sex: Sex::Male,
    email: "2235762265@qq.com".to_string(),
    is_adult: true,
};

let name = "ikun".to_string();

let Person { 
    name: p_name,
    ..
} = p;

println!("姓名：{:?}", p_name); // 姓名："xarzhi"
```







### 1.3 解构引用

为了避免所有权的转移，可以使用`ref`关键字借用一个字段

```rust {10,11}
let p = Person {
    name: "xarzhi".to_string(),
    age: 18,
    sex: Sex::Male,
    email: "2235762265@qq.com".to_string(),
    is_adult: true,
};

let Person {
    ref name,
    ref age,
    ..
} = p;
```



当然也可以使用`ref mut`组合，解构一个可变引用

前提是结构体实例要是`mut`的

```rust
let mut p = Point { x: 1, y: 2 };

let Point { ref mut x, ref mut y } = p;

*x += 1;
*y += 1;

println!("{:?}", p);
```





### 1.4 match解构

```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 0, y: 10 };

    match p {
        Point { x: 0, y } => println!("在 y 轴上，y = {}", y),
        Point { x, y: 0 } => println!("在 x 轴上，x = {}", x),
        Point { x, y } => println!("({}, {})", x, y),
    }
}
```

使用引用

```rust
match &p {
    Point { x, y } => println!("{} {}", x, y),
}
```





### 1.5 if let 解构

```rust
let p = Person {
    name: "xarzhi".to_string(),
    age: 18,
    sex: Sex::Male,
    email: "2235762265@qq.com".to_string(),
    is_adult: true,
};

if let Person { name, .. } = p {
    println!("{}", name); // "xarzhi"
}
```





### 1.6 嵌套结构体解构

```rust
struct Point {
    x: i32,
    y: i32,
}

struct Rect {
    top_left: Point,
    bottom_right: Point,
}

let r = Rect {
    top_left: Point { x: 0, y: 10 },
    bottom_right: Point { x: 10, y: 0 },
};

let Rect {
    top_left: Point { x: x1, y: y1 },
    bottom_right: Point { x: x2, y: y2 },
} = r;

println!("{}, {}, {}, {}", x1, y1, x2, y2);
```



### 1.7 元祖结构体的结构

元祖结构体，和元祖的结构方式一样

```rust
struct Color(u8, u8, u8);

let c = Color(255, 0, 128);

let Color(r, g, b) = c;

println!("{} {} {}", r, g, b);
```





## 2.元祖的解构

元祖的解构是按顺序的

```rust
fn main() {
    let t = (1, "hello", true);
    let (a, b, c) = t;

    println!("{},{},{}", a, b, c); // 1,hello,true
}
```





## 3.数组的解构

数组的解构是按顺序的

```rust
fn main() {
    let arr = [1, 2, 3];
    let [x, y, z] = arr;

    println!("{},{},{}", x, y, z);		// 1,2,3
}

```





## 4.切片的解构

切片只能在 `match`中解构

```rust
let s = &[1, 2, 3, 4];

match s {
    [first, second, ..] => println!("{} {}", first, second),
    [] => println!("empty"),
}
```





## 5.枚举的解构

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(u8, u8, u8),
}

let msg = Message::Move { x: 10, y: 20 };

match msg {
    Message::Quit => println!("quit"),
    Message::Move { x, y } => println!("{}, {}", x, y),
    Message::Write(text) => println!("{}", text),
    Message::ChangeColor(r, g, b) => println!("{} {} {}", r, g, b),
}
```





## 6.Box的引用

```rust
let b: Box<i32> = Box::new(10);

match b {
    box x => println!("{}", x),
}
```

或者

```rust
let boxed = Box::new(10);
let Box(x) = boxed;
```

