const { Schema, model} = require('mongoose')  // react es import , aqui es require ! 

const PalaceSchema = new Schema(
    {
        title: String,
        numberOfRooms: Number,
        palaceImg: String,
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        rooms: [{type: Schema.Types.ObjectId, ref: 'Room'}] //relaciona project with Task
        // aqui tiene array por que van a entrar varias tasks dentro de el projecto 
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

module.exports = model("Palace", PalaceSchema);

