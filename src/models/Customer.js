const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Customer = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: String, required: true },
  tel: { type: String, required: true },

  slug: { type: String, slug: 'username', unique: true },

  status: { type: String, required: true },
}, {
  timestamps: true,
});

Customer.statics = {
  findByCustomername(username) {
    return this.findOne({ username: username });
  },

  async hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 7);
    return hashedPassword;
  }
}

Customer.methods = {
  comparePassword(password) {
    return bcrypt.compare(password, this.password);
    // return password === this.password;
  },

  async setPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 7);
    this.password = hashedPassword;
  }
}

module.exports = mongoose.model('Customer', Customer);