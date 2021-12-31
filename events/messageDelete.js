const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = async (client, message) => {
    
    let db_logena = db.get(`${message.guild.id}.config.log.enabled`);
    let db_logchannels = db.get(`${message.guild.id}.config.log.channels`);

    if(db_logchannels) {
        if(db_logchannels) {

            const fetchGuildAuditLogs = await message.guild.fetchAuditLogs({
                limit: 1,
                type: 'MESSAGE_DELETE'
            })

            const latestChannelCreated = fetchGuildAuditLogs.entries.first();
            const { executor } = latestChannelCreated
        
            const embed = new MessageEmbed()
                .setColor('RED')
                .setAuthor(`🗑️ | Un message a été supprimer`, message.author.displayAvatarURL({ dynamic: true }))
                .addFields({
                    name: 'Message',
                    value: message,
                  },{
                    name: 'Author du message',
                    value: message.author.username,
                  },{
                    name: 'Moderateur:',
                    value: executor.username,
                  })
                .setFooter('Author ID: ' + message.author.id + ' | Message ID: ' + message.id)
                .setTimestamp();
                message.guild.channels.cache.get(db_logchannels).send(embed);
        }
    }
}


