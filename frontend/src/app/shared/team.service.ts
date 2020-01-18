import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private http: HttpClient) {
  }

  getTeam(teamnummer) {
    return this.http.get('http://localHost:4101/api/team?teamnummer=' + teamnummer);
  }

  getTeamPerCategorie(niveau, categorie) {
    return this.http.get('http://localHost:4101/api/categorie?niveau=' + niveau + '&categorie=' + categorie);

  }
}