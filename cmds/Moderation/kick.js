const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "Kicks a member from the server",

    async run(client, message, args) {

        if(!message.member.hasPermission("MANAGE_CHANNELS")) {
            var error_permissions = new Discord.MessageEmbed()
            .setDescription("<:false:881803557274255381> Vous ne disposez pas les permissions nécessaires pour kick un membre.")
                .setColor("#F43436")
            return message.channel.send(error_permissions)
        }
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("Je n'ai pas les bonnes autorisations.")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send('Veuillez spécifier un utilisateur !');

        if (!member) return message.channel.send('Impossible de trouver cet utilisateur.');
        if (!member.kickable) return message.channel.send("Cet utilisateur ne peut pas être expulsé. C'est soit parce qu'ils sont un rôle supperieur a vous, soit que leur rôle le plus élevé est supérieur au mien");

        if (member.id === message.author.id) return message.channel.send('Bruh, tu ne peux pas te donner un kick !');

        let arg = message.content.split(" ").slice(1);
        let thingToEcho = arg.join(" ");

        if (thingToEcho === undefined) thingToEcho = 'Non specifier ';

        member.kick(thingToEcho)
            .catch(err => {
                if (err) return message.channel.send('Un problème est survenu')
            })

        const kickembed = new Discord.MessageEmbed()
            .setTitle('Membre Expulsé')
            .setFooter('Utilisateur expulsé', member)
            .setFooter('Expulsé par', message.author)
            .setFooter('Raison', thingToEcho)
            .setTimestamp()

        message.channel.send(kickembed);

        const kickmsgembed = new Discord.MessageEmbed()
        .setTitle('Vous étes désormais kick du serveur')
        .setFooter('Expulsé dans', message.guild.name)
        .setFooter('Expulsé par', message.author)
        .setFooter('Raison', thingToEcho)
        .setTimestamp()
        member.send(kickmsgembed).catch(console.error);
//client.user.displayAvatarURL()

    }
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