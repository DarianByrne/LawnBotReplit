const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setColor(client.config.embedColor);
  if (!client.config.ownerID.includes(message.author.id)) { embed.setDescription("You're not an owner of the bot."); return message.channel.send({ embed: embed }); };
  if (!args.length > 0) {
    embed.setDescription("Please provide at least one ID for deletion.");
    message.channel.send({ embed: embed })
      .then(msg => {
        msg.delete({ timeout: (10000) })
      })
      .catch(err => console.error(err));
  } else {
    embed.setDescription("");
    message.channel.send({ embed: embed })
      .then(msg => {
        msg.delete({ timeout: (10000) })
      })
      .catch(err => console.error(err));
    args.forEach(arg => {
      message.channel.messages.fetch(arg)
        .then(msg => msg.delete())
        .catch(err => console.error(err));
    });
  }
}
