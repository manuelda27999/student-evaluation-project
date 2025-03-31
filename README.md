# Student-evaluation-project

![](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXRhdHZpeWM5YTJhbHRlNGh0czN1NWVkenF5bmN2ZDhwamZ6MGdydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gKNRbXNnXWoPaXAKnF/giphy.gif)

## Intro

Student Evaluation is a project created to share students’ grades for their different modules and to allow them to evaluate their teachers as well.

## Functional Description

This project will allow the students check their scoring, evaluate theirself and evaluate the teachers.

### Use Cases

#### For students

- List the modules
- Evaluate theirself in each module
- View the marks of each module and the average of the entire curse
- Evaluate the teachers
- Read the coments of the teacher in each module
- Change the password of the profile

#### For teachers

- List the students
- List the modules
- Evaluate each student in each module
- Write a coment to the students in each module
- View students grades for each module
- View the grade the students have given to the teacher
- Change the password of the profile

#### For administrator

- Create new modules
- Create the links to log in the profile

## UI Design

link to [Figma](https://www.figma.com/design/Xto9rwGVgNFYiX65gXrPnD/Student-evaluation-project?node-id=0-1&p=f&t=yWrBfc4NAXPB11Zl-0)

## Data Model

User

- id (object id, required, unique)
- name (string, required)
- password (string)
- permissions (string, required, enum:["student", "teacher", "administrator"])

Modul

- id (object id, required, unique)
- name (string, required)

Mark

- id (object id, required, unique)
- user (object id, ref user, required)
- modul (object id, ref modul, required)
- scoring (array of number)

Coment

- id (object id, required, unique)
- content (string, required)
- users(array of object id, ref user)
- modul(object id, ref modul)
