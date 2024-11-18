from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
import mysql.connector
from mysql.connector import Error
import bcrypt
import os
import datetime
import json
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1234@localhost/mydatabase'
app.config['UPLOAD_FOLDER'] = './uploads'
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = os.getenv('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASSWORD')

db = SQLAlchemy(app)
mail = Mail(app)


try:
    db_conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="mydatabase"
    )
    print("Connected to MySQL database")
except Error as e:
    print("Error connecting to MySQL database:", e)

class Room(db.Model):
    __tablename__ = 'rooms'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    location = db.Column(db.String(255))
    description = db.Column(db.Text)
    price = db.Column(db.Float)
    rating = db.Column(db.Float)
    reviews = db.Column(db.Integer)
    beds = db.Column(db.Integer)
    sleeps = db.Column(db.Integer)
    sq_ft = db.Column(db.Integer)
    garden_view = db.Column(db.Boolean)
    wifi = db.Column(db.Boolean)
    washer = db.Column(db.Boolean)
    air_conditioning = db.Column(db.Boolean)
    refrigerator = db.Column(db.Boolean)
    kitchen = db.Column(db.Boolean)
    pets_allowed = db.Column(db.Boolean)
    dryer = db.Column(db.Boolean)
    security_cameras = db.Column(db.Boolean)
    bicycles = db.Column(db.Boolean)
    images = db.Column(db.Text)

class Booking(db.Model):
    __tablename__ = 'hotel_rooms_bookings'
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(255))
    user_email = db.Column(db.String(255))
    total_cost = db.Column(db.Float)
    check_in_date = db.Column(db.Date)
    check_out_date = db.Column(db.Date)
    room_image = db.Column(db.String(255))
    room_name = db.Column(db.String(255))
    status = db.Column(db.String(50), default="Confirmed")
    refund = db.Column(db.Float, nullable=True)
    cancelled_date = db.Column(db.Date, nullable=True)


@app.route("/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    cursor = db_conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    results = cursor.fetchall()

    if results:
        return "Email already registered", 400

    try:
        cursor.execute("INSERT INTO users (name, email, password_hash) VALUES (%s, %s, %s)", (name, email, hashed_password))
        db_conn.commit()
        return "User registered successfully", 201
    except Error as e:
        print("Error inserting new user:", e)
        return "Internal Server Error", 500
    finally:
        cursor.close()


@app.route("/getUser/<email>", methods=["GET"])
def get_user(email):
    cursor = db_conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        return jsonify(user) if user else ("User not found", 404)
    except Error as e:
        print("Error fetching user details:", e)
        return "Error fetching user details", 500
    finally:
        cursor.close()


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    cursor = db_conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    results = cursor.fetchall()

    if not results:
        return "User not found", 404

    user = results[0]
    if bcrypt.checkpw(password.encode("utf-8"), user["password_hash"].encode("utf-8")):
        return "Login successful", 200
    else:
        return "Invalid password", 401

@app.route('/addRoom', methods=['POST'])
def add_room():
    images = []
    for file in request.files.getlist("images"):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        images.append(f"/uploads/{filename}")

    room = Room(
        title=request.form.get("title"),
        location=request.form.get("location"),
        description=request.form.get("description"),
        price=float(request.form.get("price")),
        rating=float(request.form.get("rating")),
        reviews=int(request.form.get("reviews")),
        beds=int(request.form.get("beds")),
        sleeps=int(request.form.get("sleeps")),
        sq_ft=int(request.form.get("sq_ft")),
        garden_view=bool(request.form.get("garden_view")),
        wifi=bool(request.form.get("wifi")),
        washer=bool(request.form.get("washer")),
        air_conditioning=bool(request.form.get("air_conditioning")),
        refrigerator=bool(request.form.get("refrigerator")),
        kitchen=bool(request.form.get("kitchen")),
        pets_allowed=bool(request.form.get("pets_allowed")),
        dryer=bool(request.form.get("dryer")),
        security_cameras=bool(request.form.get("security_cameras")),
        bicycles=bool(request.form.get("bicycles")),
        images=json.dumps(images)
    )

    db.session.add(room)
    db.session.commit()
    return "Room added successfully", 201


@app.route('/getRoom/<int:room_id>', methods=['GET'])
def get_room(room_id):
    room = Room.query.get(room_id)
    return jsonify(room) if room else ("Room not found", 404)

@app.route('/getRooms', methods=['GET'])
def get_rooms():
    rooms = Room.query.all()
    return jsonify([room for room in rooms])


@app.route('/bookRoom', methods=['POST'])
def book_room():
    data = request.json
    booking = Booking(**data)
    db.session.add(booking)
    db.session.commit()

    msg = Message(
        f"Booking Confirmation for {data['room_name']}",
        sender=os.getenv('EMAIL_USER'),
        recipients=[data['user_email']]
    )
    msg.body = f"Dear {data['user_name']},\n\nYour booking for {data['room_name']} has been confirmed.\n\nThank you!"
    mail.send(msg)

    return "Booking successful and confirmation email sent"


@app.route('/cancelBooking', methods=['POST'])
def cancel_booking():
    data = request.json
    booking = Booking.query.get(data['id'])
    if not booking:
        return "Booking not found", 404

    check_in_date = datetime.datetime.strptime(data['check_in_date'], '%Y-%m-%d')
    days_until_check_in = (check_in_date - datetime.datetime.now()).days

    refund = 0
    if days_until_check_in > 1:
        refund = data['total_cost'] * 0.5
    elif days_until_check_in == 1:
        refund = data['total_cost'] * 0.45
    elif days_until_check_in == 0:
        refund = data['total_cost']

    booking.status = 'Cancelled'
    booking.refund = refund
    booking.cancelled_date = datetime.date.today()
    db.session.commit()

    msg = Message(
        f"Booking Cancellation for {data['room_name']}",
        sender=os.getenv('EMAIL_USER'),
        recipients=[data['user_email']]
    )
    msg.body = f"Dear {data['user_name']},\n\nYour booking for {data['room_name']} has been canceled.\nRefund: ${refund}"
    mail.send(msg)

    return jsonify({'success': True, 'refund': refund})


@app.route('/getBookings', methods=['GET'])
def get_bookings():
    bookings = Booking.query.all()
    return jsonify([booking for booking in bookings])


@app.route('/getBookings/<email>', methods=['GET'])
def get_bookings_by_email(email):
    bookings = Booking.query.filter_by(user_email=email).all()
    return jsonify([booking for booking in bookings])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5000, debug=True)

