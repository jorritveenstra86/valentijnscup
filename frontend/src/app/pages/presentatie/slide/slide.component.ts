import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../shared/team.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})

export class SlideComponent implements OnInit {
    public titel = '';
    public niveau = 'E-instap';
    public categorie = 'Damespaar';
    public oefening = 'combi';
    public teamArray: any [][] = [];

  constructor(private teamService: TeamService) {
    }

    ngOnInit() {
        this.maakScoreLijst(this.niveau, this.categorie);
    }

    maakScoreLijst(niveau, categorie) {
        this.teamService.getTeamPerCategorie(this.niveau, this.categorie).subscribe((response: any) => {
              let count = 0;
              response.forEach((team) => {
                const technisch = 'technisch_' + (this.oefening).toLowerCase().toString();
                const artistiek = 'artistiek_' + (this.oefening).toLowerCase().toString();
                const moeilijkheidswaarde = 'moeilijkheid_' + (this.oefening).toLowerCase().toString();
                const specialeAftrekken = 'aftrekken_' + (this.oefening).toLowerCase().toString();
                const score = 'score_' + (this.oefening).toLowerCase().toString();
                if (team[score] != null) {
                  this.titel = niveau + ' ' + categorie + ' ' + this.oefening;
                  this.teamArray[count] = [team.teamnummer, team.naam1 + '\n' + team.naam2 + '\n' + (team.naam3 || ''), team[technisch], team[artistiek], team[moeilijkheidswaarde], team[specialeAftrekken], team[score]];
                  count++;
                }
              });
            });
    }

    sortByScore(teams) {
        return teams.sort((a, b) => {
            return b[b.length - 1] - a[a.length - 1];
        });
    }
}
