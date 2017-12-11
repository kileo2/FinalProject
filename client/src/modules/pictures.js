import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';
import { MyPics } from '../resources/data/mypics';


@inject(Router,AuthService,MyPics)
export class Pictures {
    constructor(router,auth,mypics) {
        this.router = router;
        this.mypics = mypics;
        this.auth = auth;
        this.message = 'Galleries';
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.showList = true;
        // this.showDeleted = false;
        this.priorities = ['Low', 'Medium', 'High', 'Critical'];

    }
    async activate() {
        await this.mypics.getUserPics(this.user._id);
    }


    logout() {
        sessionStorage.removeItem('user');
        this.auth.logout();
    }
    createPicture() {
        this.picsObj = {
            pics: "",
            description: "",
            dateDue: new Date(),
            userId: this.user._id,
            priority: this.priorities[0]
        }
        this.showList = false;
    }
    editPics(pics) {
        this.picsObj = pics;
        this.showList = false;
    }

    deletePics(pics) {
        this.mypics.deletePics(pics._id);
    }

    // completePics(pics) {
    //     pics.completed = !pics.completed;
    //     this.picsObj = pics;
    //     this.savepics();
    // }

    // toggleShowDeleted() {
    //     this.showCompleted = !this.showCompleted;
    // }
    changeFiles() {
        this.filesToUpload = new Array();
        this.filesToUpload.push(this.files[0]);
    }
    removeFile(index) {
        this.filesToUpload.splice(index, 1);
    }

    async savepics() {
        if (this.picsObj) {
            let response = await this.mypics.save(this.picsObj);
            if (response.error) {
                alert("There was an error creating the pics");
            } else {
                //Could provide feeback	
                var picsId = response._id;
                                if(this.filesToUpload && this.filesToUpload.length){
                                    await this.mypics.uploadFile(this.filesToUpload, this.user._id, picsId);
                                    this.filesToUpload = [];
                                }								
            }
            this.showList = true;
        }
    }
    back(){
        this.showList=true;
      }
}
