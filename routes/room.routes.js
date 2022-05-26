const router = require('express').Router();
const mongoose = require('mongoose')

const Room = require('../models/Room.model')
const Palacio = require('../models/Palace.model')




router.get('/room', (req, res) => {

    Room.find()
    .then( allPalaces => {
        res.json(allPalaces)
        
    })
    .catch((err)=> console.log(err))

})

router.get('/roomsbypalace/:id', (req, res) => {
    const { id } = req.params
    Palacio.findById(id)
    .populate("rooms", "_id title")
    .then( datos => {
        res.json(datos.rooms)
    })
    .catch((err)=> console.log(err))

})

// router.delete('/roomdelete/:id', (req, res, next)=>{
//     const {id} = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         res.status(400).json({ message: 'Specified id is not valid' });
//         return;
//     }

//     Room.findByIdAndRemove(id)
//         .then(()=> res.json({message: `Room with ${id} has been removed successfully`}))
//         .catch(error => res.json(error));
// });

router.get('/rooms/:id', (req, res, next)=> {
    const {id} = req.params;
    

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({message: 'specified id is not valid'});
        return;
    }


    Room.findById(id)
        .populate('memories')    
        .then(palace => res.status(200).json(palace))
        .catch(error => res.json(error));
    
});

router.put('/updateroom/:id', (req, res, next)=>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Room.findByIdAndUpdate(id, req.body, {new: true})
        .then((updatedPalace) => res.json(updatedPalace))
        .catch(error => res.json(error));
});


router.post('/newroom', (req, res, next)=>{
    const {title, description,memoryNumber,palaceId} = req.body;
    console.log(req.body)
    Room.create({title, description,memoryNumber, palace: palaceId})
        .then(newRoom => {
            return Palacio.findByIdAndUpdate(palaceId, {$push: {rooms: newRoom._id}});
        })
        .then(response => res.json(response))
        .catch(err => res.json(err));
})

router.delete("/deleteroom/:id", (req, res) => {
    //id -> mascota id
    //req.body.userId
    const { id } = req.params
    Room.findByIdAndRemove(id)
        .then(eliminado => {
            Palacio.findByIdAndUpdate(req.body.palaceId, { $pull: { rooms: id } }, { new: true })
                .then(usuarioActualizado => {
                    res.json(usuarioActualizado)
                }).catch(console.log)
        })
        .catch(console.log)
})



module.exports = router;