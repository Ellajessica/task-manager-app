# Task Manager - Backend Setup Guide

Complete setup guide for the Django REST Framework backend with PostgreSQL, Celery, and Redis.

## Prerequisites

- Python 3.10+
- PostgreSQL 12+
- Redis 6+
- pip and virtualenv

## Installation

### 1. Clone and Setup Virtual Environment

\`\`\`bash
git clone <repository-url>
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
\`\`\`

### 2. Install Dependencies

\`\`\`bash
pip install -r requirements.txt
\`\`\`

### 3. Environment Configuration

Create `.env` file:

\`\`\`env
# Django
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_ENGINE=django.db.backends.postgresql
DB_NAME=task_manager
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432

# JWT
JWT_SECRET_KEY=your-jwt-secret-key

# Email (for Celery tasks)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Redis
REDIS_URL=redis://localhost:6379/0

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000

# Celery
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0
\`\`\`

### 4. Database Setup

\`\`\`bash
# Create PostgreSQL database
createdb task_manager

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
\`\`\`

### 5. Start Services

#### Terminal 1: Django Development Server
\`\`\`bash
python manage.py runserver
\`\`\`

#### Terminal 2: Celery Worker
\`\`\`bash
celery -A task_manager worker -l info
\`\`\`

#### Terminal 3: Celery Beat (for scheduled tasks)
\`\`\`bash
celery -A task_manager beat -l info
\`\`\`

## Project Structure

\`\`\`
backend/
├── task_manager/
│   ├── settings.py
│   ├── urls.py
│   ├── celery.py
│   └── wsgi.py
├── tasks/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   ├── filters.py
│   └── tasks.py
├── users/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── manage.py
└── requirements.txt
\`\`\`

## API Documentation

### Swagger/OpenAPI

Access API documentation at:
- Swagger UI: `http://localhost:8000/api/schema/swagger/`
- ReDoc: `http://localhost:8000/api/schema/redoc/`

## Testing

Run tests with pytest:

\`\`\`bash
pytest
pytest --cov=tasks  # With coverage
pytest -v           # Verbose output
\`\`\`

## Deployment

### Using Render

1. Create Render account and connect GitHub
2. Create PostgreSQL database
3. Create Redis instance
4. Create Web Service:
   - Build command: `pip install -r requirements.txt && python manage.py migrate`
   - Start command: `gunicorn task_manager.wsgi:application`
5. Set environment variables
6. Deploy

### Using Railway

1. Connect GitHub repository
2. Add PostgreSQL plugin
3. Add Redis plugin
4. Set environment variables
5. Deploy

## Monitoring

### Celery Flower (Task Monitoring)

\`\`\`bash
pip install flower
celery -A task_manager flower
\`\`\`

Access at `http://localhost:5555`

## Troubleshooting

### Database Connection Issues
\`\`\`bash
# Test PostgreSQL connection
psql -U postgres -h localhost -d task_manager
\`\`\`

### Redis Connection Issues
\`\`\`bash
# Test Redis connection
redis-cli ping
\`\`\`

### Celery Issues
- Check Redis is running
- Check Celery worker logs
- Verify CELERY_BROKER_URL in settings

## Production Checklist

- [ ] Set DEBUG=False
- [ ] Generate new SECRET_KEY
- [ ] Configure allowed hosts
- [ ] Setup HTTPS
- [ ] Configure email backend
- [ ] Setup database backups
- [ ] Configure logging
- [ ] Setup monitoring
- [ ] Configure rate limiting
- [ ] Setup CORS properly

## Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Celery Documentation](https://docs.celeryproject.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
