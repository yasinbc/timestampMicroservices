// Create express server
var express = require('express');
var app = express();

// Log incoming requests in development:
if (process.env.RUN_MODE === 'development') {
  app.use((req, res, next) => {
    console.log(
      `${req.method} ${req.path}; IP=${req.ip}; https?=${req.secure}`,
    );
    next();
  });
}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// Serve static files from 'public' folder
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Send index.html on requests to root
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Middleware that adds appropriate timestamp to res, based on 'date' query param
const addTimeStamp = (req, res, next) => {
  res.data = res.data || {};
  const dateParamStr = req.params.date;

  // If no date parameter, then return current date
  if (!dateParamStr) {
    res.data.timeStamp = new Date(Date.now());
    return next();
  }

  // If date parameter can be converted to a number, assume it is ms:
  if (/^[0-9]+$/.test(dateParamStr)) {
    const dateNum = Number(dateParamStr);
    res.data.timeStamp = new Date(dateNum);
    return next();
  }

  // Otherwise try to convert date parameter to a Date object
  try {
    res.data.timeStamp = new Date(dateParamStr);
    if (res.data.timeStamp.toGMTString() === 'Invalid Date') {
      res.data.timeStamp = null;
    }
  } catch (err) {
    res.data.timeStamp = null;
  }

  return next();
};

// Request to API with a valid date object returns unix timestamp
app.get('/api(/:date)?', addTimeStamp, (req, res) => {
  if (res.data.timeStamp) {
    const date = res.data.timeStamp;
    return res.json({ unix: date.getTime(), utc: date.toGMTString() });
  }
  // Otherwise date was not recognised, return error
  return res.json({ error: 'Invalid Date' });
});

// 404 page not found:
app.get('*', function (req, res) {
  // Redirect to index
  res.redirect('/');
});

// Internal Error Handler:
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server error: See Server Logs');
});

// listen for requests on e.g. http://localhost:3000/ if not otherwise specified
const portNum = process.env.PORT ? process.env.PORT : 3000;
var listener = app.listen(portNum, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
