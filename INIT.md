# Start the project 

## 1. installation

## 1.1. Database

PostgresSQl required
in the postgres terminal

```
CREATE DATABASE tsp;

c\ tsp

CREATE TABLE table_answer
(
  answer_id serial PRIMARY KEY,
  info VARCHAR(255),
  description TEXT[]
);

CREATE TABLE table_question
(
  question_id serial PRIMARY KEY,
  info VARCHAR(255),
  description TEXT[]
);
```

## 1.1.1. create .env 

```
DB_PWD=root
PORT_PROD=42
PORT_DEV=42
PATH_PREFIX_PROD=/example
REACT_SERVER=http://localhost:4242
```

DB_PWD : your password for the postres db
change the rest as you want 

## 1.2. run project

### 1.2.1. installation
```
git clone [...]
cd [...]
yarn install 
```
it should install node_modules in your project

### 1.2.2 start - http://localhost:8080
```
yarn start
```
This starts _two_ servers on localhost, on ports 8080 and 8081. 
Open http://localhost:8080 to serve the files from `/frontend` - React and all that. 
http://localhost:8081 is where the `/server` stuff is, i.e. Express.


If it doesn't work delete all folders node_modules and run `yarn install`in folder `server` and `frontend`

