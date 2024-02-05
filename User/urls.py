from django.urls import path
from . import views

urlpatterns=[
    path('signup',views.SignUp,name="signup"),
    path('login',views.Log_In,name="login"),
    path('disablemovie/<int:id>',views.disable_movie,name='disablemovie'),
    path('movielist',views.movieList,name='movielist'),
    path('moviedetails/<int:movieid>/',views.get_movie_details,name='moviedetails'),
    path('search_movies/<str:query>/',views.search_movies, name='search-movies'),
    path('addmovie',views.movie_Add,name='addmovie'),
    path('editmovie/<int:id>',views.movie_Edit,name='editmovie'),
    path('deletemovie/<int:id>',views.movie_Delete,name="deletemovie"),
    path('logout',views.Log_Out,name='logout'),
    path('createticket',views.create_ticket,name="createticket"),
    path('userbooking/<int:id>',views.booking_List,name="userbooking"),
    path('bookedticket/<int:bookid>',views.booked_ticket,name="bookedticket"),
    path('upcoming',views.upcoming,name='upcoming'),
    path('addupcoming',views.upcomingPosterAdd,name='addupcoming')
]