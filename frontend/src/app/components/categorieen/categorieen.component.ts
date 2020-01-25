import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-categorieen',
  templateUrl: './categorieen.component.html',
  styleUrls: ['./categorieen.component.css']
})

export class CategorieenComponent implements OnInit {
  @Output() selectie = new EventEmitter();
  @ViewChild('selectieForm', {static: false}) selectieForm;
  public categorieen = {
    elijn: {
      instap: {
        damespaar: false,
        herenpaar: false,
        mixpaar: false,
        damesgroep: false,
        herengroep: false,
      },
      jeugd: {
        damespaar: false,
        herenpaar: false,
        mixpaar: false,
        damesgroep: false,
        herengroep: false,
      },
      junior: {
        damespaar: false,
        herenpaar: false,
        mixpaar: false,
        damesgroep: false,
        herengroep: false,
      },
      senior: {
        damespaar: false,
        herenpaar: false,
        mixpaar: false,
        damesgroep: false,
        herengroep: false,
      }
    },
    dlijn: {
      jeugd: {
        damespaar: false,
        herenpaar: false,
        mixpaar: false,
        damesgroep: false,
        herengroep: false,
      },
      junior: {
        damespaar: false,
        herenpaar: false,
        mixpaar: false,
        damesgroep: false,
        herengroep: false,
      },
      senior: {
        damespaar: false,
        herenpaar: false,
        mixpaar: false,
        damesgroep: false,
        herengroep: false,
      }
    },
    clijn: {
      junior: {
        damespaar: false,
        herenpaar: false,
        mixpaar: false,
        damesgroep: false,
        herengroep: false,
      },
      senior: {
        damespaar: false,
        herenpaar: false,
        mixpaar: false,
        damesgroep: false,
        herengroep: false,
      }
    },
    blijn: {
      junior: {
        damespaar: false,
        herenpaar: false,
        mixpaar: false,
        damesgroep: false,
        herengroep: false,
      },
      senior: {
        damespaar: false,
        herenpaar: false,
        mixpaar: false,
        damesgroep: false,
        herengroep: false,
      }
    },
    alijn: {
      pupillen: {
        damespaar: false,
        herenpaar: false,
        mixpaar: false,
        damesgroep: false,
        herengroep: false,
      },
      jeugd: {
        damespaar: false,
        herenpaar: false,
        mixpaar: false,
        damesgroep: false,
        herengroep: false,
      },
      junior1: {
        damespaar: false,
        herenpaar: false,
        mixpaar: false,
        damesgroep: false,
        herengroep: false,
      },
      junior2: {
        damespaar: false,
        herenpaar: false,
        mixpaar: false,
        damesgroep: false,
        herengroep: false,
      },
      senior: {
        damespaar: false,
        herenpaar: false,
        mixpaar: false,
        damesgroep: false,
        herengroep: false,
      }
    }
  };

  public Niveaus = {
    Elijn: false,
    Dlijn: false,
    Clijn: false,
    Blijn: false,
    Alijn: false
  };

  public Elijngroups = {
    instap: false,
    jeugd: false,
    junior: false,
    senior: false
};

  ngOnInit() {
  }

  onSubmit() {
    this.selectie.emit(this.categorieen);
  }

  ElijnClick(value) {
    for (let i in this.Elijngroups) {
      this.lijnClick(this.categorieen.elijn[i], value);
      this.Elijngroups[i] = !value;
    }
  }

  lijnClick(obj, value) {
    this.setProps(obj, !value);
  }

  setProps(prop, value) {
    Object.keys(prop).forEach(v => prop[v] = value);
  }
}
