const lineByLine = require('n-readlines');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const Record = require('../database/record.js');
const encoding = 'utf8';
const fs = require('fs');
const dbFile = '../../storage/db.json';

console.log('\nStarting...\n');
console.log('Checking if destination exists');

const dir = '../../storage';
if (!fs.existsSync(dir)){
  console.log('No, so creating destination directory');
  fs.mkdirSync(dir);
} else {
  try {
    fs.unlinkSync(dbFile);
    console.log('Yes, so old database deleted.')
  } catch(err) {
    console.error(err)
  }
}

const adapter = new FileSync('../../storage/db.json');
const db = low(adapter);



// init database
db.defaults({alijn: [],blijn: [],clijn: [],dlijn: [],elijn: []})
  .write();

const afileWedstrijdnummer = new lineByLine('../../../frontend/docs/deelnemerslijsten/Alijn/Wedstrijdnummer.txt');
const afileNaam1 = new lineByLine('../../../frontend/docs/deelnemerslijsten/Alijn/Naam1.txt');
const afileNaam2 = new lineByLine('../../../frontend/docs/deelnemerslijsten/Alijn/Naam2.txt');
const afileNaam3 = new lineByLine('../../../frontend/docs/deelnemerslijsten/Alijn/Naam3.txt');
const afileNiveau = new lineByLine('../../../frontend/docs/deelnemerslijsten/Alijn/Niveau.txt');
const afileClub = new lineByLine('../../../frontend/docs/deelnemerslijsten/Alijn/Club.txt');
const afileCategorie = new lineByLine('../../../frontend/docs/deelnemerslijsten/Alijn/Categorie.txt');

const bfileWedstrijdnummer = new lineByLine('../../../frontend/docs/deelnemerslijsten/Blijn/Wedstrijdnummer.txt');
const bfileNaam1 = new lineByLine('../../../frontend/docs/deelnemerslijsten/Blijn/Naam1.txt');
const bfileNaam2 = new lineByLine('../../../frontend/docs/deelnemerslijsten/Blijn/Naam2.txt');
const bfileNaam3 = new lineByLine('../../../frontend/docs/deelnemerslijsten/Blijn/Naam3.txt');
const bfileNiveau = new lineByLine('../../../frontend/docs/deelnemerslijsten/Blijn/Niveau.txt');
const bfileClub = new lineByLine('../../../frontend/docs/deelnemerslijsten/Blijn/Club.txt');
const bfileCategorie = new lineByLine('../../../frontend/docs/deelnemerslijsten/Blijn/Categorie.txt');

const cfileWedstrijdnummer = new lineByLine('../../../frontend/docs/deelnemerslijsten/Clijn/Wedstrijdnummer.txt');
const cfileNaam1 = new lineByLine('../../../frontend/docs/deelnemerslijsten/Clijn/Naam1.txt');
const cfileNaam2 = new lineByLine('../../../frontend/docs/deelnemerslijsten/Clijn/Naam2.txt');
const cfileNaam3 = new lineByLine('../../../frontend/docs/deelnemerslijsten/Clijn/Naam3.txt');
const cfileNiveau = new lineByLine('../../../frontend/docs/deelnemerslijsten/Clijn/Niveau.txt');
const cfileClub = new lineByLine('../../../frontend/docs/deelnemerslijsten/Clijn/Club.txt');
const cfileCategorie = new lineByLine('../../../frontend/docs/deelnemerslijsten/Clijn/Categorie.txt');

const dfileWedstrijdnummer = new lineByLine('../../../frontend/docs/deelnemerslijsten/Dlijn/Wedstrijdnummer.txt');
const dfileNaam1 = new lineByLine('../../../frontend/docs/deelnemerslijsten/Dlijn/Naam1.txt');
const dfileNaam2 = new lineByLine('../../../frontend/docs/deelnemerslijsten/Dlijn/Naam2.txt');
const dfileNaam3 = new lineByLine('../../../frontend/docs/deelnemerslijsten/Dlijn/Naam3.txt');
const dfileNiveau = new lineByLine('../../../frontend/docs/deelnemerslijsten/Dlijn/Niveau.txt');
const dfileClub = new lineByLine('../../../frontend/docs/deelnemerslijsten/Dlijn/Club.txt');
const dfileCategorie = new lineByLine('../../../frontend/docs/deelnemerslijsten/Dlijn/Categorie.txt');

const efileWedstrijdnummer = new lineByLine('../../../frontend/docs/deelnemerslijsten/Elijn/Wedstrijdnummer.txt');
const efileNaam1 = new lineByLine('../../../frontend/docs/deelnemerslijsten/Elijn/Naam1.txt');
const efileNaam2 = new lineByLine('../../../frontend/docs/deelnemerslijsten/Elijn/Naam2.txt');
const efileNaam3 = new lineByLine('../../../frontend/docs/deelnemerslijsten/Elijn/Naam3.txt');
const efileNiveau = new lineByLine('../../../frontend/docs/deelnemerslijsten/Elijn/Niveau.txt');
const efileClub = new lineByLine('../../../frontend/docs/deelnemerslijsten/Elijn/Club.txt');
const efileCategorie = new lineByLine('../../../frontend/docs/deelnemerslijsten/Elijn/Categorie.txt');

function trim(str) {
  let result;

  if (str === 'false') {
    return null;
  }
  if (str.slice(-1) === '\r') {
    result = str.slice(0,-1)
  }
  if (result) {
    result = result.trim();
  }
  return result === '' ? null : result;
}

var wedstrijdnummer = true;
while (wedstrijdnummer !== 'false') {
  wedstrijdnummer = afileWedstrijdnummer.next().toString(encoding);
  const naam1 = afileNaam1.next().toString(encoding);
  const naam2 = afileNaam2.next().toString(encoding);
  const naam3 = afileNaam3.next().toString(encoding);
  const club = afileClub.next().toString(encoding);
  const niveau = afileNiveau.next().toString(encoding);
  const categorie = afileCategorie.next().toString(encoding);

  const newRecord = new Record(
    trim(wedstrijdnummer),
    trim(naam1),
    trim(naam2),
    trim(naam3),
    trim(club),
    trim(niveau),
    trim(categorie),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  );
  db.get('alijn')
    .push(newRecord)
    .write();
}
console.log('Alijn read.');

var wedstrijdnummer = true;
while (wedstrijdnummer !== 'false') {
  wedstrijdnummer = bfileWedstrijdnummer.next().toString(encoding);
  const naam1 = bfileNaam1.next().toString(encoding);
  const naam2 = bfileNaam2.next().toString(encoding);
  const naam3 = bfileNaam3.next().toString(encoding);
  const club = bfileClub.next().toString(encoding);
  const niveau = bfileNiveau.next().toString(encoding);
  const categorie = bfileCategorie.next().toString(encoding);

  const newRecord = new Record(
    trim(wedstrijdnummer),
    trim(naam1),
    trim(naam2),
    trim(naam3),
    trim(club),
    trim(niveau),
    trim(categorie),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  );
  db.get('blijn')
    .push(newRecord)
    .write();
}
console.log('Blijn read.');

var wedstrijdnummer = true;
while (wedstrijdnummer !== 'false') {
  wedstrijdnummer = cfileWedstrijdnummer.next().toString(encoding);
  const naam1 = cfileNaam1.next().toString(encoding);
  const naam2 = cfileNaam2.next().toString(encoding);
  const naam3 = cfileNaam3.next().toString(encoding);
  const club = cfileClub.next().toString(encoding);
  const niveau = cfileNiveau.next().toString(encoding);
  const categorie = cfileCategorie.next().toString(encoding);

  const newRecord = new Record(
    trim(wedstrijdnummer),
    trim(naam1),
    trim(naam2),
    trim(naam3),
    trim(club),
    trim(niveau),
    trim(categorie),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  );
  db.get('clijn')
    .push(newRecord)
    .write();
}
console.log('Clijn read.');

var wedstrijdnummer = true;
while (wedstrijdnummer !== 'false') {
  wedstrijdnummer = dfileWedstrijdnummer.next().toString(encoding);
  const naam1 = dfileNaam1.next().toString(encoding);
  const naam2 = dfileNaam2.next().toString(encoding);
  const naam3 = dfileNaam3.next().toString(encoding);
  const club = dfileClub.next().toString(encoding);
  const niveau = dfileNiveau.next().toString(encoding);
  const categorie = dfileCategorie.next().toString(encoding);

  const newRecord = new Record(
    trim(wedstrijdnummer),
    trim(naam1),
    trim(naam2),
    trim(naam3),
    trim(club),
    trim(niveau),
    trim(categorie),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  );
  db.get('dlijn')
    .push(newRecord)
    .write();
}
console.log('Dlijn read.');

var wedstrijdnummer = true;
while (wedstrijdnummer !== 'false') {
  wedstrijdnummer = efileWedstrijdnummer.next().toString(encoding);
  const naam1 = efileNaam1.next().toString(encoding);
  const naam2 = efileNaam2.next().toString(encoding);
  const naam3 = efileNaam3.next().toString(encoding);
  const club = efileClub.next().toString(encoding);
  const niveau = efileNiveau.next().toString(encoding);
  const categorie = efileCategorie.next().toString(encoding);

  const newRecord = new Record(
    trim(wedstrijdnummer),
    trim(naam1),
    trim(naam2),
    trim(naam3),
    trim(club),
    trim(niveau),
    trim(categorie),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  );
  db.get('elijn')
    .push(newRecord)
    .write();
}
console.log('Elijn read.');

console.log('Finished importing lowdb database in file: \'' + dbFile + '\'\n\n');

