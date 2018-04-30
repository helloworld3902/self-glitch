const { inspect } = require("util");

const Command = require("../base/Command.js");

class Conf extends Command {
  constructor(client) {
    super(client, {
      name: "conf",
      description: "Modify the default configuration for all guilds.",
      category: "System :wrench:",
      usage: "conf <view/get/edit> <key> <value>",
      guildOnly: true,
      aliases: ["defaults"],
      permLevel: "Bot Admin"
    });
  }

  async run(message, [action, key, ...value], level) { 
    
    const defaults = this.client.settings.get("default");
    const Discord = require("discord.js")
  
    if (action === "add") {
      if (!key) return message.reply("Please specify a key to add");
      if (defaults[key]) return message.reply("This key already exists in the default settings");
      if (value.length < 1) return message.reply("Please specify a value");

      defaults[key] = value.join(" ");
  
      this.client.settings.set("default", defaults);

      let embed = new Discord.RichEmbed()
        .setColor(0x000000)
        .setAuthor(`${key} successfully added with the value of ${value.join(" ")}`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

      message.channel.send({ embed })
      
    } else
  
    if (action === "edit") {
      if (!key) return message.reply("Please specify a key to edit");
      if (!defaults[key]) return message.reply("This key does not exist in the settings");
      if (value.length < 1) return message.reply("Please specify a new value");

      defaults[key] = value.join(" ");

      this.client.settings.set("default", defaults);

      let embed = new Discord.RichEmbed()
        .setColor(0x000000)
        .setAuthor(`${key} successfully edited to ${value.join(" ")}`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

      message.channel.send({ embed })
    } else
  
    if (action === "del") {
      if (!key) return message.reply("Please specify a key to delete.");
      if (!defaults[key]) return message.reply("This key does not exist in the settings");
    
      const response = await this.client.awaitReply(message, `Are you sure you want to permanently delete ${key} from all guilds? This **CANNOT** be undone.`);

      if (["y", "yes"].includes(response)) {

        delete defaults[key];
        this.client.settings.set("default", defaults);
      
        for (const [guildid, conf] of this.client.settings.filter((setting, id) => setting[key] && id !== "default")) {
          delete conf[key];
          this.client.settings.set(guildid, conf);
        }

        let embed = new Discord.RichEmbed()
          .setColor(0x000000)
          .setAuthor(`${key} was successfully deleted.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

          message.channel.send({ embed })
      } else
      if (["n","no","cancel"].includes(response)) {
        message.reply("Action cancelled.");
      }
    } else
  
    if (action === "get") {
      if (!key) return message.reply("Please specify a key to view");
      if (!defaults[key]) return message.reply("This key does not exist in the settings");

      let embed = new Discord.RichEmbed()
        .setColor(0x000000)
        .setAuthor(`The value of ${key} is currently ${defaults[key]}`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

      message.channel.send({ embed })

    } else {
      const array = [];
      Object.entries(this.client.settings.get("default")).forEach(([key, value]) => {
        array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`); 
      });
      await message.channel.send(`= Bot Default Settings =
${array.join("\n")}`, {code: "asciidoc"});    }
  }
}

module.exports = Conf;
