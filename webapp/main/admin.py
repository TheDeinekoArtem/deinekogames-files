from django.contrib import admin
from .models import Page, Action

@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ('id', 'content_type', 'user', 'link_title', 'link_url', 'text_title', 'text_unlocking', 'image', 'description')

    # Метод для отображения короткой версии контента
    def short_content(self, obj):
        return obj.content[:50] + "..." if obj.content else "(пусто)"
    short_content.short_description = 'Content'  # Название колонки в админке

@admin.register(Action)
class ActionAdmin(admin.ModelAdmin):
    list_display = ('action_type', 'page', 'link', 'comment')