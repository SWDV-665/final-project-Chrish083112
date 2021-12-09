import { Component, OnInit } from '@angular/core';
import { DatamoverService } from '../services/datamover.service';
import { PhotoService } from '../services/photo.service';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  constructor(public photoService: PhotoService,public dataservice:DatamoverService) { }

  ngOnInit() {
    this.pulldata();
  }

  pulldata(){

    this.dataservice.getdata()
  }
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

}
