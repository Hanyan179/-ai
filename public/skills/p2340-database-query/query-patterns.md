# 常用查询模板

## 1. 搜索表名

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'dreamit_dj'
  AND table_type = 'BASE TABLE'
  AND table_name LIKE '%关键词%'
ORDER BY table_name
```

## 2. 查看表字段结构

```sql
SELECT column_name, data_type, character_maximum_length, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'dreamit_dj' AND table_name = '表名'
ORDER BY ordinal_position
```

## 3. 查看表索引

```sql
SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'dreamit_dj' AND tablename = '表名'
```

## 4. 查看主键和约束

```sql
SELECT tc.constraint_name, tc.constraint_type, kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_schema = 'dreamit_dj' AND tc.table_name = '表名'
```

## 5. 查询数据样例（带分页）

```sql
SELECT * FROM dreamit_dj.表名
WHERE "ROWSTATE" = 1
ORDER BY "CREATE_TIME" DESC
LIMIT 10
```

## 6. 统计记录数

```sql
SELECT COUNT(*) as total FROM dreamit_dj.表名 WHERE "ROWSTATE" = 1
```

## 7. 查看表注释（如果有）

```sql
SELECT obj_description(oid) as table_comment
FROM pg_class
WHERE relname = '表名' AND relnamespace = (
  SELECT oid FROM pg_namespace WHERE nspname = 'dreamit_dj'
)
```

## 8. 查看字段注释

```sql
SELECT a.attname as column_name, d.description as column_comment
FROM pg_class c
JOIN pg_attribute a ON a.attrelid = c.oid
LEFT JOIN pg_description d ON d.objoid = c.oid AND d.objsubid = a.attnum
WHERE c.relname = '表名'
  AND c.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'dreamit_dj')
  AND a.attnum > 0
ORDER BY a.attnum
```
