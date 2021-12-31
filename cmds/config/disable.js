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
let db_roleauto = db.get(`${message.guild.id}.config.autorole`)
let db_auto = db.get(`${message.guild.id}.config.autorole.enabled`);
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
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        var error_permissions = new Discord.MessageEmbed()
        .setDescription("<:false:881803557274255381> Vous ne disposez pas les permissions nécessaires pour configur systéme dans ce channel.")
            .setColor("#F43436")
        return message.channel.send(error_permissions)
    }


    switch (plugin?.toLowerCase()) {
        case "protection": {
            message.channel.send('ℹ️ Le plugin protection n\'est pas activable. Vous pouvez activer le raidmode, l\'antigiverole, l\'antilien ou l\'antiban séparément via leur commande respective (ex: `' + data.prefix + 'raidmode`)');
            break;
        }
        case "welcome": {
            if(db_welcomes) {
                db_welcomes = false;

                db.delete(`${message.guild.id}.config.welcome.enabled`,)

                message.channel.send('✅ Le plugin `welcome` a bien été **désactivé**.')
            } else {
                message.channel.send('⚠️ Le plugin `welcome` est déjà désactivé.');
            }

            break;
        }
        case "goodbye": {
            if(db_goodbyes) {
                db.delete(`${message.guild.id}.config.goodbye.enabled`,)

                message.channel.send('✅ Le plugin `goodbye` a bien été **désactivé**.');
            } else {
                message.channel.send('⚠️ Le plugin `goodbye` est déjà désactivé.');
            }

            break;
        }
        case "logs": {
            if(db_logs) {
                
                db.delete(`${message.guild.id}.config.logs.enabled`,)

                message.channel.send('✅ Le plugin `logs` a bien été **désactivé**.');
            } else {
                message.channel.send('⚠️ Le plugin `logs` est déjà désactivé.');
            }

            break;
        }
        case "antilink": {
            if(db_auto) {
                db_auto = false;

                db.set(`${message.guild.id}.config.antilink.enabled`, false)

                message.channel.send(`✅ Le plugin \`antilink\` a bien été **désactivé**.`);
            } else {
                message.channel.send('⚠️ Le plugin `antilink` est déjà désactivé.');
            }
        }
        case "autorole": {
            if(db_auto) {
                db_auto = false;

                db.set(`${message.guild.id}.config.autorole.enabled`, false)

                message.channel.send(`✅ Le plugin \`autorole\` a bien été **désactivé**.`);
            } else {
                message.channel.send('⚠️ Le plugin `autorole` est déjà désactivé.');
            }
        }
            break;
        default: {
            message.channel.send('⚠️ Ce plugin n\'existe pas. Voici la liste des plugins: `welcome`, `goodbye`, `logs`, `autorole`. \nVous ne trouvez pas ce que vous voulez ? Faites `' + prefix + 'config` pour voir les autres configurations. Le module de protection s\'active séparement via les commandes `raidmode`, `antigiverole`, `antiban`, `antilink`.');
        }
    }
}

module.exports.help = {
    name: "disable",
    aliases: ["disable", "disable-plugin", "disableplugins", "disable-plugins", "disableplugin"],
    category: 'Config',
    description: "Désactiver certains plugins",
    usage: "<plugin>",
    cooldown: 5,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: [],
    args: false
}