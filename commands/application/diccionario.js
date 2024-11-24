const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('diccionario')
    .setDescription('Comando para buscar terminos especificos utilizados en la fgc y regresa su significado/definicion')
    .addStringOption(termino =>
  		termino.setName('termino')
        .setAutocomplete(true)
  			.setDescription('Termino a buscar')
  			.setRequired(true)),
     async execute(interaction) {
    const termino = interaction.options.getString('termino');
        // Load frame data json.
    fs.readFile("./assets/framedata.json", "utf8", (err, jsonObject) => {
      if (err) {
        // console.log("Error reading file from disk:", err);
        return interaction.reply('No se pudo encontrar el archivo del glosario');
      }
      try {
        let data = JSON.parse(jsonObject);
                // If character not found, exit.
        // if (data.hasOwnProperty(character) === false) {
        //   return interaction.reply('Could not find character: ' + character + '. Refer to the [Google sheet](https://docs.google.com/spreadsheets/d/16_x97bxQujwlDQvfk1UDlojX3uNKWto4oII6zuBtt7E/edit?usp=drivesdk) for available characters.');
        // }
        console.log(termino)
        // Retrieve all terms.
        let terminosJSON = []
        Object.keys(data.Glosario).forEach(function (key) {
          terminosJSON.push(key);
        })
        // console.log(data.Glosario[termino]);
        // console.log(terminosJSON);
        // console.log(termino);
        // If move not found, exit.
        if (terminosJSON.includes(termino) === false) {
          return interaction.reply('Termino: ' + termino + ' invalido.');
        }
        let termData = data.Glosario[termino];
        const definicion = (termData.ESP !== null) ? termData.ESP.toString() : '-';

        const embed = new MessageEmbed()
          .setColor('#0x1a2c78')
          .setTitle('El termino "' + termino + '"')
          // .setURL('https://www.snk-corp.co.jp/us/games/kof-xv/characters/characters_' + lowerCaseChar + '.php')
          // .setAuthor({ name: escapedTerms, iconURL: 'https://pbs.twimg.com/profile_images/1150082025673625600/m1VyNZtc_400x400.png', url: 'https://docs.google.com/spreadsheets/d/16_x97bxQujwlDQvfk1UDlojX3uNKWto4oII6zuBtt7E/edit?usp=drivesdk' })
          // .setDescription('Move input')
          // .setThumbnail('https://www.snk-corp.co.jp/us/games/kof-xv/img/main/top_slider' + charNo + '.png')
          .addFields(
            { name: 'Quiere decir...', value: definicion, inline: false },
            // { name: 'On hit', value: oh, inline: false },
            // { name: 'On block', value: ob, inline: false },
            // // { name: '\u200B', value: '\u200B' },
            // { name: 'Damage', value: dmg, inline: false },
            // { name: 'Stun', value: stun, inline: false },
            // // { name: '\u200B', value: '\u200B' },
            // { name: 'Block', value: hits, inline: false },
            // { name: 'Guard damage', value: guardDmg, inline: false },
            // // { name: '\u200B', value: '\u200B' },
            // { name: 'Notes', value: notes },
            { name: '\u200B', value: '\u200B' },
            // { name: 'Framedata Android app now available!', value: 'https://play.google.com/store/apps/details?id=com.framedata.fof' },
            // { name: 'Patch 1.62:', value: 'DONE!'},
            // { name: '\u200B', value: '\u200B' },
            // { name: 'Inline field title', value: 'Some value here', inline: true },
          )
          .setFooter({ text: 'Tienes retroalimentacion? Unete al servidor: https://discord.gg/qkSKj8NRac', iconURL: 'https://cdn.iconscout.com/icon/free/png-128/discord-3-569463.png' });
        // Conditionally set GIF if present.
        (termData.GIF !== null) ? embed.setImage(termData.GIF) : embed.addField('No se encontre GIF para este termino', 'Si cuentas con uno, compartelo en el servidor que encontraras en el link de abajo.', true);
        // Conditionally set move name if present.
        // (moveData.NAME !== null) ? embed.setDescription(moveData.NAME) : '';
        return interaction.reply({embeds: [embed]});
      } catch (err) {
        console.log("Error parsing JSON string:", err);
        return interaction.reply('Error al mandar solicitud, intente mas tarde.');
      }
    });
  },
};