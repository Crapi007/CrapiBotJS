require('dotenv').config();
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    data: {

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
 
    run: ({ interaction, client, handler }) => {

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

    },
 
    options: {

        devOnly: false,
        deleted: false,

    },
};