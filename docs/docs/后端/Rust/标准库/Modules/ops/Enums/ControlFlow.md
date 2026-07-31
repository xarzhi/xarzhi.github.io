# Enum std::ops::ControlFlow

用于告诉操作是应该提前退出还是像往常一样继续操作。

```rust
pub enum ControlFlow<B, C = ()> {
    Continue(C),
    Break(B),

```

在将您希望用户能够选择是否提前退出的事物 (例如图形遍历或访问者) 公开时使用。 有了枚举可以使它更清晰 - 不必再奇怪 “wait, what did `false` mean again?” 了 - 并允许包含一个值。

与 `Option` 和 `Result` 类似，此枚举可与 `?` 运算符一起使用，以便在 `Break` 变体存在时立即返回，或者以其他方式正常继续使用 `Continue` 变体中的值。

从 `Iterator::try_for_each`提前退出：

```rust
use std::ops::ControlFlow;

let r = (2..100).try_for_each(|x| {
    if 403 % x == 0 {
        return ControlFlow::Break(x)
    }

    ControlFlow::Continue(())
});
assert_eq!(r, ControlFlow::Break(13));
```

一个基本的树遍历：

```rust
use std::ops::ControlFlow;

pub struct TreeNode<T> {
    value: T,
    left: Option<Box<TreeNode<T>>>,
    right: Option<Box<TreeNode<T>>>,
}

impl<T> TreeNode<T> {
    pub fn traverse_inorder<B>(&self, f: &mut impl FnMut(&T) -> ControlFlow<B>) -> ControlFlow<B> {
        if let Some(left) = &self.left {
            left.traverse_inorder(f)?;
        }
        f(&self.value)?;
        if let Some(right) = &self.right {
            right.traverse_inorder(f)?;
        }
        ControlFlow::Continue(())
    }
    fn leaf(value: T) -> Option<Box<TreeNode<T>>> {
        Some(Box::new(Self { value, left: None, right: None }))
    }
}

let node = TreeNode {
    value: 0,
    left: TreeNode::leaf(1),
    right: Some(Box::new(TreeNode {
        value: -1,
        left: TreeNode::leaf(5),
        right: TreeNode::leaf(2),
    }))
};
let mut sum = 0;

let res = node.traverse_inorder(&mut |val| {
    if *val < 0 {
        ControlFlow::Break(*val)
    } else {
        sum += *val;
        ControlFlow::Continue(())
    }
});
assert_eq!(res, ControlFlow::Break(-1));
assert_eq!(sum, 6);
```



## 变体

### Continue(C)

照常进行下一阶段的操作。



### Break(B)

退出操作而不运行后续阶段。





## Implementations

### ControlFlow<B, C>

```rust
impl<B, C> ControlFlow<B, C>
```



#### is_break

判断是不是`Break`变体，返回`bool`值

```rust
pub fn is_break(&self) -> bool
```

**返回值**：返回`bool`值

```rust
use std::ops::ControlFlow;

assert!(ControlFlow::<i32, String>::Break(3).is_break());
assert!(!ControlFlow::<String, i32>::Continue(3).is_break());
```



#### is_continue

判断是不是`Break`变体，返回`bool`值

```rust
pub fn is_continue(&self) -> bool
```

**返回值**：返回`bool`值

```rust
use std::ops::ControlFlow;

assert!(!ControlFlow::<i32, String>::Break(3).is_continue());
assert!(ControlFlow::<String, i32>::Continue(3).is_continue());
```



#### break_value

`nightly-only`

如果 `ControlFlow` 为 `Break`，则将 `ControlFlow` 转换为 `Some`，否则为 `None`。

```rust
pub fn break_value(self) -> Option<B>
```

**返回值**：返回一个`Option`

```rust
#![feature(control_flow_enum)]
use std::ops::ControlFlow;

assert_eq!(ControlFlow::<i32, String>::Break(3).break_value(), Some(3));
assert_eq!(ControlFlow::<String, i32>::Continue(3).break_value(), None);
```



#### map_break

`nightly-only`

Maps `ControlFlow<B, C>` 到 `ControlFlow<T, C>` 通过在中断值 (如果存在) 上应用函数来实现。

```rust
pub fn map_break<T, F>(self, f: F) -> ControlFlow<T, C>
where
    F: FnOnce(B) -> T,
```







#### continue_value

`nightly-only`

将 `ControlFlow` 转换为 `Option`，如果 `ControlFlow` 为 `Continue`，则为 `Some`，否则为 `None`。

```rust
pub fn continue_value(self) -> Option<C>
```

**返回值**：返回一个`Option`

```rust
#![feature(control_flow_enum)]
use std::ops::ControlFlow;

assert_eq!(ControlFlow::<i32, String>::Break(3).continue_value(), None);
assert_eq!(ControlFlow::<String, i32>::Continue(3).continue_value(), Some(3));
```





#### map_continue

`nightly-only`

Maps `ControlFlow<B, C>` 到 `ControlFlow<B, T>` 通过将函数应用于 continue 值，以防它存在。

```rust
pub fn map_continue<T, F>(self, f: F) -> ControlFlow<B, T>
where
    F: FnOnce(C) -> T,
```





### ControlFlow<R, \<R as Try>::Output>

```rust
impl<R> ControlFlow<R, <R as Try>::Output>
where
  R: Try,
```

这些仅用作实现迭代器适配器的一部分。 它们具有普通的名称和不明显的语义，因此目前还没有走上潜在的稳定之路。





## Trait Implementations

### Clone

```rust
impl<B, C> Clone for ControlFlow<B, C>
where
  B: Clone,
  C: Clone,
```



#### clone

返回值的副本。 

```rust
fn clone(&self) -> ControlFlow<B, C>
```



#### clone_from

从 `source`执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### Debug

```rust
impl<B, C> Debug for ControlFlow<B, C>
where
  B: Debug,
  C: Debug,
```



#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



### FromResidual<<ControlFlow<B, C> as Try>::Residual>

```rust
impl<B, C> FromResidual<<ControlFlow<B, C> as Try>::Residual> for ControlFlow<B, C>
```



#### from_residual

从兼容的 Residual 类型构造类型。 

`nightly-only`

```rust
fn from_residual(residual: ControlFlow<B, Infallible>) -> ControlFlow<B, C>
```



### Hash

```rust
impl<B, C> Hash for ControlFlow<B, C>
where
  B: Hash,
  C: Hash,
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



```rust
impl<B, C> PartialEq<ControlFlow<B, C>> for ControlFlow<B, C>
where
  B: PartialEq<B>,
  C: PartialEq<C>,
```



#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &ControlFlow<B, C>) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### Residual\<C>

```rusty
impl<B, C> Residual<C> for ControlFlow<B, Infallible>
```



#### TryType

`nightly-only`

此元函数的 “return” 类型。

```rust
type TryType = ControlFlow<B, C>
```



### Try

```rust
impl<B, C> Try for ControlFlow<B, C>
```



#### Output

`nightly-only`

当不短路时，? 产生的值的类型。

```rust
type Output = C
```



#### Residual

`nightly-only`

短路时作为 ? 的一部分传递给 FromResidual::from_residual 的值的类型。 

```rust
type Residual = ControlFlow<B, Infallible>
```





#### from_output

`nightly-only`

从它的 Output 类型构造类型。 

```rust
fn from_output(output: <ControlFlow<B, C> as Try>::Output) -> ControlFlow<B, C>
```



#### branch

在 ? 来决定操作符是应该生成一个值 (因为它返回了 ControlFlow::Continue)，还是将一个值传播回调用者 (因为它返回了 ControlFlow::Break)。 

```rust
fn branch(
  self
) -> ControlFlow<<ControlFlow<B, C> as Try>::Residual, <ControlFlow<B, C> as Try>::Output>
```

`nightly-only`



### Copy

```rust
impl<B, C> Copy for ControlFlow<B, C>
where
  B: Copy,
  C: Copy,
```



### Eq

```rust
impl<B, C> Eq for ControlFlow<B, C>
where
  B: Eq,
  C: Eq,
```



### StructuralEq

```rust
impl<B, C> StructuralEq for ControlFlow<B, C>
```



### StructuralPartialEq

```rust
impl<B, C> StructuralPartialEq for ControlFlow<B, C>
```





## Auto Trait Implementations

### RefUnwindSafe

```rust
impl<B, C> RefUnwindSafe for ControlFlow<B, C>
where
  B: RefUnwindSafe,
  C: RefUnwindSafe,
```



### Send

```rust
impl<B, C> Send for ControlFlow<B, C>
where
  B: Send,
  C: Send,
```



### Sync

```rust
impl<B, C> Sync for ControlFlow<B, C>
where
  B: Sync,
  C: Sync,
```



### Unpin

```rust
impl<B, C> Unpin for ControlFlow<B, C>
where
  B: Unpin,
  C: Unpin,
```



### UnwindSafe

```rust
impl<B, C> UnwindSafe for ControlFlow<B, C>
where
  B: UnwindSafe,
  C: UnwindSafe,
```

## Blanket Implementations

### Any

```rust
impl<T> Any for T
where
  T: 'static + ?Sized,
```



#### type_id

获取 self 的 TypeId。

```rust
fn type_id(&self) -> TypeId
```



### Borrow\<T>

```rust
impl<T> Borrow<T> for T
where
  T: ?Sized,
```



#### borrow

从拥有的值中一成不变地借用。 

```rust
fn borrow(&self) -> &T
```



### BorrowMut\<T>

```rust
impl<T> BorrowMut<T> for T
where
  T: ?Sized,
```



#### borrow_mut

从拥有的值中借用。 

```rust
fn borrow_mut(&mut self) -> &mut T
```



### From\<T>

```rust
impl<T> From<T> for T
```

#### from

返回未更改的参数。

```rust
fn from(t: T) -> T
```



### Into\<U>

```rust
impl<T, U> Into<U> for T
where
  U: From<T>,
```



#### into

调用 U::from(self)。

也就是说，这种转换是 From<T> for U 实现选择执行的任何操作。

```rust
fn into(self) -> U
```



### ToOwned

```rust
impl<T> ToOwned for T
where
  T: Clone,
```



#### Owned

获得所有权后的结果类型。

```rust
type Owned = T
```



#### to_owned

从借用的数据创建拥有的数据，通常是通过克隆。 

```rust
fn to_owned(&self) -> T
```



#### clone_into

使用借来的数据来替换拥有的数据，通常是通过克隆。 

```rust
fn clone_into(&self, target: &mut T)
```



### TryFrom\<U>

```rust
impl<T, U> TryFrom<U> for T
where
  U: Into<T>,
```



#### Error

发生转换错误时返回的类型。

```rust
type Error = Infallible
```



#### try_from

执行转换。

```rust
fn try_from(value: U) -> Result<T, <T as TryFrom<U>>::Error>
```



### TryInto\<U>

```rust
impl<T, U> TryInto<U> for T
where
  U: TryFrom<T>,
```



#### Error

发生转换错误时返回的类型。

```rust
type Error = <U as TryFrom<T>>::Error
```



#### try_into

执行转换。

```rust
fn try_into(self) -> Result<U, <U as TryFrom<T>>::Error>