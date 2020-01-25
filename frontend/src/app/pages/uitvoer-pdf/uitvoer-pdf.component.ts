import {Component, Input, OnInit} from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {TeamService} from '../../shared/team.service';

@Component({
  selector: 'app-uitvoer-pdf',
  templateUrl: './uitvoer-pdf.component.html',
  styleUrls: ['./uitvoer-pdf.component.css']
})


export class UitvoerPdfComponent implements OnInit {
  @Input() selectie;
  private uitslag = [];

  constructor(private teamService: TeamService) {
  }

  ngOnInit() {
    this.teamService.getTeamPerCategorie('E-junior', 'Damespaar').subscribe((response: any) => {
      this.uitslag = response.uitslag;
    });
  }

  doElijn() {

  }

  genereerPDF() {
    const doc = new jsPDF({});
    const head = [['Plaats', 'Nummer', 'Team', 'Niveau', 'Categorie', 'Oefening', 'T', 'A', 'MW', 'Aftr', 'Score']];
    doc.autoTable({
      head,
      body: this.uitslag,
      theme: 'grid',
      headStyles: {fillColor: [252, 15, 192]},
      bodyStyles: {fillColor: [255, 255, 255], lineColor: [252, 15, 192]}
    });
    doc.save('uitslagen.pdf');

  }

}

// TODO: alle gegevens ophalen waarbij de score niet nul is. Dus als balans.score = 0 en tempo.score = 23, dan alleen tempo
//  score gegevens ophalen. Natuurlijk altijd de persoonsgegevens en niveau/cateogrie ophalen
// TODO: alle gegevens opslaan in arrays, gesorteerd op niveau + categorie. Dus bijv 1 array voor alle damesparen E-junioren
// TODO: Alle arrays naar de PDF sturen, waar ze los van elkaar getoond worden met als titel niveau + categorie.
