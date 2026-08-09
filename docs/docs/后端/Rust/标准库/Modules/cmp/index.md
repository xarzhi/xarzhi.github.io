# Module std::cmp

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

- [**Reverse**](./Structs/Reverse)：用于逆序排序的辅助结构体。



## Enums

- [**Ordering**](./Enums/Ordering)：`Ordering` 是两个值之间比较的结果。



## Traits

- [**Eq**](./Traits/Eq)：等价关系 等式比较的 Trait。
- [**Ord**](./Traits/Ord)：一个用于形成 全序关系 的类型的 trait。
- [**PartialEq**](./Traits/PartialEq)：Trait 等值比较。
- [**PartialOrd**](./Traits/PartialOrd)：一个用于形成 [部分顺序]partial order 的类型的 trait。



## Functions

- **max**：比较并返回两个值中的最大值。
- **max_by**：返回有关指定比较函数的两个值中的最大值。
- **max_by_key**：返回给出指定函数最大值的元素。
- **min**：比较并返回两个值中的最小值。
- **min_by**：返回相对于指定比较函数的两个值中的最小值。
- **min_by_key**：返回给出指定函数中最小值的元素。



### max

比较并返回两个值中的最大值。

如果比较确定它们相等，则返回第二个参数。

```rust
pub fn max<T>(v1: T, v2: T) -> T
where
    T: Ord,
```

**参数**：

- **v1**：第一个比较的值
- **v2**：第二个比较的值

**返回值**：返回二者中最大的，如果比较确定它们相等，则返回第二个参数。

```rust
use std::cmp;

assert_eq!(cmp::max(1, 2), 2);
assert_eq!(cmp::max(2, 2), 2);
```



### max_by

**按自定义规则**比较两个值并返回"较大"那一个

如果比较确定它们相等，则返回第二个参数。

```rust
pub fn max_by<T, F>(v1: T, v2: T, compare: F) -> T
where
    F: FnOnce(&T, &T) -> Ordering,
```

**参数**：

- **v1**：第一个比较的值
- **v2**：第二个比较的值
- **compare**：闭包函数，拥有两个参数，分别是`v1`和`v2`的值，可在此函数中自定义比较规则，并返回一个`Ordering`，`max_by`会根据此函数的返回值，返回`v1`和`v2`自定义比较最大的那个

**返回值**：根据`compare`函数的返回值

- 如果`compare`返回`Equal`，则`max_by`返回第二个参数，也就是`v2`
- 如果`compare`不返回`Equal`，`max_by`根据`compare`的返回值，返回`v1`、`v2`最大的那个

比如判断两个参数的哪个绝对值大，-2的绝对值比1大

```rust
use std::cmp::max_by;
fn main() {
    let res = max_by(-2, 1, |x: &i32, y: &i32| {
        x.abs().cmp(&y.abs())
    });

    println!("{:#?}", res); // -2
}
```

如果`compare`返回`Equal`

```rust
let result = cmp::max_by(-2, 2, |x: &i32, y: &i32| x.abs().cmp(&y.abs())) ;
assert_eq!(result, 2);
```



### max_by_key

返回给出指定函数最大值的元素。

如果比较确定它们相等，则返回第二个参数。

```rust
pub fn max_by_key<T, F, K>(v1: T, v2: T, f: F) -> T
where
    F: FnMut(&T) -> K,
    K: Ord,
```

**参数**：

- **v1**：第一个比较的值
- **v2**：第二个比较的值
- **f**：自定义比较的键，返回值必须实现Ord类型，内部根据这个key比较v1和v2的大小

**返回值**：返回两个参数经过自定义比较后，最大的那个

```rust
use std::cmp;

let result = cmp::max_by_key(-2, 1, |x: &i32| x.abs());
assert_eq!(result, -2);

let result = cmp::max_by_key(-2, 2, |x: &i32| x.abs());
assert_eq!(result, 2);
```



### min

比较并返回两个值中的最**小**值。

如果比较确定它们相等，则返回第**一**个参数。

```rust
pub fn min<T>(v1: T, v2: T) -> T
where
    T: Ord,
```

**参数**：

- **v1**：第一个比较的值
- **v2**：第二个比较的值

**返回值**：返回二者中最小的，如果比较确定它们相等，则返回第一个参数。

```rust
use std::cmp;

assert_eq!(cmp::min(1, 2), 1);
assert_eq!(cmp::min(2, 2), 2);
```



### min_by

**按自定义规则**比较两个值并返回"较**小**"那一个

如果比较确定它们相等，则返回第一个参数。

```rust
pub fn min_by<T, F>(v1: T, v2: T, compare: F) -> T
where
    F: FnOnce(&T, &T) -> Ordering,
```

**参数**：

- **v1**：第一个比较的值
- **v2**：第二个比较的值
- **compare**：闭包函数，拥有两个参数，分别是`v1`和`v2`的值，可在此函数中自定义比较规则，并返回一个`Ordering`，`max_by`会根据此函数的返回值，返回`v1`和`v2`自定义比较最小的那个

**返回值**：根据`compare`函数的返回值

- 如果`compare`返回`Equal`，则`max_by`返回第一个参数，也就是`v1`
- 如果`compare`不返回`Equal`，`max_by`根据`compare`的返回值，返回`v1`、`v2`最小的那个

```rust
use std::cmp;

let result = cmp::min_by(-2, 1, |x: &i32, y: &i32| x.abs().cmp(&y.abs()));
assert_eq!(result, 1);

let result = cmp::min_by(-2, 3, |x: &i32, y: &i32| x.abs().cmp(&y.abs()));
assert_eq!(result, -2);
```





### min_by_key

返回给出指定函数最小值的元素。

如果比较确定它们相等，则返回第一个参数。

```rust
pub fn min_by_key<T, F, K>(v1: T, v2: T, f: F) -> T
where
    F: FnMut(&T) -> K,
    K: Ord,
```

**参数**：

- **v1**：第一个比较的值
- **v2**：第二个比较的值
- **f**：自定义比较的键，返回值必须实现`Ord`类型，内部根据这个key比较v1和v2的大小

**返回值**：返回两个参数经过自定义比较后，最小的那个，如果相等，则返回第一个参数

```rust
use std::cmp;

let result = cmp::min_by_key(-2, 1, |x: &i32| x.abs());
assert_eq!(result, 1);

let result = cmp::min_by_key(-2, 2, |x: &i32| x.abs());
assert_eq!(result, -2);
```





## Derive Macros

- **Eq**：派生宏生成 trait `Eq` 的一个 `impl`。
- **Ord**：派生宏生成 trait `Ord` 的一个 `impl`。 
- **PartialEq**：派生宏生成 trait `PartialEq` 的一个 `impl`。
- **PartialOrd**：派生宏生成 trait `PartialOrd` 的一个 `impl`。 



### Eq

派生宏生成 trait [`Eq`](./Traits/Eq) 的一个 impl。

```rust
#[derive(Eq)]
```



### Ord

派生宏生成 trait [`Ord`](./Traits/Ord) 的一个 impl

```rust
#[derive(Ord)]
```



### PartialEq

派生宏生成 trait [`PartialEq`](./Traits/PartialEq) 的一个 impl

```rust
#[derive(PartialEq)]
```



### PartialOrd

派生宏生成 trait [`PartialOrd`](./Traits/PartialOrd) 的一个 impl

```rust
#[derive(PartialOrd)]
```

