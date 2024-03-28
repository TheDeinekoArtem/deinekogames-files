from django.urls import path, include
from . import views

from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from django.urls import path, reverse_lazy
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('', views.index),
    path('about', views.about),
    path('dashboard/home', views.home, name="home"),
    path('dashboard/create', views.create, name="create"),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('accounts/', include("django.contrib.auth.urls")),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)