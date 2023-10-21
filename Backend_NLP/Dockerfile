# Use the tiangolo/uvicorn-gunicorn-fastapi base image with Python 3.11.1
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the content of the Backend directory into the container at /app
COPY . /app/

# Expose the port that FastAPI runs on
EXPOSE 8000

# Run the FastAPI application using uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
