from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import validate_email,RegexValidator

class SignupForm(UserCreationForm):
    email=forms.CharField(max_length=100,validators=[validate_email])
    def clean_email(self):
        email=self.cleaned_data['email']
        if not email.lower().endswith('@gmail.com'):
            raise ValidationError("Only Gmail is Allowed")
        return email
    
    password1=forms.CharField(max_length=25,validators=[RegexValidator(
        regex='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$',
        message='Password must contain at least one numeric value,one lowercase and one uppercase letter',
        code='Invalid_Password'
    )])
    
    class Meta:
        model=User
        fields=['username','email','password1','password2']