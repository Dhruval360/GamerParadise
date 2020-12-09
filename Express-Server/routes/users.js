const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

router.get("/leaderboard",  (req, res) => {   
  User.find({} , (err, allDetails) => {
      if (err) {
          console.log(err);
      } else {
          //res.render("leaderboard", { details: allDetails,user: req.user})
          res.send(allDetails);
      }
  }).sort({ wins: -1 });
})

router.post('/leaderboard', (req, res) => {
 // console.log(req.body);
  User.findOne(req.body, (err,user) => {
    if (err) {
      console.log(err)
      res.end();
    } else {
      //console.log(user.wins)
      user.wins = user.wins + 1;
      user.save();
      res.end();
    }
  })
})

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login')); 

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register')); 

// Register
router.post('/register', (req, res) => {
  const {name, email, password, password2} = req.body;

  if(!name || !email || !password || !password2) return res.status(400).json({message : 'Please enter all fields'});
  if(password != password2) return res.status(400).json({message : 'Passwords do not match'});
  if(password.length < 6) return res.status(400).json({message : 'Password must be atleast 6 characters'});
  else{
    User.findOne({email : email}).then(user => {
      if(user) return res.status(400).json({message : "An account with this email id already exists"})   
      else{
        const newUser = new User({name,email,password});
        // Encrypting the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            const savedUser = newUser.save() // Saving the user to the database
              .then(user => {
                res.json(savedUser);
              }).catch(err => {
                console.log(err);
                res.status(500).json({error : err.message});
                }
              );
          });
        });
      }
    });
  }
});

/*
// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});
*/


///////////New
router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({message : "Please enter all fields"});
    
    const user = await User.findOne({email : email});
    if(!user) return res.status(400).json({message : "No user with this account has been registered"});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({message : "Invalid credentials"});

    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
    res.json({token, user : {id : user._id, name : user.name, email : user.email}});
  } catch (error) {
    res.status(500).json({error : error.message});
  }
});

const auth = require('../middleware/auth');
router.delete('/delete', auth, async (req, res) => { // A similar thing can be done for letting user change name or password
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser); // To say goodbye to the user and shed tears
  } catch (error) {
    res.status(500).json({error : error.message});
  }
})

router.post('/tokenIsValid', async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if(!token) return res.json({truth : false, user : undefined});
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified) return res.json({truth : false, user : undefined});
    const user = await User.findById(verified.id);
    if(!user) return res.json({truth : false, user : undefined});
    return res.json({truth : true, user : {email : user.email, name : user.name, id : user._id}});
  } catch (error) {
    res.status(500).json({error : error.message});
  }
})

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    name : user.name,
    email : user.email,
    id : user._id
  });
})

module.exports = router;