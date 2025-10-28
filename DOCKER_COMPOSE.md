# Docker Compose Setup

Complete Docker setup for local development with all services.

## Prerequisites

- Docker
- Docker Compose

## Services

- PostgreSQL (Database)
- Redis (Cache & Message Broker)
- Django Backend
- Celery Worker
- Celery Beat
- React Frontend

## Quick Start

1. Create `docker-compose.yml`:

\`\`\`yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: task_manager
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: ./backend
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    environment:
      - DEBUG=True
      - DB_ENGINE=django.db.backends.postgresql
      - DB_NAME=task_manager
      - DB_USER=postgres
      - DB_PASSWORD=postgres
      - DB_HOST=postgres
      - DB_PORT=5432
      - REDIS_URL=redis://redis:6379/0
      - CELERY_BROKER_URL=redis://redis:6379/0
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy

  celery:
    build: ./backend
    command: celery -A task_manager worker -l info
    volumes:
      - ./backend:/app
    environment:
      - DEBUG=True
      - DB_ENGINE=django.db.backends.postgresql
      - DB_NAME=task_manager
      - DB_USER=postgres
      - DB_PASSWORD=postgres
      - DB_HOST=postgres
      - DB_PORT=5432
      - REDIS_URL=redis://redis:6379/0
      - CELERY_BROKER_URL=redis://redis:6379/0
    depends_on:
      - postgres
      - redis
      - backend

  celery-beat:
    build: ./backend
    command: celery -A task_manager beat -l info
    volumes:
      - ./backend:/app
    environment:
      - DEBUG=True
      - DB_ENGINE=django.db.backends.postgresql
      - DB_NAME=task_manager
      - DB_USER=postgres
      - DB_PASSWORD=postgres
      - DB_HOST=postgres
      - DB_PORT=5432
      - REDIS_URL=redis://redis:6379/0
      - CELERY_BROKER_URL=redis://redis:6379/0
    depends_on:
      - postgres
      - redis
      - backend

  frontend:
    build: ./frontend
    command: npm run dev
    volumes:
      - ./frontend:/app
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8000/api
    depends_on:
      - backend

volumes:
  postgres_data:
\`\`\`

2. Start all services:

\`\`\`bash
docker-compose up -d
\`\`\`

3. Run migrations:

\`\`\`bash
docker-compose exec backend python manage.py migrate
\`\`\`

4. Create superuser:

\`\`\`bash
docker-compose exec backend python manage.py createsuperuser
\`\`\`

5. Access services:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000
   - API Docs: http://localhost:8000/api/schema/swagger/

## Useful Commands

\`\`\`bash
# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Rebuild images
docker-compose build --no-cache

# Run management commands
docker-compose exec backend python manage.py shell

# Access database
docker-compose exec postgres psql -U postgres -d task_manager
