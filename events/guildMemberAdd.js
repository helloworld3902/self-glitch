// This event executes when a new member joins a server. Let's welcome them!
const Discord = require("discord.js")

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(member) {
    
  // Load the guild's settings
    const settings = this.client.getSettings(member.guild.id);
  
    // If welcome is off, don't proceed (don't welcome the user)
    if (settings.welcomeEnabled !== "true") return;

    // Replace the placeholders in the welcome message with actual data
    const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

    const embed = new Discord.RichEmbed()
        .setColor(0xa6ff4d)
        .setTitle("Welcome")
        .setDescription(welcomeMessage)
        .setTimestamp()
        .setFooter("Member Joined", "https://cdn.discordapp.com/attachments/409519602301796352/409519694517895178/check.png")

    // Send the welcome message to the welcome channel
    // There's a place for more configs here.
    member.guild.channels.find("name", settings.welcomeChannel).send({ embed }).catch(console.error);
  }
};
