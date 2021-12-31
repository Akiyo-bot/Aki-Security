const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async (client, message, args, data) => {

    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        var error_permissions = new Discord.RichEmbed()
            .setDescription("<:false:551460099600678944> Vous ne disposez pas les permissions nécessaires pour configur un message de bienvenue.")
            .setColor("#F43436")
        message.channel.send(error_permissions)
    }

    

    let ingnorole = db.get(`${message.guild.id}.config.protection.ignored_roles`);
    
    let prefix = db.get(`${message.guild.id}.config.prefix`);

    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

    if(args[0] === "add") {
        if(!role) return message.channel.send(`⚠️ Merci de spécifier un rôle à ignorer, essayez en donnant une ID ou en mentionnant le rôle`);

        if(ingnorole = role) {
            return message.channel.send('⚠️ Ce rôle est déjà ignoré par le système de protection')
        }


        if(!ingnorole) {
            ingnorole = [role.id];
        } else {
            ingnorole.push(role.id);
        }

        message.channel.send(`✅ Le rôle @\u200b${role.name} sera désormais ignoré par le système de protection.`);
    } else if(args[0] === "remove") {
        if(!role) return message.channel.send(`⚠️ Merci de spécifier un rôle à ignorer, essayez en donnant une ID ou en mentionnant le rôle`);

        if(!ingnorole?.includes(role.id)) return message.channel.send('⚠️ Ce rôle n\'est pas ignoré par le système de protection.');

        ingnorole = ingnorole.filter((c) => c !== role.id);

        message.channel.send(`✅ Le rôle ${role} n'est désormais plus ignoré par l'antispam`);
    } else return message.channel.send(`⚠️ Vous n'utilisez pas la commande correctement.\nFaites \`${prefix}ignore-role add <role>\` pour rajouter un rôle, et \`${prefix}ignore-role remove <role>\` pour en retirer un.`);
}

module.exports.help = {
    name: "ignore-role",
    aliases: ["ignore-role", "ignorerole"],
    category: 'Protection',
    description: "Ignorer un rôle par l'antispam",
    usage: "<add | remove> <role>",
    cooldown: 5,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: ["MANAGE_GUILD"],
    args: true
}