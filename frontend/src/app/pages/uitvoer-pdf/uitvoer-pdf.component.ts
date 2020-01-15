import {Component, Input, OnInit} from '@angular/core';
import * as jsPDF from 'jspdf';
var mockdata = ['test', 'testdata'];

@Component({
  selector: 'app-uitvoer-pdf',
  templateUrl: './uitvoer-pdf.component.html',
  styleUrls: ['./uitvoer-pdf.component.css']
})


export class UitvoerPdfComponent implements OnInit {
  @Input() selectie;
  constructor() {
  }

  ngOnInit() {
  }

  genereerPDF() {
    const doc = new jsPDF({
    });
    doc.text(mockdata, 10, 10);
    doc.save('uitslagen.pdf');
    console.log(this.selectie);
  }

}
