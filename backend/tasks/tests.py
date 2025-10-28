import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Task
from django.utils import timezone
from datetime import timedelta

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def user(db):
    return User.objects.create_user(
        username='testuser',
        email='test@example.com',
        password='testpass123'
    )

@pytest.fixture
def authenticated_client(api_client, user):
    api_client.force_authenticate(user=user)
    return api_client

@pytest.mark.django_db
class TestUserRegistration:
    def test_user_registration(self, api_client):
        data = {
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'securepass123',
            'password_confirm': 'securepass123'
        }
        response = api_client.post('/api/users/register/', data)
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['username'] == 'newuser'

    def test_user_registration_password_mismatch(self, api_client):
        data = {
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'securepass123',
            'password_confirm': 'differentpass'
        }
        response = api_client.post('/api/users/register/', data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
class TestTaskAPI:
    def test_create_task(self, authenticated_client, user):
        data = {
            'title': 'Test Task',
            'description': 'Test Description',
            'priority': 'high',
            'tags': 'work,urgent'
        }
        response = authenticated_client.post('/api/tasks/', data)
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['title'] == 'Test Task'
        assert Task.objects.filter(user=user).count() == 1

    def test_list_tasks(self, authenticated_client, user):
        Task.objects.create(
            user=user,
            title='Task 1',
            priority='high'
        )
        Task.objects.create(
            user=user,
            title='Task 2',
            priority='low'
        )
        response = authenticated_client.get('/api/tasks/')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 2

    def test_filter_tasks_by_priority(self, authenticated_client, user):
        Task.objects.create(user=user, title='High Priority', priority='high')
        Task.objects.create(user=user, title='Low Priority', priority='low')
        
        response = authenticated_client.get('/api/tasks/?priority=high')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 1
        assert response.data['results'][0]['priority'] == 'high'

    def test_filter_tasks_by_tag(self, authenticated_client, user):
        Task.objects.create(user=user, title='Work Task', tags='work,urgent')
        Task.objects.create(user=user, title='Personal Task', tags='personal')
        
        response = authenticated_client.get('/api/tasks/by_tag/?tag=work')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

    def test_toggle_task_complete(self, authenticated_client, user):
        task = Task.objects.create(user=user, title='Test Task', completed=False)
        response = authenticated_client.post(f'/api/tasks/{task.id}/toggle_complete/')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['completed'] is True

    def test_task_statistics(self, authenticated_client, user):
        Task.objects.create(user=user, title='Task 1', completed=True)
        Task.objects.create(user=user, title='Task 2', completed=False, priority='high')
        
        response = authenticated_client.get('/api/tasks/statistics/')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['total'] == 2
        assert response.data['completed'] == 1
        assert response.data['pending'] == 1

    def test_unauthorized_access(self, api_client):
        response = api_client.get('/api/tasks/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
