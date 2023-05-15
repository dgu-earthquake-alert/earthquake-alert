#!/bin/bash
if ! command -v docker &> /dev/null
then
    sudo yum update -y
    sudo yum install -y docker
    sudo usermod -a -G docker ec2-user
fi
if ! command -v aws &> /dev/null
then
    sudo yum install -y awscli
fi
if ! command -v jq &> /dev/null
then
    sudo yum install jq
fi
if ! command -v docker-compose &> /dev/null
then
    VERSION=$(curl --silent https://api.github.com/repos/docker/compose/releases/latest | jq .name -r)
    DESTINATION=/usr/bin/docker-compose
    sudo curl -L https://github.com/docker/compose/releases/download/${VERSION}/docker-compose-$(uname -s)-$(uname -m) -o $DESTINATION
    sudo chmod 755 $DESTINATION
fi
sudo service docker start
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 646695010239.dkr.ecr.ap-northeast-2.amazonaws.com
sudo docker pull 646695010239.dkr.ecr.ap-northeast-2.amazonaws.com/earthquake-alert-backend-ecr:backend-latest
sudo docker pull 646695010239.dkr.ecr.ap-northeast-2.amazonaws.com/earthquake-alert-frontend-ecr:frontend-latest
