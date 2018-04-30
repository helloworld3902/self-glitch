const Command = require("../base/Command.js");
const Discord = require("discord.js")

class Announce extends Command {
    constructor(client) {
        super(client, {
            name: "announce",
            description: "Announce a message in an embed.",
            usage: "announce [message]",
            permLevel: "Moderator",
            category: "Moderation :hammer:"
        });
    }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
        message.delete();

        let announcement = args.join(" ")

        const anno = new Discord.RichEmbed()
            .setColor(0x000000)
            .setAuthor("Announcement", message.author.avatarURL)
            .setDescription(announcement)
        message.channel.send({
            embed: anno
        });
    }
}

module.exports = Announce;
