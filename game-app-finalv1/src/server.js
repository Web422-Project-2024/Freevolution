require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userService = require("./user-service.js");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const { error } = require("console");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

// JSON Web Token Setup
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

// Configure its options
let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.JWT_SECRET,
};

// IMPORTANT - this secret should be a long, unguessable string
// (ideally stored in a "protected storage" area on the web server).
// We suggest that you generate a random 50-character string
// using the following online tool:
// https://lastpass.com/generatepassword.php

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    if (jwt_payload) {
        // The following will ensure that all routes using 
        // passport.authenticate have a req.user._id, req.user.userName
        // that matches the request payload data
        next(null, { _id: jwt_payload._id, 
            userName: jwt_payload.userName
          }); 
    } else {
        next(null, false);
    }
});

// tell passport to use our "strategy"
passport.use(strategy);

// add passport as application-level middleware
app.use(passport.initialize());

app.use(cors());
app.use(express.json());

app.post("/api/user/login", (req, res) => {
  userService.checkUser(req.body)
  .then((user) => {
    let payload = { 
      _id: user._id,
      userName: user.userName,
    };
    
    let token = jwt.sign(payload, jwtOptions.secretOrKey);

    res.json({ "message": "login successful", "token": token, "userId": user._id });
  }).catch((msg) => {
    res.status(422).json({ "message": msg });
  });
});

app.get("/api/user/favorites",passport.authenticate('jwt', { session: false }), (req,res)=>{
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({message: "UserId is required"});
  }

  userService.getAllFavorites(userId)
  .then((favorites)=>{
    res.json(favorites);
  }).catch((err)=>{
    console.log(err);
    res.status(500).json({ message: "Error retrieving favorites", error: err.message});
  });
});

app.put("/api/user/favorites/:id",passport.authenticate('jwt', { session: false }), (req,res)=>{
  userService.addFavorite(req.body.id, req.params.id)
  .then((favorites)=>{
    res.json(favorites);
  }).catch((err)=>{
    res.status(500).json({ message: "Error adding game to favorites", error: err.message });
  });
});

app.delete("/api/user/favorites/:id",passport.authenticate('jwt', { session: false }), (req,res)=>{
  userService.deleteFavorite(req.body.id, req.params.id)
  .then((favorites) => {
    res.json(favorites);
  })
  .catch((err) => {
    res.status(500).json({ message: "Error removing game from favorites", error: err.message });
  });
});

app.post("/api/register", (req,res)=>{
    userService.registerUser(req.body).then(msg=>{
        res.json({message: msg});
    }).catch(msg=>{
        res.status(422).json({message: msg});
    });
});

app.use((req, res) => {
    res.status(404).end();
});

userService.connect().then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log("API listening on: " + HTTP_PORT);
    });
}).catch(err=>console.log(err))