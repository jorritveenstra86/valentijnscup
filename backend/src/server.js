const express = require("express");
const compression = require("compression");
const _port = 4100;
const _app_folder = '../frontend/dist/valentijnscupapp';
const app = express();

// LowDB setup
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../storage/db.json');
const db = low(adapter);

// custom
const Record = require('./database/record.js');

// init DB

// middleware for compression
app.use(compression());

// Frontend
app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));
app.all('*', function (req, res) {
	res.status(200).sendFile(`/`, {root: _app_folder});
});

//Backend
app.all('/api/alijn', (req, res) => {
	if (req.method === 'GET') {
		console.log('GET')
	}
	if (req.method === 'PUT') {
		console.log('PUT')
	}
	if (req.method === 'POST') {
		console.log('POST')
	}
});


// Start server
app.listen(_port, function () {
	console.log("Node Express server listening on http://localhost:" + _port);
});
