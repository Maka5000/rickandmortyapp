# **Rick and Morty app**

This project uses the following tools:

- FrontEnd framework:
    - Vue.js
    - Vuetify components
- Build tool:
    - Vite
- Docker:
    - node:current-alpine
    - nginx:stable-alpine

**All the data provided was retrieved using the REST API: [Rick And Morty API](https://rickandmortyapi.com/)**

THANKS! 😊

## How to start this project:

To start this project, there are two options:
1) Locally:
    - type in your terminal `npm run dev` - to start development server locally
    
    Now, you can access this app in your browser via typing `localhost:*port*` (`*port*` is set to 5173 by default)

2) In Docker container:
    - specify the port in the `EXPOSE *port*` line in the file `./Dockerfile`
    - `docker build -t *imagename* .` - create docker image using Dockerfile 
        - `*imagename*` - whatever name you want. DONT FORGET `.`
    - `docker run --name *container name* -p *host port*:*container port* *imagename*` - create and start container with your previously created image 
        - `*container name*` - whatever name you want to use for container
        - `*host port*:*container port*` - whatever port you want for example: `8080:80`; 
        - `*imagename*` - the name of the image created in the previous step)

    Now, you can access this app in your browser via typing `localhost:*host port*` or `http://*your ipv4 address*:*host port*`