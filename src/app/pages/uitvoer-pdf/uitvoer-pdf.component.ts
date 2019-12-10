import {Component, OnInit} from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-uitvoer-pdf',
  templateUrl: './uitvoer-pdf.component.html',
  styleUrls: ['./uitvoer-pdf.component.css']
})
export class UitvoerPdfComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  genereerPDF() {
    const doc = new jsPDF();
    doc.text('Suck it yourself, Noorman!', 10, 10);
    doc.save('a4.pdf');
  }

}
