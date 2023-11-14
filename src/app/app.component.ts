import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    private user:UserService,
    private router:Router,
  ){}

  usuario = this.user.getUsuarioActual();
  token:string='';

  logout(){
    this.user.logout()
    .then(() => {
      this.user.borrarToken();
      alert('Hasta la proxima, que tengas un excelente dia =)')
      this.router.navigate(['/login']);
      window.location.reload();
    })
    .catch(error => {console.log('Error: '+error)})
  }

  estaLogueado(){
    // console.log(this.user.getToken());
    return this.user.getToken();
  }
}
