const router = require('express').Router();
const mongoose = require('mongoose')
const Memory = require('../models/Memory.model')
const Notes = require('../models/Booknotes.model')


router.get('/notes', (req, res) => {

    Notes.find()
    .then( allMemories => {
        res.json(allMemories)
        
    })
    .catch((err)=> console.log(err))

})


router.get('/notesbymemory/:id', (req, res) => {
    const { id } = req.params
    Memory.findById(id)
    .populate("notes", "_id BookTitle Pages What Where When Who")
    .then( datos => {
        res.json(datos.notes)
    })
    .catch((err)=> console.log(err))

})

router.post('/createnote', (req, res)=> {
    const {BookTitle,Pages,What,Where,When,Who} = req.body
    
    Notes.create(req.body)
    .then( newMemory=> {
        res.status(201).json(newMemory)
    })
    .catch((err)=> console.log(err))

})




router.post('/newmemorynote', (req, res, next)=>{
    const {BookTitle,Pages,What,Where,When,Who,memoryId} = req.body;
    console.log(req.body)
    Notes.create({BookTitle,Pages,What,Where,When,Who, memoryId})
        .then(newNote => {
            return Memory.findByIdAndUpdate(memoryId, {$push: {notes: newNote._id}});
        })
        .then(response => {
            console.log(response)
            res.json(response)
        })
        .catch(err => res.json(err));
})

module.exports = router;

