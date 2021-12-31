const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = async (client, channel) => {
    if(channel.type == "dm") return;

    let db_logena = db.get(`${channel.guild.id}.config.log.enabled`);
    let db_logchannels = db.get(`${channel.guild.id}.config.log.channels`);

    if(db_logena) {
        if(db_logchannels) {
            if(!channel.guild.me.hasPermission("VIEW_AUDIT_LOG")) return;
            let cType = channel.type;
            switch (cType) {
                case "text": cType = "Textuel"; break;
                case "voice": cType = "Vocal"; break;
                case "category": cType = "Catégorie"; break;
                case "news": cType = "Annonce"; break;
                case "store": cType = "Magasin"; break;
            }

            const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
                limit: 1,
                type: 'CHANNEL_DELETE'
            })

            const latestChannelDeleted = fetchGuildAuditLogs.entries.first();
            const { executor } = latestChannelDeleted;

            if(channel.guild.channels.cache.get(db_logchannels)) {
                channel.guild.channels.cache.get(db_logchannels).send({
                    embed: {
                        color: 'RED',
                        author: { name: `🗑️ | ${executor.username} a supprimé un salon`, icon_url: executor.displayAvatarURL({ dynamic: true }) },
                        fields: [
                            { name: 'Nom', value: channel.name, inline: true },
                            { name: 'Type', value: cType, inline: true },
                        ],
                        footer: { text: 'ID ' + channel.id },
                        timestamp: new Date()
                    }
                });
            }
        }
    }
}