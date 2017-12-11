import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';
@inject(DataServices)
export class MyPics {
    constructor(data) {
        this.data = data;
        this.PICS_SERVICE = 'mypics';
        this.mypicsArray = [];
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.showList = true;
    }
    async getUserPics(id) {
        let response = await this.data.get(this.PICS_SERVICE + "/gallery/" + id);
        if (!response.error && !response.message) {
            this.mypicsArray = response;
        }
    }

    async deletePics(id){
		let response = await this.data.delete(this.PICS_SERVICE + "/" + id);
		if(!response.error){
			for(let i = 0; i < this.mypicsArray.length; i++){
				if(this.mypicsArray[i]._id === id){
					this.mypicsArray.splice(i,1);
				}
			}
		}
    }
    async uploadFile(files, userId, picsId){
                let formData = new FormData();
                files.forEach((item, index) => {
            formData.append("file" + index, item);
                });
            
            let response = await this.data.uploadFiles(formData, this.PICS_SERVICE + 		"/upload/" + userId + "/" + picsId);
            return response;
        }
        



    async save(pics) {
        if (pics) {
            if (!pics._id) {
                let serverResponse = await this.data.post(pics, this.PICS_SERVICE);
                if (!serverResponse.error) {
                    this.mypicsArray.push(serverResponse);
                }
                return serverResponse;
            } else {
                let serverResponse = await this.data.put(pics, this.PICS_SERVICE + "/" + pics._id);
                if (!serverResponse.error) {
                    // this.updateArray(response);
                }
                return serverResponse;
            }
        }

    }
}
