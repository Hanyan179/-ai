# ORM 模式参考

## 目录

- DO（数据对象）定义
- SQL 模板语法
- Repository 实现
- BO ↔ DO 转换
- 常用数据库 API

## DO（数据对象）定义

```java
@TableBind(tableName = XxxConstants.TABLE_NAME, pkName = XxxConstants.Column.ID)
public class XxxDO extends DsfaBaseModel<XxxDO> implements Serializable {
    public static final XxxDO DAO = new XxxDO().dao();

    public XxxDO setId(String id) {
        set(XxxConstants.Column.ID, id);
        return this;
    }
    public String getId() {
        return getStr(XxxConstants.Column.ID);
    }
}
```

- 继承 `DsfaBaseModel<T>`，`@TableBind` 绑定表名和主键
- 静态 `DAO` 实例用于查询
- getter/setter 通过 `set(columnName, value)` 和 `getStr(columnName)` 操作
- 列名使用 Constants 中的常量
- DO 放在 **infrastructure** 层

getter 方法选择：

| Java 类型 | JFinal 方法 |
|-----------|-------------|
| String | `getStr(column)` |
| Integer | `getInt(column)` |
| Long | `getLong(column)` |
| Date | `getDate(column)` |
| BigDecimal | `getBigDecimal(column)` |

## SQL 模板语法

放在 `infrastructure/src/main/java/com/dsfa/product/xxx/sql/bizName/bizName.sql`

```sql
#namespace("com.dsfa.product.xxx.bizName")

    #sql("findById")
        SELECT * FROM table_name WHERE ds_deleted = '0' AND id = #para(id)
    #end

    #sql("findByCondition")
        SELECT * FROM table_name
        WHERE ds_deleted = '0'
        #if(name && name != "")
            AND name LIKE concat(concat('%', #para(name)), '%')
        #end
        ORDER BY ds_order
    #end

    #sql("findList")
        SELECT * FROM table_name WHERE ds_deleted = '0'
        #for(item : items)
            #(for.index==0 ? '' : ',') #para(item)
        #end
    #end

#end
```

语法要点：
- `#namespace` 对应 Java 中的 SQL_KEY 前缀
- `#sql("name")` 定义 SQL 片段
- `#para(paramName)` 参数化查询（防注入）
- `#if(condition)` ... `#end` 条件判断
- `#for` 循环处理 IN 查询
- 软删除条件：`ds_deleted = '0'`
- 模糊查询：`LIKE concat(concat('%', #para(xxx)), '%')`（兼容多数据库）

## Repository 实现

```java
@Repository
public class XxxRepositoryImpl implements IXxxRepository {
    public static final String SQL_KEY = "com.dsfa.product.xxx.bizName.";

    @Override
    public Record getById(String id) {
        return Db.findFirst(getSqlPara(SQL_KEY.concat("findById"), Kv.by("id", id)));
    }

    @Override
    public Page<Record> getList(XxxDto dto) {
        return Db.paginate(dto.getPageNum(), dto.getPageSize(),
            Db.getSqlPara(SQL_KEY.concat("findList"), Kv.by("dto", dto)));
    }

    @Override
    public boolean save(XxxBO bo) {
        XxxDO doObj = new XxxDO();
        doObj.setId(bo.getId());
        return doObj.save();
    }
}
```

## BO ↔ DO 转换

### 模式 A（Policy）：手动映射

```java
// Record → BO
AppealMangerBo bo = AppealMangerBo.builder()
    .policyAppealAppealId(record.getStr("policy_appeal_appeal_id"))
    .companyName(record.getStr("company_name"))
    .build();
```

### 模式 B（KMS）：ProductModelUtil

```java
import com.dsfa.product.infra.convert.ProductModelUtil;

TagInfoBO bo = ProductModelUtil.convertDO2BO(tagInfoDO, TagInfoBO.class);
List<TagInfoBO> boList = ProductModelUtil.convertDO2BO(doList, TagInfoBO.class);
TagInfoDO doObj = ProductModelUtil.convertBO2DO(bo, TagInfoDO.class);
XxxBO bo = ProductModelUtil.convertRecord2BO(record, XxxBO.class);
```

## 常用数据库 API

```java
// 获取 SQL + 参数
SqlPara sqlPara = Db.getSqlPara(sqlKey, Kv.by("key", value));

// 查询
Record r = Db.findFirst(sqlPara);           // 单条
List<Record> list = Db.find(sqlPara);       // 列表
Page<Record> page = Db.paginate(pageNum, pageSize, sqlPara);  // 分页

// DO 查询
XxxDO d = XxxDO.DAO.findFirst(sqlPara);
XxxDO d = XxxDO.DAO.findById(id);
List<XxxDO> list = XxxDO.DAO.find(sqlPara);

// 保存/更新
doObj.save();
doObj.update();
Db.batchSave(list, batchSize);
Db.batchUpdate(list, batchSize);

// 直接 SQL
Integer count = Db.queryInt("SELECT COUNT(*) FROM table WHERE col = ?", value);
Long val = Db.queryLong("SELECT MAX(col) FROM table WHERE col <= ?", value);
```
