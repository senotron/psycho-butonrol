const { Client } = require('discord.js');
const client = new Client({
	intents: 519
});
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v9");
const token = "Discord Bot Token";


global.client = client;
client.commands = (global.commands = []);

fs.readdir("./komutlar/", (err, files) => {
	if (err) throw err;

	files.forEach((file) => {
		if (!file.endsWith(".js")) return;
		let props = require(`./komutlar/${file}`);

		client.commands.push({
			name: props.name.toLowerCase(),
			description: props.description,
			options: props.options,
			type: props.type,
		})
	});
});

fs.readdir("./events/", (_err, files) => {
	files.forEach((file) => {
		if (!file.endsWith(".js")) return;
		const event = require(`./events/${file}`);
		let eventName = file.split(".")[0];

		client.on(eventName, (...args) => {
			event(client, ...args);
		});
	});
});

client.on("ready", async () => {

	console.log("Bot Hazır! By senotron");
	client.user.setActivity("https://youtube.com/@s3notron", {
		type: "WATCHING"
	});
	const rest = new REST({
		version: "9"
	}).setToken(token);
	try {
		await rest.put(Routes.applicationCommands(client.user.id), {
			body: client.commands,
		});

	} catch (error) {
		console.error(error);
	}
});
client.login(token);
