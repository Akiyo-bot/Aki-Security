const Discord = require('discord.js');

const db = require('quick.db');

module.exports.run = async (client, message, args, content) => {


    let arg = message.content.split(" ").slice(1);
    let msg = arg.join(" ");
    let msg2 = arg.join(8);
    x = msg2

if(!msg.content === "message") {

	let Sembed = new Discord.MessageEmbed()
	.setColor("#0000FF")
	.setAuthor(`BM'Security | help !`, message.guild.iconURL)
	.setTitle("<:twitter:724634658540879975>\n<:discord:724642379721867264>")
  .addFields({
    name: '**Configuration Message de Bienvenue !**',
    value: '`prefix`',
}, )
  
	.setTimestamp()
	.setDescription(" BM'Security | Surveille " + client.user.cache + "members",client.user.displayAvatarURL())
	message.channel.send(Sembed)
  } 


  let join = db.get(`join_${message.guild.id}`);


if(msg => "message") {
    if(join === null) {
        //db.set(`join_${message.guild.id}`, );
        await message.channel.send(`bienvenue a été configuré ${msg2}`)
    }
}

}

//let args = args.slice(1).join(" ");


module.exports.help = {
    name: "join",
    category: "config",
    cooldown: 3,
    usage: '<commande_name>',
    isUerAdmin: false,
    permission: false,
    args: false
}
