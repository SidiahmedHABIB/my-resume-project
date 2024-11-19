## Build stage
#FROM maven:3.8.4-openjdk-17 AS build
#WORKDIR /build
#COPY . .
#RUN mvn clean package

# Build stage
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /build

# Copy the pom.xml and source code
#COPY pom.xml .
# Copy the pom.xml first to utilize Docker's caching
#RUN mvn dependency:resolve

COPY . .
# Copy the source code
RUN mvn clean package -DskipTests

# Runtime stage
FROM amazoncorretto:17
ARG PROFILE=dev
ARG APP_VERSION=1.0.0

WORKDIR /app
COPY --from=build /build/target/spring_mongodb-*.jar /app/

# Extract the JAR version
RUN APP_VERSION=$(ls /app | grep *.jar | awk 'NR==2{split($0,a,"-"); print a[3]}' | awk '{sub(/.jar$/,"")}1') \
    && echo "Building container with BSN v-$APP_VERSION"

EXPOSE 8088

ENV DB_URL="mongodb://root:root@mongo:27017/resume_db?authSource=admin"
ENV MAILDEV_URL=localhost

ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

# Run the application
CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} /app/my-resume-api-${JAR_VERSION}.jar
