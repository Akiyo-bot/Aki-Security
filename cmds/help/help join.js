
const Discord = require('discord.js');

module.exports.run = async (client, message, args, content) => {

if(!args[0]) {


 let Sembed = new Discord.MessageEmbed()
	.setColor("#0000FF")
	.setAuthor(`Siri | help !`, message.guild.iconURL)
	.setTitle("<:twitter:724634658540879975>\n<:discord:724642379721867264>")
  .addFields({
    name: '**Configuration Message de Bienvenue !**',
    value: '`prefix`',
}, )
.setTimestamp()
	.setDescription(" Siri | Surveille " + client.user.cache + "members",client.user.displayAvatarURL())
	message.channel.send(Sembed)

}
}