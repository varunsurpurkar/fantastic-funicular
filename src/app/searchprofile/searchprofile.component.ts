import { Component , OnInit, AfterViewChecked } from '@angular/core';
import {FeedService} from "../feeds.service";
import {Router} from '@angular/router';


@Component({
 selector:'profile',
 templateUrl:'./searchprofile.component.html',
 styleUrls:['./searchprofile.component.css']
})


export class SearchProfile{

  router :Router;
   constructor(private feedService:FeedService,_router:Router){
    this.router=_router;
   }

   profileData = { 
    _id: '',
    userId:'',
    firstName: '',
    lastName: '',
    deparment: '',
    city: '',
    mobileNo: '',
    about: '',
    __v: 0,
    updated_at: null } ;

    profiles :  any;
   ngOnInit(): void {
    var authenticated = localStorage.authenticated;
    if(authenticated=='false'){
      this.router.navigateByUrl('/');
    }
   
   }

  ngAfterViewChecked() {
  
  }

  searchProfile() {
   
   this.feedService.getProfileBySearchCriter(this.profileData.firstName,
       this.profileData.lastName,
       this.profileData.userId).then((res) => {
        this.profiles=res;
   //     alert(this.profiles[0].firstName);
      }, (err) => {
        console.log(err);
      });

  }

  viewProfile(userID){
    localStorage.viewedUser=userID;
    this.router.navigateByUrl('/viewprofile');
  
  }


}
