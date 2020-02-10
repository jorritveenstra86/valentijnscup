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
const bodyParser = require('body-parser');
const _ = require('lodash');

// *******************************************
// init server and database
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

// ************
// DB functions
function retrieveAllTeams() {
  let result = [];
  lijnen.forEach(lijn => {
    let records = db.get(lijn).value();
    result = result.concat(records);
  });
  return _.orderBy(result, ['teamnummer'], ['asc']);
}

function retrieveTeamByLijn(teamnummer, lijn) {
  let result = db
    .get(lijn)
    .find({teamnummer: Number(teamnummer)})
    .value();
  return result;
}

function saveTeam(team, lijn) {
  db.get(lijn)
    .find({teamnummer: Number(team.teamnummer)})
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

// ************
// Endpoint functions
function GETTeamByTeamnummer(teamnummer) {
  let result = undefined;
  lijnen.forEach(lijn => {
    let team = retrieveTeamByLijn(teamnummer, lijn);
    if (team) {
      result = team;
    }
  });
  return result;
}

function PUTTeam(team) {
  let foundLijn = undefined;
  // First find the record in de DB and remember which lijn
  lijnen.forEach(lijn => {
    let result = retrieveTeamByLijn(team.teamnummer, lijn);
    if (result) {
      foundLijn = lijn;
    }
  });
  if (foundLijn) {
    saveTeam(team, foundLijn);
    return true; // gelukt
  } else {
    return false; // niet gelukt
  }
}

function GETTeamsByCategorieNiveau(niveau, categorie) {
  let result = [];
  let allTeams = retrieveAllTeams();
  allTeams.forEach(team => {
    if (team.niveau === niveau && team.categorie === categorie) {
      result.push(team);
    }
  });
  return result;
}

let test;

function GETSlides() {
    return test;
}

function PUTSlides(body) {
    test = body;
}

// ************
// Validity checkers
function isValidTeam(team) {
  //  TODO uitbreiden controle
  //   nu checken we alleen of er een teamnummer bestaat
  return team.hasOwnProperty('teamnummer');
}

// *******************************************
// ************* setup expressJS *************

// middleware
app.use(compression());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// *******************************************
// Backend routes
app.all('/api/team', (req, res) => {
  if (req.method === 'GET') {
    let teamnummer = req.query.teamnummer;
    if (!teamnummer) {
      res.status(400).send('Bad request');
    } else {
      let responseBody = GETTeamByTeamnummer(teamnummer);
      if (responseBody) {
        res.status(200).send(responseBody);
      } else {
        res.status(500).send('Not found');
      }
    }
  }
  if (req.method === 'PUT') {
    let team = req.body;
    if (isValidTeam(team)) {
      if (PUTTeam(team)) {
        res.status(200).send('');
      } else {
        res.status(500).send('Server error');
      }
    } else {
      res.status(400).send('Bad request');
    }
  }
});

app.all('/api/teams', (req, res) => {
  if (req.method === 'GET') {
    res.status(200).send(retrieveAllTeams());
  } else {
    res.status(405).send('Method not allowed');
  }
});

app.all('/api/slides', (req, res) => {
    if (req.method === 'PUT') {
        PUTSlides(req.body);
        res.status(200).send('');
    }
    if (req.method === 'GET') {
        res.status(200).send(GETSlides);
    }
});

app.all('/api/categorie', (req, res) => {
  if (req.method === 'GET') {
    let niveau = req.query.niveau;
    let categorie = req.query.categorie;
    res.status(200).send(GETTeamsByCategorieNiveau(niveau, categorie))
  } else {
    res.status(405).send('Method not allowed');
  }
});

// *******************************************
// Frontend route
app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

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
