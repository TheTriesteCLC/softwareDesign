const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const History = new Schema({
  customerId: { type: String, required: true },
  driverId: { type: String, required: true },
  vehicle: { type: String, required: true },
  start: { type: String, required: true },
  destination: { type: String, required: true },
  fee: {type: String, required: true},
  rating: {Type: Number},
  voucher: {Type: String}
}, {
  timestamps: true,
});

module.exports = mongoose.model('History', History);
