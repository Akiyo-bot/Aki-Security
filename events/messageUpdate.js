const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = async (client, message, oldMessage, newMessage) => {
    
    let db_logena = db.get(`${message.guild.id}.config.log.enabled`);
    let db_logchannels = db.get(`${message.guild.id}.config.log.channels`);

    let antilink = db.get(`${message.guild.id}.config.protection.antilink`);
    let ingnochannel = db.get(`${message.guild.id}.config.protection.ignored_channels`);
    let ingnorole = db.get(`${message.guild.id}.config.protection.ignored_roles`);

    if(oldMessage.content == newMessage.content) return;

    if(antilink) {
        if(!ingnochannel?.includes(newMessage.channel.id)) {
            if(!newMessage.member.roles.cache.array().some((role, i) => role.id === (ingnorole ? ingnorole[i] : null))) {
                if(/discord(?:(?:app)?\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/i.test(newMessage.content)) {
                    if(!newMessage.guild.member(newMessage.author).hasPermission("MANAGE_MESSAGES")) {
                        return newMessage.delete().then(() => {
                            if(db_logena && db_logchannels) {
                                let embed = {
                                    color: 'RED',
                                    author: {
                                        name: newMessage.author.username,
                                        icon_url: newMessage.author.displayAvatarURL({ dynamic: true })
                                    },
                                    description: `${newMessage.author} a envoyé une pub dans ${newMessage.channel}!`,
                                    fields: [
                                        {
                                            name: "Message d'origine",
                                            value: newMessage.content
                                        }
                                    ],
                                    footer: {
                                        text: client.config.embed.footer,
                                        icon_url: client.user.displayAvatarURL()
                                    }
                                }

                                if(embed.fields[0].value.length > 1000) {
                                    embed.fields[0].value = newMessage.content.slice(0, 1000) + "...";
                                }

                                return newMessage.guild.channels.cache.get(db_logchannels).send({ embed: embed });
                            } else if(!db_logena && !db_logchannels) {

                                let embed = {
                                    color: 'RED',
                                    author: {
                                        name: newMessage.author.username,
                                        icon_url: newMessage.author.displayAvatarURL({ dynamic: true })
                                    },
                                    description: `${newMessage.author} a envoyé une pub dans ${newMessage.channel}!`,
                                    fields: [
                                        {
                                            name: "Message d'origine",
                                            value: newMessage.content
                                        }
                                    ],
                                    footer: {
                                        text: 'Author ID: ' + newMessage.author.id + ' | Message ID: ' + newMessage.id,
                                        icon_url: client.user.displayAvatarURL()
                                    }
                                }

                                return newMessage.channel.send({ embed: embed });
                            }
                        });
                    }
                }
            }
        }
    }


    if(db_logchannels) {

        if(db_logchannels) {

            const embed = new MessageEmbed()
                .setColor('ORANGE')
                .setAuthor(`⌨️ | Le Message envoyé par`, message.author.displayAvatarURL({ dynamic: true }))
                .addFields({
                    name: 'Ancien message',
                    value: oldMessage.content,
                  },{
                    name: 'Nouveau message',
                    value: newMessage.content,
                  })
                .setFooter('Author ID: ' + message.author.id + ' | Message ID: ' + message.id)
                .setTimestamp();
                message.guild.channels.cache.get(db_logchannels).send(embed);
        }
    }
}


