const { MessageEmbed } = require("discord.js");
const db = require('quick.db');


let channels;
let data = null;

module.exports = async (client, oldState, newState) => {
    
    let db_logena = db.get(`${newState.guild.id}.config.log.enabled`);
    let db_logchannels = db.get(`${newState.guild.id}.config.log.channels`);


    if(db_logchannels) {
        if(db_logchannels) {

        let username = oldState.displayName;
        let oldVCID = oldState.voiceChannelID;
        let newVCID = newState.voiceChannelID;

        let oldChannelName = oldState.channel
        let newChannelName = newState.channel

       // let oldChannelName = (oldVCID != null && typeof oldVCID != undefined) ? channels.get(oldVCID).name : null;
       // let newChannelName = (newVCID != null && typeof newVCID != undefined) ? channels.get(newVCID).name : null;
    


        const embedConnected = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`Aki'Security || Logs *Vocal*`)
                .addField(`${oldState} a rejoind un salon vocal <@` + newChannelName + '>')
                .setFooter('ID: ' + newState.id)
                .setTimestamp();

        const embedDisconnected = new MessageEmbed()
                .setColor('RED')
                .setAuthor(`Aki'Security || Logs *Vocal*`)
                .setDescription(`${oldState} a quitter un salon vocal <@` + oldChannelName + '>')
                .setFooter('ID: ' + oldState.id)
                .setTimestamp();

        const embedMoved = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`Aki'Security || Logs *Vocal*`)
                .setDescription(`${oldState.displayName} a été déplacé`)
                .addField('**Salon Avant** <@' + oldChannelName + '>')
                .addField('**Salon Après** <@' + newChannelName + '>')
                .setFooter('ID: ' + oldState.id)
                .setTimestamp();



        if (oldState.channel === null) {
            newState.guild.channels.cache.get(db_logchannels).send(embedConnected);
        } else if (newState.channel === null && oldState.channel !== null) {
            newState.guild.channels.cache.get(db_logchannels).send(embedDisconnected);
        } else if(oldState.channel !== null && oldState.channel !== newState.channel){
            newState.guild.channels.cache.get(db_logchannels).send(embedMoved);
        }
/*
            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`${executor.username} a créé un nouveau salon`, executor.displayAvatarURL({ dynamic: true }))
                .addField('Nom', channel.name, true)
                .addField('Type', cType, true)
                .setFooter('ID: ' + channel.id)
                .setTimestamp();
            channel.guild.channels.cache.get(db_logchannels).send(embed);*/
        }
    }
}









/*const PrivateChannel = require('../models/PrivateChannel');

module.exports = async (client, oldState, newState) => {
    const guild = oldState.guild;
    const data = await client.getGuild(guild);
    if(!data) return;

    const member = await guild.members.fetch(newState.member).catch(() => {});
    if(!member || member?.user?.bot) return;

    const memberData = await PrivateChannel.findOne({ ownerID: member.id });
    const channel = guild.channels.resolve(memberData?.channelID);
    const oldChannel = guild.channels.resolve(oldState.channelID);

    if(!guild.me.hasPermission(['MANAGE_CHANNELS', 'MOVE_MEMBERS'])) return;

    if(data.plugins.privatechannels?.channelID && (newState.channelID === data.plugins.privatechannels?.channelID)) {
        const options = {
            type: 'voice',
            bitrate: 64000,
            userLimit: 2,
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: ['CONNECT', 'SPEAK', 'STREAM','MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'MANAGE_CHANNELS', 'CREATE_INSTANT_INVITE']
                },
                {
                    id: guild.roles.everyone.id,
                    allow: ['VIEW_CHANNEL']
                },
                {
                    id: client.user.id,
                    allow: ['MANAGE_CHANNELS']
                }
            ]
        };

        if(data.plugins.privatechannels?.parentID) options.parent = data.plugins.privatechannels?.parentID;
    
        if(!channel) {
            const ch = await guild.channels.create(`Salon de ${member.user.username}`, options);

            if(!memberData) {
                const createUser = new PrivateChannel({ _id: require('mongoose').Types.ObjectId(), channelID: ch.id, ownerID: member.id });
                await createUser.save();
            } else {
                memberData.channelID = ch.id;
                await memberData.save();
            }

            await member.voice.setChannel(ch).catch(() => {});
        }
    } else if(memberData) {
        if(!newState.channelID || (newState.channelID !== memberData.channelID)) {
            if(oldChannel && oldChannel.members.size >= 1) {
                memberData.ownerID = oldChannel.members.random().id;
                await memberData.save();
            } else {
                await PrivateChannel.findOneAndDelete({ ownerID: member.id });
                if(channel) await channel.delete().catch(() => {});
            }
        }
    }
}*/