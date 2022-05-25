const router = require('express').Router();
const User = require('../models/User.model')
const mongoose = require('mongoose')



router.get('/user', (req, res) => {

    User.find()
    .populate('palaces')
    .then( allUsers => {
        res.json(allUsers)
        
    })
    .catch((err)=> console.log(err))

})




//  GET /api/projects/:userId -  Retrieves a specific user by id
router.get('/user/:id', (req, res, next)=> {
    const {id} = req.params;
    

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({message: 'specified id is not valid'});
        return;
    }


    User.findById(id)
        .populate({
            path: 'palaces',
            model: 'Palace',
            populate: {
                path: 'rooms',
                model: 'Room',
                populate: {
                    path: 'memories',
                    model: 'Memory',
                    populate: {
                        path: 'notes',
                        model: 'Note',
                    }
                }
            }
        })
        .then(palace => res.status(200).json(palace))
        .catch(error => res.json(error));
    
});


// PUT  /api/projects/:projectId  -  Updates a specific project by id
router.put('/userupdate/:id', (req, res, next)=>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    User.findByIdAndUpdate(id, req.body, {new: true})
        .then((updatedUser) => res.json(updatedUser))
        .catch(error => res.json(error));
});

//DELETE /api/projects/:projectId - deletes a specific project by id 

router.delete('/userdelete/:id', (req, res, next)=>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    User.findByIdAndRemove(id)
        .then(()=> res.json({message: `User with ${id} has been removed successfully`}))
        .catch(error => res.json(error));
});


module.exports = router;