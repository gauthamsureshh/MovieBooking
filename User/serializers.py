from rest_framework import serializers
from .models import NowShowing,Ticket,show

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model=NowShowing
        fields='__all__'
        
class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model=Ticket
        fields='__all__'
        
    def to_representation(self, instance):
        # Override the representation to include movie details when displaying booked tickets
        representation = super().to_representation(instance)
        representation['movie'] = MovieSerializer(instance.movie).data
        return representation
    
class ShowSerializer(serializers.ModelSerializer):
    class Meta:
        model=show
        fields='__all__'
