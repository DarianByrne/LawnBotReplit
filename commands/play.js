const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
  // function rps(args) {
  //   const playerChoice = client.rps.getPlayerChoice(args[1]);
  //   opponentChoice = client.rps.getOpponentChoice();
  //   if (playerChoice === false) { return message.reply("Whoops") };
  //   if (opponentChoice === false) { return message.reply("Whoops") };
  //   message.reply(client.rps.whoWins(playerChoice, opponentChoice));
  // }
  const games = [
    rps
  ];
  const selectedGame = args[0];

  const embed = new Discord.MessageEmbed()
    .setColor(client.config.embedColor);

  function hasGame(selectedGame) {
    return games.find(game => game.name === selectedGame);
  }

  if (selectedGame) {
    if (hasGame(selectedGame)) {
      games.forEach(playGame => {
        const game = playGame.name;
        if (selectedGame === game) {
          const arg = args.shift();
          try {
            playGame(args);
          } catch (err) {
            console.error(err);
          }
          args.unshift(arg);
        }
      });
    } else {
      embed.setDescription(`I couldn't find the game \`${selectedGame}\`.`);
      return message.channel.send({ embed: embed })
    }
  } else {
    embed.setDescription("You need to choose a game.");
    return message.channel.send({ embed: embed })
  }

  // ================================================ games ================================================

  function rps(args) {
    const playerChoice = args[0];
    const getUserChoice = function (userInput) {
      userInput = userInput.toLowerCase();
      if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors' || userInput === 'bomb') {
        return userInput;
      } else {
        return false;
      }
    }
    function getComputerChoice() {
      let randomNumber = (Math.floor(Math.random() * 3));
      switch (randomNumber) {
        case 0:
          return 'rock';
        case 1:
          return 'paper';
        case 2:
          return 'scissors';
      }
    }
    function determineWinner(userChoice, computerChoice) {
      if (userChoice === 'bomb') {
        return 'You used bomb, you have won!'
      } else if (userChoice === computerChoice) {
        return 'The game is a tie!';
      }
      if (userChoice === 'rock') {
        if (computerChoice === 'paper') {
          return 'You used rock, the computer has won by using paper.'
        } else {
          return 'You have won by using rock!'
        }
      }
      if (userChoice === 'paper') {
        if (computerChoice === 'scissors') {
          return 'You used paper, the computer has won by using scissors.'
        } else {
          return 'You have won by using paper!'
        }
      }
      if (userChoice === 'scissors') {
        if (computerChoice === 'rock') {
          return 'You used scissors, the computer has won by using rock.'
        } else {
          return 'You have won by using scissors!'
        }
      }
      if (userChoice === false) {
        return 'Your choice is invalid'
      }
    }
    let userChoice = getUserChoice(playerChoice);
    let computerChoice = getComputerChoice();
    embed.setDescription(determineWinner(userChoice, computerChoice));
  }

  // ================================================ games ================================================

  if (embed.description || embed.image != undefined) { message.channel.send({ embed: embed }); };
}
