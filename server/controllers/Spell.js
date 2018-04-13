const models = require('../models');

const Spell = models.Spell;

const spellPage = (req, res) => {
  Spell.SpellModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ spell: docs });
  });
};

const makeSpell = (req, res) => {
  if (!req.body.name || !req.body.level) {
    return res.status(400).json({ error: 'Dear Adventurer, you must fill all fields' });
  }

  const spellData = {
    name: req.body.name,
    level: req.body.level,
    purpose: req.body.purpose,
    owner: req.session.account._id,
  };

  const newSpell = new Spell.SpellModel(spellData);

  const spellPromise = newSpell.save();

  spellPromise.then(() => res.json({ redirect: '/maker' }));

  spellPromise.catch((err) => {
    console.log(err);

    if (err.code === 11000) {
      return res.status(400).json({ error: 'Spell already exsists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return spellPromise;
};

const getSpells = (request, response) => {
  const req = request;
  const res = response;

  return Spell.SpellModel.findByOwner(req.session.account._id, (err, docs) => {
    console.dir(docs);

    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ spell: docs });
  });
};


module.exports.spellPage = spellPage;
module.exports.getSpells = getSpells;
module.exports.makeSpell = makeSpell;
