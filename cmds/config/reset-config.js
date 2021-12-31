const { MessageCollector, MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports.run = async (client, message) => {

    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        var error_permissions = new Discord.RichEmbed()
            .setDescription("<:false:551460099600678944> Vous ne disposez pas les permissions nécessaires pour configur un message de bienvenue.")
            .setColor("#F43436")
        message.channel.send(error_permissions)
    }
    
    let prefix = db.get(`${message.guild.id}.config.prefix`);

    let antisban = db.get(`${message.guild.id}.config.protection.antisban`);
    let antispam = db.get(`${message.guild.id}.config.protection.antispam`);
    let raidmod = db.get(`${message.guild.id}.config.raidmod`);
    
    let db_welcomes = db.get(`${message.guild.id}.config.welcome.enabled`);
    let db_welcomeschannels = db.get(`${message.guild.id}.config.welcome.channels`);
    let db_welcomesmessages = db.get(`${message.guild.id}.config.welcome.message`);
    let db_welcomesimage = db.get(`${message.guild.id}.config.welcome.image`);

    let db_goodbyes = db.get(`${message.guild.id}.config.goodbye.enabled`);
    let db_goodbyeschannels = db.get(`${message.guild.id}.config.goodbye.channels`);
    let db_goodbyesmessages = db.get(`${message.guild.id}.config.goodbye.message`);
    let db_goodbyesimage = db.get(`${message.guild.id}.config.goodbye.image`);

    let db_log = db.get(`${message.guild.id}.config.log.enabled`);
    let db_logchannels = db.get(`${message.guild.id}.config.log.channels`);

    let roleauto = db.get(`${message.guild.id}.config.autorole.role`)
    let auto = db.get(`${message.guild.id}.config.autorole.enabled`);
    
    let ingnorole = db.get(`${message.guild.id}.config.protection.ignored_roles`);
    let ingnochannels = db.get(`${message.guild.id}.config.protection.ignored_channels`);

    let muterole = db.get(`${message.guild.id}.config.muterole`);
 


    message.channel.send('Voulez-vous vraiment remettre à 0 la configuration du serveur ? Cette action est irréversible. \nRépondez par oui ou par non.');

    const filter = m => m.author.id === message.author.id

    const c = new MessageCollector(message.channel, filter, {
        time: 30000,
        max: 1
    })

    c.on("collect", async msg => {
        if(msg.content.toLowerCase() === "oui") {
            c.stop(true);

            let Sembed = new MessageEmbed()
            .setDescription("<a:chargement:886132505684627476> chargement de votres profils")
            const msg = await message.channel.send(Sembed)
            
            db.set(`${message.guild.id}.config.prefix`, '$')
            
            db.set(`${message.guild.id}.config.protection.antisban`, false)
            db.set(`${message.guild.id}.config.protection.antispam`, false)
            db.set(`${message.guild.id}.config.protection.antilink`, false);    
            db.set(`${message.guild.id}.config.raidmod`, false)
            
            db.set(`${message.guild.id}.config.welcome.enabled`, false)
            db.set(`${message.guild.id}.config.welcome.channels`, false)
            db.set(`${message.guild.id}.config.config.welcome.message`, false)
            db.set(`${message.guild.id}.config.welcome.image`, false)

            db.set(`${message.guild.id}.config.goodbye.enabled`, false)
            db.set(`${message.guild.id}.config.goodbye.channels`, false)
            db.set(`${message.guild.id}.config.goodbye.message`, false)
            db.set(`${message.guild.id}.config.goodbye.image`, false)

            db.set(`${message.guild.id}.config.log.enabled`, false)
            db.set(`${message.guild.id}.config.log.channels`, false)

            db.set(`${message.guild.id}.config.autorole.role`, false)
            db.set(`${message.guild.id}.config.autorole.enabled`, false)

            db.set(`${message.guild.id}.config.protection.ignored_roles`, false)
            db.set(`${message.guild.id}.config.protection.ignored_channels`, false)

            db.set(`${message.guild.id}.config.muterole`, false)
        
            let valide = new MessageEmbed()
            .setDescription("<:true:881803555667849246>  La configuration a bien été reset.")
            msg.edit(valide);
        } else {
            c.stop(true);
            message.channel.send('Commande annulée');
        }
    });

    c.on("end", (_collected, reason) => {
        if(reason === "time") return message.channel.send('Temps écoulé');
    });
}

module.exports.help = {
    name: "reset-config",
    aliases: ["reset-config", "resetconfig"],
    category: 'Config',
    description: "Remettre la configuration du serveur à 0",
    usage: "",
    cooldown: 5,
    memberPerms: ["ADMINISTRATOR"],
    botPerms: ["EMBED_LINKS"],
    args: false
}