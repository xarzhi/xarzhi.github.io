# 模式匹配

模式匹配是`Rust`的核心组成部分之一，甚至可以说是最大的一个语法糖。基于这个语法，程序员可以用简短的代码表达复杂的逻辑，让代码看起来更轻便。

前面第一次学到模式匹配是在控制流中学习的match，模式匹配确实和match密切相关

在学习到元组、数组、枚举、等等数据类型后，match的作用会变的越来越大

比如：

```rust
enum Direction {
    East,
    West,
    North,
    South,
}

fn main() {
    let dire = Direction::South;
    match dire {
        Direction::East => println!("East"),
        Direction::North => println!("North"),
        Direction::South => println!("South"),
        Direction::West => println!("West"),
    };
}
```

在`match`表达式中，`=>`左侧是一个模式匹配，将`dire`这个值从上往下一个一个匹配，如果符合某个模式，就会执行`=>`后面的代码。

其中`dire`这个被匹配的值叫做`待匹配表达式`，`=>`左侧的表达式叫做`模式`，整个`=>`分支又称为`匹配臂`。

在一个模式匹配中，我将其拆解为固定的四个组成部分：`单元`、`解构`、`修饰`、`条件`。基于这四个部分，就可以组合出一个指定的模式。随后可以把这个模式放到不同的使用场景下，比如`match`、`函数参数`等等。

本博客就以`单元`、`解构`、`修饰`、`条件`以及`使用场景`五大角度，把模式匹配一点点的拆解开。



## 1.单元

所谓的单元，就是指在模式匹配中可以发挥作用的最小单元。这些单元可以自己成为一个模式匹配，也可以与`解构`、`修饰`、`条件`这样的其它部件组件，形成更复杂的模式匹配。

### 1.1 字面量

直接写具体字面值，如果被待匹配表达式的值刚好等于这个字面量，就匹配成功。

```rust
let x = 42;
match x {
    42 => println!("It's the meaning of life."),
    0 => println!("Zero"),
    _ => println!("Other"),
}
```

以上代码中，将`x`作为待匹配表达式进行一次模式匹配，`42`、`0`都是字面量，它们可以直接作为一个模式。当`x == 42`就会触发对应的分支。

另外的，此处并非只能狭义的写入字面字面量，你也可以写入`cosnt`常量和`static`。

比如：

```rust
const ZERO: i32 = 0;
const LIFE: i32 = 42;

let x = 42;

match x {
    ZERO => println!("It's zero"),
    LIFE => println!("The meaning of life"),
    _ => println!("Something else"),
}
```



### 1.2 变量绑定

可以直接将一个变量名作为模式，如果待匹配表达式执行到对应的匹配臂，且符合条件，则将待匹配表达式中对应位置的值绑定到变量上。

```rust
let x = 5;
match x {
    0 => println!("I'm a zero"),
    y => println!("Got y = {}", y), // y 捕获了 5
}
```

以上代码中，`y`就是一个变量绑定。`x`作为待匹配表达式，一开始没有匹配上字面量`0`，于是往下执行，发现`y`这条分支没有任何限制，并且`let y = x`这个赋值合法（结构相同），于是相当于执行`let y = x`后，再执行`=>`后面的内容。

这个语法非常重要，它是众多基础单元内最重要的一种，变量绑定的出现频率远比其它几个基础单元高。当它与后续部件结合后，会展示出惊人的表达能力。



### 1.3 范围 ..=

有些情况，我们关心的不仅是一个字面量，而是一个范围。比如检测某个分数是否在 `60–100` 之间，或者某个字母是否落在 `[a, z]` 区间里。

`Rust` 提供了 范围模式匹配：使用 `..=` 操作符。

语法如下：

```rust
start ..= end
```

表示一个闭区间，即匹配介于 `[start, end]` 之间的所有值。

例如：

```rust
let score = 77;

match score {
    0..=59 => println!("Fail"),
    60..=89 => println!("Good"),
    90..=100 => println!("Excellent"),
    _ => println!("Invalid score"),
}
```

解释：

- `0..=59` 表示 0 到 59 的所有数
- `60..=89` 匹配 60 到 89
- `90..=100` 匹配 90 到 100
- 如果数值落入其中，即匹配成功

1. 范围匹配只能用于支持范围比较的类型，比如 `char`、整型。它不能用于 `f64` 这些浮点数类型，因为浮点数在 `Rust` 中不具备完整的区间有序语义。
2. 范围是**闭区间**，所以边界值也包括在内



### 1.4 通配符 _

当使用`_`作为模式，会直接忽略待匹配表达式对应位置的值。

```rust
let x = 0;
match x {
    42 => println!("It's the meaning of life."),
    _ => println!("Other"),
}
```

以上模式匹配中，第一个模式匹配失败，于是匹配第二条。可以把`_`当做一个变量，`let _ = x`这个赋值合法（结构相同），因此匹配成功。但是与变量不同的是，`_`不会进行绑定，相当于把`x`这个值忽略掉了。

在与后续的其它部件结合后，可以使用这个语法直接忽略掉自己不需要的部分，也常用于`match`的最后一个分支，表示其它情况的通用处理路径。

而且在处理枚举的情况下，枚举值是有可能在不同版本添加新枚举的，此时`_`就可以处理新出现的枚举。



### 1.5 忽略 ..

`..`与`_`的功能非常类似，它也表示一种忽略，但是它在结构中，往往用于忽略多个部分。

```rust
struct Point { x: i32, y: i32, z: i32 }

let p = Point { x: 1, y: 2, z: 3 };
match p {
    Point { x, .. } => println!("x: {}", x),
    _ => println!("Other"),
}
```

以上代码用了一会要讲到的语法，可以理解为`p`这个结构体作为待匹配表达式，第一条匹配臂只对`p.x` 做处理，而`p.y`和`p.z`全部忽略，因此模式的写法是 `Point { x, .. }`，表示除了`x`外其它的值全部忽略。

不同的是，`..`不能单独作为一个模式，而前三者都可以单独作为模式。



## 2.解构

刚讲完了四种基本的组成单元，它们除了自己可以作为模式，也可以按照指定的结构进行组合，这样就可以对复合类型进行精细的拆解，你可以从已经耦合在一起的众多数据中，精准拿出你需要的数据，忽略其它不重要的数据。

在一个解构中，可以放入之前讲解的基础单元，后续我将使用`unit`来表示某个位置可以放一个基础单元。



### 2.1 元组

当对一个元组进行模式匹配时，它的语法如下：

```rust
(unit, unit, unit, ...)
```

将多个单元放到小括号`()`内，使用逗号隔开，模式中每个位置的单元会和待匹配表达式内指定位置的值进行匹配。

例如：

```rust
let triple = (1, 2, 3);

match triple {
    (1, y, z) => println!("Starts with 1: ({}, {})", y, z),
    _ => println!("It's a triple!"),
}

match triple {
    (_, _, z) => println!("End with {}", z),
    _ => println!("It's a triple!"),
}

match triple {
    (.., z) => println!("End with {}", z),
    _ => println!("It's a triple!"),
}
```

以上代码中，我展示了三个模式匹配。

在第一个模式匹配中，模式为 `(1, y, z)`，其中`1`是字面量，而`y`和`z`是绑定。这个模式匹配的意思是：如果第一个值是`1`，则匹配成功，并把`y`和`z`取出来做处理。

在第二个模式匹配中，模式为 `(_, _, z)`，其中`_`是通配符，`z`是绑定。这个模式匹配的意思是：把待匹配表达式的第三个元素取出来，绑定到`z`上，忽略待匹配表达式的前两个元素。

第三个模式匹配中，模式为`(.., z)`，其中`..`是忽略，`z`是绑定。这个模式匹配和第二个模式匹配的功能是相同的。

可以看到，这种结构中可以放入任意的单元进去匹配对应位置的值，从而对一个复杂的元组做细致的拆分。

使用`..`可以快速提取指定个数的头尾元素：

```rust
let triple = (1, 2, 3, 4, 5);

match triple {
    (a, b, ..) => println!("Starts with {} {}", a, b),
    _ => println!("It's a triple!"),
}

match triple {
    (.., d, e, f) => println!("End with {} {} {}", d, e, f),
    _ => println!("It's a triple!"),
}

match triple {
    (a, .., f) => println!("Starts with {}, End with {}", a, f),
    _ => println!("It's a triple!"),
}
```

这次是有五个元素的元组，分别进行三次模式匹配。

第一个模式 `(a, b, ..)`，把元组的头两个元素绑定到`a`和`b`上面，其余元素忽略。

第二个模式`(.., d, e, f)`，把元素的尾部三个元素绑定到`d`、`e`、`f`上，其余元素忽略。

第三个模式`(a, .., f)`，分别把头尾的元素绑定到`a`和`f`上，中间元素忽略。

但是要注意的是：在每个`tuple`模式内部，只能使用一次`..`进行忽略。

例如：

```rust
let triple = (1, 2, 3, 4, 5);
match triple {
    (.., mid, ..) => println!("The triple has {}", mid),
    _ => println!("It's a triple!"),
}

match triple {
    (.., .., f) => println!("End with {}", a),
    _ => println!("It's a triple!"),
}
```

以上两个模式匹配都是错误的，它们都使用了多次`..`，这会导致表意不明确，有歧义，这是`Rust`不允许的。

比如说 `(.., mid, ..)`你到底想提取第几个元素？有很多种情况符合这个模式，这就会导致歧义。

如果你想具体提取第三个元素，你可以这么做：`(_, _, mid, ..)`，这样就可以忽略掉前两个元素。



### 2.2 数组

数组的解构和元组非常类似，语法如下：

```rust
[unit, unit, unit, ...]
```

只需要把外部的`()`改为`[]`就是数组解构。

数组的解构又分为定长数组和不定长数组两种情况。

- 定长数组

定长数组的解构几乎完全和元组一致，既可以一个一个地匹配所有的元素，也可以使用`..`进行忽略。

```rust
let arr = [10, 20, 30, 40];

match arr {
    [first, _, third, _] => println!("first={}, third={}", first, third),
    [first, .., last]    => println!("range: {} … {}", first, last),
    [0..=20, second, ..] => println!("Start with 1, Second = {}", second),
    _ => println!("It's a Array!"),
}
```

以上代码对一个数组进行解构。

第一个分支臂 `[first, _, third, _]` 表示取出第一个和第三个元素。

第二个分支臂 `[first, .., last]` 表示取出头尾元素。

第三个分支臂`[0..=20, second, ..]` 表示当第一个元素在`[0, 20]`区间内的情况下，取出第二个元素。

其实和元组一模一样。

- 不定长数组

对于不定长数组，需要转化为切片后进行模式匹配。

```rust
fn process_slice(slice: &[i32]) {
    match slice {
        [] => println!("Empty slice"),
        [x] => println!("Single element: {}", x),
        [first, second] => println!("Two elements: {}, {}", first, second),
        [first, .., last] => println!("First: {}, Last: {}", first, last),
    }
}
```

以上代码中，`slice`接收一个数组切片，随后对这个切片进行模式匹配。

在不定长数组的模式匹配中，既可以进行定长的匹配，也可以进行不定长的匹配。

比如前三个匹配臂 `[]`、`[x]` 和 `[first, second]`。它们分别表示当这个数组长度是`0`、`1`、`2`的时候，对这个分支进行匹配，并绑定对应的值到变量上。

而最后一个分支臂使用了`..`，那么这个模式可以匹配任意长度大于等于`2`的数组，因为要确保`first`和`last`这两个变量可以绑定到值。

而这整个`match`是可以穷尽所有情况的，当数组长度为`0`、`1`、`2`分别匹配前三个分支，其余的全都能匹配上最后一个模式。



### 2.3 结构体

结构体的解构语法和结构体的构造语法很像，使用结构体的名称，然后在大括号中指定需要匹配的字段。

语法如下：

```rust
StructName {
    field1: unit,
    field2: unit,
    ...
}
```

对于每个结构体字段，都可以单独的进行模式匹配。

例如：

```rust
struct Point {
    x: i32,
    y: i32,
}

let p = Point { x: 1, y: 2 };

match p {
    Point { x: 0, y: 0 } => println!("Origin"),
    Point { x: a, y: 0 } => println!("On x-axis: {}", a),
    Point { x: 0, y: b } => println!("On y-axis: {}", b),
    Point { x: a, y: b } => println!("On neither axis: ({}, {})", a, b),
}
```

以上代码中，有一个`Point`结构体，有`x`和`y`两个字段。

第一个模式 `Point { x: 0, y: 0 }` 匹配原点，两个字段都是0。

第二个模式 `Point { x: a, y: 0 }` 匹配X轴上的点，即`Y = 0`，同时将`p.x`字段绑定到变量`a`。

第三个模式 `Point { x: 0, y: b }` 匹配Y轴上的点，即 `X = 0`，同时将`p.y`字段绑定到变量`b`。

第四个模式 `Point { x: a, y: b }` 匹配任意点，并将两个字段分别绑定到`a`和`b`。

此处我特意将`x`、`y`与`a`、`b`区分开了，其中`a`和`b`是模式匹配中的一个单元，用于变量绑定。

当模式匹配时，如果结构体的字段名与绑定的变量名相同，可以进行缩写，将`x: x` 缩写为 `x`。

比如以上模式匹配等效于：

```rust
match p {
    Point { x: 0, y: 0 } => println!("Origin"),
    Point { x, y: 0 } => println!("On x-axis: {}", x),
    Point { x: 0, y } => println!("On y-axis: {}", y),
    Point { x, y } => println!("On neither axis: ({}, {})", x, y),
}
```

当模式匹配中，不希望处理结构体的所有字段，可以使用`..`来忽略其他字段。

例如：

```rust
struct Point3D {
    x: i32,
    y: i32,
    z: i32,
}

let p = Point3D { x: 1, y: 2, z: 3 };

match p {
    Point3D { x: 0, y: 0, z } => println!("z is {}", z),
    Point3D { x: 0, y, .. } => println!("y is {}", y),
    Point3D { x, y: 0, .. } => println!("x is {}", x),
    Point3D { z, .. } => println!("x and y both not zero, z is {}", z),
}
```

以上代码中，对结构体 `Point3D`进行模式匹配。

第一个模式 `Point3D { x: 0, y: 0, z }`，当`x`和`y`都是`0`，则输出`z`

第二个模式 `Point { x: 0, y, .. }` 当`x = 0`，输出`y`，同时把`x`和`y`以外的所有字段忽略。

第三个模式 `Point { x, y: 0, .. }` 当`y = 0`，输出`x`，同时把`x`和`y`以外的所有字段忽略。

第四个模式 `Point { z, .. }` 数组`z`，同时忽略`z`以外的所有字段。



### 2.4 枚举

枚举的解构是根据枚举变体来进行的。每个变体可能有不同的数据，因此模式匹配时需要根据变体的形式来编写模式。

#### 2.4.1 无数据的枚举变体

对于无数据的枚举变体，直接使用枚举名和变体名即可。

```rust
enum Direction {
    East,
    West,
    North,
    South,
}

let dire = Direction::South;

match dire {
    Direction::East => println!("East"),
    Direction::West => println!("West"),
    _ => println!("North or South"),
}
```

在模式中，直接写出枚举变体的值即可，可以理解为一种字面量。同时也支持使用`_`进行其它值的忽略。



#### 2.4.2 带数据的枚举变体

如果枚举变体带有数据，需要在模式中指定如何解构这些数据。这包括元组变体和结构体变体。

- 元组变体

元组变体的解构类似于元组，使用小括号。

```rust
Enum::variant(unit, unit, ...)
```

其中 `Enum::variant` 表示枚举中的变体，通过`()`将这个变体的数据解构出来。

```rust
enum Message {
    Quit,
    Move(i32, i32),
    Write(String),
}

let msg = Message::Move(10, 20);

match msg {
    Message::Quit => println!("Quit"),
    Message::Move(x, y) => println!("Move to ({}, {})", x, y),
    Message::Write(s) => println!("Write: {}", s),
}
```

在匹配`Message::Move`时，用`Message::Move(x, y)`来解构出两个整数，并绑定到变量`x`和`y`。

这个过程中，可以对某个变体进行多次匹配：

```rust
match msg {
    Message::Quit => println!("Quit"),
    Message::Move(0, y) => println!("Only move at Y {}", y),
    Message::Move(x, 0) => println!("Only move at X {}", x),
    Message::Move(x, y) => println!("Move to ({}, {})", x, y),
    Message::Write(s) => println!("Write: {}", s),
}
```

以上代码对`Message::Move`进行了三次匹配，相比于前面一个版本，这次把`x = 0`和`y = 0`的情况单独拆出来做了匹配。

- 结构体变体

结构体变体的解构类似于结构体，使用大括号。

```rust
Enum::variant{
    field1: unit,
    field2: unit,
    ...
}
```

解构时，`{}`内部的用法和结构体解构完全相同。

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

let msg = Message::Move { x: 10, y: 20 };

match msg {
    Message::Quit => println!("Quit"),
    Message::Move { x, y } => println!("Move to ({}, {})", x, y),
    Message::Write(s) => println!("Write: {}", s),
}
```

在匹配`Message::Move`时，我们使用`Message::Move { x, y }`来解构出字段`x`和`y`。

与结构体相同：当字段名与变量名相同可以进行缩写，以及使用`..`可以对其余字段进行忽略。



### 2.5 嵌套解构

模式匹配还支持嵌套解构，也就是说，可以在一个模式中同时解构多个层次的数据结构。

总的来说，前面一共学习了三种类型的解构格式：

```rust
// 元组
(unit, unit, unit ...)

// 数组
[unit, unit, unit ...]

// 结构体
StructName {
    field1: unit,
    field2: unit,
    ...
}
```

事实上，更严谨一些的表述中，应该把所有`unit`换成`pattern`，`pattern`表示一个模式。

比如你可以这么做：

```rust
[(a, b), _, (c, d), ..]
```

以上是一个数组的解构，但是数组的第一个元素，使用了`(a, b)` 进行嵌套解构，因为`(a, b)`算作一个模式`pattern`。

我之前说过，五个基本单元中，除了`..`以外，剩下的都可以单独进行模式匹配，所以`_`，变量绑定，`..=`范围，字面量都可以算作一个`pattern`，那么更严谨的解构格式如下：

```rust
// 元组
(pattern, pattern, pattern...)

// 数组
[pattern, pattern, pattern...]

// 结构体
StructName {
    field1: pattern,
    field2: pattern,
    ...
}
```

在这些`pattern`中，你既可以放入单元`unit`，也可以放入其他的解构格式，唯独对`..`的出现有额外限制：

- 每层元组中允许`..`出现一次
- 每层数组中允许`..`出现一次
- 每层结构体中允许`..`出现一次，但不能单独作为`field: `后面的`pattern`出现

注意我的措辞，我说的是“每层”，比如你可以这么干：

```rust
let arr= [(1, 2, 3), (10, 20, 30), (100, 200, 300), (10, 20, 30), (1, 2, 3)];

match arr {
    [(a, b, c), second, (d, ..), .., last] => println!("do nothing"),
    _ => println!("default"),
}
```

以上模式匹配已经有一点点复杂了，首先可以看出这是一个数组，数组中每个元素都是一个元组`(i32, i32, i32)`。

`a`、`b`、`c`、`d`四个变量的类型都是`i32`，而`second` 和`last`的类型都是`(i32, i32, i32)`的元组，这里可以提现嵌套场景下，不同层级的变量拿到了不同类型的值。

在`(d, ..)`中，只匹配了第一个元素，对剩下的元素进行忽略。而在外层的`[]`中，也用了一次`..`，表示忽略中间元素，从而拿到`last`。这两次`..`的使用不冲突，因为它们是独立的。



## 3.修饰

在基本的单元和各种解构场景中，其实已经能表达大多数简单逻辑。但 `Rust` 的模式匹配还提供了一些修饰符，它们不是独立的新模式，而是对已有模式的增强。这样的修饰符能让你更精准地控制匹配过程，或者在匹配的同时完成一些额外操作。

### 3.1 &、&mut

模式匹配的表达式有可能是一个借用，此时直接用变量接收，得到的也是借用：

```rust
let x = 10;
let r = &x;
match r {
    val => i32::abs(val), // val: &i32,
};
```

`r`是一个借用，对其进行模式匹配，那么`val`自然也会绑定到一个借用，而`abs`函数需要`i32`类型，而不是一个借用，因此会报错 ，在代码中就必须手动解引用`i32::abs(*val)`。

模式匹配提供了另一种语法，在绑定时就可以自动拆掉借用，拿到内层的数据：

```rust
let x = 10;
let r = &x;
match r {
    &val => i32::abs(val), // val: i32,
};
```

在这里，模式为`&val`。当拿`&val`去匹配`r`时，`&`会自动拆掉一层借用，那么`val`的类型就是`i32`了。

并且`&`支持写多层，一次性拆掉多层借用：

```rust
let x = 10;
let r = &&x;
match r {
    &&val => i32::abs(val), // val: i32,
};
```

比如这里`r`的类型是`&&i32`，那么`&&val`就会拆掉两层借用，直接拿到内部的`i32`。

这个语法也可以拆可变借用：

```rust
let mut x = 10;
let r = &mut x;
match r {
    &mut val => i32::abs(val), // val: i32,
};
```

与`&val`类似，`&mut val`就是拆掉一层可变借用。



### 3.2 ref、mut

如果你尝试执行以下代码：

```rust
let mut s = String::from("hello");

match s {
    x => x.push_str(" world"),
}

println!("say {}", s);
```

你会发现代码报错了，而且是两处错误：

1. `x.push_str` 不允许，因为`x`不可变
2. 编译器提示`s`已经被移动了，最后一行`println!`没有所有权

这是因为在模式匹配时，`Rust` 默认是按值解构的，这个时候可能会发生拷贝，或者移动（后续会在所有权章节讲解）。

对于`String`来说，它发生的是移动。在 `x => x.push_str(" world")` 时，就已经把`s`移动给了`x`，当这行代码执行完，`x`离开作用域，变量就会被销毁。

这里相当于执行的是`let x = s;`，这个绑定是一个不可变绑定，因此`x.push_str()`也会失败。此时就需要修饰符起作用了。

- `mut`：在变量绑定的前面添加一个`mut`，会以可变绑定的形式捕获外面的值。

```rust
let mut s = String::from("hello");

match s {
    mut x => x.push_str(" world"),
}
```

在以上代码中，`x`这个变量绑定的前面添加了一个`mut`，此时`x.push_str()`就合法了，因为此时`x`是一个可变的绑定。

但是现在`x`还是把`s`给移动走了，内部就算修改了这个字符串，最后还是无法在外部输出，此时就需要另一个修饰符。

- `ref`：在变量绑定的前面添加一个`ref`，会以借用的形式捕获外面的值。

例如：

```rust
let mut s = String::from("hello");

match s {
    ref x => x.push_str(" world"),
}

println!("say {}", s);
```

此时最后一行`println!`不再报错了，因为`ref x`没有转移`s`的所有权，相当于`let x = &s;`。

但是现在 `x.push_str(" world")` 还是会报错，因为这以不可变借用的形式绑定的。

实际上，`ref`分为两种：

1. `ref`：创建不可变引用；
2. `ref mut`：创建可变引用

所谓创建可变引用，其实就是把`ref`和`mut`两个修饰符同时用上了，但是你不能写成`mut ref`，前后顺序是固定的。

最终版本的代码如下：

```rust
let mut s = String::from("hello");

match s {
    ref mut x => x.push_str(" world"),
}

println!("say {}", s);
```

现在既可以在`match`内部修改数据，又不会导致外部所有权丢失了。

可以理解为，`&`和`&mut`用于拆掉借用，而`ref`和`ref mut`用于添加借用，两者功能是相反的。



### 3.3 match ergonomics

上面我们看到，匹配时如果希望用借用而不是移动，就需要手写 `ref` 或 `ref mut`。不过，从 `Rust 2018`开始，引入了一项改进，被称为 `match ergonomics`（直译：匹配人机工学，意即让写法更舒适）。

它的作用是在模式匹配中，编译器能够自动推断并添加必要的 `ref` / `ref mut`，你常常不需要自己写。

```rust
let x = Some(10);

match &x {
    Some(v) => println!("val = {}", v), // v: &i32
    None => println!("none"),
}
```

`&x` 的类型是 `&Option<i32>`，在模式 `Some(v)` 中，`Rust` 会自动把它理解成 `Some(ref v)`。所以变量 `v` 的类型变成了 `&i32`，我们直接使用即可。

在旧版 `Rust` 或不开启 `ergonomics` 时，你必须手写成：

```rust
match &x {
    &Some(ref v) => println!("val = {}", v),
    None => println!("none"),
}
```

可变引用的例子：

```rust
let mut x = Some(10);

match &mut x {
    Some(v) => *v += 1, // v: &mut i32
    None => {}
}

println!("{:?}", x); // 输出 Some(11)
```

同理，这里 `v` 被自动推断成 `&mut i32`，你根本不用写 `Some(ref mut v)`。

那么人体工学到底是如何运作的？

> 当模式匹配在被匹配表达式中检测到`&`不可变借用或者`&mut`可变借用，且模式中没有写出这个借用，触发人体工学

示例：

```rust
match &Some(10) {
    &Some(x) => println!("value: {}", x), // x: i32
    None => println!("no value"),
}

match &Some(10) {
    Some(x) => println!("value: {}", x), // x: &i32
    None => println!("no value"),
}

match (&(10, 20), &(30, 40)) {
    ((x, y), &(a, b)) => println!("values: {}, {}, {}, {}", x, y, a, b), 
    // x: &i32, y: &i32, a: i32, b: i32
}
```

对于第一个匹配，使用`&Some(x)`匹配`&Some(10)`，外层的`&`抵消了借用，没有触发人体工学，`x`就是`i32`。

第二个匹配，使用`Some(x)`匹配`&Some(10)`，由于用户省略了外层的`&`借用，触发人体工学，于是内层的`x`会自动被修饰为`ref x`，所以类型为`& i32`。

第三个匹配，使用`((x, y), &(a, b))`匹配`(&(10, 20), &(30, 40))`。这可以拆成两部分看，前者是`(x, y)`匹配`&(10, 20)`，由于省略掉了`&`，触发人体工学，于是等效于`&(ref x, ref y)`。而后者用`&(a, b)`匹配`&(30, 40)`，没有省略外层借用，不触发人体工学，直接匹配。

`Rust`的模式匹配分为三种模式：

- `move`：移动模式，被匹配的表达式发生移动或者拷贝，相当于`let b = e;`，如果`p`是移动类型则移动，如果为值类型则拷贝
- `ref`：不可变借用模式，对被匹配表达式不可变借用，相当于`let b = &e;`
- `ref mut`：可变借用模式，对被匹配表达式可变借用，相当于`let b = &mut e;`

模式匹配可以在这几个模式中转换：

- 模式匹配默认为 `move` 模式
- 对单个绑定使用`ref`和`ref mut`前缀，可以将`move`变为`ref`或`ref mut`模式
- 触发人体工学后，内部所有绑定变为 `ref` 或 `ref mut` 模式
- 处于`ref`或者`ref mut`模式，不可变回`move`模式

刚讲完`ref`和`ref mut`前缀，它们的效果就是将一个绑定变成借用：

```rust
let s = String::from("hello");
match s {
    x => println!("value: {}", x), // x: String
}

let s = String::from("hello");
match s {
    ref x => println!("value: {}", x), // x: &String
}
```

比如以上代码，把模式从`x`变成`ref x`，最后`x`的类型就从`String`变成了`&String`。实际上就是这个`ref`前缀把`x`的模式从`move`变成了`ref`。

当触发人体工学，那么所有人体工学内部的模式都会从`move`变成`ref`。

示例：

```rust
match (&(10, (20, 30)), 40) {
    ((x, (y, z)), a) => println!("values: {}, {}, {}, {}", x, y, z, a),
    // x: &i32, y: &i32, z: &i32, a: i32
}
```

以上模式匹配中，`a`是`i32`类型，其他的都是`&i32`。因为在`(x, (y, z))`模式匹配`&(10, (20, 30))`，少了一个`&`借用，那么触发人体工学，从`move`变成`ref`模式，相当于变成了`&(ref x, (ref y, ref z))`，所有内部的绑定都加上了`ref`前缀，以借用形式绑定。

可以看到，不论是它内部的子级模式`x`，还是孙子级别的`y`和`z`，都被加上了`ref`前缀，所以说是内部的所有绑定都会被转为`ref`模式。而这一层人体工学没有影响到后面的`a`，因为它不在`(x, (y, z))`内部，依然保持默认的`move`模式。

处于`ref`模式时，不能在转回`move`模式，比如刚才的`(x, (y, z))`触发人体工学后，有人可能会想，能不能`x`是借用，而`y`和`z`不是借用，回到`move`模式？想要解除`y`和`z`的借用，当然是加一层`&`拆掉借用。

比如下面这种写法：

```rust
match (&(10, (20, 30)), 40) {
    ((x, (&y, &z)), a) => println!("values: {}, {}, {}, {}", x, y, z, a),
}
```

很遗憾，这么写直接报错，`Rust`不允许你这么做。你企图在一个已经被人体工学转化为`ref`模式的情况下，把某几个绑定转回`move`模式，这是不允许的。或者说，当触发人体工学，内部所有的绑定都不能使用`ref`、`ref mut`、`&`、`&mut`、`mut`进行修饰，只能接受由人体工学指定的`ref`进行借用。

如果你希望这种复杂场景下细粒度的权限匹配，那就不要触发人体工学，把所有层级的匹配都写明白：

```rust
match (&(10, (20, 30)), 40) {
    (&(ref x, (y, z)), a) => println!("values: {}, {}, {}, {}", x, y, z, a),
}
```

比如以上代码中，在`(x, (y, z))`前面加上了`&`，这样就没有触发人体工学，因为你没有省略借用。那么在内部使用`ref`让`x`转化为`ref`模式，而`y`和`z`保留默认的`move`模式，这样就可以进行细粒度的匹配。

接下来讲四个细节：

1. 当人体工学省略`&`就把内部绑定转为`ref`，如果省略`&mut`则把内部绑定转为`ref mut`模式

```rust
match &(10, (20, 30)) {
    (x, (y, z)) => println!("values: {}, {}, {}", x, y, z),
}

match &mut (10, (20, 30)) {
    (x, (y, z)) => println!("values: {}, {}, {}", x, y, z),
}
```

比如以上代码中，第一个模式匹配省略了`&`，那么内部的所有模式都变为`ref`，因此类型都是`&i32`。

而第二个模式匹配省略了`&mut`，内部素养的模式都变味`ref mut`，因此类型都是`&mut i32`。

1. 人体工学可以多级嵌套，但只会代入一层

```rust
match &(10, &(20, 30)) {
	(x, (y, z)) => println!("values: {}, {}, {}", x, y, z),
}
```

此处模式匹配进行了两次人体工学省略，第一次是最外层的`&(...)`，第二次是内层的`&(20, 30)`。对于`y`和`z`，虽然进行了两次人体工学省略，但他们并不是`(ref ref x, ref ref y)`，而是只代入一层借用`(ref x, ref y)`。实际上像是`ref ref x`这种写法是不合法的，对于一个绑定`ref`只能用一次，但是`&&x`拆掉多层借用是合法的。

1. 当多层人体工学省略的类型不同，也就是同时省略了`ref`和`ref mut`，优先保留`ref`。

```rust
match &mut (10, &(20, 30)) {
    (x, (y, z)) => println!("values: {}, {}, {}", x, y, z),
    // x: &mut i32, y: &i32, z: &i32
}

match &(10, &mut (20, 30)) {
    (x, (y, z)) => println!("values: {}, {}, {}", x, y, z),
    // x: &i32, y: &i32, z: &i32
}
```

第一个模式匹配中，外层人体工学省略了`&mut`，那么`x`就是`ref mut x`。而`(y, z)`再次进行了人体工学省略，并且省略掉的是`&`，这种情况下，`y`和`z`优先使用低权限的`ref`而不是`ref mut`。

第二个模式匹配中同理，外层人体工学省略了`&`，那么`x`就是`ref x`。而`(y, z)`再次进行了人体工学省略，并且省略掉的是`&mut`，`y`和`z`同样优先使用低权限的`ref`而不是`ref mut`。

这两个例子主要是证明了，人体工学情况下最终使用哪种模式，不取决于层级的远近，而是优先保留`ref`。

1. 对于本身就是借用的类型，人体工学会造成多级借用

```rust
match &(&10, 20) {
    (x, y) => {
        println!("values: {}, {}", x, y)
    }
}
```

以上代码中，外层人体工学省略了一个借用，而内部的`x`本身就匹配了`&i32`类型，由于外部的人体工学由代入一层借用，变成`ref x`，最后`x`的类型就是`&&i32`，这造成了二级借用。

------

### 3.4 绑定 @

所谓 `@` 绑定，就是“匹配 + 绑定”的结合技。它可以在模式里既进行解构，又同时把整体值绑定到变量上。

语法形式如下：

```rust
variable @ pattern
```

- `pattern` 位置会照常进行模式匹配；
- 如果匹配成功，会把整个被匹配的值再赋给左边的 `variable`。

现有一个`Ticket`结构体：

```rust
struct Ticket {
    used: bool,
    owner: String,
}

impl Ticket {
    fn new(s: String) -> Ticket {
        Ticket{
            used: false,
            owner: s,
        }
    }
    
    fn consume(&mut self) {
        self.used = true;
        println!("Ticket is used by: {}", self.owner);
    }
}
```

这个结构体表示一张门票，带有`used`属性，调用`consume`方法消费后，`used`会变成`true`。

```rust
let mut t = Ticket {
    used: false,
    owner: String::from("Jack"),
};

match t {
    mut tic @ Ticket { used: false, .. } => tic.consume(),
    _ => println!("Nothing"),
}
```

通过模式匹配 `mut tic @ Ticket { used: false, .. }` 对这张票进行消费。

这个模式匹配的意思是：对结构体`t`解构，要求`used`字段是`false`。如果模式匹配成功，那么把整个`t`赋值给`tic`，随后调用`tic.consume()`消费这张票。

`@` 绑定在很多场景下很方便，比如既想检查部分条件，又想留住整体值。否则就得写两次匹配，既冗余又累赘。

另外的，`@`还可以在匹配数组时，提取出被`..`省略的内容：

```rust
let arr = [1, 2, 3, 4, 5];

match arr {
    [first, mid @ .., last] => println!("{} {:?} {}", first, mid, last),
    _ => {}
}
```

以上代码中，对数组进行了模式匹配，提取出了`first`和`last`首尾元素，中间的元素用`..`省略。此时可以用`mid @ ..`，将中间被省略的内容绑定到`mid`上。此处的`arr`是以`move`模式匹配的，那么`mid`就是中间数组的拷贝，类型为`[i32; 3]`。

```rust
let arr = [1, 2, 3, 4, 5];

match arr {
    [first, ref mid @ .., last] => println!("{} {:?} {}", first, mid, last),
    _ => {}
}
```

可以在`mid`前面加上`ref`修饰，那么此时`mid`得到的就是数组切片`&[i32; 3]`。



### 3.5 box

`&`可以拆掉一层借用，那么智能指针能不能也被拆掉，直接拿到智能指针内部的值？

在`nightly`版本提供了一个新特性，使用`box`修饰，可以拆除`Box`智能指针内部的值：

```rust
let boxed = Box::new(Some(5));

match boxed {
    box Some(x) => println!("Got {}", x),
    box None => println!("None"),
}
```

比如以上代码中，就用`box Some(x)`，把智能指针拆掉了，直接匹配内部的`Option`，它和`&`的用法是一致的。



## 4.条件

在表达式之外，`Rust` 的模式匹配还支持在匹配逻辑上增加条件限制。这些技巧让模式匹配更具表现力，避免写冗长的 `if-else`。

### 4.1 多重模式 |

有时候多个模式分支的行为完全相同，这时可以用 `|` 把它们写在一起，表示“只要符合任一模式即可”。

语法如下：

```rust
pattern1 | pattern2 | pattern3 => {...}
```

假设现有以下模式匹配：

```rust
let score = 80;

match score {
    0..40 => println!("focus on"),
    95..=100 => println!("focus on"),
    41..=94 => println!("Normal"),
    _ => println!("invalid score"),
}
```

这个模式匹配的目的是把成绩在`[0, 40]`和`[95, 100]`的同学重点关注。这两个模式最后输出的结果都是一样的，但是我们很难把这两个模式统一为一个模式，因为中间发生了区间的跳跃，此时就需要多重模式了。

例如：

```rust
let score = 80;

match score {
    0..=40 | 95..=100 => println!("focus on"),
    41..=94 => println!("Normal"),
    _ => println!("invalid score"),
}
```

通过`|`符号，把`0..=40`和 `95..=100` 两个模式合并为一个模式，这样就可以把它们的逻辑进行统一。



### 4.2 守卫 if

虽然模式匹配已经支持解构与范围，但有些逻辑判断太灵活，光靠模式本身不够描述。这个时候，我们可以给匹配分支加上一个条件判断，叫做`守卫`。

语法形式如下：

```rust
pattern if condition => {...}
```

意思是：匹配 `pattern` 后，还要同时满足 `condition` 里的布尔表达式。

举个例子：

```rust
let num = 10;

match num {
    n if n % 2 == 0 => println!("Even number"),
    n if n % 2 == 1 => println!("Odd number"),
    _ => println!("Something else"),
}
```

第一个分支 `n if n % 2 == 0`，匹配任何数并绑定到 `n`，同时要求 `n % 2 == 0`。 若守卫条件不成立，即便模式匹配成功了，也不会进入分支，而是尝试后续分支。

值得注意的是，`if`守卫的判断时间比模式更晚，只有待匹配表达式和模式匹配成功了，才会执行后续的守卫判断。因此`if`守卫中可以直接使用模式中已经绑定好的变量，比如这里在`if`中可以直接使用`n % 2`来做判断。

条件守卫可以和多重模式 `|` 结合使用：

```rust
let ch = 'x';

match ch {
    'a'..='z' | 'A'..='Z' if ch != 'x' => println!("Other letter"),
    'x' => println!("The special x"),
    _ => println!("Not a letter"),
}
```

此处判断`ch`是不是一个字母，但是如果`ch`等于`'x'`，则需要额外处理。因此在第一行判断完它是不是一个字母后，再通过守卫判断它是不是`'x'`。

这里要提到的注意事项是，当使用`|`多重模式，它整体已经构成一个模式了，你要把 `'a'..='z' | 'A'..='Z'` 看成一个整体，当它匹配完毕后，才会执行`if`守卫。



## 5.使用场景

模式匹配并不是 `match` 的专利，它深入渗透在 `Rust` 的方方面面。可以说，只要你熟悉了模式的拼装方式，就能在各种位置写出简洁又强大的代码。以下逐一介绍它们的常见使用场景。

### 5.1 let

也许你想不到，最常见的`let`就是一个模式匹配。

比如：

```rust
let x = 10;
```

从模式匹配的角度，`x`是一个模式，`10`就是待匹配表达式，`x`是一个变量绑定的单元，因此它绑定到`10`这个值上。

语法：

```rust
let pattern = scrutinee;
```

此处的`scrutinee`表示待匹配表达式。

在 `let` 绑定中，不必只写一个变量，你可以直接在左侧放一个模式，对值进行解构。

```rust
let (x, y, _) = (1, 2, 3);         // tuple 解构
let [a, b, ..] = [1, 2, 3];  // array 解构
```

`(x, y)` 会把元组解构成两个部分，绑定到 `x` 和 `y`，`[a, b, ..]` 则对数组解构，忽略掉后续元素，只保留前两个。

你甚至可以创建一个不使用的变量：

```rust
let _ = 1;
```

在代码编写过程中，可以有一些变量写出来之后，你没有使用它，也许是为了后续版本做准备，又或者处于其它因素。

但是这个时候编译器往往会给你报警告，表示你有一个没使用的变量。只要在变量名前面加一条下划线，就可以消除这个警告，表示你这个变量定义出来，目前就是不打算使用的。

```rust
let _num = 1;
```

当然这和模式匹配关系就不大了，只是语法上有点类似，都使用了下划线，都有忽略的含义。



### 5.2 if let

你在处理`Option`的时候，也许经常写出以下这种代码：

```rust
let op = Option::from(10);

match op {
    Some(val) => println!("Got option value: {}", val),
    None => (),
}
```

在所有`match`分支中，只有一条分支是有意义的，其他分支根本不进行任何处理，这样来看`match`就有些冗余了。

**在只有一个分支有意义、其他情况都忽略时**，可以用 `if let` 来简化 `match`。

语法：

```rust
if let pattern = scrutinee {
}
```

只有当待匹配表达式符合模式的时候，才会执行`if`分支内部的内容。

例如：

```rust
let op = Option::from(10);

if let Some(value) = op {
    println!("Value: {}", value);
}
```

与完整的 `match` 相比，`if let` 只写出一个你关心的模式，剩下的情况全部隐式忽略。



### 5.3 let else

`Rust 1.65` 引入的新语法，它和`if let` 是相反的两种语法。

在`if let` 中，只有模式匹配成功才会执行分支，而`let els` 则是只有模式匹配失败才会执行分支。

语法：

```rust
let pattern = scrutinee else {
}
```

例如：

```rust
let op = Some(42);

let Some(x) = op else {
    panic!("No value!");
};

println!("x = {}", op.unwrap());
```

`let Some(x) = ...` 尝试进行模式匹配，如果匹配失败，就直接进入 `else` 分支执行。

它经常用于期望值必然存在，否则立刻提前返回/报错的逻辑，让代码更优雅。



### 5.4 while let

在循环中，可以通过 `while let` 不断尝试解构，直到匹配失败为止。

语法：

```rust
while let pattern = scrutinee {
}
```

只要待匹配表达式一直可以匹配模式，那么整个循环就会一直持续下去。

这常用于迭代地从容器里取值：

```rust
let mut stack = vec![1, 2, 3];

while let Some(top) = stack.pop() {
    println!("Popped {}", top);
}
```

每次 `stack.pop()` 返回一个 `Option`，`while let` 会在 `Some(top)` 时执行循环体，同时自动把值绑定给 `top`，当返回 `None` 时，匹配失败，循环退出。



### 5.5 for

模式也可以直接写在 `for` 循环的迭代表达式里。

语法：

```rust
for pattern in scrutinee {
}
```

比如：

```rust
let map = vec![("a", 1), ("b", 2)];

for (k, v) in map {
    println!("{}: {}", k, v);
}
```

这里 `(k, v)` 是一个模式，直接解构迭代器产生的元组。注意这里作待匹配表达式的不是整个数组，而是数组内的每个元素。



### 5.6 函数参数

函数参数本身也能写成模式。

语法：

```rust
fn func_name(pattern: type, pattern: type ...) {
}
```

比如你可以在参数中解构元组，结构体，数组等等：

```rust
fn process_tuple((a, b, c): (i32, f64, &str)) {
    println!("解构元组: a={}, b={}, c='{}'", a, b, c);
}

fn process_point(Point { x, y }: Point) {
    println!("解构Point: x={}, y={}", x, y);
}

fn process_array([first, second, third]: [i32; 3]) {
    println!("解构数组: [{}, {}, {}]", first, second, third);
}
```

再比如说，解构`point`的时候，你想保留它的整体：

```rust
fn process_with_binding(p @ Person { name, age, .. }: Person) {
    println!("整体Person: {:?}", p);
    println!("姓名: {}, 年龄: {}", name, age);
}
```

这里通过`@`保留了外层的`person`。

再比如说，你接受了某个参数，但是打算忽略它：

```rust
fn foo(_: i32) {
}
```

此处就用`_`模式匹配来忽略一个参数。



### 5.7 matches! 宏

最后一个常用场景是快速布尔判断。`matches!` 宏接收一个表达式和一个模式，如果匹配成功，返回 `true`，否则 `false`。

语法：

```rust
matches!(scrutinee, pattern);
```

例如：

```rust
let is_digit = matches!('5', '0'..='9');
```

这里 `'0'..='9'` 就是一个范围单元，`matches!` 让判定非常简洁。在部分不支持模式匹配的位置，可以通过`matches!`间接进行模式匹配，最后处理布尔值进行判断。



## 6.可反驳与不可反驳

在刚刚的众多使用场景中，它们的模式匹配也是有一定的区别的。整体分为`可反驳模式`和`不可反驳模式`。

- 不可反驳的要求一定会匹配成功，不会失败。
- 可反驳模式的意思是：可能匹配成功，也可能匹配失败

结合上文所有使用场景：

| 使用场景      | 模式要求                                 |
| :------------ | :--------------------------------------- |
| `let`         | **不可反驳模式**                         |
| `if let`      | **可反驳模式**                           |
| `let else`    | **可反驳模式**                           |
| `while let`   | **可反驳模式**                           |
| `for`         | **不可反驳模式**（每个迭代值必须能匹配） |
| 函数参数      | **不可反驳模式**                         |
| `matches!` 宏 | 接受任意模式（常用可反驳模式）           |
| `match`       | 接受任意模式（常用可反驳模式）           |

不可反驳常用在绑定语法：`let`、函数参数、`for` 循环中的迭代变量。 因为它们必须绑定到一个值上，如果失败了，语法就失去了意义。

比如说以下代码就是不允许的：

```rust
let (10, y, z) = (1, 2, 3);
```

此处用`10`去匹配了`1`，很明显会匹配失败，这就是一个可反驳模式，不能用于`let`绑定。

可反驳模式常用在 控制语法：`if let`、`while let`、`let-else`、`match`。因为这些语法本身就是在描述某种情况成立的时候才执行。