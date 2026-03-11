# Docker Assignment

Simple Flask app demonstrating Docker build and run.

## Files

- `app.py`: Flask application listens on port 5050.
- `Dockerfile`: builds a container based on Python 3.11-slim.
- `requirements.txt`: Python dependencies.

## Usage

```bash
# build image
cd docker-assignment

docker build -t flask-docker-app .

# run container

docker run -p 5050:5050 flask-docker-app
```
