var scrapy = require('node-scrapy');
const modelBuild = {
  item: '.item-name'
}
const modelList = {
  list: '.champion-name'
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

botCommands.help = (callback) => {
    let text = `My commands (so far) :\n\n!buildBot <Champion Name> : Popular build items for champ. Example: !buildBot Lux!\n\nbuildBot list : List of all champ names according to probuilds since not all of us can spell correctly`
    callback(text)

}

module.exports = botCommands;