const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const userSchema = require('./model/userModel');

let mongoDBConnectionString = process.env.MONGODB_URI;
let User;

module.exports.connect = function () {
  return new Promise(function (resolve, reject) {
    let db = mongoose.createConnection(mongoDBConnectionString);
    
    db.on('error', (err) => {
      reject(err);
    });

    db.once('open', () => {
      User = db.model("users", userSchema);
      resolve();
    });
  });
};

module.exports.registerUser =  function (userData) {
    return new Promise(function (resolve, reject) {
        if (userData.password != userData.password2) {
          reject("Passwords do not match");
        } else {
          bcrypt.hash(userData.password, 10).then(hash=>{ // Hash the password using a Salt that was generated using 10 rounds
            userData.password = hash;
            let newUser = new User({
              userName: userData.userName,
              password: userData.password,
              favorites: [] // Initialize with an empty array for favorites
            });
            newUser.save().then(() => {
              resolve("User " + userData.userName + " successfully registered");
            }).catch(err => {
              if (err.code == 11000) {
                reject("User Name already taken");
              } else {
                reject("There was an error creating the user: " + err);
              }
            });
          }).catch(err=>reject(err));
        }
    });      
};

module.exports.checkUser = function (userData) {
    return new Promise(function (resolve, reject) {
        User.find({ userName: userData.userName })
        .limit(1)
        .exec()
        .then((users) => {
            if (users.length == 0) {
              reject("Unable to find user " + userData.userName);
            } else {
              bcrypt.compare(userData.password, users[0].password).then((res) => {
                if (res === true) {
                  resolve(users[0]);
                } else {
                  reject("Incorrect password for user " + userData.userName);
                }
              });
            }
        }).catch((err) => {
            reject("Unable to find user " + userData.userName);
        });
    });
};

module.exports.getAllFavorites = function(userId){
  return new Promise(function(resolve,reject){
    User.findById(userId)
      .then(user => {
        if (user) {
          resolve(user.favorites);
        } else {
          reject(new Error('User not found'))
        }
      })
      .catch(error => {
        console.error("Error occurred while retrieving favorites:", error);
        reject(error);
      });
  });
}

module.exports.addFavorite = function(userId, gameId){
  return new Promise(function(resolve,reject){
    User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: gameId }},
      { new: true, select: 'favorites'}
    )
      .then(user => {
        if (user) {
          resolve(user.favorites);
        } else {
          resolve([]);
        }
      })
      .catch(error => {
        console.error("Error occurred while trying to add game to favorites", error);
        reject(error);
      });
  });
}

module.exports.deleteFavorite = function(userId, gameId){
  return new Promise(function(resolve,reject){
    User.findOneAndUpdate(
      {_id: userId},
      { $pull: { favorites: gameId }},
      { new: true, select: 'favorites'}
    )
      .then(user => {
        if (user) {
          resolve(user.favorites);
        } else {
          resolve([]);
        }
      })
      .catch(error => {
        console.error("Error occurred while trying to remove selected game from favorites", error);
        reject(error);
      });
  });
}
