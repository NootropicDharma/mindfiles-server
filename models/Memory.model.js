const { Schema, model} = require('mongoose')  // react es import , aqui es require ! 

const MemorySchema = new Schema(
    {
        title: String,
        description: String,
        item: Number,
        room: {type: Schema.Types.ObjectId, ref: 'Room'},
        notes: [{type: Schema.Types.ObjectId, ref: 'Note'}] // relaciona task con Project solo objecto por que es una sola task 
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

module.exports = model("Memory", MemorySchema);
