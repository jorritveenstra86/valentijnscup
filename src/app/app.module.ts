import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { MenubalkComponent } from './components/menubalk/menubalk.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { InvoerScoresComponent } from './pages/invoer-scores/invoer-scores.component';
import { UitvoerPdfComponent } from './pages/uitvoer-pdf/uitvoer-pdf.component';
import { PresentatieComponent } from './pages/presentatie/presentatie.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubalkComponent,
    HomeComponent,
    PageNotFoundComponent,
    InvoerScoresComponent,
    UitvoerPdfComponent,
    PresentatieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    NgbModule // ngBootstrap
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
