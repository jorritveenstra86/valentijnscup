import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    constructor(private http: HttpClient) {
    }

    GETgeselecteerdeCategorieen() {
        return this.http.get('/api/slides');
    }

    PUTgeselecteerdeCategorieen(value) {
        return this.http.put('/api/slides', value);
    }
}
