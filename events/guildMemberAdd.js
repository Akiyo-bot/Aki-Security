const Discord = require("discord.js");
const db = require('quick.db');
const moment = require("moment");


module.exports = async (client, member) => {

    let prefix = db.get(`${member.guild.id}.config.prefix`);
    let raidmod = db.get(`${member.guild.id}.config.raidmod`);
    
    let blacklist = db.get(`${member.id}.blacklist`);
    
    h0nde = ["h0nde", "h0nDe", "h0NDe", "Tesla", "TwITteR"]
    if (member.user.username.startsWith === h0nde) db.set(`${member.user.id}.blacklist`, true)
    if (member.user.username.startsWith === h0nde) {
        member.ban('all your nicknames have been active on the Discord lacklist, we just collect the API').then(() => {
            member.send('**⚠️ all your nicknames have been active on the Discord lacklist, we just collect the API **').catch(() => {});
        }).catch(console.error);
    }

    if(blacklist === true) {
        member.ban('all your nicknames have been active on the Discord lacklist, we just collect the API').then(() => {
            member.send('**⚠️ all your nicknames have been active on the Discord lacklist, we just collect the API **').catch(() => {});
        }).catch(console.error);
    }


    if(raidmod === true) {
        member.kick('Raidmode activé').then(() => {
            member.send('**⚠️ Le Raidmode est activé sur le serveur ' + member.guild.name + ', vous avez donc été kick de celui-ci! ⚠️** \nSi vous pensez que c\'est une erreur, contactez le propriétaire du serveur qui est ' + member.guild.owner.user.tag + ' Sont identifiant est ' + member.guild.owner.user.id).catch(() => {});
        }).catch(console.error);
    }





    let db_welcomes = db.get(`${member.guild.id}.config.welcome.enabled`);
    
    let db_welcomeschannels = db.get(`${member.guild.id}.config.welcome.channels`);
    let db_welcomesmessages = db.get(`${member.guild.id}.config.welcome.message`);
    let db_welcomesimage = db.get(`${member.guild.id}.config.welcome.image`);
    if(!db_welcomes) return;


    /*if(data.plugins.autorole.enabled) {
        if(data.plugins.autorole.role) {
            await member.roles.add(data.plugins.autorole.role).catch(() => {});
        }
    }*/

    let roleauto = db.get(`${member.guild.id}.config.autorole.role`)
    let roleautobot = db.get(`${member.guild.id}.config.autorole.rolebot`)
    let auto = db.get(`${member.guild.id}.config.autorole.enabled`);

    if(auto !== false) {
        if(roleauto && !member.user.bot) {
            await member.roles.add(roleauto).catch(() => {});
        } else if(roleautobot && member.user.bot) {
            await member.roles.add(roleautobot).catch(() => {});
        }
    } 



    let welcomeMsg = db_welcomesmessages
        ?.replace('{user}', member)
        .replace('{guildName}', member.guild.name)
        .replace('{memberCount}', member.guild.memberCount)
        .replace('{username}', member.user.username)
        .replace('{usertag}', member.user.tag)
        .replace('{usercreat}', moment(member.user.createdAt).locale('fr').format('llll'));

    if(!db_welcomeschannels) {
        await member.send(welcomeMsg).catch(() => {});
        
    if(auto) {
        if(roleauto && !member.user.bot) {
            await member.roles.add(roleauto).catch(() => {});
        } 
    }
        
    } else {
        
    if(auto) {
        if(roleauto && !member.user.bot) {
            await member.roles.add(roleauto).catch(() => {});
        } 
    }
        if(member.guild.channels.cache.get(db_welcomeschannels)) {
            welcomeMsg && db_welcomesimage
            ? member.guild.channels.cache.get(db_welcomeschannels).send(welcomeMsg, {
                    files: [{
                        attachment: await client.generateWelcomeCard(member)
                    }]
                })
            : welcomeMsg && !db_welcomesimage
            ? member.guild.channels.cache.get(db_welcomeschannels).send(welcomeMsg)
            : !welcomeMsg && db_welcomesimage
            ? member.guild.channels.cache.get(db_welcomeschannels).send({
                    files: [{
                        attachment: await client.generateWelcomeCard(member)
                    }]
                })
            : undefined
        }
    }
}