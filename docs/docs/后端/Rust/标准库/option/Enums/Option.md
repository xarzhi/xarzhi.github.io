# Enum std::option::Option

一个枚举类型，用来表示一个变量可能有值，也可能没值，用来实现其他语言的`null`

```rust
pub enum Option<T> {
    None,
    Some(T),
}
```



:::tip

`Option`、`Some(T)`、`None`被放在`std`的`prelude`中

:::



## Variants

### None

代表没有值



### Some(T)

代表有值，并且类型为T

**T**：当值不为空时，被存储的值的类型，可以是任意类型



## Implementations

### impl\<T> Option\<T>

#### is_some

判断调用对象是否为`Some`，返回布尔值

```rust
pub const fn is_some(&self) -> bool
```

**返回值**：根据调用对象是否为`Some`，返回`bool`

```rust
let x: Option<u32> = Some(2);
println!("{}", x.is_some());		// true

let x: Option<u32> = None;
println!("{}", x.is_some());		// false
```

**源码**：

```rust
#[must_use = "if you intended to assert that this has a value, consider `.unwrap()` instead"]
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
#[rustc_const_stable(feature = "const_option_basics", since = "1.48.0")]
pub const fn is_some(&self) -> bool {
    matches!(*self, Some(_))
}
```



#### is_some_and

判断调用对象是否为`Some`

- 如果调用对象为`Some`，则把`Some`里的值赋值给闭包函数的参数，最后返回闭包函数的返回值
- 如果调用对象为`None`，闭包不会执行,则直接返回`false`

```rust
pub fn is_some_and(self, f: impl FnOnce(T) -> bool) -> bool
```

**参数**：

- f：闭包函数，当调用对象为`Some`时，会把`Some(T)`中`T`的值给`FnOnce(T)`的`T`

**返回值**：`bool`

- 若调用对象为`Some`，则返回闭包函数的返回值
- 若调用对象为`None`，则返回`false`

```rust
// 当self为Some
let s = Some(11);

let res = s.is_some_and(|x| x > 10);

println!("{}", res); // true

// 当self为None
let s: Option<i32> = None;

let res = s.is_some_and(|x| x > 10);

println!("{}", res); // false
```

**源码**：

```rust
#[must_use]
#[inline]
#[stable(feature = "is_some_and", since = "1.70.0")]
pub fn is_some_and(self, f: impl FnOnce(T) -> bool) -> bool {
    match self {
        None => false,
        Some(x) => f(x),
    }
}
```



#### is_none

判断调用对象是否为`None`

```rust
pub const fn is_none(&self) -> bool
```

**返回值**：根据调用对象是否为`None`，返回`bool`值

```rust
let x: Option<u32> = Some(2);
println!("{}", x.is_none());		// false

let x: Option<u32> = None;
println!("{}", x.is_none());		// true
```

**源码**：

```rust
#[must_use = "if you intended to assert that this doesn't have a value, consider \
    `.and_then(|_| panic!(\"`Option` had a value when expected `None`\"))` instead"]
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
#[rustc_const_stable(feature = "const_option_basics", since = "1.48.0")]
pub const fn is_none(&self) -> bool {
    !self.is_some()
}
```



#### as_ref

从 `&Option<T>` 转换为 `Option<&T>`。

产生一个新的 `Option`，其中包含对原始引用的引用，并将原始保留在原处。

获取内部值的**不可变引用**，不获取所有权，原`Option`仍可用

```rust
pub const fn as_ref(&self) -> Option<&T>
```

**返回值**：返回一个不可变借用`Option<&T>`

```rust
let s = Some(String::from("123"));

if let Some(value) = s.as_ref() {
    println!("{}", value)   // 123
}

// 此处s仍可用
println!("{:?}", s); // Some("123")
```

**源码**：

```rust
#[inline]
#[rustc_const_stable(feature = "const_option_basics", since = "1.48.0")]
#[stable(feature = "rust1", since = "1.0.0")]
pub const fn as_ref(&self) -> Option<&T> {
    match *self {
        Some(ref x) => Some(x),
        None => None,
    }
}
```





#### as_mut

创建 `Option<T>`内部值的**可变引用** `Option<&mut T>`，



从 `&mut  Option<T>` 转换为 `Option<&mut T>`。

产生一个新的 `Option`，其中包含对原始引用的引用，并将原始保留在原处。

获取内部值的**可变引用**，不获取所有权，允许你修改内部值而不获取其所有权，同时原Option也被同步修改

```rust
pub fn as_mut(&mut self) -> Option<&mut T>
```

返回值：返回`Option`内部值的可变引用

```rust
let mut s = Some("Hello".to_string());

if let Some(value) = s.as_mut() {
    value.push_str(", world!");         // Hello, world!
    println!("{}", value);
}

// 此处原先的Option被同步修改
println!("{:?}", s); //Some("Hello, world!")
```

源码：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
#[rustc_const_unstable(feature = "const_option", issue = "67441")]
pub const fn as_mut(&mut self) -> Option<&mut T> {
    match *self {
        Some(ref mut x) => Some(x),
        None => None,
    }
}
```



#### as_pin_ref

从 `Pin<&Option<T>>` 到 `Option<Pin<&T>>`。

Pin：确保某些特定类型的值在内存中不会被移动，从而保证内存安全

```rust
pub fn as_pin_ref(self: Pin<&Option<T>>) -> Option<Pin<&T>>
```

返回值：返回`Option`内部被`Pin`值的不可变借用

```rust
let some_string = Some("Hello".to_string());
// 通常通过 `Box::pin` 将值固定在堆上
let pinned_option: Pin<Box<Option<String>>> = Box::pin(some_string);

// 使用 as_pin_ref 来获取内部值的固定引用
if let Some(pinned_ref) = pinned_option.as_pin_ref() {
    // 现在我们可以安全地使用这个被固定的字符串引用
    let string_slice: &str = &*pinned_ref; // 通过 Deref 解引用 Pin<&String> 到 &String，然后解引用为 &str
    println!("{}", string_slice); // 输出：Hello
}
```

源码：

```rust
#[inline]
#[must_use]
#[stable(feature = "pin", since = "1.33.0")]
#[rustc_const_unstable(feature = "const_option_ext", issue = "91930")]
pub const fn as_pin_ref(self: Pin<&Self>) -> Option<Pin<&T>> {
    match Pin::get_ref(self).as_ref() {
        // SAFETY: `x` 被固定，因为它来自被固定的 `self`。
        //
        Some(x) => unsafe { Some(Pin::new_unchecked(x)) },
        None => None,
    }
}
```



#### as_pin_mut

转换自 `Pin<&mut Option<T>>` 到 `Option<Pin<&mut T>>`。

```rust
pub fn as_pin_mut(self: Pin<&mut Option<T>>) -> Option<Pin<&mut T>>
```

返回值：返回`Option`内部被`Pin`值的可变引用

源码：

```rust
#[inline]
#[must_use]
#[stable(feature = "pin", since = "1.33.0")]
#[rustc_const_unstable(feature = "const_option_ext", issue = "91930")]
pub const fn as_pin_mut(self: Pin<&mut Self>) -> Option<Pin<&mut T>> {
    // SAFETY: `get_unchecked_mut` 从未用于在 `self` 内部移动 `Option`。
    // `x` 被固定，因为它来自被固定的 `self`。
    unsafe {
        match Pin::get_unchecked_mut(self).as_mut() {
            Some(x) => Some(Pin::new_unchecked(x)),
            None => None,
        }
    }
}
```



#### as_slice

将Option内布置转化为切片引用，**不会消耗**原始 `Option<T>`的所有权。

```rust
pub fn as_slice(&self) -> &[T]
```

**返回值**：返回`Option`内部值的切片引用

```rust
let s: Option<i32> = Some(11);
let res = s.as_slice();

println!("{:?}", res); // [11]

let s: Option<i32> = None;
let res = s.as_slice();

println!("{:?}", res); // []
```

**源码**：

```rust
#[inline]
#[must_use]
#[unstable(feature = "option_as_slice", issue = "108545")]
pub fn as_slice(&self) -> &[T] {
    // SAFETY: 当 `Option` 为 `Some` 时，我们使用的是指向，载荷，的实际指针，长度为 1，因此这相当于 `slice::from_ref`，因此是安全的。
    // 当 `Option` 为 `None` 时，使用的长度为 0，安全起见只需要对齐即可，因为 `&self` 是对齐的，使用的 offset 是对齐的倍数。
    //
    //
    // 在新版本中，内部函数总是返回一个指向 `T` 的边界和正确对齐位置的指针 (即使在 `None` 的情况下它只是填充)。
    //
    //
    //
    //
    //
    unsafe {
        slice::from_raw_parts(
            crate::intrinsics::option_payload_ptr(crate::ptr::from_ref(self)),
            usize::from(self.is_some()),
        )
    }
}
```



#### as_mut_slice

将Option内布置转化为切片的可变借用，

```rust
pub fn as_mut_slice(&mut self) -> &mut [T]
```

**返回值**：返回`Option`内部值的切片的可变借用

```rust
let mut s: Option<i32> = Some(11);
let res = s.as_mut_slice();

println!("{:?}", res); // [11]
res[0] = 22;
println!("{:?}", res); // [22]
```

**源码**：

```rust
#[inline]
#[must_use]
#[unstable(feature = "option_as_slice", issue = "108545")]
pub fn as_mut_slice(&mut self) -> &mut [T] {
    // SAFETY: 当 `Option` 为 `Some` 时，我们使用的是指向，载荷，的实际指针，长度为 1，因此这相当于 `slice::from_mut`，因此是安全的。
    // 当 `Option` 为 `None` 时，使用的长度为 0，安全起见只需要对齐即可，因为 `&self` 是对齐的，使用的 offset 是对齐的倍数。
    //
    //
    // 在新版本中，内部函数从可变引用创建 `*const T`，因此可以安全地转换回可变指针。
    // 与 `as_slice` 一样，内部函数总是返回指向 `T` 的边界内和正确对齐位置的指针 (即使在 `None` 的情况下它只是填充)。
    //
    //
    //
    //
    //
    //
    unsafe {
        slice::from_raw_parts_mut(
            crate::intrinsics::option_payload_ptr(crate::ptr::from_mut(self).cast_const())
            .cast_mut(),
            usize::from(self.is_some()),
        )
    }
}
```



#### expect

取出`Some`中的值

当`Option`不为`Some`时，可以自行确定`panic` 的消息内容

```rust
pub fn expect(self, msg: &str) -> T
```

**参数**：

- **msg**：自定义`panic`的消息内容

**返回值**：

- 若`self`为`Some`，则返回`Some`包含的值
- 若`self`为`None`，则触发`panic`，`panic`消息内容为参数`msg`的值

```rust
let s = Some(666);
let res = s.expect("你代码写错了伙计");
println!("{}", res);  // 666


let s: Option<i32> = None;
let res = s.expect("晚上等着加班吧");
println!("{}", res);        // panic 晚上等着加班吧
```

**源码**：

```rust
#[inline]
#[track_caller]
#[stable(feature = "rust1", since = "1.0.0")]
#[rustc_const_unstable(feature = "const_option", issue = "67441")]
pub const fn expect(self, msg: &str) -> T {
    match self {
        Some(val) => val,
        None => expect_failed(msg),
    }
}
```



#### unwrap

从 `Some(value)`中提取出 `value`。如果遇到 `None`或 `Err(error)`，则触发 `panic!`导致程序终止。

```rust
pub fn unwrap(self) -> T
```

返回值：

- 若调用对象为 `Some(value)`，则返回 `value`
- 若调用对象为 `None`，则触发 `panic!`

```rust
let some_value: Option<i32> = Some(42);
let v = some_value.unwrap();
println!("{}", v); // 42

let none_value: Option<i32> = None;
let v = none_value.unwrap(); // 程序在此 panic！
```

:::tip

潜在的运行时恐慌（panic），导致程序意外终止，不适合在生产代码中随意使用。

:::

源码：

```rust
#[inline]
#[track_caller]
#[stable(feature = "rust1", since = "1.0.0")]
#[rustc_const_unstable(feature = "const_option", issue = "67441")]
pub const fn unwrap(self) -> T {
    match self {
        Some(val) => val,
        None => panic("called `Option::unwrap()` on a `None` value"),
    }
}
```



#### unwrap_or

安全地提取 `Some(T)`中的值；遇到 `None`或 `Err(E)`时，返回一个指定的默认值。

```rust
pub fn unwrap_or(self, default: T) -> T
```

参数：

- **default**：当`self`为`None`时，需要返回的默认值

返回值：

- 若`self`为`Some`，则取出`Some`中的值并返回
- 若`self`为`None`，则返回传入的默认值

注意默认值的类型要和`Option<T>`的类型一致

源码：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn unwrap_or(self, default: T) -> T {
    match self {
        Some(x) => x,
        None => default,
    }
}
```



#### unwrap_or_else

如果`self`是`Some`的话，则取出`Some`的值，否则返回回调的返回值

```rust
pub fn unwrap_or_else<F>(self, f: F) -> T
where
    F: FnOnce() -> T,
```

**参数**：

- f：闭包回调，当self为None时，才会调用此函数

**返回值**：

- 若`self`为`Some`，则取出`Some`中的值并返回
- 若`self`为`None`，则返回`f`的返回值

```rust
let some_value: Option<i32> = Some(42);
let res = some_value.unwrap_or_else(|| 666);
println!("{}", res);        // 42

let some_value: Option<i32> = None;
let res = some_value.unwrap_or_else(|| 666);
println!("{}", res);        // 666
```

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn unwrap_or_else<F>(self, f: F) -> T
where
	F: FnOnce() -> T,
{
    match self {
        Some(x) => x,
        None => f(),
    }
}
```



#### unwrap_or_default

如果self为Some，则取出Some的值并返回，否则返回`Option<T>`中T类型的默认值

比如：整数类型的默认值都是0，布尔的默认值是false

```rust
pub fn unwrap_or_default(self) -> T
where
    T: Default,
```

**返回值**：

- `self`为`Some`时，返回`Some`包含的值
- `self`为`None`时，返回`Option<T>`中T**类型的默认值**

```rust
let some_value: Option<i32> = Some(42);
let res: i32 = some_value.unwrap_or_default();
println!("{}", res); // 42

let some_value: Option<bool> = None;
let res = some_value.unwrap_or_default();
println!("{}", res); // false
```

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn unwrap_or_default(self) -> T
where
	T: Default,
{
    match self {
        Some(x) => x,
        None => T::default(),
    }
}
```



#### unwrap_unchecked

在不检查self是否为None的情况下，直接取出Some中的值，如果self为None，则会报错

使用`unwrap_unchecked`需要包含在`unsafe`块中

```rust
pub unsafe fn unwrap_unchecked(self) -> T
```

**返回值**：

- 如果`self`为`Some`，则取出`Some`的值
- 如果`self`为`None`，则会报错

```rust
let x = Some("hello");
let value = unsafe { x.unwrap_unchecked() };
println!("{}", value); // hello

let x: Option<&str> = None;
assert_eq!(unsafe { x.unwrap_unchecked() }, "air"); // 报错：未定义的行为！
```

**源码**：

```rust
#[inline]
#[track_caller]
#[stable(feature = "option_result_unwrap_unchecked", since = "1.58.0")]
#[rustc_const_unstable(feature = "const_option_ext", issue = "91930")]
pub const unsafe fn unwrap_unchecked(self) -> T {
    debug_assert!(self.is_some());
    match self {
        Some(val) => val,
        // SAFETY: 调用者必须坚持安全保证。
        None => unsafe { hint::unreachable_unchecked() },
    }
}
```



#### map

将`Some`中的值取出，可以对之进行操作，最后再包装为`Some`返回

```rust
pub fn map<U, F>(self, f: F) -> Option<U>
where
    F: FnOnce(T) -> U,
```

**参数**：

- **f**：闭包函数
  - 若`self`为`Some`，则把`Some`所包含的值赋值给`f`的参数，可以在闭包函数中对其值进行操作后再返回，最终的返回结果依然是一个`Some`
  - 若`self`为`None`，则`map`直接返回`None`，不会调用`f`函数

**返回值**：

- 若`self`为`Some`，则返回处理后的`Some`
- 若`self`为`None`，则返回`None`

```rust
let some_value = Some(100);

let res = some_value.map(|x| {
    println!("{}", x);		// 100
    x * 2
});
println!("{:?}", res)		// Some(200)
```

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn map<U, F>(self, f: F) -> Option<U>
where
	F: FnOnce(T) -> U,
{
    match self {
        Some(x) => Some(f(x)),
        None => None,
    }
}
```



#### map_or

当`self`为`None`时直接返回默认值，否则可在闭包函数f中将`Some`中的值处理并返回

```rust
pub fn map_or<U, F>(self, default: U, f: F) -> U
where
    F: FnOnce(T) -> U,
```

**参数**：

- **default**：当`self`为`None`时，`map_or`函数返回的默认值
- **f**：当`self`为`Some`时，`Some`中包含的值会被赋值给f的参数，最后`map_or`函数将会返回`f`的返回值

**返回值**：

- 若`self`为`None`，返回参数`default`的值
- 若`self`为`Some`时，返回参数`f`的返回值

```rust
// 当self为Some时
let some_value: Option<i32> = Some(100);
let res = some_value.map_or(160, |x| {
    println!("{}", x);			// 100
    x * 2
});
println!("{:?}", res)			// 200


// 当self为None时
let some_value: Option<i32> = None;
let res = some_value.map_or(160, |x| {
    println!("{}", x);	
    x * 2
});
println!("{:?}", res)		// 160
```

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn map_or<U, F>(self, default: U, f: F) -> U
where
	F: FnOnce(T) -> U,
{
    match self {
        Some(t) => f(t),
        None => default,
    }
}
```



#### map_or_else

当`self`为`None`时返回`default`函数的返回值，否则可在闭包函数`f`中将`Some`中的值处理并返回

```rust
pub fn map_or_else<U, D, F>(self, default: D, f: F) -> U
where
    D: FnOnce() -> U,
    F: FnOnce(T) -> U,
```

参数：

- **default**：当self为None时，map_or会返回default函数的返回值
- **f**：当`self`为`Some`时，`Some`中包含的值会被赋值给f的参数，最后`map_or`函数将会返回`f`的返回值

返回值：

```rust
// 当self为Some时
let some_value: Option<i32> = Some(100);
let res = some_value.map_or_else(
    || 300,
    |x| {
        println!("{}", x);      // 100
        x * 2
    },
);
println!("{:?}", res)           // 200


// 当self为None时
let some_value: Option<i32> = None;
let res = some_value.map_or_else(
    || 300,
    |x| {
        println!("{}", x);      // 100
        x * 2
    },
);
println!("{:?}", res)           // 300
```

源码：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn map_or_else<U, D, F>(self, default: D, f: F) -> U
where
	D: FnOnce() -> U,
	F: FnOnce(T) -> U,
{
    match self {
        Some(t) => f(t),
        None => default(),
    }
}
```



#### ok_or

把`Option`转化为`Result`返回

```rust
pub fn ok_or<E>(self, err: E) -> Result<T, E>
```

参数：

- **err**：被转化为`Result`后，若`Result`返回为`Err`，给`Err`的参数

返回值：

- 若`self`为`None`，则返回`Result`的`Err`变体，并把**参数`err`**传递给`Result`的`Err()`变体
- 若`self`为`Some`，则返回`Result`的`Ok`变体，并把`Some`包含的值传递给`Result`的`Ok()`变体

```rust
// 当self为Some时
let some_value: Option<String> = Some("这是成功的结果".to_string());
let res = some_value.ok_or("失败了");
println!("{:?}", res) // Ok("这是成功的结果")


// 当self为None时
let some_value: Option<String> = None;
let res = some_value.ok_or("失败了");
println!("{:?}", res) // Err("失败了")
```

源码：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn ok_or<E>(self, err: E) -> Result<T, E> {
    match self {
        Some(v) => Ok(v),
        None => Err(err),
    }
}
```



#### ok_or_else

把`Option`转化为`Result`返回

```rust
pub fn ok_or_else<E, F>(self, err: F) -> Result<T, E>
where
    F: FnOnce() -> E,
```

参数：

- **err**：一个闭包函数，当`self`为`None`时，`ok_or_else`函数会把`err`函数的返回值传递给`Result`的`Err`变体

返回值：

- 若`self`为`None`，则返回`Result`的`Err`变体，并把**`err`函数的返回值**传递给`Result`的`Err()`变体
- 若`self`为`Some`，则返回`Result`的`Ok`变体，并把`Some`包含的值传递给`Result`的`Ok()`变体

```rust
// 当self为Some时
let some_value: Option<String> = Some("成功啦".to_string());
let res = some_value.ok_or_else(||"失败了");
println!("{:?}", res) // Ok("成功啦")

// 当self为None时
let some_value: Option<String> = None;
let res = some_value.ok_or_else(||"失败了");
println!("{:?}", res) // Err("失败了")
```

源码：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn ok_or_else<E, F>(self, err: F) -> Result<T, E>
where
	F: FnOnce() -> E,
{
    match self {
        Some(v) => Ok(v),
        None => Err(err()),
    }
}
```



#### inspect

nspect方法接受一个闭包作为参数。

- 当 `Option`是 `Some(value)`时，这个闭包会以不可变引用（&T）的方式接收到内部值 value，你可以查看或打印它，但**无法修改**。之后，inspect会原封不动地将原始的 `Option<T>`传递给链中的下一个操作。
- 如果 Option是 None，则闭包不会执行，None会直接继续传递。

```rust
pub fn inspect<F>(self, f: F) -> Option<T>
where
	F: FnOnce(&T),
```

参数：

- **f**：一个闭包函数，返回`Some(T)`中`T`的借用

返回值：

- 当`self`为`None`时，则返回`None`
- 当`self`为`Some`时，返回`Some(T)`中`T`的借用

```rust
let number = Some(5);

let final_result = number
.inspect(|x| println!("初始值: {}", x)) // 查看初始值
.map(|x| x * 3)                         // 将值乘以3
.inspect(|x| println!("乘以3后: {}", x)) // 查看map之后的值
.filter(|x| x > &10)                   // 过滤，只保留大于10的值
.inspect(|x| println!("过滤后保留的值: {}", x)); // 查看过滤后的结果

println!("最终结果: {:?}", final_result); // 输出: Some(15)
```

源码：

```rust
#[inline]
#[unstable(feature = "result_option_inspect", issue = "91345")]
pub fn inspect<F>(self, f: F) -> Self
where
	F: FnOnce(&T),
{
    if let Some(ref x) = self {
        f(x);
    }

    self
}
```



#### as_deref

可以看作为`as_ref().map(|s| s.deref())`的简写形式

从 `Option<T>` (或 `&Option<T>`) 转换为 `Option<&T::Target>`。

将原始 `Option` 保留在原位，创建一个带有对原始 `Option` 的引用的新 `Option`，并通过`Deref` 强制执行其内容。

```rust
pub fn as_deref(&self) -> Option<&<T as Deref>::Target>
where
    T: Deref,
```

**返回值**：返回内部值解引用后的不可变引用。T必须实现 Dereftrait。

假设你有一个 `Option<String>`，但你调用的函数期望一个 `Option<&str>`。

```rust
fn print_message(msg: Option<&str>) {
    if let Some(m) = msg {
        println!("Message: {}", m);
    } else {
        println!("No message");
    }
}

fn main() {
    let maybe_string: Option<String> = Some("Hello, Rust!".to_string());

    // 使用 as_deref 轻松完成转换
    print_message(maybe_string.as_deref()); // 输出: Message: Hello, Rust!

    // 对比：如果只用 as_ref，得到的是 Option<&String>，与函数签名不匹配
    // print_message(maybe_string.as_ref()); // 这行会编译错误

    // 对比：手动实现类似 as_deref 的效果，但更为繁琐
    // print_message(maybe_string.as_ref().map(|s| s.as_str()));
}
```

**源码**：

```rust
#[inline]
#[stable(feature = "option_deref", since = "1.40.0")]
pub fn as_deref(&self) -> Option<&T::Target>
where
	T: Deref,
{
    match self.as_ref() {
        Some(t) => Some(t.deref()),
        None => None,
    }
}
```



#### as_deraf_mut

可以看作为`as_ref().map(|s| s.deref_mut())`的简写形式

- 首先通过 `as_mut()`将 `&mut Option<T>`转换为 `Option<&mut T>`，避免所有权的转移。
- 然后对 `&mut T`调用 `deref_mut`方法（这通常由 Rust 的 **Deref 强制转换** 机制自动完成），最终得到指向内部数据（`U`）的可变引用 `&mut U`。

```rust
pub fn as_deref_mut(&mut self) -> Option<&mut <T as Deref>::Target>
where
    T: DerefMut,
```

返回值：返回内部值解引用后的**可变引用**。`T`必须实现 `DerefMut`trait。

```rust
fn make_ascii_lowercase(s: Option<&mut str>) {
    if let Some(s_ref) = s {
        s_ref.make_ascii_lowercase();
    }
}

fn main() {
    let mut maybe_name = Some("Alice".to_string()); // Option<String>
    
    // 使用 as_deref_mut 转换为 Option<&mut str> 后传入函数
    make_ascii_lowercase(maybe_name.as_deref_mut());
    
    println!("{:?}", maybe_name); // 输出: Some("alice")
}
```

源码：

```rust
#[inline]
#[stable(feature = "option_deref", since = "1.40.0")]
pub fn as_deref_mut(&mut self) -> Option<&mut T::Target>
where
	T: DerefMut,
{
    match self.as_mut() {
        Some(t) => Some(t.deref_mut()),
        None => None,
    }
}
```



#### iter

将 `Option<T>`转换成一个**生成单个元素的迭代器**（如果值是 `Some(T)`），或者一个**空迭代器**（如果值是 `None`）

```rust
pub fn iter(&self) -> Iter<'_, T>
```

返回值：返回一个包含`Option`内变体的迭代器，通过`next`方法可以获取其值

```rust
// 当self为Some
let x: Option<i32> = Some(4);
let mut res = x.iter();
println!("{:?}", res); // Iter { inner: Item { opt: Some(4) } }
println!("{:?}", res.next()); // Some(4) 

// 当self为None
let x: Option<i32> = None;
let mut res = x.iter();
println!("{:?}", res); // Iter { inner: Item { opt: None } }
println!("{:?}", res.next()); // None
```

源码：

```rust
#[inline]
#[rustc_const_unstable(feature = "const_option", issue = "67441")]
#[stable(feature = "rust1", since = "1.0.0")]
pub const fn iter(&self) -> Iter<'_, T> {
    Iter { inner: Item { opt: self.as_ref() } }
}
```



#### iter_mut

将 `Option<T>`转换成一个**生成单个元素的可变迭代器**（如果值是 `Some(T)`），或者一个**空迭代器**（如果值是 `None`）

```rust
pub fn iter_mut(&mut self) -> IterMut<'_, T>
```

参数：

返回值：返回一个包含`Option`内变体的**可变迭代器**，通过`next`方法可以获取其值

```rust
// 当self为Some
let mut x: Option<i32> = Some(4);
let mut res = x.iter_mut();

if let Some(value) = res.next() {
    *value += 10;
}
println!("{:?}", x); // Some(14) 

// 当self为None
let mut x: Option<i32> = None;
let mut res = x.iter_mut();
if let Some(value) = res.next() {
    *value += 10;
}
println!("{:?}", x); // None
```

源码：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn iter_mut(&mut self) -> IterMut<'_, T> {
    IterMut { inner: Item { opt: self.as_mut() } }
}
```



#### and

接收一个`Option`参数，把自身和参数进行**逻辑与**，也就是`&&`

- 如果自身为`None`，则返回`None`，不会进行后面的判断
- 如果自身不为`None`，则返回参数的值

```rust
pub fn and<U>(self, optb: Option<U>) -> Option<U>
```

参数：

- optb：需要进行逻辑与运算的`Option`

返回值：如果`self`为 `None`，则返回`None`; 否则，返回 参数`optb`。

```rust
// 自身不为None，参数为None
let x = Some(2);
let y: Option<&str> = None;
println!("{:?}", x.and(y));         // None

// 自身不为None，参数不为None
let x: Option<u32> = Some(2);
let y = Some("foo");
println!("{:?}", x.and(y));         // Some("foo")

// 自身为None，参数不为None
let x: Option<u32> = None;
let y = Some("foo");
println!("{:?}", x.and(y));         // None

// 自身为None，参数为None
let x: Option<u32> = None;
let y: Option<&str> = None;
println!("{:?}", x.and(y));         // None
```

源码：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn and<U>(self, optb: Option<U>) -> Option<U> {
    match self {
        Some(_) => optb,
        None => None,
    }
}
```



#### and_then

接受一个返回`Option`类型的闭包（函数）

- 如果自身为`None`，则返回`None`，不会进行后面的判断
- 如果自身不为`None`，则把自身`Some(T)`中`T`的值作为`f`的参数，最后返回`f`的返回值

```rust
pub fn and_then<U, F>(self, f: F) -> Option<U>
where
    F: FnOnce(T) -> Option<U>,
```

参数：

- f：一个返回`Option`的闭包函数

返回值：

- 如果自身为`None`，则返回`None`
- 如果自身不为`None`，则返回`f`的返回值

```rust
let num: Option<i32>=Some(3);

let result = num.and_then(|x| {
    println!("x的值为：{:?}", x);   // x的值为：3
    Some(x * 2)
});

println!("{:?}", result) // Some(6)
```

源码：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn and_then<U, F>(self, f: F) -> Option<U>
where
F: FnOnce(T) -> Option<U>,
{
    match self {
        Some(x) => f(x),
        None => None,
    }
}
```



#### filter

根据传入的谓词判断，返回自身或None

```rust
pub fn filter<P>(self, predicate: P) -> Option<T>
where
    P: FnOnce(&T) -> bool,
```

**参数**：

- **predicate**：一个闭包函数作为谓词，返回一个`bool`值
  - 注意`predicate`函数中，`Some`包含的数被**借用**到`predicate`的参数中，在`predicate`函数中使用该参数需要使用解引用符号`*`

**返回值**：

- 如果`predicate`返回`true`，则返回`self`本身的值
- 如果`predicate`返回`false`，则返回`None`

```rust
// 当谓词为真
let some_value: Option<u8> = Some(5);
let res = some_value.filter(|x| if *x < 10 { true } else { false });

println!("{:?}", res)           // Some(5)


// 当谓词为假
let some_value: Option<u8> = Some(5);
let res = some_value.filter(|x| if *x > 10 { true } else { false });

println!("{:?}", res)           // None
```

**源码**：

```rust
#[inline]
#[stable(feature = "option_filter", since = "1.27.0")]
pub fn filter<P>(self, predicate: P) -> Self
where
	P: FnOnce(&T) -> bool,
{
    if let Some(x) = self {
        if predicate(&x) {
            return Some(x);
        }
    }
    None
}
```



#### or

判断`self`是否为`Some`，返回`Some`本身或者传入参数的值

```rust
pub fn or(self, optb: Option<T>) -> Option<T>
```

**参数**：

- **optb**：当`self`为None时，`or`函数把`optb`作为返回值

**返回值**：

- 当`self`为`Some`时，返回`Some`本身
- 当`self`为`None`时，返回传入的`optb`的值

```rust
// 当self为Some时
let some_value: Option<u8> = Some(5);
let res = some_value.or(Some(6));
println!("{:?}", res)           // Some(5)

// 当self为None时
let some_value: Option<u8> = None;
let res = some_value.or(Some(6));
println!("{:?}", res) 			// Some(6)
```

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn or(self, optb: Option<T>) -> Option<T> {
    match self {
        Some(x) => Some(x),
        None => optb,
    }
}
```



#### or_else

判断`self`是否为`Some`，返回`Some`本身或者传入函数的返回值

```rust
pub fn or_else<F>(self, f: F) -> Option<T>
where
    F: FnOnce() -> Option<T>,
```

参数：

- **f**：当`self`为None时，`or_else`函数返回`f`函数的返回值

返回值：

- 当`self`为`Some`时，返回`Some`本身
- 当`self`为`None`时，返回传入的`f`函数的返回值

```rust
// 当self为Some时
let some_value: Option<u8> = Some(5);
let res = some_value.or_else(|| Some(6));
println!("{:?}", res)           // Some(5)

// 当self为None时
let some_value: Option<u8> = None;
let res = some_value.or_else(|| Some(6));
println!("{:?}", res) 			// Some(6)
```

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn or_else<F>(self, f: F) -> Option<T>
where
	F: FnOnce() -> Option<T>,
{
    match self {
        Some(x) => Some(x),
        None => f(),
    }
}
```



#### xor

把`self`和`optb`做异或判断，如果 `self`，`optb` 之一恰好是 `Some`，则返回 `Some`，否则返回 `None`。

```rust
pub fn xor(self, optb: Option<T>) -> Option<T>
```

**参数**：

- **optb**：需要做异或的参数

**返回值**：

- 如果 `self`，`optb`只要有一个是`Some`，则哪个是`Some`就返回哪个`Some`
- 如果 `self`，`optb`两个都是`None`，则返回`None`

**源码**：

```rust
#[inline]
#[stable(feature = "option_xor", since = "1.37.0")]
pub fn xor(self, optb: Option<T>) -> Option<T> {
    match (self, optb) {
        (Some(a), None) => Some(a),
        (None, Some(b)) => Some(b),
        _ => None,
    }
}
```



#### insert

用于把`Option`容器中的值**替换成一个新值**，并**返回这个值的可变引用**。

**无论 `Option`原来的状态是什么，调用后它都会变成 `Some`**，并且如果原来有值，那个旧值会被替换掉。

```rust
pub fn insert(&mut self, value: T) -> &mut T
```

**参数**：

- **value**：需要被插入的值

**返回值**：

- 返回替换后的值的可变引用

```rust
// 向 None 中插入值
let mut maybe_name: Option<String> = None;
let name_ref = maybe_name.insert("Alice".to_string());

// 由于返回的是可变引用，我们可以直接修改它
name_ref.push_str(" Smith");
println!("修改后: {:?}", maybe_name); // 输出: Some("Alice Smith")



// 替换 Some 中的旧值
let mut number = Some(10);
// 替换旧值 10，返回新值 42 的可变引用
let new_num_ref = number.insert(42);
println!("替换后: {:?}", number); // 输出: Some(42)

// 同样可以直接修改
*new_num_ref += 1;
println!("再次修改后: {:?}", number); // 输出: Some(43)
```

源码：

```rust
#[must_use = "if you intended to set a value, consider assignment instead"]
#[inline]
#[stable(feature = "option_insert", since = "1.53.0")]
pub fn insert(&mut self, value: T) -> &mut T {
    *self = Some(value);

    // SAFETY: 上面的代码刚刚填满了该选项
    unsafe { self.as_mut().unwrap_unchecked() }
}
```



#### get_or_insert

如果self为None，则将`None`**替换成一个新值**，并**返回这个值的可变引用**。新值改变，旧值也会改变

否则返回Some包含的值的可变引用

```rust
pub fn get_or_insert(&mut self, value: T) -> &mut T
```

参数：

- **value**：需要被插入的值

**返回值**：

- 返回替换后的值的可变引用

```rust
// 当self为Some时
let mut some_value = Some(66);
let res = some_value.get_or_insert(77);
println!("{}", res); // 66
*res += 10; // 可以改变
println!("{}", res); // 76


// 当self为None时
let mut some_value: Option<i32> = None;
let res = some_value.get_or_insert(77);
println!("{}", res); // 77
*res += 10; // 可以改变
println!("{}", res); // 87
```

源码：

```rust
#[inline]
#[stable(feature = "option_entry", since = "1.20.0")]
pub fn get_or_insert(&mut self, value: T) -> &mut T {
    if let None = *self {
        *self = Some(value);
    }

    // SAFETY: 在上面的代码中，用于 `self` 的 `None` 变体将被替换为 `Some` 变体。
    //
    unsafe { self.as_mut().unwrap_unchecked() }
}
```





#### get_or_insert_with

如果`self`为`None`，则把`f`的返回值放入`Some`中，并返回该值的可变引用。新值改变，旧值也会改变

如果`self`为`Some(T)`，则返回`T`的可变引用

```rust
pub fn get_or_insert_with<F>(&mut self, f: F) -> &mut T
where
    F: FnOnce() -> T,
```

参数：

- **f**：当`self`为`None`时，触发`f`函数，并将f函数的返回值返回出去

返回值：

- 若`self`为`None`，则返回`fn()`返回值的可变引用 
- 若`self`为`Some(T)`，则返回`T`的可变引用

```rust
// 当self为Some时
let mut some_value = Some(66);
let res = some_value.get_or_insert_with(|| 111);
println!("{}", res); // 66
*res += 10; // 可以改变
println!("{}", res); // 76

println!("{:?}", some_value); // 76， 原来的值也被改变

// 当self为None时
let mut some_value: Option<i32> = None;
let res = some_value.get_or_insert_with(|| 222);
println!("{}", res); // 222
*res += 10; // 可以改变
println!("{}", res); // 232
```

源码：

```rust
#[inline]
#[stable(feature = "option_entry", since = "1.20.0")]
pub fn get_or_insert_with<F>(&mut self, f: F) -> &mut T
where
	F: FnOnce() -> T,
{
    if let None = self {
        *self = Some(f());
    }

    // SAFETY: 在上面的代码中，用于 `self` 的 `None` 变体将被替换为 `Some` 变体。
    //
    unsafe { self.as_mut().unwrap_unchecked() }
}
```



#### get_or_insert_default

`Option`为 `None`时，会使用`T`**类型的默认值**（如：i32的默认值是0）进行插入，并返回一个指向内部值的可变引用

```rust
pub fn get_or_insert_default(&mut self) -> &mut T
where
    T: Default,
```

**返回值**：

- 若`self`为`None`，则返回`Option<T>`中**T类型的默认值**的可变引用
- 若`self`为`Some`，则返回`Some`包含的值的可变引用

```rust
// 当self为Some时
let mut some_value = Some(66);
let res = some_value.get_or_insert_default();
println!("{}", res); // 66
*res += 10; // 可以改变
println!("{}", res); // 76

// 当self为None时
let mut some_value: Option<i32> = None;
let res = some_value.get_or_insert_default();
println!("{}", res); // 0    i32类型的默认值
*res += 10; // 可以改变
println!("{}", res); // 10
```

**源码**：

```rust
#[inline]
#[unstable(feature = "option_get_or_insert_default", issue = "82901")]
pub fn get_or_insert_default(&mut self) -> &mut T
where
	T: Default,
{
    self.get_or_insert_with(T::default)
}
```



#### replace

用于**替换 `Option`内部的值，并返回被替换的旧值**。这是一个会修改原 `Option`的操作。

```rust
pub fn replace(&mut self, value: T) -> Option<T>
```

**参数**：

- **value**：需要被替换的新值

**返回值**：返回被替换的旧值

```rust
// 当self为Some时
let mut x = Some(2);
let old = x.replace(5); // 用 5 替换原来的 2

println!("{:?}", old); // Some(2)
println!("{:?}", x); // Some(5)


// 当self为None时
let mut x: Option<i32> = None;
let old = x.replace(5); // 用 5 替换原来的 None

println!("{:?}", old); // None
println!("{:?}", x); // Some(5)
```

**源码**：

```rust
#[inline]
#[rustc_const_unstable(feature = "const_option", issue = "67441")]
#[stable(feature = "option_replace", since = "1.31.0")]
pub const fn replace(&mut self, value: T) -> Option<T> {
    mem::replace(self, Some(value))
}
```



#### take

**安全地将 `Option<T>`实例中的值移出，并同时将原 `Option`设置为 `None`**。这个方法允许你在不破坏所有权规则的前提下，转移 `Option`内部值的所有权。

```rust
pub fn take(&mut self) -> Option<T>
```

返回值：

- 返回`self`的值

```rust
// 当self为Some时   
let mut x = Some(2);
let res: Option<i32> = x.take(); // 用 5 替换原来的 2

println!("{:?}", res); // Some(2)
println!("{:?}", x); // None


// 当self为None时
let mut x: Option<i32> = None;
let res = x.take(); // 用 5 替换原来的 2

println!("{:?}", res); // None
println!("{:?}", x); // None
```

源码：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
#[rustc_const_unstable(feature = "const_option", issue = "67441")]
pub const fn take(&mut self) -> Option<T> {
    // FIXME 当后者准备好时，用 `mem::take` 替换 `mem::replace`
    mem::replace(self, None)
}
```



#### zip

把`self`和另一个`Some`，合并成一个`Some`元组

```rust
pub fn zip<U>(self, other: Option<U>) -> Option<(T, U)>
```

参数：

- **other**：需要合并的另一个`Option`

返回值：返回被合并的Some元组

- 如果`self`和`other`都为`Some`，则返回一个`Some`元组。如果`self`为`Some(a)`，`other`为`Some(b)`，那么返回`Some((a, b))`
  - 元组第一个值为`self`中`Some`包含的值
  - 元组第二个值为`other`中`Some`包含的值
- `self`和`other`只要有一个为`None`，则zip就返回`None`

```rust
// 当self和other都是Option
let num1: Option<i32> = Some(11);
let res = num1.zip(Some(22));

println!("{:?}", res); // Some((11, 22))

// 当self是None
let num1: Option<i32> = None;
let res = num1.zip(Some(22));

println!("{:?}", res); // None

// 当other为None
let num1: Option<i32> = Some(11);
let res: Option<(i32, i32)> = num1.zip(None);

println!("{:?}", res); // None
```

源码：

```rust
#[stable(feature = "option_zip_option", since = "1.46.0")]
pub fn zip<U>(self, other: Option<U>) -> Option<(T, U)> {
    match (self, other) {
        (Some(a), Some(b)) => Some((a, b)),
        _ => None,
    }
}
```



#### zip_with

`self`和`other`都为`Some`的情况下，把`self`和`other`的`Some`包含的值分别赋值给`f`的两个参数，最后返回`f`函数的返回值

```rust
pub fn zip_with<U, F, R>(self, other: Option<U>, f: F) -> Option<R>
where
    F: FnOnce(T, U) -> R,
```

**参数**：

- **other**：需要合并的另一个`Option`
- **f**：用来处理`self`和`other`的`Some`包含的值的闭包函数

返回值：

- 如果`self`和`other`都为`Some`，则把`self`和`other`中`Some`包含的值分别赋值给f函数的两个参数，最后返回`f`函数的返回值
- `self`和`other`只要有一个为`None`，则zip就返回`None`

```rust
let num1: Option<i32> = Some(11);
let res = num1.zip_with(Some(22), |x, y| {
    println!("x:{},y:{}", x, y);
    x + y
});

println!("{:?}", res); // Some((11, 22))

// 使用这个方法会报错use of unstable library feature `option_zip`，不知道为啥，后面学了再回来看
```

源码：

```rust
#[unstable(feature = "option_zip", issue = "70086")]
pub fn zip_with<U, F, R>(self, other: Option<U>, f: F) -> Option<R>
where
	F: FnOnce(T, U) -> R,
{
    match (self, other) {
        (Some(a), Some(b)) => Some(f(a, b)),
        _ => None,
    }
}
```



### impl<T, U> Option<(T, U)>

以下是接受一个两值元组的`Option`方法

#### unzip

解压缩包含两个选项的元组的选项。

如果 `self` 是 `Some((a, b))`，则此方法返回 `(Some(a), Some(b))`。 否则，返回 `(None, None)`。

```rust
pub fn unzip(self) -> (Option<T>, Option<U>)
```

返回值：

- 如果 `self` 是 `Some((a, b))`，则此方法返回 `(Some(a), Some(b))`。
- 否则，返回 `(None, None)`。
  - **注意**，如果`self`为`None`，需要给给`None`显示传入泛型参数

```rust
let x = Some((1, "hi"));
let y = None::<(u8, u32)>;

println!("{:?}",x.unzip());     // (Some(1), Some("hi"))
println!("{:?}",y.unzip());     // (None, None)
```



源码：

```rust
#[inline]
#[stable(feature = "unzip_option", since = "1.66.0")]
pub fn unzip(self) -> (Option<T>, Option<U>) {
    match self {
        Some((a, b)) => (Some(a), Some(b)),
        None => (None, None),
    }
}
```



### impl\<T> Option<&T>

#### copied

当`Some`中的值为整数、浮点数、布尔值等**基本数据类型**时，可用此方法

用于返回`Somek`中值的**浅拷贝的不可变引用**

```rust
pub fn copied(self) -> Option<T>
where
    T: Copy,
```

**返回值**：返回`self`的浅拷贝不可变借用

```rust
let num = 123;
let s = Some(&num);
let s_copy = s.copied();

println!("{:?}", s_copy);       // Some(123)
```

**源码**：

```rust
#[must_use = "`self` will be dropped if the result is not used"]
#[stable(feature = "copied", since = "1.35.0")]
#[rustc_const_unstable(feature = "const_option", issue = "67441")]
pub const fn copied(self) -> Option<T>
where
	T: Copy,
{
    // FIXME: 此实现避开使用 `Option::map`，因为它尚未准备好常量，应尽可能还原以避免代码重复
    //
    match self {
        Some(&v) => Some(v),
        None => None,
    }
}
```



#### cloned

返回字符串、集合等复杂类型`Option`的**深拷贝的不可变借用**

```rust
pub fn cloned(self) -> Option<T>
where
    T: Clone,
```

**返回值**：返回`self`的深拷贝的不可变借用

```rust
let str = String::from("ikun");
let s = Some(&str);
let s_copy = s.cloned();

println!("{:?}", s_copy); // Some("ikun")
```

**源码**：

```rust
#[must_use = "`self` will be dropped if the result is not used"]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn cloned(self) -> Option<T>
where
	T: Clone,
{
    match self {
        Some(t) => Some(t.clone()),
        None => None,
    }
}
```



### impl\<T> Option<&mut T>

#### copied

返回整数、浮点数、布尔值等基本类型`Option`的**浅拷贝的可变借用**

```rust
pub fn copied(self) -> Option<T>
where
    T: Copy,
```

**返回值**：返回`self`的浅拷贝可变借用

```rust
let mut num = 123;
let s = Some(&mut num);
let s_copy = s.cloned();

if let Some(mut value) = s_copy {
    value += 10;
    println!("{:?}", value); // 133
}
```

源码：

```rust
#[must_use = "`self` will be dropped if the result is not used"]
#[stable(feature = "copied", since = "1.35.0")]
#[rustc_const_unstable(feature = "const_option_ext", issue = "91930")]
pub const fn copied(self) -> Option<T>
where
	T: Copy,
{
    match self {
        Some(&mut t) => Some(t),
        None => None,
    }
}
```



#### cloned

返回字符串、集合等复杂类型`Option`的**深拷贝的可变借用**

```rust
pub fn cloned(self) -> Option<T>
where
    T: Clone,
```

**返回值**：返回`self`的深拷贝的可变借用

```rust
let mut str = String::from("ikun");
let s = Some(&mut str);
let s_copy = s.cloned();

if let Some(mut value) = s_copy {
    value.push_str("小黑子");
    println!("{:?}", value); // "ikun小黑子"
}
```

源码：

```rust
#[must_use = "`self` will be dropped if the result is not used"]
#[stable(since = "1.26.0", feature = "option_ref_mut_cloned")]
pub fn cloned(self) -> Option<T>
where
	T: Clone,
{
    match self {
        Some(t) => Some(t.clone()),
        None => None,
    }
}
```



### impl<T, E> Option<Result<T, E>>

#### transpose

将 `Result` 的 `Option` 转换为 `Option` 的 `Result`。

`None` 将映射到 `Ok(None)`。 `Some(Ok(_))` 和 `Some(Err(_))` 将映射到 `Ok(Some(_))` 和 `Err(_)`

```rust
pub fn transpose(self) -> Result<Option<T>, E>
```

**返回值**：

- 当`self`为`Some`时
  - 若`Some`包含`Ok(x)`，则返回`Ok(Some())`
  - 若`Some`包含`Err(e)`，则返回`Err(e)`
- 当`self`为`None`时：返回`Ok(None)`

```rust
fn result(num: u8) -> Result<bool, String> {
    if num > 10 {
        Ok(true)
    } else {
        Err("error".to_string())
    }
}

fn main() {
    let s: Option<Result<bool, String>> = Some(result(5));
    let res: Result<Option<bool>, String> = s.transpose();

    println!("{:?}", res); // Err("error")


    let s: Option<Result<bool, String>>  = Some(result(20));
    let res: Result<Option<bool>, String> = s.transpose();

    println!("{:?}", res); // Ok(Some(true))
}

```

**源码**：

```rust
#[inline]
#[stable(feature = "transpose_result", since = "1.33.0")]
#[rustc_const_unstable(feature = "const_option", issue = "67441")]
pub const fn transpose(self) -> Result<Option<T>, E> {
    match self {
        Some(Ok(x)) => Ok(Some(x)),
        Some(Err(e)) => Err(e),
        None => Ok(None),
    }
}
```



### impl\<T> Option<Option\<T>>

#### flatten

从 `Option<Option<T>>` 转换为 `Option<T>`。

```rust
pub fn flatten(self) -> Option<T>
```

返回值：

- 若self为Some，则返回解包后的Some
- 若self为None，返回None

```rust
let s = Some(Some(666));

let res = s.flatten();

println!("{:?}", res) // Some(666)
```

源码：

```rust
#[inline]
#[stable(feature = "option_flattening", since = "1.40.0")]
#[rustc_const_unstable(feature = "const_option", issue = "67441")]
pub const fn flatten(self) -> Option<T> {
    match self {
        Some(inner) => inner,
        None => None,
    }
}
```











## Trait Implementations

### impl\<T> Clone for Option\<T>

```rust
impl<T> Clone for Option<T>
where
  T: Clone,
```



#### clone

返回值的副本。

```rust
fn clone(&self) -> Option<T>
```





#### clone_from

从 `source`执行复制分配。

```rust
fn clone_from(&mut self, source: &Option<T>)
```



### impl\<T> Debug for Option\<T>

```rust
impl<T> Debug for Option<T>
where
  T: Debug,
```



#### fmt

使用给定的格式化程序格式化该值。

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



### impl\<T> Default for Option\<T>

#### default

返回 `Option`的默认值 `None`。

```rust
fn default() -> Option<T>
```

示例

```rust
let opt: Option<u32> = Option::default();

assert!(opt.is_none());
```







### impl<'a, T> From<&'a Option\<T>> for Option<&'a T>

#### from

从 `&Option<T>` 转换为 `Option<&T>`。

```rust
fn from(o: &'a Option<T>) -> Option<&'a T>
```



示例

将 `Option<String>` 转换为 `Option<usize>`，保留原始值。 `map` 方法按值取 `self` 参数，消耗原始值，因此该技术使用 from 首先将 `Option` 用于对原始值内部值的引用。

```rust
let s: Option<String> = Some(String::from("Hello, Rustaceans!"));
let o: Option<usize> = Option::from(&s).map(|ss: &String| ss.len());


println!("Can still print s: {s:?}");

assert_eq!(o, Some(18));
```





### impl<'a, T> From<&'a mut Option\<T>> for Option<&'a mut T>

#### from

从 `&mut Option<T>` 转换为 `Option<&mut T>`

```rust
fn from(o: &'a mut Option<T>) -> Option<&'a mut T>
```

示例

```rust
let mut s = Some(String::from("Hello"));

let o: Option<&mut String> = Option::from(&mut s);

match o {
  Some(t) => *t = String::from("Hello, Rustaceans!"),
  None => (),
}

assert_eq!(s, Some(String::from("Hello, Rustaceans!")));
```





### impl\<T> From\<T> for Option\<T>

#### from

将 `val` 移动到新的 `Some` 中。

```rust
fn from(val: T) -> Option<T>
```

示例

```rust
let o: Option<u8> = Option::from(67);

assert_eq!(Some(67), o);
```



### impl<A, V> FromIterator<Option\<A>> for Option\<V>

```rust
impl<A, V> FromIterator<Option<A>> for Option<V>
where
  V: FromIterator<A>,
```



#### from_iter

接受 `Iterator` 中的每个元素：如果为 `None`，则不再获取其他元素，并返回 `None`。 如果没有出现 `None`，则返回一个 V 类型的容器，其中包含每个 `Option` 的值。

```rust
fn from_iter<I>(iter: I) -> Option<V>
where
  I: IntoIterator<Item = Option<A>>,
```

示例

这是一个使 vector 中的每个整数递增的示例。 当计算将导致溢出时，我们使用 add 的检查变体返回 None。

```rust
let items = vec![0_u16, 1, 2];

let res: Option<Vec<u16>> = items
  .iter()
  .map(|x| x.checked_add(1))
  .collect();

assert_eq!(res, Some(vec![1, 2, 3]));
```



尝试从另一个整数列表中减去一个，这次检查下溢：

```rust
let items = vec![2_u16, 1, 0];

let res: Option<Vec<u16>> = items
  .iter()
  .map(|x| x.checked_sub(1))
  .collect();

assert_eq!(res, None);
```

由于最后一个元素为零，因此会下溢。因此，结果值为 None。



这是前一个示例的变体，显示在第一个 None 之后不再从 iter 提取其他元素。

```rust
let items = vec![3_u16, 2, 1, 10];

let mut shared = 0;

let res: Option<Vec<u16>> = items
  .iter()
  .map(|x| { shared += x; x.checked_sub(2) })
  .collect();


assert_eq!(res, None);
assert_eq!(shared, 6);
```

由于第三个元素引起下溢，因此不再使用其他元素，因此 shared 的最终值为 6 (= 3 + 2 + 1)，而不是 16。





### impl\<T> FromResidual<<Option\<T> as Try>::Residual> for Option\<T>

#### from_residual

```rust
fn from_residual(residual: Option<Infallible>) -> Option<T>
```

从兼容的 `Residual` 类型构造类型。



### impl\<T> FromResidual<Yeet<()>> for Option\<T>



#### from_residual

从兼容的 Residual 类型构造类型。`nightly-only`

```rust
fn from_residual(_: Yeet<()>) -> Option<T>
```







### impl\<T> Hash for Option\<T>

```rust
impl<T> Hash for Option<T>
where
  T: Hash,
```



#### hash

将该值输入给定的 `Hasher`。

```rust
fn hash<__H>(&self, state: &mut __H)
where
  __H: Hasher,
```



#### hash_slice

将这种类型的切片送入给定的 `Hasher` 中。

```rust
fn hash_slice<H>(data: &[Self], state: &mut H)
where
  H: Hasher,
  Self: Sized,
```



### impl<'a, T> IntoIterator for &'a Option\<T>

#### Item

被迭代的元素的类型。

```rust
type Item = &'a T
```



#### IntoIter

我们将其变成哪种迭代器？

```rust
type IntoIter = Iter<'a, T>
```



#### into_iter

从一个值创建一个迭代器。

```rust
fn into_iter(self) -> Iter<'a, T> 
```





### impl<'a, T> IntoIterator for &'a mut Option\<T>

#### Item

被迭代的元素的类型。

```rust
type Item = &'a mut T
```



#### IntoIter

我们将其变成哪种迭代器？

```rust
type IntoIter = IterMut<'a, T>
```



#### into_iter

从一个值创建一个迭代器。

```rust
fn into_iter(self) -> IterMut<'a, T> 
```



### impl\<T> IntoIterator for Option\<T>

#### into_iter

返回可能包含的值上的消耗迭代器。

```rust
fn into_iter(self) -> IntoIter<T> 
```



示例

```rust
let x = Some("string");
let v: Vec<&str> = x.into_iter().collect();
assert_eq!(v, ["string"]);



let x = None;
let v: Vec<&str> = x.into_iter().collect();
assert!(v.is_empty());
```



#### Item 

被迭代的元素的类型。

```rust
type Item = T
```



#### IntoIter 

我们将其变成哪种迭代器？

```rust
type IntoIter = IntoIter<T>
```



### impl\<T> Ord for Option\<T>

```rust
impl<T> Ord for Option<T>
where
  T: Ord,
```



#### cmp

此方法返回 `self` 和 `other` 之间的 `Ordering`。

```rust
fn cmp(&self, other: &Option<T>) -> Ordering
```



#### max

比较并返回两个值中的最大值。

```rust
fn max(self, other: Self) -> Self
where
  Self: Sized,
```



#### min

比较并返回两个值中的最小值。

```rust
fn min(self, other: Self) -> Self
where
  Self: Sized,
```



#### clamp

将值限制在某个时间间隔内。

```rust
fn clamp(self, min: Self, max: Self) -> Self
where
  Self: Sized + PartialOrd<Self>,
```



### impl\<T> PartialEq<Option\<T>> for Option\<T>

```rust
impl<T> PartialEq<Option<T>> for Option<T>
where
  T: PartialEq<T>,
```



#### eq

此方法测试 `self` 和 `other` 值是否相等，并由 `==` 使用。

```rust
fn eq(&self, other: &Option<T>) -> bool
```



#### ne

此方法测试 `!=`。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```





### impl\<T> PartialOrd<Option\<T>> for Option\<T>

```rust
impl<T> PartialOrd<Option<T>> for Option<T>
where
  T: PartialOrd<T>,
```



#### partial_cmp

如果存在，则此方法返回 self 和 other 值之间的顺序。

```rust
fn partial_cmp(&self, other: &Option<T>) -> Option<Ordering>
```



#### lt

此方法测试的内容少于 (对于 `self` 和 `other`)，并且由 `<` 操作员使用。

```rust
fn lt(&self, other: &Rhs) -> bool
```



#### le

此方法测试小于或等于 (对于 self 和 other)，并且由 `<=` 运算符使用。

```rust
fn le(&self, other: &Rhs) -> bool
```



#### gt

此方法测试大于 (对于 `self` 和 `other`)，并且由 `>` 操作员使用。

```rust
fn gt(&self, other: &Rhs) -> bool
```



#### ge

此方法测试是否大于或等于 (对于 `self` 和 `other`)，并且由 `>=` 运算符使用。

```rust
fn ge(&self, other: &Rhs) -> bool
```



### impl<T, U> Product<Option\<U>> for Option\<T>

```rust
impl<T, U> Product<Option<U>> for Option<T>
where
  T: Product<U>,
```



#### product

接受 Iterator 中的每个元素：如果它是 None，则不再获取其他元素，并返回 None。 如果没有发生 None，则返回所有元素的乘积。

```rust
fn product<I>(iter: I) -> Option<T>
where
  I: Iterator<Item = Option<U>>,
```



示例

这会将字符串 `vector` 中的每个数字相乘，如果无法解析字符串，则操作返回 `None`:

```rust
let nums = vec!["5", "10", "1", "2"];
let total: Option<usize> = nums.iter().map(|w| w.parse::<usize>().ok()).product();

assert_eq!(total, Some(100));

let nums = vec!["5", "10", "one", "2"];
let total: Option<usize> = nums.iter().map(|w| w.parse::<usize>().ok()).product();

assert_eq!(total, None);
```





### impl\<T> Residual\<T> for Option\<Infallible>

#### TryType

此元函数的 `return` 类型。`nightly-only`

```rust
type TryType = Option<T>
```



### impl<T, U> Sum<Option\<U>> for Option\<T>

```rust
impl<T, U> Sum<Option<U>> for Option<T>
where
  T: Sum<U>,
```



#### sum

接受 Iterator 中的每个元素：如果它是 None，则不再获取其他元素，并返回 None。 如果没有发生 None，则返回所有元素的总和。

```rust
fn sum<I>(iter: I) -> Option<T>
where
  I: Iterator<Item = Option<U>>,
```





示例

这总结了字符 `‘a’` 在字符串 `vector` 中的位置，如果单词没有字符 `‘a’`，则该操作返回 `None`：

```rust
let words = vec!["have", "a", "great", "day"];

let total: Option<usize> = words.iter().map(|w| w.find('a')).sum();

assert_eq!(total, Some(5));

let words = vec!["have", "a", "good", "day"];

let total: Option<usize> = words.iter().map(|w| w.find('a')).sum();

assert_eq!(total, None);
```



### impl\<T> Try for Option\<T>

#### Output

当不短路时，? 产生的值的类型。`nightly-only`

```rust
type Output = T
```



#### Residual 

短路时作为 ? 的一部分传递给 `FromResidual::from_residual` 的值的类型。`nightly-only`

```rust
type Residual = Option<Infallible>
```



#### from_output

从它的 Output 类型构造类型。`nightly-only`

```rust
fn from_output(output: <Option<T> as Try>::Output) -> Option<T>
```



#### branch

在 `?` 来决定操作符是应该生成一个值 (因为它返回了 `ControlFlow::Continue`)，还是将一个值传播回调用者 (因为它返回了 `ControlFlow::Break`)。`nightly-only`

```rust
fn branch(
  self
) -> ControlFlow<<Option<T> as Try>::Residual, <Option<T> as Try>::Output>
```





### impl\<T> Copy for Option\<T>

```rust
impl<T> Copy for Option<T>
where
  T: Copy,
```



### impl\<T> Eq for Option\<T>

```rust
impl<T> Eq for Option<T>
where
  T: Eq,
```

### impl\<T> StructuralEq for Option\<T>

### impl\<T> StructuralPartialEq for Option\<T>



## Auto Trait Implementations

### impl\<T> RefUnwindSafe for Option\<T>

```rust
impl<T> RefUnwindSafe for Option<T>
where
  T: RefUnwindSafe,
```



### impl\<T> Send for Option\<T>

```rust
impl<T> Send for Option<T>
where
  T: Send,
```



### impl\<T> Sync for Option\<T>

```rust
impl<T> Sync for Option<T>
where
  T: Sync,
```



### impl\<T> Unpin for Option\<T>

```rust
impl<T> Unpin for Option<T>
where
  T: Unpin,
```



### impl\<T> UnwindSafe for Option\<T>

```rust
impl<T> UnwindSafe for Option<T>
where
  T: UnwindSafe,
```

## Blanket Implementations



### impl\<T> Any for T

```rust
impl<T> Any for T
where
  T: 'static + ?Sized,
```



### impl\<T> Borrow\<T> for T

```rust
impl<T> Borrow<T> for T
where
  T: ?Sized,
```



### impl\<T> BorrowMut\<T> for T

```rust
impl<T> BorrowMut<T> for T
where
  T: ?Sized,
```



### impl\<T> From<!> for T

### impl\<T> From\<T> for T



### impl<T, U> Into\<U> for T

```rust
impl<T, U> Into<U> for T
where
  U: From<T>,
```



### impl\<T> ToOwned for T

```rust
impl<T> ToOwned for T
where
  T: Clone,
```



### impl<T, U> TryFrom\<U> for T

```rust
impl<T, U> TryFrom<U> for T
where
  U: Into<T>,
```



### impl<T, U> TryInto\<U> for T

```rust
impl<T, U> TryInto<U> for T
where
  U: TryFrom<T>,
```

