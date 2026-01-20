---
title: Golang for TypeScript developers
tags:
  - golang
  - typescript
  - cheatsheet
date: git Last Modified
emoji: 🐹
---

A guide to Go (Golang) for developers coming from TypeScript/JavaScript.

## Key differences from TypeScript

| Concept | TypeScript | Go |
|---------|-----------|-----|
| Typing | Structural, gradual | Structural, static |
| Compilation | Transpiles to JS | Compiles to native binary |
| Null handling | `null` / `undefined` | Zero values, no null |
| Generics | Full support | Added in Go 1.18 |
| Package manager | npm/yarn/pnpm | Go modules |
| Concurrency | Async/await, Promises | Goroutines, channels |

## Variables and constants

### TypeScript

```ts
const name: string = "Alice"
let age: number = 30
const isActive = true // type inference
```

### Go

```go
// Explicit type
var name string = "Alice"
var age int = 30

// Type inference (short declaration, most common)
name := "Alice"
age := 30
isActive := true

// Constants
const MaxSize = 100
const (
    StatusOK = 200
    StatusNotFound = 404
)
```

## Basic types

| TypeScript | Go |
|-----------|-----|
| `string` | `string` |
| `number` | `int`, `int8`, `int16`, `int32`, `int64`, `float32`, `float64` |
| `boolean` | `bool` |
| `any` | `interface{}` or `any` (Go 1.18+) |
| `null` / `undefined` | Zero values (no null) |
| `Array<T>` / `T[]` | `[]T` (slice) or `[n]T` (array) |
| `Record<K, V>` | `map[K]V` |

### Zero values (instead of null/undefined)

```go
var s string   // ""
var i int      // 0
var b bool     // false
var slice []int // nil (but usable, len=0)
```

## Functions

### TypeScript

```ts
function greet(name: string): string {
    return `Hello, ${name}!`
}

const add = (a: number, b: number): number => a + b

// Optional parameters
function log(message: string, level?: string): void {
    console.log(level ?? "INFO", message)
}
```

### Go

```go
// Basic function
func greet(name string) string {
    return "Hello, " + name + "!"
}

// Multiple return values (very common pattern)
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

// Named return values
func getUser(id int) (user User, found bool) {
    // user and found are pre-declared
    return
}

// Variadic functions (like rest parameters)
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}
```

**Note:** Go has no optional parameters. Use variadic, structs with options, or functional options pattern instead.

## Structs (like interfaces/classes)

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

### Go

```go
// Struct (like interface + class combined)
type User struct {
    ID    int
    Name  string
    Email string // No optional fields; use pointer for "nullable"
}

// Methods are defined outside the struct
type UserService struct {
    users []User
}

// Method with receiver (like class method)
func (s *UserService) AddUser(user User) {
    s.users = append(s.users, user)
}

// Usage
service := &UserService{}
service.AddUser(User{ID: 1, Name: "Alice"})
```

## Interfaces

### TypeScript

```ts
interface Reader {
    read(buffer: Uint8Array): number
}

interface Writer {
    write(data: Uint8Array): number
}

// Intersection
type ReadWriter = Reader & Writer
```

### Go

```go
// Interfaces are implicit (no "implements" keyword)
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

// Embedding (like intersection)
type ReadWriter interface {
    Reader
    Writer
}

// Any type with these methods automatically implements the interface
type MyFile struct{}

func (f *MyFile) Read(p []byte) (int, error) {
    return 0, nil
}
// MyFile now implements Reader
```

## Error handling

### TypeScript

```ts
try {
    const data = await fetchData()
} catch (error) {
    console.error("Failed:", error)
}

// Or with Result pattern
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }
```

### Go

```go
// Errors are values, not exceptions
result, err := doSomething()
if err != nil {
    return fmt.Errorf("failed to do something: %w", err)
}

// Creating errors
import "errors"

var ErrNotFound = errors.New("not found")

func findUser(id int) (*User, error) {
    if id <= 0 {
        return nil, ErrNotFound
    }
    // ...
    return &user, nil
}

// Error wrapping (like cause chains)
if err != nil {
    return fmt.Errorf("findUser(%d): %w", id, err)
}

// Checking error types
if errors.Is(err, ErrNotFound) {
    // handle not found
}
```

## Arrays and slices

### TypeScript

```ts
const arr: number[] = [1, 2, 3]
arr.push(4)
const doubled = arr.map(n => n * 2)
const evens = arr.filter(n => n % 2 === 0)
const sum = arr.reduce((a, b) => a + b, 0)
```

### Go

```go
// Slice (dynamic, like JS array)
arr := []int{1, 2, 3}
arr = append(arr, 4)

// No built-in map/filter/reduce - use loops
doubled := make([]int, len(arr))
for i, n := range arr {
    doubled[i] = n * 2
}

// Filter
var evens []int
for _, n := range arr {
    if n%2 == 0 {
        evens = append(evens, n)
    }
}

// Reduce
sum := 0
for _, n := range arr {
    sum += n
}

// Slicing (same syntax!)
sub := arr[1:3] // [2, 3]
```

## Maps (objects/Records)

### TypeScript

```ts
const scores: Record<string, number> = {
    alice: 100,
    bob: 85
}
scores["charlie"] = 90
const aliceScore = scores["alice"]
delete scores["bob"]
```

### Go

```go
// Create map
scores := map[string]int{
    "alice": 100,
    "bob":   85,
}

// Add/update
scores["charlie"] = 90

// Access (returns zero value if missing)
aliceScore := scores["alice"]

// Check if key exists
score, exists := scores["alice"]
if !exists {
    fmt.Println("alice not found")
}

// Delete
delete(scores, "bob")

// Iterate
for name, score := range scores {
    fmt.Printf("%s: %d\n", name, score)
}
```

## Concurrency

### TypeScript

```ts
// Promises and async/await
async function fetchAll(urls: string[]): Promise<Response[]> {
    return Promise.all(urls.map(url => fetch(url)))
}

await fetchAll(["url1", "url2"])
```

### Go

```go
// Goroutines (lightweight threads)
go doSomething() // runs concurrently

// Channels (typed pipes for communication)
ch := make(chan string)

go func() {
    ch <- "hello" // send
}()

msg := <-ch // receive

// Buffered channel
ch := make(chan int, 10)

// Select (like Promise.race but for channels)
select {
case msg := <-ch1:
    fmt.Println("from ch1:", msg)
case msg := <-ch2:
    fmt.Println("from ch2:", msg)
case <-time.After(time.Second):
    fmt.Println("timeout")
}

// WaitGroup (like Promise.all)
var wg sync.WaitGroup

for _, url := range urls {
    wg.Add(1)
    go func(u string) {
        defer wg.Done()
        fetch(u)
    }(url)
}

wg.Wait() // blocks until all done
```

## Generics (Go 1.18+)

### TypeScript

```ts
function first<T>(arr: T[]): T | undefined {
    return arr[0]
}

type Stack<T> = {
    items: T[]
    push: (item: T) => void
    pop: () => T | undefined
}
```

### Go

```go
// Generic function
func First[T any](slice []T) (T, bool) {
    if len(slice) == 0 {
        var zero T
        return zero, false
    }
    return slice[0], true
}

// Generic type
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    n := len(s.items) - 1
    item := s.items[n]
    s.items = s.items[:n]
    return item, true
}

// Constraints
type Number interface {
    int | int64 | float64
}

func Sum[T Number](nums []T) T {
    var sum T
    for _, n := range nums {
        sum += n
    }
    return sum
}
```

## Package management

### TypeScript

```bash
npm init
npm install express
```

```json
// package.json
{
    "dependencies": {
        "express": "^4.18.0"
    }
}
```

### Go

```bash
go mod init myproject
go get github.com/gin-gonic/gin
```

```go
// go.mod
module myproject

go 1.21

require github.com/gin-gonic/gin v1.9.0
```

```go
// Import in code
import "github.com/gin-gonic/gin"
```

## JSON handling

### TypeScript

```ts
interface User {
    id: number
    name: string
    createdAt: Date
}

const json = JSON.stringify(user)
const parsed: User = JSON.parse(json)
```

### Go

```go
import "encoding/json"

type User struct {
    ID        int       `json:"id"`
    Name      string    `json:"name"`
    CreatedAt time.Time `json:"createdAt"`
    Password  string    `json:"-"` // Exclude from JSON
    Email     string    `json:"email,omitempty"` // Omit if empty
}

// Marshal (stringify)
data, err := json.Marshal(user)

// Unmarshal (parse)
var user User
err := json.Unmarshal(data, &user)
```

## HTTP server

### TypeScript (Express)

```ts
import express from 'express'

const app = express()
app.use(express.json())

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    res.json({ id, name: 'Alice' })
})

app.listen(3000)
```

### Go (standard library)

```go
package main

import (
    "encoding/json"
    "net/http"
)

func main() {
    http.HandleFunc("/users/", func(w http.ResponseWriter, r *http.Request) {
        id := r.URL.Path[len("/users/"):]
        json.NewEncoder(w).Encode(map[string]string{
            "id":   id,
            "name": "Alice",
        })
    })

    http.ListenAndServe(":3000", nil)
}
```

### Go (with Gin framework)

```go
import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()

    r.GET("/users/:id", func(c *gin.Context) {
        id := c.Param("id")
        c.JSON(200, gin.H{"id": id, "name": "Alice"})
    })

    r.Run(":3000")
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

### Go

```go
// math_test.go (must end in _test.go)
package math

import "testing"

func TestAdd(t *testing.T) {
    result := Add(1, 2)
    if result != 3 {
        t.Errorf("Add(1, 2) = %d; want 3", result)
    }
}

// Table-driven tests (idiomatic Go)
func TestAddTable(t *testing.T) {
    tests := []struct {
        a, b, want int
    }{
        {1, 2, 3},
        {0, 0, 0},
        {-1, 1, 0},
    }

    for _, tt := range tests {
        got := Add(tt.a, tt.b)
        if got != tt.want {
            t.Errorf("Add(%d, %d) = %d; want %d", tt.a, tt.b, got, tt.want)
        }
    }
}
```

```bash
go test ./...
```

## Common gotchas for TS developers

1. **No unused variables/imports** - Go won't compile with unused code
2. **Exported names are Capitalized** - `User` is public, `user` is private
3. **No exceptions** - use error return values
4. **No optional parameters** - use variadic or option structs
5. **Nil is not null** - nil has specific semantics per type
6. **Pointers matter** - `*User` vs `User` affects mutability
7. **No ternary operator** - use if/else statements
8. **Loops only have `for`** - no while, do-while, forEach

## Resources

- [Go by Example](https://gobyexample.com/)
- [A Tour of Go](https://go.dev/tour/)
- [Effective Go](https://go.dev/doc/effective_go)
- [Go Playground](https://go.dev/play/)
- [Go Standard Library](https://pkg.go.dev/std)

