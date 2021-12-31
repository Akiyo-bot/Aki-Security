const fetch = require('node-fetch');

const Discord = require('discord.js');

module.exports = {
    name: "covid",
    description: "Suivre les cas de COVID-19 dans un pays ou dans le monde",

    async run (client, message, args){

        let countries = args.join(" ");
    

        const noArgs = new Discord.MessageEmbed()
        .setTitle('Arguments manquants')
        .setColor(0xFF0000)
        .setDescription('Il vous manque des arguments (ex:; covid all ||; covid Canada)')
        .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Statistiques mondiales sur le COVID-19 🌎`)
                .addField('Cas confirmés', confirmed)
                .addField('Rétablie', recovered)
                .addField('Décès', deaths)

                message.channel.send(embed)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Statistiques COVID-19 pour **${countries}**`)
                .addField('Cas confirmés', confirmed)
                .addField('Rétablie', recovered)
                .addField('Décès', deaths)

                message.channel.send(embed)
            }).catch(e => {
                return message.channel.send('Pays fourni non valide')
            })
        }
    }
}

module.exports.help = {
    name: "bvn",
    category: "info",
    description: "Commande permtant d'achiffer toute les commande de BM'Security !\nUtilisation : ```$help```",
    cooldown: 3,
    usage: '<commande_name>',
    isUerAdmin: false,
    permission: false,
    args: false
}