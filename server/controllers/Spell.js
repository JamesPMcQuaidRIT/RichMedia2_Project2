const models = require('../models');

const Spell = models.Spell;

const spellPage = (req, res) => {
  Spell.SpellModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), adventurers: docs });
  });
};

const makeSpell = (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Dear Adventurer, you must fill all fields' });
  }

  const spellData = {
    name: req.body.name,
    level: req.body.level,
    purpose: req.body.purpose,
    owner: req.session.account._id,
  };

  const newSpell = new Spell.SpellModel(spellData);

  const adventurerPromise = newAdventurer.save();

  adventurerPromise.then(() => res.json({ redirect: '/maker' }));

  adventurerPromise.catch((err) => {
    console.log(err);

    if (err.code === 11000) {
      return res.status(400).json({ error: 'Adventurer already exsists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return adventurerPromise;
};

const getAdventurers = (request, response) => {
  const req = request;
  const res = response;

  return Adventurer.AdventurerModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ adventurer: docs });
  });
};

const ageUpAdventurer = (req, res) => {
  Adventurer.AdventurerModel.upAge(req.session.account._id, req.body._id, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    
    //console.dir(req.body);

    const adventurer = doc;

    adventurer.age++;

    const newAdventurer = new Adventurer.AdventurerModel(adventurer);

    const adventurerPromise = newAdventurer.save();

    adventurerPromise.then(() => res.json({ redirect: '/maker' }));

    return res.json({ adventurer: doc });
  });
};

module.exports.makerPage = makerPage;
module.exports.getAdventurers = getAdventurers;
module.exports.make = makeAdventurer;
module.exports.ageUp = ageUpAdventurer;
