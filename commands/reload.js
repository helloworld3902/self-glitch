const Command = require("../base/Command.js");

class Reload extends Command {
  constructor(client) {
    super(client, {
      name: "reload",
      description: "Reloads a command that has been modified.",
      category: "System :wrench:",
      usage: "reload [command]",
      permLevel: "Bot Admin"
    });
  }

  async run(message, args, level) { 
    const Discord = require("discord.js");

    if (!args || args.size < 1) return message.reply("Must provide a command to reload. Derp.");
    
    const commands = this.client.commands.get(args[0]) || this.client.commands.get(this.client.aliases.get(args[0]));
    if (!commands) {
      let embed = new Discord.RichEmbed()
        .setColor(0x000000)
        .setAuthor(`The command "${args[0]}" does not exist, nor is it an alias.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

      return message.channel.send({ embed })
    }

    let response = await this.client.unloadCommand(commands.conf.location, commands.help.name);
    if (response) {
      let embed = new Discord.RichEmbed()
        .setColor(0x000000)
        .setAuthor(`Error Unloading: ${response}`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

      return message.channel.send({ embed })
    }

    response = this.client.loadCommand(commands.conf.location, commands.help.name);
    if (response) {
      let embed = new Discord.RichEmbed()
        .setColor(0x000000)
        .setAuthor(`Error loading: ${response}`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

      return message.channel.send({ embed })
    }

    let embed = new Discord.RichEmbed()
      .setColor(0x000000)
      .setAuthor(`The command "${commands.help.name}" has been reloaded`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

    message.channel.send({ embed })
  }
}
module.exports = Reload;
