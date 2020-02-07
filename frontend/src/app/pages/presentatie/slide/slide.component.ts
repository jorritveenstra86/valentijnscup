import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../shared/team.service';
import {StateService} from '../../../shared/state.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})

export class SlideComponent implements OnInit {
  public titel = '';
  public cat;
  public categorieen: any[][] = [];
  public teamArray: any [][] = [];

  constructor(private teamService: TeamService, private state: StateService) {
  }

  ngOnInit() {
    this.cat = this.state.geselecteerdeCategorieen;
    console.log(this.cat);

    this.maakCategorieen();
    for (let i = 0; i < this.categorieen.length; i++) {
      //   task(i);
      // var maakScoreLijst =
      this.maakScoreLijst(this.categorieen[i][0], this.categorieen[i][1]);
      // console.log(this.categorieen[i][0]);
    }
    // function task(i) {
    //     setTimeout(function () {
    //         maakScoreLijst
    //     }, 9000 * i);
    // }
  }

  maakScoreLijst(niveau, categorie) {
    this.teamService.getTeamPerCategorie(niveau, categorie).subscribe((response: any) => {
      let count = 0;
      response.forEach((team) => {
        var oefening = 'combi'; //nog aanpassen in een for loop voor elke oefening
        const technisch = 'technisch_' + (oefening).toLowerCase().toString();
        const artistiek = 'artistiek_' + (oefening).toLowerCase().toString();
        const moeilijkheidswaarde = 'moeilijkheid_' + (oefening).toLowerCase().toString();
        const specialeAftrekken = 'aftrekken_' + (oefening).toLowerCase().toString();
        const score = 'score_' + (oefening).toLowerCase().toString();
        if (team[score] != null) {
          this.titel = niveau + ' ' + categorie + ' ' + oefening;
          this.teamArray[count] = [team.teamnummer, team.naam1 + '\n' + team.naam2 + '\n' + (team.naam3 || ''), team[technisch], team[artistiek], team[moeilijkheidswaarde], team[specialeAftrekken], team[score]];
          count++;
          //       console.log(this.teamArray);
        }
      });
    });
  }

  public maakCategorieen() { // vult een array met alle aangevinkte categorieen
    for (const cat in this.cat.elijn) {
      for (const team in this.cat.elijn[cat]) {
        if (this.cat.elijn[cat][team]) {
          this.categorieen.push(['E-' + cat, team]);
        }
      }
    }
    for (const cat in this.cat.dlijn) {
      for (const team in this.cat.dlijn[cat]) {
        if (this.cat.dlijn[cat][team]) {
          this.categorieen.push(['D-' + cat, team]);
        }
      }
    }
    for (const cat in this.cat.clijn) {
      for (const team in this.cat.clijn[cat]) {
        if (this.cat.clijn[cat][team]) {
          this.categorieen.push(['C-' + cat, team]);
        }
      }
    }
    for (const cat in this.cat.blijn) {
      for (const team in this.cat.blijn[cat]) {
        if (this.cat.blijn[cat][team]) {
          this.categorieen.push(['B-' + cat, team]);
        }
      }
    }
    for (const cat in this.cat.alijn) {
      for (const team in this.cat.alijn[cat]) {
        if (this.cat.alijn[cat][team]) {
          this.categorieen.push(['A-' + cat, team]);
        }
      }
    }
    //     console.log(this.categorieen);
  }

  sortByScore(teams) {
    return teams.sort((a, b) => {
      return b[b.length - 1] - a[a.length - 1];
    });
  }
}

