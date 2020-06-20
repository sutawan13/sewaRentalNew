const express = require("express");
const router = express.Router();

const User = require("../../models/User");


router.get("/", (req, res) => {
    User.find()
        .then((driver) => {
            res.json(driver);
        });
});





router.get('/data', async (req, res) => {
    console.log('require', req.body)
    const { nama, email, alamat, tgl_lahir, image } = req.body;
    await User.find().then(user => {
        res.json({ msg: 'oke', res: user })
    })


    // User.findById(req.params.user_id).then((user) => {
    //   res.json({ msg: 'success', res: user });
    // if (nama) {
    //   user.nama = nama;
    // }
    // if (email) {
    //   user.email = email;
    // }
    // if (alamat) {
    //   user.alamat = alamat;
    // }
    // if (tgl_lahir) {
    //   user.tgl_lahir = tgl_lahir;
    // }
    // if (image) {
    //   user.image = image;
    // }

    // user.save()
    //   .then((data) => {
    //     res.json({ msg: 'success', res: data });
    //   })
    //   .catch((err) => {
    //     res.status(404).json(err);
    //   });
    // });
});


module.exports = router;
