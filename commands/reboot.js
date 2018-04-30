const Command = require("../base/Command.js");

class Reboot extends Command {
  constructor(client) {
    super(client, {
      name: "reboot",
      description: "Restarts / shuts down bot.",
      category: "System :wrench:",
      usage: "reboot",
      aliases: []
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try {
      const Discord = require("discord.js")

      const reboot = new Discord.RichEmbed()
        .setColor(0x000000)
        .setAuthor("Bot Restarted.", "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png")
      await message.channel.send({
        embed: reboot
      });

      this.client.commands.forEach(async cmd => {
        await this.client.unloadCommand(cmd);
      });

      process.exit(1);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Reboot;