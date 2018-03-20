const scrapy = require('node-scrapy');
const champNames = require('./champNames.js');

const screenShot = require('./screenShot.js');

const modelBuild = { item: '.item-name' };

const botCommands = {};

botCommands.buildSearch = (champ, callback) => {
  const url = `http://www.probuilds.net/champions/details/${champ}`;
  scrapy.scrape(url, modelBuild, (err, data) => {
    if (err) return console.error(err);
    return screenShot(champ, () => {
      console.log('Success! Sending back the goods for ', champ);
      callback(`${champ}'s build items:\n${JSON.stringify(data.item.join(' | '))}`);
    });
  });
};

botCommands.list = (callback) => {
  callback(champNames);
};

botCommands.help = (callback) => {
  const text = 'My commands (so far) :\n\n! <Champion Name> : Popular build items for champ. Example: ! Lux\n\n! list : List of all champ names according to probuilds since not all of us can spell correctly';
  callback(text);
};

botCommands.randomWaitPhrase = (champ) => {
  /* Break phrases into seperate text file later */
  const phrases = [`Almost done looking up ${champ}`, `Getting ${champ}'s info...`,
    `${champ} build will be posted shortly`, 'Unlike Chris, I tell you how long i\'ll take to do things! 5 secs', 'You got it!',
    ':)', `searching ${champ}`, 'And now, the strength of the Black Panther will be STRIPPED AWAY', 'okie dokie Dr.Jones!', 'Just putting on the finishing touches',
    'jump jump the house is jumping', 'this is how we do it', 'dont tilt!', 'toxic free is the way to be'];

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  return phrases[getRandomInt(0, phrases.length + 1)];
};

module.exports = botCommands;
