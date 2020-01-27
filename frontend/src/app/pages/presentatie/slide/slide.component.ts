import { Component, OnInit } from '@angular/core';
import {Oefeningen} from "../../../model/entiteiten/oefening";
import {TeamService} from '../../../shared/team.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  public titel = '';
  public team = {
    plaats: '',
    teamnummer: '',
    namen: '',
    oefening: '',
    technisch: '',
    artistiek: '',
    moeilijkheidswaarde: '',
    specialeAftrekken: '',
    score: 0.0
  };

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.maakScoreLijst('E-instap', 'damespaar');
  }

  maakScoreLijst(niveau, categorie) {
    this.teamService.getTeamPerCategorie(niveau, categorie).subscribe((response: any) => {
      this.titel = niveau + categorie;
      this.team.teamnummer = response.teamnummer;
      this.team.namen = response.naam1 + '\n' + response.naam2 + '\n' + (response.naam3 || '');
      Oefeningen.forEach((oefening) => {
        //             if (entries.length) { // alleen iets afdrukken wanneer er iets is om af te drukken
        //                 this.team.oefening =
        //            }
      });
    });
  }

  sortByScore(teams) {
    return teams.sort((a, b) => {
      return b[b.length - 1] - a[a.length - 1];
    });
  }
}
