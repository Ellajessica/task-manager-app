from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'priority', 'completed', 'due_date', 'created_at')
    list_filter = ('completed', 'priority', 'created_at')
    search_fields = ('title', 'description', 'tags')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Task Info', {'fields': ('user', 'title', 'description')}),
        ('Details', {'fields': ('priority', 'tags', 'completed')}),
        ('Dates', {'fields': ('due_date', 'created_at', 'updated_at')}),
    )
