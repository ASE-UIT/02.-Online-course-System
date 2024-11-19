## Elastic - Postgres Sync Strategy: using Logstash, Docker and Docker-compose

@Author: Chabuuuu

### 1. Clone the repository

### 2. Lauch the application

```
docker compose up --build
```

As default, this will init the table employee in postgres with folowing records:
```
1	"jon"	"jon@mail.com"	70000	"SBY"	"2024-06-13 02:11:53.138833"
2	"wick"	"wick@mail.com"	80000	"JKT"	"2024-06-13 02:11:53.141248"
3	"mat"	"mat@mail.com"	70000	"SBY"	"2024-06-13 02:11:53.142573"
4	"sapii"	"sapii@mail.com"	60000	"SBY"	"2024-06-13 02:11:53.144024"
5	"deno"	"deno@mail.com"	90000	"JKT"	"2024-06-13 02:11:53.145483"
```

Go to kibana on http://localhost:5601 and test this query:
GET employee/_search

This will return
```
{
  "took": 4,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 5,
      "relation": "eq"
    },
    "max_score": 1,
    "hits": [
      {
        "_index": "employee",
        "_id": "5",
        "_score": 1,
        "_source": {
          "name": "deno",
          "email": "deno@mail.com",
          "salary": 90000,
          "id": 5,
          "city": "JKT",
          "last_update": "2024-06-13T02:11:53.145483Z"
        }
      },
      {
        "_index": "employee",
        "_id": "4",
        "_score": 1,
        "_source": {
          "name": "sapii",
          "email": "sapii@mail.com",
          "salary": 60000,
          "id": 4,
          "city": "SBY",
          "last_update": "2024-06-13T02:11:53.144024Z"
        }
      },
      {
        "_index": "employee",
        "_id": "1",
        "_score": 1,
        "_source": {
          "name": "jon",
          "email": "jon@mail.com",
          "salary": 70000,
          "id": 1,
          "city": "SBY",
          "last_update": "2024-06-13T02:11:53.138833Z"
        }
      },
      {
        "_index": "employee",
        "_id": "3",
        "_score": 1,
        "_source": {
          "name": "mat",
          "email": "mat@mail.com",
          "salary": 70000,
          "id": 3,
          "city": "SBY",
          "last_update": "2024-06-13T02:11:53.142573Z"
        }
      },
      {
        "_index": "employee",
        "_id": "2",
        "_score": 1,
        "_source": {
          "name": "wick",
          "email": "wick@mail.com",
          "salary": 80000,
          "id": 2,
          "city": "JKT",
          "last_update": "2024-06-13T02:11:53.141248Z"
        }
      }
    ]
  }
}
```

### 3. Testing update and insert

#### Test insert:
Execute this query:
```
INSERT INTO employee(id, name, email, salary, city, last_update) VALUES (6, 'nguyen van teo', 'nguyenvanteo@gmail.com', 1000, 'HCM', CURRENT_TIMESTAMP);
INSERT INTO employee(id, name, email, salary, city, last_update) VALUES (7, 'huynh van dat', 'huynhvandat@gmail.com', 1200, 'HANOI', CURRENT_TIMESTAMP);
INSERT INTO employee(id, name, email, salary, city, last_update) VALUES (8, 'nguyen huy', 'nguyenhuy@gmail.com', 3000, 'NY', CURRENT_TIMESTAMP);
```
Check kibana:

GET employee/_search

Result: 
```
{
  "took": 217,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 8,
      "relation": "eq"
    },
    "max_score": 1,
    "hits": [
      {
        "_index": "employee",
        "_id": "5",
        "_score": 1,
        "_source": {
          "name": "deno",
          "email": "deno@mail.com",
          "salary": 90000,
          "id": 5,
          "city": "JKT",
          "last_update": "2024-06-13T02:11:53.145483Z"
        }
      },
      {
        "_index": "employee",
        "_id": "4",
        "_score": 1,
        "_source": {
          "name": "sapii",
          "email": "sapii@mail.com",
          "salary": 60000,
          "id": 4,
          "city": "SBY",
          "last_update": "2024-06-13T02:11:53.144024Z"
        }
      },
      {
        "_index": "employee",
        "_id": "1",
        "_score": 1,
        "_source": {
          "name": "jon",
          "email": "jon@mail.com",
          "salary": 70000,
          "id": 1,
          "city": "SBY",
          "last_update": "2024-06-13T02:11:53.138833Z"
        }
      },
      {
        "_index": "employee",
        "_id": "3",
        "_score": 1,
        "_source": {
          "name": "mat",
          "email": "mat@mail.com",
          "salary": 70000,
          "id": 3,
          "city": "SBY",
          "last_update": "2024-06-13T02:11:53.142573Z"
        }
      },
      {
        "_index": "employee",
        "_id": "2",
        "_score": 1,
        "_source": {
          "name": "wick",
          "email": "wick@mail.com",
          "salary": 80000,
          "id": 2,
          "city": "JKT",
          "last_update": "2024-06-13T02:11:53.141248Z"
        }
      },
      {
        "_index": "employee",
        "_id": "6",
        "_score": 1,
        "_source": {
          "name": "nguyen van teo",
          "email": "nguyenvanteo@gmail.com",
          "salary": 1000,
          "id": 6,
          "city": "HCM",
          "last_update": "2024-06-13T09:40:29.782091Z"
        }
      },
      {
        "_index": "employee",
        "_id": "8",
        "_score": 1,
        "_source": {
          "name": "nguyen huy",
          "email": "nguyenhuy@gmail.com",
          "salary": 3000,
          "id": 8,
          "city": "NY",
          "last_update": "2024-06-13T09:41:50.527874Z"
        }
      },
      {
        "_index": "employee",
        "_id": "7",
        "_score": 1,
        "_source": {
          "name": "huynh van dat",
          "email": "huynhvandat@gmail.com",
          "salary": 1200,
          "id": 7,
          "city": "HANOI",
          "last_update": "2024-06-13T09:41:50.527874Z"
        }
      }
    ]
  }
}
```

#### Test update
Execute this query:
```
UPDATE employee 
SET name='huynh van tien', last_update = CURRENT_TIMESTAMP
WHERE employee.id = 6
```

Test if record id 6 is update on elastic or not:
```
GET employee/_search 
{
  "query": {
    "match": {
      "id": 6
    }
  }
}
```
This will return
```
{
  "took": 655,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 1,
      "relation": "eq"
    },
    "max_score": 1,
    "hits": [
      {
        "_index": "employee",
        "_id": "6",
        "_score": 1,
        "_source": {
          "name": "huynh van tien",
          "email": "nguyenvanteo@gmail.com",
          "salary": 1000,
          "id": 6,
          "city": "HCM",
          "last_update": "2024-06-13T09:47:53.090969Z"
        }
      }
    ]
  }
}
```

### Notes
This will NOT catch the database delete record event

Solution: using soft delete, if need hard delete, just delete all the records that have flag "deleted" from both Postgres and Elasticseach
