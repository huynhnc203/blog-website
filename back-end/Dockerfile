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
ARG password="2003NguyeN:"
ENV STAGE="DEPLOYING"
ENV username=$username
ENV password=$password
ENV external_url="YOUR_EXTERNAL_URL"
ENV OPENAI_API="YOUR_OPENAI

# Install PostgreSQL client

EXPOSE 8000

# Set entrypoint and default command (if needed)
CMD ["python3", "server.py"]

