CSCI 4177 Tutorial 4
==============================================

Name: Martin Ward
Banner ID: B00910313

PROJECT LINKS
-------------
Deployment URL: https://martinward.pythonanywhere.com/
FCS GitLab URL: https://git.cs.dal.ca/martinw/tutorial1

TECHNICAL OVERVIEW
------------------
- Framework: Flask / Python
- Deployment Platform: PythonAnywhere
- Functionality: This RESTful API manages a user list with full CRUD 
  capabilities (GET all, GET by ID, POST to add, and PUT to update).
- Data Persistence: As per tutorial requirements, data is stored in an 
  in-memory list. The list resets to default users upon application reload.
- Error Handling: Implemented custom JSON responses for 404 (Not Found), 
  405 (Method Not Allowed), and 500 (Internal Server Error).

CODE REFERENCES
---------------
- Flask Documentation: https://flask.palletsprojects.com/en/2.3.x/
- PythonAnywhere Manual Config: https://help.pythonanywhere.com/pages/Flask/
    - Had some trouble with netlify so decided to use PythonAnywhere as an alternative
- Python uuid Library: https://docs.python.org/3/library/uuid.html
    - (to generate ids)

AI REFERENCES
---------------
- GitHub Copilot: Used for code commenting and 
  formatting (VS Code extension).

ENDPOINTS
-------------
- GET  /users            
- GET  /user/<user_id>   
- POST /add              
- PUT  /update/<user_id> 
- GET  /health           