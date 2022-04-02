const { MessageEmbed,Client,CommandInteraction,Permissions } = require("discord.js");
const model = require("../models/kick")
module.exports = {
    name:"kivk-sistem",
    description: 'Kick sistemini ayarlar',
    type:1,
    options:[
        {
          name:"ayarla",description:"Kick sistemi ayarlar",type:1,options:[
            {
                name:"rol",
                description:"Kick Yetilisi Rolü (UNUTMA! Bu role sahip kişiler üyeleri at yetkisine sahip olucak!)",
                type:8,
                required:true
            }
          ]
        },
        {
            name:"sıfırla",
            description:"Kick sistemi sıfırlar",
            type:1
        }
        
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {  

        if(!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
        return interaction.reply({content:"Bu komutu kullanmak için yetkin yok",ephemeral:true})

        let durum = interaction.options.getSubcommand();

        if(durum == "ayarla"){
            let rol = interaction.options.getRole("rol");
          
             await model.findOneAndUpdate({ guildID: interaction.guild.id }, { $set: { roleID: rol.id, KickSystem:true } }, { upsert: true })
             .then(() => {
                    interaction.reply({content:"Kick sistemi başarıyla ayarlandı"})
             })
             .catch(err => {
                    console.log(err)
                    interaction.reply({content:"KickSystem sistemi ayarlanırken bir hata oluştu"})
             })
             return;
        }
        else if(durum == "sıfırla"){
            const { KickSystem } = await model.findOne({ guildID: interaction.guild.id }) || { KickSystem: false };
            if (!KickSystem) return interaction.reply({content:"Kick sistemi zaten kapalı",ephemeral:true});

            await model.findOneAndUpdate({ guildID: interaction.guild.id }, { $set: { KickSystem:false, roleID: null } }, { upsert: true })
             .then(() => {
                    interaction.reply({content:"Kick sistemi başarıyla kapatıldı"})
             })
             .catch(err => {
                    console.log(err)
                    interaction.reply({content:"Kick sistemi ayarlanırken bir hata oluştu"})
             })

             return;
        }
       
        
}
};