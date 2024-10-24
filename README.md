# Express.js Project Setup (E-COMMERCE API's)

This project is an Express.js application. Below are instructions for setting up and running the app.


## Project Structure

- **controllers**: Contains the logic for handling requests and responses for different routes.
- **middlewares**: Middleware functions for tasks like authentication, logging, and error handling.
- **models**: Defines the data structure and interacts with the database.
- **routes**: Contains route definitions that map endpoints to controller functions.
- **utils**: Utility functions and helpers that can be reused across the app.
- **app.js**: The entry point of the application, setting up middleware, routes, and server configuration.


## Installation

To install the dependencies, run the following command:

```bash
npm install
```
# .ENV File Variables

This project requires a `.env` file for configuration. Below are the necessary environment variables:

- **`PORT`**: The port on which the server will run. (Default: `5000`)
- **`MONGO_URI`**: The connection string for your MongoDB database. (Example: `mongodb://username:password@host:port/database`)
- **`JWT_SECRET`**: A secret key used for signing JSON Web Tokens (JWT). (Example: `your_jwt_secret_value`)


## Available Scripts

### Start the Server
To run the server in production mode (without automatic restarts), use:

```bash
npm start
```

This runs the server using `node app.js`.

### Development Mode
To run the server in development mode (with automatic restarts on file changes), use:

```bash
npm run dev
```

This command uses `nodemon` to watch for changes and restart the server automatically.

## Scripts in `package.json`

- **`start`**: Runs the server using `node app.js`.
- **`dev`**: Runs the server using `nodemon` to automatically restart when files are changed.

## API endpoints document available in same repository
- **`file name`** : **`E-Commerce API Documentation.pdf`**