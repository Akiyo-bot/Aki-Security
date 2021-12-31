// tempban.js
const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')
 
module.exports = {
    run: async (ient, message, args) => {

        if(!message.member.hasPermission("BAN_MEMBERS")) {
            var error_permissions = new Discord.MessageEmbed()
            .setDescription("<:false:881803557274255381> Vous ne disposez pas les permissions nécessaires pour ban un utilisateur.")
                .setColor("#F43436")
            return message.channel.send(error_permissions)
        }

        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à bannir.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas bannir le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas Bannir ce membre.')
        if (!member.bannable) return message.channel.send('Le bot ne peut pas bannir ce membre.')
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send('Veuillez indiquer une durée valide.')
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
        await member.ban({reason})
        message.channel.send(`${member.user.tag} a été banni pendant ${humanizeDuration(duration, {language: 'fr'})} !`)
        setTimeout(() => {
            message.guild.members.unban(member)
            message.channel.send(`${member.user.tag} a été débanni.`)
        }, duration)
    },
    name: 'tempban',
    guildOnly: true
}
 