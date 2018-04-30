const Command = require("../base/Command.js");
const raise = require("superscript-text");
const Discord = require("discord.js")

class Small extends Command {
    constructor(client) {
        super(client, {
            name: "small",
            description: "Minifies text.",
            category: "Fun :tada:",
            usage: "small [message]",
            aliases: ["superscript", "tiny"]
        });
    }

    async run(message, args, level) {
        if (args.length === 0) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`How do you expect me to shrink nothing.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({
                embed
            });
        }
        const embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setDescription(raise(args[0].toLowerCase()) + "\n")
        message.channel.send({
            embed: embed
        });
    }
}

module.exports = Small;
