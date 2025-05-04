pipeline{
agent any
  tools {
        maven 'TestMaven'  // Name of Maven from Jenkins Global Tool Configuration
        jdk 'OpenJDK-17'   // Name of JDK from Jenkins Global Tool Configuration
    }

    environment {
        REPORT_DIR = "target/surefire-reports"
    }
  
stages {
  stage('Checkout'){
steps{
  echo "Checking out code..."
  checkout scm
    }
    }
  stage('Build & Test') {
    steps {
      echo "Building the project and running tests..."
withMaven(globalMavenSettingsConfig: '', jdk: '', maven: 'TestMaven', mavenSettingsConfig: '', traceability: true) {
    bat 'mvn clean install'
}    
    }
  }
  stage('Publish Test Results'){
steps{
echo "Publishing JUnit test reports..."
  junit '**/target/surefire-reports/*.xml'
  }
  }
  stage('Archiving Artifacts'){
    steps{
echo "Archiving important build artifacts..."
    archiveArtifacts artifacts : '**/target/*.jar', fingerprint:true
    }
}
}
   post {
        always {
            echo "Cleaning up workspace..."
            cleanWs()
        }
        success {
            echo "Build succeeded!"
        }
        failure {
            echo "Build failed!"
        }
    }


}
