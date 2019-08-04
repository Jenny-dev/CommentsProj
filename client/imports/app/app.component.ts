import { Component,ChangeDetectorRef, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';

import { commentsService } from '../services/comments.service';
import { Comment } from  '../app/comment';

const SLICE_SIZE:number = 3; //number of comments to show at once(page) 

@Component({
  selector: 'comments-app',
  //templateUrl:'./app.component.html',
  template:`
  <div>
    
      Post Id:
      <input type="text" [(ngModel)]="postId">
      <button type="button" (click)="filterComments()">Get Comments</button>
      <br>

      Search comment body:
      <input type="text" [(ngModel)]="commentFilter" (keyup)="filterComments()">
  
      <div class="commentEntry" *ngFor="let comment of postComments| slice:commentsStart:commentsEnd">
        <div class="commentId">
          comment id: {{comment.id}}
        </div><br><br>
        
        <div class="commentBody">
          comment body:
          <expand-text class="content" [text]="comment.body" [maxLength]="maxBodyLength"></expand-text>
        </div>
      </div>

    
      <button type="button" *ngIf="showPrevBtn" (click)="prevPage()">Previous Comments</button>
      <button type="button" *ngIf="showNextBtn" (click)="nextPage()">Next Comments</button>
  
  </div>  
  `,
  //styleUrls: ['./app.scss']
  styles:[`
    #container{
      margin: 1%;
    }

    .commentEntry{
      border: solid 1px;
      margin: 2px;
      white-space: pre-line
    }

    button{
      background-color: deepskyblue;
      color: aliceblue;
      border-radius: 12px;    
    }
  `]

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
  private maxBodyLength:number = 500; //max comment body size to show at load stage 

  constructor(private changeDetector: ChangeDetectorRef, private commentsService: commentsService) {}

  ngOnInit(){
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

  filterComments(){

    if(!isNaN(this.postId)){
      this.commentsService.filterComments(this.postId,this.commentFilter);
    }

  }

  resetCommentsSlice(){

    this.commentsStart = 0;
    this.commentsEnd = SLICE_SIZE;
    this.showPrevBtn = false;
    //this.changeDetector.detectChanges();
  
  }

  nextPage(){
    
    this.commentsStart = this.commentsEnd;
    this.commentsEnd = this.commentsStart + SLICE_SIZE;
    this.showPrevBtn = true; 
    if(this.postCommentsNum <= this.commentsEnd){
      this.showNextBtn = false;
    }
    this.changeDetector.detectChanges();
  
  }

  prevPage(){
    
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