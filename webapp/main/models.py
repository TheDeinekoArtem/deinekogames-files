from django.db import models
from django.contrib.auth.models import User

class Page(models.Model):
    CONTENT_CHOICES = [
        ('link', 'Ссылка'),
        ('text', 'Текст'),
    ]

    # Поля для выбора типа контента
    content_type = models.CharField(max_length=50, choices=CONTENT_CHOICES, default='link')
    link_title = models.CharField(max_length=255, blank=True, null=True)  # Заголовок для ссылки
    link_url = models.URLField(max_length=500, blank=True, null=True)  # URL для разблокировки
    text_title = models.CharField(max_length=255, blank=True, null=True)  # Заголовок для текста
    text_unlocking = models.TextField(blank=True, null=True)  # Текст для разблокировки
    image = models.ImageField(upload_to='images/', null=True, blank=True)  # Изображение
    description = models.TextField(blank=True)  # Описание страницы
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pages')  # Пользователь

    def __str__(self):
        # Возвращаем link_title, если он есть, иначе text_title, либо сообщение по умолчанию
        return self.link_title or self.text_title or "Без названия"

class Action(models.Model):
    ACTION_TYPES = [
        ('channel', 'Подписаться на канал'),
        ('video', 'Поставить лайк на видео'),
        ('comment', 'Оставить комментарий'),
        ('watch', 'Посмотреть видео'),
    ]

    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name='actions')
    action_type = models.CharField(max_length=20, choices=ACTION_TYPES)
    link = models.URLField(max_length=200)
    comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.action_type} - {self.link}"