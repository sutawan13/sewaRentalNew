const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const compression = require('compression');

const cors = require('cors');

module.exports = function (app) {
  app.use(helmet());
  app.use(cors());

  /* Start of Morgan Logger Configurations */
  morgan.token('date', function () {
    const p = new Date()
      .toString()
      .replace(/[A-Z]{3}\+/, '+')
      .split(/ /);
    return p[2] + '/' + p[1] + '/' + p[3] + ':' + p[4] + ' ' + p[5];
  });
  app.use(morgan('combined'));
  /* End of Morgan Logger Configurations */

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
      return false;
    }

    return compression.filter(req, res);
  }
  app.use(compression({ filter: shouldCompress }));
};
