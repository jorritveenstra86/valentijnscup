import {Component, OnInit} from '@angular/core';
import {Oefeningen} from '../../model/entiteiten/oefening';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-invoer-scores',
  templateUrl: './invoer-scores.component.html',
  styleUrls: ['./invoer-scores.component.css']
})
export class InvoerScoresComponent implements OnInit {

  public teamnummers = ['teamnummer 1', 'teamnummer 2', 'teamnummer 3'];
  public oefeningen = Oefeningen;
  public model = {
    teamnummer: '',
    oefening: '',
    technisch: '',
    artistiek: '',
    moeilijkheidswaarde: '',
    specialeAftrekken: ''
  };

  savedScores: Observable<any[]>;

  constructor() {
  }

  ngOnInit() {
  }

  initModel() {
    this.model = {
      teamnummer: '',
      oefening: '',
      technisch: '',
      artistiek: '',
      moeilijkheidswaarde: '',
      specialeAftrekken: ''
    };
  }

  onSubmit() {
    console.log('BOEM!');
    console.log(this.model);
  }

  spyOn(obj) {
    return JSON.stringify(obj);
  }

}
