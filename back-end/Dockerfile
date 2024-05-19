# Use Python 3 base image
FROM python:3

# Set the working directory
WORKDIR /usr/src/app

# Copy requirements.txt to the container
COPY venv venv
COPY requirements.txt requirements.txt

# Install dependencies
RUN pip install -r requirements.txt

RUN apt-get update && \
    apt-get install -y postgresql-client

# Copy the rest of the application code
COPY . .



# Set default user for PostgreSQL
ARG username="postgres"
ARG password="YOUR_DB_PASSWORD"
ENV STAGE="DEPLOYING"
ENV username=$username
ENV password=$password
ENV external_url="YOUR_EXTERNAL_URL"
ENV OPENAI_API="YOUR_OPENAI_API"
ENV DB_HOST="back-end-postgres-1"
ENV DB_PORT="5432"
ENV DB_NAME="Blog_Website"
ENV username="postgres"
ENV password="YOUR_DB_PASSWORD"
ENV EMAIL_PASSWORD="YOUR_EMAIL_PASSWORD"
ENV EMAIL_SENDER="YOUR_EMAIL"
ENV MAIL_PORT="465"
ENV MAIL_SERVER="smtp.gmail.com"
ENV MAIL_USE_SSL="True"
ENV MAIL_USE_TLS="False"
ENV SECRET="YOUR_SECRET"


# Install PostgreSQL client

EXPOSE 8000

# Set entrypoint and default command (if needed)
CMD ["python3", "server.py"]

