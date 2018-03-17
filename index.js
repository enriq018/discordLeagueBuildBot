const Discord = require('discord.js');

const client = new Discord.Client();
const { token } = require('./config.json');
const { buildSearch, list, help } = require('./botCommands.js');

console.log('starting bot server...');

const champName = msg => (msg.split(' ')[1]);

client.on('ready', () => {
  console.log('Bot is ready!');
});

client.on('message', (message) => {
  /* Check any discord message to see if bot is being pinged */
  if (message.content[0] === '!') {
    /* Check for list request */
    if (message.content === '!buildBot list') {
      list(data => message.channel.send(data));
    } else {
      /* Get typed champion name and pass it to buildSearch bot command */
      const champ = champName(message.content);
      if (champ) {
        buildSearch(champ.toLowerCase(), data => message.channel.send(data));
      }
    }
    /* If nothing besides !buildBot was typed, return the help blurb */
    if (message.content === '!buildBot') {
      help(data => message.channel.send(data));
    }
  }
});

client.login(token);

