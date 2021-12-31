const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async (client, message, args) => {

    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        var error_permissions = new Discord.RichEmbed()
            .setDescription("<:false:551460099600678944> Vous ne disposez pas les permissions nécessaires pour configur un message de bienvenue.")
            .setColor("#F43436")
        message.channel.send(error_permissions)
    }

    let ingnorole = db.get(`${message.guild.id}.config.protection.ignored_channels`);
    
    let prefix = db.get(`${message.guild.id}.config.prefix`);

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);

    if(args[0] === "add") {
        if(!channel) return message.channel.send(`⚠️ Merci de spécifier un salon à ignorer, essayez en donnant une ID ou en mentionnant le salon`);

        if(ingnochannel = channel) {
            return message.channel.send('⚠️ Ce salon est déjà ignoré par le système de protection')
        }

        if(!ingnochannel) {
            ingnochannel = [channel.id];
        } else {
            db.set(`${message.guild.id}.config.protection.ignored_channels`, channel.id)
        }

        message.channel.send(`✅ Le salon ${channel} sera désormais ignoré par le système de protection.`);
    } else if(args[0] === "remove") {
        if(!channel) return message.channel.send(`⚠️ Merci de spécifier un salon à ignorer, essayez en donnant une ID ou en mentionnant le salon`);

        if(!ingnochannel?.includes(channel.id)) return message.channel.send('⚠️ Ce salon n\'est pas ignoré par le système de protection.');

        ingnochannel = ingnochannel.filter(
                (c) => c !== channel.id
            );

        message.channel.send(`✅ Le salon ${channel} n'est désormais plus ignoré par l'antispam`);

    } else return message.channel.send(`⚠️ Vous n'utilisez pas la commande correctement.\nFaites \`${prefix}ignore-channel add <salon>\` pour rajouter un salon, et \`${prefix}ignore-channel remove <salon>\` pour en retirer un.`);
}

module.exports.help = {
    name: "ignore-channel",
    aliases: ["ignore-channel", "ignorechannel"],
    category: 'Protection',
    description: "Ignorer un salon par l'antispam",
    usage: "<add | remove> <channel>",
    cooldown: 5,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: ["MANAGE_GUILD"],
    args: true
}