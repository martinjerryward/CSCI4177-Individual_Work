# import libraries
from flask import Flask, request, jsonify
import uuid # user ID generation
from datetime import datetime

app = Flask(__name__)

# demo data
users = [
    {
        "id": "5abf6783",
        "email": "abc@abc.ca",
        "firstName": "ABC"
    },
    {
        "id": "5abf674563",
        "email": "xyz@xyz.ca",
        "firstName": "XYZ"
    }
]

##############################################
# API Endpoints
##############################################

# Get all users
@app.route('/users', methods=['GET'])
def get_users():
    try:
        return jsonify({
            "message": "Users retrieved",
            "success": True,
            "users": users
        }), 200
    except Exception as e:
        return jsonify({
            "message": f"Error retrieving users: {str(e)}",
            "success": False
        }), 500

# Add a new user
@app.route('/add', methods=['POST'])
def add_user():
    try:
        data = request.get_json()
        
        if not data or 'email' not in data or 'firstName' not in data:
            return jsonify({
                "message": "Missing required fields: email and firstName",
                "success": False
            }), 400
        
        new_user = {
            "id": str(uuid.uuid4())[:8],  
            "email": data['email'],
            "firstName": data['firstName']
        }
        
        users.append(new_user)
        
        return jsonify({
            "message": "User added",
            "success": True
        }), 201
    except Exception as e:
        return jsonify({
            "message": f"Error adding user: {str(e)}",
            "success": False
        }), 500

# Update an existing user
@app.route('/update/<user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        user = next((u for u in users if u['id'] == user_id), None)
        
        if not user:
            return jsonify({
                "message": f"User with ID {user_id} not found",
                "success": False
            }), 404
        
        data = request.get_json()
        
        if not data:
            return jsonify({
                "message": "Request body cannot be empty",
                "success": False
            }), 400
        
        if 'email' in data:
            user['email'] = data['email']
        if 'firstName' in data:
            user['firstName'] = data['firstName']
        
        return jsonify({
            "message": "User updated",
            "success": True
        }), 200
    except Exception as e:
        return jsonify({
            "message": f"Error updating user: {str(e)}",
            "success": False
        }), 500

# Get a user by ID
@app.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = next((u for u in users if u['id'] == user_id), None)
        
        if not user:
            return jsonify({
                "message": f"User with ID {user_id} not found",
                "success": False
            }), 404
        
        return jsonify({
            "success": True,
            "user": user
        }), 200
    except Exception as e:
        return jsonify({
            "message": f"Error retrieving user: {str(e)}",
            "success": False
        }), 500

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "message": "API is running",
        "success": True,
        "timestamp": datetime.now().isoformat()
    }), 200

##############################################
# Error Handlers
##############################################

# Handle 404 Not Found
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "message": "Endpoint not found",
        "success": False
    }), 404

# Handle 405 Method Not Allowed
@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({
        "message": "Method not allowed",
        "success": False
    }), 405

# Handle 500 Internal Server Error
@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "message": "Internal server error",
        "success": False
    }), 500

# Runner
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
