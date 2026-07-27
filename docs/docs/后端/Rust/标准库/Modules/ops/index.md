# Module std::ops

可重载的运算符。

实现这些 traits 可使您重载某些运算符。

其中的某些 traits 由 prelude 导入，因此在每个 Rust 程序中都可用。只能重载由 traits 支持的运算符。 例如，可以通过 Add trait 重载加法运算符 `+`，但是由于赋值运算符 `=` 没有后备 trait，因此无法重载其语义。 此外，此模块不提供任何机制来创建新的运算符。 如果需要无特征重载或自定义运算符，则应使用宏或编译器插件来扩展 Rust 的语法。

考虑到它们的通常含义和 运算符优先级，运算符 traits 的实现在它们各自的上下文中应该不足为奇。 例如，当实现 `Mul` 时，该操作应与乘法有些相似 (并共享期望的属性，如关联性)。

请注意，目前不支持重载 `&&` 和 `||` 运算符。由于它们的短路特性，它们需要与 `traits` 不同的设计用于其他运算符，如 `BitAnd`。他们的设计正在讨论中。

许多运算符都按值取其操作数。在涉及内置类型的非泛型上下文中，这通常不是问题。 但是，如果必须重用值，而不是让运算符使用它们，那么在泛型代码中使用这些运算符就需要引起注意。一种选择是偶尔使用 `clone`。 另一个选择是依靠所涉及的类型，为引用提供其他运算符实现。 例如，对于应该支持加法的用户定义类型 `T`，将 `T` 和 `&T` 都实现 `traits Add<T>` 和 `Add<&T>` 可能是一个好主意，这样就可以编写泛型代码而不必进行不必要的克隆。



## Examples

本示例创建一个实现 `Add` 和 `Sub` 的 `Point` 结构体，然后演示加减两个 `Point`。

```rust
use std::ops::{Add, Sub};

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl Add for Point {
    type Output = Self;

    fn add(self, other: Self) -> Self {
        Self {x: self.x + other.x, y: self.y + other.y}
    }
}

impl Sub for Point {
    type Output = Self;

    fn sub(self, other: Self) -> Self {
        Self {x: self.x - other.x, y: self.y - other.y}
    }
}

assert_eq!(Point {x: 3, y: 3}, Point {x: 1, y: 0} + Point {x: 2, y: 3});
assert_eq!(Point {x: -1, y: -3}, Point {x: 1, y: 0} - Point {x: 2, y: 3});
```



`Fn`，`FnMut` 和 `FnOnce` traits 由可以像函数一样调用的类型实现。

- `Fn` 占用 `&self`
- `FnMut`占用 `&mut self`
- `FnOnce` 占用 `self`。

这些对应于可以在实例上调用的三种方法：引用调用、可变引用调用和值调用。 这些 traits 的最常见用法是充当以函数或闭包为参数的高级函数的界限。

以 Fn 作为参数：

```rust
fn call_with_one<F>(func: F) -> usize
    where F: Fn(usize) -> usize
{
    func(1)
}

let double = |x| x * 2;
assert_eq!(call_with_one(double), 2);
```

以 `FnMut`作为参数：

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

以 `FnOnce`作为参数：

```rust
fn consume_with_relish<F>(func: F)
    where F: FnOnce() -> String
{
    // `func` 消耗其捕获的变量，因此不能多次运行
    //
    println!("Consumed: {}", func());

    println!("Delicious!");

    // 再次尝试调用 `func()` 将为 `func` 引发 `use of moved value` 错误
    //
}

let x = String::from("x");
let consume_and_return_x = move || x;
consume_with_relish(consume_and_return_x);

// 此时无法再调用 `consume_and_return_x`
```





## Structs

- **YeetExperimental**：在您的类型上实现 `FromResidual<Yeet<T>>` 以在函数返回您的类型时启用 do yeet expr 语法。
- **Range**：`half-open` 范围包括在 `start..end` 之下和仅在 `start..end` 之上。
- **RangeFrom**：范围仅包括 `start..`以下的范围。
- **RangeFull**：无限制范围 `..`。
- **RangeInclusive**：范围包括 `start..=end`的上下边界。
- **RangeTo**：范围仅排在 `..end` 之上。
- **RangeToInclusive**：范围仅包括 `..=end`以上的范围。



## Enums

- **GeneratorState**`实验性`：恢复生成器的结果。
- **Bound**：一系列键的端点。
- **ControlFlow**：用于告诉操作是应该提前退出还是像往常一样继续操作。



## Traits

- **CoerceUnsized**`实验性`：一个 trait，指示这是一个指针或一个包装器，其中可以对指针调整大小。
- **DispatchFromDyn**`实验性`：`DispatchFromDyn` 用于对象安全检查的实现 (特别允许任意 self 类型)，以保证可以调度方法的接收者类型。
- **FromResidual**`实验性`：用于指定哪些残差可以转换为哪些 `crate::ops::Try` 类型。
- **Generator**`实验性`：由内置生成器类型实现的 trait。
- **OneSidedRange**`实验性`：`OneSidedRange` 是为一侧无界的内置范围类型实现的。 例如，`a..`、`..b` 和 `..=c` 实现了 `OneSidedRange`，而 `..`、`d..e` 和 `f..=g` 则没有。
- **ResidualExperimental**：允许检索实现 Try 的规范类型，该类型具有此类型作为它的残差，并允许它保留 O 作为它的输出。
- **TryExperimental**：`?` 运算符和 `try {}` 块。
- **Add**：加法运算符 `+`。
- **AddAssign**：加法赋值运算符 `+=`。
- **BitAnd**：按位与运算符 `&`。
- **BitAndAssign**：按位与赋值运算符 `&=`。
- **BitOr**：按位或运算符 `|`。
- **BitOrAssign**：按位或赋值运算符 `|=`。
- **BitXor**：按位异或运算符 `^`。
- **BitXorAssign**：按位异或赋值运算符 `^=`。
- **Deref**：用于不可变解引用操作，例如 `*v`。
- **DerefMut**：用于可变解引用操作，例如在 `*v = 1;` 中。
- **Div**：除法运算符 `/`。
- **DivAssign**：除法赋值运算符 `/=`。
- **Drop**：析构函数中的自定义代码。
- **Fn**：采用不可变接收者的调用运算符的版本。
- **FnMut**：采用可变接收者的调用运算符的版本。
- **FnOnce**：具有按值接收者的调用运算符的版本。
- **Index**：用于在不可变上下文中索引操作 `container[index]`。
- **IndexMut**：用于可变上下文中的索引操作 `container[index]`。
- **Mul**：乘法运算符 `*`。
- **MulAssign**：乘法赋值运算符 `*=`。
- **Neg**：一元否定运算符 `-`。
- **Not**：一元逻辑否定运算符 `!`。
- **RangeBounds**：`RangeBounds` 由 Rust 的内置范围类型实现，由 `..`、`a..`、`..b`、`..=c`、`d..e` 或 `f..=g` 等范围语法生成。
- **Rem**：余数运算符 %。
- **RemAssign**：余数赋值运算符 `%=`。
- **Shl**：左移位运算符 `<<`。 请注意，因为此 trait 是针对具有多个右侧类型的所有整数类型实现的，所以 Rust 的类型检查器对 `_ << _` 具有特殊的处理方式，将整数运算的结果类型设置为左侧操作数的类型。
- **ShlAssign**：左移赋值运算符 `<<=`。
- **Shr**：右移运算符 `>>`。 请注意，因为此 trait 是针对具有多个右侧类型的所有整数类型实现的，所以 Rust 的类型检查器对 `_ >> _` 具有特殊的处理方式，将整数运算的结果类型设置为左侧操作数的类型。
- **ShrAssign**：右移赋值运算符 `>>=`。
- **Sub**：减法运算符 -。
- **SubAssign**：减法赋值运算符 `-=`。