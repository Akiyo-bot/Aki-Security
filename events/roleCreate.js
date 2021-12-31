const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = async (client, role) => {

    
    let db_logena = db.get(`${role.guild.id}.config.log.enabled`);
    let db_logchannels = db.get(`${role.guild.id}.config.log.channels`);

    if(db_logena == true) {
        if(db_logchannels) {
            if(!role.guild.me.hasPermission("VIEW_AUDIT_LOG")) return;
            const fetchGuildAuditLogs = await role.guild.fetchAuditLogs({
                limit: 1,
                type: 'ROLE_CREATE'
            })
            let latestRoleDeleted = fetchGuildAuditLogs.entries.first()
            const { executor } = latestRoleDeleted;

            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`${executor.username} a créé un nouveau rôle`, executor.displayAvatarURL({ dynamic: true }))
                .addField('Nom', role.name, true)
                .addField('Couleur', role.hexColor, true)
                .addField('Mentionnable', role.mentionable ? "Oui" : "Non", true)
                .setFooter('ID: ' + role.id)
                .setTimestamp();
            role.guild.channels.cache.get(db_logchannels).send(embed);
        }
    }
}