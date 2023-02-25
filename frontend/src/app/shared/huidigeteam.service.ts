import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HuidigeTeamService {

    private huidigeTeam = [];

    getHuidigeTeam() {
        return this.huidigeTeam;
    }

    putHuidigeTeam(huidigeTeam) {
        this.huidigeTeam = huidigeTeam;
    }
}
