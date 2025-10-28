# Task Manager - Full Stack Application

A comprehensive task management application built with Django REST Framework, React/Next.js, PostgreSQL, Celery, and Redis.

## Features

### Backend
- ✅ User authentication with JWT
- ✅ Complete CRUD operations for tasks
- ✅ Advanced filtering (status, priority, tags, date range)
- ✅ Email reminders with Celery + Redis
- ✅ Swagger/OpenAPI documentation
- ✅ Comprehensive pytest test suite
- ✅ Row-level security with Django permissions

### Frontend
- ✅ Modern React/Next.js interface
- ✅ Secure JWT authentication
- ✅ Real-time task management
- ✅ Advanced filtering and search
- ✅ Dark mode support
- ✅ Task analytics dashboard
- ✅ Responsive mobile design
- ✅ Toast notifications

## Tech Stack

### Backend
- Django 4.2+
- Django REST Framework
- PostgreSQL
- Celery + Redis
- JWT Authentication
- Pytest
- Swagger/OpenAPI

### Frontend
- Next.js 16
- React 19
- Tailwind CSS v4
- React Query (TanStack Query)
- Axios
- next-themes
- Sonner (Notifications)

## Quick Start

### Option 1: Docker Compose (Recommended)

\`\`\`bash
docker-compose up -d
\`\`\`

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/api/schema/swagger/

### Option 2: Manual Setup

#### Backend Setup

\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configure .env file
cp .env.example .env

# Setup database
python manage.py migrate
python manage.py createsuperuser

# Start services
python manage.py runserver
celery -A task_manager worker -l info
celery -A task_manager beat -l info
\`\`\`

#### Frontend Setup

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## Project Structure

\`\`\`
task-manager/
├── backend/
│   ├── task_manager/
│   ├── tasks/
│   ├── users/
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── package.json
├── docker-compose.yml
└── README.md
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/token/refresh/` - Refresh JWT token

### Tasks
- `GET /api/tasks/` - List tasks (with filtering)
- `POST /api/tasks/` - Create task
- `GET /api/tasks/{id}/` - Get task details
- `PATCH /api/tasks/{id}/` - Update task
- `DELETE /api/tasks/{id}/` - Delete task

### Query Parameters
- `completed` - Filter by completion status (true/false)
- `priority` - Filter by priority (low/medium/high)
- `tags` - Filter by tags
- `search` - Search in title and description
- `due_date_from` - Filter by start date
- `due_date_to` - Filter by end date

## Environment Variables

### Backend (.env)
\`\`\`
DEBUG=False
SECRET_KEY=your-secret-key
DB_NAME=task_manager
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
REDIS_URL=redis://localhost:6379/0
\`\`\`

### Frontend (.env.local)
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8000/api
\`\`\`

## Testing

### Backend Tests
\`\`\`bash
cd backend
pytest
pytest --cov=tasks
\`\`\`

### Frontend Tests
\`\`\`bash
cd frontend
npm test
\`\`\`

## Deployment

### Backend (Render/Railway)

1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables
4. Deploy

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set `NEXT_PUBLIC_API_URL` environment variable
4. Deploy

## Documentation

- [Backend Setup Guide](./BACKEND_SETUP.md)
- [Frontend README](./FRONTEND_README.md)
- [Docker Compose Setup](./DOCKER_COMPOSE.md)

## Features in Detail

### Task Management
- Create tasks with title, description, due date, priority, and tags
- Edit existing tasks
- Delete tasks
- Mark tasks as complete/incomplete
- Filter by multiple criteria

### Email Reminders
- Automatic email reminders for upcoming tasks
- Configurable reminder times
- Celery scheduled tasks

### Analytics
- Task completion statistics
- Priority distribution
- Tag-based analytics
- Completion rate tracking

### Security
- JWT-based authentication
- Secure password hashing
- CORS protection
- Rate limiting
- Input validation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

## Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Contact: support@taskmanager.com

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Team collaboration features
- [ ] Advanced reporting
- [ ] Integration with calendar apps
- [ ] AI-powered task suggestions
- [ ] Real-time notifications
- [ ] Task templates
- [ ] Recurring tasks

## Acknowledgments

- Django REST Framework team
- React and Next.js communities
- Tailwind CSS
- All contributors
