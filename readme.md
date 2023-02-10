### How to start? 
-> First create a repo in github 
-> Clone the repo in your machine 
    - this will warn you informing you are about to clone empty repository
-> get inside the project in your machine 
    - cd express-17 
-> For an existing repo how to setup express,
    - npm install 

-> Run the following commands in order:  (For a new project)
    - npm init 
        -> this will prompt you some questions, 
        -> Answers them, or just enter 
        -> this will generate a package.json file in your project
    - npm i express 
        -> This will install express js in your local machine 
        -> This command will create a folder called node_modules 
            where all the dependncies will be listed
        -> This will create package-lock.json file to lock current version of express
-> add a .gitignore file in the root directory 
    - add node_modules in the .gitignore file
Now, express is ready to use in our application 


### After setup, 
-> create a file called app.js in your root directory 
    add the following code block: 
    ```
        const express = require("express");
        const app = express();
        app.listen(3005, 'localhost', (err) => {
            if(err) {
                console.log("Error listening to port 3005")
            } else {
                console.log("Server is running on port 3005")
                console.log("Press CTRL+C to disconnect Server...")
            }
        })
    ```



### MVC in express 
=> Model-View-Controller 
=> Inventory System 
    ===> Model -> Data concern 
        Product -> Attributes, proptery 
        -> Directly related with DB 
        ===> ORM/ODM 
            --> Object Relational Mapping/Modelling
            --> Object Document Mapping/Modelling 
    ===> View 
        --> Representation / Presentaion Concern 
        --> Frontend / Html , css 
    ===> Controller 
        --> Logical Concern / Business Model 

E.g. Auth and Authentication using MVC 
users table => 
    => User Model 

--> form Open 
    -> Username and password enter 
    -> Form Submit 
--> BE call 
    #### Routing 
    -> url => with data and method 
        -> http://localhost:3005/login, post, {username: "", password: ""}
---> Login Action gets triggerd in BE 
    -> Login Check 
        - Validation, 
        - Login Checking 
    -> Controller 

### Postman 


### CRUD Operation 
    - Create    => Post request
    - Update    => Put/Patch request 
    - Read      => Get request 
    - Delete    => Delete Request 

## API Format
    {
        result: <any>,
        status: <boolean>,
        msg: <string>,
        meta: <null | object>
    }

## Middlewares in Express




## Inventory Management System 
    - Authorization 
    - User 
    - Brand 
    - Category
    - Product 
    - Stock 
    - Order 


## HTTP Response codes
    100-199 ===> Information response

    200-299 ===> Success Response 
    
    300-399 ===> Redirectional Response

    400-499 ===> Client Error Reponse 

    500-599 ===> Server Error response


    200 => Success Ok
    201 => Created

    400 => Bad request 
    401 => Unauthorized
    403 => Access Denied/ Forbidden 
    404 => Not found 
    405 => Method not allowed
    408 => Request Timed Out
    422 => Unprocessable entity


### MVC Pattern 


    Routes =====> Middleware =====> Controller 
                    ===> Validation/Process/Business logice run
                        ===> error 
                        ===> Response

#### Controller 
    - that class/function which perform some logical operation