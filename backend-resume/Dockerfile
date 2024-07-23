FROM maven:3.9.8-eclipse-temurin-21-alpine AS build
LABEL authors="Elijah Crain"

ENV HOME=/usr/app
RUN mkdir -p $HOME
WORKDIR $HOME
ADD pom.xml $HOME
#cache dependencies
RUN mvn verify --fail-never
ADD . $HOME
RUN mvn package -Dmaven.test.skip=true

FROM eclipse-temurin:21-jre-alpine

ARG JAR_FILE=*.jar
ARG PORT=8080

EXPOSE $PORT

COPY --from=build /usr/app/target/${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]