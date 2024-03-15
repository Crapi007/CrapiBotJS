const cron = require('node-cron');

module.exports = (c, client, handler) => {

    const orbReminder = cron.schedule("0 30 23 * * *", () => {

        const targetuser1 = process.env.TARGETPLAYER1;
        const targetuser2 = process.env.TARGETPLAYER2;
    
        const crapibotChannel = client.channels.cache.get(process.env.CRAPIBOT_CHANNEL);
        crapibotChannel.send(`<@${targetuser1}> <@${targetuser2}> **Daily Orb Reminder**`);
    
    });
    orbReminder.start();

};