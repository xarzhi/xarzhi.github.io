# Enum std::result::Result

一个用来表示结果或错误的特殊枚举

```rust
pub enum Result<T, E> {
    Ok(T),
    Err(E),
}
```





## Variants

### Ok(T)

包含成功值，如果成功，则值包含在Ok中，类型为T



### Err(E)

包含失败值，如果失败，则值包含在Err中，错误的类型为E







## Implementations

### impl<T, E> Result<T, E>

#### is_ok

判断一个self是否为Ok

```rust
pub const fn is_ok(&self) -> bool
```

**返回值**：

- 若`self`为`Ok`，则返回`true`
- 若`self`为`Err`，则返回`false`

```rust
let o: Result<i32, &str> = Ok(123);
let e: Result<i32, &str> = Err("error");

println!("{}",o.is_ok());   // true
println!("{}",e.is_ok());   // false
```

**源码**：

```rust
#[must_use = "if you intended to assert that this is ok, consider `.unwrap()` instead"]
#[rustc_const_stable(feature = "const_result_basics", since = "1.48.0")]
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub const fn is_ok(&self) -> bool {
    matches!(*self, Ok(_))
}
```



#### is_ok_and

先判断`self`是否是`Ok`变体，再返回谓词函数的返回值

```rust
pub fn is_ok_and(self, f: impl FnOnce(T) -> bool) -> bool
```

**参数**：

- **f**：谓词函数，返回`bool`值；若`self`为`Ok`，则把Ok中包含的值赋值给该函数的参数

**返回值**：

- 若`self`为`Ok`，则返回谓词函数的返回值
- 若`self`为`Err`，则直接返回`false`

```rust
// 当self为Ok
let o: Result<i32, &str> = Ok(123);

let res1 = o.is_ok_and(|x| {
    println!("{}", x); // 123
    if x > 100 { true } else { false }
});

println!("{}", res1); // true

// 当self为Err
let e: Result<i32, &str> = Err("error");
let res2 = e.is_ok_and(|x| {
    // 该函数不会执行
    println!("{}", x);
    true
});
println!("{}", res2); // false
```

**源码**：

```rust
#[must_use]
#[inline]
#[stable(feature = "is_some_and", since = "1.70.0")]
pub fn is_ok_and(self, f: impl FnOnce(T) -> bool) -> bool {
    match self {
        Err(_) => false,
        Ok(x) => f(x),
    }
}
```



#### is_err

判断self是否为`Err`变体

```rust
pub const fn is_err(&self) -> bool
```

**返回值**：

- 若`self`为`Err`变体，则返回`true`
- 若`self`为`Ok`变体，则返回`false`

```rust
let o: Result<i32, &str> = Ok(123);
let e: Result<i32, &str> = Err("error");

println!("{}", o.is_err()); // false
println!("{}", e.is_err()); // true
```

**源码**：

```rust
#[must_use = "if you intended to assert that this is err, consider `.unwrap_err()` instead"]
#[rustc_const_stable(feature = "const_result_basics", since = "1.48.0")]
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub const fn is_err(&self) -> bool {
    !self.is_ok()
}
```



#### is_err_and

先判断`self`是否是`Err`变体，在返回谓词函数的返回值

```rust
pub fn is_err_and(self, f: impl FnOnce(E) -> bool) -> bool
```

**参数**：

- **f**：谓词函数，返回`bool`值；若`self`为`Err`，则把`Err`中包含的错误信息赋值给该函数的参数

**返回值**：

- 若`self`为`Err`，则返回谓词函数的返回值
- 若`self`为`Ok`，则直接返回`false`

```rust
// 当self为Ok
let o: Result<i32, &str> = Ok(123);

let res1 = o.is_err_and(|x| {
    // 该函数不会执行
    println!("{}", x); 
    true
});

println!("{}", res1); // false

// 当self为Err
let e: Result<i32, &str> = Err("error");
let res2 = e.is_err_and(|x| {
    println!("{}", x);  // error
    true
});
println!("{}", res2); // true
```



源码：

```rust
#[must_use]
#[inline]
#[stable(feature = "is_some_and", since = "1.70.0")]
pub fn is_err_and(self, f: impl FnOnce(E) -> bool) -> bool {
    match self {
        Ok(_) => false,
        Err(e) => f(e),
    }
}
```



#### ok

把`Result<T, E>` 转换为`Option<T>`。

```rust
pub fn ok(self) -> Option<T>
```

**返回值**：返回一个`Option`

- 若`self`为`Ok`，则转换后的`Option`为`Some`，`Ok`中包含的值会赋值`Some`中的参数
- 若`self`为`Err`，则转换后的`Option`为`None`

```rust
// 当self为Ok
let o: Result<i32, &str> = Ok(123);
let option_some = o.ok();
println!("{:?}", option_some);      // Some(123)

// 当self为Err
let e: Result<i32, &str> = Err("error");
let option_none = e.ok();
println!("{:?}", option_none);      // None
```

源码：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn ok(self) -> Option<T> {
    match self {
        Ok(x) => Some(x),
        Err(_) => None,
    }
}
```



#### err

从 `Result<T, E>` 转换为 `Option<E>`。

```rust
pub fn err(self) -> Option<E>
```

**返回值**：返回一个`Option`

- 若`self`为`Err`，则转换后的`Option`为`Some`，`Err`中包含的值会赋值`Some`中的参数
- 若`self`为`Ok`，则转换后的`Option`为`None`

```rust
// 当self为Err
let e: Result<i32, &str> = Err("error");
let option_none = e.err();
println!("{:?}", option_none);      // Some("error")


// 当self为Ok
let o: Result<i32, &str> = Ok(123);
let option_some = o.err();
println!("{:?}", option_some);      // None
```

源码：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn err(self) -> Option<E> {
    match self {
        Ok(_) => None,
        Err(x) => Some(x),
    }
}
```



#### as_ref

从 `&Result<T, E>` 转换为 `Result<&T, &E>`。

产生一个新的 `Result`，其中包含对原始引用的引用，并将原始保留在原处。

获取内部值的**不可变引用**，不获取所有权，原`Result`仍可用

```rust
pub const fn as_ref(&self) -> Result<&T, &E>
```

**返回值**：返回一个新的`Result`，不获取原`Result`的所有权

```rust
let o: Result<String, &str> = Ok(String::from("123"));

match o.as_ref() {
    Ok(value) => println!("{}", value),
    Err(err) => println!("{}", err),
}

// 此时o仍可用
println!("{:?}", o); // Ok(123)
```

若不使用`as_ref()`

```rust
let o: Result<String, &str> = Ok(String::from("123"));

match o {
    Ok(value) => println!("{}", value),
    Err(err) => println!("{}", err),
}

// 此时会报错 borrow of partially moved value: `o`
println!("{:?}", o); 
```

:::tip 注意

上面示例选用`String`类型作为Ok的值，因为String在模式匹配中会发生移动

若选用`i32`等基础类型，则模式匹配只会发生复制(copy)，这时候`match`中`Ok`的值和原先的`Ok`的值就没关系了

下面的`as_mut`函数也是一个道理

:::

**源码**：

```rust
#[inline]
#[rustc_const_stable(feature = "const_result_basics", since = "1.48.0")]
#[stable(feature = "rust1", since = "1.0.0")]
pub const fn as_ref(&self) -> Result<&T, &E> {
    match *self {
        Ok(ref x) => Ok(x),
        Err(ref x) => Err(x),
    }
}
```



#### as_mut

从 `&Result<T, E>` 转换为 `Result<&mut T, &mut E>`。

产生一个新的 `Result`，其中包含对原始引用的引用

获取内部值的**可变引用**，不获取所有权，**允许修改内部值**

```rust
pub fn as_mut(&mut self) -> Result<&mut T, &mut E>
```

**返回值**：返回一个新的`Result`，允许修改内部值，且**会一块修改原先`Result`中的值**

```rust
let mut o: Result<String, &str> = Ok(String::from("123"));

match o.as_mut() {
    Ok(value) => {
        value.push_str("456");
        println!("{:?}", value); // "123456"
    }
    Err(err) => println!("{}", err),
}

// 此处o仍可用，且被同步修改
println!("{:?}", o); // Ok("123456")
```

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
#[rustc_const_unstable(feature = "const_result", issue = "82814")]
pub const fn as_mut(&mut self) -> Result<&mut T, &mut E> {
    match *self {
        Ok(ref mut x) => Ok(x),
        Err(ref mut x) => Err(x),
    }
}
```



#### map

处理 `Ok`值；遇到 `Err`时直接返回默认值。

```rust
pub fn map<U, F>(self, op: F) -> Result<U, E>
where
    F: FnOnce(T) -> U,
```

**参数**：

- **op**：一个闭包函数，若`self`为`Ok`，则会把`Ok`中的值移动给`op`的参数，最后`map`会把`op`函数的返回值包裹上`Ok`并返回

**返回值**：

- 若`self`为`Ok`，则返回被`op`函数处理过内部值的`Ok`
- 若`self`为`Err(err)`，则直接返回`Err(err)`

```rust
// 当self为Ok
let o: Result<String, &str> = Ok(String::from("hello"));

let res: Result<String, &str> = o.map(|mut x| {
    x.push_str("world");
    x
});

println!("{:?}", res); // Ok("helloworld")

// d
let e: Result<String, &str> = Err("error");

let res: Result<String, &str> = e.map(|x| {
    // 该函数不会执行
    x
});

println!("{:?}", res); // Err("error")
```

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn map<U, F: FnOnce(T) -> U>(self, op: F) -> Result<U, E> {
    match self {
        Ok(t) => Ok(op(t)),
        Err(e) => Err(e),
    }
}
```



#### map_or

提供一个默认值，如果self为Ok，则返回闭包函数处理后的值，否则返回默认值

```rust
pub fn map_or<U, F>(self, default: U, f: F) -> U
where
    F: FnOnce(T) -> U,
```

**参数**：

- **default**：当`self`为`None`时，返回的默认值
- **f**：当`self`为`Ok`时，`Ok`中的值会被移动给`f`函数的参数，在函数中可根据这个值进行处理，最后`map_or`会返回这个函数的返回值

**返回值**：

- 当`self`为`None`时，返回参数`default`的值
- 当`self`为`Ok`时，返回`f`函数的返回值

```rust
// 当self为Ok
let o: Result<i32, &str> = Ok(100);

let res = o.map_or(-1, |x| x * 2);

println!("{:?}", res); // 200

// 当self为Err
let o: Result<i32, &str> = Err("error");

let res = o.map_or(-1, |x| x * 2);

println!("{:?}", res); // -1
```

源码：

```rust
#[inline]
#[stable(feature = "result_map_or", since = "1.41.0")]
pub fn map_or<U, F: FnOnce(T) -> U>(self, default: U, f: F) -> U {
    match self {
        Ok(t) => f(t),
        Err(_) => default,
    }
}
```



#### map_or_else

如果`self`为`Ok`，则可通过闭包函数`f`处理并返回

如果`self`为`Err`，则返回`default`函数的返回值

```rust
pub fn map_or_else<U, D, F>(self, default: D, f: F) -> U
where
    D: FnOnce(E) -> U,
    F: FnOnce(T) -> U,
```

**参数**：

- default：一个闭包函数；当`self`为`Err`时，`Err`中的错误信息会传递给`default`的参数，最后`default`的返回值会作为`map_or_else`函数为Err时的默认值
- f：一个闭包函数；当`self`为`Ok`时，`Ok`中的值会被移动给`f`函数的参数，在函数中可根据这个值进行处理，最后`map_or_else`会返回这个函数的返回值

**返回值**：

- 当`self`为`Ok`时，返回f闭包函数的返回值
- 当`self`为`Err`时，返回`default`闭包函数的返回值

```rust
// 当self为Ok
let o: Result<i32, &str> = Ok(100);

let res = o.map_or_else(|x| -1, |x| x * 2);

println!("{:?}", res); // 200


// 当self为Err
let o: Result<i32, &str> = Err("error");
let res = o.map_or_else(
    |str| {
        println!("{}", str);
        -1
    },
    |x| x * 2,
);

println!("{:?}", res); // -1
```

源码：

```rust
#[inline]
#[stable(feature = "result_map_or_else", since = "1.41.0")]
pub fn map_or_else<U, D: FnOnce(E) -> U, F: FnOnce(T) -> U>(self, default: D, f: F) -> U {
    match self {
        Ok(t) => f(t),
        Err(e) => default(e),
    }
}
```



#### map_err

处理Err的错误信息，保持Ok不变

```rust
pub fn map_err<F, O>(self, op: O) -> Result<T, F>
where
    O: FnOnce(E) -> F,
```

**参数**：

- op：一个闭包函数：用于处理Err中的错误信息

**返回值**：

- 若`self`为`Ok`，则将`Ok`原样返回
- 若`self`为`Err`，则把`Err`中的错误信息传递给`op`函数的参数，最后返回处理后的`Err`

```rust
let o: Result<i32, String> = Err("error".to_string());

let res: Result<i32, String> = o.map_err(|mut str| {
    println!("错误信息：{}", str); // 错误信息：error
    str.push_str(" message"); 
    str
});
println!("{:?}", res); //  Err("error message")
```

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn map_err<F, O: FnOnce(E) -> F>(self, op: O) -> Result<T, F> {
    match self {
        Ok(t) => Ok(t),
        Err(e) => Err(op(e)),
    }
}
```



#### inspect

以引用的方式接受`Ok`的值，并传入闭包函数中，最后返回`self`方便链式调用

```rust
pub fn inspect<F>(self, f: F) -> Result<T, E>
where
    F: FnOnce(&T),
```

**参数**：

- **f**：一个闭包函数，可以访问`self`中`Ok`的参数

**返回值**：返回`self`，方便链式调用

```rust
let o: Result<i32, String> = Ok(100);

let res = o
.inspect(|x| {
    println!("{}", x); // 100
})
.map(|x| x * 2);

println!("{:?}", res)       // Ok(200)
```

源码：

```rust
#[inline]
#[unstable(feature = "result_option_inspect", issue = "91345")]
pub fn inspect<F: FnOnce(&T)>(self, f: F) -> Self {
    if let Ok(ref t) = self {
        f(t);
    }

    self
}
```



#### inspect_err

和`inspect`相反，以引用的方式接受`Err`的值，并传入闭包函数中，最后返回self方便链式调用

```rust
pub fn inspect_err<F>(self, f: F) -> Result<T, E>
where
    F: FnOnce(&E),
```

**参数**：

- **f**：一个闭包函数，可以访问`self`中`Err`的参数

**返回值**：返回`self`，方便链式调用

```rust
let o: Result<i32, String> = Err("错误".to_string());

let res = o
.inspect_err(|err| {
    println!("{}", err); // 错误
})
.map(|x| x * 2);

println!("{:?}", res) // Err("错误")
```

**源码**：

```rust
#[inline]
#[unstable(feature = "result_option_inspect", issue = "91345")]
pub fn inspect_err<F: FnOnce(&E)>(self, f: F) -> Self {
    if let Err(ref e) = self {
        f(e);
    }

    self
}
```



#### as_deref

用于便捷地获取内部数据的引用

从 `Result<T, E>` (或 `&Result<T, E>`) 转换为 `Result<&<T as Deref>::Target, &E>`。

通过 `Deref` 强制转换原始 `Result` 的 `Ok` 变体，并返回新的 `Result`。

`as_deref()`能让你直接访问到其内部数据的不可变引用，而无需手动处理引用和解引用。

```rust
pub fn as_deref(&self) -> Result<&<T as Deref>::Target, &E>
where
    T: Deref,
```

**返回值**：返回一个新的Result，包含内部数据的**不可变引用**

```rust
let x: Result<String, u32> = Ok("hello".to_string());
let y: Result<&str, &u32> = Ok("hello");
assert_eq!(x.as_deref(), y);

let x: Result<String, u32> = Err(42);
let y: Result<&str, &u32> = Err(&42);
assert_eq!(x.as_deref(), y);
```

**源码**：

```rust
#[inline]
#[stable(feature = "inner_deref", since = "1.47.0")]
pub fn as_deref(&self) -> Result<&T::Target, &E>
where
	T: Deref,
{
    self.as_ref().map(|t| t.deref())
}
```



#### as_deref_mut

用于获取内部数据的**可变引用**

从 `Result<T, E>` (或 `&mut Result<T, E>`) 转换为 `Result<&mut <T as DerefMut>::Target, &mut E>`。

通过 `DerefMut` 强制转换原始 `Result` 的 `Ok` 变体，并返回新的 `Result`。

```rust
pub fn as_deref_mut(&mut self) -> Result<&mut <T as Deref>::Target, &mut E>
where
    T: DerefMut,
```

**返回值**：返回一个新的Result，包含内部数据的**可变引用**

源码：

```rust
#[inline]
#[stable(feature = "inner_deref", since = "1.47.0")]
pub fn as_deref_mut(&mut self) -> Result<&mut T::Target, &mut E>
where
	T: DerefMut,
{
    self.as_mut().map(|t| t.deref_mut())
}
```



#### iter

返回一个迭代器，调用`next()`返回一个`Option`

```rust
pub fn iter(&self) -> Iter<'_, T> 
```

**返回值**：返回一个迭代器

- 若`self`为`Ok`，则调用迭代器的`next()`方法返回`Some`，`Some`中的值即为`Ok`中的值
- 若`self`为`Err`，则调用迭代器的`next()`方法返回`None`

```rust
// 当self为Ok
let o: Result<i32, String> = Ok(123);

let res = o.iter().next();

println!("{:?}", res); // Some(123)


// 当self为Err
let o: Result<i32, String> = Err("123".to_string());

let res = o.iter().next();

println!("{:?}", res); // None
```

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn iter(&self) -> Iter<'_, T> {
    Iter { inner: self.as_ref().ok() }
}
```



#### iter_mut

返回一个迭代器，调用`next()`返回一个`Option`，包含对self中值的**可变引用**

```rust
pub fn iter_mut(&mut self) -> IterMut<'_, T> 
```

**返回值**：返回一个迭代器

- 若`self`为`Ok`，则调用迭代器的`next()`方法返回`Some`，`Some`中的值即为`Ok`中的值
- 若`self`为`Err`，则调用迭代器的`next()`方法返回`None`

```rust
x // 当self为Ok
let mut o: Result<i32, String> = Ok(123);

let mut res = o.iter_mut();

match res.next() {
    Some(value) => println!("{}", value), // 123
    None => (),
}

// 当self为Err
let mut o: Result<i32, String> = Err("error".to_string());

let mut res = o.iter_mut();

println!("{:?}", res.next())       // None
```

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn iter_mut(&mut self) -> IterMut<'_, T> {
    IterMut { inner: self.as_mut().ok() }
}
```



#### expect

如果`self`为`Err`，可以自定义出现`panic`时的的信息

```rust
pub fn expect(self, msg: &str) -> T
where
    E: Debug,
```

**参数**：

- **msg**：当`self`为`Err`时，自定义`panic`的字符串

**返回值**：

- 若`self`为`Ok`，则正常返回`Ok`
- 若`self`为`Err`，则panic，且信息为自己定义的字符串

```rust
let o: Result<i32, String> = Err("error".to_string());

let res = o.expect("我了个豆啊");           // panic   我了个豆啊: "error"
```

源码：

```rust
#[inline]
#[track_caller]
#[stable(feature = "result_expect", since = "1.4.0")]
pub fn expect(self, msg: &str) -> T
where
	E: fmt::Debug,
{
    match self {
        Ok(t) => t,
        Err(e) => unwrap_failed(msg, &e),
    }
}
```





#### expext_err

用于提取 `Result`中的错误值，当结果为 `Ok`时会导致程序 `panic`并显示提供的错误消息。

```rust
pub fn expect_err(self, msg: &str) -> E
where
    T: Debug,
```

**参数**：

- msg：自定义的错误信息

**返回值**：

- 若`self`为`Ok`，则`panic`
- 若`self`为`Err`，则返回错误信息

```rust
// 当self为Err时
let o: Result<i32, String> = Err("error".to_string());

let res = o.expect_err("我了个豆啊"); 

println!("{}", res)         // error

// 当self为Ok时
let o: Result<i32, String> = Ok(123);

let res = o.expect_err("我了个豆啊");       // panic 我了个豆啊: 123
```

**源码**：

```rust
#[inline]
#[track_caller]
#[stable(feature = "result_expect_err", since = "1.17.0")]
pub fn expect_err(self, msg: &str) -> E
where
	T: fmt::Debug,
{
    match self {
        Ok(t) => unwrap_failed(msg, &t),
        Err(e) => e,
    }
}
```



#### unwrap_err

返回包含 `self` 值的包含的 `Err`值。

如果值为 `Ok`，就会出现 panics，其中 panic 消息包括传递的消息以及`Ok`的内容。

```rust
pub fn unwrap_err(self) -> E
where
    T: Debug,
```

**返回值**：

- 若self为Ok，则程序会panic，且panic的消息为Ok的值
- 若self为Err，则返回Err中的错误信息

```rust
// 当self为Ok
let o: Result<String, String> = Ok("这是第一次做你滴老爸".to_string());

let res = o.unwrap_err(); // panic called `Result::unwrap_err()` on an `Ok` value: "这是第一次做你滴老爸"

// 当self为Err
let o: Result<String, String> = Err("我的心情也有些复杂".to_string());

let res = o.unwrap_err();

println!("{}", res) // 我的心情也有些复杂
```

**源码**：

```rust
#[inline]
#[track_caller]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn unwrap_err(self) -> E
where
	T: fmt::Debug,
{
    match self {
        Ok(t) => unwrap_failed("called `Result::unwrap_err()` on an `Ok` value", &t),
        Err(e) => e,
    }
}
```



#### into_ok



```rust
pub fn into_ok(self) -> T
where
    E: Into<!>,
```

**参数**：

**返回值**：

源码：

```rust
#[unstable(feature = "unwrap_infallible", reason = "newly added", issue = "61695")]
#[inline]
pub fn into_ok(self) -> T
where
	E: Into<!>,
{
    match self {
        Ok(x) => x,
        Err(e) => e.into(),
    }
}
```



#### into_err



```rust
pub fn into_err(self) -> E
where
    T: Into<!>,
```

**参数**：

**返回值**：

源码：

```rust
#[unstable(feature = "unwrap_infallible", reason = "newly added", issue = "61695")]
#[inline]
pub fn into_err(self) -> E
where
	T: Into<!>,
{
    match self {
        Ok(x) => x.into(),
        Err(e) => e,
    }
}
```



#### and

如果结果为 `Ok`，则返回自己提供的Result，否则，返回 `self` 的 `Err` 值。

```rust
pub fn and<U>(self, res: Result<U, E>) -> Result<U, E>
```

**参数**：

- **res**：一个`Result`，当`self`为`Ok`时被返回

**返回值**：

- 当`self`为`Ok`时，返回`res`
- 当`self`为`Err`时，返回`self`的`Err`

```rust
// 当self为Ok，res参数为Ok
let o: Result<i32, &str> = Ok(123);
let res = o.and(Ok(456));
println!("{:?}", res); // Ok(456)

// 当self为Ok，res参数为Err
let o: Result<i32, &str> = Ok(123);
let res: Result<i32, &str> = o.and(Err("error"));
println!("{:?}", res); // Err("error")

// 当self为Err，res参数为Ok
let o: Result<i32, &str> = Err("error");
let res: Result<i32, &str> = o.and(Ok(123));
println!("{:?}", res); // Err("error")

// 当self为Err，res参数为Err
let o: Result<i32, &str> = Err("error");
let res: Result<i32, &str> = o.and(Err("error123"));
println!("{:?}", res); // Err("error")
```

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn and<U>(self, res: Result<U, E>) -> Result<U, E> {
    match self {
        Ok(_) => res,
        Err(e) => Err(e),
    }
}
```



#### and_then

若self为Ok，则返回回调的返回值，否则返回self的Err

```rust
pub fn and_then<U, F>(self, op: F) -> Result<U, E>
where
    F: FnOnce(T) -> Result<U, E>,
```

**参数**：

- **op**：一个闭包函数，当`self`为`Ok`时，`Ok`包含的值会传递给`op`的参数，最后`and_then`返回这个函数的返回值

**返回值**：

- 当`self`为`Ok`时，返回`op`的返回值
- 当`self`为`Err`时，返回`self`的`Err`

```rust
// 当self为Ok，res参数为Ok
let o: Result<i32, &str> = Ok(100);
let res: Result<i32, &str> = o.and_then(|x| Ok(x * 2));
println!("{:?}", res); // Ok(200)

// 当self为Ok，res参数为Err
let o: Result<i32, &str> = Ok(123);
let res: Result<i32, &str> = o.and_then(|x| Err("error"));
println!("{:?}", res); // Err("error")

// 当self为Err，res参数为Ok
let o: Result<i32, &str> = Err("error");
let res: Result<i32, &str> = o.and_then(|x| Ok(x * 2));
println!("{:?}", res); // Err("error")

// 当self为Err，res参数为Err
let o: Result<i32, &str> = Err("error");
let res: Result<i32, &str> = o.and_then(|x| Err("error"));
println!("{:?}", res); // Err("error")
```

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn and_then<U, F>(self, op: F) -> Result<U, E> 
where
	F: FnOnce(T) -> Result<U, E>
{
    match self {
        Ok(t) => op(t),
        Err(e) => Err(e),
    }
}
```



#### or

如果self为 `Err`，则返回传入的`Result`; 否则，返回 `self` 的 `Ok` 值。

```rust
pub fn or<F>(self, res: Result<T, F>) -> Result<T, F>
```

**参数**：

- **res**：一个`Result`，当`self`为`Err`时被返回

**返回值**：

- 当`self`为`Ok`时，返回`Ok`自身
- 当`self`为`Err`时，返回`res`

```rust
// 当self为Ok
let o: Result<i32, &str> = Ok(100);
let res: Result<i32, &str> = o.or(Ok(666));
println!("{:?}", res); // Ok(100)

// 当self为Err
let o: Result<i32, &str> = Err("error");
let res: Result<i32, &str> = o.or(Ok(666));
println!("{:?}", res); // Ok(666)
```

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn or<F>(self, res: Result<T, F>) -> Result<T, F> {
    match self {
        Ok(v) => Ok(v),
        Err(_) => res,
    }
}
```



#### or_else

如果结果为 `Err`，则调用 `op`并返回`op`的返回值，否则返回 `self` 的 `Ok` 值。

```rust
pub fn or_else<F, O>(self, op: O) -> Result<T, F>
where
    O: FnOnce(E) -> Result<T, F>,
```

**参数**：

- **op**：一个闭包回调，当`self`为`Err`时，`Err`的错误信息会传递给`op`函数的参数，最后`or_else`返回`op`的返回值

**返回值**：

- 当`self`为`Ok`时，返回`Ok`自身
- 当`self`为`Err`时，返回`op`的返回值

```rust
// 当self为Ok
let o: Result<i32, &str> = Ok(100);
let res: Result<i32, &str> = o.or_else(|x| Ok(666));
println!("{:?}", res); // Ok(100)

// 当self为Err
let o: Result<i32, &str> = Err("error");
let res: Result<i32, &str> = o.or_else(|x| Ok(666));
println!("{:?}", res); // Ok(666)
```

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn or_else<F, O: FnOnce(E) -> Result<T, F>>(self, op: O) -> Result<T, F> {
    match self {
        Ok(t) => Ok(t),
        Err(e) => op(e),
    }
}
```



#### unwrap

取出`Ok`中的值并返回，若`self`为`Err`，则会导致`panic`

```rust
pub fn unwrap(self) -> T
where
    E: Debug,
```

**返回值**：

- 若`self`为`Ok`，则返回`OK`中的值
- 若`self`为`Err`，则程序`panic`

```rust
// self为Ok
let o: Result<i32, &str> = Ok(100);
let res = o.unwrap();
println!("{}", res); // 100

// self为Err
let o: Result<i32, &str> = Err("error");
let res = o.unwrap(); // panic
```

**源码**：

```rust
#[inline]
#[track_caller]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn unwrap(self) -> T
where
	E: fmt::Debug,
{
    match self {
        Ok(t) => t,
        Err(e) => unwrap_failed("called `Result::unwrap()` on an `Err` value", &e),
    }
}
```



#### unwrap_or

```rust
pub fn unwrap_or(self, default: T) -> T
```

**参数**：

- `default`：当`self`为`Err`时，被返回的默认值

**返回值**：

- 当`self`为`Ok`时，返回`Ok`中包含的值
- 当`self`为`Err`，返回传入的默认值

源码：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn unwrap_or(self, default: T) -> T {
    match self {
        Ok(t) => t,
        Err(_) => default,
    }
}
```



#### unwrap_or_default

取出`Ok`中的值并返回，若`self`为`Err`，则返回`T`类型的默认值

```rust
pub fn unwrap_or_default(self) -> T
where
    T: Default,
```

**返回值**：

- 若`self`为`Ok`，则返回`OK`中的值
- 若`self`为`Err`，则返回`Ok`中值的类型的默认值，比如`i32`的默认值为`0`

```rust
// self为Ok
let o: Result<i32, &str> = Ok(100);
let res = o.unwrap_or_default();
println!("{}", res); // 100

// self为Err
let o: Result<i32, &str> = Err("error");
let res = o.unwrap_or_default();
println!("{}", res); // 0
```

**源码**：

```rust
#[inline]
#[stable(feature = "result_unwrap_or_default", since = "1.16.0")]
pub fn unwrap_or_default(self) -> T
where
	T: Default,
{
    match self {
        Ok(x) => x,
        Err(_) => Default::default(),
    }
}
```





#### unwrap_or_else

```rust
pub fn unwrap_or_else<F>(self, op: F) -> T
where
    F: FnOnce(E) -> T,
```

**参数**：

- **op**：一个闭包函数，当`self`为`Err`时，会将`Err`的错误信息传递给这个函数的参数

**返回值**：

- 若`self`为`Ok`，则返回`OK`中的值
- 若`self`为`Err`，则把`Err`中的错误信息传递给`op`的参数，最后返回`op`函数的返回值

```rust
// self为Ok
let o: Result<i32, &str> = Ok(100);
let res = o.unwrap_or_else(|e| 200);
println!("{}", res); // 100

// self为Err
let o: Result<i32, &str> = Err("error");
let res = o.unwrap_or_else(|e| if e == "error" { 200 } else { 300 });
println!("{}", res); // 200
```

**源码**：

```rust
#[inline]
#[stable(feature = "rust1", since = "1.0.0")]
pub fn unwrap_or_else<F: FnOnce(E) -> T>(self, op: F) -> T {
    match self {
        Ok(t) => t,
        Err(e) => op(e),
    }
}
```



#### unwrap_unchecked

在不检查`self`是否为`Err`的情况下，直接取出`Ok`中的值，如果`self`为`E`rr，则会报错

使用`unwrap_unchecked`需要包含在`unsafe`块中，并且百分之百确定 `Result`是 `Ok`

```rust
pub unsafe fn unwrap_unchecked(self) -> T
```

**返回值**：

- 若`self`为`Ok`，则返回`OK`中的值
- 若`self`为`Err`，则程序会`panic`

```rust
// self为Ok
let o: Result<i32, &str> = Ok(100);
let res = unsafe { o.unwrap_unchecked() };
println!("{}", res); // 100

// self为Err
let o: Result<i32, &str> = Err("error");
let res = unsafe { o.unwrap_unchecked() };      // panic
```

**源码**：

```rust
#[inline]
#[track_caller]
#[stable(feature = "option_result_unwrap_unchecked", since = "1.58.0")]
pub unsafe fn unwrap_unchecked(self) -> T {
    debug_assert!(self.is_ok());
    match self {
        Ok(t) => t,
        // SAFETY: 调用者必须坚持安全保证。
        Err(_) => unsafe { hint::unreachable_unchecked() },
    }
}
```



#### unwrap_err_unchecked

在不检查`self`是否为`Ok`的情况下，直接取出`Err`中的错误信息，如果`self`为`Ok`，则会报错

使用`unwrap_unchecked`需要包含在`unsafe`块中，并且百分之百确定 `Result`是 `Err`

```rust
pub unsafe fn unwrap_err_unchecked(self) -> E
```

**返回值**：

- 若`self`为`Ok`，则程序会`panic`
- 若`self`为`Err`，则返回`Err`的错误信息

```rust
// self为Err
let o: Result<i32, &str> = Err("error");
let res = unsafe { o.unwrap_err_unchecked() }; // panic
println!("{}", res); // 100

// self为O
let o: Result<i32, &str> = Ok(100);
let res = unsafe { o.unwrap_err_unchecked() };
println!("{}", res); // 100
```

**源码**：

```rust
#[inline]
#[track_caller]
#[stable(feature = "option_result_unwrap_unchecked", since = "1.58.0")]
pub unsafe fn unwrap_err_unchecked(self) -> E {
    debug_assert!(self.is_err());
    match self {
        // SAFETY: 调用者必须坚持安全保证。
        Ok(_) => unsafe { hint::unreachable_unchecked() },
        Err(e) => e,
    }
}
```



### impl<T, E> Result<&T, E>

#### copied

当`Ok`中的值为**基本数据类型**时，可用此方法

用于返回`Ok`中值的**不可变借用**

```rust
pub fn copied(self) -> Result<T, E>
where
    T: Copy,
```

**返回值**：

- 当`self`为`Ok`时，返回`Ok`中值的**不可变借用**
- 当`self`为`Err`时，正常返回错误信息

```rust
// 当self为Ok
let num: i32 = 123;
let o: Result<&i32, &str> = Ok(&num);
let res = o.copied();
println!("{:?}", res); // Ok(123)

// 当self为Err
let str: &str = "error";
let o: Result<&i32, &str> = Err(&str);
let res = o.copied();
println!("{:?}", res); // Err("error")
```

**源码**：

```rust
#[inline]
#[stable(feature = "result_copied", since = "1.59.0")]
pub fn copied(self) -> Result<T, E>
where
	T: Copy,
{
    self.map(|&t| t)
}
```



#### cloned

当`Ok`中的值为**复合类型**时，可用此方法

用于返回`Ok`中值的**不可变借用**

```rust
pub fn cloned(self) -> Result<T, E>
where
    T: Clone,
```

**返回值**：

- 当`self`为`Ok`时，返回`Ok`中值的**不可变借用**
- 当`self`为`Err`时，正常返回错误信息

```rust
let str = (1, 2);
let o: Result<(i32, i32), &str> = Ok(str);
let res = o.clone();
println!("{:?}", res); // Ok((1, 2))
```

**源**码：

```rust
#[inline]
#[stable(feature = "result_cloned", since = "1.59.0")]
pub fn cloned(self) -> Result<T, E>
where
	T: Clone,
{
    self.map(|t| t.clone())
}
```



### impl<T, E> Result<&mut T, E>

#### copied

当`Ok`中的值为**基本数据类型**时，可用此方法

用于返回`Ok`中值的**可变借用**

```rust
pub fn copied(self) -> Result<T, E>
where
    T: Copy,
```

**返回值**：

- 当`self`为`Ok`时，返回`Ok`中值的**可变借用**
- 当`self`为`Err`时，正常返回错误信息

```rust
// 当self为Ok
let mut num: i32 = 100;
let o: Result<&i32, &str> = Ok(&mut num);
if let Ok(mut value) = o.copied() {
    value = value * 2;          // 可以被修改
    println!("{}", value)
}
```

**源码**：

```rust
#[inline]
#[stable(feature = "result_copied", since = "1.59.0")]
pub fn copied(self) -> Result<T, E>
where
	T: Copy,
{
    self.map(|&mut t| t)
}
```



#### cloned

当`Ok`中的值为**复合类型**时，可用此方法

用于返回`Ok`中值的**可变借用**

```rust
pub fn cloned(self) -> Result<T, E>
where
    T: Clone,
```

**返回值**：

- 当`self`为`Ok`时，返回`Ok`中值的**可变借用**
- 当`self`为`Err`时，正常返回错误信息

```rust
// 当self为Ok
let mut tu: (i32, i32) = (11, 22);
let o: Result<&(i32, i32), &str> = Ok(&mut tu);
if let Ok(mut value) = o.copied() {
    value.0 = 33; // 可以被修改
    value.1 = 44; // 可以被修改

    println!("{:?}", value)
}
```

**源码**：

```rust
#[inline]
#[stable(feature = "result_cloned", since = "1.59.0")]
pub fn cloned(self) -> Result<T, E>
where
	T: Clone,
{
    self.map(|t| t.clone())
}
```



### impl<T, E> Result<Option\<T>, E>

#### transpose

将包含`Option`的`Result`转换成包含`Result`的`Option`

`Ok(None)` 将映射到 `None`。 `Ok(Some(_))` 和 `Err(_)` 将映射到 `Some(Ok(_))` 和 `Some(Err(_))`。

```rust
pub fn transpose(self) -> Option<Result<T, E>>
```

**返回值**：

- 当`self`为`Ok`时
  - `Ok(Some(_))`转换为`Some(Ok(_))`
  - `Ok(None)`转换为`None`
- 当`self`为`Err`时
  - `Err(_)`转换为`Some(Err(_))`

```rust
// self为Ok，值为Some
let o: Result<Option<i32>, &str> = Ok(Some(123));
let res = o.transpose();
println!("{:?}", res); // Some(Ok(123))

// self为Ok，值为None
let o: Result<Option<i32>, &str> = Ok(None);
let res = o.transpose();
println!("{:?}", res); // None

// self为Err
let o: Result<Option<i32>, &str> = Err("error");
let res = o.transpose();
println!("{:?}", res); // Some(Err("error"))
```

**源码**：

```rust
#[inline]
#[stable(feature = "transpose_result", since = "1.33.0")]
#[rustc_const_unstable(feature = "const_result", issue = "82814")]
pub const fn transpose(self) -> Option<Result<T, E>> {
    match self {
        Ok(Some(x)) => Some(Ok(x)),
        Ok(None) => None,
        Err(e) => Some(Err(e)),
    }
}
```



### impl<T, E> Result<Result<T, E>, E>

#### flatten

从 `Result<Result<T, E>, E>` 转换为 `Result<T, E>`

```rust
pub fn flatten(self) -> Result<T, E>
```

**返回值**：返回被解包的Result

```rust		
let o: Result<Result<i32, &str>, &str> = Ok(Ok(123));
let res = o.flatten();
println!("{:?}", res); // Ok(123)


let o: Result<Result<i32, &str>, &str> = Ok(Err("error"));
let res = o.flatten();
println!("{:?}", res); // Err("error")
```

**源码**：

```rust
#[inline]
#[unstable(feature = "result_flattening", issue = "70142")]
pub fn flatten(self) -> Result<T, E> {
    self.and_then(convert::identity)
}
```







## Trait Implementations

### impl<T, E> Clone for Result<T, E>

```rust
impl<T, E> Clone for Result<T, E>
where
 T: Clone,
 E: Clone,
```



#### clone

返回值的副本。

```rust
fn clone(&self) -> Result<T, E>
```



#### clone_from

从 source执行复制分配。

```rust
fn clone_from(&mut self, source: &Result<T, E>)
```



#### impl<T, E> Debug for Result<T, E>

```rust
impl<T, E> Debug for Result<T, E>
where
 T: Debug,
 E: Debug,
```



#### fmt

使用给定的格式化程序格式化该值。

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```

 





### impl<A, E, V> FromIterator<Result<A, E>> for Result<V, E>

```rust
impl<A, E, V> FromIterator<Result<A, E>> for Result<V, E>
where
 V: FromIterator<A>,
```



#### from_iter

接受 Iterator 中的每个元素：如果它是 Err，则不再获取其他元素，并返回 Err。 如果没有发生 Err，则返回包含每个 Result 值的容器。

```rust
fn from_iter<I>(iter: I) -> Result<V, E>
where
 I: IntoIterator<Item = Result<A, E>>,
```

这是一个示例，该示例将递增 vector 中的的每个整数，并检查溢出：

```rust
let v = vec![1, 2];

let res: Result<Vec<u32>, &'static str> = v.iter().map(|x: &u32|
 x.checked_add(1).ok_or("Overflow!")
).collect();


assert_eq!(res, Ok(vec![2, 3]));
```



这是另一个示例，尝试从另一个整数列表中减去一个，这次检查下溢：

```rust
let v = vec![1, 2, 0];

let res: Result<Vec<u32>, &'static str> = v.iter().map(|x: &u32|
 x.checked_sub(1).ok_or("Underflow!")
).collect();


assert_eq!(res, Err("Underflow!"));
```



这是前一个示例的变体，显示在第一个 Err 之后不再从 iter 提取其他元素。

```rust
let v = vec![3, 2, 1, 10];

let mut shared = 0;

let res: Result<Vec<u32>, &'static str> = v.iter().map(|x: &u32| {
 shared += x;
 x.checked_sub(2).ok_or("Underflow!")
}).collect();



assert_eq!(res, Err("Underflow!"));
assert_eq!(shared, 6);
```

由于第三个元素引起下溢，因此不再使用其他元素，因此 shared 的最终值为 6 (= 3 + 2 + 1)，而不是 16。







### impl<T, E, F> FromResidual<Result<Infallible, E>> for Poll<Option<Result<T, F>>>

```rust
impl<T, E, F> FromResidual<Result<Infallible, E>> for Poll<Option<Result<T, F>>>
where
 F: From<E>,
```





#### from_residual

从兼容的 Residual 类型构造类型。  `nightly-only`

```rust
fn from_residual(x: Result<Infallible, E>) -> Poll<Option<Result<T, F>>>
```





### impl<T, E, F> FromResidual<Result<Infallible, E>> for Poll<Result<T, F>>

```rust
impl<T, E, F> FromResidual<Result<Infallible, E>> for Poll<Result<T, F>>
where
 F: From<E>,
```



#### from_residual

从兼容的 Residual 类型构造类型。 `nightly-only`

```rust
fn from_residual(x: Result<Infallible, E>) -> Poll<Result<T, F>>
```







### impl<T, E, F> FromResidual<Result<Infallible, E>> for Result<T, F>

```rust
impl<T, E, F> FromResidual<Result<Infallible, E>> for Result<T, F>
where
 F: From<E>,
```



#### from_residual

从兼容的 Residual 类型构造类型。nightly-only 

```rust
fn from_residual(residual: Result<Infallible, E>) -> Result<T, F>
```







### impl<T, E, F> FromResidual<Yeet\<E>> for Result<T, F>

```rust
impl<T, E, F> FromResidual<Yeet<E>> for Result<T, F>
where
 F: From<E>,
```



#### from_residual

从兼容的 Residual 类型构造类型。  `nightly-only`

```rust
fn from_residual(_: Yeet<E>) -> Result<T, F>
```







### impl<T, E> Hash for Result<T, E>

```rust
impl<T, E> Hash for Result<T, E>
where
 T: Hash,
 E: Hash,
```



#### hash

将该值输入给定的 Hasher。 

```rust
fn hash<__H>(&self, state: &mut __H)
where
 __H: Hasher,
```







#### hash_slice

将这种类型的切片送入给定的 Hasher 中。

```rust
fn hash_slice<H>(data: &[Self], state: &mut H)
where
 H: Hasher,
 Self: Sized,
```





### impl<'a, T, E> IntoIterator for &'a Result<T, E>

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









### impl<'a, T, E> IntoIterator for &'a mut Result<T, E>

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







### impl<T, E> IntoIterator for Result<T, E>



#### into_iter

如果结果为 `Result::Ok`，则迭代器将产生一个值，否则将不产生任何值。返回可能包含的值上的消耗迭代器。

```rust
fn into_iter(self) -> IntoIter<T> 
```



Examples

```rust
let x: Result<u32, &str> = Ok(5);
let v: Vec<u32> = x.into_iter().collect();


assert_eq!(v, [5]);


let x: Result<u32, &str> = Err("nothing!");
let v: Vec<u32> = x.into_iter().collect();


assert_eq!(v, []);
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







### impl<T, E> Ord for Result<T, E>

```rust
impl<T, E> Ord for Result<T, E>
where
 T: Ord,
 E: Ord,
```



#### cmp

此方法返回 self 和 other 之间的 Ordering。 

```rust
fn cmp(&self, other: &Result<T, E>) -> Ordering
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







### impl<T, E> PartialEq<Result<T, E>> for Result<T, E>

```rust
impl<T, E> PartialEq<Result<T, E>> for Result<T, E>
where
 T: PartialEq<T>,
 E: PartialEq<E>,
```



#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &Result<T, E>) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```







### impl<T, E> PartialOrd<Result<T, E>> for Result<T, E>

```rust
impl<T, E> PartialOrd<Result<T, E>> for Result<T, E>
where
 T: PartialOrd<T>,
 E: PartialOrd<E>,
```



#### partial_cmp

如果存在，则此方法返回 self 和 other 值之间的顺序。 

```rust
fn partial_cmp(&self, other: &Result<T, E>) -> Option<Ordering>
```



#### lt

此方法测试的内容少于 (对于 self 和 other)，并且由 < 操作员使用。 

```rust
fn lt(&self, other: &Rhs) -> bool
```



#### le

此方法测试小于或等于 (对于 self 和 other)，并且由 <= 运算符使用。 

```rust
fn le(&self, other: &Rhs) -> bool
```



#### gt

此方法测试大于 (对于 self 和 other)，并且由 > 操作员使用。

```rust
 fn gt(&self, other: &Rhs) -> bool
```



#### ge

此方法测试是否大于或等于 (对于 self 和 other)，并且由 >= 运算符使用。 

```rust
fn ge(&self, other: &Rhs) -> bool
```



### impl<T, U, E> Product<Result<U, E>> for Result<T, E>

```rust
impl<T, U, E> Product<Result<U, E>> for Result<T, E>
where
 T: Product<U>,
```



#### product

接受 Iterator 中的每个元素：如果它是 Err，则不再获取其他元素，并返回 Err。 如果没有发生 Err，则返回所有元素的乘积。

```rust
fn product<I>(iter: I) -> Result<T, E>
where
 I: Iterator<Item = Result<U, E>>,
```





Examples

这会将字符串 vector 中的每个数字相乘，如果无法解析字符串，则操作返回 Err:

```rust
let nums = vec!["5", "10", "1", "2"];
let total: Result<usize, _> = nums.iter().map(|w| w.parse::<usize>()).product();
assert_eq!(total, Ok(100));



let nums = vec!["5", "10", "one", "2"];
let total: Result<usize, _> = nums.iter().map(|w| w.parse::<usize>()).product();
assert!(ttal.is_err());
```



### impl<T, E> Residual\<T> for Result<Infallible, E>

#### TryType

此元函数的 “return” 类型。`nightly-only`

```rust
type TryType = Result<T, E>
```









### impl<T, U, E> Sum<Result<U, E>> for Result<T, E>

```rust
impl<T, U, E> Sum<Result<U, E>> for Result<T, E>
where
 T: Sum<U>,
```



#### sum

接受 Iterator 中的每个元素：如果它是 Err，则不再获取其他元素，并返回 Err。 如果没有发生 Err，则返回所有元素的总和。

```rust
fn sum<I>(iter: I) -> Result<T, E>
where
 I: Iterator<Item = Result<U, E>>,
```





Examples

这将对 vector 中的每个整数求和，如果遇到负元素，则拒绝求和：

```rust
let f = |&x: &i32| if x < 0 { Err("Negative element found") } else { Ok(x) };
let v = vec![1, 2];
let res: Result<i32, _> = v.iter().map(f).sum();
assert_eq!(res, Ok(3));



let v = vec![1, -2];
let res: Result<i32, _> = v.iter().map(f).sum();
assert_eq!(res, Err("Negative element found"));
```



### impl<T: Termination, E: Debug> Termination for Result<T, E>



#### report

被调用以获取值的表示形式作为状态码。 此状态代码返回到操作系统。

```rust
fn report(self) -> ExitCode
```



### impl<T, E> Try for Result<T, E>

#### Output 

当不短路时，? 产生的值的类型。`nightly-only` 

```rust
type Output = T
```



#### Residual

短路时作为 ? 的一部分传递给 FromResidual::from_residual 的值的类型。 `nightly-only`

```rust
type Residual = Result<Infallible, E>
```



#### from_ouput

从它的 Output 类型构造类型。 `nightly-only`

```rust
fn from_output(output: <Result<T, E> as Try>::Output) -> Result<T, E>
```



#### branch

在 ? 来决定操作符是应该生成一个值 (因为它返回了 ControlFlow::Continue)，还是将一个值传播回调用者 (因为它返回了 ControlFlow::Break)。  `nightly-only`

```rust
fn branch(
 self
) -> ControlFlow<<Result<T, E> as Try>::Residual, <Result<T, E> as Try>::Output>
```



### impl<T, E> Copy for Result<T, E>

```rust
impl<T, E> Copy for Result<T, E>
where
 T: Copy,
 E: Copy,
```



### impl<T, E> Eq for Result<T, E>

```rust
impl<T, E> Eq for Result<T, E>
where
 T: Eq,
 E: Eq,
```



### impl<T, E> StructuralEq for Result<T, E>

### impl<T, E> StructuralPartialEq for Result<T, E>



## Auto Trait Implementations



### impl<T, E> RefUnwindSafe for Result<T, E>

```rust
impl<T, E> RefUnwindSafe for Result<T, E>
where
 E: RefUnwindSafe,
 T: RefUnwindSafe,
```



### impl<T, E> Send for Result<T, E>

```rust
impl<T, E> Send for Result<T, E>
where
 E: Send,
 T: Send,
```



### impl<T, E> Sync for Result<T, E>

```rust
impl<T, E> Sync for Result<T, E>
where
 E: Sync,
 T: Sync,
```



### impl<T, E> Unpin for Result<T, E>

```rust
impl<T, E> Unpin for Result<T, E>
where
 E: Unpin,
 T: Unpin,
```



### impl<T, E> UnwindSafe for Result<T, E>

```rust
impl<T, E> UnwindSafe for Result<T, E>
where
 E: UnwindSafe,
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
 T: Sized,
```



### impl\<T> BorrowMut\<T> for T

```rust
impl<T> BorrowMut<T> for T
where
 T: ?Sized,
```



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

