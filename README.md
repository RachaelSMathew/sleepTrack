##inspired by: https://medium.com/@fizaashraf37/develop-a-crud-application-using-django-and-react-part-1-2e8927a1e0c8
Django has multiple apps: You can consider an app a microservice if you are familiar with microservice architecture python manage.py startapp students

migrations folder inside app: will contain the code for migrating Django models into Database e.g. Create table migrations. views: [integration] logic for handling the HTTP requests e.g. GET, POST, PUT, DELETE etc.

A model is converted to database table when we apply migrations. generate migrations script for your app: python manage.py makemigrations students run migration: python manage.py migrate

in settings.py add apps to INSTALLED_APPS add this as well to installed_app: 'corsheaders','rest_framework', migration has created the models from Django default apps and our student app which are included in INSTALLED_APPS inside settings.py.

create an admin: python manage.py createsuperuser

run server: python manage.py runserver

admin.py: models will be registered in this file so that these can be managed from Django admin panel. code: from .models import Student

models_list = [Student] admin.site.register(models_list)

![https://miro.medium.com/v2/resize:fit:1400/format:webp/1*j6tuHWpfG1k357tcdmzf-g.png] You can add, delete, update student objects from admin panel

serializers: validates data first complex data such as querysets and model instances to be converted to native Python datatypes that can then be easily rendered into JSON, XML or other content types. Serializers also provide deserialization, allowing parsed data to be converted back into complex types, after first validating Serializer provides a function to validate the data provided by user. If the data does not contain any invalid field then we can save the object in the table. Serializer.save will convert the data into model object and save this object into database table.

serializer = StudentSerializer(instance=student_to_update, data=request.data, partial=True) partial=True to allow the user to pass some or all fields in payload. Since user might not be updating all fields.

urls.py: To call the view(POST, GET etc), we need to map it to a URL from .views import StudentView add to urls.py urlpatterns = [ path('students/', StudentView.as_view()) path('students/int:pk/', StudentView.as_view()) ]

things i want to add to project: https://trello.com/b/Ic3mpKMk/sleeptrack-app

add to backend/urls.py: To make it accessible to Django we will need to include students/urls.py into root URLconf. path('', include('students.urls')),

connecting with backend from front end using axios(services.js file) import axios from 'axios';

export function getStudents() { return axios.get('http://127.0.0.1:8000/students/') .then(response => response.data) } do the same for delet, post, get method
