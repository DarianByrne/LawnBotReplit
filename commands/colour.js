const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.guild.available) return;
  const embed = new Discord.MessageEmbed()
    .setColor(client.config.embedColorNegative)
    .setDescription("Changed your colour.");

  position = message.guild.roles.cache.find(value => value.id === client.config.colorRoleId).position;
  colorRole = message.member.roles.cache.find(value => value.name === client.config.colorRoleName);

  const argFilter = ["reset", "clear", "none"];
  const hexFilter = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex) || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(`#${hex}`);

  if (!argFilter.includes(args[0]) && !hexFilter(args[0])) {
    embed.setDescription("You need to provide a hex code or specify to clear your colour.")
    return message.channel.send({ embed: embed })
  };

  if (colorRole === undefined) {
    if (argFilter.includes(args[0])) return;
    message.guild.roles.create({
      data: {
        name: client.config.colorRoleName,
        color: args[0],
        position: position
      }
    })
      .then(role => {
        message.member.roles.add(role);
        embed.setColor(role.color);
        message.channel.send({ embed: embed });
      })
      .catch(console.error);
  } else if (argFilter.includes(args[0])) {
    colorRole.delete()
      .then(role => {
        message.channel.send({ embed: embed })
      })
      .catch(console.error);
  } else {
    colorRole.edit({ color: args[0] })
      .then(role => {
        embed.setColor(role.color);
        message.channel.send({ embed: embed });
      })
      .catch(console.error);
  }
}
