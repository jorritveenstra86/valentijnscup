import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorieen',
  templateUrl: './categorieen.component.html',
  styleUrls: ['./categorieen.component.css']
})
export class CategorieenComponent implements OnInit {

  niveaus: any;
  categorieen: any;
  selectedAllniveau: any;
  selectedAllcat: any;
  constructor() {
    this.niveaus = [
      { niveau: 'Instap', selected: false },
      { niveau: 'Jeugd', selected: false },
      { niveau: 'Junioren', selected: false },
      { niveau: 'Senioren', selected: false },
    ];
    this.categorieen = [
      { categorie: 'Damespaar', selected: false },
      { categorie: 'Herenpaar', selected: false },
      { categorie: 'Mixpaar', selected: false },
      { categorie: 'Damesgroep', selected: false },
      { categorie: 'Herengroep', selected: false },
    ];
  }
  selectAllniveau() {
    this.selectedAllniveau = !this.selectedAllniveau;

    for (let i = 0; i < this.niveaus.length; i++) {
      this.niveaus[i].selected = this.selectedAllniveau;
    }
  }
  checkIfAllSelectedniveau() {
    let totalSelected =  0;
    for (let i = 0; i < this.niveaus.length; i++) {
      if (this.niveaus[i].selected) { totalSelected++; }
    }
    this.selectedAllniveau = totalSelected === this.niveaus.length;
    return true;
  }
  selectAllcat() {
    this.selectedAllcat = !this.selectedAllcat;

    for (let i = 0; i < this.categorieen.length; i++) {
      this.categorieen[i].selected = this.selectedAllcat;
    }
  }
  checkIfAllSelectedcat() {
    let totalSelected =  0;
    for (let i = 0; i < this.categorieen.length; i++) {
      if (this.categorieen[i].selected) { totalSelected++; }
    }
    this.selectedAllcat = totalSelected === this.categorieen.length;
    return true;
  }
  ngOnInit() {
  }
}
