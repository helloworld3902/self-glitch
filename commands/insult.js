const Discord = require('discord.js')
var request = require('request');
const Command = require("../base/Command.js");

class Insult extends Command {
  constructor(client) {
    super(client, {
      name: "insult",
      description: "Insults people >:D",
      usage: "insult [mention]",
      category: "Fun :tada:",
      aliases: [],
      permLevel: "Moderator",
      guildOnly: true
    });
  }
  
async run(message, args, level) {
  if(args.length < 1 || !args) {
    const embed = new Discord.RichEmbed()
        .setColor(0x000000)
        .setAuthor("Lemme insult someone man!", "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png")
    message.channel.send({
        embed: embed
    });
    return;
  }
  request('https://insult.mattbas.org/api/insult.json?who=' + args.join(' '), function(err, resp, body) {
    let json = JSON.parse(body);
    let insult = json.insult;
    const embed = new Discord.RichEmbed()
        .setColor(0x000000)
        .setTitle(insult)
    message.channel.send({
        embed: embed
    });
  });
}
}
  
module.exports = Insult;
  