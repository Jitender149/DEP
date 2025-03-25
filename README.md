# Academic Resource Portal

A full-stack web application for sharing academic resources, built with React and Flask.

## Features

- User Authentication (Login/Signup)
- Resource Upload and Sharing
- File Management with Cloudinary
- Voting System
- Comments System
- Search and Filter Resources
- Responsive Design
- Dark/Light Mode
- Protected Routes

## Tech Stack

### Frontend
- React.js
- Material-UI
- Axios
- React Router
- Context API

### Backend
- Flask
- SQLAlchemy
- JWT Authentication
- Cloudinary
- CORS

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn
- Cloudinary account
- SQLite (included with Python)

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd AcademicPlatform
```

2. Set up the backend:
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials
```

3. Set up the frontend:
```bash
cd my-app
npm install
```

4. Start the development servers:

Backend:
```bash
# From the root directory
flask run
```

Frontend:
```bash
# From the my-app directory
npm start
```

5. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
 
