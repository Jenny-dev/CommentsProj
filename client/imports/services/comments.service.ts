import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Meteor } from "meteor/meteor";

@Injectable()
export class commentsService {

    private commentsObservable$:Subject<Array<any>> = new Subject<Array<any>>();

    filterComments(postId,filter) {
        let that = this;
        Meteor.call('getComments',postId,filter,function (error, result) {
            if (error) {
                console.log(error);
            } else {
                that.commentsObservable$.next(result);
                return result;
            }
        });  
    }

    getComments(){
        return this.commentsObservable$;
    }

}
