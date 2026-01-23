# 布尔类型

布尔类型只表示两种真值，不与数字互转，这能防止很多隐式转换陷阱。与控制流（`if`/`while`）结合时，编译器要求条件表达式必须是 `bool`，从而让代码更清晰、更安全。

**布尔类型的默认值都为`false`**

```rust
let t = true;                  // bool类型
let f: bool = false;           // 显式标注

// 布尔运算
let and_result = t && f;       // false
let or_result = t || f;        // true  
let not_result = !t;           // false
```

**特点**：占用1字节，只能是`true`或`false`，不能与数字隐式转换。