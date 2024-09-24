# git 学习

## 一、前言

-   版本管理工具 源代码管理工具

-   Git（读音为/gɪt/）是一个**开源的分布式版本控制系统**，可以有效、高速地处理从很小到非常大的项目版本管理

-   git 是一个源代码管理工具,gitlab svn sourcetree,

-   svn 和 git 的区别：git 是基于分布式的
-   Git 分区：工作区—暂存区—Git 仓库

### 需要用到的 linux 指令

1. cd xx 切换工作目录
2. rm xx 删除文件
3. rm -rf 删库跑路
4. touch xxx.xx 创建文件
5. mkdir xxx 创建文件夹
6. ls 列出当前目录中的文件，隐藏文件查看不到
7. ls -a 列出所有文件，可以查看到隐藏文件
8. ls -l 显示文件操作权限
9. ls -al 列出所有文件 和 显示文件操作权限
10. pwd 查看当前所在目录

### 需要用到的 Vim 命令

**操作文件的写入**

1. vim file.xxx 需要加文件后缀
2. 输入 a 或 i，之后就可以给文件写入了
3. 如果准备退出操作，先按 esc 键，在下方输入栏输入 `:wq`
    - w 表示保存，q 表示退出

### git 常用命令速查表

![](https://gitee.com/xarzhi/picture/raw/master/img/git%E9%80%9F%E6%9F%A5%E8%A1%A8.png)

### 安装 git

官网下载：[Git - Downloads (git-scm.com)](https://git-scm.com/downloads)

![image-20230604100636259](https://gitee.com/xarzhi/picture/raw/master/img/image-20230604100636259.png)

## 二、全局设置用户名密码

**仅第一次下载 git 时需要设置**

在指定文件夹空白区域，右键鼠标，`git bash here`

```bash
# 设定
git config --global user.name "xx"
git config --global user.email "xxxx"
```

**查询是否已经设置**

```bash
git config user.name
git config user.email
```

查看 git 配置信息

```sh
git config --global --list
```

## 三、创建远程仓库

### 3.1 普通仓库

1.进入 gitee 页面,注册账号,登入,点击右上角"+"创建新仓库
![](https://gitee.com/xarzhi/picture/raw/master/img/newck.png)

### 3.2 ssh 方式

#### 1.检查密钥

```bash
ls -al ~/.ssh
```

如果能进入到.ssh 文件目录下 ，则证明，之前生成过.ssh 秘钥，可以直接使用里面的秘钥

#### 2.生成密钥

```bash
ssh-keygen -t rsa -C 'git设置的邮箱'
```

代码参数含义：

> -t 指定密钥类型，默认是 rsa ，可以省略。
> -C 设置注释文字，比如邮箱。
> -f 指定密钥文件存储文件名

最后在.ssh 目录下(C:\Users\dell\\.ssh)得到了两个文件：

-   id_rsa（私有秘钥）
-   和 id_rsa.pub（公有密钥）
-   把 id_rsa.pub 中的内容复制到 ssh 中
    ![](https://gitee.com/xarzhi/picture/raw/master/img/1611713061523.png)

#### 3.将秘钥添加到远端

首先，打开`C:\Users\dell\\.ssh`目录下找到`id_rsa.pub`这个文件,用记事本打开复制全部内容,然后登入码云,`点击右上角头像`=>`设置`=>`ssh公钥`中进行添加

之后即可通过`git remote add origin ssh地址`把代码通过 ssh 密钥方式放到远程仓库

## 四、git 的工作流

### 4.1 git 的四个区域

1. **工作区（Working Directory）**：在电脑里能看到的目录
2. **暂存区（Stage/Index）**：一般存放在.git 目录下的 index 文件
3. **本地仓库（Repository）**：工作区有一个隐藏目录.git
4. **远程仓库（remote）**：托管在远程服务器的仓库

![image-20230604102809495](https://gitee.com/xarzhi/picture/raw/master/img/image-20230604102809495.png)

### 4.2 git 的三种状态

1. **已修改(Modified)**：修改了文件,但没保存到暂存区
2. **已暂存(Staged)**：把修改后的文件放到暂存区
3. **已提交(Committed)**：把暂存区的文件提交到本地仓库

![image-20230604103256754](https://gitee.com/xarzhi/picture/raw/master/img/image-20230604103256754.png)

### 4.3 基本概念

-   **main**：默认主分支
-   **origin**：默认远程仓库
-   **HEAD**：指向当前分支的指针
-   **HEAD^**：上一个版本
-   **HEAD~4**：上 4 各版本

## 五、git 常用指令

### 5.1 初始化仓库

往往只需要第一次使用初始化

指令运行后目录下会多一个`.git`文件夹

```bash
git init
```

### 5.2 工作区 → 暂存区

```bash
# 添加指定文件
git add xxx

# 添加目录下所有文件
git add .
```

### 5.3 暂存区 → 本地仓库

提交**所有文件**到本地仓库

```bash
git commit -m '描述内容'
```

提交**所有已修改文件**到本地仓库

```sh
git commit -am '描述内容'
```

**修改描述内容**

```bash
git commit --amend

#如果需要提交新的说明
git commit --amend -m
```

### 5.4 添加远程源

#### 连接本地仓库与远程仓库

```bash
git remote add origin https://xxx
```

#### 查看远程仓库地址

```bash
git remote -v
```

#### 修改远程源

```bash
 #先移除原先的远程源
 git remote rm origin
 #再添加新的远程源
 git remote add origin...
```

### 5.5 本地仓库 → 远程仓库

```bash
#第一次推送
#将本地的代码推送到远程仓库上的主（master）分支
git push -u origin master

#后续在提交代码的时候,不需要输入完整指令了
#只需要输入 git push指令就可以直接推送代码了
git push
```

### 5.6 回退本地仓库版本

#### 1.查看提交日志

可查看每次提交的**版本号**、作者的用户名邮箱、日期、以及提交时 commit 的描述内容

```bash
git log
```

查看简介的提交信息

-   使用此指令时，版本号比较短，可以直接赋值版本号以回退版本

```sh
git log --oneline
```

#### 2.根据版本号回退版本

```bash
git reset --hard 版本号
```

**reset 有三个参数**

| 指令                            | 作用                                       |
| ------------------------------- | ------------------------------------------ |
| git reset **--soft**            | 回退版本，保留工作区和暂存区内容           |
| git reset **--hard**            | 回退版本，不保留工作区和暂存区内容         |
| git reset **--mixed**（默认值） | 回退版本，保留工作区内容，不保留暂存区内容 |

![img](https://gitee.com/xarzhi/picture/raw/master/img/E1F640E72CB285A41B76D3A5435271CE.jpg)

#### 3.回退到上一个版本

```shell
git reset --mixed HEAD^
```

撤销最新的提交并保留更改

```shell
$ git reset HEAD^
```

这会将最新的提交从 master 分支中撤销，但会保留更改在工作目录中。你可以修改这些更改，然后重新提交。

撤销最新的提交并丢弃更改

```shell
$ git reset --hard HEAD^
```

这会完全撤销最新的提交，并丢弃相关的更改。慎用，因为这将永久丢失你的更改

创建新的修复提交

如果你不想删除最新的提交，而是创建一个新的提交来修复问题，可以进行如下操作：

- 在 master 分支上创建一个新的分支来进行修复：

```shell
$ git checkout -b fix-branch master
```

- 在新分支上进行修改，修复代码中的问题。
- 提交并推送修复：

```shell
$ git add .
$ git commit -m "Fixing the issue"
$ git push origin fix-branch
```







## 六、远程操作

### 6.1 克隆项目代码

```bash
#url为远程仓库的地址，例如：http://gitee.com......
git clone url
```

### 6.2 拉取代码

**远程代码版本已经发生了变更,本地代码不同步的时候,需要使用 git pull 拉取最新的代码**

git pull 指令在**本地有仓库的时候**才可以使用

相当于`git fetch+git merge`

```bash
git pull
```

#### 拉取指定分支

```bash
#branch 为指定的分支名称
git pull origin branch
```

## 七、其他操作

### 7.1 查看变更内容

当有文件冲突的时候，可以查看冲突的内容

可以比较工作区、暂存区、版本库之间的差异

```bash
git diff
```

比较两个版本之间的差异

```sh
git diff 版本号1 版本号2
```

![image-20230604112737003](https://gitee.com/xarzhi/picture/raw/master/img/image-20230604112737003.png)

### 7.2 删除文件

```bash
git rm xxx
```

![image-20230604113040821](https://gitee.com/xarzhi/picture/raw/master/img/image-20230604113040821.png)

### 7.3 停止追踪但不删除

```bash
git rm --cached
```

### 7.4 查看提交状态

可查看当前处于哪个**分支**、有哪些**文件**、以及这些文件处于什么**状态**

```bash
git status
```

### 7.5 重命名文件

```bash
git mv name1 name2
```

### 7.6 还原暂存区文件

文件被删后，把暂存区文件还原到工作目录

```bash
git checkout -- xxx
```

## 八、分支操作

### 8.1 创建分支

创建本地分支，但不会切换到新创建的分支

```sh
git branch xxx
```

### 8.2 创建并切换分支

基于远程**默认分支**创建 xxx**本地分支**，并切换到 xxx 分支

```bash
git checkout -b xxx
```

基于远程的 test 本地分支，在本地起名为 test 分支，并切换到本地的 test 分支

```bash
git checkout -b test origin/test
```

### 8.3 切换分支

切换到 xxx 分支

```bash
git checkout xxx
```

`checkout`可以用来切换分支，也可以用来还原暂存区文件，若文件的名称和分支的名称相同，`git checkout`命令会优先切换分支

git 官方在 2.23 版本开始提供了一个新的切换分支的命令

```sh
git switch xxx
```

### 8.4 查看分支

#### 查看本地分支

-   绿色代表当前所在分支，其他分支为白色
-   首次克隆默认分支就算自己创建的

```bash
git branch
```

#### 查看所有分支

-   查看本地以及远程的所有分支
-   远程分支会用**红色**表示出来，当前所在分支为**绿色**，本地其他分支为**白色**

```bash
git branch -a
```

#### 将远程信息拉取到本地

-   重新缓存所有信息
-   会存到`.git`目录中，不会自动合并代码
-   当我们在远程创建了一个分支，使用 git branch 但不显示刚创建的新分支，需要使用此命令拉取分支信息

```bash
git fetch
```

### 8.4 合并分支

将选定分支合并到 HEAD 所在分支

```bash
# b合并到a
a git merge b
```

### 8.5 删除分支

#### 删除已合并的分支

`-d`是`--delete`的缩写

```bash
# 删除本地分支
git branch -d <branch>
# 删除远端分支
git push origin -d <branch>
```

#### 删除未合并的分支

-D 是–delete –force 的缩写，这样写可以在不检查 merge 状态的情况下删除分支

```sh
git branch -D <branch>
```

## 九、gitignore 文件配置

`.gitignore`文件中声明的文件不会被上传到仓库中

1. 忽略目录下的全部内容：`folder/*`
2. 忽略文件类型：`*.csv`
3. 反选模式：`!`

![image-20230604113144661](https://gitee.com/xarzhi/picture/raw/master/img/image-20230604113144661.png)

### .gitignore 文件的匹配规则

-   空行或者以`#`开头的行会被 Git 忽略。一般空行用于可读性的分隔，`#`一般用作注释

-   使用标准的 Blob 模式匹配,例如:

    -   星号`*`通配任意个字符
    -   问号`?`匹配单个字符
    -   中括号`[]`表示匹配列表中的单个字符,比如: `[abc]`表示 a/b/c

-   两个星号`**`表示匹配任意的中间目录

-   中括号可以使用短中线连接,比如:

    -   [0-9]表示任意一位数字,[a-z]表示任意一位小写字母

-   感叹号`!`表示取反
