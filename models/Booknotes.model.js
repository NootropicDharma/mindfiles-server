const { Schema, model} = require('mongoose')  // react es import , aqui es require ! 

const notesSchema = new Schema(
    {
        BookTitle: String,
        Pages: String,
        What: String,
        Where: String,
        When: String,
        Who: String,
        memory: {type: Schema.Types.ObjectId, ref: 'Memory'} // relaciona task con Project solo objecto por que es una sola task 
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

module.exports = model("Note", notesSchema);
