# Generated by Django 4.2.5 on 2024-01-24 05:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0002_showtime_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='showtime_date',
            name='movie',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='User.movie'),
        ),
    ]
