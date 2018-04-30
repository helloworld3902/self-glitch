const Command = require("../base/Command.js");
const Discord = require("discord.js");
const gm = require('gm').subClass({ imageMagick: true });
const sf = require('snekfetch');

class Warp extends Command {
    constructor(client) {
        super(client, {
            name: "warp",
            description: "Warps images.",
            category: "Image :art:",
            usage: "warp [mention]",
            aliases: []
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
      
        gm(data.body).implode(`-${getRandomInt(3, 15)}`).roll(`+${getRandomInt(0, 256)}+${getRandomInt(0, 256)}`).swirl(`${getRandomInt(0, 1) === 1 ? '+' : '-'}${getRandomInt(120, 180)}`).toBuffer('PNG', (err, buffer) => {
            message.channel.send({ files: [{ attachment: buffer, name: `warp.png` }] });
        })
      
        function getRandomInt (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
    }
}

module.exports = Warp;
