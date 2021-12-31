const Discord = require("discord.js");
 module.exports = {
    name: "clear",
    description: "Clears messages",

    async run (client, message, args) {

        const amount = args.join(" ");    
        if(!message.member.hasPermission("MANAGE_CHANNELS")) {
            var error_permissions = new Discord.MessageEmbed()
            .setDescription("<:false:881803557274255381> Vous ne disposez pas les permissions nécessaires pour clear des messages.")
                .setColor("#F43436")
            return message.channel.send(error_permissions)
        }
        
        if(!amount) return message.reply('Veuillez me fournir un certain nombre de messages à supprimer')

        if(amount > 100) return message.reply(`<a:emoji_2:777069369234161664> | vous ne pouvez pas effacer plus de 100 messages à la fois`)

        if(amount < 1) return message.reply(`<a:emoji_2:777069369234161664> | vous devez supprimer au moins un message`)

    message.delete()
    //s1 = parseInt(s1, 10);
        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(amount)
        });


        message.channel.send("j'ai supprimer " + args[0] + " message !").then(msg => {
            msg.delete({ timeout: 30000 })
        })

    }
}


    //"<a:emoji_2:777069369234161664>  " + "| Erreur, vous ne pouvez supprimer qu'entre 2 et 100 messages à la fois!"
    //fetchMessages

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