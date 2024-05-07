# DmBlog; 

### Dieses Projekt kommst aus [realworld von Thinkster](https://github.com/gothinkster/realworld) inspiriert 

Implementation der "Realworld" Blog mit ein FrontEnd durch Vite, React, TypeScript und ein Backend durch Spring und PostgreSQL gemacht. Es hat mir geholfen, um viel mehr zu lernen.
---
##### Tech Stack:
Spring, PostgreSQL, TypeScript, React, Vite
enthalt auch Docker
---

#### Wie kann man dieses Projekt laufen?

Um dieses projekt zu laufen, folgen die nachsten Schriffte:

#### Frontend:

1. machen sie ein Pull dieses Repo: `git pull https://github.com/dmsosa/dmsosa.github.io.git`
2. laufen Sie das command `npm run dev`
3. Das Seite in die addresse http://localhost:5173/ verfugbar sein sollte

#### Backend:

1. gehen Sie zu das Ordner "backend/blog-service" und laufen das command `mvnw spring-boot:run`, oder laufen Sie das Backend App. 
2. Das App mit ein InMemory H2 Database funktioniert, aber du kannst es auch mit ein PostgreSQL Dateibank laufen, du muss nur deine eigene Beglaubigungsschreiben zu dem .env Datei
3. Go ahead!

### Erklarung: Wie es funktioniert?

#### Backend:

Ich gilt das Backend als besser erklart in einem separaten Repository, sonst wurde dieses Readme unnotig lang werden.

das Backend repo finden man hier: [dmsosa-backend](https://github.com/dmsosa/dmblog-backend) 


## Extra funktionen:

Auchwenn dieses Projekt bei Realworld Conduit Blog inspiriert ist, ich mochte etwas interessanter machen, also ich habe ein anderes Stil zu dem GUI gegeben, Bilder fur den Artikeln, Like zu den Kommentare, du kannst ein nutzer blockieren, ein Responsive Mobile Navbar... etc.

Ich mochte hier geschreiben, wie alles das gemacht worden.

1. Background Photos fur den Artikeln

Ich habe nicht ein neues Feld zu der Einheit "Artikel" gerstellt, sondern nur alle die Background Bilder unseres Blog zu Cloudinary gesendet, und dann wir laden Sie als notig herunter.

Input: Durch HTML Form

Das frontend machst:
POST Anfrage, um das Bild hochzuladen
GET Anfrage, um das Bild zu erhalten

Das backend machst:
Schrifft 1: zu Cloudinary hochladen
Schrifft 2: von Cloudinary erhalten

Wenn das Bilder hochgeladen ist, es geht in unsere Cloudinary API gespeichert, dann es kann durch der Slug der Artikel erhalten werden.

Zu-Machen:
* Der Nutzer der Farbe des Backgrounds wahlen kann
* Ladenbar zu der Form hinzufugen
Das Bilder kann mann bewenden
* Profile Bildern

Das Backend zu Deploy: