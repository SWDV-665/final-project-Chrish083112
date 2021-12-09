import { Component, OnInit } from '@angular/core';

import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { DatamoverService } from '../services/datamover.service';


@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.page.html',
  styleUrls: ['./addticket.page.scss'],
})
export class AddticketPage implements OnInit {

  constructor( public datamover: DatamoverService,public router:Router) 
  { }
  ngOnInit() {

  }
  data = { officer: '' ,violation:'', licenceplate: '',state: '',make:'',model:'', date:'',location: '',photo:''};
  

  
  
 checkdata(){
    
this.datamover.data = this.data;
this.router.navigateByUrl('/summary');


  }

 }



