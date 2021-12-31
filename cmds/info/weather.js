const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: "weather",
    description: "Checks a weather forecast",

    async run (client, message, args){

    weather.find({search: args.join(" "), degreeType: 'F'}, function (error, result){
        // 'C' can be changed to 'F' for farneheit results
        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('Veuillez spécifier un emplacement')

        if(result === undefined || result.length === 0) return message.channel.send('location **Invalid**');

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Prévisions météo pour ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(0x111111)
        .addField('Fuseau horaire', `UTC${location.timezone}`, true)
        .addField('Type de diplôme', 'Celsius', true)
        .addField('Température', `${current.temperature}°`, true)
        .addField('Vent', current.winddisplay, true)
        .addField('Se sent comme', `${current.feelslike}°`, true)
        .addField('Humidité', `${current.humidity}%`, true)


        message.channel.send(weatherinfo)
        })        
    }
}