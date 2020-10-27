const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
  const voiceChannelIds = [
    '643560093815930891',
    '643560170483613696',
    '643560406241116206',
    '643560478689198130',
    '643560517893488680',
    '643560558712586281'
  ]
  const teams = ['red', 'blue'];

  const embed = new Discord.MessageEmbed()
    .setColor(client.config.embedColor)
    .setTimestamp()

  if (!message.guild.available) return;

  if (!voiceChannelIds.includes(message.guild.members.cache.get(message.author.id).voice.channelID)) {
    embed.setDescription(`You need to be in either <#${voiceChannelIds.splice(0, voiceChannelIds.length - 1).join(">, <#")}> or <#${voiceChannelIds[voiceChannelIds.length - 1]}> to move your team.`);
    return message.channel.send({ embed: embed });
  }

  if (args.length < 2) {
    embed.setDescription("You need to provide a team [`red` OR `blue`] and a size [`2` OR `3` OR `4`].");
    return message.channel.send({ embed: embed });
  }
  if (!teams.includes(args[0])) {
    embed.setDescription("You need to provide a team [`red` OR `blue`].");
    return message.channel.send({ embed: embed });
  }
  if (isNaN(parseInt(args[1])) || parseInt(args[1]) < 2 || parseInt(args[1]) > 4) {
    embed.setDescription("You need to provide a size [`2` OR `3` OR `4`].");
    return message.channel.send({ embed: embed });
  }

  args[0] === teams[0] ? args.splice(1, 1, parseInt(args[1]) - 2) : args.splice(1, 1, parseInt(args[1]) - 2 + 3);

  currentChannel = message.guild.members.cache.get(message.author.id).voice.channel;
  nextChannel = message.guild.channels.cache.get(voiceChannelIds[args[1]]);

  const currentMembers = Array.from(message.guild.members.cache.get(message.author.id).voice.channel.members);
  // needs to be looked at
  // if (!nextChannel.userLimit >= currentMembers.length) {
  //   embed.setDescription(`There are too many people in <#${currentChannel.id}> to move them all to <#${nextChannel.id}>.`);
  //   return message.channel.send({ embed: embed });
  // }

  let arr = [];
  currentMembers.forEach(member => {
    arr.push(member[0])

    member[1].voice.setChannel(nextChannel.id)
  });
  if (arr.length > 1) {
    embed.setDescription(`Moved: <@${arr.splice(0, arr.length - 1).join('>, <@')}> and <@${arr[arr.length - 1]}> from <#${currentChannel.id}> to <#${nextChannel.id}>`);
  } else {
    embed.setDescription(`Moved: <@${arr[0]}> from <#${currentChannel.id}> to <#${nextChannel.id}>`);
  }
  message.channel.send({ embed: embed });
}
