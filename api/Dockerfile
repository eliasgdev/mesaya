# Compilación
FROM docker.io/library/maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q -B dependency:go-offline
COPY src ./src
RUN mvn -q -B package -DskipTests

# Ejecución
FROM docker.io/library/eclipse-temurin:21-jre
WORKDIR /app
RUN useradd --system --create-home mesaya
COPY --from=build /app/target/mesaya-0.0.1-SNAPSHOT.jar app.jar
USER mesaya
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75"
EXPOSE 9000
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar"]
