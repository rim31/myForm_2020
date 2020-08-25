# Starting

In the main project's folder
``
yarn start
``
1. Start DB

install postgress

password to be root with the user postgres necessary

1.1. Create a database.sql

1.2. lunch the command
```
psql -U postgres
```

```
CREATE DATABASE tsp;
```

to connect to the database : tsp
```
\c tsp
```


```
CREATE TABLE tabletest(
  tabletest_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);

\dt           #  to see the relation in the DB
```


2. connect DB to server

use pg : pool   to connect the DB and make request :

get : 
```
app.get("/api", async (req, res) => {
  try {
    const allQuestions: any = await pool.query(
      "SELECT * FROM tabletest");// returning back the data
    res.json(allQuestions.rows);// to return an easy message to read 
  } catch (err) {
    console.error(err.message);
  }
});
```

do the same for PUT, DELETE, GET with id

insert with POSTMAN :
```
{
    "info": "json",
    "description": [
        {
            "label": "How are you feeling at work?",
            "choices": [
            { "label": "Terrible", "value": 1 },
            { "label": "Not good", "value": 2 },
            { "label": "OK", "value": 3 },
            { "label": "Good", "value": 4 },
            { "label": "Great, I love my work", "value": 5 }
            ]
        },
        {
            "label": "Is it clear what you should focus on and prioritize?",
            "choices": [
            { "label": "I have no idea", "value": 1 },
            { "label": "I'm uncertain about my goals", "value": 2 },
            { "label": "Partly yes, partly no", "value": 3 },
            { "label": "Mostly yes", "value": 4 },
            { "label": "I know exactly what to do", "value": 5 }
            ]
        },
        {
            "label": "Do you feel safe to disagree or voice your concerns at work?",
            "choices": [
            { "label": "Almost never", "value": 1 },
            { "label": "Rarely", "value": 2 },
            { "label": "Sometimes yes, sometimes no", "value": 3 },
            { "label": "Yes, typically", "value": 4 },
            { "label": "Yes, almost always", "value": 5 }
            ]
        }
    ]
}
```
