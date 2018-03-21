import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { DashBoard } from './dashboard/dashboard.component';
import { MyDashBoard } from './mydashboard/mydashboard.component';
import { Login } from  './login/login.component';
import { Profile} from  './profile/profile.component';
import {SignUp} from './signup/signup.component';
import{HeaderComponent} from './includes/header.component';
import{FooterComponent} from './includes/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { Ng4FilesModule } from './ng4-files';
import {ShareFeed} from './sharefeeds/sharefeeds.component'
import { ChatService } from './chat.service';
import {FeedService} from './feeds.service';
import { ChatComponent } from './chat/chat.component';
import {SearchProfile} from "./searchprofile/searchprofile.component";
import {ViewProfile} from "./viewprofile/viewprofile.component";
import {ForgotPassword} from "./forgotPassword/forgotpassword.component";


const appRoutes: Routes = [
  { path: 'chatroom', redirectTo: '/chats' },
  { path: 'chats', component: ChatComponent },

  { path: 'profile',     
   component: Profile 
  },
  {
    path: 'signup',
    component: SignUp,
    data: { title: 'Heroes List' }
  },
  { 
    path: 'dashboard',
    component: DashBoard,
  },
  { 
    path: 'mydashboard',
    component: MyDashBoard,
  },
  { 
  path: 'sharefeed',
  component: ShareFeed,
 },
 { 
  path: 'viewprofile',
  component: ViewProfile,
 },
 { 
  path: 'searchProfile',
  component: SearchProfile,
 },
 { 
  path: 'forgotpassword',
  component: ForgotPassword,
 },
  { path: '**', 
  component: Login
 },
 { path: '', 
 component: Login
}
];

@NgModule({
  declarations: [
    AppComponent,DashBoard,Login,Profile,SignUp,HeaderComponent,FooterComponent,ShareFeed,ChatComponent,MyDashBoard,SearchProfile,ViewProfile,ForgotPassword
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),Ng4FilesModule, BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ChatService,FeedService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
