# Create image
docker build -t nodejsexpress2 .

# Run image
docker run -dp 8083:8083 --name nodejsexpress2 nodejsexpress2

# Stop image
docker stop nodejsexpress2

# Start image
docker start nodejsexpress2