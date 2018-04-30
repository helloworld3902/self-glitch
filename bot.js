if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const Discord = require("discord.js");
const {
    promisify
} = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const klaw = require("klaw");
const path = require("path");

class GuideBot extends Discord.Client {
    constructor(options) {
        super(options);

        this.config = require("./config.js");

        this.commands = new Enmap();
        this.aliases = new Enmap();

        this.settings = new Enmap({
            provider: new EnmapLevel({
                name: "settings"
            })
        });

        this.logger = require("./util/Logger");
    }

    permlevel(message) {
        let permlvl = 0;

        const permOrder = this.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

        while (permOrder.length) {
            const currentLevel = permOrder.shift();
            if (message.guild && currentLevel.guildOnly) continue;
            if (currentLevel.check(message)) {
                permlvl = currentLevel.level;
                break;
            }
        }
        return permlvl;
    }

    loadCommand(commandPath, commandName) {
        try {
            const props = new(require(`${commandPath}${path.sep}${commandName}`))(this);
            this.logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
            props.conf.location = commandPath;
            if (props.init) {
                props.init(this);
            }
            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                this.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    }

    async unloadCommand(commandPath, commandName) {
        let command;
        if (this.commands.has(commandName)) {
            command = this.commands.get(commandName);
        } else if (this.aliases.has(commandName)) {
            command = this.commands.get(this.aliases.get(commandName));
        }
        if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

        if (command.shutdown) {
            await command.shutdown(this);
        }
        delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
        return false;
    }

    getSettings(id) {
        const defaults = this.settings.get("default");
        let guild = this.settings.get(id);
        if (typeof guild != "object") guild = {};
        const returnObject = {};
        Object.keys(defaults).forEach((key) => {
            returnObject[key] = guild[key] ? guild[key] : defaults[key];
        });
        return returnObject;
    }

    writeSettings(id, newSettings) {
        const defaults = this.settings.get("default");
        let settings = this.settings.get(id);
        if (typeof settings != "object") settings = {};
        for (const key in newSettings) {
            if (defaults[key] !== newSettings[key]) {
                settings[key] = newSettings[key];
            } else {
                delete settings[key];
            }
        }
        this.settings.set(id, settings);
    }
}

const client = new GuideBot();
console.log(client.config.permLevels.map(p => `${p.level} : ${p.name}`));

require("./modules/functions.js")(client);

const init = async () => {

    klaw("./commands").on("data", (item) => {
        const cmdFile = path.parse(item.path);
        if (!cmdFile.ext || cmdFile.ext !== ".js") return;
        const response = client.loadCommand(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
        if (response) client.logger.error(response);
    });

    const evtFiles = await readdir("./events/");
    client.logger.log(`Loading a total of ${evtFiles.length} events.`, "log");
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        const event = new(require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args)); // affinix = code is not running
        delete require.cache[require.resolve(`./events/${file}`)];
    });

    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }

    client.login(client.config.token);
};

init();

client.on("disconnect", () => client.logger.warn("Bot is disconnecting..."))
    .on("reconnect", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", e => client.logger.error(e))
    .on("warn", info => client.logger.warn(info));
