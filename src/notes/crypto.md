---
title: Crypto
tags:
  - node
  - javascript
emoji: 🛂
date: 2020-03-11
modified: 2020-03-26T23:06:06.000Z
link: http://nodejs.org/api/crypto.html#crypto_crypto
---

The `crypto` module provides cryptographic functionality including hashing, HMAC, encryption/decryption, signing, and random value generation. Available in both Node.js and modern browsers via the Web Crypto API.

---

## Random Values

### Generate UUID

```js
// Works in Node.js and browsers
crypto.randomUUID();
// → "550e8400-e29b-41d4-a716-446655440000"
```

### Random Bytes

```js
import crypto from 'crypto';

// Generate random bytes (Node.js)
const buffer = crypto.randomBytes(32);
const hex = buffer.toString('hex');
// → "a3f2b8c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1"

// Generate random bytes (Browser)
const array = new Uint8Array(32);
crypto.getRandomValues(array);
```

### Random Integer

```js
import crypto from 'crypto';

// Generate random integer in range [min, max)
crypto.randomInt(100);       // 0-99
crypto.randomInt(10, 100);   // 10-99

// Async version
const num = await crypto.randomInt(1, 1000);
```

---

## Hashing

### Basic Hash (SHA-256)

```js
import crypto from 'crypto';

const data = 'Hello, World!';
const hash = crypto.createHash('sha256').update(data).digest('hex');
// → "dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f"
```

### Hash an Object

```js
import crypto from 'crypto';

const body = {
  uuid: '433d7a1b-e8e1-4b5a-b590-f468e5c18cc7',
  name: 'Zander',
};

const hash = crypto.createHash('sha256');
hash.update(JSON.stringify(body));
const hashedResponse = hash.digest('hex');
// → "5a7430e6d96dafadc642289eba7e215d3b9cfd7a58f9593749891424e6d75a4f"
```

### Available Hash Algorithms

```js
// List all available hash algorithms
crypto.getHashes();
// → ['sha256', 'sha512', 'sha3-256', 'md5', 'blake2b512', ...]
```

| Algorithm | Output Size | Use Case |
|-----------|-------------|----------|
| `sha256` | 256 bits | General purpose, signatures |
| `sha512` | 512 bits | Higher security needs |
| `sha3-256` | 256 bits | Modern alternative to SHA-2 |
| `md5` | 128 bits | Checksums only (not secure!) |
| `blake2b512` | 512 bits | Fast, secure alternative |

### Hash a File

```js
import crypto from 'crypto';
import fs from 'fs';

function hashFile(filepath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filepath);

    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

const checksum = await hashFile('./large-file.zip');
```

---

## HMAC (Hash-based Message Authentication Code)

Used for verifying data integrity and authenticity with a secret key.

```js
import crypto from 'crypto';

const secret = 'my-secret-key';
const message = 'Important message';

const hmac = crypto.createHmac('sha256', secret)
  .update(message)
  .digest('hex');
// → "8b5a4e3f2c1d0e9f8a7b6c5d4e3f2a1b..."
```

### Verify Webhook Signature

```js
import crypto from 'crypto';

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  // Use timingSafeEqual to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

---

## Encryption & Decryption

### AES-256-GCM (Recommended)

```js
import crypto from 'crypto';

const algorithm = 'aes-256-gcm';

function encrypt(text, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString('hex'),
    encrypted,
    authTag: authTag.toString('hex'),
  };
}

function decrypt(encryptedData, key) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(encryptedData.iv, 'hex')
  );

  decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));

  let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

// Usage
const key = crypto.randomBytes(32); // 256-bit key
const encrypted = encrypt('Secret message', key);
const decrypted = decrypt(encrypted, key);
```

### Generate Secure Key from Password

```js
import crypto from 'crypto';

// Derive a key from a password using PBKDF2
function deriveKey(password, salt = crypto.randomBytes(16)) {
  const key = crypto.pbkdf2Sync(
    password,
    salt,
    100000,  // iterations
    32,      // key length
    'sha256'
  );
  return { key, salt };
}

// Async version
async function deriveKeyAsync(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 32, 'sha256', (err, key) => {
      if (err) reject(err);
      else resolve(key);
    });
  });
}
```

---

## Password Hashing (with scrypt)

For storing passwords, use `scrypt` — designed to be slow and memory-hard.

```js
import crypto from 'crypto';

async function hashPassword(password) {
  const salt = crypto.randomBytes(16);

  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt.toString('hex') + ':' + derivedKey.toString('hex'));
    });
  });
}

async function verifyPassword(password, hash) {
  const [salt, key] = hash.split(':');

  return new Promise((resolve, reject) => {
    crypto.scrypt(password, Buffer.from(salt, 'hex'), 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(crypto.timingSafeEqual(
        Buffer.from(key, 'hex'),
        derivedKey
      ));
    });
  });
}

// Usage
const hashed = await hashPassword('mySecretPassword');
const isValid = await verifyPassword('mySecretPassword', hashed); // true
```

---

## Digital Signatures

### Sign and Verify Data

```js
import crypto from 'crypto';

// Generate key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// Sign data
const data = 'Data to sign';
const signature = crypto.sign('sha256', Buffer.from(data), privateKey);

// Verify signature
const isValid = crypto.verify(
  'sha256',
  Buffer.from(data),
  publicKey,
  signature
);
// → true
```

### Generate Key Pair (Async)

```js
import crypto from 'crypto';

const { publicKey, privateKey } = await crypto.generateKeyPair('ed25519');

// Export keys as PEM
const publicPem = publicKey.export({ type: 'spki', format: 'pem' });
const privatePem = privateKey.export({ type: 'pkcs8', format: 'pem' });
```

---

## Web Crypto API (Browser)

The browser's built-in crypto API for client-side cryptography.

### Hash in Browser

```js
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

await sha256('Hello, World!');
// → "dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f"
```

### Encrypt in Browser

```js
async function generateKey() {
  return crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

async function encrypt(plaintext, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );

  return { iv, ciphertext };
}

async function decrypt({ iv, ciphertext }, key) {
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  );

  return new TextDecoder().decode(decrypted);
}
```

---

## Quick Reference

| Task | Method |
|------|--------|
| Generate UUID | `crypto.randomUUID()` |
| Random bytes | `crypto.randomBytes(n)` |
| Hash data | `crypto.createHash('sha256').update(data).digest('hex')` |
| HMAC | `crypto.createHmac('sha256', secret).update(data).digest('hex')` |
| Encrypt | `crypto.createCipheriv(algorithm, key, iv)` |
| Decrypt | `crypto.createDecipheriv(algorithm, key, iv)` |
| Password hash | `crypto.scrypt(password, salt, keylen, callback)` |
| Sign data | `crypto.sign('sha256', data, privateKey)` |
| Verify signature | `crypto.verify('sha256', data, publicKey, signature)` |
| Compare securely | `crypto.timingSafeEqual(a, b)` |

---

## Security Best Practices

1. **Never use MD5 or SHA1** for security purposes — they're broken
2. **Use `timingSafeEqual`** when comparing hashes to prevent timing attacks
3. **Generate fresh IVs** for each encryption operation
4. **Use authenticated encryption** (AES-GCM) to detect tampering
5. **Store salts with hashes** — they don't need to be secret
6. **Use high iteration counts** for password hashing (≥100,000 for PBKDF2)
7. **Prefer `scrypt` or `argon2`** over PBKDF2 for password storage
