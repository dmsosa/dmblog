FROM openjdk:21 as builder
WORKDIR app
COPY ./target/blogservice-0.0.1-SNAPSHOT.jar ./app/
RUN java -Djarmode=layertools -jar ./app/blogservice-0.0.1-SNAPSHOT.jar extract 

FROM openjdk:21

WORKDIR app

COPY --from=builder app/dependencies/ ./
COPY --from=builder app/spring-boot-loader/ ./
COPY --from=builder app/snapshot-dependencies/ ./
COPY --from=builder app/application/ ./

ENTRYPOINT ["java", "org.springframework.boot.loader.lauch.JarLauncher"]
EXPOSE 8082