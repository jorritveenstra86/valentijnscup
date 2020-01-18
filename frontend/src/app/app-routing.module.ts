import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {InvoerScoresComponent} from './pages/invoer-scores/invoer-scores.component';
import {PresentatieComponent} from './pages/presentatie/presentatie.component';
import {UitvoerPdfComponent} from './pages/uitvoer-pdf/uitvoer-pdf.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'invoer', component: InvoerScoresComponent },
  { path: 'presentatie', component: PresentatieComponent },
  { path: 'uitvoer', component: UitvoerPdfComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
