---
title: C++ for TypeScript developers
tags:
  - cpp
  - typescript
  - cheatsheet
date: git Last Modified
emoji: ⚡
---

A guide to C++ for developers coming from TypeScript/JavaScript.

## Key differences from TypeScript

| Concept | TypeScript | C++ |
|---------|-----------|-----|
| Typing | Static, structural | Static, nominal |
| Execution | Interpreted (via JS engine) | Compiled to native binary |
| Memory | Garbage collected | Manual (or smart pointers) |
| Null | `null` / `undefined` | `nullptr`, uninitialized |
| Package manager | npm/yarn/pnpm | vcpkg, Conan, CMake |
| Build system | Bundlers (Webpack, etc.) | CMake, Make, Ninja |

## Variables and constants

### TypeScript

```ts
const name: string = "Alice"
let age: number = 30
const isActive = true
```

### C++

```cpp
#include <string>

// Variables
std::string name = "Alice";     // std::string, not primitive
int age = 30;
bool isActive = true;
double price = 19.99;

// const (compile-time or runtime constant)
const int MAX_SIZE = 100;
const std::string PREFIX = "user_";

// constexpr (compile-time constant, preferred)
constexpr int BUFFER_SIZE = 1024;

// auto (type inference, like TypeScript's inference)
auto count = 42;        // int
auto message = "hello"; // const char*
auto name = std::string("Alice"); // std::string
```

## Basic types

| TypeScript | C++ |
|-----------|-----|
| `string` | `std::string` |
| `number` | `int`, `long`, `float`, `double` |
| `boolean` | `bool` |
| `any` | No direct equivalent (use templates/variants) |
| `null` | `nullptr` (for pointers) |
| `Array<T>` | `std::vector<T>` |
| `Record<K, V>` | `std::map<K, V>` or `std::unordered_map<K, V>` |
| `Set<T>` | `std::set<T>` or `std::unordered_set<T>` |
| `[T, U]` | `std::tuple<T, U>` or `std::pair<T, U>` |

### Numeric types

```cpp
// Integers
int x = 42;                    // At least 16 bits
long y = 100000L;              // At least 32 bits
long long z = 10000000000LL;   // At least 64 bits

// Fixed-width integers (preferred)
#include <cstdint>
int32_t a = 42;
int64_t b = 100000;
uint32_t c = 42;  // Unsigned

// Floating point
float f = 3.14f;
double d = 3.14159265359;

// Size in bytes
sizeof(int);    // Platform dependent (usually 4)
sizeof(double); // Usually 8
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

### C++

```cpp
#include <string>
#include <iostream>

// Basic function
std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

// Lambda (like arrow functions)
auto add = [](int a, int b) -> int {
    return a + b;
};
// Short form
auto add = [](int a, int b) { return a + b; };

// Default parameters
void log(const std::string& message, const std::string& level = "INFO") {
    std::cout << "[" << level << "] " << message << "\n";
}

// Function overloading (multiple functions, same name)
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
std::string add(const std::string& a, const std::string& b) { return a + b; }

// Pass by value, reference, or pointer
void byValue(int x);              // Copy
void byReference(int& x);         // Mutable reference
void byConstRef(const int& x);    // Read-only reference
void byPointer(int* x);           // Pointer (can be null)
```

### Lambda captures

```cpp
int factor = 2;

// Capture by value (copy)
auto multiply = [factor](int n) { return n * factor; };

// Capture by reference
auto increment = [&factor](int n) { factor++; return n * factor; };

// Capture all by value
auto fn1 = [=]() { return factor; };

// Capture all by reference
auto fn2 = [&]() { factor++; };

// Mixed
auto fn3 = [=, &factor]() { /* ... */ };
```

## Classes

### TypeScript

```ts
class User {
    private id: number
    public name: string
    readonly email: string

    constructor(id: number, name: string, email: string) {
        this.id = id
        this.name = name
        this.email = email
    }

    greet(): string {
        return `Hello, ${this.name}`
    }

    static create(name: string): User {
        return new User(Date.now(), name, "")
    }
}
```

### C++

```cpp
#include <string>
#include <ctime>

class User {
private:
    int id;

public:
    std::string name;
    const std::string email;  // const = readonly (set once in constructor)

    // Constructor with initializer list
    User(int id, const std::string& name, const std::string& email)
        : id(id), name(name), email(email) {}

    // Method
    std::string greet() const {  // const = doesn't modify object
        return "Hello, " + name;
    }

    // Getter
    int getId() const { return id; }

    // Static method
    static User create(const std::string& name) {
        return User(static_cast<int>(std::time(nullptr)), name, "");
    }
};

// Usage
User user(1, "Alice", "alice@example.com");
user.greet();
User::create("Bob");
```

### Structs (like public-by-default classes)

```cpp
// struct = class with public default access
// Use for simple data containers (like TypeScript interfaces)
struct Point {
    double x;
    double y;

    double distance() const {
        return std::sqrt(x * x + y * y);
    }
};

Point p{3.0, 4.0};  // Aggregate initialization
p.x = 5.0;
```

## Inheritance and polymorphism

### TypeScript

```ts
interface Drawable {
    draw(): void
}

class Shape {
    protected x: number
    constructor(x: number) { this.x = x }
}

class Circle extends Shape implements Drawable {
    constructor(x: number, public radius: number) {
        super(x)
    }
    draw() { /* ... */ }
}
```

### C++

```cpp
// Abstract base class (like interface)
class Drawable {
public:
    virtual void draw() const = 0;  // Pure virtual = abstract
    virtual ~Drawable() = default;  // Virtual destructor
};

class Shape {
protected:
    double x;

public:
    Shape(double x) : x(x) {}
    virtual ~Shape() = default;
};

// Multiple inheritance
class Circle : public Shape, public Drawable {
private:
    double radius;

public:
    Circle(double x, double radius) : Shape(x), radius(radius) {}

    void draw() const override {
        // Implementation
    }
};

// Usage
Circle circle(0, 5.0);
Drawable* drawable = &circle;  // Polymorphism via pointer
drawable->draw();

// Or with smart pointers (preferred)
std::unique_ptr<Drawable> shape = std::make_unique<Circle>(0, 5.0);
shape->draw();
```

## Memory management

C++ requires explicit memory management. Modern C++ uses smart pointers.

### TypeScript

```ts
const user = new User()  // Garbage collected automatically
```

### C++

```cpp
#include <memory>

// Stack allocation (automatic cleanup)
User user(1, "Alice", "");  // Destroyed when scope ends

// Heap allocation (manual - AVOID in modern C++)
User* ptr = new User(1, "Alice", "");
delete ptr;  // Must manually delete!

// Smart pointers (modern C++, preferred)

// unique_ptr: Single owner, auto-deleted
std::unique_ptr<User> user1 = std::make_unique<User>(1, "Alice", "");
// No delete needed - automatic when out of scope

// shared_ptr: Multiple owners, reference counted
std::shared_ptr<User> user2 = std::make_shared<User>(1, "Alice", "");
std::shared_ptr<User> user3 = user2;  // Both point to same object
// Deleted when last shared_ptr is destroyed

// weak_ptr: Non-owning reference (breaks cycles)
std::weak_ptr<User> weak = user2;
if (auto locked = weak.lock()) {  // Check if still valid
    locked->greet();
}
```

## Vectors (dynamic arrays)

### TypeScript

```ts
const arr: number[] = [1, 2, 3]
arr.push(4)
const doubled = arr.map(n => n * 2)
const evens = arr.filter(n => n % 2 === 0)
```

### C++

```cpp
#include <vector>
#include <algorithm>

std::vector<int> arr = {1, 2, 3};
arr.push_back(4);

// Size and access
arr.size();          // 4
arr[0];              // 1 (no bounds checking)
arr.at(0);           // 1 (throws if out of bounds)
arr.front();         // First element
arr.back();          // Last element

// Iteration
for (int n : arr) {
    std::cout << n << "\n";
}

for (const auto& n : arr) {  // By reference (more efficient)
    std::cout << n << "\n";
}

// Transform (like map)
std::vector<int> doubled;
std::transform(arr.begin(), arr.end(), std::back_inserter(doubled),
    [](int n) { return n * 2; });

// Filter (copy_if)
std::vector<int> evens;
std::copy_if(arr.begin(), arr.end(), std::back_inserter(evens),
    [](int n) { return n % 2 == 0; });

// C++20 ranges (more like JS)
#include <ranges>

auto doubled = arr | std::views::transform([](int n) { return n * 2; });
auto evens = arr | std::views::filter([](int n) { return n % 2 == 0; });

// Reduce (accumulate)
#include <numeric>
int sum = std::accumulate(arr.begin(), arr.end(), 0);
```

## Maps

### TypeScript

```ts
const scores: Record<string, number> = {
    alice: 100,
    bob: 85
}
scores["charlie"] = 90
```

### C++

```cpp
#include <map>
#include <unordered_map>
#include <string>

// Ordered map (sorted by key, uses tree)
std::map<std::string, int> scores = {
    {"alice", 100},
    {"bob", 85}
};

// Unordered map (faster, uses hash table, like JS object)
std::unordered_map<std::string, int> scores = {
    {"alice", 100},
    {"bob", 85}
};

// Insert/update
scores["charlie"] = 90;
scores.insert({"david", 70});

// Access
int score = scores["alice"];     // Creates entry if missing!
int score = scores.at("alice");  // Throws if missing

// Check if key exists
if (scores.count("alice") > 0) { /* exists */ }
if (scores.contains("alice")) { /* C++20 */ }

// Find
auto it = scores.find("alice");
if (it != scores.end()) {
    std::cout << it->second << "\n";  // 100
}

// Delete
scores.erase("bob");

// Iterate
for (const auto& [name, score] : scores) {  // Structured binding
    std::cout << name << ": " << score << "\n";
}
```

## Error handling

### TypeScript

```ts
try {
    const data = await fetchData()
} catch (error) {
    if (error instanceof NotFoundError) {
        console.log("Not found")
    }
    throw error
}
```

### C++

```cpp
#include <stdexcept>

try {
    auto data = fetchData();
} catch (const NotFoundException& e) {
    std::cerr << "Not found: " << e.what() << "\n";
} catch (const std::exception& e) {
    std::cerr << "Error: " << e.what() << "\n";
    throw;  // Re-throw
} catch (...) {
    std::cerr << "Unknown error\n";
}

// Custom exception
class ValidationError : public std::runtime_error {
public:
    std::string field;

    ValidationError(const std::string& field, const std::string& message)
        : std::runtime_error(field + ": " + message), field(field) {}
};

throw ValidationError("email", "Invalid format");

// Modern C++: std::optional for "might not have value"
#include <optional>

std::optional<User> findUser(int id) {
    if (id <= 0) return std::nullopt;
    return User(id, "Alice", "");
}

if (auto user = findUser(1)) {
    user->greet();  // Use like pointer
}

// std::expected (C++23) for Result type
#include <expected>

std::expected<User, std::string> findUser(int id) {
    if (id <= 0) return std::unexpected("Invalid ID");
    return User(id, "Alice", "");
}
```

## Templates (generics)

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

### C++

```cpp
// Function template
template<typename T>
T first(const std::vector<T>& arr) {
    if (arr.empty()) throw std::runtime_error("Empty vector");
    return arr[0];
}

// With optional
template<typename T>
std::optional<T> first(const std::vector<T>& arr) {
    if (arr.empty()) return std::nullopt;
    return arr[0];
}

// Class template
template<typename T>
class Container {
private:
    T value;

public:
    Container(T v) : value(v) {}

    T get() const { return value; }

    template<typename U>
    Container<U> map(std::function<U(T)> fn) const {
        return Container<U>(fn(value));
    }
};

// Usage
Container<int> c(42);
auto doubled = c.map<int>([](int n) { return n * 2; });

// Concepts (C++20) - like type constraints
template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template<Numeric T>
T sum(const std::vector<T>& nums) {
    return std::accumulate(nums.begin(), nums.end(), T{});
}
```

## Strings

### TypeScript

```ts
const name = "Alice"
const message = `Hello, ${name}!`
"hello".toUpperCase()
```

### C++

```cpp
#include <string>
#include <sstream>
#include <algorithm>
#include <format>  // C++20

std::string name = "Alice";

// Concatenation
std::string message = "Hello, " + name + "!";

// String formatting (C++20)
std::string message = std::format("Hello, {}!", name);

// Older: stringstream
std::ostringstream ss;
ss << "Hello, " << name << "! You have " << 5 << " messages.";
std::string result = ss.str();

// String operations
name.length();           // or .size()
name.substr(0, 3);       // "Ali"
name.find("li");         // 1 (position)
name.empty();            // false
name.starts_with("Al");  // C++20
name.ends_with("ce");    // C++20

// Transform (no built-in toUpper on string)
std::string upper = name;
std::transform(upper.begin(), upper.end(), upper.begin(), ::toupper);

// C-style string (const char*)
const char* cstr = name.c_str();

// String to number
int n = std::stoi("42");
double d = std::stod("3.14");

// Number to string
std::string s = std::to_string(42);
```

## File I/O

### TypeScript (Node.js)

```ts
import { readFileSync, writeFileSync } from 'fs'

const content = readFileSync('file.txt', 'utf-8')
writeFileSync('output.txt', 'Hello, World!')
```

### C++

```cpp
#include <fstream>
#include <string>
#include <sstream>

// Read entire file
std::ifstream file("file.txt");
std::stringstream buffer;
buffer << file.rdbuf();
std::string content = buffer.str();

// Read line by line
std::ifstream file("file.txt");
std::string line;
while (std::getline(file, line)) {
    std::cout << line << "\n";
}

// Write to file
std::ofstream out("output.txt");
out << "Hello, World!\n";
out.close();

// Append
std::ofstream out("output.txt", std::ios::app);
out << "More content\n";

// Check if file opened
if (!file.is_open()) {
    throw std::runtime_error("Could not open file");
}

// C++17: std::filesystem
#include <filesystem>
namespace fs = std::filesystem;

if (fs::exists("file.txt")) {
    auto size = fs::file_size("file.txt");
}

for (const auto& entry : fs::directory_iterator(".")) {
    std::cout << entry.path() << "\n";
}
```

## JSON handling

C++ has no built-in JSON. Use a library like nlohmann/json.

### TypeScript

```ts
const json = JSON.stringify(obj)
const parsed = JSON.parse(json)
```

### C++ (nlohmann/json)

```cpp
#include <nlohmann/json.hpp>
using json = nlohmann::json;

// Create JSON
json j;
j["name"] = "Alice";
j["age"] = 30;
j["tags"] = {"admin", "user"};

// From object
struct User {
    std::string name;
    int age;
};
NLOHMANN_DEFINE_TYPE_NON_INTRUSIVE(User, name, age)  // Macro for serialization

User user{"Alice", 30};
json j = user;

// Stringify
std::string str = j.dump();       // Compact
std::string str = j.dump(2);      // Pretty with 2-space indent

// Parse
json parsed = json::parse(str);
std::string name = parsed["name"];
int age = parsed["age"].get<int>();

// To object
User user = parsed.get<User>();

// Safe access
if (parsed.contains("email")) {
    auto email = parsed["email"];
}

auto email = parsed.value("email", "default@example.com");
```

## Concurrency

### TypeScript

```ts
async function fetchAll(urls: string[]): Promise<Response[]> {
    return Promise.all(urls.map(url => fetch(url)))
}
```

### C++

```cpp
#include <thread>
#include <future>
#include <vector>
#include <mutex>

// Basic thread
std::thread t([]() {
    std::cout << "Hello from thread\n";
});
t.join();  // Wait for completion

// std::async (like Promise)
std::future<int> result = std::async(std::launch::async, []() {
    return computeValue();
});
int value = result.get();  // Blocks until ready

// Multiple async tasks (like Promise.all)
std::vector<std::future<std::string>> futures;
for (const auto& url : urls) {
    futures.push_back(std::async(std::launch::async, [&url]() {
        return fetch(url);
    }));
}

std::vector<std::string> results;
for (auto& f : futures) {
    results.push_back(f.get());
}

// Mutex for thread safety
std::mutex mtx;
int counter = 0;

void increment() {
    std::lock_guard<std::mutex> lock(mtx);  // RAII lock
    counter++;
}

// C++20: std::jthread (auto-joining)
std::jthread t([]() {
    // work
});
// No need to call join()
```

## Build system (CMake)

### TypeScript

```json
{
    "scripts": {
        "build": "tsc",
        "dev": "tsc --watch"
    }
}
```

### C++ (CMake)

```cmake
# CMakeLists.txt
cmake_minimum_required(VERSION 3.20)
project(MyProject VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Add executable
add_executable(myapp
    src/main.cpp
    src/utils.cpp
)

# Include directories
target_include_directories(myapp PRIVATE include)

# Link libraries
find_package(nlohmann_json REQUIRED)
target_link_libraries(myapp PRIVATE nlohmann_json::nlohmann_json)

# Add tests
enable_testing()
add_executable(tests tests/test_main.cpp)
add_test(NAME MyTests COMMAND tests)
```

```bash
# Build
mkdir build && cd build
cmake ..
cmake --build .

# Run
./myapp
```

## Testing (Catch2)

### TypeScript (Jest)

```ts
describe('math', () => {
    it('adds numbers', () => {
        expect(add(1, 2)).toBe(3)
    })
})
```

### C++ (Catch2)

```cpp
#define CATCH_CONFIG_MAIN
#include <catch2/catch.hpp>

TEST_CASE("Math operations", "[math]") {
    SECTION("addition") {
        REQUIRE(add(1, 2) == 3);
        REQUIRE(add(-1, 1) == 0);
    }

    SECTION("division") {
        REQUIRE(divide(10, 2) == 5);
        REQUIRE_THROWS_AS(divide(1, 0), std::runtime_error);
    }
}

// Parameterized tests
TEST_CASE("Addition with parameters") {
    auto [a, b, expected] = GENERATE(table<int, int, int>({
        {1, 2, 3},
        {0, 0, 0},
        {-1, 1, 0}
    }));

    REQUIRE(add(a, b) == expected);
}
```

## Common gotchas for TS developers

1. **Compilation required** - no REPL-like experience
2. **Memory management** - use smart pointers, avoid raw `new`/`delete`
3. **No garbage collection** - resources must be released
4. **Headers vs source** - declarations in `.h`, definitions in `.cpp`
5. **`#include` is text substitution** - use include guards
6. **Pass by value copies** - use `const&` for efficiency
7. **Undefined behavior** - accessing out-of-bounds, null pointers, etc.
8. **Iterators not indices** - STL uses iterator pattern
9. **`std::string` is not `const char*`** - two different types
10. **No reflection** - no runtime type info like TypeScript

```cpp
// Include guard
#ifndef MY_CLASS_H
#define MY_CLASS_H

class MyClass {
    // ...
};

#endif

// Or modern (most compilers)
#pragma once

class MyClass {
    // ...
};
```

## Resources

- [Learn C++](https://www.learncpp.com/)
- [C++ Reference](https://en.cppreference.com/)
- [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/)
- [Compiler Explorer (Godbolt)](https://godbolt.org/)
- [C++ Insights](https://cppinsights.io/)

