const Command = require("../base/Command.js");

class Help extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Displays all the available commands for you.",
      category: "System :wrench:",
      usage: "help [command]",
      aliases: ["h", "halp"]
    });
  }

  async run(message, args, level) {
    const Discord = require("discord.js")
    if (!args[0]) {
      const settings = message.settings;
      
      const myCommands = message.guild ? this.client.commands.filter(cmd => this.client.levelCache[cmd.conf.permLevel] <= level) : this.client.commands.filter(cmd => this.client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);
      
      const commandNames = myCommands.keyArray();
      const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
      let currentCategory = "";
      let output = ``;
      const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
      sorted.forEach( c => {
        const cat = c.help.category;
        if (currentCategory !== cat) {
          output += `\n\n» ${cat}\n`;
          currentCategory = cat;
        }
        output += `\`${c.help.name}\` `;
      });
      const help = new Discord.RichEmbed()
          .setColor(0x000000)
          .setAuthor("Commands", this.client.user.avatarURL)
          .setDescription(output);
      message.channel.send({
          embed: help
      });
    } else {
      let command = args[0];
      if (this.client.commands.has(command)) {
        command = this.client.commands.get(command);
        if (level < this.client.levelCache[command.conf.permLevel]) return;
        const help = new Discord.RichEmbed()
            .setColor(0x000000)
            .setAuthor(`Commands | ${command.help.name}`, this.client.user.avatarURL)
            .setDescription(`» ${command.help.name}\n\`${command.help.description}\`\n\n**Usage:** \`${command.help.usage}\`\n**Aliases:** \`${command.conf.aliases.join(", ")}\``);
        message.channel.send({ embed: help });
      }
    }
  }
}

module.exports = Help;
