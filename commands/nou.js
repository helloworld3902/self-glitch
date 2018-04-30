const Command = require("../base/Command.js");

class Nou extends Command {
    constructor(client) {
        super(client, {
            name: "nou",
            description: "Deflect any message.",
            category: "Fun :tada:",
            usage: "nou"
        });
    }

    async run(message, args, level) {
        await message.react("🇳");
        await message.react("🇴");
        await message.react("🇺");
        await message.react("🖕")
            .then(m => {
                setTimeout(function () {
                    m.remove()
                }, 750);
            });
    }
}

module.exports = Nou;
