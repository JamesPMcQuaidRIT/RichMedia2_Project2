const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let WeaponModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const WeaponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  type: {
    type: String,
    required: true,
    trim: true,
  },

  rarity: {
    type: Number,
    min: 0,
    required: true,
  },

  damage: {
    type: Number,
    min: 0,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

WeaponSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  type: doc.type,
  rarity: doc.rarity,
  damage: doc.damage,
  description: doc.description,
});

WeaponSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return WeaponModel.find(search).select('name type rarity damage description').exec(callback);
};

WeaponModel = mongoose.model('Weapon', WeaponSchema);

module.exports.WeaponModel = WeaponModel;
module.exports.WeaponSchema = WeaponSchema;
