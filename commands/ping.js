const Command = require("../base/Command.js");

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Latency and API response times.",
      usage: "ping",
      aliases: ["pong"],
      category: "Miscellaneous :question:"
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try {
      const Discord = require("discord.js")
      const msg = await message.channel.send("🏓 Ping!");
      let embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setTitle(`🏓 ${msg.createdTimestamp - message.createdTimestamp}ms\n 💙 ${Math.round(this.client.ping)}ms.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");
      msg.edit({ embed });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Ping;
