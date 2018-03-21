import { Component, OnInit } from '@angular/core';
import {FeedService} from "../feeds.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUp implements OnInit {

  profileData ={
    userId:'',  
    firstName: '',
    lastName: '',
    deparment: '',
    city:'',
    mobileNo:'',
    about:'',
    password:'',
    updated_at: '',
  }

  constructor(private feedService:FeedService) {

   }

  ngOnInit() {
   

  }

 public createProfile(){
   this.feedService.persistProfile(this.profileData).then((result) => {
    console.log(result);
  }, (err) => {
    console.log(err);
  });
 }

}
 