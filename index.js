// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const keepAlive = require('./server');
const path = require('path');
const talkedRecently = new Set();
// const moment = require('moment');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const appCommandFiles = fs.readdirSync('./commands/application').filter(file => file.endsWith('.js'));
const guildCommandFiles = fs.readdirSync('./commands/guild').filter(file => file.endsWith('.js'));

for (const file of appCommandFiles) {
  const command = require(`./commands/application/${file}`);
  client.commands.set(command.data.name, command);
}
for (const file of guildCommandFiles) {
  const command = require(`./commands/guild/${file}`);
  client.commands.set(command.data.name, command);
}

let json = null
let terminos = []
client.once('ready', () => {
  json = fs.readFileSync("./assets/framedata.json", 'utf8');
  json = JSON.parse(json);
  Object.keys(json.Glosario).forEach(function (key) {
    terminos.push(key);
  })
  console.log('Ready!');
});
client.on('interactionCreate', async autocomplete => {
	if (!autocomplete.isAutocomplete()) return;
  // console.log(autocomplete.commandName)
	if (autocomplete.commandName === 'diccionario') {
    let currentOption = autocomplete.options.getFocused(true);
    let currentName = currentOption.name;
    let currentValue = currentOption.value;

    const options = [];
    if (currentName === "termino") {
      terminos.forEach((termino) => {
        if (termino.toLowerCase().includes(currentValue.toLowerCase())) {
          let charObj = {}
          charObj["name"] = termino;
          charObj["value"] = termino;
          if (options.length < 25) {
            options.push(charObj);
          }
        }
      })
    }
    const termino = autocomplete.options.getString('termino')
		await autocomplete.respond(options); 
	}
});
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;
  
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});
client.on("ready", () => {
  // if (client.shard.id == 0)
        // console.log(`-- ${moment().utc().format('MMMM Do')}, ${moment().utc().format('hh:mm a')} --`);

  // console.log(`Shard ${client.shard.id} ready!`);
  console.log(`Hi, ${client.user.username} is now online and used in ${client.guilds.cache.size} servers.`);

  client.user.setPresence({
    status: "online",
    activities: [{
      name: 'a lo loco? Usa /diccionario para aclarar tus dudas.'
    }],
  }); 
});
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));
client.on('rateLimit', (info) => {
  console.log(`Rate limit hit ${info.timeDifference ? info.timeDifference : info.timeout ? info.timeout: 'Unknown timeout '}`)
})
// Keep bot alive.
keepAlive();
// setInterval(keepAlive, 1000 * 60 * 60);
// setInterval(keepAlive, 5000);
// Login to Discord with your client's token.
const token = process.env['DISCORD_TOKEN']
client.login(token);
