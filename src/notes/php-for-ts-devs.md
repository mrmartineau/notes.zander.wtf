---
title: PHP for TypeScript developers
tags:
  - php
  - typescript
  - cheatsheet
date: git Last Modified
emoji: 🐘
---

A guide to PHP for developers coming from TypeScript/JavaScript.

## Key differences from TypeScript

| Concept | TypeScript | PHP |
|---------|-----------|-----|
| Typing | Static, structural | Dynamic (optional type hints) |
| Execution | Browser/Node.js | Server-side (CLI/web server) |
| Syntax | C-like, no `$` | C-like, `$` for variables |
| Arrays | Separate Array/Object | Single array type (indexed/associative) |
| Package manager | npm/yarn/pnpm | Composer |
| Null | `null` / `undefined` | `null` only |

## Variables and constants

### TypeScript

```ts
const name: string = "Alice"
let age: number = 30
const isActive = true
```

### PHP

```php
<?php
// Variables (always start with $)
$name = "Alice";     // Type inferred
$age = 30;
$isActive = true;

// With type declarations (PHP 7.4+)
string $name = "Alice";  // Only in class properties

// Constants
const MAX_SIZE = 100;
define('API_URL', 'https://api.example.com');

// Class constants
class Config {
    public const VERSION = '1.0.0';
    private const SECRET = 'xxx';
}
```

## Basic types

| TypeScript | PHP |
|-----------|-----|
| `string` | `string` |
| `number` | `int`, `float` |
| `boolean` | `bool` |
| `any` | `mixed` (PHP 8.0+) |
| `null` / `undefined` | `null` |
| `Array<T>` | `array` |
| `Record<K, V>` | `array` (associative) |
| `void` | `void` |
| `never` | `never` (PHP 8.1+) |

### Type declarations

```php
<?php
// Function parameter and return types
function greet(string $name): string {
    return "Hello, $name!";
}

// Nullable types (like T | null)
function findUser(int $id): ?User {
    return null;
}

// Union types (PHP 8.0+)
function process(int|string $id): void {
    // ...
}

// Intersection types (PHP 8.1+)
function handle(Countable&Iterator $items): void {
    // ...
}

// Mixed type (like any)
function log(mixed $data): void {
    // ...
}
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

### PHP

```php
<?php
// Basic function
function greet(string $name): string {
    return "Hello, $name!";
}

// Arrow functions (PHP 7.4+, single expression only)
$add = fn(int $a, int $b): int => $a + $b;

// Anonymous functions (closures)
$multiply = function(int $a, int $b): int {
    return $a * $b;
};

// Default parameters
function log(string $message, string $level = "INFO"): void {
    echo "[$level] $message\n";
}

// Variadic functions (rest parameters)
function sum(int ...$numbers): int {
    return array_sum($numbers);
}

// Named arguments (PHP 8.0+)
function createUser(string $name, string $email, int $age = 0): User {
    // ...
}
createUser(name: "Alice", email: "alice@example.com");

// Closures capturing variables
$factor = 2;
$multiply = function(int $n) use ($factor): int {
    return $n * $factor;
};
// Arrow functions capture automatically
$multiply = fn(int $n): int => $n * $factor;
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

### PHP

```php
<?php
class User {
    private int $id;
    public string $name;
    public readonly string $email;  // PHP 8.1+

    public function __construct(int $id, string $name, string $email) {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
    }

    public function greet(): string {
        return "Hello, {$this->name}";
    }

    public static function create(string $name): self {
        return new self(time(), $name, "");
    }
}

// Constructor property promotion (PHP 8.0+)
class User {
    public function __construct(
        private int $id,
        public string $name,
        public readonly string $email = "",
    ) {}
}

// Usage
$user = new User(1, "Alice", "alice@example.com");
$user->greet();
User::create("Bob");
```

## Interfaces and traits

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

### PHP

```php
<?php
interface Drawable {
    public function draw(): void;
}

interface Resizable {
    public function resize(int $width, int $height): void;
}

class Circle implements Drawable, Resizable {
    public function draw(): void {
        // ...
    }

    public function resize(int $width, int $height): void {
        // ...
    }
}

// Traits (mixins/reusable code)
trait Loggable {
    public function log(string $message): void {
        echo "[LOG] $message\n";
    }
}

trait Timestamped {
    public \DateTime $createdAt;

    public function touch(): void {
        $this->createdAt = new \DateTime();
    }
}

class Article {
    use Loggable, Timestamped;

    public function save(): void {
        $this->touch();
        $this->log("Article saved");
    }
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
} finally {
    cleanup()
}
```

### PHP

```php
<?php
try {
    $data = fetchData();
} catch (NotFoundException $e) {
    echo "Not found\n";
} catch (ValidationException | NetworkException $e) {
    echo "Error: " . $e->getMessage() . "\n";
} catch (Exception $e) {
    throw new RuntimeException("Failed", 0, $e);  // Chain
} finally {
    cleanup();
}

// Custom exceptions
class ValidationException extends Exception {
    public function __construct(
        public readonly string $field,
        string $message
    ) {
        parent::__construct("$field: $message");
    }
}

throw new ValidationException("email", "Invalid format");
```

## Arrays

PHP arrays are unique - they're ordered maps that can be used as arrays, lists, hash tables, dictionaries, etc.

### TypeScript

```ts
const arr: number[] = [1, 2, 3]
arr.push(4)
const doubled = arr.map(n => n * 2)
const evens = arr.filter(n => n % 2 === 0)
const sum = arr.reduce((a, b) => a + b, 0)
```

### PHP

```php
<?php
// Indexed array (like JS array)
$arr = [1, 2, 3];
$arr[] = 4;  // Push

// Map/filter/reduce
$doubled = array_map(fn($n) => $n * 2, $arr);
$evens = array_filter($arr, fn($n) => $n % 2 === 0);
$sum = array_reduce($arr, fn($carry, $n) => $carry + $n, 0);

// Or use built-in
$sum = array_sum($arr);

// Destructuring
[$first, $second] = $arr;
[, , $third] = $arr;  // Skip elements

// Spread operator
$combined = [...$arr, 4, 5];

// Slice
array_slice($arr, 1, 2);  // [2, 3]

// Common array functions
count($arr);              // Length
in_array(2, $arr);        // Includes
array_search(2, $arr);    // indexOf
array_reverse($arr);
array_unique($arr);
sort($arr);               // Mutates!
$sorted = [...$arr];      // Clone first
sort($sorted);
```

## Associative arrays (objects/records)

### TypeScript

```ts
const scores: Record<string, number> = {
    alice: 100,
    bob: 85
}
scores["charlie"] = 90
delete scores.bob
Object.keys(scores)
```

### PHP

```php
<?php
$scores = [
    "alice" => 100,
    "bob" => 85,
];

// Access
$scores["charlie"] = 90;
echo $scores["alice"];

// Check key exists
if (isset($scores["alice"])) {
    // ...
}
if (array_key_exists("alice", $scores)) {
    // ...
}

// Delete
unset($scores["bob"]);

// Keys/values
array_keys($scores);
array_values($scores);

// Iterate
foreach ($scores as $name => $score) {
    echo "$name: $score\n";
}

// Merge (spread equivalent)
$merged = [...$scores, "david" => 70];
$merged = array_merge($scores, ["david" => 70]);

// Null coalescing (like ??)
$value = $scores["unknown"] ?? 0;
```

## String handling

### TypeScript

```ts
const name = "Alice"
const message = `Hello, ${name}!`
"hello".toUpperCase()
"hello world".split(" ")
```

### PHP

```php
<?php
$name = "Alice";

// String interpolation (double quotes only!)
$message = "Hello, $name!";
$message = "Hello, {$name}!";  // Complex expressions

// Single quotes = no interpolation
$literal = 'Hello, $name';  // Literal "$name"

// Heredoc (multiline with interpolation)
$html = <<<HTML
    <div>
        <h1>Hello, $name!</h1>
    </div>
HTML;

// Nowdoc (multiline, no interpolation)
$template = <<<'TEXT'
    No $interpolation here
TEXT;

// String functions
strtoupper("hello");         // HELLO
strtolower("HELLO");         // hello
strlen($name);               // 5
explode(" ", "hello world"); // ["hello", "world"]
implode(", ", $arr);         // Join
trim("  hello  ");           // "hello"
str_replace("l", "L", "hello"); // heLLo
substr("hello", 1, 3);       // "ell"
strpos("hello", "l");        // 2 (first occurrence)
str_contains("hello", "ell"); // true (PHP 8.0+)
str_starts_with("hello", "he"); // true (PHP 8.0+)
str_ends_with("hello", "lo");   // true (PHP 8.0+)

// sprintf (printf-style)
$msg = sprintf("User %s has %d points", $name, 100);
```

## JSON handling

### TypeScript

```ts
const json = JSON.stringify(obj)
const parsed = JSON.parse(json)
```

### PHP

```php
<?php
// Encode
$json = json_encode($data);
$json = json_encode($data, JSON_PRETTY_PRINT);

// Decode
$data = json_decode($json);          // Returns stdClass
$data = json_decode($json, true);    // Returns associative array

// Error handling
$data = json_decode($json, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    throw new RuntimeException(json_last_error_msg());
}

// PHP 7.3+
$data = json_decode($json, true, 512, JSON_THROW_ON_ERROR);
```

## HTTP server

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

### PHP (vanilla)

```php
<?php
// index.php
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Simple routing
if ($method === 'GET' && preg_match('#^/users/(\d+)$#', $path, $matches)) {
    $id = $matches[1];
    echo json_encode(['id' => $id, 'name' => 'Alice']);
    exit;
}

// POST body
$body = json_decode(file_get_contents('php://input'), true);

http_response_code(404);
echo json_encode(['error' => 'Not found']);
```

### PHP (Laravel)

```php
<?php
// routes/api.php
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);

// app/Http/Controllers/UserController.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show(int $id)
    {
        return User::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
        ]);

        return User::create($validated);
    }
}
```

## Package management (Composer)

### TypeScript

```bash
npm init
npm install express
npm install -D typescript
```

### PHP

```bash
composer init
composer require guzzlehttp/guzzle
composer require --dev phpunit/phpunit
```

```json
// composer.json
{
    "require": {
        "php": "^8.2",
        "guzzlehttp/guzzle": "^7.0"
    },
    "require-dev": {
        "phpunit/phpunit": "^10.0"
    },
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    }
}
```

```php
<?php
// Autoloading
require __DIR__ . '/vendor/autoload.php';

use GuzzleHttp\Client;
use App\Services\UserService;
```

## Namespaces

### TypeScript

```ts
// ES modules
import { UserService } from './services/user'
export class AuthService {}
```

### PHP

```php
<?php
// src/Services/UserService.php
namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;

class UserService {
    public function __construct(
        private UserRepository $repository
    ) {}
}

// Usage
use App\Services\UserService;

$service = new UserService($repo);

// Aliasing
use App\Services\UserService as Users;
```

## Testing (PHPUnit)

### TypeScript (Jest)

```ts
describe('math', () => {
    it('adds numbers', () => {
        expect(add(1, 2)).toBe(3)
    })
})
```

### PHP (PHPUnit)

```php
<?php
// tests/MathTest.php
namespace Tests;

use PHPUnit\Framework\TestCase;

class MathTest extends TestCase
{
    public function testAdd(): void
    {
        $this->assertEquals(3, add(1, 2));
    }

    public function testDivideByZero(): void
    {
        $this->expectException(\DivisionByZeroError::class);
        divide(1, 0);
    }

    /**
     * @dataProvider additionProvider
     */
    public function testAddWithProvider(int $a, int $b, int $expected): void
    {
        $this->assertEquals($expected, add($a, $b));
    }

    public static function additionProvider(): array
    {
        return [
            [1, 2, 3],
            [0, 0, 0],
            [-1, 1, 0],
        ];
    }

    protected function setUp(): void
    {
        // Before each test
    }
}
```

```bash
./vendor/bin/phpunit
./vendor/bin/phpunit --coverage-html coverage
```

## Enums (PHP 8.1+)

### TypeScript

```ts
enum Status {
    Pending = 'pending',
    Active = 'active',
    Inactive = 'inactive'
}

const status: Status = Status.Active
```

### PHP

```php
<?php
// Basic enum
enum Status {
    case Pending;
    case Active;
    case Inactive;
}

$status = Status::Active;

// Backed enum (with values)
enum Status: string {
    case Pending = 'pending';
    case Active = 'active';
    case Inactive = 'inactive';
}

$status = Status::Active;
echo $status->value;  // "active"

// From value
$status = Status::from('active');        // Throws if invalid
$status = Status::tryFrom('unknown');    // Returns null if invalid

// Enum methods
enum Status: string {
    case Pending = 'pending';
    case Active = 'active';
    case Inactive = 'inactive';

    public function label(): string {
        return match($this) {
            self::Pending => 'Awaiting Review',
            self::Active => 'Currently Active',
            self::Inactive => 'No Longer Active',
        };
    }
}
```

## Match expression (PHP 8.0+)

### TypeScript

```ts
// Switch or object lookup
const getMessage = (status: string): string => {
    switch (status) {
        case 'success': return 'It worked!'
        case 'error': return 'Something failed'
        default: return 'Unknown'
    }
}
```

### PHP

```php
<?php
// match is an expression (returns value)
$message = match($status) {
    'success' => 'It worked!',
    'error' => 'Something failed',
    'warning', 'notice' => 'Check this out',  // Multiple conditions
    default => 'Unknown',
};

// With enums
$color = match($status) {
    Status::Active => 'green',
    Status::Pending => 'yellow',
    Status::Inactive => 'gray',
};
```

## Common gotchas for TS developers

1. **`$` required for variables** - always `$name`, not `name`
2. **`->` not `.` for object access** - `$user->name` not `$user.name`
3. **`::` for static access** - `User::create()` not `User.create()`
4. **Double quotes for interpolation** - `"Hello $name"` works, `'Hello $name'` doesn't
5. **Arrays are both lists and maps** - same syntax for both
6. **`==` is loose, `===` is strict** - just like JavaScript
7. **No undefined** - only `null`
8. **Semicolons required** - unlike JavaScript
9. **String concatenation uses `.`** - `"Hello" . " " . "World"`
10. **Array functions often have weird parameter order** - `array_map($fn, $arr)` vs `array_filter($arr, $fn)`

```php
<?php
// Loose vs strict comparison
0 == "0"    // true
0 === "0"   // false
null == false  // true (!)
null === false // false

// Spaceship operator (useful for sorting)
1 <=> 2  // -1
2 <=> 2  // 0
3 <=> 2  // 1

usort($arr, fn($a, $b) => $a <=> $b);
```

## Resources

- [PHP Official Documentation](https://www.php.net/docs.php)
- [PHP The Right Way](https://phptherightway.com/)
- [Laravel Documentation](https://laravel.com/docs)
- [Modern PHP Cheat Sheet](https://front-line-php.com/cheat-sheet)
- [PHP-FIG Standards (PSR)](https://www.php-fig.org/psr/)

