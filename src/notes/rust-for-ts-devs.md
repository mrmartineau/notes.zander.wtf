---
title: Rust for TypeScript developers
tags:
  - rust
  - typescript
  - cheatsheet
date: git Last Modified
emoji: 🦀
---

A guide to Rust for developers coming from TypeScript/JavaScript.

## Key differences from TypeScript

| Concept | TypeScript | Rust |
|---------|-----------|------|
| Typing | Static, structural | Static, nominal + ownership |
| Execution | Interpreted (via JS) | Compiled to native binary |
| Memory | Garbage collected | Ownership system (no GC) |
| Null | `null` / `undefined` | `Option<T>` (no null) |
| Errors | Exceptions | `Result<T, E>` (no exceptions) |
| Package manager | npm/yarn/pnpm | Cargo |
| Concurrency | Single-threaded + async | Multi-threaded + async |

## Variables and constants

### TypeScript

```ts
const name: string = "Alice"
let age: number = 30
const isActive = true
```

### Rust

```rust
// Immutable by default (like const)
let name: &str = "Alice";
let name = "Alice";  // Type inference

// Mutable (like let)
let mut age = 30;
age = 31;  // OK

// Constants (compile-time, SCREAMING_CASE)
const MAX_SIZE: usize = 100;

// Static (like const but with fixed memory address)
static VERSION: &str = "1.0.0";

// Shadowing (redeclare with same name)
let x = 5;
let x = x + 1;  // New variable, shadows previous
let x = "now a string";  // Can change type!
```

## Basic types

| TypeScript | Rust |
|-----------|------|
| `string` | `String` (owned) or `&str` (borrowed) |
| `number` | `i32`, `i64`, `f32`, `f64`, `usize`, etc. |
| `boolean` | `bool` |
| `any` | No equivalent (use enums/generics) |
| `null` / `undefined` | `Option<T>` |
| `Array<T>` | `Vec<T>` (heap) or `[T; N]` (stack) |
| `Record<K, V>` | `HashMap<K, V>` |
| `Set<T>` | `HashSet<T>` |
| `[T, U]` | `(T, U)` tuple |

### Numeric types

```rust
// Signed integers
let a: i8 = 127;
let b: i16 = 32_767;
let c: i32 = 2_147_483_647;  // Default integer type
let d: i64 = 9_223_372_036_854_775_807;
let e: i128 = 170_141_183_460_469_231_731_687_303_715_884_105_727;

// Unsigned integers
let a: u8 = 255;
let b: u32 = 4_294_967_295;
let c: usize = 100;  // Pointer-sized (for indexing)

// Floating point
let f: f32 = 3.14;
let g: f64 = 3.141592653589793;  // Default float type

// Underscores for readability
let million = 1_000_000;
```

### Strings

```rust
// &str - string slice (borrowed, immutable, on stack or in binary)
let s: &str = "hello";  // String literal

// String - owned, heap-allocated, growable
let mut s = String::from("hello");
s.push_str(", world!");

// Converting
let owned: String = "hello".to_string();
let owned: String = String::from("hello");
let slice: &str = &owned;  // Borrow as slice

// String formatting
let name = "Alice";
let greeting = format!("Hello, {}!", name);
println!("Hello, {}!", name);  // Print to stdout
```

## Functions

### TypeScript

```ts
function greet(name: string): string {
    return `Hello, ${name}!`
}

const add = (a: number, b: number): number => a + b

function log(message: string, level: string = "INFO"): void {
    console.log(`[${level}] ${message}`)
}
```

### Rust

```rust
// Basic function
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

// No return keyword for last expression (no semicolon!)
fn add(a: i32, b: i32) -> i32 {
    a + b  // No semicolon = return value
}

// Explicit return
fn add(a: i32, b: i32) -> i32 {
    return a + b;  // Semicolon with return keyword
}

// No default parameters - use Option or builder pattern
fn log(message: &str, level: Option<&str>) {
    let level = level.unwrap_or("INFO");
    println!("[{}] {}", level, message);
}
log("Hello", None);
log("Hello", Some("DEBUG"));

// Closures (like arrow functions)
let add = |a: i32, b: i32| a + b;
let add = |a, b| a + b;  // Type inference in context

// Multi-line closure
let process = |x: i32| {
    let y = x * 2;
    y + 1
};
```

## Ownership and borrowing

**This is THE key concept in Rust.** There's no garbage collector - instead, Rust uses ownership rules enforced at compile time.

### The rules

1. Each value has exactly one owner
2. When the owner goes out of scope, the value is dropped
3. You can borrow references: `&T` (immutable) or `&mut T` (mutable)
4. You can have many `&T` OR one `&mut T`, never both

### TypeScript

```ts
function process(data: string[]): void {
    console.log(data)
}

const arr = ["a", "b", "c"]
process(arr)
console.log(arr)  // Still accessible - GC handles memory
```

### Rust

```rust
fn process(data: Vec<String>) {
    println!("{:?}", data);
}  // data is dropped here

let arr = vec!["a".to_string(), "b".to_string()];
process(arr);  // Ownership MOVED to function
// println!("{:?}", arr);  // ERROR! arr no longer valid

// Solution 1: Clone (copy the data)
let arr = vec!["a".to_string(), "b".to_string()];
process(arr.clone());  // Clone is moved
println!("{:?}", arr);  // Original still valid

// Solution 2: Borrow (pass a reference)
fn process(data: &Vec<String>) {
    println!("{:?}", data);
}

let arr = vec!["a".to_string(), "b".to_string()];
process(&arr);  // Borrow
println!("{:?}", arr);  // Still valid!

// Solution 3: Mutable borrow
fn add_item(data: &mut Vec<String>) {
    data.push("c".to_string());
}

let mut arr = vec!["a".to_string(), "b".to_string()];
add_item(&mut arr);
println!("{:?}", arr);  // ["a", "b", "c"]
```

## Structs

### TypeScript

```ts
interface User {
    id: number
    name: string
    email?: string
}

class UserService {
    private users: User[] = []

    addUser(user: User): void {
        this.users.push(user)
    }
}
```

### Rust

```rust
// Struct (like interface)
struct User {
    id: u32,
    name: String,
    email: Option<String>,  // Optional field
}

// Implementation block (like class methods)
impl User {
    // Associated function (like static method)
    fn new(id: u32, name: String) -> Self {
        Self {
            id,
            name,
            email: None,
        }
    }

    // Method (takes &self or &mut self)
    fn greet(&self) -> String {
        format!("Hello, {}!", self.name)
    }

    fn set_email(&mut self, email: String) {
        self.email = Some(email);
    }
}

// Usage
let mut user = User::new(1, "Alice".to_string());
user.set_email("alice@example.com".to_string());
println!("{}", user.greet());

// Shorthand initialization
let name = "Alice".to_string();
let user = User { id: 1, name, email: None };

// Struct update syntax (like spread)
let user2 = User { id: 2, ..user };  // Note: moves non-Copy fields!
```

### Tuple structs and unit structs

```rust
// Tuple struct
struct Point(f64, f64);
let p = Point(3.0, 4.0);
println!("{}, {}", p.0, p.1);

// Unit struct (no fields)
struct Marker;

// Newtype pattern (wrapper for type safety)
struct UserId(u32);
struct PostId(u32);

fn get_user(id: UserId) { }
// get_user(PostId(1));  // ERROR! Type mismatch
```

## Enums (sum types)

Rust enums are much more powerful than TypeScript enums - they're sum types that can hold data.

### TypeScript

```ts
type Result<T, E> =
    | { ok: true; value: T }
    | { ok: false; error: E }

type Status = "pending" | "active" | "inactive"
```

### Rust

```rust
// Simple enum
enum Status {
    Pending,
    Active,
    Inactive,
}

let status = Status::Active;

// Enum with data (like discriminated unions)
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(u8, u8, u8),
}

let msg = Message::Move { x: 10, y: 20 };
let msg = Message::Write("hello".to_string());

// Pattern matching (like switch but exhaustive)
match msg {
    Message::Quit => println!("Quit"),
    Message::Move { x, y } => println!("Move to {}, {}", x, y),
    Message::Write(text) => println!("Text: {}", text),
    Message::ChangeColor(r, g, b) => println!("Color: {}, {}, {}", r, g, b),
}
```

### Option and Result (built-in)

```rust
// Option<T> - replaces null/undefined
enum Option<T> {
    Some(T),
    None,
}

let name: Option<String> = Some("Alice".to_string());
let missing: Option<String> = None;

// Handling Option
match name {
    Some(n) => println!("Name: {}", n),
    None => println!("No name"),
}

// Shortcuts
let n = name.unwrap();              // Panics if None!
let n = name.unwrap_or("default".to_string());
let n = name.unwrap_or_else(|| compute_default());
let n = name.expect("Name required");  // Panic with message

// if let (when you only care about one variant)
if let Some(n) = name {
    println!("Name: {}", n);
}

// Result<T, E> - for operations that can fail
enum Result<T, E> {
    Ok(T),
    Err(E),
}

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("Division by zero".to_string())
    } else {
        Ok(a / b)
    }
}

// Handling Result
match divide(10.0, 2.0) {
    Ok(result) => println!("Result: {}", result),
    Err(e) => println!("Error: {}", e),
}

// The ? operator (propagate errors, like throw)
fn calculate() -> Result<f64, String> {
    let a = divide(10.0, 2.0)?;  // Returns Err early if error
    let b = divide(a, 2.0)?;
    Ok(b)
}
```

## Traits (interfaces)

### TypeScript

```ts
interface Drawable {
    draw(): void
}

interface Resizable {
    resize(width: number, height: number): void
}

class Circle implements Drawable, Resizable {
    draw() { /* ... */ }
    resize(w: number, h: number) { /* ... */ }
}
```

### Rust

```rust
trait Drawable {
    fn draw(&self);
}

trait Resizable {
    fn resize(&mut self, width: u32, height: u32);
}

struct Circle {
    radius: f64,
}

impl Drawable for Circle {
    fn draw(&self) {
        println!("Drawing circle with radius {}", self.radius);
    }
}

impl Resizable for Circle {
    fn resize(&mut self, width: u32, _height: u32) {
        self.radius = width as f64 / 2.0;
    }
}

// Trait bounds (like generic constraints)
fn render<T: Drawable>(item: &T) {
    item.draw();
}

// Multiple bounds
fn process<T: Drawable + Resizable>(item: &mut T) {
    item.draw();
    item.resize(100, 100);
}

// where clause (cleaner for complex bounds)
fn complex<T, U>(t: &T, u: &U) -> String
where
    T: Drawable + Clone,
    U: Resizable,
{
    // ...
}

// Default implementations
trait Greet {
    fn name(&self) -> &str;

    fn greet(&self) -> String {
        format!("Hello, {}!", self.name())
    }
}
```

### Common traits to implement

```rust
// Debug - for {:?} formatting
#[derive(Debug)]
struct Point { x: f64, y: f64 }

// Clone - explicit copying
#[derive(Clone)]
struct Data { values: Vec<i32> }

// Copy - implicit copying (for simple stack types)
#[derive(Copy, Clone)]
struct Point { x: f64, y: f64 }

// PartialEq, Eq - equality comparison
#[derive(PartialEq, Eq)]
struct Id(u32);

// Default - default value
#[derive(Default)]
struct Config {
    debug: bool,
    port: u16,
}
let config = Config::default();

// Derive multiple
#[derive(Debug, Clone, PartialEq)]
struct User { name: String }
```

## Collections

### TypeScript

```ts
const arr: number[] = [1, 2, 3]
arr.push(4)
const doubled = arr.map(n => n * 2)
const evens = arr.filter(n => n % 2 === 0)
const sum = arr.reduce((a, b) => a + b, 0)
```

### Rust

```rust
// Vec<T> - dynamic array
let mut arr = vec![1, 2, 3];
arr.push(4);

// Iterators (lazy, chainable - like JS but more powerful)
let doubled: Vec<i32> = arr.iter()
    .map(|n| n * 2)
    .collect();

let evens: Vec<&i32> = arr.iter()
    .filter(|n| *n % 2 == 0)
    .collect();

let sum: i32 = arr.iter().sum();

// Or with fold (like reduce)
let sum: i32 = arr.iter().fold(0, |acc, n| acc + n);

// Iteration
for n in &arr {
    println!("{}", n);
}

for (i, n) in arr.iter().enumerate() {
    println!("{}: {}", i, n);
}

// Common iterator methods
arr.iter().count();
arr.iter().any(|n| *n > 2);
arr.iter().all(|n| *n > 0);
arr.iter().find(|n| **n > 2);
arr.iter().position(|n| *n == 2);
arr.iter().take(2);
arr.iter().skip(1);
arr.iter().chain(other.iter());
arr.iter().zip(other.iter());
arr.iter().flat_map(|n| vec![*n, *n]);
```

### HashMap

```rust
use std::collections::HashMap;

let mut scores: HashMap<String, i32> = HashMap::new();
scores.insert("Alice".to_string(), 100);
scores.insert("Bob".to_string(), 85);

// From iterator
let scores: HashMap<_, _> = vec![
    ("Alice", 100),
    ("Bob", 85),
].into_iter().collect();

// Access
let alice_score = scores.get("Alice");  // Option<&i32>
let alice_score = scores["Alice"];      // Panics if missing!

// Check and insert
scores.entry("Charlie".to_string()).or_insert(0);

// Update
scores.entry("Alice".to_string())
    .and_modify(|score| *score += 10)
    .or_insert(0);

// Iterate
for (name, score) in &scores {
    println!("{}: {}", name, score);
}

// Remove
scores.remove("Bob");
```

## Error handling

### TypeScript

```ts
try {
    const data = await fetchData()
} catch (error) {
    console.error("Failed:", error)
    throw error
}
```

### Rust

```rust
use std::fs::File;
use std::io::{self, Read};

// Result-based error handling (no exceptions!)
fn read_file(path: &str) -> Result<String, io::Error> {
    let mut file = File::open(path)?;  // ? propagates error
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

// Handling errors
match read_file("config.txt") {
    Ok(contents) => println!("{}", contents),
    Err(e) => eprintln!("Error: {}", e),
}

// With if let
if let Ok(contents) = read_file("config.txt") {
    println!("{}", contents);
}

// Unwrap (panic on error - use sparingly!)
let contents = read_file("config.txt").unwrap();
let contents = read_file("config.txt").expect("Failed to read config");

// Custom error types
#[derive(Debug)]
enum AppError {
    IoError(io::Error),
    ParseError(String),
    NotFound,
}

impl From<io::Error> for AppError {
    fn from(error: io::Error) -> Self {
        AppError::IoError(error)
    }
}

// Using thiserror crate (recommended)
use thiserror::Error;

#[derive(Error, Debug)]
enum AppError {
    #[error("IO error: {0}")]
    Io(#[from] io::Error),
    #[error("Parse error: {0}")]
    Parse(String),
    #[error("Not found")]
    NotFound,
}

// Using anyhow for application code
use anyhow::{Context, Result};

fn load_config() -> Result<Config> {
    let contents = std::fs::read_to_string("config.json")
        .context("Failed to read config file")?;
    let config: Config = serde_json::from_str(&contents)
        .context("Failed to parse config")?;
    Ok(config)
}
```

## Async/Await

### TypeScript

```ts
async function fetchData(url: string): Promise<Response> {
    const response = await fetch(url)
    return response
}

const results = await Promise.all([
    fetchData("url1"),
    fetchData("url2")
])
```

### Rust

```rust
// Requires async runtime (tokio or async-std)
use tokio;

async fn fetch_data(url: &str) -> Result<String, reqwest::Error> {
    let response = reqwest::get(url).await?;
    response.text().await
}

// Main function with tokio
#[tokio::main]
async fn main() {
    let result = fetch_data("https://api.example.com").await;
}

// Concurrent execution (like Promise.all)
use futures::future::join_all;

async fn fetch_all(urls: Vec<&str>) -> Vec<Result<String, reqwest::Error>> {
    let futures: Vec<_> = urls.into_iter()
        .map(|url| fetch_data(url))
        .collect();

    join_all(futures).await
}

// Or with tokio::join! for fixed number
let (result1, result2) = tokio::join!(
    fetch_data("url1"),
    fetch_data("url2")
);

// Spawn task (like fire and forget)
tokio::spawn(async {
    // Background work
});
```

## Generics

### TypeScript

```ts
function first<T>(arr: T[]): T | undefined {
    return arr[0]
}

interface Container<T> {
    value: T
    map<U>(fn: (v: T) => U): Container<U>
}
```

### Rust

```rust
// Generic function
fn first<T>(slice: &[T]) -> Option<&T> {
    slice.first()
}

// Generic struct
struct Container<T> {
    value: T,
}

impl<T> Container<T> {
    fn new(value: T) -> Self {
        Self { value }
    }

    fn map<U, F>(self, f: F) -> Container<U>
    where
        F: FnOnce(T) -> U,
    {
        Container { value: f(self.value) }
    }
}

// Usage
let c = Container::new(42);
let doubled = c.map(|n| n * 2);

// Constrained generics
fn print_debug<T: std::fmt::Debug>(value: T) {
    println!("{:?}", value);
}

// Multiple bounds
fn process<T: Clone + Debug>(value: T) { }

// impl Trait (simpler syntax for return types)
fn make_iterator() -> impl Iterator<Item = i32> {
    vec![1, 2, 3].into_iter()
}
```

## Modules

### TypeScript

```ts
// utils.ts
export function helper() {}
export const VERSION = "1.0"

// main.ts
import { helper, VERSION } from './utils'
```

### Rust

```rust
// src/utils.rs
pub fn helper() {}
pub const VERSION: &str = "1.0";

// Private by default
fn internal() {}

// src/main.rs
mod utils;  // Declare module

use crate::utils::helper;
use crate::utils::VERSION;

fn main() {
    helper();
}

// Nested modules
mod outer {
    pub mod inner {
        pub fn function() {}
    }
}

use outer::inner::function;

// Re-exports
pub use self::inner::function;
```

### Project structure

```
my_project/
├── Cargo.toml
├── src/
│   ├── main.rs       # Binary entry point
│   ├── lib.rs        # Library entry point
│   ├── utils.rs      # Module file
│   └── models/       # Module directory
│       ├── mod.rs    # Module declaration
│       └── user.rs   # Submodule
```

## Package management (Cargo)

### TypeScript

```bash
npm init
npm install express
npm install -D typescript
```

### Rust

```bash
cargo new my_project
cargo add serde
cargo add tokio --features full
```

```toml
# Cargo.toml
[package]
name = "my_project"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }

[dev-dependencies]
mockall = "0.11"
```

```bash
cargo build          # Build
cargo run            # Build and run
cargo test           # Run tests
cargo check          # Fast syntax check
cargo clippy         # Linter
cargo fmt            # Format code
cargo doc --open     # Generate docs
```

## JSON handling (serde)

### TypeScript

```ts
interface User {
    id: number
    name: string
}
const json = JSON.stringify(user)
const parsed: User = JSON.parse(json)
```

### Rust

```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct User {
    id: u32,
    name: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    email: Option<String>,
    #[serde(rename = "createdAt")]
    created_at: String,
}

// Serialize (stringify)
let user = User { id: 1, name: "Alice".into(), email: None, created_at: "2024-01-01".into() };
let json = serde_json::to_string(&user)?;
let json_pretty = serde_json::to_string_pretty(&user)?;

// Deserialize (parse)
let user: User = serde_json::from_str(&json)?;

// Dynamic JSON
use serde_json::Value;
let v: Value = serde_json::from_str(data)?;
let name = v["name"].as_str();
```

## HTTP server (axum)

### TypeScript (Express)

```ts
import express from 'express'

const app = express()
app.use(express.json())

app.get('/users/:id', (req, res) => {
    res.json({ id: req.params.id, name: 'Alice' })
})

app.listen(3000)
```

### Rust (axum)

```rust
use axum::{
    routing::{get, post},
    Router, Json, extract::Path,
};
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
struct User {
    id: u32,
    name: String,
}

#[derive(Deserialize)]
struct CreateUser {
    name: String,
}

async fn get_user(Path(id): Path<u32>) -> Json<User> {
    Json(User { id, name: "Alice".into() })
}

async fn create_user(Json(payload): Json<CreateUser>) -> Json<User> {
    Json(User { id: 1, name: payload.name })
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/users/:id", get(get_user))
        .route("/users", post(create_user));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
```

## Testing

### TypeScript (Jest)

```ts
describe('math', () => {
    it('adds numbers', () => {
        expect(add(1, 2)).toBe(3)
    })
})
```

### Rust

```rust
// Tests in same file
fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(1, 2), 3);
    }

    #[test]
    fn test_add_negative() {
        assert_eq!(add(-1, 1), 0);
    }

    #[test]
    #[should_panic(expected = "divide by zero")]
    fn test_divide_by_zero() {
        divide(1, 0);
    }

    #[test]
    fn test_result() -> Result<(), String> {
        let result = divide(10, 2)?;
        assert_eq!(result, 5);
        Ok(())
    }
}

// Integration tests in tests/ directory
// tests/integration_test.rs
use my_crate::public_function;

#[test]
fn test_integration() {
    assert!(public_function());
}
```

```bash
cargo test
cargo test test_add  # Run specific test
cargo test -- --nocapture  # Show println! output
```

## Common gotchas for TS developers

1. **Immutable by default** - use `mut` for mutable variables
2. **Ownership** - values have one owner, moves happen
3. **Borrowing** - `&` for shared ref, `&mut` for exclusive ref
4. **No null** - use `Option<T>` and handle `None`
5. **No exceptions** - use `Result<T, E>` and `?` operator
6. **Semicolons matter** - no semicolon = expression return value
7. **String types** - `String` (owned) vs `&str` (borrowed)
8. **`==` always strict** - no type coercion
9. **No function overloading** - use traits or different names
10. **Explicit type conversion** - `as`, `into()`, `from()`

```rust
// Expression vs statement
let x = {
    let y = 5;
    y + 1  // No semicolon = return value
};  // x = 6

let x = {
    let y = 5;
    y + 1;  // Semicolon = statement, returns ()
};  // x = ()
```

## Resources

- [The Rust Book](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rustlings (exercises)](https://github.com/rust-lang/rustlings)
- [Rust Playground](https://play.rust-lang.org/)
- [crates.io (package registry)](https://crates.io/)
- [docs.rs (documentation)](https://docs.rs/)

