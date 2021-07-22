'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */
module.exports = () => {
  var io = require('socket.io')(strapi.server, {
    cors: {
      origin: "http://localhost:4000",
      methods: ["GET", "POST"],
     // allowedHeaders: ["my-custom-header"],
      transports: ['websocket', 'polling'],
      credentials: true
    },allowEIO3: true
  });

  io.sockets.on('connection', function(client){
    console.log('server connect');

    client.on('subscribe', function(room) {
      console.log('joining room', room);
      client.join(room);
    })

    client.on('unsubscribe', function(room) {
      console.log('leaving room', room);
      client.leave(room);
    })

    client.on('send', function(data) {
      console.log('sending message');
      io.sockets.in(data.room).emit('message', data);
    });
  });
};
