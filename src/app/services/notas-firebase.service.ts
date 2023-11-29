import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { Notas } from 'src/domain/notas';


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
  }
  getAll(){
    return this.notasRef.valueChanges()
  }
  save(note: Notas){
    const uid = this.db.createId()
    note.id = uid
    console.log('Nota: ', note)
    return this.notasRef.doc(uid).set(Object.assign({}, note))
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