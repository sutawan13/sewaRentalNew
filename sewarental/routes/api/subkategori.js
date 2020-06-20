const express = require("express");
const router = express.Router();
const Subkategori = require("../../models/Subkategori");
const Kategori = require("../../models/Kategori");

// @Route GET /api/subkategori/
// @Private False
router.get("/", async (req, res) => {
  Subkategori.find().then((sub) => {
    res.json(sub);
  });
});

// @Route POST add subkategori in kategori /api/subkategori/:_id
// @Private False
router.post("/:_id", (req, res) => {
  console.log(req.body);
  const newSub = {
    nama: req.body.nama,
  };

  Kategori.findById(req.params._id)
    .then((kategori) => {
      new Subkategori(newSub)
        .save()
        .then((sub) => {
          kategori.subkategori.unshift(sub); // Data will increase
          kategori.save().then((hasil) => res.json(hasil));
        })
        .catch((err) => res.status(404).json(err));
    })
    .catch((err) => res.status(404).json(err));
});

router.delete("/:_id", async (req, res) => {
  try {
    await Subkategori.findByIdAndRemove(req.params._id).then((result) => {
      res.status(200).json({ msg: "success", result: result });
    });
  } catch (err) {
    res.status(404).json({ msg: "err", error: err });
  }
});

module.exports = router;
