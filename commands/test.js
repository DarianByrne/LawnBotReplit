const Discord = module.require("discord.js");

module.exports.run = (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setColor(client.config.embedColor)
    .setDescription("Tested.");
  message.channel.send({ embed: embed});
}
