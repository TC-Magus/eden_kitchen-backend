# **Express.js with MySQL: Authentication, CRUD, and Association Chapters**

This project is a comprehensive example of building a RESTful API using **Express.js** and **MySQL**. It includes features like **user authentication**, **CRUD operations for users**, and **association chapters** (e.g., Robotics Chapter, Gaming Chapter, etc.). This project is designed to help students learn Express.js, MySQL, and REST API development in a structured and modular way.

---

## **Features**
1. **User Authentication**:
   - Register a new user.
   - Login and generate a JWT token.
   - Protected routes using JWT authentication.

2. **User CRUD Operations**:
   - Create, read, update, and delete users.

3. **Association Chapters**:
   - Create, read, update, and delete chapters.
   - Add users to chapters.
   - Retrieve all users in a specific chapter.

4. **Modular Code Structure**:
   - Organized into separate files and folders for better maintainability.

---

## **Technologies Used**
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Environment Variables**: dotenv
- **Development Tool**: Nodemon

---

## **Project Structure**
```
express-mysql-app/
├── .env
├── package.json
├── server.js
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   └── chapterController.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── chapterRoutes.js
└── models/
    ├── userModel.js
    └── chapterModel.js
```

---

## **Setup Instructions**

### **1. Prerequisites**
- Install [Node.js](https://nodejs.org/) (v16 or higher).
- Install [MySQL](https://dev.mysql.com/downloads/installer/).
- Install a REST client like [Postman](https://www.postman.com/downloads/) or use `curl` for testing.

### **2. Clone the Repository**
```bash
git clone https://github.com/musasizi/express-mysql-app.git
cd express-mysql-app
```

### **3. Install Dependencies**
```bash
npm install
```

### **4. Set Up the Database**
1. Log in to MySQL:
   ```bash
   mysql -u root -p
   ```

2. Create the database and tables:
   ```sql
   CREATE DATABASE express_auth;
   USE express_auth;

   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL UNIQUE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE chapters (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL UNIQUE,
     description TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE user_chapters (
     user_id INT,
     chapter_id INT,
     PRIMARY KEY (user_id, chapter_id),
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
     FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
   );
   ```

### **5. Configure Environment Variables**
Create a `.env` file in the root directory and add the following:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_DATABASE=express_auth
JWT_SECRET=yourjwtsecretkey
PORT=3000
```

### **6. Run the Application**
```bash
npm start
```

The server will start on `http://localhost:3000`.

---

## **API Endpoints**

### **Authentication**
- **Register a User**: `POST /api/register`
  ```json
  {
    "username": "john_doe",
    "password": "password123",
    "email": "john@example.com"
  }
  ```

- **Login**: `POST /api/login`
  ```json
  {
    "username": "john_doe",
    "password": "password123"
  }
  ```

### **Users**
- **Get All Users**: `GET /api/users` (Protected)
- **Update a User**: `PUT /api/users/:id` (Protected)
- **Delete a User**: `DELETE /api/users/:id` (Protected)

### **Chapters**
- **Create a Chapter**: `POST /api/chapters` (Protected)
  ```json
  {
    "name": "Robotics Chapter",
    "description": "A chapter for robotics enthusiasts."
  }
  ```

- **Get All Chapters**: `GET /api/chapters`
- **Get Chapter by ID**: `GET /api/chapters/:id`
- **Update a Chapter**: `PUT /api/chapters/:id` (Protected)
- **Delete a Chapter**: `DELETE /api/chapters/:id` (Protected)
- **Add User to Chapter**: `POST /api/chapters/add-user` (Protected)
  ```json
  {
    "userId": 1,
    "chapterId": 1
  }
  ```

- **Get Users in a Chapter**: `GET /api/chapters/:id/users` (Protected)

---

## **Testing the API**
Use a tool like **Postman** or **cURL** to test the endpoints. Here are some examples:

### **Register a User**
```bash
curl -X POST http://localhost:3000/api/register \
-H "Content-Type: application/json" \
-d '{
  "username": "john_doe",
  "password": "password123",
  "email": "john@example.com"
}'
```

### **Login**
```bash
curl -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{
  "username": "john_doe",
  "password": "password123"
}'
```

### **Get All Users (Protected)**
```bash
curl -X GET http://localhost:3000/api/users \
-H "Authorization: Bearer <token>"
```

---

## **Learning Objectives**
1. **Express.js Basics**:
   - Routing, middleware, and request handling.
2. **MySQL Integration**:
   - Connecting to MySQL, executing queries, and managing relationships.
3. **Authentication**:
   - Implementing JWT-based authentication.
4. **Modular Code Structure**:
   - Organizing code into controllers, models, and routes.
5. **REST API Design**:
   - Designing and implementing RESTful endpoints.

---

## **Contributing**
Feel free to contribute to this project by opening issues or submitting pull requests. Your feedback and improvements are welcome!

---

## **License**
This project is open-source and available under the [MIT License](LICENSE).

---

## **Author**
[MUSASIZI KENNETH]
[github.com/musasizi]
[kennymusasizi@gmail.com]

---

Happy Coding! 🚀