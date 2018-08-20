set -x

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker build . -t $1 --label "commit=$2" && docker push $1
