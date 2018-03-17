var scrapy = require('node-scrapy')
const modelBuild = {
  item: '.item-name'
}




const botCommands = {};

botCommands.buildSearch = (champ, callback) => {
  let url = `http://www.probuilds.net/champions/details/${champ}`
  console.log(url)
  scrapy.scrape(url, modelBuild, function (err, data) {
    if (err) return console.error(err)
    console.log(data.item)
    callback(JSON.stringify(data.item.join(' | ')))
  })
}

module.exports = botCommands;