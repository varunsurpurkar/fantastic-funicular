import { Component , OnInit, AfterViewChecked } from '@angular/core';
import {FeedService} from "../feeds.service";
import {Router} from '@angular/router';


@Component({
 selector:'profile',
 templateUrl:'./profile.component.html',
 styleUrls:['./profile.component.css']
})


export class Profile{

   constructor(private _router:Router,private feedService:FeedService){

   }

   profileData = { 
    _id: '',
    firstName: '',
    lastName: '',
    deparment: '',
    city: '',
    mobileNo: '',
    password:'',
    userId:'',
    about: '',
    __v: 0,
    updated_at: null } ;

   ngOnInit(): void {

    var authenticated = localStorage.authenticated;
    if(authenticated=='false'){
      this._router.navigateByUrl('/');
    }

    var user = localStorage.user;
    if(user!==null) {
      this.getProfileById(user);
    }else{

    }
 

   }

  ngAfterViewChecked() {
  
  }

  getProfileById(userID) {
      this.feedService.getProfileByID(userID).then((res) => {
     // alert("Get Profile ::"+JSON.stringify(res[0]));
      this.profileData=res[0];
    }, (err) => {
      console.log(err);
    });

  }

  updateProfile(userID){
    this.feedService.updateProfile(this.profileData._id,this.profileData).then((res) => {
          //alert("Update Response"+JSON.stringify(res));
      }, (err) => {
        console.log(err);
      });

  }


}
