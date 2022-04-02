const { MessageEmbed, Permissions, Client, CommandInteraction } = require("discord.js");
const model = require("../models/kick")
module.exports = {
    name:"kick",
    description: 'Kullanıcıyı Sunucudan Atar',
    type:1,
    options: [
        {
            name:"user",
            description:"Atılacak Kullanıcıyı Seçin",
            type:6,
            required:true
        },
        {
            name:"reason",
            description:"Hangi nedenden dolayı atılacka",
            type:3,
            required:true
        }
    ],
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
    run: async (client, interaction) => {
        const data = await model.findOne({ guildID: interaction.guild.id }) || null;

       const banRol = data ? data.roleID : null;

       if(
           interaction.member.roles.cache.has(banRol) ||
           interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)
           
        )
        {
           
            const user = interaction.options.getMember('user')
            const reason = interaction.options.getMember('reason')

            if(user.id == interaction.member.id) return interaction.reply({content:"Kendini Atamazsın",ephemeral:true})
            if(user.id == client.user.id) return interaction.reply({content:"Kendimi Atamam",ephemeral:true})
            if(user.id == interaction.guild.ownerID) return interaction.reply({content:"Sevgili Sunucu Sahibini Atamazsın",ephemeral:true})
            if(user.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({content:"Bu Kullanıcıyı atamazsın",ephemeral:true})
            if(user.roles.cache.has(banRol)) return interaction.reply({content:"Bunu kick yetkilisi üzerinde yapamazsın",ephemeral:true})

            try{
    
            
            interaction.guild.members.fetch(id)
            .then(() => { interaction.reply({embeds:[{description:"Bu Kullanıcı zaten bu sunucda yok"}]}); })
            }
        
        catch{
                await user.kick(reason);
                const embed = new MessageEmbed()
                .setAuthor({name:interaction.member.user.tag,iconURL:interaction.member.user.avatarURL({dynamic:true})})
                .setDescription(`<@!${user.id}> isimli kullanıcı yasaklandı`)
                .setColor("RED");
                interaction.reply({embeds:[embed]});
        
        }
    }
    else
       return interaction.reply({content:"Bu komutu kullanmak için yetkiniz yok",ephemeral:true});
           
}
};