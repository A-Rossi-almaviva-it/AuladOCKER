# Create image
docker build . -t nodejsexpress

# Run image
docker run -dp 8081:8081 --name nodejsexpress nodejsexpress

# Stop image
docker stop nodejsexpress

# Start image
docker start nodejsexpress