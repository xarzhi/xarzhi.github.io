# Module std::convert

用于类型之间的转换 traits。

此模块中的 traits 提供了一种从一种类型转换为另一种类型的方法。 每个 trait 都有不同的用途：

- 实现 `AsRef` trait 以实现廉价的引用到引用转换
- 实现 `AsMut` trait 进行廉价的变量到变量转换
- 实现 `From` trait 以进行值到值的转换
- 实现 `Into` trait，以便将值转换为当前 crate 之外的类型
- `TryFrom` 和 `TryInto` traits 的行为类似于 `From` 和 `Into`，但应在转换失败时实现。

此模块中的 traits 通常用作泛型函数的 trait bounds，以便支持多种类型的参数。有关示例，请参见每个 trait 的文档。

作为库作者，您应该总是更喜欢实现 `From<T>` 或 `TryFrom<T>`，而不是 `Into<U>` 或 `TryInto<U>`，因为 `From` 和 `TryFrom` 提供了更大的灵活性，并免费提供了等效的 `Into` 或 `TryInto` 实现，这要归功于标准库中的全面实现。 当定位到 Rust 1.41 之前的版本时，当转换为当前 crate 之外的类型时，可能有必要直接实现 `Into` 或 `TryInto`。



## 泛型实现

- 如果内部类型是引用，则 AsRef 和 AsMut 自动解引用 (但通常不适用于所有 dereferenceable types)
- `From<U>` for T 意味着 `Into<T>` for U
- `TryFrom<U>` for T 意味着 `TryInto<T>` for U
- `From` 和 `Into` 是反射的，这意味着所有类型都可以 into 自己和 from 自己

有关用法示例，请参见每个 trait。



## Enums

**Infallible**：永远不会发生的错误的错误类型。



## Traits

**FloatToIntExperimental**：支持 f32 和 f64 的固有方法 (例如 to_int_unchecked) 的 trait。 通常不需要直接使用。

**AsMut**：用于进行廉价的可变到可变引用转换。

**AsRef**：用于执行廉价的引用到引用转换。

**From**：用于在消耗输入值的同时进行值到值的转换。它是 Into 的倒数。

**Into**：消耗输入值的值到值转换。与 From 相反。

**TryFrom**：简单安全的类型转换在某些情况下可能会以受控方式失败。它是 TryInto 的倒数。

**TryInto**：消耗 self 的尝试转换，这可能很昂贵，也可能不昂贵。



## Functions

**identity**	identity 函数。