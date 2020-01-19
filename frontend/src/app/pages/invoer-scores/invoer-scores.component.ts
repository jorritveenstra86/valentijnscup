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
    teamnummer: 0,
    oefening: '',
    technisch: '',
    artistiek: '',
    moeilijkheidswaarde: '',
    specialeAftrekken: ''
  };
  public niveau;
  public categorie;
  public namen;
  public allTeams = [];

  savedScores: Observable<any[]>;

  constructor(private modalService: NgbModal, private teamService: TeamService) {
  }

  ngOnInit() {
    this.model.oefening = Oefeningen[0];
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
      teamnummer: 0,
      oefening: '',
      technisch: '',
      artistiek: '',
      moeilijkheidswaarde: '',
      specialeAftrekken: ''
    };
  }

  spyOn(obj) {
    return JSON.stringify(obj);
  }

  public getScore() {
    return 0 + parseFloat(this.model.technisch) + parseFloat(this.model.technisch) + parseFloat(this.model.artistiek)
      + parseFloat(this.model.moeilijkheidswaarde) - parseFloat(this.model.specialeAftrekken); // TODO Scores afronden
  }

}

// TODO model.score toevoegen en in getScore laten vullen. Daarna alles putten als er op opslaan geklikt wordt.
