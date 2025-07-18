pipeline {
    agent any
    tools {
        jdk 'jdk21'
        nodejs 'node24'
    }
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        APP_NAME = 'mern-spotify-clone'
        RELEASE = '1.0.0'
        DOCKER_USER = 'xjohnfit'
        DOCKER_PASS = 'dockerhub'
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
    }
    stages {
        stage('1. Clean Workspace') {
            steps {
                cleanWs()
            }
        }
        stage('2. Checkout from Git') {
            steps {
                git branch: 'main', url: 'https://github.com/xjohnfit/mern-spotify-clone.git',
                credentialsId: 'github'
            }
        }
        stage("3. SonarQube Analysis") {
            steps {
                withSonarQubeEnv('sonarqube-server') {
                    sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=MERN-Spotify-Clone \
                    -Dsonar.projectKey=MERN-Spotify-Clone'''
                }
            }
        }
        stage("4. Quality Gate") {
            steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'sonarqube-token'
                }
            }
        }
        stage("5. Install Dependencies") {
            steps {
                sh "npm install"
            }
        }
	    stage('6. Owasp File System Scan') {
	        steps {
                dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'dp-check'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        stage("7. Trivy File System Scan") {
            steps {
                sh "trivy fs . > trivyfs.txt"
            }
        }
        stage("8. Build & Push Docker Image") {
            steps {
                script {
                    docker.withRegistry('', DOCKER_PASS) {
                        docker_image = docker.build "${IMAGE_NAME}"
                    }
                    docker.withRegistry('', DOCKER_PASS) {
                        docker_image.push("${IMAGE_TAG}")
                        docker_image.push('latest')
                    }
                }
            }
        }     
        stage("9. Trivy Image Scan") {
	        steps {
                script {
	                sh ('docker run -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image xjohnfit/nextjs14-portfolio:latest --no-progress --scanners vuln  --exit-code 0 --severity HIGH,CRITICAL --format table > trivyimage.txt')
                }
            }
        }
	    stage("10. Cleanup Artifacts") {
	        steps {
                script {
                    sh "docker rmi ${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker rmi ${IMAGE_NAME}:latest"
                }
            }
        }
        // stage("11. Update Kubernetes Deployment for ArgoCD") {
        //     steps {
        //         withCredentials([usernamePassword(credentialsId: 'github', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_TOKEN')]) {
        //             script {
        //                 sh """
        //                     git config --global user.name "John Rocha"
        //                     git config --global user.email "xjohnfitcodes@gmail.com"
        //                     sed -i 's|image: .*/xjohnfit/nextjs14-portfolio:.*|image: xjohnfit/nextjs14-portfolio:${IMAGE_TAG}|g' kubernetes/deployment.yml

        //                     if git diff --quiet kubernetes/deployment.yml; then
        //                         echo "No changes to commit."
        //                     else
        //                         git add kubernetes/deployment.yml
        //                         git commit -m "Update deployment image to ${IMAGE_TAG} via Jenkins"
        //                         GIT_PUSH_URL="https://${GIT_USERNAME}:${GIT_TOKEN}@github.com/xjohnfit/nextjs14-portfolio.git"
        //                         git push "\$GIT_PUSH_URL" main
        //                     fi
        //                 """
        //             }
        //         }
        //     }
        // }
        stage("12. Docker Cleanup") {
            steps {
                script {
                    sh '''
                    echo "🧹 Cleaning up Docker resources..."

                    # Stop and remove exited containers
                    docker container prune -f

                    # Remove dangling and unused images
                    docker image prune -f

                    # Remove unused volumes
                    docker volume prune -f

                    # Remove unused networks
                    docker network prune -f

                    # Clean up build cache
                    docker builder prune -f
                    '''
                }
            }
        }   
    }
    post {
      always {
        emailext attachLog: true,
          subject: "'${currentBuild.result}'",
          body: "Project: ${env.JOB_NAME}<br/>" +
          "Build Number: ${env.BUILD_NUMBER}<br/>" +
          "URL: ${env.BUILD_URL}<br/>",
          to: 'xjohnfitcodes@gmail.com',                              
          attachmentsPattern: 'trivyfs.txt,trivyimage.txt'
      }
    }
}