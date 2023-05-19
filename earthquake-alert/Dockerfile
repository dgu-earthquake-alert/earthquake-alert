FROM node:18.12.1

# 앱 디렉터리 생성
WORKDIR /app

# 앱 의존성 설치
COPY package*.json ./
RUN npm install -g npm@latest
RUN npm install
RUN npm install -g serve

# 앱 소스 추가
COPY . .

# 앱 빌드
RUN npm run build

# 5000 포트로 serve 실행
CMD serve -s build -l 3001
