# MC853 - Alocacao de salas - API

## How to use:
Make sure you have installed
1. Node/npm
2. Docker

It is also suggested to have:

3. Postman
4. Mongodb-compass

Now you can
```sh
$ git clone <this repository>
$ npm install
$ docker run -d --name mongodb -p 27017:27017 mongo
$ npm start
```

If you run the docker command twice without removing the first container you will probably see a error message. It should just state that there is already a container named "mongodb" and it will return the ID of that container.
With that, you can simply run

```sh
$ docker start <id>
```

The API will start, by default, at localhost:9001.

The mongoDB will be running locally in a docker container, at localhost:27017.

You can use mongodb-compass (or other capable software) to visualize data in the database.

If you are writing code for this repository, please make sure you have the ESLint running correctly.


