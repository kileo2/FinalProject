import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';
import { Galleries } from '../resources/data/galleries';
import { MyPics } from '../resources/data/mypics';


@inject(Router,AuthService,Galleries,MyPics)
export class Gallery {
    constructor(router,auth,galleries,mypics) {
        this.router = router;
        this.galleries = galleries;
        this.auth = auth;
        this.mypics = mypics;
        this.message = 'Galleries';
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.showList = 'showGalleries';
        // this.showDeleted = false;
        // this.priorities = ['Low', 'Medium', 'High', 'Critical'];

    }
    async activate() {
        await this.galleries.getUserGallery(this.user._id);
    }


    logout() {
        sessionStorage.removeItem('user');
        this.auth.logout();
    }
    createGallery() {
        this.galleryObj = {
            gallery: "",
            description: "",
            // dateDue: new Date(),
            userId: this.user._id,
            // priority: this.priorities[0]
        }
        this.showList = 'showGalleriesForm';
    }
    editGallery(gallery) {
        this.galleryObj = gallery;
        this.showList = 'showGalleriesForm';
    }

    deleteGallery(gallery) {
        this.galleries.deleteGallery(gallery._id);
    }

    // completeGallery(pics) {
    //     pics.completed = !pics.completed;
    //     this.picsObj = pics;
    //     this.savepics();
    // }

    // toggleShowDeleted() {
    //     this.showCompleted = !this.showCompleted;
    // }
    // changeFiles() {
    //     this.filesToUpload = new Array();
    //     this.filesToUpload.push(this.files[0]);
    // }
    // removeFile(index) {
    //     this.filesToUpload.splice(index, 1);
    // }

    async savegallery() {
        if (this.galleryObj) {
            let response = await this.galleries.save(this.galleryObj);
            if (response.error) {
                alert("There was an error creating the pics");						
            }
            this.showList = 'showGalleries';
        }
    }
    back(){
        this.showList='showGalleries';
      }

     async givePictures(gallery){
          //get images for gallery._id
          this.galleryId=gallery._id;
          this.showList = 'showImages',
          await this.mypics.getUserPics(this.galleryId);
      }

    //   async activate() {
    //     await this.mypics.getUserPics(this.user._id);
    // }

    createPicture() {
        this.picsObj = {
            pics: "",
            description: "",
            dateDue: new Date(),
            userId: this.user._id,
            galleryId:this.galleryId
        }
        this.showList = 'showImagesForm';
    }
    editPics(pics) {
        this.picsObj = pics;
        this.showList = 'showImagesForm';
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
            this.showList = 'showImages';
        }
    }
    back(){
        this.showList='showImages';
      }

      back2(){
          this.showList='showGalleries';
      }
}