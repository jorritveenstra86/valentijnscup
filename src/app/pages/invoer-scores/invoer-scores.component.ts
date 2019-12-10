import {Component, OnInit} from '@angular/core';
import {Niveaus} from '../../model/niveau';
import {Categorieen} from '../../model/categorie';
import {Observable} from 'rxjs';
import {TestService} from '../../shared/test.service';

@Component({
  selector: 'app-invoer-scores',
  templateUrl: './invoer-scores.component.html',
  styleUrls: ['./invoer-scores.component.css']
})
export class InvoerScoresComponent implements OnInit {

  public niveaus = Niveaus;
  public teamnummers = ['teamnummer 1', 'teamnummer 2', 'teamnummer 3'];
  public oefeningen = Categorieen;
  public model = {
    niveau: '',
    teamnummer: '',
    oefening: '',
    technisch: '',
    artistiek: '',
    moeilijkheidswaarde: '',
    specialeAftrekken: ''
  };

  savedScores: Observable<any[]>;

  constructor(private testServiceService: TestService) {
    this.savedScores = testServiceService.getScores();
  }

  ngOnInit() {
  }

  initModel() {
    this.model = {
      niveau: '',
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
    this.testServiceService.saveScore(this.model);
  }

  spyOn(obj) {
    return JSON.stringify(obj);
  }

}
