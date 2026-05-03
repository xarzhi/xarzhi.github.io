# fs模块

> Module std::fs

该模块包含一些操作本地文件系统内容的基本方法。 该模块中的所有方法均表示跨平台文件系统操作。 



## 1.方法

### try_exists

如果路径指向现有实体，则返回ok(true）。

**实验性，在新一些的版本中可能无法使用**

### read

将文件的全部内容读取为字节vector。

```rust
pub fn read<P: AsRef<Path>>(path: P) -> Result<Vec<u8>>
```

**参数**：

- **path**：需要读取文件的路径

**返回值**：返回一个`Result`，其中读取的文件二进制内容放在`OK(Vector)`里

```rust
use std::fs;

fn main(){
	let path="C:/Users/22357/Desktop/test.txt";
	let res=fs::read(path);
	println!("{:#?}",res);
}
```

以上示例读取了一个内容为“你好”的txt文件，运行结果

![image-20260430191507682](https://gitee.com/xarzhi/picture/raw/master/img/image-20260430191507682.png)



### read_to_string

将文件的全部内容读取为字符串。

```rust
pub fn read_to_string<P: AsRef<Path>>(path: P) -> Result<String>
```

**参数**：

- **path**：需要读取文件的路径

**返回值**：返回一个Result，若读取成功则读取的内容在Ok中

```rust
use std::fs;

fn main(){
	let path="C:/Users/22357/Desktop/test.txt";
	let meta = fs::read_to_string(path);
	println!("{:#?}", meta);

	/*
		Ok(
			"小黑子",
		)
	 */
}
```



### write

写一个切片作为文件的全部内容。如果该文件不存在，则创建一个写有传入内容的文件；如果存在，则完全替换其内容

```rust
pub fn write<P: AsRef<Path>, C: AsRef<[u8]>>(path: P, contents: C) -> Result<()>
```

**参数**：

- **path**：需要写入文件的路径
- **contents**：一个切片，需要往文件里写入的内容，通常可以是`&str`

**返回值**：返回一个`Result`

若该文件存在，则将文件的内容完全替换为传入的参数`contents`

```rust
use std::fs;

fn main(){
	let path="C:/Users/22357/Desktop/test.txt";   //存在的路径
	let res=fs::write(path, "小黑子");
	println!("{:#?}",res);
}
```

若该文件不存在，则创建一个写有传入内容的文件

```rust
use std::fs;

fn main(){
	let path="C:/Users/22357/Desktop/test1.txt";   //存在的路径
	let res=fs::write(path, "小黑子");
	println!("{:#?}",res);
}
```



### copy

将一个文件的内容复制到另一个文件。此函数还将复制原始文件的权限位到目标文件。

请注意，如果 `from` 和 `to` 都指向同一个文件，则此操作可能会截断该文件。

```rust
pub fn copy<P: AsRef<Path>, Q: AsRef<Path>>(from: P, to: Q) -> Result<u64>
```

参数：

- from：需要被复制的源文件的路径
- to：复制目标文件的路径

返回值：成功后，将返回复制的字节总数，该总数等于 `metadata` 报告的 `to` 文件的长度。

```rust
use std::fs;

fn main(){
	let from="C:/Users/22357/Desktop/test.txt";
	let to="C:/Users/22357/Desktop/test1.txt";
	let res=fs::copy(from, to);
	println!("{:#?}",res);
}
```

:::tip

**Error**

在以下情况下，此函数将返回错误，但不仅限于这些情况：

- `from` 既不是普通文件，也不是普通文件的符号链接。
- `from` 不存在。
- 当前进程没有读取 `from` 或写入 `to` 的权限。

:::



### canonicalize

返回路径的规范，绝对形式，所有中间组件均已规范化且符号链接已解析。

```rust
pub fn canonicalize<P: AsRef<Path>>(path: P) -> Result<PathBuf>
```

参数：

- path：文件路径

返回值：返回文件路径的规范

```rust
use std::fs;

fn main(){
	let path="C:/Users/22357/Desktop/test.txt";
	let res=fs::canonicalize(path);
	println!("{:#?}",res);
	/*
		Ok(
			"\\\\?\\C:\\Users\\22357\\Desktop\\test.txt",
		)	
	 */
}
```

:::tip

在以下情况下，此函数将返回错误，但不仅限于这些情况：

- `path` 不存在。
- path 中的非最终组件不是目录。

:::



### rename

将文件或目录重命名为新名称，如果`to`已经存在，则替换原始文件。

```rust
pub fn rename<P: AsRef<Path>, Q: AsRef<Path>>(from: P, to: Q) -> Result<()>
```

参数：

- from：被重命名文件原路径
- to：被重命名文件新路径，注意是路径，不止是文件名，而且要加后缀名

```rust
use std::fs;

fn main(){
	let path="C:/Users/22357/Desktop/test.txt";
	let res=fs::rename(path, "C:/Users/22357/Desktop/test111.txt");
	println!("{:#?}",res);
	
}
```

:::tip

**特定于平台的行为**

该函数当前对应于 Unix 上的 `rename` 函数和 Windows 上带有 `MOVEFILE_REPLACE_EXISTING` 标志的 `MoveFileEx` 函数。

因此，`from` 和 `to` 都存在时的行为是不同的。在 Unix 上，如果 `from` 是目录，则 `to` 也必须是 (empty) 目录。如果 `from` 不是目录，则 `to` 也必须不是目录。

相比之下，在 Windows 上，`from` 可以是任何东西，但是 `to` 一定不是目录。

注意，这个 [将来可能会改变](https://www.rustwiki.org.cn/zh-CN/std/io/index.html#platform-specific-behavior)。

**Errors**

在以下情况下，此函数将返回错误，但不仅限于这些情况：

- `from` 不存在。
- 用户没有查看内容的权限。
- `from` 和 `to` 在不同的文件系统上。

:::



### metadata

给定路径，查询文件系统以获取有关文件，目录等的信息。

```rust
pub fn metadata<P: AsRef<Path>>(path: P) -> Result<Metadata>
```

参数：

- from：文件路径

返回值：返回一个元信息[`Metadata`](./结构体/06.Metadata.md)

```rust
use std::fs;

fn main(){
	let path="C:/Users/22357/Desktop/test.txt";
	let meta = fs::metadata(path);
	println!("{:#?}", meta);
	/*
	Ok(
        Metadata {
            file_type: FileType {
                is_file: true,
                is_dir: false,
                is_symlink: false,
                ..
            },
            permissions: Permissions(
                FilePermissions {
                    attrs: 32,
                },
            ),
            len: 9,
            modified: SystemTime {
                intervals: 134220225495380588,
            },
            accessed: SystemTime {
                intervals: 134220227235473364,
            },
            created: SystemTime {
                intervals: 134220225495951547,
            },
            ..
        },
    )
	 */
}
```



### read_dir

返回目录中条目的迭代器。

迭代器将产生 `io::Result<DirEntry>` 实例。 最初构造迭代器后，可能会遇到新的错误。 当前目录和父目录 (通常为 `.` 和 `..`) 的条目将被跳过。

```rust
pub fn read_dir<P: AsRef<Path>>(path: P) -> Result<ReadDir>
```

**参数**：

- path：读取的目录路径

**返回值**：返回一个`Result<ReadDir>`

- 其中[`ReadDir`](./结构体/09.ReadDir.md)为读取目录中条目的迭代器，遍历迭代器中的每一项为`io::Result<DirEntry>` 实例。 通过 [`DirEntry`](./结构体/03.DirEntry.md)，可以了解类似条目路径以及可能的其他元数据的信息。



创建一个文件夹，里面放俩文件

![image-20260430201149053](https://gitee.com/xarzhi/picture/raw/master/img/image-20260430201149053.png)

```rust
use std::fs;

fn main() {
    let path = "C:/Users/22357/Desktop/test_dir";
    let dir = fs::read_dir(path).unwrap();
    for entry in dir {
        println!("{:#?}", entry.unwrap());
    }
    /*
    DirEntry(
		"C:/Users/22357/Desktop/test_dir\\test.txt",
	)
	DirEntry(
		"C:/Users/22357/Desktop/test_dir\\test1.txt",
	)
    */
}

```

:::tip

在以下情况下，此函数将返回错误，但不仅限于这些情况：

- 提供的 `path` 不存在。
- 该进程没有查看内容的权限。
- `path` 指向非目录文件。

:::



### create_dir

在提供的路径中创建一个新的**空目录**，前提是其父目录是存在的

创建的目录名取决去路径中的最后一级名称

```rust
pub fn create_dir<P: AsRef<Path>>(path: P) -> Result<()>
```

**参数**：

- **path**：需要创建目录的路径，其中最后一级为路径名，如`"C://test/aaa"`，那么aaa就是目录名

**返回值**：如创建成功则返回`Ok(())`，否则返回相应的失败信息

```rust
use std::fs;

fn main() {
    let path = "C:/Users/22357/Desktop/test_dir/asd";
    let res = fs::create_dir(path);
    println!("{:#?}", res);
}

```

:::tip

在以下情况下，此函数将返回错误，但不仅限于这些情况：

- 用户没有权限在 `path` 上创建目录。
- 给定路径的父级不存在。 (要同时创建目录及其所有丢失的父目录，请使用 [`create_dir_all`](https://www.rustwiki.org.cn/zh-CN/std/fs/fn.create_dir_all.html) 函数。)
- `path` 已经存在。

:::



### create_dir_all

**递归创建目录**，只要路径是合法的目录路径，则会根据路径一级一级的创建目录

```rust
pub fn create_dir_all<P: AsRef<Path>>(path: P) -> Result<()>
```

**参数**：

- **path**：需要创建目录的路径

**返回值**：如创建成功则返回`Ok(())`，否则返回相应的失败信息

```rust
use std::fs;

fn main() {
    let path = "C:/Users/22357/Desktop/test_dir/aaa/bbb/ccc/ddd";
    let res = fs::create_dir_all(path);
    println!("{:#?}", res);
}
```

创建的目录结果：

![image-20260430203652191](https://gitee.com/xarzhi/picture/raw/master/img/image-20260430203652191.png)

:::tip

在以下情况下，此函数将返回错误，但不仅限于这些情况：

- 如果 `path` 指定的路径中的任何目录都不存在，否则无法创建。 [`fs::create_dir`](https://www.rustwiki.org.cn/zh-CN/std/fs/fn.create_dir.html) 概述了创建目录时 (确定目录不存在后) 的特定错误条件。

对于在 `path` 中指定的任何目录无法同时创建的情况下，将创建一个明显的例外。

这种情况被认为是成功的。 即，保证了从多个线程或进程并发调用 `create_dir_all` 不会由于自身的竞争态而失败。

:::





### remove_dir

删除一个**空目录**。只能是空目录，否则会报错

```rust
pub fn remove_dir<P: AsRef<Path>>(path: P) -> Result<()>
```

**参数**：

- **path**：需要删除的空目录的路径

**返回值**：如删除成功则返回`Ok(())`，否则返回相应的失败信息

```rust
use std::fs;

fn main() {
    let path = "C:/Users/22357/Desktop/test_dir/aaa/bbb";
    let res = fs::remove_dir(path);
    println!("{:#?}", res);
}

```

:::tip

在以下情况下，此函数将返回错误，但不仅限于这些情况：

- `path` 不存在。
- `path` 不是目录。
- 用户没有权限删除提供的 `path` 上的目录。
- 目录不为空。

:::



### remove_dir_all

删除该目录及目录里的所有内容

```rust
pub fn remove_dir_all<P: AsRef<Path>>(path: P) -> Result<()>
```

**参数**：

- **path**：需要删除的目录的路径

**返回值**：如删除成功则返回`Ok(())`，否则返回相应的失败信息

```rust
use std::fs;

fn main() {
    let path = "C:/Users/22357/Desktop/test_dir/aaa";			// aaa这个目录将被删除
    let res = fs::remove_dir_all(path);
    println!("{:#?}", res);
}
```

:::tip

请参见 [`fs::remove_file`](https://www.rustwiki.org.cn/zh-CN/std/fs/fn.remove_file.html) 和 [`fs::remove_dir`](https://www.rustwiki.org.cn/zh-CN/std/fs/fn.remove_dir.html)。

如果 `remove_dir` 或 `remove_file` 在任何组成路径 (包括根路径) 上失败，则 `remove_dir_all` 将失败。 因此，您要删除的目录必须存在，这意味着此功能不是幂等的。

如果您的用例不需要验证删除，请考虑忽略该错误。

:::



### remove_file

从文件系统中删除文件。

```rust
pub fn remove_file<P: AsRef<Path>>(path: P) -> Result<()>
```

**参数**：

- **path**：需要删除的文件的路径

**返回值**：如删除成功则返回`Ok(())`，否则返回相应的失败信息

```rust
use std::fs;

fn main() {
    let path = "C:/Users/22357/Desktop/test_dir/aaa.txt";
    let res = fs::remove_file(path);
    println!("{:#?}", res);
}
```

:::tip

在以下情况下，此函数将返回错误，但不仅限于这些情况：

- `path` 指向一个目录。
- 该文件不存在。
- 用户没有删除文件的权限

:::







### soft_link

在文件系统上创建一个新的符号链接(软连接)。

```rust
pub fn soft_link<P: AsRef<Path>, Q: AsRef<Path>>(
    original: P,
    link: Q
) -> Result<()>
```

**参数**：

- **original**：源文件路径
- **link**：软连接路径

**返回值**：如创建成功则返回`Ok(())`，否则返回相应的失败信息

:::warning

自1.1.0版本起已弃用：已替换为`std::os::unix::fs::symlink`和`std::os::windows::fs::{symlink_file, symlink_dir}`

```rust
pub fn symlink_file<P: AsRef<Path>, Q: AsRef<Path>>(
    original: P,
    link: Q
) -> Result<()>
```

**参数**：

- **original**：源文件路径
- **link**：软链接路径

**返回值**：如创建成功则返回`Ok(())`，否则返回相应的失败信息

```rust
fn main() {
    let path = "C:/Users/22357/Desktop/test_dir/aaa.txt";
    let link = "C:/Users/22357/Desktop/test_dir/aaa1.txt";
    let res = symlink_file(path, link);
    println!("{:#?}", res);
}

```

:::

### hard_link

在文件系统上创建一个新的硬链接。

```rust
pub fn hard_link<P: AsRef<Path>, Q: AsRef<Path>>(
    original: P,
    link: Q
) -> Result<()>
```

**参数**：

- **original**：源文件路径
- **link**：硬链接路径

**返回值**：如创建成功则返回`Ok(())`，否则返回相应的失败信息

```rust
use std::fs;

fn main() {
    let path = "C:/Users/22357/Desktop/test_dir/aaa.txt";
    let link = "C:/Users/22357/Desktop/test_dir/aaa1.txt";
    let res = fs::hard_link(path, link);
    println!("{:#?}", res);
}
```



:::tip 硬链接和软链接

硬链接：同一个文件数据块（inode / 文件记录）的多个目录项

- 文件内容只存一份
- 多个文件名指向同一个 inode
- 没有“源文件 / 目标文件”之分
- 所有硬链接地位平等
- 删除其中一个，**只要还有一个存在，文件就还在**

软链接：一个特殊文件，里面保存的是“另一个文件的路径”

- 自动跳转到它指向的路径
- 实际访问的是目标文件
- 软链接本身是一个独立文件
- 有明确的“源”和“目标”
- 目标被删除 → 软链接失效（断链）

:::



### read_link

读取符号链接，返回链接指向的文件。

```rust
pub fn read_link<P: AsRef<Path>>(path: P) -> Result<PathBuf>
```

**参数**：

- **path**：源文件路径

**返回值**：如创建成功则返回`Ok(PathBuf)`，否则返回相应的失败信息

```rust
use std::fs;

fn main() {
    let path = "C:/Users/22357/Desktop/test_dir/aaa1.txt";
    let res = fs::read_link( path);
    println!("{:#?}", res);
}
```

:::tip

在以下情况下，此函数将返回错误，但不仅限于这些情况：

- `path` 不是符号链接。
- `path` 不存在。

:::



### set_permissions

更改在文件或目录上找到的权限。

```rust
pub fn set_permissions<P: AsRef<Path>>(path: P, perm: Permissions) -> Result<()>
```

**参数**：

- **path**：源文件路径
- **perm**：

**返回值**：如创建成功则返回`Ok(PathBuf)`，否则返回相应的失败信息

```rust
use std::fs;

fn main() {
    let path = "C:/Users/22357/Desktop/test_dir/aaa.txt";

    let mut perms = fs::metadata(path).unwrap().permissions();
    perms.set_readonly(true);
    let res = fs::set_permissions(path, perms);
    println!("{:#?}", res);

}

```



:::tip

在以下情况下，此函数将返回错误，但不仅限于这些情况：

- `path` 不存在。
- 用户没有更改文件属性的权限。

:::



### symlink_metadata

查询有关文件的元数据，而无需遵循符号链接。

```rust
pub fn symlink_metadata<P: AsRef<Path>>(path: P) -> Result<Metadata>
```

**参数**：

- **path**：源文件路径

**返回值**：如创建成功则返回[Metadata](./结构体/06.Metadata.md)，否则返回相应的失败信息

```rust
use std::fs;

fn main() {
    let path = "C:/Users/22357/Desktop/test_dir/aaa.txt";
    let res = fs::symlink_metadata(path);
    println!("{:#?}", res);
}
```

:::tip 与metadata的区别

| **函数**                     | **行为**                                       |
| :--------------------------- | :--------------------------------------------- |
| `fs::metadata(path)`         | **跟随符号链接**（返回链接指向目标的元数据）   |
| `fs::symlink_metadata(path)` | **不跟随符号链接**（返回符号链接本身的元数据） |

:::



## 2.结构体

### [FileTimes](./结构体/01.FileTimes.md)

文件上各种时间戳的表示。

### [DirBuilder](./结构体/02.DirBuilder.md)

用于以各种方式创建目录的构建器。

### [DirEntry](./结构体/03.DirEntry.md)

ReadDir迭代器返回的条目

### [File](./结构体/04.File.md)

提供对文件系统上打开文件的访问权限的对象。

### [FileType](./结构体/05.FileType.md)

表示文件类型的结构体，每个文件类型都有访问器。通过Metadata：：file_type方法返回。

### [Metadata](./结构体/06.Metadata.md)

有关文件的元数据信息。

### [OpenOptions](./结构体/07.OpenOptions.md)

可用于配置文件打开方式的选项和标志。

### [Permissions](./结构体/08.Permissions.md)

表示文件上的各种权限。

### [ReadDir](./结构体/09.ReadDir.md)

遍历目录中的条目。



