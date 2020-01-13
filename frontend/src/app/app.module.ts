import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenubalkComponent } from './components/menubalk/menubalk.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { InvoerScoresComponent } from './pages/invoer-scores/invoer-scores.component';
import { UitvoerPdfComponent } from './pages/uitvoer-pdf/uitvoer-pdf.component';
import { PresentatieComponent } from './pages/presentatie/presentatie.component';
import {FormsModule} from '@angular/forms';
import { CategorieenComponent } from './components/categorieen/categorieen.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubalkComponent,
    HomeComponent,
    PageNotFoundComponent,
    InvoerScoresComponent,
    UitvoerPdfComponent,
    PresentatieComponent,
    CategorieenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // zodat we formulieren kunnen gebruiken
    NgbModule // ngBootstrap
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
