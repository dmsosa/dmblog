# DmBlog; 

### Dieses Projekt kommst aus [realworld von Thinkster](https://github.com/gothinkster/realworld) inspiriert 

Implementation der "Realworld" Blog mit ein FrontEnd durch Vite, React, TypeScript und ein Backend durch Spring und PostgreSQL gemacht. Es hat mir geholfen, um viel mehr zu lernen.
---
##### Tech Stack:
Spring, PostgreSQL, TypeScript, React, Vite
enthalt auch Docker
---

Um dieses projekt zu laufen, folgen die nachsten Schriffte:

#### Frontend:

1. machen sie ein Pull dieses Repo: `git pull https://github.com/dmsosa/dmsosa.github.io.git`
2. laufen Sie das command `npm run dev`
3. Das Seite in die addresse http://localhost:5173/ verfugbar sein sollte

#### Backend:

1. gehen Sie zu das Ordner "backend/blog-service" und laufen das command `mvnw spring-boot:run`, oder laufen Sie das Backend App. 
2. Das App mit ein InMemory H2 Database funktioniert, aber du kannst es auch mit ein PostgreSQL Dateibank laufen, du muss nur deine eigene Beglaubigungsschreiben zu dem .env Datei
