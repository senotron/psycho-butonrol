const { 
  Client, 
  CommandInteraction, 
  ButtonInteraction, 
  MessageEmbed, 
  MessageButton, 
  MessageActionRow, 
  Collection 
} = require("discord.js");
const fs = require("fs");
const config = require("../settings/config.json");

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction | ButtonInteraction} interaction 
 */
module.exports = async (client, interaction) => {
  try {
    // Komut işlemi
    if (interaction.isCommand()) {
      fs.readdir("./komutlar/", (err, files) => {
        if (err) throw err;

        files.forEach(async (file) => {
          const command = require(`../komutlar/${file}`);
          if (interaction.commandName.toLowerCase() === command.name.toLowerCase()) {
            await command.run(client, interaction);
          }
        });
      });
    }

    // Buton işlemi
    if (interaction.isButton()) {
      const { guild, member, customId } = interaction;

      if (customId === "1buton") {
        await handleRoleToggle(
          interaction, 
          config.butonrol1, 
          `**${config.buton1isim}** rolü`
        );
      } 

      if (customId === "2buton") {
        await handleRoleToggle(
          interaction, 
          config.butonrol2, 
          `**${config.buton2isim}** rolü`
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
};

/**
 * Rol ekleme veya kaldırma işlevi
 * @param {ButtonInteraction} interaction 
 * @param {string} roleId 
 * @param {string} roleName 
 */
async function handleRoleToggle(interaction, roleId, roleName) {
  const role = interaction.guild.roles.cache.get(roleId);
  const memberRoles = interaction.member.roles;

  if (!role) {
    return interaction.reply({ content: `Rol bulunamadı: ${roleName}`, ephemeral: true });
  }

  if (memberRoles.cache.has(roleId)) {
    await memberRoles.remove(roleId);
    interaction.reply({ content: `${roleName} senden alındı.`, ephemeral: true });
  } else {
    await memberRoles.add(roleId);
    interaction.reply({ content: `${roleName} verildi.`, ephemeral: true });
  }
}
