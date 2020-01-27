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
  private geselecteerdTeam;
  public oefeningen;

  private oefeningenPerNiveau = {
    'E-instap': [Oefeningen[2]], // Combinatie
    'E-jeugd': [Oefeningen[2]], // Combinatie
    'E-junior': [Oefeningen[2]], // Combinatie
    'E-senior': [Oefeningen[2]], // Combinatie
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
  };

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
      this.geselecteerdTeam = response; // Op dit punt bewaren we het origineel geselecteerde teamrecord
      this.niveau = response.niveau;
      this.categorie = response.categorie;
      this.namen = response.naam1 + '\n' + response.naam2 + '\n' + (response.naam3 || '');
      this.oefeningen = this.oefeningenPerNiveau[this.niveau];
      if (this.oefeningen.length === 1) {
        this.model.oefening = this.oefeningen[0];
      }
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
    this.geselecteerdTeam = undefined;
  }

  opslaanTeams() {
    const payload = this.geselecteerdTeam; // het origineel geselecteerde team. Hieronder gaan we de velden uit het formulier doorvoeren

    // de gewijzigde velden vullen obv gekozen oefening
    if (this.model.oefening === Oefeningen[0]) { // Balans
      payload.technisch_balans = (Math.round(parseFloat(this.model.technisch)*100)/100).toFixed(2);
      payload.artistiek_balans = (Math.round(parseFloat(this.model.artistiek)*100)/100).toFixed(2);
      payload.moeilijkheid_balans = (Math.round(parseFloat(this.model.moeilijkheidswaarde)*100)/100).toFixed(2);
      payload.aftrekken_balans = (Math.round(parseFloat(this.model.specialeAftrekken)*100)/100).toFixed(2);
      payload.score_balans = (Math.round(this.model.score*100)/100).toFixed(2);
    }
    if (this.model.oefening === Oefeningen[1]) { // Tempo
      payload.technisch_tempo = (Math.round(parseFloat(this.model.technisch)*100)/100).toFixed(2);
      payload.artistiek_tempo = (Math.round(parseFloat(this.model.artistiek)*100)/100).toFixed(2);
      payload.moeilijkheid_tempo = (Math.round(parseFloat(this.model.moeilijkheidswaarde)*100)/100).toFixed(2);
      payload.aftrekken_tempo = (Math.round(parseFloat(this.model.specialeAftrekken)*100)/100).toFixed(2);
      payload.score_tempo = (Math.round(this.model.score*100)/100).toFixed(2);
    }
    if (this.model.oefening === Oefeningen[2]) { // Combinatie
      payload.technisch_combi = (Math.round(parseFloat(this.model.technisch)*100)/100).toFixed(2);
      payload.artistiek_combi = (Math.round(parseFloat(this.model.artistiek)*100)/100).toFixed(2);
      payload.moeilijkheid_combi = (Math.round(parseFloat(this.model.moeilijkheidswaarde)*100)/100).toFixed(2);
      payload.aftrekken_combi = (Math.round(parseFloat(this.model.specialeAftrekken)*100)/100).toFixed(2);
      payload.score_combi = (Math.round(this.model.score*100)/100).toFixed(2);
    }

    // pas nu de payload klaar is mogen we putTeam aanroepen
    this.teamService.putTeam(payload).subscribe((response: any) => {
      // op dit punt is de PUT succesvol verlopen. Het enige wat we moeten doen is de modal sluiten
      this.modalService.dismissAll();
      // oja en het scherm leegmaken.
      this.initModel();
    }, (error) => console.error(error));
  }

  spyOn(obj) {
    return JSON.stringify(obj);
  }

  public getScore() {
    this.model.score = 0 + parseFloat(this.model.technisch) + parseFloat(this.model.technisch) + parseFloat(this.model.artistiek)
      + parseFloat(this.model.moeilijkheidswaarde) - parseFloat(this.model.specialeAftrekken);
    return this.model.score.toFixed(2);
  }

  getNamen() {
    let namen = '';
    if (this.geselecteerdTeam) {
      namen = this.geselecteerdTeam.naam1 + ' / ' + this.geselecteerdTeam.naam2 + (this.geselecteerdTeam.naam3 ? ' / '
        + this.geselecteerdTeam.naam3 : '');
    }
    return namen;
  }

  getNivCat() {
    let nivCat = '';
    if (this.geselecteerdTeam) {
      nivCat = this.geselecteerdTeam.niveau + ' / ' + this.geselecteerdTeam.categorie;
    }
    return nivCat;
  }

}
