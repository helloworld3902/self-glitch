const Command = require("../base/Command.js");
const Discord = require("discord.js")
const jimp = require("jimp")

class Trump extends Command {
    constructor(client) {
        super(client, {
            name: "trump",
            description: "Generate a fake trump tweet.",
            category: "Image :art:",
            usage: "trump",
            aliases: ["tweet"]
        });
    }

    async run(message, args, level) {
      
        let image = await jimp.read('https://cdn.glitch.com/c417d43a-dea9-49f0-b094-d147a801e4f6%2Ftrump.png?1524891111858')
        let font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)

        if(args.length === 0) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`How am I supposed to tweet nothing.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({ embed })
        }

        if(args.join(" ").length > 100) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`Too long m8.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({ embed })
        }

        image.print(font, 43, 102, args.join(" "), 620)

        image.getBuffer(jimp.MIME_PNG, (err, image) => {
            message.channel.send({ files: [{ attachment: image, name: `trump.png` }] });
        });
    }
}

module.exports = Trump;
