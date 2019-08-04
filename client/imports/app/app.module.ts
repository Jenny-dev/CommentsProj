import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CommentsApp } from './app.component';
import { commentsService } from '../services/comments.service';
import { ExpandTextComponent } from '../directives/expandText/expandText.component';

@NgModule({
declarations: [
    CommentsApp,
    ExpandTextComponent
  ],
  bootstrap: [
    CommentsApp
  ],
  providers: [
    commentsService
  ],
  imports:[
    BrowserModule,
    FormsModule
  ]
})
export class AppModule {}