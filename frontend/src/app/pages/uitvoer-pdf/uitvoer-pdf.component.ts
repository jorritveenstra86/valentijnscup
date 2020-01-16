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
  constructor() {
  }

  ngOnInit() {
  }

  genereerPDF() {
    const doc = new jsPDF({
    });
    var head = [["ID", "Country", "Rank", "Capital"]];
    var body = [
      [1, "Denmark", 7.526, "Copenhagen"],
      [2, "Switzerland", 	7.509, "Bern"],
      [3, "Iceland", 7.501, "Reykjavík"]
    ];
    doc.autoTable({head: head, body: body});
    doc.autoTable({html: '#my-table'});
    doc.save('uitslagen.pdf');
    console.log(this.selectie);
  }

}
