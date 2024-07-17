from flask import (
    Flask,
    request,
    jsonify,
    redirect,
    url_for,
    send_from_directory,
    render_template,
)
from werkzeug.utils import secure_filename
import os
import sql_conn
from flask_cors import CORS

import smtplib
import random
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

result = sql_conn.sql_connnection()

app = Flask(__name__)

# Set the upload folder
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


CORS(app, resources={r"/*": {"origins": "*"}})


def rearrange(update, to_update):
    items = list(update.items())
    items.insert(2, to_update)
    return dict(items)


@app.route("/")
def home():
    return jsonify(message="Hello, World!")


@app.route("/about")
def about():
    return jsonify(message="This is the about page.")


@app.route("/uploads/<filename>")
def logo(filename):
    print(app.config["UPLOAD_FOLDER"], filename)
    return send_from_directory(UPLOAD_FOLDER, filename)
    # return jsonify("hello")


# admin routes
@app.route("/admin", methods=["POST", "GET", "PUT"])
def amdin_register():
    if request.method == "POST":
        data = request.json
        the_rs = result.add_data("admin", data)
        print(the_rs)
        return jsonify(the_rs)

    if request.method == "GET":
        print("get request")
        the_rs = result.get_data("admin")
        print("fetched data is", the_rs)
        return jsonify(the_rs)

    if request.method == "PUT":
        data = request.json
        the_rs = result.update("admin", data)
        print("the update data", the_rs)
        return jsonify(data)


# candidates
@app.route("/candidates", methods=["POST", "GET", "PUT", "DELETE"])
def candidate_register():
    if request.method == "POST":
        # data = request.json
        file = request.files["logo"]
        # If user does not select file, browser also submit an empty part without filename
        if file.filename == "":
            return jsonify({"error": "No selected file"}), 400
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
            print(
                "file folder saved in",
                os.path.join(app.config["UPLOAD_FOLDER"], filename),
            )
            formData = request.form.to_dict()
            the_rs = result.add_data(
                "candidates",
                rearrange(
                    formData,
                    ("logo", os.path.join(app.config["UPLOAD_FOLDER"], filename)),
                ),
            )

            print("the result is", the_rs)
            return (
                jsonify(
                    {"message": "File successfully uploaded", "filename": filename}
                ),
                200,
            )
        return jsonify({"error": "File type not allowed"}), 400
    # return jsonify(the_rs)

    if request.method == "GET":
        print("get request")
        the_rs = result.get_data("candidates")
        print("fetched data is", the_rs)
        return jsonify(the_rs)

    if request.method == "PUT":
        data = request.json
        the_rs = result.update("candidates", data)
        print("the update data", the_rs)
        return jsonify(data)


@app.route("/candidates/<name>", methods=["DELETE", "OPTIONS"])
def candidate_spec(name):
    if request.method == "DELETE":
        print("delete request")
        the_rs = result.delete("candidates", data=f"name='{name}'")
        print(the_rs)
        return jsonify(the_rs)
    if request.method == "OPTIONS":
        print("delete request")
        the_rs = result.delete("candidates", data=f"name='{name}'")
        print(the_rs)
        return jsonify(the_rs)


@app.route("/votes/<name>")
def one_candidate(name):
    print("get request")
    the_rs = result.get_one("votes", data=f"candidate='{name}'")
    print("fetched data is", the_rs)
    return jsonify(the_rs)


# admin login
@app.route("/admin/login", methods=["POST"])
def admin_login():
    data = request.json
    the_rs = result.get_one("admin", data=f"name='{data['name']}'")
    print("the input", data)
    print("the result", the_rs)
    if the_rs[0][0] == data["name"] and the_rs[0][3] == data["password"]:
        return jsonify(the_rs)
    else:
        return "not authorized"


@app.route("/add-voter", methods=["POST"])
def data():
    data = request.json
    return jsonify(received_data=data)


# voter
@app.route("/voter/login", methods=["POST"])
def voter_login():
    data = request.json
    the_rs = result.get_one("voter", data=f"voter_id='{data['id']}'")
    print("the input", data)
    print("the result", the_rs)
    print(the_rs[0][0])
    print(data["id"])
    print(the_rs[0][4])
    print(data["password"])
    if the_rs[0][0] == data["id"] and the_rs[0][4] == data["password"]:
        return jsonify(the_rs)
    else:
        return "not authorized"


@app.route("/voter", methods=["POST", "GET", "PUT"])
def log_data():
    if request.method == "POST":
        data = request.json
        the_rs = result.add_data("voter", data)
        return jsonify(the_rs)

    if request.method == "GET":
        the_rs = result.get_data("voter")
        print("voters", the_rs)
        return jsonify(the_rs)

    if request.method == "PUT":
        data = request.json
        the_rs = result.update("voter", data)
        print("the update data", the_rs)
        return jsonify(data)


# OTP
@app.route("/send-otp", methods=["POST"])
def otp():
    if request.method == "POST":
        email = request.json['gmail']
        print(email)
        print("send otp")
        sender_email = "nagarajmnaiknagaraj@gmail.com"  # Replace with your email
        sender_password = "jmmj rjvh jjvl jjvo"  # Replace with your email password
        recipient_email = email

        otp_gen = str(random.randint(100000, 999999))

        subject = "Your OTP Code"
        body = f"Your OTP code is {otp_gen}"

        # Create the email
        msg = MIMEMultipart()
        msg["From"] = sender_email
        msg["To"] = recipient_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        try:
            # Connect to the server
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(sender_email, sender_password)

            # Send the email
            server.sendmail(sender_email, recipient_email, msg.as_string())

            # Disconnect from the server
            server.quit()

            print("OTP sent successfully")
            return jsonify({"otp":str(otp_gen)})
        except Exception as e:
            print(f"Failed to send OTP: {e}")
            return jsonify("NOT SENT")


# VOTES
@app.route("/votes", methods=["POST", "GET"])
def votes():
    if request.method == "POST":
        data = request.json
        the_rs = result.add_data("votes", data)
        return jsonify(the_rs)

    if request.method == "GET":
        the_rs = result.get_data("votes")
        print(the_rs)
        return jsonify(the_rs)


# admin + voter
@app.route("/votes/<voter_id>")
def show_user_profile(voter_id):
    return jsonify(user=voter_id)


# file upload
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/upload", methods=["POST"])
def upload_file():
    print(request.files)
    if "file" not in request.files:
        return redirect(request.url)
    file = request.files["file"]
    if file.filename == "":
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        return redirect(url_for("uploaded_file", filename=filename))
    return redirect(request.url)


@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return f"File successfully uploaded: {filename}"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)
