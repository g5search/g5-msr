require('dotenv').config();

const express = require('express');
const { Nuxt, Builder } = require('nuxt');
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

const models = require('./models');
const app = express();

require('./controllers/pubsub')(app, express, models);
require('./controllers/auth')(app);
require('./controllers/queue').init(app);
require('./routes')(app);

async function start () {
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  await nuxt.ready();

  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  app.use(nuxt.render);

  models.sequelize
    .sync()
    .then(() => app.listen(port, host))
    .then(() => console.info(`Server listening on http://${host}:${port}`))
    .catch(err => console.log(err));
}

start();
