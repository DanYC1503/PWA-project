import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotasFirebaseService } from 'src/app/services/notas-firebase.service';
import { Notas } from 'src/domain/notas';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  nota: Notas = new Notas();
  listaNotas: any

  constructor(private router: Router, private notasFirebaseService: NotasFirebaseService){
    this.listaNotas = this.notasFirebaseService.getAll()
    
    let params = this.router.getCurrentNavigation()?.extras.queryParams;
      if(params){
        console.log(params)
        this.nota = params['nota']

      }
  }
  editar() {
    this.notasFirebaseService.updateNota(this.nota).then(() => {
      console.log('Nota updated successfully');
      // You can navigate back to the previous page or do any other necessary action
      this.router.navigate(['']); // Navigate to some other page, for example
    }).catch(error => {
      console.error('Error updating nota:', error);
    });
  }
}
