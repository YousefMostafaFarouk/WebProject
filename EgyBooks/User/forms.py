from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    role = forms.ChoiceField(choices=[('user', 'User'), ('admin', 'Admin')], widget=forms.RadioSelect, label='Role')
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('username', 'email',)

    def save(self, commit=True):
        user = super().save(commit=False)

        role = self.cleaned_data['role']
        if role == 'admin':
            user.is_staff = True
            user.is_superuser = True
        else:
            user.is_staff = False
            user.is_superuser = False

        if commit:
            user.save()
        return user


class CustomUserUpdateForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ('username','password', 'email')

    def save(self, commit=True):
        user = super().save(commit=False)
        if commit:
            user.save()
        return user