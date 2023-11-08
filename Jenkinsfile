pipeline {
    agent any
    environment {
         EVN_NAME='production'
    }
    options {
        timeout(time: 1, unit: 'HOURS')
    }
    stages {

        stage('SSH SERVER') {
            steps {
            sshagent(['ssh-remote']) {
                sh 'ssh -o StrictHostKeyChecking=no -l tuyen 192.168.0.100 '
                sh 'pwd'
                sh 'git pull'
                sh './build.sh -e $EVN_NAME -v $GIT_COMMIT'
                }      
            }     
        }

        stage('SETTING UP PERMISSIONS PHASE') {
          when {
          	branch 'develop'
          }
            steps {
                echo 'Setting up permission ...'
                sh 'chmod +x ./build.sh'
                sh 'ls -l'
            }
        }
        stage('BUILDING PHASE') {
          when {
          	branch 'develop'
          }
            steps {
                echo 'Building ...'
                sh 'pwd'
                sh 'ls'
                sh './build.sh -e $EVN_NAME -v $GIT_COMMIT'
            }
        }
         stage('CHECKING DOCKER PHASE') {
           when {
          	branch 'develop'
          }
            steps {
                echo 'Checking docker ...'
                sh '/usr/local/bin/docker ps'
            }
        }
    }
}