<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/binay7587/learning-mern-stack">
    <img src="docs/Mern Stack.png" alt="Logo" height="80">
  </a>

<h3 align="center">Learning Mern Stack</h3>

  <p align="center">
    Get started with MERN Stack
    <br />
    <a href="https://github.com/binay7587/learning-mern-stack"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/binay7587/learning-mern-stack">View Demo</a>
    ·
    <a href="https://github.com/binay7587/learning-mern-stack/issues">Report Bug</a>
    ·
    <a href="https://github.com/binay7587/learning-mern-stack/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
Table of Contents

- [Introduction](#introduction)
- [How to start?](#how-to-start)
  - [After setup,](#after-setup)
- [MVC in express](#mvc-in-express)
  - [CRUD Operation](#crud-operation)
- [Postman](#postman)
- [API Format](#api-format)
- [Middlewares in Express](#middlewares-in-express)
- [Inventory Management System](#inventory-management-system)
- [HTTP Response codes](#http-response-codes)
- [Authorization](#authorization)
- [SMTP Protocol](#smtp-protocol)
- [Nodemailer](#nodemailer)
- [JWT](#jwt)
- [MONGODB](#mongodb)
  - [Three ways of using MongoDB](#three-ways-of-using-mongodb)
  - [CRUD Operations](#crud-operations)
  - [Filter Operators](#filter-operators)
  - [Update Operators](#update-operators)
  - [Aggregation Operators](#aggregation-operators)
  - [MongoDb Projection](#mongodb-projection)


<!-- INTRODUCTION -->
## Introduction
The MERN stack is a popular technology stack used for developing full-stack web applications. It consists of four key technologies: MongoDB, Express.js, React.js, and Node.js.

This repository is intended for fellow learners and developers who are interested in learning the MERN stack or building full-stack web applications. Feel free to clone or fork this repository, use the code as a reference, or contribute to the project by making pull requests.
 

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## How to start?
To get started with Express, follow these steps:

1. First, create a new repository in GitHub.
2. Clone the repository to your local machine using the `git clone` command. Note that this will warn you that you are about to clone an empty repository.
3. Navigate to the project directory using `cd learning-mern-stack`.
4. If you're working with an existing repository, run `npm install` to set up Express.
5. If you're starting a new project, run the following commands in order:
    - `npm init`: This command will prompt you with some questions. Answer them, or just hit enter to accept the default options. This will generate a <b>package.json</b> file in your project.
    - `npm i express`: This command will install <b>Express.js</b> on your local machine. It will create a folder called <b>node_modules</b> where all the dependencies will be listed, and it will create a <b>package-lock.json</b> file to lock the current version of Express.
6. Finally, add a </b>.gitignore</b> file in the root directory and include <b>node_modules</b> in the file.

With these steps completed, Express is now ready to use in your application!

### After setup, 
Create a file called <b>app.js</b> in your root directory and add the following code block: 
```sh
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

## MVC in express
MVC (Model-View-Controller) is a widely used architectural pattern for building web applications, and it can be implemented in an Express.js application as well. Here are some key notes on MVC in Express:

 - <b>Model</b> represents the data or the business logic of the application. In an Express.js application, you can define a model using any of the available libraries or modules like Sequelize, Mongoose, or Knex.
 - <b>View</b> is responsible for rendering the model data to the user. In Express.js, you can use any template engine like Handlebars, Pug, or EJS to render the views. The views are usually written in HTML, and you can pass data from the model to the view for rendering.
 - <b>Controller</b> is responsible for handling the user requests and the application logic. In Express.js, you can define a controller using a route handler function. The controller interacts with the model to fetch or update the data and then passes the data to the view for rendering.

To implement MVC in an Express.js application, you can define a separate directory structure for each component (Model, View, and Controller). You can create a models directory for the models, a views directory for the views, and a controllers directory for the controllers. You can also define a routes directory to keep the routes separate from the controllers.

By following the MVC pattern in your Express.js application, you can keep your code organized, maintainable, and scalable.

### CRUD Operation 
    - Create    => Post request
    - Update    => Put/Patch request 
    - Read      => Get request 
    - Delete    => Delete Request 

## Postman 
Postman is a popular API development tool that allows developers to design, test, and document APIs. It provides an intuitive user interface that allows users to easily create HTTP requests and view the responses.

## API Format
    {
        result: <any>,
        status: <boolean>,
        msg: <string>,
        meta: <null | object>
    }

## Middlewares in Express
Middlewares are functions that are executed in between the request and response cycle of an express application. They can perform a variety of tasks such as logging, authentication, error handling, and modifying the request or response objects. There are several types of middlewares in an Express application:

 - <b>Application-level middleware:</b> This type of middleware is used to add functionality to the entire Express application, and is defined using the app.use() method. Examples include logging, error handling, and authentication middleware.
 - <b>Router-level middleware:</b> This type of middleware is used to add functionality to a specific route or group of routes, and is defined using the router.use() method. Examples include middleware that validates user input or authorizes access to certain routes.
 - <b>Error-handling middleware:</b> This type of middleware is used to handle errors that occur in the application, and is defined using a special method signature that includes four parameters (err, req, res, and next). Error-handling middleware is typically defined at the end of the middleware chain using the app.use() method.
 - <b>Built-in middleware:</b> Express comes with several built-in middleware functions that can be used out of the box, such as express.json() for parsing JSON request bodies, and express.static() for serving static files.
 - <b>Third-party middleware:</b> There are many third-party middleware packages available on npm that can be used to add additional functionality to an Express application, such as body-parser for parsing request bodies, and cors for enabling cross-origin resource sharing.

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Authorization
- <b>Public routes</b>
  <p>Web content</p>
- <b>Private routes</b>
  <p>Prevented by auth middleware using JWT token</p>
- <b>Auth middleware</b>
  <p>It uses JWT token to verify user</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## SMTP Protocol
SMTP (Simple Mail Transfer Protocol) is a protocol used to send emails from one server to another. It is a client-server protocol, where the client is the email client (e.g. Outlook, Thunderbird, or Gmail) and the server is the email server (e.g. Gmail, Yahoo, or Outlook.com). The SMTP protocol is used to send emails from the client to the server, and the server then delivers the email to the recipient.

    -> Host  => Hostname of the SMTP server 
    -> Port  => Port number of the SMTP server
    -> User  => Username of the SMTP server
    -> Pass  => Password of the SMTP server
    -> TLS   => Enable/Disable TLS encryption (true/false)

## Nodemailer
Nodemailer is a module for Node.js applications to allow easy as cake email sending. The project got started back in 2010 when there was no sane option to send email messages, today it is the solution most Node.js users turn to by default.
To install nodemailer, run the following command in your terminal:
```sh
    npm install nodemailer
```
Code snippet to send an email using nodemailer:
```sh
    const nodemailer = require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    let transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'username',
        pass: 'password'
      }
    });

    // send mail with defined transport object
    let info = await transport.sendMail({
      from: 'noreply@binayakarki.com.np', // sender address
      to: 'me@binayakarki.com.np, test@binayakarki.com.np', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
```

## JWT
JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

    -> Header 
    -> Payload 
    -> Signature

## MONGODB
MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License.

### Three ways of using MongoDB
    -> MongoDB Compass
    -> MongoDB Shell
    -> MongoDB Atlas
    
### CRUD Operations
    -> Create
      - db.users.insertOne({name: 'Binay', age: 23})   //inserts one document
      - db.users.insertMany([{name: 'Binay', age: 23}, {name: 'Biraj', age: 20}}])  //inserts multiple documents

    -> Read 
      - db.users.findOne({name: 'Binay'})   //returns the first document of the users collection
      - db.users.find({name: 'Binay Karki'})  //returns all the data of the users collection

    -> Update 
      - db.users.updateOne({name: 'Binaya Karki'}, {$set: {role: 'admin'}}) //updates the first document of the users collection
      - db.users.updateMany({name: 'Binaya Karki'}, {$set: {role: 'user'}})  //updates all the documents of the users collection - It has first parameter as filter and second parameter as update object and third parameter as options where we can use upsert: true to insert the document if it doesn't exist. Its false by default

    -> Delete
      - db.users.deleteOne({name: 'Binay'})  //deletes the first document of the users collection
      - db.users.deleteMany({name: 'Binay'}) //deletes all the documents of the users collection - Passing empty object deletes all the documents of the users collection

### Filter Operators
    -> Equal to => {name: 'Binay'}
    -> Greater than => {age: {$gt: 20}}
    -> Greater than or equal to => {age: {$gte: 20}}
    -> Less than => {age: {$lt: 20}}
    -> Less than or equal to => {age: {$lte: 20}}
    -> Not equal to => {age: {$ne: 20}}
    -> In => {age: {$in: [20, 21, 22]}}
    -> Not in => {age: {$nin: [20, 21, 22]}}
    -> And => {$and: [{age: {$gt: 20}}, {age: {$lt: 30}}]}
    -> Or => {$or: [{age: {$gt: 20}}, {age: {$lt: 30}}]}
    -> Nor => {$nor: [{age: {$gt: 20}}, {age: {$lt: 30}}]}
    -> Exists => {age: {$exists: true}}
    -> Not exists => {age: {$exists: false}}
    -> Regex => {name: {$regex: /^Binay/}}
    -> Not regex => {name: {$not: {$regex: /^Binay/}}}
    -> Text => {$text: {$search: 'Binay Karki'}}
    -> Not text => {$text: {$search: 'Binay Karki', $caseSensitive: true}}
    -> Where => {$where: 'this.age > 20'}

### Update Operators
    -> Set => {$set: {name: 'Binay Karki'}}
    -> Unset => {$unset: {name: ''}}
    -> Inc => {$inc: {age: 1}}
    -> Mul => {$mul: {age: 2}}
    -> Min => {$min: {age: 20}}
    -> Max => {$max: {age: 20}}
    -> Current Date => {$currentDate: {lastModified: true}}
    -> Rename => {$rename: {name: 'fullName'}}
    -> Array => {$push: {hobbies: 'Coding'}}

### Aggregation Operators
    -> $project => {name: 1, age: 1, _id: 0}
    -> $match => {$match: {age: {$gt: 20}}}
    -> $limit => {$limit: 2}
    -> $skip => {$skip: 2}
    -> $sort => {$sort: {age: -1}}
    -> $group => {$group: {_id: '$age', count: {$sum: 1}}}
    -> $unwind => {$unwind: '$hobbies'}
    -> $lookup => {$lookup: {from: 'users', localField: 'age', foreignField: 'age', as: 'users'}}

### MongoDb Projection
    -> Inclusion => {name: 1, age: 1, _id: 0}
    -> Exclusion => {name: 0, age: 0, _id: 0}


<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/binay7587/learning-mern-stack.svg?style=for-the-badge
[contributors-url]: https://github.com/binay7587/learning-mern-stack/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/binay7587/learning-mern-stack.svg?style=for-the-badge
[forks-url]: https://github.com/binay7587/learning-mern-stack/network/members
[stars-shield]: https://img.shields.io/github/stars/binay7587/learning-mern-stack.svg?style=for-the-badge
[stars-url]: https://github.com/binay7587/learning-mern-stack/stargazers
[issues-shield]: https://img.shields.io/github/issues/binay7587/learning-mern-stack.svg?style=for-the-badge
[issues-url]: https://github.com/binay7587/learning-mern-stack/issues
[license-shield]: https://img.shields.io/github/license/binay7587/learning-mern-stack.svg?style=for-the-badge
[license-url]: https://github.com/binay7587/learning-mern-stack/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/binay7587
[product-screenshot]: docs/screenshot.png
