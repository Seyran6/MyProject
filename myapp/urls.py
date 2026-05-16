from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("", views.index, name="index"),
    path("feedback/", views.feed, name="feedback"),
    path("books/<int:id>/", views.book, name="books"),
    path("serv/", views.serv, name="serv"),
    path("success/", views.success, name="success"),

    path("register/", views.register, name="register"),
    path("logout/", auth_views.LogoutView.as_view(next_page="index"), name="logout"),
    path("login/", auth_views.LoginView.as_view(template_name="login.html"), name="login"),

    path("books/<int:id>/get_reviews/", views.get_reviews, name="get_reviews"),
    path("books/<int:id>/add_review/", views.add_review, name="add_review"),
]