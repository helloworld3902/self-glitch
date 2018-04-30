const Command = require("../base/Command.js");
const Discord = require("discord.js");
const jimp = require("jimp");

class Gay extends Command {
    constructor(client) {
        super(client, {
            name: "gay",
            description: "ur mom gey",
            category: "Image :art:",
            usage: "gay [mention]",
            aliases: []
        });
    }

    async run(message, args, level) {
      
        let link;
        let image = await jimp.read("https://cdn.glitch.com/c417d43a-dea9-49f0-b094-d147a801e4f6%2Fgay.png?1524872809053");
        let avatar = await jimp.read(message.mentions.users.first() ? message.mentions.users.first().avatarURL : message.author.avatarURL);
        
        image.opacity(0.35);
        image.resize(jimp.AUTO, 350);
        
        avatar.resize(350, 350);
        avatar.composite(image, 0, 0);
      
        avatar.getBuffer(jimp.MIME_PNG, (err, image) => {
            message.channel.send({ files: [{ attachment: image, name: `gay.png` }] });
        })
        
    }
}

module.exports = Gay;
