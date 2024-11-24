const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ayuda')
    .setDescription('Describe como utilizar el bot'),
  async execute(interaction) {
    const embed = new MessageEmbed()
          .setColor('#0x1a2c78')
          .setTitle('Necesitas ayuda?')
          // .setAuthor({ name: 'KOF XV FrameBot', iconURL: 'https://cdn.discordapp.com/app-icons/946480362245206028/7387b282160ebc16b18098635dd1682f.png', url: 'https://discord.gg/fPyTMgpR4X' })
          .addFields(
            { name: 'Inicio', value: 'El bot provee un comando /diccionario el cual cuenta con un parametro "termino" el cual acepta una lista de terminos con autocompletado del cual uno selecciona la opcion para posteriormente recibir una definicion del termino.', inline: false },
          )
          // .setImage('https://media.giphy.com/media/5g5IdYOiHc4RosbyBn/giphy.gif')
          .setFooter({ text: 'Tienes retroalimentacion? Unete al servidor: https://discord.gg/qkSKj8NRac', iconURL: 'https://cdn.iconscout.com/icon/free/png-128/discord-3-569463.png' });  
        return interaction.reply({embeds: [embed]});
  },
};
