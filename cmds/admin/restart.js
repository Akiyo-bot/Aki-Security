const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(message.author.id === "770651879838449665") {
    client.users.cache.get("770651879838449665").send('🔄 **Le bot redémarre...**').then(async() => {
        await client.destroy();
        process.exit();
    })
} else if(message.author.id === "593143122322653189") {
    client.users.cache.get("770651879838449665").send('🔄 **Le bot redémarre...**').then(async() => {
        await client.destroy();
        process.exit();
    })
}
};
   
module.exports.help = {
    name: "restart",
    aliases: ["restart"],
	category: 'Owner',
    description: "Redémarrer le bot",
    usage: "",
    cooldown: 5,
    memberPerms: [],
    botPerms: [],
    args: false,
};