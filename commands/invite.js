const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!client.config.ownerID.includes(message.author.id)) {
    return message.reply("You're not an owner...");
  }
  const perms = 8;
  message.author.send(`https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=${perms}&scope=bot`)
    .then(m => {
      m.delete({ timeout: (30000) });
    });
};
