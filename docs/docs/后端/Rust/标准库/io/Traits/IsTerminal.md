# Trait std::io::IsTerminal

```rust
pub trait IsTerminal: Sealed {
  // Required method
  fn is_terminal(&self) -> bool;
}
```

Trait 确定 descriptor/handle 是否指代 terminal/tty。



## Required Methods

### is_terminal

如果 descriptor/handle 引用 terminal/tty，则返回 true。

```rust
fn is_terminal(&self) -> bool
```



:::tip

在 Rust 还不知道如何检测终端的平台上，这将返回 false。如果发生意外错误，例如传递无效的文件描述符，这也将返回 false。

特定于平台的行为

在 Windows 上，除了检测控制台外，目前还使用一些启发式方法根据设备名称检测较旧的 msys/cygwin/mingw 伪终端: 名称以 msys- 或 cygwin- 开头并以 -pty 结尾的设备将被视为终端。

注意这个 将来可能会发生变化。

:::



## Implementors



### impl IsTerminal for File

### impl IsTerminal for BorrowedFd<'_>

### impl IsTerminal for OwnedFd

### impl IsTerminal for BorrowedHandle<'_>

Available on Windows only.



### impl IsTerminal for OwnedHandle

Available on Windows only.



### impl IsTerminal for Stderr

### impl IsTerminal for StderrLock<'_>

### impl IsTerminal for Stdin

### impl IsTerminal for StdinLock<'_>

### impl IsTerminal for Stdout

### impl IsTerminal for StdoutLock<'_>