from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .forms import CustomUserCreationForm
from .forms import PageForm, ActionFormSet
from .models import Page, Action
from django.contrib import messages

# Create your views here.
def index(request):
    return render(request, 'main/index.html')

def about(request):
    return render(request, 'main/about.html')

@login_required
def home(request):
    return render(request, 'main/dashboard/home.html')

@login_required
def create(request):
    return render(request, 'main/dashboard/create.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')  # Изменено с email на username
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)  # Используйте username
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return render(request, 'registration/login.html', {'error': 'Invalid username or password'})
    else:
        return render(request, 'registration/login.html')

def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')  # CustomUserCreationForm предоставляет password1 и password2
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')  # или куда вы хотите перенаправить пользователя после регистрации
            else:
                # Пользователь создан, но по каким-то причинам аутентификация не удалась
                return redirect('login')  # перенаправляем на страницу входа
    else:
        form = CustomUserCreationForm()
    return render(request, 'registration/register.html', {'form': form})

@login_required
def create(request):
    if request.method == 'POST':
        print(request.POST)  # Debugging
        page_form = PageForm(request.POST, request.FILES)
        action_formset = ActionFormSet(request.POST, request.FILES, instance=Page())
        if page_form.is_valid() and action_formset.is_valid():
            page = page_form.save()
            action_formset.instance = page
            action_formset.save()
            messages.success(request, 'Страница успешно создана!')
            return redirect('home')
        else:
            print("ActionFormSet is valid: ", action_formset.is_valid())
            print("ActionFormSet non-form errors: ", action_formset.non_form_errors())
            for form in action_formset:
                print("ActionForm errors: ", form.errors)
    else:
        page_form = PageForm()
        action_formset = ActionFormSet(queryset=Action.objects.none())

    return render(request, 'main/dashboard/create.html', {
        'page_form': page_form,
        'action_formset': action_formset
    })
