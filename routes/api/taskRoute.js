const express = require('express');
const uuid = require('uuid');
const { check, validationResult } = require('express-validator');
let userlist = require('../../models/Users');
//let userlist = require('../../data/users');



const router = express.Router();

//route Get api/users/
//desc GET all users
//access public

/*
router.get('/', (req, res) => {
  try {
    res.send(userlist);
  } catch (err) {
    res.status(500).send('Server errror');
  }
}); */

router.get('/', async (req, res) => {
  try {
    const userDb = await userlist.find();
    console.log("it is here"+userDb);
     res.send(userDb);
  } catch (err) {
    res.status(500).send('Server errror');
  }
});

//route Get api/users/:id
//desc GET users by id
//access public
// router.get('/:id', (req, res) => {
//   try {
//     const user = userlist.find((t) => t.id == req.params.id);
//     if (!user) {
//       res.status(404).send('user not found');
//     }
//     res.send(user);
//   } catch (err) {
//     res.status(500).send('Server errror');
//   }
// });

router.get(
  '/:id',

  async (req, res) => {
    try {
      
      const user = await userlist.findById(req.params.id);
      if (!user) {
        return res.status(404).send('user not found');
      }
      res.send(user);
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);




// // //route post api/users
// // //desc insert user
// // //access public
// router.post('/', (req, res) => {
//   try {
//     const newuser = {
//       id: uuid.v4(),
//       Name: req.body.Name,
//       Email: req.body.Email,
//       Password: req.body.Password,

//     };
//     userlist.push(newuser);
//     res.send(newuser);
//   } catch (err) {
//     res.status(500).send('Server errror');
//   }
// });

router.post(
  '/',

  [
    check('Email','Email is empty,Kindly enter value').not().isEmpty(),
    check('Name','name is empty,Kindly enter value').not().isEmpty(),
    check('Password','password is empty,Kindly enter value').not().isEmpty(),
    check('Email','Email not valid,Kindly enter value').isEmail(),
    check('Password','password should be of minimum 4 characters,Kindly enter value').isLength({min:4}),

], 

async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newuser = new userlist({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
      });
      const nt = await newuser.save();
      res.send(nt);
    } catch (err) {
      res.status(500).send('Server errror'+err);
    }
  }
);

//route delete api/USERS/:id
//desc delete user by id
//access public
// router.delete('/', (req, res) => {
//   try {
//     // find the element
//     const user = userlist.find((tk) => tk.id == req.body.id);
//     if (!user) {
//       return res.status(404).json({ msg: 'user not found' });
//     }

//     userlist = userlist.filter(function (obj) {
//       return obj.id !== user.id;
//     });
//     res.json(userlist);

//     //res.json({ msg: 'user deleted' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

router.delete('/',
[
    check('_id','ID is empty').not().isEmpty(),
],
async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({errors : error.array()})
    }
    const userfound = userlist.findById(req.body.sid);
    if(!userfound){
        res.json({msg:'User id not found'});
    }
    try{
        await userlist.findByIdAndRemove({_id: req.body._id});
        res.json({msg:'User is deleted'});
    }
    catch(err){
        res.status(500).send('SERVER ERROR'+ err);
    }
});


// route put  api/users/
// desc update users
// /access public
// router.put('/', (req, res) => {
//   try {
//     const updateduser = userlist.find((tk) => tk.id == req.body.id);

//     if (!updateduser) {
//       return res.status(404).json({ msg: 'User not found' });
//     }
//     const id = req.body.id;
//     const Name= req.body.Name;
//       const Email= req.body.Email;
//       const Password = req.body.Password;
//       userlist = userlist.filter(function (obj) {
//       if (obj.id == id) {
       
//         obj.Name = Name;
//         obj.Email = Email;
//         obj.Password = Password;
//       }
//       return obj;
//     });

//     res.send(updateduser);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send('Server error');
//   }
// });


router.put(
  '/',
  [
    check('Name', 'Name is required').not().isEmpty(),
    check('Password', 'Password longer than 2 chars').isLength({
      min: 4,
    }),

  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const user = await userlist.findById(req.body._id);
      console.log(user);
      if (!user) {
        return res.status(404).send('user not found');
      }
      user.Name = req.body.Name;
      user.Email = req.body.Email;
      user.Password = req.body.Password;
      await user.save();

      res.send('user added');
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
