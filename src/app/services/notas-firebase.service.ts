import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { Notas } from 'src/domain/notas';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class NotasFirebaseService {

  private path = '/notas'
  notasRef: AngularFirestoreCollection<any>

  constructor(private db: AngularFirestore) { 
    this.notasRef = db.collection(this.path)

    this.notasRef.valueChanges().subscribe(data => {
      console.log(data)
    })
    interval(300000) // Adjust the interval (in milliseconds) as needed
      .pipe(switchMap(() => this.syncWithFirebase()))
      .subscribe();
  }


  syncWithFirebase(): Observable<void> {
    if (navigator.onLine) {
      // Internet is available, sync Firebase data with local storage
      return this.notasRef.valueChanges().pipe(
        switchMap(notas => {
          localStorage.setItem('NotasData', JSON.stringify(notas));
          return new Observable<void>(observer => observer.next());
        })
      );
    } else {
      // No internet, do nothing
      return new Observable<void>(observer => observer.next());
    }
  }
  getAll(): Observable<Notas[]> {
    return new Observable(observer => {
      // Load data from local storage
      const localStorageData = localStorage.getItem('NotasData');
      if (localStorageData) {
        const localNotas = JSON.parse(localStorageData);
        observer.next(localNotas);
      }

      // Fetch data from Firebase
      this.notasRef.valueChanges().subscribe(
        notas => {
          if (notas && notas.length > 0) {
            // Firebase has data, save to local storage
            localStorage.setItem('NotasData', JSON.stringify(notas));
            observer.next(notas);
          }
        },
        error => {
          console.error('Error fetching data from Firebase:', error);
          observer.error(error);
        }
      );
    });
  }

  save(note: Notas): Promise<void> {
    const uid = this.db.createId();
    note.id = uid;
    console.log('Nota: ', note);
    return this.notasRef.doc(uid).set(Object.assign({}, note));
  }
  borrar(notaId: string): void {
    if (notaId) {
      this.notasRef.doc(notaId).delete();
    } else {
      console.log('ID de nota no proporcionado o inválido');
    }
  }
  updateNota(note: Notas) {
    const notaId = note.id;
    if (notaId) {
      // Use Object.assign to create a copy of the note without the id property
      const updatedNote = Object.assign({}, note);
      delete updatedNote.id; // Remove the id property from the copy

      // Update the document with the new data
      return this.notasRef.doc(notaId).update(updatedNote);
    } else {
      console.log('ID de nota no proporcionado o inválido');
      return Promise.reject('ID de nota no proporcionado o inválido');
    }
  }
}