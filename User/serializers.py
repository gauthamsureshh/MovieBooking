from rest_framework import serializers
from .models import NowShowing

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model=NowShowing
        fields='__all__'
        
