import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatamoverService {

  data = { officer: '' ,violation:'', licenceplate: '',state: '',make:'',model:'', date:'',location: '',photo:''};


  constructor() { }


     
  getdata(){

    return this.data
  }




}
