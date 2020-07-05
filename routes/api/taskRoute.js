const express = require('express');
const uuid = require('uuid');
const { check, validationResult } = require('express-validator');
let userlist = require('../../models/users');


const router = express.Router();

//route Get api/tasks
//desc GET all task
//access public
router.get('/', (req, res) => {
  try {
    res.send(userlist);
  } catch (err) {
    res.status(500).send('Server errror');
  }
});

//route Get api/tasks/:id
//desc GET task by id
//access public
router.get('/:id', (req, res) => {
  try {
    const user = userlist.find((t) => t.id == req.params.id);
    if (!user) {
      res.status(404).send('user not found');
    }
    res.send(user);
  } catch (err) {
    res.status(500).send('Server errror');
  }
});

// //route post api/tasks
// //desc insert task
// //access public
router.post('/', (req, res) => {
  try {
    const newuser = {
      id: uuid.v4(),
      Name: req.body.Name,
      Email: req.body.Email,
      Password: req.body.Password,

    };
    userlist.push(newuser);
    res.send(newuser);
  } catch (err) {
    res.status(500).send('Server errror');
  }
});

// //route delete api/tasks/:id
// //desc delete task by id
// //access public
router.delete('/', (req, res) => {
  try {
    // find the element
    const user = userlist.find((tk) => tk.id == req.body.id);
    if (!user) {
      return res.status(404).json({ msg: 'user not found' });
    }

    userlist = userlist.filter(function (obj) {
      return obj.id !== user.id;
    });
    res.json(userlist);

    //res.json({ msg: 'user deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// // //route put  api/tasks/
// // //desc update task
// // //access public
router.put('/', (req, res) => {
  try {
    const updateduser = userlist.find((tk) => tk.id == req.body.id);

    if (!updateduser) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const id = req.body.id;
    const Name= req.body.Name;
      const Email= req.body.Email;
      const Password = req.body.Password;
      userlist = userlist.filter(function (obj) {
      if (obj.id == id) {
       
        obj.Name = Name;
        obj.Email = Email;
        obj.Password = Password;
      }
      return obj;
    });

    res.send(updateduser);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
