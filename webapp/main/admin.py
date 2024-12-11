from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Page, Action

# Регистрация модели Page с декоратором
@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ('title', 'content_type', 'description')  # Список отображаемых полей
    search_fields = ('title', 'description')  # Поля, по которым можно осуществлять поиск

# Регистрация модели Action прямо в admin.site.register()
admin.site.register(Action, admin.ModelAdmin)