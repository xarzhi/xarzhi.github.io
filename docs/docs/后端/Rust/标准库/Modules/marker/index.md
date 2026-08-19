# Module std::markerCopy

代表类型基本属性的原始 traits 和类型。

Rust 类型可以根据其固有属性以各种有用的方式进行分类。 这些分类表示为 traits。



## Structs

- PhantomData：零大小的类型用来标记那些行为像它们拥有一个 T 的东西。
- PhantomPinned：没有实现 Unpin 的标记类型。



## Traits

以下Experimental实验性Trait就不添加在本地了

- [ConstParamTy](https://www.rustwiki.org.cn/zh-CN/std/marker/trait.ConstParamTy.html)：`Experimental`可用作 `const` 泛型参数类型的类型的标记。
- [Destruct](https://www.rustwiki.org.cn/zh-CN/std/marker/trait.Destruct.html)：`Experimental`可以丢弃的类型的标记。
- [DiscriminantKind](https://www.rustwiki.org.cn/zh-CN/std/marker/trait.DiscriminantKind.html)：`Experimental`编译器内部的 trait 用于指示枚举判别式的类型。
- [FnPtr](https://www.rustwiki.org.cn/zh-CN/std/marker/trait.FnPtr.html)：`Experimental`由所有函数指针实现的公共 trait。
- [PointerLike](https://www.rustwiki.org.cn/zh-CN/std/marker/trait.PointerLike.html)：`Experimental`类指针类型的标记。
- [StructuralEq](https://www.rustwiki.org.cn/zh-CN/std/marker/trait.StructuralEq.html)：`Experimental`模式匹配中使用的常量的必需 trait。
- [StructuralPartialEq](https://www.rustwiki.org.cn/zh-CN/std/marker/trait.StructuralPartialEq.html)：`Experimental`模式匹配中使用的常量的必需 trait。
- [Tuple](https://www.rustwiki.org.cn/zh-CN/std/marker/trait.Tuple.html)：`Experimental`元组类型的标记。
- [Unsize](https://www.rustwiki.org.cn/zh-CN/std/marker/trait.Unsize.html)：`Experimental`可以把没有大小的类型改为动态大小的类型。



以下常用可在[Traits](./Traits/Copy)中查看

- [Copy](./Traits/Copy)：只需复制位即可复制其值的类型。
- [Send](./Traits/Send)：可以跨线程边界传输的类型。
- [Sized](./Traits/Sized)：在编译时已知大小为常量的类型。
- [Sync](./Traits/Sync)：可以在线程之间安全共享引用的类型。
- [Unpin](./Traits/Unpin)：固定后可以安全移动的类型。



## Derive Macros

- ConstParamTy：派生宏生成 trait ConstParamTy 的一个 impl。
- Copy：派生宏，生成 Copy trait 的 impl。