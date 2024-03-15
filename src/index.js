/*
  File: index.js
  Author: Craapi
  Date: 2024-01-23
*/

//  Import needed libraries
require('dotenv').config();
const TwitchApi = require('twitch-api');
const path = require('path');
const { CommandKit } = require('commandkit');
const { Player } = require('discord-player');
const { Client, IntentsBitField } = require('discord.js');

// Create a new client instance and set permissions 
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates
    ],
});

// Use CommandKit to handle Events and Commands

new CommandKit({
    client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    validationsPath: path.join(__dirname, 'validations'),
    devGuildIds: [process.env.SERVER],
    devUserIds: ['381812516046766095', '293059898873348097'],
});

// Set Prefix for non Slash-Commands
const PREFIX = '!'

var version = '1.0.1'

var userdescprition = 'none'

var servers = {};

// Logs in Bot
client.login(process.env.TOKEN);

global.servers = {};

// Bot reacts to a member joining and writes a message
client.on('guildMemberAdd', member =>{
    
    const channel = member.guild.channels.find(channel.name === "crapi-bot");

    if(!channel) {

        return;

    }

    channel.send(`Welcome to our Server, ${member}`);

})

// Create Player Instance of the Bot

client.player = new Player(client, {
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
})
client.player.extractors.loadDefault();

const twitch = new TwitchApi({
    clientId: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
});

// Disabled Prefix Commands

/* bot.on('message', message=>{
 

    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'sayhi':
            message.delete(10000);
            message.reply('H0i!')
            .then(msg => {
                msg.delete(10000);
            })
        break;
        case 'tellajoke':
            message.delete(0);
            message.reply('no u')
            .then(msg => {
                msg.delete(10000);
            })
        break;
        case 'mirror':
            message.delete(0);
            message.reply(message.author.avatarURL)
            .then(msg => {
                msg.delete(10000);
            })
        break;
    } 
}) */
