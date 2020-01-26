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
  public filename = 'uitslagen.pdf';
  private doc = new jsPDF({});
  private eerstePagina;
  private paginas = [
    ['E-instap', 'Damespaar'],
    ['E-instap', 'Herenpaar'],
    ['E-instap', 'Mixpaar'],
    ['E-instap', 'Damesgroep'],
    ['E-instap', 'Herengroep'],
    ['E-jeugd', 'Damespaar'],
    ['E-jeugd', 'Herenpaar'],
    ['E-jeugd', 'Mixpaar'],
    ['E-jeugd', 'Damesgroep'],
    ['E-jeugd', 'Herengroep'],
    ['E-junior', 'Damespaar'],
    ['E-junior', 'Herenpaar'],
    ['E-junior', 'Mixpaar'],
    ['E-junior', 'Damesgroep'],
    ['E-junior', 'Herengroep'],
    ['E-senior', 'Damespaar'],
    ['E-senior', 'Herenpaar'],
    ['E-senior', 'Mixpaar'],
    ['E-senior', 'Damesgroep'],
    ['E-senior', 'Herengroep'],
    ['D-jeugd', 'Damespaar'],
    ['D-jeugd', 'Herenpaar'],
    ['D-jeugd', 'Mixpaar'],
    ['D-jeugd', 'Damesgroep'],
    ['D-jeugd', 'Herengroep'],
    ['D-junior', 'Damespaar'],
    ['D-junior', 'Herenpaar'],
    ['D-junior', 'Mixpaar'],
    ['D-junior', 'Damesgroep'],
    ['D-junior', 'Herengroep'],
    ['D-senior', 'Damespaar'],
    ['D-senior', 'Herenpaar'],
    ['D-senior', 'Mixpaar'],
    ['D-senior', 'Damesgroep'],
    ['D-senior', 'Herengroep'],
    ['C-junior', 'Damespaar'],
    ['C-junior', 'Herenpaar'],
    ['C-junior', 'Mixpaar'],
    ['C-junior', 'Damesgroep'],
    ['C-junior', 'Herengroep'],
    ['C-senior', 'Damespaar'],
    ['C-senior', 'Herenpaar'],
    ['C-senior', 'Mixpaar'],
    ['C-senior', 'Damesgroep'],
    ['C-senior', 'Herengroep'],
    ['B-junior', 'Damespaar'],
    ['B-junior', 'Herenpaar'],
    ['B-junior', 'Mixpaar'],
    ['B-junior', 'Damesgroep'],
    ['B-junior', 'Herengroep'],
    ['B-senior', 'Damespaar'],
    ['B-senior', 'Herenpaar'],
    ['B-senior', 'Mixpaar'],
    ['B-senior', 'Damesgroep'],
    ['B-senior', 'Herengroep'],
    ['A-pupil', 'Damespaar'],
    ['A-pupil', 'Herenpaar'],
    ['A-pupil', 'Mixpaar'],
    ['A-pupil', 'Damesgroep'],
    ['A-pupil', 'Herengroep'],
    ['A-jeugd', 'Damespaar'],
    ['A-jeugd', 'Herenpaar'],
    ['A-jeugd', 'Mixpaar'],
    ['A-jeugd', 'Damesgroep'],
    ['A-jeugd', 'Herengroep'],
    ['A-junior 1', 'Damespaar'],
    ['A-junior 1', 'Herenpaar'],
    ['A-junior 1', 'Mixpaar'],
    ['A-junior 1', 'Damesgroep'],
    ['A-junior 1', 'Herengroep'],
    ['A-junior 2', 'Damespaar'],
    ['A-junior 2', 'Herenpaar'],
    ['A-junior 2', 'Mixpaar'],
    ['A-junior 2', 'Damesgroep'],
    ['A-junior 2', 'Herengroep'],
    ['A-senior', 'Damespaar'],
    ['A-senior', 'Herenpaar'],
    ['A-senior', 'Mixpaar'],
    ['A-senior', 'Damesgroep'],
    ['A-senior', 'Herengroep'],
  ];

  constructor(private teamService: TeamService) {
  }

  ngOnInit() {
  }

  start() {
    this.eerstePagina = true;
    this.paginas.forEach((combi) => {
      this.maakTabel(combi[0], combi[1]);
    });

    setTimeout(() => {
      // We gaan opslaan. Voor de zekerheid een setTimeout...
      this.saveDoc();
    }, 1000);
  }

  maakTabel(niveau, categorie) {
    this.teamService.getTeamPerCategorie(niveau, categorie).subscribe((response: any) => {
      Oefeningen.forEach((oefening) => {
        let entries = [];
        response.forEach(
          (team) => {
            entries = entries.concat(this.createEntriesForTeam(team, oefening));
          });
        const titel = niveau + ' / ' + categorie + ' - ' + oefening;
        if (entries.length) { // alleen iets afdrukken wanneer er iets is om af te drukken
          this.genereerPDF(titel, this.addIndex(this.sortByScore(entries)));
          this.eerstePagina = false;
        }
      });
    });
  }

  createEntriesForTeam(team, oefening) {
    const result = [];
    if (team.score_balans && oefening === Oefeningen[0]) { // Balans
      result.push(this.createAutotableEntry(team, Oefeningen[0]));
    }
    if (team.score_tempo && oefening === Oefeningen[1]) { // Tempo
      result.push(this.createAutotableEntry(team, Oefeningen[1]));
    }
    if (team.score_combi && oefening === Oefeningen[2]) { // Combinatie
      result.push(this.createAutotableEntry(team, Oefeningen[2]));
    }
    return result;
  }

  createAutotableEntry(team, oefening) {
    const score = this.getScoreByOefening(team, oefening);
    return [
      // null, // De plaats wordt later toegevoegd (index na sortering op score)
      team.teamnummer,
      this.getNamen(team),
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

  getNamen(team) {
    return team.naam1 + '\n' + team.naam2 + (team.naam3 ? ('\n' + team.naam3) : '');
  }

  sortByScore(teams) {
    return teams.sort((a, b) => {
      return  b[b.length - 1] - a[a.length - 1];
    });
  }

  addIndex(teams) {
    const result = [];
    for (let index = 0; index < teams.length; index++) {
      const indexedTeam = teams[index];
      indexedTeam.unshift('' + (index + 1));
      result.push(indexedTeam);
    }
    return result;
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

  genereerPDF(titel, entries) {
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
