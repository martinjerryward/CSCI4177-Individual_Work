===========================================================
CSCI 4177/5709 - Tutorial 6
Name: Martin Ward
Banner ID: B00910313
===========================================================

PROJECT LINKS
-------------
Deployment URL: https://tutorial-6-v9iz.onrender.com/
GitHub Repo: https://github.com/martinjerryward/CSCI4177-Individual_Work
FCS GitLab URL: https://git.cs.dal.ca/martinw/tutorial1

TECHNICAL OVERVIEW
------------------
- Framework: Flask / Python
- Deployment Platform: Render (Web Service)
- Database: MongoDB Atlas (Cloud-hosted)
- Security: Secure connection implemented via Environment Variables (MONGO_URI) 
  on Render to protect database credentials. 
- IP Whitelisting: Configured on MongoDB Atlas (0.0.0.0/0) to allow Render to access MongoDB.


ENDPOINTS
---------
- GET    /health           
- GET    /users            
- GET    /user/<user_id>   
- POST   /add              
- PUT    /update/<user_id> 
- DELETE /delete/<user_id> 

AI REFERENCES
-------------
- Google Gemini: Used for troubleshooting Render deployment errors, 
  debugging MongoDB SSL handshake failures.

  prompt "I'm unable to use curl commands and get data from my mongoDB via render what are some potential solutions and reasons this is happening?"

- github copilot (student account via dal) is integrated in my vscode and I use it for general formatting commenting and assistance.

NOTES
---------------
- The application is hosted on Render's Free Tier. 
- The previous lab PythonAnywhere was used but its limited to one app, while this one uses render though apparently when inactive the service spins down so it might be very slow when initially accessing it.
