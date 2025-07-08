**Podcast Streaming Platform**


This is a full-stack podcast streaming platform built using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to browse, stream, and manage podcasts, with robust user authentication and comprehensive CRUD operations for podcast content.



**Features:**


-Podcast Streaming:Seamless playback of audio podcasts.

-User Authentication: Secure user registration and login system.

-Podcast Management (CRUD):

~Create: Upload new podcast episodes with details.

~Read: View and listen to available podcasts.

~Update: Modify existing podcast information.

~Delete: Remove podcasts from the platform.

-Responsive Design: Optimized for various devices and screen sizes.

**Technologies Used-**



**Frontend:**


React: A JavaScript library for building user interfaces.

HTML5/CSS3: For structuring and styling the web application.

JavaScript (ES6+): Core programming language.

**Backend:**


Node.js: A JavaScript runtime for server-side development.

Express.js: A fast, unopinionated, minimalist web framework for Node.js.

Database:
MongoDB: A NoSQL document database for storing podcast data, user information, and more.

**Live Demo:**


You can explore the live demo of the application here:
https://chipper-baklava-432d9c.netlify.app

Getting Started
To get a local copy up and running, follow these simple steps:

**Prerequisites**


Node.js (LTS version recommended)

npm (comes with Node.js)

MongoDB (local installation or cloud service like MongoDB Atlas)

**Installation**


Clone the repository:

git clone https://github.com/Ishitapatidarr/PodCast-Streaming-Platform.git


**Backend Setup:**

      cd server
      npm install

**Frontend Setup:**

      cd ../client
      npm install

**Environment Variables**


Create a .env file in the server directory and add the following environment variables:

       PORT=5000
       MONGO_URI=your_mongodb_connection_string
       JWT_SECRET=your_jwt_secret_key

Replace your_mongodb_connection_string with your MongoDB connection URI (e.g., from MongoDB Atlas or your local MongoDB instance).

Replace your_jwt_secret_key with a strong, random string for JWT token signing.

Running the Application


**Start the Backend Server:**

        cd server
        npm start

The server will run on http://localhost:5000 (or the PORT you specified).

**Start the Frontend Development Server:**

        cd ../client
        npm start

The React app will open in your browser at http://localhost:3000.

You should now have the podcast streaming platform running locally!


![image](https://github.com/user-attachments/assets/cfec8e9f-0bf5-4178-b397-5338f893fa27)




![image](https://github.com/user-attachments/assets/625b7ee7-a951-4607-9647-a91837628cc2)


![image](https://github.com/user-attachments/assets/a107d1f8-4f96-42ed-ae31-81afa2e1c514)



