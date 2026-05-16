from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from .forms import RegisterForm
from django.contrib.auth import login
import json
from django.http import JsonResponse
from .models import Book, Review
from .vk_utils import vk_send

def index(request):
    books = Book.objects.all()
    return render(request, "index.html", {"books": books})

def feed(request):
    return render(request, "feedback.html")

def book(request, id):
    book = get_object_or_404(Book, id=id)
    return render(request, "book.html", {"book": book})

def serv(request):
    if request.method == 'POST':
        name = request.POST.get("firstName", "")
        lastname = request.POST.get("lastName", "")
        email = request.POST.get("email", "")
        phone = request.POST.get("phone", "")
        message = request.POST.get("message", "")

        message = f"Новая заявка:\n{name} {lastname}\nEmail:\n{email}\nPhone:\n{phone}\nMessage:\n{message}"
        #vk_send(message)
        return redirect("success")

    return JsonResponse({"status": "error"})

def success(request):
    return render(request, "success.html")

def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("index")
    else:
        form = RegisterForm()
    return render(request, "register.html", {"form": form})

def get_reviews(request, id):
    book = get_object_or_404(Book, id=id)
    reviews = book.reviews.select_related('user').all().order_by('-created_at')
    data = [
        {
            "username": r.user.username,
            "text": r.text,
            "date": r.created_at.strftime("%d.%m.%Y %H:%M")
        } for r in reviews
    ]
    return JsonResponse({"reviews": data})

def add_review(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        data = json.loads(request.body)
        book = get_object_or_404(Book, id=id)
        review = Review.objects.create(
            book=book,
            user=request.user,
            text=data.get('text')
        )
        return JsonResponse({
            "status": "ok",
            "username": request.user.username,
            "text": review.text,
            "date": review.created_at.strftime("%d.%m.%Y %H:%M")
        })
    return JsonResponse({"status": "error"}, status=400)