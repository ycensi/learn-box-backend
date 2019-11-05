const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');
const routes = require('./routes').default;
const passport = require('./utils/passport').default;
// const Store = require('./store').default;

const config = require('../config');

// Configure auth
passport();

// const store = Store(config);

const app = express();
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(
  CORS({
    exposedHeaders: ['x-page', 'x-page-size', 'x-total-count']
  })
);

app.use('/api', routes);

app.use((req, res) => {
  throw new Error('Not Found');
});

// Error handler
app.use(function onError(err, req, res, next) {
  // eslint-disable-line no-unused-vars
  /**
   * if you use only for API Server
   */
  const error = {
    project: config.project,
    version: config.version,
    host: req.headers.host,
    'user-agent': req.headers['user-agent'],
    url: req.url,
    status: err.status || 500,
    method: req.method,
    message: err.message || err.text || 'There was an error on API server',
    userId: req.user ? req.user.id : null,
    env: process.env.NODE_ENV
  };

  res.status(err.status || 500).json(error);
});

export default app;