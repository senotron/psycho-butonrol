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
  
  
  
  
  
     if(interaction.isSelectMenu()){
       if(interaction.customId !== 'reaction-roles') return;
       await interaction.deferReply({ephemeral:true})
       const roleId = interaction.values[0];
       const role = interaction.guild.roles.cache.get(roleId)
       const memberRole = interaction.member.roles;
       
       const hasRole = memberRole.cache.has(roleId);

       if(hasRole){
         memberRole.remove(roleId);
         interaction.followUp({content:`**${role.name}** rolü senden alındı`, ephemeral:true})
       }else {
        memberRole.add(roleId);
        interaction.followUp({content:`**${role.name}** rolü verildi`, ephemeral:true})
       }
     }
  
  
  
  
    if (interaction.isButton()){

      const {guild, member, customId, channel} = interaction;


      if(customId == "1buton"){


      }
    
    } 
};

