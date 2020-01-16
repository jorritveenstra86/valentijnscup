import {Component, Input, OnInit} from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
    selector: 'app-uitvoer-pdf',
    templateUrl: './uitvoer-pdf.component.html',
    styleUrls: ['./uitvoer-pdf.component.css']
})


export class UitvoerPdfComponent implements OnInit {
    @Input() selectie;

    mockData = [
        [1, 123, 'Roel Noorman', 'E-junioren', 'Damespaar', 'Combinatie', 8.35, 7.85, 0.67, 0.30, 24.300],
        [, , 'Henk Noorman'],
        [2, 125, 'Jorrit Veenstra', 'E-junioren', 'Damespaar', 'Combinatie', 8.25, 7.50, 0.53, 0.30, 23.300],
        [, , 'Henk Veenstra']
    ];

    constructor() {
    }

    ngOnInit() {
    }

    genereerPDF() {
        const doc = new jsPDF({});
        const head = [['Plaats', 'Nummer', 'Team', 'Niveau', 'Categorie', 'Oefening', 'T', 'A', 'MW', 'Aftr', 'Score']];
        doc.autoTable({
            head,
            body: this.mockData,
            theme: 'grid',
            headStyles: {fillColor: [252, 15, 192]},
            bodyStyles: {fillColor: [255, 255, 255], lineColor: [252, 15, 192]}
        });
        doc.save('uitslagen.pdf');
        console.log(this.selectie);

    }

}
