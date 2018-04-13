const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getAdventurers', mid.requiresLogin, controllers.Adventurer.getAdventurers);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Adventurer.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Adventurer.make);
  app.post('/age', mid.requiresLogin, controllers.Adventurer.ageUp);
  app.get('/getSpells', mid.requiresLogin, controllers.Spell.spellPage);
  app.post('/spellMaker', mid.requiresLogin, controllers.Spell.makeSpell);
  app.get('/getWeapons', mid.requiresLogin, controllers.Weapon.weaponPage);
  app.post('/weaponMaker', mid.requiresLogin, controllers.Weapon.makeWeapon);
  app.get('/changePassword', mid.requiresLogin, controllers.Weapon.weaponPage);
  app.post('/passwordChange', mid.requiresLogin, controllers.Weapon.makeWeapon);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
