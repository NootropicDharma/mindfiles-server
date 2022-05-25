const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    password: String,
    profileImg: String,
    bio: String,
    // session: {type: Schema.Types.ObjectId, ref: 'Session'},
    palaces:[{type: Schema.Types.ObjectId, ref: 'Palace'}],
    
  },
  
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);



module.exports = model("User", userSchema);
