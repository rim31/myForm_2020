# Form - Questions / Answers :  website

![](demo-form.gif)


## 1 . front-end :  react js, typescript, unstated(redux like), backend : node js, express, Postgresql

### Demo : create a from to know happiness of clients, display a graph of theirs answers

Admin : 
- insert question(json format)
- edit your questions

Client :
- answers 
- reviews your answers and questions



# TypeScript, React and Express Starter Project

A template project where there's a start for React as a front-end and Express as a back-end, all with TypeScript.

Some buzzwords:

- React
- TypeScript
- Babel
- Webpack
- unstated (redux like)
- Yarn Workspaces
- Hot Reload
- Node Express
- Postgresql

## Usage

This requires Yarn to work.

### Install


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




Start with installing all requried dependencies, and creating all appropriate symlinks between dependencies

```console
$ yarn
```

### Development Mode

To start development mode:

```console
$ yarn start
```

This starts _two_ servers on localhost, on ports 8080 and 8081. Open http://localhost:8080 to serve the files from `/frontend` - React and all that. localhost:8081 is where the `/server` stuff is, i.e. Express.

## General Notes

The one/two servers difference is only to make the setup of the project as (technically) simple as possible, while suitable for as many as possible. You should be able to start using any of the three, together or separately, with minimal reconfiguration required.


## NOTE

- Relation in database : 

```
table_question {
  question_id :primary key;
  info: title ;
  description: [{questions json format ...}]
}

table_answer {
  answer_id :primary key;
  info: question_id;
  description: [{answers...}]
}
```

So, you can find the question of the answer in the info which contains the question_id.
in table_answer.description, you have all the infos
response_id 3 | question_id 71
[
  {id: 0 , question : "How are you feeling at work?" , answer : 1 ,label : "Terrible"},
  {id: 1 , question : "Is it clear what you should focus on and prioritize?" , answer : 5 ,label : "I know exactly what to do"},
  {id: 2 , question : "Do you feel safe to disagree or voice your concerns at work?" , answer : 4 ,label : "Yes, typically"}
]



- Payload : 
load balancing, with clusters
2 servers : active/passive = availability

2 servers  : active/active  
zookeeper to manage them for example

- static : (example FR only one server, FI other server)
- dynamic :load balancing
check availability of server
one request have to be redirect to one or everyone can deal the request

algo to payload
- round robin : send the request every server one by one in a circle for example
- round robin pounderated : example - one server can receive 75% and the other 25%
- least connections : to the server the most available
 
