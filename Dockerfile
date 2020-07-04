version: '3.0'
services:
  proxy:
    build: .
    ports: 
    - "80:7357"

    depends_on:
    - reviews
    - reservations
    - description
    - mongo
    
  mongo:
    image: mongo
    ports:
    - "27017:27017"