# Struct std::sync::Arc

线程安全的引用计数指针。Arc 代表原子引用计数。它是 Rust 标准库里用于 **多线程环境下的共享所有权** 的智能指针。

让同一份数据可以被多个地方“共同拥有”，并且在所有所有者都不再使用时自动释放内存，同时保证线程安全。

```rust
pub struct Arc<T>
where
    T: ?Sized,
{ /* private fields */ }
```

`Arc<T>` 类型提供了在堆中分配的 T 类型值的共享所有权。在 Arc 上调用 clone 会生成一个新的 Arc 实例，该实例指向堆上与源 Arc 相同的分配，同时增加了引用计数。 当指向给定分配的最后一个 Arc 指针被销毁时，存储在该分配中的值 (通常称为 “内部值”) 也将被丢弃。

默认情况下，Rust 中的共享引用不允许可变的，Arc 也不例外：您通常无法获得 Arc 内部内容的可变引用。如果需要通过 Arc 进行可变的，请使用 Mutex，RwLock 或 Atomic 类型之一。

Note: 此类型仅在支持原子加载和指针存储的平台上可用，其中包括支持 std crate 的所有平台，但并非所有仅支持 alloc 的平台。 这可以在编译时使用 `#[cfg(target_has_atomic = "ptr")]` 检测到。



## 解决什么问题？

在 Rust 里，最常见的是 **单一所有权**：

```rust
let a = String::from("hello");
let b = a; // 所有权转移，a 不能再用了
```

但有些场景，这种模型不够用：

- 多个线程需要访问同一份数据
- 数据结构图、缓存、配置、线程池
- 你不想复制数据，只想“共享”

👉 这时候就需要 **多个所有者**。

## Arc 的核心能力

### 引用计数（共享所有权）

```rust
use std::sync::Arc;

let a = Arc::new(5);
let b = a.clone(); // 引用计数 +1
let c = a.clone(); // 引用计数 +1
```

- 每次 `clone()`：
  - 不会复制数据
  - 只增加引用计数
- 当某个 `Arc` 离开作用域：
  - 引用计数 -1
- 当计数变成 0：
  - 数据被自动释放

### 线程安全（和 `Rc` 的区别）

| **类型** | **是否线程安全** | **使用场景** |
| :------- | :--------------- | :----------- |
| `Rc<T>`  | ❌ 否             | 单线程       |
| `Arc<T>` | ✅ 是             | 多线程       |

Arc 的引用计数是 原子操作（atomic），所以：

可以在多个线程间安全传递

编译器允许你把 Arc 发送到另一个线程

```rust
use std::sync::Arc;
use std::thread;

let data = Arc::new(42);

for _ in 0..3 {
    let d = data.clone();
    thread::spawn(move || {
        println!("{}", d);
    });
}
```



### Arc 默认是只读的

```rust
let a = Arc::new(String::from("hi"));
*a = "hello".to_string(); // ❌ 不允许
```

原因：

- `Arc<T>` 只提供 `&T`
- Rust 的共享规则：**共享不可变，可变不共享**

所以：

> **`Arc` 负责“共享”，不负责“修改”**



### 想修改怎么办

#### 单线程

```rust
Arc<RefCell<T>>
```

#### 多线程（最常见）

```rust
Arc<Mutex<T>>
Arc<RwLock<T>>
```

```rust
use std::sync::{Arc, Mutex};

let data = Arc::new(Mutex::new(0));

let d = data.clone();
*d.lock().unwrap() += 1;
```



## 什么时候该用 `Arc`？

 适合使用 `Arc` 的场景：

- 多线程共享配置 / 状态
- 线程池、任务队列
- 大对象不想频繁拷贝
- 多个组件需要“看到同一份数据”

❌ 不适合：

- 单线程（用 `Rc`）
- 数据只有一个所有者（直接 ownership）
- 追求极致性能（引用计数有开销）







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

创建一个具有未初始化内容的新原子引用计数切片。

```rust
pub fn new_uninit_slice(len: usize) -> Arc<[MaybeUninit<T>]>
```

示例

```rust
#![feature(new_uninit)]
#![feature(get_mut_unchecked)]

use std::sync::Arc;

let mut values = Arc::<[u32]>::new_uninit_slice(3);

// 延迟初始化：
let data = Arc::get_mut(&mut values).unwrap();
data[0].write(1);
data[1].write(2);
data[2].write(3);

let values = unsafe { values.assume_init() };

assert_eq!(*values, [1, 2, 3])
```



#### new_zeroed_slice

`nightly-only`

创建一个具有未初始化内容的新原子引用计数切片，内存中填充 0 字节。

有关正确和不正确使用此方法的示例，请参见 `MaybeUninit::zeroed`。

```rust
pub fn new_zeroed_slice(len: usize) -> Arc<[MaybeUninit<T>]>
```

示例

```rust
#![feature(new_uninit)]

use std::sync::Arc;

let values = Arc::<[u32]>::new_zeroed_slice(3);
let values = unsafe { values.assume_init() };

assert_eq!(*values, [0, 0, 0])
```



### impl\<T> Arc\<MaybeUninit\<T>>

#### assume_init

`nightly-only`

转换为 `Arc<T>`。

```rust
pub unsafe fn assume_init(self) -> Arc<T>
```

示例

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

##### 

:::tip Safety

与 [`MaybeUninit::assume_init`](https://www.rustwiki.org.cn/zh-CN/std/mem/union.MaybeUninit.html#method.assume_init) 一样，由调用者负责确保内部值确实处于初始化状态。

在内容尚未完全初始化时调用此方法会立即导致未定义的行为。

:::



### impl\<T> Arc<[MaybeUninit\<T>]>

#### assume_init

`nightly-only`

转换为 `Arc<[T]>`。

```rust
pub unsafe fn assume_init(self) -> Arc<[T]>
```

示例

```rust
#![feature(new_uninit)]
#![feature(get_mut_unchecked)]

use std::sync::Arc;

let mut values = Arc::<[u32]>::new_uninit_slice(3);

// 延迟初始化：
let data = Arc::get_mut(&mut values).unwrap();
data[0].write(1);
data[1].write(2);
data[2].write(3);

let values = unsafe { values.assume_init() };

assert_eq!(*values, [1, 2, 3])
```



:::tip Safety

与 [`MaybeUninit::assume_init`](https://www.rustwiki.org.cn/zh-CN/std/mem/union.MaybeUninit.html#method.assume_init) 一样，由调用者负责确保内部值确实处于初始化状态。

在内容尚未完全初始化时调用此方法会立即导致未定义的行为。

:::



### impl\<T: ?Sized> Arc\<T>

#### into_raw

消耗 `Arc`，返回包装的指针。

为避免内存泄漏，必须使用 `Arc::from_raw` 将指针转换回 Arc。

```rust
pub fn into_raw(this: Arc<T>) -> *const T
```

**参数**：

- **this**：一个使用`Arc`包装的数据

**返回值**：返回指向内部数据的指针

```rust
fn main() {
    use std::sync::Arc;

    let x = Arc::new("hello".to_owned());
    let x_ptr = Arc::into_raw(x);

    println!("{:#?}", unsafe { &*x_ptr }); // "hello"  一个地址
}
```



#### as_ptr

为数据提供裸指针。

计数不会受到任何影响，并且不会消耗 `Arc`。 只要 `Arc` 中有大量计数，指针就有效。

```rust
pub fn as_ptr(this: &Arc<T>) -> *const T
```

**参数**：

- **this**：一个使用`Arc`包装的数据的引用

**返回值**：返回指向内部数据的指针

```rust
use std::sync::Arc;

fn main() {
    let x = Arc::new("hello".to_owned());
    let y = Arc::clone(&x);

    assert_eq!(Arc::as_ptr(&x), Arc::as_ptr(&y));

    let x_ptr = Arc::as_ptr(&x);
    assert_eq!(unsafe { &*x_ptr }, "hello");
}
```



#### from_raw

从裸指针构造 `Arc<T>`。

裸指针必须事先由调用返回到 `Arc<U>::into_raw`，其中 U 的大小和对齐方式必须与 T 相同。 如果 U 是 T，这是很简单的。 请注意，如果 U 不是 T，但是具有相同的大小和对齐方式，则基本上就像对不同类型的引用进行转换一样。 有关在这种情况下适用的限制的更多信息，请参见 `mem::transmute`。

`from_raw` 的用户必须确保 T 的特定值仅被丢弃一次。

此函数不安全，因为使用不当可能会导致内存不安全，即使从未访问返回的 `Arc<T>` 也是如此。

```rust
pub unsafe fn from_raw(ptr: *const T) -> Arc<T>
```

**参数**：

- **ptr**：一个裸指针

**返回值**：返回一个`Arc<T>`，其中内部数据是由裸指针指向的数据创建

```rust
use std::sync::Arc;

let x = Arc::new("hello".to_owned());
let x_ptr = Arc::into_raw(x);

unsafe {
    // 转换回 `Arc` 以防止泄漏。
    let x = Arc::from_raw(x_ptr);
    assert_eq!(&*x, "hello");

    // 进一步调用 `Arc::from_raw(x_ptr)` 将导致内存不安全。
}

// 当 `x` 超出上面的作用域时，其内存将被释放，所以 `x_ptr` 现在悬垂了！
```





#### downgrade

创建一个指向该分配的新 `Weak` 指针。

```rust
pub fn downgrade(this: &Arc<T>) -> Weak<T>
```

**参数**：

- **this**：一个使用`Arc`包装的数据的引用

**返回值**：返回一个`Weak<T>`

```rust
use std::sync::Arc;

let five = Arc::new(5);

let weak_five = Arc::downgrade(&five);
```





#### weak_count

获取指向该分配的`Weak`指针的数量。

```rust
pub fn weak_count(this: &Arc<T>) -> usize
```

**参数**：

- **this**：一个使用`Arc`包装的数据的引用

**返回值**：被分配为Weak指针的数量

```rust
fn main() {
    use std::sync::Arc;

    let five = Arc::new(5);
    let _weak_five = Arc::downgrade(&five);
    let _weak_five1 = Arc::downgrade(&five);
    let _weak_five2 = Arc::downgrade(&five);

    // 此断言是确定性的，因为我们尚未在线程之间共享 `Arc` 或 `Weak`。
	println!("{:#?}", Arc::weak_count(&five));  // 3
}
```

:::tip safety

此方法本身是安全的，但正确使用它需要格外小心。 另一个线程可以随时更改弱引用计数，包括潜在地在调用此方法与对结果进行操作之间。

:::



#### strong_count

获取指向此分配的强 (`Arc`) 指针的数量。

```rust
pub fn strong_count(this: &Arc<T>) -> usize
```

**参数**：

- **this**：一个使用`Arc`包装的数据的引用

**返回值**：返回指向此分配的强 (`Arc`) 指针的数量。

```rust
fn main() {
    use std::sync::Arc;

    let five = Arc::new(5);
    let _also_five = Arc::clone(&five);
    let _also_five1 = Arc::clone(&five);
    let _also_five2 = Arc::clone(&five);

    // 此断言是确定性的，因为我们尚未在线程之间共享 `Arc`。
    assert_eq!(4, Arc::strong_count(&five));
}
```





#### increment_strong_count

与提供的指针关联的 `Arc<T>` 上的强引用计数加 1。

```rust
pub unsafe fn increment_strong_count(ptr: *const T)
```

**参数**：

- **this**：一个指向`Arc<T>`的指针

```rust
fn main() {
    use std::sync::Arc;

    let five = Arc::new(5);

    unsafe {
        let ptr = Arc::into_raw(five);

        let five = Arc::from_raw(ptr);
        println!("{:#?}", Arc::strong_count(&five)); // 1

        Arc::increment_strong_count(ptr);

        // 此断言是确定性的，因为我们尚未在线程之间共享 `Arc`。
        let five = Arc::from_raw(ptr);
        println!("{:#?}", Arc::strong_count(&five));  // 2
    }
}
```

:::tip safety

指针必须已经通过 `Arc::into_raw` 获得，并且关联的 `Arc` 实例必须有效 (即 在此方法的持续时间内，强引用计数必须至少为 1)。

:::



#### decrement_strong_count

将与提供的指针关联的 `Arc<T>` 上的强引用计数减 1。

```rust
pub unsafe fn decrement_strong_count(ptr: *const T)
```

**参数**：

- **this**：一个指向`Arc<T>`的指针

```rust
fn main() {
    use std::sync::Arc;

    let five = Arc::new(5);

    unsafe {
        let ptr = Arc::into_raw(five);
        Arc::increment_strong_count(ptr);

        // 这些断言是确定性的，因为我们尚未在线程之间共享 `Arc`。
        let five = Arc::from_raw(ptr);
        println!("{:#?}", Arc::strong_count(&five));		// 2


        Arc::decrement_strong_count(ptr);
        println!("{:#?}", Arc::strong_count(&five));		// 1
    }
}
```

:::tip safety

指针必须已经通过 `Arc::into_raw` 获得，并且关联的 `Arc` 实例必须有效 (即 调用此方法时，强引用计数必须至少为 1)。 此方法可用于释放最终的 `Arc` 和后备存储，但不应在最终的 `Arc` 释放后调用。

:::



#### ptr_eq

如果两个 Arc 以类似于 `ptr::eq` 的方式指向相同的分配，则返回 true。 比较 dyn Trait 指针时的注意事项

```rust
pub fn ptr_eq(this: &Arc<T>, other: &Arc<T>) -> bool
```

**参数**：

- **this**：一个指向`Arc<T>`的指针的引用
- **other**：另一个指向`Arc<T>`的指针的引用

**返回值**：根据两个`Arc`是否以 `ptr::eq` 的方式指向相同的分配，返回`bool`值

```rust
fn main() {
    use std::sync::Arc;

    let five = Arc::new(5);
    let same_five = Arc::clone(&five);
    let other_five = Arc::new(5);

    println!("{:#?}", Arc::ptr_eq(&five, &same_five)); // true
    println!("{:#?}", Arc::ptr_eq(&five, &other_five)); // false
}
```



### impl\<T: Clone> Arc\<T>

#### make_mut

对给定的 Arc 进行可变引用

如果有其他 Arc 指针指向同一分配，则 `make_mut` 会将内部值 clone 到新分配以确保唯一的所有权。 这也称为写时克隆。

```rust
pub fn make_mut(this: &mut Arc<T>) -> &mut T
```

**参数**：

- **this**：一个Arc的可变引用

**返回值**：返回Arc内部值的可变引用

修改会影响原数据

```rust
fn main() {
    use std::sync::Arc;

    let mut data = Arc::new(5);

    *Arc::make_mut(&mut data) += 1;

    println!("{:#?}", Arc::make_mut(&mut data)); // 6
    println!("{:#?}", data); // 6
}
```

使用`clone`则不会

```rust
fn main() {
    use std::sync::Arc;

    let data = Arc::new(5);

    let mut other = Arc::clone(&data);

    *Arc::make_mut(&mut other) *= 2;

	println!("{:#?}", *Arc::make_mut(&mut other));  // 10
    println!("{:#?}", data);  // 5
}
```

如果没有其他 Arc 指针指向这个分配，而是一些 Weak 指针，那么 Weak 指针将被分离，内部值不会被克隆。

`Weak` 指针将被分离:

```rust
use std::sync::Arc;

let mut data = Arc::new(75);
let weak = Arc::downgrade(&data);

assert!(75 == *data);
assert!(75 == *weak.upgrade().unwrap());

*Arc::make_mut(&mut data) += 1;

assert!(76 == *data);
assert!(weak.upgrade().is_none());
```



#### unwrap_or_clone

`nightly-only`

如果我们有 `T` 的唯一引用，那就打开它。否则，克隆 `T` 并返回克隆。

假设 `arc_t` 是 `Arc<T>` 类型，这个函数在功能上等同于 `(*arc_t).clone()`，但会尽可能避免克隆内部值。

```rust
pub fn unwrap_or_clone(this: Arc<T>) -> T
```

示例

```rust
#![feature(arc_unwrap_or_clone)]
let inner = String::from("test");
let ptr = inner.as_ptr();

let arc = Arc::new(inner);
let inner = Arc::unwrap_or_clone(arc);
// 内部值没有被克隆
assert!(ptr::eq(ptr, inner.as_ptr()));

let arc = Arc::new(inner);
let arc2 = arc.clone();
let inner = Arc::unwrap_or_clone(arc);
// 因为有两个引用，我们不得不克隆内部值。
assert!(!ptr::eq(ptr, inner.as_ptr()));
// `arc2` 是最后一个引用，所以当我们展开它时，我们会得到原来的 `String`。
let inner = Arc::unwrap_or_clone(arc2);
assert!(ptr::eq(ptr, inner.as_ptr()));
```



### impl\<T: ?Sized> Arc\<T>

#### get_mut

如果没有其他 Arc 或 Weak 指向相同分配的指针，则返回给定 Arc 的可变引用。

否则返回 None，因为更改共享值并不安全。

另见 make_mut，当有其他 Arc 指针时，它将 clone 内部值。

```rust
pub fn get_mut(this: &mut Arc<T>) -> Option<&mut T>
```

**参数**：

- **this**：一个Arc的可变引用

**返回值**：返回一个`Option`，包含Arc内部数据的可变引用

```rust
fn main() {
    use std::sync::Arc;

    let mut x = Arc::new(3);
    *Arc::get_mut(&mut x).unwrap() = 4;
    println!("{:#?}", x); // 4

    let _y = Arc::clone(&x);
    println!("{:#?}", Arc::get_mut(&mut x)); // None
}
```





#### get_mut_unchecked

`nightly-only`

将变量引用返回给定的 `Arc`，而不进行任何检查。

```rust
pub unsafe fn get_mut_unchecked(this: &mut Arc<T>) -> &mut T
```

示例

```rust
#![feature(get_mut_unchecked)]

use std::sync::Arc;

let mut x = Arc::new(String::new());
unsafe {
    Arc::get_mut_unchecked(&mut x).push_str("foo")
}
assert_eq!(*x, "foo");
```

指向同一分配的其他 `Arc` 指针必须指向同一类型。

```rust
#![feature(get_mut_unchecked)]

use std::sync::Arc;

let x: Arc<str> = Arc::from("Hello, world!");
let mut y: Arc<[u8]> = x.clone().into();
unsafe {
    // 这是未定义的行为，因为 x 的内部类型是 str，而不是 [u8]
    Arc::get_mut_unchecked(&mut y).fill(0xff); // 0xff 在 UTF-8 中无效
}
println!("{}", &*x); // str 中的 UTF-8 无效
```

指向同一分配的其他 `Arc` 指针必须指向完全相同的类型，包括生命周期。

```rust
#![feature(get_mut_unchecked)]

use std::sync::Arc;

let x: Arc<&str> = Arc::new("Hello, world!");
{
    let s = String::from("Oh, no!");
    let mut y: Arc<&str> = x.clone().into();
    unsafe {
        // 这是未定义的行为，因为 x 的内部类型是 &'long str，而不是 &'short str
        *Arc::get_mut_unchecked(&mut y) = &s;
    }
}
println!("{}", &*x); // Use-after-free
```

:::tip safety

如果存在指向同一分配的任何其他 `Arc` 或 [`Weak`](https://www.rustwiki.org.cn/zh-CN/std/sync/struct.Weak.html) 指针，则在返回的借用期间，它们不得被解引用或具有活动借用，并且它们的内部类型必须与此 Rc 的内部类型完全相同 (包括生命周)。 如果不存在这样的指针 (例如紧接在 `Arc::new` 之后)，则情况很简单。

:::



### impl Arc\<dyn Any + Send + Sync + 'static>

#### downcase

尝试将 `Arc<dyn Any + Send + Sync>` 转换为具体类型。

```rust
pub fn downcast<T>(self) -> Result<Arc<T>, Arc<dyn Any + Send + Sync + 'static>>
where
    T: Any + Send + Sync,
```

**返回值**：返回一个`Result`，包含Arc内部数据

```rust
use std::any::Any;
use std::sync::Arc;

fn print_if_string(value: Arc<dyn Any + Send + Sync>) {
    if let Ok(string) = value.downcast::<String>() {
        println!("String ({}): {}", string.len(), string);
    } else {
        println!("not string");
    }
}

fn main() {
    let my_string = "Hello World".to_string();
    print_if_string(Arc::new(my_string)); // String (11): Hello World
    print_if_string(Arc::new(0i8)); //  not string
}
```





#### downcast_unchecked

`nightly-only`

将 `Arc<dyn Any + Send + Sync>` 向下转换为具体类型。

```rust
pub unsafe fn downcast_unchecked<T>(self) -> Arc<T>
where
    T: Any + Send + Sync,
```

示例

```rust
#![feature(downcast_unchecked)]

use std::any::Any;
use std::sync::Arc;

let x: Arc<dyn Any + Send + Sync> = Arc::new(1_usize);

unsafe {
    assert_eq!(*x.downcast_unchecked::<usize>(), 1);
}
```



## Trait Implementations

### impl\<T: AsFd> AsFd for Arc\<T>

这个 impl 允许在 Arc 上实现需要 AsFd 的 traits。

```rust
use std::net::UdpSocket;
use std::sync::Arc;

trait MyTrait: AsFd {}
impl MyTrait for Arc<UdpSocket> {}
impl MyTrait for Box<UdpSocket> {}
```

#### as_fd

借用文件描述符。 

```rust
fn as_fd(&self) -> BorrowedFd<'_>
```







### impl\<T: AsHandle> AsHandle for Arc\<T>

`Windows only`

这个 impl 允许在 Arc 上实现需要 AsHandle 的 traits。

```rust
use std::fs::File;
use std::sync::Arc;

trait MyTrait: AsHandle {}
impl MyTrait for Arc<File> {}
impl MyTrait for Box<File> {}
```

#### as_handle

借用句柄。 

```rust
fn as_handle(&self) -> BorrowedHandle<'_>
```





### impl\<T: AsRawFd> AsRawFd for Arc\<T>

这个 impl 允许在 Arc 上实现需要 AsRawFd 的 traits。

```rust
use std::net::UdpSocket;
use std::sync::Arc;

trait MyTrait: AsRawFd {}
impl MyTrait for Arc<UdpSocket> {}
impl MyTrait for Box<UdpSocket> {}
```



#### as_raw_fd

提取原始文件描述符。 

```rust
fn as_raw_fd(&self) -> RawFd
```



### impl\<T> AsRef\<T> for Arc\<T>

```rust
impl<T> AsRef<T> for Arc<T>
where
  T: ?Sized,
```

#### as_ref

将此类型转换为 (通常是推断的) 输入类型的共享引用。

```rust
fn as_ref(&self) -> &T
```



### impl\<T: AsSocket> AsSocket for Arc\<T>

`Windows only`

这个 impl 允许在 Arc 上实现需要 AsSocket 的 traits。

```rust
use std::net::UdpSocket;

use std::sync::Arc;



trait MyTrait: AsSocket {}

impl MyTrait for Arc<UdpSocket> {}

impl MyTrait for Box<UdpSocket> {}
```



#### as_socket

借用套接字。

```rust
fn as_socket(&self) -> BorrowedSocket<'_>
```



### impl\<T> Borrow\<T> for Arc\<T>

```rust
impl<T> Borrow<T> for Arc<T>
where
  T: ?Sized,
```



#### borrow

从拥有的值中一成不变地借用。 

```rust
fn borrow(&self) -> &T
```



### impl\<T> Clone for Arc\<T>

```rust
impl<T> Clone for Arc<T>
where
  T: ?Sized,
```



#### clone

克隆 Arc 指针。

```rust
fn clone(&self) -> Arc<T>
```

这将创建另一个指向相同分配的指针，从而增加了强引用计数。

```rust
use std::sync::Arc;

let five = Arc::new(5);
let _ = Arc::clone(&five);
```



#### clone_from

从source执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### impl\<T> Debug for Arc\<T>

```rust
impl<T> Debug for Arc<T>

where

  T: Debug + ?Sized,
```



使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



### impl\<T> Default for Arc\<T>

```rust
impl<T> Default for Arc<T>

where

  T: Default,
```



#### default

用 T 的 Default 值创建一个新的 `Arc<T>`。

```rust
fn default() -> Arc<T>
```



```rust
use std::sync::Arc;
let x: Arc<i32> = Default::default();
assert_eq!(*x, 0);
```



### impl\<T> Deref for Arc\<T>

解引用后的结果类型。

```rust
impl<T> Deref for Arc<T>
where
  T: ?Sized,
type Target = T
```





#### deref

解引用值。

```rust
fn deref(&self) -> &T
```



### impl\<T> Display for Arc\<T>

```rust
impl<T> Display for Arc<T>
where
  T: Display + ?Sized,
```

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



### impl\<T> Drop for Arc\<T>

```rust
impl<T> Drop for Arc<T>
where
  T: ?Sized,
```



#### drop

丢弃 Arc。

```rust
fn drop(&mut self)
```



这将减少强引用计数。 如果强引用计数达到零，那么唯一的其他引用 (如果有) 是 Weak，因此我们将 drop 作为内部值。

```rust
use std::sync::Arc;

struct Foo;

impl Drop for Foo {
  fn drop(&mut self) {
    println!("dropped!");
  }
}
```



```rust
let foo = Arc::new(Foo);
let foo2 = Arc::clone(&foo);

drop(foo);  // 不打印任何东西
drop(foo2);  // 打印 "dropped!"
```



### impl\<T> Error for Arc\<T>

```rust
impl<T> Error for Arc<T>
where
  T: Error + ?Sized,
```



#### source

此错误的下级来源 (如果有)。 

```rust
fn source(&self) -> Option<&(dyn Error + 'static)>
```



#### provide

This is a nightly-only experimental API. (error_generic_member_access #99301)

提供对用于错误报告的上下文的基于类型的访问。 

```rust
fn provide<'a>(&'a self, req: &mut Demand<'a>)
```



### impl\<T> From<&[T]> for Arc<[T]>

```rust
impl<T> From<&[T]> for Arc<[T]>
where
  T: Clone,
```



#### from

分配一个引用计数的切片，并通过克隆 v 的项来填充它。

```rust
fn from(v: &[T]) -> Arc<[T]>
```





```rust
Example

let original: &[i32] = &[1, 2, 3];

let shared: Arc<[i32]> = Arc::from(original);

assert_eq!(&[1, 2, 3], &shared[..]);
```



### impl From<&CStr> for Arc\<CStr>

```rust
impl From<&CStr> for Arc<CStr>
```



#### from

通过将内容复制到新分配的 Arc 中，将 &CStr 转换为 `Arc<CStr>`。

```rust
fn from(s: &CStr) -> Arc<CStr>
```



### impl From<&OsStr> for Arc\<OsStr>

```rust
impl From<&OsStr> for Arc<OsStr>
```



#### from

将字符串复制到新分配的 `Arc<OsStr>` 中。

```rust
fn from(s: &OsStr) -> Arc<OsStr>
```



### impl From<&Path> for Arc\<Path>

```rust
impl From<&Path> for Arc<Path>
```



#### from

通过将 Path 数据复制到新的 Arc 缓冲区，将 Path 转换为 Arc。

```rust
fn from(s: &Path) -> Arc<Path>
```



### impl From<&str> for Arc\<str>

```rust
impl From<&str> for Arc<str>
```



#### from

分配一个引用计数的 str 并将 v 复制到其中。

```rust
fn from(v: &str) -> Arc<str>
```



```rust
let shared: Arc<str> = Arc::from("eggplant");

assert_eq!("eggplant", &shared[..]);
```



### impl\<W> From\<Arc\<W>> for RawWaker

```rust
impl<W> From<Arc<W>> for RawWaker
where
  W: Wake + Send + Sync + 'static,
```



#### from

使用 Wake 类型作为 RawWaker。

```rust
fn from(waker: Arc<W>) -> RawWaker
```



此转换不使用堆分配或原子操作。

### impl\<W> From\<Arc\<W>> for Waker

```rust
impl<W> From<Arc<W>> for Waker
where
  W: Wake + Send + Sync + 'static,
```





#### from

使用 Wake 类型作为 Waker。

```rust
fn from(waker: Arc<W>) -> Waker
```



此转换不使用堆分配或原子操作。





### impl From\<Arc\<str>> for Arc\<[u8]>

```rust
impl From<Arc<str>> for Arc<[u8]>
```



#### from

将原子引用计数的字符串切片转换为字节切片。

```rust
fn from(rc: Arc<str>) -> Arc<[u8]>
```



Example

```rust
let string: Arc<str> = Arc::from("eggplant");

let bytes: Arc<[u8]> = Arc::from(string);

assert_eq!("eggplant".as_bytes(), bytes.as_ref());
```



### impl\<T> From\<Box\<T, Global>> for Arc\<T>

```rust
impl<T> From<Box<T, Global>> for Arc<T>
where
  T: ?Sized,
```

#### from

将 boxed 对象移动到新的引用计数分配。

```rust
fn from(v: Box<T, Global>) -> Arc<T>
```



Example

```rust
let unique: Box<str> = Box::from("eggplant");

let shared: Arc<str> = Arc::from(unique);

assert_eq!("eggplant", &shared[..]);
```



### impl From\<CString> for Arc\<CStr>

```rust
impl From<CString> for Arc<CStr>
```



#### from

通过将 CString 数据移动到新的 Arc 缓冲区中，将 CString 转换为 `Arc<CStr>`。

```rust
fn from(s: CString) -> Arc<CStr>
```



### impl\<'a, B> From\<Cow\<'a, B>> for Arc\<B>

```rust
impl<'a, B> From<Cow<'a, B>> for Arc<B>
where
  B: ToOwned + ?Sized,
  Arc<B>: From<&'a B> + From<<B as ToOwned>::Owned>,
```



#### from

通过复制其内容，从写时克隆指针创建一个原子引用计数指针。

```rust
fn from(cow: Cow<'a, B>) -> Arc<B>
```



Example

```rust
let cow: Cow<'_, str> = Cow::Borrowed("eggplant");

let shared: Arc<str> = Arc::from(cow);

assert_eq!("eggplant", &shared[..]);
```



### impl From\<OsString> for Arc\<OsStr>

```rust
impl From<OsString> for Arc<OsStr>
```



#### from

通过将 OsString 数据移动到新的 Arc 缓冲区中，将 OsString 转换为 `Arc<OsStr>`。

```rust
fn from(s: OsString) -> Arc<OsStr>
```





### impl From\<PathBuf> for Arc\<Path>

```rust
impl From<PathBuf> for Arc<Path>
```



#### from

通过将 PathBuf 数据移动到新的 Arc 缓冲区中，将 PathBuf 转换为 `Arc<Path>`。

```rust
fn from(s: PathBuf) -> Arc<Path>
```



### impl From\<String> for Arc\<str>

```rust
impl From<String> for Arc<str>
```





#### from

分配一个引用计数的 str 并将 v 复制到其中。

```rust
fn from(v: String) -> Arc<str>
```



Example

```rust
let unique: String = "eggplant".to_owned();

let shared: Arc<str> = Arc::from(unique);

assert_eq!("eggplant", &shared[..]);
```



### impl\<T> From\<T> for Arc\<T>

```rust
impl<T> From<T> for Arc<T>
```



#### from

将 T 转换为 `Arc<T>`

```rust
fn from(t: T) -> Arc<T>
```



转换将值移动到新分配的 Arc 中。 相当于调用 Arc::new(t)。

```rust
let x = 5;

let arc = Arc::new(5);
assert_eq!(Arc::from(x), arc);
```





### impl\<T> From\<Vec\<T, Global>> for Arc\<[T]>

```rust
impl<T> From<Vec<T, Global>> for Arc<[T]>
```



#### from

分配一个引用计数的切片，并将 v 的项移入其中。

```rust
fn from(v: Vec<T, Global>) -> Arc<[T]>
```



Example

```rust
let unique: Vec<i32> = vec![1, 2, 3];

let shared: Arc<[i32]> = Arc::from(unique);

assert_eq!(&[1, 2, 3], &shared[..]);
```



### impl\<T> FromIterator\<T> for Arc<[T]>

```rust
impl<T> FromIterator<T> for Arc<[T]>
```



获取 Iterator 中的每个元素，并将其收集到 `Arc<[T]>` 中。

```rust
fn from_iter<I>(iter: I) -> Arc<[T]>
where
  I: IntoIterator<Item = T>,
```



性能特点

一般情况

在一般情况下，首先要收集到 `Vec<T>` 中来收集到 `Arc<[T]>` 中。也就是说，编写以下内容时：

```rust
let evens: Arc<[u8]> = (0..10).filter(|&x| x % 2 == 0).collect();
```

这就像我们写的那样：

```rust
let evens: Arc<[u8]> = (0..10).filter(|&x| x % 2 == 0)

  .collect::<Vec<_>>() // 第一组分配在此处发生。

  .into(); // `Arc<[T]>` 的第二个分配在此处进行。
```

这将分配构造 `Vec<T>` 所需的次数，然后分配一次，以将 Vec\<T> 转换为 Arc\<[T]>。

已知长度的迭代器

当您的 Iterator 实现 TrustedLen 且大小正确时，将为 Arc<[T]> 进行一次分配。例如：

```rust
let evens: Arc<[u8]> = (0..10).collect(); // 这里只进行一次分配。
```



### impl\<T> Hash for Arc\<T>

```rust
impl<T> Hash for Arc<T>
where
  T: Hash + ?Sized,
```



#### hash

将该值输入给定的 Hasher。 

```rust
fn hash<H>(&self, state: &mut H)
where
  H: Hasher,
```



#### hash_slice

将这种类型的切片送入给定的 Hasher 中。 

```rust
fn hash_slice<H>(data: &[Self], state: &mut H)
where
  H: Hasher,
  Self: Sized,
```



### impl\<T> Ord for Arc\<T>

```rust
impl<T> Ord for Arc<T>
where
  T: Ord + ?Sized,
```



#### cmp

两个 Arc 的比较。

```rust
fn cmp(&self, other: &Arc<T>) -> Ordering
```

通过调用 cmp() 的内部值来比较两者。

```rust
use std::sync::Arc;
use std::cmp::Ordering;

let five = Arc::new(5);

assert_eq!(Ordering::Less, five.cmp(&Arc::new(6)));
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



### impl\<T> PartialEq\<Arc\<T>> for Arc\<T>

```rust
impl<T> PartialEq<Arc<T>> for Arc<T>
where
  T: PartialEq<T> + ?Sized,
```



#### eq

两个 Arc 的相等性。

```rust
fn eq(&self, other: &Arc<T>) -> bool
```

即使两个 Arc 的内部值相等，即使它们存储在不同的分配中，它们也相等。

如果 T 还实现了 Eq (暗示相等的反射性)，则指向同一分配的两个 Arc 总是相等的。

```rust
use std::sync::Arc;

let five = Arc::new(5);

assert!(five == Arc::new(5));
```



#### ne

两个 Arc 的不等式。

```rust
fn ne(&self, other: &Arc<T>) -> bool
```

如果两个 Arc 的内部值不相等，则它们不相等。

如果 T 也实现了 Eq (暗示相等的，反射，性)，则指向相同值的两个 Arc 总是相等的。

```rust
use std::sync::Arc;

let five = Arc::new(5);

assert!(five != Arc::new(6));
```



### impl\<T> PartialOrd\<Arc\<T>> for Arc\<T>

```rust
impl<T> PartialOrd<Arc<T>> for Arc<T>
where
  T: PartialOrd<T> + ?Sized,
```



#### partial_cmp

两个 Arc 的部分比较。

```rust
fn partial_cmp(&self, other: &Arc<T>) -> Option<Ordering>
```

通过调用 partial_cmp() 的内部值来比较两者。

```rust
use std::sync::Arc;
use std::cmp::Ordering;

let five = Arc::new(5);

assert_eq!(Some(Ordering::Less), five.partial_cmp(&Arc::new(6)));
```



#### lt

小于两个 Arc 的比较。

```rust
fn lt(&self, other: &Arc<T>) -> bool
```

通过调用 < 的内部值来比较两者。

```rust
use std::sync::Arc;

let five = Arc::new(5);

assert!(five < Arc::new(6));
```



#### le

两个 Arc 的小于或等于比较。

```rust
fn le(&self, other: &Arc<T>) -> bool
```

通过调用 <= 的内部值来比较两者。

```rust
use std::sync::Arc;

let five = Arc::new(5);

assert!(five <= Arc::new(5));
```



#### gt

大于两个 Arc 的比较。

```rust
fn gt(&self, other: &Arc<T>) -> bool
```

通过调用 > 的内部值来比较两者。

```rust
use std::sync::Arc;

let five = Arc::new(5);

assert!(five > Arc::new(4));
```



#### ge

两个 Arc 的大于或等于比较。

```rust
fn ge(&self, other: &Arc<T>) -> bool
```

通过调用 >= 的内部值来比较两者。

```rust
use std::sync::Arc;

let five = Arc::new(5);

assert!(five >= Arc::new(5));
```



### impl\<T> Pointer for Arc\<T>

```rust
impl<T> Pointer for Arc<T>
where
  T: ?Sized,
```



#### fmt

使用给定的格式化程序格式化该值。

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



### impl\<T, const N: usize> TryFrom\<Arc\<[T]>> for Arc\<[T; N]>

#### Error

发生转换错误时返回的类型。

```rust
type Error = Arc<[T]>
```



#### try_from

执行转换。

```rust
fn try_from(
  boxed_slice: Arc<[T]>
) -> Result<Arc<[T; N]>, <Arc<[T; N]> as TryFrom<Arc<[T]>>>::Error>
```



### impl\<T, U> CoerceUnsized\<Arc\<U>> for Arc\<T>

```rust
impl<T, U> CoerceUnsized<Arc<U>> for Arc<T>
where
  T: Unsize<U> + ?Sized,
  U: ?Sized,
```



### impl\<T, U> DispatchFromDyn\<Arc\<U>> for Arc\<T>

```rust
impl<T, U> DispatchFromDyn<Arc<U>> for Arc<T>
where
  T: Unsize<U> + ?Sized,
  U: ?Sized,
```



### impl\<T> Eq for Arc\<T>

```rust
impl<T> Eq for Arc<T>
where
  T: Eq + ?Sized,
```



### impl\<T> Send for Arc\<T>

```rust
impl<T> Send for Arc<T>
where
  T: Sync + Send + ?Sized,
```



### impl\<T> Sync for Arc\<T>

```rust
impl<T> Sync for Arc<T>
where
  T: Sync + Send + ?Sized,
```



### impl\<T> Unpin for Arc\<T>

```rust
impl<T> Unpin for Arc<T>
where
  T: ?Sized,
```



### impl\<T> UnwindSafe for Arc\<T>

```rust
impl<T> UnwindSafe for Arc<T>
where
  T: RefUnwindSafe + ?Sized,
```



## Auto Trait Implementations

### impl\<T: ?Sized> RefUnwindSafe for Arc\<T>

```rust
impl<T: ?Sized> RefUnwindSafe for Arc<T>
where
  T: RefUnwindSafe,
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



### impl\<T, U> Into\<U> for T

```rust
impl<T, U> Into<U> for T
where
  U: From<T>,
```



### impl\<E> Provider for E

```rust
impl<E> Provider for E
where
  E: Error + ?Sized,
```



### impl\<T> ToOwned for T

```rust
impl<T> ToOwned for T
where
  T: Clone,
```



### impl\<T> ToString for T

```rust
impl<T> ToString for T
where
  T: Display + ?Sized,
```



### impl\<T, U> TryFrom\<U> for T

```rust
impl<T, U> TryFrom<U> for T
where
  U: Into<T>,
```



### impl\<T, U> TryInto\<U> for T

```rust
impl<T, U> TryInto<U> for T
where
  U: TryFrom<T>,
```

