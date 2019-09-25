# User-Authentication-API

User authentication API can be used to easily authenticate users for web and mobile applications.

## Table of content
* [Get Started](#get-started)
    * [Login](#login)
    * [SignUp](#signup)
    * [Get User Details](#get-user-details)
    * [Get User Details](#get-user-details)
    * [Update User](#update-user)
    * [Delete User](#delete-user)
* [References](#references)

## Get Started
User-Authentication-API can be used to login, signup user and get user specific information.

### Login 
* Method - Post 
* Request Payload - 
   ```
   {
     "email" : "chandler@gmail.com",
     "password" : "123456"
   }
   ```
* Response Payload- 
   ```{
       "status": 200,
       "id": "5d8b97164dfcab1a47b215ed",
       "token":"[TOKEN]",
       "name": "Chandler Bing",
       "email": "chandler@gmail.com"
   }
   ```

* Status codes -
   * 200 - success
   * 400 - Invalid email/password


### Signup 
* Method - Post
* Request payload - 
   ```
   {
     "firstName":"Chandler",
     "lastName" : "Bing",
     "gender" : "Male",
     "contactNo" : "7047059630",
     "age" : "25",
     "email" : "chandler@gmail.com",
     "password" : "123456"
   }
   ```
* Response Payload -
```
{
    "status": 200,
    "token": [TOKEN],
    "userId": "5d8b97164dfcab1a47b215ed",
    "name": "Chandler Bing",
    "email": "chandler@gmail.com",
    "contactNo": "7047059630"
}
```
* Status codes -
   * 200 - success
   * 400 - Bad request(Some input parameter is not provided)


### Get user details 

### Update user

### Delete user


## References
- [JWT](https://jwt.io) - Decode, Verify, and generate JWT
- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [Express](https://expressjs.com) - Node.js web application framework
- [@hapi/joi](https://www.npmjs.com/package/@hapi/joi) - Data validation
