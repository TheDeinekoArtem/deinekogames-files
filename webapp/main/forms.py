from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.forms import inlineformset_factory
from django.core.exceptions import ValidationError
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
    link_title = forms.CharField(max_length=200, required=False)
    link_content = forms.CharField(widget=forms.Textarea, required=False)
    text_title = forms.CharField(max_length=200, required=False)
    text_content = forms.CharField(widget=forms.Textarea, required=False)

    class Meta:
        model = Page
        fields = ['content_type', 'description', 'image']

    def clean(self):
        cleaned_data = super().clean()
        content_type = cleaned_data.get('content_type')

        if content_type == 'link':
            title = cleaned_data.get('link_title')
            content = cleaned_data.get('link_content')
        else:
            title = cleaned_data.get('text_title')
            content = cleaned_data.get('text_content')

        if not title or not content:
            raise ValidationError("Title and Content are required.")

        cleaned_data['title'] = title
        cleaned_data['content'] = content
        return cleaned_data

    def save(self, commit=True):
        instance = super().save(commit=False)
        # Добавляем дебаг информацию
        print("Saving instance:", instance.title, instance.content)
        if commit:
            instance.save()
            print("Instance saved successfully.")
        return instance

class ActionForm(forms.ModelForm):
    class Meta:
        model = Action
        widgets = {
            'action_type': forms.HiddenInput(),
            'link': forms.HiddenInput(),
            'comment': forms.HiddenInput(),
            # И так далее для всех полей, которые вы хотите скрыть
        }
        fields = ['action_type', 'link', 'comment']

ActionFormSet = inlineformset_factory(Page, Action, form=ActionForm, extra=1, can_delete=True)