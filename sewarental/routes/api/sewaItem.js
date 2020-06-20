const express = require('express');
const router = express.Router();

// const ArtistData = require('../../models/Artist');
const User = require('../../models/User');
const Product = require('../../models/Product');
const SewaItem = require('../../models/SewaItem');

// @Route GET /api/sewaItem/
// @Private False
router.get('/', (req, res) => {
    SewaItem.find()
        .populate([
            {
                path: 'product',
                model: 'Product',
            },
            {
                path: 'user',
                model: 'User',
            },
        ])
        .then((vendor) => {
            res.json(vendor.reverse());
        });
});

// @Route POST /api/sewaItem/assign/product/:user_id/:product_id
// @Private False

router.post('/assign/product/:user_id/:product_id', async (req, res) => {
    const newItem = {
        user: req.params.user_id,
        product: req.params.product_id,
        tanggalAwal: req.body.tanggalAwal,
        tanggalAkhir: req.body.tanggalAkhir,
        jumlahHari: req.body.jumlahHari,
        total: req.body.total,
    };
    try {
        const user = await User.findById(req.params.user_id);
        const newSewaItem = new SewaItem(newItem);
        user.sewaItem.unshift(newSewaItem);
        await newSewaItem.save();
        await user.save();
        res.send(user);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// @Route POST /api/sewaItem/update/:sewa_id
// @Private False

router.post('/status', async (req, res) => {
    const { statusPemesanan, sewa_id } = req.body;
    try {
        const success = [];
        for (let i = 0; i < sewa_id.length; i++) {
            await SewaItem.findById(sewa_id[i]).then((dataSewa) => {
                if (statusPemesanan) {
                    dataSewa.statusPemesanan = statusPemesanan;
                }
                const id_p = dataSewa.product;
                const updateSewa = dataSewa.save();
                if (updateSewa) {
                    Product.findByIdAndUpdate(
                        { _id: id_p },
                        { statusItem: 'Tidak tersedia' },
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                success.push(id_p);
                                res.status(200).send(result);
                            }
                        },
                    );
                }
            });
        }
        if (success.length < 0) {
            res.json({
                msg: 'failed',
                info: 'Tidak terjadi update status item',
            });
        }
    } catch (err) {
        res.status(404).json({ msg: 'error', error: err });
    }
});

// @Route Delete /api/sewaItem/:sewa_id
// @Private False
router.delete('/:sewa_id', (req, res) => {
    SewaItem.findByIdAndDelete(req.params.sewa_id)
        .then((response) =>
            res.status(200).json({ msg: 'success', data: response }),
        )
        .catch((error) => res.status(500).json({ msg: 'failed', data: error }));
});

module.exports = router;
