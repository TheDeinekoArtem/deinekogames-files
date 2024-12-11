from django.db import models

# Create your models here.

from django.db import models

class Page(models.Model):
    PAGE_TYPES = (
        ('link', 'Ссылка'),
        ('text', 'Текст'),
    )
    title = models.CharField(max_length=200)
    content_type = models.CharField(max_length=10, choices=PAGE_TYPES)  # Увеличено до 10 символов
    content = models.TextField()
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='images/', blank=True)

    def __str__(self):
        return f"{self.title} ({self.content_type})"

class Action(models.Model):
    ACTION_TYPES = (
        ('subscribe', 'Подписаться на канал'),
        ('like', 'Поставить лайк'),
        ('comment', 'Написать комментарий'),
        ('watch', 'Посмотреть видео'),
    )
    page = models.ForeignKey(Page, related_name='actions', on_delete=models.CASCADE)
    action_type = models.CharField(max_length=10, choices=ACTION_TYPES)
    link = models.URLField()
    comment = models.TextField(blank=True)

    def __str__(self):
        return f"{self.action_type} on {self.page.title}"