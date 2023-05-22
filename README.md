# Student Evaluation System (SES)

Evaluate performance of student on the basis of his score in real time test.

## Tech Stack
- **NodeJS**
- **HTML/CSS**
- **MySQL**


## API Requirements


#### API: LOGIN TEACHER/STUDENT
```bash
http://localhost:2050/api/user/login
```
#### TYPE: POST 
- #### PAYLOAD: 
```javascript 
{
    email: "string",
    password: "string",
    role: "teacher/student"
}
```

- #### RESPONSE: 
```javascript
{
    status: true,
    statusCode: 200,
    message: "User logged-in successfully.",
    data: {
        email: "madhukar@gmail.com",
        name: "madhukar",
        role: "teacher"
    }
}
```

---

#### API: ADD QUESTION
#### END POINT: 
```bash
http://localhost:2050/api/question/add
```
#### TYPE: POST 
- #### PAYLOAD: 
```javascript 
{
    questionText: 'string',
    options: {
        optA: 'string',
        optB: 'string'
        optC: 'string'
        optD: 'string'
    },
    correctAnswer: "string[optA/optB/optC/optD]"
}
```
- #### RESPONSE: 
```javascript
{
    status: boolean,
    message: 'string',
    httpCode: 200,
    data: {}
}
```
---

#### API: TAKE TEST
#### END POINT: 
```bash
http://localhost:2050/api/test/begin
```
#### TYPE: GET 
- #### PAYLOAD
```javascript 
{}
```

- #### RESPONSE:
```javascript
{
    status: true,
    statusCode: 200,
    message: "Questions fetched successfully.",
    data: [
        {
            id: "number",
            question_text: "string",
            options: {
                "optA": "string",
                "optB": "string",
                "optC": "string",
                "optD": "string"
            },
            questionNumber: 1
        }
        .
        .
        .
        {
            id: "number",
            question_text: "string",
            options: {
                "optA": "string",
                "optB": "string",
                "optC": "string",
                "optD": "string"
            },
            questionNumber: "n"
        }
    ]
}
```
---
#### API: EVALUATE 
```bash
http://localhost:2050/api/test/evaluate
```
#### TYPE: POST
- #### PAYLOAD: 
```javascript
[
    {
        id: "number",
        question_number: 1,
        selected_option:  "string[optA/optB/optC/optD]/null"
    },
    .
    .
    .
    {
        id: "number",
        question_number: "n",
        selected_option: "string[optA/optB/optC/optD]/null"
    },
]
```

- #### RESPONSE: 
```javascript
{
    status: true,
    statusCode: 200,
    message: "Answersheet evaluated successfully.",
    data: {
        score: "X/X",
        answerSheet: [
            {
                id: "number",
                question_number: 1,
                selected_option: "string[optA/optB/optC/optD]/null",
                right_option: "string[optA/optB/optC/optD]",
                right_answer: "boolean[true/false]"
            },
            .
            .
            .
            {
                id: "number",
                question_number: "n",
                selected_option: "string[optA/optB/optC/optD]/null",
                right_option: "string[optA/optB/optC/optD]",
                right_answer: "boolean[true/false]"
            }
        ]
    }
}
```

---

## Installation Steps: 

#### Pending.

---

## Links
- [GitHub](https://github.com/ScriptEdge/student-evaluation-system.git)

