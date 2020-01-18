import {Component, Input, OnInit} from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {TeamService} from '../../shared/team.service';
import {Observable} from 'rxjs';

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
        this.teamService.getTeamPerCategorie('E-junior', 'Damespaar').subscribe((response:any) => {
        this.uitslag = response.uitslag});
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
        console.log(this.selectie);

    }

}
