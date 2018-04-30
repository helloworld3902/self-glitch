const Command = require("../base/Command.js");
const Discord = require("discord.js")

class Nick extends Command {
    constructor(client) {
        super(client, {
            name: "nick",
            description: "Nicknames the bot to whatever you specify.",
            category: "System :wrench:",
            usage: "nick [nickname]",
            guildOnly: true,
            aliases: ["rename", "nickname"]
        });
    }

    async run(message, args, level) {
        if (!args[0]) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`Come on, just name me something, it's not that hard.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({
                embed
            });
        }
        if (args.join(" ").length > 32) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`That's way too long dude. I'm not going to name myself that.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({
                embed
            });
        }
        message.guild.members.get(this.client.user.id)
            .setNickname(args.join(" "));
        const embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setTimestamp()
            .setFooter(args.join(" "))
            .setTitle("Nickname Changed")
        message.channel.send({
            embed
        });
    }
}

module.exports = Nick;
