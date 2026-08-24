# Module std::path

跨平台路径操作。

该模块提供两种类型，即 `PathBuf` 和 `Path` (类似于 `String` 和 `str`)，用于抽象地处理路径。 这些类型分别是围绕 `OsString` 和 `OsStr` 的薄包装器，这意味着它们根据本地平台的路径语法直接在字符串上工作。

通过遍历 `Path` 上 `components` 方法返回的结构体，可以将路径解析为 `Component`。`Component` 大致对应于路径分隔符 (/ 或 \) 之间的子字符串。 您可以使用 `PathBuf` 上的 `push` 方法从组件重建等效路径； 请注意，根据 `components` 方法文档中描述的规范化，路径可能在语法上有所不同。



## 区分大小写

除非另有说明，否则不访问文件系统的路径方法，例如 `Path::starts_with` 和 `Path::ends_with`，无论平台或文件系统如何都区分大小写。 `Windows` 驱动器盘符例外。



### 使用简单

路径操作既包括从切片中解析组件，也包括构建新的拥有的路径。

要解析路径，您可以从 `str` 切片创建`Path`切片并开始提出问题：

```rust
use std::path::Path;
use std::ffi::OsStr;

let path = Path::new("/tmp/foo/bar.txt");

let parent = path.parent();
assert_eq!(parent, Some(Path::new("/tmp/foo")));

let file_stem = path.file_stem();
assert_eq!(file_stem, Some(OsStr::new("bar")));

let extension = path.extension();
assert_eq!(extension, Some(OsStr::new("txt")));
```

要构建或修改路径，请使用 `PathBuf`：

```rust
use std::path::PathBuf;

// 这种方式有效...
let mut path = PathBuf::from("c:\\");

path.push("windows");
path.push("system32");

path.set_extension("dll");

// ... 但是如果您不了解所有内容，则最好使用推送。
// 如果您这样做，则这种方法更好：
let path: PathBuf = ["c:\\", "windows", "system32.dll"].iter().collect();
```





## Structs

- **Ancestors**：Path 及其祖先上的迭代器。
- **Components**：Path 的 Component 上的迭代器。
- **Display**：Helper 结构体，用于使用 format! 和 {} 安全地打印路径。
- **Iter**：Path 的 Component 上的迭代器，作为 OsStr 切片。
- **Path**：路径的切片 (类似于 str)。
- **PathBuf**：拥有的可变路径 (类似于 String)。
- **PrefixComponent**：包装 Windows 路径前缀及其未解析的字符串表示形式的结构体。
- **StripPrefixError**：如果找不到前缀，则从 Path::strip_prefix 返回错误。



## Enums

- **Component**：路径的单个组成部分。
- **Prefix**：Windows 路径前缀，例如 C: 或 \\server\share。



## Constants

- **MAIN_SEPARATOR**：当前平台的路径组件的主要分隔符。
- **MAIN_SEPARATOR_STR**：当前平台的路径组件的主要分隔符。



## Functions

- **absolute**：`Experimental`在不访问文件系统的情况下使路径成为绝对路径。
- **is_separator**：确定字符是否为当前平台允许的路径分隔符之一。