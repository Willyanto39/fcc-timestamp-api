// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.get('/api', (req, res) => {
  const now = new Date();

  return res.json({ unix: now.getTime(), utc: now.toUTCString() });
});

app.get('/api/:date', (req, res) => {
  const { date } = req.params;
  const timestamp = Number(date);
  let dateObj;

  if (isNaN(timestamp)) {
    dateObj = new Date(date);
  } else {
    dateObj = new Date(timestamp);
  }

  if (isNaN(dateObj)) {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({ unix: dateObj.getTime(), utc: dateObj.toUTCString() });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
