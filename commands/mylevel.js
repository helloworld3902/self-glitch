const Command = require("../base/Command.js");

class MyLevel extends Command {
  constructor(client) {
    super(client, {
      name: "mylevel",
      description: "Displays your permission level.",
      usage: "mylevel",
      category: "Miscellaneous :question:",
      guildOnly: true
    });
  }

  async run(message, args, level) {
    const Discord = require("discord.js");

    const friendly = this.client.config.permLevels.find(l => l.level === level).name;
    let embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setAuthor(`Your permission level is: ${level} - ${friendly}`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

    message.channel.send({ embed })
  }
}

module.exports = MyLevel;
