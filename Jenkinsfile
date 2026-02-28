@Library('devops-lib') _

pipeline {
    agent any

    environment {
        IMAGE_NAME = 'agkavinraj24/nodejs-quiz-app'
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
            emailext(
                to: 'agkavinraj27@gmail.com',
                subject: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    Build Status : SUCCESS

                    Job Name     : ${env.JOB_NAME}
                    Build Number : ${env.BUILD_NUMBER}
                    Build URL    : ${env.BUILD_URL}

                    Docker Image : ${IMAGE_NAME}:${IMAGE_TAG}

                    Regards,
                    Jenkins
                    """
                )
        }

        failure {
            emailext(
                to: 'agkavinraj27@gmail.com',
                subject: "FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                        Build Status : FAILURE

                        Job Name     : ${env.JOB_NAME}
                        Build Number : ${env.BUILD_NUMBER}
                        Build URL    : ${env.BUILD_URL}

                        Please check console logs.

                        Regards,
                        Jenkins
                        """
                )
        }
    }
}
