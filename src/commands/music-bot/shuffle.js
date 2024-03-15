const { useQueue, QueryType } = require('discord-player');
require('dotenv').config();


module.exports = {
    data: {

        name: 'shuffle',
        description: 'Shuffle all songs',

    },
 
    run: async ({ interaction, client, handler }) => {

        const queue = useQueue(interaction.guild.id);

        await interaction.deferReply();

        if (!queue) {
            await interaction.reply('There is no song playing');
            return;
        }

        queue.tracks.shuffle();
        return interaction.followUp('Queue shuffled!');

    },
 
    options: {

        devOnly: true,
        deleted: false,

    },
};