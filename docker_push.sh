set -x

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker build . -t profx5/ico_portal:latest && docker push profx5/ico_portal:latest
