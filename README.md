# Lawn - A Discord Bot

Lawn is a basic Discord bot I developed as a personal project to explore bot development and the Discord API. It was designed to provide fun and utility features for Discord servers, such as games, voice channel management, and helpful commands.

## Features

- **Fun Commands**: Play games like Rock-Paper-Scissors (`rps.js`), use emoji-related commands or change your role colour.
- **Utility Commands**: Manage voice channels, delete messages, and show invite links.
- **Interactive Help**: A `help.js` command to guide users through the bot's features.

## Project Structure

The project is organized as follows:

- `commands/`: Contains individual command files, such as `ping.js`, `play.js`, and `help.js`.
- `functions/`: Includes reusable functions like the Rock-Paper-Scissors logic (`rps.js`).
- `index.js`: The main entry point for the bot.
- `server.js`: An express server used to keep the bot online.
- `config.js`: Configuration settings for the bot.

## Disclaimer

This project was created in 2020 and is no longer actively maintained. It uses an outdated version of the Discord API, and some features may not work as intended. However, it serves as a showcase of my early work in programming and bot development.

## How to Run

> **Note**: Due to API changes, the bot may not function without significant updates.

1. Clone the repository:

   ```bash
   git clone https://github.com/DarianByrne/LawnBotReplit.git
   cd LawnBotReplit
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the bot:

   - Update `config.js` with the Discord bot settings.
   - Update `.env` with the Discord bot token and prefix.

4. Start the bot:
   ```bash
   node index.js
   ```

## Lessons Learned

Working on Lawn taught me:

- How to interact with APIs and handle asynchronous programming.
- The basics of JavaScript and Node.js.
- Structuring a project for modularity and maintainability.

## Future Work

While I don't plan to update this version of Lawn, it could be modernized by:

- Migrating to the latest Discord API and libraries (e.g., `Discord.js` v14+).
- Adding more robust error handling and logging.
- Enhancing the command system for scalability.

---

Thank you for checking out Lawn! This project represents an important step in my journey as a developer.

## AI Disclosure

Code in this repository is written by Darian Byrne. This README was generated with the help of GitHub Copilot running GPT-4o.
