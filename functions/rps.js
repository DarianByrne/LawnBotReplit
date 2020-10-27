const Discord = require('discord.js');
const options = {
  "rock": {
    "beat": "scissors",
    "lose": "paper"
  },
  "paper": {
    "beat": "rock",
    "lose": "scissors"
  },
  "scissors": {
    "beat": "paper",
    "lose": "rock"
  }
}
const aliases = {
  "rock": ["rock", "✊"],
  "paper": ["paper", "✋"],
  "scissors": ["scissors", "✌", "✂"]
}

module.exports.getPlayerChoice = async (choice) => {
  choice = choice.toLowerCase();
  if (aliases.rock.includes(choice)) { choice = aliases.rock[0].toString()
  } else if (aliases.paper.includes(choice)) { choice = aliases.paper[0].toString()
  } else if (aliases.scissors.includes(choice)) { choice = aliases.scissors[0].toString() } else return false;
  return choice;
}

module.exports.getOpponentChoice = async () => {
  choice = Object.values(aliases)[Math.round(Math.random() * 3)][0].toString();
  // choice = choice.toLowerCase();
  // if (aliases.rock.includes(choice)) { choice = aliases.rock[0] } else return false;
  // if (aliases.paper.includes(choice)) { choice = aliases.paper[0] } else return false;
  // if (aliases.scissors.includes(choice)) { choice = aliases.scissors[0] } else return false;
  return choice;
}

module.exports.whoWins = async (playerChoice, opponentChoice) => {
  if (playerChoice === opponentChoice) { return "It's a draw!" };

  console.log(playerChoice)
  console.log(opponentChoice)
  if (options[playerChoice].beat === opponentChoice) { return "Player won!" };
  if (options[opponentChoice].beat === playerChoice) { return "Opponent won!" };
}
