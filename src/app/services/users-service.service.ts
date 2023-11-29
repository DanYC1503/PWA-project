import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { Usuario } from 'src/domain/usuario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersFirebaseService {
  private path = '/usuarios'
  usuariosRef: AngularFirestoreCollection<any>

  constructor(private db: AngularFirestore) { 
    this.usuariosRef = db.collection(this.path)

    this.usuariosRef.valueChanges().subscribe(data => {
      console.log(data)
    })
  }
  getAll(){
    return this.usuariosRef.valueChanges()
  }

  save(user: Usuario){
    const uid = this.db.createId()
    user.id = uid
    console.log('User', user)
    return this.usuariosRef.doc(uid).set(Object.assign({}, user))
  }

  getUser(credentials: { username: string, password: string }) {
    console.log('username', credentials.username);
    return this.db.doc(this.path + '/' + credentials.username).valueChanges().pipe(
      map((data: any) => {
        // Check if the password matches
        if (data && data.password === credentials.password) {
          return data;
        } else {
          // Return null or handle the case where credentials don't match
          return null;
        }
      })
    );
  }
  
}
