# Struct std::time::SystemTime

系统时钟的度量，对于与文件系统或其他进程之类的外部实体进行通信很有用。

```rust
pub struct SystemTime(_);
```

与 `Instant` 类型不同，这次的测量 不是单调的。 这意味着您可以将文件保存到文件系统，然后再将另一个文件保存到文件系统，并且第二个文件的 `SystemTime` 测量值比第一个文件早。 换句话说，在另一个实时操作之后实时发生的操作可能具有更早的 `SystemTime`!

因此，比较两个 `SystemTime` 实例以了解它们之间的持续时间将返回 `Result` 而不是绝对的 `Duration`，以指示这种时间漂移可能发生并且需要处理。

尽管无法直接检查 `SystemTime`，但此模块中提供了 `UNIX_EPOCH` 常量作为及时了解有关 `SystemTime` 信息的锚点。 通过从该固定时间点计算持续时间，可以将 `SystemTime` 转换为人类可读的时间，或者转换为其他字符串表示形式。

`SystemTime` 结构体的大小可能会因目标操作系统而异。

```rust
use std::time::{Duration, SystemTime};
use std::thread::sleep;

fn main() {
   let now = SystemTime::now();

   // 我们睡了 2 秒钟
   sleep(Duration::new(2, 0));
   match now.elapsed() {
       Ok(elapsed) => {
           // 它打印 '2'
           println!("{}", elapsed.as_secs());
       }
       Err(e) => {
           // 发生错误！
           println!("Error: {e:?}");
       }
   }
}
```





## 特定于平台的行为

`SystemTime` 的精度可能取决于底层操作系统特定的时间格式。 例如，在 Windows 上，时间以 100 纳秒间隔表示，而 Linux 可以表示纳秒间隔。

以下系统调用是 `now()` 使用 [currently](https://www.rustwiki.org.cn/zh-CN/std/io/index.html#platform-specific-behavior) 来找出当前时间:

| Platform | System call                                                  |
| -------- | ------------------------------------------------------------ |
| SGX      | [`insecure_time` usercall](https://edp.fortanix.com/docs/api/fortanix_sgx_abi/struct.Usercalls.html#method.insecure_time). More information on [timekeeping in SGX](https://edp.fortanix.com/docs/concepts/rust-std/#codestdtimecode) |
| UNIX     | [clock_gettime (Realtime Clock)](https://linux.die.net/man/3/clock_gettime) |
| Darwin   | [gettimeofday](https://man7.org/linux/man-pages/man2/gettimeofday.2.html) |
| VXWorks  | [clock_gettime (Realtime Clock)](https://linux.die.net/man/3/clock_gettime) |
| SOLID    | `SOLID_RTC_ReadTime`                                         |
| WASI     | [__wasi_clock_time_get (Realtime Clock)](https://github.com/WebAssembly/WASI/blob/main/legacy/preview1/docs.md#clock_time_get) |
| Windows  | [GetSystemTimePreciseAsFileTime](https://docs.microsoft.com/en-us/windows/win32/api/sysinfoapi/nf-sysinfoapi-getsystemtimepreciseasfiletime) / [GetSystemTimeAsFileTime](https://docs.microsoft.com/en-us/windows/win32/api/sysinfoapi/nf-sysinfoapi-getsystemtimeasfiletime) |

> Note: 如果 [`add`](https://www.rustwiki.org.cn/zh-CN/std/time/struct.SystemTime.html#method.add) 的数学运算可能是 panic 结构体不能代表新的时间点。



## Implementations

### impl SystemTime

#### UNIX_EPOCH

时间锚，可用于创建新的 `SystemTime` 实例或了解 `SystemTime` 的时间。

**1601-01-01 00:00:00 UTC** 到 **1970-01-01 00:00:00 UTC** 的总 100ns 刻度数

```rust
pub const UNIX_EPOCH: SystemTime = UNIX_EPOCH
```

相对于系统时钟，此常量在所有系统上均定义为 “1970-01-01 00:00:00 UTC”。 在现有的 `SystemTime` 实例上使用 `duration_since` 可以告诉您测量距离该时间点有多远，并且可以使用 `UNIX_EPOCH + duration` 创建一个 `SystemTime` 实例来表示另一个固定的时间点。

```rust
use std::time::SystemTime;

match SystemTime::now().duration_since(SystemTime::UNIX_EPOCH) {
    Ok(n) => println!("1970-01-01 00:00:00 UTC was {} seconds ago!", n.as_secs()),
    Err(_) => panic!("SystemTime before UNIX EPOCH!"),
}
```



#### now

返回从`1601-01-01 00:00:00 UTC`到当前系统时间时间间隔的100个纳秒

```rust
pub fn now() -> SystemTime
```

**返回值**：返回一个`SystemTime`，包含当前系统时间

```rust
use std::time::SystemTime;
fn main() {
    let now = SystemTime::now();
    println!("{:?}", now); // SystemTime { intervals: 134306384054444285 }
}
```





#### duration_since

返回指定时间到当前系统时间的`Duration`

指定时间要早于当前时间，不然返回`Err`

```rust
pub fn duration_since(
    &self,
    earlier: SystemTime
) -> Result<Duration, SystemTimeError>
```

**参数**：

- **earlier**：早于当前系统时间的时间

**返回值**：返回一个`Result`，其中相减的时间里`Duration`包含在`Ok`中，若`earlier`晚于当前系统时间，则返回`Err`

```rust
use std::{thread::sleep, time::Duration};

fn main() {
    use std::time::SystemTime;

    let sys_time = SystemTime::now();
    sleep(Duration::from_secs(1));
    let new_sys_time = SystemTime::now();

    let difference = new_sys_time
        .duration_since(sys_time)
        .expect("Clock may have gone backwards");

    println!("{:?}", difference); // 1.0000828s
}
```

获取当前时间戳

```rust
use std::time::{SystemTime, UNIX_EPOCH};
fn main() {
    let now = SystemTime::now();
    let timestamp = now.duration_since(UNIX_EPOCH);

    println!("{:?}", timestamp); // Ok(1786166013.4200099s)
}
```





#### elapsed

返回此系统时间与当前时钟时间的差异。

```rust
pub fn elapsed(&self) -> Result<Duration, SystemTimeError>
```

**返回值**：返回当前系统时间，与此`SystemTime`创建时的时间差异，包含在`Ok`中，如果 self 晚于当前系统时间，则返回 `Err`，

```rust
use std::{
    thread::sleep,
    time::{Duration, SystemTime},
};
fn main() {
    let now = SystemTime::now();
    sleep(Duration::from_secs(1));
    println!("{:?}", now.elapsed()); //Ok(1.0006042s)
}
```

源码

```rust
pub fn elapsed(&self) -> Result<Duration, SystemTimeError> {
    SystemTime::now().duration_since(*self)
}
```

:::tip

这个函数可能会失败，因为底层系统时钟容易受到漂移和更新的影响 (例如，系统时钟可能会倒退)，所以这个函数可能并不总是成功。 如果成功，则返回 `Ok(Duration)`，其中持续时间表示从这次时间测量到当前时间所经过的时间。

为了可靠地测量经过时间，请改用 `Instant`。

如果 self 晚于当前系统时间，则返回 `Err`，并且错误包含距当前系统时间 self 多远的时间。

:::



#### check_add

如果 `t` 可以表示为 `SystemTime` (表示它在底层数据结构体的边界之内)，则返回 `Some(t)`，其中 `t` 是 `self + duration` 的时间，否则返回 `None`。

```rust
pub fn checked_add(&self, duration: Duration) -> Option<SystemTime>
```



#### check_sub

如果 `t` 可以表示为 `SystemTime` (表示它在底层数据结构体的边界之内)，则返回 `Some(t)`，其中 `t` 是 `self - duration` 的时间，否则返回 `None`。

```rust
pub fn checked_sub(&self, duration: Duration) -> Option<SystemTime>
```





## Trait Implementations

### impl Add\<Duration> for SystemTime

#### add

与`Duration`相加

```rust
fn add(self, dur: Duration) -> SystemTime
```

Panics

如果生成的时间点无法由底层数据结构表示，则此函数可能出现 panic。 没有 panic 的版本，请参见 SystemTime::checked_add。



#### Output 

应用 + 运算符后的结果类型。

```rust
type Output = SystemTime
```



### impl AddAssign\<Duration> for SystemTime

#### add_assign

执行 += 操作。 

```rust
fn add_assign(&mut self, other: Duration)
```



### impl Clone for SystemTime

#### clone

返回值的副本。 

```rust
fn clone(&self) -> SystemTime
```



#### clone_from

从 source执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### impl Debug for SystemTime

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result
```



### impl Hash for SystemTime

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



### impl Ord for SystemTime

#### cmp

此方法返回 self 和 other 之间的 Ordering。 

```rust
fn cmp(&self, other: &SystemTime) -> Ordering
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



### impl PartialEq\<SystemTime> for SystemTime

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &SystemTime) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### impl PartialOrd\<SystemTime> for SystemTime

#### partial_cmp

如果存在，则此方法返回 self 和 other 值之间的顺序。 

```rust
fn partial_cmp(&self, other: &SystemTime) -> Option<Ordering>
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



### impl Sub\<Duration> for SystemTime

#### Output 

应用 `-` 运算符后的结果类型。

```rust
type Output = SystemTime
```



#### sub

执行 `-` 操作。 

```rust
fn sub(self, dur: Duration) -> SystemTime
```



### impl SubAssign\<Duration> for SystemTime

#### sub_assign

执行 `-=` 操作。 

```rust
fn sub_assign(&mut self, other: Duration)
```



### impl Copy for SystemTime

### impl Eq for SystemTime

### impl StructuralEq for SystemTime

### impl StructuralPartialEq for SystemTime



## Auto Trait Implementations

### impl RefUnwindSafe for SystemTime

### impl Send for SystemTime

### impl Sync for SystemTime

### impl Unpin for SystemTime

### impl UnwindSafe for SystemTime



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