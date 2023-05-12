#!/bin/bash
if ! command -v docker &> /dev/null
then
    sudo yum update -y
    sudo yum install -y docker
    sudo usermod -a -G docker ec2-user
fi
sudo service docker start
