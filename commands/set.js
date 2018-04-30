const Command = require("../base/Command.js");
const Discord = require("discord.js")

class Set extends Command {
    constructor(client) {
        super(client, {
            name: "set",
            description: "View or change settings for your server.",
            category: "System :wrench:",
            usage: "set <view/get/edit> <key> <value>",
            guildOnly: true,
            aliases: ["setting", "settings"],
            permLevel: "Administrator"
        });
    }

    async run(message, [action, key, ...value], level) { // eslint-disable-line no-unused-vars

        const settings = message.settings;
        const defaults = this.client.settings.get("default");

        if (action === "edit") {
            if (!key) {
                let embed = new Discord.RichEmbed()
                    .setColor(0x000000)
                    .setAuthor(`Please specify a key to edit.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

                return message.channel.send({ embed })
            }

            if (!settings[key]) {
                let embed = new Discord.RichEmbed()
                    .setColor(0x000000)
                    .setAuthor(`This key does not exist in the settings`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

                return message.channel.send({ embed })
            }

            if (value.length < 1) {
                let embed = new Discord.RichEmbed()
                    .setColor(0x000000)
                    .setAuthor(`Please specify a new value`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

                return message.channel.send({ embed })
            }

            settings[key] = value.join(" ");

            this.client.settings.set(message.guild.id, settings);

            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`${key} successfully edited to ${value.join(" ")}`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            message.channel.send({ embed })

        } else

        if (action === "del" || action === "reset") {
            if (!key) {
                let embed = new Discord.RichEmbed()
                    .setColor(0x000000)
                    .setAuthor(`Please specify a key to delete (reset).`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

                return message.channel.send({ embed })
            }

            if (!settings[key]) {
                let embed = new Discord.RichEmbed()
                    .setColor(0x000000)
                    .setAuthor(`This key does not exist in the settings`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

                return message.channel.send({ embed })
            }

            const response = await this.client.awaitReply(message, `Are you sure you want to reset \`${key}\` to the default \`${defaults[key]}\`?`);

            if (["y", "yes"].includes(response)) {

                delete settings[key];
                this.client.settings.set(message.guild.id, settings);

                let embed = new Discord.RichEmbed()
                    .setColor(0x000000)
                    .setAuthor(`${key} was successfully reset to default.`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

                message.channel.send({ embed })

            } else

            if (["n", "no", "cancel"].includes(response)) {

                let embed = new Discord.RichEmbed()
                    .setColor(0x000000)
                    .setAuthor(`Your setting for \`${key}\` remains at \`${settings[key]}\``, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

                message.channel.send({ embed })
            }
        } else

        if (action === "get") {
            if (!key) {
                let embed = new Discord.RichEmbed()
                    .setColor(0x000000)
                    .setAuthor(`Please specify a key to view`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

                return message.channel.send({ embed })
            }

            if (!settings[key]) {
                let embed = new Discord.RichEmbed()
                    .setColor(0x000000)
                    .setAuthor(`This key does not exist in the settings`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

                return message.channel.send({ embed })
            }

            let embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor(`The value of ${key} is currently ${settings[key]}`, "https://cdn.discordapp.com/attachments/409519602301796352/416481679931342871/347275c507c587df.png");

            message.channel.send({ embed })

        } else {
            const array = [];
            Object.entries(settings).forEach(([key, value]) => {
                array.push(`**${key.toProperCase()}** » ${value}`);
            });

            const embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor("Current guild settings", this.client.user.avatarURL)
                .setDescription(array.join("\n"))

            message.channel.send({ embed })
        }
    }
}

module.exports = Set;