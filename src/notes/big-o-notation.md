---
title: Big O Notation
tags:
  - computer-science
date: git Last Modified
---

Big O Notation describes the **upper bound** of an algorithm's time or space complexity, helping us understand how performance scales as input size grows.

## Why Big O Matters

- **Compare algorithms** objectively before implementation
- **Predict performance** bottlenecks at scale
- **Make informed trade-offs** between time and space complexity

## Complexity Comparison

| Notation | Name | n=10 | n=100 | n=1000 |
|----------|------|------|-------|--------|
| O(1) | Constant | 1 | 1 | 1 |
| O(log n) | Logarithmic | 3 | 7 | 10 |
| O(n) | Linear | 10 | 100 | 1000 |
| O(n log n) | Linearithmic | 30 | 664 | 9966 |
| O(n²) | Quadratic | 100 | 10,000 | 1,000,000 |
| O(2ⁿ) | Exponential | 1024 | 1.27×10³⁰ | ∞ |
| O(n!) | Factorial | 3,628,800 | ∞ | ∞ |

---

## O(1) — Constant Time

Runtime remains the same regardless of input size.

```js
// Array access by index
const getFirst = (arr) => arr[0];

// Hash table lookup
const getValue = (map, key) => map.get(key);

// Stack push/pop
stack.push(item);
stack.pop();
```

**Examples:** Array indexing, hash map operations, arithmetic operations, checking if a number is even/odd.

---

## O(log n) — Logarithmic Time

Runtime increases slowly as input grows. Each step eliminates half the remaining data.

```js
// Binary search
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

**Examples:** Binary search, balanced BST operations, finding an item in a sorted array, calculating exponents with binary exponentiation.

---

## O(n) — Linear Time

Runtime grows proportionally with input size. You touch each element once.

```js
// Find maximum value
function findMax(arr) {
  let max = arr[0];
  for (const num of arr) {
    if (num > max) max = num;
  }
  return max;
}

// Linear search
const includes = (arr, target) => {
  for (const item of arr) {
    if (item === target) return true;
  }
  return false;
};
```

**Examples:** Array traversal, linear search, counting elements, finding min/max, calculating sum.

---

## O(n log n) — Linearithmic Time

Common in efficient sorting algorithms. Combines linear traversal with logarithmic division.

```js
// Merge Sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}
```

**Examples:** Merge sort, quick sort (average case), heap sort, efficient sorting of linked lists.

---

## O(n²) — Quadratic Time

Runtime grows with the square of input size. Usually involves nested loops.

```js
// Bubble Sort
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Check for duplicates (naive)
function hasDuplicates(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}
```

**Examples:** Bubble sort, insertion sort, selection sort, comparing all pairs, simple matrix operations.

---

## O(n³) — Cubic Time

Common in naive matrix operations and dynamic programming with 3D tables.

```js
// Matrix multiplication (naive)
function multiplyMatrices(A, B) {
  const n = A.length;
  const C = Array(n).fill(null).map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        C[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return C;
}
```

**Examples:** Naive matrix multiplication, Floyd-Warshall algorithm, 3-SUM problem (naive), certain dynamic programming solutions.

---

## O(2ⁿ) — Exponential Time

Runtime doubles with each additional input element. Often seen in brute-force recursive solutions.

```js
// Fibonacci (naive recursive)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Generate all subsets
function subsets(arr) {
  if (arr.length === 0) return [[]];

  const first = arr[0];
  const rest = subsets(arr.slice(1));

  return rest.concat(rest.map(subset => [first, ...subset]));
}
```

**Examples:** Naive Fibonacci, generating all subsets/power sets, solving Tower of Hanoi, brute-force password cracking.

---

## O(n!) — Factorial Time

Runtime grows astronomically. Reserved for problems requiring all permutations.

```js
// Generate all permutations
function permutations(arr) {
  if (arr.length <= 1) return [arr];

  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const perms = permutations(remaining);
    for (const perm of perms) {
      result.push([current, ...perm]);
    }
  }
  return result;
}
```

**Examples:** Generating all permutations, brute-force traveling salesman problem, solving n-queens by trying all arrangements.

---

## O(√n) — Square Root Time

Runtime grows relative to the square root of input. Used in optimization techniques.

```js
// Check if number is prime
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// Jump search
function jumpSearch(arr, target) {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0;

  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }

  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) return -1;
  }

  return arr[prev] === target ? prev : -1;
}
```

**Examples:** Prime checking, jump search, Sieve of Eratosthenes optimizations, finding divisors.

---

## Space Complexity

Big O also applies to **memory usage**:

| Algorithm | Time | Space |
|-----------|------|-------|
| Bubble Sort | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(log n) |
| Hash Table Lookup | O(1) | O(n) |

**Trade-off example:** Memoization trades O(n) space for improved time complexity.

---

## Tips for Analysis

1. **Drop constants** — O(2n) simplifies to O(n)
2. **Drop non-dominant terms** — O(n² + n) simplifies to O(n²)
3. **Consider worst case** — Big O typically describes the worst-case scenario
4. **Analyze loops** — Nested loops often multiply complexity
5. **Recursive calls** — Draw the recursion tree to understand branching

## Common Pitfalls

- **Hidden loops** — Methods like `indexOf()`, `includes()`, `slice()` are O(n)
- **String concatenation** — Building strings in a loop can be O(n²) in some languages
- **Copying data** — `slice()`, `spread operator`, `Object.assign()` are O(n)
