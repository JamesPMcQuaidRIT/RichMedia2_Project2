const models = require('../models');

const Weapon = models.Weapon;

const weaponPage = (req, res) => {
  Weapon.WeaponModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({weapon: docs});
  });
};

const makeWeapon = (req, res) => {
  console.dir(req.body);
  if (!req.body.name || !req.body.type || !req.body.rarity || !req.body.damage || !req.body.description) {
    return res.status(400).json({ error: 'Dear Adventurer, you must fill all fields' });
  }
    
 if(parseInt(req.body.rarity) < parseInt(req.body.damage)){
     return res.status(400).json({ error: 'That Weapon is too powerful for how common it is' });
 }

  const weaponData = {
    name: req.body.name,
    type: req.body.type,
    rarity: req.body.rarity,
    damage: req.body.damage,
    description: req.body.description,
    owner: req.session.account._id,
  };

  const newWeapon = new Weapon.WeaponModel(weaponData);

  const weaponPromise = newWeapon.save();

  weaponPromise.then(() => res.json({ redirect: '/maker' }));

  weaponPromise.catch((err) => {
    console.log(err);

    if (err.code === 11000) {
      return res.status(400).json({ error: 'Weapon already exsists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return weaponPromise;
};

const getWeapons = (request, response) => {
  const req = request;
  const res = response;

  return Weapon.WeaponModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ weapon: docs });
  });
};


module.exports.weaponPage = weaponPage;
module.exports.getWeapons = getWeapons;
module.exports.makeWeapon = makeWeapon;