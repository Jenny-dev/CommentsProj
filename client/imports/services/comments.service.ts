import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Meteor } from "meteor/meteor";
import { Comment } from  '../app/comment';

@Injectable()
export class commentsService {

    private commentsObservable$:Subject<Array<Comment>> = new Subject<Array<Comment>>();

    filterComments(postId,filter):void {
        let that = this;
        Meteor.call('getComments',postId,filter,function (error, result) {
            if (error) {
                console.log(error);
            } else {
                that.commentsObservable$.next(result);
            }
        });  
    }

    getComments():Subject<Array<Comment>>{
        return this.commentsObservable$;
    }

}
