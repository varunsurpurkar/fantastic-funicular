import { Component, OnInit, AfterViewChecked }  from '@angular/core';
import {Router} from '@angular/router';
import {FeedService} from "../feeds.service";



@Component({
    selector: 'forgotpassword',
    templateUrl: './forgotpassword.component.html',
    styleUrls: ['./forgotpassword.component.css']
})
export class ForgotPassword implements OnInit, AfterViewChecked {
    
    router :Router;
    feedService:FeedService;

    constructor(_router:Router,_feedService:FeedService){
        this.router=_router;
        this.feedService=_feedService;
    }


    loginInfo = {'userId':''};

    ngAfterViewChecked(): void {
        
    }

    ngOnInit(): void {
        localStorage.setItem("user", "varunsurpurkar@gmail.com");
        console.log("user ",localStorage.getItem("user"))
    }

    submitUser(){
        this.feedService.submitForgotUser(this.loginInfo.userId).then((res) => {
              this.router.navigateByUrl('/');
          }, (err) => {
            console.log(err);
          });
       
        this.router.navigateByUrl('/');
        
    }

    validateIncomingUser(){


    }

}

