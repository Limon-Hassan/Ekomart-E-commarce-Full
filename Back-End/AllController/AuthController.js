const userSchema = require('../Model/userSchema');
const bcrypt = require('bcrypt');
const passport = require('passport');
let jwt = require('jsonwebtoken');
const sendEmailer = require('../Halper/sendEmail');

async function registation(req, res, next) {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json('Please Enter all the fields !');
  }
  let existingUser = await userSchema.findOne({ email });
  if (existingUser) {
    res.status(400).json({ msg: 'Email Already Exists !' });
  }

  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      let Users = new userSchema({
        name,
        email,
        password: hash,
      });
      await Users.save();
      let Otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      let otpsent = await userSchema.updateOne(
        { email },
        { $set: { otp: Otp } },
        { new: true }
      );
      setTimeout(async () => {
        await userSchema.updateOne(
          { email },
          { $set: { otp: null } },
          { new: true }
        );
      }, 60000);
      sendEmailer(email, 'otp', { name: name, otp: Otp });

      res
        .status(201)
        .json({ msg: 'User Registation succesfull !', data: Users });
    });
  } catch (error) {
    next(error);
    res.status(500).json({ msg: 'Internal server Error !' });
  }
}

async function Adminregistation(req, res, next) {
  let { name, email, password, Roll } = req.body;

  if (!name || !email || !password || !Roll) {
    res.status(400).json('Please Enter all the fields !');
  }
  let existingUser = await userSchema.findOne({ email });
  if (existingUser) {
    res.status(400).json({ msg: 'Email Already Exists !' });
  }
  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      let Users = new userSchema({
        name,
        email,
        password: hash,
        Roll,
      });
      await Users.save();
      let Otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      let otpsent = await userSchema.updateOne(
        { email },
        { $set: { otp: Otp } },
        { new: true }
      );
      setTimeout(async () => {
        await userSchema.updateOne(
          { email },
          { $set: { otp: null } },
          { new: true }
        );
      }, 60000);
      sendEmailer(email, 'otp', { name: name, otp: Otp });
      res
        .status(201)
        .json({ msg: 'Admin Registation succesfull !', data: Users });
    });
  } catch (error) {
    next(error);
    res.status(500).json({ msg: 'Internal server Error !' });
  }
}

async function login(req, res, next) {
  let { email, password, Roll } = req.body;
  try {
    let existingUser = await userSchema.findOne({ email });
    if (existingUser.isVerify === false) {
      return res.status(400).json({ msg: 'Please verify your email!' });
    }
    if (existingUser) {
      bcrypt.compare(password, existingUser.password, function (err, result) {
        if (result === true) {
          const payload = {
            id: existingUser._id,
            email: existingUser.email,
            Role: existingUser.Roll,
          };
          var token = jwt.sign({ payload }, process.env.JWT_SECRET, {
            expiresIn: '1h',
          });
          res.cookie(
            existingUser.Roll === 'admin' ? 'adminToken' : 'userToken',
            token,
            {
              httpOnly: true,
              secure: false,
              sameSite: 'lax',
              maxAge: 60 * 60 * 1000,
            }
          );

          return res.status(200).json({
            token: token,
            msg:
              existingUser.Roll === 'admin'
                ? 'Admin Login Successfull !'
                : 'User Login Sucessfull !',
            role: existingUser.Roll,
            userId: existingUser._id,
          });
        } else {
          return res.status(404).json({ msg: 'Invaild Password !' });
        }
      });
    } else {
      return res.json('ai email a kono user nai');
    }
  } catch (error) {
    next(error);
  }
}

async function googleLogin(req, res, next) {
  try {
    const { email, name } = req.user;

    let user = await userSchema.findOne({ email });
    if (!user) {
      user = await userSchema.create({
        name,
        email,
        password: null,
        Roll: 'user',
      });
    }
    const payload = {
      id: user._id,
      email: user.email,
      Role: user.Roll,
    };

    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('userToken', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 60 * 60 * 1000,
    });

    res.redirect('http://localhost:5173/google/success');
  } catch (err) {
    next(err);
    return res.json({ msg: 'server error !', error: err.message });
  }
}

async function alluser(req, res) {
  if (req.user.Role === 'user') {
    userInfo = await userSchema
      .findOne({ _id: req.user.id })
      .select('-password');
    res.json({ user: userInfo });
  } else {
    return res
      .status(401)
      .json({ msg: 'Token expired or invalid. Please log in again.' });
  }
}

async function adminUsers(req, res, next) {
  try {
    if (req.user.Role === 'admin') {
      let users = await userSchema.find({ Roll: 'user' }).select('-password');

      return res.json(users);
    } else {
      return res
        .status(401)
        .json({ msg: 'Unauthorized: Only admin can access this.' });
    }
  } catch (err) {
    next(err);
    return res.status(500).json({ msg: 'Server error' });
  }
}

async function otpVerify(req, res) {
  let { email, OTP } = req.body;
  let verify = await userSchema.findOne({ email });
  if (!verify) {
    return res.status(404).json('User not found!');
  }
  if (verify.otp === OTP) {
    verify.isVerify = true;
    await verify.save();
    return res.json({ msg: 'Email verfiy succesfull !' });
  } else {
    return res.json({ msg: 'Invaild Otp ! please resent it ' });
  }
}

async function resntOTP(req, res) {
  let { email } = req.body;
  let Again_mail = await userSchema.findOne({ email });
  if (!Again_mail) {
    return res.status(404).json({ msg: 'User not found!' });
  }
  let Otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  let otpsent = await userSchema.updateOne(
    { email },
    { $set: { otp: Otp } },
    { new: true }
  );
  setTimeout(async () => {
    await userSchema.updateOne(
      { email },
      { $set: { otp: null } },
      { new: true }
    );
  }, 60000);
  sendEmailer(email, 'otp', { name: Again_mail.name, otp: Otp });
  return res.json({ msg: 'otp resent successfull' });
}

const getCurrentUser = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: 'Not logged in' });
    }
    res.json({ user: req.user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

module.exports = {
  registation,
  Adminregistation,
  login,
  alluser,
  adminUsers,
  otpVerify,
  googleLogin,
  resntOTP,
  getCurrentUser,
};
