const { MessageEmbed } = require("discord.js");

var owneridnam = "770651879838449665"

module.exports.run = async (client, message) => {
    if(message.author.id !== owneridnam) return;

    let i0 = 0;
    let i1 = 10;
    let page = 1;

    let description = `Serveurs: ${client.guilds.cache.size}\n\n`+
    client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r).map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membres (${r.id})`).slice(0, 10).join("\n");

    const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`PAGE: ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
        .setDescription(description)
        .setTimestamp();

    const msg = await message.channel.send(embed);
        
	await msg.react("⬅");
	await msg.react("➡");

    const c = msg.createReactionCollector((_reaction, user) => user.id === message.author.id);

    c.on("collect", async reaction => {
        if(reaction.emoji.name === "⬅") {
            i0 = i0 - 10;
            i1 = i1 - 10;
            page = page - 1

            if(i0 < 0) return;
            if(page < 1) return;

            description = `Serveurs: ${client.guilds.cache.size}\n\n` + client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map(r => r).map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membres (${r.id})`).slice(i0, i1).join("\n");

            embed.setTitle(`Page: ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
                .setDescription(description);

            msg.edit(embed);
        }

        if(reaction.emoji.name === "➡") {
            i0 = i0 + 10;
            i1 = i1 + 10;
            page = page + 1

            if(i1 > client.guilds.cache.size + 10) return;
            if(i0 < 0) return;

            description = `Serveurs: ${client.guilds.cache.size}\n\n` + client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
            .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membres (${r.id})`).slice(i0, i1).join("\n");

            embed.setTitle(`Page: ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
                .setDescription(description);

            msg.edit(embed);
        }

        await reaction.users.remove(message.author.id);
    })
}

module.exports.help = {
    name: "guildslist",
    aliases: ["guildslist", "glist"],
    category: 'Owner',
    description: "Afficher la liste des serveurs",
    usage: "",
    cooldown: 3,
    memberPerms: [],
    botPerms: ["EMBED_LINKS", "ADD_REACTIONS"],
    args: false
}