import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private http: HttpClient) {
  }

  getTeam(teamnummer) {
    return this.http.get('/api/team?teamnummer=' + teamnummer);
  }

  getTeamPerCategorie(niveau, categorie) {
    return this.http.get('/api/categorie?niveau=' + niveau + '&categorie=' + categorie);
  }

  getTeams() {
    return this.http.get('/api/teams');
  }

 putTeam(teamgegevens) {
   return this.http.put('/api/team', teamgegevens);
 }

  putSlides(teamgegevens) {
    return this.http.put('/api/slides', teamgegevens);
  }

  getSlides(teamgegevens) {
    return this.http.get('/api/slides', teamgegevens);
  }
}
