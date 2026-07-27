# Trait std::ops::Index

用于在不可变上下文中索引操作 (`container[index]`)。

`container[index]` 实际上是 `*container.index(index)` 的语法糖，但仅在用作不可变值时使用。

如果请求一个可变值，则使用 [`IndexMut`](./IndexMut)。

如果 `value` 的类型实现 `Copy`，则这允许使用诸如 `let value = v[index]` 之类的语法。

```rust
pub trait Index<Idx>
where
    Idx: ?Sized,
{
    type Output: ?Sized;

    // Required method
    fn index(&self, index: Idx) -> &Self::Output;
}
```

下面的示例在只读 `NucleotideCount` 容器上实现 `Index`，从而可以使用索引语法检索单个计数。

```rust
use std::ops::Index;

enum Nucleotide {
    A,
    C,
    G,
    T,
}

struct NucleotideCount {
    a: usize,
    c: usize,
    g: usize,
    t: usize,
}

impl Index<Nucleotide> for NucleotideCount {
    type Output = usize;

    fn index(&self, nucleotide: Nucleotide) -> &Self::Output {
        match nucleotide {
            Nucleotide::A => &self.a,
            Nucleotide::C => &self.c,
            Nucleotide::G => &self.g,
            Nucleotide::T => &self.t,
        }
    }
}

let nucleotide_count = NucleotideCount {a: 14, c: 9, g: 10, t: 12};
assert_eq!(nucleotide_count[Nucleotide::A], 14);
assert_eq!(nucleotide_count[Nucleotide::C], 9);
assert_eq!(nucleotide_count[Nucleotide::G], 10);
assert_eq!(nucleotide_count[Nucleotide::T], 12);
```



## Required Associated Types

### Output

索引后返回的类型。

```rust
type Output: ?Sized
```



## Required Methods

### index

执行索引`container[index]`操作。

```rust
fn index(&self, index: Idx) -> &Self::Output
```



:::tip Panics

如果索引越界，则可能为 panic。

:::

## Implementors

### String

```rust
impl Index<Range<usize>> for String
```



### CStr

```rust
impl Index<RangeFrom<usize>> for CStr
```



### String

```rust
impl Index<RangeFrom<usize>> for String
```



### CString

```rust
impl Index<RangeFull> for CString
```



### OsString

```rust
impl Index<RangeFull> for OsString
```



### String

```rust
impl Index<RangeFull> for String
```



### String

```rust
impl Index<RangeInclusive<usize>> for String
```



### String

```rust
impl Index<RangeTo<usize>> for String
```



### String

```rust
impl Index<RangeToInclusive<usize>> for String
```



### str

```rust
impl<I> Index<I> for str
where
  I: SliceIndex<str>,
```



### Simd<T, LANES>

```rust
impl<I, T, const LANES: usize> Index<I> for Simd<T, LANES>
where
  T: SimdElement,
  LaneCount<LANES>: SupportedLaneCount,
  I: SliceIndex<[T]>,
```



### BTreeMap<K, V, A>

```rust
impl<K, Q, V, A> Index<&Q> for BTreeMap<K, V, A>
where
  A: Allocator + Clone,
  K: Borrow<Q> + Ord,
  Q: Ord + ?Sized,
```



### HashMap<K, V, S>

```rust
impl<K, Q, V, S> Index<&Q> for HashMap<K, V, S>
where
  K: Eq + Hash + Borrow<Q>,
  Q: Eq + Hash + ?Sized,
  S: BuildHasher,
```



### VecDeque<T, A>

```rust
impl<T, A> Index<usize> for VecDeque<T, A>
where
  A: Allocator,
```



### [T]

```rust
impl<T, I> Index<I> for [T]
where
  I: SliceIndex<[T]>,
```



### Vec<T, A>

```rust
impl<T, I, A> Index<I> for Vec<T, A>
where
  I: SliceIndex<[T]>,
  A: Allocator,
```



### [T; N]

```rust
impl<T, I, const N: usize> Index<I> for [T; N]
where
	[T]: Index<I>,
```

