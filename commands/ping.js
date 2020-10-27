const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setColor(client.config.embedColor)
    .setDescription("Pinging...");
  const m = await message.channel.send({ embed: embed });
  embed.setDescription(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms.`);
  await m.edit({ embed: embed })
    .catch(err => console.error(err));
  // const m = await message.author.send("Pinging...");
  // await m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms.`)
  //   .then(msg => {
  //     msg.delete({ timeout: (10000 + (m.createdTimestamp - message.createdTimestamp)) })
  //   })
  //   .catch(err => console.error(err));
}
