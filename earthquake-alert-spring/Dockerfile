FROM openjdk:11

WORKDIR /app
COPY gradlew build.gradle settings.gradle ./
COPY gradle ./gradle

RUN ./gradlew --no-daemon dependencies
COPY src ./src

RUN ./gradlew --no-daemon build -x test
RUN mkdir -p target && (cd build/libs && cp earthquake-alert-spring-0.0.1-SNAPSHOT.jar ../../target/earthquake-alert-spring.jar)

CMD ["java", "-jar", "target/earthquake-alert-spring.jar"]
#use 8080 port
EXPOSE 8080

