from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.response import Http404, JsonResponse
from .models import DailySleep
from .serializers import SleepSerializer
# Create your views here.

class SleepView(APIView):
    
    def post(self, request):
        data = request.data
        serializer = SleepSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Sleep Added Successfully", safe=False)
        return JsonResponse("Failed to Add Sleep", safe=False)
    
    def get_sleep(self, pk):
        try:
            sleep = DailySleep.objects.get(sleepId=pk)
            return sleep
        except DailySleep.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            data = self.get_sleep(pk)
            serializer = SleepSerializer(data)
        else:
            data = DailySleep.objects.all()
            serializer = SleepSerializer(data, many=True)
        return Response(serializer.data)
    

    ##UPDATE
    def put(self, request, pk=None):
        sleep_update = DailySleep.objects.get(sleepId=pk)
        serializer = SleepSerializer(instance=sleep_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Student updated Successfully", safe=False)
        return JsonResponse("Failed To Update Student")
    

    ##delete
    def delete(self, request, pk):
        sleep_to_delete = DailySleep.objects.get(sleepId=pk)
        sleep_to_delete.delete()
        return JsonResponse("Student Deleted Successfully", safe=False)