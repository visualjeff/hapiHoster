'use strict';
  
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Path = require('path');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);


const server = Hapi.server({
  port: process.env.port || 1234, //default port 1337 is for running on Azure.
  host: '0.0.0.0',
  routes: {
    files: {
      relativeTo: Path.join(__dirname, './client/dist'),
    }
  }
});

const init = async () => {
  await server.register([ Inert,
  {
    plugin: require('hapi-graceful-shutdown-plugin'),
    options: {
      sigtermTimeout: 1,
      sigintTimeout: 1
    }
  }]);

  server.route({
    method: 'GET',
    path: '/{path*}',
    config: {
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          listing: false,
          index: true
        }
      }
    }
  });

  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    if (response.isBoom &&
      response.output.statusCode === 404) {
      return h.file('index.html');
    }
    return h.continue;
  });

  await server.initialize();
  return server;
};

const start = async () => {
  await init();
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

start();
