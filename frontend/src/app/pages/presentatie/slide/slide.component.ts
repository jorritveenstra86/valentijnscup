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
        technisch_balans: '',
        artistiek_balans: '',
        moeilijkheidswaarde_balans: '',
        specialeAftrekken_balans: '',
        score_balans: '',
        technisch_tempo: '',
        artistiek_tempo: '',
        moeilijkheidswaarde_tempo: '',
        specialeAftrekken_tempo: '',
        score_tempo: '',
        technisch_combi: '',
        artistiek_combi: '',
        moeilijkheidswaarde_combi: '',
        specialeAftrekken_combi: '',
        score_combi: ''
    };

    constructor(private teamService: TeamService) {
    }

    ngOnInit() {
        this.maakScoreLijst('B-senior', 'damesgroep');
    }

    maakScoreLijst(niveau, categorie) {
        this.teamService.getTeam(239).subscribe((response: any) => {
            this.titel = niveau + ' ' + categorie;
            this.team.teamnummer = response.teamnummer;
            this.team.namen = response.naam1 + '\n' + response.naam2 + '\n' + (response.naam3 || '');
            this.team.technisch_balans = response.technisch_balans;
            this.team.artistiek_balans = response.artistiek_balans;
            this.team.moeilijkheidswaarde_balans = response.moeilijkheid_balans;
            this.team.specialeAftrekken_balans = response.aftrekken_balans;
            this.team.score_balans = response.score_balans;
            this.team.technisch_tempo = response.technisch_tempo;
            this.team.artistiek_tempo = response.artistiek_tempo;
            this.team.moeilijkheidswaarde_tempo = response.moeilijkheid_tempo;
            this.team.specialeAftrekken_tempo = response.aftrekken_tempo;
            this.team.score_tempo = response.score_tempo;
            this.team.technisch_combi = response.technisch_combi;
            this.team.artistiek_combi = response.artistiek_combi;
            this.team.moeilijkheidswaarde_combi = response.moeilijkheid_combi;
            this.team.specialeAftrekken_combi = response.aftrekken_combi;
            this.team.score_combi = response.score_combbi;
        });
    }

    // TODO: getteampercategorie ipv getteam

    sortByScore(teams) {
        return teams.sort((a, b) => {
            return b[b.length - 1] - a[a.length - 1];
        });
    }
}
