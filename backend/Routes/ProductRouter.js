const router = require('express').Router();
const Product = require('../Models/Product');
const ensureAuthenticated = require('../Middlewares/Auth');

// ==========================
// MULTER SETUP
// ==========================
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });


// ==========================
// GET ALL SITTERS (FILTER)
// ==========================
router.get('/', async (req, res) => {
    try {
        const { location, min, max } = req.query;

        let query = {};

        // 🔍 Location filter
        if (location) {
            query.location = {
                $regex: location,
                $options: 'i'
            };
        }

        // 💰 Price filter
        if (min || max) {
            query.price = {};
            if (min) query.price.$gte = Number(min);
            if (max) query.price.$lte = Number(max);
        }

        const result = await Product.find(query);

        res.json(result);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ==========================
// CREATE BABYSITTER PROFILE
// + IMAGE UPLOAD
// ==========================
router.post(
    '/add',
    ensureAuthenticated,
    upload.single('image'),   // ⭐ IMAGE FIELD
    async (req, res) => {
        try {

            const { name, location, price, experience, phone, bio } = req.body;

            // ⭐ IMAGE URL
            const image = req.file
                ? `http://localhost:8080/uploads/${req.file.filename}`
                : '';

            const newBabysitter = new Product({
                name,
                location,
                price,
                experience,
                phone,
                bio,
                image,               // ⭐ SAVE IMAGE
                userId: req.user._id
            });

            await newBabysitter.save();

            res.status(201).json(newBabysitter);

        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Server error",
                success: false
            });
        }
    }
);

module.exports = router;