const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");


var fetchuser = require("../middleware/fetchuser") // like middleware use kr raha h isko hum like dussra arguments

// for JSON web token
var jwt = require("jsonwebtoken");

const JWT_SECRET = "nikhilisagood$oy";

//Route 1: Create a User using: POST "/api/auth/createuser".  Doesn,t require Auth  or NO LOGIN REQUIRED
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // if there are errors,return Bad request and  the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // check wheather the user with the email exists alerady
    //  // ik ja promise return kr raha h aur user ko kr raha h

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //   Create a new User
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true
      res.json({success, authtoken });
      //   const jwtData = jwt.sign(data,JWT_SECRET)
      //   console.log(jwtData)

      //   res.json({ user });

      //   Catch errors
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error");
    }
  }
);

// module.exports = router;

// video 50 ka target chall raha h

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login reaquired
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error");
    }
  }
);

// ROUTE 3: get loggedin User Detaials using : POST "/api/auth/getuser" . Login required

router.post("/getuser", fetchuser ,async (req, res) => {
    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;










































// video 48 tak ka code h uska baad

// const express = require("express");
// const User = require("../models/User");
// const router = express.Router();
// const { body, validationResult } = require("express-validator");
// // const bcrypt = require('bcryptjs')

// // Create a User using: POST "/api/auth/createuser".  Doesn,t require Auth  or NO LOGIN REQUIRED
// router.post(
//   "/createuser",
//   [
//     body("name", "Enter a valid name").isLength({ min: 3 }),
//     body("email", "Enter a valid email").isEmail(),
//     body("password", "Password must be atleast 5 characters").isLength({
//       min: 5,
//     }),
//   ],
//   async (req, res) => {
//     // if there are errors,return Bad request and  the errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     // check wheather the user with the email exists alerady
//     //  // ik ja promise return kr raha h aur user ko kr raha h

//     try {
//       let user = await User.findOne({ email: req.body.email });
//       if (user) {
//         return res
//           .status(400)
//           .json({ error: "Sorry a user with this email already exists" });
//       }

//     //   secPass = req.body.password
//     //   Create a new User
//       user = await User.create({
//         name: req.body.name,
//         password: req.body.password,
//         email: req.body.email,
//       });

//       // .then(user => res.json(user))
//       // .catch(err=>{console.log(err)
//       // res.json({error:'Please enter a unique value for email', message:err.message})})
//       res.json({ user });

//     //   Catch errors
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Some Errors occured");
//     }
//   }
// );

// module.exports = router;

// video45
// const express = require('express');
// const User = require('../models/User');
// const router = express.Router();

// // Create a User using: POST "/api/auth/".  Doesn,t require Auth
// router.post('/',(req,res)=>{
//     console.log(req.body)
//     const user =User(req.body);
//     user.save()
//     res.send(req.body);

//     // let obj = {
//     //     a:'thios',
//     //     number:34
//     // }
//     // res.json(obj)
// })

// module.exports = router
