# Struct std::time::Instant

单调非递减时钟的度量。 不透明且仅对 `Duration` 有用。

```rust
pub struct Instant(time::Instant);
```

除 [platform bugs](https://www.rustwiki.org.cn/zh-CN/std/time/struct.Instant.html#monotonicity) 外，时刻始终保证不低于任何先前测量的创建时的时刻，并且对于诸如测量基准或计时操作需要多长时间等任务通常很有用。

但是请注意，不能保证 instants 是稳定的。换句话说，底层时钟的每个滴答声的长度可能不同 (例如 几秒钟可能比其他更长)。瞬间可能会向前跳跃或经历时间膨胀 (减速或加速)，但永远不会向后退。

即时消息是不透明的类型，只能相互比较。没有方法可以立即获取 “秒数”。 相反，它仅允许测量两个瞬间之间的持续时间 (或比较两个瞬间)。

`Instant` 结构体的大小可能会因目标操作系统而异。

```rust
use std::time::{Duration, Instant};
use std::thread::sleep;

fn main() {
   let now = Instant::now();

   // 我们睡了 2 秒钟
   sleep(Duration::new(2, 0));
   // 它打印 '2'
   println!("{}", now.elapsed().as_secs());
}
```

## 特定于操作系统的行为

`Instant` 是系统特定类型的包装器，根据底层操作系统的不同，它的行为可能会有所不同。 例如，以下代码段在 Linux 上很好，但在 macOS 上为 panics：

```
use std::time::{Instant, Duration};

let now = Instant::now();
let max_seconds = u64::MAX / 1_000_000_000;
let duration = Duration::new(max_seconds, 0);
println!("{:?}", now + duration);
```



## 底层系统调用

以下系统调用是 `now()` 使用 [currently](https://www.rustwiki.org.cn/zh-CN/std/io/index.html#platform-specific-behavior) 来找出当前时间:

| Platform | System call                                                  |
| -------- | ------------------------------------------------------------ |
| SGX      | [`insecure_time` usercall](https://edp.fortanix.com/docs/api/fortanix_sgx_abi/struct.Usercalls.html#method.insecure_time). More information on [timekeeping in SGX](https://edp.fortanix.com/docs/concepts/rust-std/#codestdtimecode) |
| UNIX     | [clock_gettime (Monotonic Clock)](https://linux.die.net/man/3/clock_gettime) |
| Darwin   | [mach_absolute_time](https://developer.apple.com/library/archive/documentation/Darwin/Conceptual/KernelProgramming/services/services.html) |
| VXWorks  | [clock_gettime (Monotonic Clock)](https://linux.die.net/man/3/clock_gettime) |
| SOLID    | `get_tim`                                                    |
| WASI     | [__wasi_clock_time_get (Monotonic Clock)](https://github.com/WebAssembly/WASI/blob/main/legacy/preview1/docs.md#clock_time_get) |
| Windows  | [QueryPerformanceCounter](https://docs.microsoft.com/en-us/windows/win32/api/profileapi/nf-profileapi-queryperformancecounter) |

**免责声明:** 这些系统调用可能会随时间变化。

> Note: 如果 [`add`](https://www.rustwiki.org.cn/zh-CN/std/time/struct.Instant.html#method.add) 的数学运算可能是 panic 结构体不能代表新的时间点。



### Monotonicity

在所有平台上，`Instant` 将尝试使用保证单调行为 (如果可用) 的 OS API，所有 [tier 1](https://doc.rust-lang.org/rustc/platform-support.html) 平台都是这种情况。 在实践中，这种保证在极少数情况下会被硬件、虚拟化或操作系统错误破坏。 为了解决这些错误和不提供单调时钟的平台，[`duration_since`](https://www.rustwiki.org.cn/zh-CN/std/time/struct.Instant.html#method.duration_since)、[`elapsed`](https://www.rustwiki.org.cn/zh-CN/std/time/struct.Instant.html#method.elapsed) 和 [`sub`](https://www.rustwiki.org.cn/zh-CN/std/time/struct.Instant.html#method.sub) 饱和为零。 在较旧的 Rust 版本中，这反而会导致 panic。 [`checked_duration_since`](https://www.rustwiki.org.cn/zh-CN/std/time/struct.Instant.html#method.checked_duration_since) 可用于检测和处理违反单调性或以错误顺序减去 `即时` 的情况。

这种变通方法掩盖了早期和后期瞬间意外交换的编程错误。出于这个原因，未来的 rust 版本可能会重新引入 panic。





## Implementations

### impl Instant

#### now

返回对应于 “now” 的瞬间。

```rust
pub fn now() -> Instant
```

```rust
use std::time::Instant;

let now = Instant::now();
```



#### duration_since

返回从另一时刻到该时刻所经过的时间，如果该时刻晚于该时刻，则返回零持续时间。

```rust
pub fn duration_since(&self, earlier: Instant) -> Duration
```

**参数**：

- **earlier**：更早的时间

**返回值**：返回一个`Duration`

```rust
use std::time::{Duration, Instant};
use std::thread::sleep;

let now = Instant::now();
sleep(Duration::new(1, 0));
let new_now = Instant::now();
println!("{:?}", new_now.duration_since(now));
println!("{:?}", now.duration_since(new_now)); // 0ns
```

:::tip panic

当 `earlier` 晚于 `self` 时，以前的 rust 版本会出现 panic。目前这种方法已经饱和。 未来的版本在某些情况下可能会重新引入 panic。 请参见 [Monotonicity](https://www.rustwiki.org.cn/zh-CN/std/time/struct.Instant.html#monotonicity)。

:::



#### checked_duration_since

返回从另一个时刻到该时刻所经过的时间; 如果该时刻晚于该时刻，则返回 None。

由于 [monotonicity bugs](https://www.rustwiki.org.cn/zh-CN/std/time/struct.Instant.html#monotonicity)，即使在传递的 `Instant` 的正确逻辑顺序下，此方法也可以返回 `None`。

```rust
pub fn checked_duration_since(&self, earlier: Instant) -> Option<Duration>
```

**参数**：

- **earlier**：更早的时间

**返回值**：返回一个`Option<Duration>`

```rust
use std::time::{Duration, Instant};
use std::thread::sleep;

let now = Instant::now();
sleep(Duration::new(1, 0));
let new_now = Instant::now();
println!("{:?}", new_now.checked_duration_since(now));
println!("{:?}", now.checked_duration_since(new_now)); // None
```



#### saturating_duration_since

返回从另一时刻到该时刻所经过的时间，如果该时刻晚于该时刻，则返回零持续时间。

```rust
pub fn saturating_duration_since(&self, earlier: Instant) -> Duration
```

**参数**：

- **earlier**：更早的时间

**返回值**：返回一个`Duration`

```rust
use std::time::{Duration, Instant};
use std::thread::sleep;

let now = Instant::now();
sleep(Duration::new(1, 0));
let new_now = Instant::now();
println!("{:?}", new_now.saturating_duration_since(now));
println!("{:?}", now.saturating_duration_since(new_now)); // 0ns
```



#### elapsed

返回自该时刻以来经过的时间量。

```rust
pub fn elapsed(&self) -> Duration
```

**返回值**：返回一个`Duration`

```rust
use std::thread::sleep;
use std::time::{Duration, Instant};

let instant = Instant::now();
let three_secs = Duration::from_secs(3);
sleep(three_secs);
assert!(instant.elapsed() >= three_secs);
```

:::tip panic

当前时间早于自己时，以前的 rust 版本会出现 panic。目前，在这种情况下，此方法返回的 Duration 为零。 未来的版本可能会重新引入 panic。 请参见 [Monotonicity](https://www.rustwiki.org.cn/zh-CN/std/time/struct.Instant.html#monotonicity)。

:::





#### checked_add

如果 `t` 可以表示为 `Instant` (这意味着它在底层数据结构的边界内)，则返回 `Some(t)`，其中 `t` 是时间 `self + duration`，否则返回 `None`。

```rust
pub fn checked_add(&self, duration: Duration) -> Option<Instant>
```



#### checked_sub

如果 `t` 可以表示为 `Instant` (表示它在底层数据结构体的边界之内)，则返回 `Some(t)`，其中 `t` 是 `self - duration` 的时间，否则返回 `None`。

```rust
pub fn checked_sub(&self, duration: Duration) -> Option<Instant>
```



## Trait Implementations

### impl Add\<Duration> for Instant

#### add

执行 + 操作。 

```rust
fn add(self, other: Duration) -> Instant
```

Panics

如果生成的时间点无法由底层数据结构表示，则此函数可能出现 panic。 没有 panic 的版本，请参见 Instant::checked_add。



#### Output

应用 + 运算符后的结果类型。

```rust
type Output = Instant
```



### impl AddAssign\<Duration> for Instant

#### add_assign

执行 += 操作。 

```rust
fn add_assign(&mut self, other: Duration)
```



### impl Clone for Instant

#### clone

返回值的副本。 

```rust
fn clone(&self) -> Instant
```



#### clone_from

从`source`执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### impl Debug for Instant

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result
```



### impl Hash for Instant

#### hash

将该值输入给定的 Hasher。 

```rust
fn hash<__H: Hasher>(&self, state: &mut __H)
```



#### hash_slice

将这种类型的切片送入给定的 Hasher 中。 

```rust
fn hash_slice<H>(data: &[Self], state: &mut H)
where
  H: Hasher,
  Self: Sized,
```



### impl Ord for Instant

#### cmp

此方法返回 self 和 other 之间的 Ordering。 

```rust
fn cmp(&self, other: &Instant) -> Ordering
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

### impl PartialEq\<Instant> for Instant

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &Instant) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### impl PartialOrd\<Instant> for Instant

#### partial_cmp

如果存在，则此方法返回 self 和 other 值之间的顺序。 

```rust
fn partial_cmp(&self, other: &Instant) -> Option<Ordering>
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



### impl Sub\<Duration> for Instant

#### Output

应用 - 运算符后的结果类型。

```rust
type Output = Instant
```



#### sub

执行 - 操作。 

```rust
fn sub(self, other: Duration) -> Instant
```



### impl Sub\<Instant> for Instant



#### sub

返回从另一时刻到该时刻所经过的时间，如果该时刻晚于该时刻，则返回零持续时间。

```rust
fn sub(self, other: Instant) -> Duration
```

Panics

当 other 晚于 self 时，以前的 rust 版本会出现 panic。目前这种方法已经饱和。 未来的版本在某些情况下可能会重新引入 panic。 请参见 Monotonicity。



#### Output

应用 - 运算符后的结果类型。

```rust
type Output = Duration
```



### impl SubAssign\<Duration> for Instant



#### sub_assign

执行 -= 操作。 

```rust
fn sub_assign(&mut self, other: Duration)
```



### impl Copy for Instant



### impl Eq for Instant



### impl StructuralEq for Instant



### impl StructuralPartialEq for Instant



## Auto Trait Implementations

### impl RefUnwindSafe for Instant

### impl Send for Instant

### impl Sync for Instant

### impl Unpin for Instant

### impl UnwindSafe for Instant



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