import {Component, OnInit} from '@angular/core';
import {Oefeningen} from '../../model/entiteiten/oefening';
import {Observable} from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invoer-scores',
  templateUrl: './invoer-scores.component.html',
  styleUrls: ['./invoer-scores.component.css']
})
export class InvoerScoresComponent implements OnInit {
  closeResult: string;
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
  public teamnummer; //TODO teamnummer ophalen
  public niveau; //TODO niveau ophalen
  public categorie; //TODO categorie ophalen
  public namen; //TODO naam1+naam2+naam3 ophalen
  public oefening; //TODO oefening ophalen
  public technisch; //TODO technisch ophalen
  public artistiek; //TODO artistiek ophalen
  public moeilijkheidswaarde; //TODO moeilijkheidswaarde ophalen
  public specialeaftrekken; //TODO speciale aftrekken ophalen


  savedScores: Observable<any[]>;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
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
      return  `with: ${reason}`;
    }
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

  spyOn(obj) {
    return JSON.stringify(obj);
  }

}
