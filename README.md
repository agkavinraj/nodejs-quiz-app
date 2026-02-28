# NodeJS Quiz App

A simple Node.js Quiz Application containerized using Docker (multi-stage build) and automated using Jenkins CI/CD with a Shared Library.

---

##  Technologies Used

- Node.js
- Docker (Multi-stage build)
- Distroless Node.js image (`gcr.io/distroless/nodejs`)
- Jenkins (Declarative Pipeline)
- Jenkins Shared Library (`devops-lib`)
- DockerHub (Image Registry)
- Email Extension Plugin (`emailext`)

---

##  Docker Implementation

This project uses a **multi-stage Docker build** to optimize image size and improve security.

### Stage 1 – Base Image

- Uses `node:slim`
- Installs production dependencies using:

  ```bash
  npm ci --only=production
  ```

- Copies application source code

### Stage 2 – Production Image

- Uses `gcr.io/distroless/nodejs`
- Copies only required files from the base stage
- Exposes port `3000`
- Runs the application using `server.js`

---

##  Run with Docker

### Build the Docker Image

```bash
docker build -t nodejs-quiz-app .
```

### Run the Docker Container

```bash
docker run -p 3000:3000 nodejs-quiz-app
```

### Access the Application

Open your browser and visit:

```
http://localhost:3000
```

---

##  Jenkins CI/CD Pipeline

This project uses a **Jenkins Declarative Pipeline** with a **Shared Library (`devops-lib`)**.

### Pipeline Features

- Uses shared library:

  ```groovy
  @Library('devops-lib') _
  ```

- Custom shared library functions:
  - `gitCheckOut()`
  - `dockerBuild()`
  - `dockerPush()`

- Uses Jenkins environment variables:
  - `BUILD_NUMBER`
  - `JOB_NAME`
  - `BUILD_URL`

- Tags Docker image using:

  ```
  IMAGE_NAME:BUILD_NUMBER
  ```

- Pushes image to DockerHub automatically

---

##  Email Notifications

Using Jenkins `emailext` plugin:

- Sends email on **Success**
- Sends email on **Failure**
- Email includes:
  - Job Name
  - Build Number
  - Build URL
  - Docker Image Tag

---

##  CI/CD Workflow

1. Checkout source code from GitHub
2. Build Docker image
3. Tag image using Jenkins build number
4. Push image to DockerHub
5. Send email notification (Success / Failure)

---
