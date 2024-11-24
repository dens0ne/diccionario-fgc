const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('creditos')
    .setDescription('Muestra lista de contribuidores al proyecto'),
  async execute(interaction) {
    const embed = new MessageEmbed()
          .setColor('#0x1a2c78')
          .setTitle('Gracias a ti por utilizar el bot. Y tambien a...')
          // .setAuthor({ name: 'Feel free to reach out if you want to help this become a better tool. For now, we want to say:', iconURL: 'https://cdn.discordapp.com/app-icons/946480362245206028/7387b282160ebc16b18098635dd1682f.png', url: 'https://discord.gg/fPyTMgpR4X' })
          .addFields(
          )
          .setFooter({ text: 'Tienes retroalimentacion? Unete al servidor: https://discord.gg/qkSKj8NRac', iconURL: 'https://cdn.iconscout.com/icon/free/png-128/discord-3-569463.png' });
    const contributors = {
      'Mattakiller': 'Desarrollador',
      'Jacki3Chun': 'Desarropllador',
      'Jeaguer (Señor Topo)': 'Proveedor de GIFs',
      'Ninieru': 'Fuente de informacion'
    };
    for (const contributor in contributors) {
      const role = contributors[contributor];
       embed.addField(contributor, role, false);
    }

    return interaction.reply({embeds: [embed]});
  },
};
