const { useQueue, QueryType } = require('discord-player');
require('dotenv').config();


module.exports = {
    data: {

        name: 'pause',
        description: 'Pause/Resume queue',

    },
 
    run: async ({ interaction, client, handler }) => {

        const queue = useQueue(interaction.guild.id);

        await interaction.deferReply();

        if (!queue) {
            await interaction.reply('There is no song playing');
            return;
        }

        queue.node.setPaused(!queue.node.isPaused()); //isPaused() returns true if that player is already paused
        return interaction.followUp('Bot pasued/resumed!');

    },
 
    options: {

        devOnly: true,
        deleted: false,

    },
};