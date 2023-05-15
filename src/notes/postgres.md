---
title: Postgres
tags:
  - sql
date: git Last Modified
emoji: 💽
---

## Install

```sh
brew install postgresql@15
fish_add_path /opt/homebrew/opt/postgresql@15/bin
```

## Tables

## Create table

```sql
CREATE TABLE public.tags (
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL
);
```

## Drop table

```sql
DROP TABLE public.tags;
```

## Rename table

```sql
ALTER TABLE public.tags RENAME TO public.bookmarks_tags;
```

## Add column

```sql
ALTER TABLE public.bookmarks_tags ADD COLUMN tag_id integer REFERENCES public.tags(id) ON DELETE CASCADE;
```

### Junction table

Given a many-to-many relationship between two tables, create a junction table to represent the relationship. This query creates a junction table for a many-to-many relationship between the `bookmarks` and `tags` tables.

```sql
CREATE TABLE public.bookmark_tag (
  bookmark_id uuid REFERENCES public.bookmarks(id) ON DELETE CASCADE,
  tag_id integer REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (bookmark_id, tag_id)
);
```

## Create enum

```sql
CREATE TYPE status AS ENUM ('active', 'inactive', 'deleted', 'archived', 'draft');
```

## Constraints

### List constraints on a table

```sql
SELECT *
FROM information_schema.constraint_table_usage
WHERE table_name = 'table_name'
```

### Drop constraint on a table

```sql
ALTER TABLE table_name DROP CONSTRAINT table_name_field_fkey;
```

# Backup and restore

## Database backup & restore

Using [`pg_dump`](https://www.postgresql.org/docs/current/app-pgdump.html)

### Backup DB and content

```sh
pg_dump -U postgres -W -h db.******.supabase.co -p 5432 -n public -F t -f db-backup.tar postgres
```

### Only backup DB schemas

Notice the `-s` flag

```sh
pg_dump -U postgres -W -h db.******.supabase.co -p 5432 -s -n public -F t -f db-backup.tar postgres
```

### Restore DB

Using [`pg_restore`](https://www.postgresql.org/docs/current/app-pgrestore.html)

```sh
pg_restore -U postgres -W -h db..******..supabase.co -p 5432 -F t -C -d postgres db-backup.tar
```

## Meta

### Get all RLS policies

```sql
select * from pg_policies
```

### All databases and their sizes

```sql
select * from pg_user;
```
