# InternTrack

#### This system is to solve problem where supervisor and advisor cannot keep track of student's activity throughout their internship. By digitalising the log book activity which is required during internship duration, advisors from university, supervisors from students' chosen companies and student itself no longer need to keep a physical paper to keep track.

### Database

1. Go to the directory `interntrack/src/main/resources/db` and open the file `schema.sql` and `migration.sql`
2. Copy the content of it and run in oracle sql (`schema` first then `migration`)
3. Only run this sql if there are database changes or initial setup

### Backend

###### To run the app locally, make a clean installation using maven for java side app. If you intend to use .mvnw, make sure the current working directory is in interntrack and contains pom.xml

```bash
mvn clean install
# @
../mvnw clean install
```
also can use command> .\mvnw clean install

```bash
mvn spring-boot:run
# @
../mvnw spring-boot:run
```
also can use command> ./mvnw spring-boot:run

- Open http://localhost:8081 for viewing the website

### Frontend

###### To build the front end, go to directory of assets static and install using node.js

```bash
npm install
npm run build
```

###### To develop front end with hot reload

```bash
npm install # if not installed yet or new packages added
npm run dev
```

- Open http://localhost:5173 to view the frontend app

### UI Overview

![UI Overview](ui-overview.png)

### Database ERD

![Database](database.png)

### Software Dependencies for this Project

#### Integrated Development Environment (IDE)
- **Core Developer IDE**: IntelliJ IDEA  
- **Other Supported Editors**: Visual Studio Code (VS Code)  
- **Additionally Supported**: Apache NetBeans, Eclipse, or any other suitable IDE for Java Spring Boot projects.

#### Programming Language/Runtime Environment
- **Programming Language**: Java  
- **Runtime Environment**: Java Development Kit (JDK) 17  

#### Database Connectivity
- **Driver**: Oracle JDBC (`ojdbc8`)  
- **Framework**: Spring Data JPA (Java Persistence API) (via `spring-boot-starter-data-jpa`)  
- **ORM Tool**: Hibernate (`hibernate-core`, version 6.5.3.Final)  

#### Application Server
- The project runs on **Spring Boot's embedded application server**, specifically the **embedded Apache Tomcat** (default in Spring Boot).
