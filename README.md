
# MERN Spotify Clone

A full-stack music streaming platform inspired by Spotify, built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This app lets users stream music, create playlists, and interact in real time with other listeners through chat and activity sharing.

---

## Features

- **User Authentication:** Secure sign-up and login.
- **Music Playback:** Play, pause, skip, and browse tracks.
- **Playlist Management:** Create, edit, and delete playlists.
- **Real-Time Chat:** Message other online users and share your listening activity.
- **Responsive UI:** Works seamlessly on desktop and mobile.

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Zustand, React Router, Axios, React Toastify
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Clerk
- **File Storage:** Cloudinary

---

## Project Structure

```
mern-spotify-v1/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seeds/
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

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/xjohnfit/MERN-Spotify-Clone.git
   cd MERN-Spotify-Clone
   ```

2. **Configure environment variables:**
   - Create a `.env` file in the `backend` folder with:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```

3. **Install dependencies:**
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

4. **Run the app:**
   - Backend:
     ```bash
     npm run backend
     ```
   - Frontend:
     ```bash
     npm run dev
     ```
   - Visit `http://localhost:5173` in your browser.

---

## Usage

- **Home:** Browse and play music.
- **Library:** Manage playlists and saved songs.
- **Search:** Find songs, albums, and artists.
- **Admin Panel:** Manage content and users.
- **Chat:** Message online users in real time.

---

## Testing

- Use Postman or similar tools to test API endpoints.
- All routes are protected and return appropriate responses.

---

## License

MIT License.
