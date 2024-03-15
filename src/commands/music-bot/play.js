const { Player, useMainPlayer } = require('discord-player');
require('dotenv').config();
const { ApplicationCommandOptionType } = require('discord.js');


module.exports = {
    data: {

        name: 'play',
        description: 'Plays a song from Youtube',
        options: [
            {
                name: "url",
                type: ApplicationCommandOptionType.String,
                description: "The song you want to play",
                required: true,
            }
        ]
        
    },
 
    run: async ({ interaction, client, handler }) => {

        const player = bot.useMainPlayer();
        const channel = interaction.member.voice.channel;

        if (!interaction.member.voice.channel) {
            await interaction.reply('You must be in a voice channel');
            return;
        };

        const url = interaction.options.getString('url', true);

        await interaction.deferReply();

        // Create a queue with the MainPlayer and desired song
        try {
            const { track } = await player.play(channel, url, {
                nodeOptions: {
                    metadata: interaction
                }
            });

            // Get the ongoing queue and set its volume
            const queue = useQueue(interaction.guild.id);
            queue.node.setVolume(2);

            return interaction.followUp(`**${track.title}** enqeued!`);
        } catch (e) {
            // Catch error in the queue creation process
            return interaction.followUp(`Something went wrong: ${e}`);

        }

    },
 
    options: {

        devOnly: true,
        deleted: false,
        
    },
};