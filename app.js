const {Client} = require('discord.js');
const client = new Client({intents:519});
const fs = require('fs');
const db = require('mongoose');
const {REST} = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v10");
const token = "MTA1NTEwNTU1ODkxMjQ1MDY2Mw.GrbDGp.zMBtDt-_P42frvNCFRLH6LKlFbUU9M0lIILBIs";


global.client = client;
client.commands = (global.commands = []);
//#region KOMUTLAR LOAD
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
        console.log(`👌 Slash Komut Yüklendi: ${props.name}`);
    });
});
//#endregion
//#region EVENTS LOAD
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        
        console.log(`👌 Event yüklendi: ${eventName}`);
        client.on(eventName, (...args) => {
           event(client, ...args);
        });
    });
});
//#endregion
//#region KOMUTLAR SET
client.on("ready",async () => {

    console.log("Bot Hizmete Hazır!");
    client.user.setActivity("PsychoPath#7992", {type:"WATCHING"});
    const rest = new REST({ version: "10" }).setToken(token);
    try {
      await rest.put(Routes.applicationCommands(client.user.id), {
        body: client.commands,
      });
    
    } catch (error) {
      console.error(error);
    }
});
//#endregion
client.login(token);