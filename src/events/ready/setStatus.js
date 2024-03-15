const { ActivityType } = require('discord.js');

module.exports = (c, client, handler) => {

    try{
        client.user.setActivity('Wonky Monkey', { type: ActivityType.Listening});
    } catch(error) {
        console.log(`setStatus Error: ${error}`);
    }

};