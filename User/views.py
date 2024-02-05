from .forms import SignupForm
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate,logout
from .models import NowShowing,Ticket,show
from .serializers import MovieSerializer,TicketSerializer,ShowSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.status import HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND,HTTP_200_OK,HTTP_401_UNAUTHORIZED
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.authtoken.models import Token
from datetime import datetime
from django.db.models import Q





#api to create new users
@api_view(['POST'])
@permission_classes((AllowAny,))
def SignUp(request):
    form=SignupForm(data=request.data)
    if form.is_valid():
        user=form.save()
        return Response("Account Created Successfully",status=status.HTTP_201_CREATED)
    return Response(form.errors,status=status.HTTP_400_BAD_REQUEST)

#api to create admin user
# @api_view(['POST'])
# @permission_classes((AllowAny,))
# def admin_signup(request):
#     serializer=AdminLoginSerializer(data=request.data,context={'request': request})
#     if serializer.is_valid():
#         user=serializer.validated_data['user']
#         return Response("Admin Added",status=status.HTTP_201_CREATED)
#     return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


#api to login users
@api_view(['POST'])
@permission_classes((AllowAny,))
def Log_In(request):
    username=request.data.get('username')
    password=request.data.get('password')
    if not username or not password:
        context={'error':'Provide Username and Password'}
        return Response(context,status=HTTP_400_BAD_REQUEST)
    user=authenticate(username=username,password=password)
    if not user:
        context={'error':'Invalid Username or Password'}
        return Response(context,status=HTTP_400_BAD_REQUEST)
    token,_ =Token.objects.get_or_create(user=user)
    context={'token':token.key,'id':user.id,'email':user.email}
    return Response(context,status=HTTP_200_OK)

# #api to login admin
# @api_view(['POST'])
# @permission_classes((AllowAny,))
# def admin_login(request):
#     serializer=AdminLoginSerializer(data=request.data,context={'request': request})
#     if serializer.is_valid():
#         user=serializer.validated_data['user']
#         context={'message':'Admin Successfully Logged'}
#         return Response(context,status=status.HTTP_200_OK)
#     else:
#         context = {'error': serializer.errors}
#         return Response(context, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes((AllowAny,))
def Log_Out(request):
    logout(request)
    return Response({'detail':'Logged Out'},status=status.HTTP_200_OK)


#api that returns the list of movies playing in the theater
@api_view(['GET'])
@permission_classes((AllowAny,))
def movieList(request):
    movie=NowShowing.objects.all()
    serializer=MovieSerializer(movie, many=True)
    return Response(serializer.data)

#api to list all poster
@api_view(['GET'])
@permission_classes((AllowAny,))
def upcoming(request):
    list=show.objects.all()
    serializer=ShowSerializer(list,many=True)
    return Response(serializer.data)

#api to add upcoming poster
@api_view(['POST'])
@permission_classes([AllowAny,])
def upcomingPosterAdd(request):
    if request.method=='POST':
        serializer=ShowSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response('Poster Added Successfully',status=status.HTTP_201_CREATED)
        return Response('URL size exceeds',status=status.HTTP_400_BAD_REQUEST)

#api to return the details of a selected movie
@api_view(['GET'])
@permission_classes((AllowAny,))
def get_movie_details(request,movieid):
    movie=NowShowing.objects.filter(id=movieid)
    serializer=MovieSerializer(movie, many=True)
    return Response(serializer.data)
    
#api to return searchterms
@api_view(['GET'])
@permission_classes((AllowAny,))
def search_movies(request, query):
    try:
        query_date = datetime.strptime(query, '%Y-%m-%d').date()
        movies = NowShowing.objects.filter(Q(showbegins__lte=query_date) & Q(showends__gte=query_date))
    except ValueError:
        movies=NowShowing.objects.filter(movie_title__icontains=query)
    serializer = MovieSerializer(movies, many=True)
    print(f"Serialized Data: {serializer.data}")
    return Response(serializer.data)
    
    
    
    
#api to add new movies
@api_view(['POST'])
@permission_classes([AllowAny,])
def movie_Add(request):
    if request.method=='POST':
        serializer=MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    

    
    
#api to create a ticket instance
@api_view(['POST'])
@permission_classes([AllowAny,])
def create_ticket(request):
    if request.method=='POST':
        serializer=TicketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
#api to edit existing movies
@api_view(['GET','PUT'])
@permission_classes([AllowAny,])
def movie_Edit(request,id):
    movie=get_object_or_404(NowShowing,id=id)
    if request.method=='GET':
        serializer=MovieSerializer(movie)
        return Response(serializer.data)
    elif request.method=='PUT':
        serializer=MovieSerializer(movie,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        
#api to delete movie
@api_view(['DELETE'])
@permission_classes([AllowAny,])
def movie_Delete(request,id):
    try:
        movie=NowShowing.objects.get(id=id)
        movie.delete()
        return Response(f"{movie} Deleted")
    except NowShowing.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    
    
#api to list the tickets in My Booking Page
@api_view(['GET'])
@permission_classes((AllowAny,))
def booking_List(request,id):
    list=Ticket.objects.filter(user_id=id)
    serializer=TicketSerializer(list, many=True)
    return Response(serializer.data)
    
#api to get a particular ticket
@api_view(['GET'])
@permission_classes((AllowAny,))
def booked_ticket(request,bookid):
    booked=Ticket.objects.filter(booking_id=bookid)
    serializer=TicketSerializer(booked, many=True)
    return Response(serializer.data)
    
#api of disable feature
@api_view(['PUT'])
@permission_classes((AllowAny,))
def disable_movie(request,id):
        movie=NowShowing.objects.get(id=id)
        movie.disabled= not movie.disabled
        movie.save()
        serializer=MovieSerializer(movie)
        return Response(serializer.data,status=status.HTTP_200_OK)
        
