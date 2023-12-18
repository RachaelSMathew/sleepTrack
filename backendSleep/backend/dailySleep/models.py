from django.db import models

# Create your models here.
class DailySleep(models.Model):
    sleepId = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    start = models.CharField(max_length=100)
    end = models.CharField(max_length=100)
