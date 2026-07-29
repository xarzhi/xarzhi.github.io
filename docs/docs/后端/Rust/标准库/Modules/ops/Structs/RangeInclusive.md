# Struct std::ops::RangeInclusive

围包括 (`start..=end`) 的上下边界。

`RangeInclusive` `start..=end` 包含 `x >= start` 和 `x <= end` 的所有值。除非 `start <= end`，否则为空。

这个迭代器是 `fused`，但是迭代完成后 `start` 和 `end` 的特定值是未指定的，除了 .`is_empty()` 之外，一旦不再产生值，就会返回 `true`。

```rust
pub struct RangeInclusive<Idx> { /* private fields */ }
```



 `RangeInclusive`的语法是`start..=end` 

```rust
assert_eq!((3..=5), std::ops::RangeInclusive::new(3, 5));
assert_eq!(3 + 4 + 5, (3..=5).sum());
```

```rust
let arr = [0, 1, 2, 3, 4];
assert_eq!(arr[ ..  ], [0, 1, 2, 3, 4]);
assert_eq!(arr[ .. 3], [0, 1, 2      ]);
assert_eq!(arr[ ..=3], [0, 1, 2, 3   ]);
assert_eq!(arr[1..  ], [   1, 2, 3, 4]);
assert_eq!(arr[1.. 3], [   1, 2      ]);
assert_eq!(arr[1..=3], [   1, 2, 3   ]); // 这是 `RangeInclusive`
```



## Implementations

### impl\<Idx> RangeInclusive\<Idx>

#### new

创建一个新的包含范围。等同于编写 `start..=end`。

```rust
pub const fn new(start: Idx, end: Idx) -> RangeInclusive<Idx> 
```

**参数**：

- **start**：起始边界
- **end**：结尾边界

**返回值**：返回一个`RangeInclusive`实例

```rust
use std::ops::RangeInclusive;

assert_eq!(3..=5, RangeInclusive::new(3, 5));
```



#### start

获取范围的下限 (包括下限)。

```rust
pub const fn start(&self) -> &Idx
```

**返回值**：返回范围的下限

```rust
assert_eq!((3..=5).start(), &3);
```

当使用包含范围进行迭代时，在迭代结束后未指定 `start()` 和 `end()` 的值。 若要确定包含范围是否为空，请使用 `is_empty()` 方法而不是比较 `start() > end()`。

:::tip 

Note: 范围迭代到穷竭之后，此方法返回的值是不确定的。

:::



#### end

返回范围的上限 (包括上限)。

```rust
pub const fn end(&self) -> &Idx
```

**返回值**：返回范围的上线

```rust
assert_eq!((3..=5).end(), &5);
```

当使用包含范围进行迭代时，在迭代结束后未指定 `start()` 和 `end()` 的值。 若要确定包含范围是否为空，请使用 `is_empty()` 方法而不是比较 `start() > end()`。

:::tip

Note: 范围迭代到穷竭之后，此方法返回的值是不确定的。

:::





#### into_inner

将 RangeInclusive 分解为 (下限，上限 (含上限))。

```rust
pub fn into_inner(self) -> (Idx, Idx)
```

**返回值**：返回一个元祖，第一个元素为下限，第二个为上线

```rust
assert_eq!((3..=5).into_inner(), (3, 5));
```

:::tip

Note: 范围迭代到穷竭之后，此方法返回的值是不确定的。

:::



### impl\<Idx> RangeInclusive\<Idx>

```rust
impl<Idx> RangeInclusive<Idx>
where
  Idx: PartialOrd<Idx>,
```



#### contains

如果范围中包含 `item`，则返回 `true`。

```rust
pub fn contains<U>(&self, item: &U) -> bool
where
    Idx: PartialOrd<U>,
    U: PartialOrd<Idx> + ?Sized,
```

**参数**：

- **item**：需要判断是否包含的项

**返回值**：根据是否包含返回`bool`值

```rust
assert!(!(3..=5).contains(&2));
assert!( (3..=5).contains(&3));
assert!( (3..=5).contains(&4));
assert!( (3..=5).contains(&5));
assert!(!(3..=5).contains(&6));

assert!( (3..=3).contains(&3));
assert!(!(3..=2).contains(&3));

assert!( (0.0..=1.0).contains(&1.0));
assert!(!(0.0..=1.0).contains(&f32::NAN));
assert!(!(0.0..=f32::NAN).contains(&0.0));
assert!(!(f32::NAN..=1.0).contains(&1.0));
```

迭代完成后，此方法总是返回 `false`：

```rust
let mut r = 3..=5;
assert!(r.contains(&3) && r.contains(&5));
for _ in r.by_ref() {}
// 此处未指定精确的字段值
assert!(!r.contains(&3) && !r.contains(&5));
```



#### is_empty

如果范围不包含任何项，则返回 `true`。

```rust
pub fn is_empty(&self) -> bool
```

**返回值**：根据是否为空，返回`bool`值

```rust
assert!(!(3..=5).is_empty());
assert!(!(3..=3).is_empty());
assert!( (3..=2).is_empty());
```

如果任何一方都无法比拟，则范围为空：

```rust
assert!(!(3..=5).is_empty());
assert!(!(3..=3).is_empty());
assert!( (3..=2).is_empty());
```

迭代完成后，此方法返回 `true`：

```rust
let mut r = 3..=5;
for _ in r.by_ref() {}
// 此处未指定精确的字段值
assert!(r.is_empty());
```





## Trait Implementations