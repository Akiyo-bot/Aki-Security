const { MessageCollector } = require('discord.js');
const Discord = require("discord.js");
const db = require('quick.db');
const moment = require("moment");

module.exports.run = async (client, message, args) => {

let prefix = db.get(`${message.guild.id}.config.prefix`);
let db_welcomes = db.get(`${message.guild.id}.config.welcome.enabled`);

let db_welcomeschannels = db.get(`${message.guild.id}.config.welcome.channels`);
let db_welcomesmessages = db.get(`${message.guild.id}.config.welcome.message`);
let db_welcomesimage = db.get(`${message.guild.id}.config.welcome.image`);

if(!message.member.hasPermission("ADMINISTRATOR")) {
    var error_permissions = new Discord.MessageEmbed()
        .setDescription("<:false:881803557274255381> Vous ne disposez pas les permissions nécessaires pour configur un message de bienvenue.")
        .setColor("#F43436")
    return message.channel.send(error_permissions)
}

    if(!db_welcomes) return message.channel.send(`⚠️ Le plugin de bienvenue n'est pas activé. Faites \`${prefix}enable welcome\` pour l'activer!`);

    if(args[0] === "channel") {
        const ch = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if(args[1] && ch) {
            if(!message.guild.channels.resolve(ch)) return message.channel.send('⚠️ Salon introuvable');
            if(ch.type != "text") return message.channel.send('⚠️ Merci de donner un salon de type textuel. Les salons d\'annonces ne sont pas acceptés.');
            if(ch.id == db_welcomeschannels) return message.channel.send('⚠️ Ce salon est déjà défini comme salon de bienvenue!');
            if(!message.guild.me.permissionsIn(ch).has('SEND_MESSAGES')) return message.channel.send('⚠️ Je n\'ai pas les permissions de parler dans ce salon, mettez moi la permission Envoyer des messages dans le salon.');


            db.set(`${message.guild.id}.config.welcome.channels`, ch.id)

            return message.channel.send('✅ Salon de bienvenue modifié.');
        } else {
            const filter = m => m.author.id === message.author.id;
    
            let MSG = await message.channel.send('Quel salon souhaitez-vous définir comme salon de bienvenue ?');

            const c = new MessageCollector(message.channel, filter, {
                time: 60000,
                max: 3
            });

            c.on("collect", async msg1 => {
                const channel = msg1.mentions.channels.first() || msg1.guild.channels.cache.get(msg1.content);
                if(!channel || !message.guild.channels.resolve(channel)) return message.channel.send('⚠️ Ce salon n\'existe pas, vérifiez que j\'ai accès au salon.');
                if(channel.type != "text") return message.channel.send('⚠️ Merci de donner un salon de type textuel. Les salons d\'annonces ne sont pas acceptés.');
                if(channel.id == db_welcomeschannels) return message.channel.send('⚠️ Ce salon est déjà défini comme salon de bienvenue!');
                if(!message.guild.me.permissionsIn(channel).has('SEND_MESSAGES')) return message.channel.send('⚠️ Je n\'ai pas les permissions de parler dans ce salon, mettez moi la permission Envoyer des messages dans le salon.');

                c.stop(true);

                MSG.delete().catch(() => {});
                msg1.delete().catch(() => {});

                db.set(`${message.guild.id}.config.welcome.channels`, channel.id)


                message.channel.send('✅ Salon de bienvenue modifié. Les messages de bienvenue s\'enverront désormais dans <#' + channel.id + '>. \nFaites `' + prefix + 'config` pour voir la configuration actuelle du bot sur le serveur!');
            });

            c.on("end", (collected, reason) => {
                if(collected.size >= 3) return message.channel.send('Vous avez fait trop d\'essais! Refaite la commande puis réessayez.');
                if(reason === "time") return message.channel.send('Temps écoulé');
            });
        }
    } else if(args[0] === 'message') {
        if(args[1]?.toLowerCase() === 'remove') {

            if(!db_welcomesmessages) return message.channel.send('⚠️ Le message de bienvenue est déjà désactivé.');

            db.delete(`${message.guild.id}.config.welcome`)

            message.channel.send('✅ Le message de bienvenue a bien été retiré');
        } else if(args[1]) {
            const newMessage = args.slice(1).join(" ");
            if(newMessage.length < 5) return message.channel.send('⚠️ Le message de bienvenue doit faire plus de 5 caractères !');

            if(newMessage === db_welcomesmessages) return message.channel.send('⚠️ Ce message est le même que celui actuellement défini 🤔');


            db.set(`${message.guild.id}.config.welcome.message`, newMessage)


            return message.channel.send('✅ Message de bienveune modifié. \nFaites `' + prefix + 'config` pour voir la configuration actuelle du bot sur le serveur!');
        } else {
            const filter = m => m.author.id === message.author.id;
    
            let MSG = await message.channel.send('Quel message souhaitez-vous définir comme message de bienvenue ?');

            const c1 = new MessageCollector(message.channel, filter, {
                time: 60000,
                max: 3
            });

            c1.on("collect", async msg1 => {
                const newMessage = msg1.content;

                if(newMessage.length < 5) return message.channel.send('⚠️ Le message de bienvenue doit faire plus de 5 caractères et moins de 200!');

                if(newMessage === db_welcomesmessages) return message.channel.send('⚠️ Ce message est le même que celui actuellement défini 🤔');

                c1.stop(true);

                MSG.delete().catch(() => {});
                msg1.delete().catch(() => {});

                db.set(`${message.guild.id}.config.welcome.message`, newMessage)

                message.channel.send('✅ Message de bienvenue modifié. \nFaites `' + prefix + 'config` pour voir la configuration actuelle du bot sur le serveur!');
            });

            c1.on("end", (collected, reason) => {
                if(collected.size >= 3) return message.channel.send('Vous avez fait trop d\'essais! Refaite la commande puis réessayez.');
                if(reason === "time") return message.channel.send('Temps écoulé');
            });
        }
    } else if(args[0] === 'image') {
        if(db_welcomes === false) {


            db.set(`${message.guild.id}.config.welcome.image`, false)
    
            message.channel.send('✅ Le bot n\'enverra plus d\'image de bienvenue aux nouveaux membres.');
        } else {

            //db.set(`${message.guild.id}.config.welcome.image`, true)
                message.channel.send("Fonctionnalités pas encore disponible ")
            //message.channel.send(`✅ Le bot enverra désormais une image de bienvenue aux nouveaux membres.\nFaites \`${prefix}welcome message remove\` pour retirer le texte de bienvenue et \`${prefix}welcome test\`pour tester!`);
        }
    } else if(args[0] === "test") {
        if(!db_welcomeschannels) return message.channel.send('⚠️ Aucun salon de bienvenue n\'est défini. Faites `' + prefix + 'welcome channel` pour le configurer!');

        if(!db_welcomesmessages && !db_welcomesimage) return message.channel.send('⚠️ Vous n\'avez pas de message ni d\'image de bienvenue configurés.');
        
        let welcomeMsg = db_welcomesmessages
        ?.replace('{user}', message.author)
        .replace('{guildName}', message.guild.name)
        .replace('{memberCount}', message.guild.memberCount)
        .replace('{username}', message.author.username)
        .replace('{usertag}', message.author.tag)
        .replace('{usercreat}', moment(message.author.createdAt).locale('fr').format('llll'))

            let generateWelcomeCard = 

        welcomeMsg && db_welcomesimage
            ? message.guild.channels.cache.get(db_welcomeschannels).send(welcomeMsg, {
                    files: [{
                        attachment: await client.generateWelcomeCard(message.member)
                    }]
                })
            : welcomeMsg && !db_welcomesimage
            ?  message.guild.channels.cache.get(db_welcomeschannels).send(welcomeMsg)
            : !welcomeMsg && db_welcomesimage
            ? message.guild.channels.cache.get(db_welcomeschannels).send({
                    files: [{
                        attachment: await client.generateWelcomeCard(message.member)
                    }]
                    
                })
            : undefined
        return message.channel.send('Test effectué, allez voir ça dans <#' + db_welcomeschannels + '> !');
    } else {
        message.channel.send(`⚠️ Vous n'utilisez pas la commande correctement.\nFaites \`${prefix}welcome <channel | message | image | test>\``);
    }
}

module.exports.help = {
    name: "welcome",
    aliases: ["welcome", "setwelcome"],
    category: 'Config',
    description: "Modifier le message, l'image ou le salon de bienvenue",
    usage: "<message | channel | image | test>",
    cooldown: 5,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: ["EMBED_LINKS"],
    args: false
}