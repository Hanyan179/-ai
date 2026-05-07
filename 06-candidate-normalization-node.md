# 候选内容标准化节点设计

## 1. 节点定位

候选内容标准化节点负责把不同来源的数据统一成一种候选内容格式，方便后续排序和生成推荐理由。

## 2. 输入

```text
retrieved_todos
retrieved_policies
retrieved_services
retrieved_notices
```

## 3. 输出

```json
{
  "candidates": [
    {
      "id": "",
      "type": "",
      "title": "",
      "summary": "",
      "source": "",
      "publish_time": "",
      "deadline": "",
      "url": "",
      "raw": {}
    }
  ]
}
```

## 4. type 参考值

```text
todo
policy
service
notice
```

## 5. MVP 字段要求

最少保证以下字段：

```text
type
title
summary
source
url
```

如果有截止时间，则补充：

```text
deadline
```

如果有发布时间，则补充：

```text
publish_time
```

## 6. 说明

该节点建议使用 Code 节点实现。

不要在该节点生成推荐理由，也不要做最终排序。
