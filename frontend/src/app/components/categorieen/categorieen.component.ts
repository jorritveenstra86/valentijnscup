import {Component, EventEmitter, Injectable, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-categorieen',
  templateUrl: './categorieen.component.html',
  styleUrls: ['./categorieen.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class CategorieenComponent implements OnInit {
  @Output() selectie = new EventEmitter();
  @ViewChild('selectieForm', {static: false}) selectieForm;

public categorieen = {
    elijn: {
      instap: {
        Damespaar: false,
        Herenpaar: false,
        Mixpaar: false,
        Damesgroep: false,
        Herengroep: false,
      },
      jeugd: {
        Damespaar: false,
        Herenpaar: false,
        Mixpaar: false,
        Damesgroep: false,
        Herengroep: false,
      },
      junior: {
        Damespaar: false,
        Herenpaar: false,
        Mixpaar: false,
        Damesgroep: false,
        Herengroep: false,
      },
      senior: {
        Damespaar: false,
        Herenpaar: false,
        Mixpaar: false,
        Damesgroep: false,
        Herengroep: false,
      }
    },
    dlijn: {
      jeugd: {
        Damespaar: false,
        Herenpaar: false,
        Mixpaar: false,
        Damesgroep: false,
        Herengroep: false,
      },
      junior: {
        Damespaar: false,
        Herenpaar: false,
        Mixpaar: false,
        Damesgroep: false,
        Herengroep: false,
      },
      senior: {
        Damespaar: false,
        Herenpaar: false,
        Mixpaar: false,
        Damesgroep: false,
        Herengroep: false,
      }
    },
    clijn: {
      junior: {
        Damespaar: false,
        Herenpaar: false,
        Mixpaar: false,
        Damesgroep: false,
        Herengroep: false,
      },
      senior: {
        Damespaar: false,
        Herenpaar: false,
        Mixpaar: false,
        Damesgroep: false,
        Herengroep: false,
      }
    },
    blijn: {
      junior: {
        Damespaar: false,
        Herenpaar: false,
        Mixpaar: false,
        Damesgroep: false,
        Herengroep: false,
      },
      senior: {
        Damespaar: false,
        Herenpaar: false,
        Mixpaar: false,
        Damesgroep: false,
        Herengroep: false,
      }
    },
    alijn: {
      pupillen: {
        Damespaar: false,
        Herenpaar: false,
        Mixpaar: false,
        Damesgroep: false,
        Herengroep: false,
      },
      jeugd: {
        Damespaar: false,
        Herenpaar: false,
        Mixpaar: false,
        Damesgroep: false,
        Herengroep: false,
      },
      junior1: {
        Damespaar: false,
        Herenpaar: false,
        Mixpaar: false,
        Damesgroep: false,
        Herengroep: false,
      },
      junior2: {
        Damespaar: false,
        Herenpaar: false,
        Mixpaar: false,
        Damesgroep: false,
        Herengroep: false,
      },
      senior: {
        Damespaar: false,
        Herenpaar: false,
        Mixpaar: false,
        Damesgroep: false,
        Herengroep: false,
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
    console.log("test");
  }

  ElijnClick(value) {
    for (const i in this.Elijngroups) {
      this.lijnClick(this.categorieen.elijn[i], value);
      this.Elijngroups[i] = !value;
    }
  }

  DlijnClick(value) {
    for (const i in this.Dlijngroups) {
      this.lijnClick(this.categorieen.dlijn[i], value);
      this.Dlijngroups[i] = !value;
    }
  }

  ClijnClick(value) {
    for (const i in this.Clijngroups) {
      this.lijnClick(this.categorieen.clijn[i], value);
      this.Clijngroups[i] = !value;
    }
  }

  BlijnClick(value) {
    for (const i in this.Blijngroups) {
      this.lijnClick(this.categorieen.blijn[i], value);
      this.Blijngroups[i] = !value;
    }
  }

  AlijnClick(value) {
    for (const i in this.Alijngroups) {
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

