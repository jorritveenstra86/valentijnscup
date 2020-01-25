import {Component, Input, OnInit} from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {TeamService} from '../../shared/team.service';
import {Oefeningen} from '../../model/entiteiten/oefening';

@Component({
  selector: 'app-uitvoer-pdf',
  templateUrl: './uitvoer-pdf.component.html',
  styleUrls: ['./uitvoer-pdf.component.css']
})


export class UitvoerPdfComponent implements OnInit {
  @Input() selectie;
  private uitslag = [];
  private doc = new jsPDF({});
  filename = 'uitslagen.pdf'; // TODO invoerveld maken voor filename
  eerstePagina;

  constructor(private teamService: TeamService) {
  }

  ngOnInit() {
  }

  start() {
    this.eerstePagina = true;
    this.maakTabel('A-pupil', 'Damespaar');
    this.maakTabel('A-junior 1', 'Damespaar');
    // TODO hier komen alle combinaties van niveau en categorie
    // ...
    // ...
    setTimeout(() => {
      // We gaan opslaan. Voor de zekerheid een setTimeout...
      this.saveDoc();
    }, 1000);
  }

  maakTabel(niveau, categorie) {
    this.teamService.getTeamPerCategorie(niveau, categorie).subscribe((response: any) => {
      let entries = [];
      response.forEach(
        (team) => {
          entries = entries.concat(this.createEntriesForTeam(team));
        });
      const titel = niveau + ' / ' + categorie;
      this.genereerPDF(titel, niveau, categorie, entries);
      this.eerstePagina = false;
    });
  }

  createEntriesForTeam(team) {
    // Omdat een team meerdere oefeningen kan doen. Daarom zo ingewikkeld... :(
    const result = [];
    if (team.score_balans) {
      result.push(this.createAutotableEntry(team, Oefeningen[0]));
    }
    if (team.score_tempo) {
      result.push(this.createAutotableEntry(team, Oefeningen[1]));
    }
    if (team.score_combi) {
      result.push(this.createAutotableEntry(team, Oefeningen[2]));
    }
    // we returnen een array met alle tabelEntries voor dit team
    return result;
  }

  createAutotableEntry(team, oefening) {
    const score = this.getScoreByOefening(team, oefening);
    return [
      null, // TODO Plaats moeten we nog berekenen
      null, // TODO: Wat is dit voor veld??? Nummer?
      team.teamnummer,
      team.niveau,
      team.categorie,
      oefening,
      score.technisch,
      score.artistiek,
      score.moeilijkheid,
      score.aftrekken,
      score.score
    ];
  }

  getScoreByOefening(team, oefening) {
    if (oefening === Oefeningen[0]) {
      return {
        technisch: team.technisch_balans,
        artistiek: team.artistiek_balans,
        moeilijkheid: team.moeilijkheid_balans,
        aftrekken: team.aftrekken_balans,
        score: team.score_balans
      };
    }
    if (oefening === Oefeningen[1]) {
      return {
        technisch: team.technisch_tempo,
        artistiek: team.artistiek_tempo,
        moeilijkheid: team.moeilijkheid_tempo,
        aftrekken: team.aftrekken_tempo,
        score: team.score_tempo
      };
    }
    if (oefening === Oefeningen[2]) {
      return {
        technisch: team.technisch_combi,
        artistiek: team.artistiek_combi,
        moeilijkheid: team.moeilijkheid_combi,
        aftrekken: team.aftrekken_combi,
        score: team.score_combi
      };
    }
  }

  genereerPDF(titel, niveau, categorie, entries) {
    if (!this.eerstePagina) {
      this.doc.addPage();
    }
    this.doc.text(titel, 14, 15);
    const head = [['Plaats', 'Nummer', 'Team', 'Niveau', 'Categorie', 'Oefening', 'T', 'A', 'MW', 'Aftr', 'Score']];
    this.doc.autoTable({
      startY: 20,
      head,
      body: entries,
      theme: 'grid',
      headStyles: {fillColor: [252, 15, 192]},
      bodyStyles: {fillColor: [255, 255, 255], lineColor: [252, 15, 192]}
    });
  }

  saveDoc() {
    this.doc.save(this.filename);
  }

}

// TODO: alle gegevens ophalen waarbij de score niet nul is. Dus als balans.score = 0 en tempo.score = 23, dan alleen tempo
//  score gegevens ophalen. Natuurlijk altijd de persoonsgegevens en niveau/cateogrie ophalen
// TODO: alle gegevens opslaan in arrays, gesorteerd op niveau + categorie. Dus bijv 1 array voor alle damesparen E-junioren
// TODO: Alle arrays naar de PDF sturen, waar ze los van elkaar getoond worden met als titel niveau + categorie.
