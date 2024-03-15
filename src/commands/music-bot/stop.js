const { useQueue, QueryType } = require('discord-player');
require('dotenv').config();
const { ApplicationCommandOptionType } = require('discord.js');


module.exports = {
    data: {

        name: 'stop',
        description: 'Stop the current queue',

    },
 
    run: async ({ interaction, client, handler }) => {

        const queue = useQueue(interaction.guild.id);

        await interaction.deferReply();

        if (!queue) {
            await interaction.reply('There is no song playing');
            return;
        }

        queue.delete();
        return interaction.followUp('Queue removed!');

    },
 
    options: {

        devOnly: true,
        deleted: false,

    },
};