const Command = require("../base/Command.js");
const Discord = require("discord.js");
const gm = require('gm').subClass({ imageMagick: true });
const sf = require('snekfetch');

class Majik extends Command {
    constructor(client) {
        super(client, {
            name: "majik",
            description: "majikal.",
            category: "Image :art:",
            usage: "majik [mention]",
            aliases: ["magic", "magik"]
        });
    }

    async run(message, args, level) {
        let link;  
      
        if(message.mentions.users.first()) {
            link = message.mentions.users.first().avatarURL
        } else if(args.length > 0) {
            link = args[0] 
        } else {
            link = message.author.avatarURL 
        }

        let data = await sf.get(link).catch()
        if (data.status !== 200) { return console.log(data.status) }
      
        gm(data.body).out('convert', '-liquid-rescale', '180%', '-liquid-rescale', '60%').toBuffer('PNG', (err, buffer) => {
            message.channel.send({ files: [{ attachment: buffer, name: `majik.png` }] });
        })
    }
}

module.exports = Majik;
