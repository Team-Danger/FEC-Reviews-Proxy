version: '3.0'
services:
  proxy:
    build: .
    ports: 
    - "80:80"

    depends_on:
    - reviews
    - reservations
    - description
  description:
    images: ertdfgcb/feccomponent
    ports: 
    - "3000"
    expose:
    - "3000"
    depends_on:
    - mongo
  reservation:
    image: wpark95/fec
    expose:
    - "3001"
    depends_on:
    - mongo
  reviews:
    image: jzhengcode/fec-reviews-component_web
    expose:
    - "3002"
    depends_on:
    - mongo
  mongo:
    image: mongo
    expose:
    - "27017"