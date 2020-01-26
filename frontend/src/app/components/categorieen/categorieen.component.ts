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

  public Dlijngroups = {
    jeugd: false,
    junior: false,
    senior: false
  };

  public Clijngroups = {
    junior: false,
    senior: false
  };

  public Blijngroups = {
    junior: false,
    senior: false
  };

  public Alijngroups = {
    pupillen: false,
    jeugd: false,
    junior1: false,
    junior2: false,
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

  DlijnClick(value) {
    for (let i in this.Dlijngroups) {
      this.lijnClick(this.categorieen.dlijn[i], value);
      this.Dlijngroups[i] = !value;
    }
  }

  ClijnClick(value) {
    for (let i in this.Clijngroups) {
      this.lijnClick(this.categorieen.clijn[i], value);
      this.Clijngroups[i] = !value;
    }
  }

  BlijnClick(value) {
    for (let i in this.Blijngroups) {
      this.lijnClick(this.categorieen.blijn[i], value);
      this.Blijngroups[i] = !value;
    }
  }

  AlijnClick(value) {
    for (let i in this.Alijngroups) {
      this.lijnClick(this.categorieen.alijn[i], value);
      this.Alijngroups[i] = !value;
    }
  }

  lijnClick(obj, value) {
    this.setProps(obj, !value);
  }

  setProps(prop, value) {
    Object.keys(prop).forEach(v => prop[v] = value);
  }
}
