const express = require("express");
const router = express.Router();

// Require passport for middleware
const passport = require("passport");

// Require jsonwebtoken to make token for session
const jwt = require("jsonwebtoken");

// Import key variabel
const key = require("../../config/variabel/keys-variabel");

// Import transport-user schema
// const TransportUser = require("simpfleet_models/models/TransportUser");
// const LogisticsCompany = require("simpfleet_models/models/LogisticsCompany");

const User = require("../../models/User");
const SewaItem = require("../../models/SewaItem");
const Product = require("../../models/Product");

// Require for validation inputs
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validatePasswordChange = require("../../validation/passwordChange");


// import FacebookStrategy from 'passport-facebook';
// import GoogleStrategy from 'passport-google-oauth20';

// Middleware
const middleware = passport.authenticate("jwt", { session: false });

// Routes

// @Routes  GET All Driver /api/user/
// @Private True
router.get("/", (req, res) => {
  User.find()
    .populate({
      path: "sewaItem",
      model: "SewaItem",
      populate: {
        path: "product",
        model: "Product",
      },
    })
    .then((driver) => {
      res.json(driver);
    });
});

// @Route GET /api/user/:id
// @Private True
router.get("/:_id", (req, res) => {
  User.findById(req.params._id)
    .populate({
      path: "sewaItem",
      model: "SewaItem",
      populate: {
        path: "product",
        model: "Product",
      },
    })
    .then((data) => {
      res.json(data);
    });
});

// @Route POST /api/user/login
// @Private False
router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });

  if (!user) {
    errors.email = "User tidak ditemukan";
    return res.status(404).json(errors);
  }

  const isValidPassword = user.validPassword(password);

  if (!isValidPassword) {
    errors.password = "Password salah";
    return res.status(400).json(errors);
  }

  const payload = {
    _id: user._id,
    email: user.email,
    nama: user.nama,
    alamat: user.alamat,
    kabupaten: user.kabupaten,
    tgl_lahir: user.tgl_lahir,
    image: user.image,
  };

  jwt.sign(payload, key.SECRET_OR_KEY, { expiresIn: "1d" }, (err, token) => {
    return res.status(200).json({
      success: true,
      token: "Bearer " + token,
      user,
    });
  });
});

// @Route POST /api/driver/register
// @Private False
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const {
    nama,
    password,
    email,
    kabupaten,
    alamat,
    tgl_lahir,
    image,
  } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    errors.email = "Email sudah ada!";
    return res.status(400).json(errors);
  } else {
    const newUser = new User({
      email,
      nama,
      kabupaten,
      alamat,
      tgl_lahir,
      image,
    });

    newUser.password = newUser.generateHash(password);
    newUser
      .save()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => console.log(err));
  }
});

router.put('/update/:user_id', (req, res) => {
  const { nama, email, alamat, tgl_lahir, image } = req.body;
  User.findById(req.params.user_id).then((user) => {
    if (nama) {
      user.nama = nama;
    }
    if (email) {
      user.email = email;
    }
    if (alamat) {
      user.alamat = alamat;
    }
    if (tgl_lahir) {
      user.tgl_lahir = tgl_lahir;
    }
    if (image) {
      user.image = image;
    }

    user.save()
      .then((data) => {
        res.json({ msg: 'success', res: data });
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  });
});

// Transform Facebook profile because Facebook and Google profile objects look different
// and we want to transform them into user objects that have the same set of attributes
// const transformFacebookProfile = (profile) => ({
//   oauth_id: profile.id,
//   nama: profile.nama,
//   avatar: profile.picture.data.url,
// });

// Transform Google profile into user object
// const transformGoogleProfile = (profile) => ({
//   oauth_id: profile.id,
//   nama: profile.displayName,
//   avatar: profile.image.url,
// });

// // Register Facebook Passport strategy
// passport.use(new FacebookStrategy(facebook,
//   // Gets called when user authorizes access to their profile
//   async (accessToken, refreshToken, profile, done)
//     // Return done callback and pass transformed user object
//     => done(null, await createOrGetUserFromDatabase(transformFacebookProfile(profile._json)))
// ));

// // Register Google Passport strategy
// passport.use(new GoogleStrategy(google,
//   async (accessToken, refreshToken, profile, done)
//     => done(null, await createOrGetUserFromDatabase(transformGoogleProfile(profile._json)))
// ));

// const createOrGetUserFromDatabase = async (userProfile) => {
//   let user = await User.findOne({ 'oauth_id': userProfile.oauth_id }).exec();
//   if (!user) {
//     user = new User({
//       oauth_id: userProfile.oauth_id,
//       nama: userProfile.nama,
//       avatar: userProfile.avatar,
//     });
//     await user.save();
//   }
//   return user;
// };

// // Serialize user into the sessions
// passport.serializeUser((user, done) => done(null, user));

// // Deserialize user from the sessions
// passport.deserializeUser((user, done) => done(null, user));

// // Facebook
// export const facebookLogin = passport.authenticate('facebook');
// export const facebookMiddleware = passport.authenticate('facebook', { failureRedirect: '/auth/facebook' });

// // Google
// export const googleLogin = passport.authenticate('google', { scope: ['profile'] });
// export const googleMiddleware = passport.authenticate('google', { failureRedirect: '/auth/google' });

// // Callback
// export const oauthCallback = async (req, res) => {
//   res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user));
// };

module.exports = router;
