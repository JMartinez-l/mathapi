pipeline {
  agent any

  options {
    skipDefaultCheckout(true)
    timestamps()
  }

  environment {
    REPO_URL = 'https://github.com/TU_USUARIO/mathapi.git'
    GIT_BRANCH_NAME = 'qa'
    SONARQUBE_SERVER = 'SonarQube'
    SONAR_PROJECT_KEY = 'mathapi-qa'
    COMPOSE_PROJECT_NAME = 'mathapi_qa'
    MATHAPI_PORT = '3001'
    MATHAPI_TAG = "qa-${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: "*/${env.GIT_BRANCH_NAME}"]],
          userRemoteConfigs: [[url: env.REPO_URL]]
        ])
      }
    }

    stage('Build') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Tests') {
      steps {
        sh 'npm test -- --coverage --runInBand'
      }
    }

    stage('Dependency Check') {
      steps {
        sh '''
          rm -rf dependency-check-report
          mkdir -p dependency-check-report
          mkdir -p /var/jenkins_home/dependency-check-data
          dependency-check \
            --project "mathapi-qa" \
            --scan . \
            --format HTML \
            --format XML \
            --out dependency-check-report \
            --data /var/jenkins_home/dependency-check-data \
            --exclude node_modules \
            --disableYarnAudit \
            --disablePnpmAudit \
            -n
        '''
      }
      post {
        always {
          archiveArtifacts artifacts: 'dependency-check-report/**', allowEmptyArchive: true
          dependencyCheckPublisher pattern: 'dependency-check-report/dependency-check-report.xml'
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
          withSonarQubeEnv(env.SONARQUBE_SERVER) {
            sh '''
              sonar-scanner \
                -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                -Dsonar.projectName=${SONAR_PROJECT_KEY} \
                -Dsonar.qualitygate.wait=true \
                -Dsonar.qualitygate.timeout=600
            '''
          }
        }
      }
    }

    stage('Clean Up') {
      steps {
        sh 'docker compose -p ${COMPOSE_PROJECT_NAME} down --remove-orphans || true'
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker compose -p ${COMPOSE_PROJECT_NAME} build --pull mathapi'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker compose -p ${COMPOSE_PROJECT_NAME} up -d mathapi'
      }
    }

    stage('Logs') {
      steps {
        sh 'docker compose -p ${COMPOSE_PROJECT_NAME} logs --no-color mathapi'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
    }
  }
}
