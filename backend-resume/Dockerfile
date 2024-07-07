FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package

FROM eclipse-temurin:21-jdk-alpine
COPY --from=build /usr/src/app/target/backend-resume-0.0.1-SNAPSHOT.jar /usr/app/backend-resume-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/app/backend-resume-0.0.1-SNAPSHOT.jar"]