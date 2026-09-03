# Struct std::thread::ThreadId

正在运行的线程的唯一标识符。

```rust
pub struct ThreadId(_);
```

`ThreadId` 是一个不透明的对象，它唯一的标识了在进程生命周期期中创建的每个线程。ThreadIds 保证不会被重用，即使线程终止时也是如此。 ThreadId 受 Rust 标准库的控制，ThreadId 和底层平台的线程标识符概念之间可能没有任何关系 – 因此，这两个概念不能互换使用。

可以从[Thread ](./Thread)上的 [id](./Thread#id)方法中检索 `ThreadId`。

```rust
fn main() {
    use std::thread;

    let other_thread = thread::spawn(|| {
        let id = thread::current().id();
        println!("{:?}", id); // ThreadId(2)
    });

    let t = other_thread.thread();
    println!("{:?}", t.id()); // ThreadId(2)

    println!("{:?}", thread::current().id());  // ThreadId(2)
}
```





## Implementations

### impl ThreadId

#### as_u64

`nightly-only` 

这将返回此 `ThreadId` 标识的线程的数字标识符。

如类型本身的文档中所述，它本质上是一个不透明的 ID，但可以保证每个线程都是唯一的。 返回的值是完全不透明的 - 仅相等测试是稳定的。 请注意，不能保证新线程将返回哪些值，并且在 Rust 版本之间可能会改变。

```rust
pub fn as_u64(&self) -> NonZeroU64
```



## Trait Implementations

### impl Clone for ThreadId

#### clone

返回值的副本。 

```rust
fn clone(&self) -> ThreadId
```



#### clone_from

从source执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### impl Debug for ThreadId

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result
```



### impl Hash for ThreadId

#### hash

将该值输入给定的 Hasher。 

```rust
fn hash<__H: Hasher>(&self, state: &mut __H)
```



#### hash_slice

```rust
fn hash_slice<H>(data: &[Self], state: &mut H)
where
  H: Hasher,
  Self: Sized,
```

将这种类型的切片送入给定的 Hasher 中。 



### impl PartialEq\<ThreadId> for ThreadId

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &ThreadId) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### impl Copy for ThreadId



### impl Eq for ThreadId



### impl StructuralEq for ThreadId



### impl StructuralPartialEq for ThreadId



## Auto Trait Implementations

### impl RefUnwindSafe for ThreadId

### impl Send for ThreadId

### impl Sync for ThreadId

### impl Unpin for ThreadId

### impl UnwindSafe for ThreadId



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

