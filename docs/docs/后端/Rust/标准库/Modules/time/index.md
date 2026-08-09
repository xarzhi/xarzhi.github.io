# Module std::time

时间量化

有多种方法可以创建新的 `Duration`

```rust
let five_seconds = Duration::from_secs(5);
assert_eq!(five_seconds, Duration::from_millis(5_000));
assert_eq!(five_seconds, Duration::from_micros(5_000_000));
assert_eq!(five_seconds, Duration::from_nanos(5_000_000_000));

let ten_seconds = Duration::from_secs(10);
let seven_nanos = Duration::from_nanos(7);
let total = ten_seconds + seven_nanos;
assert_eq!(total, Duration::new(10, 7));
```

使用 `Instant` 计算函数运行所需的时间：

```rust
let now = Instant::now();

// 调用慢函数可能需要一段时间
slow_function();

let elapsed_time = now.elapsed();
println!("Running slow_function() took {} seconds.", elapsed_time.as_secs());
```





## Structs

- **Duration**：`Duration` 类型代表时间跨度，通常用于系统超时。
- **Instant**：单调非递减时钟的度量。 不透明且仅对 `Duration` 有用。
- **SystemTime**：系统时钟的度量，对于与文件系统或其他进程之类的外部实体进行通信很有用。
- **SystemTimeError**：`SystemTime` 的 `duration_since` 和 `elapsed` 方法返回的错误，用于了解系统时间在相反方向上的距离。
- **TryFromFloatSecsError**：将秒的浮点值转换为 `Duration` 时可能返回的错误。



## Constants

### UNIX_EPOCH

`UNIX` 纪元，代表 `1970-01-01 00:00:00 UTC`

此常量在所有系统上均定义为 `1970-01-01 00:00:00 UTC`。

```rust
pub const UNIX_EPOCH: SystemTime;
```

该时间戳在各大语言都有定义，具体值为`116444736000000000`

```rust
use std::time::UNIX_EPOCH;

fn main() {
    println!("{:?}", UNIX_EPOCH); // SystemTime { intervals: 116444736000000000 }
}
```

在现有的 `SystemTime`实例上使用 `duration_since` 可以告诉您测量距离该时间点有多远，也就是时间戳

```rust
use std::time::{SystemTime, UNIX_EPOCH};

fn main() {
    let now = SystemTime::now().duration_since(UNIX_EPOCH);
    println!("{:?}", now.unwrap()); // 1785848521.2838036s
}
```





:::tip 116444736000000000是什么

`116444736000000000`是这是从 **1601-01-01 00:00:00 UTC** 到 **1970-01-01 00:00:00 UTC** 的总 100ns 刻度数

从 `1601-01-01` 到 `1970-01-01` 一共369年，一共**134,774 天**

```txt
134,774 天
× 24 小时
× 3600 秒
× 10,000,000 (1秒 = 10^7 个 100ns)
= 134774 × 86400 × 10^7
= 11,644,473,600 × 10^7
= 116,444,736,000,000,000
```

100ns就是100纳秒，至于为什么不是1纳秒而是100纳米，我也母鸡

```txt
1秒 = 1,000,000,000纳秒  
1 ns = 十亿分之一秒
```

:::