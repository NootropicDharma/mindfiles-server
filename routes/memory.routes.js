const router = require('express').Router();
const mongoose = require('mongoose')

const Room = require('../models/Room.model')
const Memory = require('../models/Memory.model')
const Palace = require('../models/Palace.model')


router.get('/memories', (req, res) => {

    Memory.find()
    .then( allMemories => {
        res.json(allMemories)
        
    })
    .catch((err)=> console.log(err))

})

//el id es del usuario
router.get('/memoriesbyroom/:id', (req, res) => {
    const { id } = req.params
    Room.findById(id)
    .populate("memories", "_id title description")
    .then( datos => {
        res.json(datos.memories)
    })
    .catch((err)=> console.log(err))

})

router.post('/creatememory', (req, res)=> {
    const {title, description, item} = req.body
    
    Memory.create(req.body)
    .then( newMemory=> {
        res.status(201).json(newMemory)
    })
    .catch((err)=> console.log(err))

})




router.post('/newroommemory', (req, res, next)=>{
    const {title, description, item, roomId} = req.body;
    console.log(req.body)
    Memory.create({title, description, item, room: roomId})
        .then(newMemory => {
            return Room.findByIdAndUpdate(roomId, {$push: {memories: newMemory._id}});
        })
        .then(response => res.json(response))
        .catch(err => res.json(err));
})

module.exports = router;