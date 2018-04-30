const Command = require("../base/Command.js");
const Discord = require("discord.js")

class Thonk extends Command {
    constructor(client) {
        super(client, {
            name: "thonk",
            description: "Hmmmm...",
            category: "Fun :tada:",
            usage: "thonk",
            aliases: ["think", "thinking"]
        });
    }

    async run(message, args, level) {
        let thonk = ["https://cdn.glitch.com/b60de225-1db0-4dd3-a7cf-5a574c2cdd7e%2Ftumblr_p1k3vwUCUT1uvnk2eo1_400.gif?1524456062610", "https://cdn.glitch.com/b60de225-1db0-4dd3-a7cf-5a574c2cdd7e%2Fgiphy.gif?1524456052859", "https://cdn.glitch.com/b60de225-1db0-4dd3-a7cf-5a574c2cdd7e%2Fq80khzx7n8d01.gif?1524456042171", "https://cdn.glitch.com/b60de225-1db0-4dd3-a7cf-5a574c2cdd7e%2Fbz90kannldyz.gif?1524329207955", "https://cdn.glitch.com/b60de225-1db0-4dd3-a7cf-5a574c2cdd7e%2F1500520419082.gif?1524329340859", "https://cdn.glitch.com/749ef226-54e6-428b-b365-23f2bed718c6%2Ftenor%20(5).gif?1523496441553", "https://cdn.glitch.com/749ef226-54e6-428b-b365-23f2bed718c6%2Ftenor%20(3).gif?1523496402147", "https://cdn.glitch.com/749ef226-54e6-428b-b365-23f2bed718c6%2Ftenor%20(2).gif?1523496364354", "https://cdn.glitch.com/749ef226-54e6-428b-b365-23f2bed718c6%2Ftenor%20(1).gif?1523496341735", "https://cdn.glitch.com/749ef226-54e6-428b-b365-23f2bed718c6%2Ftenor.gif?1523496321294", "https://cdn.glitch.com/06a22cb5-7b77-41f0-b0f3-b13233c0f687%2Fthinking-Bk8oiso2-.gif?1521854878070", "https://cdn.glitch.com/06a22cb5-7b77-41f0-b0f3-b13233c0f687%2FEEs0cli.gif?1522287127418", "https://cdn.glitch.com/06a22cb5-7b77-41f0-b0f3-b13233c0f687%2FzXAA3CV.gif?1522287155860", "https://cdn.glitch.com/06a22cb5-7b77-41f0-b0f3-b13233c0f687%2FmhoXGgs.gif?1522287168163", "https://cdn.glitch.com/06a22cb5-7b77-41f0-b0f3-b13233c0f687%2Fh9yjazx9cycz.gif?1522287191880", "https://cdn.glitch.com/06a22cb5-7b77-41f0-b0f3-b13233c0f687%2F36acvwgce6wz.gif?1522287215303", "https://cdn.glitch.com/06a22cb5-7b77-41f0-b0f3-b13233c0f687%2F7qttfnm.gif?1522287260521", "https://cdn.glitch.com/06a22cb5-7b77-41f0-b0f3-b13233c0f687%2F589690r.gif?1522287286872", "https://cdn.glitch.com/06a22cb5-7b77-41f0-b0f3-b13233c0f687%2Fu31iyldlphpz.gif?1522287315325", "https://cdn.glitch.com/06a22cb5-7b77-41f0-b0f3-b13233c0f687%2F9I2Qh6t.gif?1522287369882"];
        const embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setImage(thonk[Math.floor(Math.random() * thonk.length)])
        message.channel.send({
            embed
        });
    }
}

module.exports = Thonk;
