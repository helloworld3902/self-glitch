const Command = require("../base/Command.js");
const { version } = require("discord.js");
const cpuStat = require('cpu-stat');
const moment = require("moment");
require("moment-duration-format");

class Stats extends Command {
  constructor(client) {
    super(client, {
      name: "stats",
      description: "Gives some useful bot statistics.",
      usage: "stats",
      category: "Miscellaneous :question:",
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    const Discord = require("discord.js")
    cpuStat.usagePercent(function(err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
      const duration = moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
      const info = new Discord.RichEmbed()
        .setColor(0x000000)
        .setAuthor("Bot Info", this.client.user.avatarURL)
        .setThumbnail(this.client.user.avatarURL)
        .addField("Version", "1.0", true)
        .addField("Uptime", duration, true)
        .addField("Guilds", this.client.guilds.size, true)
        .addField("Users", this.client.users.size, true)
        .addField("RAM", (Math.round(process.memoryUsage().heapUsed / 1024 / 1024) * 100 / 100) + " MB", true)
        .addField("CPU", percent + "%")
      message.channel.send({
        embed: info
      });
    });
  }
}

module.exports = Stats;
