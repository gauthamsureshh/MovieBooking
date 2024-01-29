from django.db import models

class NowShowing(models.Model):
    movie_title=models.CharField(max_length=150)
    genre=models.CharField(max_length=25)
    duration=models.DurationField(default='HH:MM:SS',editable=True)
    poster_url=models.URLField(max_length=200,help_text="Enter the URL Movie Poster")
    showTimes=models.JSONField(max_length=50)
    showbegins=models.DateField()
    showends=models.DateField()
    date_of_release=models.DateField()
    
    def __str__(self):
        return self.movie_title

