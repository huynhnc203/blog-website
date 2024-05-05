from flask_mail import Message, Mail
from flask import current_app as app

mail = Mail()

def send_email(to, subject, template):
    msg = Message(
        subject, 
        html = template,
        recipients = [to],
        sender = app.config["MAIL_USERNAME"]
    )
    mail.send(msg)