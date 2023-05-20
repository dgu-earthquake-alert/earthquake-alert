FROM openjdk:11

# MySQL 설치를 위한 패키지 설치
RUN apt-get update && apt-get install -y mysql-server

# MySQL 서버 실행 및 구성
RUN service mysql start \
    && mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'" \
    && mysql -e "CREATE DATABASE earthquake" \
    && mysql -e "GRANT ALL PRIVILEGES ON earthquake.* TO 'root'@'localhost'"

# MySQL 포트 매핑
EXPOSE 3306

WORKDIR /app

# Gradle 파일 복사
COPY gradlew build.gradle settings.gradle ./
COPY gradle ./gradle

# Gradle 종속성 설치
RUN ./gradlew --no-daemon dependencies

# 소스 코드 복사
COPY src ./src

# 소스 코드 빌드
RUN ./gradlew --no-daemon build -x test

# 빌드된 JAR 파일을 복사하여 target 디렉토리에 저장
RUN mkdir -p target && (cd build/libs && cp earthquake-alert-spring-0.0.1-SNAPSHOT.jar ../../target/earthquake-alert-spring.jar)

# 컨테이너 실행 시 JAR 파일 실행
CMD ["java", "-jar", "target/earthquake-alert-spring.jar"]
