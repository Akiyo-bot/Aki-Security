const { Permissions, Discord } = require('discord.js');
const db = require('quick.db');
const ms = require('ms');
let _cooldowns = {};
let _users = new Map();


//const prefix = "$";

module.exports = async(client, message, user, members) => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefix = db.get(`${message.guild.id}.config.prefix`);
    let lvl = db.get(`${message.author.id}.lvl`);
    let number = db.get(`${message.author.id}.number`);
    let raidmod = db.get(`${message.guild.id}.config.raidmod`);
    
    let blacklist = db.get(`${message.author.id}.blacklist`);

    
    let db_logs = db.get(`${message.guild.id}.config.log.enabled`);
    let db_logschannels = db.get(`${message.guild.id}.config.log.channels`);

    let muterole = message.member.roles.cache.find(r => r.name === "mute")

    if(prefix === null) db.set(`${message.guild.id}.config.prefix`, '$')
    

    if(lvl === null && number === null) {
        db.add(`${message.author.id}.lvl`, 0);
        db.add(`${message.author.id}.number`, 0);
    }

    if(message.guild.me.permissionsIn(message.channel).has('SEND_MESSAGES')) {
        if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
            message.channel.send(`Hey ${message.author} ! Mon préfixe est \`${prefix}\` dans ce serveur, fais \`${prefix}help\` pour avoir de l'aide !`);
        }
    }

    if(message.content.includes(client.token)) {
        return message.delete().then(() => client.users.cache.get(client.config.owner.id).send("Tu devrais regen ton token. C'est juste un conseil."));
    }

    let afk = db.get(`${message.author.id}.afk_config`)
    let afk_reason = db.get(`${message.author.id}.afk_reason`)
    
    ///////////////////                                     AFK                                         ////////////////
    if(message.mentions.members.size > 0 && !message.content.startsWith(prefix) && !(message.mentions.members.first()?.id === message.author.id)) {
       
        message.mentions.members.forEach(async (member) => {
            
        let afkmember = db.get(`${member.user.id}.afk_config`)
        let afk_reasonmember = db.get(`${member.user.id}.afk_reason`)
            if(afkmember == true) message.channel.send(`Hey ${message.author}, ${member.user.tag} est actuellement afk : **${afk_reasonmember}**`);
        });
    }

    if(afk) {
        
        db.delete(`${message.author.id}.afk_config`)
        db.delete(`${message.author.id}.afk_reason`)

        message.channel.send(`${message.author} n'est désormais plus afk.`);
    }


///////////////////                                     antispam                                         ////////////////

    let antispam = db.get(`${message.guild.id}.config.protection.antispam`);

    if(antispam === true) {
                if(!message.member.hasPermission("MANAGE_MESSAGES")) {
                    if(_users.has(message.author.id)) {
                        const user = _users.get(message.author.id);

                        if(!(((message.createdTimestamp - user.lastMessage.createdTimestamp) < 3000) && user.messages.length > 5)) {
                            user.messages.push(message);
                            user.lastMessage = message;

                            let warnings = db.get(`${message.guild.id}."${user.id}".warnings`);
                            if(user.messages.length === 4) {
                                db.add(`${message.guild.id}."${user.id}".warnings`, 1)
                                message.author.send(`Vous avez été warn pour **Spam** sur ${message.guild.name}. Si vous continuez, vous sera automatiquement rendu muet.\n Vous avez également été averti pour **Spam**, vous avez ${warnings + 1} warn dans ce serveur`);

                                if(db_logs) {
                                    if(message.guild.channels.cache.get(db_logschannels)) {
                                        const embed = new Discord.MessageEmbed()
                                            .setColor('ORANGE')
                                            .setDescription(`L'utilisateur **${message.author.username}** s'est fait avertir pour **Spam**. Il possède désormais ${dbUser.warns.length} warn(s).`)
                                            .setFooter(client.config.embed.footer, client.user.displayAvatarURL());
                                        message.guild.channels.cache.get(db_logschannels).send(embed);
                                    }
                                }
                            } else if(user.messages.length >= 6) {
                                db.add(`${message.guild.id}."${user.id}".warnings`, 1)


                                message.author.send(`Vous avez été rendu muet pendant **1h** pour **Spam** sur ${message.guild.name}.\nVous avez également été averti pour **Spam**, vous avez ${warnings + 1} warn dans ce serveur`).catch(() => {});

                                if(muterole != null) {
                                    await message.member.roles.add(muterole);
                                } else {
                                    await message.guild.roles.create({
                                        data: {
                                            name: "Muted",
                                            color: "#000000",
                                            permissions: [],
                                            position: message.guild.member(client.user).roles.highest.position,
                                            mentionnable: false
                                        }
                                    }).then(async (muterole) => {
                                        db.set(`${message.guild.id}.config.muterole`, muterole.id)
                                        await client.updateGuild(message.guild, { muterole: muterole.id });

                                        message.guild.channels.cache.forEach(channel => {
                                            if(!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS")) return;
                                            channel.updateOverwrite(role, {
                                                SEND_MESSAGES: false,
                                                ADD_REACTIONS: false,
                                                CONNECT: false,
                                            });
                                        });
                            
                                        await member.roles.add(role).then(() => {
                                            message.channel.send(`✅${user} s'est fait mute par ${message.author} pour la raison suivante: **${reason}**`);
                                        }).catch(() => {});
                                    }).catch(() => {});
                                }

                                if(db_logs) {
                                    if(message.guild.channels.cache.get(db_logschannels)) {
                                        const embed = new Discord.MessageEmbed()
                                            .setColor('ORANGE')
                                            .setDescription(`L'utilisateur **${message.author.username}** s'est fait mute 1h pour **Spam**.`)
                                            .setFooter(client.config.embed.footer, client.user.displayAvatarURL());
                                        message.guild.channels.cache.get(db_logschannels).send(embed);
                                    }
                                }
                            }

                            setTimeout(() => user.messages.pop(), 10000);
                        }
                    } else {
                        _users.set(message.author.id, {
                            messages: [],
                            lastMessage: message
                        });
                    }       
                }
    }


    ///////////////////                                     antilink                                         ////////////////
    let antilink = db.get(`${message.guild.id}.config.protection.antilink`);
    let ingnochannel = db.get(`${message.guild.id}.config.protection.ignored_channels`);
    let ingnorole = db.get(`${message.guild.id}.config.protection.ignored_roles`);

    if(antilink = true) {
        if(!ingnochannel == message.channel.id) {
            if(!message.member.roles.cache.array().some((role, i) => role.id === (ingnorole ? ingnorole[i] : null))) {
                if(/discord(?:(?:app)?\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/i.test(message.content)) {
                    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) {
                        return message.delete().then(() => {
                            if(db_logs && db_logschannels) {
                                const embed = {
                                    color: 'RED',
                                    author: {
                                        name: message.author.username,
                                        icon_url: message.author.displayAvatarURL({ dynamic: true })
                                    },
                                    description: `${message.author} a envoyé une pub dans ${message.channel}!`,
                                    fields: [
                                        {
                                            name: "Message d'origine",
                                            value: message.content
                                        }
                                    ],
                                    footer: {
                                        icon_url: client.user.displayAvatarURL()
                                    }
                                }
                                if(embed.fields[0].value.length > 1000) {
                                    embed.fields[0].value = message.content.slice(0, 1000) + "...";
                                }
                                message.guild.channels.cache.get(db_logschannels).send({ embed });
        
                            }
                        });
                    }
                }
            }
        }
    }


    if(!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commande = args.shift();

    const cmd = client.commands.get(commande) //|| client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commande));

    if(!cmd) return;




    cmd.run(client, message, args);
}