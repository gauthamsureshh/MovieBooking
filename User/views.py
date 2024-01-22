from .forms import SignupForm
from rest_framework.response import Response
from rest_framework import status
from rest_framework.status import HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND,HTTP_200_OK
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated


@api_view(['POST'])
@permission_classes((AllowAny,))
def SignUp(request):
    form=SignupForm(data=request.data)
    if form.is_valid():
        user=form.save()
        return Response("Account Created Successfully",status=status.HTTP_201_CREATED)
    return Response(form.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])