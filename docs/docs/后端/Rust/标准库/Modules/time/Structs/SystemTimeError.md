# Struct std::time::SystemTimeError

`SystemTime` 的 `duration_since` 和 `elapsed` 方法返回的错误，用于了解系统时间在相反方向上的距离。

```rust
pub struct SystemTimeError(_);
```

示例

```rust
use std::thread::sleep;
use std::time::{Duration, SystemTime};

let sys_time = SystemTime::now();
sleep(Duration::from_secs(1));
let new_sys_time = SystemTime::now();
match sys_time.duration_since(new_sys_time) {
    Ok(_) => {}
    Err(e) => println!("SystemTimeError difference: {:?}", e.duration()),
}
```



## Implementations

### impl SystemTimeError

#### duration

返回正时长，它表示第二个系统时间与第一个系统时间相距多远。

每当第二个系统时间表示的时间晚于调用方法的 `self` 的时间点时，就会从 [`SystemTime::duration_since`](./SystemTime#duration_since) 和 [`SystemTime::elapsed`](./SystemTime#elapsed) 方法返回 `SystemTimeError`。

```rust
pub fn duration(&self) -> Duration
```

**返回值**：返回一个Duration

```rust
use std::thread::sleep;
use std::time::{Duration, SystemTime};

let sys_time = SystemTime::now();
sleep(Duration::from_secs(1));
let new_sys_time = SystemTime::now();
match sys_time.duration_since(new_sys_time) {
    Ok(_) => {}
    Err(e) => println!("SystemTimeError difference: {:?}", e.duration()),
}
```



## Trait Implementations

### impl Clone for SystemTimeError

#### clone

返回值的副本。 

```rust
fn clone(&self) -> SystemTimeError
```



#### clone_from

从 `source` 执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### impl Debug for SystemTimeError

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result
```



### impl Display for SystemTimeError

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result
```



### impl Error for SystemTimeError

#### source

此错误的下级来源 (如果有)。 

```rust
fn source(&self) -> Option<&(dyn Error + 'static)>
```



#### provide

`nightly-only`

提供对用于错误报告的上下文的基于类型的访问。 

```rust
fn provide<'a>(&'a self, demand: &mut Demand<'a>)
```



## Auto Trait Implementations

### impl RefUnwindSafe for SystemTimeError

### impl Send for SystemTimeError

### impl Sync for SystemTimeError

### impl Unpin for SystemTimeError

### impl UnwindSafe for SystemTimeError



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