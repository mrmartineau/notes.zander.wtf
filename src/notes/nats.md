---
title: NATS & JetStream
tags:
  - messaging
  - backend
date: git Last Modified
link: https://docs.nats.io/
---

## What is NATS?

NATS is a lightweight, high-performance messaging system for cloud-native applications, microservices, and IoT, utilizing a publish-subscribe model for efficient communication.

Key functions include:

- **Data Synchronization:** Keeps data synchronized across network actors
- **Message Handling:** Publishes and subscribes to lightweight messages
- **Multi-tenancy Support:** Isolates clients for enhanced security and flexibility
- **Integration:** Connects with systems like Snowflake for low-latency data analytics

## Core NATS

Core NATS operates on a publish-subscribe model using subject/topic-based addressing. This offers two significant advantages: **location independence** and a default **many-to-many (M:N)** communication pattern. These enable powerful solutions for common development patterns like microservices, without requiring load balancers, API gateways, or DNS configuration.

Core NATS provides **at-most-once** (best-effort) message delivery. JetStream adds persistence with **at-least-once** and **exactly-once** semantics.

| Concept         | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| Subjects        | Hierarchical, dot-separated strings (e.g., `orders.us.new`)    |
| `*` wildcard    | Matches a single token                                         |
| `>` wildcard    | Matches all remaining tokens                                   |
| Pub/Sub         | One-to-many fan-out messaging                                  |
| Request/Reply   | One-to-one with built-in reply subject                         |

## CLI Installation

```bash
brew tap nats-io/nats-tools
brew install nats-io/nats-tools/nats
```

### CLI Help

```bash
nats -h
nats cheat
nats cheat sub
nats cheat pub
```

## Core Messaging CLI

| Command                           | Description                              |
| --------------------------------- | ---------------------------------------- |
| `nats pub <subject> <message>`    | Publish a message to a subject           |
| `nats sub <subject>`              | Subscribe and listen for messages        |
| `nats request <subject> <data>`   | Send request and wait for reply          |
| `nats reply <subject> <data>`     | Listen for requests and send replies     |
| `nats bench <subject>`            | Run a performance benchmark              |

## JetStream

JetStream is the built-in persistence engine providing **at-least-once** or **exactly-once** delivery.

| Concept       | Description                                                          |
| ------------- | -------------------------------------------------------------------- |
| Streams       | Message stores capturing data published to specific subjects         |
| Consumers     | Stateful views tracking delivered/acknowledged messages              |
| Pull Consumer | Client requests batches of messages (recommended for scalability)    |
| Push Consumer | Server delivers messages to a specified subject                      |

### Stream Management

| Command                   | Description                                      |
| ------------------------- | ------------------------------------------------ |
| `nats account info`       | Check JetStream status and account limits        |
| `nats stream add <name>`  | Create a new stream (interactive)                |
| `nats stream ls`          | List all streams                                 |
| `nats stream info <name>` | View stream config and state                     |
| `nats stream view <name>` | Browse messages in a stream                      |
| `nats stream rm <name>`   | Delete a stream                                  |
| `nats stream purge <name>`| Purge all messages from a stream                 |
| `nats stream edit <name>` | Edit stream configuration                        |

### Consumer Management

| Command                                    | Description                          |
| ------------------------------------------ | ------------------------------------ |
| `nats consumer add <stream>`               | Create a consumer (interactive)      |
| `nats consumer ls <stream>`                | List consumers for a stream          |
| `nats consumer info <stream> <consumer>`   | View consumer state                  |
| `nats consumer next <stream> <consumer>`   | Fetch next message (pull consumer)   |
| `nats consumer rm <stream> <consumer>`     | Delete a consumer                    |

### Key-Value Store

| Command                               | Description                  |
| ------------------------------------- | ---------------------------- |
| `nats kv add <bucket>`                | Create a KV bucket           |
| `nats kv put <bucket> <key> <value>`  | Set a key                    |
| `nats kv get <bucket> <key>`          | Get a key                    |
| `nats kv del <bucket> <key>`          | Delete a key                 |
| `nats kv ls <bucket>`                 | List keys in a bucket        |
| `nats kv rm <bucket>`                 | Delete a bucket              |
| `nats kv watch <bucket>`              | Watch for changes            |

### Object Store

| Command                          | Description                     |
| -------------------------------- | ------------------------------- |
| `nats obj add <bucket>`          | Create an object store bucket   |
| `nats obj put <bucket> <file>`   | Upload a file                   |
| `nats obj get <bucket> <name>`   | Download a file                 |
| `nats obj ls <bucket>`           | List objects                    |
| `nats obj rm <bucket>`           | Delete a bucket                 |

## Server

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `nats-server`        | Start NATS server                        |
| `nats-server -js`    | Start with JetStream enabled             |
| `nats-server -m 8222`| Enable HTTP monitoring on port 8222      |
| `nats server info`   | View connected server info               |
| `nats server ping`   | Ping all servers in cluster              |

### Config Example (`server.conf`)

```hocon
jetstream {
  store_dir: "/data/nats-jetstream"
  max_mem: 1G
  max_file: 10G
}
```

## Context Management

Contexts save common connection config (server, credentials) for reuse.

| Command                           | Description                          |
| --------------------------------- | ------------------------------------ |
| `nats context save <name> --server <url> --creds <file>` | Create a context |
| `nats context select <name>`      | Switch to a context                  |
| `nats context ls`                 | List available contexts              |
| `nats context rm <name>`          | Remove a context                     |

### Example: Create and Use a Context

```bash
# Save a context with server and credentials
nats context save mycontext --server nats.example.com --creds ~/my.creds

# Subscribe using a context
nats sub --context mycontext "prices.>"

# Publish using a context
nats pub --context mycontext "prices.USD" "1.25"
```

## Examples

### Subscribe to a Subject

```bash
nats --server nats.example.com sub "prices.>"
nats --server 10.20.125.100 sub 'test.subject'
```

### Publish Messages

```bash
# Simple message
nats pub subject_name "Hello World"

# JSON payload
nats pub subject_name '{"key": "value", "number": 42}'

# Publish from file
cat data.json | nats pub subject_name
```
