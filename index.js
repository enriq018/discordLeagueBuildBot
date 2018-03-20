require('dotenv').config();

const express = require('express');
const request = require('request');
const Discord = require('discord.js');
const champNames = require('./champNames.js');
const { buildSearch, list, help, randomWaitPhrase } = require('./botCommands.js');

const client = new Discord.Client();
const app = express();

const validName = (champ) => {
  return champNames.filter(el => el === champ).length === 1;
};

const didYouMean = (champ) => {
  const matches = [];
  champNames.forEach((el) => {
    if (el.includes(champ)) {
      matches.push(el);
    }
  });
  return `did you mean ${matches.join(', or ')}?`;
};

console.log('starting bot server...', process.env.current);

client.on('ready', () => {
  console.log('Bot is ready!');
});

client.on('message', (message) => {
  /* Check any discord message to see if bot is being pinged */
  if (message.content[0] === '!') {
    const msg = message.content.split(' ');
    /* If only ! was sent, reply with help */
    if (msg.length > 1) {
      const champ = msg[1].toLowerCase();
      /* Check to see if champion name was valid OR 'list' */
      const valid = validName(champ);
      if (valid) {
        /* Make unique lines for specific champs later */
        if (champ === 'urgot') { message.channel.send('Aye Mr One Trick Himself!'); }
        /* Update user that we are working on their request */
        setTimeout(() => message.channel.send(randomWaitPhrase(champ)), 2500);
        /* Begin webscraping & screenshot process */
        buildSearch(champ, data => message.channel.send(`${data}`, { files: ['./build.png'] }));
      } else if (champ === 'list') {
      /* Send back list of valid champ names */
        list(data => message.channel.send(data));
      } else {
      /* Send back similarly spelt champs */
        const similarChamps = didYouMean(champ.slice(0, 2));
        message.channel.send(similarChamps);
      }
    } else {
      /* Send back bot command info */
      help(data => message.channel.send(data));
    }
  }
});

client.login(process.env.token);

app.get('/', (req, res) => {
  res.sendStatus(200);
});

setInterval(() => {
  request('https://discord-build-bot.herokuapp.com/', (error, response) => {
    if (error) {
      console.log('err on request', error);
    }
    console.log('statusCode:', response.statusCode);
    console.log('Keeping bot awake!');
});
}, 300000);


app.listen(process.env.PORT, () => console.log('Example app listening on', process.env.PORT));
