const Discord = require('discord.js');

const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

exports.run = (client, message, args) => {
    const { version } = require("discord.js");
    let cpuStat = require("cpu-stat");
    let os = require('os');
    let cpuLol;
    cpuStat.usagePercent(function (err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
    })

    let onlines = message.guild.members.cache.filter(({
        presence
    }) => presence.status !== 'offline').size;
    let totalmembers = message.guild.members.cache.size;
        let totalservers = "1";
        let totalbots = message.guild.members.cache.filter(member => member.user.bot).size;
        
        var infobot = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField("<:nodejs:881807099108139059> • __Versions__", "NodeJS : " + "`v11.11.0`" + "\n" + "DiscordJS : " + "`" + `v${version}` + "`" + "", true)
        .addField("<:DiscordStaff:881807096461533204> • __Statistiques__", "`Serveurs : " + client.guilds.cache.size + "`" + "\n `Utilisateurs : " + client.users.cache.size + "`", true)
        .addField("<:Discord_Bot_Dev:881803555273588836>  • __Développeur__", "</𝑨𝒌𝒊𝙮𝒐>ٴ#5330\nDeveloCraft#8208", true)
        .addField("<:server:881807096843218955> • __Système__", "Plateforme : " + "`" + `${os.platform()}` + "` \n Arch : " + "`" + `${os.arch()}` + "` \n CPU : " + "`" + `${os.cpus().map(i => `${i.model}`)[0]}` + "`")
        .addField("<:smartphonecpu:881807097237479455> • __Mémoire Vive__", "RAM: " + "`" + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + "MB` | Latence avec l'API :" + "`" + `${Math.round(client.ws.ping)}` + " ms`")
        .addField("<:online:881807160646987787> • __En ligne depuis__", (Math.round(client.uptime / (1000 * 60 * 60))) + ' heures  ' + (Math.round(client.uptime / (1000 * 60)) % 60) + ' minutes ' + (Math.round(client.uptime / 1000) % 60) + ' secondes ', true)
        .addField("<:Partener:881805313815240741>  • __Liens__", "[Inviter le bot](https://discord.com/oauth2/authorize?client_id=%20771427393957003284&scope=bot&permissions=2146958847)", true)
        .addFields({
            name: 'Nombre de membres total dans le serveur :',
            value: totalmembers,
            inline: true
        }, {
            name: 'Membres connéctés dans le serveur : ',
            value: onlines,
            inline: true
        }, {
            name: 'Nombre de serveurs auquel le bot appartient : ',
            value: totalservers,
            inline: true
        }, {
            name: 'Nombres de bots sur le serveur : ',
            value: totalbots,
            inline: true
        }, )
        .setColor("#2A2A32")
        .setTimestamp()
        .setFooter("BlackMagpie's", client.user.displayAvatarURL)
        message.channel.send(infobot)
}

module.exports.help = {
    name: "bvn",
    category: "info",
    description: "Commande permtant d'achiffer toute les commande de BlackMagpie's !\nUtilisation : ```$help```",
    cooldown: 3,
    usage: '<commande_name>',
    isUerAdmin: false,
    permission: false,
    args: false
}