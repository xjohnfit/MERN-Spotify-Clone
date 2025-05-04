# MERN Spotify Clone

A feature-rich, full-stack music streaming platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js), designed to deliver a dynamic user experience similar to Spotify. The application enables users to stream music, create and customize playlists, and manage their personal libraries. What sets this project apart is its real-time communication feature, allowing users logged in at the same time to chat, display the song being listened to at current time, fostering a social and interactive environment for music lovers.

---

## 🚀 Features

* **User Authentication**: Secure login and registration.
* **Music Playback**: Play, pause, and skip tracks.
* **Playlist Management**: Create, edit, and delete playlists.
* **Responsive Design**: Optimized for both desktop and mobile devices.

---

## 🛠️ Technologies Used

* **Frontend**: React.js, Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Authentication**: JWT (JSON Web Tokens)
* **File Storage**: Cloudinary
* **State Management**: Zustand
* **Routing**: React Router
* **Others**: Axios, React Toastify

---

## 📁 Folder Structure

```
MERN-Spotify-Clone/
├── backend/
│   ├── src/
|   |   |──controllers/
|   |   |──middlewares/
│   |   ├── models/
│   |   ├── routes/
|   |   ├── seeds/
│   ├── tmp/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── index.css
│   ├── public/
│   └── package.json
└── README.md
```

---

## 📥 Installation Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/xjohnfit/MERN-Spotify-Clone.git
   cd MERN-Spotify-Clone
   ```

2. **Set up environment variables**:

   * Create a `.env` file in the `backend` directory.
   * Add the following variables:

     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```

3. **Install dependencies**:

   * For the backend:

     ```bash
     cd backend
     npm install
     ```

   * For the frontend:

     ```bash
     cd frontend
     npm install
     ```

4. **Start the application**:

   * In the `backend` directory:

     ```bash
     npm run backend
     ```

   * In the `frontend` directory:

     ```bash
     npm run dev
     ```

   The application should now be running on `http://localhost:5173`.

---

## 🎬 Usage

* **Home Page**: Browse and play music.
* **Library**: Manage your playlists and saved songs.
* **Search**: Find songs, albums, or artists.
* **Admin Panel**: Manage content and user data.
* **Messages**: You can message any user that's online in real time.

---

## 🧪 Testing

* Use tools like Postman to test API endpoints.
* Ensure all routes are protected and return appropriate responses.

---

## 📄 License

This project is licensed under the MIT License.
