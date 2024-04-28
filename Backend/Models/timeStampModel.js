const mongoose = require('mongoose');

const TimestampSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  check_in: {
    type: Boolean,
    default: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Timestamp', TimestampSchema);