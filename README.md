# Backend Questionn-AI-re 

Backend to handle request from Question-AI-re application


## Configuration
1. Clone repository
2. Clone .env.template to .env
3. Update .env configuration variables
4. npm install
5. npm start


## Docker
docker build -t question-backend .
docker run --name question-backend -p 8001:4001 -d question-backend
docker container exec -it question-backend /bin/sh