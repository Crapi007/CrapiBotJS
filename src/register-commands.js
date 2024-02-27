require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType} = require('discord.js');

// Manually create commands
const command = [
    {
        name: 'dicemaiden',
        description: 'Opinion about Dicemaiden',
    },
    {
        name: 'roll',
        description: 'Rolls unrigged numbers',
        options: [ 
            {
                name: 'dice-amount',
                description: 'Amount of dices being rolled',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'dice-sides',
                description: 'Amount of dice sides',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'bonus',
                description: 'Bonus Effects on the roll',
                type: ApplicationCommandOptionType.Number,
            },
        ]
    },
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

// Loads the commands on to the discord app
(async () => {
    try {

        console.log('Commands are being regisered...')

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.BOT_ID, 
                process.env.RP_SERVER
            ),
            { body: command }
        );

        console.log('Commands loaded!');
    } catch(error) {
        console.log(`Error: ${error}`)     
    }
})();