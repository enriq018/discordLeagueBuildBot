const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');


client.on('ready', () => {
    console.log('Ready!');
});


client.on('message', message => {
  console.log(message.content);
  if (message.content === '!buildBot') {
    // send back "Pong." to the channel the message was sent in
    message.channel.send('Pong.');
  }
});

client.login(token);