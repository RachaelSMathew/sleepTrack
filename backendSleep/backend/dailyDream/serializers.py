from rest_framework import serializers
from .models import DailyDream


class DreamSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyDream
        fields = ('dreamId',
                  'username',
                  'dreamDate',
                  'dreamType',
                  'dreamThing')
