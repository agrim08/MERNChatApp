# MERN Chat App

This repository contains a real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and additional technologies for styling and state management.😁🚀

## Features
- **Real-time Messaging**: Powered by Socket.IO for instant communication.🤝
- **Modern Styling**: Styled using Tailwind CSS and Daisy UI for a responsive and elegant design.🎨
- **State Management**: Zustand is used for efficient and lightweight global state management.🌐
- **API Communication**: Axios is used for seamless interaction with the backend API.⚙️

## Tech Stack
- **Frontend**: React, Tailwind CSS, Daisy UI
- **Backend**: Node.js, Express.js, MongoDB
- **Real-time Communication**: Socket.IO
- **State Management**: Zustand
- **HTTP Requests**: Axios

## Prerequisites
Ensure you have the following installed on your system:
- Node.js (v14 or higher)
- MongoDB (running locally or on a cloud service like MongoDB Atlas)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mern-chat-app.git
   cd mern-chat-app
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `server` directory with the following:
     ```env
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     SOCKET_PORT=<desired-socket-port>
     ```
   - Replace placeholders with actual values.


## Usage
1. Build the app:
   ```bash
   npm run build

2. start the app:
   ```bash
   npm run start

## Folder Structure
```
mern-chat-app/
├── frontend/                # Frontend code
├── backend/                # Backend code
├── README.md              # Project documentation
```

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.😊🙏
