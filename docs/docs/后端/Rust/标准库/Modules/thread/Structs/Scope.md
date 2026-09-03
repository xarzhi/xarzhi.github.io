# Struct std::thread::Scope

在其中生成作用域线程的作用域。

由[thread::scope()](../index#scope)返回

```rust
pub struct Scope<'scope, 'env: 'scope> { /* private fields */ }
```





## Implementations

### impl<'scope, 'env> Scope<'scope, 'env>

#### spawn

在作用域中产生一个新线程，为其返回一个 `ScopedJoinHandle`。

```rust
pub fn spawn<F, T>(&'scope self, f: F) -> ScopedJoinHandle<'scope, T>
where
    F: FnOnce() -> T + Send + 'scope,
    T: Send + 'scope,
```

与非作用域线程不同，使用此函数生成的线程可以从作用域外部借用非 'static 的数据。 有关详细信息，请参见 scope。

连接句柄提供了一个 join 方法，可以用来连接新生成的线程。 如果生成的线程发生 panic，join 返回一个包含 panic 载荷的 Err。

如果连接句柄被丢弃，则派生的线程将在作用域的末尾隐式连接。 在这种情况下，如果派生的线程出现 panic，scope 将在所有线程加入后出现 panic。

这个调用将使用 Builder 的默认参数创建一个线程。 如果要指定栈大小或线程名，请改用 `Builder::spawn_scoped`。





## Trait Implementations



### impl Debug for Scope<'_, '_>

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result
```





## Auto Trait Implementations

### impl<'scope, 'env> RefUnwindSafe for Scope<'scope, 'env>

### impl<'scope, 'env> Send for Scope<'scope, 'env>

### impl<'scope, 'env> Sync for Scope<'scope, 'env>

### impl<'scope, 'env> Unpin for Scope<'scope, 'env>

### impl<'scope, 'env> !UnwindSafe for Scope<'scope, 'env>



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