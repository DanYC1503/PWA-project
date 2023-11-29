// menu.component.ts
import { Component } from '@angular/core';
import { SignInService } from 'src/app/services/sign-in-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  paginas: any[] = [];

  constructor(private signIn: SignInService) {}

  ngOnInit(): void {
    this.signIn.getSignInState().subscribe((signInState) => {
      this.updatePaginas(signInState);
    });
  }

  private updatePaginas(signInState: number): void {
    if (signInState === 0) {
      this.paginas = [
        { titulo: 'Home', path: 'pages/home' },
        // Add other items as needed
      ];
    } else if (signInState === 1) {
      this.paginas = [
        { titulo: 'Home', path: 'pages/home' },
        { titulo: 'Crear', path: 'pages/crear' },
        { titulo: 'Notas', path: 'pages/notas' },
        { titulo: 'Editar', path: 'pages/editar' },
        { titulo: 'Eliminar', path: 'pages/eliminar' },
      ];
    }
  }
}
