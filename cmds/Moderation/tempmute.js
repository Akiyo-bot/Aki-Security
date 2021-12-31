const parseDuration = require('parse-duration');
const humanizeDuration = require('humanize-duration');
const Discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        if(!message.member.hasPermission("KICK_MEMBERS")) {
            var error_permissions = new Discord.MessageEmbed()
            .setDescription("<:false:881803557274255381> Vous ne disposez pas les permissions nécessaires pour mute un utilisateur.")
                .setColor("#F43436")
            return message.channel.send(error_permissions)
        }
        
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à mute.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez mute le propriétaire du serveur.')
       if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas mute ce membre.')
        if (!member.manageable) return message.channel.send('Le bot ne peut pas mute ce membre.')
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send('Veuillez indiquer une durée valide. **(En mini secondes)**')
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie.'
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Mute')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Mute',
                    permissions: 0
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }))
        }
        await member.roles.add(muteRole)
        message.channel.send(`${member} a été mute pendant ${humanizeDuration(duration, {language: 'fr'})} !`)
        member.send(`Vous avez été mute pendant ${humanizeDuration(duration, {language: 'fr'})}`)
        setTimeout(() => {
            if (member.deleted || !member.manageable) return
            member.roles.remove(muteRole)
            message.channel.send(`${member} a été unmute.`)
        }, duration)
    },
    name: 'tempmute',
    guildOnly: true
}