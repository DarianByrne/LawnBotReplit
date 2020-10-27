const keepAlive = require('./server');

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.js');

client.config = config;

const fs = require('fs');
const prefix = client.config.prefix;
const token = client.config.token;

async function updatePresence() {
	const guild = client.guilds.cache.get('625032542856413230');
	if (!guild.available) return;
	await guild.members.fetch();
	client.user.setPresence({
		afk: true,
		activity: {
			name: `${guild.roles.cache.get('625033467188478022').members.size} of you.. 👀`,
			type: 'WATCHING'
		},
		status: 'online'
	})
}

client.on("ready", async () => {
	console.log(`I am ready! `);
	updatePresence();
	const hexes = ["ff5555", "ffaa55", "ffff55", "55ff55", "55ffff", "5555ff", "aa55ff", "ff55ff"];
	const lawn = await client.guilds.fetch("625032542856413230");
	const rainbowRole = await lawn.roles.fetch("802651575348494348");
	let i = 0;
	const rainbow = () => {
		rainbowRole.setColor(hexes[i]);
		i = hexes.length - 1 > i ? i + 1 : 0;
		setTimeout(rainbow, 60 * 60 * 1000);
	}
	rainbow();
});

client.on("guildMemberUpdate", (oldMember, newMember) => {
	if (oldMember.roles.cache.size === newMember.roles.cache.size) return;
	if (newMember.roles.cache.has('625033467188478022')) {
		// member now has the role
		if (oldMember.roles.cache.has('625033467188478022')) {
			// member now has the role and did have the role before
			return;
		} else {
			// member now has the role and didn't have the role before
			updatePresence();
		}
	} else {
		// member doesn't have the role anymore
		if (oldMember.roles.cache.has('625033467188478022')) {
			// member doesn't have the role anymore and did have the role before
			updatePresence();
		} else {
			// member doesn't have the role anymore and didn't have the role before
			return;
		}
	}
});

fs.readdir("./functions/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		let name = file.split(".")[0];
		client[name] = require(`./functions/${file}`);
	});
});

const CronJob = require('cron').CronJob;

const taskFreeGames = new CronJob('0 0 16 * * 4', () => {
	const d = new Date();
	console.log(d, `Attempting to send message: ${client.config.freeGameMessage}`);
	client.channels.cache.get(client.config.freeGameChannelID).send(client.config.freeGameMessage)
		.then(msg => {
			console.log(msg + " Has been sent");
		}).catch(err => { console.error(err) });
}, null, false, 'Europe/Dublin');
taskFreeGames.start();

client.on("message", async (message) => {
	if (message.author.id === client.user.id || message.author.bot) return;
	const received = message.content.toLowerCase();
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const embed = new Discord.MessageEmbed()
		.setColor(client.config.embedColor);

	const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
	if (message.content.match(prefixMention)) {
		embed.setDescription(`My prefix is \`${client.config.prefix}\``);
		return message.channel.send({ embed: embed });
	}
	// Decide if command or message reply
	if (received.indexOf(prefix) == 0 && !(received === prefix)) {
		// Commands
		try {
			let commandFile = require(`./commands/${command}.js`);
			commandFile.run(client, message, args);
			message.delete({ timeout: (1000) });
		} catch (err) {
			if (err.code === 'MODULE_NOT_FOUND') {
				embed.setDescription(`Did you want to run one of my commands?\nThe command: \`${command}\`, wasn't found.`);
				const m = await message.channel.send({ embed: embed });
				return m.delete({ timeout: (10000) });
			} else {
				embed.setDescription(`It looks like the command \`${command}\` has caused an error.`);
				console.error(err);
			}
		}
	} else {
		// Message replys
		if ((received.includes('cut') || received.includes('mow')) && (received.includes('grass') || received.includes('lawn'))) {
			embed.setDescription("brmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
		} else if (received.includes('creeper')) {
			message.react('625692223131877376');
			message.channel.fetchWebhooks()
				.then(webhooks => {
					if (webhooks.first()) {
						webhooks.first().send("Aww man", {
							username: "CaptainSparklez",
							avatarURL: "https://yt3.ggpht.com/a/AGF-l786vPrEvIpdtOoVO8-Jr0oqs_XUvWrNQvJJmA=s288-c-k-c0xffffffff-no-rj-mo"
						});
					} else {
						message.channel.createWebhook("CaptainSparklez", {
							avatar: "https://yt3.ggpht.com/a/AGF-l786vPrEvIpdtOoVO8-Jr0oqs_XUvWrNQvJJmA=s288-c-k-c0xffffffff-no-rj-mo"
						})
							.then(captainSparklezWebhook => {
								captainSparklezWebhook.send("Aww man")
									.catch(err => console.error(err));
							})
							.catch(err => console.error(err));
					}
				})
		} else if ((received.includes('me') || received.includes('my') || received.includes('i')) && received.includes('on') && (received.includes('grass') || received.includes('lawn'))) {
			embed.setDescription("Nah fam");
		} else if ((received.split(" ")[0].includes('oof')) && (args.length === 0)) {
			const attachment = new Discord.MessageAttachment('./oof.webp', 'oof.webp');
			embed.attachFiles([attachment]);
			embed.setThumbnail('attachment://oof.webp');
		} else if (received.includes('pizza') && received.includes('time')) {
			embed.setImage('https://media1.tenor.com/images/fea58eb4616ff8ff041906bc5ddf9023/tenor.gif')
		} /*else if (["i'm", "im", "i am"].some(element => received.includes(element))) {
      let found = false;
      ["i'm", "im", "i am"].forEach(element => {
        if (received.includes(element)) return found = element;
      });
      if (found) {
        const arr = received.split(/ +/g);
        const name = arr[arr.indexOf(found) + 1];
        if (name) {
          embed.setDescription(`Hey, ${name}, I'm dad.`)
        } else {
          embed.setDescription(`Hey, ${message.member.nickname}, I'm dad.`);
        }
			}
		} */
	}
	if (embed.description || embed.image || embed.thumbnail != undefined) { message.channel.send({ embed: embed }); };
});

keepAlive();
client.login(token);
