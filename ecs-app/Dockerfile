FROM maven:latest as build

COPY . .

RUN mvn clean package

FROM amazoncorretto:17

COPY --from=build target/lumigo-demo-*.jar app.jar

CMD ["java","-jar","app.jar"]

