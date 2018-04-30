const Command = require("../base/Command.js");
const emoji = require("discord-emoji-convert");
const Discord = require("discord.js")

class Big extends Command {
    constructor(client) {
        super(client, {
            name: "big",
            description: "Makes text big!",
            category: "Fun :tada:",
            usage: "big [message]",
            aliases: ["emoji", "enlarge"]
        });
    }

    async run(message, args, level) {
        if (!args[0]) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`How do you expect me to enlargen nothing.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({
                embed
            });
        }
        const embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setDescription(emoji.convert(args.join(" ")) + "\n")
        message.channel.send({
            embed: embed
        });
    }
}

module.exports = Big;
