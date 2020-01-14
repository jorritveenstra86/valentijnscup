const shortid = require('shortid');

class Record {
	constructor(
		teamnummer,
		naam1,
		naam2,
		naam3,
		club,
		niveau,
		categorie,
		technisch_balans,
		artistiek_balans,
		moeilijkheid_balans,
		aftrekken_balans,
		score_balans,
		technisch_tempo,
		artistiek_tempo,
		moeilijkheid_tempo,
		aftrekken_tempo,
		score_tempo,
		technisch_combi,
		artistiek_combi,
		moeilijkheid_combi,
		aftrekken_combi,
		score_combi
	) {
		this.id = shortid.generate();
		this.teamnummer = teamnummer;
		this.naam1 = naam1;
		this.naam2 = naam2;
		this.naam3 = naam3;
		this.club = club;
		this.niveau = niveau;
		this.categorie = categorie;

		this.technisch_balans = technisch_balans;
		this.artistiek_balans = artistiek_balans;
		this.moeilijkheid_balans = moeilijkheid_balans;
		this.aftrekken_balans = aftrekken_balans;
		this.score_balans = score_balans;

		this.technisch_tempo = technisch_tempo;
		this.artistiek_tempo = artistiek_tempo;
		this.moeilijkheid_tempo = moeilijkheid_tempo;
		this.aftrekken_tempo = aftrekken_tempo;
		this.score_tempo = score_tempo;

		this.technisch_combi = technisch_combi;
		this.artistiek_combi = artistiek_combi;
		this.moeilijkheid_combi = moeilijkheid_combi;
		this.aftrekken_combi = aftrekken_combi;
		this.score_combi = score_combi;
	}
}

module.exports = Record;
