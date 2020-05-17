import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Platform, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public travel_distance: any;
  public selectedRange: any;

  public ramData = ['2GB','4GB','8GB','12GB','16GB','24GB','32GB','48GB','64GB','96GB'];
  public hddData = ['SAS', 'SATA','SSD'];
  public hardDisk
  public locations: any[] = []
  public computerData : any;
  public selectedRam: any = "";
  public selectedHddType: any = "";
  public selectedLoc: any = "";
  public list = [];
  public selectedSpace: any = "";
  

  constructor(public api: ApiService,public platform: Platform,
    public loadingController: LoadingController) {}


  ionViewDidEnter() {
    this.list = [];
    this.serverFilter();
}

  public async serverFilter() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    
    this.api.getServerFilter().pipe(finalize(() => {
        loading.dismiss();
    })).subscribe((res: []) => {
      
       this.computerData = res;

       let locationData = [];
       this.computerData.forEach(element => {
            locationData.push(element.Location);
      });
      
      this.locations = [...new Set(locationData)];
      
        
    }, (err: any) => {
       console.log("err in filter data =====",err);
    });
}

  onHardDiskChange(event) {
   
    let customValue = [{ id:0, value:0},{ id:1, value:'250GB'},{ id:2, value:'500GB'},
    { id:3, value:'1TB'},
      ,{ id:4, value:'2TB'},
      { id:5, value:'3TB'},{ id:6, value:'4TB'},
      { id:7, value:'8TB'},{ id:8, value:'12TB'},
      { id:9, value:'24TB', }, { id:10, value:'72TB' }]

      let space = customValue.filter(data => data.id == event.detail.value);
      this.selectedSpace =  space[0].value; 

 }

 onRamChange(event){
    this.selectedRam = event.detail.value;
 }

 onHddChange(event){
   this.selectedHddType = event.detail.value;
 }

 onLocationChange(event){
    this.selectedLoc = event.detail.value;
 }

 doFilter() {

   this.list;

  
    if(this.selectedHddType == "" && this.selectedLoc == "" && this.selectedRam == "" && this.selectedSpace == ""){
      this.api.showToast("Please select filter", 2000,"bottom")
    }
  else if(this.selectedLoc == ""  ){
      this.api.showToast("Please select location",2000,"bottom")
   }else if(this.selectedLoc != "" && this.selectedSpace != ""    && this.selectedHddType == ""  && this.selectedRam == ""   ){
    this.list = this.computerData.filter(data => data.HDD.split('x')[1].substring(0).split("SATA")[0] == this.selectedSpace && this.selectedLoc ==  data.Location  ||
    data.HDD.split('x')[1].substring(0).split("SSD")[0] == this.selectedSpace && this.selectedLoc ==  data.Location  ||
    data.HDD.split('x')[1].substring(0).split("SAS")[0] == this.selectedSpace && this.selectedLoc ==  data.Location  )
   }
   else if(this.selectedLoc != "" && this.selectedRam != "" && this.selectedSpace == "" && this.selectedHddType == "" ){
    this.list = this.computerData.filter(data => data.Location == this.selectedLoc
      &&   this.selectedRam == data.RAM.split("DDR")[0]);
   }
   else if(this.selectedLoc != "" && this.selectedHddType != "" && this.selectedRam == "" && this.selectedSpace == ""){
    this.list = this.computerData.filter(data => data.HDD.split("TB")[1] == this.selectedHddType && this.selectedLoc ==  data.Location
    ||  data.HDD.split("GB")[1] == this.selectedHddType && this.selectedLoc ==  data.Location ||  
    this.selectedRam == data.RAM.split("DDR")[0] && this.selectedLoc ==  data.Location) 
   }
   else if(this.selectedLoc != "" && this.selectedSpace != "" && this.selectedRam != "" && this.selectedHddType == ""){
    this.list = this.computerData.filter(data => data.HDD.split("TB")[1] == this.selectedHddType && this.selectedLoc ==  data.Location
    ||  data.HDD.split("GB")[1] == this.selectedHddType && this.selectedLoc ==  data.Location ||  
    this.selectedRam == data.RAM.split("DDR")[0] && this.selectedLoc ==  data.Location ||
     data.HDD.split('x')[1].substring(0).split("SATA")[0] == this.selectedSpace  ||
     data.HDD.split('x')[1].substring(0).split("SSD")[0] == this.selectedSpace  ||
     data.HDD.split('x')[1].substring(0).split("SAS")[0] == this.selectedSpace )
   }else if(this.selectedLoc != "" && this.selectedSpace != ""  && this.selectedRam  && this.selectedHddType == ""){

    this.list = this.computerData.filter(data => data.HDD.split('x')[1].substring(0).split("SATA")[0] == this.selectedSpace && this.selectedLoc ==  data.Location  ||
    data.HDD.split('x')[1].substring(0).split("SSD")[0] == this.selectedSpace && this.selectedLoc ==  data.Location  ||
    data.HDD.split('x')[1].substring(0).split("SAS")[0] == this.selectedSpace && this.selectedLoc ==  data.Location &&
    this.selectedRam == data.RAM.split("DDR")[0])

   }
   else if(this.selectedLoc != "" && this.selectedSpace != "" && this.selectedRam != "" && this.selectedHddType != ""){

    console.log("all filter"),

    this.list = this.computerData.filter(data => 
      data.HDD.split('x')[1].substring(0).split("SATA")[0] == this.selectedSpace  ||
    data.HDD.split('x')[1].substring(0).split("SSD")[0] == this.selectedSpace   ||
    data.HDD.split('x')[1].substring(0).split("SAS")[0] == this.selectedSpace &&
    this.selectedRam == data.RAM.split("DDR")[0] &&
    this.selectedLoc ==  data.Location &&
    data.HDD.split("TB")[1] == this.selectedHddType 
  ||  data.HDD.split("GB")[1] == this.selectedHddType
    )

    console.log("data===========", this.list)



   }

  
 
   return false


  if(this.selectedLoc != "" && this.selectedRam == "" && this.selectedHddType == ""){
      this.list = this.computerData.filter(data => data.Location == this.selectedLoc);
    }
    
    else if(this.selectedLoc != "" && this.selectedRam !=  "" && this.selectedHddType == ""){
      this.list = this.computerData.filter(data => data.Location == this.selectedLoc
        &&   this.selectedRam == data.RAM.split("DDR")[0]);
    }

    else if(this.selectedHddType != "" && this.selectedLoc == "" && this.selectedSpace == "" )  {    

      this.list = this.computerData.filter(data => data.HDD.split("TB")[1] == this.selectedHddType
    ||  data.HDD.split("GB")[1] == this.selectedHddType  
  )  
  
  }else if(this.selectedRam != "" || this.selectedHddType != ""  ){
    this.list = this.computerData.filter(data => data.HDD.split("TB")[1] == this.selectedHddType
    ||  data.HDD.split("GB")[1] == this.selectedHddType &&  this.selectedRam == data.RAM.split("DDR")[0])
  
  }
  
  
  else if(this.selectedHddType != "" || this.selectedLoc != "" || this.selectedSpace != "" ){
    this.list = this.computerData.filter(data => data.HDD.split("TB")[1] == this.selectedHddType
    ||  data.HDD.split("GB")[1] == this.selectedHddType
      && data.Location == this.selectedLoc && this.selectedRam == data.RAM.split("DDR")[0])
  }
}


 
 backButtonEvent() {
  this.platform.backButton.subscribe(async () => {
          if (new Date().getTime() - this.api.lastTimeBackPress < this.api.timePeriodToExit) {
              navigator['app'].exitApp();
          } else {
                  this.api.showToast('Press again to exit app.',2000,"bottom");
                  this.api.lastTimeBackPress = new Date().getTime();
          }
  });
}

}
