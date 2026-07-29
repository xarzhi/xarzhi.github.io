# Module std::slice

切片原始类型的实用工具。

该模块中的大部分结构体都是迭代器类型，只能使用某个函数创建。 例如，`slice.iter()` 产生一个 `Iter`。

提供了一些函数来从值引用或裸指针创建切片。





## Struct

- **Chunks**：在 (non-overlapping) 块 (一次 chunk_size 元素) 中的切片上进行迭代，从切片的开头开始。
- **ChunksExact**：在 (non-overlapping) 块 (一次 chunk_size 元素) 中的切片上进行迭代，从切片的开头开始。
- **ChunksExactMut**：在 (non-overlapping) 可变块 (一次 chunk_size 元素) 中的切片上进行迭代，从切片的开头开始。
- **ChunksMut**：在 (non-overlapping) 可变块 (一次 chunk_size 元素) 中的切片上进行迭代，从切片的开头开始。
- **EscapeAscii**：一个字节的转义版本的迭代器。
- **Iter**：不可变切片迭代器
- **IterMut**：可变切片迭代器。
- **RChunks**：在 (non-overlapping) 块 (一次 chunk_size 元素) 中的切片上进行迭代，从切片的末尾开始。
- **RChunksExact**：在 (non-overlapping) 块 (一次 chunk_size 元素) 中的切片上进行迭代，从切片的末尾开始。
- **RChunksExactMut**：从切片末尾开始，在 (non-overlapping) 可变块 (一次 chunk_size 个元素) 中的切片上进行迭代。
- **RChunksMut**：从切片末尾开始，在 (non-overlapping) 可变块 (一次 chunk_size 个元素) 中的切片上进行迭代。
- **RSplit**：从切片的末尾开始，由与谓词函数匹配的元素分隔的子切片上的迭代器。
- **RSplitMut**：vector 的子切片上的迭代器，该迭代器由与 pred 匹配的元素分隔，从切片的末尾开始。
- **RSplitN**：在子切片上进行迭代的迭代器，这些子切片由与谓词函数匹配的元素分隔，从切片的末尾开始，并限于给定的拆分数。
- **RSplitNMut**：在子切片上进行迭代的迭代器，这些子切片由与谓词函数匹配的元素分隔，从切片的末尾开始，并限于给定的拆分数。
- **Split**：在子切片上进行迭代的迭代器，这些子切片由与谓词函数匹配的元素分隔。
- **SplitInclusive**：在子切片上进行迭代的迭代器，这些子切片由与谓词函数匹配的元素分隔。 与 Split 不同，它包含匹配的部分作为子切片的终止符。
- **SplitInclusiveMut**：vector 的可变子切片上的迭代器，该子切片由与 pred 匹配的元素分隔。 与 SplitMut 不同，它在子切片的末尾包含匹配的部分。
- **SplitMut**：vector 的可变子切片上的迭代器，该子切片由与 pred 匹配的元素分隔。
- **SplitN**：在子切片上进行迭代的迭代器，这些子切片由与谓词函数匹配的元素分隔，限于给定的拆分数。
- **SplitNMut**：在子切片上进行迭代的迭代器，这些子切片由与谓词函数匹配的元素分隔，限于给定的拆分数。
- **Windows**：长度为 size 的重叠子切片上的迭代器。







## Traits

- **SliceIndex**：用于索引操作的辅助 trait。





## Functions

- **from_mut**：将引用转换为 T 转换为长度为 1 的切片 (不进行复制)。
- **from_raw_parts**：根据指针和长度形成切片。
- **from_raw_parts_mut**：执行与 from_raw_parts 相同的功能，除了返回可变切片。
- **from_ref**：将引用转换为 T 转换为长度为 1 的切片 (不进行复制)。



#### from_mut。

#### from_raw_parts

#### from_raw_parts_mut

### from_ref

