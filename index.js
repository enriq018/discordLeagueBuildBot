const Discord = require('discord.js');
const client = new Discord.Client();
const {
  token
} = require('./config.json');
const axios = require('axios');
const {
  buildSearch
} = require('./botCommands.js')



var scrapy = require('node-scrapy'),
  url = 'http://www.probuilds.net/champions/details/annie',
  model = {
    item: '.item-name'
  }





const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const champName = (msg) => {
  return msg.split(' ')[1];

}

client.on('ready', () => {
  console.log('Ready!');

});

//get list of all names for my dyslexic


client.on('message', message => {
  //optimize later.
  if(message.content[0] === '!') {
    if (message.content === '!buildBot list') {
      //api request
      list(data => message.channel.send(data))
    }
    if (message.content === '!buildBot') {
      help(data => message.channel.send(data))
    }
    let champ = champName(message.content)
    if (champ) {
      console.log('!!!!!', champ)
      buildSearch(champ, (data) => message.channel.send(data))
    }
  }

});

client.login(token);




/*
REDDIT QUOTE BOT
    axios.get('http://www.reddit.com/r/quotes/top/.json?count=5')
    .then((response) => {
      let info = response.data.data.children[getRandomInt(0,6)].data.title;
      //bot message to the channel
      message.channel.send(JSON.stringify(info))
    })
    .catch((error) => {
      message.channel.send('Damn Chin...Something didn\'t work');
    });
*/