const { Schema, model} = require('mongoose')  // react es import , aqui es require ! 

const RoomSchema = new Schema(
    {
        title: String,
        description: String,
        memoryNumber: Number,
        palace: {type: Schema.Types.ObjectId, ref: 'Palace'},
        memories: [{type: Schema.Types.ObjectId, ref: 'Memory'}] // relaciona task con Project solo objecto por que es una sola task 
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

module.exports = model("Room", RoomSchema);
