const Log = require('logfilename');
const config = require('../../config');
let log = new Log(__filename, config.log);
export default log;