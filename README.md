

# MERN Spotify Clone

A full-stack Spotify clone built with the MERN stack, featuring modern UI, real-time chat, music streaming, and a robust DevOps CI/CD pipeline for automated deployments.


## Technologies Used

### Backend

- **Node.js** & **Express.js**: RESTful API server
- **MongoDB**: Database (with Mongoose ODM)
- **Socket.io**: Real-time chat and notifications
- **Cloudinary**: Media storage and management

### Frontend

- **React** (TypeScript): SPA architecture
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern UI components
- **Axios**: HTTP client

### DevOps & CI/CD

- **Docker**: Containerization for backend and frontend
- **Jenkins**: CI/CD pipeline for automated build, test, and deployment
- **Kubernetes**: Orchestration (with deployment and service manifests)
- **ArgoCD**: GitOps continuous delivery to Kubernetes
- **Cloudinary**: Asset management

## Features

- User authentication (OAuth, JWT)
- Music streaming and playlists
- Real-time chat and friends activity
- Admin dashboard for managing albums, songs, and users
- Responsive, modern UI

## Project Structure

```text
mern-spotify-clone/
├── backend/        # Node.js/Express API, MongoDB models, controllers
├── frontend/       # React (TypeScript), Vite, Tailwind, UI components
├── docker-compose.yml
├── Dockerfile
├── Jenkinsfile     # Jenkins pipeline config
├── kubernetes/     # Kubernetes manifests (deployment, service)
```

## DevOps Pipeline Overview

### Jenkins

- Automated build and test for backend and frontend
- Docker image creation and push to registry
- Trigger deployment on code changes

### Kubernetes & ArgoCD

- Declarative deployment using manifests
- ArgoCD watches Git repo for changes
- Automatic rollout of new versions to cluster
- Rollback and health monitoring

### Example Pipeline Flow

1. **Code Commit**: Push to `main` branch
2. **Jenkins**: Build, test, Dockerize, push image
3. **ArgoCD**: Detects manifest update, deploys to Kubernetes
4. **Kubernetes**: Runs containers, exposes services

## Getting Started

### Prerequisites

- Node.js, npm
- Docker
- Jenkins
- Kubernetes cluster
- ArgoCD installed

### Local Development

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

### Docker Compose

```bash
docker-compose up --build
```

### CI/CD Pipeline

- Configure Jenkins with access to your repo and Docker registry
- Set up ArgoCD to watch your manifests in `kubernetes/`
- On commit, Jenkins builds and pushes images, ArgoCD deploys automatically

## License

MIT
