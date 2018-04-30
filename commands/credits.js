const Command = require("../base/Command.js");
const Discord = require("discord.js")

class Credits extends Command {
    constructor(client) {
        super(client, {
            name: "credits",
            description: "Contributions to the Magic 8 Ball bot.",
            category: "Utility :gear:",
            usage: "credits",
            aliases: ["whois"]
        });
    }

    async run(message, args, level) {
        const embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setAuthor("Credits", this.client.user.avatarURL)
            .addField("Developers", "Feces#7507\nAffinix#0034")
            .addField("Support", "Feces#7507\nAffinix#0034")
        message.channel.send({
            embed: embed
        });
    }
}

module.exports = Credits;
