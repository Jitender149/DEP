# from flask import Flask, request, jsonify, send_from_directory
# from flask_sqlalchemy import SQLAlchemy
# from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
# from flask_migrate import Migrate
# from werkzeug.utils import secure_filename
# from werkzeug.security import check_password_hash, generate_password_hash
# import os
# from dotenv import load_dotenv
# import cloudinary
# import cloudinary.uploader
# import cloudinary.api
# from datetime import datetime, timedelta
# from flask_cors import CORS
# from flasgger import Swagger, swag_from
# import re
# import logging
# import requests
# from bs4 import BeautifulSoup
# import re
# import json

# # Load environment variables from .env file
# load_dotenv()

# # Configure logging
# logging.basicConfig(level=logging.DEBUG)
# logger = logging.getLogger(__name__)

# # Initialize app
# app = Flask(__name__)
# CORS(app, resources={
#     r"/*": {
#         "origins": ["http://localhost:3000"],
#         "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
#         "allow_headers": ["Content-Type", "Authorization"],
#         "expose_headers": ["Content-Range", "X-Content-Range"]
#     }
# })

# # Configurations
# app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///database.db')
# app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET', 'your-secret-key')
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
# app.config['UPLOAD_FOLDER'] = 'uploads'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# # Ensure upload folder exists
# if not os.path.exists(app.config['UPLOAD_FOLDER']):
#     os.makedirs(app.config['UPLOAD_FOLDER'])

# db = SQLAlchemy(app)
# migrate = Migrate(app, db)
# jwt = JWTManager(app)

# # Cloudinary Configuration
# cloudinary.config(
#     cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
#     api_key=os.getenv('CLOUDINARY_API_KEY'),
#     api_secret=os.getenv('CLOUDINARY_API_SECRET')
# )

# # Models
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     password_hash = db.Column(db.String(120), nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=True)
#     bio = db.Column(db.Text, nullable=True)
#     profile_picture = db.Column(db.String(200), nullable=True)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     last_login = db.Column(db.DateTime, nullable=True)

#     def set_password(self, password):
#         self.password_hash = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password_hash, password)

# class Upload(db.Model):
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     author = db.Column(db.String(80), nullable=False)
#     course_code = db.Column(db.String(20), nullable=False)
#     description = db.Column(db.String(200), nullable=False)
#     tags = db.Column(db.String(200), nullable=False)  # Comma-separated tags
#     file_url = db.Column(db.String(500), nullable=True)  # File path or link
#     public_id = db.Column(db.String(200), nullable=True)  # Cloudinary public ID
#     upvotes = db.Column(db.Integer, default=0)
#     downvotes = db.Column(db.Integer, default=0)
#     year = db.Column(db.String(10), nullable=True)
#     semester = db.Column(db.String(20), nullable=True)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     file_type = db.Column(db.String(10), nullable=True)  # Store file extension
#     __table_args__ = (
#         db.Index('idx_course_code', 'course_code'),
#         db.Index('idx_created_at', 'created_at'),
#         db.Index('idx_author', 'author')
#     )

# class Comment(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     upload_id = db.Column(db.Integer, db.ForeignKey('upload.id'), nullable=False)
#     author = db.Column(db.String(80), nullable=False)
#     text = db.Column(db.String(500), nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)

# class Vote(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     upload_id = db.Column(db.Integer, db.ForeignKey('upload.id'), nullable=False)
#     user = db.Column(db.String(80), nullable=False)
#     vote_type = db.Column(db.String(10), nullable=False)  # 'upvote' or 'downvote'
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     __table_args__ = (
#         db.UniqueConstraint('upload_id', 'user', name='unique_user_vote'),
#     )

# # Model for placement data
# class Placement(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     company = db.Column(db.String(100), nullable=False)
#     type = db.Column(db.String(20), nullable=False)  # 'Internship' or 'Placement'
#     mode = db.Column(db.String(20), nullable=False)  # 'On Campus' or 'Off Campus'
#     year = db.Column(db.String(4), nullable=False)
#     role = db.Column(db.String(100), nullable=False)
#     referral = db.Column(db.String(3), nullable=False)  # 'Yes' or 'No'
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     created_by = db.Column(db.String(80), nullable=False)

# class PlacementPerson(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     placement_id = db.Column(db.Integer, db.ForeignKey('placement.id'), nullable=False)
#     name = db.Column(db.String(100), nullable=False)
#     resume_url = db.Column(db.String(500), nullable=True)
#     resume_public_id = db.Column(db.String(200), nullable=True)


# # Model for interview experiences
# class InterviewExperience(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     company = db.Column(db.String(100), nullable=False)
#     candidate_name = db.Column(db.String(100), nullable=False)
#     interviewer_name = db.Column(db.String(100), nullable=True)
#     year = db.Column(db.String(4), nullable=False)
#     type = db.Column(db.String(20), nullable=False)  # 'Internship' or 'Placement'
#     tips = db.Column(db.Text, nullable=True)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     created_by = db.Column(db.String(80), nullable=False)
#     tags = db.Column(db.String(200), nullable=True)  # Comma-separated tags

# class InterviewQuestion(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     interview_id = db.Column(db.Integer, db.ForeignKey('interview_experience.id'), nullable=False)
#     question = db.Column(db.Text, nullable=False)
#     answer = db.Column(db.Text, nullable=False)

# # Classroom type discussion backend
# class Classroom(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     description = db.Column(db.Text, nullable=True)
#     created_by = db.Column(db.String(80), nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)

# class ClassroomMembership(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.String(80), nullable=False)
#     classroom_id = db.Column(db.Integer, db.ForeignKey('classroom.id'), nullable=False)
#     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
#     __table_args__ = (
#         db.UniqueConstraint('user_id', 'classroom_id', name='unique_user_classroom'),
#     )

# class ClassroomMessage(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.String(80), nullable=False)
#     classroom_id = db.Column(db.Integer, db.ForeignKey('classroom.id'), nullable=False)
#     content = db.Column(db.Text, nullable=False)
#     timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# # Helper function for allowed file extensions
# ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'docx', 'txt'}
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# # Routes
# def validate_username(username):
#     if not username or len(username) < 3:
#         return False, "Username must be at least 3 characters long"
#     if not re.match(r'^[a-zA-Z0-9_]+$', username):
#         return False, "Username can only contain letters, numbers, and underscores"
#     return True, None

# def validate_password(password):
#     if not password or len(password) < 6:
#         return False, "Password must be at least 6 characters long"
#     if not re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)', password):
#         return False, "Password must contain at least one uppercase letter, one lowercase letter, and one number"
#     return True, None

# @app.route('/signup', methods=['POST'])
# def signup():
#     try:
#         logger.debug("Received signup request")
#         data = request.get_json()
        
#         if not data:
#             logger.warning("No data provided in signup request")
#             return jsonify({'message': 'No data provided'}), 400

#         username = data.get('username')
#         password = data.get('password')

#         logger.debug(f"Attempting to create user: {username}")

#         # Validate username
#         is_valid_username, username_error = validate_username(username)
#         if not is_valid_username:
#             logger.warning(f"Invalid username: {username_error}")
#             return jsonify({'message': username_error}), 400

#         # Validate password
#         is_valid_password, password_error = validate_password(password)
#         if not is_valid_password:
#             logger.warning(f"Invalid password: {password_error}")
#             return jsonify({'message': password_error}), 400

#         # Check if username already exists
#         if User.query.filter_by(username=username).first():
#             logger.warning(f"Username already exists: {username}")
#             return jsonify({'message': 'Username already exists'}), 409

#         # Create new user
#         new_user = User(username=username)
#         new_user.set_password(password)
        
#         try:
#             db.session.add(new_user)
#             db.session.commit()
#             logger.info(f"User created successfully: {username}")
#             return jsonify({'message': 'User created successfully'}), 201
#         except Exception as db_error:
#             db.session.rollback()
#             logger.error(f"Database error during signup: {str(db_error)}")
#             return jsonify({'message': 'Error creating user. Please try again.'}), 500

#     except Exception as e:
#         logger.error(f"Unexpected error during signup: {str(e)}")
#         return jsonify({'message': 'An unexpected error occurred'}), 500

# @app.route('/login', methods=['POST'])
# def login():
#     try:
#         data = request.get_json()
        
#         if not data:
#             return jsonify({'message': 'No data provided'}), 400

#         username = data.get('username')
#         password = data.get('password')

#         if not username or not password:
#             return jsonify({'message': 'Username and password are required'}), 400

#         user = User.query.filter_by(username=username).first()
        
#         if not user or not user.check_password(password):
#             return jsonify({'message': 'Invalid username or password'}), 401

#         # Update last login
#         user.last_login = db.func.now()
#         db.session.commit()

#         # Create access token
#         access_token = create_access_token(identity=username)
        
#         return jsonify({
#             'access_token': access_token,
#             'username': username
#         }), 200

#     except Exception as e:
#         return jsonify({'message': 'An unexpected error occurred'}), 500

# @app.route('/uploads', methods=['POST'])
# @jwt_required()
# @swag_from({
#     'parameters': [
#         {
#             'name': 'file',
#             'in': 'formData',
#             'type': 'file',
#             'required': True
#         }
#     ],
#     'responses': {
#         201: 'Upload successful',
#         400: 'Invalid input',
#         401: 'Unauthorized'
#     }
# })
# def upload_file():
#     try:
#         current_user = get_jwt_identity()
        
#         # Get form data
#         course_code = request.form.get('course_code')
#         description = request.form.get('description')
#         tags = request.form.get('tags')
#         year = request.form.get('year')
#         semester = request.form.get('semester')

#         # Validate required fields
#         if not course_code:
#             return jsonify({'message': 'Course code is required'}), 400
#         if not description:
#             return jsonify({'message': 'Description is required'}), 400
#         if not tags:
#             return jsonify({'message': 'At least one tag is required'}), 400

#         # Handle file upload
#         if 'file' in request.files:
#             file = request.files['file']
            
#             if file.filename == '':
#                 return jsonify({'message': 'No selected file'}), 400

#             if not allowed_file(file.filename):
#                 return jsonify({'message': f'File type not allowed. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'}), 400

#             try:
#                 # Upload to Cloudinary
#                 upload_result = cloudinary.uploader.upload(
#                     file.stream,
#                     folder="material_sharing",
#                     resource_type="auto"
#                 )
#                 print("Upload Result:", upload_result)
#                 file_url = upload_result.get('secure_url')
#                 public_id = upload_result.get('public_id')
#                 file_type = os.path.splitext(file.filename)[1][1:].lower()

#                 new_upload = Upload(
#                     author=current_user,
#                     course_code=course_code,
#                     description=description,
#                     tags=tags,
#                     file_url=file_url,
#                     public_id=public_id,
#                     year=year,
#                     semester=semester,
#                     file_type=file_type
#                 )

#             except Exception as cloudinary_error:
#                 print(f"Cloudinary error: {str(cloudinary_error)}")
#                 return jsonify({'message': 'Error uploading to cloud storage'}), 500

#         # Handle link upload
#         elif 'link' in request.form:
#             link = request.form.get('link')
#             if not link:
#                 return jsonify({'message': 'Link is required when no file is provided'}), 400

#             new_upload = Upload(
#                 author=current_user,
#                 course_code=course_code,
#                 description=description,
#                 tags=tags,
#                 file_url=link,
#                 year=year,
#                 semester=semester
#             )
#         else:
#             return jsonify({'message': 'Either a file or link must be provided'}), 400
#         # print("Received Files:", request.files)
#         # print("Received Form Data:", request.form)

#         # Save to database
#         try:
#             db.session.add(new_upload)
#             db.session.commit()
#             return jsonify({
#                 'message': 'Upload successful',
#                 'file_url': new_upload.file_url
#             }), 201
#         except Exception as db_error:
#             db.session.rollback()
#             print(f"Database error: {str(db_error)}")
#             return jsonify({'message': 'Error saving to database'}), 500

#     except Exception as e:
#         print(f"General error: {str(e)}")
#         return jsonify({'message': f'Error processing upload: {str(e)}'}), 500

# @app.route('/uploads/<int:upload_id>', methods=['DELETE'])
# @jwt_required()
# def delete_upload(upload_id):
#     try:
#         # Get the upload
#         upload = Upload.query.get(upload_id)
        
#         if not upload:
#             return jsonify({'message': 'Upload not found'}), 404
            
#         # If there's a file in Cloudinary, delete it
#         if upload.public_id:
#             try:
#                 cloudinary.uploader.destroy(upload.public_id)
#             except Exception as cloud_error:
#                 print(f"Error deleting from Cloudinary: {str(cloud_error)}")
#                 # Continue with database deletion even if Cloudinary deletion fails
        
#         # Delete associated comments first (due to foreign key constraint)
#         Comment.query.filter_by(upload_id=upload_id).delete()
        
#         # Delete any votes or ratings associated with this upload
#         # (assuming you have a Votes table)
#         # Vote.query.filter_by(upload_id=upload_id).delete()
        
#         # Delete the upload record
#         db.session.delete(upload)
#         db.session.commit()
        
#         return jsonify({
#             'message': 'Upload and associated data deleted successfully',
#             'deleted_id': upload_id
#         }), 200
        
#     except Exception as e:
#         db.session.rollback()
#         print(f"Error deleting upload: {str(e)}")
#         return jsonify({'message': f'Error deleting upload: {str(e)}'}), 500

# @app.route('/uploads/<int:upload_id>/vote', methods=['POST'])
# @jwt_required()
# def vote(upload_id):
#     try:
#         current_user = get_jwt_identity()
#         data = request.get_json()
#         if not data or 'type' not in data:
#             return jsonify({'message': 'Missing vote type'}), 400
            
#         upload_item = Upload.query.get(upload_id)
#         if not upload_item:
#             return jsonify({'message': 'Upload not found'}), 404

#         vote_type = data['type']
#         existing_vote = Vote.query.filter_by(
#             upload_id=upload_id,
#             user=current_user
#         ).first()

#         # Handle vote removal
#         if vote_type == 'remove' and existing_vote:
#             if existing_vote.vote_type == 'upvote':
#                 upload_item.upvotes = max(0, upload_item.upvotes - 1)
#             else:
#                 upload_item.downvotes = max(0, upload_item.downvotes - 1)
#             db.session.delete(existing_vote)

#         # Handle vote switching or new vote
#         elif vote_type in ['upvote', 'downvote']:
#             if existing_vote:
#                 # Switch vote
#                 if existing_vote.vote_type != vote_type:
#                     if vote_type == 'upvote':
#                         upload_item.downvotes = max(0, upload_item.downvotes - 1)
#                         upload_item.upvotes += 1
#                     else:
#                         upload_item.upvotes = max(0, upload_item.upvotes - 1)
#                         upload_item.downvotes += 1
#                     existing_vote.vote_type = vote_type
#             else:
#                 # New vote
#                 new_vote = Vote(
#                     upload_id=upload_id,
#                     user=current_user,
#                     vote_type=vote_type
#                 )
#                 db.session.add(new_vote)
#                 if vote_type == 'upvote':
#                     upload_item.upvotes += 1
#                 else:
#                     upload_item.downvotes += 1
#         else:
#             return jsonify({'message': 'Invalid vote type'}), 400

#         db.session.commit()

#         # Return the user's current vote status along with counts
#         return jsonify({
#             'message': f"Vote {vote_type} recorded successfully",
#             'upvotes': upload_item.upvotes,
#             'downvotes': upload_item.downvotes,
#             'userVote': vote_type if vote_type != 'remove' else None
#         })

#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'message': f'Error recording vote: {str(e)}'}), 500

# @app.route('/uploads/<int:upload_id>/comments', methods=['GET'])
# @jwt_required()
# def get_comments(upload_id):
#     try:
#         comments = Comment.query.filter_by(upload_id=upload_id).order_by(Comment.created_at.desc()).all()
        
#         comments_list = []
#         for comment in comments:
#             comments_list.append({
#                 'id': comment.id,
#                 'author': comment.author,
#                 'text': comment.text,
#                 'created_at': comment.created_at.isoformat()
#             })
        
#         return jsonify({'comments': comments_list}), 200
#     except Exception as e:
#         return jsonify({'message': f'Error fetching comments: {str(e)}'}), 500

# @app.route('/uploads/<int:upload_id>/comments', methods=['POST'])
# @jwt_required()
# def add_comment(upload_id):
#     try:
#         data = request.get_json()
#         current_user = get_jwt_identity()
        
#         if not data or 'text' not in data:
#             return jsonify({'message': 'Missing comment text'}), 400
        
#         if not Upload.query.get(upload_id):
#             return jsonify({'message': 'Upload not found'}), 404
        
#         new_comment = Comment(
#             upload_id=upload_id,
#             author=current_user,
#             text=data['text']
#         )
        
#         db.session.add(new_comment)
#         db.session.commit()
        
#         return jsonify({
#             'message': 'Comment added successfully',
#             'comment': {
#                 'id': new_comment.id,
#                 'author': new_comment.author,
#                 'text': new_comment.text,
#                 'created_at': new_comment.created_at.isoformat()
#             }
#         }), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'message': f'Error adding comment: {str(e)}'}), 500

# @app.route('/recent-uploads', methods=['GET'])
# @jwt_required()
# def recent_uploads():
#     try:
#         current_user = get_jwt_identity()
#         uploads = Upload.query.order_by(Upload.created_at.desc()).limit(10).all()
        
#         materials = []
#         for upload in uploads:
#             # Get user's vote for this upload
#             user_vote = Vote.query.filter_by(
#                 upload_id=upload.id,
#                 user=current_user
#             ).first()

#             materials.append({
#                 'id': upload.id,
#                 'author': upload.author,
#                 'course_code': upload.course_code,
#                 'description': upload.description,
#                 'tags': upload.tags.split(','),
#                 'file_url': upload.file_url,
#                 'upvotes': upload.upvotes,
#                 'downvotes': upload.downvotes,
#                 'userVote': user_vote.vote_type if user_vote else None,
#                 'year': upload.year,
#                 'semester': upload.semester,
#                 'created_at': upload.created_at.isoformat(),
#                 'file_type': upload.file_type
#             })
        
#         return jsonify({'materials': materials}), 200
#     except Exception as e:
#         return jsonify({'message': f'Error fetching recent uploads: {str(e)}'}), 500

# @app.route('/search', methods=['GET'])
# @jwt_required()
# def search_materials():
#     try:
#         # Get search parameters
#         course_code = request.args.get('course_code', '')
#         year = request.args.get('year', '')
#         semester = request.args.get('semester', '')
#         tags = request.args.getlist('tags')
        
#         # Build the query
#         query = Upload.query
        
#         if course_code:
#             query = query.filter(Upload.course_code.like(f'%{course_code}%'))
        
#         if year:
#             query = query.filter(Upload.year == year)
        
#         if semester:
#             query = query.filter(Upload.semester == semester)
        
#         # Get all results that match the basic criteria
#         results = query.order_by(Upload.created_at.desc()).all()
        
#         # Filter by tags if provided
#         if tags:
#             filtered_results = []
#             for upload in results:
#                 upload_tags = upload.tags.split(',')
#                 matching_tags = sum(1 for tag in tags if tag in upload_tags)
#                 if matching_tags > 0:
#                     filtered_results.append((upload, matching_tags))
            
#             filtered_results.sort(key=lambda x: x[1], reverse=True)
#             results = [item[0] for item in filtered_results]
        
#         # Format the results
#         materials = []
#         for upload in results:
#             materials.append({
#                 'id': upload.id,
#                 'author': upload.author,
#                 'course_code': upload.course_code,
#                 'description': upload.description,
#                 'tags': upload.tags.split(','),
#                 'file_url': upload.file_url,
#                 'upvotes': upload.upvotes,
#                 'downvotes': upload.downvotes,
#                 'year': upload.year,
#                 'semester': upload.semester,
#                 'created_at': upload.created_at.isoformat(),
#                 'file_type': upload.file_type
#             })
        
#         return jsonify({'materials': materials}), 200
#     except Exception as e:
#         return jsonify({'message': f'Error searching materials: {str(e)}'}), 500

# @app.route('/verify-token', methods=['GET'])
# @jwt_required()
# def verify_token():
#     try:
#         current_user = get_jwt_identity()
#         return jsonify({'user': current_user}), 200
#     except Exception as e:
#         return jsonify({'message': 'Invalid token'}), 401

# # Add file validation
# def validate_file(file):
#     if not file:
#         return False, "No file provided"
#     if file.content_length > app.config['MAX_CONTENT_LENGTH']:
#         return False, "File too large"
#     if not allowed_file(file.filename):
#         return False, "Invalid file type"
#     return True, None

# # Add comprehensive tests
# def test_upload_resource():
#     # Test resource upload
#     pass

# def test_user_authentication():
#     # Test user auth
#     pass

# # Add new routes for profile management
# @app.route('/profile', methods=['GET'])
# @jwt_required()
# def get_profile():
#     try:
#         current_user = get_jwt_identity()
#         user = User.query.filter_by(username=current_user).first()
        
#         if not user:
#             return jsonify({'message': 'User not found'}), 404
            
#         return jsonify({
#             'username': user.username,
#             'email': user.email,
#             'bio': user.bio,
#             'profile_picture': user.profile_picture
#         }), 200
#     except Exception as e:
#         return jsonify({'message': f'Error fetching profile: {str(e)}'}), 500

# @app.route('/update-profile', methods=['PUT'])
# @jwt_required()
# def update_profile():
#     try:
#         current_user = get_jwt_identity()  # This returns the username
#         data = request.get_json()
        
#         # Get user from database using username
#         user = User.query.filter_by(username=current_user).first()
#         if not user:
#             return jsonify({'message': 'User not found'}), 404

#         # Update user fields
#         if 'username' in data:
#             # Check if username is already taken
#             existing_user = User.query.filter_by(username=data['username']).first()
#             if existing_user and existing_user.id != user.id:
#                 return jsonify({'message': 'Username already taken'}), 400
#             user.username = data['username']

#         if 'email' in data:
#             # Check if email is already taken
#             existing_user = User.query.filter_by(email=data['email']).first()
#             if existing_user and existing_user.id != user.id:
#                 return jsonify({'message': 'Email already taken'}), 400
#             user.email = data['email']

#         if 'bio' in data:
#             user.bio = data['bio']

#         # Commit changes
#         db.session.commit()

#         # Return updated user data
#         return jsonify({
#             'message': 'Profile updated successfully',
#             'user': {
#                 'id': user.id,
#                 'username': user.username,
#                 'email': user.email,
#                 'bio': user.bio,
#                 'profile_picture': user.profile_picture
#             }
#         }), 200

#     except Exception as e:
#         db.session.rollback()
#         print(f"Error updating profile: {str(e)}")
#         return jsonify({'message': 'Failed to update profile'}), 500

# @app.route('/user-stats', methods=['GET'])
# @jwt_required()
# def get_user_stats():
#     try:
#         current_user = get_jwt_identity()
        
#         # Get user's uploads count
#         uploads_count = Upload.query.filter_by(author=current_user).count()
        
#         # Get user's comments count
#         comments_count = Comment.query.filter_by(author=current_user).count()
        
#         # Get recent activity (last 5 uploads)
#         recent_uploads = Upload.query.filter_by(author=current_user)\
#             .order_by(Upload.created_at.desc())\
#             .limit(5)\
#             .all()
        
#         recent_activity = [{
#             'id': upload.id,
#             'course_code': upload.course_code,
#             'description': upload.description,
#             'created_at': upload.created_at.isoformat(),
#             'upvotes': upload.upvotes,
#             'downvotes': upload.downvotes
#         } for upload in recent_uploads]
        
#         return jsonify({
#             'uploads': uploads_count,
#             'comments': comments_count,
#             'recent_activity': recent_activity
#         }), 200
#     except Exception as e:
#         print(f"Error fetching user stats: {str(e)}")
#         return jsonify({'message': f'Error fetching user stats: {str(e)}'}), 500

# # Create tables
# with app.app_context():
#     try:
#         # Create tables if they don't exist
#         db.create_all()
#         logger.info("Database tables created successfully")
#     except Exception as e:
#         logger.error(f"Error creating database tables: {str(e)}")
#         raise

# @app.route('/api/jobs', methods=['GET'])
# #@jwt_required()
# # there is some problem with this authentication here---> LOOK INTO IT
# def get_jobs():
#     print("\nReceived request to get jobs")
#     # Get parameters from the request
#     field = request.args.get('field', '')
#     geoid = request.args.get('geoid', '')
#     page = request.args.get('page', 0)
#     sort_by = request.args.get('sortBy', '')
#     job_type = request.args.get('jobType', '')
#     exp_level = request.args.get('expLevel', '')
#     work_type = request.args.get('workType', '')
#     filter_by_company = request.args.get('filterByCompany', '')
    
#     # Print all parameters received from frontend
#     print("\nReceived parameters from frontend:")
#     print(f"Field: {field}")
#     print(f"Geoid: {geoid}")
#     print(f"Page: {page}")
#     print(f"Sort By: {sort_by}")
#     print(f"Job Type: {job_type}")
#     print(f"Experience Level: {exp_level}")
#     print(f"Work Type: {work_type}")
#     print(f"Filter By Company: {filter_by_company}")
#     print("----------------------------------------\n")
    
#     # API endpoint and key
#     api_key = "67e19812b136d19387075104"
#     url = "https://api.scrapingdog.com/linkedinjobs"
    
#     # Set up parameters for the API call
#     params = {
#         "api_key": api_key,
#         "field": field,
#         "geoid": geoid,
#         "page": 1,
#         "sortBy": sort_by,
#         "jobType": job_type,
#         "expLevel": exp_level,
#         "workType": work_type,
#         "filterByCompany": filter_by_company
#     }
    
#     # Remove empty parameters
#     params = {k: v for k, v in params.items() if v}
    
#     try:
#         # Make the API call
#         response = requests.get(url, params=params)
        
#         if response.status_code == 200:
#             return jsonify(response.json())
#         else:
#             return jsonify({
#                 "error": f"Request failed with status code: {response.status_code}",
#                 "message": response.text
#             }), response.status_code
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # Routes for placement data
# @app.route('/placements', methods=['GET'])
# @jwt_required()
# def get_placements():
#     try:
#         placements = Placement.query.order_by(Placement.created_at.desc()).all()
        
#         result = []
#         for placement in placements:
#             # Get people associated with this placement
#             people = PlacementPerson.query.filter_by(placement_id=placement.id).all()
            
#             people_data = []
#             for person in people:
#                 people_data.append({
#                     'id': person.id,
#                     'name': person.name,
#                     'resume_url': person.resume_url
#                 })
            
#             result.append({
#                 'id': placement.id,
#                 'company': placement.company,
#                 'type': placement.type,
#                 'mode': placement.mode,
#                 'year': placement.year,
#                 'role': placement.role,
#                 'referral': placement.referral,
#                 'created_at': placement.created_at.isoformat(),
#                 'created_by': placement.created_by,
#                 'people': people_data
#             })
        
#         return jsonify({'placements': result}), 200
#     except Exception as e:
#         return jsonify({'message': f'Error fetching placements: {str(e)}'}), 500

# @app.route('/placements', methods=['POST'])
# @jwt_required()
# def add_placement():
#     try:
#         current_user = get_jwt_identity()
        
#         # Get form data
#         company = request.form.get('company')
#         placement_type = request.form.get('type')
#         mode = request.form.get('mode')
#         year = request.form.get('year')
#         role = request.form.get('role')
#         referral = request.form.get('referral')
        
#         # Validate required fields
#         if not company or not placement_type or not mode or not year or not role:
#             return jsonify({'message': 'Missing required fields'}), 400
        
#         # Create new placement
#         new_placement = Placement(
#             company=company,
#             type=placement_type,
#             mode=mode,
#             year=year,
#             role=role,
#             referral=referral,
#             created_by=current_user
#         )
        
#         db.session.add(new_placement)
#         db.session.flush()  # Get the ID without committing
        
#         # Process people data
#         people_data = []
        
#         # Determine how many people were submitted
#         person_count = 0
#         for key in request.form.keys():
#             if key.startswith('people[') and key.endswith('][name]'):
#                 person_count = max(person_count, int(key.split('[')[1].split(']')[0]) + 1)
        
#         for i in range(person_count):
#             name_key = f'people[{i}][name]'
#             name = request.form.get(name_key)
            
#             if name:
#                 resume_url = None
#                 resume_public_id = None
                
#                 # Check if a resume was uploaded for this person
#                 resume_key = f'people[{i}][resume]'
#                 if resume_key in request.files and request.files[resume_key].filename:
#                     file = request.files[resume_key]
                    
#                     # if not allowe 
#                     # file = request.files[resume_key]
                    
#                     if not allowed_file(file.filename):
#                         return jsonify({'message': f'Invalid file type for resume. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'}), 400
                    
#                     # Upload to Cloudinary
#                     upload_result = cloudinary.uploader.upload(
#                         file,
#                         folder="placements",
#                         resource_type="raw"
#                     )
                    
#                     resume_url = upload_result.get('secure_url')
#                     resume_public_id = upload_result.get('public_id')
                
#                 # Create person record
#                 new_person = PlacementPerson(
#                     placement_id=new_placement.id,
#                     name=name,
#                     resume_url=resume_url,
#                     resume_public_id=resume_public_id
#                 )
                
#                 db.session.add(new_person)
                
#                 people_data.append({
#                     'name': name,
#                     'resume_url': resume_url
#                 })
        
#         db.session.commit()
        
#         return jsonify({
#             'message': 'Placement added successfully',
#             'placement': {
#                 'id': new_placement.id,
#                 'company': new_placement.company,
#                 'type': new_placement.type,
#                 'mode': new_placement.mode,
#                 'year': new_placement.year,
#                 'role': new_placement.role,
#                 'referral': new_placement.referral,
#                 'people': people_data
#             }
#         }), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'message': f'Error adding placement: {str(e)}'}), 500

# @app.route('/placements/search', methods=['GET'])
# @jwt_required()
# def search_placements():
#     try:
#         # Get search parameters
#         company = request.args.get('company', '')
#         year = request.args.get('year', '')
#         placement_type = request.args.get('type', '')
        
#         # Build the query
#         query = Placement.query
        
#         if company:
#             query = query.filter(Placement.company.like(f'%{company}%'))
        
#         if year:
#             query = query.filter(Placement.year == year)
        
#         if placement_type:
#             query = query.filter(Placement.type == placement_type)
        
#         # Get results
#         placements = query.order_by(Placement.created_at.desc()).all()
        
#         result = []
#         for placement in placements:
#             # Get people associated with this placement
#             people = PlacementPerson.query.filter_by(placement_id=placement.id).all()
            
#             people_data = []
#             for person in people:
#                 people_data.append({
#                     'id': person.id,
#                     'name': person.name,
#                     'resume_url': person.resume_url
#                 })
            
#             result.append({
#                 'id': placement.id,
#                 'company': placement.company,
#                 'type': placement.type,
#                 'mode': placement.mode,
#                 'year': placement.year,
#                 'role': placement.role,
#                 'referral': placement.referral,
#                 'created_at': placement.created_at.isoformat(),
#                 'created_by': placement.created_by,
#                 'people': people_data
#             })
        
#         return jsonify({'placements': result}), 200
#     except Exception as e:
#         return jsonify({'message': f'Error searching placements: {str(e)}'}), 500


# # Routes for interview experiences
# @app.route('/interview-experiences', methods=['GET'])
# @jwt_required()
# def get_interview_experiences():
#     try:
#         # Get search parameters
#         company = request.args.get('company', '')
#         year = request.args.get('year', '')
#         interview_type = request.args.get('type', '')
        
#         # Build the query
#         query = InterviewExperience.query
        
#         if company:
#             query = query.filter(InterviewExperience.company.like(f'%{company}%'))
        
#         if year:
#             query = query.filter(InterviewExperience.year == year)
        
#         if interview_type:
#             query = query.filter(InterviewExperience.type == interview_type)
        
#         # Get results
#         interviews = query.order_by(InterviewExperience.created_at.desc()).all()
        
#         result = []
#         for interview in interviews:
#             # Get questions associated with this interview
#             questions = InterviewQuestion.query.filter_by(interview_id=interview.id).all()
            
#             questions_data = []
#             for question in questions:
#                 questions_data.append({
#                     'id': question.id,
#                     'question': question.question,
#                     'answer': question.answer
#                 })
            
#             # Parse tags
#             tags = interview.tags.split(',') if interview.tags else []
            
#             result.append({
#                 'id': interview.id,
#                 'company': interview.company,
#                 'candidateName': interview.candidate_name,
#                 'interviewerName': interview.interviewer_name,
#                 'year': interview.year,
#                 'type': interview.type,
#                 'tips': interview.tips,
#                 'created_at': interview.created_at.isoformat(),
#                 'created_by': interview.created_by,
#                 'tags': tags,
#                 'questions': questions_data
#             })
        
#         return jsonify({'interviews': result}), 200
#     except Exception as e:
#         return jsonify({'message': f'Error fetching interview experiences: {str(e)}'}), 500

# @app.route('/interview-experiences', methods=['POST'])
# @jwt_required()
# def add_interview_experience():
#     try:
#         current_user = get_jwt_identity()
#         data = request.get_json()
        
#         # Validate required fields
#         if not data.get('company') or not data.get('candidateName') or not data.get('year') or not data.get('type'):
#             return jsonify({'message': 'Missing required fields'}), 400
        
#         if not data.get('questions') or len(data.get('questions')) == 0:
#             return jsonify({'message': 'At least one question is required'}), 400
        
#         # Process tags
#         tags = ','.join(data.get('tags', [])) if data.get('tags') else ''
        
#         # Create new interview experience
#         new_interview = InterviewExperience(
#             company=data.get('company'),
#             candidate_name=data.get('candidateName'),
#             interviewer_name=data.get('interviewerName', ''),
#             year=data.get('year'),
#             type=data.get('type'),
#             tips=data.get('tips', ''),
#             created_by=current_user,
#             tags=tags
#         )
        
#         db.session.add(new_interview)
#         db.session.flush()  # Get the ID without committing
        
#         # Process questions
#         questions_data = []
#         for q in data.get('questions', []):
#             if q.get('question') and q.get('answer'):
#                 new_question = InterviewQuestion(
#                     interview_id=new_interview.id,
#                     question=q.get('question'),
#                     answer=q.get('answer')
#                 )
                
#                 db.session.add(new_question)
                
#                 questions_data.append({
#                     'question': q.get('question'),
#                     'answer': q.get('answer')
#                 })
        
#         db.session.commit()
        
#         return jsonify({
#             'message': 'Interview experience added successfully',
#             'interview': {
#                 'id': new_interview.id,
#                 'company': new_interview.company,
#                 'candidateName': new_interview.candidate_name,
#                 'interviewerName': new_interview.interviewer_name,
#                 'year': new_interview.year,
#                 'type': new_interview.type,
#                 'tips': new_interview.tips,
#                 'tags': data.get('tags', []),
#                 'questions': questions_data
#             }
#         }), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'message': f'Error adding interview experience: {str(e)}'}), 500

# @app.route('/interview-experiences/<int:interview_id>', methods=['GET'])
# @jwt_required()
# def get_interview_experience(interview_id):
#     try:
#         interview = InterviewExperience.query.get(interview_id)
        
#         if not interview:
#             return jsonify({'message': 'Interview experience not found'}), 404
        
#         # Get questions associated with this interview
#         questions = InterviewQuestion.query.filter_by(interview_id=interview.id).all()
        
#         questions_data = []
#         for question in questions:
#             questions_data.append({
#                 'id': question.id,
#                 'question': question.question,
#                 'answer': question.answer
#             })
        
#         # Parse tags
#         tags = interview.tags.split(',') if interview.tags else []
        
#         return jsonify({
#             'interview': {
#                 'id': interview.id,
#                 'company': interview.company,
#                 'candidateName': interview.candidate_name,
#                 'interviewerName': interview.interviewer_name,
#                 'year': interview.year,
#                 'type': interview.type,
#                 'tips': interview.tips,
#                 'created_at': interview.created_at.isoformat(),
#                 'created_by': interview.created_by,
#                 'tags': tags,
#                 'questions': questions_data
#             }
#         }), 200
#     except Exception as e:
#         return jsonify({'message': f'Error fetching interview experience: {str(e)}'}), 500


# # @app.route('/api/duckduckgo-search', methods=['GET'])
# # def duckduckgo_search():
# #     query = request.args.get('q')
    
# #     if not query:
# #         return jsonify({'error': 'Missing search query'}), 400
    
# #     try:
# #         # DuckDuckGo search
# #         headers = {
# #             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
# #         }
# #         response = requests.get(
# #             f'https://html.duckduckgo.com/html/?q={query}',
# #             headers=headers
# #         )
        
# #         if response.status_code != 200:
# #             return jsonify({'error': 'Failed to fetch search results'}), 500
        
# #         # Parse the HTML response
# #         soup = BeautifulSoup(response.text, 'html.parser')
# #         results = []
        
# #         # Extract search results
# #         for result in soup.select('.result'):
# #             title_elem = result.select_one('.result__a')
# #             snippet_elem = result.select_one('.result__snippet')
            
# #             if title_elem and title_elem.get('href'):
# #                 title = title_elem.get_text(strip=True)
# #                 url = title_elem.get('href')
# #                 description = snippet_elem.get_text(strip=True) if snippet_elem else ''
                
# #                 results.append({
# #                     'title': title,
# #                     'url': url,
# #                     'description': description
# #                 })
        
# #         return jsonify({'results': results})
    
# #     except Exception as e:
# #         return jsonify({'error': str(e)}), 500
# # app.py (Flask backend)


# @app.route('/api/search-dsa', methods=['POST'])
# def search_dsa():
#     data = request.json
#     query = data.get('query', '')
#     sites = data.get('sites', [])
    
#     if not query:
#         return jsonify({"error": "Query is required"}), 400
    
#     # Format site-specific search query for DuckDuckGo
#     site_restrictions = " OR ".join([f"site:{site}" for site in sites])
#     search_query = f"{query} ({site_restrictions})"
    
#     try:
#         # Using DuckDuckGo HTML API (they don't have an official API)
#         headers = {
#             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
#         }
#         response = requests.get(
#             f"https://html.duckduckgo.com/html/?q={search_query}",
#             headers=headers
#         )
        
#         if response.status_code != 200:
#             return jsonify({"error": "Failed to fetch search results"}), 500
        
#         # Parse the HTML response
#         soup = BeautifulSoup(response.text, 'html.parser')
#         results = []
        
#         # Extract search results
#         for result in soup.select('.result'):
#             title_elem = result.select_one('.result__title')
#             url_elem = result.select_one('.result__url')
#             snippet_elem = result.select_one('.result__snippet')
            
#             if title_elem and url_elem:
#                 title = title_elem.get_text(strip=True)
#                 url = url_elem.get('href') if url_elem.get('href') else url_elem.get_text(strip=True)
                
#                 # Clean URL if it's from DuckDuckGo's redirect
#                 if '/duckduckgo.com/' in url:
#                     url_match = re.search(r'uddg=([^&]+)', url)
#                     if url_match:
#                         url = requests.utils.unquote(url_match.group(1))
                
#                 # Identify source website
#                 source = None
#                 for site in sites:
#                     if site in url:
#                         source = site
#                         break
                
#                 snippet = snippet_elem.get_text(strip=True) if snippet_elem else ""
                
#                 results.append({
#                     "title": title,
#                     "url": url,
#                     "snippet": snippet,
#                     "source": source
#                 })
                
#                 # Limit to 10 results
#                 if len(results) >= 20:
#                     break
        
#         return jsonify({"results": results})
    
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # classroom type discussion backend
# @app.route('/api/classroom/create', methods=['POST'])
# @jwt_required()
# def create_classroom():
#     try:
#         current_user = get_jwt_identity()
#         data = request.get_json()
        
#         if not data or not data.get('name'):
#             return jsonify({'message': 'Classroom name is required'}), 400
        
#         new_classroom = Classroom(
#             name=data.get('name'),
#             description=data.get('description', ''),
#             created_by=current_user
#         )
        
#         db.session.add(new_classroom)
#         db.session.flush()  # Get the ID without committing
        
#         # Add creator as a member
#         membership = ClassroomMembership(
#             user_id=current_user,
#             classroom_id=new_classroom.id
#         )
        
#         db.session.add(membership)
#         db.session.commit()
        
#         return jsonify({
#             'message': 'Classroom created successfully',
#             'classroom': {
#                 'id': new_classroom.id,
#                 'name': new_classroom.name,
#                 'description': new_classroom.description,
#                 'created_by': new_classroom.created_by,
#                 'created_at': new_classroom.created_at.isoformat()
#             }
#         }), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'message': f'Error creating classroom: {str(e)}'}), 500

# @app.route('/api/classroom/join', methods=['POST'])
# @jwt_required()
# def join_classroom():
#     try:
#         current_user = get_jwt_identity()
#         data = request.get_json()
        
#         if not data or not data.get('classroom_id'):
#             return jsonify({'message': 'Classroom ID is required'}), 400
        
#         classroom_id = data.get('classroom_id')
        
#         # Check if classroom exists
#         classroom = Classroom.query.get(classroom_id)
#         if not classroom:
#             return jsonify({'message': 'Classroom not found'}), 404
        
#         # Check if user is already a member
#         existing_membership = ClassroomMembership.query.filter_by(
#             user_id=current_user,
#             classroom_id=classroom_id
#         ).first()
        
#         if existing_membership:
#             return jsonify({'message': 'You are already a member of this classroom'}), 400
        
#         # Add user as a member
#         membership = ClassroomMembership(
#             user_id=current_user,
#             classroom_id=classroom_id
#         )
        
#         db.session.add(membership)
#         db.session.commit()
        
#         return jsonify({
#             'message': 'Joined classroom successfully',
#             'classroom': {
#                 'id': classroom.id,
#                 'name': classroom.name,
#                 'description': classroom.description,
#                 'created_by': classroom.created_by,
#                 'created_at': classroom.created_at.isoformat()
#             }
#         }), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'message': f'Error joining classroom: {str(e)}'}), 500

# @app.route('/api/classrooms', methods=['GET'])
# @jwt_required()
# def get_classrooms():
#     try:
#         current_user = get_jwt_identity()
        
#         # Get all classrooms the user is a member of
#         memberships = ClassroomMembership.query.filter_by(user_id=current_user).all()
#         classroom_ids = [membership.classroom_id for membership in memberships]
        
#         classrooms = Classroom.query.filter(Classroom.id.in_(classroom_ids)).all()
        
#         result = []
#         for classroom in classrooms:
#             result.append({
#                 'id': classroom.id,
#                 'name': classroom.name,
#                 'description': classroom.description,
#                 'created_by': classroom.created_by,
#                 'created_at': classroom.created_at.isoformat()
#             })
        
#         return jsonify({'classrooms': result}), 200
#     except Exception as e:
#         return jsonify({'message': f'Error fetching classrooms: {str(e)}'}), 500

# @app.route('/api/classroom/<int:classroom_id>/message', methods=['POST'])
# @jwt_required()
# def send_message(classroom_id):
#     try:
#         current_user = get_jwt_identity()
#         data = request.get_json()
        
#         if not data or not data.get('content'):
#             return jsonify({'message': 'Message content is required'}), 400
        
#         # Check if classroom exists
#         classroom = Classroom.query.get(classroom_id)
#         if not classroom:
#             return jsonify({'message': 'Classroom not found'}), 404
        
#         # Check if user is a member
#         membership = ClassroomMembership.query.filter_by(
#             user_id=current_user,
#             classroom_id=classroom_id
#         ).first()
        
#         if not membership:
#             return jsonify({'message': 'You are not a member of this classroom'}), 403
        
#         # Create new message
#         new_message = ClassroomMessage(
#             user_id=current_user,
#             classroom_id=classroom_id,
#             content=data.get('content')
#         )
        
#         db.session.add(new_message)
#         db.session.commit()
        
#         return jsonify({
#             'message': 'Message sent successfully',
#             'message': {
#                 'id': new_message.id,
#                 'user_id': new_message.user_id,
#                 'content': new_message.content,
#                 'timestamp': new_message.timestamp.isoformat()
#             }
#         }), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'message': f'Error sending message: {str(e)}'}), 500

# @app.route('/api/classroom/<int:classroom_id>/messages', methods=['GET'])
# @jwt_required()
# def get_messages(classroom_id):
#     try:
#         current_user = get_jwt_identity()
        
#         # Check if classroom exists
#         classroom = Classroom.query.get(classroom_id)
#         if not classroom:
#             return jsonify({'message': 'Classroom not found'}), 404
        
#         # Check if user is a member
#         membership = ClassroomMembership.query.filter_by(
#             user_id=current_user,
#             classroom_id=classroom_id
#         ).first()
        
#         if not membership:
#             return jsonify({'message': 'You are not a member of this classroom'}), 403
        
#         # Get all messages for this classroom
#         messages = ClassroomMessage.query.filter_by(classroom_id=classroom_id).order_by(ClassroomMessage.timestamp.asc()).all()
        
#         result = []
#         for message in messages:
#             result.append({
#                 'id': message.id,
#                 'user_id': message.user_id,
#                 'content': message.content,
#                 'timestamp': message.timestamp.isoformat()
#             })
        
#         return jsonify({'messages': result}), 200
#     except Exception as e:
#         return jsonify({'message': f'Error fetching messages: {str(e)}'}), 500

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_migrate import Migrate
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash, generate_password_hash
import os
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import cloudinary.api
from datetime import datetime, timedelta
from flask_cors import CORS
from flasgger import Swagger, swag_from
import re
import logging
import requests
from bs4 import BeautifulSoup
import re
import json

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Initialize app
app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "expose_headers": ["Content-Range", "X-Content-Range"]
    }
})

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///database.db')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET', 'your-secret-key')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# Ensure upload folder exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Cloudinary Configuration
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=True)
    bio = db.Column(db.Text, nullable=True)
    profile_picture = db.Column(db.String(200), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    last_login = db.Column(db.DateTime, nullable=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    author = db.Column(db.String(80), nullable=False)
    course_code = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    tags = db.Column(db.String(200), nullable=False)  # Comma-separated tags
    file_url = db.Column(db.String(500), nullable=True)  # File path or link
    public_id = db.Column(db.String(200), nullable=True)  # Cloudinary public ID
    upvotes = db.Column(db.Integer, default=0)
    downvotes = db.Column(db.Integer, default=0)
    year = db.Column(db.String(10), nullable=True)
    semester = db.Column(db.String(20), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    file_type = db.Column(db.String(10), nullable=True)  # Store file extension
    __table_args__ = (
        db.Index('idx_course_code', 'course_code'),
        db.Index('idx_created_at', 'created_at'),
        db.Index('idx_author', 'author')
    )

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    upload_id = db.Column(db.Integer, db.ForeignKey('upload.id'), nullable=False)
    author = db.Column(db.String(80), nullable=False)
    text = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Vote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    upload_id = db.Column(db.Integer, db.ForeignKey('upload.id'), nullable=False)
    user = db.Column(db.String(80), nullable=False)
    vote_type = db.Column(db.String(10), nullable=False)  # 'upvote' or 'downvote'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    __table_args__ = (
        db.UniqueConstraint('upload_id', 'user', name='unique_user_vote'),
    )

# Model for placement data
class Placement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(20), nullable=False)  # 'Internship' or 'Placement'
    mode = db.Column(db.String(20), nullable=False)  # 'On Campus' or 'Off Campus'
    year = db.Column(db.String(4), nullable=False)
    role = db.Column(db.String(100), nullable=False)
    referral = db.Column(db.String(3), nullable=False)  # 'Yes' or 'No'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.String(80), nullable=False)

class PlacementPerson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    placement_id = db.Column(db.Integer, db.ForeignKey('placement.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    resume_url = db.Column(db.String(500), nullable=True)
    resume_public_id = db.Column(db.String(200), nullable=True)


# Model for interview experiences
class InterviewExperience(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(100), nullable=False)
    candidate_name = db.Column(db.String(100), nullable=False)
    interviewer_name = db.Column(db.String(100), nullable=True)
    year = db.Column(db.String(4), nullable=False)
    type = db.Column(db.String(20), nullable=False)  # 'Internship' or 'Placement'
    tips = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.String(80), nullable=False)
    tags = db.Column(db.String(200), nullable=True)  # Comma-separated tags

class InterviewQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    interview_id = db.Column(db.Integer, db.ForeignKey('interview_experience.id'), nullable=False)
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text, nullable=False)

# Classroom type discussion backend
class Classroom(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_by = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class ClassroomMembership(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(80), nullable=False)
    classroom_id = db.Column(db.Integer, db.ForeignKey('classroom.id'), nullable=False)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    __table_args__ = (
        db.UniqueConstraint('user_id', 'classroom_id', name='unique_user_classroom'),
    )

class ClassroomMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(80), nullable=False)
    classroom_id = db.Column(db.Integer, db.ForeignKey('classroom.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# Helper function for allowed file extensions
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'docx', 'txt'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Routes
def validate_username(username):
    if not username or len(username) < 3:
        return False, "Username must be at least 3 characters long"
    if not re.match(r'^[a-zA-Z0-9_]+$', username):
        return False, "Username can only contain letters, numbers, and underscores"
    return True, None

def validate_password(password):
    if not password or len(password) < 6:
        return False, "Password must be at least 6 characters long"
    if not re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)', password):
        return False, "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    return True, None

@app.route('/signup', methods=['POST'])
def signup():
    try:
        logger.debug("Received signup request")
        data = request.get_json()
        
        if not data:
            logger.warning("No data provided in signup request")
            return jsonify({'message': 'No data provided'}), 400

        username = data.get('username')
        password = data.get('password')

        logger.debug(f"Attempting to create user: {username}")

        # Validate username
        is_valid_username, username_error = validate_username(username)
        if not is_valid_username:
            logger.warning(f"Invalid username: {username_error}")
            return jsonify({'message': username_error}), 400

        # Validate password
        is_valid_password, password_error = validate_password(password)
        if not is_valid_password:
            logger.warning(f"Invalid password: {password_error}")
            return jsonify({'message': password_error}), 400

        # Check if username already exists
        if User.query.filter_by(username=username).first():
            logger.warning(f"Username already exists: {username}")
            return jsonify({'message': 'Username already exists'}), 409

        # Create new user
        new_user = User(username=username)
        new_user.set_password(password)
        
        try:
            db.session.add(new_user)
            db.session.commit()
            logger.info(f"User created successfully: {username}")
            return jsonify({'message': 'User created successfully'}), 201
        except Exception as db_error:
            db.session.rollback()
            logger.error(f"Database error during signup: {str(db_error)}")
            return jsonify({'message': 'Error creating user. Please try again.'}), 500

    except Exception as e:
        logger.error(f"Unexpected error during signup: {str(e)}")
        return jsonify({'message': 'An unexpected error occurred'}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'message': 'No data provided'}), 400

        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'message': 'Username and password are required'}), 400

        user = User.query.filter_by(username=username).first()
        
        if not user or not user.check_password(password):
            return jsonify({'message': 'Invalid username or password'}), 401

        # Update last login
        user.last_login = db.func.now()
        db.session.commit()

        # Create access token
        access_token = create_access_token(identity=username)
        
        return jsonify({
            'access_token': access_token,
            'username': username
        }), 200

    except Exception as e:
        return jsonify({'message': 'An unexpected error occurred'}), 500

@app.route('/uploads', methods=['POST'])
@jwt_required()
@swag_from({
    'parameters': [
        {
            'name': 'file',
            'in': 'formData',
            'type': 'file',
            'required': True
        }
    ],
    'responses': {
        201: 'Upload successful',
        400: 'Invalid input',
        401: 'Unauthorized'
    }
})
def upload_file():
    try:
        current_user = get_jwt_identity()
        
        # Get form data
        course_code = request.form.get('course_code')
        description = request.form.get('description')
        tags = request.form.get('tags')
        year = request.form.get('year')
        semester = request.form.get('semester')

        # Validate required fields
        if not course_code:
            return jsonify({'message': 'Course code is required'}), 400
        if not description:
            return jsonify({'message': 'Description is required'}), 400
        if not tags:
            return jsonify({'message': 'At least one tag is required'}), 400

        # Handle file upload
        if 'file' in request.files:
            file = request.files['file']
            
            if file.filename == '':
                return jsonify({'message': 'No selected file'}), 400

            if not allowed_file(file.filename):
                return jsonify({'message': f'File type not allowed. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'}), 400

            try:
                # Upload to Cloudinary
                upload_result = cloudinary.uploader.upload(
                    file.stream,
                    folder="material_sharing",
                    resource_type="auto"
                )
                print("Upload Result:", upload_result)
                file_url = upload_result.get('secure_url')
                public_id = upload_result.get('public_id')
                file_type = os.path.splitext(file.filename)[1][1:].lower()

                new_upload = Upload(
                    author=current_user,
                    course_code=course_code,
                    description=description,
                    tags=tags,
                    file_url=file_url,
                    public_id=public_id,
                    year=year,
                    semester=semester,
                    file_type=file_type
                )

            except Exception as cloudinary_error:
                print(f"Cloudinary error: {str(cloudinary_error)}")
                return jsonify({'message': 'Error uploading to cloud storage'}), 500

        # Handle link upload
        elif 'link' in request.form:
            link = request.form.get('link')
            if not link:
                return jsonify({'message': 'Link is required when no file is provided'}), 400

            new_upload = Upload(
                author=current_user,
                course_code=course_code,
                description=description,
                tags=tags,
                file_url=link,
                year=year,
                semester=semester
            )
        else:
            return jsonify({'message': 'Either a file or link must be provided'}), 400
        # print("Received Files:", request.files)
        # print("Received Form Data:", request.form)

        # Save to database
        try:
            db.session.add(new_upload)
            db.session.commit()
            return jsonify({
                'message': 'Upload successful',
                'file_url': new_upload.file_url
            }), 201
        except Exception as db_error:
            db.session.rollback()
            print(f"Database error: {str(db_error)}")
            return jsonify({'message': 'Error saving to database'}), 500

    except Exception as e:
        print(f"General error: {str(e)}")
        return jsonify({'message': f'Error processing upload: {str(e)}'}), 500

@app.route('/uploads/<int:upload_id>', methods=['DELETE'])
@jwt_required()
def delete_upload(upload_id):
    try:
        # Get the upload
        upload = Upload.query.get(upload_id)
        
        if not upload:
            return jsonify({'message': 'Upload not found'}), 404
            
        # If there's a file in Cloudinary, delete it
        if upload.public_id:
            try:
                cloudinary.uploader.destroy(upload.public_id)
            except Exception as cloud_error:
                print(f"Error deleting from Cloudinary: {str(cloud_error)}")
                # Continue with database deletion even if Cloudinary deletion fails
        
        # Delete associated comments first (due to foreign key constraint)
        Comment.query.filter_by(upload_id=upload_id).delete()
        
        # Delete any votes or ratings associated with this upload
        # (assuming you have a Votes table)
        # Vote.query.filter_by(upload_id=upload_id).delete()
        
        # Delete the upload record
        db.session.delete(upload)
        db.session.commit()
        
        return jsonify({
            'message': 'Upload and associated data deleted successfully',
            'deleted_id': upload_id
        }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"Error deleting upload: {str(e)}")
        return jsonify({'message': f'Error deleting upload: {str(e)}'}), 500

@app.route('/uploads/<int:upload_id>/vote', methods=['POST'])
@jwt_required()
def vote(upload_id):
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        if not data or 'type' not in data:
            return jsonify({'message': 'Missing vote type'}), 400
            
        upload_item = Upload.query.get(upload_id)
        if not upload_item:
            return jsonify({'message': 'Upload not found'}), 404

        vote_type = data['type']
        existing_vote = Vote.query.filter_by(
            upload_id=upload_id,
            user=current_user
        ).first()

        # Handle vote removal
        if vote_type == 'remove' and existing_vote:
            if existing_vote.vote_type == 'upvote':
                upload_item.upvotes = max(0, upload_item.upvotes - 1)
            else:
                upload_item.downvotes = max(0, upload_item.downvotes - 1)
            db.session.delete(existing_vote)

        # Handle vote switching or new vote
        elif vote_type in ['upvote', 'downvote']:
            if existing_vote:
                # Switch vote
                if existing_vote.vote_type != vote_type:
                    if vote_type == 'upvote':
                        upload_item.downvotes = max(0, upload_item.downvotes - 1)
                        upload_item.upvotes += 1
                    else:
                        upload_item.upvotes = max(0, upload_item.upvotes - 1)
                        upload_item.downvotes += 1
                    existing_vote.vote_type = vote_type
            else:
                # New vote
                new_vote = Vote(
                    upload_id=upload_id,
                    user=current_user,
                    vote_type=vote_type
                )
                db.session.add(new_vote)
                if vote_type == 'upvote':
                    upload_item.upvotes += 1
                else:
                    upload_item.downvotes += 1
        else:
            return jsonify({'message': 'Invalid vote type'}), 400

        db.session.commit()

        # Return the user's current vote status along with counts
        return jsonify({
            'message': f"Vote {vote_type} recorded successfully",
            'upvotes': upload_item.upvotes,
            'downvotes': upload_item.downvotes,
            'userVote': vote_type if vote_type != 'remove' else None
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error recording vote: {str(e)}'}), 500

@app.route('/uploads/<int:upload_id>/comments', methods=['GET'])
@jwt_required()
def get_comments(upload_id):
    try:
        comments = Comment.query.filter_by(upload_id=upload_id).order_by(Comment.created_at.desc()).all()
        
        comments_list = []
        for comment in comments:
            comments_list.append({
                'id': comment.id,
                'author': comment.author,
                'text': comment.text,
                'created_at': comment.created_at.isoformat()
            })
        
        return jsonify({'comments': comments_list}), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching comments: {str(e)}'}), 500

@app.route('/uploads/<int:upload_id>/comments', methods=['POST'])
@jwt_required()
def add_comment(upload_id):
    try:
        data = request.get_json()
        current_user = get_jwt_identity()
        
        if not data or 'text' not in data:
            return jsonify({'message': 'Missing comment text'}), 400
        
        if not Upload.query.get(upload_id):
            return jsonify({'message': 'Upload not found'}), 404
        
        new_comment = Comment(
            upload_id=upload_id,
            author=current_user,
            text=data['text']
        )
        
        db.session.add(new_comment)
        db.session.commit()
        
        return jsonify({
            'message': 'Comment added successfully',
            'comment': {
                'id': new_comment.id,
                'author': new_comment.author,
                'text': new_comment.text,
                'created_at': new_comment.created_at.isoformat()
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error adding comment: {str(e)}'}), 500

@app.route('/recent-uploads', methods=['GET'])
@jwt_required()
def recent_uploads():
    try:
        current_user = get_jwt_identity()
        uploads = Upload.query.order_by(Upload.created_at.desc()).limit(10).all()
        
        materials = []
        for upload in uploads:
            # Get user's vote for this upload
            user_vote = Vote.query.filter_by(
                upload_id=upload.id,
                user=current_user
            ).first()

            materials.append({
                'id': upload.id,
                'author': upload.author,
                'course_code': upload.course_code,
                'description': upload.description,
                'tags': upload.tags.split(','),
                'file_url': upload.file_url,
                'upvotes': upload.upvotes,
                'downvotes': upload.downvotes,
                'userVote': user_vote.vote_type if user_vote else None,
                'year': upload.year,
                'semester': upload.semester,
                'created_at': upload.created_at.isoformat(),
                'file_type': upload.file_type
            })
        
        return jsonify({'materials': materials}), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching recent uploads: {str(e)}'}), 500

@app.route('/search', methods=['GET'])
@jwt_required()
def search_materials():
    try:
        # Get search parameters
        course_code = request.args.get('course_code', '')
        year = request.args.get('year', '')
        semester = request.args.get('semester', '')
        tags = request.args.getlist('tags')
        
        # Build the query
        query = Upload.query
        
        if course_code:
            query = query.filter(Upload.course_code.like(f'%{course_code}%'))
        
        if year:
            query = query.filter(Upload.year == year)
        
        if semester:
            query = query.filter(Upload.semester == semester)
        
        # Get all results that match the basic criteria
        results = query.order_by(Upload.created_at.desc()).all()
        
        # Filter by tags if provided
        if tags:
            filtered_results = []
            for upload in results:
                upload_tags = upload.tags.split(',')
                matching_tags = sum(1 for tag in tags if tag in upload_tags)
                if matching_tags > 0:
                    filtered_results.append((upload, matching_tags))
            
            filtered_results.sort(key=lambda x: x[1], reverse=True)
            results = [item[0] for item in filtered_results]
        
        # Format the results
        materials = []
        for upload in results:
            materials.append({
                'id': upload.id,
                'author': upload.author,
                'course_code': upload.course_code,
                'description': upload.description,
                'tags': upload.tags.split(','),
                'file_url': upload.file_url,
                'upvotes': upload.upvotes,
                'downvotes': upload.downvotes,
                'year': upload.year,
                'semester': upload.semester,
                'created_at': upload.created_at.isoformat(),
                'file_type': upload.file_type
            })
        
        return jsonify({'materials': materials}), 200
    except Exception as e:
        return jsonify({'message': f'Error searching materials: {str(e)}'}), 500

@app.route('/verify-token', methods=['GET'])
@jwt_required()
def verify_token():
    try:
        current_user = get_jwt_identity()
        return jsonify({'user': current_user}), 200
    except Exception as e:
        return jsonify({'message': 'Invalid token'}), 401

# Add file validation
def validate_file(file):
    if not file:
        return False, "No file provided"
    if file.content_length > app.config['MAX_CONTENT_LENGTH']:
        return False, "File too large"
    if not allowed_file(file.filename):
        return False, "Invalid file type"
    return True, None

# Add comprehensive tests
def test_upload_resource():
    # Test resource upload
    pass

def test_user_authentication():
    # Test user auth
    pass

# Add new routes for profile management
@app.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
            
        return jsonify({
            'username': user.username,
            'email': user.email,
            'bio': user.bio,
            'profile_picture': user.profile_picture
        }), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching profile: {str(e)}'}), 500

@app.route('/update-profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        current_user = get_jwt_identity()  # This returns the username
        data = request.get_json()
        
        # Get user from database using username
        user = User.query.filter_by(username=current_user).first()
        if not user:
            return jsonify({'message': 'User not found'}), 404

        # Update user fields
        if 'username' in data:
            # Check if username is already taken
            existing_user = User.query.filter_by(username=data['username']).first()
            if existing_user and existing_user.id != user.id:
                return jsonify({'message': 'Username already taken'}), 400
            user.username = data['username']

        if 'email' in data:
            # Check if email is already taken
            existing_user = User.query.filter_by(email=data['email']).first()
            if existing_user and existing_user.id != user.id:
                return jsonify({'message': 'Email already taken'}), 400
            user.email = data['email']

        if 'bio' in data:
            user.bio = data['bio']

        # Commit changes
        db.session.commit()

        # Return updated user data
        return jsonify({
            'message': 'Profile updated successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'bio': user.bio,
                'profile_picture': user.profile_picture
            }
        }), 200

    except Exception as e:
        db.session.rollback()
        print(f"Error updating profile: {str(e)}")
        return jsonify({'message': 'Failed to update profile'}), 500

@app.route('/user-stats', methods=['GET'])
@jwt_required()
def get_user_stats():
    try:
        current_user = get_jwt_identity()
        
        # Get user's uploads count
        uploads_count = Upload.query.filter_by(author=current_user).count()
        
        # Get user's comments count
        comments_count = Comment.query.filter_by(author=current_user).count()
        
        # Get placements added count
        placements_added = Placement.query.filter_by(created_by=current_user).count()
        
        # Get interview experiences added count
        interview_experiences_added = InterviewExperience.query.filter_by(created_by=current_user).count()
        
        # Get classrooms created by user
        classrooms_created = Classroom.query.filter_by(created_by=current_user).all()
        classrooms_created_data = [{
            'id': classroom.id,
            'name': classroom.name
        } for classroom in classrooms_created]
        
        # Get classrooms user is part of
        memberships = ClassroomMembership.query.filter_by(user_id=current_user).all()
        classroom_ids = [membership.classroom_id for membership in memberships]
        classrooms_joined = Classroom.query.filter(Classroom.id.in_(classroom_ids)).all()
        classrooms_joined_data = [{
            'id': classroom.id,
            'name': classroom.name
        } for classroom in classrooms_joined]
        
        # Get recent activity (last 5 uploads)
        recent_uploads = Upload.query.filter_by(author=current_user)\
            .order_by(Upload.created_at.desc())\
            .limit(5)\
            .all()
        
        recent_activity = [{
            'id': upload.id,
            'course_code': upload.course_code,
            'description': upload.description,
            'created_at': upload.created_at.isoformat(),
            'upvotes': upload.upvotes,
            'downvotes': upload.downvotes
        } for upload in recent_uploads]
        
        # Create a log of searches (we need to track these in the respective search endpoints)
        # For now, we'll return placeholder counts that you can implement fully later
        
        return jsonify({
            'uploads': uploads_count,
            'comments': comments_count,
            'placements_added': placements_added,
            'placements_searches': 0,  # Placeholder - implement tracking in search endpoint
            'interview_experiences_added': interview_experiences_added,
            'interview_experience_searches': 0,  # Placeholder - implement tracking in search endpoint
            'dsa_searches': 0,  # Placeholder - implement tracking in search endpoint
            'classrooms_created': classrooms_created_data,
            'classrooms_joined': classrooms_joined_data,
            'recent_activity': recent_activity
        }), 200
    except Exception as e:
        print(f"Error fetching user stats: {str(e)}")
        return jsonify({'message': f'Error fetching user stats: {str(e)}'}), 500

# Create tables
with app.app_context():
    try:
        # Create tables if they don't exist
        db.create_all()
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Error creating database tables: {str(e)}")
        raise

@app.route('/api/jobs', methods=['GET'])
#@jwt_required()
# there is some problem with this authentication here---> LOOK INTO IT
def get_jobs():
    print("\nReceived request to get jobs")
    # Get parameters from the request
    field = request.args.get('field', '')
    geoid = request.args.get('geoid', '')
    page = request.args.get('page', 0)
    sort_by = request.args.get('sortBy', '')
    job_type = request.args.get('jobType', '')
    exp_level = request.args.get('expLevel', '')
    work_type = request.args.get('workType', '')
    filter_by_company = request.args.get('filterByCompany', '')
    
    # Print all parameters received from frontend
    print("\nReceived parameters from frontend:")
    print(f"Field: {field}")
    print(f"Geoid: {geoid}")
    print(f"Page: {page}")
    print(f"Sort By: {sort_by}")
    print(f"Job Type: {job_type}")
    print(f"Experience Level: {exp_level}")
    print(f"Work Type: {work_type}")
    print(f"Filter By Company: {filter_by_company}")
    print("----------------------------------------\n")
    
    # API endpoint and key
    api_key = "67e19812b136d19387075104"
    url = "https://api.scrapingdog.com/linkedinjobs"
    
    # Set up parameters for the API call
    params = {
        "api_key": api_key,
        "field": field,
        "geoid": geoid,
        "page": 1,
        "sortBy": sort_by,
        "jobType": job_type,
        "expLevel": exp_level,
        "workType": work_type,
        "filterByCompany": filter_by_company
    }
    
    # Remove empty parameters
    params = {k: v for k, v in params.items() if v}
    
    try:
        # Make the API call
        response = requests.get(url, params=params)
        
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({
                "error": f"Request failed with status code: {response.status_code}",
                "message": response.text
            }), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Routes for placement data
@app.route('/placements', methods=['GET'])
@jwt_required()
def get_placements():
    try:
        placements = Placement.query.order_by(Placement.created_at.desc()).all()
        
        result = []
        for placement in placements:
            # Get people associated with this placement
            people = PlacementPerson.query.filter_by(placement_id=placement.id).all()
            
            people_data = []
            for person in people:
                people_data.append({
                    'id': person.id,
                    'name': person.name,
                    'resume_url': person.resume_url
                })
            
            result.append({
                'id': placement.id,
                'company': placement.company,
                'type': placement.type,
                'mode': placement.mode,
                'year': placement.year,
                'role': placement.role,
                'referral': placement.referral,
                'created_at': placement.created_at.isoformat(),
                'created_by': placement.created_by,
                'people': people_data
            })
        
        return jsonify({'placements': result}), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching placements: {str(e)}'}), 500

@app.route('/placements', methods=['POST'])
@jwt_required()
def add_placement():
    try:
        current_user = get_jwt_identity()
        
        # Get form data
        company = request.form.get('company')
        placement_type = request.form.get('type')
        mode = request.form.get('mode')
        year = request.form.get('year')
        role = request.form.get('role')
        referral = request.form.get('referral')
        
        # Validate required fields
        if not company or not placement_type or not mode or not year or not role:
            return jsonify({'message': 'Missing required fields'}), 400
        
        # Create new placement
        new_placement = Placement(
            company=company,
            type=placement_type,
            mode=mode,
            year=year,
            role=role,
            referral=referral,
            created_by=current_user
        )
        
        db.session.add(new_placement)
        db.session.flush()  # Get the ID without committing
        
        # Process people data
        people_data = []
        
        # Determine how many people were submitted
        person_count = 0
        for key in request.form.keys():
            if key.startswith('people[') and key.endswith('][name]'):
                person_count = max(person_count, int(key.split('[')[1].split(']')[0]) + 1)
        
        for i in range(person_count):
            name_key = f'people[{i}][name]'
            name = request.form.get(name_key)
            
            if name:
                resume_url = None
                resume_public_id = None
                
                # Check if a resume was uploaded for this person
                resume_key = f'people[{i}][resume]'
                if resume_key in request.files and request.files[resume_key].filename:
                    file = request.files[resume_key]
                    
                    # if not allowe 
                    # file = request.files[resume_key]
                    
                    if not allowed_file(file.filename):
                        return jsonify({'message': f'Invalid file type for resume. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'}), 400
                    
                    # Upload to Cloudinary
                    upload_result = cloudinary.uploader.upload(
                        file,
                        folder="placements",
                        resource_type="raw"
                    )
                    
                    resume_url = upload_result.get('secure_url')
                    resume_public_id = upload_result.get('public_id')
                
                # Create person record
                new_person = PlacementPerson(
                    placement_id=new_placement.id,
                    name=name,
                    resume_url=resume_url,
                    resume_public_id=resume_public_id
                )
                
                db.session.add(new_person)
                
                people_data.append({
                    'name': name,
                    'resume_url': resume_url
                })
        
        db.session.commit()
        
        return jsonify({
            'message': 'Placement added successfully',
            'placement': {
                'id': new_placement.id,
                'company': new_placement.company,
                'type': new_placement.type,
                'mode': new_placement.mode,
                'year': new_placement.year,
                'role': new_placement.role,
                'referral': new_placement.referral,
                'people': people_data
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error adding placement: {str(e)}'}), 500

@app.route('/placements/search', methods=['GET'])
@jwt_required()
def search_placements():
    try:
        # Get search parameters
        company = request.args.get('company', '')
        year = request.args.get('year', '')
        placement_type = request.args.get('type', '')
        
        # Build the query
        query = Placement.query
        
        if company:
            query = query.filter(Placement.company.like(f'%{company}%'))
        
        if year:
            query = query.filter(Placement.year == year)
        
        if placement_type:
            query = query.filter(Placement.type == placement_type)
        
        # Get results
        placements = query.order_by(Placement.created_at.desc()).all()
        
        result = []
        for placement in placements:
            # Get people associated with this placement
            people = PlacementPerson.query.filter_by(placement_id=placement.id).all()
            
            people_data = []
            for person in people:
                people_data.append({
                    'id': person.id,
                    'name': person.name,
                    'resume_url': person.resume_url
                })
            
            result.append({
                'id': placement.id,
                'company': placement.company,
                'type': placement.type,
                'mode': placement.mode,
                'year': placement.year,
                'role': placement.role,
                'referral': placement.referral,
                'created_at': placement.created_at.isoformat(),
                'created_by': placement.created_by,
                'people': people_data
            })
        
        return jsonify({'placements': result}), 200
    except Exception as e:
        return jsonify({'message': f'Error searching placements: {str(e)}'}), 500


# Routes for interview experiences
@app.route('/interview-experiences', methods=['GET'])
@jwt_required()
def get_interview_experiences():
    try:
        # Get search parameters
        company = request.args.get('company', '')
        year = request.args.get('year', '')
        interview_type = request.args.get('type', '')
        
        # Build the query
        query = InterviewExperience.query
        
        if company:
            query = query.filter(InterviewExperience.company.like(f'%{company}%'))
        
        if year:
            query = query.filter(InterviewExperience.year == year)
        
        if interview_type:
            query = query.filter(InterviewExperience.type == interview_type)
        
        # Get results
        interviews = query.order_by(InterviewExperience.created_at.desc()).all()
        
        result = []
        for interview in interviews:
            # Get questions associated with this interview
            questions = InterviewQuestion.query.filter_by(interview_id=interview.id).all()
            
            questions_data = []
            for question in questions:
                questions_data.append({
                    'id': question.id,
                    'question': question.question,
                    'answer': question.answer
                })
            
            # Parse tags
            tags = interview.tags.split(',') if interview.tags else []
            
            result.append({
                'id': interview.id,
                'company': interview.company,
                'candidateName': interview.candidate_name,
                'interviewerName': interview.interviewer_name,
                'year': interview.year,
                'type': interview.type,
                'tips': interview.tips,
                'created_at': interview.created_at.isoformat(),
                'created_by': interview.created_by,
                'tags': tags,
                'questions': questions_data
            })
        
        return jsonify({'interviews': result}), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching interview experiences: {str(e)}'}), 500

@app.route('/interview-experiences', methods=['POST'])
@jwt_required()
def add_interview_experience():
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        # Validate required fields
        if not data.get('company') or not data.get('candidateName') or not data.get('year') or not data.get('type'):
            return jsonify({'message': 'Missing required fields'}), 400
        
        if not data.get('questions') or len(data.get('questions')) == 0:
            return jsonify({'message': 'At least one question is required'}), 400
        
        # Process tags
        tags = ','.join(data.get('tags', [])) if data.get('tags') else ''
        
        # Create new interview experience
        new_interview = InterviewExperience(
            company=data.get('company'),
            candidate_name=data.get('candidateName'),
            interviewer_name=data.get('interviewerName', ''),
            year=data.get('year'),
            type=data.get('type'),
            tips=data.get('tips', ''),
            created_by=current_user,
            tags=tags
        )
        
        db.session.add(new_interview)
        db.session.flush()  # Get the ID without committing
        
        # Process questions
        questions_data = []
        for q in data.get('questions', []):
            if q.get('question') and q.get('answer'):
                new_question = InterviewQuestion(
                    interview_id=new_interview.id,
                    question=q.get('question'),
                    answer=q.get('answer')
                )
                
                db.session.add(new_question)
                
                questions_data.append({
                    'question': q.get('question'),
                    'answer': q.get('answer')
                })
        
        db.session.commit()
        
        return jsonify({
            'message': 'Interview experience added successfully',
            'interview': {
                'id': new_interview.id,
                'company': new_interview.company,
                'candidateName': new_interview.candidate_name,
                'interviewerName': new_interview.interviewer_name,
                'year': new_interview.year,
                'type': new_interview.type,
                'tips': new_interview.tips,
                'tags': data.get('tags', []),
                'questions': questions_data
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error adding interview experience: {str(e)}'}), 500

@app.route('/interview-experiences/<int:interview_id>', methods=['GET'])
@jwt_required()
def get_interview_experience(interview_id):
    try:
        interview = InterviewExperience.query.get(interview_id)
        
        if not interview:
            return jsonify({'message': 'Interview experience not found'}), 404
        
        # Get questions associated with this interview
        questions = InterviewQuestion.query.filter_by(interview_id=interview.id).all()
        
        questions_data = []
        for question in questions:
            questions_data.append({
                'id': question.id,
                'question': question.question,
                'answer': question.answer
            })
        
        # Parse tags
        tags = interview.tags.split(',') if interview.tags else []
        
        return jsonify({
            'interview': {
                'id': interview.id,
                'company': interview.company,
                'candidateName': interview.candidate_name,
                'interviewerName': interview.interviewer_name,
                'year': interview.year,
                'type': interview.type,
                'tips': interview.tips,
                'created_at': interview.created_at.isoformat(),
                'created_by': interview.created_by,
                'tags': tags,
                'questions': questions_data
            }
        }), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching interview experience: {str(e)}'}), 500


# @app.route('/api/duckduckgo-search', methods=['GET'])
# def duckduckgo_search():
#     query = request.args.get('q')
    
#     if not query:
#         return jsonify({'error': 'Missing search query'}), 400
    
#     try:
#         # DuckDuckGo search
#         headers = {
#             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
#         }
#         response = requests.get(
#             f'https://html.duckduckgo.com/html/?q={query}',
#             headers=headers
#         )
        
#         if response.status_code != 200:
#             return jsonify({'error': 'Failed to fetch search results'}), 500
        
#         # Parse the HTML response
#         soup = BeautifulSoup(response.text, 'html.parser')
#         results = []
        
#         # Extract search results
#         for result in soup.select('.result'):
#             title_elem = result.select_one('.result__a')
#             snippet_elem = result.select_one('.result__snippet')
            
#             if title_elem and title_elem.get('href'):
#                 title = title_elem.get_text(strip=True)
#                 url = title_elem.get('href')
#                 description = snippet_elem.get_text(strip=True) if snippet_elem else ''
                
#                 results.append({
#                     'title': title,
#                     'url': url,
#                     'description': description
#                 })
        
#         return jsonify({'results': results})
    
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
# app.py (Flask backend)


@app.route('/api/search-dsa', methods=['POST'])
def search_dsa():
    data = request.json
    query = data.get('query', '')
    sites = data.get('sites', [])
    
    if not query:
        return jsonify({"error": "Query is required"}), 400
    
    # Format site-specific search query for DuckDuckGo
    site_restrictions = " OR ".join([f"site:{site}" for site in sites])
    search_query = f"{query} ({site_restrictions})"
    
    try:
        # Using DuckDuckGo HTML API (they don't have an official API)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(
            f"https://html.duckduckgo.com/html/?q={search_query}",
            headers=headers
        )
        
        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch search results"}), 500
        
        # Parse the HTML response
        soup = BeautifulSoup(response.text, 'html.parser')
        results = []
        
        # Extract search results
        for result in soup.select('.result'):
            title_elem = result.select_one('.result__title')
            url_elem = result.select_one('.result__url')
            snippet_elem = result.select_one('.result__snippet')
            
            if title_elem and url_elem:
                title = title_elem.get_text(strip=True)
                url = url_elem.get('href') if url_elem.get('href') else url_elem.get_text(strip=True)
                
                # Clean URL if it's from DuckDuckGo's redirect
                if '/duckduckgo.com/' in url:
                    url_match = re.search(r'uddg=([^&]+)', url)
                    if url_match:
                        url = requests.utils.unquote(url_match.group(1))
                
                # Identify source website
                source = None
                for site in sites:
                    if site in url:
                        source = site
                        break
                
                snippet = snippet_elem.get_text(strip=True) if snippet_elem else ""
                
                results.append({
                    "title": title,
                    "url": url,
                    "snippet": snippet,
                    "source": source
                })
                
                # Limit to 10 results
                if len(results) >= 20:
                    break
        
        return jsonify({"results": results})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# classroom type discussion backend
@app.route('/api/classroom/create', methods=['POST'])
@jwt_required()
def create_classroom():
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        if not data or not data.get('name'):
            return jsonify({'message': 'Classroom name is required'}), 400
        
        new_classroom = Classroom(
            name=data.get('name'),
            description=data.get('description', ''),
            created_by=current_user
        )
        
        db.session.add(new_classroom)
        db.session.flush()  # Get the ID without committing
        
        # Add creator as a member
        membership = ClassroomMembership(
            user_id=current_user,
            classroom_id=new_classroom.id
        )
        
        db.session.add(membership)
        db.session.commit()
        
        return jsonify({
            'message': 'Classroom created successfully',
            'classroom': {
                'id': new_classroom.id,
                'name': new_classroom.name,
                'description': new_classroom.description,
                'created_by': new_classroom.created_by,
                'created_at': new_classroom.created_at.isoformat()
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error creating classroom: {str(e)}'}), 500

@app.route('/api/classroom/join', methods=['POST'])
@jwt_required()
def join_classroom():
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        if not data or not data.get('classroom_id'):
            return jsonify({'message': 'Classroom ID is required'}), 400
        
        classroom_id = data.get('classroom_id')
        
        # Check if classroom exists
        classroom = Classroom.query.get(classroom_id)
        if not classroom:
            return jsonify({'message': 'Classroom not found'}), 404
        
        # Check if user is already a member
        existing_membership = ClassroomMembership.query.filter_by(
            user_id=current_user,
            classroom_id=classroom_id
        ).first()
        
        if existing_membership:
            return jsonify({'message': 'You are already a member of this classroom'}), 400
        
        # Add user as a member
        membership = ClassroomMembership(
            user_id=current_user,
            classroom_id=classroom_id
        )
        
        db.session.add(membership)
        db.session.commit()
        
        return jsonify({
            'message': 'Joined classroom successfully',
            'classroom': {
                'id': classroom.id,
                'name': classroom.name,
                'description': classroom.description,
                'created_by': classroom.created_by,
                'created_at': classroom.created_at.isoformat()
            }
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error joining classroom: {str(e)}'}), 500

@app.route('/api/classrooms', methods=['GET'])
@jwt_required()
def get_classrooms():
    try:
        current_user = get_jwt_identity()
        
        # Get all classrooms the user is a member of
        memberships = ClassroomMembership.query.filter_by(user_id=current_user).all()
        classroom_ids = [membership.classroom_id for membership in memberships]
        
        classrooms = Classroom.query.filter(Classroom.id.in_(classroom_ids)).all()
        
        result = []
        for classroom in classrooms:
            result.append({
                'id': classroom.id,
                'name': classroom.name,
                'description': classroom.description,
                'created_by': classroom.created_by,
                'created_at': classroom.created_at.isoformat()
            })
        
        return jsonify({'classrooms': result}), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching classrooms: {str(e)}'}), 500

@app.route('/api/classroom/<int:classroom_id>/message', methods=['POST'])
@jwt_required()
def send_message(classroom_id):
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        if not data or not data.get('content'):
            return jsonify({'message': 'Message content is required'}), 400
        
        # Check if classroom exists
        classroom = Classroom.query.get(classroom_id)
        if not classroom:
            return jsonify({'message': 'Classroom not found'}), 404
        
        # Check if user is a member
        membership = ClassroomMembership.query.filter_by(
            user_id=current_user,
            classroom_id=classroom_id
        ).first()
        
        if not membership:
            return jsonify({'message': 'You are not a member of this classroom'}), 403
        
        # Create new message
        new_message = ClassroomMessage(
            user_id=current_user,
            classroom_id=classroom_id,
            content=data.get('content')
        )
        
        db.session.add(new_message)
        db.session.commit()
        
        return jsonify({
            'message': 'Message sent successfully',
            'message': {
                'id': new_message.id,
                'user_id': new_message.user_id,
                'content': new_message.content,
                'timestamp': new_message.timestamp.isoformat()
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error sending message: {str(e)}'}), 500

@app.route('/api/classroom/<int:classroom_id>/messages', methods=['GET'])
@jwt_required()
def get_messages(classroom_id):
    try:
        current_user = get_jwt_identity()
        
        # Check if classroom exists
        classroom = Classroom.query.get(classroom_id)
        if not classroom:
            return jsonify({'message': 'Classroom not found'}), 404
        
        # Check if user is a member
        membership = ClassroomMembership.query.filter_by(
            user_id=current_user,
            classroom_id=classroom_id
        ).first()
        
        if not membership:
            return jsonify({'message': 'You are not a member of this classroom'}), 403
        
        # Get all messages for this classroom
        messages = ClassroomMessage.query.filter_by(classroom_id=classroom_id).order_by(ClassroomMessage.timestamp.asc()).all()
        
        result = []
        for message in messages:
            result.append({
                'id': message.id,
                'user_id': message.user_id,
                'content': message.content,
                'timestamp': message.timestamp.isoformat()
            })
        
        return jsonify({'messages': result}), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching messages: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)

