const swaggerAutogen = require('swagger-autogen')();

output = '../swagger_doc.json';
endpoints = ['../app.js'];
doc = {
    "info": {
        "version": "1.0.0",
        "title": "biblioteca-api",
        "description": ""
    },
    "host": "localhost:5000"
};

swaggerAutogen(output, endpoints, doc);