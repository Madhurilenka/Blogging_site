# Blogging_site


Objective:
Your task is to develop a simple backend API for a blogging platform. The API should allow users to perform CRUD (Create, Read, Update, Delete) operations on blog posts.

Requirements:

Use any programming language or framework of your choice for backend development.
Implement a RESTful API with the following endpoints:
GET /posts: Fetches a list of all blog posts.
GET /posts/{id}: Retrieves a specific blog post by its ID.
POST /posts: Creates a new blog post.
PUT /posts/{id}: Updates an existing blog post.
DELETE /posts/{id}: Deletes a blog post.
Each blog post should have the following properties:
ID (auto-generated)
Title
Content
Author
Creation Date
Last Update Date
Use a database of your choice to store the blog posts.
Include appropriate error handling and validation for the API endpoints.
Additional Notes:

You are not required to develop a front-end interface. You can test your API using tools like Postman or cURL.


//========================================explanation=================================================//

tecnology i use : express,nodemon,jsonwentoken,moment,mongoose,trim.
first resgister a user and next log in the user after that with the author id we have to made a blog with post and fetch all the data with get and fetch a perticular data with blogs uniqe id and with put we acn update the existing blog and with delete we can delete a perticular document with id all this handler written in ../route/rouet.js and for testing pepose i use postman and for storing the data i use mongoDb compass..