import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersFirebaseService } from 'src/app/services/users-service.service';
import { Usuario } from 'src/domain/usuario';
import { SignInService } from 'src/app/services/sign-in-service.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  user: Usuario[] = [];
  usernameSign: string = '';
  usernamePassword: string = '';
  listaUsuarios: any;

  constructor(private router: Router, private usersFirebaseService: UsersFirebaseService, 
    private signInService: SignInService) {
    this.listaUsuarios = this.usersFirebaseService.getAll();
    console.log(this.listaUsuarios);

    let params = this.router.getCurrentNavigation()?.extras.queryParams;
    if (params) {
      console.log(params);
      this.user = params['usuario']; // Adjusted from 'user' to 'usuario'
    }
  }

  signInUser() {
    const credentials = {
      username: this.usernameSign,
      password: this.usernamePassword // Assuming you have the password input field
    };
  
    this.usersFirebaseService.getUser(credentials).subscribe(matchingUser => {
      console.log(matchingUser);
      if (matchingUser) {
        console.log('Match');
        this.changeTabs();
      } else {
        console.log('No match');
      }
    });
  }

  changeTabs(){
    this.router.navigate(['pages/home'])
    this.signInService.setSignInState(1)
    
  }
}
