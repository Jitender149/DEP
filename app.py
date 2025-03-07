# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
# from werkzeug.utils import secure_filename
# from werkzeug.security import check_password_hash
# from werkzeug.security import generate_password_hash
# import boto3
# import os
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()

# # Initialize app
# app = Flask(__name__)
# from flask_cors import CORS
# CORS(app)

# # Configurations
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
# app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET')
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Allow files up to 16 MB
# # app.config['UPLOAD_FOLDER'] = 'uploads'
# # os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# db = SQLAlchemy(app)
# jwt = JWTManager(app)

# # AWS S3 Configuration
# S3_BUCKET_NAME = os.getenv('S3_BUCKET_NAME')
# S3_REGION = os.getenv('S3_REGION')
# s3_client = boto3.client(
#     's3',
#     aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
#     aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
# )

# # Models
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     password = db.Column(db.String(200), nullable=False)

# class Upload(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     author = db.Column(db.String(80), nullable=False)
#     course_code = db.Column(db.String(20), nullable=False)
#     description = db.Column(db.String(200), nullable=False)
#     tags = db.Column(db.String(200), nullable=False)  # Comma-separated tags
#     file_url = db.Column(db.String(500), nullable=True)  # File path or link
#     upvotes = db.Column(db.Integer, default=0)
#     downvotes = db.Column(db.Integer, default=0)

# class Comment(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     upload_id = db.Column(db.Integer, db.ForeignKey('upload.id'), nullable=False)
#     author = db.Column(db.String(80), nullable=False)
#     text = db.Column(db.String(500), nullable=False)

# # Initialize database
# # @app.before_first_request
# # def create_tables():
# #     db.create_all()

# # Helper function for allowed file extensions
# ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'docx', 'txt'}
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# # Routes
# @app.route('/signup', methods=['POST'])
# def signup():
#     data = request.get_json()
#     hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')  # Hash password in production!
#     new_user = User(username=data['username'], password=hashed_password)
#     db.session.add(new_user)
#     db.session.commit()
#     return jsonify({'message': 'User created successfully'}), 201

# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     user = User.query.filter_by(username=data['username']).first()

#     if not user or not check_password_hash(user.password, data['password']):
#         return jsonify({'message': 'Invalid credentials'}), 401
#     access_token = create_access_token(identity={'username': user.username})
#     return jsonify({'access_token': access_token}), 200

# @app.route('/uploads', methods=['POST'])
# @jwt_required()
# def upload_file():
#     current_user = get_jwt_identity()

#     if 'file' not in request.files:
#         return jsonify({'message': 'No file part'}), 400

#     file = request.files['file']
    
#     if file.filename == '':
#         return jsonify({'message': 'No selected file'}), 400

#     if file and allowed_file(file.filename):
#         try:
#             # Secure the filename and upload to S3
#             filename = secure_filename(file.filename)
#             s3_client.upload_fileobj(
#                 file,
#                 S3_BUCKET_NAME,
#                 filename,
#                 ExtraArgs={"ACL": "public-read"}
#             )
#             file_url = f"https://{S3_BUCKET_NAME}.s3.{S3_REGION}.amazonaws.com/{filename}"

#             # Save metadata in the database
#             data = request.form
#             new_upload = Upload(
#                 author=current_user['username'],
#                 course_code=data['course_code'],
#                 description=data['description'],
#                 tags=','.join(data.getlist('tags')),
#                 file_url=file_url
#             )
#             db.session.add(new_upload)
#             db.session.commit()

#             return jsonify({'message': 'File uploaded successfully', 'file_url': file_url}), 201

#         except Exception as e:
#             return jsonify({'message': f'Error uploading file: {str(e)}'}), 500

#     return jsonify({'message': 'File type not allowed'}), 400

# @app.route('/uploads/<int:upload_id>/vote', methods=['POST'])
# @jwt_required()
# def vote(upload_id):
#     data = request.get_json()
#     upload_item = Upload.query.get(upload_id)
    
#     if not upload_item:
#         return jsonify({'message': 'Upload not found'}), 404

#     if data['type'] == 'upvote':
#         upload_item.upvotes += 1
#     elif data['type'] == 'downvote':
#         upload_item.downvotes += 1
    
#     db.session.commit()
#     return jsonify({'message': f"{data['type']} recorded successfully"})

# @app.route('/uploads/<int:upload_id>/comments', methods=['POST'])
# @jwt_required()
# def comment(upload_id):
#     data = request.get_json()
#     current_user = get_jwt_identity()
    
#     new_comment = Comment(
#         upload_id=upload_id,
#         author=current_user['username'],
#         text=data['text']
#     )
    
#     db.session.add(new_comment)
#     db.session.commit()
    
#     return jsonify({'message': 'Comment added successfully'})

# if __name__ == '__main__':
#     with app.app_context():
#         db.create_all()  # Create database tables if they don't exist
#     app.run(debug=True)



from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
import boto3
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize app
app = Flask(__name__)
from flask_cors import CORS
CORS(app)

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Allow files up to 16 MB

db = SQLAlchemy(app)
jwt = JWTManager(app)

# AWS S3 Configuration
S3_BUCKET_NAME = os.getenv('S3_BUCKET_NAME')
S3_REGION = os.getenv('S3_REGION')
s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(80), nullable=False)
    course_code = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    tags = db.Column(db.String(200), nullable=False)  # Comma-separated tags
    file_url = db.Column(db.String(500), nullable=True)  # File path or link
    upvotes = db.Column(db.Integer, default=0)
    downvotes = db.Column(db.Integer, default=0)
    year = db.Column(db.String(10), nullable=True)  # Added year field
    semester = db.Column(db.String(20), nullable=True)  # Added semester field

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    upload_id = db.Column(db.Integer, db.ForeignKey('upload.id'), nullable=False)
    author = db.Column(db.String(80), nullable=False)
    text = db.Column(db.String(500), nullable=False)

# Helper function for allowed file extensions
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'docx', 'txt'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Routes
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
    access_token = create_access_token(identity={'username': user.username})
    return jsonify({'access_token': access_token}), 200

@app.route('/uploads', methods=['POST'])
@jwt_required()
def upload_file():
    current_user = get_jwt_identity()
    
    # Handle link-only uploads
    if 'file' not in request.files and 'link' in request.form:
        try:
            # Save metadata in the database
            data = request.form
            new_upload = Upload(
                author=current_user['username'],
                course_code=data['course_code'],
                description=data['description'],
                tags=','.join(data.getlist('tags')),
                file_url=data['link'],
                year=data.get('year', ''),
                semester=data.get('semester', '')
            )
            db.session.add(new_upload)
            db.session.commit()

            return jsonify({'message': 'Link uploaded successfully', 'file_url': data['link']}), 201
        except Exception as e:
            return jsonify({'message': f'Error uploading link: {str(e)}'}), 500

    # Handle file uploads
    if 'file' not in request.files:
        return jsonify({'message  500'})

    # Handle file uploads
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        try:
            # Secure the filename and upload to S3
            filename = secure_filename(file.filename)
            s3_client.upload_fileobj(
                file,
                S3_BUCKET_NAME,
                filename,
                ExtraArgs={"ACL": "public-read"}
            )
            file_url = f"https://{S3_BUCKET_NAME}.s3.{S3_REGION}.amazonaws.com/{filename}"

            # Save metadata in the database
            data = request.form
            new_upload = Upload(
                author=current_user['username'],
                course_code=data['course_code'],
                description=data['description'],
                tags=','.join(data.getlist('tags')),
                file_url=file_url,
                year=data.get('year', ''),
                semester=data.get('semester', '')
            )
            db.session.add(new_upload)
            db.session.commit()

            return jsonify({'message': 'File uploaded successfully', 'file_url': file_url}), 201

        except Exception as e:
            return jsonify({'message': f'Error uploading file: {str(e)}'}), 500

    return jsonify({'message': 'File type not allowed'}), 400

@app.route('/uploads/<int:upload_id>/vote', methods=['POST'])
@jwt_required()
def vote(upload_id):
    data = request.get_json()
    upload_item = Upload.query.get(upload_id)
    
    if not upload_item:
        return jsonify({'message': 'Upload not found'}), 404

    if data['type'] == 'upvote':
        upload_item.upvotes += 1
    elif data['type'] == 'downvote':
        upload_item.downvotes += 1
    
    db.session.commit()
    return jsonify({'message': f"{data['type']} recorded successfully"})

@app.route('/uploads/<int:upload_id>/comments', methods=['POST'])
@jwt_required()
def comment(upload_id):
    data = request.get_json()
    current_user = get_jwt_identity()
    
    new_comment = Comment(
        upload_id=upload_id,
        author=current_user['username'],
        text=data['text']
    )
    
    db.session.add(new_comment)
    db.session.commit()
    
    return jsonify({'message': 'Comment added successfully'})

@app.route('/recent-uploads', methods=['GET'])
@jwt_required()
def recent_uploads():
    # Get the 10 most recent uploads
    uploads = Upload.query.order_by(Upload.id.desc()).limit(10).all()
    
    materials = []
    for upload in uploads:
        materials.append({
            'id': upload.id,
            'author': upload.author,
            'course_code': upload.course_code,
            'description': upload.description,
            'tags': upload.tags,
            'file_url': upload.file_url,
            'upvotes': upload.upvotes,
            'downvotes': upload.downvotes,
            'year': upload.year,
            'semester': upload.semester
        })
    
    return jsonify({'materials': materials}), 200

@app.route('/search', methods=['GET'])
@jwt_required()
def search_materials():
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
    results = query.all()
    
    # Filter by tags if provided
    if tags:
        filtered_results = []
        for upload in results:
            upload_tags = upload.tags.split(',')
            # Count how many of the search tags match this upload
            matching_tags = sum(1 for tag in tags if tag in upload_tags)
            if matching_tags > 0:
                # Add the upload with its matching tag count for sorting
                filtered_results.append((upload, matching_tags))
        
        # Sort by number of matching tags (descending)
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
            'tags': upload.tags,
            'file_url': upload.file_url,
            'upvotes': upload.upvotes,
            'downvotes': upload.downvotes,
            'year': upload.year,
            'semester': upload.semester
        })
    
    return jsonify({'materials': materials}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables if they don't exist
    app.run(debug=True)

