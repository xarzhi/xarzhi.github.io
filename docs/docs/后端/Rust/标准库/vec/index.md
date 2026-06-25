# Module std::vec



具有堆已分配内容的连续可增长数组类型，写为 `Vec<T>`。

Vectors 有 *O*(1) 索引，摊销 *O*(1) push (到最后) 和 *O*(1) pop (从最后)。

Vectors 确保它们分配的字节数永远不会超过 `isize::MAX` 字节。