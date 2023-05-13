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
sudo service docker start
aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 646695010239.dkr.ecr.ap-southeast-2.amazonaws.com
docker pull 646695010239.dkr.ecr.ap-southeast-2.amazonaws.com/earthquake-alert-backend-ecr:backend-latest
docker pull 646695010239.dkr.ecr.ap-southeast-2.amazonaws.com/earthquake-alert-frontend-ecr:frontend-latest
