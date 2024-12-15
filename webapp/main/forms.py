from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.forms import inlineformset_factory
from .models import Page, Action


class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = UserCreationForm.Meta.fields + ('email',)

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data["email"]
        if commit:
            user.save()
        return user

class PageForm(forms.ModelForm):
    class Meta:
        model = Page
        fields = ['content_type', 'link_title', 'link_url', 'text_title', 'text_unlocking', 'image', 'description']

    def clean(self):
        cleaned_data = super().clean()
        content_type = cleaned_data.get("content_type")

        if content_type == 'link':
            link_title = cleaned_data.get("link_title")
            link_url = cleaned_data.get("link_url")
            if not link_title or not link_url:
                self.add_error(None, "Для типа 'Ссылка' необходимо указать заголовок и URL.")
            cleaned_data['text_title'] = None
            cleaned_data['text_unlocking'] = None

        elif content_type == 'text':
            text_title = cleaned_data.get("text_title")
            text_unlocking = cleaned_data.get("text_unlocking")
            if not text_title or not text_unlocking:
                self.add_error(None, "Для типа 'Текст' необходимо указать заголовок и текст.")
            cleaned_data['link_title'] = None
            cleaned_data['link_url'] = None

        else:
            raise forms.ValidationError("Неверный тип контента.")

        return cleaned_data

class ActionForm(forms.ModelForm):
    class Meta:
        model = Action
        fields = ['id', 'action_type', 'link', 'comment']
        widgets = {
            'id': forms.HiddenInput(),  # Убеждаемся, что это поле скрыто
        }

    def clean_action_type(self):
        action_type = self.cleaned_data.get('action_type')
        if not action_type:
            raise forms.ValidationError("Тип действия обязателен.")
        return action_type

    def clean(self):
        cleaned_data = super().clean()
        link = cleaned_data.get('link')
        action_type = cleaned_data.get('action_type')

        if action_type and not link:
            raise forms.ValidationError("Для действия необходимо указать ссылку.")
        return cleaned_data


# InlineFormSet для управления действиями, связанными с определённой страницей
ActionFormSet = inlineformset_factory(
    Page,
    Action,
    form=ActionForm,
    extra=1,  # Количество пустых форм для ввода
    can_delete=True  # Позволяет удалять действия
)