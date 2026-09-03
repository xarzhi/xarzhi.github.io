# Struct std::sync::Arc

线程安全的引用计数指针。Arc 代表原子引用计数。

```rust
pub struct Arc<T>
where
    T: ?Sized,
{ /* private fields */ }
```

`Arc<T>` 类型提供了在堆中分配的 T 类型值的共享所有权。在 Arc 上调用 clone 会生成一个新的 Arc 实例，该实例指向堆上与源 Arc 相同的分配，同时增加了引用计数。 当指向给定分配的最后一个 Arc 指针被销毁时，存储在该分配中的值 (通常称为 “内部值”) 也将被丢弃。

默认情况下，Rust 中的共享引用不允许可变的，Arc 也不例外：您通常无法获得 Arc 内部内容的可变引用。如果需要通过 Arc 进行可变的，请使用 Mutex，RwLock 或 Atomic 类型之一。

Note: 此类型仅在支持原子加载和指针存储的平台上可用，其中包括支持 std crate 的所有平台，但并非所有仅支持 alloc 的平台。 这可以在编译时使用 `#[cfg(target_has_atomic = "ptr")]` 检测到。



## 线程安全

与 `Rc<T>` 不同，`Arc<T>` 使用原子操作进行引用计数。这意味着它是线程安全的。缺点是原子操作比普通的内存访问更昂贵。如果您不共享线程之间的引用计数分配，请考虑使用 `Rc<T>` 来降低开销。 `Rc<T>` 是一个安全的默认值，因为编译器会捕获在线程之间发送 `Rc<T>` 的任何尝试。 但是，一个库可能会选择 `Arc<T>`，以便为库的消费者提供更大的灵活性。

只要 T 实现 `Send` 和 `Sync`，`Arc<T>` 就会实现 `Send` 和 `Sync`。 为什么不能在 `Arc<T>` 中放置非线程安全类型 T 使其成为线程安全的？ 起初这可能有点违反直觉：毕竟，`Arc<T>` 的重点不就是线程安全吗？ 关键在于: `Arc<T>` 使具有同一数据的多个所有权成为线程安全的，但并未为其数据增加线程安全。

考虑 `Arc<RefCell<T>>`。 `RefCell<T>` 不是 `Sync`，如果 `Arc<T>` 总是 `Send`，那么 `Arc<RefCell<T>>` 也是。 但是然后我们会遇到一个问题： `RefCell<T>` 不是线程安全的； 它使用非原子操作来跟踪借用计数。

最后，这意味着您可能需要将 `Arc<T>` 与某种 `std::sync` 类型 (通常为 `Mutex<T>`) 配对。



## Weak 的中断循环

`downgrade` 方法可用于创建非所有者 Weak 指针。Weak 指针可以 `upgrade` 为 Arc，但如果存储在分配中的值已经被丢弃，这将返回 None。 换句话说，Weak 指针不会使分配内部的值保持活动状态。然而，它们确实使分配（值的后备存储）保持活动状态。

Arc 指针之间的循环将永远不会被释放。 因此，Weak 用于中断循环。例如，一棵树可能具有从父节点到子节点的强 Arc 指针，以及从子节点返回到其父节点的 Weak 指针。



## 克隆引用

使用为 `Arc<T>` 和 `Weak<T>` 实现的 `Clone` trait 从现有的引用计数指针创建新的引用。

```rust
use std::sync::Arc;
let foo = Arc::new(vec![1.0, 2.0, 3.0]);
// 以下两种语法是等效的。
let a = foo.clone();
let b = Arc::clone(&foo);
// a、b 和 foo 都是指向同一内存位置的 Arc
```



## Deref行为

**`Arc<T>` 自动取消对 T 的引用 (通过 Deref trait)，因此您可以在类型为 `Arc<T>` 的值上调用 T 的方法。**

为了避免与 T 的方法名称冲突，`Arc<T>` 本身的方法是关联函数，使用 **完全限定语法** 调用：

```rust
use std::sync::Arc;

let my_arc = Arc::new(());
let my_weak = Arc::downgrade(&my_arc);
```

`Arc<T>` 也可以使用完全限定语法来调用诸如 `Clone` 之类的 traits 实现。 有些人喜欢使用完全限定的语法，而另一些人则喜欢使用方法调用语法。

```rust
use std::sync::Arc;

let arc = Arc::new(());

// 方法调用语法
let arc2 = arc.clone();
// 完全限定的语法
let arc3 = Arc::clone(&arc);
```

`Weak`不会自动解引用到 `T`，因为内部值可能已经被丢弃



## 示例

在线程之间共享一些不可变数据：

```rust
use std::sync::Arc;
use std::thread;

let five = Arc::new(5);

for _ in 0..10 {
    let five = Arc::clone(&five);

    thread::spawn(move || {
        println!("{five:?}");
    });
}
```

共享可变的`AtomicUsize`：

```rust
use std::sync::Arc;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::thread;

let val = Arc::new(AtomicUsize::new(5));

for _ in 0..10 {
    let val = Arc::clone(&val);

    thread::spawn(move || {
        let v = val.fetch_add(1, Ordering::SeqCst);
        println!("{v:?}");
    });
}
```





## Implementations

### impl\<T> Arc\<T>

#### new

创建一个新的 `Arc<T>`

```rust
pub fn new(data: T) -> Arc<T>
```

**参数**

- **data**：需要创建的数据

**返回值**：返回一个包含数据的`Arc`

```rust
use std::sync::Arc;

fn main() {
    let five = Arc::new(5);
    println!("{:#?}", five);
}
```

创建一个结构体Arc

```rust
use std::sync::Arc;

#[derive(Debug)]
struct People {
    name: String,
}
fn main() {
    let p = Arc::new(People {
        name: "xarzhi".to_string(),
    });

    println!("{:#?}", p);
}
```



#### new_cyclic

创建一个新的 `Arc<T>`，同时给您一个分配的 `Weak<T>`，以允许您创建一个 `T`，它持有一个指向自身的弱指针。

通常，直接或间接循环引用自身的结构体不应该对自身持有强引用以防止内存泄漏。 使用这个函数，您可以在 `T` 的初始化过程中，在 `Arc<T>` 创建之前访问弱指针，这样您就可以将它克隆并存储在 `T` 中。

`new_cyclic` 先给 `Arc<T>` 分配托管分配，然后调用您的闭包，给这个分配一个 `Weak<T>`，然后再把您的闭包返回的 `T` 放入分配中，完成 `Arc<T>` 的构建。

由于新的 `Arc<T>` 在 `Arc<T>::new_cyclic` 返回之前尚未完全构造，因此在闭包内的弱引用上调用 [`upgrade`](https://www.rustwiki.org.cn/zh-CN/std/sync/struct.Weak.html#method.upgrade) 将失败并导致 `None` 值。

```rust
pub fn new_cyclic<F>(data_fn: F) -> Arc<T>
where
    F: FnOnce(&Weak<T>) -> T,
```

**参数**

- **data_fn**：创建数据的闭包函数
  - 参数是一个`&Weak<T>`

**返回值**：返回一个包含数据的`Arc`

```rust
use std::sync::{Arc, Weak};

struct Gadget {
    me: Weak<Gadget>,
}

impl Gadget {
    /// 创建一个引用计数的 Gadget。
    fn new() -> Arc<Self> {
        // `me` 是指向我们正在构建的 `Arc` 的新分配的 `Weak<Gadget>`。
        Arc::new_cyclic(|me| {
            // 在此处创建实际的结构体。
            Gadget { me: me.clone() }
        })
    }

    /// 返回一个指向 Self 的引用计数指针。
    fn me(&self) -> Arc<Self> {
        self.me.upgrade().unwrap()
    }
}
```

:::tip Panics

如果 `data_fn` 发生 panic，panic 会传播给调用者，而临时的 `Weak` 会被正常丢弃。

:::



#### new_uninit

`nightly-only`

创建一个具有未初始化内容的新 `Arc`。

```rust
pub fn new_uninit() -> Arc<MaybeUninit<T>>
```

**返回值**：返回一个包含`MaybeUninit`的`Arc`

```rust
#![feature(new_uninit)]
#![feature(get_mut_unchecked)]

use std::sync::Arc;

let mut five = Arc::<u32>::new_uninit();

// 延迟初始化：
Arc::get_mut(&mut five).unwrap().write(5);

let five = unsafe { five.assume_init() };

assert_eq!(*five, 5)
```



#### new_zeroed

`nightly-only`

创建一个具有未初始化内容的新 Arc，并用 0 字节填充内存。

有关正确和不正确使用此方法的示例，请参见 `MaybeUninit::zeroed`。

```rust
pub fn new_zeroed() -> Arc<MaybeUninit<T>>
```

**返回值**：返回一个包含`MaybeUninit`的`Arc`

```rust
#![feature(new_uninit)]

use std::sync::Arc;

let zero = Arc::<u32>::new_zeroed();
let zero = unsafe { zero.assume_init() };

assert_eq!(*zero, 0)
```



#### pin

创建一个新的 `Pin<Arc<T>>`。 如果 `T` 未实现 `Unpin`，则 `data` 将被固定在内存中并且无法移动。

```rust
pub fn pin(data: T) -> Pin<Arc<T>>
```

**返回值**：返回一个内存固定的 `Pin<Arc<T>>`



#### try_pin

`nightly-only`

创建一个新的 `Pin<Arc<T>>`，如果分配失败则返回错误。

```rust
pub fn try_pin(data: T) -> Result<Pin<Arc<T>>, AllocError>
```



#### try_new

`nightly-only`

创建一个新的 `Arc<T>`，如果分配失败，则返回错误。

```rust
pub fn try_new(data: T) -> Result<Arc<T>, AllocError>
```

示例

```rust
#![feature(allocator_api)]
use std::sync::Arc;

let five = Arc::try_new(5)?;
```



#### try_new_uninit

`nightly-only`

构造具有未初始化内容的新 `Arc`，如果分配失败，则返回错误。

```rust
pub fn try_new_uninit() -> Result<Arc<MaybeUninit<T>>, AllocError>
```

示例

```rust
#![feature(new_uninit, allocator_api)]
#![feature(get_mut_unchecked)]

use std::sync::Arc;

let mut five = Arc::<u32>::try_new_uninit()?;

// 延迟初始化：
Arc::get_mut(&mut five).unwrap().write(5);

let five = unsafe { five.assume_init() };

assert_eq!(*five, 5);
```



#### try_new_zeroed

`nightly-only`

创建一个具有未初始化内容的新 Arc，并用 0 字节填充内存，如果分配失败，则返回错误。

有关正确和不正确使用此方法的示例，请参见 `MaybeUninit::zeroed`。

```rust
pub fn try_new_zeroed() -> Result<Arc<MaybeUninit<T>>, AllocError>
```

示例

```rust
#![feature(new_uninit, allocator_api)]

use std::sync::Arc;

let zero = Arc::<u32>::try_new_zeroed()?;
let zero = unsafe { zero.assume_init() };

assert_eq!(*zero, 0);
```



#### try_unwrap

如果 Arc 正好有一个强引用，则返回内部值。

否则，返回的 Err 将与传入的 Arc 相同。

即使存在突出的弱引用，此操作也将成功。

如果您不想将 Arc 保留在 Err 外壳中，强烈建议改用 `Arc::into_inner`。 立即抛弃 Err 有效，载荷，就像在表达式 `Arc::try_unwrap(this).ok()` 中一样，仍然可以导致强制使用计数抛弃为零，Arc 的内部值为抛弃: 例如，如果两个线程都在并行中执行这个表达式，那么就有一个竞争条件。 线程可以首先检查它们是否通过 `Arc::try_unwrap` 拥有它们的 Arc 的最后一个克隆，然后在调用中将它们的 Arc 丢弃到 ok，将强引用计数从 2 降为零。

```rust
pub fn try_unwrap(this: Arc<T>) -> Result<T, Arc<T>>
```

**参数**：

- **this**：一个`Arc`

**返回值**：返回`Arc`内部值，包含在`Result`中。若遇错误则返回Err

```rust
use std::sync::Arc;

let x = Arc::new(3);
assert_eq!(Arc::try_unwrap(x), Ok(3));

let x = Arc::new(4);
let _y = Arc::clone(&x);
assert_eq!(*Arc::try_unwrap(x).unwrap_err(), 4);
```





#### into_inner

如果 Arc 正好有一个强引用，则返回内部值。

否则，返回 None，Arc 为丢弃。

即使存在突出的弱引用，此操作也将成功。

如果在这个 Arc 的每个克隆上调用 `Arc::into_inner`，则可以保证恰好有一个调用返回内部值。 这特别意味着内部值不是丢弃。

类似的表达式 `Arc::try_unwrap(this).ok()` 不提供这样的保证。

```rust
pub fn into_inner(this: Arc<T>) -> Option<T>
```

**参数**：

- **this**：一个`Arc`

**返回值**：返回`Arc`内部值，包含在`Option`中。否则返回`None`

演示 `Arc::into_inner` 提供的保证的最小示例。

```rust
use std::sync::Arc;

let x = Arc::new(3);
let y = Arc::clone(&x);

// 两个线程在 `Arc` 的两个克隆上调用 `Arc::into_inner`:
let x_thread = std::thread::spawn(|| Arc::into_inner(x));
let y_thread = std::thread::spawn(|| Arc::into_inner(y));

let x_inner_value = x_thread.join().unwrap();
let y_inner_value = y_thread.join().unwrap();

// 其中一个线程保证接收到内部值:
assert!(matches!(
    (x_inner_value, y_inner_value),
    (None, Some(3)) | (Some(3), None)
));
// 如果线程改为调用 `Arc::try_unwrap(x).ok()` 和 `Arc::try_unwrap(y).ok()`，结果也可能是 `(None, None)`。
```

一个更实际的例子证明需要 `Arc::into_inner`:

```rust
use std::sync::Arc;

// 使用 `Arc` 定义一个简单的单向链表:
#[derive(Clone)]
struct LinkedList<T>(Option<Arc<Node<T>>>);
struct Node<T>(T, Option<Arc<Node<T>>>);

// 丢掉依赖于 `Arc` 的析构函数的 long `LinkedList<T>` 会导致栈溢出。
// 为了防止这种情况，我们可以提供一个手动的 `Drop` 实现，它在循环中进行销毁:
impl<T> Drop for LinkedList<T> {
    fn drop(&mut self) {
        let mut link = self.0.take();
        while let Some(arc_node) = link.take() {
            if let Some(Node(_value, next)) = Arc::into_inner(arc_node) {
                link = next;
            }
        }
    }
}

// 省略 `new` 和 `push` 的实现
impl<T> LinkedList<T> {
    /* ... */
}

// 如果 `Drop` impl 使用的是 `Arc::try_unwrap(arc).ok()` 而不是 `Arc::into_inner(arc)`，则尽管手动 `Drop` impl，以下代码仍可能导致栈溢出。

// 创建一个长列表并克隆它
let mut x = LinkedList::new();
for i in 0..100000 {
    x.push(i); // 将 i 添加到 x 的前面
}
let y = x.clone();

// 丢弃并行中的克隆人
let x_thread = std::thread::spawn(|| drop(x));
let y_thread = std::thread::spawn(|| drop(y));
x_thread.join().unwrap();
y_thread.join().unwrap();
```



### impl\<T> Arc<[T]>

#### new_uninit_clice

`nightly-only`



#### new_zeroed_slice

`nightly-only`

### impl\<T> Arc<MaybeUninit\<T>>



#### assume_init

`nightly-only`

### impl\<T> Arc<[MaybeUninit\<T>]>

#### assume_init

`nightly-only`



### impl\<T: ?Sized> Arc\<T>

#### into_raw



#### as_ptr



#### from_raw



#### downgrade



#### weak_count



#### strong_count



#### increment_strong_count



#### decrement_strong_count



#### ptr_eq



### impl<T: Clone> Arc\<T>

#### make_mut



#### unwrap_or_clone

`nightly-only`

### impl<T: ?Sized> Arc\<T>

#### get_mut



#### get_mut_unchecked

`nightly-only`



### impl Arc<dyn Any + Send + Sync + 'static>

#### downcase



#### downcast_unchecked

`nightly-only`

## Trait Implementations







