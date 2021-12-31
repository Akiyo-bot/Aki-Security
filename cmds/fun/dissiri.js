const Discord = require("discord.js");
const client = new Discord.Client();

client.on('message', (message) => {
    if (message.content === 'Bonjour') {
        if (!message.channel.name.startsWith(`dis-siri`)) return console.log("teste");
        if (message.author.bot) return;
            message.channel.send("Bonjour !")

    } else {
    message.channel.send("Desoler je ne comprend pas")
}
})