const { useQueue, QueryType } = require('discord-player');
require('dotenv').config();
const { ApplicationCommandOptionType } = require('discord.js');


module.exports = {
    data: {

        name: 'skip',
        description: 'Skip to the current song',

    },
 
    run: async ({ interaction, client, handler }) => {

        const queue = useQueue(interaction.guild.id);

        await interaction.deferReply();

        if (!queue) {
            await interaction.reply('There is no song playing');
            return;
        }

        queue.node.skip()
        await interaction.followUp('Song skipped!');

    },
 
    options: {

        devOnly: true,
        deleted: false,

    },
};