---
title: JavaScript dates
tags:
  - javascript
---

The **Unix epoch** (or **Unix time** or **POSIX time** or **Unix timestamp**) is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), not counting leap seconds (in ISO 8601: 1970-01-01T00:00:00Z). Literally speaking the epoch is Unix time 0 (midnight 1/1/1970), but 'epoch' is often used as a synonym for Unix time.

| Human-readable time | Seconds      | Milliseconds      |
| ------------------- | ------------ | ----------------- |
| 1 second            | 1            | 1000 ms           |
| 1 minute            | 60 s         | 60,000 ms         |
| 1 hour              | 3,600 s      | 3,600,000 ms      |
| 1 day               | 86,400 s     | 86,400,000 ms     |
| 1 week              | 604,800 s    | 604,800,000 ms    |
| 1 month             | 2,629,746 s  | 2,629,746,000 ms  |
| 1 year              | 31,556,952 s | 31,556,952,000 ms |

## Get the current epoch time

The `getTime()` method returns the time in milliseconds.

```js
Math.floor(new Date().getTime() / 1000.0) // 1676457318
```

## Convert from epoch to human-readable date

```js
const date = new Date(1676457318 * 1000) // Wed Feb 15 2023 10:35:18 GMT+0000 (Greenwich Mean Time)
```

## Date methods

```js
date.toDateString() // 'Wed Feb 15 2023'
date.toJSON() // '2023-02-15T10:35:18.000Z'
date.toUTCString() // 'Wed, 15 Feb 2023 10:35:18 GMT'
date.toLocaleString() // '2/15/2023, 10:35:18 AM'
date.toLocaleTimeString() // '10:35:18 AM'
date.getDate() // 15
date.getTime() // 1676457318000
date.getUTCDay() // 3
date.getMinutes() // 35
date.getHours() // 10
date.getMonth() // 1 - months are zero-indexed
date.getFullYear() // 2023
```
