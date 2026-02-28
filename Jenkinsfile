@Library('devops-lib') _

pipeline {
    agent any

    environment {
        IMAGE_NAME = "agkavinraj24/nodejs-quiz-app"
        IMAGE_TAG  = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                gitCheckOut(
                    'https://github.com/agkavinraj/nodejs-quiz-app.git',
                    'main'
                )
            }
        }

        stage('Build Docker Image') {
            steps {
                dockerBuild(
                    "${IMAGE_NAME}",
                    "${IMAGE_TAG}"
                )
            }
        }

        stage('Push Docker Image') {
            steps {
                dockerPush(
                    "${IMAGE_NAME}",
                    "${IMAGE_TAG}"
                )
            }
        }
    }

    post {
        success {
            echo "Image pushed to Docker Hub successfully."
        }
        failure {
            echo "Pipeline failed."
        }
    }
}