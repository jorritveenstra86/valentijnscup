import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../shared/team.service';

@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.css']
})

export class SlideComponent implements OnInit {
    public titel = '';
    public categorieen: any[][] = [
        ['A-junior 1', 'Damespaar', 'balans'],
        ['E-instap', 'Damespaar', 'combi']
    ];
    public niveau = 'E-instap';
    public categorie = 'Damespaar';
    public oefening = 'combi';
    public teamArray: any [][] = [];

    constructor(private teamService: TeamService) {
    }

    ngOnInit() {
        for (let i = 0; i < this.categorieen.length; i++) {
            task(i);
            var maakScoreLijst = this.maakScoreLijst(this.categorieen[i][0], this.categorieen[i][1]);
            console.log(this.categorieen[i][0]);
        }
        function task(i) {
            setTimeout(function () {
                maakScoreLijst
            }, 9000 * i);
        }
    }

    maakScoreLijst(niveau, categorie) {
        this.teamService.getTeamPerCategorie(niveau, categorie).subscribe((response: any) => {
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
                    console.log(this.teamArray);
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
