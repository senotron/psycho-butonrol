const { MessageEmbed, Permissions, Client, CommandInteraction } = require("discord.js");
const model = require("../models/ban")
module.exports = {
    name:"Ban",
    description: 'Kullanıcıyı Sunucudan Uzaklaştırır',
    type:1,
    options: [
        {
            name:"user",
            description:"Yasaklanıcak Kullanıcıyı Seçin",
            type:6,
            required:true
        },
        {
            name:"reason",
            description:"Hangi Sebepten dolayı yasaklanıcak?",
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
        const data = await model.findOne({ guildID: interaction.guild.id }) || null;

       const banRol = data ? data.roleID : null;

       if(
           interaction.member.roles.cache.has(banRol) ||
           interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
           
        )
        {
           
            const user = interaction.options.getMember('user')
            const sebep = interaction.options.getString('reason')

            if(user.id == interaction.member.id) return interaction.reply({content:"Kendini Yasaklayamazsın",ephemeral:true})
            if(user.id == client.user.id) return interaction.reply({content:"Kendimi Yasaklayamam",ephemeral:true})
            if(user.id == interaction.guild.ownerID) return interaction.reply({content:"Sevgili Sunucu Sahibini Yasaklayamazsın",ephemeral:true})
            if(user.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({content:"Bu Kullanıcıyı Yasaklayamazsın",ephemeral:true})
            if(user.roles.cache.has(banRol)) return interaction.reply({content:"Bunu Ban yetkilisi üzerinde yapamazsın",ephemeral:true})

            try{
    
            
            await interaction.guild.bans.fetch(id)
            .then(() => { interaction.reply("Bu Kullanıcı zaten yasaklanmış"); })
            }
        
        catch{
                user.ban({reason: sebep});
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