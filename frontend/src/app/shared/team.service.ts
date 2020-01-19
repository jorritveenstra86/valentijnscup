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

  // putTeam(teamnummer, oefening, technisch, artistiek, moeilijkheid, aftrekken, score) {
  //   return this.http.put('/api/team?teamnummer=' + teamnummer + '&technisch_' + oefening + '=' + technisch + '&artistiek_' + oefening + '=' + artistiek + '&moeilijkheid_' + oefening + '=' + moeilijkheid + '&aftrekken_' + oefening + '=' + aftrekken + '&score_' + oefening + '=' + score);
  // } //TODO: Body maken ipv alles in de header

  getTeamPerCategorie(niveau, categorie) {
    return this.http.get('/api/categorie?niveau=' + niveau + '&categorie=' + categorie);

  }

  getTeams() {
    return this.http.get('/api/teams');
  }
}
