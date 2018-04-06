const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let AdventurerModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const AdventurerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  age: {
    type: Number,
    min: 0,
    required: true,
  },

  class: {
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

AdventurerSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  class: doc.class,
});

AdventurerSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return AdventurerModel.find(search).select('name age class').exec(callback);
};

AdventurerSchema.statics.upAge = (ownerId, searchedId, callback) => {
  const search = {
    owner: convertId(ownerId),
    _id: convertId(searchedId),
  };


  return AdventurerModel.findOne(search).exec(callback);
};

AdventurerModel = mongoose.model('Adventurer', AdventurerSchema);

module.exports.AdventurerModel = AdventurerModel;
module.exports.AdventurerSchema = AdventurerSchema;
