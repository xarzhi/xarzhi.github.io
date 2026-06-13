# 数组 Array

数组是`Rust`内建的原始集合类型，它表示**同类型、长度固定、有序的元素集合**。

数组的类型为`[T; N]`，其中`T`表示内部的类型，`N`表示数组的长度。



## 1.数组的定义

### 1.1 类型推导

若不给类型标注，rust也会自动推导数组内的类型及长度

```rust
let arr=[1,2,3,4,5];
```



### 1.2 类型标注

数组的类型标注使用`[T; N]`语法标注。其中`T`表示类型，`N`表示值的数量，数组值的定义有两种

1.第一种形是确定所有元素的值，每个值都必须是相同类型的元素，而且必须有。

```rust
let arr: [T; N] = [val1, val2, val3...];

// 例子
let arr: [u32; 5] = [1,2,3,4,5]
```

第二种形式把所有元素都初始化为同一个值`val`，比如`let arr = ["hello", 100]`就是定义了一个一百个`hello`的数组。

```rust
let arr: [T; N] = [val; N];  

// 例子
let arr = ["hello", 100]
```



### 1.3 数组长度注意事项

`Rust`的原生数组通常定义在**栈**上，基于`T`和`N`在编译期就可以确定内存占用情况。比如说`[i32; 10]`类型的数组，每个`i32`大小为`4 byte`，那么整个数组大小就是`40 byte`。为了保证其编译期可以确定大小的特性，`Rust`要求`N`**必须在编译期可以求值**。

例如：

```rust
const fn const_func() -> usize {
    10
}

const LEN: usize = 10;

let arr = [2025; 10];
let arr = [2025; LEN];
let arr = [2025; const_func()];
```

以上三个定义都是合法的，这里展示了三种最常见的编译期可以确定值的表达式：`字面量`、`const 常量`、`CFTE 函数`。

但是比如说使用变量就是非法的：

```rust
let len: usize = 10;
let arr = [202; len];
```

此处的`len`是一个变量，用它初始化`arr`编译无法通过，因为编译期无法确定数组长度。



## 2.数组的访问

与元组一样，数组也通过下标访问，从`0`开始。不过数组需要使用`[]`

语法：

```rust
let val = arr[index];
```

其中`index`是要访问的下标，比如：



```rust
let mut arr = [2025; 10];
arr[1] = 2026
let val = arr[1];
```

可以把`arr[pos]`放在等号左边，对指定元素进行赋值，当然前提是`mut`。也可以用其它变量接收指定下标的值。



Rust 的数组访问有严格的边界检查，编译时能发现的越界会直接报错，运行时越界会导致 `panic`。

`Rust`对安全要求极高，对数组也是一样。之前说过，数组长度`N`是在编译期就可以确定的。如果你在`pos`位置传入的表达式也是编译期可以确定的，那么`Rust`在编译期就可以进行越界检查，防止访问未开辟的内存。

比如：

```rust
let arr = [2025; 10];
let val = arr[10]; // 编译失败
```

由于`arr`的下标范围是`0 ~ 9`，`arr[10]`在编译期直接失败，减少了运行时错误。

当然这也不是万能的，比如说`pos`位置传入了一个非编译期求值的表达式：

```rust
let arr = [2025; 10];

let num = 10;
let val = arr[num]; // 编译成功，运行 panic
```

虽然`num`已经越界了，但是编译期无法确定`num`的值，只能等到运行时触发`panic`。







## 3.数组的遍历

数组的遍历通常使用for循环

### for in遍历

这是rust中最简单的数组遍历，但是**遍历时不可修改元素**，且获取所有权，遍历后不可再使用元素

```rust
let arr = [1, 2, 3, 4, 5];

for item in arr {
    println!("{}", item);
}
```



### 不可变借用遍历

通过对数组的引用来遍历，安全读取，不转移所有权

```rust
let arr = [1, 2, 3, 4, 5];

for item in &arr {
    println!("{}", item);
}
```



### 可变借用遍历

需要使用`mut`定义数组，并且遍历时也要使用`&mut`，不转移所有权

```rust
let mut arr = [1, 2, 3, 4, 5];

for item in &mut arr {
    *item += 10;   // 解引用
    println!("{}", item);
}
```





### iter()遍历

数组有一个`iter()`方法，返回一个迭代器，逐个返回每个元素的不可变引用。不转移所有权

```rust
let arr = [1, 2, 3, 4, 5];

for item in arr.iter() {
    println!("{}", item);
}
```



### into_iter()遍历

`into_iter()`会消耗掉原数组，获取其所有权。遍历后，原数组将无法再被使用。这通常在你确定之后不再需要该数组时使用

```rust
let arr = [1, 2, 3, 4, 5];

for item in arr.into_iter() {
    println!("{}", item);
}
```



### iter_mut()遍历

数组的`iter_mut()`方法创建一个可变引用的迭代器，同样需要使用`mut`定义数组，不转移所有权

```rust
let mut arr = [1, 2, 3, 4, 5];

for item in arr.iter_mut() {
    *item += 10;
    println!("{}", item);
}
```





### Range遍历

数组的len()方法返回数组的长度，通过Range可以让我们使用下标访问数组元素，并且也可以修改

若需要修改数组元素，记得使用mut定义数组

这时候循环遍历是数组的下表，而不是当前索引值

```rust
fn main() {
    let mut arr = [1, 2, 3, 4, 5];

    for index in 0..arr.len() {
        arr[index] += 10;
        println!("{}", arr[index]);
    }
}
```





### enumerate()遍历

enumerate()方法可以**同时使用索引和值**，不获取所有权，不可修改元素

```rust
let arr = ["Alice", "Bob", "Charlie"];
for (index, value) in arr.iter().enumerate() {
    println!("第{}个元素是: {}", index + 1, value);
}
```



