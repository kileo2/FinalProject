import {AuthorizeStep} from 'aurelia-auth';

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep);     
    config.map([
      { 
	route: ['', 'home'],
	 moduleId: './modules/home',
	 name: 'Home' 
      },
      {
        route:'galleries',
        moduleId:'./modules/galleries',
        name: 'Gallery',
        auth:true
      },
      {
	 route: 'pictures',
	 moduleId: './modules/pictures',
   name: 'Pictures',
   auth: true 
     }
    ]);
  }
}
