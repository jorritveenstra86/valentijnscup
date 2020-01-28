import {Component, OnInit} from '@angular/core';
import {Oefeningen} from '../../../model/entiteiten/oefening';
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
        technisch: '',
        artistiek: '',
        moeilijkheidswaarde: '',
        specialeAftrekken: '',
        score: '',
    };

    constructor(private teamService: TeamService) {
    }

    ngOnInit() {
        this.maakScoreLijst('B-senior', 'damesgroep');
    }

    maakScoreLijst(niveau, categorie) {
        this.teamService.getTeam(239).subscribe((response: any) => {
            this.team.teamnummer = response.teamnummer;
            this.team.namen = response.naam1 + '\n' + response.naam2 + '\n' + (response.naam3 || '');
            Oefeningen.forEach((oefening) => {
                const technisch = 'response.technisch_' + (oefening).toString();
                this.titel = niveau + ' ' + categorie + ' ' + oefening;
                this.team.technisch = JSON.parse(technisch);
                this.team.artistiek = response.artistiek_balans;
                this.team.moeilijkheidswaarde = response.moeilijkheid_balans;
                this.team.specialeAftrekken = response.aftrekken_balans;
                this.team.score = response.score_balans;
            });
        });
    }

    // TODO: getteampercategorie ipv getteam
    // TODO: scores per categorie ipv alles bij elkaar

    sortByScore(teams) {
        return teams.sort((a, b) => {
            return b[b.length - 1] - a[a.length - 1];
        });
    }
}
