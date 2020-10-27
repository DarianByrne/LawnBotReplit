const Discord = module.require("discord.js");

module.exports.run = (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setColor(client.config.embedColor)
    .setDescription("**This command does not self-update, therefore it may be outdated.**\n\n***Commands:***\n`ping`: Get the bot's current ping.\n`play`: Different games like rock, paper, scissors.\n`emoji`: Get the url of an emoji.\n\n***Auto replies:***\n`creeper`: Aww man\n(`cut` `mow`) (`grass` `lawn`): brmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm\n(`me` `my` `i`) `on` (`grass` `lawn`): Nah fam\n`oof`\n`pizza` `time`");
  message.channel.send({ embed: embed});
}
