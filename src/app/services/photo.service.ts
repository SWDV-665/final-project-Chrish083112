import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource,CameraPhoto } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
//import platform for hybrid
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})

// The class for photo serv
export class PhotoService {
//add it to the constructor
constructor(platform: Platform) {
  this.platform = platform
 
}

    platform;
  // Define an array for photos
  public photos: Photo[] = [];
  //Define Photostorage
  private PHOTO_STORAGE: string = "photos";


// Add a new Photo / take photo
  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    // Save the picture and add it to photo collection
      const savedImageFile = await this.savePicture(capturedPhoto);
      this.photos.unshift(savedImageFile);

    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath
    });
      
    // add it to the storage
        Storage.set({
          key: this.PHOTO_STORAGE,
          value: JSON.stringify(this.photos)
        });
      
    }


  //for mobile

  // Save picture to file on device
  private async savePicture(cameraPhoto: CameraPhoto) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      };
    }
  }




  // for mobile 

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    //hybrid is mobile 
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });
  
      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(cameraPhoto.webPath);
      const blob = await response.blob();
  
      return await this.convertBlobToBase64(blob) as string;
    }
  }
  
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });


//for mobile

public async loadSaved() {
  // Retrieve cached photo array data
  const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
  this.photos = JSON.parse(photoList.value) || [];

  // Easiest way to detect when running on the web:
  // “when the platform is NOT hybrid, do this”
  if (!this.platform.is('hybrid')) {
    // Display the photo by reading into base64 format
    for (let photo of this.photos) {
      // Read each saved photo's data from the Filesystem
      const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data
      });

      // Web platform only: Load the photo as base64 data
      photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }
  }
}


}




// Export them as the interface to the other page aka tab 2
export interface Photo {
  filepath: string;
  webviewPath: string;
}
