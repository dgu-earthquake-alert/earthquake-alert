# Stage 1 : Build the app
FROM openjdk:11 as build
WORKDIR /app
COPY gradlew build.gradle settings.gradle ./
COPY gradle ./gradle
COPY src ./src
RUN ./gradlew --no-daemon build -x test

# Stage 2 : Build the Docker final image
FROM openjdk:11
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/build/libs/*.jar /app/target/earthquake-alert-spring.jar

# Copy the application.yml file
COPY ./src/main/resources/application.yml /app/application.yml

# Expose port
EXPOSE 8080

CMD ["java", "-jar", "target/earthquake-alert-spring.jar"]
