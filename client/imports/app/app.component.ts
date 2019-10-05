import { Component,ChangeDetectorRef, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';

import { commentsService } from '../services/comments.service';
import { Comment } from  '../app/comment';

const SLICE_SIZE:number = 3; //number of comments to show at once(page) 

import template from "./app.component.html";
import "./app.component.css"; //import with 'styles' or 'styleUrls' doesn't work

@Component({
  selector: 'comments-app',
  templateUrl: template,
})


export class CommentsApp implements OnInit, OnDestroy {
  
  private postComments:Comment[]; 
  private postCommentsNum:number; 
  private postId:number;
  private commentFilter:string;
  private commentsSubscription:Subscription;
  
  private commentsStart:number; //start slice of comments
  private commentsEnd:number;   //end slice of comments
  private showPrevBtn:boolean = false;
  private showNextBtn:boolean = false;
  private maxBodyLength:number = 100; //max comment body size to show at load stage 

  constructor(private changeDetector: ChangeDetectorRef, private commentsService: commentsService) {}

  ngOnInit():void{
    this.commentsSubscription = this.commentsService.getComments().subscribe(comments => {
        this.resetCommentsSlice();
        this.postComments = comments;
        this.postCommentsNum = comments.length;
        if(this.postCommentsNum > SLICE_SIZE){
          this.showNextBtn = true; 
        }else{
          this.showNextBtn = false; 
        }
        this.changeDetector.detectChanges(); 
      });
  
  }

  filterComments():void{

    if(!isNaN(this.postId)){
      this.commentsService.filterComments(this.postId,this.commentFilter);
    }

  }

  resetCommentsSlice():void{

    this.commentsStart = 0;
    this.commentsEnd = SLICE_SIZE;
    this.showPrevBtn = false;
    //this.changeDetector.detectChanges();
  
  }

  nextPage():void{
    
    this.commentsStart = this.commentsEnd;
    this.commentsEnd = this.commentsStart + SLICE_SIZE;
    this.showPrevBtn = true; 
    if(this.postCommentsNum <= this.commentsEnd){
      this.showNextBtn = false;
    }
    this.changeDetector.detectChanges();
  
  }

  prevPage():void{
    
    this.commentsStart = this.commentsStart - SLICE_SIZE;
    this.commentsEnd = this.commentsStart + SLICE_SIZE;
    this.showNextBtn = true; 
    if(this.commentsStart == 0){
      this.showPrevBtn = false;
    }
    this.changeDetector.detectChanges();
  
  }

  ngOnDestroy(): void {
    this.commentsSubscription.unsubscribe();
  }
  
}