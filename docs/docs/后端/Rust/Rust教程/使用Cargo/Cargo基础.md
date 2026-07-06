# Cargo基础

## 上手使用

Cargo 会在安装 Rust 的时候一并进行安装，无需我们手动的操作执行，安装 Rust 参见[这里](https://beatai.org/rust-course/first-try/installation)。

在开始之前，先来明确一个名词: `Package`，由于 `Crate` 被翻译成包，因此 `Package` 再被翻译成包就很不合适，经过斟酌，我们决定翻译成项目，你也可以理解为工程、软件包，总之，在本书中`Package` 意味着项目，而项目也意味着 `Package` 。

安装完成后，接下来使用 `Cargo` 来创建一个新的[二进制项目](https://beatai.org/rust-course/basic/crate-module/crate)，二进制意味着该项目可以作为一个服务运行或被编译成可执行文件运行。

```bash
cargo new hello_world
```

这里我们使用 `cargo new` 创建一个新的项目 ，事实上该命令等价于 `cargo new hello_world --bin`，`bin` 是 `binary` 的简写，代表着二进制程序，由于 `--bin` 是默认参数，因此可以对其进行省略。

创建成功后，先来看看项目的基本目录结构长啥样：

```shell
$ cd hello_world
$ tree .
.
├── Cargo.toml
└── src
    └── main.rs

1 directory, 2 files
```

这里有一个很显眼的文件 `Cargo.toml`，一看就知道它是 `Cargo` 使用的配置文件，这个关系类似于： `package.json` 是 `npm` 的配置文件。

```toml
[package]
name = "hello_world"
version = "0.1.0"
edition = "2021"

[dependencies]
```

以上就是 `Cargo.toml` 的全部内容，它被称之为清单( manifest )，包含了 `Cargo` 编译程序所需的所有元数据。

下面是 `src/main.rs` 的内容 ：

```rust
fn main() {
    println!("Hello, world!");
}
```

可以看出 `Cargo` 还为我们自动生成了一个 `hello world` 程序，或者说[二进制包](https://beatai.org/rust-course/basic/crate-module/crate)，对程序进行编译构建：

```shell
$ cargo build
   Compiling hello_world v0.1.0 (file:///path/to/package/hello_world)
```

然后再运行编译出的二进制可执行文件:

```shell
$ ./target/debug/hello_world
Hello, world!
```

注意到路径中的 `debug` 了吗？它说明我们刚才的编译是 `Debug` 模式，该模式主要用于测试目的，如果想要进行生产编译，我们需要使用 `Release` 模式 `cargo build --release`，然后通过 `./target/release/hello_world` 运行。

除了上面的编译 + 运行方式外，在日常开发中，我们还可以使用一个简单的命令直接运行:

```shell
$ cargo run
     Fresh hello_world v0.1.0 (file:///path/to/package/hello_world)
   Running `target/hello_world`
Hello, world!
```

`cargo run` 会帮我们自动完成编译、运行的过程，当然，该命令也支持 `Release` 模式: `cargo run --release`。

> 如果你的程序在跑性能测试 benchmark，一定要使用 `Release` 模式，因为该模式下，程序会做大量性能优化





## 为何会有 Cargo

根据之前学习的知识，Rust 有两种类型的包: 库包和二进制包，前者是我们经常使用的依赖包，用于被其它包所引入，而后者是一个应用服务，可以编译成二进制可执行文件进行运行。

包是通过 Rust 编译器 `rustc` 进行编译的:

```rust
$ rustc hello.rs
$ ./hello
Hello, world!
```

上面我们直接使用 `rustc` 对二进制包 `hello.rs` 进行编译，生成二进制可执行文件 `hello`，并对其进行运行。

该方式虽然简单，但有几个问题：

- 必须要指定文件名编译，当项目复杂后，这种编译方式也随之更加复杂
- 如果要指定编译参数，情况将更加复杂

最关键的是，外部依赖库的引入也将是一个大问题。大部分实际的项目都有不少依赖包，而这些依赖包又间接的依赖了新的依赖包，在这种复杂情况下，如何管理依赖包及其版本也成为一个相当棘手的问题。

正是因为这些原因，与其使用 `rustc` ，我们可以使用一个强大的包管理工具来解决问题：欢迎 `Cargo` 闪亮登场。



### Cargo

`Cargo` 解决了之前描述的所有问题，同时它保证了每次重复的构建都不会改变上一次构建的结果，这背后是通过完善且强大的依赖包版本管理来实现的。

总之，`Cargo` 为了实现目标，做了四件事：

- 引入两个元数据文件，包含项目方方面面的信息: `Cargo.toml` 和 `Cargo.lock`
- 获取和构建项目的依赖，例如 `Cargo.toml` 中的依赖包版本描述，以及从 `crates.io` 下载包
- 调用 `rustc` (或其它编译器) 并使用正确的参数来构建项目，例如 `cargo build`
- 引入一些惯例，让项目的使用更加简单

毫不夸张的说，得益于 `Cargo` 的标准化，只要你使用它构建过一个项目，那构建其它使用 `Cargo` 的项目，也将不存在任何困难。







## 下载并构建 Package

如果看中 `GitHub` 上的某个开源 Rust 项目，那下载并构建它将是非常简单的。

```shell
$ git clone https://github.com/rust-lang/regex.git
$ cd regex
```

如上所示，直接从 `GitHub` 上克隆下来想要的项目，然后使用 `cargo build` 进行构建即可：

```shell
$ cargo build
   Compiling regex v1.5.0 (file:///path/to/package/regex)
```

该命令将下载相关的依赖库，等下载成功后，再对 `package` 和下载的依赖进行一同的编译构建。

这就是包管理工具的强大之处，`cargo build` 搞定一切，而背后隐藏的复杂配置、参数你都无需关心。





## 添加依赖

[`crates.io`](https://crates.io/) 是 Rust 社区维护的中心化注册服务，用户可以在其中寻找和下载所需的包。对于 `cargo` 来说，默认就是从这里下载依赖。

下面我们来添加一个 `time` 依赖包，若你的 `Cargo.toml` 文件中没有 `[dependencies]` 部分，就手动添加一个，并添加目标包名和版本号:

```toml
[dependencies]
time = "0.1.12"
```

可以看到我们指定了 `time` 包的版本号 "0.1.12"，关于版本号，实际上还有其它的指定方式，具体参见[指定依赖项](https://beatai.org/rust-course/cargo/reference/specify-deps)章节。

如果想继续添加 `regexp` 包，只需在 `time` 包后面添加即可 :

```toml
[package]
name = "hello_world"
version = "0.1.0"
edition = "2021"

[dependencies]
time = "0.1.12"
regex = "0.1.41"
```

此时，再通过运行 `cargo build` 来重新构建，首先 `Cargo` 会获取新的依赖以及依赖的依赖, 接着对它们进行编译并更新 `Cargo.lock`:

```shell
$ cargo build
      Updating crates.io index
   Downloading memchr v0.1.5
   Downloading libc v0.1.10
   Downloading regex-syntax v0.2.1
   Downloading memchr v0.1.5
   Downloading aho-corasick v0.3.0
   Downloading regex v0.1.41
     Compiling memchr v0.1.5
     Compiling libc v0.1.10
     Compiling regex-syntax v0.2.1
     Compiling memchr v0.1.5
     Compiling aho-corasick v0.3.0
     Compiling regex v0.1.41
     Compiling hello_world v0.1.0 (file:///path/to/package/hello_world)
```

在 `Cargo.lock` 中包含了我们项目使用的所有依赖的准确版本信息。这个非常重要，未来就算 `regexp` 的作者升级了该包，我们依然会下载 `Cargo.lock` 中的版本，而不是最新的版本，只有这样，才能保证项目依赖包不会莫名其妙的因为更新升级导致无法编译。 当然，你还可以使用 `cargo update` 来手动更新包的版本。

此时，就可以在 `src/main.rs` 中使用新引入的 `regexp` 包:

```rust
use regex::Regex;

fn main() {
    let re = Regex::new(r"^\d{4}-\d{2}-\d{2}$").unwrap();
    println!("Did our date match? {}", re.is_match("2014-01-01"));
}
```

运行后输出:

```shell
$ cargo run
   Running `target/hello_world`
Did our date match? true
```







## 标准的 Package 目录结构

一个典型的 `Package` 目录结构如下：

```shell
.
├── Cargo.lock
├── Cargo.toml
├── src/
│   ├── lib.rs
│   ├── main.rs
│   └── bin/
│       ├── named-executable.rs
│       ├── another-executable.rs
│       └── multi-file-executable/
│           ├── main.rs
│           └── some_module.rs
├── benches/
│   ├── large-input.rs
│   └── multi-file-bench/
│       ├── main.rs
│       └── bench_module.rs
├── examples/
│   ├── simple.rs
│   └── multi-file-example/
│       ├── main.rs
│       └── ex_module.rs
└── tests/
    ├── some-integration-tests.rs
    └── multi-file-test/
        ├── main.rs
        └── test_module.rs
```

这也是 `Cargo` 推荐的目录结构，解释如下：

- `Cargo.toml` 和 `Cargo.lock` 保存在 `package` 根目录下

- 源代码放在 `src` 目录下

- 默认的 `lib` 包根是 `src/lib.rs`

- 默认的二进制包根是`src/main.rs`

  - 其它二进制包根放在 `src/bin/` 目录下

- 基准测试 benchmark 放在 `benches` 目录下

- 示例代码放在 `examples` 目录下

- 集成测试代码放在 `tests` 目录下

此外，`bin`、`tests`、`examples` 等目录路径都可以通过配置文件进行配置，它们被统一称之为 [Cargo Target](https://beatai.org/rust-course/cargo/reference/cargo-target)。





## Cargo.toml vs Cargo.lock

`Cargo.toml` 和 `Cargo.lock` 是 `Cargo` 的两个元配置文件，但是它们拥有不同的目的:

- 前者从用户的角度出发来描述项目信息和依赖管理，因此它是由用户来编写
- 后者包含了依赖的精确描述信息，它是由 `Cargo` 自行维护，因此不要去手动修改

它们的关系跟 `package.json` 和 `package-lock.json` 非常相似，从 JavaScript 过来的同学应该会比较好理解。



### 是否上传本地的 `Cargo.lock`

当本地开发时，`Cargo.lock` 自然是非常重要的，但是当你要把项目上传到 `Git` 时，例如 `GitHub`，那是否上传 `Cargo.lock` 就成了一个问题。

关于是否上传，有如下经验准则:

- 从实践角度出发，如果你构建的是三方库类型的服务，请把 `Cargo.lock` 加入到 `.gitignore` 中。
- 若构建的是一个面向用户终端的产品，例如可以像命令行工具、应用程序一样执行，那就把 `Cargo.lock` 上传到源代码目录中。

例如 [`axum`](https://github.com/tokio-rs/axum) 是 web 开发框架，它属于三方库类型的服务，因此源码目录中不应该出现 `Cargo.lock` 的身影，它的归宿是 `.gitignore`。而 [`ripgrep`](https://github.com/BurntSushi/ripgrep) 则恰恰相反，因为它是一个面向终端的产品，可以直接运行提供服务。

**那么问题来了，为何会有这种选择？**

原因是 `Cargo.lock` 会详尽描述上一次成功构建的各种信息：环境状态、依赖、版本等等，Cargo 可以使用它提供确定性的构建环境和流程，无论何时何地。这种特性对于终端服务是非常重要的：能确定、稳定的在用户环境中运行起来是终端服务最重要的特性之一。

而对于三方库来说，情况就有些不同。它不仅仅被库的开发者所使用，还会间接影响依赖链下游的使用者。用户引入了三方库是不会去看它的 `Cargo.lock` 信息的，也不应该受这个库的确定性运行条件所限制。

还有个原因，在项目中，可能会有几个依赖库引用同一个三方库的同一个版本，那如果该三方库使用了 `Cargo.lock` 文件，那可能三方库的多个版本会被引入使用，这时就会造成版本冲突。换句话说，通过指定版本的方式引用一个依赖库是无法看到该依赖库的完整情况的，而只有终端的产品才会看到这些完整的情况。



### 假设没有 `Cargo.lock`

`Cargo.toml` 是一个清单文件( `manifest` )包含了我们 `package` 的描述元数据。例如，通过以下内容可以说明对另一个 `package` 的依赖 :

```rust
[package]
name = "hello_world"
version = "0.1.0"

[dependencies]
regex = { git = "https://github.com/rust-lang/regex.git" }
```

可以看到，只有一个依赖，且该依赖的来源是 `GitHub` 上一个特定的仓库。由于我们没有指定任何版本信息，`Cargo` 会自动拉取该依赖库的最新版本( `master` 或 `main` 分支上的最新 `commit` )。

这种使用方式，其实就错失了包管理工具的最大的优点：版本管理。例如你在今天构建使用了版本 `A`，然后过了一段时间后，由于依赖包的升级，新的构建却使用了大更新版本 `B`，结果因为版本不兼容，导致了构建失败。

可以看出，确保依赖版本的确定性是非常重要的:

```rust
[dependencies]
regex = { git = "https://github.com/rust-lang/regex.git", rev = "9f9f693" }
```

这次，我们使用了指定 `rev` ( `revision` ) 的方式来构建，那么不管未来何时再次构建，使用的依赖库都会是该 `rev` ，而不是最新的 `commit`。

但是，这里还有一个问题：`rev` 需要手动的管理，你需要在每次更新包的时候都思考下 `SHA-1`，这显然非常麻烦。

### 当有了 `Cargo.lock` 后

当有了 `Cargo.lock` 后，我们无需手动追踪依赖库的 `rev`，`Cargo` 会自动帮我们完成，还是之前的清单:

```rust
[package]
name = "hello_world"
version = "0.1.0"

[dependencies]
regex = { git = "https://github.com/rust-lang/regex.git" }
```

第一次构建时，`Cargo` 依然会拉取最新的 `master commit`，然后将以下信息写到 `Cargo.lock` 文件中:

```rust
[[package]]
name = "hello_world"
version = "0.1.0"
dependencies = [
 "regex 1.5.0 (git+https://github.com/rust-lang/regex.git#9f9f693768c584971a4d53bc3c586c33ed3a6831)",
]

[[package]]
name = "regex"
version = "1.5.0"
source = "git+https://github.com/rust-lang/regex.git#9f9f693768c584971a4d53bc3c586c33ed3a6831"
```

可以看出，其中包含了依赖库的准确 `rev` 信息。当未来再次构建时，只要项目中还有该 `Cargo.lock` 文件，那构建依然会拉取同一个版本的依赖库，并且再也无需我们手动去管理 `rev` 的 `SHA` 信息!

### 更新依赖

由于 `Cargo.lock` 会锁住依赖的版本，你需要通过手动的方式将依赖更新到新的版本：

```rust
$ cargo update            # 更新所有依赖
$ cargo update -p regex   # 只更新 “regex”
```

以上命令将使用新的版本信息重新生成 `Cargo.lock` ，需要注意的是 `cargo update -p regex` 传递的参数实际上是一个 `Package ID`， `regex` 只是一个简写形式。





## 测试和 CI

Cargo 可以通过 `cargo test` 命令运行项目中的测试文件：它会在 `src/` 底下的文件寻找单元测试，也会在 `tests/` 目录下寻找集成测试。

```rust
$ cargo test
   Compiling regex v1.5.0 (https://github.com/rust-lang/regex.git#9f9f693)
   Compiling hello_world v0.1.0 (file:///path/to/package/hello_world)
     Running target/test/hello_world-9c2b65bbb79eabce

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

从上面结果可以看出，项目中实际上还没有任何测试代码。

事实上，除了单元测试、集成测试，`cargo test` 还会编译 `examples/` 下的示例文件以及[文档中的示例](https://beatai.org/rust-course/basic/comment#文档测试doc-test)。

如果希望深入学习如何在 Rust 编写及运行测试，请查阅[该章节](https://beatai.org/rust-course/test/intro)。



### CI

持续集成是软件开发中异常重要的一环，大家应该都听说过 Jenkins，它就是一个拥有悠久历史的持续集成工具。简单来说，持续集成会定期拉取同一个项目中所有成员的相关代码，对其进行自动化构建。

在没有持续集成前，首先开发者需要手动编译代码并运行单元测试、集成测试等基础测试，然后启动项目相关的所有服务，接着测试人员开始介入对整个项目进行回归测试、黑盒测试等系统化的测试，当测试通过后，最后再手动发布到指定的环境中运行，这个过程是非常冗长，且所有成员都需要同时参与的。

在有了持续集成后，只要编写好相应的编译、测试、发布配置文件，那持续集成平台会自动帮助我们完成整个相关的流程，期间无需任何人介入，高效且可靠。



#### GitHub Actions

关于如何使用 `GitHub Actions` 进行持续集成，在[之前的章节](https://beatai.org/rust-course/test/ci)已经有过详细的介绍，这里就不再赘述。



#### Travis CI

以下是 `Travis CI` 需要的一个简单的示例配置文件:

```yml
language: rust
rust:
  - stable
  - beta
  - nightly
matrix:
  allow_failures:
    - rust: nightly
```

以上配置将测试所有的 [Rust 发布版本](https://beatai.org/rust-course/appendix/rust-version)，但是 `nightly` 版本的构建失败不会导致全局测试的失败，可以查看 [Travis CI Rust 文档](https://docs.travis-ci.com/user/languages/rust/) 获取更详细的说明。



#### Gitlab CI

以下是一个示例 `.gitlab-ci.yml` 文件:

```yml
stages:
  - build

rust-latest:
  stage: build
  image: rust:latest
  script:
    - cargo build --verbose
    - cargo test --verbose

rust-nightly:
  stage: build
  image: rustlang/rust:nightly
  script:
    - cargo build --verbose
    - cargo test --verbose
  allow_failure: true
```

这里将测试 `stable` 和 `nightly` 发布版本，同样的，`nightly` 下的测试失败不会导致全局测试的失败。查看 [Gitlab CI 文档](https://docs.gitlab.com/ee/ci/yaml/index.html) 获取更详细的说明。





## Cargo 缓存

Cargo 使用了缓存的方式提升构建效率，当构建时，Cargo 会将已下载的依赖包放在 `CARGO_HOME` 目录下，下面一起来看看。



### Cargo Home

默认情况下，Cargo Home 所在的目录是 `$HOME/.cargo/`，例如在 `macos` ，对应的目录是:

```shell
$ echo $HOME/.cargo/
/Users/sunfei/.cargo/
```

我们也可以通过修改 `CARGO_HOME` 环境变量的方式来重新设定该目录的位置。若你需要在项目中通过代码的方式来获取 `CARGO_HOME` ，[`home`](https://crates.io/crates/home) 包提供了相应的 API。

> 注意！ Cargo Home 目录的内部结构并没有稳定化，在未来可能会发生变化



### 文件

- `config.toml` 是 Cargo 的全局配置文件，具体请查看[这里](https://beatai.org/rust-course/cargo/reference/configuration)
- `credentials.toml` 为 `cargo login` 提供私有化登录证书，用于登录 `package` 注册中心，例如 `crates.io`
- `.crates.toml`, `.crates2.json` 这两个是隐藏文件，包含了通过 `cargo install` 安装的包的 `package` 信息，**请不要手动修改！**



### 目录

- `bin` 目录包含了通过 `cargo install` 或 `rustup` 下载的包编译出的可执行文件。你可以将该目录加入到 `$PATH` 环境变量中，以实现对这些可执行文件的直接访问

- `git`中存储了`Git`的资源文件:
  - `git/db`，当一个包依赖某个 `git` 仓库时，`Cargo` 会将该仓库克隆到 `git/db` 目录下，如果未来需要还会对其进行更新
  - `git/checkouts`，若指定了 `git` 源和 `commit`，那相应的仓库就会从 `git/db` 中 `checkout` 到该目录下，因此同一个仓库的不同 `checkout` 共存成为了可能性

- registry包含了注册中心（例如crates.io）的元数据 和packages
  - `registry/index` 是一个 git 仓库，包含了注册中心中所有可用包的元数据( 版本、依赖等 )
  - `registry/cache` 中保存了已下载的依赖，这些依赖包以 `gzip` 的压缩档案形式保存，后缀名为 `.crate`
  - `registry/src`，若一个已下载的 `.crate` 档案被一个 `package` 所需要，该档案会被解压缩到 `registry/src` 文件夹下，最终 `rustc` 可以在其中找到所需的 `.rs` 文件



### 在 CI 时缓存 Cargo Home

为了避免持续集成时重复下载所有的包依赖，我们可以将 `$CARGO_HOME` 目录进行缓存，但缓存整个目录是效率低下的，原因是源文件可能会被缓存两次。

例如我们依赖一个包 `serde 1.0.92`，如果将整个 `$CACHE_HOME` 目录缓存，那么`serde` 的源文件就会被缓存两次：在 `registry/cache` 中的 `serde-1.0.92.crate` 以及 `registry/src` 下被解压缩的 `.rs` 文件。

因此，在 CI 构建时，出于效率的考虑，我们仅应该缓存以下目录:

- `bin/`
- `registry/index/`
- `registry/cache/`
- `git/db/`



### 清除缓存

理论上，我们可以手动移除缓存中的任何一部分，当后续有包需要时 `Cargo` 会尽可能去恢复这些资源：

- 解压缩 `registry/cache` 下的 `.crate` 档案
- 从 `.git` 中 `checkout` 缓存的仓库
- 如果以上都没了，会从网络上重新下载

你也可以使用 [cargo-cache](https://crates.io/crates/cargo-cache) 包来选择性的清除 `cache` 中指定的部分，当然，它还可以用来查看缓存中的组件大小。



### 构建时卡住：Blocking waiting for file lock ..

在开发过程中，或多或少我们都会碰到这种问题，例如你同时打开了 VSCode IDE 和终端，然后在 `Cargo.toml` 中刚添加了一个新的依赖。

此时 IDE 会捕捉到这个修改然后自动去重新下载依赖(这个过程可能还会更新 `crates.io` 使用的索引列表)，在此过程中， Cargo 会将相关信息写入到 `$HOME/.cargo/.package_cache` 下，并将其锁住。

如果你试图在另一个地方(例如终端)对同一个项目进行构建，就会报错: `Blocking waiting for file lock on package cache`。

解决办法很简单：

- 既然下载慢，那就使用[国内的注册服务](https://beatai.org/rust-course/cargo/reference/specify-deps#从其它注册服务引入依赖包)，不再使用 crates.io
- 耐心等待持有锁的用户构建完成
- 强行停止正在构建的进程，例如杀掉 IDE 使用的 rust-analyer 插件进程，然后删除 `$HOME/.cargo/.package_cache` 目录



## 构建( Build )缓存

`cargo build` 的结果会被放入项目根目录下的 `target` 文件夹中，当然，这个位置可以三种方式更改：设置 `CARGO_TARGET_DIR` [环境变量](https://doc.rust-lang.org/stable/cargo/reference/environment-variables.html)、[`build.target-dir`](https://beatai.org/rust-course/cargo/reference/configuration#配置文件概览) 配置项以及 `--target-dir` 命令行参数。



### target 目录结构

`target` 目录的结构取决于是否使用 `--target` 标志为特定的平台构建。



#### 不使用 --target

若 `--target` 标志没有指定，`Cargo` 会根据宿主机架构进行构建，构建结果会放入项目根目录下的 `target` 目录中，`target` 下每个子目录中包含了相应的 [`发布配置profile`](https://beatai.org/rust-course/cargo/reference/profiles) 的构建结果，例如 `release`、`debug` 是自带的`profile`，前者往往用于生产环境，因为会做大量的性能优化，而后者则用于开发环境，此时的编译效率和报错信息是最好的。

除此之外我们还可以定义自己想要的 `profile` ，例如用于测试环境的 `profile`： `test`，用于预发环境的 `profile` ：`pre-prod` 等。

| 目录              | 描述                                                         |
| :---------------- | :----------------------------------------------------------- |
| `target/debug/`   | 包含了 `dev` profile 的构建输出(`cargo build` 或 `cargo build --debug`) |
| `target/release/` | `release` profile 的构建输出，`cargo build --release`        |
| `target/foo/`     | 自定义 `foo` profile 的构建输出，`cargo build --profile=foo` |

出于历史原因:

- `dev` 和 `test` profile 的构建结果都存放在 `debug` 目录下
- `release` 和 `bench` profile 则存放在 `release` 目录下
- 用户定义的 profile 存在同名的目录下



#### 使用 --target

当使用 `--target XXX` 为特定的平台编译后，输出会放在 `target/XXX/` 目录下:

| 目录                       | 示例                                    |
| :------------------------- | :-------------------------------------- |
| `target/<triple>/debug/`   | `target/thumbv7em-none-eabihf/debug/`   |
| `target/<triple>/release/` | `target/thumbv7em-none-eabihf/release/` |

> **注意：**，当没有使用 `--target` 时，`Cargo` 会与构建脚本和过程宏一起共享你的依赖包，对于每个 `rustc` 命令调用而言，[`RUSTFLAGS`](https://beatai.org/rust-course/cargo/reference/configuration#配置文件概览) 也将被共享。
>
> 而使用 `--target` 后，构建脚本、过程宏会针对宿主机的 CPU 架构进行各自构建，且不会共享 `RUSTFLAGS`。

target 子目录说明

在 profile 文件夹中(例如 `debug` 或 `release`)，包含编译后的最终成果:

| 目录                     | 描述                                                         |
| :----------------------- | :----------------------------------------------------------- |
| `target/debug/`          | 包含编译后的输出，例如二进制可执行文件、[库对象( library target )](https://beatai.org/rust-course/cargo/reference/cargo-target#库对象library) |
| `target/debug/examples/` | 包含[示例对象( example target )](https://beatai.org/rust-course/cargo/reference/cargo-target#示例对象examples) |

还有一些命令会在 `target` 下生成自己的独立目录:

| 目录              | 描述                                               |
| :---------------- | :------------------------------------------------- |
| `target/doc/`     | 包含通过 `cargo doc` 生成的文档                    |
| `target/package/` | 包含 `cargo package` 或 `cargo publish` 生成的输出 |

Cargo 还会创建几个用于构建过程的其它类型目录，它们的目录结构只应该被 Cargo 自身使用，因此可能会在未来发生变化:

| 目录                       | 描述                                                         |
| :------------------------- | :----------------------------------------------------------- |
| `target/debug/deps`        | 依赖和其它输出成果                                           |
| `target/debug/incremental` | `rustc` [增量编译](https://beatai.org/rust-course/cargo/reference/profiles#incremental)的输出，该缓存可以用于提升后续的编译速度 |
| `target/debug/build/`      | [构建脚本](https://beatai.org/rust-course/cargo/reference/build-script/intro)的输出 |



### 依赖信息文件

在每一个编译成果的旁边，都有一个依赖信息文件，文件后缀是 `.d`。该文件的语法类似于 `Makefile`，用于说明构建编译成果所需的所有依赖包。

该文件往往用于提供给外部的构建系统，这样它们就可以判断 `Cargo` 命令是否需要再次被执行。

文件中的路径默认是绝对路径，你可以通过 [`build.dep-info-basedir`](https://beatai.org/rust-course/cargo/reference/configuration#配置文件概览) 配置项来修改为相对路径。

```shell
# 关于 `.d` 文件的一个示例 : target/debug/foo.d
/path/to/myproj/target/debug/foo: /path/to/myproj/src/lib.rs /path/to/myproj/src/main.rs
```



### 共享缓存

[sccache](https://github.com/mozilla/sccache) 是一个三方工具，可以用于在不同的工作空间中共享已经构建好的依赖包。

为了设置 `sccache`，首先需要使用 `cargo install sccache` 进行安装，然后在调用 `Cargo` 之前将 `RUSTC_WRAPPER` 环境变量设置为 `sccache`。

- 如果用的 `bash`，可以将 `export RUSTC_WRAPPER=sccache` 添加到 `.bashrc` 中
- 也可以使用 [`build.rustc-wrapper`](https://beatai.org/rust-course/cargo/reference/configuration#配置文件概览) 配置项
