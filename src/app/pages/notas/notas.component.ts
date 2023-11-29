import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NotasFirebaseService } from 'src/app/services/notas-firebase.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent {
  listaNotas: any

  constructor(private router: Router, private notasFirebaseService: NotasFirebaseService){
    this.listaNotas = this.notasFirebaseService.getAll()
  }

  goEditar(nota: any){
    console.log("editando", nota)

    let params: NavigationExtras = {
      queryParams: {
        nota: nota
      }
    }
    console.log(nota)
    this.router.navigate(['pages/editar'], params)
  }

}
