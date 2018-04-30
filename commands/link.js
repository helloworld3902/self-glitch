const Command = require("../base/Command.js");
const Discord = require("discord.js");
const isgd = require("isgd");

class Link extends Command {
    constructor(client) {
        super(client, {
            name: "link",
            description: "Shortens a given link.",
            usage: "link [link] [url]",
            category: "Utility :gear:",
            permLevel: "User",
            guildOnly: false,
            aliases: ["shorten", "isgd"]
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        if(!args || args.length === 0) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`Dude, I can't shorten an non-existent link.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({ embed })
        }

        let link = args[0]
        let url = args[1]

        if(!url) {
            isgd.shorten(link, (l) => {
                const link = new Discord.RichEmbed()
                    .setColor(0x000000)
                    .setTitle(l)
                message.channel.send({
                    embed: link
                });
            })
        } else {
            isgd.custom(link, url, (l) => {
                const link = new Discord.RichEmbed()
                    .setColor(0x000000)
                    .setTitle(l)
                message.channel.send({
                    embed: link
                });
            })
        }
    }
}

module.exports = Link;
