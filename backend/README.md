    poetry init \
        --name demo-app \
        --dependency fastapi \
        --dependency uvicorn[standard]
<br>
ライブラリインストール

    poetry install --no-root
<br>
fastapi起動

    poetry run uvicorn api.main:app --host 0.0.0.0 --reload
<br>
postgres接続

    psql -h db -p 5432 -U username -d dbname

<br>

    poetry add sqlalchemy asyncpg

<br>
https://qiita.com/horiuchie/items/c144de41dd64c1762722
<br>
https://zenn.dev/sh0nk/books/537bb028709ab9

## Dynamodb
[LINK](https://zenn.dev/marumarumeruru/articles/6aeb25bd27063a)
### list tables
```
aws --endpoint-url=http://localstack:4566 dynamodb list-tables
```
### create table

create talbe
```
aws --endpoint-url=http://localstack:4566 dynamodb create-table \
    --table-name tasks \
    --attribute-definitions \
        AttributeName=userId,AttributeType=S \
        AttributeName=taskId,AttributeType=S \
    --key-schema \
        AttributeName=userId,KeyType=HASH \
        AttributeName=taskId,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

```
--table-name: 作成するテーブルの名前。
--attribute-definitions: テーブルの属性の定義。ここではuserIdとtaskIdを定義しています。Sは文字列を意味します。
--key-schema: テーブルの主キーのスキーマ。HASHはハッシュキー(またはパーティションキー)を、RANGEはレンジキー(またはソートキー)を示します。
--provisioned-throughput: テーブルの読み取りおよび書き込みのキャパシティユニット。この例では読み取りと書き込みのキャパシティユニットを両方とも5に設定しています。必要に応じてこれらの値を調整できます。

tasks table
```
aws --endpoint-url=http://localstack:4566 dynamodb create-table \
    --table-name tasks \
    --attribute-definitions \
        AttributeName=userId,AttributeType=S \
        AttributeName=taskId,AttributeType=S \
    --key-schema AttributeName=userId,KeyType=HASH AttributeName=task_Id,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

```
categorys table
```
aws --endpoint-url=http://localstack:4566 dynamodb create-table \
    --table-name categories \
    --attribute-definitions \
        AttributeName=userId,AttributeType=S \
        AttributeName=categoryId,AttributeType=S \
    --key-schema AttributeName=userId,KeyType=HASH AttributeName=categoryId,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5


```

### get table info
```
aws --endpoint-url=http://localstack:4566 dynamodb describe-table --table-name tasks
```
## DynamoDB テーブル設計

### テーブル名: Tasks

| 属性名       | 属性のタイプ                          | 説明                                                                                     |
|--------------|--------------------------------------|------------------------------------------------------------------------------------------|
| userId       | String                               | ユーザーID                                                                               |
| taskId       | String                               | Taskの一意のID                                                                           |
| title        | String                               | Taskのタイトル                                                                           |
| description  | String                               | Taskの詳細                                                                               |
| status       | String (`pending`, `in-progress`)    | Taskの状態                                                                               |
| priority     | String (`high`, `medium`, `low`)     | Taskの優先度                                                                             |
| category     | String                               | TaskのカテゴリID (CategoriesテーブルのcategoryIdと関連)                                   |
| dueDate      | Number                               | Taskの期限 (タイムスタンプ形式)                                                          |
| createdAt    | Number                               | Taskの作成日時 (タイムスタンプ形式)                                                      |
| updatedAt    | Number                               | Taskの最終更新日時 (タイムスタンプ形式)                                                  |

**Primary key:**

- Partition Key: userId
- Sort Key: taskId

### テーブル名: Categories

| 属性名      | 属性のタイプ | 説明                  |
|-------------|-------------|-----------------------|
| userId      | String      | ユーザーID            |
| categoryId  | String      | カテゴリの一意のID     |
| categoryName| String      | カテゴリ名             |

