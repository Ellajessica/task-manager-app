from celery import shared_task
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from .models import Task

@shared_task
def send_task_reminders():
    """Send email reminders for tasks due in the next 24 hours"""
    tomorrow = timezone.now() + timedelta(days=1)
    today = timezone.now()
    
    upcoming_tasks = Task.objects.filter(
        due_date__range=[today, tomorrow],
        completed=False
    ).select_related('user')
    
    for task in upcoming_tasks:
        send_mail(
            subject=f'Task Reminder: {task.title}',
            message=f'Your task "{task.title}" is due soon.\n\nDue: {task.due_date}\n\nDescription: {task.description}',
            from_email='noreply@taskmanager.com',
            recipient_list=[task.user.email],
            fail_silently=True,
        )
    
    return f'Sent {upcoming_tasks.count()} reminders'

@shared_task
def cleanup_old_tasks():
    """Archive completed tasks older than 30 days"""
    thirty_days_ago = timezone.now() - timedelta(days=30)
    old_tasks = Task.objects.filter(
        completed=True,
        updated_at__lt=thirty_days_ago
    )
    count = old_tasks.count()
    old_tasks.delete()
    return f'Deleted {count} old tasks'
