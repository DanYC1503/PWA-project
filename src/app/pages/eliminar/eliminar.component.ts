import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NotasFirebaseService } from 'src/app/services/notas-firebase.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent {
  listaNotas: any
  selectedNota: any;

  constructor(private router: Router, private notasFirebaseService: NotasFirebaseService,
    ){
    this.listaNotas = this.notasFirebaseService.getAll()
  }

  eliminar(nota: any) {
    this.selectedNota = nota;
  }

  borrar() {
    if (this.selectedNota && this.selectedNota.id) {
      this.notasFirebaseService.borrar(this.selectedNota.id);
      console.log('Eliminado:', this.selectedNota);
      this.selectedNota = null; // Reset selectedNota after deletion
    } else {
      console.log('ID de nota no proporcionado o inválido');
    }
  }
}
