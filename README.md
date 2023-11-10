# Knightrowave

## 1. Prerequisites

Before running the application, ensure you have the following installed on your system:

- Node.js (https://nodejs.org/)
- npm (Node.js package manager, comes bundled with Node.js)

## 2. Getting Started

1. Clone or download the repository to your local machine.

```bash
git clone https://github.com/AllisonDT/COP4331.git
```

2. Navigate to the project directory in your terminal.

```bash
cd COP4331
```
## 3. Running Application
1. Install Dependencies:

   In your terminal, run the following command to install the necessary dependencies:

```bash
npm install
```

2. Install Frontend Dependencies:
```bash
cd client
npm install --legacy-peer-deps
cd ..
```

3. Start the Application:

   To start the React application, run the following command:

```bash
npm start
```

The application will start, and you should be redirected to http://localhost:3000/

You can ignore steps 4 and 5 of this readme unless you want to run the frontend or backend individually.

## 4. Running Just Frontend
1. Navigate to the login directory in your terminal.

```bash
cd client
```

2. Install Dependencies:

   In your terminal, run the following command to install the necessary dependencies:

```bash
npm install --legacy-peer-deps
```
3. Start the Application:

   To start the React application, run the following command:

```bash
npm start
```

The application will start, and you should be redirected to http://localhost:3000/


## 5. Running Just Backend
1. Open a SECOND terminal (be sure to leave your react app running on port 3000!)
2. Install Dependencies:

   In your terminal, run the following command to install the necessary dependencies:

```bash
npm install
```

3. Start the Application:

   To start the Express application, run the following command:

```bash
node index.js
```
The application will start, and you will see a message in the terminal indicating that the server is running.

To view in browser, go to http://localhost:3001/

## 5. Stopping the Application

To stop the application, simply press `Ctrl + C` in the terminal where the application is running. This will terminate the server.

## Scripts Explanation

1. **start**
   - This script is the main entry point for your application.
   - When you run `npm start`, it will concurrently run the server and client scripts.

2. **server**
   - This script starts your Express server.
   - It uses `node index.js` to start the server.

3. **client**
   - This script starts your React app.
   - It navigates to the `login` directory and runs `npm start` to start the React app.

4. **dev**
   - This is your development script.
   - When you run `npm run dev`, it will concurrently run the server-dev and client-dev scripts.

5. **server-dev**
   - This script uses `nodemon` to watch for changes in your server files and restarts the server when changes are detected.

6. **client-dev**
   - This script navigates to the `login` directory and starts the React app in development mode.

