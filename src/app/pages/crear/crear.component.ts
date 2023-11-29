import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NotasFirebaseService } from 'src/app/services/notas-firebase.service';
import { Notas } from 'src/domain/notas';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
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


  saveNota(){
    this.notasFirebaseService.save(this.nota)
    this.nota = new Notas();
    console.log(this.listaNotas);
  }

}
