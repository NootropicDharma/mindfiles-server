const router = require('express').Router()
const Palace = require('../models/Palace.model')
const mongoose = require('mongoose')



router.get('/palaces', (req, res) => {

    Palace.find()
    .then( allPalaces => {
        res.json(allPalaces)
        
    })
    .catch((err)=> console.log(err))

})


router.post('/palaces', (req, res)=> {
    const {title, description, numberOfRooms} = req.body
    
    Palace.create(req.body)
    .then( newPalace=> {
        res.status(201).json(newPalace)
    })
    .catch((err)=> console.log(err))

})

//  GET /api/projects/:projectId -  Retrieves a specific project by id
router.get('/palaces/:palaceid', (req, res, next)=> {
    const {palaceid} = req.params;
    

    if(!mongoose.Types.ObjectId.isValid(palaceid)) {
        res.status(400).json({message: 'specified id is not valid'});
        return;
    }


    Palace.findById(palaceid)
        .populate({
            path: 'rooms',
            model: 'Room',
            populate: {
                path: 'memories',
                model: 'Memory',
                populate: {
                    path:'notes',
                    model: 'Note',
                }
            }
        })
        .then(palace => res.status(200).json(palace))
        .catch(error => res.json(error));
    
});


// PUT  /api/projects/:projectId  -  Updates a specific project by id
router.put('/palaces/:palaceId', (req, res, next)=>{
    const {palaceId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(palaceId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Palace.findByIdAndUpdate(palaceId, req.body, {new: true})
        .then((updatedPalace) => res.json(updatedPalace))
        .catch(error => res.json(error));
});

//DELETE /api/projects/:projectId - deletes a specific project by id 

router.delete('/palaces/:palaceId', (req, res, next)=>{
    const {palaceId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(palaceId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Palace.findByIdAndRemove(palaceId)
        .then(()=> res.json({message: `Palace with ${palaceId} has been removed successfully`}))
        .catch(error => res.json(error));
});


const User = require('../models/User.model')


router.post('/userpalacenew', (req, res, next)=>{
    const {title, userId} = req.body;
    console.log(req.body)
    Palace.create({title, user: userId })
        .then(newPalace => {
            return User.findByIdAndUpdate(userId, {$push: {palaces: newPalace._id}});
        })
        .then(response => res.json(response))
        .catch(err => res.json(err));
})










module.exports = router;