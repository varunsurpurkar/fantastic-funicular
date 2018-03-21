import { Component , OnInit, AfterViewChecked} from '@angular/core';
import {FeedService} from "../feeds.service";
import * as io from "socket.io-client";
import {Router} from '@angular/router';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashBoard implements OnInit, AfterViewChecked {


  constructor(private _router:Router,private feedService: FeedService) {}


  socket = io('http://10.0.0.191:4001');
  //videoFileUrl = 'http://localhost:3000/IMG_0634.MOV';
  //imageFileUrl = 'http://localhost:3000/IMG_0001(1).JPG';
  //docFile = 'http://localhost:3000/Test.pdf';
  //docType = 'application/pdf'
  mediaUrl = 'http://10.0.0.191:3000/';

  profilePic = "";

  feeds = new Array();
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

inputData ={
  userName: '',
};

  ngOnInit(): void {
    var authenticated = localStorage.authenticated;
    if(authenticated=='false'){
      this._router.navigateByUrl('/');
    }
    var user = localStorage.user
    if(user!==null) {
      this.getProfileById(user);
    }else{

    }
    this.socket.on('new-feeds', function (data) {
     console.log("message",data.message);
     this.feeds.push(data.message);
    }.bind(this));

    //this.socket.on('profile-data', function (data) {
    //  var result = JSON.parse(JSON.stringify(data.message));
   //   alert("message "+JSON.stringify(data.message));
    //  this.profileData=data.message;
//alert(this.profileData[0].firstName);
   //  }.bind(this));
  }

  ngAfterViewChecked() {
  
  }


  getProfileById(userID) {
      this.feedService.getProfileByID(userID).then((res) => {
      this.profileData=res[0];
      this.profilePic=this.profileData.firstName.toUpperCase()+"_"+this.profileData.lastName.toUpperCase()+".JPG";
    }, (err) => {
      console.log(err);
    });;
    
    
    //this.socket.emit('user-profile', this.inputData);
  }
  



}
