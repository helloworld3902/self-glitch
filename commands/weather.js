const Command = require("../base/Command.js");
const Discord = require("discord.js");
const weather = require("weather-js");

class Weather extends Command {
    constructor(client) {
        super(client, {
            name: "weather",
            description: "Displays weather for a given place.",
            usage: "weather [location]",
            category: "Utility :gear:",
            permLevel: "User",
            guildOnly: false,
            aliases: []
        });
    }

    async run(message, args, level) {
        weather.find({
            search: args.join(" "),
            degreeType: "C"
        }, function (err, result) {
            if (err) return;
            if (result === undefined || result.length === 0) return;
            var current = result[0].current;
            var location = result[0].location;
            const weather = new Discord.RichEmbed()
                .setColor(0x000000)
                .setDescription(`Forecast: **${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageURL)
                .addField("Timezone", `UTC${location.timezone}`, true)
                .addField("Degree Type", location.degreetype, true)
                .addField("Temperature", `${current.temperature} degrees`, true)
                .addField("Feels Like", `${current.feelslike} degrees`, true)
                .addField("Winds", current.winddisplay, true)
                .addField("Humidity", `${current.humidity}%`, true)
            message.channel.send({
                embed: weather
            });
        });
    }
}

module.exports = Weather;
