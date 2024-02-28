/*
  File: index.js
  Autor: Craapi
  Date: 2024-01-23
*/
require('dotenv').config();

// Imports discord.js and gives the bot certain permissions
const cron = require('node-cron');
const { Client, IntentsBitField, ActivityType } = require('discord.js');
const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// Set Prefix for non Slash-Commands
const PREFIX = '!'

var version = '1.0.1'

var userdescprition = 'none'

var servers = {};

// Logs in Bot and sets activity
bot.login(process.env.TOKEN);
bot.on('ready', () =>{
    console.log('Online')
    try{
        bot.user.setActivity('Finding Mathegolem', { type: ActivityType.Watching});
    } catch(error) {
        console.log(`Error: ${error}`);
    }
});

global.servers = {};

// Bot reacts to a member joining and writes a message
bot.on('guildMemberAdd', member =>{
    
    const channel = member.guild.channels.find(channel.name === "crapi-bot");

    if(!channel) {

        return;

    }

    channel.send(`Welcome to our Server, ${member}`);

})

//Bot listens for Slash-Commands
bot.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    // Bot writes messahe about Dice Maiden
    if (interaction.commandName === 'dicemaiden') {

        interaction.reply('**Screw the Dice Maiden, all my Homies hate the Dice Maiden**');

    };

    // Bot rolls given amount of die with certain amount of sides
    if (interaction.commandName === 'roll') {

        let bonus;

        if (interaction.options.get('bonus') == null) {

            bonus = 0;

        } else {

            bonus = interaction.options.get('bonus').value;

        };

        const diceamount = interaction.options.get('dice-amount').value;
        const dicesides = interaction.options.get('dice-sides').value;

        let diceoutput = "";
        let total = 0;
        let temp = 0;

        for (let i = 1; i <= diceamount; i++) {

            if(i == diceamount) {

            temp = Math.floor(Math.random() * dicesides + 1);
            diceoutput += temp + ` + ` + bonus
            total = total + temp;
            total = total + bonus;

            } else {
            
            temp = Math.floor(Math.random() * dicesides + 1);
            total = total + temp;
            diceoutput += temp + ", ";

            };
        };

        //interaction.reply(20 + " | **Total:** " + 20);
        interaction.reply(diceoutput + " | **Total:** " + total);
    };

});
const orbReminder = cron.schedule("0 30 23 * * *", () => {

    const craapi = process.env.CRAAPI;

    const crapibotChannel = bot.channels.cache.get(process.env.CRAPIBOT_CHANNEL);
    crapibotChannel.send(`<@${craapi}> **Daily Orb Reminder**`);

});
orbReminder.start();

// Temporarily disabled Prefix Commands

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
