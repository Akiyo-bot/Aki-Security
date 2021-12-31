const { MessageCollector } = require('discord.js');
const Discord = require("discord.js");
const db = require('quick.db');
const moment = require("moment");

module.exports.run = async (client, message, args) => {
    
let prefix = db.get(`${message.guild.id}.config.prefix`);
let db_goodbyes = db.get(`${message.guild.id}.config.goodbye.enabled`);

let db_goodbyeschannels = db.get(`${message.guild.id}.config.goodbye.channels`);
let db_goodbyesmessages = db.get(`${message.guild.id}.config.goodbye.message`);
let db_goodbyesimage = db.get(`${message.guild.id}.config.goodbye.image`);

if(!message.member.hasPermission("ADMINISTRATOR")) {
    var error_permissions = new Discord.MessageEmbed()
        .setDescription("<:false:881803557274255381> Vous ne disposez pas les permissions nécessaires pour configur un message de goodbye.")
        .setColor("#F43436")
    return message.channel.send(error_permissions)
}

    if(!db_goodbyes) return message.channel.send(`⚠️ Le plugin de goodbye n'est pas activé. Faites \`${prefix}enable goodbye\` pour l'activer!`);

    if(args[0] === "channel") {
        const ch = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if(args[1] && ch) {
            if(!message.guild.channels.resolve(ch)) return message.channel.send('⚠️ Salon introuvable');
            if(ch.type != "text") return message.channel.send('⚠️ Merci de donner un salon de type textuel. Les salons d\'annonces ne sont pas acceptés.');
            if(ch.id == db_goodbyeschannels) return message.channel.send('⚠️ Ce salon est déjà défini comme salon de goodbye!');
            if(!message.guild.me.permissionsIn(ch).has('SEND_MESSAGES')) return message.channel.send('⚠️ Je n\'ai pas les permissions de parler dans ce salon, mettez moi la permission Envoyer des messages dans le salon.');


            db.set(`${message.guild.id}.config.goodbye.channels`, ch.id)

            return message.channel.send('✅ Salon de goodbye modifié.');
        } else {
            const filter = m => m.author.id === message.author.id;
    
            let MSG = await message.channel.send('Quel salon souhaitez-vous définir comme salon de goodbye ?');

            const c = new MessageCollector(message.channel, filter, {
                time: 60000,
                max: 3
            });

            c.on("collect", async msg1 => {
                const channel = msg1.mentions.channels.first() || msg1.guild.channels.cache.get(msg1.content);
                if(!channel || !message.guild.channels.resolve(channel)) return message.channel.send('⚠️ Ce salon n\'existe pas, vérifiez que j\'ai accès au salon.');
                if(channel.type != "text") return message.channel.send('⚠️ Merci de donner un salon de type textuel. Les salons d\'annonces ne sont pas acceptés.');
                if(channel.id == db_goodbyeschannels) return message.channel.send('⚠️ Ce salon est déjà défini comme salon de goodbye!');
                if(!message.guild.me.permissionsIn(channel).has('SEND_MESSAGES')) return message.channel.send('⚠️ Je n\'ai pas les permissions de parler dans ce salon, mettez moi la permission Envoyer des messages dans le salon.');

                c.stop(true);

                MSG.delete().catch(() => {});
                msg1.delete().catch(() => {});

                db.set(`${message.guild.id}.config.goodbye.channels`, channel.id)


                message.channel.send('✅ Salon de goodbye modifié. Les messages de goodbye s\'enverront désormais dans <#' + channel.id + '>. \nFaites `' + prefix + 'config` pour voir la configuration actuelle du bot sur le serveur!');
            });

            c.on("end", (collected, reason) => {
                if(collected.size >= 3) return message.channel.send('Vous avez fait trop d\'essais! Refaite la commande puis réessayez.');
                if(reason === "time") return message.channel.send('Temps écoulé');
            });
        }
    } else if(args[0] === 'message') {
        if(args[1]?.toLowerCase() === 'remove') {

            if(!db_goodbyesmessages) return message.channel.send('⚠️ Le message de goodbye est déjà désactivé.');

            db.delete(`${message.guild.id}.config.goodbye`)

            message.channel.send('✅ Le message de goodbye a bien été retiré');
        } else if(args[1]) {
            const newMessage = args.slice(1).join(" ");
            if(newMessage.length < 5) return message.channel.send('⚠️ Le message de goodbye doit faire plus de 5 caractères !');

            if(newMessage === db_goodbyesmessages) return message.channel.send('⚠️ Ce message est le même que celui actuellement défini 🤔');


            db.set(`${message.guild.id}.config.goodbye.message`, newMessage)


            return message.channel.send('✅ Message de bienveune modifié. \nFaites `' + prefix + 'config` pour voir la configuration actuelle du bot sur le serveur!');
        } else {
            const filter = m => m.author.id === message.author.id;
    
            let MSG = await message.channel.send('Quel message souhaitez-vous définir comme message de goodbye ?');

            const c1 = new MessageCollector(message.channel, filter, {
                time: 60000,
                max: 3
            });

            c1.on("collect", async msg1 => {
                const newMessage = msg1.content;

                if(newMessage.length < 5) return message.channel.send('⚠️ Le message de goodbye doit faire plus de 5 caractères et moins de 200!');

                if(newMessage === db_goodbyesmessages) return message.channel.send('⚠️ Ce message est le même que celui actuellement défini 🤔');

                c1.stop(true);

                MSG.delete().catch(() => {});
                msg1.delete().catch(() => {});

                db.set(`${message.guild.id}.config.goodbye.message`, newMessage)

                message.channel.send('✅ Message de goodbye modifié. \nFaites `' + prefix + 'config` pour voir la configuration actuelle du bot sur le serveur!');
            });

            c1.on("end", (collected, reason) => {
                if(collected.size >= 3) return message.channel.send('Vous avez fait trop d\'essais! Refaite la commande puis réessayez.');
                if(reason === "time") return message.channel.send('Temps écoulé');
            });
        }
    } else if(args[0] === 'image') {
        if(db_goodbyes === false) {


            db.set(`${message.guild.id}.config.goodbye.image`, false)
    
            message.channel.send('✅ Le bot n\'enverra plus d\'image de goodbye aux nouveaux membres.');
        } else {

            //db.set(`${message.guild.id}.config.goodbye.image`, true)
                message.channel.send("Fonctionnalités pas encore disponible ")
            //message.channel.send(`✅ Le bot enverra désormais une image de goodbye aux nouveaux membres.\nFaites \`${prefix}goodbye message remove\` pour retirer le texte de goodbye et \`${prefix}goodbye test\`pour tester!`);
        }
    } else if(args[0] === "test") {
        if(!db_goodbyeschannels) return message.channel.send('⚠️ Aucun salon de goodbye n\'est défini. Faites `' + prefix + 'goodbye channel` pour le configurer!');

        if(!db_goodbyesmessages && !db_goodbyesimage) return message.channel.send('⚠️ Vous n\'avez pas de message ni d\'image de goodbye configurés.');
        user = message.author
        let goodbyeMsg = db_goodbyesmessages
            ?.replace('{user}', message.author)
            .replace('{guildName}', message.guild.name)
            .replace('{memberCount}', message.guild.memberCount)
            .replace('{username}', message.author.username)
            .replace('{usertag}', message.author.tag)

            let generategoodbyeCard = 

        goodbyeMsg && db_goodbyesimage
            ? message.guild.channels.cache.get(db_goodbyeschannels).send(goodbyeMsg, {
                    files: [{
                        attachment: await client.generategoodbyeCard(message.member)
                    }]
                })
            : goodbyeMsg && !db_goodbyesimage
            ?  message.guild.channels.cache.get(db_goodbyeschannels).send(goodbyeMsg)
            : !goodbyeMsg && db_goodbyesimage
            ? message.guild.channels.cache.get(db_goodbyeschannels).send({
                    files: [{
                        attachment: await client.generategoodbyeCard(message.member)
                    }]
                })
            : undefined
        return message.channel.send('Test effectué, allez voir ça dans <#' + db_goodbyeschannels + '> !');
    } else {
        message.channel.send(`⚠️ Vous n'utilisez pas la commande correctement.\nFaites \`${prefix}goodbye <channel | message | image | test>\``);
    }
}

module.exports.help = {
    name: "goodbye",
    aliases: ["goodbye", "setgoodbye"],
    category: 'Config',
    description: "Modifier le message, l'image ou le salon de goodbye",
    usage: "<message | channel | image | test>",
    cooldown: 5,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: ["EMBED_LINKS"],
    args: false
}