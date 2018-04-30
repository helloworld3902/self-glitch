const Command = require("../base/Command.js");
const Discord = require("discord.js")
const Ball = require("../assets/json/8ball.json")

class EightBall extends Command {
    constructor(client) {
        super(client, {
            name: "8ball",
            description: "Predict the future...",
            usage: "8ball [question]",
            permLevel: "User",
            category: "Fun :tada:"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        if(args.length === 0) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`Maybe you should actually put in a question.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({ embed })
        }

        if(args.length < 2) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`One word questions are not actually questions, smart kid.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({ embed })
        }

        const question = args.join(" ")

        let catagory;
        let color;
        let image;

        switch (Math.floor(Math.random() * (3 - 0) + 0)) {
            case 0:
                catagory = "good"
                image = "https://cdn.discordapp.com/attachments/409519602301796352/409519694517895178/check.png";
                color = "0xa6ff4d";
                break;
            
            case 1:
                catagory = "ok"
                image = "https://cdn.discordapp.com/attachments/409519602301796352/409887653341822987/minus.png";
                color = "0xffbe3d";
                break;

            case 2:
                catagory = "bad"
                image = "https://cdn.discordapp.com/attachments/409519602301796352/409542859931385886/cross.png";
                color = "0xff4d4d";
                break;

            default:
                break;
        }

        catagory = Ball[catagory]
        let answer = catagory.random();

        const embed = new Discord.RichEmbed()
            .setColor(color)
            .setAuthor(`${answer}.`, image)
            .setFooter(`${question}`, message.author.avatarURL);

        message.channel.send(embed);
    }
}

module.exports = EightBall;
