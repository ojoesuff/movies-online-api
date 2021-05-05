import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true },
  favourites: [{type: mongoose.Schema.Types.ObjectId, //NEW: ADD A FAVOURITES FIELD
              ref: 'Movie', unique: true}]
});

// find by username
UserSchema.statics.findByUserName = function(username) { 
  return this.findOne({ username: username});
};

// add a favourite movie.
UserSchema.methods.addFavourite = function(movieId) {
  this.favourites.push(movieId);
  return this.save(); //VERY IMPORTANT. MUST CALL SAVE() TO STORE IN DB.
};


export default mongoose.model('User', UserSchema);