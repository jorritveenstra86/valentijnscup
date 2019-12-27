import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorieen',
  templateUrl: './categorieen.component.html',
  styleUrls: ['./categorieen.component.css']
})

export class CategorieenComponent implements OnInit {

  ngOnInit() {
    const categorieen = { elijn: {
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
        junioren: {
          damespaar: false,
          herenpaar: false,
          mixpaar: false,
          damesgroep: false,
          herengroep: false,
        },
        senioren: {
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
        junioren: {
          damespaar: false,
          herenpaar: false,
          mixpaar: false,
          damesgroep: false,
          herengroep: false,
        },
        senioren: {
          damespaar: false,
          herenpaar: false,
          mixpaar: false,
          damesgroep: false,
          herengroep: false,
        }
      },
      clijn: {
        junioren: {
          damespaar: false,
          herenpaar: false,
          mixpaar: false,
          damesgroep: false,
          herengroep: false,
        },
        senioren: {
          damespaar: false,
          herenpaar: false,
          mixpaar: false,
          damesgroep: false,
          herengroep: false,
        }
      },
      blijn: {
        junioren: {
          damespaar: false,
          herenpaar: false,
          mixpaar: false,
          damesgroep: false,
          herengroep: false,
        },
        senioren: {
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
        junioren1: {
          damespaar: false,
          herenpaar: false,
          mixpaar: false,
          damesgroep: false,
          herengroep: false,
        },
        junioren2: {
          damespaar: false,
          herenpaar: false,
          mixpaar: false,
          damesgroep: false,
          herengroep: false,
        },
        senioren: {
          damespaar: false,
          herenpaar: false,
          mixpaar: false,
          damesgroep: false,
          herengroep: false,
        }
      }
    };
  }
}
