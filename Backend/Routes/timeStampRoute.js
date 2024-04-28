const express = require('express');
const router = express.Router();
const Timestamp = require('../models/timestamp');

router.post('/timestamp', async (req, res) => {
  try {
    const userId = req.body.user_id;
    const checkin = req.body.checkin;
    const now = new Date();
    const timestampData = {
      user_id: userId,
      check_in: checkin,
      timestamp: now,
    };

    const ts = new Timestamp(timestampData);
    await ts.save();

    if (checkin) {
      res.status(201).json(ts);
    } else {
      const timestampToUpdate = await Timestamp.findOne({ user_id: userId, check_in: true, check_out: false });

      if (!timestampToUpdate) {
        return res.status(404).json({ message: 'Check-in record not found' });
      }

      timestampToUpdate.check_out = now;
      await timestampToUpdate.save();

      res.status(200).json(timestampToUpdate);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;