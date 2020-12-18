# mongodb-demo

| SQL 术语/概念 | MongoDB 术语/概念 | 解释/说明                              |
| ------------- | ----------------- | -------------------------------------- |
| database      | database          | 数据库                                 |
| table         | collection        | 数据库表/集合                          |
| row           | document          | 数据记录行/文档                        |
| column        | field             | 数据字段/域                            |
| index         | index             | 索引                                   |
| table         | joins             | 表连接,MongoDB 不支持                  |
| primary key   | primary key       | 主键,MongoDB 自动将\_id 字段设置为主键 |

## MongoDB 插入文档

`db.COLLECTION_NAME.insert(document)`

`db.collection.insertOne()` 用于向集合插入一个新文档

```
db.collection.insertOne(
   <document>,
   {
      writeConcern: <document>
   }
)
```

`db.collection.insertMany()` 用于向集合插入一个多个文档

```
db.collection.insertMany(
   [ <document 1> , <document 2>, ... ],
   {
      writeConcern: <document>,
      ordered: <boolean>
   }
)
```

参数说明：

> document：要写入的文档。

> writeConcern：写入策略，默认为 1，即要求确认写操作，0 是不要求。

> ordered：指定是否按顺序写入，默认 true，按顺序写入。

## MongoDB 更新文档

`update()` 更新已存在的文档

```
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```

```
db.col.update(
    {'title':'MongoDB 教程'},
    {
        $set:{'title':'MongoDB'}
    },
    { multi:true }
)
```

参数说明：

> query : update 的查询条件，类似 sql update 查询内 where 后面的。

> update : update 的对象和一些更新的操作符（如$,$inc...）等，也可以理解为 sql update 查询内 set 后面的

> upsert : 可选，这个参数的意思是，如果不存在 update 的记录，是否插入 objNew,true 为插入，默认是 false，不插入。

> multi : 可选，mongodb 默认是 false,只更新找到的第一条记录，如果这个参数为 true,就把按条件查出来多条记录全部更新。

> writeConcern :可选，抛出异常的级别。

`save()` 通过传入的文档来替换已有文档，\_id 主键存在就更新，不存在就插入

```
db.collection.save(
   <document>,
   {
     writeConcern: <document>
   }
)
```

```
db.col.save({
    "_id" : ObjectId("56064f89ade2f21f36b03136"),
    "title" : "MongoDB",
    "description" : "MongoDB 是一个 Nosql 数据库",
    "by" : "Runoob",
    "url" : "http://www.runoob.com",
    "tags" : [
            "mongodb",
            "NoSQL"
    ],
    "likes" : 110
})
```

参数说明：

> document : 文档数据。

> writeConcern :可选，抛出异常的级别。

## MongoDB 删除文档

```
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```

```
db.col.remove({'title':'MongoDB 教程'})

db.col.remove({})
```

参数说明：

> query :（可选）删除的文档的条件。

> justOne : （可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。

> writeConcern :（可选）抛出异常的级别。

## MongoDB 查询文档

`db.collection.find(query, projection)`

> query ：可选，使用查询操作符指定查询条件

> projection ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

`pretty()` 方法以格式化的方式来显示所有文档

| 操作       | 格式                   | 范例                                      |    RDBMS 中的类似语句 |
| :--------- | :--------------------- | :---------------------------------------- | --------------------: |
| 等于       | {<key>:<value>}        | db.col.find({"by":"菜鸟教程"}).pretty()   | where by = '菜鸟教程' |
| 小于       | {<key>:{$lt:<value>}}  | db.col.find({"likes":{$lt:50}}).pretty()  |      where likes < 50 |
| 小于或等于 | {<key>:{$lte:<value>}} | db.col.find({"likes":{$lte:50}}).pretty() |     where likes <= 50 |
| 大于       | {<key>:{$gt:<value>}}  | db.col.find({"likes":{$gt:50}}).pretty()  |      where likes > 50 |
| 大于或等于 | {<key>:{$gte:<value>}} | db.col.find({"likes":{$gte:50}}).pretty() |     where likes >= 50 |
| 不等于     | {<key>:{$ne:<value>}}  | db.col.find({"likes":{$ne:50}}).pretty()  |     where likes != 50 |

AND 条件
`db.col.find({key1:value1, key2:value2}).pretty()`

OR 条件

```
db.col.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()
```

AND 和 OR 联合使用

```
db.col.find(
    {
        "likes": {$gt:50},
        $or: [
            {"by": "菜鸟教程"},
            {"title": "MongoDB 教程"}
        ]
    }
).pretty()
```

## MongoDB 条件操作符

### (>) 大于操作符 - $gt

`db.col.find({likes : {$gt : 100}})`

### (>=）大于等于操作符 - $gte

`db.col.find({likes : {$gte : 100}})`

### (<) 小于操作符 - $lt

`db.col.find({likes : {$lt : 150}})`

### (<=) 小于等于操作符 - $lte

`db.col.find({likes : {$lte : 150}})`

使用 (<) 和 (>) 查询 - $lt 和 $gt
`db.col.find({likes : {$lt :200, $gt : 100}})`

## MongoDB $type 操作符

$type 操作符是基于 BSON 类型来 **检索集合中匹配的数据类型** ，并返回结果。

| 类型                    | 数字 |           备注 |
| :---------------------- | :--: | -------------: |
| Double                  |  1   |                |
| String                  |  2   |                |
| Object                  |  3   |                |
| Array                   |  4   |                |
| Binary data             |  5   |                |
| Undefined               |  6   |       已废弃。 |
| Object id               |  7   |                |
| Boolean                 |  8   |                |
| Date                    |  9   |                |
| Null                    |  10  |                |
| Regular Expression      |  11  |                |
| JavaScript              |  13  |                |
| Symbol                  |  14  |                |
| JavaScript (with scope) |  15  |                |
| 32-bit integer          |  16  |                |
| Timestamp               |  17  |                |
| 64-bit integer          |  18  |                |
| Min key                 | 255  | Query with -1. |
| Max key                 | 127  |

获取"col" 集合中 title 为 String 的数据

```
db.col.find({"title" : {$type : 2}})
或
db.col.find({"title" : {$type : 'string'}})
```

## MongoDB Limit 与 Skip 方法

`db.COLLECTION_NAME.find().limit(NUMBER)`
`db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)`

## MongoDB 排序

`db.COLLECTION_NAME.find().sort({KEY:1})` 1 升序排列，-1 降序排列。

col 集合中的数据按字段 likes 的降序排列：
`db.col.find({},{"title":1,_id:0}).sort({"likes":-1})`

## MongoDB 索引

> 索引通常能够极大的提高查询的效率

> 索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列的值进行排序的一种结构

`db.collection.createIndex(keys, options)`
Key 值为你要创建的索引字段，1 为指定按升序创建索引，如果你想按降序来创建索引指定为 -1 即可。

```
db.col.createIndex({"title":1})
db.col.createIndex({"title":1,"description":-1})
db.values.createIndex({open: 1, close: 1}, {background: true})
```

options
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| background | Boolean | 建索引过程会阻塞其它数据库操作，background 可指定以后台方式创建索引，即增加 "background" 可选参数。 "background" 默认值为 false。 |
| unique | Boolean | 建立的索引是否唯一。指定为 true 创建唯一索引。默认值为 false. |
| name | string | 索引的名称。如果未指定，MongoDB 的通过连接索引的字段名和排序顺序生成一个索引名称。 |
| dropDups | Boolean | 3.0+版本已废弃。在建立唯一索引时是否删除重复记录,指定 true 创建唯一索引。默认值为 false. |
| sparse | Boolean | 对文档中不存在的字段数据不启用索引；这个参数需要特别注意，如果设置为 true 的话，在索引字段中不会查询出不包含对应字段的文档.。默认值为 false. |
| expireAfterSeconds | integer | 指定一个以秒为单位的数值，完成 TTL 设定，设定集合的生存时间。 |
| v | index version | 索引的版本号。默认的索引版本取决于 mongod 创建索引时运行的版本。 |
| weights | document | 索引权重值，数值在 1 到 99,999 之间，表示该索引相对于其他索引字段的得分权重。 |
| default_language | string | 对于文本索引，该参数决定了停用词及词干和词器的规则的列表。 默认为英语 |
| language_override | string | 对于文本索引，该参数指定了包含在文档中的字段名，语言覆盖默认的 language，默认值为 language. |

## MongoDB 聚合

MongoDB 中聚合(aggregate)主要用于 **处理数据** (诸如统计平均值，求和等)，并返回计算后的数据结果

`db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)`

计算每个作者所写的文章数

```
db.mycol.aggregate([
    {
        $group : {
            _id : "$by_user",
            num_tutorial : {
                $sum : 1
            }
        }
    }
])
```

| 表达式    | 描述                                         | 实例                                                                                    |
| --------- | -------------------------------------------- | --------------------------------------------------------------------------------------- |
| $sum      | 计算总和。                                   | `db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}])` |
| $avg      | 计算平均值                                   | `db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}])` |
| $min      | 获取集合中所有文档对应值得最小值。           | `db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}])` |
| $max      | 获取集合中所有文档对应值得最大值。           | `db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}])` |
| $push     | 在结果文档中插入值到一个数组中。             | `db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}])`            |
| $addToSet | 在结果文档中插入值到一个数组中，但不创建副本 | `db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}])`       |
| $first    | 根据资源文档的排序获取第一个文档数据。       | `db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}])`    |
| $last     | 根据资源文档的排序获取最后一个文档数据       | `db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}])`      |

## 管道的概念

> $project： 修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。

> $match：      用于过滤数据，只输出符合条件的文档。$match 使用 MongoDB 的标准查询操作。

> $limit： 用来限制 MongoDB 聚合管道返回的文档数。

> $skip： 在聚合管道中跳过指定数量的文档，并返回余下的文档。

> $unwind： 将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。

> $group： 将集合中的文档分组，可用于统计结果。

> $sort： 将输入文档排序后输出。

> $geoNear： 输出接近某一地理位置的有序文档。

```
<!-- 输出_id,tilte和author三个字段 -->
db.article.aggregate({
    $project : {
        title : 1 ,
        author : 1 ,
    }
});

<!-- 不包含_id -->
db.article.aggregate({
    $project : {
        _id : 0 ,
        title : 1 ,
        author : 1
    }
});
```

```
db.articles.aggregate([
    { 
        $match : {
            score : { 
                $gt : 70, 
                $lte : 90
            }
        }
    },
    { 
        $group: { 
            _id: null, 
            count: { 
                $sum: 1 
            } 
        } 
    }
]);
```

```
db.article.aggregate({ 
    $skip : 5 
});
```