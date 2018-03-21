import { Component, OnInit, AfterViewChecked }  from '@angular/core';
import {Router} from '@angular/router';
import {FeedService} from "../feeds.service";


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class Login implements OnInit, AfterViewChecked {
    
    profileData = { 
        _id: '',
        userId:'',
        firstName: '',
        lastName: '',
        deparment: '',
        city: '',
        mobileNo: '',
        password:'',
        about: '',
        __v: 0,
        updated_at: null } ;

    router :Router;
    feedService:FeedService;

    constructor(_router:Router,_feedService:FeedService){
        this.router=_router;
        this.feedService=_feedService;
    }


    loginInfo = {'userId':'','pwd':''};

    ngAfterViewChecked(): void {
        
    }

    ngOnInit(): void {
        localStorage.setItem("user", "varunsurpurkar@gmail.com");
        console.log("user ",localStorage.getItem("user"))
    }

    signInUser(){
       // alert(this.loginInfo);
        this.validateIncomingUser();
    }


    validateIncomingUser(){
        this.feedService.getProfileByID(this.loginInfo.userId).then((res) => {
             this.profileData=res[0];
             if(this.profileData.userId==this.loginInfo.userId && this.profileData.password==this.loginInfo.pwd){
                localStorage.setItem("user",this.loginInfo.userId);
                localStorage.authenticated='true';
                this.router.navigateByUrl('/dashboard');
             }else{
                localStorage.authenticated='false'; 
                this.router.navigateByUrl('/');
             }
           }, (err) => {
             console.log(err);
           });

    }

}

