const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
  const filter = (reaction, user) => {
    return user.id === message.author.id;
  };

  const embed = new Discord.MessageEmbed()
    .setColor(client.config.embedColor)
    .setTitle("React with the emoji that you want the URL of.")

  const m = await message.channel.send(`<@${message.author.id}>,`, { embed: embed });

  new Discord.ReactionCollector(m, filter, { maxEmojis: 24 })
    .on("collect", (reaction, user) => {
      if (reaction.emoji.url) {
        embed
          .addField(reaction.emoji.name, `[url](${reaction.emoji.url})`)
          .setImage(reaction.emoji.url)
      } else {
        const url = `https://cdn.discordapp.com/emojis/${reaction.emoji.id}`
        embed
          .addField(reaction.emoji.name, `[url](${url})`)
          .setImage(url)
      }

      m.edit({ embed: embed });
    })

}
