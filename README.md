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
    
   1) backend - Node, Express, MongoDb
   2) frontend - React, Javascript

How to run:

1) Frontend- Go to frontend -> frontend -> npm start
2) Backend- Go to backend -> npm start
   
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
    
  Follow User
  
      Endpoint: /users/:id/follow
      
      Method: PUT
      
      Description: Allows a user to follow another user.
      
      Request Body:
      
      userId: ID of the user performing the follow action.
      
      Response:
      
      If successful, returns a message confirming the follow action.
      If the user is already following the target user, returns a 403 Forbidden error.
      If an error occurs, returns a 500 Internal Server Error.
      
  Unfollow User
  
      Endpoint: /users/:id/unfollow
      
      Method: PUT
      
      Description: Allows a user to unfollow another user.
      
      Request Body:
      
      userId: ID of the user performing the unfollow action.
      
      Response:
      If successful, returns a message confirming the unfollow action.
      If the user is not currently following the target user, returns a 403 Forbidden error.
      If an error occurs, returns a 500 Internal Server Error.

    
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
   
    Like/Dislike Post Route
   
          Endpoint: /posts/:id/like
   
          Method: PUT
   
          Description: Allows a user to like or dislike a post.
   
          Request Body:
   
          userId: ID of the user performing the like/dislike action.
   
          Response:
          If the post is liked, returns a message confirming the like action.
          If the post is disliked (user already liked it), returns a message confirming the dislike action.
          If an error occurs, returns a 500 Internal Server Error.
   
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
   
4) Auth API
       
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
   
  5) Post/Upload API
       
        Post Image with Description
  
          Description: Upload an image with accompanying description as a post.
       
          Method: POST
       
          Endpoint: /post/upload
       
          Request Body: Image file and post description.
       
          Response: Returns the created post with uploaded image.

Database Model

1) User
   
     Description
   
        The User model defines the structure and attributes of users registered within the system. It encompasses various details about users, including their authentication credentials, profile information, social connections, and personal preferences.

    Attributes
        username: Unique username of the user, required, and constrained to be between 6 to 30 characters in length.
   
        email: Email address of the user, constrained to a maximum length of 50 characters, and must be unique.
   
        password: Encrypted password for user authentication, required, and must be at least 6 characters in length.
   
        profilePicture: URL of the user's profile picture, defaults to an empty string.
   
        coverPicture: URL of the user's cover picture, defaults to an empty string.
   
        followers: Array containing IDs of users who follow the current user, defaults to an empty array.
   
        followings: Array containing IDs of users whom the current user follows, defaults to an empty array.
   
        isAdmin: Boolean flag indicating whether the user has administrative privileges, defaults to false.
   
        desc: Short description or bio of the user, constrained to a maximum length of 50 characters.
   
        city: City where the user resides, constrained to a maximum length of 50 characters.
   
        from: Origin or place of origin of the user, constrained to a maximum length of 50 characters.
   
        birth: Date of birth of the user, defaults to an empty string.
   
        Additional Information
   
        timestamps: Automatic inclusion of createdAt and updatedAt timestamps for user creation and updates respectively, facilitated by setting { timestamps: true } option in the schema.
   
2) Post
    
     Description
   
        The Post model defines the structure and attributes of posts created by users within the system. It captures various aspects of each post, including the content, associated user details, and social interactions such as likes.

    Attributes
   
        userId: Unique identifier of the user who created the post, required for association.
   
        userName: Username of the user who created the post.
   
        desc: Textual description or content of the post, constrained to a maximum length of 500 characters.
   
        img: URL of any image associated with the post.
   
        likes: Array containing IDs of users who have liked the post, defaults to an empty array.
   
        Additional Information
   
        timestamps: Automatic inclusion of createdAt and updatedAt timestamps for post creation and updates respectively, facilitated by setting { timestamps: true } option in the schema.


    

