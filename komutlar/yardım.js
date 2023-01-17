const { MessageEmbed,Client,CommandInteraction,MessageActionRow,MessageButton,Permissions } = require("discord.js");
const {butonrol1,buton1isim,butonrol2,buton2isim} = require("./psychoconf/config.json");

module.exports = {
    name:"gönder",
    description: 'gönder',
    type:1,
    options:[ 
        {
            name:"açıklama",
            description:"Embed mesajın açıklaması",
            type:3,
            required:true
        },
       ],
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
    run: async (client, interaction) => {
            const {guild, options} = interaction;
            const description = options.getString("açıklama");
      
      
       const embed = new MessageEmbed()
                .setAuthor({
                    name:`${guild.name} | Butonlu Rol Alma`,
                    iconURL:guild.iconURL({dynamic:true})
                })
                .setDescription(description)
                .setColor("GREEN");
      
   const buton = new MessageActionRow().addComponents(
            new MessageButton().setCustomId("1buton").setLabel(`${buton1isim}`).setStyle("PRIMARY").setEmoji("1️⃣"),
            new MessageButton().setCustomId("2buton").setLabel(`${buton1isim}`).setStyle("PRIMARY").setEmoji("2️⃣"),
     )
}
};