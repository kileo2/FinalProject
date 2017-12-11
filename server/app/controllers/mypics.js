var express = require('express'),
  router = express.Router(),
  logger = require('../../config/logger');
   var mongoose = require('mongoose');
    var MyPic = mongoose.model('Mypics');
    var passport = require('passport');
    var requireAuth = passport.authenticate('jwt', { session: false });
    multer = require('multer');
    mkdirp = require('mkdirp');
    
    
module.exports = function (app, config) {
    app.use('/api', router);
    
    
    router.get('/mypics/gallery/:galleryId', function(req, res, next){
        logger.log('Get pics' + req.params.id, 'verbose');
    
        MyPic.find({galleryId: req.params.galleryId})
                    .then(pics => {
                        if(pics){
                            res.status(200).json(pics);
                        } else {
                            res.status(404).json({message: "No pics found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            }); 

    router.get('/mypics/:picsId', function(req, res, next){
        logger.log('Get pics' + req.params.id, 'verbose');
    
        MyPic.findById(req.params.picsId)
                    .then(pics => {
                        if(pics){
                            res.status(200).json(pics);
                        } else {
                            res.status(404).json({message: "No pics found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            }); 
         
   

    router.post('/mypics',function(req,res,next){
        logger.log('Create pics', 'verbose');
        var pics = new MyPic(req.body);
        pics.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch( err => {
           return next(err);
        });
  
    });

    router.put('/mypics/:picsId',function(req, res, next){
        logger.log('Update pics' + req.params.id, 'verbose');
    
        MyPic.findOneAndUpdate({_id: req.params.picsId}, 		req.body, {new:true, multi:false})
                .then(pics => {
                    res.status(200).json(pics);
                })
                .catch(error => {
                    return next(error);
                });
        }); 
         
    

    router.delete('/mypics/:picsId', function(req, res, next){
        logger.log('Delete pics' + req.params.id, 'verbose');
    
        MyPic.remove({ _id: req.params.picsId })
                .then(pics => {
                    res.status(200).json({msg: "pics Deleted"});
                })
                .catch(error => {
                    return next(error);
                });
     
         
    });
    
    
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {      
              var path = config.uploads + req.params.userId + "/" + req.params.galleryId;
            mkdirp(path, function(err) {
                if(err){
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            console.log(file);
            let fileName = file.originalname.split('.');   
            cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
        }
      });
      var upload = multer({ storage: storage });
        router.post('/mypics/upload/:userId/:picsId', upload.any(), function(req, res, next){
          logger.log('Upload file for pics ' + req.params.picsId + ' and ' + req.params.userId, 'verbose');
          
      MyPic.findById(req.params.picsId, function(err, pics){
              if(err){ 
                  return next(err);
              } else {     
                  if(req.files){
                      pics.file = {
                          filename : req.files[0].filename,
                          originalName : req.files[0].originalname,
                          dateUploaded : new Date()
                      };
                  }           
                  pics.save()
                      .then(pics => {
                          res.status(200).json(pics);
                      })
                      .catch(error => {
                          return next(error);
                      });
              }
          });
    });

    };