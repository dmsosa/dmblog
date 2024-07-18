# dmblog-backend
Backend Blog application made with Spring and Postgres


## Die Bilder hochzuladen: AWS S3 Bucket

Als ersters, ich habe Cloudinary API benutzt, um die Bilder unsere Seite hochzuladen, aber da das Deploy der App mit AWS getan werde, lieber nutze ich AWS S3 fur dieses Zweck.


1. Nutzer ein neues Konto erstellst:
   Anfangenwerte fur neue Nutzern sind:
   - id, username, email, password, bio, icon: 'apfel', backgroundColor: 'green', backgroundImage: null, role: USER


2. Bilder (Image + BackgroundImage) von AWS S3 zu suchen:
   a. Wenn es kein Hinterbild gibt, geben sie Null zuruck
   b. Es wird immer Icon geben, dann alle diesem sind Standardwerte
   c. Wenn nutzer Kein Bild hast, konnen Sie unsere Bilder nutzen


3. AWS S3 Standardwerte:
   - Apfel, Birne, Pineapple

### AWS S3 Nutzen:

1. AWS Credentialen
   Credentials durch: 
   - EC2 Metadata Service 
   - Umgebungvariabeln
2. Bucket erstellen (Wenn es noch nicht existiert werde)
3. Methode um Bilder zu erhalten
4. Methode um Bilder hochzuladen
5. Methode um Bilder zu entfernen

### Das EC2 Instance