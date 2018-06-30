 const mongoose = require('mongoose');
 const Chat = require('../models/Chat');
 var express = require('express');
 var router = express.Router();
 const User = require('../models/User');

 router.post('/new', (req, res) => {

     Chat.create(req.body).then((chat) => {
         User.findByIdAndUpdate(req.body.userAId, {
             $push: {
                 chatRoom: chat
             }
         }).then(user => console.log(user)).catch(err => console.log(err));

         User.findByIdAndUpdate(req.body.userBId, {
             $push: {
                 chatRoom: chat
             }
         }).then(user => console.log(user)).catch(err => console.log(err));

         // console.log(req.body.ownerId);
         // User.findById({_id: Chat.ownerId}).then((user) => {
         //         console.log(user.firstname);

         // });



         return res.status(201).send(chat);
     }).catch(err => {
         return res.status(400).send({
             error: err
         });
     });
 });

 router.post('/send', (req, res) => {
     
    Chat.findByIdAndUpdate(req.body.chatId, {
        $push: {
            messages: req.body.message
        }
    }).then(chat1 => {
        // console.log(chat1._id);
        // console.log(chat1.userAId);
        User.findByIdAndUpdate(chat1.userAId, {
            $pull: {
                "chatRoom": {
                    "_id": chat1._id
                }
            }
        }).then(user => console.log());

        User.findByIdAndUpdate(chat1.userBId, {
            $pull: {
                "chatRoom": {
                    "_id": chat1._id
                }
            }
        }).then(user => console.log());


        Chat.findById(chat1.id).then(chat => {
            // console.log(chat);
             User.findByIdAndUpdate(chat.userAId, {
                $push: {
                    chatRoom: chat
                }
                 }
             ).then(user => console.log());
             
             User.findByIdAndUpdate(chat.userBId, {
                $push: {
                    chatRoom: chat
                }
                 }
             ).then(user => console.log());
            //  .then(user => {
            //      console.log(chat);
            //       User.findById(chat.userAId).then(usa => {
            //         User.findByIdAndUpdate(chat.userAId, {
            //             $push: {
            //                 chatRoom: chat
            //             }
            //         });
            //       })
                
            //  });

            //  User.findByIdAndUpdate(chat.userBId, {
            //      $pull: {
            //          "chatRoom": {
            //              "_id": chat._id
            //          }
            //      }
            //  }).then(user => {
            //       
            // User.findByIdAndUpdate(chat.userBId, {
            //           $push: {
            //               chatRoom: chat
            //           }
            //       });
             }).then(user => console.log());

        }).then(user => res.send(user));
       


    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // Chat.findById(req.body.chatId)
    //      .then(chat => {
    //         // console.log(chat);
    //         // console.log(chat.id);
    //          User.findByIdAndUpdate(chat.userAId, {
    //              $pull: {
    //                  "chatRoom": {"_id": chat._id}
    //              }
    //          }).then(user => {
    //             User.findByIdAndUpdate(chat.userBId, {
    //                 $pull: {
    //                     "chatRoom": {
    //                         "_id": chat._id
    //                     }
    //                 }
    //             }).then(user2 => {
    //                 Chat.findByIdAndUpdate(req.body.chatId, {
    //                     $push: {
    //                         messages: req.body.message
    //                     }
    //                 }).then(chatTwo => {
    //                     console.log(chatTwo.messages);
    //                     User.findByIdAndUpdate(chatTwo.userAId, {
    //                         $push: {
    //                             chatRoom: chatTwo
    //                         }
    //                     }).then(user => console.log(user.chatRoom.length)).catch(err => console.log(err));


    //                     User.findByIdAndUpdate(chatTwo.userBId, {
    //                         $push: {
    //                             chatRoom: chatTwo
    //                         }
    //                     }).then(user => console.log()).catch(err => console.log());

    //                     return res.status(201).send(chatTwo);
    //                 }).catch(err => {
    //                     return res.status(400).send({
    //                         error: err
    //                     });
    //                 });


    //             }).catch(err => console.log(err));


    //          }).catch(err => console.log(err));


             

             


             
    //      }).catch(err => {
    //          return res.status(400).send({
    //              error: err
    //          });
    //      });

         
//  });

 


 module.exports = router;

 