const scrapy = require('node-scrapy');
const champNames = require('./champNames.js');
const screenShot = require('./screenShot.js');
const modelBuild = { item: '.item-name' };

const botCommands = {};

const validName = (champ) => {
  const exsist = champNames.filter(el => el === champ).length === 1;
  if (exsist) {
    return true;
  }

  const didYouMean = [];
  const prefix = champ.slice(0, 2);
  champNames.forEach((el) => {
    if (el.includes(prefix)) {
      didYouMean.push(el);
    }
  });
  return `did you mean ${didYouMean.join(', or ')}?`;
};

botCommands.buildSearch = (champ, callback) => {
  const valid = validName(champ);
  if (valid === true) {
    // const url = `http://www.probuilds.net/champions/details/${champ}`;
    // scrapy.scrape(url, modelBuild, (err, data) => {
    //   if (err) return console.error(err);
    //   return callback(`${champ}'s build items:\n${JSON.stringify(data.item.join(' | '))}`);
    // });
    screenShot(champ, callback);
  } else {
    callback(valid);
  }
};

botCommands.list = (callback) => {
  callback(champNames);
};


botCommands.help = (callback) => {
  const text = 'My commands (so far) :\n\n! <Champion Name> : Popular build items for champ. Example: ! Lux\n\n! list : List of all champ names according to probuilds since not all of us can spell correctly';
  callback(text);
};

module.exports = botCommands;
