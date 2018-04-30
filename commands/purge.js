const Command = require("../base/Command.js");
const Discord = require("discord.js")

class Purge extends Command {
    constructor(client) {
        super(client, {
            name: "purge",
            description: "Deletes a number of messages.",
            usage: "purge [number]",
            category: "Moderation :hammer:",
            permLevel: "Moderator",
            guildOnly: true
        });
    }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
        let deletePerms = message.guild.member(this.client.user).hasPermission('MANAGE_MESSAGES');
        let amount = args[0]
        if(!deletePerms) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`I don't have the permission to do that.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({ embed })
        }

        if(!amount) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`You're supposed to enter a number, dummy.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({ embed })
        }
    
        if(isNaN(amount)) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`That's not a number, dummy.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({ embed })
        }

        amount = parseInt(amount);

        if(amount < 2) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`Stop being lazy and do it yourself.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({ embed })
        }

        if(amount > 100) {
            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`I'm not your slave, I can't do more than 100.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            return message.channel.send({ embed })
        }

        if (message.deletable) message.delete()

        message.channel.fetchMessages({
            limit: amount
        }).then(m => {
            m.forEach(msg => {
                if(msg.deletable) msg.delete();
            })

            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`Okay I deleted ${amount} messages, thank me later.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            message.channel.send({ embed }).then(msg => {
                msg.delete(2000);
            });
        })
    }
}

module.exports = Purge;
