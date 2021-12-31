const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, message, args, content) => {

  let prefix = db.get(`${message.guild.id}.config.prefix`);
if(!args[0]) {

	let Sembed = new Discord.MessageEmbed()
	.setColor("#0000FF")
	.setAuthor(`BlackMagpie's | help !`, message.guild.iconURL)
  .addFields({
      name: 'BlackMagpie\'s',
      value: "Surveille " + client.guilds.cache.size + " serveur. Le prefix du bot est `" + prefix + "` dans ce serveur !",
    }, {
      name: '__**Configuration** - Commandes permettant de configurer le bot__ ',
      value: '> **prefix ** ➔ Configurer le prefix du bot pour le serveur.\n> **enable ** ➔ Activent les different système.\n> **disable ** ➔ Desactivent les different système.\n> **variables ** ➔ Afficher les differentes variables.\n> **welcome ** ➔ Configurer les messages de bienvenue.\n> **goodbye ** ➔ Configurer les messages d\'au revoir\n> **autorole ** ➔ Configurer un rôle automatique quand un membre ou un Bot rejoint le serveur\n> **logschannel ** ➔ Configurer un salon où les actions effectuées sur le discord seront affichées\n> **logschannel ** ➔ Configurer un salon où les actions effectuées sur le discord seront affichées\n> **reset-config ** ➔ Reinitaliser tout le paramètre du serveur ( welcome, goodbye, logs, anti-link etc.), les warns sera garder',
  }, {
      name: '__**Fun** - Commandes amusantes__',
      value: '> **bvn ** ➔ Premet de dire bienvenue a un membre.\n> **covid ** ➔ Affiche les statistique de la COVID19.\n> **eval ** ➔ Permet d\'évaluer un membre.\n> **password ** ➔ Permet de générer un mot de passe.\n> **say ** ➔ Permet de faire répéter le bot.\n> **embed ** ➔ Permet de créé un embed.',
  }, { 
      name: '__**Info** - Informations par rapport à BlackMagpie\'s et au serveur__',
      value: '> **help ** ➔ Afficher la liste des commandes.\n> **info ➔ ** Afficher quelques informations concernant le bot.\n> **invites ** ➔ Fournir un lien d\'invitation pour accueillir le BlackMagpie\'s.\n> **ping ** ➔ Afficher le ping de BlackMagpie\'s.\n> **setafk ** ➔ Si quelqu\'un vous mentionne, il sera directement averti de votre absence.\n> **suggestion ** ➔ Envoie une suggestion pour que le bor marche mieux.\n> **userinfo ** ➔ Afficher les informations d\'un membre.',
  }, {
    name: '__**Modération** - Commandes de modération__',
    value: '> **ban ** ➔ Bannir un membre.\n> **unban ** ➔ Révoquer le bannissement d\'un membre.\n> **tempban ** ➔ Bannir temporairement un membre.\n> **lock ** ➔ Ferme un salon textuel.\n> **unlock ** ➔ Rouvre un salon textuel\n> **tempmute ** ➔ Réduire au silence temporairement un membre.\n> **clear ** ➔ Supprimer des messages en masse.\n> **nuke ** ➔ Vider un salon textuel.\n> **lock** ➔ Ferme un salon textuel.\n> **kick ** ➔ Exclure un membre du serveur.\n> **mp ** ➔ Envoie un message privée au membres\n> **warn ** ➔Avertir un membre du serveur.\n> **unwarn ** ➔ Retire un averticement d\'un membre du serveur',
  }, {
    name: '__**Protection** - Commandes de modération__',
    value: /*> **antiban ** ➔ Bannir un membre.*/'\n> **antilink ** ➔ Empêche à un membre d\'envoyer une invitation Discord.\n> **antispam ** ➔ Empêche un membre du "Spam" dans les salons textuel\n> **ignore-channel ** ➔ Ignore un channel spécifique pour l\'antispam et l\'anti-link\n> **raidmod ** ➔ Empêche toutes personnes de rejoindre le serveur discord ',
  }, {
    name: 'BlackMagpie\'s est en cour de création',
    value: 'donc si vous voyez une erreur ou une faute vous pouzez nous le faire savoir avec la commande `$suggestion`'
  }, )
  .setTimestamp()

	let aEmbed = new Discord.MessageEmbed()
	  .setColor("#0000FF")
    .setAuthor(`Quelques liens !`, message.guild.iconURL)
    .setDescription("N'hésitez pas à visiter ces quelques liens:\n\n<:Twitter:881800299138908180> [Twitter BlackMagpie's](https://twitter.com/AppleCommunity9)\n<:Discord:881800298962763796> [Support Discord](https://discord.gg/XagWwUW2EP)\n<:Partener:881805313815240741> [Partenaire](https://discord.gg/QnGG9pjW8e)")
	message.channel.send(Sembed)
  message.channel.send(aEmbed)
  }
}

module.exports.help = {
    name: "bvn",
    category: "info",
    description: "Commande permtant d'achiffer toute les commande de BlackMagpie's !\nUtilisation : ```$help```",
    cooldown: 3,
    usage: '<commande_name>',
    isUerAdmin: false,
    permission: false,
    args: false
}