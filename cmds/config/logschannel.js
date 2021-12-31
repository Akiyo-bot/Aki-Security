const { MessageCollector } = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, message, args) => {

    
    let prefix = db.get(`${message.guild.id}.config.prefix`);
    let db_logena = db.get(`${message.guild.id}.config.log.enabled`);

    let db_logchannels = db.get(`${message.guild.id}.config.log.channels`);
    

    if(!message.member.hasPermission("ADMINISTRATOR")) {
        var error_permissions = new Discord.RichEmbed()
            .setDescription("<:false:551460099600678944> Vous ne disposez pas les permissions nécessaires pour configur un message de bienvenue.")
            .setColor("#F43436")
        message.channel.send(error_permissions)
    }
    if(db_logena === null || undefined) return message.channel.send(`⚠️ Le plugin de logs n'est pas activé. Faites \`${prefix}enable logs\` pour l'activer!`);

    if(args.length) {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if(!channel || !message.guild.channels.resolve(channel)) return message.channel.send('⚠️ Ce salon n\'existe pas, vérifiez que j\'ai accès au salon.');
        if(channel.type != "text") return message.channel.send('⚠️ Merci de donner un salon textuel. Je ne peux envoyer les messages de logs que dans un salon textuel (exclu salon d\'annonce)');
        if(!message.guild.me.permissionsIn(channel).has('SEND_MESSAGES') || !message.guild.me.permissionsIn(channel).has('EMBED_LINKS')) return message.channel.send('⚠️ Je n\'ai pas les permissions de parler dans ce salon, mettez moi les permissions Envoyer des messages et Intégrer des liens dans le salon.');

        message.delete().catch(() => {});

        
        db.set(`${message.guild.id}.config.log.enabled`, true)

        db.set(`${message.guild.id}.config.log.channels`, channel.id)

        return message.channel.send('✅ Salon de logs configuré. Les logs s\'enverront désormais dans <#' + channel.id + '>. \nFaites `' + prefix + 'config` pour voir la configuration actuelle du bot sur le serveur!');
    } else {
        const filter = m => m.author.id === message.author.id;
        let MSG = await message.channel.send('Dans quel salon souhaitez-vous définir comme salon de logs ?');

        const c = new MessageCollector(message.channel, filter, {
            time: 60000,
            max: 5,
        });

        c.on("collect", async msg1 => {
            const channel = msg1.mentions.channels.first() || msg1.guild.channels.cache.get(msg1.content);
            if(!channel) return message.channel.send('⚠️ Ce salon n\'existe pas, vérifiez que j\'ai accès au salon.');

            if(channel.type != "text") return message.channel.send('⚠️ Merci de donner un salon textuel. Je ne peux envoyer les messages de logs que dans un salon textuel (exclu salon d\'annonce)');

            if(!message.guild.me.permissionsIn(channel).has('SEND_MESSAGES') || !message.guild.me.permissionsIn(channel).has('EMBED_LINKS')) return message.channel.send('⚠️ Je n\'ai pas les permissions de parler dans ce salon, mettez moi les permissions Envoyer des messages et Intégrer des liens dans le salon.');

            c.stop(true);

            MSG.delete().catch(() => {});
            msg1.delete().catch(() => {});

            db.set(`${message.guild.id}.config.log.enabled`, true)

            db.set(`${message.guild.id}.config.log.channels`, channel.id)
    

            message.channel.send('✅ Salon de logs configuré. Les logs s\'enverront désormais dans <#' + channel.id + '>. \nFaites `' + prefix + 'config` pour voir la configuration actuelle du bot sur le serveur!');
        });

        c.on("end", (collected, reason) => {
            if(collected.size >= 5) return message.channel.send('⚠️ Vous avez dépassés les 5 essais. Veuillez refaire la commande et réessayez');
            if(reason === "time") return message.channel.send('Temps écoulé')
        });
    }
}

module.exports.help = {
    name: "logschannel",
    aliases: ["logschannel", "logs-channel", "logchannel", "log-channel"],
    category: 'Config',
    description: "Modifier le salon de logs",
    usage: "<salon>",
    cooldown: 5,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: [],
    args: false
}