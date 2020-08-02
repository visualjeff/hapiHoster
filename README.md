# Hapi Hoster

![Node.js CI](https://github.com/visualjeff/hapiHoster/workflows/Node.js%20CI/badge.svg)

## Use this Hapi application to host your Parcel/React SPA

### Installation and running

- Install Nodejs (v12.16.1 or higher)

- Run npm install to install the dependencies

- Build your React application (be sure to set NODE_ENV before building) then copy your React client files into ./client/dist

- The server defaults to port 1234 but can be changed by setting process.env.port.
```
For MacOS and Linux:
  export port=1337

For Windoze:
  set port=1337
```

- To start the Nodejs server:
```
node server.js
```

- To view your applications visit http://localhost:1234

- Control-C will shutdown the server

- To run as a Docker container:
```
docker build --force-rm=true -t hapihoster:1.0.0 .
docker images
docker tag <image_id> hapihoster:latest
docker run -d --name hapihoster -p 1234:1234 hapihoster:latest
docker ps
docker exec -it <container_id> /bin/ash
docker stop <container_id>
docker kill <container_id>
docker container ls -a
docker container rm <container_id>
docker logs <container>
docker rmi <repository>:<tag>
docker system prune -a
```



