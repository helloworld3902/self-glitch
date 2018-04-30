const Command = require("../base/Command.js");
const Discord = require("discord.js")

class Rps extends Command {
    constructor(client) {
        super(client, {
            name: "rps",
            description: "Play rock paper scissors with the bot.",
            category: "Fun :tada:",
            usage: "rps [choice]",
            aliases: ["rockpaperscissors"]
        });
    }

    async run(message, args, level) {
        if (!args[0]) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`You literally type rock, paper or scissors. Get it right nerd.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({
                embed
            });
        }
        if (args[0] == "rock") {
            const embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setTitle("I chose paper, wow you succ at this.")
            message.channel.send({
                embed: embed
            });
        }
        if (args[0] == "paper") {
            const embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setTitle("I chose scissors, wow you succ at this.")
            message.channel.send({
                embed: embed
            });
        }
        if (args[0] == "scissors") {
            const embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setTitle("I chose rock, wow you succ at this.")
            message.channel.send({
                embed: embed
            });
        }
    }
}

module.exports = Rps;
