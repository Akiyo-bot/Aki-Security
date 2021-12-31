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
//autorole

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
            message.channel.send('ℹ️ Le plugin protection n\'est pas activable. Vous pouvez activer le raidmode, l\'antigiverole, l\'antilien ou l\'antiban séparément via leur commande respective (ex: `' + prefix + 'raidmode`)');
            break;
        }
        case "welcome": {
            if(!db_welcomes) {
                db.set(`${message.guild.id}.config.welcome.enabled`, true)

                message.channel.send(`✅ Le plugin \`welcome\` a bien été **activé**.\nFaites \`${prefix}welcome message\` pour configurer le message de bienvenue, \`${prefix}welcome channel\` pour configurer le salon de bienvenue et \`${prefix}welcome test\` pour tester !`);
            } else {
                message.channel.send('⚠️ Le plugin `welcome` est déjà activé.');
            }

            break;
        };
        case "goodbye": {
            if(!db_goodbyes) {
                db.set(`${message.guild.id}.config.goodbye.enabled`, true)

                message.channel.send(`✅ Le plugin \`goodbye\` a bien été **activé**.\nFaites \`${prefix}goodbye message\` pour configurer le message d'aurevoir, \`${prefix}goodbye channel\` pour configurer le salon d'aurevoir et \`${prefix}goodbye test\` pour tester !`);
            } else {
                message.channel.send('⚠️ Le plugin `goodbye` est déjà activé.')
            }

            break;
        };
        case "logs": {
            if(!db_logs) {
                db.set(`${message.guild.id}.config.logs.enabled`, true)

                message.channel.send(`✅ Le plugin \`logs\` a bien été **désactivé**.\nFaites \`${prefix}logschannel <channel>\` pour configurer le salon des logs`);
            } else {
                message.channel.send('⚠️ Le plugin `logs` est déjà activé.')
            }

            break;
        };
        case "antilink": {
            if(!db_goodbyes) {
                db.set(`${message.guild.id}.config.antilink.enabled`, true)

                message.channel.send(`✅ Le plugin \`antilink\` a bien été **activé**. Tout lien sera supprimer !`);
            } else {
                message.channel.send('⚠️ Le plugin `antilink` est déjà activé.')
            }

            break;
        }
        case "autorole": {
            if(!db_auto) {
                db_auto = true;

                db.set(`${message.guild.id}.config.autorole.enabled`, true)

                message.channel.send(`✅ Le plugin \`autorole\` a bien été **activé**.\nFaites \`${prefix}autorole <role>\` pour définir un rôle à donner aux nouveaux arrivants !`);
            } else {
                message.channel.send('⚠️ Le plugin `autorole` est déjà activé.');
            }
        }

            break;
        
        default: {
            message.channel.send('⚠️ Ce plugin n\'existe pas. Voici la liste des plugins: `welcome`, `goodbye`, `logs`, `autorole`. \nVous ne trouvez pas ce que vous voulez ? Faites `' + prefix + 'config` pour voir les autres configurations. Le module de protection s\'active séparement via les commandes `raidmode`, `antigiverole`, `antiban`, `antilink`.');
        }
    }
}

module.exports.help = {
    name: "enable",
    //aliases: ["enable", "enable-plugin", "enableplugins", "enable-plugins", "enableplugin"],
    category: 'Config',
    description: "Activer certains plugins",
    usage: "<plugin>",
    cooldown: 5,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: [],
    args: false
}