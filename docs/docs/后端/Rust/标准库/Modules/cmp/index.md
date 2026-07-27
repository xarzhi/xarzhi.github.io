## Module std::cmp

用于比较和排序值的实用工具。

该模块包含用于比较和排序值的各种工具。在总结中：

- `Eq` 和 `PartialEq` 是 traits，允许您分别定义值之间的完全相等和部分相等。 实现它们会使 `==` 和 `!=` 运算符重载。
- `Ord` 和 `PartialOrd` 是 traits，允许您分别定义值之间的全部排序和部分排序。

实现它们会使 <，<=，> 和 >= 运算符重载。

- `Ordering` 是 `Ord` 和 `PartialOrd` 的 `main` 函数返回的枚举，描述了一种排序。
- `Reverse` 是一种结构体，可让您轻松地颠倒顺序。
- `max` 和 `min` 是建立在 `Ord` 基础上的函数，允许您找到两个值的最大值或最小值。

有关更多详细信息，请参见列表中每个项的相应文档。



## Structs

- **Reverse**：用于逆序排序的辅助结构体。



## Enums

- **Ordering**：`Ordering` 是两个值之间比较的结果。



## Traits

- **Eq**：等价关系 等式比较的 Trait。
- **Ord**：一个用于形成 全序关系 的类型的 trait。
- **PartialEq**：Trait 等值比较。
- **PartialOrd**：一个用于形成 [部分顺序]partial order 的类型的 trait。



## Functions

- **max**：比较并返回两个值中的最大值。
- **max_by**：返回有关指定比较函数的两个值中的最大值。
- **max_by_key**：返回给出指定函数最大值的元素。
- **min**：比较并返回两个值中的最小值。
- **min_by**：返回相对于指定比较函数的两个值中的最小值。
- **min_by_key**：返回给出指定函数中最小值的元素。



## Derive Macros

- **Eq**：派生宏生成 trait `Eq` 的一个 `impl`。
- **Ord**：派生宏生成 trait `Ord` 的一个 `impl`。 
- **PartialEq**：派生宏生成 trait `PartialEq` 的一个 `impl`。
- **PartialOrd**：派生宏生成 trait `PartialOrd` 的一个 `impl`。 