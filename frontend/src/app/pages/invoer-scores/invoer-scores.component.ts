import {Component, OnInit} from '@angular/core';
import {Oefeningen} from '../../model/entiteiten/oefening';
import {Observable} from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TeamService} from '../../shared/team.service';

@Component({
  selector: 'app-invoer-scores',
  templateUrl: './invoer-scores.component.html',
  styleUrls: ['./invoer-scores.component.css']
})
export class InvoerScoresComponent implements OnInit {
  closeResult: string;
  public oefeningen = Oefeningen;
  public model = {
    teamnummer: '',
    oefening: '',
    technisch: '',
    artistiek: '',
    moeilijkheidswaarde: '',
    specialeAftrekken: '',
    score: 0.0
  };
  public niveau;
  public categorie;
  public namen;
  public allTeams = [];
  private payload;

  private oefeningenPerNiveau = {
    'E-instap': [Oefeningen[2]], // Combinatie
    'E-jeugd': [Oefeningen[2]], // Combinatie
    'E-junioren': [Oefeningen[2]], // Combinatie
    'E-senioren': [Oefeningen[2]], // Combinatie
    'D-jeugd': [Oefeningen[2]], // Combinatie
    'D-junior': [Oefeningen[2]], // Combinatie
    'D-senior': [Oefeningen[2]], // Combinatie
    'C-junior': [Oefeningen[0], Oefeningen[1]], // Balans, Tempo
    'C-senior': [Oefeningen[0], Oefeningen[1]], // Balans, Tempo
    'B-junior': [Oefeningen[0], Oefeningen[1]], // Balans, Tempo
    'B-senior': [Oefeningen[0], Oefeningen[1]], // Balans, Tempo
    'A-pupil': [Oefeningen[2]], // Combinatie
    'A-jeugd': [Oefeningen[0], Oefeningen[1]], // Balans, Tempo
    'A-junior 1': [Oefeningen[0], Oefeningen[1], Oefeningen[2]], // Balans, Tempo, Combinatie
    'A-junior 2': [Oefeningen[0], Oefeningen[1], Oefeningen[2]], // Balans, Tempo, Combinatie
    'A-senioren': [Oefeningen[0], Oefeningen[1], Oefeningen[2]], // Balans, Tempo, Combinatie
  }

  savedScores: Observable<any[]>;

  constructor(private modalService: NgbModal, private teamService: TeamService) {
  }

  ngOnInit() {
    this.teamService.getTeams().subscribe((response: any) => {
      this.allTeams = response;
    });
  }

  updateFields() {
    // Getting selected team from database
    this.teamService.getTeam(this.model.teamnummer).subscribe((response: any) => {
      this.niveau = response.niveau;
      this.categorie = response.categorie;
      this.namen = response.naam1 + '\n' + response.naam2 + '\n' + (response.naam3 || '');
      this.doUpdateFields(response);
    });
  }

  doUpdateFields(response) {
    if (this.model.oefening === Oefeningen[0]) { // Balans
      this.model.technisch = response.technisch_balans;
      this.model.artistiek = response.artistiek_balans;
      this.model.moeilijkheidswaarde = response.moeilijkheid_balans;
      this.model.specialeAftrekken = response.aftrekken_balans;
    }
    if (this.model.oefening === Oefeningen[1]) { // Tempo
      this.model.technisch = response.technisch_tempo;
      this.model.artistiek = response.artistiek_tempo;
      this.model.moeilijkheidswaarde = response.moeilijkheid_tempo;
      this.model.specialeAftrekken = response.aftrekken_tempo;
    }
    if (this.model.oefening === Oefeningen[2]) { // Combinatie
      this.model.technisch = response.technisch_combi;
      this.model.artistiek = response.artistiek_combi;
      this.model.moeilijkheidswaarde = response.moeilijkheid_combi;
      this.model.specialeAftrekken = response.aftrekken_combi;
    }
  }

  doUpdateRecord() {
    //update record to give to the PUT
    if (this.model.oefening === Oefeningen[0]) { // Balans
      this.payload.technisch_balans = this.model.technisch;
      this.payload.artistiek_balans = this.model.artistiek;
      this.payload.moeilijkheid_balans = this.model.moeilijkheidswaarde;
      this.payload.aftrekken_balans = this.model.specialeAftrekken;
      this.payload.score_balans = this.model.score;
    }
    if (this.model.oefening === Oefeningen[1]) { // Tempo
      this.payload.technisch_tempo = this.model.technisch;
      this.payload.artistiek_tempo = this.model.artistiek;
      this.payload.moeilijkheid_tempo = this.model.moeilijkheidswaarde;
      this.payload.aftrekken_tempo = this.model.specialeAftrekken;
      this.payload.score_tempo = this.model.score;
    }
    if (this.model.oefening === Oefeningen[2]) { // Combinatie
      this.payload.technisch_combi = this.model.technisch;
      this.payload.artistiek_combi = this.model.artistiek;
      this.payload.moeilijkheid_combi = this.model.moeilijkheidswaarde;
      this.payload.aftrekken_combi = this.model.specialeAftrekken;
      this.payload.score_combi = this.model.score;
    }
  }

  onSubmit(content) {
    this.modalService.open(content, {ariaLabelledBy: 'myModal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  initModel() {
    this.model = {
      teamnummer: '',
      oefening: '',
      technisch: '',
      artistiek: '',
      moeilijkheidswaarde: '',
      specialeAftrekken: '',
      score: 0.0
    };
  }

  opslaanTeams() {
    this.teamService.putTeam(this.payload).subscribe((response: any) => {
      this.doUpdateRecord();
      this.modalService.dismissAll();
    });
  }

  spyOn(obj) {
    return JSON.stringify(obj);
  }

  public getScore() {
    this.model.score = 0 + parseFloat(this.model.technisch) + parseFloat(this.model.technisch) + parseFloat(this.model.artistiek)
      + parseFloat(this.model.moeilijkheidswaarde) - parseFloat(this.model.specialeAftrekken);
     return this.model.score.toFixed(2);
  }

}
// TODO: Niet alle oefeningen tonen bij elk niveau. E+D+A-pup = combi. B+C+Ajeugd = balans en tempo. Ajun+Asen = balans en tempo en combi.