from django.urls import path
from . import views

urlpatterns=[
    path('signup',views.SignUp,name="signup"),
    path('login',views.Log_In,name="login"),
    path('movielist',views.movieList,name='movielist'),
    path('moviedetails/<int:movieid>/',views.get_movie_details,name='moviedetails'),
    path('addmovie',views.movie_Add,name='addmovie'),
    path('editmovie/<int:id>',views.movie_Edit,name='editmovie'),
    path('deletemovie/<int:id>',views.movie_Delete,name="deletemovie"),
    path('logout',views.Log_Out,name='logout'),
    path('adminlogin',views.admin_login,name='adminlogin')
]