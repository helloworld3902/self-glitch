const Command = require("../base/Command.js");

class Ban extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      description: "Bans a member of your guild.",
      usage: "ban [mention]",
      category: "Moderation :hammer:",
      aliases: [],
      permLevel: "Moderator",
      guildOnly: true
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    let Discord = require("discord.js")

    let can = message.channel.permissionsFor(message.member)
        .has("BAN_MEMBERS");
    let member = message.mentions.members.first();

    if(!member) {
        let embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setAuthor(`Please mention someone.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");
      
        return message.channel.send({ embed })
    }

    let reason = args.slice(1)
        .join(' ');
    await member.ban(reason)
    const ban = new Discord.RichEmbed()
        .setColor(0x000000)
        .setTitle(`Banned ${member}.`)
    message.channel.send({
        embed: ban
    });
  }
}

module.exports = Ban;
