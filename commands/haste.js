const Command = require("../base/Command.js");
const Discord = require("discord.js");
const snekfetch = require("snekfetch");

class Haste extends Command {
    constructor(client) {
        super(client, {
            name: "haste",
            description: "Posts text to hastebin",
            usage: "haste [text]",
            category: "Utility :gear:",
            permLevel: "User",
            guildOnly: false,
            aliases: ["hastebin", "hb"]
        });
    }

    async run(message, args, level) {
        if (!args[0]) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`Actually give me something to post.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({ embed })
        }
        snekfetch.post("https://hastebin.com/documents").send(args.slice(0).join(" ")).then(body => {
            const haste = new Discord.RichEmbed()
                .setColor(0x000000)
                .setTitle("Posted to Hastebin")
                .setDescription("https://hastebin.com/" + body.body.key)
            message.channel.send({
                embed: haste
            });
        });
    }
}

module.exports = Haste;
