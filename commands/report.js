const Command = require("../base/Command.js");
const Discord = require("discord.js")

class Report extends Command {
    constructor(client) {
        super(client, {
            name: "report",
            description: "Report errors to the bot developers.",
            category: "System :wrench:",
            usage: "report [message]",
            aliases: ["bug", "ticket"]
        });
    }

    async run(message, args, level) {
        if (!args[0]) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`There's nothing to report. If you post spam I swear to god...`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({
                embed
            });
        }

        let embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setAuthor("Report", message.author.avatarURL)
            .setThumbnail(message.guild.iconURL)
            .setDescription("```" + args.join(" ") + "```")
            .setTimestamp()
            .setFooter("Report sent at")
            .addField("User", message.author.username + "#" + message.author.discriminator, true)
            .addField("Guild", message.guild.name, true)
            .addField("User ID", message.author.id, true)
            .addField("Guild ID", message.guild.id, true)
        let sentTo1 = this.client.users.get("400835140458250241");
        sentTo1.send({
            embed
        });
        let sentTo2 = this.client.users.get("289523747851862016");
        sentTo2.send({
            embed
        });
        let sentTo3 = this.client.users.get("218486549967405059");
        sentTo3.send({
            embed
        });
        let sentTo4 = this.client.users.get("185975071603556352");
        sentTo4.send({
            embed
        });

        embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setAuthor(`Report sent.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

        return message.channel.send({ embed })
    }
}

module.exports = Report;
