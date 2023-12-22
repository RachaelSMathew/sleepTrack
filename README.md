### Project inspired by this [Medium Article](https://medium.com/@fizaashraf37/develop-a-crud-application-using-django-and-react-part-1-2e8927a1e0c8)

## Background
I wanted to gain experience with creating a full-stack, so I made a website that could:

- track the sleep periods of users and visually display the hours using a line chart
- track their dreams and visually display the types of dreams they've had using a pie chart

### Basically, I wanted to create a database that I could perform [CRUD](https://www.google.com/search?q=crud+operations&oq=crud+oper&gs_lcrp=EgZjaHJvbWUqDQgAEAAYgwEYsQMYgAQyDQgAEAAYgwEYsQMYgAQyDAgBEAAYFBiHAhiABDIGCAIQRRg5MgcIAxAAGIAEMgcIBBAAGIAEMgcIBRAAGIAEMgcIBhAAGIAEMgcIBxAAGIAEMgcICBAAGIAEMgcICRAAGIAE0gEIMTI1N2oxajeoAgCwAgA&sourceid=chrome&ie=UTF-8) operations to and have those results be displayed and updated in a front-end User Interface. 

I chose to use Django because I had not worked with Backend tools before and already have Python experience. Because this is a simple web app I'm creating, I thought it would be a good fit.

In comparison, Node.js(though more popular) is for more complex client-side web apps and uses JavaScript. 

### General Structure
![General Structure](https://miro.medium.com/v2/resize:fit:1318/format:webp/1*QFp_3sJYpHL-M-fwyYGmRw.png)

## Running the Application

### Virtual Environments: Where our project will be created
`venv`: used to create a separate, isolated instance of the Python runtime for a project, with its own complement of packages

Example: `python3 -m venv [name of Virtual Enviorment]` 

`deactivate`: leave virtual environment 

**[Langflow Developer](https://gyliu513.medium.com/langflow-developer-quick-start-0506456756a8)**
> In a nutshell, Python virtual environments help decouple and isolate Python installs and associated pip packages. This allows end-users to install and manage their own set of packages that are independent of those provided by the system or used by other projects.

**From [Towards Science](https://towardsdatascience.com/why-you-should-use-a-virtual-environment-for-every-python-project-c17dab3b0fd0):**

> I like to consider virtual environments as package bookshelves for each project. If I’m working on a cooking project, I do not need to have a book on surfing. Similarly, if I’m working on a machine learning project, there is no need for me to have a library for the front-end. Having only the packages I need on my “bookshelf” eliminates all chances for me to possibly experience gross global installation and package collision errors and allows me to focus on what really matters — my code.

### Create a Virtual Environment 
```
python3 -m venv [name of Virtual Enviorment]
cd [name of Virtual Enviroment]
source bin/activate //activates enviorment 
pip install django
pip install djangorestframework
pip install django-cors-headers
pip install --upgrade djangorestframework-simplejwt
```
### Running the Project
```
git clone https://github.com/RachaelSMathew/sleepTrack.git
cd backendSleep
cd backend
python manage.py makemigrations //if this asks you about having default values, choose option 1 and default value "null"
python manage.py migrate
python manage.py runserver
```
In another terminal go to sleepTrack folder 
```
cd fronendSleep
npm install
npm start
```
**Go to [loacalhost](http://localhost:3000/)**

## Django The Back-end
### Microservices
Django has multiple microservices/apps (i.e., smaller features of a larger web application)

Start by creating a microservice: `python manage.py startapp [microservice]`

I made two microservices, one for tracking sleep and one for dreams.

### Migrations folder
Django models: an instruction manuel that tells Django how to make a database(i.e., the type of coloumns a DB should have and the coloumn types)

Calling the migrations command will convert Django models into a DB

Migrations folder inside app: will contain the code for migrating Django models into Database

Generate migrations script for your app: `python manage.py makemigrations students` 

Run migration(actually creating the DB): `python manage.py migrate`

### views.py
Integration logic for handling the HTTP requests e.g. GET, POST, PUT, DELETE etc.

### settings.py 
When you make new app/microservice-add to settings.py 

Migration creates the models from Django INSTALLED_APPS inside settings.py 

- Add to INSTALLED_APPS: 'corsheaders','rest_framework'
- add `[microservice].apps.DailydreamConfig` to INSTALLED_APPS

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

**How to call from front end React**
```
import { getStudents } from '../services/studentServices';
...
useEffect(() => {
...
 getStudents()
   .then(data => {
     if(mounted) { //mounted is a true boolean after the page has just finished loading 
       setStudents(data);
     }
   })
...
}, [students])
```
## Creating Login/Registration System

### **Two Methods**: [Session Auth and Json Web Token](https://www.youtube.com/watch?v=Qx5hDC33xQU)

**Session Auth(Default with Django)**: If the front and back end of the site are hosted on one domain

**Token-based auth**: If the backend is Django and front end is react, then front end is probably on a different domain.
You can still use Session Auth if diff domains, but you need to use `X-CSRFToken` in the request header, esp for POST/DELETE where BackEnd data will change!

**What is CSRFToken? From [here](https://docs.djangoproject.com/en/1.11/ref/csrf/#module-django.middleware.csrf)**

>This type of attack occurs when a malicious website contains a link, a form button, or some JavaScript that is intended to perform some action on your website, using the credentials of a logged-in user who visits the malicious site in their browser. A related type of attack, ‘login CSRF’, where an attacking site tricks a user’s browser into logging into a site with someone else’s credentials, is also covered.

### **Session auth using [this tutorial](https://www.youtube.com/watch?v=diB38AvVkHw&t=502s)**
1. User sends login credentials 
2. Server validates and makes sessions
3. Sessions stored in the backend 
4. Session id stored in browser as cookie 
5. Cookie is used every time the user sends requests to the server

```
pip install Django-cors-headers
pip install djangorestframework 

Add to MIDDLEWARE: corsheaders.middleware.CorsMiddleware

CORS_ALLOWED_ORIGINS to true to allow interaction with React
CORS_ALLOWED_CREDENTIALS to true
```
### **So, I ended up following [this JWT Token tutorial](https://medium.com/@ronakchitlangya1997/jwt-authentication-with-react-js-and-django-c034aae1e60d)**

In terminal: `pip install --upgrade djangorestframework-simplejwt`

#### **Things to keep in mind:**

How localStorage is used and how to [add headers to axios calls](https://drive.google.com/file/d/1BqKO1gakcb5xCSHrw0OfswDM8gae0SEg/view?usp=sharing)

How curly brackets on post request are structured:
```
axios.post('http://localhost:8000/logout/',{
                 refresh_token:localStorage.getItem('refresh_token')
                 } ,{headers: {'Content-Type': 'application/json'}},  
                 {withCredentials: true});
```


| Errors I ran into  | Solutions |
| ------------- | ------------- |
| ``` app_users.AppUser.groups Reverse accessor ‘Group.user_set’ for ‘app_users.AppUser.group’ clashes with reverse accessor for ‘auth.User.groups’. HINT: Add of change a related_name argument to the definition for ‘app_users.AppUser.groups’ or ‘auth.User.groups’```  | [solution](https://stackoverflow.com/questions/49189402/auth-user-groups-fields-e304-reverse-accessor-for-user-groups-clashes-with)  |
| ```django.db.migrations.exceptions.InconsistentMigrationHistory:Migration admin.0001_initial is applied before its dependency app_users.0001_ initial on database 'default'```  | [solution](https://stackoverflow.com/questions/44651760/django-db-migrations-exceptions-inconsistentmigrationhistory)  |
| ```authentication.CustomUser: (auth.E003) 'CustomUser .username' must be unique because it is named as the 'USERNAME_FIELD'.``` | Add unique=True to the models.py in the username field. Once a value is in a field, the same value can not be entered in any other instance of that model in any manner |
| ```django.db.utils.OperationalError: no such table: authentication_customuser``` | [solution](https://stackoverflow.com/questions/25771755/django-operationalerror-no-such-table) | 
| `Foreign Key constraint failed` | Need to add a [foreign key](https://docs.djangoproject.com/en/5.0/topics/db/examples/many_to_one/). `Username` field exists in all three models, so there's conflict |
| `Foreign key [not iterable](https://stackoverflow.com/questions/60605587/django-error-argument-of-type-foreignkey-is-not-iterable)` | Instead of `Username` in all three models, I did `Username` in User model, `UserAddS`(i.e., username + 'sss') in Sleep model, `UsernameAddS` in Dream model |

#### [Things I want to add to the project](https://trello.com/b/Ic3mpKMk/sleeptrack-app)

