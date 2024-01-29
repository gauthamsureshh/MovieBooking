from .forms import SignupForm
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate,logout
from .models import NowShowing
from .serializers import MovieSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.status import HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND,HTTP_200_OK,HTTP_401_UNAUTHORIZED
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.authtoken.models import Token


#api to create new users
@api_view(['POST'])
@permission_classes((AllowAny,))
def SignUp(request):
    form=SignupForm(data=request.data)
    if form.is_valid():
        user=form.save()
        return Response("Account Created Successfully",status=status.HTTP_201_CREATED)
    return Response(form.errors,status=status.HTTP_400_BAD_REQUEST)

#api to login users
@api_view(['POST'])
@permission_classes((AllowAny,))
def Log_In(request):
    username=request.data.get('username')
    password=request.data.get('password')
    if username is None or password is None:
        context={'error':'Provide Username and Password'}
        return Response(context,status=HTTP_400_BAD_REQUEST)
    user=authenticate(username=username,password=password)
    if not user:
        context={'error':'Invalid Username or Password'}
        return Response(context,status=HTTP_400_BAD_REQUEST)
    token,_ =Token.objects.get_or_create(user=user)
    context={'token':token.key}
    return Response(context,status=HTTP_200_OK)

#api to login admin
@api_view(['POST'])
@permission_classes((AllowAny,))
def admin_login(request):
    email=request.data.get('email')
    password=request.data.get('password')
    user=authenticate(email=email,password=password)
    print(user)
    if user is not None and user.is_staff:
        context={'message':'Admin Successfully Logged'}
        return Response(context,status=status.HTTP_200_OK)
    else:
        context={'error':'Invalid Email or Password'}
        return Response(context,status=status.HTTP_401_UNAUTHORIZED)

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


#api to return the details of a selected movie
@api_view(['GET'])
@permission_classes((AllowAny,))
def get_movie_details(request,movieid):
    movie=NowShowing.objects.filter(id=movieid)
    serializer=MovieSerializer(movie, many=True)
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
    
    
    
