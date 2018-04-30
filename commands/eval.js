const Command = require("../base/Command.js");

class Eval extends Command {
  constructor(client) {
    super(client, {
      name: "eval",
      description: "Evaluates arbitrary Javascript.",
      category: "System :wrench:",
      usage: "eval <expression>",
      aliases: ["ev"],
      permLevel: "Bot Admin"
    });
  }

  async run(message, args, level) {
    const code = args.join(` `);

    try {
      const Discord = require("discord.js")
      const hastebin = require("hastebin-gen");

      const evaled = eval(code);

      const clean = await this.client.clean(this.client, evaled);
      if (clean.length > 1024) {
        const hastebin = require("hastebin-gen");
          hastebin(clean, `txt`).then((link) => {
              let embed = new Discord.RichEmbed()
                  .addField(`Input:`, `\`\`\`js\n${code}\n\`\`\``)
                  .addField(`Output:`, `\`\`\`The output was too long, so I've posted it to hastebin: ${link}\`\`\``)
                  .setColor(0x000000);
              
              message.channel.send({ embed });
          }).catch(console.error);
          return;
      }
      let embed = new Discord.RichEmbed()
          .addField(`Input:`, `\`\`\`js\n${code}\n\`\`\``)
          .addField(`Output:`, `\`\`\`js\n${clean}\n\`\`\``)
          .setColor(0x000000);
      message.channel.send({ embed });
  } catch (err) {
      const errClean = await this.client.clean(this.client, err);
      const Discord = require("discord.js")
      const hastebin = require("hastebin-gen");
      if (errClean.length > 1024) {
        const hastebin = require("hastebin-gen");
          hastebin(errClean, `txt`).then((link) => {
              let embed = new Discord.RichEmbed()
                  .addField(`Input:`, `\`\`\`js\n${code}\n\`\`\``)
                  .addField(`Output:`, `\`\`\`The output was too long, so I've posted it to hastebin: ${link}\`\`\``)
                  .setColor(0x000000);

              message.channel.send({ embed });
          }).catch(console.error);
          return;
      }
      let embed = new Discord.RichEmbed()
          .addField(`Input:`, `\`\`\`js\n${code}\n\`\`\``)
          .addField(`:no_entry_sign: | Error!`, `\`\`\`xl\n${errClean}\n\`\`\``)
          .setColor(0x000000);

      message.channel.send({ embed });

  }

  }
}

module.exports = Eval;
