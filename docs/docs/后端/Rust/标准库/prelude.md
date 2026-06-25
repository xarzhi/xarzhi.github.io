# Module std::prelude

## 1.什么是prelude

### 1.1 Rust prelude

在一些库中，有的内容经常被用到，比如`std`中的`String`、`Option`、`Result`等等

像这种常用到的内容，在每一个文件中用到都要导入一次的话，就比较麻烦

`prelude`就是一个单独的模块，把这些常用的内容全部导入，然后再导出，这样如果开发时用到这些常用的内容，就不用一个一个按路径导入了，可以直接从`prelude`中导入，方便许多

在创建rust项目时，`std::prelude`已经被自动导入，所以在项目中，我们可以直接使用`Option`、`Result`，而不需要`std::option::Option`，`std::result::Result`这样使用



### 1.2 其他preludes

prelude可以看作是一种模式，就是**常用的东西统一导入，再导出**，虽然`std::prelude`是被自动导入到各个项目中，但是其他模块或者第三方库一般也会有自己的prelude，这就需要自己手动导入了



## 2.Prelude的内容

**prelude** 的第一个版本用于 `Rust 2015` 和 `Rust 2018`，并存在于 `std::prelude::v1` 中。 `std::prelude::rust_2015` 和 `std::prelude::rust_2018` 重导出这个 **prelude**。 它重导出以下内容：

- `std::marker::{Copy, Send, Sized, Sync, Unpin}`，指示类型基本属性的标记 traits。
- `std::ops::{Drop, Fn, FnMut, FnOnce}`，用于析构函数和重载 () 的各种操作。
- `std::mem::drop`，一个方便的函数，用于显式丢弃一个值。
- `std::boxed::Box`，一种在堆上分配值的方法。
- `std::borrow::ToOwned`，定义 `to_owned` 的转换 `trait`，泛型从借用类型创建拥有所有权的类型的方法。
- `std::clone::Clone`，无处不在的 `trait` 定义了 `clone`，生成值的副本的方法。
- `std::cmp::{PartialEq, PartialOrd, Eq, Ord}`，比较 `traits`，实现比较一致，经常在 `trait bounds` 中看到。
- `std::convert::{AsRef, AsMut, Into, From}`，泛型转换，由精明的 API 作者用来创建重载方法。
- `std::default::Default`，具有默认值的类型。
- `std::iter::{Iterator, Extend, IntoIterator, DoubleEndedIterator, ExactSizeIterator}`，各种迭代器。
- `std::option::Option::{self, Some, None}`，一种表示值存在与否的类型。 这种类型非常常用，它的变体也被导出。
- `std::result::Result::{self, Ok, Err}`，一种可能成功或失败的函数类型。 像 `Option` 一样，它的变体也被导出。
- `std::string::{String, ToString}`，堆分配的字符串。
- `std::vec::Vec`，一个可增长的、堆分配的 `vector`。

Rust 2021 `std::prelude::rust_2021` 中使用的 **prelude**，包含了以上所有内容，另外还有重导出：

- `std::convert::{TryFrom, TryInto}`,
- `std::iter::FromIterator`.





以上内容在rust项目中都可以直接使用，不需要导入





## 3.Modules

- [rust_2024](https://www.rustwiki.org.cn/zh-CN/std/prelude/rust_2024/index.html)Experimental：Rust 标准库的 prelude 的 2024 版本。
- [rust_2015](https://www.rustwiki.org.cn/zh-CN/std/prelude/rust_2015/index.html)：Rust 标准库的 prelude 的 2015 版本。
- [rust_2018](https://www.rustwiki.org.cn/zh-CN/std/prelude/rust_2018/index.html)：Rust 标准库的 prelude 2018 版本。
- [rust_2021](https://www.rustwiki.org.cn/zh-CN/std/prelude/rust_2021/index.html)：Rust 标准库的 prelude 的 2021 版本。
- [v1](https://www.rustwiki.org.cn/zh-CN/std/prelude/v1/index.html)：Rust 标准库的 prelude 的第一个版本。