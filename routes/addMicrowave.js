const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    keyFilename: 'knightrowave-ab29af5b421a.json',
});
const bucket = storage.bucket('knightrowave-profile-pics');

const upload = multer({
    storage: multer.memoryStorage(),
});

module.exports = function (db) {
    router.put("/:userId", upload.single('microwaveImage'), async (req, res) => {
        const userId = parseInt(req.params.userId);
        const { location_building, location_description, gps_lat, gps_long } = req.body;

        try {
            const lastMicrowave = await db.collection('microwaveLocations').find().sort({ microwave_id: -1 }).limit(1).toArray();
            const lastMicrowaveId = lastMicrowave.length > 0 ? lastMicrowave[0].microwave_id : 0;

            const microwave = {
                creator_user_id: userId,
                gps_lat,
                gps_long,
                total_rating: 0,
                users_rated: 0,
                microwave_id: lastMicrowaveId + 1,
                location_building,
                location_description,
            };

            if (req.file) {
                const microwaveImageFileName = `${userId}_${Date.now()}_${req.file.originalname}`;
                const microwaveImageFile = bucket.file(microwaveImageFileName);

                await microwaveImageFile.save(req.file.buffer, { public: true });

                microwave.microwave_image_url = `https://storage.googleapis.com/${bucket.name}/${microwaveImageFileName}`;
            }

            await db.collection('microwaveLocations').insertOne(microwave);

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ message: 'New microwave added successfully!' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    return router;
};
