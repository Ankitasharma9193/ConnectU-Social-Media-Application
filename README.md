Social Networking site application - ConnectU

This is a Full Stack web application built using React for the frontend and Express, MongoDb for the backend.

Getting Started:

Prerequisites

  Node.js and npm installed on your machine.
  
Installation:

  Clone the repository:

    git clone https://github.com/your-username/ConnectU-Social-Media-Application.git

  Navigate to the project directory:

    There will be 2 folders
    
   1) client - backend - Node, Express, MongoDb
   2) frontend - React, Javascript

How to run:

1) Frontend- Go to frontend -> frontend -> npm start
2) Backend- Go to client -> npm start
   
Application runs at - (http://localhost:3000)

1) Register - http://localhost:3000/register
2) Login - http://localhost:3000/login
3) Home Page - http://localhost:3000
4) Profile Page - http://localhost:3000/profile/username

Backend API

1) Users API
   
  Get User:

    Description: Retrieve user details based on user ID.

    Method: GET

    Endpoint: /users/{user_id}

    Response: Returns user information.

  Update User:

    Description: Update user information.

    Method: PUT

    Endpoint: /users/{user_id}

    Request Body: New user information.

    Response: Returns updated user details.

  Delete User:

    Description: Delete a user account.

    Method: DELETE

    Endpoint: /users/{user_id}

    Response: Returns success message upon deletion.

  Get All Users

    Description: Retrieve all users registered in the system.

    Method: GET

    Endpoint: /users

    Response: Returns a list of all users.

  Get Friends of User

    Description: Retrieve the list of friends for a specific user.

    Method: GET

    Endpoint: /users/{user_id}/friends

    Response: Returns a list of friends for the specified user.
    
2) Posts API
   
      Create Post
   
          Description: Create a new post.
         
          Method: POST
         
          Endpoint: /posts
         
          Request Body: Post content (image, description).
         
          Response: Returns the created post.
   
      Get Post
   
          Description: Retrieve a specific post.
         
          Method: GET
         
          Endpoint: /posts/{post_id}
         
          Response: Returns post details.
   
      Update Post
   
          Description: Update an existing post.
         
          Method: PUT
         
          Endpoint: /posts/{post_id}
         
          Request Body: Updated post content.
         
          Response: Returns updated post details.
   
      Delete Post
       
          Description: Delete a post.
         
          Method: DELETE
         
          Endpoint: /posts/{post_id}
         
          Response: Returns success message upon deletion.
   
      Get Timeline
   
          Description: Retrieve posts for the user's timeline.
         
          Method: GET
         
          Endpoint: /posts/timeline
         
          Response: Returns posts relevant to the user's timeline.
   
       Get Profile Posts
   
          Description: Retrieve posts related to a specific user's profile.
         
          Method: GET
         
          Endpoint: /posts/profile/{user_id}
         
          Response: Returns posts associated with the specified user's profile.
   
3) Auth API
       
        User Login
   
          Description: Authenticate user login credentials.
       
          Method: POST
       
          Endpoint: /auth/login
       
          Request Body: User credentials (username, password).
       
          Response: Returns authentication token upon successful login.
   
        User Registration
   
          Description: Register a new user.
       
          Method: POST
       
          Endpoint: /auth/register
       
          Request Body: New user details (username, email, password).
       
          Response: Returns success message upon successful registration.
   
  4) Post/Upload API
       
        Post Image with Description
  
          Description: Upload an image with accompanying description as a post.
       
          Method: POST
       
          Endpoint: /post/upload
       
          Request Body: Image file and post description.
       
          Response: Returns the created post with uploaded image.

Database Model

1) User
   
    Description: The User model represents individuals registered in the system. Each user has a unique identifier, along with associated information such as username, email,   password (encrypted), and any other relevant profile details.Attributes:
   
    id: Unique identifier for each user.
   
    username: User's unique username.
   
    email: User's email address.
   
    password: Encrypted password for user authentication.
   
    Additional attributes: Any other profile information like name, bio, profile picture, etc.
   
2) Post
    
    Description: The Post model represents individual posts created by users within the system. Each post contains content such as text, images, or multimedia along with metadata like creation timestamp, author (user who created the post), and any additional details.Attributes:
   
    id: Unique identifier for each post.
   
    desc: Textual content of the post.
   
    image_url: URL of any associated image with the post.
   
    created_at: Timestamp indicating when the post was created.
   
    user_id: Foreign key referencing the user who created the post.
   
    Additional attributes: Any other relevant metadata associated with the post like likes, comments, etc.



    

