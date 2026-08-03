# Module std::default

`Default` trait 用于具有默认值的类型。



## Traits

**Default**：一个用于给类型提供有用的默认值的 trait。



## Functions

### default

`nightly-only`

根据 `Default` trait 返回类型的默认值。

从上下文推断要返回的类型。这等效于 `Default::default()`，但类型更短。

```rust
pub fn default<T>() -> T
where
    T: Default,
```

例如：

```rust
#![feature(default_free_fn)]

use std::default::default;

#[derive(Default)]
struct AppConfig {
    foo: FooConfig,
    bar: BarConfig,
}

#[derive(Default)]
struct FooConfig {
    foo: i32,
}

#[derive(Default)]
struct BarConfig {
    bar: f32,
    baz: u8,
}

fn main() {
    let options = AppConfig {
        foo: default(),
        bar: BarConfig {
            bar: 10.1,
            ..default()
        },
    };
}
```



## Derive Macros

### Default

派生宏，生成 Default trait 的 impl。

```rust
#[derive(Default)]
```

示例

```rust
#[derive(Default, Debug)]
struct User {
    id: u32,        // u32 实现了 Default → 默认 0
    name: String,   // String 实现了 Default → 默认 ""
    active: bool,   // bool 实现了 Default → 默认 false
}

fn main() {
    let u = User::default();
    println!("{:?}", u);  // User { id: 0, name: "", active: false }
}
```

