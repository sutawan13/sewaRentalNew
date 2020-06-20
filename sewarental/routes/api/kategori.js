const express = require("express");
const router = express.Router();
const Kategori = require("../../models/Kategori");

router.get("/", async (req, res) => {
  Kategori.find()
    .populate({
      path: "subkategori",
      model: "Subkategori",
    })
    .then((kategori) => {
      res.json(kategori.reverse());
    });
});

router.post("/", async (req, res) => {
  const { nama } = req.body;
  const newKategori = new Kategori({
    nama,
  });
  await newKategori
    .save()
    .then((kategori) =>
      res.status(200).json({ msg: "sucsess", data: kategori })
    )
    .catch((err) =>
      res.status(400).json({ sukses: false, message: "error", err })
    );
});

router.delete("/:_id", async (req, res) => {
  try {
    await Kategori.findByIdAndRemove(req.params._id).then((result) => {
      res.status(200).json({ msg: "success", result: result });
    });
  } catch (err) {
    res.status(404).json({ msg: "err", error: err });
  }
});

module.exports = router;
