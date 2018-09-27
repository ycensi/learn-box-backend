const app = require('./app').default;
const config = require('../config');
const logger = require('./utils/logger').default;

const PORT = config.port;

app.listen(PORT, () => {
  logger.info(`Application started on port ${PORT}`);
}); // eslint-disable-line no-console