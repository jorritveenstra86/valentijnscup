import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../shared/team.service';
import {StateService} from '../../../shared/state.service';
import {Oefeningen} from '../../../model/entiteiten/oefening';

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
  public allArray: any [][] = [];
  public slideArray: any = [];
  public aantalCat = 0;
  public aantalTeams = 0;
  public oefeningen = Oefeningen;

  constructor(private teamService: TeamService, private state: StateService) {
  }

  ngOnInit() {
    this.cat = this.state.geselecteerdeCategorieen;
    this.maakCategorieen();
    this.maakAllArray();
    this.vulSlides();
  }

    vulSlides() {
    let index = 0;
    setInterval(() => {
        this.slideArray = this.allArray[index];
        this.titel = this.slideArray[0][0];
      if (index < this.allArray.length-1) {
          index++;
        } else {
          index = 0;
        }
      }, 2000)
    }

  maakAllArray() { //vult de allArray met alle categorieen die getoond moeten worden
    for (let i = 0; i < this.categorieen.length; i++) {
      let niveau = this.categorieen[i][0];
      let categorie = this.categorieen[i][1];
      this.teamService.getTeamPerCategorie(niveau, categorie).subscribe((response: any) => {
        for(let j = 0; j < this.oefeningen.length; j++) {
          this.teamArray = [];
          response.forEach((team) => {
            var oefening = this.oefeningen[j].toLowerCase().toString();
            const technisch = 'technisch_' + (oefening);
            const artistiek = 'artistiek_' + (oefening);
            const moeilijkheidswaarde = 'moeilijkheid_' + (oefening);
            const specialeAftrekken = 'aftrekken_' + (oefening);
            const score = 'score_' + (oefening);
            if (team[score]) {
              this.teamArray[this.aantalTeams] = [niveau + ' ' + categorie + ' ' + oefening, team.teamnummer, team.naam1 + '\n' + team.naam2 + '\n' + (team.naam3 || ''), team[technisch], team[artistiek], team[moeilijkheidswaarde], team[specialeAftrekken], team[score]];
              this.aantalTeams++;
            }
          });
          if(this.teamArray.length) {
          this.allArray[this.aantalCat] = this.teamArray;
          this.aantalCat++;
          this.aantalTeams = 0;
        }
        }
      });
    }
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
  }

  sortByScore(teams) {
    return teams.sort((a, b) => {
      return b[b.length - 1] - a[a.length - 1];
    });
  }
}

