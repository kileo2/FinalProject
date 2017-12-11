import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';
@inject(DataServices)
export class Galleries {
    constructor(data) {
        this.data = data;
        this.GALLERY_SERVICE = 'galleries';
        this.galleriesArray = [];
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.showList = true;
    }
    async getUserGallery(id) {
        let response = await this.data.get(this.GALLERY_SERVICE + "/user/" + id);
        if (!response.error && !response.message) {
            this.galleriesArray = response;
        }
    }

    async deleteGallery(id){
		let response = await this.data.delete(this.GALLERY_SERVICE + "/" + id);
		if(!response.error){
			for(let i = 0; i < this.galleriesArray.length; i++){
				if(this.galleriesArray[i]._id === id){
					this.galleriesArray.splice(i,1);
				}
			}
		}
    }
    async uploadFile(files, userId, galleryId){
                let formData = new FormData();
                files.forEach((item, index) => {
            formData.append("file" + index, item);
                });
            
            let response = await this.data.uploadFiles(formData, this.GALLERY_SERVICE + 		"/upload/" + userId + "/" + galleryId);
            return response;
        }
        



    async save(gallery) {
        if (gallery) {
            if (!gallery._id) {
                let serverResponse = await this.data.post(gallery, this.GALLERY_SERVICE);
                if (!serverResponse.error) {
                    this.galleriesArray.push(serverResponse);
                }
                return serverResponse;
            } else {
                let serverResponse = await this.data.put(gallery, this.GALLERY_SERVICE + "/" + gallery._id);
                if (!serverResponse.error) {
                    // this.updateArray(response);
                }
                return serverResponse;
            }
        }

    }
}
