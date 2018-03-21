import {Injectable} from "@angular/core"
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';


import 'rxjs/add/operator/map';
import "./feed";

@Injectable()
export class FeedService {
 
  constructor(private http: Http) { }

  
  persistFeed(data) {
    return new Promise((resolve, reject) => {
        this.http.post('/feeds', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  persistProfile(data) {
    return new Promise((resolve, reject) => {
        this.http.post('/feeds/profileCreate', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }


  getFeedbyID(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/feeds/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

    getFeedbyUserName(userName) {
      return new Promise((resolve, reject) => {
          this.http.get('/feeds/feedBy/' + userName)
            .map(res => res.json())
            .subscribe(res => {
              resolve(res)
          }, (err) => {
            reject(err);
          });
      });


  }

  submitForgotUser(userName) {
    return new Promise((resolve, reject) => {
        this.http.post('/feeds/auth/forgotpassword/' , {'data':userName})
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });


}


  getProfileByID(id) {
    return new Promise((resolve, reject) => {
      this.http.get('/feeds/profileData/' + id)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res)
      }, (err) => {
        reject(err);
      });
  });
   
  }

  

  updateProfile(id, data) {
    return new Promise((resolve, reject) => {
        this.http.put('/feeds/profileUpdate/'+id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  getProfileBySearchCriter(firstName,lastName,userID) {
    let requestoptions = new URLSearchParams();
    requestoptions.set('firstName', firstName);
    requestoptions.set('lastName', lastName);
    requestoptions.set('userID', userID);
    return new Promise((resolve, reject) => {
      this.http.get('/feeds/profiles/profileDataBySearchCriteria/',{search:requestoptions})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res)
      }, (err) => {
        reject(err);
      });
  });
}
}




interface ProfileData {
  userId:String,  
  firstName: String,
  lastName: String,
  deparment: String,
  city:String,
  mobileNo:String,
  about:String,
  updated_at:Date;
}