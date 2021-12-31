
const Discord = require("discord.js")
const invites = {};
const wait = require('util').promisify(setTimeout);
module.exports = async client => {

    console.log(`BlackMagpie's : Online`)
    client.user.setActivity(`BlackMagpie's | $invites`, { type: "WATCHING" })

  


}