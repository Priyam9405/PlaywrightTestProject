pipeline{
agent any
    
stages {
  stage('Checkout'){
steps{
  echo "Checking out code..."
  checkout scm
    }
    }
  stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Browsers') {
            steps {
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm run webTests --reporter=html'
            }
        }

} 


}
