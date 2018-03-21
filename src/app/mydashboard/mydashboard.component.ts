import { Component , OnInit, AfterViewChecked} from '@angular/core';
import {FeedService} from "../feeds.service";
import * as io from "socket.io-client";
import {Router} from '@angular/router';

@Component({
  selector: 'mydashboard',
  templateUrl: './mydashboard.component.html',
  styleUrls: ['./mydashboard.component.css']
})


export class MyDashBoard implements OnInit, AfterViewChecked {


  constructor(private _router:Router,private feedService: FeedService) {}


  socket = io('http://10.0.0.191:4001');
  //videoFileUrl = 'http://localhost:3000/IMG_0634.MOV';
  //imageFileUrl = 'http://localhost:3000/IMG_0001(1).JPG';
  //docFile = 'http://localhost:3000/Test.pdf';
  //docType = 'application/pdf'
  mediaUrl = 'http://10.0.0.191:3000/';

  feeds :any;

  profilePic = "";
  
  msgData = {
        feedId: '',
        feedBy:'',
        feedTime:'',
        feeTitle:'',
        feedContent:'',
        media:'',
        isImage:'',
        isVideo:'',
};
 
profileData = { 
  userId: ' ',
  firstName: '',
  lastName: '',
  deparment: '',
  city: '',
  mobileNo: '',
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
      this.getFeedsbyUser(user)
    }else{

    }
    this.socket.on('new-feeds', function (data) {
     console.log("message",data.message);
     this.feeds.push(data.message);
    }.bind(this));

  }

  ngAfterViewChecked() {
  
  }


  getFeedsbyUser(userID) {
    this.feedService.getFeedbyUserName(userID).then((res) => {
    this.feeds=res;
  }, (err) => {
    console.log(err);
  });
}

  getProfileById(userID) {
      this.feedService.getProfileByID(userID).then((res) => {
      this.profileData=res[0];
      this.profilePic=this.profileData.firstName.toUpperCase()+"_"+this.profileData.lastName.toUpperCase()+".JPG";
    }, (err) => {
      console.log(err);
    });
    
    
    //this.socket.emit('user-profile', this.inputData);
  }
  



}
