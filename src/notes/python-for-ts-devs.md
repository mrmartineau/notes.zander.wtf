---
title: Python for TypeScript developers
tags:
  - python
  - typescript
  - cheatsheet
date: git Last Modified
emoji: 🐍
---

A guide to Python for developers coming from TypeScript/JavaScript.

## Key differences from TypeScript

| Concept | TypeScript | Python |
|---------|-----------|--------|
| Typing | Static, structural | Dynamic (optional type hints) |
| Indentation | Braces `{}` | Whitespace-significant |
| Compilation | Transpiles to JS | Interpreted |
| Package manager | npm/yarn/pnpm | pip, poetry, uv |
| Null | `null` / `undefined` | `None` |
| Concurrency | Async/await, event loop | asyncio, threading, multiprocessing |

## Variables and constants

### TypeScript

```ts
const name: string = "Alice"
let age: number = 30
const isActive = true
```

### Python

```python
# No const keyword - convention is UPPER_CASE for constants
name: str = "Alice"
age: int = 30
is_active = True  # Type inference

# Convention for constants
MAX_SIZE = 100
API_URL = "https://api.example.com"
```

## Basic types

| TypeScript | Python |
|-----------|--------|
| `string` | `str` |
| `number` | `int`, `float` |
| `boolean` | `bool` (`True`/`False`) |
| `any` | `Any` (from typing) |
| `null` / `undefined` | `None` |
| `Array<T>` / `T[]` | `list[T]` |
| `Record<K, V>` | `dict[K, V]` |
| `Set<T>` | `set[T]` |
| `[T, U]` (tuple) | `tuple[T, U]` |

### Type hints (like TypeScript types)

```python
from typing import Optional, Union, List, Dict, Any

# Basic types
name: str = "Alice"
age: int = 30
scores: list[float] = [95.5, 87.0]
config: dict[str, Any] = {"debug": True}

# Optional (like T | undefined)
email: Optional[str] = None  # or str | None (Python 3.10+)

# Union types
id: Union[int, str] = 123  # or int | str (Python 3.10+)

# Type aliases
UserId = int | str
UserMap = dict[str, "User"]
```

## Functions

### TypeScript

```ts
function greet(name: string): string {
    return `Hello, ${name}!`
}

const add = (a: number, b: number): number => a + b

// Optional and default parameters
function log(message: string, level: string = "INFO"): void {
    console.log(`[${level}] ${message}`)
}
```

### Python

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

# Lambda (limited to single expression)
add = lambda a, b: a + b

# Default parameters
def log(message: str, level: str = "INFO") -> None:
    print(f"[{level}] {message}")

# *args and **kwargs (like rest/spread)
def func(*args, **kwargs):
    print(args)    # tuple of positional args
    print(kwargs)  # dict of keyword args

# Keyword-only arguments (after *)
def fetch(url: str, *, timeout: int = 30, retry: bool = True):
    pass

fetch("http://...", timeout=60)  # Must use keyword
```

## Classes

### TypeScript

```ts
class User {
    private id: number
    public name: string

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }

    greet(): string {
        return `Hello, ${this.name}`
    }

    static create(name: string): User {
        return new User(Date.now(), name)
    }
}
```

### Python

```python
class User:
    # Class variable (shared across instances)
    count: int = 0

    def __init__(self, id: int, name: str):
        self.id = id          # Instance variable (public)
        self.name = name
        self._email = ""      # Convention: "private" (still accessible)
        self.__secret = ""    # Name-mangled (harder to access)
        User.count += 1

    def greet(self) -> str:
        return f"Hello, {self.name}"

    @staticmethod
    def validate(name: str) -> bool:
        return len(name) > 0

    @classmethod
    def create(cls, name: str) -> "User":
        return cls(id(name), name)

    @property
    def email(self) -> str:
        return self._email

    @email.setter
    def email(self, value: str):
        self._email = value.lower()

# Usage
user = User(1, "Alice")
user.email = "ALICE@example.com"
```

### Dataclasses (like TypeScript interfaces + classes)

```python
from dataclasses import dataclass, field
from typing import Optional

@dataclass
class User:
    id: int
    name: str
    email: Optional[str] = None
    tags: list[str] = field(default_factory=list)

# Auto-generates __init__, __repr__, __eq__
user = User(id=1, name="Alice")
print(user)  # User(id=1, name='Alice', email=None, tags=[])

# Frozen (immutable, like readonly)
@dataclass(frozen=True)
class Point:
    x: float
    y: float
```

## Interfaces (Protocols)

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

### Python

```python
from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> None: ...

class Resizable(Protocol):
    def resize(self, width: int, height: int) -> None: ...

# No "implements" needed - structural typing (duck typing)
class Circle:
    def draw(self) -> None:
        print("Drawing circle")

    def resize(self, width: int, height: int) -> None:
        pass

# This works because Circle has the required methods
def render(item: Drawable) -> None:
    item.draw()

render(Circle())  # ✅ Works
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
} finally {
    cleanup()
}
```

### Python

```python
try:
    data = fetch_data()
except NotFoundError:
    print("Not found")
except (ValueError, TypeError) as e:
    print(f"Invalid: {e}")
except Exception as e:
    raise RuntimeError("Failed") from e  # Chain exceptions
else:
    print("Success!")  # Only if no exception
finally:
    cleanup()

# Custom exceptions
class ValidationError(Exception):
    def __init__(self, field: str, message: str):
        self.field = field
        super().__init__(f"{field}: {message}")

raise ValidationError("email", "Invalid format")
```

## Arrays (Lists)

### TypeScript

```ts
const arr: number[] = [1, 2, 3]
arr.push(4)
const doubled = arr.map(n => n * 2)
const evens = arr.filter(n => n % 2 === 0)
const sum = arr.reduce((a, b) => a + b, 0)
const first = arr[0]
const last = arr.at(-1)
```

### Python

```python
arr: list[int] = [1, 2, 3]
arr.append(4)

# List comprehensions (preferred over map/filter)
doubled = [n * 2 for n in arr]
evens = [n for n in arr if n % 2 == 0]
sum_val = sum(arr)

# Indexing
first = arr[0]
last = arr[-1]  # Negative indexing built-in!

# Slicing
arr[1:3]     # [2, 3]
arr[::2]     # [1, 3] - every 2nd element
arr[::-1]    # [3, 2, 1] - reversed

# Unpacking (like destructuring)
first, *rest = arr        # first=1, rest=[2,3]
first, *middle, last = [1, 2, 3, 4]  # first=1, middle=[2,3], last=4

# Spread equivalent
combined = [*arr, 4, 5]

# Map/filter with functions
doubled = list(map(lambda n: n * 2, arr))
evens = list(filter(lambda n: n % 2 == 0, arr))
```

## Dictionaries (Objects)

### TypeScript

```ts
const scores: Record<string, number> = {
    alice: 100,
    bob: 85
}
scores["charlie"] = 90
scores.alice
delete scores.bob
Object.keys(scores)
Object.entries(scores)
```

### Python

```python
scores: dict[str, int] = {
    "alice": 100,
    "bob": 85
}

# Access
scores["charlie"] = 90
scores["alice"]
scores.get("david", 0)  # Default value if missing

# Delete
del scores["bob"]
scores.pop("bob", None)  # Delete with default

# Methods
scores.keys()
scores.values()
scores.items()  # Like Object.entries()

# Iteration
for name, score in scores.items():
    print(f"{name}: {score}")

# Dict comprehension
doubled = {k: v * 2 for k, v in scores.items()}

# Merge (spread equivalent)
merged = {**scores, "david": 70}
merged = scores | {"david": 70}  # Python 3.9+

# Check key exists
if "alice" in scores:
    print("Found!")
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

### Python

```python
import asyncio
import aiohttp  # pip install aiohttp

async def fetch_data(url: str) -> str:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

# Promise.all equivalent
results = await asyncio.gather(
    fetch_data("url1"),
    fetch_data("url2")
)

# Run async code
asyncio.run(main())

# Create tasks (fire and forget, then await)
async def main():
    task1 = asyncio.create_task(fetch_data("url1"))
    task2 = asyncio.create_task(fetch_data("url2"))
    results = await asyncio.gather(task1, task2)
```

## Modules and imports

### TypeScript

```ts
// Named exports
export const foo = 1
export function bar() {}

// Default export
export default class MyClass {}

// Import
import MyClass, { foo, bar } from './module'
import * as utils from './utils'
```

### Python

```python
# my_module.py
foo = 1

def bar():
    pass

class MyClass:
    pass

# Import
from my_module import foo, bar, MyClass
import my_module
from my_module import *  # Not recommended

# Aliasing
from my_module import foo as my_foo
import numpy as np

# Relative imports (in packages)
from . import sibling
from ..parent import something
```

## Package management

### TypeScript

```bash
npm init
npm install express
npm install -D typescript
```

### Python

```bash
# pip (built-in)
pip install requests
pip install -r requirements.txt
pip freeze > requirements.txt

# poetry (recommended for projects)
poetry init
poetry add requests
poetry add --group dev pytest

# uv (fast, modern)
uv init
uv add requests
uv add --dev pytest
```

```
# requirements.txt
requests>=2.28.0
pydantic>=2.0.0
```

```toml
# pyproject.toml (modern)
[project]
name = "myproject"
dependencies = [
    "requests>=2.28.0",
    "pydantic>=2.0.0",
]

[project.optional-dependencies]
dev = ["pytest", "mypy"]
```

## JSON handling

### TypeScript

```ts
const json = JSON.stringify(obj)
const parsed = JSON.parse(json)
```

### Python

```python
import json

# Stringify
json_str = json.dumps(obj)
json.dumps(obj, indent=2)  # Pretty print

# Parse
data = json.loads(json_str)

# File I/O
with open("data.json") as f:
    data = json.load(f)

with open("output.json", "w") as f:
    json.dump(obj, f, indent=2)

# With Pydantic (like Zod for validation)
from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    email: str | None = None

user = User.model_validate_json('{"id": 1, "name": "Alice"}')
json_str = user.model_dump_json()
```

## HTTP server (FastAPI)

### TypeScript (Express)

```ts
import express from 'express'

const app = express()
app.use(express.json())

app.get('/users/:id', (req, res) => {
    res.json({ id: req.params.id, name: 'Alice' })
})

app.post('/users', (req, res) => {
    const { name, email } = req.body
    res.status(201).json({ id: 1, name, email })
})

app.listen(3000)
```

### Python (FastAPI)

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class UserCreate(BaseModel):
    name: str
    email: str | None = None

class User(BaseModel):
    id: int
    name: str
    email: str | None = None

@app.get("/users/{user_id}")
async def get_user(user_id: int) -> User:
    return User(id=user_id, name="Alice")

@app.post("/users", status_code=201)
async def create_user(user: UserCreate) -> User:
    return User(id=1, **user.model_dump())

# Run with: uvicorn main:app --reload
```

## Testing

### TypeScript (Jest)

```ts
describe('math', () => {
    it('adds numbers', () => {
        expect(add(1, 2)).toBe(3)
    })

    it('throws on invalid input', () => {
        expect(() => divide(1, 0)).toThrow()
    })
})
```

### Python (pytest)

```python
# test_math.py
import pytest

def test_add():
    assert add(1, 2) == 3

def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(1, 0)

# Parametrized tests
@pytest.mark.parametrize("a,b,expected", [
    (1, 2, 3),
    (0, 0, 0),
    (-1, 1, 0),
])
def test_add_params(a, b, expected):
    assert add(a, b) == expected

# Fixtures (like beforeEach)
@pytest.fixture
def user():
    return User(id=1, name="Test")

def test_greet(user):
    assert user.greet() == "Hello, Test"
```

```bash
pytest
pytest -v --cov=myapp
```

## String formatting

### TypeScript

```ts
const name = "Alice"
const message = `Hello, ${name}!`
```

### Python

```python
name = "Alice"

# f-strings (recommended, Python 3.6+)
message = f"Hello, {name}!"
f"2 + 2 = {2 + 2}"
f"Pi: {3.14159:.2f}"  # Formatting: "Pi: 3.14"

# .format() method
"Hello, {}!".format(name)
"Hello, {name}!".format(name=name)

# Multiline strings
query = """
    SELECT *
    FROM users
    WHERE id = {id}
""".format(id=1)

# Raw strings (like String.raw)
path = r"C:\Users\name"  # Backslashes not escaped
```

## Common gotchas for TS developers

1. **Indentation matters** - use 4 spaces (PEP 8 standard)
2. **No braces** - blocks defined by indentation only
3. **`self` is explicit** - must be first parameter in methods
4. **Mutable default arguments** - never use `def f(items=[]):`
5. **`is` vs `==`** - `is` checks identity, `==` checks equality
6. **Everything is an object** - functions, classes, modules
7. **No `++`/`--`** - use `+= 1` or `-= 1`
8. **Truthiness differs** - empty collections are falsy

```python
# Mutable default argument gotcha
def bad(items=[]):  # ❌ Same list reused!
    items.append(1)
    return items

def good(items=None):  # ✅
    if items is None:
        items = []
    items.append(1)
    return items
```

## Resources

- [Python Official Tutorial](https://docs.python.org/3/tutorial/)
- [Real Python](https://realpython.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [Python Type Hints Cheat Sheet](https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html)

