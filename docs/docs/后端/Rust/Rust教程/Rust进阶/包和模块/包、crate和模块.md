# 包、crate和模块.md

Rust 有许多功能可以让你管理代码的组织，包括哪些内容可以被公开，哪些内容作为私有部分，以及程序每个作用域中的名字。这些功能。这有时被称为 “模块系统（the module system）”，包括：

- **项目**（***Packages***）： Cargo 的一个功能，它允许你构建、测试和分享 crate。
- **包**（**Crates**） ：一个模块的树形结构，可以作为三方库进行分发，也可以生成可执行文件进行运行
- **模块**（***Modules***）：可以一个文件多个模块，也可以一个文件一个模块，模块可以被认为是真实项目中的代码组织单元
- **路径**（***path***）：一个命名例如结构体、函数或模块等项的方式



## 1.包crate

**Crate 是 Rust 的编译单元（compilation unit）**，也是最小的可复用代码单元。

一个 `crate` 最终会被编译器编译成：

- **二进制（binary）**：可执行程序（`main`）
- **库（library）**：给其他 crate 使用的库（`lib`）

| **类型**      | **特点**          | **入口文件**  |
| :------------ | :---------------- | :------------ |
| binary crate  | 可执行程序        | `src/main.rs` |
| library crate | 被别的 crate 依赖 | `src/lib.rs`  |



**只有“根文件”才代表 crate**，crate 的根文件有哪些？

- **Binary crate**：`src/main.rs`
- **Library crate**：`src/lib.rs`
- 多 binary crate
  - **src/bin/server.rs**
  - **src/bin/client.rs**

- 每个 `src/bin/*.rs`都是一个独立的 binary crate



普通模块文件 ≠ crate



## 2.项目package

**Package 是一个或多个 crate 的集合**，由 `Cargo.toml`管理。常译作“包”，但容易和 crate 混淆

鉴于 Rust 团队标新立异的起名传统，以及包的名称被 `crate` 占用，库的名称被 `library` 占用，经过斟酌， 我们决定将 `Package` 翻译成项目，你也可以理解为工程、软件包。

由于 `Package` 就是一个项目，因此它包含有独立的 `Cargo.toml` 文件，以及因为功能性被组织在一起的一个或多个包。一个 `Package` 只能包含**一个**库(library)类型的包，但是可以包含**多个**二进制可执行类型的包。





### 2.1 二进制package

创建一个二进制 `Package`：

```bash
$ cargo new my-project
     Created binary (application) `my-project` package
$ ls my-project
Cargo.toml
src
$ ls my-project/src
main.rs
```

这里，Cargo 为我们创建了一个名称是 `my-project` 的 `Package`，同时在其中创建了 `Cargo.toml` 文件，可以看一下该文件，里面并没有提到 `src/main.rs` 作为程序的入口，原因是 Cargo 有一个惯例：**`src/main.rs` 是二进制包的根文件，该二进制包的包名跟所属 `Package` 相同，在这里都是 `my-project`**，所有的代码执行都从该文件中的 `fn main()` 函数开始。

使用 `cargo run` 可以运行该项目，输出：`Hello, world!`。



### 2.2 库package

再来创建一个库类型的 `Package`：

```bash
$ cargo new my-lib --lib
     Created library `my-lib` package
$ ls my-lib
Cargo.toml
src
$ ls my-lib/src
lib.rs
```

首先，如果你试图运行 `my-lib`，会报错：

```bash
$ cargo run
error: a bin target must be available for `cargo run`
```

原因是库类型的 `Package` 只能作为三方库被其它项目引用，而不能独立运行，只有之前的二进制 `Package` 才可以运行。

与 `src/main.rs` 一样，Cargo 知道，如果一个 `Package` 包含有 `src/lib.rs`，意味它包含有一个库类型的同名包 `my-lib`，该包的根文件是 `src/lib.rs`。

```txt
.
├── Cargo.toml
├── Cargo.lock
├── src
│   ├── main.rs
│   ├── lib.rs
│   └── bin
│       └── main1.rs
│       └── main2.rs
├── tests
│   └── some_integration_tests.rs
├── benches
│   └── simple_bench.rs
└── examples
    └── simple_example.rs
```

- 唯一库包：`src/lib.rs`
- 默认二进制包：`src/main.rs`，编译后生成的可执行文件与 `Package` 同名
- 其余二进制包：`src/bin/main1.rs` 和 `src/bin/main2.rs`，它们会分别生成一个文件同名的二进制可执行文件
- 集成测试文件：`tests` 目录下
- 基准性能测试 `benchmark` 文件：`benches` 目录下
- 项目示例：`examples` 目录下







### 2.3 典型的 `Package` 结构

上面创建的 `Package` 中仅包含 `src/main.rs` 文件，意味着它仅包含一个二进制同名包 `my-project`。如果一个 `Package` 同时拥有 `src/main.rs` 和 `src/lib.rs`，那就意味着它包含两个包：库包和二进制包，这两个包名也都是 `my-project` —— 都与 `Package` 同名。

一个真实项目中典型的 `Package`，会包含多个二进制包，这些包文件被放在 `src/bin` 目录下，每一个文件都是独立的二进制包，同时也会包含一个库包，该包只能存在一个 `src/lib.rs`：





## 2.模块

模块让我们可以将一个 `crate` 中的代码进行分组

### 2.1 定义模块

模块的定义如下：

```rust
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}

        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}

        fn server_order() {}

        fn take_payment() {}
    }
}
```

**使用`mod`关键字定义模块，后面跟上模块名，使用`{}`包含模块的主体**

**模块也可以包含其他模块，可以无限嵌套**

**模块还可以保存一些定义的其他项，比如结构体、枚举、常量、特性、或者函数。**





## 3.路径

Rust 使用路径的方式在模块树中找到一个项的位置，就像在文件系统使用路径一样。如果我们想要调用一个函数，我们需要知道它的路径。

路径有两种形式：

- **绝对路径**（*absolute path*）从 crate 根开始，以 `crate` 名或者字面值 `crate` 开头。
- **相对路径**（*relative path*）从当前模块开始，以 `self`、`super` 或当前模块的标识符开头。

绝对路径和相对路径都后跟一个或多个由双冒号（`::`）分割的标识符。

```rust
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // 绝对路径
    crate::front_of_house::hosting::add_to_waitlist();

    // 相对路径
    front_of_house::hosting::add_to_waitlist();
}
```



### 3.1 使用pub暴露路径

**模块以及模块中的数据默认都是私有的**，想要在其他地方访问模块以及模块中的内容，需要使用`pub`将需要的内容设置位公共的（`public`）

```rust {2}
mod front_of_house {
    pub mod hosting {
        fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // 绝对路径
    crate::front_of_house::hosting::add_to_waitlist();

    // 相对路径
    front_of_house::hosting::add_to_waitlist();
}
```

以上代码会报错，因为只将模块设置了公有，但模块里的数据仍是私有

想要的在别的地方精确的使用模块中的数据，不仅要把该模块设置为`pub`，还要把需要使用的那个数据设置为`pub`

```rust {2,3}
mod front_of_house {
    pub mod hosting {
      pub fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // 绝对路径
    crate::front_of_house::hosting::add_to_waitlist();

    // 相对路径
    front_of_house::hosting::add_to_waitlist();
}
```



### 3.2 使用 super 起始的相对路径

我们还可以使用 `super` 开头来构建从父模块开始的相对路径。这么做类似于文件系统中以 `../` 开头的语法。

```rust
fn serve_order() {}

mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::serve_order();
    }

    fn cook_order() {}
}
```



### 3.3 使用self引用模块

`self` 其实就是引用自身模块中的项，也就是说和我们之前章节的代码类似，都调用同一模块中的内容，区别在于之前章节中直接通过名称调用即可，而 `self`，你得多此一举：

```rust
fn serve_order() {
    self::back_of_house::cook_order()
}

mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        crate::serve_order();
    }

    pub fn cook_order() {}
}
```





## 4.结构体和枚举的可变性

### 4.3 创建公有的结构体

我们还可以使用 `pub` 来设计公有的结构体和枚举，不过有一些额外的细节需要注意。

**如果我们在一个结构体定义的前面使用了 `pub` ，这个结构体会变成公有的，但是这个结构体的字段仍然是私有的。**

```rust
#![allow(unused_variables)]
fn main() {
    mod back_of_house {
        pub struct Breakfast {
            pub toast: String,
            seasonal_fruit: String,
        }

        impl Breakfast {
            pub fn summer(toast: &str) -> Breakfast {
                Breakfast {
                    toast: String::from(toast),
                    seasonal_fruit: String::from("peaches"),
                }
            }
        }
    }

    pub fn eat_at_restaurant() {
        let mut meal = back_of_house::Breakfast::summer("Rye");
        meal.toast = String::from("Wheat");
        println!("I'd like {} toast please", meal.toast);

		
        // meal.seasonal_fruit = String::from("blueberries");
    }
}
```

因为 `back_of_house::Breakfast` 结构体的 `toast` 字段是公有的，所以我们可以在 `eat_at_restaurant` 中使用点号来随意的读写 `toast` 字段。注意，我们不能在 `eat_at_restaurant` 中使用 `seasonal_fruit` 字段，因为 `seasonal_fruit` 是私有的。尝试去除那一行修改 `seasonal_fruit` 字段值的代码的注释，看看你会得到什么错误！

还请注意一点，因为 `back_of_house::Breakfast` 具有私有字段，所以这个结构体需要提供一个公共的关联函数来构造示例 `Breakfast` (这里我们命名为 `summer`)。如果 `Breakfast` 没有这样的函数，我们将无法在 `eat_at_restaurant` 中创建 `Breakfast` 实例，因为我们不能在 `eat_at_restaurant` 中设置私有字段 `seasonal_fruit` 的值。



### 4.4 创建公有的枚举

与之相反，**如果我们将枚举设为公有，则它的所有成员都将变为公有**。我们只需要在 `enum` 关键字前面加上 `pub`

```rust
#![allow(unused_variables)]
fn main() {
    mod back_of_house {
        pub enum Appetizer {
            Soup,
            Salad,
        }
    }

    pub fn eat_at_restaurant() {
        let order1 = back_of_house::Appetizer::Soup;
        let order2 = back_of_house::Appetizer::Salad;
    }
}
```





## 4.use关键字

前面使用其他模块中的数据，需要写上很长的路径，若使用次数多了，就会有很多冗余代码

通过使用use路径引入，只需要引入一次，便可以多次使用

```rust {7}
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}
```

在作用域中增加 `use` 和路径类似于在文件系统中创建软连接（符号连接，symbolic link）。

通过在 `crate` 根增加 `use crate::front_of_house::hosting`，现在 `hosting` 在作用域中就是有效的名称了，如同 `hosting` 模块被定义于 `crate` 根一样。通过 `use` 引入作用域的路径也会检查私有性，同其它路径一样。



你还可以使用 `use` 和**相对路径**来将一个项引入作用域。

```rust {7}
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}
```





:::tip 创建管用的use路径

你可能会比较疑惑，为什么我们是指定 `use crate::front_of_house::hosting` ，然后在 `eat_at_restaurant` 中调用 `hosting::add_to_waitlist` ，而不是通过指定一直到 `add_to_waitlist` 函数的 `use` 路径来得到相同的结果，如：

```rust {7}
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting::add_to_waitlist;

pub fn eat_at_restaurant() {
    add_to_waitlist();
    add_to_waitlist();
    add_to_waitlist();
}
```

虽然都完成了相同的任务，但是`use front_of_house::hosting;`是使用 `use` 将函数直接引入作用域的习惯用法。

要想使用 `use` 将函数的父模块引入作用域，我们必须在调用函数时指定父模块，这样可以清晰地表明函数不是在本地定义的，同时使完整路径的重复度最小化。上例中的代码不清楚 `add_to_waitlist` 是在哪里被定义的。

另一方面，使用 `use` 引入结构体、枚举和其他项时，习惯是指定它们的完整路径。下例展示了将 `HashMap` 结构体引入二进制 crate 作用域的习惯用法。

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert(1, 2);
}
```

这种习惯用法背后没有什么硬性要求：它只是一种惯例，人们已经习惯了以这种方式阅读和编写 Rust 代码。

这个习惯用法有一个例外，那就是我们想使用 `use` 语句将两个具有相同名称的项带入作用域，因为 Rust 不允许这样做。下例展示了如何将两个具有相同名称但不同父模块的 `Result` 类型引入作用域，以及如何引用它们。

```rust
use std::fmt;
use std::io;

fn function1() -> fmt::Result {
    // --snip--
}

fn function2() -> io::Result<()> {
    // --snip--
}
```

如你所见，使用父模块可以区分这两个 `Result` 类型。如果我们是指定 `use std::fmt::Result` 和 `use std::io::Result`，我们将在同一作用域拥有了两个 `Result` 类型，当我们使用 `Result` 时，Rust 则不知道我们要用的是哪个，所以我们只能引入他们的父模块

:::





## 5.模块与文件分离

当模块变多或者变大时，需要将模块放入一个单独的文件中，让代码更好维护。

现在，把 `front_of_house` 前厅分离出来，放入一个单独的文件中 `src/front_of_house.rs`：

在多文件中，导入其他模块的资源，要**先声明模块名**，再使用`use`导入

注意要使用`pub`把要用的资源设置为公共的

:::code-group

```rust [main.rs]
mod front_of_house;  // 先声明模块，重要
use crate::front_of_house::front_of_house::hosting::add_to_waitlist;		// 绝对路径
use front_of_house::front_of_house::hosting;		// 相对路径

fn main() {
    hosting::add_to_waitlist();
    add_to_waitlist();
}
```

```rust [front_of_house.rs]
pub mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}
```

:::

`mod front_of_house;` 告诉 Rust 从另一个和模块 `front_of_house` 同名的文件中加载该模块的内容



### 5.1 路径有文件夹时

当一个模块有许多子模块时，我们也可以通过文件夹的方式来组织这些子模块。

在上述例子中，我们可以创建一个目录 `front_of_house`，然后在文件夹里创建一个 `hosting.rs` 文件，`hosting.rs` 文件现在就剩下：

:::code-group

```rust [front_of_house/hosting.rs]
pub fn add_to_waitlist() {}
```

:::

现在，我们尝试编译程序，很遗憾，编译器报错：

```bash
error[E0583]: file not found for module `front_of_house`
 --> src/lib.rs:3:1
  |
1 | mod front_of_house;
  | ^^^^^^^^^^^^^^^^^^
  |
  = help: to create the module `front_of_house`, create file "src/front_of_house.rs" or "src/front_of_house/mod.rs"
```

是的，如果需要将文件夹作为一个模块，我们需要进行显式指定暴露哪些子模块。按照上述的报错信息，我们有两种方法：

1.在 `front_of_house` 目录里创建一个 `mod.rs`，如果你使用的 `rustc` 版本 `1.30` 之前，这是唯一的方法。

```txt
src
├── front_of_house
│   │── hosting.rs
│   └── mod.rs
└── main.rs
```

:::code-group

```rust [front_of_house/hosting.rs]
pub fn add_to_waitlist() {}
```

```rust [front_of_house/mod.rs]
pub mod hosting;
```

```rust [main.rs]
mod front_of_house;

fn main() {
    front_of_house::hosting::add_to_waitlist();
}
```

:::



2.在 `front_of_house` **同级**目录里创建一个与模块（目录）**同名**的 rs 文件 `front_of_house.rs`，在新版本里，更建议使用这样的命名方式来避免项目中存在大量同名的 `mod.rs` 文件。

```txt
src
├── front_of_house
│   └── hosting.rs
├── front_of_house.rs
└── main.rs
```

:::code-group

```rust [front_of_house/hosting.rs]
pub fn add_to_waitlist() {}
```

```rust [front_of_house.rs]
pub mod hosting;
```

```rust [main.rs]
mod front_of_house;

fn main() {
    front_of_house::hosting::add_to_waitlist();
}
```

:::







## 6.as 别名

使用 `use` 将两个同名类型引入同一作用域这个问题还有另一个解决办法：在这个类型的路径后面，我们使用 `as` 指定一个新的本地名称或者别名。通过 `as` 重命名其中一个 `Result` 类型。

```rust
use std::fmt::Result;
use std::io::Result as IoResult;

fn function1() -> Result {
    // --snip--
}

fn function2() -> IoResult<()> {
    // --snip--
}
```

在第二个 `use` 语句中，我们选择 `IoResult` 作为 `std::io::Result` 的新名称，它与从 `std::fmt` 引入作用域的 `Result` 并不冲突



## 5.重导出

当使用 `use` 关键字将名称导入作用域时，在新作用域中可用的名称是私有的。

如果为了让调用你编写的代码的代码能够像在自己的作用域内引用这些类型，可以结合 `pub` 和 `use`。

这个技术被称为 “*重导出*（*re-exporting*）”，因为这样做将项引入作用域并同时使其可供其他代码引入自己的作用域。

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}
```

通过 `pub use`，现在可以通过新路径 `hosting::add_to_waitlist` 来调用 `add_to_waitlist` 函数。如果没有指定 `pub use`，`eat_at_restaurant` 函数可以在其作用域中调用 `hosting::add_to_waitlist`，但外部代码则不允许使用这个新路径。

当你的代码的内部结构与调用你的代码的程序员的思考领域不同时，重导出会很有用。例如，在这个餐馆的比喻中，经营餐馆的人会想到“前台”和“后台”。但顾客在光顾一家餐馆时，可能不会以这些术语来考虑餐馆的各个部分。使用 `pub use`，我们可以使用一种结构编写代码，却将不同的结构形式暴露出来。这样做使我们的库井井有条，方便开发这个库的程序员和调用这个库的程序员之间组织起来。



## 6.使用外部包

之前我们编写了一个猜猜看游戏。那个项目使用了一个外部包，`rand`，来生成随机数。为了在项目中使用 `rand`，在 *Cargo.toml* 中加入了如下行：

文件名: Cargo.toml

```toml
[dependencies]
rand = "0.5.5"
```

在 *Cargo.toml* 中加入 `rand` 依赖告诉了 Cargo 要从 [crates.io](https://crates.io/) 下载 `rand` 和其依赖，并使其可在项目代码中使用。

接着，为了将 `rand` 定义引入项目包的作用域，我们加入一行 `use` 起始的包名，它以 `rand` 包名开头并列出了需要引入作用域的项。回忆一下第二章的 “生成一个随机数” 部分，我们曾将 `Rng` trait 引入作用域并调用了 `rand::thread_rng` 函数：

```rust
use rand::Rng;

fn main() {
    let secret_number = rand::thread_rng().gen_range(1, 101);
}
```

[crates.io](https://crates.io/) 上有很多 Rust 社区成员发布的包，将其引入你自己的项目都需要一道相同的步骤：在 `Cargo.toml* 列出它们并通过 `use` 将其中定义的项引入项目包的作用域中。

注意标准库（`std`）对于你的包来说也是外部 crate。因为标准库随 Rust 语言一同分发，无需修改 `Cargo.toml` 来引入 `std`，不过需要通过 `use` 将标准库中定义的项引入项目包的作用域中来引用它们，比如我们使用的 `HashMap`：

```rust
use std::collections::HashMap;
```

这是一个以标准库 crate 名 `std` 开头的绝对路径。



## 7.嵌套路径

当需要引入很多定义于相同包或相同模块的项时，为每一项单独列出一行会占用源码很大的空间。例如猜猜看示例中有两行 `use` 语句都从 `std` 引入项到作用域：

文件名: src/main.rs

```rust
use std::cmp::Ordering;
use std::io;
```

相反，我们可以使用嵌套路径将相同的项在一行中引入作用域。这么做需要指定路径的相同部分，接着是两个冒号，接着是大括号中的各自不同的路径部分

```rust
use std::{cmp::Ordering, io};
```

在较大的程序中，使用嵌套路径从相同包或模块中引入很多项，可以显著减少所需的独立 `use` 语句的数量！

我们可以在路径的任何层级使用嵌套路径，这在组合两个共享子路径的 `use` 语句时非常有用。例如，示例 7-19 中展示了两个 `use` 语句：一个将 `std::io` 引入作用域，另一个将 `std::io::Write` 引入作用域：

```rust
use std::io;
use std::io::Write;
```

两个路径的相同部分是 `std::io`，这正是第一个路径。为了在一行 `use` 语句中引入这两个路径，可以在嵌套路径中使用 `self`，如示例

```rust
use std::io::{self, Write};
```

这一行便将 `std::io` 和 `std::io::Write` 同时引入作用域。



## 8.*运算符

 通过 `*` 运算符将所有的公有定义引入作用域

如果希望将一个路径下 **所有** 公有项引入作用域，可以指定路径后跟 `*`，glob 运算符：

```rust
use std::collections::*;
```

这个 `use` 语句将 `std::collections` 中定义的所有公有项引入当前作用域。使用 glob 运算符时请多加小心！Glob 会使得我们难以推导作用域中有什么名称和它们是在何处定义的。

glob 运算符有时也用于 prelude 模式；查看 [标准库中的文档](https://doc.rust-lang.org/std/prelude/index.html#other-preludes) 了解这个模式的更多细节。