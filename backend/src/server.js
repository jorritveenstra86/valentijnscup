// *******************************************
// Serves static content at localhost:4100/
// Serves services at localhost:4100/api/...

// *******************************************
// imports
const express = require("express");
const compression = require("compression");
const Record = require('./database/record.js');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// *******************************************
// setup
const _port = 4100;
const _app_folder = '../../frontend/dist/valentijnscupapp';
const app = express();
const adapter = new FileSync('../storage/db.json');
const db = low(adapter);

// *******************************************
// global vars
const lijnen = ['alijn', 'blijn', 'clijn', 'dlijn', 'elijn'];

// *******************************************
// Backend functions
function getTeamByLijn(teamnummer, lijn) {
  let result = db
    .get(lijn)
    .find({teamnummer: teamnummer})
    .value();
  return result;
}

function getTeamByTeamnummer(teamnummer) {
  let result = undefined;
  lijnen.forEach(lijn => {
    let team = getTeamByLijn(teamnummer, lijn);
    if (team) {
      result = team;
    }
  });
  return result;
}

function saveTeam(team, lijn) {
  db.get(lijn)
    .find({teamnummer: team.teamnummer})
    .assign({
      naam1: team.naam1,
      naam2: team.naam2,
      naam3: team.naam3,
      club: team.club,
      niveau: team.niveau,
      categorie: team.categorie,
      technisch_balans: team.technisch_balans,
      artistiek_balans: team.artistiek_balans,
      moeilijkheid_balans: team.moeilijkheid_balans,
      aftrekken_balans: team.aftrekken_balans,
      score_balans: team.score_balans,
      technisch_tempo: team.technisch_tempo,
      artistiek_tempo: team.artistiek_tempo,
      moeilijkheid_tempo: team.moeilijkheid_tempo,
      aftrekken_tempo: team.aftrekken_tempo,
      score_tempo: team.score_tempo,
      technisch_combi: team.technisch_combi,
      artistiek_combi: team.artistiek_combi,
      moeilijkheid_combi: team.moeilijkheid_combi,
      aftrekken_combi: team.aftrekken_combi,
      score_combi: team.score_combi,
    })
    .write()
}



// *******************************************
// ************* setup routes ****************

// middleware for compression
app.use(compression());

// *******************************************
// Frontend route
app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

// *******************************************
// Backend routes
app.all('/api/team', (req, res) => {
  if (req.method === 'GET') {
    res.send(getTeamByTeamnummer('243'));
  }
  // if (req.method === 'PUT') {
  //   console.log('PUT')
  // }
  // if (req.method === 'POST') {
  //   console.log('POST')
  // }
});


// *******************************************
// Angular rewrite rule
app.all('*', function (req, res) {
	res.status(200).sendFile(`/`, {root: _app_folder});
});

// *******************************************
// Start server
app.listen(_port, function () {
	console.log("Node Express server listening on http://localhost:" + _port);
});
