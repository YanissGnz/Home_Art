const UserModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const { signUpErrors} = require('../utils/errors.util.js');
const { json } = require('body-parser');

module.exports.signUp = async (req, res) => {
  const {name, email, password} =req.body
  console.log(req.body)
  try {
    const user = await UserModel.create({name, email, password});
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
}

module.exports.logout = (req, res) => {
   res.redirect('/');
} 
