// This event executes when a new guild (server) is joined.
const DBL = require("dblapi.js");
const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwNTEzODIzMzMwMzg5MjAyNyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTIwOTEwMjA0fQ.vIatriH9Lan8iF7yXff19LOzgrYYF_88Smso4Z-YU8w");
const Discord = require("discord.js")

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(guild, message, args, level) {
        this.client.user.setActivity("lies to " + (this.client.guilds.size) + " guilds.", {
            url: "https://twitch.tv/#",
            type: "STREAMING"
        });
        this.client.user.setUsername("Magic 8 Ball")
        this.client.user.setAvatar("https://cdn.glitch.com/06a22cb5-7b77-41f0-b0f3-b13233c0f687%2F8ball.png?1521087510832")
        dbl.postStats(this.client.guilds.size);
        this.client.logger.log(`New guild has been joined: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members`);
      
        this.client.settings.set(guild.id, this.client.config.defaultSettings);
        const embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setAuthor("Thanks for adding me!", this.client.user.avatarURL)
            .addField("So... What do I do?", "You can do `;help` to get an overview on all commands. To get aliases and usage use `;help command-name`.")
            .addField("Spread the word!", ":question: Invite: http://8ball.gq/invite\n:question: Vote: http://8ball.gq/vote")
            .setImage("https://cdn.glitch.com/c417d43a-dea9-49f0-b094-d147a801e4f6%2Fthumbnail.png?1524803407413")
        guild.channels.find("name", "general").send({ embed }).catch(console.error);
    }
};
