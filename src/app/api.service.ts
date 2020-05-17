import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 // public serverfilterURL = "https://s5.aconvert.com/convert/p3r68-cdx67/omt8l-ijvzk.json";
    
  //BackButton 
    public lastTimeBackPress = 0;
    public timePeriodToExit = 2000;

  constructor(private http: HttpClient,  
    protected loading: LoadingController,
    public toast: ToastController) { }
 
 
  public getServerFilter(){
    return this.http.get('../assets/data.json');
  }
 

   /**
     * Show toast message on screen
     * @param message text message to display in toast
     * @param duration how much time show toast
     * @param position define position like bottom | middle | top
     */
    async showToast(message, duration, position) {
      const toast = await this.toast.create({
          message: message,
          duration: duration,
          position: position,
          color: 'dark'
      });
      toast.present();
  }


}

