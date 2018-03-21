import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: `./header.component.html`,
})

export class HeaderComponent implements OnInit{ 
  
  userName = "";

  ngOnInit(): void {
    this.userName=localStorage.user;
   }

  constructor(private router: Router) {
 
  }


  signOutUser(){
   
    this.userName="";
    localStorage.user="";
    localStorage.authenticated='false';
    this.router.navigateByUrl('/login');

  }
}