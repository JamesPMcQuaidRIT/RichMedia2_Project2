const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let SpellModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const SpellSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  level: {
    type: Number,
    min: 0,
    required: true,
  },

  purpose: {
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

SpellSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  level: doc.level,
  purpose: doc.purpose,
});

SpellSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return SpellModel.find(search).select('name level purpose').exec(callback);
};

SpellModel = mongoose.model('Spell', SpellSchema);

module.exports.SpellModel = SpellModel;
module.exports.SpellSchema = SpellSchema;
