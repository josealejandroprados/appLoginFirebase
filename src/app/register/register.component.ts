import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(
    private user:UserService,
    private router:Router
  ){}
  
  ngOnInit(){
    
  }

  registrar(form:NgForm){
    if(form.valid){
      let email=form.value.email;
      let password=form.value.password;

      this.user.register(email,password)
      .then(response => {
        console.log(response);
        this.router.navigate(['/login']);
      })
      .catch(error => console.log('Error '+error));
    }
  }

}
