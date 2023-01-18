const {CLient, CommandInteraction, ButtonInteraction, MessageEmbed, MessageButton, MessageActionRow, Collection} = require("discord.js");
const fs = require("fs");

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
module.exports = async (client, interaction) => {
    if (interaction.isCommand()){
    try {
      fs.readdir("./komutlar/", (err, files) => {
        if (err) throw err;

        files.forEach(async (f) => {
          const command = require(`../komutlar/${f}`);
          if (
            interaction.commandName.toLowerCase() === command.name.toLowerCase()
          ) {
            return command.run(client, interaction);
          }
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
  
  

         
        if (interaction.isButton()){

      const {guild, member, customId, channel} = interaction;
      const {butonrol1,buton1isim,butonrol2,buton2isim} = require("../psychoconf/config.json");


      if(customId == "1buton"){

       const role = interaction.guild.roles.cache.get(butonrol1)
       const memberRole = interaction.member.roles;
       
       const hasRole = memberRole.cache.has(butonrol1);

       if(hasRole){
         memberRole.remove(butonrol1);
         interaction.reply({content:`**${role}** rolü senden alındı`, ephemeral:true})
       }else {
        memberRole.add(butonrol1);
        interaction.reply({content:`**${role}** rolü verildi`, ephemeral:true})
       }
     }
          
                if(customId == "2buton"){

       const role = interaction.guild.roles.cache.get(butonrol2)
       const memberRole = interaction.member.roles;
       
       const hasRole = memberRole.cache.has(butonrol2);

       if(hasRole){
         memberRole.remove(butonrol2);
         interaction.reply({content:`<${role}** rolü senden alındı`, ephemeral:true})
       }else {
        memberRole.add(butonrol2);
        interaction.reply({content:`**${role}** rolü verildi`, ephemeral:true})
       }
     }
          
          
          
          
      }
};

