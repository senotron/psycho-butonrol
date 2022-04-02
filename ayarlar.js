const { MessageEmbed,CommandInteraction,Client,Permissions } = require("discord.js");
const guildData = require("../models/guild");
const banData = require("../models/ban");
const kickData = require("../models/kick");
module.exports = {
    name:"ayarlar",
    description: 'Sunucu ayar Menüsü',
    type:1,
    options:[],
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
    
    run: async (client, interaction) => {

        let modlg;
        let banD;
        let kick;
        const {kfrEngel,lnkEngl,modlogChannel,kelimeEngl} = await guildData.findOne({ GuildID: interaction.guild.id }) || {kfrEngel:false,lnkEngl:false,modlogChannel:null,kelimeEngl:false};
        if(!modlogChannel) modlg = false;
        else modlg = true;

        

        const {BanSystem} = await banData.findOne({ GuildID: interaction.guild.id }) || {BanSystem:false};
        if(!BanSystem) banD = false; else banD = true;
        const {KickSystem} = await kickData.findOne({ GuildID: interaction.guild.id }) || {KickSystem:false};
        if(!KickSystem) kick = false; else kick = true;

        const embed = new MessageEmbed()
        .setTitle(`${interaction.guild.name} Sunucusu ayarları`)
        .addField("Ban Sistemi",banD ? "✅ Açık" : "❌ Kapalı",true)
        .addField("Kick Sistemi",kick ? "✅ Açık" : "❌ Kapalı",true)
        .addField("Küfür Engel Sistemi",kfrEngel ? "✅ Açık" : "❌ Kapalı",true)
        .addField("Kelime Engel Sistemi",kelimeEngl ? "✅ Açık" : "❌ Kapalı",true)
        .addField("Link Engel Sistemi",lnkEngl ? "✅ Açık" : "❌ Kapalı",true)
        .addField("Mod-Log Kanalı",modlg ? "✅ Ayarlanmış" : "❌ Kapalı",true)

        interaction.reply({embeds:[embed]});
    }
};