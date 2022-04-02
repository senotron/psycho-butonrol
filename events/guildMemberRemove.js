const {MessageEmbed} = require("discord.js");
const model = require("../models/guild")
module.exports = async (_,member) =>{

        const { modlogChannel } = await model.findOne({ GuildID: member.guild.id }) || { modlogChannel: null };
        if (!modlogChannel) return;
      
        const channel = member.guild.channels.cache.get(modlogChannel);
        try{
          channel.send({
            embeds: [new MessageEmbed()
              .setAuthor({name:member.user.tag,iconURL: member.user.avatarURL()})
              .setDescription(`**${member}** adlı kullanıcı sunucudan ayrıldı!`)
              .setColor("#2ACAEA")
              .setFooter({text:`${member.guild.name}`})
              .setTimestamp()
            ]
          })
        }
        catch{
      
        }
}