var path = require('path'),    
rootPath = path.normalize(__dirname + '/..'),    
env = process.env.NODE_ENV || 'development';

var config = {  
development: {    
            root: rootPath,    
            app: {      name: 'Mypics'    },    
            port: 5000, 
            db: 'mongodb://127.0.0.1/mypics-dev',        
            uploads: rootPath + '/public/uploads/',  
            secret: "cayennedlikedhistreats"
            
         
 },  //stop here
 test: {
  root: rootPath,
  app: {      name: 'Mypics'    },
  port: 2000,
  db: 'mongodb://127.0.0.1/mypics-test', 
  secret: "cayennedlikedhistreats"
  

},

 production: {    
              root: rootPath,    
              app: {      name: 'Mypics'    },    
               port: 80,
               db: 'mongodb://127.0.0.1/mypics',
               //secret: "cayennedlikedhistreats"
               
               
             }
  };

module.exports = config[env];