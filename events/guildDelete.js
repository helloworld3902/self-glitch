// This event executes when a new guild (server) is left.
const DBL = require("dblapi.js");
const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwNTEzODIzMzMwMzg5MjAyNyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTIwOTEwMjA0fQ.vIatriH9Lan8iF7yXff19LOzgrYYF_88Smso4Z-YU8w");

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(guild) {
        this.client.user.setActivity("lies to " + (this.client.guilds.size) + " guilds.", {
            url: "https://twitch.tv/#",
            type: "STREAMING"
        });
        this.client.user.setUsername("Magic 8 Ball")
        this.client.user.setAvatar("https://cdn.glitch.com/06a22cb5-7b77-41f0-b0f3-b13233c0f687%2F8ball.png?1521087510832")
        dbl.postStats(this.client.guilds.size);
        this.client.settings.delete(guild.id);
        this.client.logger.log(`Left guild: ${guild.name} (${guild.id}) with ${guild.memberCount} members`);
    }
};
