## mongo 存储结构

- 数据库 =》 表 =》 行和列（行）
- 数据库 =》集合 =》 文档（一条记录）

## 数据库的基本操作

- show dbs 显示所有数据库
- show collections 显示所有集合
- use <数据库名> 切换数据库
- db.createCollection(<集合名>) 创建集合，同时会创建数据库
- db.<集合名>.drop() 删除集合
- db.<集合名>.insert({}) 插入数据，同时会创建集合
- db.<集合名>.find() 查询数据
- db.<集合名>.find({}) 查询数据

## 配置权限

常见的数据库角色 read / readWrite / dbOwner / readAnyDatabase / readWriteAnyDatabase ...
db.createUser({user: "lyz", pwd:"lyz", roles:[{role: "dbOwner", db: "blog"}]})

> /opt/homebrew/etc.mongod.conf

```
security:
  authorization: enabled
```

```
use admin
ad.auth('lyz', 'lyz') 登录
```

## 备份，导出，导入

```sh
mongodump -d blog -c user -o backup
mongorestore backup

mongoexport

mongoexport -d <数据库名> -c <集合名> --csv -f
mongoimport -d <数据库名> -c <集合名> --type csv --headerline --file my.csv
```

## 基本的对集合和文档的操作

```
db.user.find(查询条件)
db.user.insert(插入的数据)
db.user.update(更新条件, 更新内容)
db.user.deleteOne(删除条件)
db.user.deleteMany(删除条件)
```

## mongoose

> odm object document mapping (本质上就是 orm object relational mapping)
