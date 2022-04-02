const { MessageEmbed,CommandInteraction,Client,Permissions } = require("discord.js");
module.exports = {
    name:"yardım",
    description: 'Yardım Menüsü',
    type:1,
    options:[],
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
    run: async (client, interaction) => {
        interaction.reply({embeds:[
            {
                title: "Gweep Creative Komutlar",
                description: "Gweep Creative Bot'un komutlarını gösterir",
                color: 0x00ff00,
                fields:[
                    {name: "/ayarlar", value: "Sunucu Ayarları", inline: true},
                    {name: "/ban", value: "Kullanıcıyı banlar", inline: true},
                    {name: "/ban-sistem", value: "Ban Sistemi", inline: true},
                    {name: "/unban", value: "Kullanıcıyı banını açar", inline: true},
                    {name: "/kick", value: "Kullanıcıyı Sunucudan atar", inline: true},
                    {name: "/kick-sistem", value: "Kick Sistemi", inline: true},
                    {name: "/küfür-engel", value: "Küfür Engelleme Sistemi", inline: true},
                    {name: "/kelime-engel", value: "Kelime Engelleme Sistemi", inline: true},
                    {name: "/link-engel", value: "Link Engelleme Sistemi", inline: true},
                    {name: "/nuke", value: "Kanalı yeniden oluşturur", inline: true},
                    {name: "/sil", value: "Belirtilen miktarda mesjaı siler", inline: true},
                    {name: "/mod-log", value: "Log mesjalarnın gideceği kanal", inline: true},

                ],
                thumbnail: {url: client.user.avatarURL({dynamic:true})},
            }
        ]});
}
};