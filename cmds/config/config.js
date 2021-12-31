const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, message, args) => {

    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        var error_permissions = new Discord.RichEmbed()
            .setDescription("<:false:551460099600678944> Vous ne disposez pas les permissions nécessaires pour configur un message de bienvenue.")
            .setColor("#F43436")
        message.channel.send(error_permissions)
    }

    let plugin = args[0];
    
let prefix = db.get(`${message.guild.id}.config.prefix`);
    //welcome
    let db_welcomes = db.get(`${message.guild.id}.config.welcome.enabled`);
    let db_welcomeschannels = db.get(`${message.guild.id}.config.welcome.channels`);
    let db_welcomesmessages = db.get(`${message.guild.id}.config.welcome.message`);
    let db_welcomesimage = db.get(`${message.guild.id}.config.welcome.image`);

    //goodbye
    let db_goodbyes = db.get(`${message.guild.id}.config.goodbye.enabled`);
    let db_goodbyeschannels = db.get(`${message.guild.id}.config.goodbye.channels`);
    let db_goodbyesmessages = db.get(`${message.guild.id}.config.goodbye.message`);
    let db_goodbyesimage = db.get(`${message.guild.id}.config.goodbye.image`);

    //logs
    let db_logs = db.get(`${message.guild.id}.config.logs.enabled`);
    let db_logschannels = db.get(`${message.guild.id}.config.logs.channels`);

       
	let Embed = new Discord.MessageEmbed()
            .setColor("#0000FF")
            .setAuthor({ icon_url: message.guild.iconURL({ dynamic: true }), name: message.guild.name })
            .setDescription(`**Configuration actuelle du serveur ${message.guild.name}** \nSi vous souhaitez activer des plugins, faites \`${prefix}enable <plugin>\`. Pour en désactiver faites \`${prefix}disable <plugin>\`. Pour plus d'informations, faites \`${prefix}help\`\n\u200b`)
            .addFields(
                {
                    name: `${db_welcomes ? "<:true:881803555667849246>" : "<:false:881803557274255381>"}  👋 Message de bienvenue`,
                    value: `\`\`\`\nMessage: ${db_welcomesmessages} \nSalon: ${db_welcomeschannels ? checkDeleted('welcome') : 'MP'}\`\`\``,
                    inline: true
                },
                {
                    name: `${db_goodbyes ? "<:true:881803555667849246>" : "<:false:881803557274255381>"}  💔 Message d\'aurevoir`,
                    value: `\`\`\`\nMessage: ${db_goodbyesmessages} \nSalon: ${db_goodbyeschannels ? checkDeleted('goodbye') : 'MP'}\`\`\``,
                    inline: false
                },
                {
                    name: `${db_logs ? "<:true:881803555667849246>" : "<:false:881803557274255381>"}  ⚒️ Modération`,
                    value: `\`\`\`\nSalon de logs: ${db_logschannels ? checkDeleted('logs') : 'Aucun'}\`\`\``,
                    inline: true
                })
                message.channel.send(Sembed)
}

module.exports.help = {
    name: "config",
    aliases: ["config"],
    category: 'Config',
    description: "Vérifier les paramètres de configuration du serveur",
    usage: "",
    cooldown: 5,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: ["EMBED_LINKS"],
    args: false
}