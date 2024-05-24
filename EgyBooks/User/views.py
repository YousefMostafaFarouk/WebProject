from django.shortcuts import render
from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from .forms import CustomUserCreationForm, CustomUserUpdateForm
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required

# Create your views here.
def register(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        print(form)
        if form.is_valid():
            login(request, form.save())
            return redirect("/")
    else:
        form = CustomUserCreationForm()

    return render(request, 'user/register.html', {"form":form})

def login_user(request):
    if request.method == "POST":
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            login(request, form.get_user())     
            return redirect("/")
    else:
        form = AuthenticationForm()
    return render(request, 'user/login.html', {'form':form})

@login_required()
def logout_user(request):
    logout(request)
    return redirect("/")


@login_required()
def profile(request):
    return render(request, 'user/profile.html')

@login_required()
def edit_profile(request):
    print("yes")
    if request.method == "POST":
        form = CustomUserUpdateForm(data=request.POST, instance=request.user)
        if form.is_valid():
            print("here")
            form.save() 
            return redirect("/")
    else:
        form = CustomUserCreationForm(instance=request.user)
    return render(request, 'user/edit_profile.html', {'form':form})