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
      //origin: "*:*",
      origin: "http://localhost:8080",
      withCredentials: true,
      methods: ["GET", "POST"],
     // allowedHeaders: ["my-custom-header"],
      transports: ['websocket', 'polling'],
      credentials: true
    },allowEIO3: true
  });



    io.sockets.on('connection', function(client){

      var category =  strapi.query('category').find();

      category.then((categoryData) => {
        client.emit('categories', categoryData);

      });

      var product =  strapi.query('product').find();

      product.then((productData) => {
        client.emit('product', productData);
        //console.log(value);
        // expected output: "foo"
      });

      console.log('server connect');


      client.on('test', (data) => {
        console.log("From Client",data)
        //this.msg = data.message;
      });

      setInterval(function() {

      }, 10000);

    });


};
