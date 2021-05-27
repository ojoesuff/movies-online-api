import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
  name: {type: String, required: true },
  movies: [{type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'}]
})

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true },
  favourites: [{type: mongoose.Schema.Types.ObjectId,
              ref: 'Movie'}],
  wishlists: [WishlistSchema]
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        return next(err);
      }
      console.log(hash);
      user.password = hash;
      next();
    });
  }
  else {
    return next();
  }
});

// find by username
UserSchema.statics.findByUserName = function(username) { 
  return this.findOne({ username: username});
};

// add a favourite movie.
UserSchema.methods.addFavourite = function(movieId) {
  if(!this.favourites.find(fav => fav == movieId))
    this.favourites.push(movieId);
  return this.save();
};

// remove favourite movie.
UserSchema.methods.removeFavourite = function(movieId) {
  this.favourites.remove(movieId);
  return this.save();
};

UserSchema.methods.addWishlist = function(wishlist) {
  this.wishlists.push(wishlist);
  return this.save();
};

UserSchema.methods.addMovieToWishlist = function(wishlistId, movieId) {
  if(this.wishlists.find(w => w._id == wishlistId)?.movies?.indexOf(movieId) === -1)
    this.wishlists.find(w => w._id == wishlistId)?.movies?.push(movieId)
  return this.save();
};

UserSchema.methods.removeMovieFromWishlist = function(wishlistId, movieId) {
  this.wishlists.find(w => w._id == wishlistId)?.movies?.remove(movieId)
  return this.save();
};

UserSchema.methods.deleteWishlist = function(wishlist) {
  this.wishlists.remove(wishlist);
  return this.save();
};

UserSchema.methods.comparePassword = function (passw, callback) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};


export default mongoose.model('User', UserSchema);