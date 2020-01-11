const express = require("express");
const compression = require("compression");

const _port = 4100;
const _app_folder = '../frontend/dist/valentijnscupapp';

const app = express();
app.use(compression());

// Frontend
app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));
app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, {root: _app_folder});
});

//Backend
// TODO


// Start server
app.listen(_port, function () {
  console.log("Node Express server listening on http://localhost:" + _port);
});
