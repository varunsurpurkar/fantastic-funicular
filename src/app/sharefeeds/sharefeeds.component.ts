import { Component, OnInit, AfterViewChecked, ElementRef, Input, ViewChild }  from '@angular/core';
import * as io from "socket.io-client";
import {
    Ng4FilesService,
    Ng4FilesConfig,
    Ng4FilesStatus,
    Ng4FilesSelected
  } from '../ng4-files';
import {FeedService} from "../feeds.service";
import { UUID  } from 'angular2-uuid';
import {Router} from '@angular/router';


@Component({
    selector:'sharefeed',
    templateUrl:'./sharefeeds.component.html',
    styleUrls:['./sharefeeds.component.css'],
    providers: [Ng4FilesService,FeedService]
})
export class ShareFeed implements OnInit, AfterViewChecked{

  constructor(
    private ng4FilesService: Ng4FilesService,
    private feedService:FeedService,
    private el: ElementRef,
   private  _router:Router,
) {}

@ViewChild('fileInput') fileInput: ElementRef;

  feeds: any;
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
ngAfterViewChecked() {
  
}
 socket = io('http://10.0.0.191:4001');

 public selectedFiles;

  public formData;

    private sharedConfig: Ng4FilesConfig = {
      acceptExtensions: ['jpg','MOV'],
      maxFilesCount: 5
    };
  
    private namedConfig: Ng4FilesConfig = {
      acceptExtensions: ['js', 'doc', 'mp4','jpg','MOV'],
      maxFilesCount: 5,
      maxFileSize: 51200000,
      totalFilesSize: 101200000000
    };
  

  
    ngOnInit() {
      var authenticated = localStorage.authenticated;
      if(authenticated=='false'){
        this._router.navigateByUrl('/');
      }
      this.clearFeed();
      this.selectedFiles=null;
      this.ng4FilesService.addConfig(this.sharedConfig);
      this.ng4FilesService.addConfig(this.namedConfig, 'another-config');
     
    }
  
    public filesSelect(selectedFiles: Ng4FilesSelected): void {
      if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
        
        this.selectedFiles = selectedFiles.status;
        return;
      }
     
      //alert(selectedFiles.files[0].type);
      this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
    }




    public sendFeed(){
      this.msgData.feedId=UUID.UUID();
      this.msgData.feedBy=localStorage.getItem("user");
      this.msgData.isImage=this.isImageData(this.fileExtension(this.msgData.media));
      this.msgData.isVideo=this.isVideoData(this.fileExtension(this.msgData.media));;
      this.msgData.feedTime=new Date().toString();
      //alert(this.msgData.media);
      this.feedService.persistFeed(this.msgData).then((result) => {
        this.socket.emit('save-feeds', this.msgData);
      }, (err) => {
        console.log(err);
      });
   }

    public fileExtension(filename){
       return filename.split('.').pop();
    }

    public  isImageData(fileExtension){
      if(fileExtension.toUpperCase()=='JPEG' || fileExtension.toUpperCase()=='JPG' || fileExtension.toUpperCase()=='PNG' ||  fileExtension.toUpperCase()=='GIF' ){
        return 'Y'
      }else{
        return 'N';
      }
   }

   public  isVideoData(fileExtension){
    if(fileExtension.toUpperCase()=='MP4' || fileExtension.toUpperCase()=='VLC' || fileExtension.toUpperCase()=='MOV' ||  fileExtension.toUpperCase()=='GIF' ){
      return 'Y'
    }else{
      return 'N';
    }
 }

    public clearFeed(){
      this.msgData.feedBy=localStorage.getItem("user");
      this.msgData.isImage='N';
      this.msgData.isVideo='N';
      this.msgData.feedContent='';
      this.msgData.feeTitle="";
      this.msgData.media="";
      this.selectedFiles=null;
    }

  
  
}

