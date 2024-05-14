[![Readme Badge](https://img.shields.io/badge/lang-en-lightgreen?style=flat)](https://github.com/dmsosa/dmblog/blob/main/readme.md)
[![Readme Badge](https://img.shields.io/badge/lang-de-red?style=flat)](https://github.com/dmsosa/dmblog/blob/main/README.de.md)



# DmBlog;

### This project is inspired by  [realworld from Thinkster](https://github.com/gothinkster/realworld).

Implementation of the "Realworld" blog with a frontend made by Vite, React, TypeScript and a backend made by Spring and PostgreSQL. It helped me to learn a lot more.
---
##### Tech Stack:
Spring, PostgreSQL, TypeScript, React, Vite
also includes Docker
---

#### How to run this project?

To run this project, follow the following steps:

#### Frontend:

1. pull this repo: `git pull https://github.com/dmsosa/dmsosa.github.io.git`
2. Run the command `npm run dev`
3. The site should be available at the address http://localhost:5173/

#### Backend:

1. Go to the "backend/blog-service" folder and run the command `mvnw spring-boot:run`, or run the backend app.
2. The app works with an InMemory H2 database, but you can also run it with a PostgreSQL file bank, you just need to add your own attestation to the .env file
3. Go ahead!

### Explanation: How it works?

#### Backend:

I consider the backend better explained in a separate repository, otherwise this readme would be unnecessarily long.

The backend repo can be found here: [dmsosa-backend](https://github.com/dmsosa/dmblog-backend)


##Extra features:

Even though this project is inspired by Realworld Conduit Blog, I wanted to make something more interesting, so I gave a different style to the GUI, images for the articles, like to the comments, you can block a user, a responsive mobile navbar... Etc.

I would like to write here how all this was done.

1. Background photos for the article

I didn't create a new field for the Articles unit, I just sent all the background images of our blog to Cloudinary and then we downloaded them as needed.

Input: Through HTML form

Do the frontend:
POST request to upload the image
GET request to get the image

Do the baking:
Font 1: upload to Cloudinary
Scripture 2: obtained from Cloudinary

When the image is uploaded, it goes into our Cloudinary API, then it can be obtained through the article's slug.

Close:
* The user can choose the color of the background
    * Article form to work
* Add loadable to the form
You can use the pictures
* Profile images

Deploy the backend:


