const Command = require("../base/Command.js");
const Discord = require("discord.js")

class Quantum extends Command {
    constructor(client) {
        super(client, {
            name: "quantum",
            description: "Quantum 8 Ball Update!",
            category: "Miscellaneous :question:",
            usage: "quantum"
        });
    }

    async run(message, args, level) {
        const embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setAuthor("Quantum Update", this.client.user.avatarURL)
            .addField("What happened?", "Major update with revamp of every feature and overall preformance!")
            .addField("How to get?", ":question: Invite: http://8ball.gq/invite\n:question: Vote: http://8ball.gq/vote")
            .setImage("https://cdn.glitch.com/c417d43a-dea9-49f0-b094-d147a801e4f6%2Fthumbnail.png?1524803407413")
        message.channel.send({
            embed: embed
        });
    }
}

module.exports = Quantum;
