var express = require('express'),
  router = express.Router(),
  logger = require('../../config/logger');
   var mongoose = require('mongoose');
    var Gallery = mongoose.model('Gallery');
    var passport = require('passport');
    var requireAuth = passport.authenticate('jwt', { session: false });
    
    
module.exports = function (app, config) {
    app.use('/api', router);
    
    
    router.get('/galleries/user/:userId', function(req, res, next){
        logger.log('Get galleries' + req.params.id, 'verbose');
    
        Gallery.find({userId: req.params.userId})
                    .then(gallery => {
                        if(gallery){
                            res.status(200).json(gallery);
                        } else {
                            res.status(404).json({message: "No galleries found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            }); 

    router.get('/galleries/:galleryId', function(req, res, next){
        logger.log('Get galleries' + req.params.id, 'verbose');
    
        Gallery.findById(req.params.galleryId)
                    .then(gallery => {
                        if(gallery){
                            res.status(200).json(gallery);
                        } else {
                            res.status(404).json({message: "No galleries found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            }); 
         
   

    router.post('/galleries',function(req,res,next){
        logger.log('Create pics', 'verbose');
        console.log(req.body);
        var gallery = new Gallery(req.body);
        gallery.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch( err => {
           return next(err);
        });
  
    });

    router.put('/galleries/:galleryId',function(req, res, next){
        logger.log('Update pics' + req.params.id, 'verbose');
    
        Gallery.findOneAndUpdate({_id: req.params.galleryId}, 		req.body, {new:true, multi:false})
                .then(gallery => {
                    res.status(200).json(gallery);
                })
                .catch(error => {
                    return next(error);
                });
        }); 
         
    

    router.delete('/galleries/:galleryId', function(req, res, next){
        logger.log('Delete pics' + req.params.id, 'verbose');
    
        Gallery.remove({ _id: req.params.galleryId })
                .then(gallery => {
                    res.status(200).json({msg: "pics Deleted"});
                })
                .catch(error => {
                    return next(error);
                });
     
         
    });
    
    
    // var storage = multer.diskStorage({
    //     destination: function (req, file, cb) {      
    //           var path = config.uploads + req.params.userId + "/" + req.params.galleryId;
    //         mkdirp(path, function(err) {
    //             if(err){
    //                 res.status(500).json(err);
    //             } else {
    //                 cb(null, path);
    //             }
    //         });
    //     },
    //     filename: function (req, file, cb) {
    //         console.log(file);
    //         let fileName = file.originalName.split('.');   
    //         cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
    //     }
    //   });
    //   var upload = multer({ storage: storage });
    //     router.post('/mypics/upload/:userId/:picsId', upload.any(), function(req, res, next){
    //       logger.log('Upload file for pics ' + req.params.picsId + ' and ' + req.params.userId, 'verbose');
    //       
    //   MyPic.findById(req.params.picsId, function(err, pics){
    //           if(err){ 
    //               return next(err);
    //           } else {     
    //               if(req.files){
    //                   pics.file = {
    //                       filename : req.files[0].filename,
    //                       originalName : req.files[0].originalName,
    //                       dateUploaded : new Date()
    //                   };
    //               }           
    //               pics.save()
    //                   .then(pics => {
    //                       res.status(200).json(pics);
    //                   })
    //                   .catch(error => {
    //                       return next(error);
    //                   });
    //           }
    //       });
    // });

    };