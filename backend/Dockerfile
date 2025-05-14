### backend/Dockerfile
FROM openjdk:21-jdk-slim

RUN apt-get update && apt-get install -y maven

WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

CMD ["java", "-jar", "target/contas-0.0.1-SNAPSHOT.jar"]