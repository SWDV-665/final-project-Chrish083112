import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router){}
  data = { username:'', password: ''};

  loginForm(form: NgForm) {
    console.log(this.data);
    if(this.data.username =="Admin" && this.data.password =="Admin"){

      this.router.navigate(['/addticket'])

      
      
    }else{

      this.router.navigate(['/home'])

    }
  }

}
