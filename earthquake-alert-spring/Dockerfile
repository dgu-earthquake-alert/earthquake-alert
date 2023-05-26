FROM openjdk:11

RUN apt-get update && apt-get install -y dos2unix

# 소스 코드 및 Gradle 종속성 복사
WORKDIR /app

COPY gradlew build.gradle settings.gradle ./
COPY gradle ./gradle

RUN dos2unix gradlew && chmod +x gradlew
RUN ./gradlew --no-daemon dependencies

# 소스 코드 복사
COPY src ./src

RUN find . -type f -name "*.gradle" -exec dos2unix {} \;
RUN find . -type f -name "*.java" -exec dos2unix {} \;

# 소스 코드 빌드
RUN ./gradlew --no-daemon build -x test

# 빌드된 JAR 파일을 복사하여 target 디렉토리에 저장
RUN mkdir -p target && (cd build/libs && cp earthquake-alert-spring-0.0.1-SNAPSHOT.jar ../../target/earthquake-alert-spring.jar)

# 컨테이너 실행 시 MySQL 서버와 JAR 파일 실행
CMD java -jar target/earthquake-alert-spring.jar
