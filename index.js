const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');
const axios = require('axios');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
  //message content is what the bot will look for
  if (message.content === '!') {
    //api request
    axios.get('http://www.reddit.com/r/quotes/top/.json?count=5')
    .then((response) => {
      let info = response.data.data.children[getRandomInt(0,6)].data.title;
      //bot message to the channel
      message.channel.send(JSON.stringify(info))
    })
    .catch((error) => {
      message.channel.send('Damn Chin...Something didn\'t work');
    });
  }
});

client.login(token);
