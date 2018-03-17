var scrapy = require('node-scrapy');
const modelBuild = {
  item: '.item-name'
}
const modelList = {
  list: '.champion-name garamond'
}

const champNames = require('./champNames.js');

const botCommands = {};


const validName = (champ) => {
  // console.log('checking if name is valid', champ)
  let exsist = champNames.filter(el => el === champ).length === 1;
  if(exsist) {
    return true;
  } else {
    let didYouMean = [];
    let prefix = champ.slice(0,2)
    champNames.forEach(el => {
      if(el.includes(prefix)) {
        didYouMean.push(el)
      }
    })
    return 'did you mean ' + didYouMean.join(', or ') + '?';
  }
}

botCommands.buildSearch = (champ, callback) => {
  // console.log(validName(champ));
  let valid = validName(champ);
  if(valid === true) {
    let url = `http://www.probuilds.net/champions/details/${champ}`
    console.log(url)
    scrapy.scrape(url, modelBuild, function (err, data) {
      if (err) return console.error(err)
      console.log(data.item)
      callback(JSON.stringify(data.item.join(' | ')))
    })
  } else {
    callback(validName(champ));
  }
}

botCommands.list = (callback) => {
  callback(champNames)
}


botCommands.help = (callback) => {
    let text = `My commands (so far) :\n\n!buildBot <Champion Name> : Popular build items for champ. Example: !buildBot Lux!\n\n!buildBot list : List of all champ names according to probuilds since not all of us can spell correctly`
    callback(text)

}

module.exports = botCommands;