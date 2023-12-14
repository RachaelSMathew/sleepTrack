### Project inspired by this [Medium Article](https://medium.com/@fizaashraf37/develop-a-crud-application-using-django-and-react-part-1-2e8927a1e0c8)

## Background
I wanted to gain experience with creating a full-stack, so I made a website that could:

- track the sleep periods users had and visually display the hours using a line chart
- track their dreams and visually display the types of dreams they've had using a pie chart

### Basically, I wanted to create a database that I could perform [CRUD](https://www.google.com/search?q=crud+operations&oq=crud+oper&gs_lcrp=EgZjaHJvbWUqDQgAEAAYgwEYsQMYgAQyDQgAEAAYgwEYsQMYgAQyDAgBEAAYFBiHAhiABDIGCAIQRRg5MgcIAxAAGIAEMgcIBBAAGIAEMgcIBRAAGIAEMgcIBhAAGIAEMgcIBxAAGIAEMgcICBAAGIAEMgcICRAAGIAE0gEIMTI1N2oxajeoAgCwAgA&sourceid=chrome&ie=UTF-8) operations to and have those results be displayed and updated in a front-end User Interface. 

I chose to use Django because I had not worked with Backend tools before, and I already have experience with Python. Because this is a simple web app I'm creating, I thought it would be a good fit.

In comparison, Node.js(though more popular) is for more complex client-side web apps and uses JavaScript. 

## Running the Application

## Django The Back-end
### Microservices
Django has multiple microservices/apps (i.e., smaller features of a larger web application)

Example code: 

Creating a microservice called students: `python manage.py startapp students`

### Migrations folder
Django models: an instruction manuel that tells Django how to make a database(i.e., the type of coloumns a DB should have and the coloumn types)

Calling the migrations command will convert Django models into a DB

Migrations folder inside app: will contain the code for migrating Django models into Database

Generate migrations script for your app: `python manage.py makemigrations students` 

Run migration(actually creating the DB): `python manage.py migrate`

### views.py
Integration logic for handling the HTTP requests e.g. GET, POST, PUT, DELETE etc.

### settings.py 
Add apps to INSTALLED_APPS: 'corsheaders','rest_framework', migration has created the models from Django default apps and our student app which are included in INSTALLED_APPS inside settings.py.

### create an admin
`python manage.py createsuperuser`

### run server
`python manage.py runserver`

### admin.py

Models will be registered in this file so that these can be managed from Django admin panel. 
```
from .models import Student

models_list = [Student]
admin.site.register(models_list)
```

#### You can add, delete, update student objects from admin panel
![Django Admin panel](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*j6tuHWpfG1k357tcdmzf-g.png) 

### Serializers

Validates data being inputed into Django databases, makes sure correct all the fields and field types are present. 

Serializer.save will convert the data into model object and save this object into database table.

Converts complex data such as querysets and model instances into native Python datatypes that can then be easily rendered into JSON, XML or other content types. 

#### Deserialization
Parsed data converted back into complex types, after first validating Serializer provides a function to validate the data provided by user. 

Code: `serializer = StudentSerializer(instance=student_to_update, data=request.data, partial=True)`
`partial=True` to allow the user to pass some or all fields into DB. When user isn't updating all fields.

### urls.py
To call the view(POST, GET etc), we need to map it to a URL 

```
from .views import StudentView 
urlpatterns = [
 path('students/', StudentView.as_view())
 path('students/int:pk/', StudentView.as_view())
]
```

**Add to backend/urls.py:**

To make it accessible to Django we will need to include students/urls.py into root URLconf(i.e., the other urls.py that's not in the microservice folder) in `urlpatterns`

`path('', include('students.urls'))`

### Axios: Connecting back to front end using services.js file 
Example of code: 

```
import axios from 'axios';
export function getStudents() { // do the same for delete(i.e., DELETE), update(i.e., PUT), create(i.e., POST)
 return axios.get('http://127.0.0.1:8000/students/') .then(response => response.data)
}
```
#### [Things I want to add to the project](https://trello.com/b/Ic3mpKMk/sleeptrack-app)

