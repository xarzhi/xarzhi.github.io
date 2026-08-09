# Struct std::time::Duration

`Duration` 类型代表时间跨度，通常用于系统超时。

每个 `Duration` 由整数秒和以纳秒表示的小数部分组成。 如果底层系统不支持纳秒级精度，则绑定系统超时的 API 通常会将纳秒数四舍五入。

```rust
pub struct Duration { /* private fields */ }
```

`Duration` 实现了许多常见的 traits，包括 `Add`，`Sub` 和其他 `ops` traits。它通过返回零长度 `Duration` 来实现 `Default`。



```rust
use std::time::Duration;

let five_seconds = Duration::new(5, 0);
let five_seconds_and_five_nanos = five_seconds + Duration::new(0, 5);

assert_eq!(five_seconds_and_five_nanos.as_secs(), 5);
assert_eq!(five_seconds_and_five_nanos.subsec_nanos(), 5);

let ten_millis = Duration::from_millis(10);
```



:::tip 格式化 Duration 值

`Duration` 故意不实现 `Display` impl，因为有多种方法可以设置时间跨度的格式，以提高人类的可读性。 `Duration` 提供了一个 `Debug` impl，它显示了值的完整精度。

`Debug` 输出使用非 ASCII “µs” 后缀微秒。 如果您的程序输出可能出现在不依赖于完全 Unicode 兼容性的上下文中，则您可能希望自己格式化 `Duration` 对象或使用 crate 这样做。

:::





## Implementations

### impl Duration

#### SECOND

`nightly-only`

持续时间为一秒。

```rust
pub const SECOND: Duration = Duration::from_secs(1)
```



#### MILLISECOND

`nightly-only`

一毫秒的持续时间。

```rust
pub const MILLISECOND: Duration = Duration::from_millis(1)
```



#### MICROSECOND

`nightly-only`

一微秒的持续时间。

```rust
pub const MICROSECOND: Duration = Duration::from_micros(1)
```



#### NANOSECOND

`nightly-only`

一纳秒的持续时间。

```rust
pub const NANOSECOND: Duration = Duration::from_nanos(1)
```



#### ZERO

`nightly-only`

持续时间为零。

```rust
pub const ZERO: Duration = Duration::from_nanos(0)
```



#### MAX

`nightly-only`

最大持续时间。

根据平台的需要可能有所不同。 必须能够包含两个 `Instant` 实例或两个 `SystemTime` 实例之间的差异。 该约束使其在实践中的值约为 `584,942,417,355` 年，目前在所有平台上都使用。

```rust
pub const MAX: Duration = Duration::new(u64::MAX, NANOS_PER_SEC - 1)
```





#### new

根据指定的整数秒数和其他纳秒数创建一个新的 `Duration`。

```rust
pub const fn new(secs: u64, nanos: u32) -> Duration
```

**参数**：

- **secs**：秒数
- **nanos**：纳秒数，1秒=10亿纳秒

**返回值**：返回一个`Duration`实例

```rust
use std::time::Duration;

fn main() {
    let t = Duration::new(10, 10);
    println!("{:#?}", t); // 10.00000001s
}
```

如果纳秒数大于 10 亿 (十亿分之一秒)，则它将进位到提供的秒数中。

```rust
use std::time::Duration;

fn main() {
    let t = Duration::new(10, 1000000001);
    println!("{:#?}", t); // 11.000000001s
}

```

:::tip panic

如果纳秒的进位溢出秒计数器，也就是大于`u32`的`MAX`，则此构造方法将为 panic。

::



#### from_scec

根据指定的整数秒创建一个新的 `Duration`。

```rust
pub const fn from_secs(secs: u64) -> Duration
```

**参数**：

- **secs**：秒数

**返回值**：返回一个`Duration`实例

```rust
use std::time::Duration;

let duration = Duration::from_secs(5);

assert_eq!(5, duration.as_secs());
assert_eq!(0, duration.subsec_nanos());
```



#### from_millis

从指定的毫秒数创建一个新的 `Duration`。

```rust
pub const fn from_millis(millis: u64) -> Duration
```

**参数**：

- **millis**：毫秒数

**返回值**：返回一个`Duration`实例

```rust
use std::time::Duration;

let duration = Duration::from_millis(2569);

assert_eq!(2, duration.as_secs());
assert_eq!(569_000_000, duration.subsec_nanos());
```



#### from_micros

从指定的微秒数创建一个新的 `Duration`。

```rust
pub const fn from_micros(micros: u64) -> Duration
```

**参数**：

- **micros**：微秒数

**返回值**：返回一个`Duration`实例

```rust
use std::time::Duration;

let duration = Duration::from_micros(1_000_002);

assert_eq!(1, duration.as_secs());
assert_eq!(2000, duration.subsec_nanos());
```



#### from_nanos

从指定的纳秒数创建一个新的 `Duration`。

```rust
pub const fn from_nanos(nanos: u64) -> Duration
```

**参数**：

- **nanos**：纳秒数

**返回值**：返回一个`Duration`实例

```rust
use std::time::Duration;

let duration = Duration::from_nanos(1_000_000_123);

assert_eq!(1, duration.as_secs());
assert_eq!(123, duration.subsec_nanos());
```



#### is_zero

判断此`Duration`是否没有时间长度（秒数和纳秒数是否都为0）

```rust
pub const fn is_zero(&self) -> bool
```

**返回值**：根据此`Duration`是否有时间长度，返回`bool`值

```rust
fn main() {
    use std::time::Duration;

    println!("{:#?}", Duration::ZERO.is_zero()); // true
    println!("{:#?}", Duration::new(0, 0).is_zero()); // true
    println!("{:#?}", Duration::from_nanos(0).is_zero()); // true
    println!("{:#?}", Duration::from_secs(0).is_zero()); // true

    println!("{:#?}", Duration::new(1, 1).is_zero()); // false
    println!("{:#?}", Duration::from_nanos(1).is_zero()); // false
    println!("{:#?}", Duration::from_secs(1).is_zero()); // false
}
```



#### as_secs

返回此 `Duration` 包含的整秒数，不会四舍五入，直接截断后面的小数部分

```rust
pub const fn as_secs(&self) -> u64
```

**返回值**：返回`Duration`的整秒数

```rust
use std::time::Duration;

let duration = Duration::new(5, 730023852);
assert_eq!(duration.as_secs(), 5);
```





#### as_millis

把此`Duration`转化为毫秒并返回

```rust
pub const fn as_millis(&self) -> u128
```

**返回值**：返回`Duration`转化为毫秒的毫秒数

```rust
use std::time::Duration;

let duration = Duration::new(5, 730023852);
assert_eq!(duration.as_millis(), 5730);
```



#### as_micros

把此`Duration`转化为微秒并返回

```rust
pub const fn as_micros(&self) -> u128
```

**返回值**：返回`Duration`转化为微秒的微秒数

```rust
use std::time::Duration;

let duration = Duration::new(5, 730023852);
assert_eq!(duration.as_micros(), 5730023);
```



#### as_nanos

把此`Duration`转化为纳秒并返回

```rust
pub const fn as_nanos(&self) -> u128
```

**返回值**：返回`Duration`转化为微秒的微秒数

```rust
use std::time::Duration;

let duration = Duration::new(5, 730023852);
assert_eq!(duration.as_nanos(), 5730023852);
```



#### subsec_millis

**以毫秒为单位**返回此 `Duration` 的**小数部分**。

当以毫秒表示时，这个方法不会返回持续时间的长度。 返回的数字始终代表秒的小数部分 (即，小于一千)。

```rust
pub const fn subsec_millis(&self) -> u32
```

**返回值**：返回`Duration`的毫秒数

```rust
use std::time::Duration;

let duration = Duration::from_millis(5432);
assert_eq!(duration.as_secs(), 5);
assert_eq!(duration.subsec_millis(), 432);
```



#### subsec_micros

**以整个微秒为单位**返回此 `Duration` 的**小数部分**。

当以微秒表示时，这个方法不会返回持续时间的长度。 返回的数字始终代表秒的小数部分 (即，小于一百万)。

```rust
pub const fn subsec_micros(&self) -> u32
```

**返回值**：返回`Duration`的微秒数

```rust
use std::time::Duration;

let duration = Duration::from_micros(1_234_567);
assert_eq!(duration.as_secs(), 1);
assert_eq!(duration.subsec_micros(), 234_567);
```



#### subsec_nanos

**以纳秒为单位**返回此 `Duration` 的**小数部分**

当以纳秒表示时，这个方法不会返回持续时间的长度。 返回的数字始终代表秒的小数部分 (即，小于十亿)。

```rust
pub const fn subsec_nanos(&self) -> u32
```

**返回值**：返回`Duration`的纳秒数

```rust
use std::time::Duration;

let duration = Duration::from_millis(5010);
assert_eq!(duration.as_secs(), 5);
assert_eq!(duration.subsec_nanos(), 10_000_000);
```





#### checked_add

检查 `Duration` 的添加。 计算 `self + other`，如果发生溢出则返回 `None`。

```rust
pub const fn checked_add(self, rhs: Duration) -> Option<Duration>
```

**参数**：

- **rhs**：相加操作的右值

**返回值**：返回相加后的结果`Duration`，包含在`Some`里，如果发生溢出则返回 `None`。

```rust
use std::time::Duration;

assert_eq!(Duration::new(0, 0).checked_add(Duration::new(0, 1)), Some(Duration::new(0, 1)));
assert_eq!(Duration::new(1, 0).checked_add(Duration::new(u64::MAX, 0)), None);
```



#### saturating_add

`Duration` 饱和添加。 计算 `self + other`，如果发生溢出则返回 [`Duration::MAX`](#MAX)。

```rust
pub const fn saturating_add(self, rhs: Duration) -> Duration
```

**参数**：

- **rhs**：相加操作的右值

**返回值**：返回一个`Duration`，如果发生溢出则返回 [`Duration::MAX`](#MAX)。

```rust
#![feature(duration_constants)]
use std::time::Duration;

assert_eq!(Duration::new(0, 0).saturating_add(Duration::new(0, 1)), Duration::new(0, 1));
assert_eq!(Duration::new(1, 0).saturating_add(Duration::new(u64::MAX, 0)), Duration::MAX);
```



#### checked_sub

检查 `Duration` 减法。 计算 `self - other`，如果结果为负或发生溢出，则返回 `None`。

```rust
pub const fn checked_sub(self, rhs: Duration) -> Option<Duration>
```

**参数**：

- **rhs**：相减操作的右值

**返回值**：返回相减后的结果`Duration`，包含在`Some`里，如果结果为负或发生溢出，则返回 `None`。

```rust
use std::time::Duration;

assert_eq!(Duration::new(0, 1).checked_sub(Duration::new(0, 0)), Some(Duration::new(0, 1)));
assert_eq!(Duration::new(0, 0).checked_sub(Duration::new(0, 1)), None);
```



#### saturating_sub

`Duration` 减法饱和。 计算 `self - other`，如果结果为负或发生溢出，则返回 [`Duration::ZERO`](#ZERO)。

```rust
pub const fn saturating_sub(self, rhs: Duration) -> Duration
```

**参数**：

- **rhs**：相减操作的右值

**返回值**：返回一个`Duration`，如果结果为负或发生溢出，则返回 [`Duration::ZERO`](#ZERO)。

```rust
use std::time::Duration;

assert_eq!(Duration::new(0, 1).saturating_sub(Duration::new(0, 0)), Duration::new(0, 1));
assert_eq!(Duration::new(0, 0).saturating_sub(Duration::new(0, 1)), Duration::ZERO);
```



#### checked_mul

检查 `Duration` 乘法。 计算 `self * other`，如果发生溢出则返回 `None`

```rust
pub const fn checked_mul(self, rhs: u32) -> Option<Duration>
```

**参数**：

- **rhs**：相乘操作的右值

**返回值**：返回相乘后的结果`Duration`，包含在`Some`里，如果发生溢出，则返回 `None`。

```rust
use std::time::Duration;

assert_eq!(Duration::new(0, 500_000_001).checked_mul(2), Some(Duration::new(1, 2)));
assert_eq!(Duration::new(u64::MAX - 1, 0).checked_mul(2), None);
```



#### saturating_mul

饱和 `Duration` 乘法。 计算 `self * other`，如果发生溢出则返回 [`Duration::MAX`](#MAX)。

```rust
pub const fn saturating_mul(self, rhs: u32) -> Duration
```

**参数**：

- **rhs**：相乘操作的右值

**返回值**：返回一个`Duration`，如果发生溢出，则返回 [`Duration::MAX`](#MAX)。

```rust
#![feature(duration_constants)]
use std::time::Duration;

assert_eq!(Duration::new(0, 500_000_001).saturating_mul(2), Duration::new(1, 2));
assert_eq!(Duration::new(u64::MAX - 1, 0).saturating_mul(2), Duration::MAX);
```



#### checked_div

检查 `Duration` 分区。 计算 `self / other`，如果为 `other == 0`，则返回`None`。

```rust
pub const fn checked_div(self, rhs: u32) -> Option<Duration>
```

**参数**：

- **rhs**：相除操作的右值

**返回值**：返回相除后的结果`Duration`，包含在`Some`里，如果为 `other == 0`，则返回`None`。

```rust
use std::time::Duration;

assert_eq!(Duration::new(2, 0).checked_div(2), Some(Duration::new(1, 0)));
assert_eq!(Duration::new(1, 0).checked_div(2), Some(Duration::new(0, 500_000_000)));
assert_eq!(Duration::new(2, 0).checked_div(0), None);
```



#### as_secs_f64

把`Duration`转化为`f64`类型的秒数返回

```rust
pub fn as_secs_f64(&self) -> f64
```

**返回值**：返回转化为`f64`的秒数

```rust
use std::time::Duration;

let dur = Duration::new(2, 700_000_000);
assert_eq!(dur.as_secs_f64(), 2.7);
```



#### as_secs_f32

把`Duration`转化为`f32`类型的秒数返回

```rust
pub fn as_secs_f32(&self) -> f32
```

**返回值**：返回转化为`f32`的秒数

```rust
use std::time::Duration;

let dur = Duration::new(2, 700_000_000);
assert_eq!(dur.as_secs_f32(), 2.7);
```



#### from_secs_f64

以一个`f64`类型的秒数，创建一个`Duration`

```rust
pub fn from_secs_f64(secs: f64) -> Duration
```

**参数**：

- **secs**：秒数

**返回值**：返回一个`Duration`

```rust
use std::time::Duration;

let res = Duration::from_secs_f64(0.0);
assert_eq!(res, Duration::new(0, 0));
let res = Duration::from_secs_f64(1e-20);
assert_eq!(res, Duration::new(0, 0));
let res = Duration::from_secs_f64(4.2e-7);
assert_eq!(res, Duration::new(0, 420));
let res = Duration::from_secs_f64(2.7);
assert_eq!(res, Duration::new(2, 700_000_000));
let res = Duration::from_secs_f64(3e10);
assert_eq!(res, Duration::new(30_000_000_000, 0));
// subnormal 浮点
let res = Duration::from_secs_f64(f64::from_bits(1));
assert_eq!(res, Duration::new(0, 0));
// 转换使用舍入
let res = Duration::from_secs_f64(0.999e-9);
assert_eq!(res, Duration::new(0, 1));
```

:::tip panic

如果 `secs` 为 negative、溢出 `Duration` 或不是有限的，此构造函数将出现 panic。

:::



#### from_secs_f32

以一个`f32`类型的秒数，创建一个`Duration`

```rust
pub fn from_secs_f32(secs: f32) -> Duration
```

**参数**：

- **secs**：秒数

**返回值**：返回一个`Duration`

```rust
use std::time::Duration;

let res = Duration::from_secs_f32(0.0);
assert_eq!(res, Duration::new(0, 0));
let res = Duration::from_secs_f32(1e-20);
assert_eq!(res, Duration::new(0, 0));
let res = Duration::from_secs_f32(4.2e-7);
assert_eq!(res, Duration::new(0, 420));
let res = Duration::from_secs_f32(2.7);
assert_eq!(res, Duration::new(2, 700_000_048));
let res = Duration::from_secs_f32(3e10);
assert_eq!(res, Duration::new(30_000_001_024, 0));
// subnormal 浮点
let res = Duration::from_secs_f32(f32::from_bits(1));
assert_eq!(res, Duration::new(0, 0));
// 转换使用舍入
let res = Duration::from_secs_f32(0.999e-9);
assert_eq!(res, Duration::new(0, 1));
```

:::tip panic

如果 `secs` 为 negative、溢出 `Duration` 或不是有限的，此构造函数将出现 panic。

:::



#### mul_f64

将 `Duration` 乘以一个 `f64`的值。

```rust
pub fn mul_f64(self, rhs: f64) -> Duration
```

**参数**：

- **rhs**：相乘操作的右值

**返回值**：返回一个相乘后的`Duration`

```rust
use std::time::Duration;

let dur = Duration::new(2, 700_000_000);
assert_eq!(dur.mul_f64(3.14), Duration::new(8, 478_000_000));
assert_eq!(dur.mul_f64(3.14e5), Duration::new(847_800, 0));
```



#### mul_f32

将 `Duration` 乘以一个 `f32`的值。

```rust
pub fn mul_f32(self, rhs: f32) -> Duration
```

**参数**：

- **rhs**：相乘操作的右值

**返回值**：返回一个相乘后的`Duration`

```rust
use std::time::Duration;

let dur = Duration::new(2, 700_000_000);
assert_eq!(dur.mul_f32(3.14), Duration::new(8, 478_000_641));
assert_eq!(dur.mul_f32(3.14e5), Duration::new(847800, 0));
```



#### div_f64

将 `Duration` 除以一个 `f64`的值。

```rust
pub fn div_f64(self, rhs: f64) -> Duration
```

**参数**：

- **rhs**：相除操作的右值

**返回值**：

```rust
use std::time::Duration;

let dur = Duration::new(2, 700_000_000);
assert_eq!(dur.div_f64(3.14), Duration::new(0, 859_872_611));
assert_eq!(dur.div_f64(3.14e5), Duration::new(0, 8_599));
```



#### div_f32

将 `Duration` 除以一个 `f32`的值。

```rust
pub fn div_f32(self, rhs: f32) -> Duration
```

**参数**：

- **rhs**：相除操作的右值

**返回值**：

```rust
use std::time::Duration;

let dur = Duration::new(2, 700_000_000);
// 请注意，由于舍入错误，结果与 0.859_872_611 略有不同
assert_eq!(dur.div_f32(3.14), Duration::new(0, 859_872_580));
assert_eq!(dur.div_f32(3.14e5), Duration::new(0, 8_599));
```



#### div_duration_f64

`nightly-only`

将 `Duration` 除以 `Duration`，然后返回一个 `f64`的值。

```rust
pub fn div_duration_f64(self, rhs: Duration) -> f64
```

**参数**：

- **rhs**：相除操作的右值

**返回值**：返回相除后的`f64`类型的值

```rust
#![feature(div_duration)]
use std::time::Duration;

let dur1 = Duration::new(2, 700_000_000);
let dur2 = Duration::new(5, 400_000_000);
assert_eq!(dur1.div_duration_f64(dur2), 0.5);
```



#### div_duration_f32

`nightly-only`

将 `Duration` 除以 `Duration`，然后返回一个 `f32`的值。

```rust
pub fn div_duration_f32(self, rhs: Duration) -> f32
```

**参数**：

- **rhs**：相除操作的右值

**返回值**：返回相除后的`f32`类型的值

```rust
#![feature(div_duration)]
use std::time::Duration;

let dur1 = Duration::new(2, 700_000_000);
let dur2 = Duration::new(5, 400_000_000);
assert_eq!(dur1.div_duration_f32(dur2), 0.5);
```



### impl Duration

#### try_from_secs_f32

以一个`f32`类型的秒数，创建一个`Duration`，如果 `secs` 为 negative、溢出 `Duration` 或不是有限的，则此构造函数将返回 `Err`。

```rust
pub fn try_from_secs_f32(secs: f32) -> Result<Duration, TryFromFloatSecsError>
```

**参数**：

- **secs**：秒数

**返回值**：返回一个`Result`，创建的`Duration`包含在`Ok`中，如果 `secs` 为 negative、溢出 `Duration` 或不是有限的，则此构造函数将返回 `Err`。

```rust
use std::time::Duration;

let res = Duration::try_from_secs_f32(0.0);
assert_eq!(res, Ok(Duration::new(0, 0)));
let res = Duration::try_from_secs_f32(1e-20);
assert_eq!(res, Ok(Duration::new(0, 0)));
let res = Duration::try_from_secs_f32(4.2e-7);
assert_eq!(res, Ok(Duration::new(0, 420)));
let res = Duration::try_from_secs_f32(2.7);
assert_eq!(res, Ok(Duration::new(2, 700_000_048)));
let res = Duration::try_from_secs_f32(3e10);
assert_eq!(res, Ok(Duration::new(30_000_001_024, 0)));
// subnormal 浮点:
let res = Duration::try_from_secs_f32(f32::from_bits(1));
assert_eq!(res, Ok(Duration::new(0, 0)));

let res = Duration::try_from_secs_f32(-5.0);
assert!(res.is_err());
let res = Duration::try_from_secs_f32(f32::NAN);
assert!(res.is_err());
let res = Duration::try_from_secs_f32(2e19);
assert!(res.is_err());

// 转换使用带平局分辨率的舍入来均匀
let res = Duration::try_from_secs_f32(0.999e-9);
assert_eq!(res, Ok(Duration::new(0, 1)));

// 这个浮点数正好代表 976562.5e-9
let val = f32::from_bits(0x3A80_0000);
let res = Duration::try_from_secs_f32(val);
assert_eq!(res, Ok(Duration::new(0, 976_562)));

// 这个浮点数正好代表 2929687.5e-9
let val = f32::from_bits(0x3B40_0000);
let res = Duration::try_from_secs_f32(val);
assert_eq!(res, Ok(Duration::new(0, 2_929_688)));

// 这个浮点数正好代表 1.000_976_562_5
let val = f32::from_bits(0x3F802000);
let res = Duration::try_from_secs_f32(val);
assert_eq!(res, Ok(Duration::new(1, 976_562)));

// 这个浮点数正好代表 1.002_929_687_5
let val = f32::from_bits(0x3F806000);
let res = Duration::try_from_secs_f32(val);
assert_eq!(res, Ok(Duration::new(1, 2_929_688)));
```



#### try_from_secs_f64

以一个`f64`类型的秒数，创建一个`Duration`，如果 `secs` 为 negative、溢出 `Duration` 或不是有限的，则此构造函数将返回 `Err`。

```rust
pub fn try_from_secs_f64(secs: f64) -> Result<Duration, TryFromFloatSecsError>
```

**参数**：

- **secs**：秒数

**返回值**：返回一个`Result`，创建的`Duration`包含在`Ok`中，如果 `secs` 为 negative、溢出 `Duration` 或不是有限的，则此构造函数将返回 `Err`。

```rust
use std::time::Duration;

let res = Duration::try_from_secs_f64(0.0);
assert_eq!(res, Ok(Duration::new(0, 0)));
let res = Duration::try_from_secs_f64(1e-20);
assert_eq!(res, Ok(Duration::new(0, 0)));
let res = Duration::try_from_secs_f64(4.2e-7);
assert_eq!(res, Ok(Duration::new(0, 420)));
let res = Duration::try_from_secs_f64(2.7);
assert_eq!(res, Ok(Duration::new(2, 700_000_000)));
let res = Duration::try_from_secs_f64(3e10);
assert_eq!(res, Ok(Duration::new(30_000_000_000, 0)));
// subnormal 浮点
let res = Duration::try_from_secs_f64(f64::from_bits(1));
assert_eq!(res, Ok(Duration::new(0, 0)));

let res = Duration::try_from_secs_f64(-5.0);
assert!(res.is_err());
let res = Duration::try_from_secs_f64(f64::NAN);
assert!(res.is_err());
let res = Duration::try_from_secs_f64(2e19);
assert!(res.is_err());

// 转换使用带平局分辨率的舍入来均匀
let res = Duration::try_from_secs_f64(0.999e-9);
assert_eq!(res, Ok(Duration::new(0, 1)));
let res = Duration::try_from_secs_f64(0.999_999_999_499);
assert_eq!(res, Ok(Duration::new(0, 999_999_999)));
let res = Duration::try_from_secs_f64(0.999_999_999_501);
assert_eq!(res, Ok(Duration::new(1, 0)));
let res = Duration::try_from_secs_f64(42.999_999_999_499);
assert_eq!(res, Ok(Duration::new(42, 999_999_999)));
let res = Duration::try_from_secs_f64(42.999_999_999_501);
assert_eq!(res, Ok(Duration::new(43, 0)));

// 这个浮点数正好代表 976562.5e-9
let val = f64::from_bits(0x3F50_0000_0000_0000);
let res = Duration::try_from_secs_f64(val);
assert_eq!(res, Ok(Duration::new(0, 976_562)));

// 这个浮点数正好代表 2929687.5e-9
let val = f64::from_bits(0x3F68_0000_0000_0000);
let res = Duration::try_from_secs_f64(val);
assert_eq!(res, Ok(Duration::new(0, 2_929_688)));

// 这个浮点数正好代表 1.000_976_562_5
let val = f64::from_bits(0x3FF0_0400_0000_0000);
let res = Duration::try_from_secs_f64(val);
assert_eq!(res, Ok(Duration::new(1, 976_562)));

// 这个浮点数正好代表 1.002_929_687_5
let val = f64::from_bits(0x3_FF00_C000_0000_000);
let res = Duration::try_from_secs_f64(val);
assert_eq!(res, Ok(Duration::new(1, 2_929_688)));
```





## Trait Implementations

### impl Add\<Duration> for Duration

#### Output

应用 + 运算符后的结果类型。

```rust
type Output = Duration
```



#### add

执行 + 操作。 

```rust
fn add(self, rhs: Duration) -> Duration
```



### impl Add\<Duration> for Instant

#### add

```rust
fn add(self, other: Duration) -> Instant
```



:::tip Panics

如果生成的时间点无法由底层数据结构表示，则此函数可能出现 panic。 没有 panic 的版本，请参见 Instant::checked_add。

:::



#### Output

应用 + 运算符后的结果类型。

```rust
type Output = Instant
```



### impl Add\<Duration> for SystemTime

#### add

```rust
fn add(self, dur: Duration) -> SystemTime
```

:::tip Panics

如果生成的时间点无法由底层数据结构表示，则此函数可能出现 panic。 没有 panic 的版本，请参见 SystemTime::checked_add。

:::



#### Output

应用 + 运算符后的结果类型。

```rust
type Output = SystemTime
```



### impl AddAssign\<Duration> for Duration

#### add_assign

执行 += 操作。 

```rust
fn add_assign(&mut self, rhs: Duration)
```



### impl AddAssign\<Duration> for Instant

#### add_assign

执行 += 操作。 

```rust
fn add_assign(&mut self, other: Duration)
```



### impl AddAssign\<Duration> for SystemTime

#### add_assign

执行 += 操作。 

```rust
fn add_assign(&mut self, other: Duration)
```



### impl Clone for Duration

#### clone

返回值的副本。 

```rust
fn clone(&self) -> Duration
```



#### clone_from

从 `source`执行复制分配。 

```rust
fn clone_from(&mut self, source: &Self)
```



### impl Debug for Duration

#### fmt

使用给定的格式化程序格式化该值。 

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
```



### impl Default for Duration

#### default

返回类型的 “默认值”。 

```rust
fn default() -> Duration
```



### impl Div\<u32> for Duration

#### Output

应用 / 运算符后的结果类型。

```rust
type Output = Duration
```



#### div

执行 / 操作。 

```rust
fn div(self, rhs: u32) -> Duration
```



### impl DivAssign\<u32> for Duration

#### div_assign

执行 /= 操作。 

```rust
fn div_assign(&mut self, rhs: u32)
```



### impl Hash for Duration

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



### impl Mul\<Duration> for u32

#### Output

应用 * 运算符后的结果类型。

```rust
type Output = Duration
```



#### mul

执行 * 操作。 

```rust
fn mul(self, rhs: Duration) -> Duration
```



### impl Mul\<u32> for Duration

#### Output

应用 * 运算符后的结果类型。

```rust
type Output = Duration
```



#### mul

执行 * 操作。 

```rust
fn mul(self, rhs: u32) -> Duration
```



### impl MulAssign\<u32> for Duration

#### mul_assign

执行 *= 操作。 

```rust
fn mul_assign(&mut self, rhs: u32)
```



### impl Ord for Duration

#### cmp

```rust
fn cmp(&self, other: &Duration) -> Ordering
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



### impl PartialEq\<Duration> for Duration

#### eq

此方法测试 self 和 other 值是否相等，并由 == 使用。

```rust
fn eq(&self, other: &Duration) -> bool
```



#### ne

此方法测试 !=。 默认实现几乎总是足够的，并且不应在没有充分理由的情况下被覆盖。

```rust
fn ne(&self, other: &Rhs) -> bool
```



### impl PartialOrd\<Duration> for Duration

#### partial_cmp

如果存在，则此方法返回 self 和 other 值之间的顺序。 

```rust
fn partial_cmp(&self, other: &Duration) -> Option<Ordering>
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



### impl Sub\<Duration> for Duration

#### Output

应用 - 运算符后的结果类型。

```rust
type Output = Duration
```



#### sub

执行 - 操作。 

```rust
fn sub(self, rhs: Duration) -> Duration
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



### impl Sub\<Duration> for SystemTime

#### Output

应用 - 运算符后的结果类型。

```rust
type Output = SystemTime
```



#### sub

执行 - 操作。 

```rust
fn sub(self, dur: Duration) -> SystemTime
```



### impl SubAssign\<Duration> for Duration

#### sub_assign

执行 -= 操作。 

```rust
fn sub_assign(&mut self, rhs: Duration)
```



### impl SubAssign\<Duration> for Instant

#### sub_assign

执行 -= 操作。 

```rust
fn sub_assign(&mut self, other: Duration)
```



### impl SubAssign\<Duration> for SystemTime

#### sub_assign

执行 -= 操作。 

```rust
fn sub_assign(&mut self, other: Duration)
```



### impl<'a> Sum<&'a Duration> for Duration

#### sum

使用迭代器并通过 “summing up” 项从元素生成 Self 的方法。

```rust
fn sum<I>(iter: I) -> Duration
where
  I: Iterator<Item = &'a Duration>,
```



### impl Sum\<Duration> for Duration

#### sum

使用迭代器并通过 “summing up” 项从元素生成 Self 的方法。

```rust
fn sum<I>(iter: I) -> Duration
where
  I: Iterator<Item = Duration>,
```



### impl Copy for Duration



### impl Eq for Duration



### impl StructuralEq for Duration



### impl StructuralPartialEq for Duration



## Auto Trait Implementations

### impl RefUnwindSafe for Duration

### impl Send for Duration

### impl Sync for Duration

### impl Unpin for Duration

### impl UnwindSafe for Duration



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