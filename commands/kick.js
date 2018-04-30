const Command = require("../base/Command.js");

class Kick extends Command {
  constructor(client) {
    super(client, {
      name: "kick",
      description: "Kicks a member of your guild.",
      usage: "kick [mention]",
      category: "Moderation :hammer:",
      aliases: [],
      permLevel: "Moderator",
      guildOnly: true
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    let Discord = require("discord.js")

    let kickPerms = message.guild.member(this.client.user).hasPermission('KICK_MEMBERS');

    if(!kickPerms) {
        let embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setAuthor(`I don't have the permission to do that.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");
    
        return message.channel.send({ embed })
    }
    
    let member = message.mentions.members.first();
    let reason = args.slice(1)
        .join(' ');
    await member.kick(reason)
    const embed = new Discord.RichEmbed()
        .setColor(0x000000)
        .setTitle(`Kicked ${member}.`)
    message.channel.send({
        embed: embed
    });
  }
}

module.exports = Kick;
