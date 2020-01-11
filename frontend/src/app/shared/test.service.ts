import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  scoresCollection;

  constructor(private afs: AngularFirestore) {
    this.scoresCollection = afs.collection<any>('scores');
  }

  saveScore(obj) {
    this.scoresCollection.push(obj);
  }

  getScores() {
    return this.scoresCollection.valueChanges();
  }
}
