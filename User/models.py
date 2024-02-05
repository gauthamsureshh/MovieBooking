from django.db import models
from django.contrib.auth.models import User
import random

class NowShowing(models.Model):

    movie_title=models.CharField(max_length=150)
    genre=models.CharField(max_length=25)
    duration=models.DurationField(default='HH:MM:SS',editable=True)
    poster_url=models.URLField(max_length=200,help_text="Enter the URL Movie Poster")
    showTimes=models.JSONField(max_length=50)
    showbegins=models.DateField()
    showends=models.DateField()
    date_of_release=models.DateField()
    disabled=models.BooleanField(default=False)
    
    def __str__(self):
        return self.movie_title


class show(models.Model):
    upcoming=models.URLField(max_length=300,null=True)

class Ticket(models.Model):
    def generate_booking_id():
        return str(random.randint(1000000, 9999999))
    
    date=models.CharField(max_length=20)
    time=models.CharField(max_length=25)
    booking_id=models.CharField(max_length=150,default=generate_booking_id,unique=True)
    seat_number=models.JSONField(max_length=50)
    amount=models.CharField(max_length=50)
    payment_id=models.CharField(max_length=200,null=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='ticket')
    movie= models.ForeignKey(NowShowing, null=True, blank=True, on_delete=models.SET_NULL,related_name='ticket')
    
    
        
    