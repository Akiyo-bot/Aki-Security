const Discord = require('discord.js');
const db = require('quick.db');
let cooldown = new Set();
const ms = require('ms');


module.exports.run = async (client, message, args) => {
    message.channel.send('La commande est en maintenance')

        user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
       
       if(!user) return message.channel.send('Veuillez spécifier un utilisateur, par mention ou identifiant');
        

        if(user.bot) return message.channel.send('Vous ne pouvez pas notés les bots');
        if(user.id === user.bot) return message.channel.send('Vous ne pouvez pas notés les bots');

        if(message.author.id === user.id) return message.channel.send('Vous ne pouvez pas notés les bots, vous ne pouvez pas vous notés');

        let reason = args.slice(1).join(" ");

        if(cooldown.has(message.author.id && user)) {
            
            let cooldownerr = new Discord.MessageEmbed()
                .setDescription("<:false:881803557274255381> Tu dois attendre 1 jour avant de re note cette personne !")
            return message.channel.send(cooldownerr);
            } else {
            cooldown.add(message.author.id && user)
            setTimeout(() => {cooldown.delete(message.author.id && user)}, 86400000 );
            }

        //if(!reason) return message.channel.send('Veiller entrer une notes de 1 a 5');

        let titleembed = new Discord.MessageEmbed()
        .setDescription("Veiller entrer une notes de 1 a 5")
    
        const title = await message.channel.send(titleembed);

const filter = (m) => m.author.id === message.author.id;

message.channel.awaitMessages(filter, { time: 30000 })
    .then(async (collectedTitle) => {
        
message.channel.send('fin')
      message.delete()

      let charnull = new Discord.MessageEmbed()
          .setDescription("<:false:881803557274255381> Merci de spécifier un texte valide!")

      
          if(!collectedTitle.first().content) {
            title.edit(charnull)
          }

          await title.delete().catch(() => {});
        
let lvl = db.get(`${user}.lvl`);
let number = db.get(`${user}.number`);
reason = parseInt(collectedTitle.first().contenteason, 10);
if(collectedTitle.first().content.toLowerCase() !== 'skip') {
        if (isNaN(collectedTitle.first().content) && collectedTitle.first().content < 1 || collectedTitle.first().content > 5) {
            let titleembeerrd = new Discord.MessageEmbed()
                .setDescription("<:false:881803557274255381> Veiller entrer une notes de 1 a 5")
                message.channel.send('err reason')
            return title.edit(titleembeerrd);
    } else {
            
            let lvlnull = new Discord.MessageEmbed()
                .setDescription(`Merci pour le votes ! **${user}** a été notés, pour la notes : ${collectedTitle.first().content}/5`)
                
            db.add(`${user}.lvl`, collectedTitle.first().content);
            db.add(`${user}.number`, 1);
            title.edit(lvlnull)
        }
} else return message.reply('un erer')
})
.catch(() => message.channel.send('Temps écoulé'));
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
