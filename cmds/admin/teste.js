const Discord = require('discord.js');
const db = require('quick.db');
var database = require('quick.db')

exports.run = (bot, message, args, func) => {

    
    if(message.mentions.users.first() || message.guild.members.cache.get(args[0])) {
        user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
   } else{
        user = message.author;
    }

    let lvl = db.get(`${user}.lvl`);
    let number = db.get(`${user}.number`);

    db.fetch(`${user}.lvl`).then(i => {
    db.fetch(`${user}.number`).then(o => {
        message.channel.send('nLevel: `' + (i.value + 1) + '`\n number: `' + o.value +'`');

    })
})

}